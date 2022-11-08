import * as i0 from '@angular/core';
import { Component, Directive, Input, InjectionToken, EventEmitter, ChangeDetectionStrategy, ViewChild, ContentChild, ContentChildren, Output, HostListener, HostBinding, forwardRef, Optional, Inject, Self, ViewEncapsulation, Attribute, NgModule } from '@angular/core';
import * as i1 from '@angular/platform-browser';
import * as i3$1 from 'novo-elements/common';
import { NovoLabel, NovoOptionModule, NovoCommonModule } from 'novo-elements/common';
import { Subscription, Subject, fromEvent } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import * as i1$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2$2 from 'novo-elements/common/overlay';
import { NovoOverlayTemplateComponent, NovoOverlayModule } from 'novo-elements/common/overlay';
import * as i1$4 from 'novo-elements/components/button';
import { NovoButtonModule } from 'novo-elements/components/button';
import { BooleanInput, DateUtil } from 'novo-elements/utils';
import * as i2$1 from '@angular/forms';
import { NG_VALUE_ACCESSOR, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import * as i1$2 from 'angular-imask';
import { IMaskDirective } from 'angular-imask';
import { isValid } from 'date-fns';
import * as IMask from 'imask';
import * as i2 from 'novo-elements/services';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i1$3 from '@angular/cdk/platform';
import { getSupportedInputTypes } from '@angular/cdk/platform';
import * as i3 from '@angular/cdk/text-field';

// NG2
class NovoErrorElement {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    ngOnInit() { }
}
NovoErrorElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoErrorElement, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
NovoErrorElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoErrorElement, selector: "novo-error", ngImport: i0, template: "<ng-content></ng-content>", styles: [":host{display:flex;padding-bottom:5px;flex:1;font-size:.8em;color:var(--color-error)}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoErrorElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-error', template: "<ng-content></ng-content>", styles: [":host{display:flex;padding-bottom:5px;flex:1;font-size:.8em;color:var(--color-error)}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.DomSanitizer }]; } });

/** An interface which allows a control to work inside of a `NovoField`. */
class NovoFieldControl {
}
NovoFieldControl.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFieldControl, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NovoFieldControl.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoFieldControl, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFieldControl, decorators: [{
            type: Directive
        }] });

// NG2
let nextUniqueId$1 = 0;
class NovoHintElement {
    constructor() {
        /** Whether to align the hint label at the start or end of the line. */
        this.align = 'start';
        /** Unique ID for the hint. Used for the aria-describedby on the form field control. */
        this.id = `novo-hint-${nextUniqueId$1++}`;
    }
    ngOnInit() { }
}
NovoHintElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoHintElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoHintElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoHintElement, selector: "novo-hint", inputs: { align: "align", id: "id" }, host: { properties: { "class.novo-field-hint-end": "align === \"end\"", "attr.id": "id", "attr.align": "null" }, classAttribute: "novo-hint" }, ngImport: i0, template: "<ng-content></ng-content>", styles: [":host{font-size:var(--font-size-caption);font-weight:400;line-height:1.375;transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;display:flex;flex:1 0 auto;width:-webkit-max-content;width:-moz-max-content;width:max-content;color:var(--color-text-muted);padding-bottom:.4rem;padding-top:.4rem}:host.text-capitalize{text-transform:capitalize}:host.text-uppercase{text-transform:uppercase}:host.text-nowrap{white-space:nowrap}:host.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host.text-size-default{font-size:inherit}:host.text-size-body{font-size:var(--font-size-body)}:host.text-size-xs{font-size:var(--font-size-xs)}:host.text-size-sm{font-size:var(--font-size-sm)}:host.text-size-md{font-size:var(--font-size-md)}:host.text-size-lg{font-size:var(--font-size-lg)}:host.text-size-xl{font-size:var(--font-size-xl)}:host.text-size-2xl{font-size:var(--font-size-2xl)}:host.text-size-3xl{font-size:var(--font-size-3xl)}:host.text-size-smaller{font-size:.8em}:host.text-size-larger{font-size:1.2em}:host.text-color-person{color:var(--color-person)}:host.text-color-company{color:var(--color-company)}:host.text-color-candidate{color:var(--color-candidate)}:host.text-color-lead{color:var(--color-lead)}:host.text-color-contact{color:var(--color-contact)}:host.text-color-clientcontact{color:var(--color-clientcontact)}:host.text-color-opportunity{color:var(--color-opportunity)}:host.text-color-job{color:var(--color-job)}:host.text-color-joborder{color:var(--color-joborder)}:host.text-color-submission{color:var(--color-submission)}:host.text-color-sendout{color:var(--color-sendout)}:host.text-color-placement{color:var(--color-placement)}:host.text-color-note{color:var(--color-note)}:host.text-color-task{color:var(--color-task)}:host.text-color-distribution-list{color:var(--color-distribution-list)}:host.text-color-credential{color:var(--color-credential)}:host.text-color-user{color:var(--color-user)}:host.text-color-corporate-user{color:var(--color-corporate-user)}:host.text-color-contract{color:var(--color-contract)}:host.text-color-job-code{color:var(--color-job-code)}:host.text-color-earn-code{color:var(--color-earn-code)}:host.text-color-billable-charge{color:var(--color-billable-charge)}:host.text-color-payable-charge{color:var(--color-payable-charge)}:host.text-color-invoice-statement{color:var(--color-invoice-statement)}:host.text-color-selection{color:var(--color-selection)}:host.text-color-positive{color:var(--color-positive)}:host.text-color-success{color:var(--color-success)}:host.text-color-warning{color:var(--color-warning)}:host.text-color-error{color:var(--color-error)}:host.text-color-info{color:var(--color-info)}:host.text-color-disabled{color:var(--color-disabled)}:host.text-color-red{color:var(--palette-red-50)}:host.text-color-pink{color:var(--palette-pink-50)}:host.text-color-orange{color:var(--palette-orange-50)}:host.text-color-yellow{color:var(--palette-yellow-50)}:host.text-color-green{color:var(--palette-green-50)}:host.text-color-teal{color:var(--palette-teal-50)}:host.text-color-blue{color:var(--palette-blue-50)}:host.text-color-aqua{color:var(--palette-aqua-50)}:host.text-color-indigo{color:var(--palette-indigo-50)}:host.text-color-violet{color:var(--palette-violet-50)}:host.text-color-gray{color:var(--palette-gray-50)}:host.margin-before{margin-top:.4rem}:host.margin-after{margin-bottom:.8rem}:host.text-length-small{max-width:40ch}:host.text-length-medium{max-width:55ch}:host.text-length-large{max-width:70ch}:host.text-weight-hairline{font-weight:100}:host.text-weight-thin{font-weight:200}:host.text-weight-light{font-weight:300}:host.text-weight-normal{font-weight:400}:host.text-weight-medium{font-weight:500}:host.text-weight-semibold{font-weight:600}:host.text-weight-bold{font-weight:700}:host.text-weight-extrabold{font-weight:800}:host.text-weight-heavy{font-weight:900}:host.text-weight-lighter{font-weight:lighter}:host.text-weight-bolder{font-weight:bolder}:host.novo-field-hint-end{order:1;text-align:right;align-content:end;justify-content:flex-end}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoHintElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-hint', host: {
                        class: 'novo-hint',
                        '[class.novo-field-hint-end]': 'align === "end"',
                        '[attr.id]': 'id',
                        // Remove align attribute to prevent it from interfering with layout.
                        '[attr.align]': 'null',
                    }, template: "<ng-content></ng-content>", styles: [":host{font-size:var(--font-size-caption);font-weight:400;line-height:1.375;transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;display:flex;flex:1 0 auto;width:-webkit-max-content;width:-moz-max-content;width:max-content;color:var(--color-text-muted);padding-bottom:.4rem;padding-top:.4rem}:host.text-capitalize{text-transform:capitalize}:host.text-uppercase{text-transform:uppercase}:host.text-nowrap{white-space:nowrap}:host.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host.text-size-default{font-size:inherit}:host.text-size-body{font-size:var(--font-size-body)}:host.text-size-xs{font-size:var(--font-size-xs)}:host.text-size-sm{font-size:var(--font-size-sm)}:host.text-size-md{font-size:var(--font-size-md)}:host.text-size-lg{font-size:var(--font-size-lg)}:host.text-size-xl{font-size:var(--font-size-xl)}:host.text-size-2xl{font-size:var(--font-size-2xl)}:host.text-size-3xl{font-size:var(--font-size-3xl)}:host.text-size-smaller{font-size:.8em}:host.text-size-larger{font-size:1.2em}:host.text-color-person{color:var(--color-person)}:host.text-color-company{color:var(--color-company)}:host.text-color-candidate{color:var(--color-candidate)}:host.text-color-lead{color:var(--color-lead)}:host.text-color-contact{color:var(--color-contact)}:host.text-color-clientcontact{color:var(--color-clientcontact)}:host.text-color-opportunity{color:var(--color-opportunity)}:host.text-color-job{color:var(--color-job)}:host.text-color-joborder{color:var(--color-joborder)}:host.text-color-submission{color:var(--color-submission)}:host.text-color-sendout{color:var(--color-sendout)}:host.text-color-placement{color:var(--color-placement)}:host.text-color-note{color:var(--color-note)}:host.text-color-task{color:var(--color-task)}:host.text-color-distribution-list{color:var(--color-distribution-list)}:host.text-color-credential{color:var(--color-credential)}:host.text-color-user{color:var(--color-user)}:host.text-color-corporate-user{color:var(--color-corporate-user)}:host.text-color-contract{color:var(--color-contract)}:host.text-color-job-code{color:var(--color-job-code)}:host.text-color-earn-code{color:var(--color-earn-code)}:host.text-color-billable-charge{color:var(--color-billable-charge)}:host.text-color-payable-charge{color:var(--color-payable-charge)}:host.text-color-invoice-statement{color:var(--color-invoice-statement)}:host.text-color-selection{color:var(--color-selection)}:host.text-color-positive{color:var(--color-positive)}:host.text-color-success{color:var(--color-success)}:host.text-color-warning{color:var(--color-warning)}:host.text-color-error{color:var(--color-error)}:host.text-color-info{color:var(--color-info)}:host.text-color-disabled{color:var(--color-disabled)}:host.text-color-red{color:var(--palette-red-50)}:host.text-color-pink{color:var(--palette-pink-50)}:host.text-color-orange{color:var(--palette-orange-50)}:host.text-color-yellow{color:var(--palette-yellow-50)}:host.text-color-green{color:var(--palette-green-50)}:host.text-color-teal{color:var(--palette-teal-50)}:host.text-color-blue{color:var(--palette-blue-50)}:host.text-color-aqua{color:var(--palette-aqua-50)}:host.text-color-indigo{color:var(--palette-indigo-50)}:host.text-color-violet{color:var(--palette-violet-50)}:host.text-color-gray{color:var(--palette-gray-50)}:host.margin-before{margin-top:.4rem}:host.margin-after{margin-bottom:.8rem}:host.text-length-small{max-width:40ch}:host.text-length-medium{max-width:55ch}:host.text-length-large{max-width:70ch}:host.text-weight-hairline{font-weight:100}:host.text-weight-thin{font-weight:200}:host.text-weight-light{font-weight:300}:host.text-weight-normal{font-weight:400}:host.text-weight-medium{font-weight:500}:host.text-weight-semibold{font-weight:600}:host.text-weight-bold{font-weight:700}:host.text-weight-extrabold{font-weight:800}:host.text-weight-heavy{font-weight:900}:host.text-weight-lighter{font-weight:lighter}:host.text-weight-bolder{font-weight:bolder}:host.novo-field-hint-end{order:1;text-align:right;align-content:end;justify-content:flex-end}\n"] }]
        }], propDecorators: { align: [{
                type: Input
            }], id: [{
                type: Input
            }] } });

// NG2
class NovoFieldPrefixDirective {
}
NovoFieldPrefixDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFieldPrefixDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NovoFieldPrefixDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoFieldPrefixDirective, selector: "[novoPrefix]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFieldPrefixDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[novoPrefix]' }]
        }] });
class NovoFieldSuffixDirective {
}
NovoFieldSuffixDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFieldSuffixDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NovoFieldSuffixDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoFieldSuffixDirective, selector: "[novoSuffix]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFieldSuffixDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[novoSuffix]' }]
        }] });
const NOVO_INPUT_UNDERLINED_TYPES = [
    'text',
    'date',
    'time',
    'datetime-local',
    'password',
    'email',
    'tel',
    'select',
    'textarea',
    'number',
    'novo-chip-list',
    'chip-list',
];
const NOVO_FORM_FIELD = new InjectionToken('NovoFormField');
class NovoFieldElement {
    constructor(_elementRef, _changeDetectorRef) {
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._labelClicks = Subscription.EMPTY;
        this.layout = 'vertical';
        this.appearance = 'standard';
        this._destroyed = new Subject();
        this.valueChanges = new EventEmitter();
        this.stateChanges = new EventEmitter();
    }
    /**
     * Gets an ElementRef for the element that a overlay attached to the form-field should be
     * positioned relative to.
     */
    getConnectedOverlayOrigin() {
        return this._inputContainerRef || this._elementRef;
    }
    ngAfterContentInit() {
        var _a;
        this._validateControlChild();
        const control = this._control;
        if (control.controlType) {
            this._elementRef.nativeElement.classList.add(`novo-field-type-${control.controlType}`);
            this._elementRef.nativeElement.setAttribute('data-control-type', control.controlType);
        }
        if (control.id) {
            this._elementRef.nativeElement.setAttribute('data-control-id', control.id);
        }
        if ((_a = control.ngControl) === null || _a === void 0 ? void 0 : _a.name) {
            this._elementRef.nativeElement.setAttribute('data-control-key', control.ngControl.name);
        }
        // Subscribe to changes in the child control state in order to update the form field UI.
        // tslint:disable-next-line:deprecation
        control.stateChanges.pipe(startWith(null)).subscribe(() => {
            this.stateChanges.next();
            this._changeDetectorRef.markForCheck();
        });
        // Run change detection if the value changes.
        if (control.ngControl && control.ngControl.valueChanges) {
            control.ngControl.valueChanges.pipe(takeUntil(this._destroyed)).subscribe((v) => {
                this.valueChanges.next(v);
                this._changeDetectorRef.markForCheck();
            });
        }
        if (this._hasLabel()) {
            this._labelClicks = fromEvent(this._labelElement.nativeElement, 'click').subscribe(() => this._control.focus());
        }
    }
    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
        this._labelClicks.unsubscribe();
    }
    /** Throws an error if the form field's control is missing. */
    _validateControlChild() {
        if (!this._control) {
            throw new Error('Missing Novo Control');
        }
    }
    _handleContainerClick(evt) {
        this._control.onContainerClick(evt);
    }
    _isUnderlinedInput() {
        return NOVO_INPUT_UNDERLINED_TYPES.includes(this._control.controlType);
    }
    /** Determines whether to display hints or errors. */
    _getDisplayedMessages() {
        return this._errorElements && this._errorElements.length > 0 && this._control.errorState ? 'error' : 'hint';
    }
    /** Determines whether a class from the NgControl should be forwarded to the host element. */
    _shouldForward(prop) {
        const ngControl = this._control ? this._control.ngControl : null;
        return ngControl && ngControl[prop];
    }
    _hasLabel() {
        return !!this._labelElement;
    }
}
NovoFieldElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFieldElement, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NovoFieldElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoFieldElement, selector: "novo-field", inputs: { layout: "layout", appearance: "appearance", width: "width" }, outputs: { valueChanges: "valueChanges", stateChanges: "stateChanges" }, host: { listeners: { "click": "_handleContainerClick($event)" }, properties: { "class.novo-field-layout-horizontal": "layout==\"horizontal\"", "class.novo-field-layout-vertical": "layout==\"vertical\"", "class.novo-field-appearance-standard": "appearance == \"standard\"", "class.novo-field-appearance-fill": "appearance == \"fill\"", "class.novo-field-appearance-outline": "appearance == \"outline\"", "class.novo-field-appearance-list": "appearance == \"list\"", "class.novo-field-appearance-underlined": "_isUnderlinedInput()", "class.novo-field-invalid": "_control.errorState", "class.novo-field-has-label": "_hasLabel()", "class.novo-field-no-label": "!_hasLabel()", "class.novo-field-required": "_control.required", "class.novo-field-disabled": "_control.disabled", "class.novo-field-autofilled": "_control.autofilled", "class.novo-focused": "_control.focused", "class.ng-untouched": "_shouldForward(\"untouched\")", "class.ng-touched": "_shouldForward(\"touched\")", "class.ng-pristine": "_shouldForward(\"pristine\")", "class.ng-dirty": "_shouldForward(\"dirty\")", "class.ng-valid": "_shouldForward(\"valid\")", "class.ng-invalid": "_shouldForward(\"invalid\")", "class.ng-pending": "_shouldForward(\"pending\")" }, classAttribute: "novo-field" }, providers: [{ provide: NOVO_FORM_FIELD, useExisting: NovoFieldElement }], queries: [{ propertyName: "_labelElement", first: true, predicate: NovoLabel, descendants: true }, { propertyName: "_control", first: true, predicate: NovoFieldControl, descendants: true }, { propertyName: "_hintElements", predicate: NovoHintElement }, { propertyName: "_errorElements", predicate: NovoErrorElement }, { propertyName: "_prefixElements", predicate: NovoFieldPrefixDirective }, { propertyName: "_suffixElements", predicate: NovoFieldSuffixDirective }], viewQueries: [{ propertyName: "_inputContainerRef", first: true, predicate: ["inputContainer"], descendants: true }], ngImport: i0, template: "<div class=\"novo-field-label\">\n  <ng-content select=\"novo-label\"></ng-content>\n  <span *ngIf=\"_control.required\"\n    aria-hidden=\"true\"\n    class=\"novo-field-required-marker\">*</span>\n</div>\n<div class=\"novo-field-input\" [style.width]=\"width\" #inputContainer>\n  <div class=\"novo-field-prefix\">\n    <ng-content select=\"[novoPrefix]\"></ng-content>\n  </div>\n  <div class=\"novo-field-infix\">\n    <ng-content></ng-content>\n  </div>\n  <div class=\"novo-field-suffix\">\n    <ng-content select=\"[novoSuffix]\"></ng-content>\n  </div>\n</div>\n<div class=\"novo-field-messages\" [ngSwitch]=\"_getDisplayedMessages()\">\n  <div class=\"novo-field-hint-wrapper\" *ngSwitchCase=\"'error'\">\n    <ng-content select=\"novo-error\"></ng-content>\n  </div>\n  <div class=\"novo-field-hint-wrapper\" *ngSwitchCase=\"'hint'\">\n    <ng-content select=\"novo-hint\"></ng-content>\n    <ng-content select=\"novo-hint[align=end]\"></ng-content>\n  </div>\n</div>", styles: [":host{display:grid;position:relative}:host.novo-field-layout-horizontal{grid-gap:0rem 1rem;grid-template-columns:150px minmax(-webkit-min-content,-webkit-max-content);grid-template-columns:150px minmax(min-content,max-content);grid-template-areas:\"label input\" \". messages\"}:host.novo-field-layout-vertical{grid-template-columns:minmax(-webkit-min-content,100%);grid-template-columns:minmax(min-content,100%);grid-template-rows:repeat(3,minmax(-webkit-min-content,-webkit-max-content));grid-template-rows:repeat(3,minmax(min-content,max-content));grid-template-areas:\"label\" \"input\" \"messages\";width:-webkit-max-content;width:-moz-max-content;width:max-content}:host .novo-field-label{grid-area:label;display:flex;align-items:flex-end;gap:var(--spacing-xs)}:host .novo-field-input{grid-area:input;display:grid;align-items:flex-end;grid-template-columns:minmax(auto,-webkit-max-content) 1fr minmax(auto,-webkit-max-content);grid-template-columns:minmax(auto,max-content) 1fr minmax(auto,max-content);flex:1 1 100%;min-height:2.9rem}:host .novo-field-prefix{display:flex;align-items:center}:host .novo-field-infix{display:flex;align-items:center}:host .novo-field-infix select,:host .novo-field-infix::ng-deep .novo-input-element{width:100%}:host .novo-field-suffix{display:flex;align-items:center}:host .novo-field-messages{grid-area:messages;display:grid}:host .novo-field-hint-wrapper{display:flex;flex-direction:column}:host::ng-deep .novo-input-element{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;border:none;background-image:none;background-color:transparent;box-shadow:none;padding:.4rem .2rem 0rem;border-bottom:none!important}:host::ng-deep .novo-input-element.text-capitalize{text-transform:capitalize}:host::ng-deep .novo-input-element.text-uppercase{text-transform:uppercase}:host::ng-deep .novo-input-element.text-nowrap{white-space:nowrap}:host::ng-deep .novo-input-element.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host::ng-deep .novo-input-element.text-size-default{font-size:inherit}:host::ng-deep .novo-input-element.text-size-body{font-size:var(--font-size-body)}:host::ng-deep .novo-input-element.text-size-xs{font-size:var(--font-size-xs)}:host::ng-deep .novo-input-element.text-size-sm{font-size:var(--font-size-sm)}:host::ng-deep .novo-input-element.text-size-md{font-size:var(--font-size-md)}:host::ng-deep .novo-input-element.text-size-lg{font-size:var(--font-size-lg)}:host::ng-deep .novo-input-element.text-size-xl{font-size:var(--font-size-xl)}:host::ng-deep .novo-input-element.text-size-2xl{font-size:var(--font-size-2xl)}:host::ng-deep .novo-input-element.text-size-3xl{font-size:var(--font-size-3xl)}:host::ng-deep .novo-input-element.text-size-smaller{font-size:.8em}:host::ng-deep .novo-input-element.text-size-larger{font-size:1.2em}:host::ng-deep .novo-input-element.text-color-person{color:var(--color-person)}:host::ng-deep .novo-input-element.text-color-company{color:var(--color-company)}:host::ng-deep .novo-input-element.text-color-candidate{color:var(--color-candidate)}:host::ng-deep .novo-input-element.text-color-lead{color:var(--color-lead)}:host::ng-deep .novo-input-element.text-color-contact{color:var(--color-contact)}:host::ng-deep .novo-input-element.text-color-clientcontact{color:var(--color-clientcontact)}:host::ng-deep .novo-input-element.text-color-opportunity{color:var(--color-opportunity)}:host::ng-deep .novo-input-element.text-color-job{color:var(--color-job)}:host::ng-deep .novo-input-element.text-color-joborder{color:var(--color-joborder)}:host::ng-deep .novo-input-element.text-color-submission{color:var(--color-submission)}:host::ng-deep .novo-input-element.text-color-sendout{color:var(--color-sendout)}:host::ng-deep .novo-input-element.text-color-placement{color:var(--color-placement)}:host::ng-deep .novo-input-element.text-color-note{color:var(--color-note)}:host::ng-deep .novo-input-element.text-color-task{color:var(--color-task)}:host::ng-deep .novo-input-element.text-color-distribution-list{color:var(--color-distribution-list)}:host::ng-deep .novo-input-element.text-color-credential{color:var(--color-credential)}:host::ng-deep .novo-input-element.text-color-user{color:var(--color-user)}:host::ng-deep .novo-input-element.text-color-corporate-user{color:var(--color-corporate-user)}:host::ng-deep .novo-input-element.text-color-contract{color:var(--color-contract)}:host::ng-deep .novo-input-element.text-color-job-code{color:var(--color-job-code)}:host::ng-deep .novo-input-element.text-color-earn-code{color:var(--color-earn-code)}:host::ng-deep .novo-input-element.text-color-billable-charge{color:var(--color-billable-charge)}:host::ng-deep .novo-input-element.text-color-payable-charge{color:var(--color-payable-charge)}:host::ng-deep .novo-input-element.text-color-invoice-statement{color:var(--color-invoice-statement)}:host::ng-deep .novo-input-element.text-color-selection{color:var(--color-selection)}:host::ng-deep .novo-input-element.text-color-positive{color:var(--color-positive)}:host::ng-deep .novo-input-element.text-color-success{color:var(--color-success)}:host::ng-deep .novo-input-element.text-color-warning{color:var(--color-warning)}:host::ng-deep .novo-input-element.text-color-error{color:var(--color-error)}:host::ng-deep .novo-input-element.text-color-info{color:var(--color-info)}:host::ng-deep .novo-input-element.text-color-disabled{color:var(--color-disabled)}:host::ng-deep .novo-input-element.text-color-red{color:var(--palette-red-50)}:host::ng-deep .novo-input-element.text-color-pink{color:var(--palette-pink-50)}:host::ng-deep .novo-input-element.text-color-orange{color:var(--palette-orange-50)}:host::ng-deep .novo-input-element.text-color-yellow{color:var(--palette-yellow-50)}:host::ng-deep .novo-input-element.text-color-green{color:var(--palette-green-50)}:host::ng-deep .novo-input-element.text-color-teal{color:var(--palette-teal-50)}:host::ng-deep .novo-input-element.text-color-blue{color:var(--palette-blue-50)}:host::ng-deep .novo-input-element.text-color-aqua{color:var(--palette-aqua-50)}:host::ng-deep .novo-input-element.text-color-indigo{color:var(--palette-indigo-50)}:host::ng-deep .novo-input-element.text-color-violet{color:var(--palette-violet-50)}:host::ng-deep .novo-input-element.text-color-gray{color:var(--palette-gray-50)}:host::ng-deep .novo-input-element.margin-before{margin-top:.4rem}:host::ng-deep .novo-input-element.margin-after{margin-bottom:.8rem}:host::ng-deep .novo-input-element.text-length-small{max-width:40ch}:host::ng-deep .novo-input-element.text-length-medium{max-width:55ch}:host::ng-deep .novo-input-element.text-length-large{max-width:70ch}:host::ng-deep .novo-input-element.text-weight-hairline{font-weight:100}:host::ng-deep .novo-input-element.text-weight-thin{font-weight:200}:host::ng-deep .novo-input-element.text-weight-light{font-weight:300}:host::ng-deep .novo-input-element.text-weight-normal{font-weight:400}:host::ng-deep .novo-input-element.text-weight-medium{font-weight:500}:host::ng-deep .novo-input-element.text-weight-semibold{font-weight:600}:host::ng-deep .novo-input-element.text-weight-bold{font-weight:700}:host::ng-deep .novo-input-element.text-weight-extrabold{font-weight:800}:host::ng-deep .novo-input-element.text-weight-heavy{font-weight:900}:host::ng-deep .novo-input-element.text-weight-lighter{font-weight:lighter}:host::ng-deep .novo-input-element.text-weight-bolder{font-weight:bolder}:host::ng-deep .novo-input-element:focus{outline:none}:host::ng-deep .novo-input-element .novo-date-range-format{min-width:22rem}:host::ng-deep .novo-input-element.novo-field-type-color .novo-field-input .novo-input-element{padding:0}:host::ng-deep .novo-radio-group{padding:.5rem 0}:host .novo-field-required-marker{font-weight:500;word-break:word-break;overflow-wrap:break-word;line-height:1.375;color:var(--color-text-muted);font-size:var(--font-size-label);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;color:var(--color-error)}:host .novo-field-required-marker.text-capitalize{text-transform:capitalize}:host .novo-field-required-marker.text-uppercase{text-transform:uppercase}:host .novo-field-required-marker.text-nowrap{white-space:nowrap}:host .novo-field-required-marker.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .novo-field-required-marker.text-size-default{font-size:inherit}:host .novo-field-required-marker.text-size-body{font-size:var(--font-size-body)}:host .novo-field-required-marker.text-size-xs{font-size:var(--font-size-xs)}:host .novo-field-required-marker.text-size-sm{font-size:var(--font-size-sm)}:host .novo-field-required-marker.text-size-md{font-size:var(--font-size-md)}:host .novo-field-required-marker.text-size-lg{font-size:var(--font-size-lg)}:host .novo-field-required-marker.text-size-xl{font-size:var(--font-size-xl)}:host .novo-field-required-marker.text-size-2xl{font-size:var(--font-size-2xl)}:host .novo-field-required-marker.text-size-3xl{font-size:var(--font-size-3xl)}:host .novo-field-required-marker.text-size-smaller{font-size:.8em}:host .novo-field-required-marker.text-size-larger{font-size:1.2em}:host .novo-field-required-marker.text-color-person{color:var(--color-person)}:host .novo-field-required-marker.text-color-company{color:var(--color-company)}:host .novo-field-required-marker.text-color-candidate{color:var(--color-candidate)}:host .novo-field-required-marker.text-color-lead{color:var(--color-lead)}:host .novo-field-required-marker.text-color-contact{color:var(--color-contact)}:host .novo-field-required-marker.text-color-clientcontact{color:var(--color-clientcontact)}:host .novo-field-required-marker.text-color-opportunity{color:var(--color-opportunity)}:host .novo-field-required-marker.text-color-job{color:var(--color-job)}:host .novo-field-required-marker.text-color-joborder{color:var(--color-joborder)}:host .novo-field-required-marker.text-color-submission{color:var(--color-submission)}:host .novo-field-required-marker.text-color-sendout{color:var(--color-sendout)}:host .novo-field-required-marker.text-color-placement{color:var(--color-placement)}:host .novo-field-required-marker.text-color-note{color:var(--color-note)}:host .novo-field-required-marker.text-color-task{color:var(--color-task)}:host .novo-field-required-marker.text-color-distribution-list{color:var(--color-distribution-list)}:host .novo-field-required-marker.text-color-credential{color:var(--color-credential)}:host .novo-field-required-marker.text-color-user{color:var(--color-user)}:host .novo-field-required-marker.text-color-corporate-user{color:var(--color-corporate-user)}:host .novo-field-required-marker.text-color-contract{color:var(--color-contract)}:host .novo-field-required-marker.text-color-job-code{color:var(--color-job-code)}:host .novo-field-required-marker.text-color-earn-code{color:var(--color-earn-code)}:host .novo-field-required-marker.text-color-billable-charge{color:var(--color-billable-charge)}:host .novo-field-required-marker.text-color-payable-charge{color:var(--color-payable-charge)}:host .novo-field-required-marker.text-color-invoice-statement{color:var(--color-invoice-statement)}:host .novo-field-required-marker.text-color-selection{color:var(--color-selection)}:host .novo-field-required-marker.text-color-positive{color:var(--color-positive)}:host .novo-field-required-marker.text-color-success{color:var(--color-success)}:host .novo-field-required-marker.text-color-warning{color:var(--color-warning)}:host .novo-field-required-marker.text-color-error{color:var(--color-error)}:host .novo-field-required-marker.text-color-info{color:var(--color-info)}:host .novo-field-required-marker.text-color-disabled{color:var(--color-disabled)}:host .novo-field-required-marker.text-color-red{color:var(--palette-red-50)}:host .novo-field-required-marker.text-color-pink{color:var(--palette-pink-50)}:host .novo-field-required-marker.text-color-orange{color:var(--palette-orange-50)}:host .novo-field-required-marker.text-color-yellow{color:var(--palette-yellow-50)}:host .novo-field-required-marker.text-color-green{color:var(--palette-green-50)}:host .novo-field-required-marker.text-color-teal{color:var(--palette-teal-50)}:host .novo-field-required-marker.text-color-blue{color:var(--palette-blue-50)}:host .novo-field-required-marker.text-color-aqua{color:var(--palette-aqua-50)}:host .novo-field-required-marker.text-color-indigo{color:var(--palette-indigo-50)}:host .novo-field-required-marker.text-color-violet{color:var(--palette-violet-50)}:host .novo-field-required-marker.text-color-gray{color:var(--palette-gray-50)}:host .novo-field-required-marker.margin-before{margin-top:.4rem}:host .novo-field-required-marker.margin-after{margin-bottom:.8rem}:host .novo-field-required-marker.text-length-small{max-width:40ch}:host .novo-field-required-marker.text-length-medium{max-width:55ch}:host .novo-field-required-marker.text-length-large{max-width:70ch}:host .novo-field-required-marker.text-weight-hairline{font-weight:100}:host .novo-field-required-marker.text-weight-thin{font-weight:200}:host .novo-field-required-marker.text-weight-light{font-weight:300}:host .novo-field-required-marker.text-weight-normal{font-weight:400}:host .novo-field-required-marker.text-weight-medium{font-weight:500}:host .novo-field-required-marker.text-weight-semibold{font-weight:600}:host .novo-field-required-marker.text-weight-bold{font-weight:700}:host .novo-field-required-marker.text-weight-extrabold{font-weight:800}:host .novo-field-required-marker.text-weight-heavy{font-weight:900}:host .novo-field-required-marker.text-weight-lighter{font-weight:lighter}:host .novo-field-required-marker.text-weight-bolder{font-weight:bolder}\n", ":host.novo-field-appearance-standard.novo-field-appearance-underlined .novo-field-input{border-bottom:1px solid var(--color-border)!important}:host.novo-field-appearance-standard.novo-field-appearance-underlined:not(.novo-focused):not(.novo-field-disabled):hover .novo-field-input{border-bottom:1px solid var(--color-border)!important}:host.novo-field-appearance-standard.novo-field-appearance-underlined.novo-focused .novo-field-input{border-bottom:1px solid var(--color-selection)!important}:host.novo-field-appearance-standard.novo-field-appearance-underlined.novo-field-invalid .novo-field-input{border-bottom:1px solid var(--color-error)!important}:host.novo-field-appearance-standard.novo-field-appearance-underlined.novo-field-disabled .novo-field-input{color:var(--color-disabled);background-color:var(--color-disabled-overlay);border-bottom:1px dashed var(--color-disabled)!important}\n", ":host.novo-field-appearance-fill.novo-field-layout-horizontal .novo-field-input{background:var(--color-background-secondary)}:host.novo-field-appearance-fill.novo-field-layout-vertical{background:var(--color-background-secondary)}:host.novo-field-appearance-fill.novo-field-layout-vertical .novo-field-label{padding-top:.5em;padding-left:.5em;padding-right:.5em}:host.novo-field-appearance-fill.novo-field-layout-vertical .novo-field-input{padding:0 .5em}:host.novo-field-appearance-fill.novo-field-appearance-underlined .novo-field-input{border-bottom:1px solid var(--color-border)!important}:host.novo-field-appearance-fill.novo-field-appearance-underlined:not(.novo-focused):hover .novo-field-input{border-bottom:1px solid var(--color-border)!important}:host.novo-field-appearance-fill.novo-field-appearance-underlined.novo-focused .novo-field-label{color:var(--color-selection)!important}:host.novo-field-appearance-fill.novo-field-appearance-underlined.novo-focused .novo-field-input{border-bottom:1px solid var(--color-selection)!important}:host.novo-field-appearance-fill.novo-field-appearance-underlined.novo-field-invalid .novo-field-input{border-bottom:1px solid var(--color-error)!important}\n", ":host.novo-field-appearance-outline.novo-field-layout-vertical .novo-field-label{background:white;width:-webkit-max-content;width:-moz-max-content;width:max-content;padding:.5rem}:host.novo-field-appearance-outline .novo-field-input{border:1px solid var(--color-border)!important;border-radius:var(--border-radius);padding:var(--spacing-xs) var(--spacing-md)}:host.novo-field-appearance-outline:not(.novo-focused):not(.novo-field-disabled):hover .novo-field-input{border:1px solid var(--color-border)!important}:host.novo-field-appearance-outline.novo-focused .novo-field-input{border:1px solid var(--color-selection)!important}:host.novo-field-appearance-outline.novo-field-invalid .novo-field-input{border:1px solid var(--color-error)!important}:host.novo-field-appearance-outline.novo-field-disabled .novo-field-input{color:var(--color-disabled);background-color:var(--color-disabled-overlay);border:1px solid var(--color-disabled)!important}\n", ":host.novo-field-appearance-list.novo-field-layout-horizontal{border-bottom:1px solid var(--color-border)!important;padding:.5rem 1.2rem;min-height:4.2rem}:host.novo-field-appearance-list.novo-field-layout-horizontal .novo-field-label{align-items:start;margin-top:.9rem}:host.novo-field-appearance-list.novo-field-layout-horizontal.novo-field-no-label{grid-template-columns:0px minmax(300px,600px);gap:0}:host.novo-field-appearance-list.novo-field-layout-horizontal.novo-field-appearance-underlined:not(.novo-focused):hover .novo-field-input{background:var(--color-selection-overlay)}:host.novo-field-appearance-list.novo-field-layout-horizontal.novo-field-appearance-underlined.novo-focused .novo-field-label{color:var(--color-selection)!important}:host.novo-field-appearance-list.novo-field-layout-horizontal.novo-field-appearance-underlined.novo-field-invalid .novo-field-label{color:var(--color-error)!important}\n"], directives: [{ type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1$1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i1$1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFieldElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-field', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        class: 'novo-field',
                        '[class.novo-field-layout-horizontal]': 'layout=="horizontal"',
                        '[class.novo-field-layout-vertical]': 'layout=="vertical"',
                        '[class.novo-field-appearance-standard]': 'appearance == "standard"',
                        '[class.novo-field-appearance-fill]': 'appearance == "fill"',
                        '[class.novo-field-appearance-outline]': 'appearance == "outline"',
                        '[class.novo-field-appearance-list]': 'appearance == "list"',
                        '[class.novo-field-appearance-underlined]': '_isUnderlinedInput()',
                        '[class.novo-field-invalid]': '_control.errorState',
                        '[class.novo-field-has-label]': '_hasLabel()',
                        '[class.novo-field-no-label]': '!_hasLabel()',
                        // '[class.novo-field-hide-placeholder]': '_hideControlPlaceholder()',
                        '[class.novo-field-required]': '_control.required',
                        '[class.novo-field-disabled]': '_control.disabled',
                        '[class.novo-field-autofilled]': '_control.autofilled',
                        '[class.novo-focused]': '_control.focused',
                        // '[class.novo-accent]': 'color == "accent"',
                        // '[class.novo-warn]': 'color == "warn"',
                        '[class.ng-untouched]': '_shouldForward("untouched")',
                        '[class.ng-touched]': '_shouldForward("touched")',
                        '[class.ng-pristine]': '_shouldForward("pristine")',
                        '[class.ng-dirty]': '_shouldForward("dirty")',
                        '[class.ng-valid]': '_shouldForward("valid")',
                        '[class.ng-invalid]': '_shouldForward("invalid")',
                        '[class.ng-pending]': '_shouldForward("pending")',
                    }, providers: [{ provide: NOVO_FORM_FIELD, useExisting: NovoFieldElement }], template: "<div class=\"novo-field-label\">\n  <ng-content select=\"novo-label\"></ng-content>\n  <span *ngIf=\"_control.required\"\n    aria-hidden=\"true\"\n    class=\"novo-field-required-marker\">*</span>\n</div>\n<div class=\"novo-field-input\" [style.width]=\"width\" #inputContainer>\n  <div class=\"novo-field-prefix\">\n    <ng-content select=\"[novoPrefix]\"></ng-content>\n  </div>\n  <div class=\"novo-field-infix\">\n    <ng-content></ng-content>\n  </div>\n  <div class=\"novo-field-suffix\">\n    <ng-content select=\"[novoSuffix]\"></ng-content>\n  </div>\n</div>\n<div class=\"novo-field-messages\" [ngSwitch]=\"_getDisplayedMessages()\">\n  <div class=\"novo-field-hint-wrapper\" *ngSwitchCase=\"'error'\">\n    <ng-content select=\"novo-error\"></ng-content>\n  </div>\n  <div class=\"novo-field-hint-wrapper\" *ngSwitchCase=\"'hint'\">\n    <ng-content select=\"novo-hint\"></ng-content>\n    <ng-content select=\"novo-hint[align=end]\"></ng-content>\n  </div>\n</div>", styles: [":host{display:grid;position:relative}:host.novo-field-layout-horizontal{grid-gap:0rem 1rem;grid-template-columns:150px minmax(-webkit-min-content,-webkit-max-content);grid-template-columns:150px minmax(min-content,max-content);grid-template-areas:\"label input\" \". messages\"}:host.novo-field-layout-vertical{grid-template-columns:minmax(-webkit-min-content,100%);grid-template-columns:minmax(min-content,100%);grid-template-rows:repeat(3,minmax(-webkit-min-content,-webkit-max-content));grid-template-rows:repeat(3,minmax(min-content,max-content));grid-template-areas:\"label\" \"input\" \"messages\";width:-webkit-max-content;width:-moz-max-content;width:max-content}:host .novo-field-label{grid-area:label;display:flex;align-items:flex-end;gap:var(--spacing-xs)}:host .novo-field-input{grid-area:input;display:grid;align-items:flex-end;grid-template-columns:minmax(auto,-webkit-max-content) 1fr minmax(auto,-webkit-max-content);grid-template-columns:minmax(auto,max-content) 1fr minmax(auto,max-content);flex:1 1 100%;min-height:2.9rem}:host .novo-field-prefix{display:flex;align-items:center}:host .novo-field-infix{display:flex;align-items:center}:host .novo-field-infix select,:host .novo-field-infix::ng-deep .novo-input-element{width:100%}:host .novo-field-suffix{display:flex;align-items:center}:host .novo-field-messages{grid-area:messages;display:grid}:host .novo-field-hint-wrapper{display:flex;flex-direction:column}:host::ng-deep .novo-input-element{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;border:none;background-image:none;background-color:transparent;box-shadow:none;padding:.4rem .2rem 0rem;border-bottom:none!important}:host::ng-deep .novo-input-element.text-capitalize{text-transform:capitalize}:host::ng-deep .novo-input-element.text-uppercase{text-transform:uppercase}:host::ng-deep .novo-input-element.text-nowrap{white-space:nowrap}:host::ng-deep .novo-input-element.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host::ng-deep .novo-input-element.text-size-default{font-size:inherit}:host::ng-deep .novo-input-element.text-size-body{font-size:var(--font-size-body)}:host::ng-deep .novo-input-element.text-size-xs{font-size:var(--font-size-xs)}:host::ng-deep .novo-input-element.text-size-sm{font-size:var(--font-size-sm)}:host::ng-deep .novo-input-element.text-size-md{font-size:var(--font-size-md)}:host::ng-deep .novo-input-element.text-size-lg{font-size:var(--font-size-lg)}:host::ng-deep .novo-input-element.text-size-xl{font-size:var(--font-size-xl)}:host::ng-deep .novo-input-element.text-size-2xl{font-size:var(--font-size-2xl)}:host::ng-deep .novo-input-element.text-size-3xl{font-size:var(--font-size-3xl)}:host::ng-deep .novo-input-element.text-size-smaller{font-size:.8em}:host::ng-deep .novo-input-element.text-size-larger{font-size:1.2em}:host::ng-deep .novo-input-element.text-color-person{color:var(--color-person)}:host::ng-deep .novo-input-element.text-color-company{color:var(--color-company)}:host::ng-deep .novo-input-element.text-color-candidate{color:var(--color-candidate)}:host::ng-deep .novo-input-element.text-color-lead{color:var(--color-lead)}:host::ng-deep .novo-input-element.text-color-contact{color:var(--color-contact)}:host::ng-deep .novo-input-element.text-color-clientcontact{color:var(--color-clientcontact)}:host::ng-deep .novo-input-element.text-color-opportunity{color:var(--color-opportunity)}:host::ng-deep .novo-input-element.text-color-job{color:var(--color-job)}:host::ng-deep .novo-input-element.text-color-joborder{color:var(--color-joborder)}:host::ng-deep .novo-input-element.text-color-submission{color:var(--color-submission)}:host::ng-deep .novo-input-element.text-color-sendout{color:var(--color-sendout)}:host::ng-deep .novo-input-element.text-color-placement{color:var(--color-placement)}:host::ng-deep .novo-input-element.text-color-note{color:var(--color-note)}:host::ng-deep .novo-input-element.text-color-task{color:var(--color-task)}:host::ng-deep .novo-input-element.text-color-distribution-list{color:var(--color-distribution-list)}:host::ng-deep .novo-input-element.text-color-credential{color:var(--color-credential)}:host::ng-deep .novo-input-element.text-color-user{color:var(--color-user)}:host::ng-deep .novo-input-element.text-color-corporate-user{color:var(--color-corporate-user)}:host::ng-deep .novo-input-element.text-color-contract{color:var(--color-contract)}:host::ng-deep .novo-input-element.text-color-job-code{color:var(--color-job-code)}:host::ng-deep .novo-input-element.text-color-earn-code{color:var(--color-earn-code)}:host::ng-deep .novo-input-element.text-color-billable-charge{color:var(--color-billable-charge)}:host::ng-deep .novo-input-element.text-color-payable-charge{color:var(--color-payable-charge)}:host::ng-deep .novo-input-element.text-color-invoice-statement{color:var(--color-invoice-statement)}:host::ng-deep .novo-input-element.text-color-selection{color:var(--color-selection)}:host::ng-deep .novo-input-element.text-color-positive{color:var(--color-positive)}:host::ng-deep .novo-input-element.text-color-success{color:var(--color-success)}:host::ng-deep .novo-input-element.text-color-warning{color:var(--color-warning)}:host::ng-deep .novo-input-element.text-color-error{color:var(--color-error)}:host::ng-deep .novo-input-element.text-color-info{color:var(--color-info)}:host::ng-deep .novo-input-element.text-color-disabled{color:var(--color-disabled)}:host::ng-deep .novo-input-element.text-color-red{color:var(--palette-red-50)}:host::ng-deep .novo-input-element.text-color-pink{color:var(--palette-pink-50)}:host::ng-deep .novo-input-element.text-color-orange{color:var(--palette-orange-50)}:host::ng-deep .novo-input-element.text-color-yellow{color:var(--palette-yellow-50)}:host::ng-deep .novo-input-element.text-color-green{color:var(--palette-green-50)}:host::ng-deep .novo-input-element.text-color-teal{color:var(--palette-teal-50)}:host::ng-deep .novo-input-element.text-color-blue{color:var(--palette-blue-50)}:host::ng-deep .novo-input-element.text-color-aqua{color:var(--palette-aqua-50)}:host::ng-deep .novo-input-element.text-color-indigo{color:var(--palette-indigo-50)}:host::ng-deep .novo-input-element.text-color-violet{color:var(--palette-violet-50)}:host::ng-deep .novo-input-element.text-color-gray{color:var(--palette-gray-50)}:host::ng-deep .novo-input-element.margin-before{margin-top:.4rem}:host::ng-deep .novo-input-element.margin-after{margin-bottom:.8rem}:host::ng-deep .novo-input-element.text-length-small{max-width:40ch}:host::ng-deep .novo-input-element.text-length-medium{max-width:55ch}:host::ng-deep .novo-input-element.text-length-large{max-width:70ch}:host::ng-deep .novo-input-element.text-weight-hairline{font-weight:100}:host::ng-deep .novo-input-element.text-weight-thin{font-weight:200}:host::ng-deep .novo-input-element.text-weight-light{font-weight:300}:host::ng-deep .novo-input-element.text-weight-normal{font-weight:400}:host::ng-deep .novo-input-element.text-weight-medium{font-weight:500}:host::ng-deep .novo-input-element.text-weight-semibold{font-weight:600}:host::ng-deep .novo-input-element.text-weight-bold{font-weight:700}:host::ng-deep .novo-input-element.text-weight-extrabold{font-weight:800}:host::ng-deep .novo-input-element.text-weight-heavy{font-weight:900}:host::ng-deep .novo-input-element.text-weight-lighter{font-weight:lighter}:host::ng-deep .novo-input-element.text-weight-bolder{font-weight:bolder}:host::ng-deep .novo-input-element:focus{outline:none}:host::ng-deep .novo-input-element .novo-date-range-format{min-width:22rem}:host::ng-deep .novo-input-element.novo-field-type-color .novo-field-input .novo-input-element{padding:0}:host::ng-deep .novo-radio-group{padding:.5rem 0}:host .novo-field-required-marker{font-weight:500;word-break:word-break;overflow-wrap:break-word;line-height:1.375;color:var(--color-text-muted);font-size:var(--font-size-label);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;color:var(--color-error)}:host .novo-field-required-marker.text-capitalize{text-transform:capitalize}:host .novo-field-required-marker.text-uppercase{text-transform:uppercase}:host .novo-field-required-marker.text-nowrap{white-space:nowrap}:host .novo-field-required-marker.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .novo-field-required-marker.text-size-default{font-size:inherit}:host .novo-field-required-marker.text-size-body{font-size:var(--font-size-body)}:host .novo-field-required-marker.text-size-xs{font-size:var(--font-size-xs)}:host .novo-field-required-marker.text-size-sm{font-size:var(--font-size-sm)}:host .novo-field-required-marker.text-size-md{font-size:var(--font-size-md)}:host .novo-field-required-marker.text-size-lg{font-size:var(--font-size-lg)}:host .novo-field-required-marker.text-size-xl{font-size:var(--font-size-xl)}:host .novo-field-required-marker.text-size-2xl{font-size:var(--font-size-2xl)}:host .novo-field-required-marker.text-size-3xl{font-size:var(--font-size-3xl)}:host .novo-field-required-marker.text-size-smaller{font-size:.8em}:host .novo-field-required-marker.text-size-larger{font-size:1.2em}:host .novo-field-required-marker.text-color-person{color:var(--color-person)}:host .novo-field-required-marker.text-color-company{color:var(--color-company)}:host .novo-field-required-marker.text-color-candidate{color:var(--color-candidate)}:host .novo-field-required-marker.text-color-lead{color:var(--color-lead)}:host .novo-field-required-marker.text-color-contact{color:var(--color-contact)}:host .novo-field-required-marker.text-color-clientcontact{color:var(--color-clientcontact)}:host .novo-field-required-marker.text-color-opportunity{color:var(--color-opportunity)}:host .novo-field-required-marker.text-color-job{color:var(--color-job)}:host .novo-field-required-marker.text-color-joborder{color:var(--color-joborder)}:host .novo-field-required-marker.text-color-submission{color:var(--color-submission)}:host .novo-field-required-marker.text-color-sendout{color:var(--color-sendout)}:host .novo-field-required-marker.text-color-placement{color:var(--color-placement)}:host .novo-field-required-marker.text-color-note{color:var(--color-note)}:host .novo-field-required-marker.text-color-task{color:var(--color-task)}:host .novo-field-required-marker.text-color-distribution-list{color:var(--color-distribution-list)}:host .novo-field-required-marker.text-color-credential{color:var(--color-credential)}:host .novo-field-required-marker.text-color-user{color:var(--color-user)}:host .novo-field-required-marker.text-color-corporate-user{color:var(--color-corporate-user)}:host .novo-field-required-marker.text-color-contract{color:var(--color-contract)}:host .novo-field-required-marker.text-color-job-code{color:var(--color-job-code)}:host .novo-field-required-marker.text-color-earn-code{color:var(--color-earn-code)}:host .novo-field-required-marker.text-color-billable-charge{color:var(--color-billable-charge)}:host .novo-field-required-marker.text-color-payable-charge{color:var(--color-payable-charge)}:host .novo-field-required-marker.text-color-invoice-statement{color:var(--color-invoice-statement)}:host .novo-field-required-marker.text-color-selection{color:var(--color-selection)}:host .novo-field-required-marker.text-color-positive{color:var(--color-positive)}:host .novo-field-required-marker.text-color-success{color:var(--color-success)}:host .novo-field-required-marker.text-color-warning{color:var(--color-warning)}:host .novo-field-required-marker.text-color-error{color:var(--color-error)}:host .novo-field-required-marker.text-color-info{color:var(--color-info)}:host .novo-field-required-marker.text-color-disabled{color:var(--color-disabled)}:host .novo-field-required-marker.text-color-red{color:var(--palette-red-50)}:host .novo-field-required-marker.text-color-pink{color:var(--palette-pink-50)}:host .novo-field-required-marker.text-color-orange{color:var(--palette-orange-50)}:host .novo-field-required-marker.text-color-yellow{color:var(--palette-yellow-50)}:host .novo-field-required-marker.text-color-green{color:var(--palette-green-50)}:host .novo-field-required-marker.text-color-teal{color:var(--palette-teal-50)}:host .novo-field-required-marker.text-color-blue{color:var(--palette-blue-50)}:host .novo-field-required-marker.text-color-aqua{color:var(--palette-aqua-50)}:host .novo-field-required-marker.text-color-indigo{color:var(--palette-indigo-50)}:host .novo-field-required-marker.text-color-violet{color:var(--palette-violet-50)}:host .novo-field-required-marker.text-color-gray{color:var(--palette-gray-50)}:host .novo-field-required-marker.margin-before{margin-top:.4rem}:host .novo-field-required-marker.margin-after{margin-bottom:.8rem}:host .novo-field-required-marker.text-length-small{max-width:40ch}:host .novo-field-required-marker.text-length-medium{max-width:55ch}:host .novo-field-required-marker.text-length-large{max-width:70ch}:host .novo-field-required-marker.text-weight-hairline{font-weight:100}:host .novo-field-required-marker.text-weight-thin{font-weight:200}:host .novo-field-required-marker.text-weight-light{font-weight:300}:host .novo-field-required-marker.text-weight-normal{font-weight:400}:host .novo-field-required-marker.text-weight-medium{font-weight:500}:host .novo-field-required-marker.text-weight-semibold{font-weight:600}:host .novo-field-required-marker.text-weight-bold{font-weight:700}:host .novo-field-required-marker.text-weight-extrabold{font-weight:800}:host .novo-field-required-marker.text-weight-heavy{font-weight:900}:host .novo-field-required-marker.text-weight-lighter{font-weight:lighter}:host .novo-field-required-marker.text-weight-bolder{font-weight:bolder}\n", ":host.novo-field-appearance-standard.novo-field-appearance-underlined .novo-field-input{border-bottom:1px solid var(--color-border)!important}:host.novo-field-appearance-standard.novo-field-appearance-underlined:not(.novo-focused):not(.novo-field-disabled):hover .novo-field-input{border-bottom:1px solid var(--color-border)!important}:host.novo-field-appearance-standard.novo-field-appearance-underlined.novo-focused .novo-field-input{border-bottom:1px solid var(--color-selection)!important}:host.novo-field-appearance-standard.novo-field-appearance-underlined.novo-field-invalid .novo-field-input{border-bottom:1px solid var(--color-error)!important}:host.novo-field-appearance-standard.novo-field-appearance-underlined.novo-field-disabled .novo-field-input{color:var(--color-disabled);background-color:var(--color-disabled-overlay);border-bottom:1px dashed var(--color-disabled)!important}\n", ":host.novo-field-appearance-fill.novo-field-layout-horizontal .novo-field-input{background:var(--color-background-secondary)}:host.novo-field-appearance-fill.novo-field-layout-vertical{background:var(--color-background-secondary)}:host.novo-field-appearance-fill.novo-field-layout-vertical .novo-field-label{padding-top:.5em;padding-left:.5em;padding-right:.5em}:host.novo-field-appearance-fill.novo-field-layout-vertical .novo-field-input{padding:0 .5em}:host.novo-field-appearance-fill.novo-field-appearance-underlined .novo-field-input{border-bottom:1px solid var(--color-border)!important}:host.novo-field-appearance-fill.novo-field-appearance-underlined:not(.novo-focused):hover .novo-field-input{border-bottom:1px solid var(--color-border)!important}:host.novo-field-appearance-fill.novo-field-appearance-underlined.novo-focused .novo-field-label{color:var(--color-selection)!important}:host.novo-field-appearance-fill.novo-field-appearance-underlined.novo-focused .novo-field-input{border-bottom:1px solid var(--color-selection)!important}:host.novo-field-appearance-fill.novo-field-appearance-underlined.novo-field-invalid .novo-field-input{border-bottom:1px solid var(--color-error)!important}\n", ":host.novo-field-appearance-outline.novo-field-layout-vertical .novo-field-label{background:white;width:-webkit-max-content;width:-moz-max-content;width:max-content;padding:.5rem}:host.novo-field-appearance-outline .novo-field-input{border:1px solid var(--color-border)!important;border-radius:var(--border-radius);padding:var(--spacing-xs) var(--spacing-md)}:host.novo-field-appearance-outline:not(.novo-focused):not(.novo-field-disabled):hover .novo-field-input{border:1px solid var(--color-border)!important}:host.novo-field-appearance-outline.novo-focused .novo-field-input{border:1px solid var(--color-selection)!important}:host.novo-field-appearance-outline.novo-field-invalid .novo-field-input{border:1px solid var(--color-error)!important}:host.novo-field-appearance-outline.novo-field-disabled .novo-field-input{color:var(--color-disabled);background-color:var(--color-disabled-overlay);border:1px solid var(--color-disabled)!important}\n", ":host.novo-field-appearance-list.novo-field-layout-horizontal{border-bottom:1px solid var(--color-border)!important;padding:.5rem 1.2rem;min-height:4.2rem}:host.novo-field-appearance-list.novo-field-layout-horizontal .novo-field-label{align-items:start;margin-top:.9rem}:host.novo-field-appearance-list.novo-field-layout-horizontal.novo-field-no-label{grid-template-columns:0px minmax(300px,600px);gap:0}:host.novo-field-appearance-list.novo-field-layout-horizontal.novo-field-appearance-underlined:not(.novo-focused):hover .novo-field-input{background:var(--color-selection-overlay)}:host.novo-field-appearance-list.novo-field-layout-horizontal.novo-field-appearance-underlined.novo-focused .novo-field-label{color:var(--color-selection)!important}:host.novo-field-appearance-list.novo-field-layout-horizontal.novo-field-appearance-underlined.novo-field-invalid .novo-field-label{color:var(--color-error)!important}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { _inputContainerRef: [{
                type: ViewChild,
                args: ['inputContainer']
            }], _labelElement: [{
                type: ContentChild,
                args: [NovoLabel]
            }], _hintElements: [{
                type: ContentChildren,
                args: [NovoHintElement]
            }], _errorElements: [{
                type: ContentChildren,
                args: [NovoErrorElement]
            }], _prefixElements: [{
                type: ContentChildren,
                args: [NovoFieldPrefixDirective]
            }], _suffixElements: [{
                type: ContentChildren,
                args: [NovoFieldSuffixDirective]
            }], _control: [{
                type: ContentChild,
                args: [NovoFieldControl]
            }], layout: [{
                type: Input
            }], appearance: [{
                type: Input
            }], width: [{
                type: Input
            }], valueChanges: [{
                type: Output
            }], stateChanges: [{
                type: Output
            }], _handleContainerClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
};
class NovoFieldsElement {
    constructor() {
        this._layout = 'horizontal';
        this._appearance = 'standard';
        this.fullWidth = false;
    }
    get layout() {
        return this._layout;
    }
    set layout(value) {
        if (this._layout !== value) {
            this._layout = value;
            this._updateFieldLayout();
        }
    }
    get appearance() {
        return this._appearance;
    }
    set appearance(value) {
        if (this._appearance !== value) {
            this._appearance = value;
            this._updateFieldAppearance();
        }
    }
    ngAfterContentInit() {
        this._updateFieldLayout();
        this._updateFieldAppearance();
    }
    _updateFieldLayout() {
        if (this._fields) {
            this._fields.forEach((field) => {
                field.layout = this.layout;
            });
        }
    }
    _updateFieldAppearance() {
        if (this._fields) {
            this._fields.forEach((field) => {
                field.appearance = this.appearance;
            });
        }
    }
}
NovoFieldsElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFieldsElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoFieldsElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoFieldsElement, selector: "novo-fields", inputs: { layout: "layout", appearance: "appearance", fullWidth: "fullWidth" }, host: { properties: { "class.novo-fieldset-appearance-standard": "appearance == \"standard\"", "class.novo-fieldset-appearance-fill": "appearance == \"fill\"", "class.novo-fieldset-appearance-outline": "appearance == \"outline\"", "class.novo-fieldset-appearance-list": "appearance == \"list\"", "class.full-width": "this.fullWidth" }, classAttribute: "novo-field" }, queries: [{ propertyName: "_fields", predicate: NovoFieldElement }], ngImport: i0, template: "<ng-content></ng-content>", styles: [":host{display:grid;grid-gap:var(--spacing-md) var(--spacing-lg)}:host.novo-fieldset-appearance-list{grid-gap:0rem}:host.full-width::ng-deep novo-field.novo-field-layout-vertical{grid-template-columns:minmax(300px,1fr);width:-webkit-fill-available}:host.full-width::ng-deep novo-field.novo-field-layout-vertical .novo-input-element{width:100%}:host.full-width::ng-deep novo-field.novo-field-layout-horizontal{grid-template-columns:150px minmax(150px,1fr)}:host.full-width::ng-deep novo-field.novo-field-layout-horizontal .novo-input-element{width:100%}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate$1([
    BooleanInput(),
    __metadata$1("design:type", Boolean)
], NovoFieldsElement.prototype, "fullWidth", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFieldsElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-fields', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        class: 'novo-field',
                        '[class.novo-fieldset-appearance-standard]': 'appearance == "standard"',
                        '[class.novo-fieldset-appearance-fill]': 'appearance == "fill"',
                        '[class.novo-fieldset-appearance-outline]': 'appearance == "outline"',
                        '[class.novo-fieldset-appearance-list]': 'appearance == "list"',
                        // '[class.novo-field-layout-horizontal]': 'layout=="horizontal"',
                        // '[class.novo-field-layout-vertical]': 'layout=="vertical"',
                    }, template: "<ng-content></ng-content>", styles: [":host{display:grid;grid-gap:var(--spacing-md) var(--spacing-lg)}:host.novo-fieldset-appearance-list{grid-gap:0rem}:host.full-width::ng-deep novo-field.novo-field-layout-vertical{grid-template-columns:minmax(300px,1fr);width:-webkit-fill-available}:host.full-width::ng-deep novo-field.novo-field-layout-vertical .novo-input-element{width:100%}:host.full-width::ng-deep novo-field.novo-field-layout-horizontal{grid-template-columns:150px minmax(150px,1fr)}:host.full-width::ng-deep novo-field.novo-field-layout-horizontal .novo-input-element{width:100%}\n"] }]
        }], propDecorators: { _fields: [{
                type: ContentChildren,
                args: [NovoFieldElement]
            }], layout: [{
                type: Input
            }], appearance: [{
                type: Input
            }], fullWidth: [{
                type: HostBinding,
                args: ['class.full-width']
            }, {
                type: Input
            }] } });

const NOVO_INPUT_FORMAT = new InjectionToken('NovoInputFormat');
var DATE_FORMATS;
(function (DATE_FORMATS) {
    DATE_FORMATS["DATE"] = "date";
    DATE_FORMATS["ISO8601"] = "iso8601";
    DATE_FORMATS["STRING"] = "string";
})(DATE_FORMATS || (DATE_FORMATS = {}));

const DATEFORMAT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoDateFormatDirective),
    multi: true,
};
class NovoDateFormatDirective extends IMaskDirective {
    constructor(_element, _renderer, _factory, _compositionMode, labels) {
        super(_element, _renderer, _factory, _compositionMode);
        this._element = _element;
        this.labels = labels;
        this.valueChange = new EventEmitter();
        this.dateFormat = DATE_FORMATS.DATE;
        const dateFormat = this.labels.dateFormat.toUpperCase();
        this.unmask = 'typed';
        this.imask = {
            mask: Date,
            pattern: 'm{/}`d{/}`Y',
            overwrite: true,
            autofix: true,
            lazy: false,
            min: new Date(1900, 0, 1),
            max: new Date(2030, 0, 1),
            prepare: (str) => str.toUpperCase(),
            format: (date) => this.formatValue(date),
            parse: (str) => {
                return DateUtil.parse(str);
            },
            blocks: {
                d: {
                    mask: IMask.MaskedRange,
                    placeholderChar: 'D',
                    from: 1,
                    to: 31,
                    maxLength: 2,
                },
                m: {
                    mask: IMask.MaskedRange,
                    placeholderChar: 'M',
                    from: 1,
                    to: 12,
                    maxLength: 2,
                },
                Y: {
                    mask: IMask.MaskedRange,
                    placeholderChar: 'Y',
                    from: 1900,
                    to: 9999,
                },
            },
        };
    }
    normalize(value) {
        const pattern = this.labels.dateFormat.toUpperCase();
        return DateUtil.format(DateUtil.parse(value), pattern);
    }
    formatAsIso(date) {
        if (date && isValid(date)) {
            return date.toISOString().slice(0, 10);
        }
        return null;
    }
    formatValue(value) {
        if (value == null)
            return '';
        // Use `parse` because it keeps dates in locale
        const date = DateUtil.parse(value);
        if (isValid(date)) {
            const dateFormat = this.labels.dateFormat.toUpperCase();
            return DateUtil.format(date, dateFormat);
        }
        return this.normalize(value);
    }
    writeValue(value) {
        super.writeValue(this.formatValue(value));
    }
    registerOnChange(fn) {
        this.onChange = (date) => {
            let formatted = date;
            switch (this.dateFormat) {
                case DATE_FORMATS.ISO8601:
                    formatted = this.formatAsIso(date);
                    break;
                case DATE_FORMATS.STRING:
                    formatted = this.formatValue(date);
                    break;
                default:
                    formatted = date;
                    break;
            }
            this.valueChange.emit(date);
            fn(formatted);
        };
    }
}
NovoDateFormatDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDateFormatDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1$2.IMaskFactory }, { token: COMPOSITION_BUFFER_MODE, optional: true }, { token: i2.NovoLabelService }], target: i0.ɵɵFactoryTarget.Directive });
NovoDateFormatDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoDateFormatDirective, selector: "input[dateFormat]", inputs: { dateFormat: "dateFormat" }, host: { classAttribute: "novo-date-format" }, providers: [DATEFORMAT_VALUE_ACCESSOR, { provide: NOVO_INPUT_FORMAT, useExisting: NovoDateFormatDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDateFormatDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[dateFormat]',
                    host: {
                        class: 'novo-date-format',
                    },
                    providers: [DATEFORMAT_VALUE_ACCESSOR, { provide: NOVO_INPUT_FORMAT, useExisting: NovoDateFormatDirective }],
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1$2.IMaskFactory }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [COMPOSITION_BUFFER_MODE]
                    }] }, { type: i2.NovoLabelService }];
    }, propDecorators: { dateFormat: [{
                type: Input
            }] } });

const DATERANGEFORMAT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoDateRangeFormatDirective),
    multi: true,
};
class NovoDateRangeFormatDirective extends IMaskDirective {
    constructor(_element, _renderer, _factory, _compositionMode, labels) {
        super(_element, _renderer, _factory, _compositionMode);
        this._element = _element;
        this.labels = labels;
        this.valueChange = new EventEmitter();
        this.dateRangeFormat = DATE_FORMATS.DATE;
        const dateRangeFormat = this.labels.dateFormat.toUpperCase();
        this.unmask = false;
        this.imask = {
            mask: 'm{/}`d{/}`Y - m{/}`d{/}`Y',
            overwrite: true,
            autofix: true,
            lazy: false,
            blocks: {
                d: {
                    mask: IMask.MaskedRange,
                    placeholderChar: 'D',
                    from: 1,
                    to: 31,
                    maxLength: 2,
                },
                m: {
                    mask: IMask.MaskedRange,
                    placeholderChar: 'M',
                    from: 1,
                    to: 12,
                    maxLength: 2,
                },
                Y: {
                    mask: IMask.MaskedRange,
                    placeholderChar: 'Y',
                    from: 1900,
                    to: 9999,
                },
            },
        };
    }
    normalize(value) {
        const pattern = this.labels.dateFormat.toUpperCase();
        return DateUtil.format(DateUtil.parse(value), pattern);
    }
    formatAsIso(value) {
        if (!value)
            return '';
        const { startDate, endDate } = value;
        if (startDate && isValid(startDate) && endDate && isValid(endDate)) {
            const startIso = startDate.toISOString().slice(0, 10);
            const endIso = endDate.toISOString().slice(0, 10);
            return `${startIso}/${endIso}`;
        }
        return null;
    }
    formatValue(value) {
        if (!value)
            return '';
        const { startDate, endDate } = value;
        return `${this.formatDate(startDate)} - ${this.formatDate(endDate)}`;
    }
    formatDate(source) {
        const date = DateUtil.parse(source);
        if (isValid(date)) {
            const dateRangeFormat = this.labels.dateFormat.toUpperCase();
            return DateUtil.format(date, dateRangeFormat);
        }
        return this.normalize(source);
    }
    writeValue(value) {
        const formattedValue = this.formatValue(value);
        if (formattedValue !== this.maskValue) {
            super.writeValue(this.formatValue(value));
            this.onChange(this.formatValue(value));
        }
    }
    registerOnChange(fn) {
        this.onChange = (input) => {
            if (this.validate(input)) {
                const dates = this.extractDatesFromInput(input);
                let formatted = dates;
                switch (this.dateRangeFormat) {
                    case DATE_FORMATS.ISO8601:
                        formatted = this.formatAsIso(dates);
                        break;
                    case DATE_FORMATS.STRING:
                        formatted = this.formatValue(dates);
                        break;
                    default:
                        formatted = dates;
                        break;
                }
                this.valueChange.emit(dates);
                fn(formatted);
            }
        };
    }
    extractDatesFromInput(value) {
        const [startStr, endStr] = value.split(' - ');
        const startDate = DateUtil.parse(startStr);
        const endDate = DateUtil.parse(endStr);
        return { startDate, endDate };
    }
    validate(dateStr) {
        const { startDate, endDate } = this.extractDatesFromInput(dateStr);
        return isValid(startDate) && isValid(endDate);
    }
}
NovoDateRangeFormatDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDateRangeFormatDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1$2.IMaskFactory }, { token: COMPOSITION_BUFFER_MODE, optional: true }, { token: i2.NovoLabelService }], target: i0.ɵɵFactoryTarget.Directive });
NovoDateRangeFormatDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoDateRangeFormatDirective, selector: "input[dateRangeFormat]", inputs: { dateRangeFormat: "dateRangeFormat" }, host: { classAttribute: "novo-date-range-format" }, providers: [DATERANGEFORMAT_VALUE_ACCESSOR, { provide: NOVO_INPUT_FORMAT, useExisting: NovoDateRangeFormatDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDateRangeFormatDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[dateRangeFormat]',
                    host: {
                        class: 'novo-date-range-format',
                    },
                    providers: [DATERANGEFORMAT_VALUE_ACCESSOR, { provide: NOVO_INPUT_FORMAT, useExisting: NovoDateRangeFormatDirective }],
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1$2.IMaskFactory }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [COMPOSITION_BUFFER_MODE]
                    }] }, { type: i2.NovoLabelService }];
    }, propDecorators: { dateRangeFormat: [{
                type: Input
            }] } });

const DATETIMEFORMAT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoDateTimeFormatDirective),
    multi: true,
};
class NovoDateTimeFormatDirective extends IMaskDirective {
    constructor(_element, _renderer, _factory, _compositionMode, labels) {
        super(_element, _renderer, _factory, _compositionMode);
        this._element = _element;
        this.labels = labels;
        this.valueChange = new EventEmitter();
        this.military = false;
        this.dateTimeFormat = DATE_FORMATS.DATE;
        this.initFormatOptions();
    }
    initFormatOptions() {
        const amFormat = this.labels.timeFormatAM.toUpperCase();
        const pmFormat = this.labels.timeFormatPM.toUpperCase();
        this.unmask = 'typed';
        this.imask = {
            mask: Date,
            pattern: this.military ? 'm{/}`d{/}`Y, HH:mm' : 'm{/}`d{/}`Y, HH:mm aa',
            overwrite: true,
            autofix: true,
            lazy: false,
            min: new Date(1900, 0, 1),
            max: new Date(2030, 0, 1),
            prepare: (str) => str.toUpperCase(),
            format: (date) => {
                const test1 = this.formatValue(date);
                return test1;
            },
            parse: (str) => {
                const test = DateUtil.parse(str);
                return test;
            },
            blocks: {
                d: {
                    mask: IMask.MaskedRange,
                    placeholderChar: 'D',
                    from: 1,
                    to: 31,
                    maxLength: 2,
                },
                m: {
                    mask: IMask.MaskedRange,
                    placeholderChar: 'M',
                    from: 1,
                    to: 12,
                    maxLength: 2,
                },
                Y: {
                    mask: IMask.MaskedRange,
                    placeholderChar: 'Y',
                    from: 1900,
                    to: 9999,
                },
                HH: {
                    mask: IMask.MaskedRange,
                    placeholderChar: '-',
                    maxLength: 2,
                    from: 0,
                    to: 23,
                },
                hh: {
                    mask: IMask.MaskedRange,
                    placeholderChar: '-',
                    maxLength: 2,
                    from: 1,
                    to: 12,
                },
                mm: {
                    mask: IMask.MaskedRange,
                    placeholderChar: '-',
                    maxLength: 2,
                    from: 0,
                    to: 59,
                },
                ss: {
                    mask: IMask.MaskedRange,
                    placeholderChar: '-',
                    maxLength: 2,
                    from: 0,
                    to: 59,
                },
                aa: {
                    mask: IMask.MaskedEnum,
                    placeholderChar: '-',
                    enum: ['AM', 'PM', 'am', 'pm', amFormat, pmFormat],
                },
            },
        };
    }
    ngOnChanges(changes) {
        if (Object.keys(changes).some((key) => ['military', 'dateFormat'].includes(key))) {
            this.initFormatOptions();
        }
    }
    _checkInput(event) {
        if (document.activeElement === event.target) {
            const text = event.target.value;
            const dateTime = text.split(', ');
            const hour = dateTime[1].slice(0, 2);
            if ((this.military && Number(dateTime[1][0]) > 2) || (!this.military && Number(dateTime[1][0]) > 1)) {
                event.preventDefault();
                const value = `0${dateTime[1]}`;
                event.target.value = value;
                // this.onChange(value);
            }
            if (!this.military) {
                const input = dateTime[1].substr(5, 4).replace(/\-/g, '').trim().slice(0, 2);
                const timePeriod = this.imask.blocks.aa.enum.find((it) => it[0] === input[0]);
                if (timePeriod) {
                    event.target.value = `${dateTime[0]}, ${dateTime[1].slice(0, 5)} ${timePeriod}`;
                }
                if (event.target.selectionStart >= 3 && this.hourOneFormatRequired(hour)) {
                    event.target.value = `${dateTime[0]}, 01:${event.target.value.slice(3, event.target.value.length)}`;
                }
            }
        }
    }
    _handleBlur(event) {
        const text = event.target.value;
        const dateTime = text.split(', ');
        const hour = dateTime[1].slice(0, 2);
        if (!this.military) {
            const input = dateTime[1].substr(17, 4).replace(/\-/g, '').trim().slice(0, 2);
            const timePeriod = this.imask.blocks.aa.enum.find((it) => it[0] === input[0]);
            if (this.hourOneFormatRequired(hour)) {
                event.target.value = `${dateTime[0]}, 01:${dateTime[1].slice(3, dateTime[1].length)}`;
            }
            if (!timePeriod) {
                event.target.value = `${dateTime[0]}, ${dateTime[1].slice(0, 5)} --`;
            }
        }
    }
    _handleKeydown(event) {
        const input = event.target;
        const dateTime = input.value.split(', ');
        const hour = dateTime[1].slice(0, 2);
        if (event.key === "Backspace" /* Backspace */ && input.selectionStart === dateTime[1].length) {
            event.target.value = `${dateTime[1].slice(0, 5)} --`;
        }
        else if (event.key === "Tab" /* Tab */ && input.selectionStart <= 2 && this.hourOneFormatRequired(hour)) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            input.value = `${dateTime[0]}, 01:${dateTime[1].slice(3, dateTime[1].length)}`;
            input.setSelectionRange(15, 15);
        }
        else if (event.key === "ArrowRight" /* ArrowRight */ && input.selectionStart >= 2 && this.hourOneFormatRequired(hour)) {
            input.value = `${dateTime[0]}, 01:${dateTime[1].slice(3, dateTime[1].length)}`;
            input.setSelectionRange(14, 14);
        }
    }
    normalize(value) {
        const pattern = this.labels.dateFormat.toUpperCase();
        return DateUtil.format(DateUtil.parse(value), pattern);
    }
    formatAsIso(date) {
        if (date && isValid(date)) {
            return date.toISOString();
        }
        return null;
    }
    convertTime12to24(time12h) {
        const pmFormat = this.labels.timeFormatPM.toUpperCase();
        const [time, meridian] = time12h.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') {
            hours = '00';
        }
        if (['PM', pmFormat].includes(meridian)) {
            hours = `${parseInt(hours, 10) + 12}`.padStart(2, '0');
        }
        return `${hours}:${minutes}`;
    }
    convertTime24to12(time24h) {
        if (time24h.length === 5) {
            const date = DateUtil.parse(`2020-01-01T${time24h}`);
            return DateUtil.format(date, 'hh:mm A');
        }
        return time24h;
    }
    formatValue(value) {
        if (value == null)
            return '';
        // Use `parse` because it keeps dates in locale
        const date = DateUtil.parse(value);
        if (isValid(date)) {
            const dateFormat = `${this.labels.dateFormat.toUpperCase()}, ${this.military ? 'HH:mm' : 'hh:mm A'}`;
            return DateUtil.format(date, dateFormat);
        }
        return this.normalize(value);
    }
    writeValue(value) {
        super.writeValue(this.formatValue(value));
    }
    registerOnChange(fn) {
        this.onChange = (date) => {
            let formatted = date;
            switch (this.dateTimeFormat) {
                case DATE_FORMATS.ISO8601:
                    formatted = this.formatAsIso(date);
                    break;
                case DATE_FORMATS.STRING:
                    formatted = this.formatValue(date);
                    break;
                default:
                    formatted = date;
                    break;
            }
            this.valueChange.emit(date);
            fn(formatted);
        };
    }
    hourOneFormatRequired(hourInput) {
        return hourInput === '-1' || hourInput === '1-';
    }
}
NovoDateTimeFormatDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDateTimeFormatDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1$2.IMaskFactory }, { token: COMPOSITION_BUFFER_MODE, optional: true }, { token: i2.NovoLabelService }], target: i0.ɵɵFactoryTarget.Directive });
NovoDateTimeFormatDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoDateTimeFormatDirective, selector: "input[dateTimeFormat]", inputs: { military: "military", dateTimeFormat: "dateTimeFormat" }, host: { listeners: { "input": "_checkInput($event)", "blur": "_handleBlur($event)", "keydown": "_handleKeydown($event)" }, classAttribute: "novo-date-time-format" }, providers: [DATETIMEFORMAT_VALUE_ACCESSOR, { provide: NOVO_INPUT_FORMAT, useExisting: NovoDateTimeFormatDirective }], usesInheritance: true, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDateTimeFormatDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[dateTimeFormat]',
                    host: {
                        class: 'novo-date-time-format',
                        '(input)': '_checkInput($event)',
                        '(blur)': '_handleBlur($event)',
                        '(keydown)': '_handleKeydown($event)',
                    },
                    providers: [DATETIMEFORMAT_VALUE_ACCESSOR, { provide: NOVO_INPUT_FORMAT, useExisting: NovoDateTimeFormatDirective }],
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1$2.IMaskFactory }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [COMPOSITION_BUFFER_MODE]
                    }] }, { type: i2.NovoLabelService }];
    }, propDecorators: { military: [{
                type: Input
            }], dateTimeFormat: [{
                type: Input
            }] } });

const TIMEFORMAT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoTimeFormatDirective),
    multi: true,
};
var TIME_FORMATS;
(function (TIME_FORMATS) {
    TIME_FORMATS["DATE"] = "date";
    TIME_FORMATS["ISO8601"] = "iso8601";
    TIME_FORMATS["STRING"] = "string";
})(TIME_FORMATS || (TIME_FORMATS = {}));
class NovoTimeFormatDirective extends IMaskDirective {
    constructor(_element, _renderer, _factory, _compositionMode, labels, cdr) {
        super(_element, _renderer, _factory, _compositionMode);
        this._element = _element;
        this.labels = labels;
        this.cdr = cdr;
        this.valueChange = new EventEmitter();
        this.military = false;
        this.timeFormat = TIME_FORMATS.DATE;
        this.initFormatOptions();
    }
    ngOnChanges(changes) {
        if (Object.keys(changes).some((key) => ['military', 'timeFormat'].includes(key))) {
            this.initFormatOptions();
        }
    }
    initFormatOptions() {
        // const pattern = this.military ? 'HH:mm' : 'hh:mm A';
        const amFormat = this.labels.timeFormatAM.toUpperCase();
        const pmFormat = this.labels.timeFormatPM.toUpperCase();
        this.unmask = 'typed';
        this.imask = {
            mask: Date,
            pattern: this.military ? 'HH:mm' : 'hh:mm aa',
            overwrite: true,
            autofix: true,
            lazy: false,
            min: new Date(1970, 0, 1),
            max: new Date(2030, 0, 1),
            prepare: (str) => str.toUpperCase(),
            format: (value) => this.formatValue(value),
            parse: (str) => {
                const time = this.convertTime12to24(str);
                return DateUtil.parse(`${DateUtil.format(Date.now(), 'YYYY-MM-DD')}T${time}`);
            },
            blocks: {
                HH: {
                    mask: IMask.MaskedRange,
                    placeholderChar: '-',
                    maxLength: 2,
                    from: 0,
                    to: 23,
                },
                hh: {
                    mask: IMask.MaskedRange,
                    placeholderChar: '-',
                    maxLength: 2,
                    from: 1,
                    to: 12,
                },
                mm: {
                    mask: IMask.MaskedRange,
                    placeholderChar: '-',
                    maxLength: 2,
                    from: 0,
                    to: 59,
                },
                aa: {
                    mask: IMask.MaskedEnum,
                    placeholderChar: '-',
                    enum: ['AM', 'PM', 'am', 'pm', amFormat, pmFormat],
                },
            },
        };
    }
    _checkInput(event) {
        if (document.activeElement === event.target) {
            const text = event.target.value;
            const hour = text.slice(0, 2);
            if ((this.military && Number(text[0]) > 2) || (!this.military && Number(text[0]) > 1)) {
                event.preventDefault();
                const value = `0${text}`;
                event.target.value = value;
                // this.onChange(value);
            }
            if (!this.military) {
                const input = text.substr(5, 4).replace(/\-/g, '').trim().slice(0, 2);
                const timePeriod = this.imask.blocks.aa.enum.find((it) => it[0] === input[0]);
                if (timePeriod) {
                    event.target.value = `${text.slice(0, 5)} ${timePeriod}`;
                }
                if (event.target.selectionStart >= 3 && this.hourOneFormatRequired(hour)) {
                    event.target.value = `01:${event.target.value.slice(3, event.target.value.length)}`;
                }
            }
        }
    }
    _handleBlur(event) {
        const text = event.target.value;
        const hour = text.slice(0, 2);
        if (!this.military) {
            const input = text.substr(5, 4).replace(/\-/g, '').trim().slice(0, 2);
            const timePeriod = this.imask.blocks.aa.enum.find((it) => it[0] === input[0]);
            if (this.hourOneFormatRequired(hour)) {
                event.target.value = `01:${text.slice(3, text.length)}`;
            }
            if (!timePeriod) {
                event.target.value = `${text.slice(0, 5)} --`;
            }
        }
    }
    _handleKeydown(event) {
        const input = event.target;
        const hour = input.value.slice(0, 2);
        if (event.key === "Backspace" /* Backspace */ && input.selectionStart === input.value.length) {
            event.target.value = `${input.value.slice(0, 5)} --`;
        }
        else if (event.key === "Tab" /* Tab */ && input.selectionStart <= 2 && this.hourOneFormatRequired(hour)) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            input.value = `01:${input.value.slice(3, input.value.length)}`;
            input.setSelectionRange(3, 3);
        }
        else if (event.key === "ArrowRight" /* ArrowRight */ && input.selectionStart >= 2 && this.hourOneFormatRequired(hour)) {
            input.value = `01:${input.value.slice(3, input.value.length)}`;
            input.setSelectionRange(2, 2);
        }
    }
    normalize(value) {
        if (this.military) {
            return this.convertTime12to24(value);
        }
        return this.convertTime24to12(value);
    }
    formatValue(value) {
        const date = DateUtil.parse(value);
        if (isValid(date)) {
            const pattern = this.military ? 'HH:mm' : 'hh:mm A';
            return DateUtil.format(date, pattern);
        }
        return this.normalize(value);
    }
    formatAsIso(date) {
        if (date && isValid(date)) {
            return DateUtil.format(date, 'HH:mm');
        }
        return null;
    }
    convertTime12to24(time12h) {
        const pmFormat = this.labels.timeFormatPM.toUpperCase();
        const [time, meridian] = time12h.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') {
            hours = '00';
        }
        if (['PM', pmFormat].includes(meridian)) {
            hours = `${parseInt(hours, 10) + 12}`.padStart(2, '0');
        }
        return `${hours}:${minutes}`;
    }
    convertTime24to12(time24h) {
        if (time24h.length === 5) {
            const date = DateUtil.parse(`2020-01-01T${time24h}`);
            return DateUtil.format(date, 'hh:mm A');
        }
        return time24h;
    }
    writeValue(value) {
        super.writeValue(this.formatValue(value));
    }
    registerOnChange(fn) {
        this.onChange = (date) => {
            let formatted = date;
            switch (this.timeFormat) {
                case TIME_FORMATS.ISO8601:
                    formatted = this.formatAsIso(date);
                    break;
                case TIME_FORMATS.STRING:
                    formatted = this.formatValue(date);
                    break;
                default:
                    formatted = date;
                    break;
            }
            this.valueChange.emit(date);
            fn(formatted);
        };
    }
    hourOneFormatRequired(hourInput) {
        return hourInput === '-1' || hourInput === '1-';
    }
}
NovoTimeFormatDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTimeFormatDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1$2.IMaskFactory }, { token: COMPOSITION_BUFFER_MODE, optional: true }, { token: i2.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
NovoTimeFormatDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoTimeFormatDirective, selector: "input[timeFormat]", inputs: { military: "military", timeFormat: "timeFormat" }, host: { listeners: { "input": "_checkInput($event)", "blur": "_handleBlur($event)", "keydown": "_handleKeydown($event)" }, classAttribute: "novo-time-format" }, providers: [TIMEFORMAT_VALUE_ACCESSOR, { provide: NOVO_INPUT_FORMAT, useExisting: NovoTimeFormatDirective }], usesInheritance: true, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTimeFormatDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[timeFormat]',
                    host: {
                        class: 'novo-time-format',
                        '(input)': '_checkInput($event)',
                        '(blur)': '_handleBlur($event)',
                        '(keydown)': '_handleKeydown($event)',
                    },
                    providers: [TIMEFORMAT_VALUE_ACCESSOR, { provide: NOVO_INPUT_FORMAT, useExisting: NovoTimeFormatDirective }],
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1$2.IMaskFactory }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [COMPOSITION_BUFFER_MODE]
                    }] }, { type: i2.NovoLabelService }, { type: i0.ChangeDetectorRef }];
    }, propDecorators: { military: [{
                type: Input
            }], timeFormat: [{
                type: Input
            }] } });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * This token is used to inject the object whose value should be set into `NovoInput`. If none is
 * provided, the native `HTMLInputElement` is used. Directives like `MatDatepickerInput` can provide
 * themselves for this token, in order to make `NovoInput` delegate the getting and setting of the
 * value to them.
 */
const NOVO_INPUT_VALUE_ACCESSOR = new InjectionToken('NOVO_INPUT_VALUE_ACCESSOR');
// Invalid input type. Using one of these will throw an NovoInputUnsupportedTypeError.
const NOVO_INPUT_INVALID_TYPES = ['button', 'checkbox', 'file', 'hidden', 'image', 'radio', 'reset', 'submit'];
let nextUniqueId = 0;
// Boilerplate for applying mixins to NovoInput.
class NovoInputBase {
    constructor(_parentForm, _parentFormGroup, 
    /** @docs-private */
    ngControl) {
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
    }
}
/** Directive that allows a native input to work inside a `NovoField`. */
// tslint:disable: no-conflicting-lifecycle member-ordering
class NovoInput extends NovoInputBase {
    constructor(_elementRef, _platform, 
    /** @docs-private */
    ngControl, _parentForm, _parentFormGroup, inputValueAccessor, _autofillMonitor, ngZone) {
        super(_parentForm, _parentFormGroup, ngControl);
        this._elementRef = _elementRef;
        this._platform = _platform;
        this.ngControl = ngControl;
        this._autofillMonitor = _autofillMonitor;
        this._uid = `novo-input-${nextUniqueId++}`;
        /**
         * Implemented as part of NovoFieldControl.
         * @docs-private
         */
        this.focused = false;
        this.errorState = false;
        /** @docs-private Implemented as part of NovoFieldControl. */
        this.lastKeyValue = null;
        /**
         * Implemented as part of NovoFieldControl.
         * @docs-private
         */
        this.stateChanges = new Subject();
        /**
         * Implemented as part of NovoFieldControl.
         * @docs-private
         */
        this.controlType = 'novo-input';
        /**
         * Implemented as part of NovoFieldControl.
         * @docs-private
         */
        this.autofilled = false;
        this._disabled = false;
        this._required = false;
        this._type = 'text';
        this._readonly = false;
        this._neverEmptyInputTypes = ['date', 'datetime', 'datetime-local', 'month', 'time', 'week'].filter((t) => getSupportedInputTypes().has(t));
        const element = this._elementRef.nativeElement;
        const nodeName = element.nodeName.toLowerCase();
        // If no input value accessor was explicitly specified, use the element as the input value
        // accessor.
        this._inputValueAccessor = inputValueAccessor || element;
        this._previousNativeValue = this.value;
        // Force setter to be called in case id was not specified.
        this.id = this.id;
        // On some versions of iOS the caret gets stuck in the wrong place when holding down the delete
        // key. In order to get around this we need to "jiggle" the caret loose. Since this bug only
        // exists on iOS, we only bother to install the listener on iOS.
        if (_platform.IOS) {
            ngZone.runOutsideAngular(() => {
                _elementRef.nativeElement.addEventListener('keyup', (event) => {
                    const el = event.target;
                    if (!el.value && !el.selectionStart && !el.selectionEnd) {
                        // Note: Just setting `0, 0` doesn't fix the issue. Setting
                        // `1, 1` fixes it for the first time that you type text and
                        // then hold delete. Toggling to `1, 1` and then back to
                        // `0, 0` seems to completely fix it.
                        el.setSelectionRange(1, 1);
                        el.setSelectionRange(0, 0);
                    }
                });
            });
        }
        this._isServer = !this._platform.isBrowser;
        this._isNativeSelect = nodeName === 'select';
        this._isTextarea = nodeName === 'textarea';
        this.controlType = this._elementRef.nativeElement.type;
        if (this._isNativeSelect) {
            this.controlType = element.multiple ? 'select-multiple' : 'select';
        }
        else if (this._isTextarea) {
            this.controlType = 'textarea';
        }
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get disabled() {
        if (this.ngControl && this.ngControl.disabled !== null) {
            return this.ngControl.disabled;
        }
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        // Browsers may not fire the blur event if the input is disabled too quickly.
        // Reset from here to ensure that the element doesn't become stuck.
        if (this.focused) {
            this.focused = false;
            this.stateChanges.next();
        }
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value || this._uid;
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = coerceBooleanProperty(value);
    }
    /** Input type of the element. */
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value || 'text';
        this._validateType();
        // When using Angular inputs, developers are no longer able to set the properties on the native
        // input element. To ensure that bindings for `type` work, we need to sync the setter
        // with the native property. Textarea elements don't support the type property or attribute.
        if (!this._isTextarea && getSupportedInputTypes().has(this._type)) {
            this._elementRef.nativeElement.type = this._type;
        }
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get value() {
        return this._inputValueAccessor.value;
    }
    set value(value) {
        if (value !== this.value) {
            this._inputValueAccessor.value = value;
            this.stateChanges.next();
        }
    }
    /** Whether the element is readonly. */
    get readonly() {
        return this._readonly;
    }
    set readonly(value) {
        this._readonly = coerceBooleanProperty(value);
    }
    ngAfterViewInit() {
        if (this._platform.isBrowser) {
            this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe((event) => {
                this.autofilled = event.isAutofilled;
                this.stateChanges.next();
            });
        }
    }
    ngOnChanges() {
        this.stateChanges.next();
    }
    ngOnDestroy() {
        this.stateChanges.complete();
        if (this._platform.isBrowser) {
            this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement);
        }
    }
    ngDoCheck() {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            // this.updateErrorState();
        }
        // We need to dirty-check the native element's value, because there are some cases where
        // we won't be notified when it changes (e.g. the consumer isn't using forms or they're
        // updating the value using `emitEvent: false`).
        this._dirtyCheckNativeValue();
    }
    /** Focuses the input. */
    focus(options) {
        this._elementRef.nativeElement.focus(options);
    }
    // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
    // In Ivy the `host` bindings will be merged when this class is extended, whereas in
    // ViewEngine they're overwritten.
    _focusChanged(isFocused) {
        if (isFocused !== this.focused && (!this.readonly || !isFocused)) {
            this.focused = isFocused;
            this.stateChanges.next();
        }
    }
    // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
    // In Ivy the `host` bindings will be merged when this class is extended, whereas in
    // ViewEngine they're overwritten.
    _onInput(event) {
        // Listening to the input event wouldn't be necessary when the input is using the
        // FormsModule or ReactiveFormsModule, because Angular forms also listens to input events.
        this.lastKeyValue = event.data;
        if (this._isTextarea) {
            this.lastCaretPosition = this._elementRef.nativeElement.selectionStart;
        }
    }
    /** Does some manual dirty checking on the native input `value` property. */
    _dirtyCheckNativeValue() {
        const newValue = this._elementRef.nativeElement.value;
        if (this._previousNativeValue !== newValue) {
            this._previousNativeValue = newValue;
            this.stateChanges.next();
        }
    }
    /** Make sure the input is a supported type. */
    _validateType() {
        if (NOVO_INPUT_INVALID_TYPES.indexOf(this._type) > -1) {
            throw new Error(`Invalid Input Type: ${this._type}`);
        }
    }
    /** Checks whether the input type is one of the types that are never empty. */
    _isNeverEmpty() {
        return this._neverEmptyInputTypes.indexOf(this._type) > -1;
    }
    /** Checks whether the input is invalid based on the native validation. */
    _isBadInput() {
        // The `validity` property won't be present on platform-server.
        const validity = this._elementRef.nativeElement.validity;
        return validity && validity.badInput;
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get empty() {
        return !this._isNeverEmpty() && !this._elementRef.nativeElement.value && !this._isBadInput() && !this.autofilled;
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get shouldLabelFloat() {
        if (this._isNativeSelect) {
            // For a single-selection `<select>`, the label should float when the selected option has
            // a non-empty display value. For a `<select multiple>`, the label *always* floats to avoid
            // overlapping the label with the options.
            const selectElement = this._elementRef.nativeElement;
            const firstOption = selectElement.options[0];
            // On most browsers the `selectedIndex` will always be 0, however on IE and Edge it'll be
            // -1 if the `value` is set to something, that isn't in the list of options, at a later point.
            return (this.focused || selectElement.multiple || !this.empty || !!(selectElement.selectedIndex > -1 && firstOption && firstOption.label));
        }
        else {
            return this.focused || !this.empty;
        }
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    setDescribedByIds(ids) {
        this._ariaDescribedby = ids.join(' ');
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    onContainerClick() {
        // Do not re-focus the input element if the element is already focused. Otherwise it can happen
        // that someone clicks on a time input and the cursor resets to the "hours" field while the
        // "minutes" field was actually clicked. See: https://github.com/angular/components/issues/12849
        if (!this.focused) {
            this.focus();
        }
    }
}
NovoInput.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoInput, deps: [{ token: i0.ElementRef }, { token: i1$3.Platform }, { token: i2$1.NgControl, optional: true, self: true }, { token: i2$1.NgForm, optional: true }, { token: i2$1.FormGroupDirective, optional: true }, { token: NOVO_INPUT_VALUE_ACCESSOR, optional: true, self: true }, { token: i3.AutofillMonitor }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
NovoInput.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: { disabled: "disabled", id: "id", placeholder: "placeholder", required: "required", type: "type", value: "value", readonly: "readonly" }, host: { listeners: { "focus": "_focusChanged(true)", "blur": "_focusChanged(false)", "input": "_onInput($event)" }, properties: { "attr.id": "id", "attr.placeholder": "placeholder", "disabled": "disabled", "required": "required", "attr.readonly": "readonly && !_isNativeSelect || null", "attr.aria-invalid": "errorState", "attr.aria-required": "required.toString()", "attr.autocomplete": "'off'", "attr.aria-describedby": "this._ariaDescribedby" }, classAttribute: "novo-input-element" }, providers: [{ provide: NovoFieldControl, useExisting: NovoInput }], usesInheritance: true, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoInput, decorators: [{
            type: Directive,
            args: [{
                    selector: `input[novoInput], textarea[novoInput], select[novoInput]`,
                    host: {
                        class: 'novo-input-element',
                        '[attr.id]': 'id',
                        '[attr.placeholder]': 'placeholder',
                        '[disabled]': 'disabled',
                        '[required]': 'required',
                        '[attr.readonly]': 'readonly && !_isNativeSelect || null',
                        '[attr.aria-invalid]': 'errorState',
                        '[attr.aria-required]': 'required.toString()',
                        '[attr.autocomplete]': "'off'",
                    },
                    providers: [{ provide: NovoFieldControl, useExisting: NovoInput }],
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ElementRef }, { type: i1$3.Platform }, { type: i2$1.NgControl, decorators: [{
                        type: Optional
                    }, {
                        type: Self
                    }] }, { type: i2$1.NgForm, decorators: [{
                        type: Optional
                    }] }, { type: i2$1.FormGroupDirective, decorators: [{
                        type: Optional
                    }] }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Self
                    }, {
                        type: Inject,
                        args: [NOVO_INPUT_VALUE_ACCESSOR]
                    }] }, { type: i3.AutofillMonitor }, { type: i0.NgZone }];
    }, propDecorators: { _ariaDescribedby: [{
                type: HostBinding,
                args: ['attr.aria-describedby']
            }], disabled: [{
                type: Input
            }], id: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], required: [{
                type: Input
            }], type: [{
                type: Input
            }], value: [{
                type: Input
            }], readonly: [{
                type: Input
            }], _focusChanged: [{
                type: HostListener,
                args: ['focus', ['true']]
            }, {
                type: HostListener,
                args: ['blur', ['false']]
            }], _onInput: [{
                type: HostListener,
                args: ['input', ['$event']]
            }] } });

/** Directive used to connect an input to a MatDatepicker. */
class NovoPickerDirective {
    constructor(_elementRef, formatter) {
        var _a;
        this._elementRef = _elementRef;
        this.formatter = formatter;
        /**
         * `autocomplete` attribute to be set on the input element.
         * @docs-private
         */
        this.autocompleteAttribute = 'off';
        if (!this.formatter) {
            console.warn('Picker directive is missing required formatter');
        }
        (_a = this.formatter) === null || _a === void 0 ? void 0 : _a.valueChange.subscribe((value) => {
            this.updatePicker(value);
        });
    }
    /** The datepicker that this input is associated with. */
    set picker(picker) {
        if (picker) {
            this._picker = picker;
            picker.registerOnChange((value) => this.updateValue(value));
        }
    }
    updateValue(value) {
        this.formatter.writeValue(value);
    }
    updatePicker(value) {
        if (this._picker) {
            this._picker.writeValue(value);
        }
    }
}
NovoPickerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPickerDirective, deps: [{ token: i0.ElementRef }, { token: NOVO_INPUT_FORMAT, optional: true, self: true }], target: i0.ɵɵFactoryTarget.Directive });
NovoPickerDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoPickerDirective, selector: "input[picker]", inputs: { picker: "picker", autocompleteAttribute: ["autocomplete", "autocompleteAttribute"] }, host: { properties: { "attr.autocomplete": "autocompleteAttribute" }, classAttribute: "novo-has-picker" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPickerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[picker]',
                    host: {
                        class: 'novo-has-picker',
                        '[attr.autocomplete]': 'autocompleteAttribute',
                    },
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Self
                    }, {
                        type: Inject,
                        args: [NOVO_INPUT_FORMAT]
                    }] }];
    }, propDecorators: { picker: [{
                type: Input
            }], autocompleteAttribute: [{
                type: Input,
                args: ['autocomplete']
            }] } });

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
};
class NovoPickerToggleElement {
    constructor(_elementRef, cdr, defaultTabIndex, _formField) {
        this._elementRef = _elementRef;
        this.cdr = cdr;
        this._formField = _formField;
        this._stateChanges = Subscription.EMPTY;
        this._onDestroy = new Subject();
        /** Determines whether the overlay is triggered on input focus or solely button click. */
        this.triggerOnFocus = false;
        const parsedTabIndex = Number(defaultTabIndex);
        this.tabIndex = parsedTabIndex || parsedTabIndex === 0 ? parsedTabIndex : null;
    }
    /** Whether the toggle button is disabled. */
    get disabled() {
        if (this._disabled === undefined && this.picker) {
            return this.picker.disabled;
        }
        return !!this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    ngOnChanges(changes) {
        if (changes.picker) {
            this._watchStateChanges();
        }
    }
    ngOnDestroy() {
        this._stateChanges.unsubscribe();
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    ngAfterContentInit() {
        this._watchStateChanges();
    }
    ngAfterViewInit() {
        this.element = this._formField.getConnectedOverlayOrigin() || this._elementRef;
    }
    checkPanel() {
        if (this.triggerOnFocus && this._formField._control.focused) {
            this.openPanel();
        }
    }
    togglePanel(event) {
        this.cdr.detectChanges();
        this.overlay.parent = this.element;
        if (!this.overlay.panelOpen) {
            this.openPanel(event);
        }
        else {
            this.closePanel(event);
        }
    }
    /** BEGIN: Convenient Panel Methods. */
    openPanel(event) {
        if (!this.overlay.panelOpen) {
            this.overlay.parent = this.element;
            this.overlay.openPanel();
        }
    }
    closePanel(event) {
        this.overlay.closePanel();
    }
    get panelOpen() {
        return this.overlay && this.overlay.panelOpen;
    }
    _watchStateChanges() {
        var _a;
        (_a = this._formField._control) === null || _a === void 0 ? void 0 : _a.stateChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
            this.checkPanel();
        });
    }
}
NovoPickerToggleElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPickerToggleElement, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: 'tabindex', attribute: true }, { token: NOVO_FORM_FIELD, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NovoPickerToggleElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoPickerToggleElement, selector: "novo-picker-toggle", inputs: { picker: ["for", "picker"], icon: "icon", tabIndex: "tabIndex", ariaLabel: ["aria-label", "ariaLabel"], triggerOnFocus: "triggerOnFocus", overlayId: "overlayId", disabled: "disabled" }, host: { listeners: { "focus": "_button.focus()" }, properties: { "attr.tabindex": "disabled ? null : -1", "class.novo-toggle-active": "picker && picker.opened", "class.novo-accent": "picker && picker.color === \"accent\"", "class.novo-warn": "picker && picker.color === \"warn\"" }, classAttribute: "novo-picker-toggle" }, viewQueries: [{ propertyName: "_button", first: true, predicate: ["button"], descendants: true }, { propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true }], exportAs: ["novoPickerToggle"], usesOnChanges: true, ngImport: i0, template: "<novo-button\n  #button\n  theme=\"icon\"\n  [icon]=\"icon\"\n  [attr.aria-haspopup]=\"'dialog'\"\n  [attr.tabindex]=\"disabled ? -1 : tabIndex\"\n  [disabled]=\"disabled\"\n  (click)=\"togglePanel($event)\"></novo-button>\n\n<novo-overlay-template [parent]=\"element\" position=\"above-below\">\n  <ng-content></ng-content>\n</novo-overlay-template>", styles: [""], components: [{ type: i1$4.NovoButtonElement, selector: "novo-button,button[theme],button[basic],button[primary],button[outlined],button[icon],button[fab]", inputs: ["color", "side", "size", "theme", "variant", "loading", "icon", "basic", "primary", "outlined", "fab", "standard", "disabled"] }, { type: i2$2.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "role", "width", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing"] }], directives: [{ type: i3$1.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoPickerToggleElement.prototype, "triggerOnFocus", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPickerToggleElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-picker-toggle', host: {
                        class: 'novo-picker-toggle',
                        // Always set the tabindex to -1 so that it doesn't overlap with any custom tabindex the
                        // consumer may have provided, while still being able to receive focus.
                        '[attr.tabindex]': 'disabled ? null : -1',
                        '[class.novo-toggle-active]': 'picker && picker.opened',
                        '[class.novo-accent]': 'picker && picker.color === "accent"',
                        '[class.novo-warn]': 'picker && picker.color === "warn"',
                        '(focus)': '_button.focus()',
                    }, exportAs: 'novoPickerToggle', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<novo-button\n  #button\n  theme=\"icon\"\n  [icon]=\"icon\"\n  [attr.aria-haspopup]=\"'dialog'\"\n  [attr.tabindex]=\"disabled ? -1 : tabIndex\"\n  [disabled]=\"disabled\"\n  (click)=\"togglePanel($event)\"></novo-button>\n\n<novo-overlay-template [parent]=\"element\" position=\"above-below\">\n  <ng-content></ng-content>\n</novo-overlay-template>", styles: [""] }]
        }], ctorParameters: function () {
        return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                        type: Attribute,
                        args: ['tabindex']
                    }] }, { type: NovoFieldElement, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [NOVO_FORM_FIELD]
                    }] }];
    }, propDecorators: { picker: [{
                type: Input,
                args: ['for']
            }], icon: [{
                type: Input
            }], tabIndex: [{
                type: Input
            }], ariaLabel: [{
                type: Input,
                args: ['aria-label']
            }], triggerOnFocus: [{
                type: Input
            }], overlayId: [{
                type: Input
            }], disabled: [{
                type: Input
            }], _button: [{
                type: ViewChild,
                args: ['button']
            }], overlay: [{
                type: ViewChild,
                args: [NovoOverlayTemplateComponent]
            }] } });

// NG2
class NovoFieldModule {
}
NovoFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFieldModule, declarations: [NovoFieldElement,
        // NovoLabelElement,
        NovoHintElement,
        NovoErrorElement,
        NovoInput,
        NovoFieldPrefixDirective,
        NovoFieldSuffixDirective,
        NovoFieldsElement,
        NovoTimeFormatDirective,
        NovoDateFormatDirective,
        NovoDateTimeFormatDirective,
        NovoDateRangeFormatDirective,
        NovoPickerToggleElement,
        NovoPickerDirective], imports: [CommonModule, NovoButtonModule, NovoOverlayModule, NovoOptionModule, NovoCommonModule], exports: [NovoFieldElement,
        // NovoLabelElement,
        NovoHintElement,
        NovoErrorElement,
        NovoInput,
        NovoFieldPrefixDirective,
        NovoFieldSuffixDirective,
        NovoFieldsElement,
        NovoTimeFormatDirective,
        NovoDateFormatDirective,
        NovoDateRangeFormatDirective,
        NovoDateTimeFormatDirective,
        NovoPickerToggleElement,
        NovoPickerDirective] });
NovoFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFieldModule, imports: [[CommonModule, NovoButtonModule, NovoOverlayModule, NovoOptionModule, NovoCommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoButtonModule, NovoOverlayModule, NovoOptionModule, NovoCommonModule],
                    declarations: [
                        NovoFieldElement,
                        // NovoLabelElement,
                        NovoHintElement,
                        NovoErrorElement,
                        NovoInput,
                        NovoFieldPrefixDirective,
                        NovoFieldSuffixDirective,
                        NovoFieldsElement,
                        NovoTimeFormatDirective,
                        NovoDateFormatDirective,
                        NovoDateTimeFormatDirective,
                        NovoDateRangeFormatDirective,
                        NovoPickerToggleElement,
                        NovoPickerDirective,
                    ],
                    exports: [
                        NovoFieldElement,
                        // NovoLabelElement,
                        NovoHintElement,
                        NovoErrorElement,
                        NovoInput,
                        NovoFieldPrefixDirective,
                        NovoFieldSuffixDirective,
                        NovoFieldsElement,
                        NovoTimeFormatDirective,
                        NovoDateFormatDirective,
                        NovoDateRangeFormatDirective,
                        NovoDateTimeFormatDirective,
                        NovoPickerToggleElement,
                        NovoPickerDirective,
                    ],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { DATEFORMAT_VALUE_ACCESSOR, DATERANGEFORMAT_VALUE_ACCESSOR, DATETIMEFORMAT_VALUE_ACCESSOR, DATE_FORMATS, NOVO_FORM_FIELD, NOVO_INPUT_FORMAT, NOVO_INPUT_VALUE_ACCESSOR, NovoDateFormatDirective, NovoDateRangeFormatDirective, NovoDateTimeFormatDirective, NovoErrorElement, NovoFieldControl, NovoFieldElement, NovoFieldModule, NovoFieldPrefixDirective, NovoFieldSuffixDirective, NovoFieldsElement, NovoHintElement, NovoInput, NovoPickerDirective, NovoPickerToggleElement, NovoTimeFormatDirective, TIMEFORMAT_VALUE_ACCESSOR, TIME_FORMATS };
//# sourceMappingURL=novo-elements-components-field.mjs.map
