import { BitError } from '@teambit/bit-error';
export default class InvalidName extends BitError {
    componentName: string;
    constructor(componentName: string);
}
