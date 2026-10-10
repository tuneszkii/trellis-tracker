import { ComponentContext } from '@teambit/generator';

export const testFile = (context: ComponentContext) => {
  const { name, nameCamelCase } = context;

  return {
    relativePath: `${name}.spec.tsx`,
    content: `import { renderHook, act } from '@testing-library/react';
import { ${nameCamelCase} } from './${name}.js';

it('should increment the counter', () => {
  const { result } = renderHook(() => ${nameCamelCase}());
  
  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
})
`,
  };
};
