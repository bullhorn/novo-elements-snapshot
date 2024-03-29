"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyNames = void 0;
const schematics_1 = require("@angular/cdk/schematics");
exports.propertyNames = {
    [schematics_1.TargetVersion.V6]: [
        {
            pr: 'https://github.com/bullhorn/novo-elements/pull/1241',
            changes: [
                {
                    replace: '_onClosed',
                    replaceWith: 'onClosed',
                    limitedTo: { classes: ['NovoModalRef'] },
                },
            ],
        },
    ],
};
//# sourceMappingURL=property-names.js.map