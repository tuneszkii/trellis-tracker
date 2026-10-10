import { BuildTask, BuiltTaskResult, BuildContext, TaskHandler } from '@teambit/builder';
import { EnvHandler } from '@teambit/envs';
import { Linter } from '@teambit/linter';
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
export declare class LinterTask implements BuildTask {
    readonly aspectId: string;
    readonly name: string;
    readonly description: string;
    private linter?;
    constructor(aspectId: string, name?: string, description?: string, linter?: Linter);
    execute(context: BuildContext): Promise<BuiltTaskResult>;
    private getComponentsDirectory;
    static from(options: LinterTaskOptions): TaskHandler;
}
