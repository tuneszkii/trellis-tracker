"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentFile = void 0;
const componentFile = (context) => {
    const { name, namePascalCase: Name } = context;
    return {
        relativePath: `${name}.tsx`,
        content: `import type { ReactNode } from 'react';

export type ${Name}Props = {
  /**
   * sets the component children.
   */
  children?: ReactNode;
};

export function ${Name}({ children }: ${Name}Props) {
  return (
    <div>
      {children}
    </div>
  );
}
`,
    };
};
exports.componentFile = componentFile;
//# sourceMappingURL=component.js.map