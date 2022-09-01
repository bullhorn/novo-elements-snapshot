import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
declare type IsoDateRangeArgs = (string | Date)[];
export declare class IsoDateRangePipe implements PipeTransform {
    constructor();
    transform(dates: IsoDateRangeArgs): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<IsoDateRangePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<IsoDateRangePipe, "isoDateRange">;
}
export {};
