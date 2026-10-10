export declare class BitError extends Error {
    isUserError: boolean;
    constructor(msg?: string);
    /**
     * override if you want your error to be pretty (e.g. with color with chalk).
     * eventually, the error shown to the user is the output of this method
     */
    report(): string;
}
