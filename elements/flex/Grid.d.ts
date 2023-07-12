import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare class NovoGridElement {
    private _sanitizer;
    get display(): string;
    direction: string;
    align: string;
    justify: string;
    columns: string;
    get hb_gridCols(): import("@angular/platform-browser").SafeStyle;
    constructor(_sanitizer: DomSanitizer);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoGridElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoGridElement, "novo-grid", never, { "direction": "direction"; "align": "align"; "justify": "justify"; "columns": "columns"; }, {}, never, ["*"]>;
}