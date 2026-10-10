import { Formatter, FormatterContext, FormatResults } from '@teambit/formatter';
import PrettierLib, { Options as PrettierModuleOptions } from 'prettier';
import { Logger } from '@teambit/logger';
import { EnvHandler } from '@teambit/envs';
import { PrettierOptions } from './prettier-options';
export declare class PrettierFormatter implements Formatter {
    readonly id: string;
    private logger;
    private options;
    /**
     * file types to format.
     */
    private extensions;
    /**
     * reference to the prettier module.
     */
    private prettierModule;
    constructor(id: string, logger: Logger, options: PrettierModuleOptions, 
    /**
     * file types to format.
     */
    extensions?: string[], 
    /**
     * reference to the prettier module.
     */
    prettierModule?: typeof PrettierLib);
    displayName: string;
    displayConfig(): string;
    format(context: FormatterContext): Promise<FormatResults>;
    formatSnippet(snippet: string, filePath?: string): Promise<string>;
    check(context: FormatterContext): Promise<FormatResults>;
    private run;
    private addFilePathToOpts;
    version(): string;
    static create(options: PrettierOptions, { logger }: {
        logger: Logger;
    }): Formatter;
    static from(options: PrettierOptions): EnvHandler<Formatter>;
}
