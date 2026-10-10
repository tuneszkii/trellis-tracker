"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsConfigFile = void 0;
const tsConfigFile = () => {
    return {
        relativePath: './config/tsconfig.json',
        content: `/**
 * @see https://bit.dev/reference/typescript/typescript-config
 */
{
  "extends": "@bitdev/react.react-env/config/tsconfig.json",
  "exclude": ["artifacts", "public", "dist", "node_modules", "package.json", "**/*.cjs"],
  "include": ["**/*", "**/*.json"]
}`,
    };
};
exports.tsConfigFile = tsConfigFile;
//# sourceMappingURL=tsconfig.json.js.map