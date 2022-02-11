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
exports.MiscImportsMigration = void 0;
const schematics_1 = require("@angular/cdk/schematics");
const ts = __importStar(require("typescript"));
/**
 * Migration that detects import declarations that refer to outdated identifiers from
 * Angular Material which cannot be updated automatically.
 */
class MiscImportsMigration extends schematics_1.Migration {
    constructor() {
        super(...arguments);
        // Only enable this rule if the migration targets version 6. The rule
        // currently only includes migrations for V6 deprecations.
        this.enabled = this.targetVersion === schematics_1.TargetVersion.V6;
    }
    visitNode(node) {
        if (ts.isImportDeclaration(node)) {
            this._visitImportDeclaration(node);
        }
    }
    _visitImportDeclaration(node) {
        if (!schematics_1.isMaterialImportDeclaration(node) || !node.importClause || !node.importClause.namedBindings) {
            return;
        }
        const namedBindings = node.importClause.namedBindings;
        if (ts.isNamedImports(namedBindings)) {
            // Migration for: https://github.com/angular/components/pull/10405 (v6)
            this._checkAnimationConstants(namedBindings);
        }
    }
    /**
     * Checks for named imports that refer to the deleted animation constants.
     * https://github.com/angular/components/commit/9f3bf274c4f15f0b0fbd8ab7dbf1a453076e66d9
     */
    _checkAnimationConstants(namedImports) {
        namedImports.elements
            .filter((element) => ts.isIdentifier(element.name))
            .forEach((element) => {
            const importName = element.name.text;
            if (importName === 'SHOW_ANIMATION' || importName === 'HIDE_ANIMATION') {
                this.createFailureAtNode(element, `Found deprecated symbol "${importName}" which has been removed`);
            }
        });
    }
}
exports.MiscImportsMigration = MiscImportsMigration;
//# sourceMappingURL=misc-imports.js.map