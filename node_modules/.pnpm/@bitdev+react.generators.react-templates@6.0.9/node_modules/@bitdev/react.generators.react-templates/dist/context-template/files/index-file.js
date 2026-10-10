"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexFile = void 0;
const indexFile = (context) => {
    const { name, namePascalCase: Name } = context;
    return {
        relativePath: 'index.ts',
        content: `export { use${Name} } from './use-${name}';
export { ${Name}Provider } from './${name}-context-provider';
export type { ${Name}ProviderProps } from './${name}-context-provider';
`,
    };
};
exports.indexFile = indexFile;
//# sourceMappingURL=index-file.js.map