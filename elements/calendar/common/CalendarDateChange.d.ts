import { EventEmitter } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class NovoCalendarDateChangeElement {
    /**
     * The current view
     */
    view: string;
    /**
     * The current view date
     */
    viewDate: Date;
    locale: string;
    /**
     * Called when the view date is changed
     */
    viewDateChange: EventEmitter<Date>;
    constructor(locale: string);
    /**
     * @hidden
     */
    subtractDate(): void;
    addDate(): void;
    changeDate(unit: number): void;
    get startOfWeek(): Date;
    get endOfWeek(): Date;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoCalendarDateChangeElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoCalendarDateChangeElement, "novo-calendar-date-change", never, { "locale": "locale"; "view": "view"; "viewDate": "viewDate"; }, { "viewDateChange": "viewDateChange"; }, never, never>;
}

//# sourceMappingURL=CalendarDateChange.d.ts.map