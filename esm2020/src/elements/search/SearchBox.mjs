// NG2
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, HostBinding, Input, NgZone, Output, ViewChild, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NovoLabelService } from '../../services/novo-label-service';
// APP
import { NovoOverlayTemplateComponent } from '../common/overlay/Overlay';
import * as i0 from "@angular/core";
import * as i1 from "../../services/novo-label-service";
import * as i2 from "../icon/Icon";
import * as i3 from "../common/overlay/Overlay";
import * as i4 from "../tooltip/Tooltip.directive";
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
        this.searchChanged = new EventEmitter();
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
        this.focused = false;
    }
    /** BEGIN: Convenient Panel Methods. */
    openPanel() {
        this.overlay.openPanel();
    }
    closePanel() {
        setTimeout(() => this.overlay.closePanel());
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
            this.closePanel();
            event.stopPropagation();
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
NovoSearchBoxElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoSearchBoxElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
NovoSearchBoxElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoSearchBoxElement, selector: "novo-search", inputs: { name: "name", icon: "icon", position: "position", placeholder: "placeholder", alwaysOpen: "alwaysOpen", theme: "theme", color: "color", closeOnSelect: "closeOnSelect", displayField: "displayField", displayValue: "displayValue", hint: "hint" }, outputs: { searchChanged: "searchChanged" }, host: { properties: { "class.always-open": "this.alwaysOpen", "class.focused": "this.focused", "class.active": "this.active" } }, providers: [SEARCH_VALUE_ACCESSOR], viewQueries: [{ propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true }, { propertyName: "input", first: true, predicate: ["input"], descendants: true, static: true }], ngImport: i0, template: `
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
      (select)="closePanel()"
      (closing)="onBlur()"
    >
      <ng-content></ng-content>
    </novo-overlay-template>
  `, isInline: true, components: [{ type: i2.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i3.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "height", "closeOnSelect", "parent"], outputs: ["select", "opening", "closing"] }], directives: [{ type: i4.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipActive", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoSearchBoxElement, decorators: [{
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
      (select)="closePanel()"
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
            }], searchChanged: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VhcmNoQm94LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvc2VhcmNoL1NlYXJjaEJveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLFdBQVcsRUFDWCxLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sRUFDTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRXJFLE1BQU07QUFDTixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7O0FBRXpFLHNEQUFzRDtBQUN0RCxNQUFNLHFCQUFxQixHQUFHO0lBQzVCLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztJQUNuRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFrQ0YsTUFBTSxPQUFPLG9CQUFvQjtJQTJDL0IsWUFDUyxPQUFtQixFQUNuQixNQUF3QixFQUN2QixrQkFBcUMsRUFDckMsS0FBYTtRQUhkLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDdkIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUNyQyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBM0NoQixTQUFJLEdBQVcsUUFBUSxDQUFDO1FBRXhCLGFBQVEsR0FBVyxhQUFhLENBQUM7UUFFakMsZ0JBQVcsR0FBVyxXQUFXLENBQUM7UUFHbEMsZUFBVSxHQUFZLEtBQUss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cnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgeyBLZXkgfSBmcm9tICcuLi8uLi91dGlscyc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQgfSBmcm9tICcuLi9jb21tb24vb3ZlcmxheS9PdmVybGF5JztcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG5jb25zdCBTRUFSQ0hfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvU2VhcmNoQm94RWxlbWVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1zZWFyY2gnLFxuICBwcm92aWRlcnM6IFtTRUFSQ0hfVkFMVUVfQUNDRVNTT1JdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8IS0tIFNFQVJDSCBJQ09OIC0tPlxuICAgIDxub3ZvLWljb24gKGNsaWNrKT1cInNob3dTZWFyY2goJGV2ZW50KVwiIFt0b29sdGlwXT1cImhpbnRcIiB0b29sdGlwUG9zaXRpb249XCJib3R0b21cIj57eyBpY29uIH19PC9ub3ZvLWljb24+XG4gICAgPCEtLSBTRUFSQ0ggSU5QVVQgLS0+XG4gICAgPGlucHV0XG4gICAgICB0eXBlPVwidGV4dFwiXG4gICAgICBbYXR0ci5uYW1lXT1cIm5hbWVcIlxuICAgICAgW2F0dHIudmFsdWVdPVwiZGlzcGxheVZhbHVlXCJcbiAgICAgIFthdHRyLnBsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgIChmb2N1cyk9XCJvbkZvY3VzKClcIlxuICAgICAgKGJsdXIpPVwib25CbHVyKClcIlxuICAgICAgKGtleWRvd24pPVwiX2hhbmRsZUtleWRvd24oJGV2ZW50KVwiXG4gICAgICAoaW5wdXQpPVwiX2hhbmRsZUlucHV0KCRldmVudClcIlxuICAgICAgI2lucHV0XG4gICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLXNlYXJjaC1pbnB1dFwiXG4gICAgLz5cbiAgICA8IS0tIFNFQVJDSCBPVkVSTEFZIC0tPlxuICAgIDxub3ZvLW92ZXJsYXktdGVtcGxhdGVcbiAgICAgIFtwYXJlbnRdPVwiZWxlbWVudFwiXG4gICAgICBbY2xvc2VPblNlbGVjdF09XCJjbG9zZU9uU2VsZWN0XCJcbiAgICAgIFtwb3NpdGlvbl09XCJwb3NpdGlvblwiXG4gICAgICAoc2VsZWN0KT1cImNsb3NlUGFuZWwoKVwiXG4gICAgICAoY2xvc2luZyk9XCJvbkJsdXIoKVwiXG4gICAgPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvbm92by1vdmVybGF5LXRlbXBsYXRlPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvU2VhcmNoQm94RWxlbWVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQElucHV0KClcbiAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgQElucHV0KClcbiAgcHVibGljIGljb246IHN0cmluZyA9ICdzZWFyY2gnO1xuICBASW5wdXQoKVxuICBwdWJsaWMgcG9zaXRpb246IHN0cmluZyA9ICdib3R0b20tbGVmdCc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBwbGFjZWhvbGRlcjogc3RyaW5nID0gJ1NlYXJjaC4uLic7XG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYWx3YXlzLW9wZW4nKVxuICBwdWJsaWMgYWx3YXlzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBwdWJsaWMgdGhlbWU6IHN0cmluZztcbiAgQElucHV0KClcbiAgcHVibGljIGNvbG9yOiBzdHJpbmcgPSAncG9zaXRpdmUnO1xuICBASW5wdXQoKVxuICBwdWJsaWMgY2xvc2VPblNlbGVjdDogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBkaXNwbGF5RmllbGQ6IHN0cmluZztcbiAgQElucHV0KClcbiAgcHVibGljIGRpc3BsYXlWYWx1ZTogc3RyaW5nO1xuICBASW5wdXQoKVxuICBwdWJsaWMgaGludDogc3RyaW5nO1xuICBAT3V0cHV0KClcbiAgcHVibGljIHNlYXJjaENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIEBIb3N0QmluZGluZygnY2xhc3MuZm9jdXNlZCcpXG4gIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHZhbHVlOiBhbnk7XG5cbiAgLyoqIFZpZXcgLT4gbW9kZWwgY2FsbGJhY2sgY2FsbGVkIHdoZW4gdmFsdWUgY2hhbmdlcyAqL1xuICBfb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XG4gIC8qKiBWaWV3IC0+IG1vZGVsIGNhbGxiYWNrIGNhbGxlZCB3aGVuIGF1dG9jb21wbGV0ZSBoYXMgYmVlbiB0b3VjaGVkICovXG4gIF9vblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICAvKiogRWxlbWVudCBmb3IgdGhlIHBhbmVsIGNvbnRhaW5pbmcgdGhlIGF1dG9jb21wbGV0ZSBvcHRpb25zLiAqL1xuICBAVmlld0NoaWxkKE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQpXG4gIG92ZXJsYXk6IGFueTtcbiAgQFZpZXdDaGlsZCgnaW5wdXQnLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBpbnB1dDogYW55O1xuXG4gIHByaXZhdGUgZGVib3VuY2VTZWFyY2hDaGFuZ2U6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIF96b25lOiBOZ1pvbmUsXG4gICkge31cblxuICAvKipcbiAgICogQG5hbWUgc2hvd0Zhc3RlckZpbmRcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gc2hvd3MgdGhlIHBpY2tlciBhbmQgYWRkcyB0aGUgYWN0aXZlIGNsYXNzIChmb3IgYW5pbWF0aW9uKVxuICAgKi9cbiAgc2hvd1NlYXJjaChldmVudD86IGFueSwgZm9yY2VDbG9zZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgaWYgKCF0aGlzLnBhbmVsT3Blbikge1xuICAgICAgLy8gUmVzZXQgc2VhcmNoXG4gICAgICAvLyBTZXQgZm9jdXMgb24gc2VhcmNoXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudDtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICBlbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDEwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgfVxuICB9XG4gIG9uRm9jdXMoKSB7XG4gICAgdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgfSk7XG4gIH1cbiAgb25CbHVyKCkge1xuICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICB9XG4gIC8qKiBCRUdJTjogQ29udmVuaWVudCBQYW5lbCBNZXRob2RzLiAqL1xuICBvcGVuUGFuZWwoKTogdm9pZCB7XG4gICAgdGhpcy5vdmVybGF5Lm9wZW5QYW5lbCgpO1xuICB9XG4gIGNsb3NlUGFuZWwoKTogdm9pZCB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLm92ZXJsYXkuY2xvc2VQYW5lbCgpKTtcbiAgfVxuICBnZXQgcGFuZWxPcGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm92ZXJsYXkgJiYgdGhpcy5vdmVybGF5LnBhbmVsT3BlbjtcbiAgfVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFjdGl2ZScpXG4gIGdldCBhY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucGFuZWxPcGVuIHx8IHRoaXMuYWx3YXlzT3BlbjtcbiAgfVxuICAvKiogRU5EOiBDb252ZW5pZW50IFBhbmVsIE1ldGhvZHMuICovXG5cbiAgX2hhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoKGV2ZW50LmtleSA9PT0gS2V5LkVzY2FwZSB8fCBldmVudC5rZXkgPT09IEtleS5FbnRlciB8fCBldmVudC5rZXkgPT09IEtleS5UYWIpICYmIHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxuICBfaGFuZGxlSW5wdXQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICB0aGlzLnZhbHVlID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICAgIHRoaXMuX29uQ2hhbmdlKChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUpO1xuXG4gICAgICBpZiAodGhpcy5kZWJvdW5jZVNlYXJjaENoYW5nZSkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5kZWJvdW5jZVNlYXJjaENoYW5nZSk7XG4gICAgICB9XG4gICAgICB0aGlzLmRlYm91bmNlU2VhcmNoQ2hhbmdlID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2VhcmNoQ2hhbmdlZC5lbWl0KChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUpO1xuICAgICAgfSwgNDAwKTtcbiAgICB9XG4gIH1cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fc2V0VmFsdWUodmFsdWUpO1xuICB9XG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB7fSk6IHZvaWQge1xuICAgIHRoaXMuX29uQ2hhbmdlID0gZm47XG4gIH1cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KSB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cbiAgcHJpdmF0ZSBfc2V0VmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICBsZXQgdG9EaXNwbGF5ID0gdmFsdWU7XG4gICAgaWYgKHZhbHVlICYmIHRoaXMuZGlzcGxheUZpZWxkKSB7XG4gICAgICB0b0Rpc3BsYXkgPSB2YWx1ZS5oYXNPd25Qcm9wZXJ0eSh0aGlzLmRpc3BsYXlGaWVsZCkgPyB2YWx1ZVt0aGlzLmRpc3BsYXlGaWVsZF0gOiB2YWx1ZTtcbiAgICB9XG4gICAgLy8gU2ltcGx5IGZhbGxpbmcgYmFjayB0byBhbiBlbXB0eSBzdHJpbmcgaWYgdGhlIGRpc3BsYXkgdmFsdWUgaXMgZmFsc3kgZG9lcyBub3Qgd29yayBwcm9wZXJseS5cbiAgICAvLyBUaGUgZGlzcGxheSB2YWx1ZSBjYW4gYWxzbyBiZSB0aGUgbnVtYmVyIHplcm8gYW5kIHNob3VsZG4ndCBmYWxsIGJhY2sgdG8gYW4gZW1wdHkgc3RyaW5nLlxuICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdG9EaXNwbGF5ID8gdG9EaXNwbGF5IDogJyc7XG4gICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5kaXNwbGF5VmFsdWU7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgY2xvc2VzIHRoZSBwYW5lbCwgYW5kIGlmIGEgdmFsdWUgaXMgc3BlY2lmaWVkLCBhbHNvIHNldHMgdGhlIGFzc29jaWF0ZWRcbiAgICogY29udHJvbCB0byB0aGF0IHZhbHVlLiBJdCB3aWxsIGFsc28gbWFyayB0aGUgY29udHJvbCBhcyBkaXJ0eSBpZiB0aGlzIGludGVyYWN0aW9uXG4gICAqIHN0ZW1tZWQgZnJvbSB0aGUgdXNlci5cbiAgICovXG4gIHB1YmxpYyBzZXRWYWx1ZUFuZENsb3NlKGV2ZW50OiBhbnkgfCBudWxsKTogdm9pZCB7XG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50LnZhbHVlKSB7XG4gICAgICB0aGlzLl9zZXRWYWx1ZShldmVudC52YWx1ZSk7XG4gICAgICB0aGlzLl9vbkNoYW5nZShldmVudC52YWx1ZSk7XG4gICAgfVxuICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGFueSBwcmV2aW91cyBzZWxlY3RlZCBvcHRpb24gYW5kIGVtaXQgYSBzZWxlY3Rpb24gY2hhbmdlIGV2ZW50IGZvciB0aGlzIG9wdGlvblxuICAgKi9cbiAgcHVibGljIGNsZWFyVmFsdWUoc2tpcDogYW55KSB7XG4gICAgdGhpcy53cml0ZVZhbHVlKG51bGwpO1xuICAgIHRoaXMuX29uQ2hhbmdlKG51bGwpO1xuICB9XG59XG4iXX0=