import { ClassNameUpgradeData, DevkitMigration, UpgradeData } from '@angular/cdk/schematics';
import * as ts from 'typescript';
export declare class ClassNamesMigration extends DevkitMigration<UpgradeData> {
    /** Change data that upgrades to the specified target version. */
    data: ClassNameUpgradeData[];
    /**
     * List of identifier names that have been imported from `@ng-zorro-antd`
     * in the current source file and therefore can be considered trusted.
     */
    trustedIdentifiers: Set<string>;
    /** List of namespaces that have been imported from `@ng-zorro-antd`. */
    trustedNamespaces: Set<string>;
    enabled: boolean;
    visitNode(node: ts.Node): void;
    /** Method that is called for every identifier inside of the specified project. */
    private visitIdentifier;
    /** Creates a failure and replacement for the specified identifier. */
    private _createFailureWithReplacement;
}
