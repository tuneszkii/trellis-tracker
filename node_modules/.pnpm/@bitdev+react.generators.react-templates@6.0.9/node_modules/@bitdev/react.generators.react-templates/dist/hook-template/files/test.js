"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testFile = void 0;
const testFile = (context) => {
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
exports.testFile = testFile;
//# sourceMappingURL=test.js.map