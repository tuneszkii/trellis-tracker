"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bit_error_1 = require("@teambit/bit-error");
class InvalidIdChunk extends bit_error_1.BitError {
    constructor(id) {
        super(`error: "${id}" is invalid, component IDs can only contain alphanumeric, lowercase characters, and the following ["-", "_", "$", "!"]`);
    }
}
exports.default = InvalidIdChunk;
//# sourceMappingURL=invalid-id-chunk.js.map