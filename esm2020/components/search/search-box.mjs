// NG2
import { ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, HostBinding, Input, NgZone, Output, ViewChild, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NovoOverlayTemplateComponent } from 'novo-elements/common/overlay';
import { NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "novo-elements/components/icon";
import * as i3 from "novo-elements/common/overlay";
import * as i4 from "novo-elements/components/tooltip";
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
  `, isInline: true, styles: [":host{display:grid;grid-template-areas:\"icon input\";grid-template-columns:3.2rem 1fr;grid-template-rows:1fr;align-items:center;height:3.2rem;background:var(--color-background);border:1px solid var(--color-border);border-radius:.2rem;max-width:400px;min-width:100px;transition:all .25s ease-in-out}:host[size=small]{font-size:1rem;height:2.4rem;grid-template-columns:2.4rem 1fr}:host[size=large]{font-size:1.8rem;height:4rem;grid-template-columns:4rem 1fr}:host>button[theme][theme=fab]{width:2.8em;height:2.8em;min-height:2.8em}:host>input{height:100%;display:block;background:transparent;position:relative;font-size:1.4rem;color:var(--color-text);z-index:10;border:none;transition:all .25s;-webkit-backface-visibility:hidden;backface-visibility:hidden}:host>input:focus,:host>input:active{outline:none}:host novo-icon{color:var(--color-text)}:host.focused{border:1px solid var(--color-selection)}:host.focused>novo-icon{color:var(--color-selection)!important}:host.focused[color=person]>novo-icon{color:var(--color-person)!important}:host.focused[color=company]>novo-icon{color:var(--color-company)!important}:host.focused[color=candidate]>novo-icon{color:var(--color-candidate)!important}:host.focused[color=lead]>novo-icon{color:var(--color-lead)!important}:host.focused[color=contact]>novo-icon{color:var(--color-contact)!important}:host.focused[color=clientcontact]>novo-icon{color:var(--color-clientcontact)!important}:host.focused[color=opportunity]>novo-icon{color:var(--color-opportunity)!important}:host.focused[color=job]>novo-icon{color:var(--color-job)!important}:host.focused[color=joborder]>novo-icon{color:var(--color-joborder)!important}:host.focused[color=submission]>novo-icon{color:var(--color-submission)!important}:host.focused[color=sendout]>novo-icon{color:var(--color-sendout)!important}:host.focused[color=placement]>novo-icon{color:var(--color-placement)!important}:host.focused[color=note]>novo-icon{color:var(--color-note)!important}:host.focused[color=task]>novo-icon{color:var(--color-task)!important}:host.focused[color=distribution-list]>novo-icon{color:var(--color-distribution-list)!important}:host.focused[color=credential]>novo-icon{color:var(--color-credential)!important}:host.focused[color=user]>novo-icon{color:var(--color-user)!important}:host.focused[color=corporate-user]>novo-icon{color:var(--color-corporate-user)!important}:host.focused[color=contract]>novo-icon{color:var(--color-contract)!important}:host.focused[color=job-code]>novo-icon{color:var(--color-job-code)!important}:host.focused[color=earn-code]>novo-icon{color:var(--color-earn-code)!important}:host.focused[color=billable-charge]>novo-icon{color:var(--color-billable-charge)!important}:host.focused[color=payable-charge]>novo-icon{color:var(--color-payable-charge)!important}:host.focused[color=invoice-statement]>novo-icon{color:var(--color-invoice-statement)!important}:host.focused[color=selection]>novo-icon{color:var(--color-selection)!important}:host.focused[color=positive]>novo-icon{color:var(--color-positive)!important}:host.focused[color=success]>novo-icon{color:var(--color-success)!important}:host.focused[color=warning]>novo-icon{color:var(--color-warning)!important}:host.focused[color=error]>novo-icon{color:var(--color-error)!important}:host.focused[color=info]>novo-icon{color:var(--color-info)!important}:host.focused[color=disabled]>novo-icon{color:var(--color-disabled)!important}:host.focused[color=red]>novo-icon{color:var(--palette-red-50)!important}:host.focused[color=pink]>novo-icon{color:var(--palette-pink-50)!important}:host.focused[color=orange]>novo-icon{color:var(--palette-orange-50)!important}:host.focused[color=yellow]>novo-icon{color:var(--palette-yellow-50)!important}:host.focused[color=green]>novo-icon{color:var(--palette-green-50)!important}:host.focused[color=teal]>novo-icon{color:var(--palette-teal-50)!important}:host.focused[color=blue]>novo-icon{color:var(--palette-blue-50)!important}:host.focused[color=aqua]>novo-icon{color:var(--palette-aqua-50)!important}:host.focused[color=indigo]>novo-icon{color:var(--palette-indigo-50)!important}:host.focused[color=violet]>novo-icon{color:var(--palette-violet-50)!important}:host.focused[color=gray]>novo-icon{color:var(--palette-gray-50)!important}:host-context(header).always-open:not(.focused) button{background:var(--color-background-overlay)!important;color:var(--color-selection-overlay)!important}:host-context(header).always-open:not(.focused) input{background-color:var(--color-background-overlay)!important;border-color:var(--color-background-overlay)!important;color:var(--color-selection-overlay)!important}:host-context(header).always-open:not(.focused) input::-moz-placeholder{color:var(--color-empty)!important}:host-context(header).always-open:not(.focused) input::placeholder{color:var(--color-empty)!important}\n"], components: [{ type: i2.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i3.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "role", "width", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing"] }], directives: [{ type: i4.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipActive", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
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
  `, styles: [":host{display:grid;grid-template-areas:\"icon input\";grid-template-columns:3.2rem 1fr;grid-template-rows:1fr;align-items:center;height:3.2rem;background:var(--color-background);border:1px solid var(--color-border);border-radius:.2rem;max-width:400px;min-width:100px;transition:all .25s ease-in-out}:host[size=small]{font-size:1rem;height:2.4rem;grid-template-columns:2.4rem 1fr}:host[size=large]{font-size:1.8rem;height:4rem;grid-template-columns:4rem 1fr}:host>button[theme][theme=fab]{width:2.8em;height:2.8em;min-height:2.8em}:host>input{height:100%;display:block;background:transparent;position:relative;font-size:1.4rem;color:var(--color-text);z-index:10;border:none;transition:all .25s;-webkit-backface-visibility:hidden;backface-visibility:hidden}:host>input:focus,:host>input:active{outline:none}:host novo-icon{color:var(--color-text)}:host.focused{border:1px solid var(--color-selection)}:host.focused>novo-icon{color:var(--color-selection)!important}:host.focused[color=person]>novo-icon{color:var(--color-person)!important}:host.focused[color=company]>novo-icon{color:var(--color-company)!important}:host.focused[color=candidate]>novo-icon{color:var(--color-candidate)!important}:host.focused[color=lead]>novo-icon{color:var(--color-lead)!important}:host.focused[color=contact]>novo-icon{color:var(--color-contact)!important}:host.focused[color=clientcontact]>novo-icon{color:var(--color-clientcontact)!important}:host.focused[color=opportunity]>novo-icon{color:var(--color-opportunity)!important}:host.focused[color=job]>novo-icon{color:var(--color-job)!important}:host.focused[color=joborder]>novo-icon{color:var(--color-joborder)!important}:host.focused[color=submission]>novo-icon{color:var(--color-submission)!important}:host.focused[color=sendout]>novo-icon{color:var(--color-sendout)!important}:host.focused[color=placement]>novo-icon{color:var(--color-placement)!important}:host.focused[color=note]>novo-icon{color:var(--color-note)!important}:host.focused[color=task]>novo-icon{color:var(--color-task)!important}:host.focused[color=distribution-list]>novo-icon{color:var(--color-distribution-list)!important}:host.focused[color=credential]>novo-icon{color:var(--color-credential)!important}:host.focused[color=user]>novo-icon{color:var(--color-user)!important}:host.focused[color=corporate-user]>novo-icon{color:var(--color-corporate-user)!important}:host.focused[color=contract]>novo-icon{color:var(--color-contract)!important}:host.focused[color=job-code]>novo-icon{color:var(--color-job-code)!important}:host.focused[color=earn-code]>novo-icon{color:var(--color-earn-code)!important}:host.focused[color=billable-charge]>novo-icon{color:var(--color-billable-charge)!important}:host.focused[color=payable-charge]>novo-icon{color:var(--color-payable-charge)!important}:host.focused[color=invoice-statement]>novo-icon{color:var(--color-invoice-statement)!important}:host.focused[color=selection]>novo-icon{color:var(--color-selection)!important}:host.focused[color=positive]>novo-icon{color:var(--color-positive)!important}:host.focused[color=success]>novo-icon{color:var(--color-success)!important}:host.focused[color=warning]>novo-icon{color:var(--color-warning)!important}:host.focused[color=error]>novo-icon{color:var(--color-error)!important}:host.focused[color=info]>novo-icon{color:var(--color-info)!important}:host.focused[color=disabled]>novo-icon{color:var(--color-disabled)!important}:host.focused[color=red]>novo-icon{color:var(--palette-red-50)!important}:host.focused[color=pink]>novo-icon{color:var(--palette-pink-50)!important}:host.focused[color=orange]>novo-icon{color:var(--palette-orange-50)!important}:host.focused[color=yellow]>novo-icon{color:var(--palette-yellow-50)!important}:host.focused[color=green]>novo-icon{color:var(--palette-green-50)!important}:host.focused[color=teal]>novo-icon{color:var(--palette-teal-50)!important}:host.focused[color=blue]>novo-icon{color:var(--palette-blue-50)!important}:host.focused[color=aqua]>novo-icon{color:var(--palette-aqua-50)!important}:host.focused[color=indigo]>novo-icon{color:var(--palette-indigo-50)!important}:host.focused[color=violet]>novo-icon{color:var(--palette-violet-50)!important}:host.focused[color=gray]>novo-icon{color:var(--palette-gray-50)!important}:host-context(header).always-open:not(.focused) button{background:var(--color-background-overlay)!important;color:var(--color-selection-overlay)!important}:host-context(header).always-open:not(.focused) input{background-color:var(--color-background-overlay)!important;border-color:var(--color-background-overlay)!important;color:var(--color-selection-overlay)!important}:host-context(header).always-open:not(.focused) input::-moz-placeholder{color:var(--color-empty)!important}:host-context(header).always-open:not(.focused) input::placeholder{color:var(--color-empty)!important}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJveC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvc2VhcmNoL3NlYXJjaC1ib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5QyxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsV0FBVyxFQUNYLEtBQUssRUFDTCxNQUFNLEVBQ04sTUFBTSxFQUNOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDNUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7OztBQUcxRCxzREFBc0Q7QUFDdEQsTUFBTSxxQkFBcUIsR0FBRztJQUM1QixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUM7SUFDbkQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBb0NGLE1BQU0sT0FBTyxvQkFBb0I7SUFtRC9CLFlBQ1MsT0FBbUIsRUFDbkIsTUFBd0IsRUFDdkIsa0JBQXFDLEVBQ3JDLEtBQWE7UUFIZCxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3ZCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDckMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQW5EaEIsU0FBSSxHQUFXLFFBQVEsQ0FBQztRQUV4QixhQUFRLEdBQVcsYUFBYSxDQUFDO1FBRWpDLGdCQUFXLEdBQVcsV0FBVyxD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QkFHQyxXQUFXO3NCQURqQixLQUFLO2dCQUlDLFVBQVU7c0JBRmhCLEtBQUs7O3NCQUNMLFdBQVc7dUJBQUMsbUJBQW1CO2dCQUd6QixLQUFLO3NCQURYLEtBQUs7Z0JBR0MsS0FBSztzQkFEWCxLQUFLO2dCQUdDLGFBQWE7c0JBRG5CLEtBQUs7Z0JBR0MsWUFBWTtzQkFEbEIsS0FBSztnQkFHQyxZQUFZO3NCQURsQixLQUFLO2dCQUdDLElBQUk7c0JBRFYsS0FBSztnQkFHQyxRQUFRO3NCQURkLEtBQUs7Z0JBR0MsV0FBVztzQkFEakIsS0FBSztnQkFHQyxnQkFBZ0I7c0JBRHRCLEtBQUs7Z0JBR0MsYUFBYTtzQkFEbkIsTUFBTTtnQkFHQSxXQUFXO3NCQURqQixNQUFNO2dCQUdQLE9BQU87c0JBRE4sV0FBVzt1QkFBQyxlQUFlO2dCQVc1QixPQUFPO3NCQUROLFNBQVM7dUJBQUMsNEJBQTRCO2dCQUd2QyxLQUFLO3NCQURKLFNBQVM7dUJBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkEwRGhDLE1BQU07c0JBRFQsV0FBVzt1QkFBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBFTlRFUiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudCB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tbW9uL292ZXJsYXknO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgS2V5IH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5cbi8vIFZhbHVlIGFjY2Vzc29yIGZvciB0aGUgY29tcG9uZW50IChzdXBwb3J0cyBuZ01vZGVsKVxuY29uc3QgU0VBUkNIX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b1NlYXJjaEJveEVsZW1lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tc2VhcmNoJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2VhcmNoLWJveC5zY3NzJ10sXG4gIHByb3ZpZGVyczogW1NFQVJDSF9WQUxVRV9BQ0NFU1NPUl0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDwhLS0gU0VBUkNIIElDT04gLS0+XG4gICAgPG5vdm8taWNvbiAoY2xpY2spPVwic2hvd1NlYXJjaCgkZXZlbnQpXCIgW3Rvb2x0aXBdPVwiaGludFwiIHRvb2x0aXBQb3NpdGlvbj1cImJvdHRvbVwiPnt7IGljb24gfX08L25vdm8taWNvbj5cbiAgICA8IS0tIFNFQVJDSCBJTlBVVCAtLT5cbiAgICA8aW5wdXRcbiAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgIFthdHRyLm5hbWVdPVwibmFtZVwiXG4gICAgICBbYXR0ci52YWx1ZV09XCJkaXNwbGF5VmFsdWVcIlxuICAgICAgW2F0dHIucGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgKGZvY3VzKT1cIm9uRm9jdXMoKVwiXG4gICAgICAoYmx1cik9XCJvbkJsdXIoKVwiXG4gICAgICAoa2V5ZG93bik9XCJfaGFuZGxlS2V5ZG93bigkZXZlbnQpXCJcbiAgICAgIChpbnB1dCk9XCJfaGFuZGxlSW5wdXQoJGV2ZW50KVwiXG4gICAgICAjaW5wdXRcbiAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tc2VhcmNoLWlucHV0XCJcbiAgICAvPlxuICAgIDwhLS0gU0VBUkNIIE9WRVJMQVkgLS0+XG4gICAgPG5vdm8tb3ZlcmxheS10ZW1wbGF0ZVxuICAgICAgW3BhcmVudF09XCJlbGVtZW50XCJcbiAgICAgIFtjbG9zZU9uU2VsZWN0XT1cImNsb3NlT25TZWxlY3RcIlxuICAgICAgW3Bvc2l0aW9uXT1cInBvc2l0aW9uXCJcbiAgICAgIFtoYXNCYWNrZHJvcF09XCJoYXNCYWNrZHJvcFwiXG4gICAgICAoc2VsZWN0KT1cIm9uU2VsZWN0KClcIlxuICAgICAgKGNsb3NpbmcpPVwib25CbHVyKClcIlxuICAgID5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L25vdm8tb3ZlcmxheS10ZW1wbGF0ZT5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1NlYXJjaEJveEVsZW1lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBpY29uOiBzdHJpbmcgPSAnc2VhcmNoJztcbiAgQElucHV0KClcbiAgcHVibGljIHBvc2l0aW9uOiBzdHJpbmcgPSAnYm90dG9tLWxlZnQnO1xuICBASW5wdXQoKVxuICBwdWJsaWMgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICdTZWFyY2guLi4nO1xuICBASW5wdXQoKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFsd2F5cy1vcGVuJylcbiAgcHVibGljIGFsd2F5c09wZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgcHVibGljIHRoZW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBjb2xvcjogc3RyaW5nID0gJ3Bvc2l0aXZlJztcbiAgQElucHV0KClcbiAgcHVibGljIGNsb3NlT25TZWxlY3Q6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKVxuICBwdWJsaWMgZGlzcGxheUZpZWxkOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBkaXNwbGF5VmFsdWU6IHN0cmluZztcbiAgQElucHV0KClcbiAgcHVibGljIGhpbnQ6IHN0cmluZztcbiAgQElucHV0KClcbiAgcHVibGljIGtlZXBPcGVuOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBoYXNCYWNrZHJvcDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBwdWJsaWMgYWxsb3dQcm9wYWdhdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuICBAT3V0cHV0KClcbiAgcHVibGljIHNlYXJjaENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgYXBwbHlTZWFyY2g6IEV2ZW50RW1pdHRlcjxLZXlib2FyZEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8S2V5Ym9hcmRFdmVudD4oKTtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mb2N1c2VkJylcbiAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgdmFsdWU6IGFueTtcblxuICAvKiogVmlldyAtPiBtb2RlbCBjYWxsYmFjayBjYWxsZWQgd2hlbiB2YWx1ZSBjaGFuZ2VzICovXG4gIF9vbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7fTtcbiAgLyoqIFZpZXcgLT4gbW9kZWwgY2FsbGJhY2sgY2FsbGVkIHdoZW4gYXV0b2NvbXBsZXRlIGhhcyBiZWVuIHRvdWNoZWQgKi9cbiAgX29uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIC8qKiBFbGVtZW50IGZvciB0aGUgcGFuZWwgY29udGFpbmluZyB0aGUgYXV0b2NvbXBsZXRlIG9wdGlvbnMuICovXG4gIEBWaWV3Q2hpbGQoTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudClcbiAgb3ZlcmxheTogYW55O1xuICBAVmlld0NoaWxkKCdpbnB1dCcsIHsgc3RhdGljOiB0cnVlIH0pXG4gIGlucHV0OiBhbnk7XG5cbiAgcHJpdmF0ZSBkZWJvdW5jZVNlYXJjaENoYW5nZTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgX3pvbmU6IE5nWm9uZSxcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBAbmFtZSBzaG93RmFzdGVyRmluZFxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBzaG93cyB0aGUgcGlja2VyIGFuZCBhZGRzIHRoZSBhY3RpdmUgY2xhc3MgKGZvciBhbmltYXRpb24pXG4gICAqL1xuICBzaG93U2VhcmNoKGV2ZW50PzogYW55LCBmb3JjZUNsb3NlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICBpZiAoIXRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAvLyBSZXNldCBzZWFyY2hcbiAgICAgIC8vIFNldCBmb2N1cyBvbiBzZWFyY2hcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgIGVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfSwgMTApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICB9XG4gIH1cbiAgb25Gb2N1cygpIHtcbiAgICB0aGlzLl96b25lLnJ1bigoKSA9PiB7XG4gICAgICB0aGlzLmZvY3VzZWQgPSB0cnVlO1xuICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICB9KTtcbiAgfVxuICBvbkJsdXIoKSB7XG4gICAgaWYgKCF0aGlzLmtlZXBPcGVuIHx8ICF0aGlzLnBhbmVsT3Blbikge1xuICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIG9uU2VsZWN0KCkge1xuICAgIGlmICghdGhpcy5rZWVwT3Blbikge1xuICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgfVxuICB9XG4gIC8qKiBCRUdJTjogQ29udmVuaWVudCBQYW5lbCBNZXRob2RzLiAqL1xuICBvcGVuUGFuZWwoKTogdm9pZCB7XG4gICAgdGhpcy5vdmVybGF5Lm9wZW5QYW5lbCgpO1xuICB9XG4gIGNsb3NlUGFuZWwoKTogdm9pZCB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLm92ZXJsYXkuY2xvc2VQYW5lbCgpKTtcbiAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgfVxuICBnZXQgcGFuZWxPcGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm92ZXJsYXkgJiYgdGhpcy5vdmVybGF5LnBhbmVsT3BlbjtcbiAgfVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFjdGl2ZScpXG4gIGdldCBhY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucGFuZWxPcGVuIHx8IHRoaXMuYWx3YXlzT3BlbjtcbiAgfVxuICAvKiogRU5EOiBDb252ZW5pZW50IFBhbmVsIE1ldGhvZHMuICovXG5cbiAgX2hhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoKGV2ZW50LmtleSA9PT0gS2V5LkVzY2FwZSB8fCBldmVudC5rZXkgPT09IEtleS5FbnRlciB8fCBldmVudC5rZXkgPT09IEtleS5UYWIpICYmIHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gRU5URVIpIHtcbiAgICAgICAgdGhpcy5hcHBseVNlYXJjaC5lbWl0KGV2ZW50KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgICAgaWYgKCF0aGlzLmFsbG93UHJvcGFnYXRpb24pIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIF9oYW5kbGVJbnB1dChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBldmVudC50YXJnZXQpIHtcbiAgICAgIHRoaXMudmFsdWUgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICAgICAgdGhpcy5fb25DaGFuZ2UoKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSk7XG5cbiAgICAgIGlmICh0aGlzLmRlYm91bmNlU2VhcmNoQ2hhbmdlKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmRlYm91bmNlU2VhcmNoQ2hhbmdlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGVib3VuY2VTZWFyY2hDaGFuZ2UgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5zZWFyY2hDaGFuZ2VkLmVtaXQoKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSk7XG4gICAgICB9LCA0MDApO1xuICAgIH1cbiAgfVxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXRWYWx1ZSh2YWx1ZSk7XG4gIH1cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHt9KTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgfVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4ge30pIHtcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgfVxuICBwcml2YXRlIF9zZXRWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIGxldCB0b0Rpc3BsYXkgPSB2YWx1ZTtcbiAgICBpZiAodmFsdWUgJiYgdGhpcy5kaXNwbGF5RmllbGQpIHtcbiAgICAgIHRvRGlzcGxheSA9IHZhbHVlLmhhc093blByb3BlcnR5KHRoaXMuZGlzcGxheUZpZWxkKSA/IHZhbHVlW3RoaXMuZGlzcGxheUZpZWxkXSA6IHZhbHVlO1xuICAgIH1cbiAgICAvLyBTaW1wbHkgZmFsbGluZyBiYWNrIHRvIGFuIGVtcHR5IHN0cmluZyBpZiB0aGUgZGlzcGxheSB2YWx1ZSBpcyBmYWxzeSBkb2VzIG5vdCB3b3JrIHByb3Blcmx5LlxuICAgIC8vIFRoZSBkaXNwbGF5IHZhbHVlIGNhbiBhbHNvIGJlIHRoZSBudW1iZXIgemVybyBhbmQgc2hvdWxkbid0IGZhbGwgYmFjayB0byBhbiBlbXB0eSBzdHJpbmcuXG4gICAgdGhpcy5kaXNwbGF5VmFsdWUgPSB0b0Rpc3BsYXkgPyB0b0Rpc3BsYXkgOiAnJztcbiAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLmRpc3BsYXlWYWx1ZTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBjbG9zZXMgdGhlIHBhbmVsLCBhbmQgaWYgYSB2YWx1ZSBpcyBzcGVjaWZpZWQsIGFsc28gc2V0cyB0aGUgYXNzb2NpYXRlZFxuICAgKiBjb250cm9sIHRvIHRoYXQgdmFsdWUuIEl0IHdpbGwgYWxzbyBtYXJrIHRoZSBjb250cm9sIGFzIGRpcnR5IGlmIHRoaXMgaW50ZXJhY3Rpb25cbiAgICogc3RlbW1lZCBmcm9tIHRoZSB1c2VyLlxuICAgKi9cbiAgcHVibGljIHNldFZhbHVlQW5kQ2xvc2UoZXZlbnQ6IGFueSB8IG51bGwpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQgJiYgZXZlbnQudmFsdWUpIHtcbiAgICAgIHRoaXMuX3NldFZhbHVlKGV2ZW50LnZhbHVlKTtcbiAgICAgIHRoaXMuX29uQ2hhbmdlKGV2ZW50LnZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgYW55IHByZXZpb3VzIHNlbGVjdGVkIG9wdGlvbiBhbmQgZW1pdCBhIHNlbGVjdGlvbiBjaGFuZ2UgZXZlbnQgZm9yIHRoaXMgb3B0aW9uXG4gICAqL1xuICBwdWJsaWMgY2xlYXJWYWx1ZShza2lwOiBhbnkpIHtcbiAgICB0aGlzLndyaXRlVmFsdWUobnVsbCk7XG4gICAgdGhpcy5fb25DaGFuZ2UobnVsbCk7XG4gIH1cbn1cbiJdfQ==