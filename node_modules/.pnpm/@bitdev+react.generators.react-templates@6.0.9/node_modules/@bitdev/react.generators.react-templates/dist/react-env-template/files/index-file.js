"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexFile = void 0;
const indexFile = (context) => {
    const { name, namePascalCase: Name } = context;
    return {
        relativePath: 'index.ts',
        content: `import { ${Name} } from './${name}.bit-env.js';

export { ${Name} };
export default ${Name};`,
    };
};
exports.indexFile = indexFile;
//# sourceMappingURL=index-file.js.map