import { DevkitMigration, ResolvedResource } from '@angular/cdk/schematics';
import * as ts from 'typescript';
/**
 * Migration that walks through every string literal, template and stylesheet in order
 * to migrate outdated element selectors to the new one.
 */
export declare class RewriteDropdownMigration extends DevkitMigration<null> {
    enabled: boolean;
    visitNode(node: ts.Node): void;
    visitTemplate(template: ResolvedResource): void;
    private _visitStringLiteralLike;
    private _rewriteDropDown;
}
