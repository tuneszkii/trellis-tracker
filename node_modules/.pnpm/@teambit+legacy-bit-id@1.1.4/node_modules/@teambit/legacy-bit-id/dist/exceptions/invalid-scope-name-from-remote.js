"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bit_error_1 = require("@teambit/bit-error");
class InvalidScopeNameFromRemote extends bit_error_1.BitError {
    constructor(scopeName) {
        super(`cannot find scope '${scopeName}'.
if you are targeting a self-hosted scope, please ensure the scope is configured in your remotes (via "bit remote" command) and that the scope name is correct.
if this is a scope on bit.cloud please add the organization name before the scope (yourOrg.some-scope-name)`);
        this.scopeName = scopeName;
    }
}
exports.default = InvalidScopeNameFromRemote;
//# sourceMappingURL=invalid-scope-name-from-remote.js.map