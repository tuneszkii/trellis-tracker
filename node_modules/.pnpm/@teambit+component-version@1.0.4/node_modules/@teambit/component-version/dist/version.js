"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Version = exports.LATEST_VERSION = void 0;
const semver_1 = __importDefault(require("semver"));
const exceptions_1 = require("./exceptions");
exports.LATEST_VERSION = 'latest';
class Version {
    constructor(versionNum, latest) {
        this.versionNum = versionNum;
        this.latest = latest;
        if (versionNum && latest) {
            throw new Error(`a component version cannot have both: version and "latest"`);
        }
    }
    toString() {
        if (!this.versionNum && this.latest)
            return 'latest';
        if (this.versionNum && !this.latest)
            return this.versionNum.toString();
        throw new exceptions_1.InvalidVersion(this.versionNum);
    }
    isLaterThan(otherVersion) {
        if (!this.versionNum || this.versionNum === exports.LATEST_VERSION) {
            return true;
        }
        if (!otherVersion.versionNum || otherVersion.versionNum === exports.LATEST_VERSION) {
            return false;
        }
        return semver_1.default.gt(this.versionNum, otherVersion.versionNum);
    }
}
exports.Version = Version;
//# sourceMappingURL=version.js.map