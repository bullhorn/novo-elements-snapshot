import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class MonthPipe implements PipeTransform {
    private locale;
    constructor(locale?: string);
    transform(date: Date, locale?: string, method?: string): string;
    static ɵfac: i0.ɵɵFactoryDef<MonthPipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<MonthPipe, "month">;
}
