import { AfterViewInit, EventEmitter } from '@angular/core';
export declare class NovoNavElement {
    theme: string;
    direction: string;
    outlet: any;
    router: string;
    condensed: boolean;
    items: Array<any>;
    /** The index of the active tab. */
    get selectedIndex(): number | null;
    private _selectedIndex;
    select(item: any): void;
    add(item: any): void;
}
export declare class NovoTabElement implements AfterViewInit {
    role: string;
    active: boolean;
    color: string;
    disabled: boolean;
    activeChange: EventEmitter<boolean>;
    onlyText: boolean;
    get hb_textOnly(): boolean;
    tablink: any;
    nav: any;
    constructor(nav: NovoNavElement);
    ngAfterViewInit(): void;
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
export declare class NovoTabLinkElement {
    role: string;
    active: boolean;
    disabled: boolean;
    spy: string;
    nav: any;
    constructor(nav: NovoNavElement);
    select(): void;
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
