export declare class RuntimeModuleError extends Error {
    private err;
    constructor(err: Error);
    get stack(): string;
}
