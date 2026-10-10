"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const version_parser_1 = __importDefault(require("./version-parser"));
const exceptions_1 = require("./exceptions");
describe('versionParser()', () => {
    it('should return latest version representation', () => {
        const version = (0, version_parser_1.default)('latest');
        (0, chai_1.expect)(version.latest).to.equal(true);
        (0, chai_1.expect)(version.versionNum).to.equal(null);
    });
    it('should throw invalid version', () => {
        const version = () => (0, version_parser_1.default)('$1');
        (0, chai_1.expect)(version).to.throw(exceptions_1.InvalidVersion);
    });
    it('should return a concrete version', () => {
        const version = (0, version_parser_1.default)('0.0.1');
        (0, chai_1.expect)(version.latest).to.equal(false);
        (0, chai_1.expect)(version.versionNum).to.equal('0.0.1');
    });
    it('should parse given version as latest', () => {
        const version = (0, version_parser_1.default)('latest');
        (0, chai_1.expect)(version.versionNum).to.equal(null);
        (0, chai_1.expect)(version.latest).to.equal(true);
    });
});
//# sourceMappingURL=version-parser.spec.js.map