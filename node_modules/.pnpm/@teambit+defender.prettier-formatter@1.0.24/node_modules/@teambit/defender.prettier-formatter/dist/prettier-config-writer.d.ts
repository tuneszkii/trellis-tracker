import { Options as PrettierModuleOptions } from 'prettier';
import { ExecutionContext } from '@teambit/envs';
import type { ConfigWriterEntry, ExtendingConfigFile, ConfigFile, GenerateExtendingConfigFilesArgs, ConfigWriterHandler } from '@teambit/workspace-config-files';
import { Logger } from '@teambit/logger';
import { PrettierOptions } from './prettier-options';
export type PrettierConfigWriterOptions = Pick<PrettierOptions, 'name' | 'configPath' | 'config'>;
export declare class PrettierConfigWriter implements ConfigWriterEntry {
    readonly name: string;
    private options;
    private logger;
    id: string;
    patterns: string[];
    constructor(name: string, options: PrettierModuleOptions, logger: Logger);
    calcConfigFiles(executionContext: ExecutionContext): ConfigFile[] | undefined;
    generateExtendingFile(args: GenerateExtendingConfigFilesArgs): ExtendingConfigFile | undefined;
    calcName(hash: string): string;
    isBitGenerated(filePath: string): boolean;
    static from(options: PrettierConfigWriterOptions): ConfigWriterHandler;
    static create(options: PrettierConfigWriterOptions, logger: Logger): PrettierConfigWriter;
}
