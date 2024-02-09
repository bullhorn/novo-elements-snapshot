var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// NG2
import { ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, NgZone, Output, ViewChild, forwardRef, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// APP
import { NovoOverlayTemplateComponent } from 'novo-elements/elements/common';
import { NovoLabelService } from 'novo-elements/services';
import { BooleanInput } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "novo-elements/elements/icon";
import * as i3 from "novo-elements/elements/common";
import * as i4 from "novo-elements/elements/tooltip";
// Value accessor for the component (supports ngModel)
const SEARCH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoSearchBoxElement),
    multi: true,
};
export class NovoSearchBoxElement {
    constructor(element, labels, _changeDetectorRef, _zone) {
        this.element = element;
        this.labels = labels;
        this._changeDetectorRef = _changeDetectorRef;
        this._zone = _zone;
        this.icon = 'search';
        this.position = 'bottom-left';
        this.placeholder = 'Search...';
        this.alwaysOpen = false;
        this.color = 'positive';
        this.closeOnSelect = true;
        this.keepOpen = false;
        this.hasBackdrop = false;
        this.allowPropagation = false;
        this.searchChanged = new EventEmitter();
        this.applySearch = new EventEmitter();
        this.focused = false;
        /** View -> model callback called when value changes */
        this._onChange = () => { };
        /** View -> model callback called when autocomplete has been touched */
        this._onTouched = () => { };
    }
    /**
     * @name showFasterFind
     * @description This function shows the picker and adds the active class (for animation)
     */
    showSearch(event, forceClose = false) {
        if (!this.panelOpen) {
            // Reset search
            // Set focus on search
            setTimeout(() => {
                const element = this.input.nativeElement;
                if (element) {
                    element.focus();
                }
            }, 10);
        }
        else {
            this.closePanel();
        }
    }
    onFocus() {
        this._zone.run(() => {
            this.focused = true;
            this.openPanel();
        });
    }
    onBlur() {
        if (!this.keepOpen || !this.panelOpen) {
            this.focused = false;
        }
    }
    onSelect() {
        if (!this.keepOpen) {
            this.closePanel();
        }
    }
    /** BEGIN: Convenient Panel Methods. */
    openPanel() {
        this.overlay.openPanel();
    }
    closePanel() {
        setTimeout(() => this.overlay.closePanel());
        this.focused = false;
    }
    get panelOpen() {
        return this.overlay && this.overlay.panelOpen;
    }
    get active() {
        return this.panelOpen || this.alwaysOpen;
    }
    /** END: Convenient Panel Methods. */
    _handleKeydown(event) {
        if ((event.key === "Escape" /* Escape */ || event.key === "Enter" /* Enter */ || event.key === "Tab" /* Tab */) && this.panelOpen) {
            if (event.keyCode === ENTER) {
                this.applySearch.emit(event);
            }
            this.closePanel();
            if (!this.allowPropagation) {
                event.stopPropagation();
            }
        }
    }
    _handleInput(event) {
        if (document.activeElement === event.target) {
            this.value = event.target.value;
            this._onChange(event.target.value);
            if (this.debounceSearchChange) {
                clearTimeout(this.debounceSearchChange);
            }
            this.debounceSearchChange = setTimeout(() => {
                this.searchChanged.emit(event.target.value);
            }, 400);
        }
    }
    writeValue(value) {
        this._setValue(value);
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    _setValue(value) {
        this.value = value;
        let toDisplay = value;
        if (value && this.displayField) {
            toDisplay = value.hasOwnProperty(this.displayField) ? value[this.displayField] : value;
        }
        // Simply falling back to an empty string if the display value is falsy does not work properly.
        // The display value can also be the number zero and shouldn't fall back to an empty string.
        this.displayValue = toDisplay ? toDisplay : '';
        this.input.nativeElement.value = this.displayValue;
        this._changeDetectorRef.markForCheck();
    }
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    setValueAndClose(event) {
        if (event && event.value) {
            this._setValue(event.value);
            this._onChange(event.value);
        }
        this.closePanel();
    }
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    clearValue(skip) {
        this.writeValue(null);
        this._onChange(null);
    }
}
NovoSearchBoxElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSearchBoxElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
NovoSearchBoxElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoSearchBoxElement, selector: "novo-search", inputs: { name: "name", icon: "icon", position: "position", placeholder: "placeholder", alwaysOpen: "alwaysOpen", theme: "theme", color: "color", closeOnSelect: "closeOnSelect", displayField: "displayField", displayValue: "displayValue", hint: "hint", keepOpen: "keepOpen", hasBackdrop: "hasBackdrop", allowPropagation: "allowPropagation" }, outputs: { searchChanged: "searchChanged", applySearch: "applySearch" }, host: { properties: { "class.always-open": "this.alwaysOpen", "class.focused": "this.focused", "class.active": "this.active" } }, providers: [SEARCH_VALUE_ACCESSOR], viewQueries: [{ propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true }, { propertyName: "input", first: true, predicate: ["input"], descendants: true, static: true }], ngImport: i0, template: `
    <!-- SEARCH ICON -->
    <novo-icon (click)="showSearch($event)" [tooltip]="hint" tooltipPosition="bottom">{{ icon }}</novo-icon>
    <!-- SEARCH INPUT -->
    <input
      type="text"
      [attr.name]="name"
      [attr.value]="displayValue"
      [attr.placeholder]="placeholder"
      (focus)="onFocus()"
      (blur)="onBlur()"
      (keydown)="_handleKeydown($event)"
      (input)="_handleInput($event)"
      #input
      data-automation-id="novo-search-input"
    />
    <!-- SEARCH OVERLAY -->
    <novo-overlay-template
      [parent]="element"
      [closeOnSelect]="closeOnSelect"
      [position]="position"
      [hasBackdrop]="hasBackdrop"
      (select)="onSelect()"
      (closing)="onBlur()"
    >
      <ng-content></ng-content>
    </novo-overlay-template>
  `, isInline: true, styles: [":host{display:grid;grid-template-areas:\"icon input\";grid-template-columns:3.2rem 1fr;grid-template-rows:1fr;align-items:center;height:3.2rem;background:#ffffff;font-size:1.4rem;border:1px solid #dbdbdb;border-radius:.2rem;max-width:400px;min-width:100px;transition:all .25s ease-in-out}:host[size=small]{font-size:1rem;height:2.4rem;grid-template-columns:2.4rem 1fr}:host[size=large]{font-size:1.8rem;height:4rem;grid-template-columns:4rem 1fr}:host>button[theme][theme=fab]{width:2.8em;height:2.8em;min-height:2.8em}:host>input{height:100%;display:block;background:transparent;position:relative;color:var(--text-main);z-index:10;border:none;transition:all .25s;-webkit-backface-visibility:hidden;backface-visibility:hidden}:host>input:focus,:host>input:active{outline:none}:host novo-icon{color:var(--text-main)}:host.focused{border:1px solid var(--selection)}:host.focused>novo-icon{color:var(--selection)!important}:host.focused[color=black]>novo-icon{color:#000!important}:host.focused[color=white]>novo-icon{color:#fff!important}:host.focused[color=gray]>novo-icon{color:#9e9e9e!important}:host.focused[color=grey]>novo-icon{color:#9e9e9e!important}:host.focused[color=offWhite]>novo-icon{color:#f7f7f7!important}:host.focused[color=bright]>novo-icon{color:#f7f7f7!important}:host.focused[color=light]>novo-icon{color:#dbdbdb!important}:host.focused[color=neutral]>novo-icon{color:#4f5361!important}:host.focused[color=dark]>novo-icon{color:#3d464d!important}:host.focused[color=orange]>novo-icon{color:#ff6900!important}:host.focused[color=navigation]>novo-icon{color:#202945!important}:host.focused[color=skyBlue]>novo-icon{color:#009bdf!important}:host.focused[color=steel]>novo-icon{color:#5b6770!important}:host.focused[color=metal]>novo-icon{color:#637893!important}:host.focused[color=sand]>novo-icon{color:#f4f4f4!important}:host.focused[color=silver]>novo-icon{color:#e2e2e2!important}:host.focused[color=stone]>novo-icon{color:#bebebe!important}:host.focused[color=ash]>novo-icon{color:#a0a0a0!important}:host.focused[color=slate]>novo-icon{color:#707070!important}:host.focused[color=onyx]>novo-icon{color:#526980!important}:host.focused[color=charcoal]>novo-icon{color:#282828!important}:host.focused[color=moonlight]>novo-icon{color:#1a242f!important}:host.focused[color=midnight]>novo-icon{color:#202945!important}:host.focused[color=darkness]>novo-icon{color:#161f27!important}:host.focused[color=navy]>novo-icon{color:#0d2d42!important}:host.focused[color=aqua]>novo-icon{color:#3bafda!important}:host.focused[color=ocean]>novo-icon{color:#4a89dc!important}:host.focused[color=mint]>novo-icon{color:#37bc9b!important}:host.focused[color=grass]>novo-icon{color:#8cc152!important}:host.focused[color=sunflower]>novo-icon{color:#f6b042!important}:host.focused[color=bittersweet]>novo-icon{color:#eb6845!important}:host.focused[color=grapefruit]>novo-icon{color:#da4453!important}:host.focused[color=carnation]>novo-icon{color:#d770ad!important}:host.focused[color=lavender]>novo-icon{color:#967adc!important}:host.focused[color=mountain]>novo-icon{color:#9678b6!important}:host.focused[color=info]>novo-icon{color:#4a89dc!important}:host.focused[color=positive]>novo-icon{color:#4a89dc!important}:host.focused[color=success]>novo-icon{color:#8cc152!important}:host.focused[color=negative]>novo-icon{color:#da4453!important}:host.focused[color=danger]>novo-icon{color:#da4453!important}:host.focused[color=error]>novo-icon{color:#da4453!important}:host.focused[color=warning]>novo-icon{color:#f6b042!important}:host.focused[color=empty]>novo-icon{color:#cccdcc!important}:host.focused[color=disabled]>novo-icon{color:#bebebe!important}:host.focused[color=background]>novo-icon{color:#f7f7f7!important}:host.focused[color=backgroundDark]>novo-icon{color:#e2e2e2!important}:host.focused[color=presentation]>novo-icon{color:#5b6770!important}:host.focused[color=bullhorn]>novo-icon{color:#ff6900!important}:host.focused[color=pulse]>novo-icon{color:#3bafda!important}:host.focused[color=company]>novo-icon{color:#39d!important}:host.focused[color=candidate]>novo-icon{color:#4b7!important}:host.focused[color=lead]>novo-icon{color:#a69!important}:host.focused[color=contact]>novo-icon{color:#fa4!important}:host.focused[color=clientcontact]>novo-icon{color:#fa4!important}:host.focused[color=opportunity]>novo-icon{color:#625!important}:host.focused[color=job]>novo-icon{color:#b56!important}:host.focused[color=joborder]>novo-icon{color:#b56!important}:host.focused[color=submission]>novo-icon{color:#a9adbb!important}:host.focused[color=sendout]>novo-icon{color:#747884!important}:host.focused[color=placement]>novo-icon{color:#0b344f!important}:host.focused[color=note]>novo-icon{color:#747884!important}:host.focused[color=contract]>novo-icon{color:#454ea0!important}:host.focused[color=jobCode]>novo-icon{color:#696d79!important}:host.focused[color=earnCode]>novo-icon{color:#696d79!important}:host.focused[color=invoiceStatement]>novo-icon{color:#696d79!important}:host.focused[color=billableCharge]>novo-icon{color:#696d79!important}:host.focused[color=payableCharge]>novo-icon{color:#696d79!important}:host.focused[color=user]>novo-icon{color:#696d79!important}:host.focused[color=corporateUser]>novo-icon{color:#696d79!important}:host.focused[color=distributionList]>novo-icon{color:#696d79!important}:host.focused[color=credential]>novo-icon{color:#696d79!important}:host.focused[color=person]>novo-icon{color:#696d79!important}header novo-search.always-open:not(.focused) button{background:rgba(255,255,255,.25)!important;color:#4a89dc40!important}header novo-search.always-open:not(.focused) input{background-color:#ffffff40!important;border-color:#ffffff40!important;color:#4a89dc40!important}header novo-search.always-open:not(.focused) input::-moz-placeholder{color:#cccdcc!important}header novo-search.always-open:not(.focused) input::placeholder{color:#cccdcc!important}\n"], components: [{ type: i2.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i3.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing"] }], directives: [{ type: i4.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipActive", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoSearchBoxElement.prototype, "alwaysOpen", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoSearchBoxElement.prototype, "closeOnSelect", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoSearchBoxElement.prototype, "keepOpen", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoSearchBoxElement.prototype, "hasBackdrop", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoSearchBoxElement.prototype, "allowPropagation", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoSearchBoxElement.prototype, "focused", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSearchBoxElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-search', providers: [SEARCH_VALUE_ACCESSOR], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <!-- SEARCH ICON -->
    <novo-icon (click)="showSearch($event)" [tooltip]="hint" tooltipPosition="bottom">{{ icon }}</novo-icon>
    <!-- SEARCH INPUT -->
    <input
      type="text"
      [attr.name]="name"
      [attr.value]="displayValue"
      [attr.placeholder]="placeholder"
      (focus)="onFocus()"
      (blur)="onBlur()"
      (keydown)="_handleKeydown($event)"
      (input)="_handleInput($event)"
      #input
      data-automation-id="novo-search-input"
    />
    <!-- SEARCH OVERLAY -->
    <novo-overlay-template
      [parent]="element"
      [closeOnSelect]="closeOnSelect"
      [position]="position"
      [hasBackdrop]="hasBackdrop"
      (select)="onSelect()"
      (closing)="onBlur()"
    >
      <ng-content></ng-content>
    </novo-overlay-template>
  `, styles: [":host{display:grid;grid-template-areas:\"icon input\";grid-template-columns:3.2rem 1fr;grid-template-rows:1fr;align-items:center;height:3.2rem;background:#ffffff;font-size:1.4rem;border:1px solid #dbdbdb;border-radius:.2rem;max-width:400px;min-width:100px;transition:all .25s ease-in-out}:host[size=small]{font-size:1rem;height:2.4rem;grid-template-columns:2.4rem 1fr}:host[size=large]{font-size:1.8rem;height:4rem;grid-template-columns:4rem 1fr}:host>button[theme][theme=fab]{width:2.8em;height:2.8em;min-height:2.8em}:host>input{height:100%;display:block;background:transparent;position:relative;color:var(--text-main);z-index:10;border:none;transition:all .25s;-webkit-backface-visibility:hidden;backface-visibility:hidden}:host>input:focus,:host>input:active{outline:none}:host novo-icon{color:var(--text-main)}:host.focused{border:1px solid var(--selection)}:host.focused>novo-icon{color:var(--selection)!important}:host.focused[color=black]>novo-icon{color:#000!important}:host.focused[color=white]>novo-icon{color:#fff!important}:host.focused[color=gray]>novo-icon{color:#9e9e9e!important}:host.focused[color=grey]>novo-icon{color:#9e9e9e!important}:host.focused[color=offWhite]>novo-icon{color:#f7f7f7!important}:host.focused[color=bright]>novo-icon{color:#f7f7f7!important}:host.focused[color=light]>novo-icon{color:#dbdbdb!important}:host.focused[color=neutral]>novo-icon{color:#4f5361!important}:host.focused[color=dark]>novo-icon{color:#3d464d!important}:host.focused[color=orange]>novo-icon{color:#ff6900!important}:host.focused[color=navigation]>novo-icon{color:#202945!important}:host.focused[color=skyBlue]>novo-icon{color:#009bdf!important}:host.focused[color=steel]>novo-icon{color:#5b6770!important}:host.focused[color=metal]>novo-icon{color:#637893!important}:host.focused[color=sand]>novo-icon{color:#f4f4f4!important}:host.focused[color=silver]>novo-icon{color:#e2e2e2!important}:host.focused[color=stone]>novo-icon{color:#bebebe!important}:host.focused[color=ash]>novo-icon{color:#a0a0a0!important}:host.focused[color=slate]>novo-icon{color:#707070!important}:host.focused[color=onyx]>novo-icon{color:#526980!important}:host.focused[color=charcoal]>novo-icon{color:#282828!important}:host.focused[color=moonlight]>novo-icon{color:#1a242f!important}:host.focused[color=midnight]>novo-icon{color:#202945!important}:host.focused[color=darkness]>novo-icon{color:#161f27!important}:host.focused[color=navy]>novo-icon{color:#0d2d42!important}:host.focused[color=aqua]>novo-icon{color:#3bafda!important}:host.focused[color=ocean]>novo-icon{color:#4a89dc!important}:host.focused[color=mint]>novo-icon{color:#37bc9b!important}:host.focused[color=grass]>novo-icon{color:#8cc152!important}:host.focused[color=sunflower]>novo-icon{color:#f6b042!important}:host.focused[color=bittersweet]>novo-icon{color:#eb6845!important}:host.focused[color=grapefruit]>novo-icon{color:#da4453!important}:host.focused[color=carnation]>novo-icon{color:#d770ad!important}:host.focused[color=lavender]>novo-icon{color:#967adc!important}:host.focused[color=mountain]>novo-icon{color:#9678b6!important}:host.focused[color=info]>novo-icon{color:#4a89dc!important}:host.focused[color=positive]>novo-icon{color:#4a89dc!important}:host.focused[color=success]>novo-icon{color:#8cc152!important}:host.focused[color=negative]>novo-icon{color:#da4453!important}:host.focused[color=danger]>novo-icon{color:#da4453!important}:host.focused[color=error]>novo-icon{color:#da4453!important}:host.focused[color=warning]>novo-icon{color:#f6b042!important}:host.focused[color=empty]>novo-icon{color:#cccdcc!important}:host.focused[color=disabled]>novo-icon{color:#bebebe!important}:host.focused[color=background]>novo-icon{color:#f7f7f7!important}:host.focused[color=backgroundDark]>novo-icon{color:#e2e2e2!important}:host.focused[color=presentation]>novo-icon{color:#5b6770!important}:host.focused[color=bullhorn]>novo-icon{color:#ff6900!important}:host.focused[color=pulse]>novo-icon{color:#3bafda!important}:host.focused[color=company]>novo-icon{color:#39d!important}:host.focused[color=candidate]>novo-icon{color:#4b7!important}:host.focused[color=lead]>novo-icon{color:#a69!important}:host.focused[color=contact]>novo-icon{color:#fa4!important}:host.focused[color=clientcontact]>novo-icon{color:#fa4!important}:host.focused[color=opportunity]>novo-icon{color:#625!important}:host.focused[color=job]>novo-icon{color:#b56!important}:host.focused[color=joborder]>novo-icon{color:#b56!important}:host.focused[color=submission]>novo-icon{color:#a9adbb!important}:host.focused[color=sendout]>novo-icon{color:#747884!important}:host.focused[color=placement]>novo-icon{color:#0b344f!important}:host.focused[color=note]>novo-icon{color:#747884!important}:host.focused[color=contract]>novo-icon{color:#454ea0!important}:host.focused[color=jobCode]>novo-icon{color:#696d79!important}:host.focused[color=earnCode]>novo-icon{color:#696d79!important}:host.focused[color=invoiceStatement]>novo-icon{color:#696d79!important}:host.focused[color=billableCharge]>novo-icon{color:#696d79!important}:host.focused[color=payableCharge]>novo-icon{color:#696d79!important}:host.focused[color=user]>novo-icon{color:#696d79!important}:host.focused[color=corporateUser]>novo-icon{color:#696d79!important}:host.focused[color=distributionList]>novo-icon{color:#696d79!important}:host.focused[color=credential]>novo-icon{color:#696d79!important}:host.focused[color=person]>novo-icon{color:#696d79!important}header novo-search.always-open:not(.focused) button{background:rgba(255,255,255,.25)!important;color:#4a89dc40!important}header novo-search.always-open:not(.focused) input{background-color:#ffffff40!important;border-color:#ffffff40!important;color:#4a89dc40!important}header novo-search.always-open:not(.focused) input::-moz-placeholder{color:#cccdcc!important}header novo-search.always-open:not(.focused) input::placeholder{color:#cccdcc!important}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }]; }, propDecorators: { name: [{
                type: Input
            }], icon: [{
                type: Input
            }], position: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], alwaysOpen: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.always-open']
            }], theme: [{
                type: Input
            }], color: [{
                type: Input
            }], closeOnSelect: [{
                type: Input
            }], displayField: [{
                type: Input
            }], displayValue: [{
                type: Input
            }], hint: [{
                type: Input
            }], keepOpen: [{
                type: Input
            }], hasBackdrop: [{
                type: Input
            }], allowPropagation: [{
                type: Input
            }], searchChanged: [{
                type: Output
            }], applySearch: [{
                type: Output
            }], focused: [{
                type: HostBinding,
                args: ['class.focused']
            }], overlay: [{
                type: ViewChild,
                args: [NovoOverlayTemplateComponent]
            }], input: [{
                type: ViewChild,
                args: ['input', { static: true }]
            }], active: [{
                type: HostBinding,
                args: ['class.active']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VhcmNoQm94LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvc2VhcmNoL1NlYXJjaEJveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlDLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFdBQVcsRUFDWCxLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sRUFDTixTQUFTLEVBQ1QsVUFBVSxHQUNYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxNQUFNO0FBQ04sT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDN0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBMkIsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7O0FBRTVFLHNEQUFzRDtBQUN0RCxNQUFNLHFCQUFxQixHQUFHO0lBQzVCLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztJQUNuRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFvQ0YsTUFBTSxPQUFPLG9CQUFvQjtJQStEL0IsWUFDUyxPQUFtQixFQUNuQixNQUF3QixFQUN2QixrQkFBcUMsRUFDckMsS0FBYTtRQUhkLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDdkIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUNyQyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBL0RoQixT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O0lBREMsWUFBWSxFQUFFOzs4REFDMEI7QUFRekM7SUFEQyxZQUFZLEVBQUU7O3FEQUNVOzRGQTlDZCxvQkFBb0I7a0JBbENoQyxTQUFTOytCQUNFLGFBQWEsYUFDWixDQUFDLHFCQUFxQixDQUFDLG1CQUNqQix1QkFBdUIsQ0FBQyxNQUFNLFlBQ3JDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQlQ7cUxBS00sSUFBSTtzQkFEVixLQUFLO2dCQUdDLElBQUk7c0JBRFYsS0FBSztnQkFHQyxRQUFRO3NCQURkLEtBQUs7Z0JBR0MsV0FBVztzQkFEakIsS0FBSztnQkFLQyxVQUFVO3NCQUhoQixLQUFLOztzQkFDTCxXQUFXO3VCQUFDLG1CQUFtQjtnQkFLekIsS0FBSztzQkFEWCxLQUFLO2dCQUdDLEtBQUs7c0JBRFgsS0FBSztnQkFJQyxhQUFhO3NCQUZuQixLQUFLO2dCQUtDLFlBQVk7c0JBRGxCLEtBQUs7Z0JBR0MsWUFBWTtzQkFEbEIsS0FBSztnQkFHQyxJQUFJO3NCQURWLEtBQUs7Z0JBSUMsUUFBUTtzQkFGZCxLQUFLO2dCQU1DLFdBQVc7c0JBRmpCLEtBQUs7Z0JBTUMsZ0JBQWdCO3NCQUZ0QixLQUFLO2dCQUtDLGFBQWE7c0JBRG5CLE1BQU07Z0JBR0EsV0FBVztzQkFEakIsTUFBTTtnQkFJUCxPQUFPO3NCQUZOLFdBQVc7dUJBQUMsZUFBZTtnQkFhNUIsT0FBTztzQkFETixTQUFTO3VCQUFDLDRCQUE0QjtnQkFHdkMsS0FBSztzQkFESixTQUFTO3VCQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBMERoQyxNQUFNO3NCQURULFdBQVc7dUJBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgRU5URVIgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkLFxuICBmb3J3YXJkUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIEFQUFxuaW1wb3J0IHsgTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudCB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvY29tbW9uJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgQm9vbGVhbklucHV0QWNjZXB0LCBLZXkgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG5jb25zdCBTRUFSQ0hfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvU2VhcmNoQm94RWxlbWVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1zZWFyY2gnLFxuICBwcm92aWRlcnM6IFtTRUFSQ0hfVkFMVUVfQUNDRVNTT1JdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8IS0tIFNFQVJDSCBJQ09OIC0tPlxuICAgIDxub3ZvLWljb24gKGNsaWNrKT1cInNob3dTZWFyY2goJGV2ZW50KVwiIFt0b29sdGlwXT1cImhpbnRcIiB0b29sdGlwUG9zaXRpb249XCJib3R0b21cIj57eyBpY29uIH19PC9ub3ZvLWljb24+XG4gICAgPCEtLSBTRUFSQ0ggSU5QVVQgLS0+XG4gICAgPGlucHV0XG4gICAgICB0eXBlPVwidGV4dFwiXG4gICAgICBbYXR0ci5uYW1lXT1cIm5hbWVcIlxuICAgICAgW2F0dHIudmFsdWVdPVwiZGlzcGxheVZhbHVlXCJcbiAgICAgIFthdHRyLnBsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgIChmb2N1cyk9XCJvbkZvY3VzKClcIlxuICAgICAgKGJsdXIpPVwib25CbHVyKClcIlxuICAgICAgKGtleWRvd24pPVwiX2hhbmRsZUtleWRvd24oJGV2ZW50KVwiXG4gICAgICAoaW5wdXQpPVwiX2hhbmRsZUlucHV0KCRldmVudClcIlxuICAgICAgI2lucHV0XG4gICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLXNlYXJjaC1pbnB1dFwiXG4gICAgLz5cbiAgICA8IS0tIFNFQVJDSCBPVkVSTEFZIC0tPlxuICAgIDxub3ZvLW92ZXJsYXktdGVtcGxhdGVcbiAgICAgIFtwYXJlbnRdPVwiZWxlbWVudFwiXG4gICAgICBbY2xvc2VPblNlbGVjdF09XCJjbG9zZU9uU2VsZWN0XCJcbiAgICAgIFtwb3NpdGlvbl09XCJwb3NpdGlvblwiXG4gICAgICBbaGFzQmFja2Ryb3BdPVwiaGFzQmFja2Ryb3BcIlxuICAgICAgKHNlbGVjdCk9XCJvblNlbGVjdCgpXCJcbiAgICAgIChjbG9zaW5nKT1cIm9uQmx1cigpXCJcbiAgICA+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9ub3ZvLW92ZXJsYXktdGVtcGxhdGU+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuL1NlYXJjaEJveC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TZWFyY2hCb3hFbGVtZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBASW5wdXQoKVxuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICBASW5wdXQoKVxuICBwdWJsaWMgaWNvbjogc3RyaW5nID0gJ3NlYXJjaCc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBwb3NpdGlvbjogTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudFsncG9zaXRpb24nXSA9ICdib3R0b20tbGVmdCc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBwbGFjZWhvbGRlcjogc3RyaW5nID0gJ1NlYXJjaC4uLic7XG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYWx3YXlzLW9wZW4nKVxuICBAQm9vbGVhbklucHV0KClcbiAgcHVibGljIGFsd2F5c09wZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgc3RhdGljIHJlYWRvbmx5IG5nQWNjZXB0SW5wdXRUeXBlX2Fsd2F5c09wZW46IEJvb2xlYW5JbnB1dEFjY2VwdDtcbiAgQElucHV0KClcbiAgcHVibGljIHRoZW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBjb2xvcjogc3RyaW5nID0gJ3Bvc2l0aXZlJztcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIHB1YmxpYyBjbG9zZU9uU2VsZWN0OiBib29sZWFuID0gdHJ1ZTtcbiAgc3RhdGljIHJlYWRvbmx5IG5nQWNjZXB0SW5wdXRUeXBlX2Nsb3NlT25TZWxlY3Q6IEJvb2xlYW5JbnB1dEFjY2VwdDtcbiAgQElucHV0KClcbiAgcHVibGljIGRpc3BsYXlGaWVsZDogc3RyaW5nO1xuICBASW5wdXQoKVxuICBwdWJsaWMgZGlzcGxheVZhbHVlOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBoaW50OiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBwdWJsaWMga2VlcE9wZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgc3RhdGljIHJlYWRvbmx5IG5nQWNjZXB0SW5wdXRUeXBlX2tlZXBPcGVuOiBCb29sZWFuSW5wdXRBY2NlcHQ7XG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBwdWJsaWMgaGFzQmFja2Ryb3A6IGJvb2xlYW4gPSBmYWxzZTtcbiAgc3RhdGljIHJlYWRvbmx5IG5nQWNjZXB0SW5wdXRUeXBlX2hhc0JhY2tkcm9wOiBCb29sZWFuSW5wdXRBY2NlcHQ7XG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBwdWJsaWMgYWxsb3dQcm9wYWdhdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuICBzdGF0aWMgcmVhZG9ubHkgbmdBY2NlcHRJbnB1dFR5cGVfYWxsb3dQcm9wYWdhdGlvbjogQm9vbGVhbklucHV0QWNjZXB0O1xuICBAT3V0cHV0KClcbiAgcHVibGljIHNlYXJjaENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgYXBwbHlTZWFyY2g6IEV2ZW50RW1pdHRlcjxLZXlib2FyZEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8S2V5Ym9hcmRFdmVudD4oKTtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mb2N1c2VkJylcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgc3RhdGljIHJlYWRvbmx5IG5nQWNjZXB0SW5wdXRUeXBlX2ZvY3VzZWQ6IEJvb2xlYW5JbnB1dEFjY2VwdDtcbiAgcHVibGljIHZhbHVlOiBhbnk7XG5cbiAgLyoqIFZpZXcgLT4gbW9kZWwgY2FsbGJhY2sgY2FsbGVkIHdoZW4gdmFsdWUgY2hhbmdlcyAqL1xuICBfb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XG4gIC8qKiBWaWV3IC0+IG1vZGVsIGNhbGxiYWNrIGNhbGxlZCB3aGVuIGF1dG9jb21wbGV0ZSBoYXMgYmVlbiB0b3VjaGVkICovXG4gIF9vblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICAvKiogRWxlbWVudCBmb3IgdGhlIHBhbmVsIGNvbnRhaW5pbmcgdGhlIGF1dG9jb21wbGV0ZSBvcHRpb25zLiAqL1xuICBAVmlld0NoaWxkKE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQpXG4gIG92ZXJsYXk6IGFueTtcbiAgQFZpZXdDaGlsZCgnaW5wdXQnLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBpbnB1dDogYW55O1xuXG4gIHByaXZhdGUgZGVib3VuY2VTZWFyY2hDaGFuZ2U6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIF96b25lOiBOZ1pvbmUsXG4gICkge31cblxuICAvKipcbiAgICogQG5hbWUgc2hvd0Zhc3RlckZpbmRcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gc2hvd3MgdGhlIHBpY2tlciBhbmQgYWRkcyB0aGUgYWN0aXZlIGNsYXNzIChmb3IgYW5pbWF0aW9uKVxuICAgKi9cbiAgc2hvd1NlYXJjaChldmVudD86IGFueSwgZm9yY2VDbG9zZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgaWYgKCF0aGlzLnBhbmVsT3Blbikge1xuICAgICAgLy8gUmVzZXQgc2VhcmNoXG4gICAgICAvLyBTZXQgZm9jdXMgb24gc2VhcmNoXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudDtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICBlbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDEwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgfVxuICB9XG4gIG9uRm9jdXMoKSB7XG4gICAgdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgfSk7XG4gIH1cbiAgb25CbHVyKCkge1xuICAgIGlmICghdGhpcy5rZWVwT3BlbiB8fCAhdGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBvblNlbGVjdCgpIHtcbiAgICBpZiAoIXRoaXMua2VlcE9wZW4pIHtcbiAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgIH1cbiAgfVxuICAvKiogQkVHSU46IENvbnZlbmllbnQgUGFuZWwgTWV0aG9kcy4gKi9cbiAgb3BlblBhbmVsKCk6IHZvaWQge1xuICAgIHRoaXMub3ZlcmxheS5vcGVuUGFuZWwoKTtcbiAgfVxuICBjbG9zZVBhbmVsKCk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5vdmVybGF5LmNsb3NlUGFuZWwoKSk7XG4gICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gIH1cbiAgZ2V0IHBhbmVsT3BlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5vdmVybGF5ICYmIHRoaXMub3ZlcmxheS5wYW5lbE9wZW47XG4gIH1cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hY3RpdmUnKVxuICBnZXQgYWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBhbmVsT3BlbiB8fCB0aGlzLmFsd2F5c09wZW47XG4gIH1cbiAgLyoqIEVORDogQ29udmVuaWVudCBQYW5lbCBNZXRob2RzLiAqL1xuXG4gIF9oYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKChldmVudC5rZXkgPT09IEtleS5Fc2NhcGUgfHwgZXZlbnQua2V5ID09PSBLZXkuRW50ZXIgfHwgZXZlbnQua2V5ID09PSBLZXkuVGFiKSAmJiB0aGlzLnBhbmVsT3Blbikge1xuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEVOVEVSKSB7XG4gICAgICAgIHRoaXMuYXBwbHlTZWFyY2guZW1pdChldmVudCk7XG4gICAgICB9XG4gICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICAgIGlmICghdGhpcy5hbGxvd1Byb3BhZ2F0aW9uKSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBfaGFuZGxlSW5wdXQoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgdGhpcy52YWx1ZSA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgICB0aGlzLl9vbkNoYW5nZSgoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKTtcblxuICAgICAgaWYgKHRoaXMuZGVib3VuY2VTZWFyY2hDaGFuZ2UpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZGVib3VuY2VTZWFyY2hDaGFuZ2UpO1xuICAgICAgfVxuICAgICAgdGhpcy5kZWJvdW5jZVNlYXJjaENoYW5nZSA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnNlYXJjaENoYW5nZWQuZW1pdCgoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKTtcbiAgICAgIH0sIDQwMCk7XG4gICAgfVxuICB9XG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX3NldFZhbHVlKHZhbHVlKTtcbiAgfVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4ge30pOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xuICB9XG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB7fSkge1xuICAgIHRoaXMuX29uVG91Y2hlZCA9IGZuO1xuICB9XG4gIHByaXZhdGUgX3NldFZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgbGV0IHRvRGlzcGxheSA9IHZhbHVlO1xuICAgIGlmICh2YWx1ZSAmJiB0aGlzLmRpc3BsYXlGaWVsZCkge1xuICAgICAgdG9EaXNwbGF5ID0gdmFsdWUuaGFzT3duUHJvcGVydHkodGhpcy5kaXNwbGF5RmllbGQpID8gdmFsdWVbdGhpcy5kaXNwbGF5RmllbGRdIDogdmFsdWU7XG4gICAgfVxuICAgIC8vIFNpbXBseSBmYWxsaW5nIGJhY2sgdG8gYW4gZW1wdHkgc3RyaW5nIGlmIHRoZSBkaXNwbGF5IHZhbHVlIGlzIGZhbHN5IGRvZXMgbm90IHdvcmsgcHJvcGVybHkuXG4gICAgLy8gVGhlIGRpc3BsYXkgdmFsdWUgY2FuIGFsc28gYmUgdGhlIG51bWJlciB6ZXJvIGFuZCBzaG91bGRuJ3QgZmFsbCBiYWNrIHRvIGFuIGVtcHR5IHN0cmluZy5cbiAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHRvRGlzcGxheSA/IHRvRGlzcGxheSA6ICcnO1xuICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuZGlzcGxheVZhbHVlO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGNsb3NlcyB0aGUgcGFuZWwsIGFuZCBpZiBhIHZhbHVlIGlzIHNwZWNpZmllZCwgYWxzbyBzZXRzIHRoZSBhc3NvY2lhdGVkXG4gICAqIGNvbnRyb2wgdG8gdGhhdCB2YWx1ZS4gSXQgd2lsbCBhbHNvIG1hcmsgdGhlIGNvbnRyb2wgYXMgZGlydHkgaWYgdGhpcyBpbnRlcmFjdGlvblxuICAgKiBzdGVtbWVkIGZyb20gdGhlIHVzZXIuXG4gICAqL1xuICBwdWJsaWMgc2V0VmFsdWVBbmRDbG9zZShldmVudDogYW55IHwgbnVsbCk6IHZvaWQge1xuICAgIGlmIChldmVudCAmJiBldmVudC52YWx1ZSkge1xuICAgICAgdGhpcy5fc2V0VmFsdWUoZXZlbnQudmFsdWUpO1xuICAgICAgdGhpcy5fb25DaGFuZ2UoZXZlbnQudmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBhbnkgcHJldmlvdXMgc2VsZWN0ZWQgb3B0aW9uIGFuZCBlbWl0IGEgc2VsZWN0aW9uIGNoYW5nZSBldmVudCBmb3IgdGhpcyBvcHRpb25cbiAgICovXG4gIHB1YmxpYyBjbGVhclZhbHVlKHNraXA6IGFueSkge1xuICAgIHRoaXMud3JpdGVWYWx1ZShudWxsKTtcbiAgICB0aGlzLl9vbkNoYW5nZShudWxsKTtcbiAgfVxufVxuIl19