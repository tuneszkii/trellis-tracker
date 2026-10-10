"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const defender_fs_global_bit_temp_dir_1 = require("@teambit/defender.fs.global-bit-temp-dir");
const symlink_dir_1 = __importDefault(require("symlink-dir"));
const hard_link_directory_1 = require("./hard-link-directory");
test('hardLinkDirectory()', () => __awaiter(void 0, void 0, void 0, function* () {
    const tempDir = (0, defender_fs_global_bit_temp_dir_1.globalBitTempDir)();
    const srcDir = path_1.default.join(tempDir, 'source');
    const dest1Dir = path_1.default.join(tempDir, 'dest1');
    const dest2Dir = path_1.default.join(tempDir, 'dest2');
    fs_extra_1.default.mkdirpSync(srcDir);
    fs_extra_1.default.mkdirpSync(dest1Dir);
    fs_extra_1.default.mkdirpSync(path_1.default.join(srcDir, 'node_modules'));
    fs_extra_1.default.mkdirpSync(path_1.default.join(srcDir, 'subdir'));
    fs_extra_1.default.writeFileSync(path_1.default.join(srcDir, 'file.txt'), 'Hello World');
    fs_extra_1.default.writeFileSync(path_1.default.join(srcDir, 'subdir/file.txt'), 'Hello World');
    fs_extra_1.default.writeFileSync(path_1.default.join(srcDir, 'node_modules/file.txt'), 'Hello World');
    yield (0, hard_link_directory_1.hardLinkDirectory)(srcDir, [dest1Dir, dest2Dir]);
    // It should link the files from the root
    expect(fs_extra_1.default.readFileSync(path_1.default.join(dest1Dir, 'file.txt'), 'utf8')).toBe('Hello World');
    expect(fs_extra_1.default.readFileSync(path_1.default.join(dest2Dir, 'file.txt'), 'utf8')).toBe('Hello World');
    // It should link files from a subdirectory
    expect(fs_extra_1.default.readFileSync(path_1.default.join(dest1Dir, 'subdir/file.txt'), 'utf8')).toBe('Hello World');
    expect(fs_extra_1.default.readFileSync(path_1.default.join(dest2Dir, 'subdir/file.txt'), 'utf8')).toBe('Hello World');
    // It should not link files from node_modules
    expect(fs_extra_1.default.existsSync(path_1.default.join(dest1Dir, 'node_modules/file.txt'))).toBe(false);
    expect(fs_extra_1.default.existsSync(path_1.default.join(dest2Dir, 'node_modules/file.txt'))).toBe(false);
}));
test('hard link a directory that has a symlinked directory', () => __awaiter(void 0, void 0, void 0, function* () {
    const tempDir = (0, defender_fs_global_bit_temp_dir_1.globalBitTempDir)();
    const symlinkTargetDir = path_1.default.join(tempDir, 'symlink-target');
    const srcDir = path_1.default.join(tempDir, 'source');
    const dest1Dir = path_1.default.join(tempDir, 'dest1');
    const dest2Dir = path_1.default.join(tempDir, 'dest2');
    fs_extra_1.default.mkdirpSync(symlinkTargetDir);
    fs_extra_1.default.writeFileSync(path_1.default.join(symlinkTargetDir, 'file.txt'), 'Hello World');
    fs_extra_1.default.mkdirpSync(srcDir);
    fs_extra_1.default.mkdirpSync(dest1Dir);
    yield (0, symlink_dir_1.default)(symlinkTargetDir, path_1.default.join(srcDir, 'symlinked-dir'));
    yield (0, hard_link_directory_1.hardLinkDirectory)(srcDir, [dest1Dir, dest2Dir]);
    expect(fs_extra_1.default.readFileSync(path_1.default.join(dest1Dir, 'symlinked-dir', 'file.txt'), 'utf8')).toBe('Hello World');
    expect(fs_extra_1.default.readFileSync(path_1.default.join(dest2Dir, 'symlinked-dir', 'file.txt'), 'utf8')).toBe('Hello World');
}));
test('copy symlinked files', () => __awaiter(void 0, void 0, void 0, function* () {
    const tempDir = (0, defender_fs_global_bit_temp_dir_1.globalBitTempDir)();
    const symlinkTargetDir = path_1.default.join(tempDir, 'symlink-target');
    const srcDir = path_1.default.join(tempDir, 'source');
    const dest1Dir = path_1.default.join(tempDir, 'dest1');
    const dest2Dir = path_1.default.join(tempDir, 'dest2');
    fs_extra_1.default.mkdirpSync(symlinkTargetDir);
    fs_extra_1.default.mkdirpSync(srcDir);
    fs_extra_1.default.mkdirpSync(dest1Dir);
    const symlinkTargetFile = path_1.default.join(symlinkTargetDir, 'file.txt');
    fs_extra_1.default.writeFileSync(symlinkTargetFile, 'Hello World');
    yield (0, symlink_dir_1.default)(symlinkTargetFile, path_1.default.join(srcDir, 'file.txt'));
    yield (0, hard_link_directory_1.hardLinkDirectory)(srcDir, [dest1Dir, dest2Dir]);
    expect(fs_extra_1.default.readFileSync(path_1.default.join(dest1Dir, 'file.txt'), 'utf8')).toBe('Hello World');
    expect(fs_extra_1.default.lstatSync(path_1.default.join(dest1Dir, 'file.txt')).isSymbolicLink()).toBeFalsy();
    expect(fs_extra_1.default.readFileSync(path_1.default.join(dest2Dir, 'file.txt'), 'utf8')).toBe('Hello World');
    expect(fs_extra_1.default.lstatSync(path_1.default.join(dest2Dir, 'file.txt')).isSymbolicLink()).toBeFalsy();
}));
test('skip broken symlink', () => __awaiter(void 0, void 0, void 0, function* () {
    const tempDir = (0, defender_fs_global_bit_temp_dir_1.globalBitTempDir)();
    const symlinkTargetDir = path_1.default.join(tempDir, 'symlink-target');
    const srcDir = path_1.default.join(tempDir, 'source');
    const dest1Dir = path_1.default.join(tempDir, 'dest1');
    const dest2Dir = path_1.default.join(tempDir, 'dest2');
    fs_extra_1.default.mkdirpSync(symlinkTargetDir);
    fs_extra_1.default.mkdirpSync(srcDir);
    fs_extra_1.default.mkdirpSync(dest1Dir);
    fs_extra_1.default.mkdirpSync(dest2Dir);
    const symlinkTargetFile = path_1.default.join(symlinkTargetDir, 'file.txt');
    fs_extra_1.default.writeFileSync(symlinkTargetFile, 'Hello World');
    yield (0, symlink_dir_1.default)(symlinkTargetFile, path_1.default.join(srcDir, 'file.txt'));
    fs_extra_1.default.unlinkSync(symlinkTargetFile);
    yield (0, hard_link_directory_1.hardLinkDirectory)(srcDir, [dest1Dir, dest2Dir]);
    expect(fs_extra_1.default.readdirSync(dest1Dir)).toEqual([]);
    expect(fs_extra_1.default.readdirSync(dest2Dir)).toEqual([]);
}));
//# sourceMappingURL=hard-link-directory.spec.js.map