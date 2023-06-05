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
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, HostBinding, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
// Vendor
import { isDate, isValid, parse, startOfDay, subDays } from 'date-fns';
// APP
import { NovoLabelService } from 'novo-elements/services';
import { BooleanInput, Helpers } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "@angular/platform-browser";
import * as i3 from "novo-elements/elements/calendar";
import * as i4 from "novo-elements/elements/button";
import * as i5 from "@angular/common";
// Value accessor for the component (supports ngModel)
const DATE_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoDatePickerElement),
    multi: true,
};
export class NovoDatePickerElement {
    constructor(labels, element, cdr, _sanitizer) {
        this.labels = labels;
        this.element = element;
        this.cdr = cdr;
        this._sanitizer = _sanitizer;
        /**
         * Day of the week the calendar should display first, Sunday=0...Saturday=6
         **/
        this.weekStart = 0;
        /**
         * Certain dates that are already selected.
         **/
        this.preselected = [];
        /**
         * Whether the days for the previous and next month should be hidden.
         **/
        this.hideOverflowDays = false;
        /**
         * Whether the footer which contains `today` button should be hidden.
         **/
        this.hideFooter = false;
        // Select callback for output
        this.onSelect = new EventEmitter(false);
        this._mode = 'single';
        this._numberOfMonths = [0];
        this._selection = [];
        this.preview = [];
        this.rangeSelectMode = 'startDate';
        this._onChange = () => { };
        this._onTouched = () => { };
    }
    /**
     * Number of months to display at once.
     * @default 1
     **/
    get numberOfMonths() {
        return this._numberOfMonths.length;
    }
    set numberOfMonths(value) {
        this._numberOfMonths = Array.from(Array(Number(value)).keys());
    }
    /**
     * How the date selection should work.
     * @default single
     **/
    get mode() {
        return this._mode;
    }
    set mode(value) {
        if (this._mode !== value) {
            this._mode = value;
        }
    }
    /**
     * **deprecated** please use `mode="range"`.
     **/
    get range() {
        return ['range', 'week'].includes(this.mode) || this._range;
    }
    set range(value) {
        console.warn(`'range' property is deprecated, please use 'mode="range"'.`);
        if (this._range !== value) {
            this._range = value;
            this.mode = 'range';
        }
    }
    /**
     * **deprecated** please use `mode="week"`.
     **/
    get weekRangeSelect() {
        return this._mode === 'week' || this._weekRangeSelect;
    }
    set weekRangeSelect(value) {
        console.warn(`'weekRangeSelect' property is deprecated, please use 'mode="week"'.`);
        if (this._weekRangeSelect !== value) {
            this._weekRangeSelect = value;
            this.mode = 'week';
        }
    }
    get selection() {
        return this._selection;
    }
    set selection(value) {
        this._selection = value ? value.filter(isDate).map((d) => startOfDay(d)) : [];
    }
    ngOnInit() {
        // Determine the year array
        const now = new Date();
        // Set labels
        if (this.model) {
            this.modelToSelection(this.model);
        }
        if (this.selection && this.selection.length) {
            this.updateView(this.selection[0]);
        }
    }
    updateView(date) {
        const value = date ? new Date(date) : new Date();
        this.activeDate = new Date(value);
    }
    updateSelection(selected, fireEvents = true) {
        // Helpers.swallowEvent(event);
        this.selection = selected;
        this.startDateLabel = this.labels.formatDateWithFormat(this.selection[0], {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
        this.endDateLabel = this.labels.formatDateWithFormat(this.selection[1], {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
        if (fireEvents) {
            switch (this.mode) {
                case 'multiple':
                    this.fireSelect();
                    // Also, update the ngModel
                    this._onChange(this.selection);
                    this.model = this.selection;
                    break;
                case 'range':
                case 'week':
                    if (this.selection.filter(Boolean).length === 2) {
                        this.fireRangeSelect();
                        // Also, update the ngModel
                        const model = {
                            startDate: this.selection[0],
                            endDate: this.selection[1],
                        };
                        this._onChange(model);
                        this.model = model;
                    }
                    break;
                case 'single':
                default:
                    this.fireSelect();
                    // Also, update the ngModel
                    this._onChange(this.selection[0]);
                    this.model = this.selection[0];
                    break;
            }
        }
        this.cdr.markForCheck();
    }
    eventData(date) {
        return {
            year: date.getFullYear(),
            month: this.labels.formatDateWithFormat(date, { month: 'long' }),
            day: this.labels.formatDateWithFormat(date, { weekday: 'long' }),
            date,
        };
    }
    fireSelect() {
        if (this.mode === 'multiple') {
            this.onSelect.next(this.selection);
        }
        else {
            this.onSelect.next(this.eventData(this.selection[0]));
        }
    }
    fireRangeSelect() {
        // Make sure the start date is before the end date
        if (this.selection.filter(Boolean).length === 2) {
            const [start, end] = this.selection;
            this.onSelect.next({
                startDate: this.eventData(start),
                endDate: this.eventData(end),
            });
        }
    }
    setToday() {
        const tmp = new Date();
        this.updateView(tmp);
        this.updateSelection(Array.of(tmp));
    }
    toggleRangeSelect(range) {
        this.rangeSelectMode = range;
        if (range === 'startDate' && this.selection.length) {
            this.updateView(this.selection[0]);
        }
        if (range === 'endDate' && this.selection.length === 2) {
            this.updateView(this.selection[1]);
        }
    }
    modelToSelection(model) {
        switch (this.mode) {
            case 'multiple':
                this.selection = model;
                break;
            case 'range':
            case 'week':
                this.setRangeSelection();
            case 'single':
            default:
                this.selection = [model];
                break;
        }
    }
    // ValueAccessor Functions
    writeValue(model) {
        this.model = model;
        if (this.mode === 'multiple') {
            this.selection = this.model;
        }
        if (this.mode === 'range') {
            this.setRangeSelection();
        }
        if (Helpers.isDate(model)) {
            this.updateView(model);
            this.modelToSelection(model);
        }
        else if (Helpers.isString(model)) {
            const date = parse(model);
            if (isValid(date)) {
                this.updateView(date);
                this.modelToSelection(date);
            }
        }
    }
    setRangeSelection() {
        if (this.model?.hasOwnProperty('startDate')) {
            // coming from standalone date picker
            const range = this.model;
            this.selection = [range.startDate, range.endDate].filter(Boolean);
        }
        else if (this.model?.hasOwnProperty('min')) {
            // coming from data-table filter where model end date is the beginning of the next day
            const range = this.model;
            this.selection = [range.min, subDays(range.max, 1)].filter(Boolean);
        }
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
}
NovoDatePickerElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDatePickerElement, deps: [{ token: i1.NovoLabelService }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
NovoDatePickerElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDatePickerElement, selector: "novo-date-picker", inputs: { minYear: "minYear", maxYear: "maxYear", start: "start", end: "end", inline: "inline", weekStart: "weekStart", preselected: "preselected", hideOverflowDays: "hideOverflowDays", hideFooter: "hideFooter", disabledDateMessage: "disabledDateMessage", numberOfMonths: "numberOfMonths", mode: "mode", range: "range", weekRangeSelect: "weekRangeSelect" }, outputs: { onSelect: "onSelect" }, host: { properties: { "class.hide-overflow-days": "this.hideOverflowDays" } }, providers: [DATE_PICKER_VALUE_ACCESSOR], ngImport: i0, template: `
    <div class="date-picker-container">
      <div class="date-range-tabs" *ngIf="range" [class.week-select-mode]="weekRangeSelect">
        <span
          class="range-tab"
          (click)="toggleRangeSelect('startDate')"
          [@startDateTextState]="rangeSelectMode"
          data-automation-id="calendar-start-date"
          >{{ startDateLabel }}</span
        >
        <span
          class="range-tab"
          (click)="toggleRangeSelect('endDate')"
          [@endDateTextState]="rangeSelectMode"
          data-automation-id="calendar-end-date"
          >{{ endDateLabel }}</span
        >
        <i class="indicator" [@indicatorState]="rangeSelectMode"></i>
      </div>

      <novo-calendar
        [activeDate]="activeDate"
        [(selected)]="selection"
        (selectedChange)="updateSelection($event)"
        [mode]="mode"
        [numberOfMonths]="numberOfMonths"
        [weekStartsOn]="weekStart"
        [disabledDateMessage]="disabledDateMessage"
        [minDate]="start"
        [maxDate]="end"
      ></novo-calendar>

      <div class="calendar-footer" [hidden]="hideFooter">
        <novo-button (click)="setToday()" class="today" size="small" data-automation-id="calendar-today">{{ labels.today }}</novo-button>
      </div>
    </div>
  `, isInline: true, components: [{ type: i3.NovoCalendarElement, selector: "novo-calendar", inputs: ["minYear", "maxYear", "minDate", "maxDate", "activeView", "layout", "selected", "preview", "overlays", "disabledDateMessage", "activeDate", "weekStartsOn", "numberOfMonths", "mode"], outputs: ["selectedChange", "previewChange", "activeDateChange"] }, { type: i4.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], animations: [
        trigger('startDateTextState', [
            state('startDate', style({
                opacity: '1.0',
            })),
            state('endDate', style({
                opacity: '0.6',
            })),
            transition('startDate <=> endDate', animate('200ms ease-in')),
        ]),
        trigger('endDateTextState', [
            state('startDate', style({
                opacity: '0.6',
            })),
            state('endDate', style({
                opacity: '1.0',
            })),
            transition('startDate <=> endDate', animate('200ms ease-in')),
        ]),
        trigger('indicatorState', [
            state('startDate', style({
                transform: 'translateX(0%)',
            })),
            state('endDate', style({
                transform: 'translateX(100%)',
            })),
            transition('startDate <=> endDate', animate('200ms ease-in')),
        ]),
    ] });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoDatePickerElement.prototype, "inline", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoDatePickerElement.prototype, "hideOverflowDays", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoDatePickerElement.prototype, "hideFooter", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDatePickerElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-date-picker',
                    providers: [DATE_PICKER_VALUE_ACCESSOR],
                    animations: [
                        trigger('startDateTextState', [
                            state('startDate', style({
                                opacity: '1.0',
                            })),
                            state('endDate', style({
                                opacity: '0.6',
                            })),
                            transition('startDate <=> endDate', animate('200ms ease-in')),
                        ]),
                        trigger('endDateTextState', [
                            state('startDate', style({
                                opacity: '0.6',
                            })),
                            state('endDate', style({
                                opacity: '1.0',
                            })),
                            transition('startDate <=> endDate', animate('200ms ease-in')),
                        ]),
                        trigger('indicatorState', [
                            state('startDate', style({
                                transform: 'translateX(0%)',
                            })),
                            state('endDate', style({
                                transform: 'translateX(100%)',
                            })),
                            transition('startDate <=> endDate', animate('200ms ease-in')),
                        ]),
                    ],
                    template: `
    <div class="date-picker-container">
      <div class="date-range-tabs" *ngIf="range" [class.week-select-mode]="weekRangeSelect">
        <span
          class="range-tab"
          (click)="toggleRangeSelect('startDate')"
          [@startDateTextState]="rangeSelectMode"
          data-automation-id="calendar-start-date"
          >{{ startDateLabel }}</span
        >
        <span
          class="range-tab"
          (click)="toggleRangeSelect('endDate')"
          [@endDateTextState]="rangeSelectMode"
          data-automation-id="calendar-end-date"
          >{{ endDateLabel }}</span
        >
        <i class="indicator" [@indicatorState]="rangeSelectMode"></i>
      </div>

      <novo-calendar
        [activeDate]="activeDate"
        [(selected)]="selection"
        (selectedChange)="updateSelection($event)"
        [mode]="mode"
        [numberOfMonths]="numberOfMonths"
        [weekStartsOn]="weekStart"
        [disabledDateMessage]="disabledDateMessage"
        [minDate]="start"
        [maxDate]="end"
      ></novo-calendar>

      <div class="calendar-footer" [hidden]="hideFooter">
        <novo-button (click)="setToday()" class="today" size="small" data-automation-id="calendar-today">{{ labels.today }}</novo-button>
      </div>
    </div>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i2.DomSanitizer }]; }, propDecorators: { minYear: [{
                type: Input
            }], maxYear: [{
                type: Input
            }], start: [{
                type: Input
            }], end: [{
                type: Input
            }], inline: [{
                type: Input
            }], weekStart: [{
                type: Input
            }], preselected: [{
                type: Input
            }], hideOverflowDays: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.hide-overflow-days']
            }], hideFooter: [{
                type: Input
            }], disabledDateMessage: [{
                type: Input
            }], onSelect: [{
                type: Output
            }], numberOfMonths: [{
                type: Input
            }], mode: [{
                type: Input
            }], range: [{
                type: Input
            }], weekRangeSelect: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2RhdGUtcGlja2VyL0RhdGVQaWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2SSxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELFNBQVM7QUFDVCxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN2RSxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBOEMsT0FBTyxFQUE0QyxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7O0FBRWxKLHNEQUFzRDtBQUN0RCxNQUFNLDBCQUEwQixHQUFHO0lBQ2pDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztJQUNwRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUEwRkYsTUFBTSxPQUFPLHFCQUFxQjtJQTZJaEMsWUFDUyxNQUF3QixFQUN2QixPQUFtQixFQUNuQixHQUFzQixFQUN0QixVQUF3QjtRQUh6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LENBQ0g7NEJBQ0QsS0FBSyxDQUNILFNBQVMsRUFDVCxLQUFLLENBQUM7Z0NBQ0osU0FBUyxFQUFFLGtCQUFrQjs2QkFDOUIsQ0FBQyxDQUNIOzRCQUNELFVBQVUsQ0FBQyx1QkFBdUIsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7eUJBQzlELENBQUM7cUJBQ0g7b0JBQ0QsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQ1Q7aUJBQ0Y7MkxBTUMsT0FBTztzQkFETixLQUFLO2dCQU1OLE9BQU87c0JBRE4sS0FBSztnQkFNTixLQUFLO3NCQURKLEtBQUs7Z0JBTU4sR0FBRztzQkFERixLQUFLO2dCQU9OLE1BQU07c0JBRkwsS0FBSztnQkFPTixTQUFTO3NCQURSLEtBQUs7Z0JBTU4sV0FBVztzQkFEVixLQUFLO2dCQVFDLGdCQUFnQjtzQkFIdEIsS0FBSzs7c0JBRUwsV0FBVzt1QkFBQywwQkFBMEI7Z0JBT2hDLFVBQVU7c0JBRmhCLEtBQUs7Z0JBS04sbUJBQW1CO3NCQURsQixLQUFLO2dCQUtOLFFBQVE7c0JBRFAsTUFBTTtnQkFhSCxjQUFjO3NCQURqQixLQUFLO2dCQWFGLElBQUk7c0JBRFAsS0FBSztnQkFhRixLQUFLO3NCQURSLEtBQUs7Z0JBZUYsZUFBZTtzQkFEbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgYW5pbWF0ZSwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuLy8gVmVuZG9yXG5pbXBvcnQgeyBpc0RhdGUsIGlzVmFsaWQsIHBhcnNlLCBzdGFydE9mRGF5LCBzdWJEYXlzIH0gZnJvbSAnZGF0ZS1mbnMnO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIERhdGFUYWJsZVJhbmdlTW9kZWwsIERhdGVQaWNrZXJTZWxlY3RNb2RlcywgSGVscGVycywgbW9kZWxUeXBlcywgUmFuZ2VNb2RlbCwgcmFuZ2VTZWxlY3RNb2RlcyB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcbmNvbnN0IERBVEVfUElDS0VSX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b0RhdGVQaWNrZXJFbGVtZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWRhdGUtcGlja2VyJyxcbiAgcHJvdmlkZXJzOiBbREFURV9QSUNLRVJfVkFMVUVfQUNDRVNTT1JdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignc3RhcnREYXRlVGV4dFN0YXRlJywgW1xuICAgICAgc3RhdGUoXG4gICAgICAgICdzdGFydERhdGUnLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogJzEuMCcsXG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICAgIHN0YXRlKFxuICAgICAgICAnZW5kRGF0ZScsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5OiAnMC42JyxcbiAgICAgICAgfSksXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbignc3RhcnREYXRlIDw9PiBlbmREYXRlJywgYW5pbWF0ZSgnMjAwbXMgZWFzZS1pbicpKSxcbiAgICBdKSxcbiAgICB0cmlnZ2VyKCdlbmREYXRlVGV4dFN0YXRlJywgW1xuICAgICAgc3RhdGUoXG4gICAgICAgICdzdGFydERhdGUnLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogJzAuNicsXG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICAgIHN0YXRlKFxuICAgICAgICAnZW5kRGF0ZScsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5OiAnMS4wJyxcbiAgICAgICAgfSksXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbignc3RhcnREYXRlIDw9PiBlbmREYXRlJywgYW5pbWF0ZSgnMjAwbXMgZWFzZS1pbicpKSxcbiAgICBdKSxcbiAgICB0cmlnZ2VyKCdpbmRpY2F0b3JTdGF0ZScsIFtcbiAgICAgIHN0YXRlKFxuICAgICAgICAnc3RhcnREYXRlJyxcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCUpJyxcbiAgICAgICAgfSksXG4gICAgICApLFxuICAgICAgc3RhdGUoXG4gICAgICAgICdlbmREYXRlJyxcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMTAwJSknLFxuICAgICAgICB9KSxcbiAgICAgICksXG4gICAgICB0cmFuc2l0aW9uKCdzdGFydERhdGUgPD0+IGVuZERhdGUnLCBhbmltYXRlKCcyMDBtcyBlYXNlLWluJykpLFxuICAgIF0pLFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJkYXRlLXBpY2tlci1jb250YWluZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJkYXRlLXJhbmdlLXRhYnNcIiAqbmdJZj1cInJhbmdlXCIgW2NsYXNzLndlZWstc2VsZWN0LW1vZGVdPVwid2Vla1JhbmdlU2VsZWN0XCI+XG4gICAgICAgIDxzcGFuXG4gICAgICAgICAgY2xhc3M9XCJyYW5nZS10YWJcIlxuICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVSYW5nZVNlbGVjdCgnc3RhcnREYXRlJylcIlxuICAgICAgICAgIFtAc3RhcnREYXRlVGV4dFN0YXRlXT1cInJhbmdlU2VsZWN0TW9kZVwiXG4gICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwiY2FsZW5kYXItc3RhcnQtZGF0ZVwiXG4gICAgICAgICAgPnt7IHN0YXJ0RGF0ZUxhYmVsIH19PC9zcGFuXG4gICAgICAgID5cbiAgICAgICAgPHNwYW5cbiAgICAgICAgICBjbGFzcz1cInJhbmdlLXRhYlwiXG4gICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZVJhbmdlU2VsZWN0KCdlbmREYXRlJylcIlxuICAgICAgICAgIFtAZW5kRGF0ZVRleHRTdGF0ZV09XCJyYW5nZVNlbGVjdE1vZGVcIlxuICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImNhbGVuZGFyLWVuZC1kYXRlXCJcbiAgICAgICAgICA+e3sgZW5kRGF0ZUxhYmVsIH19PC9zcGFuXG4gICAgICAgID5cbiAgICAgICAgPGkgY2xhc3M9XCJpbmRpY2F0b3JcIiBbQGluZGljYXRvclN0YXRlXT1cInJhbmdlU2VsZWN0TW9kZVwiPjwvaT5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8bm92by1jYWxlbmRhclxuICAgICAgICBbYWN0aXZlRGF0ZV09XCJhY3RpdmVEYXRlXCJcbiAgICAgICAgWyhzZWxlY3RlZCldPVwic2VsZWN0aW9uXCJcbiAgICAgICAgKHNlbGVjdGVkQ2hhbmdlKT1cInVwZGF0ZVNlbGVjdGlvbigkZXZlbnQpXCJcbiAgICAgICAgW21vZGVdPVwibW9kZVwiXG4gICAgICAgIFtudW1iZXJPZk1vbnRoc109XCJudW1iZXJPZk1vbnRoc1wiXG4gICAgICAgIFt3ZWVrU3RhcnRzT25dPVwid2Vla1N0YXJ0XCJcbiAgICAgICAgW2Rpc2FibGVkRGF0ZU1lc3NhZ2VdPVwiZGlzYWJsZWREYXRlTWVzc2FnZVwiXG4gICAgICAgIFttaW5EYXRlXT1cInN0YXJ0XCJcbiAgICAgICAgW21heERhdGVdPVwiZW5kXCJcbiAgICAgID48L25vdm8tY2FsZW5kYXI+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYWxlbmRhci1mb290ZXJcIiBbaGlkZGVuXT1cImhpZGVGb290ZXJcIj5cbiAgICAgICAgPG5vdm8tYnV0dG9uIChjbGljayk9XCJzZXRUb2RheSgpXCIgY2xhc3M9XCJ0b2RheVwiIHNpemU9XCJzbWFsbFwiIGRhdGEtYXV0b21hdGlvbi1pZD1cImNhbGVuZGFyLXRvZGF5XCI+e3sgbGFiZWxzLnRvZGF5IH19PC9ub3ZvLWJ1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGF0ZVBpY2tlckVsZW1lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0IHtcbiAgLyoqXG4gICAqIFRoZSBtaW5pbXVtIHllYXIgdG8gYWxsb3cgc2VsZWN0ZWQgaW4geWVhciBzZWxlY3Qgdmlld1xuICAgKiovXG4gIEBJbnB1dCgpXG4gIG1pblllYXI6IHN0cmluZyB8IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBtYXhpbXVtIHllYXIgdG8gYWxsb3cgc2VsZWN0ZWQgaW4geWVhciBzZWxlY3Qgdmlld1xuICAgKiovXG4gIEBJbnB1dCgpXG4gIG1heFllYXI6IHN0cmluZyB8IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBtaW5pbXVtIGRhdGUgdGhhdCBjYW4gYmUgc2VsZWN0ZWQuXG4gICAqKi9cbiAgQElucHV0KClcbiAgc3RhcnQ6IERhdGU7XG4gIC8qKlxuICAgKiBUaGUgbWF4aW11bSBkYXRlIHRoYXQgY2FuIGJlIHNlbGVjdGVkLlxuICAgKiovXG4gIEBJbnB1dCgpXG4gIGVuZDogRGF0ZTtcbiAgLyoqXG4gICAqICoqRGVwcmVjYXRlZCoqIFdoZXRoZXIgdGhlIGRhdGUtcGlja2VyIGlzIHVzZWQgb3V0c2lkZSBvZiBhbiBvdmVybGF5LlxuICAgKiovXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBpbmxpbmU6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBEYXkgb2YgdGhlIHdlZWsgdGhlIGNhbGVuZGFyIHNob3VsZCBkaXNwbGF5IGZpcnN0LCBTdW5kYXk9MC4uLlNhdHVyZGF5PTZcbiAgICoqL1xuICBASW5wdXQoKVxuICB3ZWVrU3RhcnQ6IG51bWJlciA9IDA7XG4gIC8qKlxuICAgKiBDZXJ0YWluIGRhdGVzIHRoYXQgYXJlIGFscmVhZHkgc2VsZWN0ZWQuXG4gICAqKi9cbiAgQElucHV0KClcbiAgcHJlc2VsZWN0ZWQ6IERhdGVbXSA9IFtdO1xuICAvKipcbiAgICogV2hldGhlciB0aGUgZGF5cyBmb3IgdGhlIHByZXZpb3VzIGFuZCBuZXh0IG1vbnRoIHNob3VsZCBiZSBoaWRkZW4uXG4gICAqKi9cbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3MuaGlkZS1vdmVyZmxvdy1kYXlzJylcbiAgcHVibGljIGhpZGVPdmVyZmxvd0RheXM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGZvb3RlciB3aGljaCBjb250YWlucyBgdG9kYXlgIGJ1dHRvbiBzaG91bGQgYmUgaGlkZGVuLlxuICAgKiovXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBwdWJsaWMgaGlkZUZvb3RlcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGRpc2FibGVkRGF0ZU1lc3NhZ2U6IHN0cmluZztcblxuICAvLyBTZWxlY3QgY2FsbGJhY2sgZm9yIG91dHB1dFxuICBAT3V0cHV0KClcbiAgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcihmYWxzZSk7XG5cbiAgX21vZGU6IERhdGVQaWNrZXJTZWxlY3RNb2RlcyA9ICdzaW5nbGUnO1xuICBfcmFuZ2U6IGJvb2xlYW47XG4gIF93ZWVrUmFuZ2VTZWxlY3Q6IGJvb2xlYW47XG4gIF9udW1iZXJPZk1vbnRoczogbnVtYmVyW10gPSBbMF07XG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiBtb250aHMgdG8gZGlzcGxheSBhdCBvbmNlLlxuICAgKiBAZGVmYXVsdCAxXG4gICAqKi9cbiAgQElucHV0KClcbiAgZ2V0IG51bWJlck9mTW9udGhzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX251bWJlck9mTW9udGhzLmxlbmd0aDtcbiAgfVxuICBzZXQgbnVtYmVyT2ZNb250aHModmFsdWUpIHtcbiAgICB0aGlzLl9udW1iZXJPZk1vbnRocyA9IEFycmF5LmZyb20oQXJyYXkoTnVtYmVyKHZhbHVlKSkua2V5cygpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIb3cgdGhlIGRhdGUgc2VsZWN0aW9uIHNob3VsZCB3b3JrLlxuICAgKiBAZGVmYXVsdCBzaW5nbGVcbiAgICoqL1xuICBASW5wdXQoKVxuICBnZXQgbW9kZSgpOiBEYXRlUGlja2VyU2VsZWN0TW9kZXMge1xuICAgIHJldHVybiB0aGlzLl9tb2RlO1xuICB9XG4gIHNldCBtb2RlKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuX21vZGUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9tb2RlID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiAqKmRlcHJlY2F0ZWQqKiBwbGVhc2UgdXNlIGBtb2RlPVwicmFuZ2VcImAuXG4gICAqKi9cbiAgQElucHV0KClcbiAgZ2V0IHJhbmdlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBbJ3JhbmdlJywgJ3dlZWsnXS5pbmNsdWRlcyh0aGlzLm1vZGUpIHx8IHRoaXMuX3JhbmdlO1xuICB9XG4gIHNldCByYW5nZSh2YWx1ZSkge1xuICAgIGNvbnNvbGUud2FybihgJ3JhbmdlJyBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlICdtb2RlPVwicmFuZ2VcIicuYCk7XG4gICAgaWYgKHRoaXMuX3JhbmdlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fcmFuZ2UgPSB2YWx1ZTtcbiAgICAgIHRoaXMubW9kZSA9ICdyYW5nZSc7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiAqKmRlcHJlY2F0ZWQqKiBwbGVhc2UgdXNlIGBtb2RlPVwid2Vla1wiYC5cbiAgICoqL1xuICBASW5wdXQoKVxuICBnZXQgd2Vla1JhbmdlU2VsZWN0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9tb2RlID09PSAnd2VlaycgfHwgdGhpcy5fd2Vla1JhbmdlU2VsZWN0O1xuICB9XG4gIHNldCB3ZWVrUmFuZ2VTZWxlY3QodmFsdWUpIHtcbiAgICBjb25zb2xlLndhcm4oYCd3ZWVrUmFuZ2VTZWxlY3QnIHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgJ21vZGU9XCJ3ZWVrXCInLmApO1xuICAgIGlmICh0aGlzLl93ZWVrUmFuZ2VTZWxlY3QgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl93ZWVrUmFuZ2VTZWxlY3QgPSB2YWx1ZTtcbiAgICAgIHRoaXMubW9kZSA9ICd3ZWVrJztcbiAgICB9XG4gIH1cblxuICAvLyBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoJylcbiAgLy8gZ2V0IGhiX3dpZHRoKCkge1xuICAvLyAgIHJldHVybiB0aGlzLl9zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKGAke3RoaXMubnVtYmVyT2ZNb250aHMgKiAyMjh9cHhgKTtcbiAgLy8gfVxuXG4gIG1vZGVsOiBtb2RlbFR5cGVzO1xuICBhY3RpdmVEYXRlOiBEYXRlO1xuXG4gIF9zZWxlY3Rpb246IERhdGVbXSA9IFtdO1xuICBwcmV2aWV3OiBEYXRlW10gPSBbXTtcbiAgc3RhcnREYXRlTGFiZWw6IHN0cmluZztcbiAgZW5kRGF0ZUxhYmVsOiBzdHJpbmc7XG5cbiAgcmFuZ2VTZWxlY3RNb2RlOiByYW5nZVNlbGVjdE1vZGVzID0gJ3N0YXJ0RGF0ZSc7XG4gIF9vbkNoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgX29uVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICBnZXQgc2VsZWN0aW9uKCk6IERhdGVbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvbjtcbiAgfVxuICBzZXQgc2VsZWN0aW9uKHZhbHVlKSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uID0gdmFsdWUgPyB2YWx1ZS5maWx0ZXIoaXNEYXRlKS5tYXAoKGQpID0+IHN0YXJ0T2ZEYXkoZCkpIDogW107XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLFxuICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBfc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBEZXRlcm1pbmUgdGhlIHllYXIgYXJyYXlcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIC8vIFNldCBsYWJlbHNcbiAgICBpZiAodGhpcy5tb2RlbCkge1xuICAgICAgdGhpcy5tb2RlbFRvU2VsZWN0aW9uKHRoaXMubW9kZWwpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zZWxlY3Rpb24gJiYgdGhpcy5zZWxlY3Rpb24ubGVuZ3RoKSB7XG4gICAgICB0aGlzLnVwZGF0ZVZpZXcodGhpcy5zZWxlY3Rpb25bMF0pO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVZpZXcoZGF0ZSkge1xuICAgIGNvbnN0IHZhbHVlOiBhbnkgPSBkYXRlID8gbmV3IERhdGUoZGF0ZSkgOiBuZXcgRGF0ZSgpO1xuICAgIHRoaXMuYWN0aXZlRGF0ZSA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgfVxuXG4gIHVwZGF0ZVNlbGVjdGlvbihzZWxlY3RlZDogRGF0ZVtdLCBmaXJlRXZlbnRzID0gdHJ1ZSkge1xuICAgIC8vIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICB0aGlzLnNlbGVjdGlvbiA9IHNlbGVjdGVkO1xuXG4gICAgdGhpcy5zdGFydERhdGVMYWJlbCA9IHRoaXMubGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KHRoaXMuc2VsZWN0aW9uWzBdLCB7XG4gICAgICBtb250aDogJ3Nob3J0JyxcbiAgICAgIGRheTogJzItZGlnaXQnLFxuICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgIH0pO1xuXG4gICAgdGhpcy5lbmREYXRlTGFiZWwgPSB0aGlzLmxhYmVscy5mb3JtYXREYXRlV2l0aEZvcm1hdCh0aGlzLnNlbGVjdGlvblsxXSwge1xuICAgICAgbW9udGg6ICdzaG9ydCcsXG4gICAgICBkYXk6ICcyLWRpZ2l0JyxcbiAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICB9KTtcblxuICAgIGlmIChmaXJlRXZlbnRzKSB7XG4gICAgICBzd2l0Y2ggKHRoaXMubW9kZSkge1xuICAgICAgICBjYXNlICdtdWx0aXBsZSc6XG4gICAgICAgICAgdGhpcy5maXJlU2VsZWN0KCk7XG4gICAgICAgICAgLy8gQWxzbywgdXBkYXRlIHRoZSBuZ01vZGVsXG4gICAgICAgICAgdGhpcy5fb25DaGFuZ2UodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICAgIHRoaXMubW9kZWwgPSB0aGlzLnNlbGVjdGlvbjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncmFuZ2UnOlxuICAgICAgICBjYXNlICd3ZWVrJzpcbiAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb24uZmlsdGVyKEJvb2xlYW4pLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgdGhpcy5maXJlUmFuZ2VTZWxlY3QoKTtcbiAgICAgICAgICAgIC8vIEFsc28sIHVwZGF0ZSB0aGUgbmdNb2RlbFxuICAgICAgICAgICAgY29uc3QgbW9kZWwgPSB7XG4gICAgICAgICAgICAgIHN0YXJ0RGF0ZTogdGhpcy5zZWxlY3Rpb25bMF0sXG4gICAgICAgICAgICAgIGVuZERhdGU6IHRoaXMuc2VsZWN0aW9uWzFdLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuX29uQ2hhbmdlKG1vZGVsKTtcbiAgICAgICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3NpbmdsZSc6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhpcy5maXJlU2VsZWN0KCk7XG4gICAgICAgICAgLy8gQWxzbywgdXBkYXRlIHRoZSBuZ01vZGVsXG4gICAgICAgICAgdGhpcy5fb25DaGFuZ2UodGhpcy5zZWxlY3Rpb25bMF0pO1xuICAgICAgICAgIHRoaXMubW9kZWwgPSB0aGlzLnNlbGVjdGlvblswXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGV2ZW50RGF0YShkYXRlOiBEYXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHllYXI6IGRhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgIG1vbnRoOiB0aGlzLmxhYmVscy5mb3JtYXREYXRlV2l0aEZvcm1hdChkYXRlLCB7IG1vbnRoOiAnbG9uZycgfSksXG4gICAgICBkYXk6IHRoaXMubGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KGRhdGUsIHsgd2Vla2RheTogJ2xvbmcnIH0pLFxuICAgICAgZGF0ZSxcbiAgICB9O1xuICB9XG5cbiAgZmlyZVNlbGVjdCgpIHtcbiAgICBpZiAodGhpcy5tb2RlID09PSAnbXVsdGlwbGUnKSB7XG4gICAgICB0aGlzLm9uU2VsZWN0Lm5leHQodGhpcy5zZWxlY3Rpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uU2VsZWN0Lm5leHQodGhpcy5ldmVudERhdGEodGhpcy5zZWxlY3Rpb25bMF0pKTtcbiAgICB9XG4gIH1cblxuICBmaXJlUmFuZ2VTZWxlY3QoKSB7XG4gICAgLy8gTWFrZSBzdXJlIHRoZSBzdGFydCBkYXRlIGlzIGJlZm9yZSB0aGUgZW5kIGRhdGVcbiAgICBpZiAodGhpcy5zZWxlY3Rpb24uZmlsdGVyKEJvb2xlYW4pLmxlbmd0aCA9PT0gMikge1xuICAgICAgY29uc3QgW3N0YXJ0LCBlbmRdID0gdGhpcy5zZWxlY3Rpb247XG4gICAgICB0aGlzLm9uU2VsZWN0Lm5leHQoe1xuICAgICAgICBzdGFydERhdGU6IHRoaXMuZXZlbnREYXRhKHN0YXJ0KSxcbiAgICAgICAgZW5kRGF0ZTogdGhpcy5ldmVudERhdGEoZW5kKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHNldFRvZGF5KCkge1xuICAgIGNvbnN0IHRtcCA9IG5ldyBEYXRlKCk7XG4gICAgdGhpcy51cGRhdGVWaWV3KHRtcCk7XG4gICAgdGhpcy51cGRhdGVTZWxlY3Rpb24oQXJyYXkub2YodG1wKSk7XG4gIH1cblxuICB0b2dnbGVSYW5nZVNlbGVjdChyYW5nZTogcmFuZ2VTZWxlY3RNb2Rlcyk6IHZvaWQge1xuICAgIHRoaXMucmFuZ2VTZWxlY3RNb2RlID0gcmFuZ2U7XG4gICAgaWYgKHJhbmdlID09PSAnc3RhcnREYXRlJyAmJiB0aGlzLnNlbGVjdGlvbi5sZW5ndGgpIHtcbiAgICAgIHRoaXMudXBkYXRlVmlldyh0aGlzLnNlbGVjdGlvblswXSk7XG4gICAgfVxuICAgIGlmIChyYW5nZSA9PT0gJ2VuZERhdGUnICYmIHRoaXMuc2VsZWN0aW9uLmxlbmd0aCA9PT0gMikge1xuICAgICAgdGhpcy51cGRhdGVWaWV3KHRoaXMuc2VsZWN0aW9uWzFdKTtcbiAgICB9XG4gIH1cblxuICBtb2RlbFRvU2VsZWN0aW9uKG1vZGVsOiBtb2RlbFR5cGVzKSB7XG4gICAgc3dpdGNoICh0aGlzLm1vZGUpIHtcbiAgICAgIGNhc2UgJ211bHRpcGxlJzpcbiAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBtb2RlbCBhcyBEYXRlW107XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmFuZ2UnOlxuICAgICAgY2FzZSAnd2Vlayc6XG4gICAgICAgIHRoaXMuc2V0UmFuZ2VTZWxlY3Rpb24oKTtcbiAgICAgIGNhc2UgJ3NpbmdsZSc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IFttb2RlbCBhcyBEYXRlXTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gVmFsdWVBY2Nlc3NvciBGdW5jdGlvbnNcbiAgd3JpdGVWYWx1ZShtb2RlbDogbW9kZWxUeXBlcyk6IHZvaWQge1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICBpZiAodGhpcy5tb2RlID09PSAnbXVsdGlwbGUnKSB7XG4gICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMubW9kZWwgYXMgRGF0ZVtdO1xuICAgIH1cbiAgICBpZiAodGhpcy5tb2RlID09PSAncmFuZ2UnKSB7XG4gICAgICB0aGlzLnNldFJhbmdlU2VsZWN0aW9uKCk7XG4gICAgfVxuICAgIGlmIChIZWxwZXJzLmlzRGF0ZShtb2RlbCkpIHtcbiAgICAgIHRoaXMudXBkYXRlVmlldyhtb2RlbCk7XG4gICAgICB0aGlzLm1vZGVsVG9TZWxlY3Rpb24obW9kZWwpO1xuICAgIH0gZWxzZSBpZiAoSGVscGVycy5pc1N0cmluZyhtb2RlbCkpIHtcbiAgICAgIGNvbnN0IGRhdGUgPSBwYXJzZShtb2RlbCBhcyBhbnkpO1xuICAgICAgaWYgKGlzVmFsaWQoZGF0ZSkpIHtcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KGRhdGUpO1xuICAgICAgICB0aGlzLm1vZGVsVG9TZWxlY3Rpb24oZGF0ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0UmFuZ2VTZWxlY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMubW9kZWw/Lmhhc093blByb3BlcnR5KCdzdGFydERhdGUnKSkge1xuICAgICAgIC8vIGNvbWluZyBmcm9tIHN0YW5kYWxvbmUgZGF0ZSBwaWNrZXJcbiAgICAgIGNvbnN0IHJhbmdlID0gdGhpcy5tb2RlbCBhcyBSYW5nZU1vZGVsO1xuICAgICAgdGhpcy5zZWxlY3Rpb24gPSBbcmFuZ2Uuc3RhcnREYXRlLCByYW5nZS5lbmREYXRlXS5maWx0ZXIoQm9vbGVhbik7XG4gICAgfSBlbHNlIGlmICh0aGlzLm1vZGVsPy5oYXNPd25Qcm9wZXJ0eSgnbWluJykpIHtcbiAgICAgICAvLyBjb21pbmcgZnJvbSBkYXRhLXRhYmxlIGZpbHRlciB3aGVyZSBtb2RlbCBlbmQgZGF0ZSBpcyB0aGUgYmVnaW5uaW5nIG9mIHRoZSBuZXh0IGRheVxuICAgICAgY29uc3QgcmFuZ2UgPSB0aGlzLm1vZGVsIGFzIERhdGFUYWJsZVJhbmdlTW9kZWw7XG4gICAgICB0aGlzLnNlbGVjdGlvbiA9IFtyYW5nZS5taW4sIHN1YkRheXMocmFuZ2UubWF4LCAxKV0uZmlsdGVyKEJvb2xlYW4pO1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMuX29uVG91Y2hlZCA9IGZuO1xuICB9XG59XG4iXX0=