"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expandIncludeExclude = exports.computeTsConfig = exports.resolveTypes = exports.GLOBAL_TYPES_DIR = exports.TypescriptConfigWriter = exports.TypescriptTask = exports.TypescriptCompiler = void 0;
var typescript_compiler_1 = require("./typescript-compiler");
Object.defineProperty(exports, "TypescriptCompiler", { enumerable: true, get: function () { return typescript_compiler_1.TypescriptCompiler; } });
var typescript_task_1 = require("./typescript-task");
Object.defineProperty(exports, "TypescriptTask", { enumerable: true, get: function () { return typescript_task_1.TypescriptTask; } });
var ts_config_writer_1 = require("./ts-config-writer");
Object.defineProperty(exports, "TypescriptConfigWriter", { enumerable: true, get: function () { return ts_config_writer_1.TypescriptConfigWriter; } });
Object.defineProperty(exports, "GLOBAL_TYPES_DIR", { enumerable: true, get: function () { return ts_config_writer_1.GLOBAL_TYPES_DIR; } });
var resolve_types_1 = require("./resolve-types");
Object.defineProperty(exports, "resolveTypes", { enumerable: true, get: function () { return resolve_types_1.resolveTypes; } });
var get_ts_config_1 = require("./get-ts-config");
Object.defineProperty(exports, "computeTsConfig", { enumerable: true, get: function () { return get_ts_config_1.computeTsConfig; } });
var expand_include_exclude_1 = require("./expand-include-exclude");
Object.defineProperty(exports, "expandIncludeExclude", { enumerable: true, get: function () { return expand_include_exclude_1.expandIncludeExclude; } });
//# sourceMappingURL=index.js.map