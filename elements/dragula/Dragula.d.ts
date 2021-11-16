import { ElementRef, OnInit, OnChanges } from '@angular/core';
import { NovoDragulaService } from './DragulaService';
import * as ɵngcc0 from '@angular/core';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoDragulaElement, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NovoDragulaElement, "[dragula]", never, { "bag": "dragula"; "dragulaModel": "dragulaModel"; }, {}, never>;
}

//# sourceMappingURL=Dragula.d.ts.map