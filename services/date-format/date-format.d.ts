import { MaskedEnum, MaskedRange } from 'imask';
import { NovoLabelService } from '../labels/novo-label-service';
import * as i0 from "@angular/core";
export declare class DateFormatService {
    private labels;
    constructor(labels: NovoLabelService);
    getTimeMask(militaryTime: boolean): {
        mask: DateConstructor;
        pattern: string;
        overwrite: boolean;
        autofix: boolean;
        lazy: boolean;
        min: Date;
        max: Date;
        prepare(str: any): any;
        format(date: any): string;
        parse: (str: any) => Date;
        blocks: {
            HH: {
                mask: typeof MaskedRange;
                placeholderChar: string;
                maxLength: number;
                from: number;
                to: number;
            };
            hh: {
                mask: typeof MaskedRange;
                placeholderChar: string;
                maxLength: number;
                from: number;
                to: number;
            };
            mm: {
                mask: typeof MaskedRange;
                placeholderChar: string;
                maxLength: number;
                from: number;
                to: number;
            };
            aa: {
                mask: typeof MaskedEnum;
                placeholderChar: string;
                enum: string[];
            };
        };
    };
    getDateMask(format?: string): {
        mask: DateConstructor;
        pattern: string;
        overwrite: boolean;
        autofix: string;
        min: Date;
        max: Date;
        prepare(str: any): any;
        format(date: any): string;
        parse: (str: any) => Date;
    };
    getDateTimeMask(militaryTime?: boolean): Array<any>;
    getTimePlaceHolder(militaryTime: boolean): string;
    parseDateString(dateString: string): [Date, string, boolean];
    parseTimeString(timeString: string, militaryTime: boolean): [Date, string];
    parseString(dateTimeString: string, militaryTime: boolean, type: string): [Date, string, boolean?];
    convertTime12to24(time12h: string): string;
    isValidDatePart(value: string, format: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateFormatService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DateFormatService>;
}
