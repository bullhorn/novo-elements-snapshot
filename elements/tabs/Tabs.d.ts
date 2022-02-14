import { AfterViewInit, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NovoNavElement {
    theme: string;
    direction: string;
    outlet: any;
    router: string;
    condensed: boolean;
    items: Array<any>;
    select(item: any): void;
    add(item: any): void;
    static ɵfac: i0.ɵɵFactoryDef<NovoNavElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoNavElement, "novo-nav", never, { "theme": "theme"; "direction": "direction"; "outlet": "outlet"; "router": "router"; "condensed": "condensed"; }, {}, never, ["*"]>;
}
export declare class NovoTabElement implements AfterViewInit {
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
    static ɵfac: i0.ɵɵFactoryDef<NovoTabElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoTabElement, "novo-tab", never, { "active": "active"; "color": "color"; "disabled": "disabled"; }, { "activeChange": "activeChange"; }, never, ["*"]>;
}
export declare class NovoTabButtonElement {
    active: boolean;
    disabled: boolean;
    nav: any;
    constructor(nav: NovoNavElement);
    select(): void;
    static ɵfac: i0.ɵɵFactoryDef<NovoTabButtonElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoTabButtonElement, "novo-tab-button", never, { "active": "active"; "disabled": "disabled"; }, {}, never, ["*"]>;
}
export declare class NovoTabLinkElement {
    active: boolean;
    disabled: boolean;
    nav: any;
    constructor(nav: NovoNavElement);
    select(): void;
    static ɵfac: i0.ɵɵFactoryDef<NovoTabLinkElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoTabLinkElement, "novo-tab-link", never, { "active": "active"; "disabled": "disabled"; }, {}, never, ["*"]>;
}
export declare class NovoNavOutletElement {
    items: Array<any>;
    show(index: any): void;
    add(item: any): void;
    static ɵfac: i0.ɵɵFactoryDef<NovoNavOutletElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoNavOutletElement, "novo-nav-outlet", never, {}, {}, never, ["*"]>;
}
export declare class NovoNavContentElement {
    active: boolean;
    constructor(outlet: NovoNavOutletElement);
    static ɵfac: i0.ɵɵFactoryDef<NovoNavContentElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoNavContentElement, "novo-nav-content", never, { "active": "active"; }, {}, never, ["*"]>;
}
export declare class NovoNavHeaderElement {
    active: boolean;
    forElement: any;
    outlet: any;
    constructor(outlet: NovoNavOutletElement);
    show(event?: any): void;
    static ɵfac: i0.ɵɵFactoryDef<NovoNavHeaderElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoNavHeaderElement, "novo-nav-header", never, { "active": "active"; "forElement": "for"; }, {}, never, ["*"]>;
}
