import { Options as PrettierModuleOptions } from 'prettier';

export type PrettierOptions = {
  name?: string;

  /**
   * formatter config for prettier.
   */
  config?: PrettierModuleOptions;

  /**
   * path to prettier config file to use during formatting.
   */
  configPath?: string;

  /**
   * instance of prettier to use.
   */
  prettier?: any;

  /**
   * file types to format.
   */
  extensions?: string[];
};
