import { ElementRef, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TypographyDirective {
    private readonly el;
    private readonly renderer;
    fontWeight: string;
    lineHeight: string;
    textAlign: string;
    fontStyle: string;
    textTransform: string;
    constructor(el: ElementRef, renderer: Renderer2);
    static ɵfac: i0.ɵɵFactoryDeclaration<TypographyDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TypographyDirective, "[fontWeight],[lineHeight],[textAlign],[textAlign],[fontStyle],[textTransform]", never, { "fontWeight": "fontWeight"; "lineHeight": "lineHeight"; "textAlign": "textAlign"; "fontStyle": "fontStyle"; "textTransform": "textTransform"; }, {}, never>;
}
