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
exports.CompilerTask = void 0;
const toolbox_fs_hard_link_directory_1 = require("@teambit/toolbox.fs.hard-link-directory");
const compiler_1 = require("@teambit/compiler");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
/**
 * compiler build task. Allows to compile components during component build.
 */
class CompilerTask {
    constructor(aspectId, name, description = 'compile components', compilerInstance, dependencyResolver) {
        this.aspectId = aspectId;
        this.name = name;
        this.description = description;
        this.compilerInstance = compilerInstance;
        this.dependencyResolver = dependencyResolver;
        if (compilerInstance.artifactName) {
            this.description += ` for artifact ${compilerInstance.artifactName}`;
        }
    }
    preBuild(context) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(context.capsuleNetwork.seedersCapsules.map((capsule) => this.copyNonSupportedFiles(capsule, this.compilerInstance)));
            if (!this.compilerInstance.preBuild)
                return;
            yield this.compilerInstance.preBuild(context);
        });
    }
    execute(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const buildResults = yield this.compilerInstance.build(context);
            yield this._hardLinkBuildArtifactsOnCapsules(context);
            return buildResults;
        });
    }
    /**
     * This function hard links the compiled artifacts to the `node_modules` of other component capsules.
     * For instance, if we have a `button` component that is a dependency of the `card` component,
     * then the `dist` folder of the `button` component will be copied to `<card_capsule>/node_modules/button/dist`.
     */
    _hardLinkBuildArtifactsOnCapsules(context) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(context.capsuleNetwork.seedersCapsules.map((capsule) => __awaiter(this, void 0, void 0, function* () {
                const relCompDir = path_1.default
                    .relative(context.capsuleNetwork.capsulesRootDir, capsule.path)
                    .replace(/\\/g, '/');
                const injectedDirs = yield this.dependencyResolver.getInjectedDirs(context.capsuleNetwork.capsulesRootDir, relCompDir, this.dependencyResolver.getPackageName(capsule.component));
                return (0, toolbox_fs_hard_link_directory_1.hardLinkDirectory)(capsule.path, injectedDirs.map((injectedDir) => path_1.default.join(context.capsuleNetwork.capsulesRootDir, injectedDir)));
            })));
        });
    }
    postBuild(context, tasksResults) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.compilerInstance.postBuild)
                return;
            yield this.compilerInstance.postBuild(context, tasksResults);
        });
    }
    copyNonSupportedFiles(capsule, compiler) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!compiler.shouldCopyNonSupportedFiles) {
                return;
            }
            const { component } = capsule;
            yield Promise.all(component.filesystem.files.map((file) => __awaiter(this, void 0, void 0, function* () {
                if (compiler.isFileSupported(file.path))
                    return;
                const content = file.contents;
                yield fs_extra_1.default.outputFile(path_1.default.join(capsule.path, compiler.distDir, file.relative), content);
            })));
        });
    }
    static from(options) {
        const name = options.name || 'compiler-task';
        const handler = (context) => {
            const aspectId = compiler_1.CompilerAspect.id;
            const depResolve = context.getAspect('teambit.dependencies/dependency-resolver');
            return new CompilerTask(aspectId, name, options.description, options.compiler(context), depResolve);
        };
        return {
            name,
            handler,
        };
    }
}
exports.CompilerTask = CompilerTask;
//# sourceMappingURL=compiler-task.js.map