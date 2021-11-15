import { DomSanitizer } from '@angular/platform-browser';
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
}
