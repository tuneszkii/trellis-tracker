import { BitError } from '@teambit/bit-error';
export default class InvalidVersion extends BitError {
    constructor(version?: string | null);
}
