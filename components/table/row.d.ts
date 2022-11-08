import { CdkHeaderRow, CdkHeaderRowDef, CdkRow, CdkRowDef } from '@angular/cdk/table';
import * as i0 from "@angular/core";
/** Workaround for https://github.com/angular/angular/issues/17849 */
export declare const _NovoHeaderRowDef: typeof CdkHeaderRowDef;
export declare const _NovoCdkRowDef: typeof CdkRowDef;
export declare const _NovoHeaderRow: typeof CdkHeaderRow;
export declare const _NovoRow: typeof CdkRow;
export declare class NovoHeaderRowDef extends _NovoHeaderRowDef {
    columns: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoHeaderRowDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoHeaderRowDef, "[novoHeaderRowDef]", never, { "columns": "novoHeaderRowDef"; }, {}, never>;
}
export declare class NovoRowDef<T> extends _NovoCdkRowDef<T> {
    columns: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoRowDef<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoRowDef<any>, "[novoRowDef]", never, { "columns": "novoRowDefColumns"; }, {}, never>;
}
export declare class NovoHeaderRow extends _NovoHeaderRow {
    rowClass: string;
    role: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoHeaderRow, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoHeaderRow, "novo-header-row", never, {}, {}, never, never>;
}
export declare class NovoRow extends _NovoRow {
    rowClass: string;
    role: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoRow, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoRow, "novo-table-row", never, {}, {}, never, never>;
}
