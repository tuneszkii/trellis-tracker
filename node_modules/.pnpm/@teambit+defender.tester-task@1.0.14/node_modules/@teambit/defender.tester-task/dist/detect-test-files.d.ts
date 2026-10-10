import { Component } from '@teambit/component';
import { DevFilesMain } from '@teambit/dev-files';
type AbstractVinyl = {
    path: string;
    relative: string;
};
/**
 * detect test files in components
 */
export declare function detectTestFiles(component: Component, devFiles: DevFilesMain): AbstractVinyl[];
export {};
