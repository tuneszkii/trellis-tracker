"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactJSComponentTemplate = void 0;
const index_file_1 = require("./files/index-file");
const component_1 = require("./files/component");
const docs_1 = require("./files/docs");
const test_1 = require("./files/test");
const composition_1 = require("./files/composition");
class ReactJSComponentTemplate {
    constructor(name = 'react-js-component', description = 'create a JS-based React component', hidden = true, env) {
        this.name = name;
        this.description = description;
        this.hidden = hidden;
        this.env = env;
    }
    generateFiles(context) {
        return [
            (0, index_file_1.indexFile)(context),
            (0, docs_1.docsFile)(context),
            (0, composition_1.compositionFile)(context),
            (0, component_1.componentFile)(context),
            (0, test_1.testFile)(context),
        ];
    }
    static from(options = {}) {
        return () => new ReactJSComponentTemplate(options.name, options.description, options.hidden, options.env);
    }
}
exports.ReactJSComponentTemplate = ReactJSComponentTemplate;
//# sourceMappingURL=js-component-template.js.map