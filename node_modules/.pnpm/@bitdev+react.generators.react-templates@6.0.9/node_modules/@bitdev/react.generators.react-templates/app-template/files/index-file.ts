import { ComponentContext } from '@teambit/generator';

export const indexFile = (context: ComponentContext) => {
  const { name, namePascalCase: Name } = context;

  return {
    relativePath: 'index.ts',
    content: `// export the app component for potential reuse.
export { ${Name} } from "./${name}.js";
`,
  };
};
