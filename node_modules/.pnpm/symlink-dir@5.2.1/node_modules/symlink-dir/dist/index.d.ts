declare function symlinkDir(target: string, path: string, opts?: {
    overwrite?: boolean;
}): Promise<{
    reused: Boolean;
    warn?: string;
}>;
export = symlinkDir;
declare namespace symlinkDir {
    function sync(target: string, path: string, opts?: {
        overwrite?: boolean;
    }): {
        reused: Boolean;
        warn?: string;
    };
}
