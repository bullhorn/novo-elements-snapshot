import { ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
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
    static ɵfac: i0.ɵɵFactoryDeclaration<BorderDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BorderDirective, "[border], [bb], [borderBottom], [bt], [borderTop], [bl], [borderLeft], [br], [borderRight], [bx], [borderX], [by], [borderY]", never, { "borderStyle": "borderStyle"; "borderColor": "borderColor"; "borderWidth": "borderWidth"; "border": "border"; "borderLeft": "borderLeft"; "bl": "bl"; "borderRight": "borderRight"; "br": "br"; "borderTop": "borderTop"; "bt": "bt"; "borderBottom": "borderBottom"; "bb": "bb"; "borderX": "borderX"; "bx": "bx"; "borderY": "borderY"; "by": "by"; }, {}, never>;
}
