// NG2
import { ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, HostBinding, Input, NgZone, Output, ViewChild, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// APP
import { NovoLabelService } from 'novo-elements/services';
import { NovoOverlayTemplateComponent } from 'novo-elements/elements/common';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VhcmNoQm94LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvc2VhcmNoL1NlYXJjaEJveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLEtBQUssRUFBZSxNQUFNLHVCQUF1QixDQUFDO0FBQzNELE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixXQUFXLEVBQ1gsS0FBSyxFQUNMLE1BQU0sRUFDTixNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFMUQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sK0JBQStCLENBQUM7Ozs7OztBQUU3RSxzREFBc0Q7QUFDdEQsTUFBTSxxQkFBcUIsR0FBRztJQUM1QixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUM7SUFDbkQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBbUNGLE1BQU0sT0FBTyxvQkFBb0I7SUFtRC9CLFlBQ1MsT0FBbUIsRUFDbkIsTUFBd0IsRUFDdkIsa0JBQXFDLEVBQ3JDLEtBQWE7UUFIZCxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3ZCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDckMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQW5EaEIsU0FBSSxHQUFXLFFBQVEsQ0FBQztRQUV4QixhQUFRLEdBQVcsYUFBYSxDQUFDO1FBRWpDLGdC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Q0Y7cUxBR1EsSUFBSTtzQkFEVixLQUFLO2dCQUdDLElBQUk7c0JBRFYsS0FBSztnQkFHQyxRQUFRO3NCQURkLEtBQUs7Z0JBR0MsV0FBVztzQkFEakIsS0FBSztnQkFJQyxVQUFVO3NCQUZoQixLQUFLOztzQkFDTCxXQUFXO3VCQUFDLG1CQUFtQjtnQkFHekIsS0FBSztzQkFEWCxLQUFLO2dCQUdDLEtBQUs7c0JBRFgsS0FBSztnQkFHQyxhQUFhO3NCQURuQixLQUFLO2dCQUdDLFlBQVk7c0JBRGxCLEtBQUs7Z0JBR0MsWUFBWTtzQkFEbEIsS0FBSztnQkFHQyxJQUFJO3NCQURWLEtBQUs7Z0JBR0MsUUFBUTtzQkFEZCxLQUFLO2dCQUdDLFdBQVc7c0JBRGpCLEtBQUs7Z0JBR0MsZ0JBQWdCO3NCQUR0QixLQUFLO2dCQUdDLGFBQWE7c0JBRG5CLE1BQU07Z0JBR0EsV0FBVztzQkFEakIsTUFBTTtnQkFHUCxPQUFPO3NCQUROLFdBQVc7dUJBQUMsZUFBZTtnQkFXNUIsT0FBTztzQkFETixTQUFTO3VCQUFDLDRCQUE0QjtnQkFHdkMsS0FBSztzQkFESixTQUFTO3VCQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBMERoQyxNQUFNO3NCQURULFdBQVc7dUJBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgRU5URVIsIEVTQ0FQRSwgVEFCIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcbmltcG9ydCB7IEtleSB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuaW1wb3J0IHsgTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudCB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvY29tbW9uJztcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG5jb25zdCBTRUFSQ0hfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvU2VhcmNoQm94RWxlbWVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1zZWFyY2gnLFxuICBwcm92aWRlcnM6IFtTRUFSQ0hfVkFMVUVfQUNDRVNTT1JdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8IS0tIFNFQVJDSCBJQ09OIC0tPlxuICAgIDxub3ZvLWljb24gKGNsaWNrKT1cInNob3dTZWFyY2goJGV2ZW50KVwiIFt0b29sdGlwXT1cImhpbnRcIiB0b29sdGlwUG9zaXRpb249XCJib3R0b21cIj57eyBpY29uIH19PC9ub3ZvLWljb24+XG4gICAgPCEtLSBTRUFSQ0ggSU5QVVQgLS0+XG4gICAgPGlucHV0XG4gICAgICB0eXBlPVwidGV4dFwiXG4gICAgICBbYXR0ci5uYW1lXT1cIm5hbWVcIlxuICAgICAgW2F0dHIudmFsdWVdPVwiZGlzcGxheVZhbHVlXCJcbiAgICAgIFthdHRyLnBsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgIChmb2N1cyk9XCJvbkZvY3VzKClcIlxuICAgICAgKGJsdXIpPVwib25CbHVyKClcIlxuICAgICAgKGtleWRvd24pPVwiX2hhbmRsZUtleWRvd24oJGV2ZW50KVwiXG4gICAgICAoaW5wdXQpPVwiX2hhbmRsZUlucHV0KCRldmVudClcIlxuICAgICAgI2lucHV0XG4gICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLXNlYXJjaC1pbnB1dFwiXG4gICAgLz5cbiAgICA8IS0tIFNFQVJDSCBPVkVSTEFZIC0tPlxuICAgIDxub3ZvLW92ZXJsYXktdGVtcGxhdGVcbiAgICAgIFtwYXJlbnRdPVwiZWxlbWVudFwiXG4gICAgICBbY2xvc2VPblNlbGVjdF09XCJjbG9zZU9uU2VsZWN0XCJcbiAgICAgIFtwb3NpdGlvbl09XCJwb3NpdGlvblwiXG4gICAgICBbaGFzQmFja2Ryb3BdPVwiaGFzQmFja2Ryb3BcIlxuICAgICAgKHNlbGVjdCk9XCJvblNlbGVjdCgpXCJcbiAgICAgIChjbG9zaW5nKT1cIm9uQmx1cigpXCJcbiAgICA+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9ub3ZvLW92ZXJsYXktdGVtcGxhdGU+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TZWFyY2hCb3hFbGVtZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBASW5wdXQoKVxuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICBASW5wdXQoKVxuICBwdWJsaWMgaWNvbjogc3RyaW5nID0gJ3NlYXJjaCc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBwb3NpdGlvbjogc3RyaW5nID0gJ2JvdHRvbS1sZWZ0JztcbiAgQElucHV0KClcbiAgcHVibGljIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnU2VhcmNoLi4uJztcbiAgQElucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hbHdheXMtb3BlbicpXG4gIHB1YmxpYyBhbHdheXNPcGVuOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB0aGVtZTogc3RyaW5nO1xuICBASW5wdXQoKVxuICBwdWJsaWMgY29sb3I6IHN0cmluZyA9ICdwb3NpdGl2ZSc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBjbG9zZU9uU2VsZWN0OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KClcbiAgcHVibGljIGRpc3BsYXlGaWVsZDogc3RyaW5nO1xuICBASW5wdXQoKVxuICBwdWJsaWMgZGlzcGxheVZhbHVlOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBoaW50OiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBrZWVwT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBwdWJsaWMgaGFzQmFja2Ryb3A6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgcHVibGljIGFsbG93UHJvcGFnYXRpb246IGJvb2xlYW4gPSBmYWxzZTtcbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBzZWFyY2hDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICBAT3V0cHV0KClcbiAgcHVibGljIGFwcGx5U2VhcmNoOiBFdmVudEVtaXR0ZXI8S2V5Ym9hcmRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEtleWJvYXJkRXZlbnQ+KCk7XG4gIEBIb3N0QmluZGluZygnY2xhc3MuZm9jdXNlZCcpXG4gIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHZhbHVlOiBhbnk7XG5cbiAgLyoqIFZpZXcgLT4gbW9kZWwgY2FsbGJhY2sgY2FsbGVkIHdoZW4gdmFsdWUgY2hhbmdlcyAqL1xuICBfb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XG4gIC8qKiBWaWV3IC0+IG1vZGVsIGNhbGxiYWNrIGNhbGxlZCB3aGVuIGF1dG9jb21wbGV0ZSBoYXMgYmVlbiB0b3VjaGVkICovXG4gIF9vblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICAvKiogRWxlbWVudCBmb3IgdGhlIHBhbmVsIGNvbnRhaW5pbmcgdGhlIGF1dG9jb21wbGV0ZSBvcHRpb25zLiAqL1xuICBAVmlld0NoaWxkKE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQpXG4gIG92ZXJsYXk6IGFueTtcbiAgQFZpZXdDaGlsZCgnaW5wdXQnLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBpbnB1dDogYW55O1xuXG4gIHByaXZhdGUgZGVib3VuY2VTZWFyY2hDaGFuZ2U6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIF96b25lOiBOZ1pvbmUsXG4gICkge31cblxuICAvKipcbiAgICogQG5hbWUgc2hvd0Zhc3RlckZpbmRcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gc2hvd3MgdGhlIHBpY2tlciBhbmQgYWRkcyB0aGUgYWN0aXZlIGNsYXNzIChmb3IgYW5pbWF0aW9uKVxuICAgKi9cbiAgc2hvd1NlYXJjaChldmVudD86IGFueSwgZm9yY2VDbG9zZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgaWYgKCF0aGlzLnBhbmVsT3Blbikge1xuICAgICAgLy8gUmVzZXQgc2VhcmNoXG4gICAgICAvLyBTZXQgZm9jdXMgb24gc2VhcmNoXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudDtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICBlbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDEwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgfVxuICB9XG4gIG9uRm9jdXMoKSB7XG4gICAgdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgfSk7XG4gIH1cbiAgb25CbHVyKCkge1xuICAgIGlmICghdGhpcy5rZWVwT3BlbiB8fCAhdGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBvblNlbGVjdCgpIHtcbiAgICBpZiAoIXRoaXMua2VlcE9wZW4pIHtcbiAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgIH1cbiAgfVxuICAvKiogQkVHSU46IENvbnZlbmllbnQgUGFuZWwgTWV0aG9kcy4gKi9cbiAgb3BlblBhbmVsKCk6IHZvaWQge1xuICAgIHRoaXMub3ZlcmxheS5vcGVuUGFuZWwoKTtcbiAgfVxuICBjbG9zZVBhbmVsKCk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5vdmVybGF5LmNsb3NlUGFuZWwoKSk7XG4gICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gIH1cbiAgZ2V0IHBhbmVsT3BlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5vdmVybGF5ICYmIHRoaXMub3ZlcmxheS5wYW5lbE9wZW47XG4gIH1cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hY3RpdmUnKVxuICBnZXQgYWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBhbmVsT3BlbiB8fCB0aGlzLmFsd2F5c09wZW47XG4gIH1cbiAgLyoqIEVORDogQ29udmVuaWVudCBQYW5lbCBNZXRob2RzLiAqL1xuXG4gIF9oYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKChldmVudC5rZXkgPT09IEtleS5Fc2NhcGUgfHwgZXZlbnQua2V5ID09PSBLZXkuRW50ZXIgfHwgZXZlbnQua2V5ID09PSBLZXkuVGFiKSAmJiB0aGlzLnBhbmVsT3Blbikge1xuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEVOVEVSKSB7XG4gICAgICAgIHRoaXMuYXBwbHlTZWFyY2guZW1pdChldmVudCk7XG4gICAgICB9XG4gICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICAgIGlmICghdGhpcy5hbGxvd1Byb3BhZ2F0aW9uKSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBfaGFuZGxlSW5wdXQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICB0aGlzLnZhbHVlID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICAgIHRoaXMuX29uQ2hhbmdlKChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUpO1xuXG4gICAgICBpZiAodGhpcy5kZWJvdW5jZVNlYXJjaENoYW5nZSkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5kZWJvdW5jZVNlYXJjaENoYW5nZSk7XG4gICAgICB9XG4gICAgICB0aGlzLmRlYm91bmNlU2VhcmNoQ2hhbmdlID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2VhcmNoQ2hhbmdlZC5lbWl0KChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUpO1xuICAgICAgfSwgNDAwKTtcbiAgICB9XG4gIH1cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fc2V0VmFsdWUodmFsdWUpO1xuICB9XG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB7fSk6IHZvaWQge1xuICAgIHRoaXMuX29uQ2hhbmdlID0gZm47XG4gIH1cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KSB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cbiAgcHJpdmF0ZSBfc2V0VmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICBsZXQgdG9EaXNwbGF5ID0gdmFsdWU7XG4gICAgaWYgKHZhbHVlICYmIHRoaXMuZGlzcGxheUZpZWxkKSB7XG4gICAgICB0b0Rpc3BsYXkgPSB2YWx1ZS5oYXNPd25Qcm9wZXJ0eSh0aGlzLmRpc3BsYXlGaWVsZCkgPyB2YWx1ZVt0aGlzLmRpc3BsYXlGaWVsZF0gOiB2YWx1ZTtcbiAgICB9XG4gICAgLy8gU2ltcGx5IGZhbGxpbmcgYmFjayB0byBhbiBlbXB0eSBzdHJpbmcgaWYgdGhlIGRpc3BsYXkgdmFsdWUgaXMgZmFsc3kgZG9lcyBub3Qgd29yayBwcm9wZXJseS5cbiAgICAvLyBUaGUgZGlzcGxheSB2YWx1ZSBjYW4gYWxzbyBiZSB0aGUgbnVtYmVyIHplcm8gYW5kIHNob3VsZG4ndCBmYWxsIGJhY2sgdG8gYW4gZW1wdHkgc3RyaW5nLlxuICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdG9EaXNwbGF5ID8gdG9EaXNwbGF5IDogJyc7XG4gICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5kaXNwbGF5VmFsdWU7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgY2xvc2VzIHRoZSBwYW5lbCwgYW5kIGlmIGEgdmFsdWUgaXMgc3BlY2lmaWVkLCBhbHNvIHNldHMgdGhlIGFzc29jaWF0ZWRcbiAgICogY29udHJvbCB0byB0aGF0IHZhbHVlLiBJdCB3aWxsIGFsc28gbWFyayB0aGUgY29udHJvbCBhcyBkaXJ0eSBpZiB0aGlzIGludGVyYWN0aW9uXG4gICAqIHN0ZW1tZWQgZnJvbSB0aGUgdXNlci5cbiAgICovXG4gIHB1YmxpYyBzZXRWYWx1ZUFuZENsb3NlKGV2ZW50OiBhbnkgfCBudWxsKTogdm9pZCB7XG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50LnZhbHVlKSB7XG4gICAgICB0aGlzLl9zZXRWYWx1ZShldmVudC52YWx1ZSk7XG4gICAgICB0aGlzLl9vbkNoYW5nZShldmVudC52YWx1ZSk7XG4gICAgfVxuICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGFueSBwcmV2aW91cyBzZWxlY3RlZCBvcHRpb24gYW5kIGVtaXQgYSBzZWxlY3Rpb24gY2hhbmdlIGV2ZW50IGZvciB0aGlzIG9wdGlvblxuICAgKi9cbiAgcHVibGljIGNsZWFyVmFsdWUoc2tpcDogYW55KSB7XG4gICAgdGhpcy53cml0ZVZhbHVlKG51bGwpO1xuICAgIHRoaXMuX29uQ2hhbmdlKG51bGwpO1xuICB9XG59XG4iXX0=