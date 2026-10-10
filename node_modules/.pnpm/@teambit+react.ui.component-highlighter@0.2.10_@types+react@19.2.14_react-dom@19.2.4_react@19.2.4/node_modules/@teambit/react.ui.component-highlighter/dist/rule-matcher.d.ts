import { ComponentMeta } from '@teambit/react.ui.highlighter.component-metadata.bit-component-meta';
export type MatchRule = undefined | string | ((element: HTMLElement) => boolean);
export type ComponentMatchRule = undefined | string | string[] | ((target: ComponentMatchTarget) => boolean);
export declare function ruleMatcher(element: HTMLElement, rule: MatchRule): boolean;
export type ComponentMatchTarget = {
    meta: ComponentMeta;
};
export declare function componentRuleMatcher(target: ComponentMatchTarget, rule: ComponentMatchRule): boolean;
