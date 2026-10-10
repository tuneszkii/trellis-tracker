import { TaskHandler } from '@teambit/builder';
import { CompilerTaskOptions } from '@teambit/compilation.compiler-task';
import { TypeScriptCompilerOptions } from './typescript-compiler-options';
export type TypeScriptTaskOptions = TypeScriptCompilerOptions & Pick<CompilerTaskOptions, 'description'>;
export declare const TypescriptTask: {
    from: (options: TypeScriptTaskOptions) => TaskHandler;
};
