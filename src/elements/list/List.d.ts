import { ElementRef, OnInit } from '@angular/core';
export declare class NovoListElement {
    element: ElementRef;
    theme: string;
    direction: string;
    constructor(element: ElementRef);
}
export declare class NovoItemAvatarElement {
    icon: string;
    color: string;
}
export declare class NovoItemTitleElement {
}
export declare class NovoItemHeaderElement {
}
export declare class NovoItemDateElement {
}
export declare class NovoItemContentElement {
    direction: string;
}
export declare class NovoItemEndElement {
}
export declare class NovoListItemElement implements OnInit {
    private element;
    avatar: boolean;
    _content: NovoItemContentElement;
    _header: NovoItemHeaderElement;
    constructor(element: ElementRef);
    ngOnInit(): void;
}
