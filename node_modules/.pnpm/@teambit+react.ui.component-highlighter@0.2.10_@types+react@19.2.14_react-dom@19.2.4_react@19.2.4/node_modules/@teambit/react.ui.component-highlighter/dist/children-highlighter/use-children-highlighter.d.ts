import { RefObject } from 'react';
import { ComponentMetaHolder } from '@teambit/react.ui.highlighter.component-metadata.bit-component-meta';
import { MatchRule, ComponentMatchRule } from '../rule-matcher';
type HighlighterTarget = Record<string, {
    element: HTMLElement;
    components: ComponentMetaHolder[];
}>;
export type ChildrenHighlighterOptions = {
    onChange: (highlighterTargets: HighlighterTarget) => void;
    disabled?: boolean;
    scopeRef: RefObject<HTMLElement>;
    scopeClass?: string;
    /** filter highlighter targets by this query selector. (May be a more complex object in the future) */
    rule?: MatchRule;
    componentRule?: ComponentMatchRule;
};
export declare function useChildrenHighlighter({ onChange, disabled, scopeRef, scopeClass: scopeSelector, rule, componentRule, }: ChildrenHighlighterOptions): void;
export {};
