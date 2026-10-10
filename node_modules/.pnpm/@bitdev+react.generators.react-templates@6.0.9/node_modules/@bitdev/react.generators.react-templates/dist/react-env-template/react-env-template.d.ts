import { ComponentContext, ComponentFile, ComponentTemplate } from '@teambit/generator';
export type ReactEnvTemplateOptions = {
    /**
     * name of the template
     */
    name?: string;
    /**
     * description of the template.
     */
    description?: string;
    /**
     * hide the template from the `bit templates` command.
     */
    hidden?: boolean;
};
export declare class ReactEnvTemplate implements ComponentTemplate {
    readonly name: string;
    readonly description: string;
    readonly hidden: boolean;
    readonly isEnv: boolean;
    readonly installMissingDependencies: boolean;
    readonly env: string;
    constructor(name?: string, description?: string, hidden?: boolean, isEnv?: boolean, installMissingDependencies?: boolean, env?: string);
    generateFiles(context: ComponentContext): ComponentFile[];
    static from(options?: ReactEnvTemplateOptions): () => ReactEnvTemplate;
}
