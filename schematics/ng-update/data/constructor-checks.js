"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructorChecks = void 0;
const schematics_1 = require("@angular/cdk/schematics");
/**
 * List of class names for which the constructor signature has been changed. The new constructor
 * signature types don't need to be stored here because the signature will be determined
 * automatically through type checking.
 */
exports.constructorChecks = {
    [schematics_1.TargetVersion.V6]: [
        {
            pr: 'https://github.com/bullhorn/novo-elements/pull/1241',
            changes: ['NativeDateAdapter'],
        },
        {
            pr: 'https://github.com/bullhorn/novo-elements/pull/1241',
            changes: ['MatAutocomplete'],
        },
        {
            pr: 'https://github.com/bullhorn/novo-elements/pull/1241',
            changes: ['MatTooltip'],
        },
        {
            pr: 'https://github.com/bullhorn/novo-elements/pull/1241',
            changes: ['MatIconRegistry'],
        },
        {
            pr: 'https://github.com/bullhorn/novo-elements/pull/1241',
            changes: ['MatCalendar'],
        },
    ],
};
//# sourceMappingURL=constructor-checks.js.map