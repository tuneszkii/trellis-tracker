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
exports.LinterTask = void 0;
const path_1 = __importDefault(require("path"));
const component_1 = require("@teambit/component");
const linter_1 = __importDefault(require("@teambit/linter"));
class LinterTask {
    constructor(aspectId, name = 'LintComponents', description = 'lint components', linter) {
        this.aspectId = aspectId;
        this.name = name;
        this.description = description;
        this.linter = linter;
    }
    execute(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const linter = this.linter || context.env.getLinter();
            const rootDir = context.capsuleNetwork.capsulesRootDir;
            const componentsDirMap = this.getComponentsDirectory(rootDir, context.capsuleNetwork.originalSeedersCapsules);
            const linterContext = Object.assign(context, {
                rootDir,
                componentsDirMap,
            });
            const results = yield linter.lint(linterContext, context);
            const componentsResults = results.results.map((lintResult) => {
                let errors = [];
                let warnings = [];
                // In case there is at least one error put the output in errors
                if (results.totalErrorCount || results.totalFatalErrorCount) {
                    errors = [lintResult.output];
                    // In case there is only warnings put the output in warnings
                }
                else if (results.totalWarningCount) {
                    warnings = [lintResult.output];
                }
                return {
                    component: lintResult.component,
                    metadata: {
                        output: lintResult.output,
                        results: lintResult.results,
                    },
                    errors,
                    warnings,
                };
            });
            return {
                componentsResults,
            };
        });
    }
    getComponentsDirectory(capsuleRootDir, capsuleList) {
        return component_1.ComponentMap.as(capsuleList.getAllComponents(), (component) => {
            var _a;
            const fullPath = ((_a = capsuleList.getCapsule(component.id)) === null || _a === void 0 ? void 0 : _a.path) || '';
            const relativePath = path_1.default.relative(capsuleRootDir, fullPath);
            return relativePath;
        });
    }
    static from(options) {
        const name = options.name || 'linter-task';
        const handler = (context) => {
            const linter = options.linter ? options.linter(context) : undefined;
            return new LinterTask(linter_1.default.id, name, options.description, linter);
        };
        return {
            name,
            handler,
        };
    }
}
exports.LinterTask = LinterTask;
//# sourceMappingURL=linter-task.js.map