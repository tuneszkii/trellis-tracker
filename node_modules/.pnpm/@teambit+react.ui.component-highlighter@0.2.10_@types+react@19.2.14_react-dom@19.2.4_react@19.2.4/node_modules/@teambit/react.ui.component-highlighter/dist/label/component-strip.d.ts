import React from 'react';
import { ComponentMetaHolder } from '@teambit/react.ui.highlighter.component-metadata.bit-component-meta';
interface ComponentStripProps extends React.HTMLAttributes<HTMLDivElement> {
    component: ComponentMetaHolder | string;
}
export declare const ComponentStrip: React.ForwardRefExoticComponent<ComponentStripProps & React.RefAttributes<HTMLDivElement>>;
export {};
