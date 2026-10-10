import path from 'path';
import {
  BuildTask,
  BuiltTaskResult,
  BuildContext,
  ComponentResult,
  TaskHandler,
} from '@teambit/builder';
import { Component, ComponentMap } from '@teambit/component';
import { EnvContext, EnvHandler } from '@teambit/envs';
import { CapsuleList } from '@teambit/isolator';
import LinterAspect, {
  Linter,
  LinterContext,
  LintResults,
  ComponentLintResult,
} from '@teambit/linter';

export type LinterTaskOptions = {
  /**
   * instance of a linter to use.
   */
  linter?: EnvHandler<Linter>;

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

export class LinterTask implements BuildTask {
  constructor(
    readonly aspectId: string,
    readonly name = 'LintComponents',
    readonly description = 'lint components',
    private linter?: Linter
  ) {}

  async execute(context: BuildContext): Promise<BuiltTaskResult> {
    const linter: Linter = this.linter || context.env.getLinter();
    const rootDir = context.capsuleNetwork.capsulesRootDir;
    const componentsDirMap = this.getComponentsDirectory(
      rootDir,
      context.capsuleNetwork.originalSeedersCapsules
    );

    const linterContext: LinterContext = Object.assign(context, {
      rootDir,
      componentsDirMap,
    });
    const results: LintResults = await linter.lint(linterContext, context);
    const componentsResults = results.results.map(
      (lintResult: ComponentLintResult): ComponentResult => {
        let errors: string[] = [];
        let warnings: string[] = [];
        // In case there is at least one error put the output in errors
        if (results.totalErrorCount || results.totalFatalErrorCount) {
          errors = [lintResult.output];
          // In case there is only warnings put the output in warnings
        } else if (results.totalWarningCount) {
          warnings = [lintResult.output];
        }
        return {
          component: lintResult.component,
          metadata: {
            output: lintResult.output,
            results: lintResult.results,
          },
          errors,
          warnings,
        };
      }
    );

    return {
      componentsResults,
    };
  }

  private getComponentsDirectory(
    capsuleRootDir: string,
    capsuleList: CapsuleList
  ): ComponentMap<string> {
    return ComponentMap.as<string>(capsuleList.getAllComponents(), (component) => {
      const fullPath = capsuleList.getCapsule(component.id)?.path || '';
      const relativePath = path.relative(capsuleRootDir, fullPath);
      return relativePath;
    });
  }

  static from(options: LinterTaskOptions): TaskHandler {
    const name = options.name || 'linter-task';

    const handler = (context: EnvContext) => {
      const linter = options.linter ? options.linter(context) : undefined;
      return new LinterTask(LinterAspect.id, name, options.description, linter);
    };
    return {
      name,
      handler,
    };
  }
}
