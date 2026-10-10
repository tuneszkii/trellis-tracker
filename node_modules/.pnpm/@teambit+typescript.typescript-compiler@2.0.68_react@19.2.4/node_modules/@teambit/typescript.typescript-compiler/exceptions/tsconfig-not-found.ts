import { BitError } from '@teambit/bit-error';

export class TsConfigNotFound extends BitError {
  constructor(tsconfig: string | undefined) {
    const pathMsg = tsconfig ? ` at ${tsconfig}` : '';
    super(
      `tsconfig not found${pathMsg}. 
You must provide either specify a path to a valid 'tsconfig.json' or set 'compilerOptions'`
    );
  }
}
