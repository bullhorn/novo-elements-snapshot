import { PipeTransform } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class WeekdayPipe implements PipeTransform {
    private locale;
    constructor(locale?: string);
    transform(date: Date, locale?: string, method?: string): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<WeekdayPipe, never>;
    static ɵpipe: ɵngcc0.ɵɵPipeDefWithMeta<WeekdayPipe, "weekday">;
}

//# sourceMappingURL=Weekday.pipe.d.ts.map