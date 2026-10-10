"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bit_error_1 = require("@teambit/bit-error");
class InvalidName extends bit_error_1.BitError {
    constructor(componentName) {
        super(`error: "${componentName}" is invalid, component names can only contain alphanumeric, lowercase characters, and the following ["-", "_", "$", "!", "/"]`);
    }
}
exports.default = InvalidName;
//# sourceMappingURL=invalid-name.js.map