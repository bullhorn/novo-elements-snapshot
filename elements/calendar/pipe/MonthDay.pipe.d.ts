import { PipeTransform } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class MonthDayPipe implements PipeTransform {
    private locale;
    constructor(locale?: string);
    transform(date: Date, locale?: string, method?: string): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MonthDayPipe, never>;
    static ɵpipe: ɵngcc0.ɵɵPipeDefWithMeta<MonthDayPipe, "monthday">;
}

//# sourceMappingURL=MonthDay.pipe.d.ts.map