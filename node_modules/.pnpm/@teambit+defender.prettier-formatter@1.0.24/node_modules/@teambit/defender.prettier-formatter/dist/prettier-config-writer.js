"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrettierConfigWriter = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const get_prettier_config_1 = require("./get-prettier-config");
const CONFIG_NAME = '.prettierrc.cjs';
const BIT_GENERATED_PRETTIER_CONFIG_COMMENT = '// bit-generated-prettier-config';
class PrettierConfigWriter {
    constructor(name, options, logger) {
        this.name = name;
        this.options = options;
        this.logger = logger;
        this.id = 'prettier';
        this.patterns = [`**/${CONFIG_NAME}`];
    }
    calcConfigFiles(executionContext) {
        const content = `module.exports = ${JSON.stringify(this.options, null, 2)}`;
        const prettierConfigFile = {
            content,
            name: '.prettierrc.bit.{hash}.cjs',
        };
        return [prettierConfigFile];
    }
    generateExtendingFile(args) {
        const { writtenConfigFiles } = args;
        const prettierConfigFile = writtenConfigFiles[0];
        // Using DSL to make sure it will be replaced with relative path
        const configContent = `module.exports = {
  ...require('{${prettierConfigFile.name}}')
}`;
        const content = `${BIT_GENERATED_PRETTIER_CONFIG_COMMENT}\n${configContent}`;
        return {
            content,
            name: CONFIG_NAME,
            extendingTarget: prettierConfigFile,
            useAbsPaths: false,
        };
    }
    calcName(hash) {
        return `.prettierrc.bit.${hash}.cjs`;
    }
    isBitGenerated(filePath) {
        const content = fs_extra_1.default.readFileSync(filePath).toString();
        return content.includes(BIT_GENERATED_PRETTIER_CONFIG_COMMENT);
    }
    static from(options) {
        const name = options.name || 'PrettierConfigWriter';
        const handler = (context) => {
            return PrettierConfigWriter.create(options, context.createLogger(name));
        };
        return {
            name,
            handler,
        };
    }
    static create(options, logger) {
        const name = options.name || 'PrettierConfigWriter';
        const prettierConfig = (0, get_prettier_config_1.computePrettierConfig)(options);
        return new PrettierConfigWriter(name, prettierConfig, logger);
    }
}
exports.PrettierConfigWriter = PrettierConfigWriter;
//# sourceMappingURL=prettier-config-writer.js.map