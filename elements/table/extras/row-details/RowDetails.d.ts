import { ElementRef, ViewContainerRef, OnInit } from '@angular/core';
import { ComponentUtils } from './../../../../utils/component-utils/ComponentUtils';
import * as ɵngcc0 from '@angular/core';
export declare class RowDetails implements OnInit {
    private element;
    private componentUtils;
    container: ViewContainerRef;
    data: any;
    renderer: any;
    value: any;
    constructor(element: ElementRef, componentUtils: ComponentUtils);
    ngOnInit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<RowDetails, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<RowDetails, "novo-row-details", never, { "data": "data"; "renderer": "renderer"; }, {}, never, never>;
}

//# sourceMappingURL=RowDetails.d.ts.map