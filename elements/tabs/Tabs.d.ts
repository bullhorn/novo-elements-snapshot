import { EventEmitter } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class NovoNavElement {
    theme: string;
    direction: string;
    outlet: any;
    router: string;
    condensed: boolean;
    items: Array<any>;
    select(item: any): void;
    add(item: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoNavElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoNavElement, "novo-nav", never, { "theme": "theme"; "direction": "direction"; "condensed": "condensed"; "outlet": "outlet"; "router": "router"; }, {}, never, ["*"]>;
}
export declare class NovoTabElement {
    active: boolean;
    disabled: boolean;
    activeChange: EventEmitter<boolean>;
    nav: any;
    constructor(nav: NovoNavElement);
    select(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoTabElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoTabElement, "novo-tab", never, { "active": "active"; "disabled": "disabled"; }, { "activeChange": "activeChange"; }, never, ["*"]>;
}
export declare class NovoTabButtonElement {
    active: boolean;
    disabled: boolean;
    nav: any;
    constructor(nav: NovoNavElement);
    select(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoTabButtonElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoTabButtonElement, "novo-tab-button", never, { "active": "active"; "disabled": "disabled"; }, {}, never, ["*"]>;
}
export declare class NovoTabLinkElement {
    active: boolean;
    disabled: boolean;
    nav: any;
    constructor(nav: NovoNavElement);
    select(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoTabLinkElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoTabLinkElement, "novo-tab-link", never, { "active": "active"; "disabled": "disabled"; }, {}, never, ["*"]>;
}
export declare class NovoNavOutletElement {
    items: Array<any>;
    show(index: any): void;
    add(item: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoNavOutletElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoNavOutletElement, "novo-nav-outlet", never, {}, {}, never, ["*"]>;
}
export declare class NovoNavContentElement {
    active: boolean;
    constructor(outlet: NovoNavOutletElement);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoNavContentElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoNavContentElement, "novo-nav-content", never, { "active": "active"; }, {}, never, ["*"]>;
}
export declare class NovoNavHeaderElement {
    active: boolean;
    forElement: any;
    outlet: any;
    constructor(outlet: NovoNavOutletElement);
    show(event?: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoNavHeaderElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoNavHeaderElement, "novo-nav-header", never, { "active": "active"; "forElement": "for"; }, {}, never, ["*"]>;
}

//# sourceMappingURL=Tabs.d.ts.map