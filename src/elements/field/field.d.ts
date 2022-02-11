import { AfterContentInit, ChangeDetectorRef, ElementRef, InjectionToken, OnDestroy, QueryList } from '@angular/core';
import { NgControl } from '@angular/forms';
import { NovoLabel } from '../common';
import { NovoErrorElement } from './error/error';
import { NovoFieldControl } from './field-control';
import { NovoHintElement } from './hint/hint';
export declare class NovoFieldPrefixDirective {
}
export declare class NovoFieldSuffixDirective {
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
    appearance: 'standard' | 'outline' | 'fill' | 'list';
    width: string;
    private _destroyed;
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
    _isUnderlinedInput(): boolean;
    /** Determines whether to display hints or errors. */
    _getDisplayedMessages(): 'error' | 'hint';
    /** Determines whether a class from the NgControl should be forwarded to the host element. */
    _shouldForward(prop: keyof NgControl): boolean;
    _hasLabel(): boolean;
}
