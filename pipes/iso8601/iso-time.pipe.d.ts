import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class IsoTimePipe implements PipeTransform {
    constructor();
    transform(date: string | Date): string;
    static ɵfac: i0.ɵɵFactoryDef<IsoTimePipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<IsoTimePipe, "isoTime">;
}
