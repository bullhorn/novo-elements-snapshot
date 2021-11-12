import { ElementRef } from '@angular/core';
import { TypographyLength, TypographySize, TypographyWeight } from '../text.types';
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
    nowrap: boolean;
    constructor(element: ElementRef);
    get nativeElement(): any;
}
