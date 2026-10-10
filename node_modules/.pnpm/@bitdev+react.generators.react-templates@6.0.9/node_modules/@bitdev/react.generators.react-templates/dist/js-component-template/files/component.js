"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentFile = void 0;
const componentFile = (context) => {
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
exports.componentFile = componentFile;
//# sourceMappingURL=component.js.map