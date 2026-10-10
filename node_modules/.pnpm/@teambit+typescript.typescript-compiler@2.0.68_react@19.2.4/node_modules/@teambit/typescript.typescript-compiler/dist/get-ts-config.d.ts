import { CompilerOptions } from 'typescript';
export type ComputeTsConfigOptions = {
    /**
     * tsconfig.
     */
    tsconfig?: string;
    /**
     * if provided, ignoring tsconfig.
     */
    compilerOptions?: CompilerOptions;
};
export declare function computeTsConfig({ tsconfig, compilerOptions, }: ComputeTsConfigOptions): {
    compilerOptions?: import("get-tsconfig").TsConfigJson.CompilerOptions;
    watchOptions?: import("get-tsconfig").TsConfigJson.WatchOptions;
    typeAcquisition?: import("get-tsconfig").TsConfigJson.TypeAcquisition;
    compileOnSave?: boolean;
    files?: string[];
    exclude?: string[];
    include?: string[];
    references?: import("get-tsconfig").TsConfigJson.References[];
} | {
    compilerOptions: CompilerOptions;
};
