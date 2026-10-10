import {
  ComponentContext,
  ComponentFile,
  ComponentTemplate,
} from '@teambit/generator';
import { indexFile } from './files/index-file';
import { componentFile } from './files/component';
import { docsFile } from './files/docs';
import { testFile } from './files/test';
import { compositionFile } from './files/composition';

// TODO: replace this with "import {ComponentTemplateOptions} from '@teambit/generator';" once v1.3 is released
export type ReactJSComponentTemplateOptions = Partial<
  Pick<ComponentTemplate, 'name' | 'description' | 'hidden' | 'env'>
>;

export class ReactJSComponentTemplate implements ComponentTemplate {
  constructor(
    readonly name = 'react-js-component',
    readonly description = 'create a JS-based React component',
    readonly hidden = true,
    readonly env?: string
  ) {}

  generateFiles(context: ComponentContext): ComponentFile[] {
    return [
      indexFile(context),
      docsFile(context),
      compositionFile(context),
      componentFile(context),
      testFile(context),
    ];
  }

  static from(options: ReactJSComponentTemplateOptions = {}) {
    return () =>
      new ReactJSComponentTemplate(
        options.name,
        options.description,
        options.hidden,
        options.env
      );
  }
}
