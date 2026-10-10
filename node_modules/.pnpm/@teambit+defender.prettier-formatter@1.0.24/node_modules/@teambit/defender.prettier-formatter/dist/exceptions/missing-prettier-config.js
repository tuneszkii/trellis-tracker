"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingPrettierConfig = void 0;
const bit_error_1 = require("@teambit/bit-error");
class MissingPrettierConfig extends bit_error_1.BitError {
    constructor() {
        super('prettier config not found. You must provide either a path to a valid `prettier config file` or set `config`');
    }
}
exports.MissingPrettierConfig = MissingPrettierConfig;
//# sourceMappingURL=missing-prettier-config.js.map