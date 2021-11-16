import { OnInit, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as ɵngcc0 from '@angular/core';
export declare class NovoToastElement implements OnInit, OnChanges {
    private sanitizer;
    theme: string;
    icon: string;
    title: string;
    hasDialogue: boolean;
    link: string;
    isCloseable: boolean;
    set message(m: string);
    closed: EventEmitter<any>;
    _message: SafeHtml;
    show: boolean;
    animate: boolean;
    parent: any;
    launched: boolean;
    position: any;
    time: any;
    iconClass: string;
    alertTheme: string;
    embedded: any;
    constructor(sanitizer: DomSanitizer);
    ngOnInit(): void;
    ngOnChanges(changes?: SimpleChanges): void;
    clickHandler(event: any): void;
    close(event: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoToastElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoToastElement, "novo-toast", never, { "theme": "theme"; "icon": "icon"; "hasDialogue": "hasDialogue"; "isCloseable": "isCloseable"; "message": "message"; "title": "title"; "link": "link"; }, { "closed": "closed"; }, never, ["*"]>;
}

//# sourceMappingURL=Toast.d.ts.map