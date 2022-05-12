// NG
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, HostBinding, Input, Output, ViewChild, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateFormatService } from '../../services/date-format/DateFormat';
import { NovoLabelService } from '../../services/novo-label-service';
import { Helpers } from '../../utils/Helpers';
// Vendor
// App
import { NovoOverlayTemplateComponent } from '../common/overlay/Overlay';
import * as i0 from "@angular/core";
import * as i1 from "../../services/novo-label-service";
import * as i2 from "../../services/date-format/DateFormat";
import * as i3 from "../chips/ChipList";
import * as i4 from "../chips/Chip";
import * as i5 from "../icon/Icon";
import * as i6 from "../common/overlay/Overlay";
import * as i7 from "./DatePicker";
import * as i8 from "@angular/common";
import * as i9 from "@angular/forms";
import * as i10 from "../../pipes/default/Default";
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
NovoMultiDateInputElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoMultiDateInputElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }, { token: i2.DateFormatService }], target: i0.ɵɵFactoryTarget.Component });
NovoMultiDateInputElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoMultiDateInputElement, selector: "novo-multi-date-input", inputs: { name: "name", start: "start", end: "end", placeholder: "placeholder", format: "format", allowInvalidDate: "allowInvalidDate", weekStart: "weekStart", chipsCount: "chipsCount", value: "value", disabled: "disabled" }, outputs: { blurEvent: "blurEvent", focusEvent: "focusEvent", change: "change", blur: "blur", focus: "focus" }, host: { properties: { "class.disabled": "this.disabled" } }, providers: [MULTI_DATE_VALUE_ACCESSOR], viewQueries: [{ propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true }], ngImport: i0, template: `
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
  `, isInline: true, components: [{ type: i3.NovoChipList, selector: "novo-chip-list", inputs: ["errorStateMatcher", "multiple", "stacked", "compareWith", "value", "required", "placeholder", "disabled", "aria-orientation", "selectable", "tabIndex"], outputs: ["change", "valueChange"], exportAs: ["novoChipList"] }, { type: i4.NovoChipElement, selector: "novo-chip, [novo-chip]", inputs: ["color", "tabIndex", "size", "type", "selected", "value", "selectable", "disabled", "removable"], outputs: ["selectionChange", "destroyed", "removed"] }, { type: i5.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i6.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "height", "closeOnSelect", "parent"], outputs: ["select", "opening", "closing"] }, { type: i7.NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "disabledDateMessage", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }], directives: [{ type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NovoChipRemove, selector: "[novoChipRemove]" }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i9.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i9.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "default": i10.DefaultPipe, "date": i8.DatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoMultiDateInputElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-multi-date-input',
                    providers: [MULTI_DATE_VALUE_ACCESSOR],
                    template: `
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
  `,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }, { type: i2.DateFormatService }]; }, propDecorators: { name: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXVsdGlEYXRlSW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9kYXRlLXBpY2tlci9NdWx0aURhdGVJbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxLQUFLO0FBQ0wsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsV0FBVyxFQUNYLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVyRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsU0FBUztBQUNULE1BQU07QUFDTixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7Ozs7Ozs7O0FBRXpFLHNEQUFzRDtBQUN0RCxNQUFNLHlCQUF5QixHQUFHO0lBQ2hDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztJQUN4RCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFtQ0YsTUFBTSxPQUFPLHlCQUF5QjtJQTBEcEMsWUFDUyxPQUFtQixFQUNuQixNQUF3QixFQUN2QixHQUFzQixFQUN2QixpQkFBb0M7UUFIcEMsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUN2QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUN2QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FB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QU9DLElBQUk7c0JBREgsS0FBSztnQkFHTixLQUFLO3NCQURKLEtBQUs7Z0JBR04sR0FBRztzQkFERixLQUFLO2dCQUdOLFdBQVc7c0JBRFYsS0FBSztnQkFHTixNQUFNO3NCQURMLEtBQUs7Z0JBR04sZ0JBQWdCO3NCQURmLEtBQUs7Z0JBR04sU0FBUztzQkFEUixLQUFLO2dCQUdOLFVBQVU7c0JBRFQsS0FBSztnQkFHTixTQUFTO3NCQURSLE1BQU07Z0JBR1AsVUFBVTtzQkFEVCxNQUFNO2dCQUlQLE9BQU87c0JBRE4sU0FBUzt1QkFBQyw0QkFBNEI7Z0JBRzdCLE1BQU07c0JBQWYsTUFBTTtnQkFDRyxJQUFJO3NCQUFiLE1BQU07Z0JBQ0csS0FBSztzQkFBZCxNQUFNO2dCQU1NLEtBQUs7c0JBQWpCLEtBQUs7Z0JBY0YsUUFBUTtzQkFGWCxLQUFLOztzQkFDTCxXQUFXO3VCQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEYXRlRm9ybWF0U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2RhdGUtZm9ybWF0L0RhdGVGb3JtYXQnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgeyBLZXkgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vdXRpbHMvSGVscGVycyc7XG4vLyBWZW5kb3Jcbi8vIEFwcFxuaW1wb3J0IHsgTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudCB9IGZyb20gJy4uL2NvbW1vbi9vdmVybGF5L092ZXJsYXknO1xuXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcbmNvbnN0IE1VTFRJX0RBVEVfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvTXVsdGlEYXRlSW5wdXRFbGVtZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLW11bHRpLWRhdGUtaW5wdXQnLFxuICBwcm92aWRlcnM6IFtNVUxUSV9EQVRFX1ZBTFVFX0FDQ0VTU09SXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bm92by1jaGlwLWxpc3Q+XG4gICAgICA8bm92by1jaGlwICpuZ0Zvcj1cImxldCBkYXRlIG9mIHZhbHVlIHwgZGVmYXVsdDogW11cIiAocmVtb3ZlZCk9XCJyZW1vdmUoJGV2ZW50LCBkYXRlKVwiPlxuICAgICAgICB7eyBkYXRlIHwgZGF0ZTogZm9ybWF0IH19XG4gICAgICAgIDxub3ZvLWljb24gbm92b0NoaXBSZW1vdmU+Y2xvc2U8L25vdm8taWNvbj5cbiAgICAgIDwvbm92by1jaGlwPlxuICAgIDwvbm92by1jaGlwLWxpc3Q+XG4gICAgPCEtLSA8ZGl2ICpuZ0lmPVwidmFsdWUubGVuZ3RoID4gY2hpcHNDb3VudFwiPlxuICAgICAgPHVsIGNsYXNzPVwic3VtbWFyeVwiPlxuICAgICAgICA8bGkgKm5nRm9yPVwibGV0IHR5cGUgb2Ygbm90U2hvd25cIj4rIHt7IHR5cGUuY291bnQgfX0ge3sgbGFiZWxzLm1vcmUgfX0ge3sgdHlwZS50eXBlIH19PC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+IC0tPlxuICAgIDxkaXYgY2xhc3M9XCJjaGlwLWlucHV0LWNvbnRhaW5lclwiIChjbGljayk9XCJfaGFuZGxlRm9jdXMoJGV2ZW50KVwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJwbGFjZWhvbGRlclwiICpuZ0lmPVwiIXZhbHVlLmxlbmd0aFwiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm11bHRpLWRhdGUtaW5wdXRcIj57eyBwbGFjZWhvbGRlciB9fTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8bm92by1pY29uIGNsYXNzPVwicGFuZWwtdG9nZ2xlXCIgW2NsYXNzLnNlbGVjdGVkXT1cInBhbmVsT3BlblwiIChjbGljayk9XCJvcGVuUGFuZWwoKVwiPmNhbGVuZGFyPC9ub3ZvLWljb24+XG4gICAgPGxhYmVsIGNsYXNzPVwiY2xlYXItYWxsXCIgKm5nSWY9XCJ2YWx1ZS5sZW5ndGhcIiAoY2xpY2spPVwiY2xlYXJWYWx1ZSgpXCI+e3sgbGFiZWxzLmNsZWFyQWxsIH19IDxpIGNsYXNzPVwiYmhpLXRpbWVzXCI+PC9pPjwvbGFiZWw+XG4gICAgPG5vdm8tb3ZlcmxheS10ZW1wbGF0ZSBbcGFyZW50XT1cImVsZW1lbnRcIiBwb3NpdGlvbj1cImFib3ZlLWJlbG93XCI+XG4gICAgICA8bm92by1kYXRlLXBpY2tlclxuICAgICAgICBbc3RhcnRdPVwic3RhcnRcIlxuICAgICAgICBbZW5kXT1cImVuZFwiXG4gICAgICAgIGlubGluZT1cInRydWVcIlxuICAgICAgICBtb2RlPVwibXVsdGlwbGVcIlxuICAgICAgICAob25TZWxlY3QpPVwic2V0VmFsdWVBbmRDbG9zZSgkZXZlbnQpXCJcbiAgICAgICAgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG4gICAgICAgIFt3ZWVrU3RhcnRdPVwid2Vla1N0YXJ0XCJcbiAgICAgID48L25vdm8tZGF0ZS1waWNrZXI+XG4gICAgPC9ub3ZvLW92ZXJsYXktdGVtcGxhdGU+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9NdWx0aURhdGVJbnB1dEVsZW1lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgcHVibGljIGZvcm1hdHRlZFN0YXJ0RGF0ZTogc3RyaW5nID0gJyc7XG4gIHB1YmxpYyBmb3JtYXR0ZWRFbmREYXRlOiBzdHJpbmcgPSAnJztcbiAgcHJpdmF0ZSB1c2VyRGVmaW5lZEZvcm1hdDogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBuYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHN0YXJ0OiBEYXRlO1xuICBASW5wdXQoKVxuICBlbmQ6IERhdGU7XG4gIEBJbnB1dCgpXG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIGZvcm1hdDogc3RyaW5nID0gJ3Nob3J0RGF0ZSc7XG4gIEBJbnB1dCgpXG4gIGFsbG93SW52YWxpZERhdGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgd2Vla1N0YXJ0OiBudW1iZXIgPSAwO1xuICBASW5wdXQoKVxuICBjaGlwc0NvdW50OiBudW1iZXIgPSA1O1xuICBAT3V0cHV0KClcbiAgYmx1ckV2ZW50OiBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKVxuICBmb2N1c0V2ZW50OiBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+KCk7XG4gIC8qKiBFbGVtZW50IGZvciB0aGUgcGFuZWwgY29udGFpbmluZyB0aGUgYXV0b2NvbXBsZXRlIG9wdGlvbnMuICovXG4gIEBWaWV3Q2hpbGQoTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudClcbiAgb3ZlcmxheTogTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudDtcblxuICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYmx1ciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgX3ZhbHVlOiBEYXRlW10gPSBbXTtcbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBub3RTaG93bjogYW55ID0ge307XG5cbiAgQElucHV0KCkgZ2V0IHZhbHVlKCk6IERhdGVbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLnZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX3NldEZvcm1WYWx1ZSh2YWx1ZSk7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIERpc2FibGVkIFN0YXRlXG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZGlzYWJsZWQnKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gISF2YWx1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHB1YmxpYyBkYXRlRm9ybWF0U2VydmljZTogRGF0ZUZvcm1hdFNlcnZpY2UsXG4gICkge1xuICAgIHRoaXMucGxhY2Vob2xkZXIgPSB0aGlzLmxhYmVscy5kYXRlRm9ybWF0U3RyaW5nKCkudG9VcHBlckNhc2UoKSB8fCB0aGlzLmxhYmVscy5kYXRlRm9ybWF0UGxhY2Vob2xkZXI7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnVzZXJEZWZpbmVkRm9ybWF0ID0gdGhpcy5mb3JtYXQgPyAhdGhpcy5mb3JtYXQubWF0Y2goL14oRERcXC9NTVxcL1lZWVl8TU1cXC9ERFxcL1lZWVkpJC9nKSA6IGZhbHNlO1xuICAgIC8vIGlmICghdGhpcy51c2VyRGVmaW5lZEZvcm1hdCAmJiB0aGlzLnRleHRNYXNrRW5hYmxlZCAmJiAhdGhpcy5hbGxvd0ludmFsaWREYXRlKSB7XG4gICAgLy8gICB0aGlzLm1hc2tPcHRpb25zID0gdGhpcy5tYXNrT3B0aW9ucyB8fCB7XG4gICAgLy8gICAgIG1hc2s6IHRoaXMuZGF0ZUZvcm1hdFNlcnZpY2UuZ2V0RGF0ZU1hc2soKSxcbiAgICAvLyAgICAgcGlwZTogY3JlYXRlQXV0b0NvcnJlY3RlZERhdGVQaXBlKHRoaXMuZm9ybWF0IHx8IHRoaXMubGFiZWxzLmRhdGVGb3JtYXRTdHJpbmcoKS50b0xvd2VyQ2FzZSgpKSxcbiAgICAvLyAgICAga2VlcENoYXJQb3NpdGlvbnM6IGZhbHNlLFxuICAgIC8vICAgICBndWlkZTogdHJ1ZSxcbiAgICAvLyAgIH07XG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIHRoaXMubWFza09wdGlvbnMgPSB7IG1hc2s6IGZhbHNlIH07XG4gICAgLy8gfVxuICB9XG5cbiAgZm9ybWF0dGVyKHZhbHVlKSB7XG4gICAgY29uc3QgW2RhdGVUaW1lVmFsdWUsIGZvcm1hdHRlZF0gPSB0aGlzLmRhdGVGb3JtYXRTZXJ2aWNlLnBhcnNlU3RyaW5nKHZhbHVlLCBmYWxzZSwgJ2RhdGUnKTtcbiAgICByZXR1cm4gZm9ybWF0dGVkO1xuICB9XG5cbiAgLyoqIEJFR0lOOiBDb252ZW5pZW50IFBhbmVsIE1ldGhvZHMuICovXG4gIG9wZW5QYW5lbCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMucGFuZWxPcGVuID8gdGhpcy5vdmVybGF5LmNsb3NlUGFuZWwoKSA6IHRoaXMub3ZlcmxheS5vcGVuUGFuZWwoKTtcbiAgICB9XG4gIH1cbiAgY2xvc2VQYW5lbCgpOiB2b2lkIHtcbiAgICB0aGlzLm92ZXJsYXkgJiYgdGhpcy5vdmVybGF5LmNsb3NlUGFuZWwoKTtcbiAgfVxuICBnZXQgcGFuZWxPcGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm92ZXJsYXkgJiYgdGhpcy5vdmVybGF5LnBhbmVsT3BlbjtcbiAgfVxuICAvKiogRU5EOiBDb252ZW5pZW50IFBhbmVsIE1ldGhvZHMuICovXG5cbiAgX2hhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoKGV2ZW50LmtleSA9PT0gS2V5LkVzY2FwZSB8fCBldmVudC5rZXkgPT09IEtleS5FbnRlciB8fCBldmVudC5rZXkgPT09IEtleS5UYWIpICYmIHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVCbHVyKGV2ZW50OiBGb2N1c0V2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5ibHVyRXZlbnQuZW1pdChldmVudCk7XG4gIH1cblxuICBfaGFuZGxlRm9jdXMoZXZlbnQ6IEZvY3VzRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLm9wZW5QYW5lbCgpO1xuICAgIHRoaXMuZm9jdXNFdmVudC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIHJlbW92ZShldmVudDogYW55LCBkYXRlOiBEYXRlKSB7XG4gICAgY29uc3QgY3VycmVudCA9IG5ldyBTZXQodGhpcy52YWx1ZSk7XG4gICAgaWYgKGN1cnJlbnQuaGFzKGRhdGUpKSB7XG4gICAgICBjdXJyZW50LmRlbGV0ZShkYXRlKTtcbiAgICB9XG4gICAgdGhpcy52YWx1ZSA9IFsuLi5jdXJyZW50XTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2sgPSAoXzogYW55KSA9PiB7XG4gICAgLy8gcGxhY2Vob2xkZXJcbiAgfTtcblxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrID0gKCkgPT4ge1xuICAgIC8vIHBsYWNlaG9sZGVyXG4gIH07XG5cbiAgcHJpdmF0ZSBfc2V0Rm9ybVZhbHVlKHZhbHVlOiBEYXRlW10pOiB2b2lkIHtcbiAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgLy8gdGhpcy5mb3JtYXR0ZWRTdGFydERhdGUgPSB0aGlzLmZvcm1hdERhdGVWYWx1ZSh0aGlzLnZhbHVlLnN0YXJ0RGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGNsb3NlcyB0aGUgcGFuZWwsIGFuZCBpZiBhIHZhbHVlIGlzIHNwZWNpZmllZCwgYWxzbyBzZXRzIHRoZSBhc3NvY2lhdGVkXG4gICAqIGNvbnRyb2wgdG8gdGhhdCB2YWx1ZS4gSXQgd2lsbCBhbHNvIG1hcmsgdGhlIGNvbnRyb2wgYXMgZGlydHkgaWYgdGhpcyBpbnRlcmFjdGlvblxuICAgKiBzdGVtbWVkIGZyb20gdGhlIHVzZXIuXG4gICAqL1xuICBwdWJsaWMgc2V0VmFsdWVBbmRDbG9zZShldmVudDogRGF0ZVtdID0gW10pOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBldmVudDtcbiAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy52YWx1ZSk7XG4gICAgfVxuICAgIC8vIHRoaXMuY2xvc2VQYW5lbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGFueSBwcmV2aW91cyBzZWxlY3RlZCBvcHRpb24gYW5kIGVtaXQgYSBzZWxlY3Rpb24gY2hhbmdlIGV2ZW50IGZvciB0aGlzIG9wdGlvblxuICAgKi9cbiAgcHVibGljIGNsZWFyVmFsdWUoKSB7XG4gICAgdGhpcy52YWx1ZSA9IFtdO1xuICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy52YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGhhc1ZhbHVlKCkge1xuICAgIHJldHVybiAhSGVscGVycy5pc0VtcHR5KHRoaXMudmFsdWUpO1xuICB9XG59XG4iXX0=