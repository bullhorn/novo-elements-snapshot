import { OnInit, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
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
}
