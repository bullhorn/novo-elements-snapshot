import { ElementRef } from '@angular/core';
export declare class BackgroundColorDirective {
    private el;
    bg: string;
    get hb_bgColor(): string;
    get hb_bgStyle(): string;
    constructor(el: ElementRef);
}
