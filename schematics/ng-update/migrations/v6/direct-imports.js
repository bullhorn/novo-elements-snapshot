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
exports.DirectImportsMigration = void 0;
const schematics_1 = require("@angular/cdk/schematics");
const ts = __importStar(require("typescript"));
const module_specifiers_1 = require("../../../ng-update/typescript/module-specifiers");
const NO_IMPORT_NAMED_SYMBOLS_FAILURE_STR = `Imports from Novo Elements should import ` + `specific symbols rather than importing the entire library.`;
/**
 * Migration that updates imports to root library. Submodules will be added next version
 */
class DirectImportsMigration extends schematics_1.DevkitMigration {
    constructor() {
        super(...arguments);
        this.printer = ts.createPrinter();
        // Only enable this rule if the migration targets version 6.
        this.enabled = this.targetVersion === schematics_1.TargetVersion.V6;
    }
    visitNode(declaration) {
        // Only look at import declarations.
        if (!ts.isImportDeclaration(declaration) || !ts.isStringLiteralLike(declaration.moduleSpecifier)) {
            return;
        }
        const importLocation = declaration.moduleSpecifier.text;
        // If the import module is not novo-elements, skip the check.
        if (!importLocation.startsWith(module_specifiers_1.novoElementsModuleSpecifier) || importLocation === module_specifiers_1.novoElementsModuleSpecifier) {
            return;
        }
        // If no import clause is found, or nothing is named as a binding in the
        // import, add failure saying to import symbols in clause.
        if (!declaration.importClause || !declaration.importClause.namedBindings) {
            this.createFailureAtNode(declaration, NO_IMPORT_NAMED_SYMBOLS_FAILURE_STR);
            return;
        }
        // All named bindings in import clauses must be named symbols, otherwise add
        // failure saying to import symbols in clause.
        if (!ts.isNamedImports(declaration.importClause.namedBindings)) {
            this.createFailureAtNode(declaration, NO_IMPORT_NAMED_SYMBOLS_FAILURE_STR);
            return;
        }
        // If no symbols are in the named bindings then add failure saying to
        // import symbols in clause.
        if (!declaration.importClause.namedBindings.elements.length) {
            this.createFailureAtNode(declaration, NO_IMPORT_NAMED_SYMBOLS_FAILURE_STR);
            return;
        }
        // Whether the existing import declaration is using a single quote module specifier.
        const singleQuoteImport = declaration.moduleSpecifier.getText()[0] === `'`;
        const elements = declaration.importClause.namedBindings.elements;
        const newImport = ts.createImportDeclaration(undefined, undefined, ts.createImportClause(undefined, ts.createNamedImports(elements)), createStringLiteral(`${module_specifiers_1.novoElementsModuleSpecifier}`, singleQuoteImport));
        const newImportStatement = this.printer.printNode(ts.EmitHint.Unspecified, newImport, declaration.getSourceFile());
        const filePath = this.fileSystem.resolve(declaration.moduleSpecifier.getSourceFile().fileName);
        const recorder = this.fileSystem.edit(filePath);
        // Perform the replacement that switches the import statement.
        recorder.remove(declaration.getStart(), declaration.getWidth());
        recorder.insertRight(declaration.getStart(), newImportStatement);
    }
}
exports.DirectImportsMigration = DirectImportsMigration;
/**
 * Creates a string literal from the specified text.
 * @param text Text of the string literal.
 * @param singleQuotes Whether single quotes should be used when printing the literal node.
 */
function createStringLiteral(text, singleQuotes) {
    const literal = ts.createStringLiteral(text);
    literal.singleQuote = singleQuotes;
    return literal;
}
//# sourceMappingURL=direct-imports.js.map