import { DevkitMigration, ResolvedResource } from '@angular/cdk/schematics';
/** Migration that changes variable file location. */
export declare class ImportVariableFileMigration extends DevkitMigration<null> {
    enabled: boolean;
    visitStylesheet(stylesheet: ResolvedResource): void;
}
