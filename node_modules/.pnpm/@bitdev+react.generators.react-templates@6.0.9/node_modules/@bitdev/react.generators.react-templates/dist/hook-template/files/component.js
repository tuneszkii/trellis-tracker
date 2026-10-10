"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentFile = void 0;
const componentFile = (context) => {
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
exports.componentFile = componentFile;
//# sourceMappingURL=component.js.map