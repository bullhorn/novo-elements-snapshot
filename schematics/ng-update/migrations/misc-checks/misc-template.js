"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiscTemplateMigration = void 0;
const schematics_1 = require("@angular/cdk/schematics");
/**
 * Migration that walks through every inline or external template and reports if there
 * are outdated usages of the Angular Material API that needs to be updated manually.
 */
class MiscTemplateMigration extends schematics_1.Migration {
    constructor() {
        super(...arguments);
        // Only enable this rule if the migration targets version 6. The rule
        // currently only includes migrations for V6 deprecations.
        this.enabled = this.targetVersion === schematics_1.TargetVersion.V6;
    }
    visitTemplate(template) {
        // Migration for: https://github.com/angular/components/pull/10398 (v6)
        (0, schematics_1.findOutputsOnElementWithTag)(template.content, 'selectionChange', ['mat-list-option']).forEach((offset) => {
            this.failures.push({
                filePath: template.filePath,
                position: template.getCharacterAndLineOfPosition(template.start + offset),
                message: `Found deprecated "selectionChange" output binding on "mat-list-option". ` +
                    `Use "selectionChange" on "mat-selection-list" instead.`,
            });
        });
        // Migration for: https://github.com/angular/components/pull/10413 (v6)
        (0, schematics_1.findOutputsOnElementWithTag)(template.content, 'selectedChanged', ['mat-datepicker']).forEach((offset) => {
            this.failures.push({
                filePath: template.filePath,
                position: template.getCharacterAndLineOfPosition(template.start + offset),
                message: `Found deprecated "selectedChanged" output binding on "mat-datepicker". ` +
                    `Use "dateChange" or "dateInput" on "<input [matDatepicker]>" instead.`,
            });
        });
        // Migration for: https://github.com/angular/components/commit/f0bf6e7 (v6)
        (0, schematics_1.findInputsOnElementWithTag)(template.content, 'selected', ['mat-button-toggle-group']).forEach((offset) => {
            this.failures.push({
                filePath: template.filePath,
                position: template.getCharacterAndLineOfPosition(template.start + offset),
                message: `Found deprecated "selected" input binding on "mat-radio-button-group". ` + `Use "value" instead.`,
            });
        });
    }
}
exports.MiscTemplateMigration = MiscTemplateMigration;
//# sourceMappingURL=misc-template.js.map