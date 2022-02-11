import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class DayOfMonthPipe implements PipeTransform {
    private locale;
    constructor(locale?: string);
    transform(date: Date, locale?: string, method?: string): string;
    static ɵfac: i0.ɵɵFactoryDef<DayOfMonthPipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<DayOfMonthPipe, "dayofmonth">;
}
