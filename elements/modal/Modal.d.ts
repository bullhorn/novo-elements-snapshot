import { ViewContainerRef, AfterViewInit, EventEmitter, OnInit } from '@angular/core';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
/**
 * Params that can be passed to the Modal
 */
import * as ɵngcc0 from '@angular/core';
export interface ModalParams {
    [propName: string]: any;
}
export declare class NovoModalParams implements ModalParams {
}
/**
 * Reference to an opened dialog.
 */
export declare class NovoModalRef {
    component: any;
    contentRef: any;
    containerRef: any;
    isClosed: boolean;
    _onClosed: any;
    get onClosed(): any;
    open(): void;
    close(result?: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoModalRef, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<NovoModalRef>;
}
export declare class NovoModalContainerElement implements AfterViewInit {
    private modalRef;
    private componentUtils;
    container: ViewContainerRef;
    constructor(modalRef: NovoModalRef, componentUtils: ComponentUtils);
    ngAfterViewInit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoModalContainerElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoModalContainerElement, "novo-modal-container", never, {}, {}, never, never>;
}
export declare class NovoModalElement {
    private modalRef;
    constructor(modalRef: NovoModalRef);
    close(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoModalElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoModalElement, "novo-modal", never, {}, {}, never, ["header", "section", "button"]>;
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoModalNotificationElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoModalNotificationElement, "novo-notification", never, { "type": "type"; "icon": "icon"; }, { "cancel": "cancel"; }, never, ["label", "h1", "h2", "p", "button"]>;
}

//# sourceMappingURL=Modal.d.ts.map