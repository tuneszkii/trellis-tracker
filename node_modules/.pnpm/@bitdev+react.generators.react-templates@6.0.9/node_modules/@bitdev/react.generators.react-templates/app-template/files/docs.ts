import { ComponentContext } from '@teambit/generator';

export function appDocsFile(context: ComponentContext) {
  return {
    relativePath: `${context.name}.docs.mdx`,
    content: `---
description: 'A ${context.name} app.'
labels: ['app', 'react']
---

A React application for ${context.name}. 

## Run the application

Import the app and add the following config to your workspace.jsonc:

\`\`\`
bit use ${context.name} 
\`\`\`

To run the app locally, run the following:

\`\`\`
bit run ${context.name} 
\`\`\`
`,
  };
}
