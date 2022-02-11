import { DevkitMigration, ResolvedResource, UpgradeData } from '@angular/cdk/schematics';
import { ScssVariableData } from '../../data';
/** Migration that replaces scss variable names that have changed. */
export declare class ScssVariablesMigration extends DevkitMigration<UpgradeData> {
    data: ScssVariableData[];
    enabled: boolean;
    visitStylesheet(stylesheet: ResolvedResource): void;
    private _replaceSelector;
}
