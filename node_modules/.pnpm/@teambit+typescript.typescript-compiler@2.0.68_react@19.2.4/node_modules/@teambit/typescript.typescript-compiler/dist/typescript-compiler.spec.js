"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("@teambit/logger");
const typescript_1 = __importDefault(require("typescript"));
// import { expect } from 'chai';
const path_1 = __importDefault(require("path"));
const typescript_compiler_1 = require("./typescript-compiler");
const defaultOpts = {
    tsconfig: '',
    types: [],
};
describe('TypescriptCompiler', () => {
    describe('getDistPathBySrcPath', () => {
        it('should replace the extension with .js and prepend the dist dir', () => {
            const tsCompiler = getTsCompiler();
            expect(tsCompiler.getDistPathBySrcPath('index.ts')).toEqual(path_1.default.join('dist', 'index.js'));
            expect(tsCompiler.getDistPathBySrcPath('index.tsx')).toEqual(path_1.default.join('dist', 'index.js'));
        });
        it('should not replace the extension if the file is not supported', () => {
            const tsCompiler = getTsCompiler();
            expect(tsCompiler.getDistPathBySrcPath('style.css')).toEqual(path_1.default.join('dist', 'style.css'));
            expect(tsCompiler.getDistPathBySrcPath('index.d.ts')).toEqual(path_1.default.join('dist', 'index.d.ts'));
        });
    });
    describe('isFileSupported', () => {
        it('should support .ts files', () => {
            const tsCompiler = getTsCompiler();
            expect(tsCompiler.isFileSupported('index.ts')).toBeTruthy;
        });
        it('should support .tsx files', () => {
            const tsCompiler = getTsCompiler();
            expect(tsCompiler.isFileSupported('index.tsx')).toBeTruthy;
        });
        it('should not support .jsx files by default', () => {
            const tsCompiler = getTsCompiler();
            expect(tsCompiler.isFileSupported('index.jsx')).toBeFalsy;
        });
        it('should not support .js files by default', () => {
            const tsCompiler = getTsCompiler();
            expect(tsCompiler.isFileSupported('index.js')).toBeFalsy;
        });
        it('should support .jsx files when passing compileJsx', () => {
            const tsCompiler = getTsCompiler(Object.assign({ compileJsx: true }, defaultOpts));
            expect(tsCompiler.isFileSupported('index.jsx')).toBeTruthy;
        });
        it('should support .js files when passing compileJs', () => {
            const tsCompiler = getTsCompiler(Object.assign({ compileJs: true }, defaultOpts));
            expect(tsCompiler.isFileSupported('index.js')).toBeTruthy;
        });
        it('should not support .d.ts files', () => {
            const tsCompiler = getTsCompiler();
            expect(tsCompiler.isFileSupported('index.d.ts')).toBeFalsy;
        });
    });
});
function getTsCompiler(opts = defaultOpts) {
    const finalOpts = Object.assign({}, defaultOpts, opts);
    return new typescript_compiler_1.TypescriptCompiler('teambit.typescript/typescript-compiler', new logger_1.Logger('test'), finalOpts, finalOpts.typescript, typescript_1.default);
}
//# sourceMappingURL=typescript-compiler.spec.js.map