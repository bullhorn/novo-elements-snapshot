"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classNames = void 0;
const schematics_1 = require("@angular/cdk/schematics");
exports.classNames = {
    [schematics_1.TargetVersion.V6]: [
        {
            pr: 'https://github.com/bullhorn/novo-elements/pull/1241',
            changes: [
                { replace: 'NovoCalendarMonthViewElement', replaceWith: 'NovoAgendaMonthViewElement' },
                { replace: 'NovoCalendarWeekViewElement', replaceWith: 'NovoAgendaWeekViewElement' },
                { replace: 'NovoCalendarDayViewElement', replaceWith: 'NovoAgendaDayViewElement' },
            ],
        },
    ],
};
//# sourceMappingURL=class-names.js.map