import { PipeTransform } from '@angular/core';
declare type IsoDateRangeArgs = (string | Date)[];
export declare class IsoDateRangePipe implements PipeTransform {
    constructor();
    transform(dates: IsoDateRangeArgs): string;
}
export {};
