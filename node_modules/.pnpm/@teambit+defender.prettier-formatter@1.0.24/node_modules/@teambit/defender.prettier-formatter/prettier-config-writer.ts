import { Options as PrettierModuleOptions } from 'prettier';
import fs from 'fs-extra';
import { EnvContext, ExecutionContext } from '@teambit/envs';
import type {
  ConfigWriterEntry,
  ExtendingConfigFile,
  ConfigFile,
  GenerateExtendingConfigFilesArgs,
  ConfigWriterHandler,
} from '@teambit/workspace-config-files';
import { Logger } from '@teambit/logger';
import { PrettierOptions } from './prettier-options';
import { computePrettierConfig } from './get-prettier-config';

const CONFIG_NAME = '.prettierrc.cjs';
const BIT_GENERATED_PRETTIER_CONFIG_COMMENT =
  '// bit-generated-prettier-config';

export type PrettierConfigWriterOptions = Pick<
  PrettierOptions,
  'name' | 'configPath' | 'config'
>;

export class PrettierConfigWriter implements ConfigWriterEntry {
  id = 'prettier';
  patterns: string[] = [`**/${CONFIG_NAME}`];

  constructor(
    readonly name: string,
    private options: PrettierModuleOptions,
    private logger: Logger
  ) {}

  calcConfigFiles(
    executionContext: ExecutionContext
  ): ConfigFile[] | undefined {
    const content = `module.exports = ${JSON.stringify(this.options, null, 2)}`;
    const prettierConfigFile = {
      content,
      name: '.prettierrc.bit.{hash}.cjs',
    };
    return [prettierConfigFile];
  }

  generateExtendingFile(
    args: GenerateExtendingConfigFilesArgs
  ): ExtendingConfigFile | undefined {
    const { writtenConfigFiles } = args;
    const prettierConfigFile = writtenConfigFiles[0];
    // Using DSL to make sure it will be replaced with relative path
    const configContent = `module.exports = {
  ...require('{${prettierConfigFile.name}}')
}`;
    const content = `${BIT_GENERATED_PRETTIER_CONFIG_COMMENT}\n${configContent}`;
    return {
      content,
      name: CONFIG_NAME,
      extendingTarget: prettierConfigFile,
      useAbsPaths: false,
    };
  }
  calcName(hash: string): string {
    return `.prettierrc.bit.${hash}.cjs`;
  }

  isBitGenerated(filePath: string): boolean {
    const content = fs.readFileSync(filePath).toString();
    return content.includes(BIT_GENERATED_PRETTIER_CONFIG_COMMENT);
  }

  static from(options: PrettierConfigWriterOptions): ConfigWriterHandler {
    const name = options.name || 'PrettierConfigWriter';
    const handler = (context: EnvContext) => {
      return PrettierConfigWriter.create(options, context.createLogger(name));
    };
    return {
      name,
      handler,
    };
  }

  static create(
    options: PrettierConfigWriterOptions,
    logger: Logger
  ): PrettierConfigWriter {
    const name = options.name || 'PrettierConfigWriter';
    const prettierConfig = computePrettierConfig(options);

    return new PrettierConfigWriter(name, prettierConfig, logger);
  }
}
