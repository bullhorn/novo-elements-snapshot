import { PipeTransform } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class EndOfWeekDisplayPipe implements PipeTransform {
    private locale;
    constructor(locale?: string);
    transform(endOfWeek: Date, startOfWeek: Date, locale?: string, method?: string): String;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<EndOfWeekDisplayPipe, never>;
    static ɵpipe: ɵngcc0.ɵɵPipeDefWithMeta<EndOfWeekDisplayPipe, "endofweekdisplay">;
}

//# sourceMappingURL=EndOfWeekDisplayPipe.pipe.d.ts.map