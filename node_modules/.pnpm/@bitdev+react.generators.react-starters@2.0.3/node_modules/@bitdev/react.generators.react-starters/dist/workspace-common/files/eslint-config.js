"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eslintConfig = void 0;
exports.eslintConfig = `/**
 * this is NOT the config for your components.
 * it is only used by your IDE, for a better development experience.
 * to change your component linting, customize your env.
 * @see https://bit.dev/reference/eslint/eslint-config
 */
module.exports = {
  extends: ['@bitdev/react.react-env/config/eslintrc.js'],
  parserOptions: {
    project: './tsconfig.json'
  },
}`;
//# sourceMappingURL=eslint-config.js.map