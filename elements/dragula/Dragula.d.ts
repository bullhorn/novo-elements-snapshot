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
    static ɵfac: i0.ɵɵFactoryDef<NovoDragulaElement, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<NovoDragulaElement, "[dragula]", never, { "bag": "dragula"; "dragulaModel": "dragulaModel"; }, {}, never>;
}
