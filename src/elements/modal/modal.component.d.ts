import { EventEmitter, OnInit } from '@angular/core';
import { NovoModalRef } from './modal-ref';
import * as i0 from "@angular/core";
export declare class NovoModalElement {
    private modalRef;
    constructor(modalRef: NovoModalRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoModalElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoModalElement, "novo-modal", never, {}, {}, never, ["header,novo-header,novo-card-header", "section,novo-card-content", "button,novo-button"]>;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoModalNotificationElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoModalNotificationElement, "novo-notification", never, { "type": "type"; "icon": "icon"; }, { "cancel": "cancel"; }, never, ["label,novo-label", "h1", "h2", "p", "button,novo-button"]>;
}
