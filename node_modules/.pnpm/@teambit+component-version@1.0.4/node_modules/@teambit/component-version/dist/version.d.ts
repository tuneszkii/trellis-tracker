export declare const LATEST_VERSION = "latest";
export declare class Version {
    versionNum: string | null | undefined;
    latest: boolean;
    constructor(versionNum: string | null | undefined, latest: boolean);
    toString(): string;
    isLaterThan(otherVersion: Version): boolean;
}
