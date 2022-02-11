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
exports.MiscPropertyNamesMigration = void 0;
const schematics_1 = require("@angular/cdk/schematics");
const ts = __importStar(require("typescript"));
/**
 * Migration that walks through every property access expression and and reports a failure if
 * a given property name no longer exists but cannot be automatically migrated.
 */
class MiscPropertyNamesMigration extends schematics_1.Migration {
    constructor() {
        super(...arguments);
        // Only enable this rule if the migration targets version 6. The rule
        // currently only includes migrations for V6 deprecations.
        this.enabled = this.targetVersion === schematics_1.TargetVersion.V6;
    }
    visitNode(node) {
        if (ts.isPropertyAccessExpression(node)) {
            this._visitPropertyAccessExpression(node);
        }
    }
    _visitPropertyAccessExpression(node) {
        const hostType = this.typeChecker.getTypeAtLocation(node.expression);
        const typeName = hostType && hostType.symbol && hostType.symbol.getName();
        // Migration for: https://github.com/angular/components/pull/10398 (v6)
        if (typeName === 'MatListOption' && node.name.text === 'selectionChange') {
            this.createFailureAtNode(node, `Found deprecated property "selectionChange" of ` +
                `class "MatListOption". Use the "selectionChange" property on the ` +
                `parent "MatSelectionList" instead.`);
        }
        // Migration for: https://github.com/angular/components/pull/10413 (v6)
        if (typeName === 'MatDatepicker' && node.name.text === 'selectedChanged') {
            this.createFailureAtNode(node, `Found deprecated property "selectedChanged" of ` +
                `class "MatDatepicker". Use the "dateChange" or "dateInput" methods ` +
                `on "MatDatepickerInput" instead.`);
        }
    }
}
exports.MiscPropertyNamesMigration = MiscPropertyNamesMigration;
//# sourceMappingURL=misc-property-names.js.map