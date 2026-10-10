import { BitError } from '@teambit/bit-error';
export default class InvalidScopeName extends BitError {
    scopeName: string;
    id: string;
    constructor(scopeName: string, id?: string, variant?: string);
}
