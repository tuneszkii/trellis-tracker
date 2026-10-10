"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bit_error_1 = require("@teambit/bit-error");
class InvalidScopeName extends bit_error_1.BitError {
    constructor(scopeName, id, variant) {
        const variantStr = variant ? `configured in variant "${variant}" ` : '';
        super(`error: "${id || scopeName}" ${variantStr}is invalid, component scope names can only contain alphanumeric, lowercase characters, and the following ["-", "_", "$", "!"]`);
    }
}
exports.default = InvalidScopeName;
//# sourceMappingURL=invalid-scope-name.js.map