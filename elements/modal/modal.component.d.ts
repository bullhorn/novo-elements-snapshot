import { EventEmitter, OnInit } from '@angular/core';
import { NovoModalRef } from './modal-ref';
import * as i0 from "@angular/core";
export declare class NovoModalElement {
    private modalRef;
    constructor(modalRef: NovoModalRef);
    static ɵfac: i0.ɵɵFactoryDef<NovoModalElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoModalElement, "novo-modal", never, {}, {}, never, ["header", "section", "button"]>;
}
export declare class NovoModalNotificationElement implements OnInit {
    private modalRef;
    type: string;
    icon: string;
    cancel: EventEmitter<any>;
    iconType: string;
    constructor(modalRef: NovoModalRef);
    close(): void;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDef<NovoModalNotificationElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoModalNotificationElement, "novo-notification", never, { "type": "type"; "icon": "icon"; }, { "cancel": "cancel"; }, never, ["label", "h1", "h2", "p", "button"]>;
}
