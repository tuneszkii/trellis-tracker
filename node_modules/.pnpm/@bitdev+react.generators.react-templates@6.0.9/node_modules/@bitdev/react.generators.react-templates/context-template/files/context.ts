import { ComponentContext } from '@teambit/generator';

export const contextFile = (context: ComponentContext) => {
  const { name, namePascalCase: Name } = context;
  return {
    relativePath: `${name}-context.tsx`,
    content: `import { createContext } from 'react';

export type ${Name}ContextType = {
  /**
   * language of the user.
   */
  language: 'en' | 'sp';
};

export const ${Name}Context = createContext<${Name}ContextType>({
  language: 'en',
});
`,
  };
};
