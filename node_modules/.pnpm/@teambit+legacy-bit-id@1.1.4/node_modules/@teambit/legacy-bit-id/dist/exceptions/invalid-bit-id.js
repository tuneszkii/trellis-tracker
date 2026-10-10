"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bit_error_1 = require("@teambit/bit-error");
class InvalidBitId extends bit_error_1.BitError {
    constructor(id) {
        super(`error: component ID "${id}" is invalid, please use the following format: [scope]/<name>`);
    }
}
exports.default = InvalidBitId;
//# sourceMappingURL=invalid-bit-id.js.map