import { BitError } from '@teambit/bit-error';
export declare class TsConfigNotFound extends BitError {
    constructor(tsconfig: string | undefined);
}
