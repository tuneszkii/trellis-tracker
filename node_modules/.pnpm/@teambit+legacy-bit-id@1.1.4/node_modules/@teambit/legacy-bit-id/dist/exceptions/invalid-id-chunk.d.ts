import { BitError } from '@teambit/bit-error';
export default class InvalidIdChunk extends BitError {
    id: string;
    constructor(id: string);
}
