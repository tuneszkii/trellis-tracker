import {
  ComponentContext,
  ComponentFile,
  ComponentTemplate,
} from '@teambit/generator';
import { indexFile } from './files/index-file';
import { componentFile } from './files/component';
import { testFile } from './files/test';
import { hookDocs } from './files/docs';

// TODO: replace this with "import {ComponentTemplateOptions} from '@teambit/generator';" once v1.3 is released
export type ReactComponentTemplateOptions = Partial<
  Pick<ComponentTemplate, 'name' | 'description' | 'hidden' | 'env'>
>;

export class ReactHookTemplate implements ComponentTemplate {
  constructor(
    readonly name = 'react-hook',
    readonly description = 'create a React hook component',
    readonly hidden = false,
    readonly env?: string,
    readonly installMissingDeps = true
  ) {}

  generateFiles(context: ComponentContext): ComponentFile[] {
    return [
      indexFile(context),
      componentFile(context),
      testFile(context),
      hookDocs(context),
    ];
  }

  static from(options: ReactComponentTemplateOptions = {}) {
    return () =>
      new ReactHookTemplate(
        options.name,
        options.description,
        options.hidden,
        options.env
      );
  }
}
