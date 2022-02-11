// NG2
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, InjectionToken, Input, QueryList, ViewChild, } from '@angular/core';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { NovoLabel } from '../common';
import { NovoErrorElement } from './error/error';
import { NovoFieldControl } from './field-control';
import { NovoHintElement } from './hint/hint';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = ["inputContainer"];
function NovoFieldElement_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵprojection(1, 4);
    i0.ɵɵelementEnd();
} }
function NovoFieldElement_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵprojection(1, 5);
    i0.ɵɵprojection(2, 6);
    i0.ɵɵelementEnd();
} }
const _c1 = [[["novo-label"]], [["", "novoPrefix", ""]], "*", [["", "novoSuffix", ""]], [["novo-error"]], [["novo-hint"]], [["novo-hint", "align", "end"]]];
const _c2 = ["novo-label", "[novoPrefix]", "*", "[novoSuffix]", "novo-error", "novo-hint", "novo-hint[align=end]"];
export class NovoFieldPrefixDirective {
}
NovoFieldPrefixDirective.ɵfac = function NovoFieldPrefixDirective_Factory(t) { return new (t || NovoFieldPrefixDirective)(); };
NovoFieldPrefixDirective.ɵdir = i0.ɵɵdefineDirective({ type: NovoFieldPrefixDirective, selectors: [["", "novoPrefix", ""]] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoFieldPrefixDirective, [{
        type: Directive,
        args: [{ selector: '[novoPrefix]' }]
    }], null, null); })();
export class NovoFieldSuffixDirective {
}
NovoFieldSuffixDirective.ɵfac = function NovoFieldSuffixDirective_Factory(t) { return new (t || NovoFieldSuffixDirective)(); };
NovoFieldSuffixDirective.ɵdir = i0.ɵɵdefineDirective({ type: NovoFieldSuffixDirective, selectors: [["", "novoSuffix", ""]] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoFieldSuffixDirective, [{
        type: Directive,
        args: [{ selector: '[novoSuffix]' }]
    }], null, null); })();
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
];
export const NOVO_FORM_FIELD = new InjectionToken('NovoFormField');
export class NovoFieldElement {
    constructor(_elementRef, _changeDetectorRef) {
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._labelClicks = Subscription.EMPTY;
        this.layout = 'vertical';
        this.appearance = 'standard';
        this._destroyed = new Subject();
    }
    /**
     * Gets an ElementRef for the element that a overlay attached to the form-field should be
     * positioned relative to.
     */
    getConnectedOverlayOrigin() {
        return this._inputContainerRef || this._elementRef;
    }
    ngAfterContentInit() {
        this._validateControlChild();
        const control = this._control;
        if (control.controlType) {
            this._elementRef.nativeElement.classList.add(`novo-field-type-${control.controlType}`);
        }
        // Subscribe to changes in the child control state in order to update the form field UI.
        // tslint:disable-next-line:deprecation
        control.stateChanges.pipe(startWith(null)).subscribe(() => {
            this._changeDetectorRef.markForCheck();
        });
        // Run change detection if the value changes.
        if (control.ngControl && control.ngControl.valueChanges) {
            control.ngControl.valueChanges.pipe(takeUntil(this._destroyed)).subscribe(() => this._changeDetectorRef.markForCheck());
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
NovoFieldElement.ɵfac = function NovoFieldElement_Factory(t) { return new (t || NovoFieldElement)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
NovoFieldElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoFieldElement, selectors: [["novo-field"]], contentQueries: function NovoFieldElement_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        i0.ɵɵcontentQuery(dirIndex, NovoLabel, true);
        i0.ɵɵcontentQuery(dirIndex, NovoFieldControl, true);
        i0.ɵɵcontentQuery(dirIndex, NovoHintElement, false);
        i0.ɵɵcontentQuery(dirIndex, NovoErrorElement, false);
        i0.ɵɵcontentQuery(dirIndex, NovoFieldPrefixDirective, false);
        i0.ɵɵcontentQuery(dirIndex, NovoFieldSuffixDirective, false);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._labelElement = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._control = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._hintElements = _t);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._errorElements = _t);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._prefixElements = _t);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._suffixElements = _t);
    } }, viewQuery: function NovoFieldElement_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, true);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._inputContainerRef = _t.first);
    } }, hostAttrs: [1, "novo-field"], hostVars: 40, hostBindings: function NovoFieldElement_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("novo-field-layout-horizontal", ctx.layout == "horizontal")("novo-field-layout-vertical", ctx.layout == "vertical")("novo-field-appearance-standard", ctx.appearance == "standard")("novo-field-appearance-fill", ctx.appearance == "fill")("novo-field-appearance-outline", ctx.appearance == "outline")("novo-field-appearance-list", ctx.appearance == "list")("novo-field-appearance-underlined", ctx._isUnderlinedInput())("novo-field-invalid", ctx._control.errorState)("novo-field-has-label", ctx._hasLabel())("novo-field-no-label", !ctx._hasLabel())("novo-field-disabled", ctx._control.disabled)("novo-field-autofilled", ctx._control.autofilled)("novo-focused", ctx._control.focused)("ng-untouched", ctx._shouldForward("untouched"))("ng-touched", ctx._shouldForward("touched"))("ng-pristine", ctx._shouldForward("pristine"))("ng-dirty", ctx._shouldForward("dirty"))("ng-valid", ctx._shouldForward("valid"))("ng-invalid", ctx._shouldForward("invalid"))("ng-pending", ctx._shouldForward("pending"));
    } }, inputs: { layout: "layout", appearance: "appearance", width: "width" }, features: [i0.ɵɵProvidersFeature([{ provide: NOVO_FORM_FIELD, useExisting: NovoFieldElement }])], ngContentSelectors: _c2, decls: 13, vars: 5, consts: [[1, "novo-field-label"], [1, "novo-field-input"], ["inputContainer", ""], [1, "novo-field-prefix"], [1, "novo-field-infix"], [1, "novo-field-suffix"], [1, "novo-field-messages", 3, "ngSwitch"], ["class", "novo-field-hint-wrapper", 4, "ngSwitchCase"], [1, "novo-field-hint-wrapper"]], template: function NovoFieldElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef(_c1);
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵprojection(1);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(2, "div", 1, 2);
        i0.ɵɵelementStart(4, "div", 3);
        i0.ɵɵprojection(5, 1);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "div", 4);
        i0.ɵɵprojection(7, 2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "div", 5);
        i0.ɵɵprojection(9, 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(10, "div", 6);
        i0.ɵɵtemplate(11, NovoFieldElement_div_11_Template, 2, 0, "div", 7);
        i0.ɵɵtemplate(12, NovoFieldElement_div_12_Template, 3, 0, "div", 7);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(2);
        i0.ɵɵstyleProp("width", ctx.width);
        i0.ɵɵadvance(8);
        i0.ɵɵproperty("ngSwitch", ctx._getDisplayedMessages());
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", "error");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", "hint");
    } }, directives: [i1.NgSwitch, i1.NgSwitchCase], styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}[_nghost-%COMP%]{display:grid;position:relative}.novo-field-layout-horizontal[_nghost-%COMP%]{grid-gap:0 1rem;grid-template-areas:\"label input\" \". messages\";grid-template-columns:150px minmax(-webkit-min-content,-webkit-max-content);grid-template-columns:150px minmax(min-content,max-content)}.novo-field-layout-vertical[_nghost-%COMP%]{grid-template-areas:\"label\" \"input\" \"messages\";grid-template-columns:minmax(-webkit-min-content,-webkit-max-content);grid-template-columns:minmax(min-content,max-content);grid-template-rows:repeat(3,minmax(-webkit-min-content,-webkit-max-content));grid-template-rows:repeat(3,minmax(min-content,max-content));width:-webkit-max-content;width:-moz-max-content;width:max-content}[_nghost-%COMP%]   .novo-field-label[_ngcontent-%COMP%]{-ms-grid-column:1;-ms-grid-row:1;align-items:center;display:grid;grid-area:label}.novo-field-type-color[_nghost-%COMP%]   .novo-field-input[_ngcontent-%COMP%]  .novo-input-element{padding:0}[_nghost-%COMP%]   .novo-field-input[_ngcontent-%COMP%]{-ms-grid-column:3;-ms-grid-row:1;display:grid;grid-area:input;grid-template-columns:minmax(auto,-webkit-max-content) 1fr minmax(auto,-webkit-max-content);grid-template-columns:minmax(auto,max-content) 1fr minmax(auto,max-content)}[_nghost-%COMP%]   .novo-field-input[_ngcontent-%COMP%]  .novo-input-element{background-color:transparent;background-image:none;border:none;border-bottom:none!important;box-shadow:none;color:inherit;display:inline;font-size:1.2rem;font-weight:400;line-height:1.5rem;padding:.4rem .2rem}[_nghost-%COMP%]   .novo-field-input[_ngcontent-%COMP%]  .novo-input-element:focus{outline:none}[_nghost-%COMP%]   .novo-field-input[_ngcontent-%COMP%]  .novo-radio-group{padding:.5rem 0}[_nghost-%COMP%]   .novo-field-input[_ngcontent-%COMP%]   .novo-field-infix[_ngcontent-%COMP%], [_nghost-%COMP%]   .novo-field-input[_ngcontent-%COMP%]   .novo-field-prefix[_ngcontent-%COMP%]{align-items:center;display:flex}[_nghost-%COMP%]   .novo-field-input[_ngcontent-%COMP%]   .novo-field-infix[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{width:100%}[_nghost-%COMP%]   .novo-field-input[_ngcontent-%COMP%]   .novo-field-suffix[_ngcontent-%COMP%]{align-items:center;display:flex}[_nghost-%COMP%]   .novo-field-messages[_ngcontent-%COMP%]{-ms-grid-column:3;-ms-grid-row:3;display:grid;grid-area:messages}[_nghost-%COMP%]   .novo-field-hint-wrapper[_ngcontent-%COMP%]{display:flex}", "@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}.novo-field-appearance-standard.novo-field-appearance-underlined[_nghost-%COMP%]   .novo-field-input[_ngcontent-%COMP%]{border-bottom:1px solid #afb9c0!important}.novo-field-appearance-standard.novo-field-appearance-underlined[_nghost-%COMP%]:not(.novo-focused):hover   .novo-field-input[_ngcontent-%COMP%]{border-bottom:1px solid #3d464d!important}.novo-field-appearance-standard.novo-field-appearance-underlined.novo-focused[_nghost-%COMP%]   .novo-field-input[_ngcontent-%COMP%]{border-bottom:1px solid #4a89dc!important}.novo-field-appearance-standard.novo-field-appearance-underlined.novo-field-invalid[_nghost-%COMP%]   .novo-field-input[_ngcontent-%COMP%]{border-bottom:1px solid #da4453!important}", "@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}.novo-field-appearance-fill.novo-field-layout-horizontal[_nghost-%COMP%]   .novo-field-input[_ngcontent-%COMP%], .novo-field-appearance-fill.novo-field-layout-vertical[_nghost-%COMP%]{background:#f4f4f4}.novo-field-appearance-fill.novo-field-layout-vertical[_nghost-%COMP%]   .novo-field-label[_ngcontent-%COMP%]{padding-left:.5em;padding-right:.5em;padding-top:.5em}.novo-field-appearance-fill.novo-field-layout-vertical[_nghost-%COMP%]   .novo-field-input[_ngcontent-%COMP%]{padding:0 .5em}.novo-field-appearance-fill.novo-field-appearance-underlined[_nghost-%COMP%]   .novo-field-input[_ngcontent-%COMP%]{border-bottom:1px solid #afb9c0!important}.novo-field-appearance-fill.novo-field-appearance-underlined[_nghost-%COMP%]:not(.novo-focused):hover   .novo-field-input[_ngcontent-%COMP%]{border-bottom:1px solid #3d464d!important}.novo-field-appearance-fill.novo-field-appearance-underlined.novo-focused[_nghost-%COMP%]   .novo-field-label[_ngcontent-%COMP%]{color:#4a89dc!important}.novo-field-appearance-fill.novo-field-appearance-underlined.novo-focused[_nghost-%COMP%]   .novo-field-input[_ngcontent-%COMP%]{border-bottom:1px solid #4a89dc!important}.novo-field-appearance-fill.novo-field-appearance-underlined.novo-field-invalid[_nghost-%COMP%]   .novo-field-input[_ngcontent-%COMP%]{border-bottom:1px solid #da4453!important}", "@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}.novo-field-appearance-outline[_nghost-%COMP%]{border:1px solid #afb9c0!important;border-radius:.4rem;padding:.5rem}.novo-field-appearance-outline.novo-field-layout-vertical[_nghost-%COMP%]   .novo-field-label[_ngcontent-%COMP%]{background:#fff;margin-left:.5rem;margin-top:-1.5rem;padding:.5rem;width:-webkit-max-content;width:-moz-max-content;width:max-content}.novo-field-appearance-outline[_nghost-%COMP%]:not(.novo-focused):hover{border:1px solid #3d464d!important}.novo-field-appearance-outline.novo-focused[_nghost-%COMP%]{border:1px solid #4a89dc!important}.novo-field-appearance-outline.novo-field-invalid[_nghost-%COMP%]{border:1px solid #da4453!important}", "@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}.novo-field-appearance-list.novo-field-layout-horizontal[_nghost-%COMP%]{border-bottom:1px solid #f4f4f4!important;min-height:4.2rem;padding:.5rem 1.2rem}.novo-field-appearance-list.novo-field-layout-horizontal[_nghost-%COMP%]   .novo-field-label[_ngcontent-%COMP%]{align-items:start;margin-top:.9rem}.novo-field-appearance-list.novo-field-layout-horizontal.novo-field-no-label[_nghost-%COMP%]{gap:0;grid-template-columns:0 minmax(300px,600px)}.novo-field-appearance-list.novo-field-layout-horizontal.novo-field-appearance-underlined[_nghost-%COMP%]:not(.novo-focused):hover   .novo-field-input[_ngcontent-%COMP%]{background:rgba(74,137,220,.15)}.novo-field-appearance-list.novo-field-layout-horizontal.novo-field-appearance-underlined.novo-focused[_nghost-%COMP%]   .novo-field-label[_ngcontent-%COMP%]{color:#4a89dc!important}.novo-field-appearance-list.novo-field-layout-horizontal.novo-field-appearance-underlined.novo-field-invalid[_nghost-%COMP%]   .novo-field-label[_ngcontent-%COMP%]{color:#da4453!important}"], changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoFieldElement, [{
        type: Component,
        args: [{
                selector: 'novo-field',
                templateUrl: './field.html',
                styleUrls: ['./field.scss', './field-standard.scss', './field-fill.scss', './field-outline.scss', './field-list.scss'],
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
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
                },
                providers: [{ provide: NOVO_FORM_FIELD, useExisting: NovoFieldElement }],
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, { _inputContainerRef: [{
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZmllbGQvZmllbGQudHMiLCJlbGVtZW50cy9maWVsZC9maWVsZC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFDZixTQUFTLEVBQ1QsVUFBVSxFQUNWLGNBQWMsRUFDZCxLQUFLLEVBRUwsU0FBUyxFQUNULFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDeEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7OztJQ1A1Qyw4QkFDRTtJQUFBLHFCQUFnQztJQUNsQyxpQkFBTTs7O0lBQ04sOEJBQ0U7SUFBQSxxQkFBK0I7SUFDL0IscUJBQTBDO0lBQzVDLGlCQUFNOzs7O0FESVIsTUFBTSxPQUFPLHdCQUF3Qjs7Z0dBQXhCLHdCQUF3Qjs2REFBeEIsd0JBQXdCO2tEQUF4Qix3QkFBd0I7Y0FEcEMsU0FBUztlQUFDLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRTs7QUFHdkMsTUFBTSxPQUFPLHdCQUF3Qjs7Z0dBQXhCLHdCQUF3Qjs2REFBeEIsd0JBQXdC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QUFTO21CQUFDLGdCQUFnQjtZQUdGLGFBQWE7a0JBQXJDLFlBQVk7bUJBQUMsU0FBUztZQUNXLGFBQWE7a0JBQTlDLGVBQWU7bUJBQUMsZUFBZTtZQUNHLGNBQWM7a0JBQWhELGVBQWU7bUJBQUMsZ0JBQWdCO1lBQ1UsZUFBZTtrQkFBekQsZUFBZTttQkFBQyx3QkFBd0I7WUFDRSxlQUFlO2tCQUF6RCxlQUFlO21CQUFDLHdCQUF3QjtZQUVULFFBQVE7a0JBQXZDLFlBQVk7bUJBQUMsZ0JBQWdCO1lBRXJCLE1BQU07a0JBQWQsS0FBSztZQUNHLFVBQVU7a0JBQWxCLEtBQUs7WUFHTixLQUFLO2tCQURKLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN0YXJ0V2l0aCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTm92b0xhYmVsIH0gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCB7IE5vdm9FcnJvckVsZW1lbnQgfSBmcm9tICcuL2Vycm9yL2Vycm9yJztcbmltcG9ydCB7IE5vdm9GaWVsZENvbnRyb2wgfSBmcm9tICcuL2ZpZWxkLWNvbnRyb2wnO1xuaW1wb3J0IHsgTm92b0hpbnRFbGVtZW50IH0gZnJvbSAnLi9oaW50L2hpbnQnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbm92b1ByZWZpeF0nIH0pXG5leHBvcnQgY2xhc3MgTm92b0ZpZWxkUHJlZml4RGlyZWN0aXZlIHt9XG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbm92b1N1ZmZpeF0nIH0pXG5leHBvcnQgY2xhc3MgTm92b0ZpZWxkU3VmZml4RGlyZWN0aXZlIHt9XG5cbmNvbnN0IE5PVk9fSU5QVVRfVU5ERVJMSU5FRF9UWVBFUyA9IFtcbiAgJ3RleHQnLFxuICAnZGF0ZScsXG4gICd0aW1lJyxcbiAgJ2RhdGV0aW1lLWxvY2FsJyxcbiAgJ3Bhc3N3b3JkJyxcbiAgJ2VtYWlsJyxcbiAgJ3RlbCcsXG4gICdzZWxlY3QnLFxuICAndGV4dGFyZWEnLFxuICAnbnVtYmVyJyxcbiAgJ25vdm8tY2hpcC1saXN0Jyxcbl07XG5leHBvcnQgY29uc3QgTk9WT19GT1JNX0ZJRUxEID0gbmV3IEluamVjdGlvblRva2VuPE5vdm9GaWVsZEVsZW1lbnQ+KCdOb3ZvRm9ybUZpZWxkJyk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tZmllbGQnLFxuICB0ZW1wbGF0ZVVybDogJy4vZmllbGQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ZpZWxkLnNjc3MnLCAnLi9maWVsZC1zdGFuZGFyZC5zY3NzJywgJy4vZmllbGQtZmlsbC5zY3NzJywgJy4vZmllbGQtb3V0bGluZS5zY3NzJywgJy4vZmllbGQtbGlzdC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWZpZWxkJyxcbiAgICAnW2NsYXNzLm5vdm8tZmllbGQtbGF5b3V0LWhvcml6b250YWxdJzogJ2xheW91dD09XCJob3Jpem9udGFsXCInLFxuICAgICdbY2xhc3Mubm92by1maWVsZC1sYXlvdXQtdmVydGljYWxdJzogJ2xheW91dD09XCJ2ZXJ0aWNhbFwiJyxcbiAgICAnW2NsYXNzLm5vdm8tZmllbGQtYXBwZWFyYW5jZS1zdGFuZGFyZF0nOiAnYXBwZWFyYW5jZSA9PSBcInN0YW5kYXJkXCInLFxuICAgICdbY2xhc3Mubm92by1maWVsZC1hcHBlYXJhbmNlLWZpbGxdJzogJ2FwcGVhcmFuY2UgPT0gXCJmaWxsXCInLFxuICAgICdbY2xhc3Mubm92by1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmVdJzogJ2FwcGVhcmFuY2UgPT0gXCJvdXRsaW5lXCInLFxuICAgICdbY2xhc3Mubm92by1maWVsZC1hcHBlYXJhbmNlLWxpc3RdJzogJ2FwcGVhcmFuY2UgPT0gXCJsaXN0XCInLFxuICAgICdbY2xhc3Mubm92by1maWVsZC1hcHBlYXJhbmNlLXVuZGVybGluZWRdJzogJ19pc1VuZGVybGluZWRJbnB1dCgpJyxcbiAgICAnW2NsYXNzLm5vdm8tZmllbGQtaW52YWxpZF0nOiAnX2NvbnRyb2wuZXJyb3JTdGF0ZScsXG4gICAgJ1tjbGFzcy5ub3ZvLWZpZWxkLWhhcy1sYWJlbF0nOiAnX2hhc0xhYmVsKCknLFxuICAgICdbY2xhc3Mubm92by1maWVsZC1uby1sYWJlbF0nOiAnIV9oYXNMYWJlbCgpJyxcbiAgICAvLyAnW2NsYXNzLm5vdm8tZmllbGQtaGlkZS1wbGFjZWhvbGRlcl0nOiAnX2hpZGVDb250cm9sUGxhY2Vob2xkZXIoKScsXG4gICAgJ1tjbGFzcy5ub3ZvLWZpZWxkLWRpc2FibGVkXSc6ICdfY29udHJvbC5kaXNhYmxlZCcsXG4gICAgJ1tjbGFzcy5ub3ZvLWZpZWxkLWF1dG9maWxsZWRdJzogJ19jb250cm9sLmF1dG9maWxsZWQnLFxuICAgICdbY2xhc3Mubm92by1mb2N1c2VkXSc6ICdfY29udHJvbC5mb2N1c2VkJyxcbiAgICAvLyAnW2NsYXNzLm5vdm8tYWNjZW50XSc6ICdjb2xvciA9PSBcImFjY2VudFwiJyxcbiAgICAvLyAnW2NsYXNzLm5vdm8td2Fybl0nOiAnY29sb3IgPT0gXCJ3YXJuXCInLFxuICAgICdbY2xhc3MubmctdW50b3VjaGVkXSc6ICdfc2hvdWxkRm9yd2FyZChcInVudG91Y2hlZFwiKScsXG4gICAgJ1tjbGFzcy5uZy10b3VjaGVkXSc6ICdfc2hvdWxkRm9yd2FyZChcInRvdWNoZWRcIiknLFxuICAgICdbY2xhc3MubmctcHJpc3RpbmVdJzogJ19zaG91bGRGb3J3YXJkKFwicHJpc3RpbmVcIiknLFxuICAgICdbY2xhc3MubmctZGlydHldJzogJ19zaG91bGRGb3J3YXJkKFwiZGlydHlcIiknLFxuICAgICdbY2xhc3MubmctdmFsaWRdJzogJ19zaG91bGRGb3J3YXJkKFwidmFsaWRcIiknLFxuICAgICdbY2xhc3MubmctaW52YWxpZF0nOiAnX3Nob3VsZEZvcndhcmQoXCJpbnZhbGlkXCIpJyxcbiAgICAnW2NsYXNzLm5nLXBlbmRpbmddJzogJ19zaG91bGRGb3J3YXJkKFwicGVuZGluZ1wiKScsXG4gIH0sXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTk9WT19GT1JNX0ZJRUxELCB1c2VFeGlzdGluZzogTm92b0ZpZWxkRWxlbWVudCB9XSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0ZpZWxkRWxlbWVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX2xhYmVsQ2xpY2tzID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIC8vIEBWaWV3Q2hpbGQoJ2Nvbm5lY3Rpb25Db250YWluZXInKSBfY29ubmVjdGlvbkNvbnRhaW5lclJlZjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnaW5wdXRDb250YWluZXInKSBfaW5wdXRDb250YWluZXJSZWY6IEVsZW1lbnRSZWY7XG4gIC8vIEBWaWV3Q2hpbGQoJ2xhYmVsJykgcHJpdmF0ZSBfbGFiZWw6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIEBDb250ZW50Q2hpbGQoTm92b0xhYmVsKSBfbGFiZWxFbGVtZW50OiBOb3ZvTGFiZWw7XG4gIEBDb250ZW50Q2hpbGRyZW4oTm92b0hpbnRFbGVtZW50KSBfaGludEVsZW1lbnRzOiBRdWVyeUxpc3Q8Tm92b0hpbnRFbGVtZW50PjtcbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvRXJyb3JFbGVtZW50KSBfZXJyb3JFbGVtZW50czogUXVlcnlMaXN0PE5vdm9FcnJvckVsZW1lbnQ+O1xuICBAQ29udGVudENoaWxkcmVuKE5vdm9GaWVsZFByZWZpeERpcmVjdGl2ZSkgX3ByZWZpeEVsZW1lbnRzOiBRdWVyeUxpc3Q8Tm92b0ZpZWxkUHJlZml4RGlyZWN0aXZlPjtcbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvRmllbGRTdWZmaXhEaXJlY3RpdmUpIF9zdWZmaXhFbGVtZW50czogUXVlcnlMaXN0PE5vdm9GaWVsZFN1ZmZpeERpcmVjdGl2ZT47XG5cbiAgQENvbnRlbnRDaGlsZChOb3ZvRmllbGRDb250cm9sKSBfY29udHJvbDogTm92b0ZpZWxkQ29udHJvbDxhbnk+O1xuXG4gIEBJbnB1dCgpIGxheW91dDogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICd2ZXJ0aWNhbCc7XG4gIEBJbnB1dCgpIGFwcGVhcmFuY2U6ICdzdGFuZGFyZCcgfCAnb3V0bGluZScgfCAnZmlsbCcgfCAnbGlzdCcgPSAnc3RhbmRhcmQnO1xuXG4gIEBJbnB1dCgpXG4gIHdpZHRoOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cbiAgLyoqXG4gICAqIEdldHMgYW4gRWxlbWVudFJlZiBmb3IgdGhlIGVsZW1lbnQgdGhhdCBhIG92ZXJsYXkgYXR0YWNoZWQgdG8gdGhlIGZvcm0tZmllbGQgc2hvdWxkIGJlXG4gICAqIHBvc2l0aW9uZWQgcmVsYXRpdmUgdG8uXG4gICAqL1xuICBnZXRDb25uZWN0ZWRPdmVybGF5T3JpZ2luKCk6IEVsZW1lbnRSZWYge1xuICAgIHJldHVybiB0aGlzLl9pbnB1dENvbnRhaW5lclJlZiB8fCB0aGlzLl9lbGVtZW50UmVmO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IGFueSB7XG4gICAgdGhpcy5fdmFsaWRhdGVDb250cm9sQ2hpbGQoKTtcblxuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLl9jb250cm9sO1xuXG4gICAgaWYgKGNvbnRyb2wuY29udHJvbFR5cGUpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKGBub3ZvLWZpZWxkLXR5cGUtJHtjb250cm9sLmNvbnRyb2xUeXBlfWApO1xuICAgIH1cblxuICAgIC8vIFN1YnNjcmliZSB0byBjaGFuZ2VzIGluIHRoZSBjaGlsZCBjb250cm9sIHN0YXRlIGluIG9yZGVyIHRvIHVwZGF0ZSB0aGUgZm9ybSBmaWVsZCBVSS5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICBjb250cm9sLnN0YXRlQ2hhbmdlcy5waXBlKHN0YXJ0V2l0aChudWxsKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuXG4gICAgLy8gUnVuIGNoYW5nZSBkZXRlY3Rpb24gaWYgdGhlIHZhbHVlIGNoYW5nZXMuXG4gICAgaWYgKGNvbnRyb2wubmdDb250cm9sICYmIGNvbnRyb2wubmdDb250cm9sLnZhbHVlQ2hhbmdlcykge1xuICAgICAgY29udHJvbC5uZ0NvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3llZCkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2hhc0xhYmVsKCkpIHtcbiAgICAgIHRoaXMuX2xhYmVsQ2xpY2tzID0gZnJvbUV2ZW50KHRoaXMuX2xhYmVsRWxlbWVudC5uYXRpdmVFbGVtZW50LCAnY2xpY2snKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fY29udHJvbC5mb2N1cygpKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9kZXN0cm95ZWQubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3llZC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX2xhYmVsQ2xpY2tzLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKiogVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBmb3JtIGZpZWxkJ3MgY29udHJvbCBpcyBtaXNzaW5nLiAqL1xuICBwcm90ZWN0ZWQgX3ZhbGlkYXRlQ29udHJvbENoaWxkKCkge1xuICAgIGlmICghdGhpcy5fY29udHJvbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIE5vdm8gQ29udHJvbCcpO1xuICAgIH1cbiAgfVxuXG4gIF9pc1VuZGVybGluZWRJbnB1dCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gTk9WT19JTlBVVF9VTkRFUkxJTkVEX1RZUEVTLmluY2x1ZGVzKHRoaXMuX2NvbnRyb2wuY29udHJvbFR5cGUpO1xuICB9XG5cbiAgLyoqIERldGVybWluZXMgd2hldGhlciB0byBkaXNwbGF5IGhpbnRzIG9yIGVycm9ycy4gKi9cbiAgX2dldERpc3BsYXllZE1lc3NhZ2VzKCk6ICdlcnJvcicgfCAnaGludCcge1xuICAgIHJldHVybiB0aGlzLl9lcnJvckVsZW1lbnRzICYmIHRoaXMuX2Vycm9yRWxlbWVudHMubGVuZ3RoID4gMCAmJiB0aGlzLl9jb250cm9sLmVycm9yU3RhdGUgPyAnZXJyb3InIDogJ2hpbnQnO1xuICB9XG5cbiAgLyoqIERldGVybWluZXMgd2hldGhlciBhIGNsYXNzIGZyb20gdGhlIE5nQ29udHJvbCBzaG91bGQgYmUgZm9yd2FyZGVkIHRvIHRoZSBob3N0IGVsZW1lbnQuICovXG4gIF9zaG91bGRGb3J3YXJkKHByb3A6IGtleW9mIE5nQ29udHJvbCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG5nQ29udHJvbCA9IHRoaXMuX2NvbnRyb2wgPyB0aGlzLl9jb250cm9sLm5nQ29udHJvbCA6IG51bGw7XG4gICAgcmV0dXJuIG5nQ29udHJvbCAmJiBuZ0NvbnRyb2xbcHJvcF07XG4gIH1cblxuICBfaGFzTGFiZWwoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5fbGFiZWxFbGVtZW50O1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwibm92by1maWVsZC1sYWJlbFwiPlxuICA8bmctY29udGVudCBzZWxlY3Q9XCJub3ZvLWxhYmVsXCI+PC9uZy1jb250ZW50PlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwibm92by1maWVsZC1pbnB1dFwiIFtzdHlsZS53aWR0aF09XCJ3aWR0aFwiICNpbnB1dENvbnRhaW5lcj5cbiAgPGRpdiBjbGFzcz1cIm5vdm8tZmllbGQtcHJlZml4XCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW25vdm9QcmVmaXhdXCI+PC9uZy1jb250ZW50PlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cIm5vdm8tZmllbGQtaW5maXhcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwibm92by1maWVsZC1zdWZmaXhcIj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbbm92b1N1ZmZpeF1cIj48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwibm92by1maWVsZC1tZXNzYWdlc1wiIFtuZ1N3aXRjaF09XCJfZ2V0RGlzcGxheWVkTWVzc2FnZXMoKVwiPlxuICA8ZGl2IGNsYXNzPVwibm92by1maWVsZC1oaW50LXdyYXBwZXJcIiAqbmdTd2l0Y2hDYXNlPVwiJ2Vycm9yJ1wiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5vdm8tZXJyb3JcIj48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwibm92by1maWVsZC1oaW50LXdyYXBwZXJcIiAqbmdTd2l0Y2hDYXNlPVwiJ2hpbnQnXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibm92by1oaW50XCI+PC9uZy1jb250ZW50PlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5vdm8taGludFthbGlnbj1lbmRdXCI+PC9uZy1jb250ZW50PlxuICA8L2Rpdj5cbjwvZGl2PiJdfQ==