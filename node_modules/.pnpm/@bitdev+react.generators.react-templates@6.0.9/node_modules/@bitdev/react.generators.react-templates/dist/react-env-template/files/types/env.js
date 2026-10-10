"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envDtsFile = void 0;
const envDtsFile = () => {
    return {
        relativePath: './types/env.d.ts',
        content: `
/// <reference types="vite/client" />

export type ImportMetaEnv = Record<string, string>;

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string;
    }
  }
}`
    };
};
exports.envDtsFile = envDtsFile;
//# sourceMappingURL=env.js.map