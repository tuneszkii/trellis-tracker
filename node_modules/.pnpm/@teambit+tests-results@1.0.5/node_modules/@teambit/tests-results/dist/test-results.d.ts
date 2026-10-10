export declare class TestResult {
    /** ancestor Titles  */
    ancestor: string[];
    /** name of test  */
    name: string;
    status: 'passed' | 'failed' | 'skipped' | 'pending' | 'todo' | 'disabled' | 'focused';
    /** test duration in milliseconds */
    duration?: number | null;
    error?: string;
    /**
     * failure as an Error object or a string. Use `this.failure` to get it always as a string
     */
    failureErrOrStr?: Error | string;
    constructor(
    /** ancestor Titles  */
    ancestor: string[], 
    /** name of test  */
    name: string, status: 'passed' | 'failed' | 'skipped' | 'pending' | 'todo' | 'disabled' | 'focused', 
    /** test duration in milliseconds */
    duration?: number | null, error?: string, 
    /**
     * failure as an Error object or a string. Use `this.failure` to get it always as a string
     */
    failureErrOrStr?: Error | string);
    get failure(): string | undefined;
}
