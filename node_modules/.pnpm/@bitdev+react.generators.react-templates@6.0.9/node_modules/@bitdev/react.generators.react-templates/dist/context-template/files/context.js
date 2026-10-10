"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contextFile = void 0;
const contextFile = (context) => {
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
exports.contextFile = contextFile;
//# sourceMappingURL=context.js.map