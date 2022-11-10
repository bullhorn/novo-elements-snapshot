import { ElementRef, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare class GridDirective {
    private readonly el;
    private readonly renderer;
    columns: string;
    rows: string;
    areas: string;
    constructor(el: ElementRef, renderer: Renderer2);
    static ɵfac: i0.ɵɵFactoryDeclaration<GridDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<GridDirective, "[appGrid]", never, { "columns": "columns"; "rows": "rows"; "areas": "areas"; }, {}, never>;
}
export declare class GridAreaDirective {
    area: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<GridAreaDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<GridAreaDirective, "[appGridArea]", never, { "area": "appGridArea"; }, {}, never>;
}
