import { ElementRef } from '@angular/core';
import { TypographyLength, TypographySize, TypographyWeight } from '../text.types';
import * as i0 from "@angular/core";
export declare class NovoBaseTextElement {
    protected element: ElementRef;
    size: TypographySize;
    weight: TypographyWeight;
    lineLength: TypographyLength;
    color: string;
    get hb_classBinding(): string;
    disabled: boolean;
    muted: boolean;
    error: boolean;
    marginBefore: boolean;
    marginAfter: boolean;
    nowrap: boolean;
    smaller: boolean;
    larger: boolean;
    thin: boolean;
    lighter: boolean;
    light: boolean;
    medium: boolean;
    bold: boolean;
    bolder: boolean;
    extrabold: boolean;
    constructor(element: ElementRef);
    get nativeElement(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoBaseTextElement, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoBaseTextElement, never, never, { "size": "size"; "weight": "weight"; "lineLength": "lineLength"; "color": "color"; "disabled": "disabled"; "muted": "muted"; "error": "error"; "marginBefore": "marginBefore"; "marginAfter": "marginAfter"; "nowrap": "nowrap"; "smaller": "smaller"; "larger": "larger"; "thin": "thin"; "lighter": "lighter"; "light": "light"; "medium": "medium"; "bold": "bold"; "bolder": "bolder"; "extrabold": "extrabold"; }, {}, never>;
}
