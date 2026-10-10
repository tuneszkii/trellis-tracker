"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const bit_id_1 = __importDefault(require("./bit-id"));
const exceptions_1 = require("./exceptions");
describe('Bit-id', () => {
    // TODO: those tests are now verified by TS compiler, I think we can remove them
    it('should be frozen', () => {
        const bitId = new bit_id_1.default({ name: 'my-name' });
        // @ts-ignore AUTO-ADDED-AFTER-MIGRATION-PLEASE-FIX!
        (0, chai_1.expect)(() => (bitId.scope = 'name')).to.throw();
        // @ts-ignore AUTO-ADDED-AFTER-MIGRATION-PLEASE-FIX!
        (0, chai_1.expect)(() => (bitId.name = 'name')).to.throw();
        // @ts-ignore AUTO-ADDED-AFTER-MIGRATION-PLEASE-FIX!
        (0, chai_1.expect)(() => (bitId.version = 'name')).to.throw();
    });
    describe('constructor', () => {
        it('should not throw for an invalid scope as it hurts performance (it is done on .parse() instead)', () => {
            // @ts-ignore AUTO-ADDED-AFTER-MIGRATION-PLEASE-FIX!
            const invalidScope = () => new bit_id_1.default({ scope: 123, name: 'my-name' });
            (0, chai_1.expect)(invalidScope).to.not.throw(exceptions_1.InvalidScopeName);
        });
        it('should not throw for an invalid name as it hurts performance (it is done on .parse() instead)', () => {
            // @ts-ignore AUTO-ADDED-AFTER-MIGRATION-PLEASE-FIX!
            const invalidName = () => new bit_id_1.default({ name: ['a', 'b'] });
            (0, chai_1.expect)(invalidName).to.not.throw(exceptions_1.InvalidName);
        });
        it('should accept an empty scope', () => {
            const invalidScope = () => new bit_id_1.default({ scope: null, name: 'my-name' });
            (0, chai_1.expect)(invalidScope).to.not.throw();
        });
        it('should not accept an empty name', () => {
            // @ts-ignore AUTO-ADDED-AFTER-MIGRATION-PLEASE-FIX!
            (0, chai_1.expect)(() => new bit_id_1.default({ scope: 'my-scope', name: null })).to.throw(exceptions_1.InvalidName);
            // @ts-ignore AUTO-ADDED-AFTER-MIGRATION-PLEASE-FIX!
            (0, chai_1.expect)(() => new bit_id_1.default({ scope: 'my-scope', name: undefined })).to.throw(exceptions_1.InvalidName);
            // @ts-ignore AUTO-ADDED-AFTER-MIGRATION-PLEASE-FIX!
            (0, chai_1.expect)(() => new bit_id_1.default({ scope: 'my-scope' })).to.throw(exceptions_1.InvalidName);
        });
    });
    describe('changeScope', () => {
        it('should return a new BitId with different scope', () => {
            const bitId = new bit_id_1.default({ name: 'my-name' });
            (0, chai_1.expect)(bitId.changeScope('my-scope')).to.have.property('scope').that.equal('my-scope');
        });
        it('should accept an empty parameter to remove the scope', () => {
            const bitId = new bit_id_1.default({ scope: 'my-scope', name: 'my-name' });
            (0, chai_1.expect)(bitId.changeScope()).to.have.property('scope').that.is.null;
        });
    });
    describe('changeVersion', () => {
        it('should return a new BitId with different version', () => {
            const bitId = new bit_id_1.default({ name: 'my-name' });
            (0, chai_1.expect)(bitId.changeVersion('0.0.1')).to.have.property('version').that.equal('0.0.1');
        });
        it('should accept an empty parameter to remove the version', () => {
            const bitId = new bit_id_1.default({ scope: 'my-scope', name: 'my-name', version: '0.0.1' });
            // @ts-ignore AUTO-ADDED-AFTER-MIGRATION-PLEASE-FIX!
            (0, chai_1.expect)(bitId.changeVersion()).to.have.property('version').that.is.undefined;
        });
    });
    describe('hasScope', () => {
        it('should return false when there is no scope', () => {
            const bitId = new bit_id_1.default({ name: 'my-name' });
            (0, chai_1.expect)(bitId.hasScope()).to.be.false;
        });
        it('should return true when there is scope', () => {
            const bitId = new bit_id_1.default({ scope: 'my-scope', name: 'my-name' });
            (0, chai_1.expect)(bitId.hasScope()).to.be.true;
        });
    });
    describe('getValidBitId', () => {
        it('should convert CSSComp to css-comp', () => {
            const bitName = 'CSSComp';
            (0, chai_1.expect)(bit_id_1.default.getValidBitId('global', bitName).toString()).to.equal('global/css-comp');
            // @ts-ignore AUTO-ADDED-AFTER-MIGRATION-PLEASE-FIX!
        });
        it('should convert EN-US to en-us', () => {
            const bitName = 'EN-US';
            (0, chai_1.expect)(bit_id_1.default.getValidBitId('global', bitName).toString()).to.equal('global/en-us');
        });
        it('should convert AppBar to app-bar', () => {
            const bitName = 'AppBar';
            (0, chai_1.expect)(bit_id_1.default.getValidBitId('global', bitName).toString()).to.equal('global/app-bar');
        });
        it('should convert app-bar to app-bar', () => {
            const bitName = 'app-bar';
            (0, chai_1.expect)(bit_id_1.default.getValidBitId('global', bitName).toString()).to.equal('global/app-bar');
        });
        it('should convert app-Bar to app-bar', () => {
            const bitName = 'app-Bar';
            (0, chai_1.expect)(bit_id_1.default.getValidBitId('global', bitName).toString()).to.equal('global/app-bar');
        });
        it('should convert App-Bar to app-bar', () => {
            const bitName = 'App-Bar';
            (0, chai_1.expect)(bit_id_1.default.getValidBitId('global', bitName).toString()).to.equal('global/app-bar');
        });
        it('should convert CSScomp to cs-scomp ', () => {
            const bitName = 'CSScomp';
            (0, chai_1.expect)(bit_id_1.default.getValidBitId('global', bitName).toString()).to.equal('global/cs-scomp');
        });
        it('should convert CSS@comp/CSScomp to css@comp/cs-scomp ', () => {
            const bitName = 'CSScomp';
            const global = 'CSS@comp';
            (0, chai_1.expect)(bit_id_1.default.getValidBitId(global, bitName).toString()).to.equal('css@comp/cs-scomp');
        });
        it('should convert CSS!!####@comp/app-Bar to app-Bar', () => {
            const bitName = 'app-Bar';
            const global = 'CSS!!####@comp';
            (0, chai_1.expect)(bit_id_1.default.getValidBitId(global, bitName).toString()).to.equal('css!!####@comp/app-bar');
        });
        it('should convert app bar to app-bar', () => {
            const bitName = 'app bar';
            (0, chai_1.expect)(bit_id_1.default.getValidBitId(undefined, bitName).toString()).to.equal('app-bar');
        });
    });
    describe('toString', () => {
        it('should not contain the version as latest', () => {
            const bitId = bit_id_1.default.parse('bit.envs/mocha/react@latest');
            (0, chai_1.expect)(bitId.toString()).to.equal('bit.envs/mocha/react');
        });
    });
    describe('parse', () => {
        it('should parse id with scope correctly', () => {
            const bitId = bit_id_1.default.parse('scope/my/long/comp/id', true);
            (0, chai_1.expect)(bitId.scope).to.equal('scope');
            (0, chai_1.expect)(bitId.name).to.equal('my/long/comp/id');
            (0, chai_1.expect)(bitId.box).to.be.undefined;
            (0, chai_1.expect)(bitId.version).to.equal('latest');
        });
        it('should parse id without scope correctly', () => {
            const bitId = bit_id_1.default.parse('scope/my/long/comp/id', false);
            (0, chai_1.expect)(bitId.scope).to.be.null;
            (0, chai_1.expect)(bitId.name).to.equal('scope/my/long/comp/id');
            (0, chai_1.expect)(bitId.box).to.be.undefined;
            (0, chai_1.expect)(bitId.version).to.equal('latest');
        });
        it('should throw for an invalid id', () => {
            const bitId = () => bit_id_1.default.parse('scope/my/long/co*mp/id', false);
            (0, chai_1.expect)(bitId).to.throw();
        });
    });
    describe('hasSameScope', () => {
        it('should return true when it has the same scope', () => {
            const bitId = new bit_id_1.default({ scope: 'my-scope', name: 'my-name' });
            const anotherId = new bit_id_1.default({ scope: 'my-scope', name: 'another-name' });
            (0, chai_1.expect)(bitId.hasSameScope(anotherId)).to.be.true;
        });
        it('should return false when it does not the same scope', () => {
            const bitId = new bit_id_1.default({ scope: 'my-scope', name: 'my-name' });
            const anotherId = new bit_id_1.default({ scope: 'another-scope', name: 'my-name' });
            (0, chai_1.expect)(bitId.hasSameScope(anotherId)).to.be.false;
        });
        it('should return true when both scopes are null', () => {
            const bitId = new bit_id_1.default({ scope: null, name: 'my-name' });
            const anotherId = new bit_id_1.default({ scope: null, name: 'my-name' });
            (0, chai_1.expect)(bitId.hasSameScope(anotherId)).to.be.true;
        });
        it('should return false when one of the scope is null', () => {
            const bitId = new bit_id_1.default({ scope: null, name: 'my-name' });
            const anotherId = new bit_id_1.default({ scope: 'another-scope', name: 'my-name' });
            (0, chai_1.expect)(bitId.hasSameScope(anotherId)).to.be.false;
        });
    });
    describe('isEqual', () => {
        it('should return true for an exact match', () => {
            const bitId = new bit_id_1.default({ scope: 'my-scope', name: 'my-name', version: '0.0.1' });
            const anotherId = new bit_id_1.default({ scope: 'my-scope', name: 'my-name', version: '0.0.1' });
            (0, chai_1.expect)(bitId.isEqual(anotherId)).to.be.true;
        });
        it('should return false for a version mismatch', () => {
            const bitId = new bit_id_1.default({ scope: 'my-scope', name: 'my-name', version: '0.0.1' });
            const anotherId = new bit_id_1.default({ scope: 'my-scope', name: 'my-name', version: '0.0.2' });
            (0, chai_1.expect)(bitId.isEqual(anotherId)).to.be.false;
        });
        it('should return false for a name mismatch', () => {
            const bitId = new bit_id_1.default({ scope: 'my-scope', name: 'my-name', version: '0.0.1' });
            const anotherId = new bit_id_1.default({ scope: 'my-scope', name: 'another-name', version: '0.0.1' });
            (0, chai_1.expect)(bitId.isEqual(anotherId)).to.be.false;
        });
        it('should return false for a scope mismatch', () => {
            const bitId = new bit_id_1.default({ scope: 'my-scope', name: 'my-name', version: '0.0.1' });
            const anotherId = new bit_id_1.default({ scope: 'another-scope', name: 'my-name', version: '0.0.1' });
            (0, chai_1.expect)(bitId.isEqual(anotherId)).to.be.false;
        });
    });
    describe('serialize', () => {
        it('should delete the scope property if not set', () => {
            const bitId = new bit_id_1.default({ name: 'my-name', version: '0.0.1' });
            (0, chai_1.expect)(bitId.serialize()).to.not.have.property('scope');
        });
        it('should delete the version property if not set', () => {
            const bitId = new bit_id_1.default({ name: 'my-name' });
            (0, chai_1.expect)(bitId.serialize()).to.not.have.property('version');
        });
        it('should include all properties if they are all set', () => {
            const bitId = new bit_id_1.default({ scope: 'my-scope', name: 'my-name', version: '0.0.1' });
            (0, chai_1.expect)(bitId.serialize()).to.have.property('name');
            (0, chai_1.expect)(bitId.serialize()).to.have.property('scope');
            (0, chai_1.expect)(bitId.serialize()).to.have.property('version');
        });
        it('should not be an instance of BitId', () => {
            const bitId = new bit_id_1.default({ scope: 'my-scope', name: 'my-name', version: '0.0.1' });
            (0, chai_1.expect)(bitId.serialize()).to.not.be.an.instanceof(bit_id_1.default);
        });
    });
    describe('parseBackwardCompatible', () => {
        it('should parse the new format, which is an object', () => {
            const bitIdObj = new bit_id_1.default({ scope: 'my-scope', name: 'my-name', version: '0.0.1' }).serialize();
            const bitId = bit_id_1.default.parseBackwardCompatible(bitIdObj);
            (0, chai_1.expect)(bitId).to.be.an.instanceof(bit_id_1.default);
            (0, chai_1.expect)(bitId.name).to.equal('my-name');
            (0, chai_1.expect)(bitId.scope).to.equal('my-scope');
            (0, chai_1.expect)(bitId.version).to.equal('0.0.1');
        });
        it('should parse the old format, which is a string', () => {
            const bitIdStr = 'my-scope/my-box/my-name@0.0.1';
            const bitId = bit_id_1.default.parseBackwardCompatible(bitIdStr);
            (0, chai_1.expect)(bitId).to.be.an.instanceof(bit_id_1.default);
            (0, chai_1.expect)(bitId.name).to.equal('my-box/my-name');
            (0, chai_1.expect)(bitId.scope).to.equal('my-scope');
            (0, chai_1.expect)(bitId.version).to.equal('0.0.1');
        });
    });
});
//# sourceMappingURL=bit-id.spec.js.map