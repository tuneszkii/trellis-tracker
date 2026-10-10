"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHORT_HASH_MINIMUM_SIZE = exports.HASH_SIZE = exports.InvalidVersion = exports.isTag = exports.isSnap = exports.isHash = exports.versionParser = exports.LATEST_VERSION = exports.Version = void 0;
const version_1 = require("./version");
Object.defineProperty(exports, "Version", { enumerable: true, get: function () { return version_1.Version; } });
Object.defineProperty(exports, "LATEST_VERSION", { enumerable: true, get: function () { return version_1.LATEST_VERSION; } });
const version_parser_1 = __importStar(require("./version-parser"));
exports.versionParser = version_parser_1.default;
Object.defineProperty(exports, "isHash", { enumerable: true, get: function () { return version_parser_1.isHash; } });
Object.defineProperty(exports, "isSnap", { enumerable: true, get: function () { return version_parser_1.isSnap; } });
Object.defineProperty(exports, "isTag", { enumerable: true, get: function () { return version_parser_1.isTag; } });
Object.defineProperty(exports, "HASH_SIZE", { enumerable: true, get: function () { return version_parser_1.HASH_SIZE; } });
Object.defineProperty(exports, "SHORT_HASH_MINIMUM_SIZE", { enumerable: true, get: function () { return version_parser_1.SHORT_HASH_MINIMUM_SIZE; } });
const exceptions_1 = require("./exceptions");
Object.defineProperty(exports, "InvalidVersion", { enumerable: true, get: function () { return exceptions_1.InvalidVersion; } });
//# sourceMappingURL=index.js.map