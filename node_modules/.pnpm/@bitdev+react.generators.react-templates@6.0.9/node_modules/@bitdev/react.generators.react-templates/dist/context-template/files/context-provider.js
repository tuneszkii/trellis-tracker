"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contextProviderFile = void 0;
const contextProviderFile = (context) => {
    const { name, namePascalCase: Name } = context;
    return {
        relativePath: `${name}-context-provider.tsx`,
        content: `import type { ReactNode } from 'react';
import {
  ${Name}Context,
  ${Name}ContextType,
} from './${name}-context';

export type ${Name}ProviderProps = {
  children: ReactNode;
} & ${Name}ContextType;

export function ${Name}Provider({
  language,
  children,
}: ${Name}ProviderProps) {
  return (
    <${Name}Context.Provider value={{ language }}>
      {children}
    </${Name}Context.Provider>
  );
}
`,
    };
};
exports.contextProviderFile = contextProviderFile;
//# sourceMappingURL=context-provider.js.map