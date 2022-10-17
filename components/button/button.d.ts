import { ElementRef, QueryList } from '@angular/core';
import { NovoIconComponent } from 'novo-elements/components/icon';
import * as i0 from "@angular/core";
export declare class NovoButtonElement {
    element: ElementRef;
    /**
     * The text color of the button. Should be used for Icon buttons. see theme.
     */
    color: string;
    /**
     * The side of the button to display the icon.
     * @deprecated
     */
    side: string;
    /**
     * 	Sets the size of the button. One of: sm, lg
     */
    size: string;
    /**
     * The base styling to apply to the button.
     * @deprecated
     */
    get theme(): string;
    set theme(value: string);
    /**
     * The visual style of the button.
     */
    get variant(): string;
    set variant(value: string);
    private _variant;
    /**
     * Conditionally show a spinner over the top of a button.
     */
    loading: boolean;
    /**
     * Optionally display `bullhorn-icon` with the button along with the text.
     * @deprecated
     */
    set icon(icon: string);
    get icon(): string;
    _icons: QueryList<NovoIconComponent>;
    get hb_calculatedClasses(): string[];
    private _translateSize;
    basic: boolean;
    primary: boolean;
    outlined: boolean;
    fab: boolean;
    standard: boolean;
    /**
     * Make the button non-interactive.
     */
    disabled: boolean;
    private _icon;
    constructor(element: ElementRef);
    /** Focuses the input. */
    focus(options?: FocusOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoButtonElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoButtonElement, "novo-button,button[theme],button[basic],button[primary],button[outlined],button[icon],button[fab]", never, { "color": "color"; "side": "side"; "size": "size"; "theme": "theme"; "variant": "variant"; "loading": "loading"; "icon": "icon"; "basic": "basic"; "primary": "primary"; "outlined": "outlined"; "fab": "fab"; "standard": "standard"; "disabled": "disabled"; }, {}, ["_icons"], ["*"]>;
}
