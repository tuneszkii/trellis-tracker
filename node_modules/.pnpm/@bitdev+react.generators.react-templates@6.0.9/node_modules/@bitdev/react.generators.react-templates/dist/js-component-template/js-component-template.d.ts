import { ComponentContext, ComponentFile, ComponentTemplate } from '@teambit/generator';
export type ReactJSComponentTemplateOptions = Partial<Pick<ComponentTemplate, 'name' | 'description' | 'hidden' | 'env'>>;
export declare class ReactJSComponentTemplate implements ComponentTemplate {
    readonly name: string;
    readonly description: string;
    readonly hidden: boolean;
    readonly env?: string | undefined;
    constructor(name?: string, description?: string, hidden?: boolean, env?: string | undefined);
    generateFiles(context: ComponentContext): ComponentFile[];
    static from(options?: ReactJSComponentTemplateOptions): () => ReactJSComponentTemplate;
}
