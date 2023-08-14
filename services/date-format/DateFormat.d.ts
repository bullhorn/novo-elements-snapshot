import { NovoLabelService } from '../novo-label-service';
import * as i0 from "@angular/core";
export declare class DateFormatService {
    private labels;
    constructor(labels: NovoLabelService);
    getTimeMask(militaryTime: boolean): Array<RegExp>;
    getDateMask(): Array<RegExp>;
    getDateTimeMask(militaryTime?: boolean): Array<RegExp>;
    getTimePlaceHolder(militaryTime: boolean): string;
    parseDateString(dateString: string): [Date, string, boolean];
    parseTimeString(timeString: string, militaryTime: boolean): [Date, string];
    parseString(dateTimeString: string, militaryTime: boolean, type: string): [Date, string, boolean?];
    isValidDatePart(value: string, format: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateFormatService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DateFormatService>;
}
