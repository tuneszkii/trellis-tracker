import { ComponentContext } from '@teambit/generator';

export const testFile = (context: ComponentContext) => {
  const { name } = context;

  return {
    relativePath: `${name}-context.spec.tsx`,
    content: `import React from 'react';
import { render } from '@testing-library/react';
import { BasicUsage } from './${name}-context.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicUsage />);
  const rendered = getByText('Hola!');
  expect(rendered).toBeTruthy();
});
`,
  };
};
