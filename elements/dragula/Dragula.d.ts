import { ElementRef, OnChanges, OnInit } from '@angular/core';
import { NovoDragulaService } from './DragulaService';
import * as i0 from "@angular/core";
export declare class NovoDragulaElement implements OnInit, OnChanges {
    private dragulaService;
    bag: any;
    dragulaModel: any;
    drake: any;
    container: any;
    constructor(element: ElementRef, dragulaService: NovoDragulaService);
    ngOnInit(): void;
    checkModel(): void;
    ngOnChanges(changes: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDragulaElement, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoDragulaElement, "[dragula]", never, { "bag": "dragula"; "dragulaModel": "dragulaModel"; }, {}, never>;
}
