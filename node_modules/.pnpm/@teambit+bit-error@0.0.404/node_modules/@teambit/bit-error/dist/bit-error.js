"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitError = void 0;
class BitError extends Error {
    constructor(msg) {
        super(msg || '');
        this.isUserError = true; // user errors are not reported to Sentry
        this.name = this.constructor.name; // otherwise, the "name" is just Error.
    }
    /**
     * override if you want your error to be pretty (e.g. with color with chalk).
     * eventually, the error shown to the user is the output of this method
     */
    report() {
        return this.message;
    }
}
exports.BitError = BitError;
//# sourceMappingURL=bit-error.js.map