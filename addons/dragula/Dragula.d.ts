import { ElementRef, OnChanges, OnInit } from '@angular/core';
import { NovoDragulaService } from './DragulaService';
import * as i0 from "@angular/core";
/**
* @deprecated since v8.0.0 - slated for deletion.
*
* Moving away from all CommonJS dependencies to improve tree-shaking.
*
* Please look at built-in ng or third party drag-drop libraries like
* angular-draggable-droppable, ngx-drag-drop, ngx-sortablejs, ng2-dragula.
*/
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
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoDragulaElement, "[dragula]", never, { "bag": "dragula"; "dragulaModel": "dragulaModel"; }, {}, never, never, false, never>;
}
