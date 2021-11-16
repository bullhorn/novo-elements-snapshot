import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
import * as ɵngcc0 from '@angular/core';
export declare class NovoSliderElement implements OnInit, OnDestroy {
    private element;
    labels: NovoLabelService;
    slides: any;
    currentSlide: number;
    start: boolean;
    end: boolean;
    currSlides: Array<any>;
    handleKeyDownFunc: any;
    currentClass: string;
    constructor(element: ElementRef, labels: NovoLabelService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    handleKeyDown(event: any): void;
    changeSlide(direction: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoSliderElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoSliderElement, "novo-slider", never, { "slides": "slides"; }, {}, never, ["div[slide]", "button"]>;
}

//# sourceMappingURL=Slider.d.ts.map