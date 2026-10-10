import { ComponentContext, ComponentFile, ComponentTemplate } from '@teambit/generator';
export type ReactComponentTemplateOptions = Partial<Pick<ComponentTemplate, 'name' | 'description' | 'hidden' | 'env'>>;
export declare class ReactHookTemplate implements ComponentTemplate {
    readonly name: string;
    readonly description: string;
    readonly hidden: boolean;
    readonly env?: string | undefined;
    readonly installMissingDeps: boolean;
    constructor(name?: string, description?: string, hidden?: boolean, env?: string | undefined, installMissingDeps?: boolean);
    generateFiles(context: ComponentContext): ComponentFile[];
    static from(options?: ReactComponentTemplateOptions): () => ReactHookTemplate;
}
