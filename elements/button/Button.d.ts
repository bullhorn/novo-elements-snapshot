import { ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NovoButtonElement implements OnChanges {
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
     */
    theme: string;
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
    /**
     * Make the button non-interactive.
     */
    disabled: boolean;
    disabledAttr: undefined | '';
    private _icon;
    constructor(element: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    handleKeydown(event: KeyboardEvent): void;
    /** Focuses the input. */
    focus(options?: FocusOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoButtonElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoButtonElement, "novo-button,button[theme]", never, { "color": { "alias": "color"; "required": false; }; "side": { "alias": "side"; "required": false; }; "size": { "alias": "size"; "required": false; }; "theme": { "alias": "theme"; "required": false; }; "loading": { "alias": "loading"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, ["*"], false, never>;
}
