import { DevkitMigration } from '@angular/cdk/schematics';
import * as ts from 'typescript';
/**
 * Migration that updates imports to root library. Submodules will be added next version
 */
export declare class DirectImportsMigration extends DevkitMigration<null> {
    printer: ts.Printer;
    enabled: boolean;
    visitNode(declaration: ts.Node): void;
}
