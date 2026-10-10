"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bit_error_1 = require("@teambit/bit-error");
class InvalidVersion extends bit_error_1.BitError {
    constructor(version) {
        super(`error: version ${version || '(empty)'} is not a valid semantic version. learn more: https://semver.org`);
    }
}
exports.default = InvalidVersion;
//# sourceMappingURL=invalid-version.js.map