"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outputNames = void 0;
const schematics_1 = require("@angular/cdk/schematics");
exports.outputNames = {
    [schematics_1.TargetVersion.V6]: [
        {
            pr: 'https://github.com/angular/components/pull/10163',
            changes: [
                {
                    replace: 'change',
                    replaceWith: 'selectionChange',
                    limitedTo: {
                        elements: ['novo-select'],
                    },
                },
            ],
        },
    ],
};
//# sourceMappingURL=output-names.js.map