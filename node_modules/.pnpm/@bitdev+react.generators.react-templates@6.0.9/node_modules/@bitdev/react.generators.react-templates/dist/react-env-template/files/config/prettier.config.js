"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prettierConfigFile = void 0;
const prettierConfigFile = () => {
    return {
        relativePath: './config/prettier.config.cjs',
        content: `/**
 * @see https://bit.dev/reference/prettier/prettier-config
 */
const prettierConfig = require('@bitdev/react.react-env/config/prettier.config.cjs');

module.exports = {
  ...prettierConfig,
};`,
    };
};
exports.prettierConfigFile = prettierConfigFile;
//# sourceMappingURL=prettier.config.js.map