"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewriteDropdownMigration = void 0;
const schematics_1 = require("@angular/cdk/schematics");
const ts = __importStar(require("typescript"));
const DROPDOWN_REGEXP = /<novo-dropdown.*>(.|\n)*?<\/novo-dropdown>/gim;
/**
 * Migration that walks through every string literal, template and stylesheet in order
 * to migrate outdated element selectors to the new one.
 */
class RewriteDropdownMigration extends schematics_1.DevkitMigration {
    constructor() {
        super(...arguments);
        this.enabled = this.targetVersion === schematics_1.TargetVersion.V6;
    }
    visitNode(node) {
        if (ts.isStringLiteralLike(node)) {
            this._visitStringLiteralLike(node);
        }
    }
    visitTemplate(template) {
        const content = template.content;
        // const fileContents: string = this.fileSystem.read(filePath)!;
        const matches = content.match(DROPDOWN_REGEXP) || [];
        const migratedContent = matches.reduce((a, b) => a.replace(b, this._rewriteDropDown(b)), content);
        if (migratedContent && migratedContent !== content) {
            this.fileSystem.edit(template.filePath).remove(template.start, content.length).insertRight(template.start, migratedContent);
        }
    }
    _visitStringLiteralLike(node) {
        if (node.parent && node.parent.kind !== ts.SyntaxKind.CallExpression) {
            return;
        }
        const textContent = node.getText();
        const filePath = this.fileSystem.resolve(node.getSourceFile().fileName);
        // const fileContents: string = this.fileSystem.read(filePath)!;
        const matches = textContent.match(DROPDOWN_REGEXP) || [];
        const migratedContent = matches.reduce((a, b) => a.replace(b, this._rewriteDropDown(b)), textContent);
        if (migratedContent && migratedContent !== textContent) {
            this.fileSystem.edit(filePath).remove(node.getStart(), textContent.length).insertRight(node.getStart(), migratedContent);
        }
    }
    _rewriteDropDown(contents) {
        const replacer = new ReplaceChain(contents);
        return replacer
            .replace(/<(\/?)list(?:(?!-))/gi, '<$1novo-optgroup')
            .replace(/<(\/?)item(?:(?!-))/gi, '<$1novo-option')
            .replace(/\(action\)=/gi, '(click)=')
            .value();
    }
}
exports.RewriteDropdownMigration = RewriteDropdownMigration;
class ReplaceChain {
    constructor(source) {
        this.source = source;
    }
    replace(searchValue, replaceValue) {
        this.source = this.source.replace(searchValue, replaceValue);
        return this;
    }
    value() {
        return this.source;
    }
}
//# sourceMappingURL=rewrite-dropdown-template.js.map