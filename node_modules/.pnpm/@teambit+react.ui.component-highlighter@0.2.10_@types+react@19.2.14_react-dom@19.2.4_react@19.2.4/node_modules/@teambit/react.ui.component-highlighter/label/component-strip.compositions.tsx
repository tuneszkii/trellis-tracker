import React from 'react';
import { ComponentStrip } from './component-strip';
import { MockButton, MockSnap } from '../mock-component';

export const ComponentStripPreview = () => {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: 8 }}>
      <ComponentStrip component={MockSnap} />
      <br />
      <ComponentStrip component={MockButton} />
    </div>
  );
};
