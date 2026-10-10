import { ComponentContext } from '@teambit/generator';

export const componentFile = (context: ComponentContext) => {
  const { name, namePascalCase: Name } = context;
  return {
    relativePath: `${name}.jsx`,
    content: `export function ${Name}({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}
`,
  };
};
