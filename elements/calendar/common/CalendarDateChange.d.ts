import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
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
    static ɵfac: i0.ɵɵFactoryDef<NovoCalendarDateChangeElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoCalendarDateChangeElement, "novo-calendar-date-change", never, { "view": "view"; "viewDate": "viewDate"; "locale": "locale"; }, { "viewDateChange": "viewDateChange"; }, never, never>;
}
