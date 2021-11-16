import { PipeTransform } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class HoursPipe implements PipeTransform {
    private locale;
    constructor(locale?: string);
    transform(date: Date, locale?: string, method?: string): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<HoursPipe, never>;
    static ɵpipe: ɵngcc0.ɵɵPipeDefWithMeta<HoursPipe, "hours">;
}

//# sourceMappingURL=Hours.pipe.d.ts.map