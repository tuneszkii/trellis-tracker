import { ComponentContext } from '@teambit/generator';

export const componentFile = (context: ComponentContext) => {
  const { name, nameCamelCase } = context;
  return {
    relativePath: `${name}.ts`,
    content: `import { useState } from 'react';

/**
 * A ${context.nameCamelCase} React hook.
 */
export function ${nameCamelCase}() {
  const [count, setCount] = useState(0)
  const increment = () => setCount((c) => c + 1)

  return { 
    count, 
    increment
  };
}
`,
  };
};
