import { ElementRef, EventEmitter, OnDestroy, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ResizeObserverDirective implements OnDestroy {
    private el;
    private readonly renderer;
    responsive: number[];
    sizes: string[];
    resize: EventEmitter<any>;
    private size;
    constructor(el: ElementRef, renderer: Renderer2);
    _resizeCallback(entry: any): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ResizeObserverDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ResizeObserverDirective, "[responsive]", never, { "responsive": "responsive"; "sizes": "sizes"; }, { "resize": "resize"; }, never>;
}
