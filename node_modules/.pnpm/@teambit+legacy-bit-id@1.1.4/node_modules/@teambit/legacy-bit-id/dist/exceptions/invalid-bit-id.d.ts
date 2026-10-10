import { BitError } from '@teambit/bit-error';
export default class InvalidBitId extends BitError {
    id: string;
    constructor(id: string);
}
