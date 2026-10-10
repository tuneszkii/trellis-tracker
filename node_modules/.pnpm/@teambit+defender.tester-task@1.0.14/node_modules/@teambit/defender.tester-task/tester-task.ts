import {
  BuildContext,
  BuiltTaskResult,
  BuildTask,
  CAPSULE_ARTIFACTS_DIR,
  TaskHandler,
} from '@teambit/builder';
import fs from 'fs-extra';
import { join } from 'path';
import { Compiler, CompilerAspect } from '@teambit/compiler';
import DevFilesAspect, { DevFilesMain } from '@teambit/dev-files';
import { EnvContext, EnvHandler } from '@teambit/envs';
import { Component, ComponentMap } from '@teambit/component';
import type { Tester } from '@teambit/tester';
import { TesterAspect } from '@teambit/tester';
import { detectTestFiles } from './detect-test-files';
import { testsResultsToJUnitFormat } from './junit-generator';
import { Capsule } from '@teambit/isolator';

// better not to import this from "teambit.component/sources", it's only used for the type here.
type AbstractVinyl = { path: string; relative: string };


export type TesterTaskOptions = {
  /**
   * instance of a tester to use.
   */
  tester: EnvHandler<Tester>;

  /**
   * name of the task.
   */
  name?: string;

  /**
   * description of what the task does.
   * if available, the logger will log it show it in the status-line.
   */
  description?: string;
};

export function getJUnitArtifactPath() {
  return join(CAPSULE_ARTIFACTS_DIR, '__bit_junit.xml');
}

export function getArtifactDef() {
  return [
    {
      name: 'junit',
      globPatterns: [getJUnitArtifactPath()],
      rootDir: CAPSULE_ARTIFACTS_DIR,
    },
  ];
}

/**
 * tester build task. Allows to test components during component build.
 */
export class TesterTask implements BuildTask {
  readonly dependencies = [CompilerAspect.id];

  constructor(
    readonly aspectId: string,
    private devFiles: DevFilesMain,
    readonly name = 'TestComponents',
    readonly description = 'test components',
    private tester?: Tester
  ) {}

  getPatterns(components: Component[], patternsWithCapsule: ComponentMap<any>): ComponentMap<any> {
    return ComponentMap.as(components, (component) => {
      const patternEntry = patternsWithCapsule.get(component);
      // @ts-ignore
      const [, val] = patternEntry;
      return val.paths;
    });
  }

  async execute(context: BuildContext): Promise<BuiltTaskResult> {
    const components =
      context.capsuleNetwork.originalSeedersCapsules.getAllComponents();
    const tester: Tester = this.tester || context.env.getTester();
    const componentsSpecFiles = ComponentMap.as(components, (component) =>
      detectTestFiles(component, this.devFiles)
    );

    const testCount = componentsSpecFiles
      .toArray()
      .reduce((acc, [, specs]) => acc + specs.length, 0);
    if (testCount === 0) {
      return {
        artifacts: [],
        componentsResults: [],
      };
    }

    const compiler: Compiler = context.env.getCompiler();
    if (!compiler) {
      throw new Error(`compiler not found for ${context.env.name}`);
    }

    const componentsMap = new Map<string, { specFiles: AbstractVinyl[], capsule: Capsule }>();
    components.forEach((component: Component) => {
      const componentSpecFiles = componentsSpecFiles.get(component);
      if (!componentSpecFiles) throw new Error('capsule not found');
      const [, specFiles] = componentSpecFiles;
      const capsule = context.capsuleNetwork.graphCapsules.getCapsule(
        component.id
      );
      if (!capsule) throw new Error('capsule not found');
      componentsMap.set(component.id.toString(), {
        capsule,
        specFiles,
      });
    });

    const patternsWithCapsule = ComponentMap.as(components, (component) => {
      const compMap = componentsMap.get(component.id.toString())!;
      // @ts-ignore. not sure why ts complain that compiler might be undefined, when we check it above.
      const distFolder = compiler.getDistDir() || compiler.distDir;
      return {
        componentDir: join(compMap.capsule.path, distFolder),
        paths: compMap.specFiles.map((specFile) => {
          const distPath = compiler.getDistPathBySrcPath(specFile.relative);
          // TODO: fix spec type file need to capsule will return files with type AbstractVinyl
          return { path: join(compMap.capsule.path, distPath), relative: distPath };
        }),
      };
    });

    const specFilesWithCapsule = this.getPatterns(components, patternsWithCapsule);

    const sourcePatternsWithCapsule = ComponentMap.as(components, (component) => {
      const compMap = componentsMap.get(component.id.toString())!;
      return {
        componentDir: compMap.capsule.path,
        paths: compMap.specFiles.map((specFile) => {
          return { path: join(compMap.capsule.path, specFile.relative), relative: specFile.relative };
        }),
      };
    });

    const sourceSpecFilesWithCapsule = this.getPatterns(components, sourcePatternsWithCapsule);

    const testerContext = Object.assign(context, {
      release: true,
      specFiles: specFilesWithCapsule,
      sourceSpecFiles: sourceSpecFilesWithCapsule,
      rootPath: context.capsuleNetwork.capsulesRootDir,
      patterns: patternsWithCapsule,
      sourcePatterns: sourcePatternsWithCapsule,
    });

    // TODO: remove after fix AbstractVinyl on capsule
    // @ts-ignore
    const testsResults = await tester.test(testerContext);

    // write junit files
    await Promise.all(
      testsResults.components.map(async (compResult) => {
        const junit = testsResultsToJUnitFormat([compResult]);
        const capsule = context.capsuleNetwork.graphCapsules.getCapsule(
          compResult.componentId
        );
        if (!capsule) {
          throw new Error(
            `unable to find ${compResult.componentId.toString()} in capsules`
          );
        }
        await fs.outputFile(join(capsule.path, getJUnitArtifactPath()), junit);
      })
    );

    return {
      artifacts: getArtifactDef(), // @ts-ignore
      componentsResults: testsResults.components.map((componentTests) => {
        const componentErrors = componentTests.errors;
        const component = context.capsuleNetwork.graphCapsules.getCapsule(
          componentTests.componentId
        )?.component;
        if (!component) {
          throw new Error(
            `unable to find ${componentTests.componentId.toString()} in capsules`
          );
        }

        return {
          component,
          metadata: { tests: componentTests.results },
          errors: componentErrors,
        };
      }),
    };
  }

  static from(options: TesterTaskOptions): TaskHandler {
    const name = options.name || 'tester-task';

    const handler = (context: EnvContext) => {
      const devFiles = context.getAspect<DevFilesMain>(DevFilesAspect.id);
      const tester = options.tester(context);
      return TesterTask.create(options, { devFiles, tester });
    };
    return {
      name,
      handler,
    };
  }

  static create(options: Omit<TesterTaskOptions, 'tester'>, { devFiles, tester }: { devFiles: DevFilesMain; tester: Tester}): TesterTask {
    const name = options.name || 'tester-task';

    return new TesterTask(
      TesterAspect.id,
      devFiles,
      name,
      options.description,
      tester,
    );
  }
}
