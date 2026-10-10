"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const version_1 = require("./version");
describe('Version', () => {
    describe('toString()', () => {
        it('should return latest', () => {
            const version = new version_1.Version(null, true);
            (0, chai_1.expect)(version.toString()).to.equal('latest');
        });
        it('should return concrete version number', () => {
            // @ts-ignore AUTO-ADDED-AFTER-MIGRATION-PLEASE-FIX!
            const version = new version_1.Version(12, false);
            (0, chai_1.expect)(version.toString()).to.equal('12');
        });
        it('should throw an invalid version exception', () => {
            const version = new version_1.Version(null, false);
            (0, chai_1.expect)(() => {
                version.toString();
            }).to.throw();
        });
    });
});
//# sourceMappingURL=version.spec.js.map