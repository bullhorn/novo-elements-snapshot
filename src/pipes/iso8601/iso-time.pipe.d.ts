import { PipeTransform } from '@angular/core';
export declare class IsoTimePipe implements PipeTransform {
    constructor();
    transform(date: string | Date): string;
}
