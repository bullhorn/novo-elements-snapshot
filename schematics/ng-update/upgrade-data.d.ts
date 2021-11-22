import { UpgradeData, VersionChanges } from '@angular/cdk/schematics';
import { ScssVariableData } from './data';
export interface NovoUpgradeData extends UpgradeData {
    scssVariables: VersionChanges<ScssVariableData>;
}
/** Upgrade data that will be used for the Novo Elements ng-update schematic. */
export declare const elementsUpgradeData: NovoUpgradeData;
