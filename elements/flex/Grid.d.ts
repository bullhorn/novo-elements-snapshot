import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare class NovoGridElement {
    private _sanitizer;
    get display(): string;
    direction: string;
    align: string;
    justify: string;
    gap: string;
    columns: string;
    get hb_gridCols(): import("@angular/platform-browser").SafeStyle;
    constructor(_sanitizer: DomSanitizer);
    static ɵfac: i0.ɵɵFactoryDef<NovoGridElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoGridElement, "novo-grid", never, { "direction": "direction"; "align": "align"; "justify": "justify"; "gap": "gap"; "columns": "columns"; }, {}, never, ["*"]>;
}
