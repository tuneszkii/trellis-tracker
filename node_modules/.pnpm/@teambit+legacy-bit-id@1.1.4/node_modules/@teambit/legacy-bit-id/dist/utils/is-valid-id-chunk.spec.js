"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const is_valid_id_chunk_1 = __importDefault(require("./is-valid-id-chunk"));
describe('isValidIdChunk', () => {
    it('should disallow non string inputs', () => {
        (0, chai_1.expect)((0, is_valid_id_chunk_1.default)(123)).to.be.false;
        (0, chai_1.expect)((0, is_valid_id_chunk_1.default)(123, true)).to.be.false;
    });
    it('should allow a string that consist of small letters', () => {
        (0, chai_1.expect)((0, is_valid_id_chunk_1.default)('abc')).to.be.true;
        (0, chai_1.expect)((0, is_valid_id_chunk_1.default)('abc', true)).to.be.true;
    });
    it('should disallow a string that has a capital letter', () => {
        (0, chai_1.expect)((0, is_valid_id_chunk_1.default)('Abc')).to.be.false;
        (0, chai_1.expect)((0, is_valid_id_chunk_1.default)('Abc', true)).to.be.false;
    });
    it('should disallow a string that has two slashes one after another', () => {
        (0, chai_1.expect)((0, is_valid_id_chunk_1.default)('abc//', true)).to.be.false;
    });
});
//# sourceMappingURL=is-valid-id-chunk.spec.js.map