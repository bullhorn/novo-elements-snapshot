import { ElementRef } from '@angular/core';
export declare class BorderDirective {
    private el;
    borderStyle: string;
    borderColor: string;
    borderWidth: number;
    border: string;
    borderLeft: string;
    bl: string;
    borderRight: string;
    br: string;
    borderTop: string;
    bt: string;
    borderBottom: string;
    bb: string;
    borderX: string;
    bx: string;
    borderY: string;
    by: string;
    get hb_border(): string;
    get hb_border_left(): string;
    get hb_border_right(): string;
    get hb_border_top(): string;
    get hb_border_bottom(): string;
    constructor(el: ElementRef);
}
