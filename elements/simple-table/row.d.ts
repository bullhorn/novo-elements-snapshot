import { CdkHeaderRow, CdkRow, CdkRowDef, CdkHeaderRowDef } from '@angular/cdk/table';
/** Workaround for https://github.com/angular/angular/issues/17849 */
import * as ɵngcc0 from '@angular/core';
export declare const _NovoHeaderRowDef: typeof CdkHeaderRowDef;
export declare const _NovoCdkRowDef: typeof CdkRowDef;
export declare const _NovoHeaderRow: typeof CdkHeaderRow;
export declare const _NovoRow: typeof CdkRow;
export declare class NovoSimpleHeaderRowDef extends _NovoHeaderRowDef {
    columns: any;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoSimpleHeaderRowDef, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NovoSimpleHeaderRowDef, "[novoSimpleHeaderRowDef]", never, { "columns": "novoSimpleHeaderRowDef"; }, {}, never>;
}
export declare class NovoSimpleRowDef<T> extends _NovoCdkRowDef<T> {
    columns: any;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoSimpleRowDef<any>, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NovoSimpleRowDef<any>, "[novoSimpleRowDef]", never, { "columns": "novoSimpleRowDefColumns"; }, {}, never>;
}
export declare class NovoSimpleHeaderRow extends _NovoHeaderRow {
    rowClass: string;
    role: string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoSimpleHeaderRow, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoSimpleHeaderRow, "novo-simple-header-row", never, {}, {}, never, never>;
}
export declare class NovoSimpleRow extends _NovoRow {
    rowClass: string;
    role: string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoSimpleRow, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoSimpleRow, "novo-simple-row", never, {}, {}, never, never>;
}

//# sourceMappingURL=row.d.ts.map