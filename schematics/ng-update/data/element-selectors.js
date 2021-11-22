"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.elementSelectors = void 0;
const schematics_1 = require("@angular/cdk/schematics");
exports.elementSelectors = {
    [schematics_1.TargetVersion.V6]: [
        {
            pr: 'https://github.com/angular/components/pull/10297',
            changes: [
                // { replace: 'button', replaceWith: 'novo-button' },
                // { replace: 'header', replaceWith: 'novo-header' },
                // { replace: 'utils', replaceWith: 'novo-utils' },
                { replace: 'util-action', replaceWith: 'novo-action' },
                { replace: 'novo-calendar-day', replaceWith: 'novo-agenda-day' },
                { replace: 'novo-calendar-week', replaceWith: 'novo-agenda-week' },
                { replace: 'novo-calendar-month', replaceWith: 'novo-agenda-month' },
                { replace: 'novo-calendar-date-change', replaceWith: 'novo-agenda-date-change' },
            ],
        },
    ],
};
//# sourceMappingURL=element-selectors.js.map