import { ComponentType, ReactNode } from 'react';
/**
 * a reference to a provider function.
 */
export type MounterProvider = ComponentType<{
    children: ReactNode;
}>;
/**
 * create a mounter.
 */
export declare function createMounter(Provider?: MounterProvider): any;
export default createMounter;
