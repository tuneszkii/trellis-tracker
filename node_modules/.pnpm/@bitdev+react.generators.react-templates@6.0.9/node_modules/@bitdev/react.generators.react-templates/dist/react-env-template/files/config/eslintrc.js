"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eslintConfigFile = void 0;
const eslintConfigFile = () => {
    return {
        relativePath: './config/eslintrc.cjs',
        content: `/**
 * @see https://bit.dev/reference/eslint/eslint-config
 */
module.exports = {
  extends: [require.resolve('@bitdev/react.react-env/config/eslintrc.cjs')],
};`,
    };
};
exports.eslintConfigFile = eslintConfigFile;
//# sourceMappingURL=eslintrc.js.map