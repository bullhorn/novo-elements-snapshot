import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
/**
* @deprecated since v8.0.0 - slated for deletion.
*
* Moving away from all CommonJS dependencies to improve tree-shaking.
*
* Please look at built-in ng or third party drag-drop libraries like
* angular-draggable-droppable, ngx-drag-drop, ngx-sortablejs, ng2-dragula.
*/
export declare class NovoDragulaService {
    cancel: EventEmitter<any>;
    cloned: EventEmitter<any>;
    drag: EventEmitter<any>;
    dragend: EventEmitter<any>;
    drop: EventEmitter<any>;
    out: EventEmitter<any>;
    over: EventEmitter<any>;
    remove: EventEmitter<any>;
    shadow: EventEmitter<any>;
    dropModel: EventEmitter<any>;
    removeModel: EventEmitter<any>;
    events: Array<string>;
    bags: Array<any>;
    add(name: any, drake: any): any;
    find(name: any): any;
    destroy(name: any): void;
    setOptions(name: any, options: any): void;
    handleModels(name: any, drake: any): void;
    setupEvents(bag: any): void;
    domIndexOf(child: any, parent: any): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDragulaService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NovoDragulaService>;
}
