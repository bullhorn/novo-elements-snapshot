import { ElementRef, Renderer2 } from '@angular/core';
export declare class FlexDirective {
    private readonly el;
    private readonly renderer;
    private _flex;
    get flex(): string;
    set flex(value: string);
    constructor(el: ElementRef, renderer: Renderer2);
}
