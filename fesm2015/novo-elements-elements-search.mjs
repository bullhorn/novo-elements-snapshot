import { ENTER } from '@angular/cdk/keycodes';
import * as i0 from '@angular/core';
import { forwardRef, EventEmitter, Component, ChangeDetectionStrategy, Input, HostBinding, Output, ViewChild, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i3 from 'novo-elements/elements/common';
import { NovoOverlayTemplateComponent, NovoOverlayModule } from 'novo-elements/elements/common';
import * as i1 from 'novo-elements/services';
import * as i2 from 'novo-elements/elements/icon';
import { NovoIconModule } from 'novo-elements/elements/icon';
import * as i4 from 'novo-elements/elements/tooltip';
import { NovoTooltipModule } from 'novo-elements/elements/tooltip';
import { CommonModule } from '@angular/common';
import { NovoPickerModule } from 'novo-elements/elements/picker';

// NG2
// Value accessor for the component (supports ngModel)
const SEARCH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoSearchBoxElement),
    multi: true,
};
class NovoSearchBoxElement {
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
  `, isInline: true, components: [{ type: i2.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i3.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing"] }], directives: [{ type: i4.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipActive", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSearchBoxElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-search',
                    providers: [SEARCH_VALUE_ACCESSOR],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
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
  `,
                }]
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

// NG2
class NovoSearchBoxModule {
}
NovoSearchBoxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSearchBoxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoSearchBoxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSearchBoxModule, declarations: [NovoSearchBoxElement], imports: [CommonModule, NovoIconModule, NovoPickerModule, NovoTooltipModule, NovoOverlayModule], exports: [NovoSearchBoxElement] });
NovoSearchBoxModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSearchBoxModule, imports: [[CommonModule, NovoIconModule, NovoPickerModule, NovoTooltipModule, NovoOverlayModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSearchBoxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoIconModule, NovoPickerModule, NovoTooltipModule, NovoOverlayModule],
                    declarations: [NovoSearchBoxElement],
                    exports: [NovoSearchBoxElement],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoSearchBoxElement, NovoSearchBoxModule };
//# sourceMappingURL=novo-elements-elements-search.mjs.map
