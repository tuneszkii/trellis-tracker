import { BuildContext, BuiltTaskResult, BuildTask, TaskHandler } from '@teambit/builder';
import { DevFilesMain } from '@teambit/dev-files';
import { EnvHandler } from '@teambit/envs';
import { Component, ComponentMap } from '@teambit/component';
import type { Tester } from '@teambit/tester';
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
export declare function getJUnitArtifactPath(): string;
export declare function getArtifactDef(): {
    name: string;
    globPatterns: string[];
    rootDir: string;
}[];
/**
 * tester build task. Allows to test components during component build.
 */
export declare class TesterTask implements BuildTask {
    readonly aspectId: string;
    private devFiles;
    readonly name: string;
    readonly description: string;
    private tester?;
    readonly dependencies: string[];
    constructor(aspectId: string, devFiles: DevFilesMain, name?: string, description?: string, tester?: Tester);
    getPatterns(components: Component[], patternsWithCapsule: ComponentMap<any>): ComponentMap<any>;
    execute(context: BuildContext): Promise<BuiltTaskResult>;
    static from(options: TesterTaskOptions): TaskHandler;
    static create(options: Omit<TesterTaskOptions, 'tester'>, { devFiles, tester }: {
        devFiles: DevFilesMain;
        tester: Tester;
    }): TesterTask;
}
