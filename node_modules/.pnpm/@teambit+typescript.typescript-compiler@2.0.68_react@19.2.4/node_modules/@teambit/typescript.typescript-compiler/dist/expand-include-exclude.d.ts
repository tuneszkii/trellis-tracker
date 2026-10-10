import { TsConfigJson } from 'get-tsconfig';
/**
 * It takes a tsconfig.json file, a list of component directories, and returns a new tsconfig.json file with the include
 * and exclude properties expanded to include all the component directories
 * @param {string} tsConfigPath - The path to the tsconfig.json file.
 * @param {TsConfigJson} tsConfig - The tsconfig.json file that we're going to modify.
 * @param {string[]} compDirs - An array of paths to the component directories.
 * @returns the tsConfig object.
 */
export declare function expandIncludeExclude(tsConfigPath: string, tsConfig: TsConfigJson, compDirs: string[], globalTypesDir?: string): TsConfigJson;
