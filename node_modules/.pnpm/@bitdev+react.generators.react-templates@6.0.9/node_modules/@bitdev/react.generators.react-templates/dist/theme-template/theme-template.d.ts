import { ComponentContext, ComponentFile, ComponentTemplate } from '@teambit/generator';
export type ReactAppTemplateOptions = Partial<Pick<ComponentTemplate, 'name' | 'description' | 'hidden' | 'env'>>;
export declare class ThemeTemplate implements ComponentTemplate {
    readonly name: string;
    readonly description: string;
    readonly hidden: boolean;
    readonly env?: string | undefined;
    readonly installMissingDependencies: boolean;
    constructor(name?: string, description?: string, hidden?: boolean, env?: string | undefined, installMissingDependencies?: boolean);
    generateFiles(context: ComponentContext): ComponentFile[];
    static from(options?: ReactAppTemplateOptions): () => ThemeTemplate;
}
