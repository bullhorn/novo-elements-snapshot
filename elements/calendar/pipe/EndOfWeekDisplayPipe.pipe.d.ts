import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class EndOfWeekDisplayPipe implements PipeTransform {
    private locale;
    constructor(locale?: string);
    transform(endOfWeek: Date, startOfWeek: Date, locale?: string, method?: string): String;
    static ɵfac: i0.ɵɵFactoryDef<EndOfWeekDisplayPipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<EndOfWeekDisplayPipe, "endofweekdisplay">;
}
