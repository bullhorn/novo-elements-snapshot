import { Migration } from '@angular/cdk/schematics';
import * as ts from 'typescript';
/**
 * Migration that looks for class name identifiers that have been removed but
 * cannot be automatically migrated.
 */
export declare class MiscClassNamesMigration extends Migration<null> {
    enabled: boolean;
    visitNode(node: ts.Node): void;
    private _visitIdentifier;
}
