"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestsResult = void 0;
class TestsResult {
    constructor(
    /**
     * file tested.
     */
    testFiles, 
    /**
     * whether test is successful or not.
     */
    success, 
    /**
     * start? ask guy.
     */
    start) {
        this.testFiles = testFiles;
        this.success = success;
        this.start = start;
    }
}
exports.TestsResult = TestsResult;
//# sourceMappingURL=tests-results.js.map