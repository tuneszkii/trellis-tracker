import { ComponentContext } from '@teambit/generator';

export const indexFile = (context: ComponentContext) => {
  const { name, nameCamelCase } = context;

  return {
    relativePath: 'index.ts',
    content: `export { ${nameCamelCase} } from './${name}.js';
`,
  };
};
