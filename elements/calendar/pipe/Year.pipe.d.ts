import { PipeTransform } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class YearPipe implements PipeTransform {
    private locale;
    constructor(locale?: string);
    transform(date: Date, locale?: string, method?: string): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<YearPipe, never>;
    static ɵpipe: ɵngcc0.ɵɵPipeDefWithMeta<YearPipe, "year">;
}

//# sourceMappingURL=Year.pipe.d.ts.map