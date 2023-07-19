"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassNamesMigration = void 0;
const schematics_1 = require("@angular/cdk/schematics");
const ts = __importStar(require("typescript"));
const module_specifiers_1 = require("../../typescript/module-specifiers");
class ClassNamesMigration extends schematics_1.DevkitMigration {
    constructor() {
        super(...arguments);
        /** Change data that upgrades to the specified target version. */
        // @ts-ignore
        this.data = (0, schematics_1.getVersionUpgradeData)(this, 'classNames');
        /**
         * List of identifier names that have been imported from `@ng-zorro-antd`
         * in the current source file and therefore can be considered trusted.
         */
        this.trustedIdentifiers = new Set();
        /** List of namespaces that have been imported from `@ng-zorro-antd`. */
        this.trustedNamespaces = new Set();
        // Only enable the migration rule if there is upgrade data.
        this.enabled = this.data.length !== 0;
    }
    visitNode(node) {
        if (ts.isIdentifier(node)) {
            this.visitIdentifier(node);
        }
    }
    /** Method that is called for every identifier inside of the specified project. */
    visitIdentifier(identifier) {
        if (!this.data.some((data) => data.replace === identifier.text)) {
            return;
        }
        if ((0, schematics_1.isNamespaceImportNode)(identifier) && (0, module_specifiers_1.isNovoElementsImportDeclaration)(identifier)) {
            this.trustedNamespaces.add(identifier.text);
            return this._createFailureWithReplacement(identifier);
        }
        if ((0, schematics_1.isExportSpecifierNode)(identifier) && (0, module_specifiers_1.isNovoElementsExportDeclaration)(identifier)) {
            return this._createFailureWithReplacement(identifier);
        }
        if ((0, schematics_1.isImportSpecifierNode)(identifier) && (0, module_specifiers_1.isNovoElementsImportDeclaration)(identifier)) {
            this.trustedIdentifiers.add(identifier.text);
            return this._createFailureWithReplacement(identifier);
        }
        if (ts.isPropertyAccessExpression(identifier.parent)) {
            const expression = identifier.parent.expression;
            if (ts.isIdentifier(expression) && this.trustedNamespaces.has(expression.text)) {
                return this._createFailureWithReplacement(identifier);
            }
        }
        else if (this.trustedIdentifiers.has(identifier.text)) {
            return this._createFailureWithReplacement(identifier);
        }
    }
    /** Creates a failure and replacement for the specified identifier. */
    _createFailureWithReplacement(identifier) {
        const classData = this.data.find((data) => data.replace === identifier.text);
        const filePath = this.fileSystem.resolve(identifier.getSourceFile().fileName);
        this.fileSystem
            .edit(filePath)
            .remove(identifier.getStart(), identifier.getWidth())
            .insertRight(identifier.getStart(), classData.replaceWith);
    }
}
exports.ClassNamesMigration = ClassNamesMigration;
//# sourceMappingURL=class-names.js.map