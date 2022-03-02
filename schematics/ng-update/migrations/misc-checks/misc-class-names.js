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
exports.MiscClassNamesMigration = void 0;
const schematics_1 = require("@angular/cdk/schematics");
const ts = __importStar(require("typescript"));
/**
 * Migration that looks for class name identifiers that have been removed but
 * cannot be automatically migrated.
 */
class MiscClassNamesMigration extends schematics_1.Migration {
    constructor() {
        super(...arguments);
        // Only enable this rule if the migration targets version 6. The rule
        // currently only includes migrations for V6 deprecations.
        this.enabled = this.targetVersion === schematics_1.TargetVersion.V6;
    }
    visitNode(node) {
        if (ts.isIdentifier(node)) {
            this._visitIdentifier(node);
        }
    }
    _visitIdentifier(identifier) {
        // Migration for: https://github.com/angular/components/pull/10279 (v6)
        if (identifier.getText() === 'MatDrawerToggleResult') {
            this.createFailureAtNode(identifier, `Found "MatDrawerToggleResult" which has changed from a class type to a string ` +
                `literal type. Your code may need to be updated.`);
        }
        // Migration for: https://github.com/angular/components/pull/10398 (v6)
        if (identifier.getText() === 'MatListOptionChange') {
            this.createFailureAtNode(identifier, `Found usage of "MatListOptionChange" which has been removed. Please listen for ` +
                `"selectionChange" on "MatSelectionList" instead.`);
        }
    }
}
exports.MiscClassNamesMigration = MiscClassNamesMigration;
//# sourceMappingURL=misc-class-names.js.map