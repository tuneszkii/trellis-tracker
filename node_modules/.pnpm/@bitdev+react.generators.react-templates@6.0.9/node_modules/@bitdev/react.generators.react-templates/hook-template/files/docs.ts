import { ComponentContext } from '@teambit/generator';

export function hookDocs(context: ComponentContext) {
  return {
    relativePath: `${context.name}.docs.mdx`,
    content: `---
description: 'A ${context.nameCamelCase} React Hook.'
labels: ['hook', 'react']
---

A react hook for incrementing the state of count by 1 each time increment() is invoked.

## Get started

Install and use the hook in your components:

\`\`\`tsx
export function MyComponent() {
  const response = useCounter();
  return <div onClick={response.increment}>The count is {response.count}</div>;
}
\`\`\`
`,
  };
}
