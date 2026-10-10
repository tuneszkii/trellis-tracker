"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypescriptTask = void 0;
const compilation_compiler_task_1 = require("@teambit/compilation.compiler-task");
const typescript_compiler_1 = require("./typescript-compiler");
exports.TypescriptTask = {
    from: (options) => {
        const name = options.name || 'TypescriptCompile';
        const description = options.description || 'compiling components using Typescript';
        return compilation_compiler_task_1.CompilerTask.from({
            name,
            description,
            compiler: typescript_compiler_1.TypescriptCompiler.from(options),
        });
    },
};
//# sourceMappingURL=typescript-task.js.map