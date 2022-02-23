"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportVariableFileMigration = void 0;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular/cdk/schematics");
/** Migration that changes variable file location. */
class ImportVariableFileMigration extends schematics_1.DevkitMigration {
    constructor() {
        super(...arguments);
        this.enabled = this.targetVersion === schematics_1.TargetVersion.V6;
    }
    /*override*/ visitStylesheet(stylesheet) {
        const extension = core_1.extname(stylesheet.filePath);
        if (extension === '.scss' || extension === '.sass') {
            const content = stylesheet.content;
            const replaceObj = {
                '~novo-elements/styles/global/variables': 'styles/variables',
                '../../../../../node_modules/novo-elements/styles/global/variables': 'styles/variables',
                'styles/global/variables': 'styles/variables',
            };
            var replaceStrings = new RegExp(Object.keys(replaceObj).join('|'), 'gi');
            const migratedContent = content.replace(replaceStrings, function (matched) {
                return replaceObj[matched];
            });
            if (migratedContent && migratedContent !== content) {
                this.fileSystem.edit(stylesheet.filePath).remove(0, stylesheet.content.length).insertLeft(0, migratedContent);
            }
        }
    }
}
exports.ImportVariableFileMigration = ImportVariableFileMigration;
//# sourceMappingURL=import-variable-file.js.map