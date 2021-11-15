import { PipeTransform } from '@angular/core';
declare type IsoTimeRangeArgs = (string | Date)[];
export declare class IsoTimeRangePipe implements PipeTransform {
    constructor();
    transform(dates: IsoTimeRangeArgs): string;
}
export {};
