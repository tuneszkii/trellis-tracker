"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestResult = void 0;
class TestResult {
    constructor(
    /** ancestor Titles  */
    ancestor, 
    /** name of test  */
    name, 
    /*  the status of test (passing, skipped, failed) */
    status, 
    /** test duration in milliseconds */
    duration, 
    /*  error message */
    error, 
    /**
     * failure as an Error object or a string. Use `this.failure` to get it always as a string
     */
    failureErrOrStr) {
        this.ancestor = ancestor;
        this.name = name;
        this.status = status;
        this.duration = duration;
        this.error = error;
        this.failureErrOrStr = failureErrOrStr;
    }
    /*  failure message */
    get failure() {
        var _a;
        if (!this.failureErrOrStr)
            return undefined;
        if (typeof this.failureErrOrStr === 'string')
            return this.failureErrOrStr;
        return (_a = this.failureErrOrStr) === null || _a === void 0 ? void 0 : _a.message;
    }
}
exports.TestResult = TestResult;
//# sourceMappingURL=test-results.js.map