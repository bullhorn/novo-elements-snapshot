import { ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NovoButtonElement {
    element: ElementRef;
    color: string;
    side: string;
    size: string;
    theme: string;
    loading: boolean;
    set icon(icon: string);
    get icon(): string;
    disabled: boolean;
    private _icon;
    constructor(element: ElementRef);
    static ɵfac: i0.ɵɵFactoryDef<NovoButtonElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoButtonElement, "button[theme],novo-button", never, { "color": "color"; "side": "side"; "size": "size"; "theme": "theme"; "loading": "loading"; "icon": "icon"; "disabled": "disabled"; }, {}, never, ["*"]>;
}
