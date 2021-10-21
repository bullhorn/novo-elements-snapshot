import { ElementRef, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NovoListElement {
    element: ElementRef;
    theme: string;
    direction: string;
    constructor(element: ElementRef);
    static ɵfac: i0.ɵɵFactoryDef<NovoListElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoListElement, "novo-list", never, { "theme": "theme"; "direction": "direction"; }, {}, never, ["*"]>;
}
export declare class NovoItemAvatarElement implements OnChanges, OnInit {
    icon: string;
    iconClass: string;
    classMap: any;
    ngOnChanges(changes?: SimpleChanges): void;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDef<NovoItemAvatarElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoItemAvatarElement, "item-avatar", never, { "icon": "icon"; }, {}, never, never>;
}
export declare class NovoItemTitleElement {
    static ɵfac: i0.ɵɵFactoryDef<NovoItemTitleElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoItemTitleElement, "item-title", never, {}, {}, never, ["*"]>;
}
export declare class NovoItemHeaderElement {
    static ɵfac: i0.ɵɵFactoryDef<NovoItemHeaderElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoItemHeaderElement, "item-header", never, {}, {}, never, ["item-avatar", "item-title", "item-header-end"]>;
}
export declare class NovoItemDateElement {
    static ɵfac: i0.ɵɵFactoryDef<NovoItemDateElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoItemDateElement, "item-header-end", never, {}, {}, never, ["*"]>;
}
export declare class NovoItemContentElement {
    direction: string;
    static ɵfac: i0.ɵɵFactoryDef<NovoItemContentElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoItemContentElement, "item-content", never, { "direction": "direction"; }, {}, never, ["*"]>;
}
export declare class NovoItemEndElement {
    static ɵfac: i0.ɵɵFactoryDef<NovoItemEndElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoItemEndElement, "item-end", never, {}, {}, never, ["*"]>;
}
export declare class NovoListItemElement implements OnInit {
    private element;
    avatar: boolean;
    _content: NovoItemContentElement;
    _header: NovoItemHeaderElement;
    constructor(element: ElementRef);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDef<NovoListItemElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoListItemElement, "novo-list-item, a[list-item], button[list-item]", never, {}, {}, ["_content", "_header"], ["item-header", "item-content", "*", "item-end"]>;
}
