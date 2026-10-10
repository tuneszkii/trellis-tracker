import { BitError } from '@teambit/bit-error';

export class MissingPrettierConfig extends BitError {
  constructor() {
    super(
      'prettier config not found. You must provide either a path to a valid `prettier config file` or set `config`'
    );
  }
}
