import { ComponentContext } from '@teambit/generator';

export const indexFile = (context: ComponentContext) => {
  const { name, namePascalCase: Name } = context;

  return {
    relativePath: 'index.ts',
    content: `export { use${Name} } from './use-${name}';
export { ${Name}Provider } from './${name}-context-provider';
export type { ${Name}ProviderProps } from './${name}-context-provider';
`,
  };
};
