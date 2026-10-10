"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactHookTemplate = void 0;
const index_file_1 = require("./files/index-file");
const component_1 = require("./files/component");
const test_1 = require("./files/test");
const docs_1 = require("./files/docs");
class ReactHookTemplate {
    constructor(name = 'react-hook', description = 'create a React hook component', hidden = false, env, installMissingDeps = true) {
        this.name = name;
        this.description = description;
        this.hidden = hidden;
        this.env = env;
        this.installMissingDeps = installMissingDeps;
    }
    generateFiles(context) {
        return [
            (0, index_file_1.indexFile)(context),
            (0, component_1.componentFile)(context),
            (0, test_1.testFile)(context),
            (0, docs_1.hookDocs)(context),
        ];
    }
    static from(options = {}) {
        return () => new ReactHookTemplate(options.name, options.description, options.hidden, options.env);
    }
}
exports.ReactHookTemplate = ReactHookTemplate;
//# sourceMappingURL=hook-template.js.map