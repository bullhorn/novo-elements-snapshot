import { PipeTransform } from '@angular/core';
import { IDataTableColumn } from './interfaces';
import { NovoLabelService } from '../../services/novo-label-service';
import * as ɵngcc0 from '@angular/core';
export declare function interpolateCell<T>(value: any, col: IDataTableColumn<T>): string;
export declare class DataTableInterpolatePipe<T> implements PipeTransform {
    transform(value: any, column: IDataTableColumn<T>): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DataTableInterpolatePipe<any>, never>;
    static ɵpipe: ɵngcc0.ɵɵPipeDefWithMeta<DataTableInterpolatePipe<any>, "dataTableInterpolate">;
}
export declare class DateTableDateRendererPipe<T> implements PipeTransform {
    private labels;
    constructor(labels: NovoLabelService);
    transform(value: any, column: IDataTableColumn<T>): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DateTableDateRendererPipe<any>, never>;
    static ɵpipe: ɵngcc0.ɵɵPipeDefWithMeta<DateTableDateRendererPipe<any>, "dataTableDateRenderer">;
}
export declare class DateTableDateTimeRendererPipe<T> implements PipeTransform {
    private labels;
    constructor(labels: NovoLabelService);
    transform(value: any, column: IDataTableColumn<T>): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DateTableDateTimeRendererPipe<any>, never>;
    static ɵpipe: ɵngcc0.ɵɵPipeDefWithMeta<DateTableDateTimeRendererPipe<any>, "dataTableDateTimeRenderer">;
}
export declare class DateTableTimeRendererPipe<T> implements PipeTransform {
    private labels;
    constructor(labels: NovoLabelService);
    transform(value: any, column: IDataTableColumn<T>): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DateTableTimeRendererPipe<any>, never>;
    static ɵpipe: ɵngcc0.ɵɵPipeDefWithMeta<DateTableTimeRendererPipe<any>, "dataTableTimeRenderer">;
}
export declare class DateTableNumberRendererPipe<T> implements PipeTransform {
    private labels;
    constructor(labels: NovoLabelService);
    transform(value: any, column: IDataTableColumn<T>, isPercent?: boolean): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DateTableNumberRendererPipe<any>, never>;
    static ɵpipe: ɵngcc0.ɵɵPipeDefWithMeta<DateTableNumberRendererPipe<any>, "dataTableNumberRenderer">;
}
export declare class DataTableBigDecimalRendererPipe<T> implements PipeTransform {
    private labels;
    constructor(labels: NovoLabelService);
    transform(value: any, column: IDataTableColumn<T>): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DataTableBigDecimalRendererPipe<any>, never>;
    static ɵpipe: ɵngcc0.ɵɵPipeDefWithMeta<DataTableBigDecimalRendererPipe<any>, "dataTableBigDecimalRenderer">;
}
export declare class DateTableCurrencyRendererPipe<T> implements PipeTransform {
    private labels;
    constructor(labels: NovoLabelService);
    transform(value: any, column: IDataTableColumn<T>): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DateTableCurrencyRendererPipe<any>, never>;
    static ɵpipe: ɵngcc0.ɵɵPipeDefWithMeta<DateTableCurrencyRendererPipe<any>, "dataTableCurrencyRenderer">;
}

//# sourceMappingURL=data-table.pipes.d.ts.map