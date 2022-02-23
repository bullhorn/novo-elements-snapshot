import * as ts from 'typescript';
/** Name of the Novo Elements module specifier. */
export declare const novoElementsModuleSpecifier = "novo-elements";
/** Whether the specified node is part of an Novo Elements or CDK import declaration. */
export declare function isNovoElementsImportDeclaration(node: ts.Node): boolean;
/** Whether the specified node is part of an Novo Elements or CDK import declaration. */
export declare function isNovoElementsExportDeclaration(node: ts.Node): boolean;
