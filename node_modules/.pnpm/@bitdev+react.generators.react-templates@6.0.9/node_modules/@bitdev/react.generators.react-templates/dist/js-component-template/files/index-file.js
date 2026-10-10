"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexFile = void 0;
const indexFile = (context) => {
    const { name, namePascalCase: Name } = context;
    return {
        relativePath: 'index.js',
        content: `export { ${Name} } from './${name}';
`,
    };
};
exports.indexFile = indexFile;
//# sourceMappingURL=index-file.js.map