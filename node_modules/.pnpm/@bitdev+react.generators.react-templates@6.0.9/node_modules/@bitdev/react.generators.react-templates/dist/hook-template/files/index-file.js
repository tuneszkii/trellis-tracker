"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexFile = void 0;
const indexFile = (context) => {
    const { name, nameCamelCase } = context;
    return {
        relativePath: 'index.ts',
        content: `export { ${nameCamelCase} } from './${name}.js';
`,
    };
};
exports.indexFile = indexFile;
//# sourceMappingURL=index-file.js.map