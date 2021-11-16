import { EventEmitter, OnInit } from '@angular/core';
import { NovoModalRef } from './modal-ref';
export declare class NovoModalElement {
    private modalRef;
    constructor(modalRef: NovoModalRef);
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
}
