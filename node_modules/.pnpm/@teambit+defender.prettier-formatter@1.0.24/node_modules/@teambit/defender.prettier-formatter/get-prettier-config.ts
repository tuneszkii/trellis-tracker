import { Options as PrettierModuleOptions } from 'prettier';
import { MissingPrettierConfig } from './exceptions/missing-prettier-config';
import { PrettierOptions } from './prettier-options';

export type ComputePrettierConfigOptions = Pick<
  PrettierOptions,
  'configPath' | 'config'
>;

export function computePrettierConfig({
  configPath,
  config,
}: ComputePrettierConfigOptions): PrettierModuleOptions {
  if (!config && !configPath) {
    throw new MissingPrettierConfig();
  }
  if (config) return config;

  const prettierConfig: PrettierModuleOptions = configPath
    ? // eslint-disable-next-line import/no-dynamic-require, global-require
      require(configPath)
    : undefined;
  return prettierConfig;
}
