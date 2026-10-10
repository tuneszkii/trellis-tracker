import { BuildContext, BuiltTaskResult, BuildTask, TaskResultsList, TaskHandler } from '@teambit/builder';
import { Capsule } from '@teambit/isolator';
import { EnvHandler } from '@teambit/envs';
import { DependencyResolverMain } from '@teambit/dependency-resolver';
import { Compiler } from '@teambit/compiler';
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
export declare class CompilerTask implements BuildTask {
    readonly aspectId: string;
    readonly name: string;
    readonly description: string;
    private compilerInstance;
    private dependencyResolver;
    constructor(aspectId: string, name: string, description: string, compilerInstance: Compiler, dependencyResolver: DependencyResolverMain);
    preBuild(context: BuildContext): Promise<void>;
    execute(context: BuildContext): Promise<BuiltTaskResult>;
    /**
     * This function hard links the compiled artifacts to the `node_modules` of other component capsules.
     * For instance, if we have a `button` component that is a dependency of the `card` component,
     * then the `dist` folder of the `button` component will be copied to `<card_capsule>/node_modules/button/dist`.
     */
    private _hardLinkBuildArtifactsOnCapsules;
    postBuild?(context: BuildContext, tasksResults: TaskResultsList): Promise<void>;
    copyNonSupportedFiles(capsule: Capsule, compiler: Compiler): Promise<void>;
    static from(options: CompilerTaskOptions): TaskHandler;
}
