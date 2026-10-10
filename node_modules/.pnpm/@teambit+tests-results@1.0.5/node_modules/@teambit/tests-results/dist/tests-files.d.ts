import { TestResult } from './test-results';
/**
 * @todo: rename to `TestsFile` (singular not plural). it represents one file only.
 */
export declare class TestsFiles {
    file: string;
    tests: TestResult[];
    pass: number;
    failed: number;
    pending: number;
    duration?: number;
    slow?: boolean;
    /**
     * this should not include any failures.
     * it is relevant only when the tester got an unexpected error.
     *
     * if you're writing a tester, make sure to print this error in the terminal.
     * (e.g. for Jest, it's part of Jest output. for Mocha, this error needs to be explicitly printed using
     * `this.logger.consoleFailure()` method)
     *
     * the reason why this error is not thrown is for the UI to be able to show the test-results for all files and only
     * the ones that got an error, show the error nicely for them.
     */
    error?: Error;
    constructor(file: string, tests: TestResult[], pass: number, failed: number, pending: number, duration?: number, slow?: boolean, 
    /**
     * this should not include any failures.
     * it is relevant only when the tester got an unexpected error.
     *
     * if you're writing a tester, make sure to print this error in the terminal.
     * (e.g. for Jest, it's part of Jest output. for Mocha, this error needs to be explicitly printed using
     * `this.logger.consoleFailure()` method)
     *
     * the reason why this error is not thrown is for the UI to be able to show the test-results for all files and only
     * the ones that got an error, show the error nicely for them.
     */
    error?: Error);
    get totalTests(): number;
    get errorStr(): string;
}
