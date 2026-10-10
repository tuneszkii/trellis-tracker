import {
  BuildContext,
  BuiltTaskResult,
  BuildTask,
  TaskResultsList,
  TaskHandler,
} from '@teambit/builder';
import { Capsule } from '@teambit/isolator';
import { hardLinkDirectory } from '@teambit/toolbox.fs.hard-link-directory';
import { EnvContext, EnvHandler } from '@teambit/envs';
import { DependencyResolverMain } from '@teambit/dependency-resolver';
import { CompilerAspect, Compiler } from '@teambit/compiler';
import fs from 'fs-extra';
import path from 'path';

export type CompilerTaskOptions = {
  /**
   * instance of compiler to use.
   */
  compiler: EnvHandler<Compiler>;

  /**
   * name of compiler task
   */
  name?: string;

  /**
   * description of what the task does.
   * if available, the logger will log it show it in the status-line.
   */
  description?: string;
};

/**
 * compiler build task. Allows to compile components during component build.
 */
export class CompilerTask implements BuildTask {
  constructor(
    readonly aspectId: string,
    readonly name: string,
    readonly description = 'compile components',
    private compilerInstance: Compiler,
    private dependencyResolver: DependencyResolverMain
  ) {
    if (compilerInstance.artifactName) {
      this.description += ` for artifact ${compilerInstance.artifactName}`;
    }
  }

  async preBuild(context: BuildContext) {
    await Promise.all(
      context.capsuleNetwork.seedersCapsules.map((capsule) =>
        this.copyNonSupportedFiles(capsule, this.compilerInstance)
      )
    );
    if (!this.compilerInstance.preBuild) return;
    await this.compilerInstance.preBuild(context);
  }

  async execute(context: BuildContext): Promise<BuiltTaskResult> {
    const buildResults = await this.compilerInstance.build(context);
    await this._hardLinkBuildArtifactsOnCapsules(context);
    return buildResults;
  }

  /**
   * This function hard links the compiled artifacts to the `node_modules` of other component capsules.
   * For instance, if we have a `button` component that is a dependency of the `card` component,
   * then the `dist` folder of the `button` component will be copied to `<card_capsule>/node_modules/button/dist`.
   */
  private async _hardLinkBuildArtifactsOnCapsules(
    context: BuildContext
  ): Promise<void> {
    await Promise.all(
      context.capsuleNetwork.seedersCapsules.map(async (capsule) => {
        const relCompDir = path
          .relative(context.capsuleNetwork.capsulesRootDir, capsule.path)
          .replace(/\\/g, '/');
        const injectedDirs = await this.dependencyResolver.getInjectedDirs(
          context.capsuleNetwork.capsulesRootDir,
          relCompDir,
          this.dependencyResolver.getPackageName(capsule.component)
        );
        return hardLinkDirectory(
          capsule.path,
          injectedDirs.map((injectedDir) =>
            path.join(context.capsuleNetwork.capsulesRootDir, injectedDir)
          )
        );
      })
    );
  }

  async postBuild?(
    context: BuildContext,
    tasksResults: TaskResultsList
  ): Promise<void> {
    if (!this.compilerInstance.postBuild) return;
    await this.compilerInstance.postBuild(context, tasksResults);
  }

  async copyNonSupportedFiles(capsule: Capsule, compiler: Compiler) {
    if (!compiler.shouldCopyNonSupportedFiles) {
      return;
    }
    const { component } = capsule;
    await Promise.all(
      component.filesystem.files.map(async (file) => {
        if (compiler.isFileSupported(file.path)) return;
        const content = file.contents;
        await fs.outputFile(
          path.join(capsule.path, compiler.distDir, file.relative),
          content
        );
      })
    );
  }

  static from(options: CompilerTaskOptions): TaskHandler {
    const name = options.name || 'compiler-task';

    const handler = (context: EnvContext) => {
      const aspectId = CompilerAspect.id;
      const depResolve = context.getAspect<any>(
        'teambit.dependencies/dependency-resolver'
      );
      return new CompilerTask(
        aspectId,
        name,
        options.description,
        options.compiler(context),
        depResolve
      );
    };
    return {
      name,
      handler,
    };
  }
}
