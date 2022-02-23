"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScssVariablesMigration = void 0;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular/cdk/schematics");
/** Migration that replaces scss variable names that have changed. */
class ScssVariablesMigration extends schematics_1.DevkitMigration {
    constructor() {
        super(...arguments);
        // @ts-ignore
        this.data = schematics_1.getVersionUpgradeData(this, 'scssVariables');
        this.enabled = this.targetVersion === schematics_1.TargetVersion.V6;
    }
    /*override*/ visitStylesheet(stylesheet) {
        const extension = core_1.extname(stylesheet.filePath);
        if (extension === '.scss' || extension === '.css') {
            this.data.forEach((data) => {
                if (data.replaceIn && !data.replaceIn.stylesheet) {
                    return;
                }
                schematics_1.findAllSubstringIndices(stylesheet.content, data.replace)
                    .map((offset) => stylesheet.start + offset)
                    .forEach((start) => this._replaceSelector(stylesheet.filePath, start, data));
            });
        }
    }
    _replaceSelector(filePath, start, data) {
        this.fileSystem.edit(filePath).remove(start, data.replace.length).insertRight(start, data.replaceWith);
    }
}
exports.ScssVariablesMigration = ScssVariablesMigration;
//# sourceMappingURL=scss-variables.js.map