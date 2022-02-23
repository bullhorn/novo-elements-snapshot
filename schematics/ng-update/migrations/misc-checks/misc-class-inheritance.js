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
exports.MiscClassInheritanceMigration = void 0;
const schematics_1 = require("@angular/cdk/schematics");
const ts = __importStar(require("typescript"));
/**
 * Migration that checks for classes that extend Angular Material classes which
 * have changed their API.
 */
class MiscClassInheritanceMigration extends schematics_1.Migration {
    constructor() {
        super(...arguments);
        // Only enable this rule if the migration targets version 6. The rule
        // currently only includes migrations for V6 deprecations.
        this.enabled = this.targetVersion === schematics_1.TargetVersion.V6;
    }
    visitNode(node) {
        if (ts.isClassDeclaration(node)) {
            this._visitClassDeclaration(node);
        }
    }
    _visitClassDeclaration(node) {
        const baseTypes = schematics_1.determineBaseTypes(node);
        const className = node.name ? node.name.text : '{unknown-name}';
        if (!baseTypes) {
            return;
        }
        // Migration for: https://github.com/angular/components/pull/10293 (v6)
        if (baseTypes.includes('MatFormFieldControl')) {
            const hasFloatLabelMember = node.members
                .filter((member) => member.name)
                .find((member) => member.name.getText() === 'shouldLabelFloat');
            if (!hasFloatLabelMember) {
                this.createFailureAtNode(node, `Found class "${className}" which extends ` +
                    `"${'MatFormFieldControl'}". This class must define ` +
                    `"${'shouldLabelFloat'}" which is now a required property.`);
            }
        }
    }
}
exports.MiscClassInheritanceMigration = MiscClassInheritanceMigration;
//# sourceMappingURL=misc-class-inheritance.js.map