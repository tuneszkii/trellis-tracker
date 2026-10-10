import { BitError } from '@teambit/bit-error';
export default class InvalidScopeNameFromRemote extends BitError {
    readonly scopeName: string;
    constructor(scopeName: string);
}
