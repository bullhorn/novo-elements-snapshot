// NG
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, HostBinding, Input, Output, ViewChild, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// App
import { NovoOverlayTemplateComponent } from 'novo-elements/elements/common';
import { DateFormatService, NovoLabelService } from 'novo-elements/services';
import { Helpers } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "novo-elements/elements/chips";
import * as i3 from "novo-elements/elements/icon";
import * as i4 from "novo-elements/elements/common";
import * as i5 from "./DatePicker";
import * as i6 from "@angular/common";
import * as i7 from "@angular/forms";
import * as i8 from "novo-elements/pipes";
// Value accessor for the component (supports ngModel)
const MULTI_DATE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoMultiDateInputElement),
    multi: true,
};
export class NovoMultiDateInputElement {
    constructor(element, labels, cdr, dateFormatService) {
        this.element = element;
        this.labels = labels;
        this.cdr = cdr;
        this.dateFormatService = dateFormatService;
        this.formattedStartDate = '';
        this.formattedEndDate = '';
        this.format = 'shortDate';
        this.allowInvalidDate = false;
        this.weekStart = 0;
        this.chipsCount = 5;
        this.blurEvent = new EventEmitter();
        this.focusEvent = new EventEmitter();
        this.change = new EventEmitter();
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this._value = [];
        this._disabled = false;
        this.notShown = {};
        this.onChangeCallback = (_) => {
            // placeholder
        };
        this.onTouchedCallback = () => {
            // placeholder
        };
        this.placeholder = this.labels.dateFormatString().toUpperCase() || this.labels.dateFormatPlaceholder;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        if (this.value !== value) {
            this._value = value;
            this._setFormValue(value);
            this.onChangeCallback(this._value);
        }
    }
    // Disabled State
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = !!value;
    }
    ngOnInit() {
        this.userDefinedFormat = this.format ? !this.format.match(/^(DD\/MM\/YYYY|MM\/DD\/YYYY)$/g) : false;
        // if (!this.userDefinedFormat && this.textMaskEnabled && !this.allowInvalidDate) {
        //   this.maskOptions = this.maskOptions || {
        //     mask: this.dateFormatService.getDateMask(),
        //     pipe: createAutoCorrectedDatePipe(this.format || this.labels.dateFormatString().toLowerCase()),
        //     keepCharPositions: false,
        //     guide: true,
        //   };
        // } else {
        //   this.maskOptions = { mask: false };
        // }
    }
    formatter(value) {
        const [dateTimeValue, formatted] = this.dateFormatService.parseString(value, false, 'date');
        return formatted;
    }
    /** BEGIN: Convenient Panel Methods. */
    openPanel() {
        if (!this.disabled) {
            this.panelOpen ? this.overlay.closePanel() : this.overlay.openPanel();
        }
    }
    closePanel() {
        this.overlay && this.overlay.closePanel();
    }
    get panelOpen() {
        return this.overlay && this.overlay.panelOpen;
    }
    /** END: Convenient Panel Methods. */
    _handleKeydown(event) {
        if ((event.key === "Escape" /* Escape */ || event.key === "Enter" /* Enter */ || event.key === "Tab" /* Tab */) && this.panelOpen) {
            this.closePanel();
            event.stopPropagation();
        }
    }
    _handleBlur(event) {
        this.blurEvent.emit(event);
    }
    _handleFocus(event) {
        this.openPanel();
        this.focusEvent.emit(event);
    }
    remove(event, date) {
        const current = new Set(this.value);
        if (current.has(date)) {
            current.delete(date);
        }
        this.value = [...current];
    }
    writeValue(value) {
        this.value = value;
        this.cdr.markForCheck();
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    _setFormValue(value) {
        if (this.value) {
            // this.formattedStartDate = this.formatDateValue(this.value.startDate);
        }
    }
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    setValueAndClose(event = []) {
        if (event) {
            this.value = event;
            this.change.emit(this.value);
        }
        // this.closePanel();
    }
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    clearValue() {
        this.value = [];
        this.change.emit(this.value);
    }
    get hasValue() {
        return !Helpers.isEmpty(this.value);
    }
}
NovoMultiDateInputElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoMultiDateInputElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }, { token: i1.DateFormatService }], target: i0.ɵɵFactoryTarget.Component });
NovoMultiDateInputElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoMultiDateInputElement, selector: "novo-multi-date-input", inputs: { name: "name", start: "start", end: "end", placeholder: "placeholder", format: "format", allowInvalidDate: "allowInvalidDate", weekStart: "weekStart", chipsCount: "chipsCount", value: "value", disabled: "disabled" }, outputs: { blurEvent: "blurEvent", focusEvent: "focusEvent", change: "change", blur: "blur", focus: "focus" }, host: { properties: { "class.disabled": "this.disabled" } }, providers: [MULTI_DATE_VALUE_ACCESSOR], viewQueries: [{ propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true }], ngImport: i0, template: `
    <novo-chip-list>
      <novo-chip *ngFor="let date of value | default: []" (removed)="remove($event, date)">
        {{ date | date: format }}
        <novo-icon novoChipRemove>close</novo-icon>
      </novo-chip>
    </novo-chip-list>
    <!-- <div *ngIf="value.length > chipsCount">
      <ul class="summary">
        <li *ngFor="let type of notShown">+ {{ type.count }} {{ labels.more }} {{ type.type }}</li>
      </ul>
    </div> -->
    <div class="chip-input-container" (click)="_handleFocus($event)">
      <span class="placeholder" *ngIf="!value.length" data-automation-id="multi-date-input">{{ placeholder }}</span>
    </div>
    <novo-icon class="panel-toggle" [class.selected]="panelOpen" (click)="openPanel()">calendar</novo-icon>
    <label class="clear-all" *ngIf="value.length" (click)="clearValue()">{{ labels.clearAll }} <i class="bhi-times"></i></label>
    <novo-overlay-template [parent]="element" position="above-below">
      <novo-date-picker
        [start]="start"
        [end]="end"
        inline="true"
        mode="multiple"
        (onSelect)="setValueAndClose($event)"
        [(ngModel)]="value"
        [weekStart]="weekStart"
      ></novo-date-picker>
    </novo-overlay-template>
  `, isInline: true, styles: [":host .chip-input-container{padding-top:10px}:host .chip-input-container .placeholder{color:var(--form-placeholder)}:host .panel-toggle{padding:.2em}:host .panel-toggle i{margin:0}:host .panel-toggle.selected{background:#dbdbdb;border-radius:50%}:host ul.summary{display:inline;list-style:none;color:#868686;padding:0 10px}:host ul.summary li{display:inline;padding:0 3px}:host ul.summary li:after{content:\", \"}:host ul.summary li:last-child:after{content:\" \"}:host chip span{text-transform:capitalize}\n"], components: [{ type: i2.NovoChipList, selector: "novo-chip-list", inputs: ["errorStateMatcher", "multiple", "stacked", "compareWith", "value", "required", "placeholder", "disabled", "aria-orientation", "selectable", "tabIndex"], outputs: ["change", "valueChange"], exportAs: ["novoChipList"] }, { type: i2.NovoChipElement, selector: "novo-chip, [novo-chip]", inputs: ["color", "tabIndex", "size", "type", "selected", "value", "selectable", "disabled", "removable"], outputs: ["selectionChange", "destroyed", "removed"] }, { type: i3.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i4.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing"] }, { type: i5.NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "disabledDateMessage", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }], directives: [{ type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NovoChipRemove, selector: "[novoChipRemove]" }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i7.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "default": i8.DefaultPipe, "date": i6.DatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoMultiDateInputElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-multi-date-input', providers: [MULTI_DATE_VALUE_ACCESSOR], template: `
    <novo-chip-list>
      <novo-chip *ngFor="let date of value | default: []" (removed)="remove($event, date)">
        {{ date | date: format }}
        <novo-icon novoChipRemove>close</novo-icon>
      </novo-chip>
    </novo-chip-list>
    <!-- <div *ngIf="value.length > chipsCount">
      <ul class="summary">
        <li *ngFor="let type of notShown">+ {{ type.count }} {{ labels.more }} {{ type.type }}</li>
      </ul>
    </div> -->
    <div class="chip-input-container" (click)="_handleFocus($event)">
      <span class="placeholder" *ngIf="!value.length" data-automation-id="multi-date-input">{{ placeholder }}</span>
    </div>
    <novo-icon class="panel-toggle" [class.selected]="panelOpen" (click)="openPanel()">calendar</novo-icon>
    <label class="clear-all" *ngIf="value.length" (click)="clearValue()">{{ labels.clearAll }} <i class="bhi-times"></i></label>
    <novo-overlay-template [parent]="element" position="above-below">
      <novo-date-picker
        [start]="start"
        [end]="end"
        inline="true"
        mode="multiple"
        (onSelect)="setValueAndClose($event)"
        [(ngModel)]="value"
        [weekStart]="weekStart"
      ></novo-date-picker>
    </novo-overlay-template>
  `, styles: [":host .chip-input-container{padding-top:10px}:host .chip-input-container .placeholder{color:var(--form-placeholder)}:host .panel-toggle{padding:.2em}:host .panel-toggle i{margin:0}:host .panel-toggle.selected{background:#dbdbdb;border-radius:50%}:host ul.summary{display:inline;list-style:none;color:#868686;padding:0 10px}:host ul.summary li{display:inline;padding:0 3px}:host ul.summary li:after{content:\", \"}:host ul.summary li:last-child:after{content:\" \"}:host chip span{text-transform:capitalize}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }, { type: i1.DateFormatService }]; }, propDecorators: { name: [{
                type: Input
            }], start: [{
                type: Input
            }], end: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], format: [{
                type: Input
            }], allowInvalidDate: [{
                type: Input
            }], weekStart: [{
                type: Input
            }], chipsCount: [{
                type: Input
            }], blurEvent: [{
                type: Output
            }], focusEvent: [{
                type: Output
            }], overlay: [{
                type: ViewChild,
                args: [NovoOverlayTemplateComponent]
            }], change: [{
                type: Output
            }], blur: [{
                type: Output
            }], focus: [{
                type: Output
            }], value: [{
                type: Input
            }], disabled: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.disabled']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXVsdGlEYXRlSW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9kYXRlLXBpY2tlci9NdWx0aURhdGVJbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxLQUFLO0FBQ0wsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsV0FBVyxFQUNYLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxNQUFNO0FBQ04sT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDN0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDN0UsT0FBTyxFQUFFLE9BQU8sRUFBTyxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7Ozs7O0FBRW5ELHNEQUFzRDtBQUN0RCxNQUFNLHlCQUF5QixHQUFHO0lBQ2hDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztJQUN4RCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFvQ0YsTUFBTSxPQUFPLHlCQUF5QjtJQTBEcEMsWUFDUyxPQUFtQixFQUNuQixNQUF3QixFQUN2QixHQUFzQixFQUN2QixpQkFBb0M7UUFIcEMsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUN2QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUN2QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBN0R0Qyx1QkFBa0IsR0FBVyxFQUFFLENBQUM7UUFDaEMscUJBQWdCLEdBQVcsRUFB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TUFBTTtzQkFETCxLQUFLO2dCQUdOLGdCQUFnQjtzQkFEZixLQUFLO2dCQUdOLFNBQVM7c0JBRFIsS0FBSztnQkFHTixVQUFVO3NCQURULEtBQUs7Z0JBR04sU0FBUztzQkFEUixNQUFNO2dCQUdQLFVBQVU7c0JBRFQsTUFBTTtnQkFJUCxPQUFPO3NCQUROLFNBQVM7dUJBQUMsNEJBQTRCO2dCQUc3QixNQUFNO3NCQUFmLE1BQU07Z0JBQ0csSUFBSTtzQkFBYixNQUFNO2dCQUNHLEtBQUs7c0JBQWQsTUFBTTtnQkFNTSxLQUFLO3NCQUFqQixLQUFLO2dCQWNGLFFBQVE7c0JBRlgsS0FBSzs7c0JBQ0wsV0FBVzt1QkFBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBOR1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuLy8gQXBwXG5pbXBvcnQgeyBOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50IH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9jb21tb24nO1xuaW1wb3J0IHsgRGF0ZUZvcm1hdFNlcnZpY2UsIE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcbmltcG9ydCB7IEhlbHBlcnMsIEtleSB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcbmNvbnN0IE1VTFRJX0RBVEVfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvTXVsdGlEYXRlSW5wdXRFbGVtZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLW11bHRpLWRhdGUtaW5wdXQnLFxuICBwcm92aWRlcnM6IFtNVUxUSV9EQVRFX1ZBTFVFX0FDQ0VTU09SXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bm92by1jaGlwLWxpc3Q+XG4gICAgICA8bm92by1jaGlwICpuZ0Zvcj1cImxldCBkYXRlIG9mIHZhbHVlIHwgZGVmYXVsdDogW11cIiAocmVtb3ZlZCk9XCJyZW1vdmUoJGV2ZW50LCBkYXRlKVwiPlxuICAgICAgICB7eyBkYXRlIHwgZGF0ZTogZm9ybWF0IH19XG4gICAgICAgIDxub3ZvLWljb24gbm92b0NoaXBSZW1vdmU+Y2xvc2U8L25vdm8taWNvbj5cbiAgICAgIDwvbm92by1jaGlwPlxuICAgIDwvbm92by1jaGlwLWxpc3Q+XG4gICAgPCEtLSA8ZGl2ICpuZ0lmPVwidmFsdWUubGVuZ3RoID4gY2hpcHNDb3VudFwiPlxuICAgICAgPHVsIGNsYXNzPVwic3VtbWFyeVwiPlxuICAgICAgICA8bGkgKm5nRm9yPVwibGV0IHR5cGUgb2Ygbm90U2hvd25cIj4rIHt7IHR5cGUuY291bnQgfX0ge3sgbGFiZWxzLm1vcmUgfX0ge3sgdHlwZS50eXBlIH19PC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+IC0tPlxuICAgIDxkaXYgY2xhc3M9XCJjaGlwLWlucHV0LWNvbnRhaW5lclwiIChjbGljayk9XCJfaGFuZGxlRm9jdXMoJGV2ZW50KVwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJwbGFjZWhvbGRlclwiICpuZ0lmPVwiIXZhbHVlLmxlbmd0aFwiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm11bHRpLWRhdGUtaW5wdXRcIj57eyBwbGFjZWhvbGRlciB9fTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8bm92by1pY29uIGNsYXNzPVwicGFuZWwtdG9nZ2xlXCIgW2NsYXNzLnNlbGVjdGVkXT1cInBhbmVsT3BlblwiIChjbGljayk9XCJvcGVuUGFuZWwoKVwiPmNhbGVuZGFyPC9ub3ZvLWljb24+XG4gICAgPGxhYmVsIGNsYXNzPVwiY2xlYXItYWxsXCIgKm5nSWY9XCJ2YWx1ZS5sZW5ndGhcIiAoY2xpY2spPVwiY2xlYXJWYWx1ZSgpXCI+e3sgbGFiZWxzLmNsZWFyQWxsIH19IDxpIGNsYXNzPVwiYmhpLXRpbWVzXCI+PC9pPjwvbGFiZWw+XG4gICAgPG5vdm8tb3ZlcmxheS10ZW1wbGF0ZSBbcGFyZW50XT1cImVsZW1lbnRcIiBwb3NpdGlvbj1cImFib3ZlLWJlbG93XCI+XG4gICAgICA8bm92by1kYXRlLXBpY2tlclxuICAgICAgICBbc3RhcnRdPVwic3RhcnRcIlxuICAgICAgICBbZW5kXT1cImVuZFwiXG4gICAgICAgIGlubGluZT1cInRydWVcIlxuICAgICAgICBtb2RlPVwibXVsdGlwbGVcIlxuICAgICAgICAob25TZWxlY3QpPVwic2V0VmFsdWVBbmRDbG9zZSgkZXZlbnQpXCJcbiAgICAgICAgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG4gICAgICAgIFt3ZWVrU3RhcnRdPVwid2Vla1N0YXJ0XCJcbiAgICAgID48L25vdm8tZGF0ZS1waWNrZXI+XG4gICAgPC9ub3ZvLW92ZXJsYXktdGVtcGxhdGU+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuL011bHRpRGF0ZUlucHV0LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b011bHRpRGF0ZUlucHV0RWxlbWVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBwdWJsaWMgZm9ybWF0dGVkU3RhcnREYXRlOiBzdHJpbmcgPSAnJztcbiAgcHVibGljIGZvcm1hdHRlZEVuZERhdGU6IHN0cmluZyA9ICcnO1xuICBwcml2YXRlIHVzZXJEZWZpbmVkRm9ybWF0OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIG5hbWU6IHN0cmluZztcbiAgQElucHV0KClcbiAgc3RhcnQ6IERhdGU7XG4gIEBJbnB1dCgpXG4gIGVuZDogRGF0ZTtcbiAgQElucHV0KClcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgQElucHV0KClcbiAgZm9ybWF0OiBzdHJpbmcgPSAnc2hvcnREYXRlJztcbiAgQElucHV0KClcbiAgYWxsb3dJbnZhbGlkRGF0ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICB3ZWVrU3RhcnQ6IG51bWJlciA9IDA7XG4gIEBJbnB1dCgpXG4gIGNoaXBzQ291bnQ6IG51bWJlciA9IDU7XG4gIEBPdXRwdXQoKVxuICBibHVyRXZlbnQ6IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4oKTtcbiAgQE91dHB1dCgpXG4gIGZvY3VzRXZlbnQ6IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4oKTtcbiAgLyoqIEVsZW1lbnQgZm9yIHRoZSBwYW5lbCBjb250YWluaW5nIHRoZSBhdXRvY29tcGxldGUgb3B0aW9ucy4gKi9cbiAgQFZpZXdDaGlsZChOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50KVxuICBvdmVybGF5OiBOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50O1xuXG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBibHVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZm9jdXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBfdmFsdWU6IERhdGVbXSA9IFtdO1xuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIG5vdFNob3duOiBhbnkgPSB7fTtcblxuICBASW5wdXQoKSBnZXQgdmFsdWUoKTogRGF0ZVtdIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMudmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5fc2V0Rm9ybVZhbHVlKHZhbHVlKTtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLl92YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gRGlzYWJsZWQgU3RhdGVcbiAgQElucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kaXNhYmxlZCcpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSAhIXZhbHVlO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSxcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHVibGljIGRhdGVGb3JtYXRTZXJ2aWNlOiBEYXRlRm9ybWF0U2VydmljZSxcbiAgKSB7XG4gICAgdGhpcy5wbGFjZWhvbGRlciA9IHRoaXMubGFiZWxzLmRhdGVGb3JtYXRTdHJpbmcoKS50b1VwcGVyQ2FzZSgpIHx8IHRoaXMubGFiZWxzLmRhdGVGb3JtYXRQbGFjZWhvbGRlcjtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudXNlckRlZmluZWRGb3JtYXQgPSB0aGlzLmZvcm1hdCA/ICF0aGlzLmZvcm1hdC5tYXRjaCgvXihERFxcL01NXFwvWVlZWXxNTVxcL0REXFwvWVlZWSkkL2cpIDogZmFsc2U7XG4gICAgLy8gaWYgKCF0aGlzLnVzZXJEZWZpbmVkRm9ybWF0ICYmIHRoaXMudGV4dE1hc2tFbmFibGVkICYmICF0aGlzLmFsbG93SW52YWxpZERhdGUpIHtcbiAgICAvLyAgIHRoaXMubWFza09wdGlvbnMgPSB0aGlzLm1hc2tPcHRpb25zIHx8IHtcbiAgICAvLyAgICAgbWFzazogdGhpcy5kYXRlRm9ybWF0U2VydmljZS5nZXREYXRlTWFzaygpLFxuICAgIC8vICAgICBwaXBlOiBjcmVhdGVBdXRvQ29ycmVjdGVkRGF0ZVBpcGUodGhpcy5mb3JtYXQgfHwgdGhpcy5sYWJlbHMuZGF0ZUZvcm1hdFN0cmluZygpLnRvTG93ZXJDYXNlKCkpLFxuICAgIC8vICAgICBrZWVwQ2hhclBvc2l0aW9uczogZmFsc2UsXG4gICAgLy8gICAgIGd1aWRlOiB0cnVlLFxuICAgIC8vICAgfTtcbiAgICAvLyB9IGVsc2Uge1xuICAgIC8vICAgdGhpcy5tYXNrT3B0aW9ucyA9IHsgbWFzazogZmFsc2UgfTtcbiAgICAvLyB9XG4gIH1cblxuICBmb3JtYXR0ZXIodmFsdWUpIHtcbiAgICBjb25zdCBbZGF0ZVRpbWVWYWx1ZSwgZm9ybWF0dGVkXSA9IHRoaXMuZGF0ZUZvcm1hdFNlcnZpY2UucGFyc2VTdHJpbmcodmFsdWUsIGZhbHNlLCAnZGF0ZScpO1xuICAgIHJldHVybiBmb3JtYXR0ZWQ7XG4gIH1cblxuICAvKiogQkVHSU46IENvbnZlbmllbnQgUGFuZWwgTWV0aG9kcy4gKi9cbiAgb3BlblBhbmVsKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5wYW5lbE9wZW4gPyB0aGlzLm92ZXJsYXkuY2xvc2VQYW5lbCgpIDogdGhpcy5vdmVybGF5Lm9wZW5QYW5lbCgpO1xuICAgIH1cbiAgfVxuICBjbG9zZVBhbmVsKCk6IHZvaWQge1xuICAgIHRoaXMub3ZlcmxheSAmJiB0aGlzLm92ZXJsYXkuY2xvc2VQYW5lbCgpO1xuICB9XG4gIGdldCBwYW5lbE9wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMub3ZlcmxheSAmJiB0aGlzLm92ZXJsYXkucGFuZWxPcGVuO1xuICB9XG4gIC8qKiBFTkQ6IENvbnZlbmllbnQgUGFuZWwgTWV0aG9kcy4gKi9cblxuICBfaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICgoZXZlbnQua2V5ID09PSBLZXkuRXNjYXBlIHx8IGV2ZW50LmtleSA9PT0gS2V5LkVudGVyIHx8IGV2ZW50LmtleSA9PT0gS2V5LlRhYikgJiYgdGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZUJsdXIoZXZlbnQ6IEZvY3VzRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLmJsdXJFdmVudC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIF9oYW5kbGVGb2N1cyhldmVudDogRm9jdXNFdmVudCk6IHZvaWQge1xuICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgdGhpcy5mb2N1c0V2ZW50LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgcmVtb3ZlKGV2ZW50OiBhbnksIGRhdGU6IERhdGUpIHtcbiAgICBjb25zdCBjdXJyZW50ID0gbmV3IFNldCh0aGlzLnZhbHVlKTtcbiAgICBpZiAoY3VycmVudC5oYXMoZGF0ZSkpIHtcbiAgICAgIGN1cnJlbnQuZGVsZXRlKGRhdGUpO1xuICAgIH1cbiAgICB0aGlzLnZhbHVlID0gWy4uLmN1cnJlbnRdO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShkaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjayA9IChfOiBhbnkpID0+IHtcbiAgICAvLyBwbGFjZWhvbGRlclxuICB9O1xuXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgLy8gcGxhY2Vob2xkZXJcbiAgfTtcblxuICBwcml2YXRlIF9zZXRGb3JtVmFsdWUodmFsdWU6IERhdGVbXSk6IHZvaWQge1xuICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICAvLyB0aGlzLmZvcm1hdHRlZFN0YXJ0RGF0ZSA9IHRoaXMuZm9ybWF0RGF0ZVZhbHVlKHRoaXMudmFsdWUuc3RhcnREYXRlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgY2xvc2VzIHRoZSBwYW5lbCwgYW5kIGlmIGEgdmFsdWUgaXMgc3BlY2lmaWVkLCBhbHNvIHNldHMgdGhlIGFzc29jaWF0ZWRcbiAgICogY29udHJvbCB0byB0aGF0IHZhbHVlLiBJdCB3aWxsIGFsc28gbWFyayB0aGUgY29udHJvbCBhcyBkaXJ0eSBpZiB0aGlzIGludGVyYWN0aW9uXG4gICAqIHN0ZW1tZWQgZnJvbSB0aGUgdXNlci5cbiAgICovXG4gIHB1YmxpYyBzZXRWYWx1ZUFuZENsb3NlKGV2ZW50OiBEYXRlW10gPSBbXSk6IHZvaWQge1xuICAgIGlmIChldmVudCkge1xuICAgICAgdGhpcy52YWx1ZSA9IGV2ZW50O1xuICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLnZhbHVlKTtcbiAgICB9XG4gICAgLy8gdGhpcy5jbG9zZVBhbmVsKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgYW55IHByZXZpb3VzIHNlbGVjdGVkIG9wdGlvbiBhbmQgZW1pdCBhIHNlbGVjdGlvbiBjaGFuZ2UgZXZlbnQgZm9yIHRoaXMgb3B0aW9uXG4gICAqL1xuICBwdWJsaWMgY2xlYXJWYWx1ZSgpIHtcbiAgICB0aGlzLnZhbHVlID0gW107XG4gICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaGFzVmFsdWUoKSB7XG4gICAgcmV0dXJuICFIZWxwZXJzLmlzRW1wdHkodGhpcy52YWx1ZSk7XG4gIH1cbn1cbiJdfQ==