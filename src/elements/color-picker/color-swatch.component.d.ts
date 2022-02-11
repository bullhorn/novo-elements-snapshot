import { EventEmitter, OnInit } from '@angular/core';
export declare class NovoColorSwatchComponent implements OnInit {
    color: string;
    style: {
        [key: string]: string;
    };
    focusStyle: {
        [key: string]: string;
    };
    focus: boolean;
    onClick: EventEmitter<any>;
    onHover: EventEmitter<any>;
    divStyles: {
        [key: string]: string;
    };
    focusStyles: {
        [key: string]: string;
    };
    inFocus: boolean;
    ngOnInit(): void;
    currentStyles(): {
        [key: string]: string;
    };
    handleFocusOut(): void;
    handleFocus(): void;
    handleHover(hex: string, $event: any): void;
    handleClick(hex: string, $event: any): void;
}
