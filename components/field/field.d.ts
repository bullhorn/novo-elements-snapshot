import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, InjectionToken, OnDestroy, QueryList } from '@angular/core';
import { NgControl } from '@angular/forms';
import { NovoLabel } from 'novo-elements/common';
import { NovoErrorElement } from './error/error';
import { NovoFieldControl } from './field-control';
import { NovoHintElement } from './hint/hint';
import * as i0 from "@angular/core";
export declare class NovoFieldPrefixDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoFieldPrefixDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoFieldPrefixDirective, "[novoPrefix]", never, {}, {}, never>;
}
export declare class NovoFieldSuffixDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoFieldSuffixDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoFieldSuffixDirective, "[novoSuffix]", never, {}, {}, never>;
}
export declare const NOVO_FORM_FIELD: InjectionToken<NovoFieldElement>;
export declare class NovoFieldElement implements AfterContentInit, OnDestroy {
    _elementRef: ElementRef;
    private _changeDetectorRef;
    private _labelClicks;
    _inputContainerRef: ElementRef;
    _labelElement: NovoLabel;
    _hintElements: QueryList<NovoHintElement>;
    _errorElements: QueryList<NovoErrorElement>;
    _prefixElements: QueryList<NovoFieldPrefixDirective>;
    _suffixElements: QueryList<NovoFieldSuffixDirective>;
    _control: NovoFieldControl<any>;
    layout: 'horizontal' | 'vertical';
    appearance: 'standard' | 'outline' | 'fill' | 'list' | 'none';
    width: string;
    private _destroyed;
    valueChanges: EventEmitter<any>;
    stateChanges: EventEmitter<any>;
    constructor(_elementRef: ElementRef, _changeDetectorRef: ChangeDetectorRef);
    /**
     * Gets an ElementRef for the element that a overlay attached to the form-field should be
     * positioned relative to.
     */
    getConnectedOverlayOrigin(): ElementRef;
    ngAfterContentInit(): any;
    ngOnDestroy(): void;
    /** Throws an error if the form field's control is missing. */
    protected _validateControlChild(): void;
    _handleContainerClick(evt: MouseEvent): void;
    _isUnderlinedInput(): boolean;
    /** Determines whether to display hints or errors. */
    _getDisplayedMessages(): 'error' | 'hint';
    /** Determines whether a class from the NgControl should be forwarded to the host element. */
    _shouldForward(prop: keyof NgControl): boolean;
    _hasLabel(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoFieldElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoFieldElement, "novo-field", never, { "layout": "layout"; "appearance": "appearance"; "width": "width"; }, { "valueChanges": "valueChanges"; "stateChanges": "stateChanges"; }, ["_labelElement", "_control", "_hintElements", "_errorElements", "_prefixElements", "_suffixElements"], ["novo-label", "[novoPrefix]", "*", "[novoSuffix]", "novo-error", "novo-hint", "novo-hint[align=end]"]>;
}
