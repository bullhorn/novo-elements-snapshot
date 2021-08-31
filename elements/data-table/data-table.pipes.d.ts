import { PipeTransform } from '@angular/core';
import { IDataTableColumn } from './interfaces';
import { NovoLabelService } from '../../services/novo-label-service';
export declare function interpolateCell<T>(value: any, col: IDataTableColumn<T>): string;
export declare class DataTableInterpolatePipe<T> implements PipeTransform {
    transform(value: any, column: IDataTableColumn<T>): string;
}
export declare class DateTableDateRendererPipe<T> implements PipeTransform {
    private labels;
    constructor(labels: NovoLabelService);
    transform(value: any, column: IDataTableColumn<T>): string;
}
export declare class DateTableDateTimeRendererPipe<T> implements PipeTransform {
    private labels;
    constructor(labels: NovoLabelService);
    transform(value: any, column: IDataTableColumn<T>): string;
}
export declare class DateTableTimeRendererPipe<T> implements PipeTransform {
    private labels;
    constructor(labels: NovoLabelService);
    transform(value: any, column: IDataTableColumn<T>): string;
}
export declare class DateTableNumberRendererPipe<T> implements PipeTransform {
    private labels;
    constructor(labels: NovoLabelService);
    transform(value: any, column: IDataTableColumn<T>, isPercent?: boolean): string;
}
export declare class DataTableBigDecimalRendererPipe<T> implements PipeTransform {
    private labels;
    constructor(labels: NovoLabelService);
    transform(value: any, column: IDataTableColumn<T>): string;
}
export declare class DateTableCurrencyRendererPipe<T> implements PipeTransform {
    private labels;
    constructor(labels: NovoLabelService);
    transform(value: any, column: IDataTableColumn<T>): string;
}
