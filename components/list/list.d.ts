import { ElementRef, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NovoListElement {
    element: ElementRef;
    theme: string;
    direction: string;
    constructor(element: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoListElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoListElement, "novo-list", never, { "theme": "theme"; "direction": "direction"; }, {}, never, ["*"]>;
}
export declare class NovoItemAvatarElement {
    icon: string;
    color: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoItemAvatarElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoItemAvatarElement, "item-avatar, novo-item-avatar", never, { "icon": "icon"; "color": "color"; }, {}, never, never>;
}
export declare class NovoItemTitleElement {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoItemTitleElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoItemTitleElement, "item-title, novo-item-title", never, {}, {}, never, ["*"]>;
}
export declare class NovoItemHeaderElement {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoItemHeaderElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoItemHeaderElement, "item-header, novo-item-header", never, {}, {}, never, ["item-avatar, novo-item-avatar", "item-title, novo-item-title", "item-header-end, novo-item-header-end"]>;
}
export declare class NovoItemDateElement {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoItemDateElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoItemDateElement, "item-header-end, novo-item-header-end", never, {}, {}, never, ["*"]>;
}
export declare class NovoItemContentElement {
    direction: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoItemContentElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoItemContentElement, "item-content, novo-item-content", never, { "direction": "direction"; }, {}, never, ["*"]>;
}
export declare class NovoItemEndElement {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoItemEndElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoItemEndElement, "item-end, novo-item-end", never, {}, {}, never, ["*"]>;
}
export declare class NovoListItemElement implements OnInit {
    private element;
    avatar: boolean;
    _content: NovoItemContentElement;
    _header: NovoItemHeaderElement;
    constructor(element: ElementRef);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoListItemElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoListItemElement, "novo-list-item, [list-item]", never, {}, {}, ["_content", "_header"], ["item-header, novo-item-header", "item-content, novo-item-content", "*", "item-end, novo-item-end, [novoSuffix]"]>;
}
