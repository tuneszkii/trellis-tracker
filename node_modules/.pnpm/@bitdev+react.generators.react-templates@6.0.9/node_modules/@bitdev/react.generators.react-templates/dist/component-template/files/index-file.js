"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexFile = void 0;
const indexFile = (context) => {
    const { name, namePascalCase: Name } = context;
    return {
        relativePath: 'index.ts',
        content: `export { ${Name} } from './${name}.js';
export type { ${Name}Props } from './${name}.js';
`,
    };
};
exports.indexFile = indexFile;
//# sourceMappingURL=index-file.js.map