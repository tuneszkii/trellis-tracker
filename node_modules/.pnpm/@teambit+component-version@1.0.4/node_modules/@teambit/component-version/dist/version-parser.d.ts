import { Version } from './version';
export declare const HASH_SIZE = 40;
/**
 * because the directory structure is `XX/YY....`, it needs to have at least three characters.
 */
export declare const SHORT_HASH_MINIMUM_SIZE = 3;
/**
 * a snap is a 40 characters hash encoded in HEX. so it can be a-f and 0-9.
 * also, for convenience, a short-hash can be used, which is a minimum of 3 characters.
 */
export declare function isHash(str: string | null | undefined): boolean;
/**
 * a component version can be a tag (semver) or a snap (hash)
 */
export declare function isTag(str?: string): boolean;
/**
 * a component version can be a tag (semver) or a snap (hash)
 */
export declare function isSnap(str: string | null | undefined): boolean;
export default function versionParser(versionStr: string | null | undefined): Version;
