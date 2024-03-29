import { EventEmitter } from '@angular/core';
export declare class NovoAgendaDateChangeElement {
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
}
