import { AfterContentChecked, ChangeDetectorRef, ElementRef, EventEmitter, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
export declare class NovoNavElement implements AfterContentChecked {
    theme: string;
    direction: string;
    outlet: any;
    router: string;
    condensed: boolean;
    items: Array<any>;
    /** The index of the active tab. */
    get selectedIndex(): number | null;
    set selectedIndex(value: number | null);
    private _selectedIndex;
    /** The tab index that should be selected after the content has been checked. */
    private _indexToSelect;
    /** Output to enable support for two-way binding on `[(selectedIndex)]` */
    readonly selectedIndexChange: EventEmitter<number>;
    ngAfterContentChecked(): void;
    select(item: any): void;
    add(item: any): void;
    private _activateSelectedItem;
    private _showActiveContent;
    private _deactivateAllItems;
    /** Clamps the given index to the bounds of 0 and the tabs length. */
    private _clampTabIndex;
}
export declare class NovoTabElement {
    private el;
    private cdr;
    role: string;
    active: boolean;
    color: string;
    disabled: boolean;
    activeChange: EventEmitter<boolean>;
    onlyText: boolean;
    get hb_textOnly(): boolean;
    tablink: any;
    nav: any;
    constructor(nav: NovoNavElement, el: ElementRef, cdr: ChangeDetectorRef);
    select(): void;
}
export declare class NovoTabButtonElement {
    role: string;
    active: boolean;
    disabled: boolean;
    nav: any;
    constructor(nav: NovoNavElement);
    select(): void;
}
export declare class NovoTabLinkElement implements OnInit {
    private router;
    private cdr;
    private link?;
    role: string;
    active: boolean;
    disabled: boolean;
    spy: string;
    nav: any;
    constructor(nav: NovoNavElement, router: Router, cdr: ChangeDetectorRef, link?: RouterLink);
    ngOnInit(): void;
    select(): void;
    private isLinkActive;
}
export declare class NovoNavOutletElement {
    items: Array<any>;
    show(index: any): void;
    add(item: any): void;
}
export declare class NovoNavContentElement {
    active: boolean;
    constructor(outlet: NovoNavOutletElement);
}
export declare class NovoNavHeaderElement {
    role: string;
    active: boolean;
    forElement: any;
    outlet: any;
    constructor(outlet: NovoNavOutletElement);
    show(event?: any): void;
}
