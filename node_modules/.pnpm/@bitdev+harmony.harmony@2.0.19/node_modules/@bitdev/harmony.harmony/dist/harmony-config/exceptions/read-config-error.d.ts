export declare class ReadConfigError extends Error {
    private err;
    constructor(path: string, err: Error);
    get stack(): string;
}
