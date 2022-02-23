import { ElementRef } from '@angular/core';
export declare class TextColorDirective {
    private el;
    txc: string;
    get hb_textColor(): string;
    get hb_textStyle(): string;
    constructor(el: ElementRef);
}
