import { Options as PrettierModuleOptions } from 'prettier';
import { PrettierOptions } from './prettier-options';
export type ComputePrettierConfigOptions = Pick<PrettierOptions, 'configPath' | 'config'>;
export declare function computePrettierConfig({ configPath, config, }: ComputePrettierConfigOptions): PrettierModuleOptions;
