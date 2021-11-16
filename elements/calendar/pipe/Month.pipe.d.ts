import { PipeTransform } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class MonthPipe implements PipeTransform {
    private locale;
    constructor(locale?: string);
    transform(date: Date, locale?: string, method?: string): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MonthPipe, never>;
    static ɵpipe: ɵngcc0.ɵɵPipeDefWithMeta<MonthPipe, "month">;
}

//# sourceMappingURL=Month.pipe.d.ts.map