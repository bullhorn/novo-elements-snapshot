import { PipeTransform } from '@angular/core';
export declare class IsoDatePipe implements PipeTransform {
    constructor();
    transform(date: string | Date): string;
}
