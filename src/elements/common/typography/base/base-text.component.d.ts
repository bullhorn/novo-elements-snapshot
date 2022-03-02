import { ElementRef } from '@angular/core';
import { TypographyLength, TypographySize, TypographyWeight } from '../text.types';
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
}
