/**
 * Hard link all files from a directory to several target directories.
 *
 * @param src - The directory to hard link files from.
 * @param destDirs - The target directories.
 */
export declare function hardLinkDirectory(src: string, destDirs: string[]): Promise<void>;
