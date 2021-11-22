"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyNames = void 0;
const schematics_1 = require("@angular/cdk/schematics");
exports.propertyNames = {
    [schematics_1.TargetVersion.V6]: [
        {
            pr: 'https://github.com/angular/components/pull/10163',
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