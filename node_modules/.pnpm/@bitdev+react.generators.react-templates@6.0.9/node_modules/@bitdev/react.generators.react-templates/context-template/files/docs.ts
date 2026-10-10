import { ComponentContext } from '@teambit/generator';

export const docsFile = (context: ComponentContext) => {
  const { name, namePascalCase: Name } = context;

  return {
    relativePath: `${name}-context.docs.mdx`,
    content: `---
description: A Context component
labels: ['context']
---

import { ${Name}Provider } from './${name}-context-provider';
import { DisplayLanguage } from './${name}-context.composition';

## React Theme Context

This is a simple [React Context](https://reactjs.org/docs/context.html) shared as a Bit component.
Use this component to share data between components without having to pass props down manually at every level.

### Component usage

\`\`\`tsx
import React from 'react';
import {
  ${Name}Provider,
  use${Name},
} from '@org-name/scope-name.context.${name}';

/* demo component */
const DisplayLanguage = () => {
  const { language } = use${Name}();
  if (language === 'en') return Hi!;
  return Hola!;
};

export const BasicUsage = () => {
  return (
    <${Name}Provider language="sp">
    <DisplayLanguage />
  </${Name}Provider>
  );
};
`,
  };
};
