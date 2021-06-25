import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, OnInit, QueryList } from '@angular/core';
import { NovoOverlayTemplateComponent } from '../overlay/Overlay';
import * as ɵngcc0 from '@angular/core';
export declare class NovoDropdownElement implements OnInit, OnDestroy {
    element: ElementRef;
    private ref;
    parentScrollSelector: string;
    parentScrollAction: string;
    containerClass: string;
    side: 'default' | 'right' | 'above-below' | 'right-above-below' | 'center' | 'bottom' | 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
    scrollStrategy: 'reposition' | 'block' | 'close';
    height: number;
    width: number;
    appendToBody: boolean;
    toggled: EventEmitter<boolean>;
    overlay: NovoOverlayTemplateComponent;
    clickHandler: any;
    closeHandler: any;
    parentScrollElement: Element;
    private _items;
    private _textItems;
    private activeIndex;
    private filterTerm;
    private filterTermTimeout;
    constructor(element: ElementRef, ref: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    set items(items: QueryList<NovoItemElement>);
    /** BEGIN: Convenient Panel Methods. */
    get panelOpen(): boolean;
    openPanel(): void;
    closePanel(): void;
    togglePanel(): void;
    /** END: Convenient Panel Methods. */
    onKeyDown(event: KeyboardEvent): void;
    onOverlayKeyDown(event: KeyboardEvent): void;
    private scrollToActive;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoDropdownElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoDropdownElement, "novo-dropdown", never, { "parentScrollAction": "parentScrollAction"; "side": "side"; "scrollStrategy": "scrollStrategy"; "width": "width"; "appendToBody": "appendToBody"; "parentScrollSelector": "parentScrollSelector"; "containerClass": "containerClass"; "height": "height"; }, { "toggled": "toggled"; }, never, ["button", "*"]>;
}
export declare class NovoItemElement {
    private dropdown;
    element: ElementRef;
    disabled: boolean;
    keepOpen: boolean;
    action: EventEmitter<any>;
    active: boolean;
    constructor(dropdown: NovoDropdownElement, element: ElementRef);
    onClick(event: Event): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoItemElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoItemElement, "item", never, { "keepOpen": "keepOpen"; "disabled": "disabled"; }, { "action": "action"; }, never, ["*"]>;
}
export declare class NovoDropdownListElement implements AfterContentInit {
    private dropdown;
    items: QueryList<NovoItemElement>;
    constructor(dropdown: NovoDropdownElement);
    ngAfterContentInit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoDropdownListElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoDropdownListElement, "list", never, {}, {}, ["items"], ["*"]>;
}
export declare class NovoDropDownItemHeaderElement {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoDropDownItemHeaderElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoDropDownItemHeaderElement, "dropdown-item-header", never, {}, {}, never, ["*"]>;
}

//# sourceMappingURL=Dropdown.d.ts.map