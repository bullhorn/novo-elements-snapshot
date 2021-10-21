import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
declare type IsoTimeRangeArgs = (string | Date)[];
export declare class IsoTimeRangePipe implements PipeTransform {
    constructor();
    transform(dates: IsoTimeRangeArgs): string;
    static ɵfac: i0.ɵɵFactoryDef<IsoTimeRangePipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<IsoTimeRangePipe, "isoTimeRange">;
}
export {};
