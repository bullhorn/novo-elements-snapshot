import { NovoLabelService } from '../../services/novo-label-service';
import * as ɵngcc0 from '@angular/core';
export declare class DateFormatService {
    private labels;
    constructor(labels: NovoLabelService);
    getTimeMask(militaryTime: boolean): Array<RegExp>;
    getDateMask(): Array<RegExp>;
    getDateTimeMask(militaryTime?: boolean): Array<RegExp>;
    getTimePlaceHolder(militaryTime: boolean): string;
    parseDateString(dateString: string): [Date, string];
    parseTimeString(timeString: string, militaryTime: boolean): [Date, string];
    parseString(dateTimeString: string, militaryTime: boolean, type: string): [Date, string];
    isValidDatePart(value: string, format: string): boolean;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DateFormatService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<DateFormatService>;
}

//# sourceMappingURL=DateFormat.d.ts.map