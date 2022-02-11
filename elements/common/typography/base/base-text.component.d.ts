import { ElementRef } from '@angular/core';
import { TypographyLength, TypographySize, TypographyWeight } from '../text.types';
import * as i0 from "@angular/core";
export declare class NovoBaseTextElement {
    protected element: ElementRef;
    size: TypographySize;
    weight: TypographyWeight;
    lineLength: TypographyLength;
    color: string;
    get hb_isSizeSmall(): boolean;
    get hb_isSizeLarge(): boolean;
    get hb_isSizeDefault(): boolean;
    get hb_isWeightThin(): boolean;
    get hb_isWeightMedium(): boolean;
    get hb_isWeightBold(): boolean;
    get hb_isWeightDefault(): boolean;
    get hb_classBinding(): string;
    disabled: boolean;
    muted: boolean;
    error: boolean;
    marginBefore: boolean;
    marginAfter: boolean;
    constructor(element: ElementRef);
    get nativeElement(): any;
    static ɵfac: i0.ɵɵFactoryDef<NovoBaseTextElement, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<NovoBaseTextElement, never, never, { "size": "size"; "weight": "weight"; "lineLength": "lineLength"; "color": "color"; "disabled": "disabled"; "muted": "muted"; "error": "error"; "marginBefore": "marginBefore"; "marginAfter": "marginAfter"; }, {}, never>;
}
