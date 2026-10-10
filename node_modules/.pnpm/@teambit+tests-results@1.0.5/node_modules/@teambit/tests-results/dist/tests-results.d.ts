import { TestsFiles } from './tests-files';
export declare class TestsResult {
    /**
     * file tested.
     */
    testFiles: TestsFiles[];
    /**
     * whether test is successful or not.
     */
    success?: boolean;
    /**
     * start? ask guy.
     */
    start?: number;
    constructor(
    /**
     * file tested.
     */
    testFiles: TestsFiles[], 
    /**
     * whether test is successful or not.
     */
    success?: boolean, 
    /**
     * start? ask guy.
     */
    start?: number);
}
