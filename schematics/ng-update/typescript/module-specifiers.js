"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNovoElementsExportDeclaration = exports.isNovoElementsImportDeclaration = exports.novoElementsModuleSpecifier = void 0;
const schematics_1 = require("@angular/cdk/schematics");
/** Name of the Novo Elements module specifier. */
exports.novoElementsModuleSpecifier = 'novo-elements';
/** Whether the specified node is part of an Novo Elements or CDK import declaration. */
function isNovoElementsImportDeclaration(node) {
    return isNovoElementsDeclaration(schematics_1.getImportDeclaration(node));
}
exports.isNovoElementsImportDeclaration = isNovoElementsImportDeclaration;
/** Whether the specified node is part of an Novo Elements or CDK import declaration. */
function isNovoElementsExportDeclaration(node) {
    return isNovoElementsDeclaration(schematics_1.getExportDeclaration(node));
}
exports.isNovoElementsExportDeclaration = isNovoElementsExportDeclaration;
/** Whether the declaration is part of Novo Elements. */
function isNovoElementsDeclaration(declaration) {
    if (!declaration.moduleSpecifier) {
        return false;
    }
    const moduleSpecifier = declaration.moduleSpecifier.getText();
    return moduleSpecifier.indexOf(exports.novoElementsModuleSpecifier) !== -1;
}
//# sourceMappingURL=module-specifiers.js.map