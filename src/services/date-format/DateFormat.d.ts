import { NovoLabelService } from '../../services/novo-label-service';
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
}
