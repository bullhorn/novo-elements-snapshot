import { Migration } from '@angular/cdk/schematics';
import * as ts from 'typescript';
/**
 * Migration that checks for classes that extend Angular Material classes which
 * have changed their API.
 */
export declare class MiscClassInheritanceMigration extends Migration<null> {
    enabled: boolean;
    visitNode(node: ts.Node): void;
    private _visitClassDeclaration;
}
