import { Migration } from '@angular/cdk/schematics';
import * as ts from 'typescript';
/**
 * Migration that updates imports which refer to the primary Novo Elements
 * entry-point to use the appropriate secondary entry points (e.g. novo-elements/button).
 */
export declare class SecondaryEntryPointsMigration extends Migration<null> {
    printer: ts.Printer;
    enabled: boolean;
    visitNode(declaration: ts.Node): void;
}
