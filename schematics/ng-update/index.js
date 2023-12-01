"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateToV7 = exports.updateToV6 = void 0;
const schematics_1 = require("@angular/cdk/schematics");
const class_names_1 = require("./migrations/all/class-names");
const scss_variables_1 = require("./migrations/all/scss-variables");
const direct_imports_1 = require("./migrations/v6/direct-imports");
const import_variable_file_1 = require("./migrations/v6/import-variable-file");
const rewrite_dropdown_template_1 = require("./migrations/v6/rewrite-dropdown-template");
const upgrade_data_1 = require("./upgrade-data");
const novoElementMigrations = [
    scss_variables_1.ScssVariablesMigration,
    import_variable_file_1.ImportVariableFileMigration,
    rewrite_dropdown_template_1.RewriteDropdownMigration,
    direct_imports_1.DirectImportsMigration,
    class_names_1.ClassNamesMigration,
    // MiscClassInheritanceMigration,
    // MiscClassNamesMigration,
    // MiscImportsMigration,
    // MiscPropertyNamesMigration,
    // MiscTemplateMigration,
];
/** Entry point for the migration schematics with target of Novo Elements v6 */
function updateToV6() {
    return (0, schematics_1.createMigrationSchematicRule)(schematics_1.TargetVersion.V6, novoElementMigrations, upgrade_data_1.elementsUpgradeData, onMigrationComplete);
}
exports.updateToV6 = updateToV6;
/** Entry point for the migration schematics with target of Novo Elements v7 */
function updateToV7() {
    return (0, schematics_1.createMigrationSchematicRule)(schematics_1.TargetVersion.V7, novoElementMigrations, upgrade_data_1.elementsUpgradeData, onMigrationComplete);
}
exports.updateToV7 = updateToV7;
/** Function that will be called when the migration completed. */
function onMigrationComplete(context, targetVersion, hasFailures) {
    context.logger.info('');
    context.logger.info(`  ✓  Updated Novo Elements to ${targetVersion}`);
    context.logger.info('');
    if (hasFailures) {
        context.logger.warn('  ⚠  Some issues were detected but could not be fixed automatically. Please check the ' +
            'output above and fix these issues manually.');
    }
}
//# sourceMappingURL=index.js.map