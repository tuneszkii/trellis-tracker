"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsConfigNotFound = void 0;
const bit_error_1 = require("@teambit/bit-error");
class TsConfigNotFound extends bit_error_1.BitError {
    constructor(tsconfig) {
        const pathMsg = tsconfig ? ` at ${tsconfig}` : '';
        super(`tsconfig not found${pathMsg}. 
You must provide either specify a path to a valid 'tsconfig.json' or set 'compilerOptions'`);
    }
}
exports.TsConfigNotFound = TsConfigNotFound;
//# sourceMappingURL=tsconfig-not-found.js.map