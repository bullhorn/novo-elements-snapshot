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
import { isDate, isValid, subDays } from 'date-fns';
// APP
import { NovoLabelService } from 'novo-elements/services';
import { BooleanInput, DateUtil, Helpers } from 'novo-elements/utils';
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
        this._selection = value ? value.filter(isDate).map((d) => DateUtil.startOfDay(d)) : [];
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
            const date = DateUtil.parse(model);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2RhdGUtcGlja2VyL0RhdGVQaWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2SSxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELFNBQVM7QUFDVCxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDcEQsTUFBTTtBQUNOLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxZQUFZLEVBQThDLFFBQVEsRUFBRSxPQUFPLEVBQTRDLE1BQU0scUJBQXFCLENBQUM7Ozs7Ozs7QUFFNUosc0RBQXNEO0FBQ3RELE1BQU0sMEJBQTBCLEdBQUc7SUFDakMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixDQUFDO0lBQ3BELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQTBGRixNQUFNLE9BQU8scUJBQXFCO0lBNkloQyxZQUNTLE1BQXdCLEVBQ3ZCLE9BQW1CLEVBQ25CLEdBQXNCLEVBQ3RCLFVBQXdCO1FBSHpCLFdBQU0sR0FB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QkFDNUIsQ0FBQyxDQUNIOzRCQUNELEtBQUssQ0FDSCxTQUFTLEVBQ1QsS0FBSyxDQUFDO2dDQUNKLFNBQVMsRUFBRSxrQkFBa0I7NkJBQzlCLENBQUMsQ0FDSDs0QkFDRCxVQUFVLENBQUMsdUJBQXVCLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO3lCQUM5RCxDQUFDO3FCQUNIO29CQUNELFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0NUO2lCQUNGOzJMQU1DLE9BQU87c0JBRE4sS0FBSztnQkFNTixPQUFPO3NCQUROLEtBQUs7Z0JBTU4sS0FBSztzQkFESixLQUFLO2dCQU1OLEdBQUc7c0JBREYsS0FBSztnQkFPTixNQUFNO3NCQUZMLEtBQUs7Z0JBT04sU0FBUztzQkFEUixLQUFLO2dCQU1OLFdBQVc7c0JBRFYsS0FBSztnQkFRQyxnQkFBZ0I7c0JBSHRCLEtBQUs7O3NCQUVMLFdBQVc7dUJBQUMsMEJBQTBCO2dCQU9oQyxVQUFVO3NCQUZoQixLQUFLO2dCQUtOLG1CQUFtQjtzQkFEbEIsS0FBSztnQkFLTixRQUFRO3NCQURQLE1BQU07Z0JBYUgsY0FBYztzQkFEakIsS0FBSztnQkFhRixJQUFJO3NCQURQLEtBQUs7Z0JBYUYsS0FBSztzQkFEUixLQUFLO2dCQWVGLGVBQWU7c0JBRGxCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IGFuaW1hdGUsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBIb3N0QmluZGluZywgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgaXNEYXRlLCBpc1ZhbGlkLCBzdWJEYXlzIH0gZnJvbSAnZGF0ZS1mbnMnO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIERhdGFUYWJsZVJhbmdlTW9kZWwsIERhdGVQaWNrZXJTZWxlY3RNb2RlcywgRGF0ZVV0aWwsIEhlbHBlcnMsIG1vZGVsVHlwZXMsIFJhbmdlTW9kZWwsIHJhbmdlU2VsZWN0TW9kZXMgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG5jb25zdCBEQVRFX1BJQ0tFUl9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9EYXRlUGlja2VyRWxlbWVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1kYXRlLXBpY2tlcicsXG4gIHByb3ZpZGVyczogW0RBVEVfUElDS0VSX1ZBTFVFX0FDQ0VTU09SXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ3N0YXJ0RGF0ZVRleHRTdGF0ZScsIFtcbiAgICAgIHN0YXRlKFxuICAgICAgICAnc3RhcnREYXRlJyxcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIG9wYWNpdHk6ICcxLjAnLFxuICAgICAgICB9KSxcbiAgICAgICksXG4gICAgICBzdGF0ZShcbiAgICAgICAgJ2VuZERhdGUnLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogJzAuNicsXG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oJ3N0YXJ0RGF0ZSA8PT4gZW5kRGF0ZScsIGFuaW1hdGUoJzIwMG1zIGVhc2UtaW4nKSksXG4gICAgXSksXG4gICAgdHJpZ2dlcignZW5kRGF0ZVRleHRTdGF0ZScsIFtcbiAgICAgIHN0YXRlKFxuICAgICAgICAnc3RhcnREYXRlJyxcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIG9wYWNpdHk6ICcwLjYnLFxuICAgICAgICB9KSxcbiAgICAgICksXG4gICAgICBzdGF0ZShcbiAgICAgICAgJ2VuZERhdGUnLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogJzEuMCcsXG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oJ3N0YXJ0RGF0ZSA8PT4gZW5kRGF0ZScsIGFuaW1hdGUoJzIwMG1zIGVhc2UtaW4nKSksXG4gICAgXSksXG4gICAgdHJpZ2dlcignaW5kaWNhdG9yU3RhdGUnLCBbXG4gICAgICBzdGF0ZShcbiAgICAgICAgJ3N0YXJ0RGF0ZScsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDAlKScsXG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICAgIHN0YXRlKFxuICAgICAgICAnZW5kRGF0ZScsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDEwMCUpJyxcbiAgICAgICAgfSksXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbignc3RhcnREYXRlIDw9PiBlbmREYXRlJywgYW5pbWF0ZSgnMjAwbXMgZWFzZS1pbicpKSxcbiAgICBdKSxcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiZGF0ZS1waWNrZXItY29udGFpbmVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZGF0ZS1yYW5nZS10YWJzXCIgKm5nSWY9XCJyYW5nZVwiIFtjbGFzcy53ZWVrLXNlbGVjdC1tb2RlXT1cIndlZWtSYW5nZVNlbGVjdFwiPlxuICAgICAgICA8c3BhblxuICAgICAgICAgIGNsYXNzPVwicmFuZ2UtdGFiXCJcbiAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlUmFuZ2VTZWxlY3QoJ3N0YXJ0RGF0ZScpXCJcbiAgICAgICAgICBbQHN0YXJ0RGF0ZVRleHRTdGF0ZV09XCJyYW5nZVNlbGVjdE1vZGVcIlxuICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImNhbGVuZGFyLXN0YXJ0LWRhdGVcIlxuICAgICAgICAgID57eyBzdGFydERhdGVMYWJlbCB9fTwvc3BhblxuICAgICAgICA+XG4gICAgICAgIDxzcGFuXG4gICAgICAgICAgY2xhc3M9XCJyYW5nZS10YWJcIlxuICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVSYW5nZVNlbGVjdCgnZW5kRGF0ZScpXCJcbiAgICAgICAgICBbQGVuZERhdGVUZXh0U3RhdGVdPVwicmFuZ2VTZWxlY3RNb2RlXCJcbiAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJjYWxlbmRhci1lbmQtZGF0ZVwiXG4gICAgICAgICAgPnt7IGVuZERhdGVMYWJlbCB9fTwvc3BhblxuICAgICAgICA+XG4gICAgICAgIDxpIGNsYXNzPVwiaW5kaWNhdG9yXCIgW0BpbmRpY2F0b3JTdGF0ZV09XCJyYW5nZVNlbGVjdE1vZGVcIj48L2k+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPG5vdm8tY2FsZW5kYXJcbiAgICAgICAgW2FjdGl2ZURhdGVdPVwiYWN0aXZlRGF0ZVwiXG4gICAgICAgIFsoc2VsZWN0ZWQpXT1cInNlbGVjdGlvblwiXG4gICAgICAgIChzZWxlY3RlZENoYW5nZSk9XCJ1cGRhdGVTZWxlY3Rpb24oJGV2ZW50KVwiXG4gICAgICAgIFttb2RlXT1cIm1vZGVcIlxuICAgICAgICBbbnVtYmVyT2ZNb250aHNdPVwibnVtYmVyT2ZNb250aHNcIlxuICAgICAgICBbd2Vla1N0YXJ0c09uXT1cIndlZWtTdGFydFwiXG4gICAgICAgIFtkaXNhYmxlZERhdGVNZXNzYWdlXT1cImRpc2FibGVkRGF0ZU1lc3NhZ2VcIlxuICAgICAgICBbbWluRGF0ZV09XCJzdGFydFwiXG4gICAgICAgIFttYXhEYXRlXT1cImVuZFwiXG4gICAgICA+PC9ub3ZvLWNhbGVuZGFyPlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItZm9vdGVyXCIgW2hpZGRlbl09XCJoaWRlRm9vdGVyXCI+XG4gICAgICAgIDxub3ZvLWJ1dHRvbiAoY2xpY2spPVwic2V0VG9kYXkoKVwiIGNsYXNzPVwidG9kYXlcIiBzaXplPVwic21hbGxcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJjYWxlbmRhci10b2RheVwiPnt7IGxhYmVscy50b2RheSB9fTwvbm92by1idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RhdGVQaWNrZXJFbGVtZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XG4gIC8qKlxuICAgKiBUaGUgbWluaW11bSB5ZWFyIHRvIGFsbG93IHNlbGVjdGVkIGluIHllYXIgc2VsZWN0IHZpZXdcbiAgICoqL1xuICBASW5wdXQoKVxuICBtaW5ZZWFyOiBzdHJpbmcgfCBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgbWF4aW11bSB5ZWFyIHRvIGFsbG93IHNlbGVjdGVkIGluIHllYXIgc2VsZWN0IHZpZXdcbiAgICoqL1xuICBASW5wdXQoKVxuICBtYXhZZWFyOiBzdHJpbmcgfCBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgbWluaW11bSBkYXRlIHRoYXQgY2FuIGJlIHNlbGVjdGVkLlxuICAgKiovXG4gIEBJbnB1dCgpXG4gIHN0YXJ0OiBEYXRlO1xuICAvKipcbiAgICogVGhlIG1heGltdW0gZGF0ZSB0aGF0IGNhbiBiZSBzZWxlY3RlZC5cbiAgICoqL1xuICBASW5wdXQoKVxuICBlbmQ6IERhdGU7XG4gIC8qKlxuICAgKiAqKkRlcHJlY2F0ZWQqKiBXaGV0aGVyIHRoZSBkYXRlLXBpY2tlciBpcyB1c2VkIG91dHNpZGUgb2YgYW4gb3ZlcmxheS5cbiAgICoqL1xuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgaW5saW5lOiBib29sZWFuO1xuICAvKipcbiAgICogRGF5IG9mIHRoZSB3ZWVrIHRoZSBjYWxlbmRhciBzaG91bGQgZGlzcGxheSBmaXJzdCwgU3VuZGF5PTAuLi5TYXR1cmRheT02XG4gICAqKi9cbiAgQElucHV0KClcbiAgd2Vla1N0YXJ0OiBEYXkgPSAwO1xuICAvKipcbiAgICogQ2VydGFpbiBkYXRlcyB0aGF0IGFyZSBhbHJlYWR5IHNlbGVjdGVkLlxuICAgKiovXG4gIEBJbnB1dCgpXG4gIHByZXNlbGVjdGVkOiBEYXRlW10gPSBbXTtcbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGRheXMgZm9yIHRoZSBwcmV2aW91cyBhbmQgbmV4dCBtb250aCBzaG91bGQgYmUgaGlkZGVuLlxuICAgKiovXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmhpZGUtb3ZlcmZsb3ctZGF5cycpXG4gIHB1YmxpYyBoaWRlT3ZlcmZsb3dEYXlzOiBib29sZWFuID0gZmFsc2U7XG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBmb290ZXIgd2hpY2ggY29udGFpbnMgYHRvZGF5YCBidXR0b24gc2hvdWxkIGJlIGhpZGRlbi5cbiAgICoqL1xuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgcHVibGljIGhpZGVGb290ZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBkaXNhYmxlZERhdGVNZXNzYWdlOiBzdHJpbmc7XG5cbiAgLy8gU2VsZWN0IGNhbGxiYWNrIGZvciBvdXRwdXRcbiAgQE91dHB1dCgpXG4gIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoZmFsc2UpO1xuXG4gIF9tb2RlOiBEYXRlUGlja2VyU2VsZWN0TW9kZXMgPSAnc2luZ2xlJztcbiAgX3JhbmdlOiBib29sZWFuO1xuICBfd2Vla1JhbmdlU2VsZWN0OiBib29sZWFuO1xuICBfbnVtYmVyT2ZNb250aHM6IG51bWJlcltdID0gWzBdO1xuXG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgbW9udGhzIHRvIGRpc3BsYXkgYXQgb25jZS5cbiAgICogQGRlZmF1bHQgMVxuICAgKiovXG4gIEBJbnB1dCgpXG4gIGdldCBudW1iZXJPZk1vbnRocygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9udW1iZXJPZk1vbnRocy5sZW5ndGg7XG4gIH1cbiAgc2V0IG51bWJlck9mTW9udGhzKHZhbHVlKSB7XG4gICAgdGhpcy5fbnVtYmVyT2ZNb250aHMgPSBBcnJheS5mcm9tKEFycmF5KE51bWJlcih2YWx1ZSkpLmtleXMoKSk7XG4gIH1cblxuICAvKipcbiAgICogSG93IHRoZSBkYXRlIHNlbGVjdGlvbiBzaG91bGQgd29yay5cbiAgICogQGRlZmF1bHQgc2luZ2xlXG4gICAqKi9cbiAgQElucHV0KClcbiAgZ2V0IG1vZGUoKTogRGF0ZVBpY2tlclNlbGVjdE1vZGVzIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZTtcbiAgfVxuICBzZXQgbW9kZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLl9tb2RlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fbW9kZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogKipkZXByZWNhdGVkKiogcGxlYXNlIHVzZSBgbW9kZT1cInJhbmdlXCJgLlxuICAgKiovXG4gIEBJbnB1dCgpXG4gIGdldCByYW5nZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gWydyYW5nZScsICd3ZWVrJ10uaW5jbHVkZXModGhpcy5tb2RlKSB8fCB0aGlzLl9yYW5nZTtcbiAgfVxuICBzZXQgcmFuZ2UodmFsdWUpIHtcbiAgICBjb25zb2xlLndhcm4oYCdyYW5nZScgcHJvcGVydHkgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSAnbW9kZT1cInJhbmdlXCInLmApO1xuICAgIGlmICh0aGlzLl9yYW5nZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX3JhbmdlID0gdmFsdWU7XG4gICAgICB0aGlzLm1vZGUgPSAncmFuZ2UnO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogKipkZXByZWNhdGVkKiogcGxlYXNlIHVzZSBgbW9kZT1cIndlZWtcImAuXG4gICAqKi9cbiAgQElucHV0KClcbiAgZ2V0IHdlZWtSYW5nZVNlbGVjdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZSA9PT0gJ3dlZWsnIHx8IHRoaXMuX3dlZWtSYW5nZVNlbGVjdDtcbiAgfVxuICBzZXQgd2Vla1JhbmdlU2VsZWN0KHZhbHVlKSB7XG4gICAgY29uc29sZS53YXJuKGAnd2Vla1JhbmdlU2VsZWN0JyBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlICdtb2RlPVwid2Vla1wiJy5gKTtcbiAgICBpZiAodGhpcy5fd2Vla1JhbmdlU2VsZWN0ICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fd2Vla1JhbmdlU2VsZWN0ID0gdmFsdWU7XG4gICAgICB0aGlzLm1vZGUgPSAnd2Vlayc7XG4gICAgfVxuICB9XG5cbiAgLy8gQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aCcpXG4gIC8vIGdldCBoYl93aWR0aCgpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5fc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShgJHt0aGlzLm51bWJlck9mTW9udGhzICogMjI4fXB4YCk7XG4gIC8vIH1cblxuICBtb2RlbDogbW9kZWxUeXBlcztcbiAgYWN0aXZlRGF0ZTogRGF0ZTtcblxuICBfc2VsZWN0aW9uOiBEYXRlW10gPSBbXTtcbiAgcHJldmlldzogRGF0ZVtdID0gW107XG4gIHN0YXJ0RGF0ZUxhYmVsOiBzdHJpbmc7XG4gIGVuZERhdGVMYWJlbDogc3RyaW5nO1xuXG4gIHJhbmdlU2VsZWN0TW9kZTogcmFuZ2VTZWxlY3RNb2RlcyA9ICdzdGFydERhdGUnO1xuICBfb25DaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gIF9vblRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgZ2V0IHNlbGVjdGlvbigpOiBEYXRlW10ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3Rpb247XG4gIH1cbiAgc2V0IHNlbGVjdGlvbih2YWx1ZSkge1xuICAgIHRoaXMuX3NlbGVjdGlvbiA9IHZhbHVlID8gdmFsdWUuZmlsdGVyKGlzRGF0ZSkubWFwKChkKSA9PiBEYXRlVXRpbC5zdGFydE9mRGF5KGQpKSA6IFtdO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSxcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgX3Nhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gRGV0ZXJtaW5lIHRoZSB5ZWFyIGFycmF5XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAvLyBTZXQgbGFiZWxzXG4gICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgIHRoaXMubW9kZWxUb1NlbGVjdGlvbih0aGlzLm1vZGVsKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2VsZWN0aW9uICYmIHRoaXMuc2VsZWN0aW9uLmxlbmd0aCkge1xuICAgICAgdGhpcy51cGRhdGVWaWV3KHRoaXMuc2VsZWN0aW9uWzBdKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVWaWV3KGRhdGUpIHtcbiAgICBjb25zdCB2YWx1ZTogYW55ID0gZGF0ZSA/IG5ldyBEYXRlKGRhdGUpIDogbmV3IERhdGUoKTtcbiAgICB0aGlzLmFjdGl2ZURhdGUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gIH1cblxuICB1cGRhdGVTZWxlY3Rpb24oc2VsZWN0ZWQ6IERhdGVbXSwgZmlyZUV2ZW50cyA9IHRydWUpIHtcbiAgICAvLyBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgdGhpcy5zZWxlY3Rpb24gPSBzZWxlY3RlZDtcblxuICAgIHRoaXMuc3RhcnREYXRlTGFiZWwgPSB0aGlzLmxhYmVscy5mb3JtYXREYXRlV2l0aEZvcm1hdCh0aGlzLnNlbGVjdGlvblswXSwge1xuICAgICAgbW9udGg6ICdzaG9ydCcsXG4gICAgICBkYXk6ICcyLWRpZ2l0JyxcbiAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICB9KTtcblxuICAgIHRoaXMuZW5kRGF0ZUxhYmVsID0gdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQodGhpcy5zZWxlY3Rpb25bMV0sIHtcbiAgICAgIG1vbnRoOiAnc2hvcnQnLFxuICAgICAgZGF5OiAnMi1kaWdpdCcsXG4gICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgfSk7XG5cbiAgICBpZiAoZmlyZUV2ZW50cykge1xuICAgICAgc3dpdGNoICh0aGlzLm1vZGUpIHtcbiAgICAgICAgY2FzZSAnbXVsdGlwbGUnOlxuICAgICAgICAgIHRoaXMuZmlyZVNlbGVjdCgpO1xuICAgICAgICAgIC8vIEFsc28sIHVwZGF0ZSB0aGUgbmdNb2RlbFxuICAgICAgICAgIHRoaXMuX29uQ2hhbmdlKHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICB0aGlzLm1vZGVsID0gdGhpcy5zZWxlY3Rpb247XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3JhbmdlJzpcbiAgICAgICAgY2FzZSAnd2Vlayc6XG4gICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uLmZpbHRlcihCb29sZWFuKS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHRoaXMuZmlyZVJhbmdlU2VsZWN0KCk7XG4gICAgICAgICAgICAvLyBBbHNvLCB1cGRhdGUgdGhlIG5nTW9kZWxcbiAgICAgICAgICAgIGNvbnN0IG1vZGVsID0ge1xuICAgICAgICAgICAgICBzdGFydERhdGU6IHRoaXMuc2VsZWN0aW9uWzBdLFxuICAgICAgICAgICAgICBlbmREYXRlOiB0aGlzLnNlbGVjdGlvblsxXSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLl9vbkNoYW5nZShtb2RlbCk7XG4gICAgICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdzaW5nbGUnOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRoaXMuZmlyZVNlbGVjdCgpO1xuICAgICAgICAgIC8vIEFsc28sIHVwZGF0ZSB0aGUgbmdNb2RlbFxuICAgICAgICAgIHRoaXMuX29uQ2hhbmdlKHRoaXMuc2VsZWN0aW9uWzBdKTtcbiAgICAgICAgICB0aGlzLm1vZGVsID0gdGhpcy5zZWxlY3Rpb25bMF07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBldmVudERhdGEoZGF0ZTogRGF0ZSkge1xuICAgIHJldHVybiB7XG4gICAgICB5ZWFyOiBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICBtb250aDogdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQoZGF0ZSwgeyBtb250aDogJ2xvbmcnIH0pLFxuICAgICAgZGF5OiB0aGlzLmxhYmVscy5mb3JtYXREYXRlV2l0aEZvcm1hdChkYXRlLCB7IHdlZWtkYXk6ICdsb25nJyB9KSxcbiAgICAgIGRhdGUsXG4gICAgfTtcbiAgfVxuXG4gIGZpcmVTZWxlY3QoKSB7XG4gICAgaWYgKHRoaXMubW9kZSA9PT0gJ211bHRpcGxlJykge1xuICAgICAgdGhpcy5vblNlbGVjdC5uZXh0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vblNlbGVjdC5uZXh0KHRoaXMuZXZlbnREYXRhKHRoaXMuc2VsZWN0aW9uWzBdKSk7XG4gICAgfVxuICB9XG5cbiAgZmlyZVJhbmdlU2VsZWN0KCkge1xuICAgIC8vIE1ha2Ugc3VyZSB0aGUgc3RhcnQgZGF0ZSBpcyBiZWZvcmUgdGhlIGVuZCBkYXRlXG4gICAgaWYgKHRoaXMuc2VsZWN0aW9uLmZpbHRlcihCb29sZWFuKS5sZW5ndGggPT09IDIpIHtcbiAgICAgIGNvbnN0IFtzdGFydCwgZW5kXSA9IHRoaXMuc2VsZWN0aW9uO1xuICAgICAgdGhpcy5vblNlbGVjdC5uZXh0KHtcbiAgICAgICAgc3RhcnREYXRlOiB0aGlzLmV2ZW50RGF0YShzdGFydCksXG4gICAgICAgIGVuZERhdGU6IHRoaXMuZXZlbnREYXRhKGVuZCksXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzZXRUb2RheSgpIHtcbiAgICBjb25zdCB0bXAgPSBuZXcgRGF0ZSgpO1xuICAgIHRoaXMudXBkYXRlVmlldyh0bXApO1xuICAgIHRoaXMudXBkYXRlU2VsZWN0aW9uKEFycmF5Lm9mKHRtcCkpO1xuICB9XG5cbiAgdG9nZ2xlUmFuZ2VTZWxlY3QocmFuZ2U6IHJhbmdlU2VsZWN0TW9kZXMpOiB2b2lkIHtcbiAgICB0aGlzLnJhbmdlU2VsZWN0TW9kZSA9IHJhbmdlO1xuICAgIGlmIChyYW5nZSA9PT0gJ3N0YXJ0RGF0ZScgJiYgdGhpcy5zZWxlY3Rpb24ubGVuZ3RoKSB7XG4gICAgICB0aGlzLnVwZGF0ZVZpZXcodGhpcy5zZWxlY3Rpb25bMF0pO1xuICAgIH1cbiAgICBpZiAocmFuZ2UgPT09ICdlbmREYXRlJyAmJiB0aGlzLnNlbGVjdGlvbi5sZW5ndGggPT09IDIpIHtcbiAgICAgIHRoaXMudXBkYXRlVmlldyh0aGlzLnNlbGVjdGlvblsxXSk7XG4gICAgfVxuICB9XG5cbiAgbW9kZWxUb1NlbGVjdGlvbihtb2RlbDogbW9kZWxUeXBlcykge1xuICAgIHN3aXRjaCAodGhpcy5tb2RlKSB7XG4gICAgICBjYXNlICdtdWx0aXBsZSc6XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uID0gbW9kZWwgYXMgRGF0ZVtdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JhbmdlJzpcbiAgICAgIGNhc2UgJ3dlZWsnOlxuICAgICAgICB0aGlzLnNldFJhbmdlU2VsZWN0aW9uKCk7XG4gICAgICBjYXNlICdzaW5nbGUnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBbbW9kZWwgYXMgRGF0ZV07XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vIFZhbHVlQWNjZXNzb3IgRnVuY3Rpb25zXG4gIHdyaXRlVmFsdWUobW9kZWw6IG1vZGVsVHlwZXMpOiB2b2lkIHtcbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgaWYgKHRoaXMubW9kZSA9PT0gJ211bHRpcGxlJykge1xuICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLm1vZGVsIGFzIERhdGVbXTtcbiAgICB9XG4gICAgaWYgKHRoaXMubW9kZSA9PT0gJ3JhbmdlJykge1xuICAgICAgdGhpcy5zZXRSYW5nZVNlbGVjdGlvbigpO1xuICAgIH1cbiAgICBpZiAoSGVscGVycy5pc0RhdGUobW9kZWwpKSB7XG4gICAgICB0aGlzLnVwZGF0ZVZpZXcobW9kZWwpO1xuICAgICAgdGhpcy5tb2RlbFRvU2VsZWN0aW9uKG1vZGVsKTtcbiAgICB9IGVsc2UgaWYgKEhlbHBlcnMuaXNTdHJpbmcobW9kZWwpKSB7XG4gICAgICBjb25zdCBkYXRlID0gRGF0ZVV0aWwucGFyc2UobW9kZWwgYXMgYW55KTtcbiAgICAgIGlmIChpc1ZhbGlkKGRhdGUpKSB7XG4gICAgICAgIHRoaXMudXBkYXRlVmlldyhkYXRlKTtcbiAgICAgICAgdGhpcy5tb2RlbFRvU2VsZWN0aW9uKGRhdGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldFJhbmdlU2VsZWN0aW9uKCkge1xuICAgIGlmICh0aGlzLm1vZGVsPy5oYXNPd25Qcm9wZXJ0eSgnc3RhcnREYXRlJykpIHtcbiAgICAgICAvLyBjb21pbmcgZnJvbSBzdGFuZGFsb25lIGRhdGUgcGlja2VyXG4gICAgICBjb25zdCByYW5nZSA9IHRoaXMubW9kZWwgYXMgUmFuZ2VNb2RlbDtcbiAgICAgIHRoaXMuc2VsZWN0aW9uID0gW3JhbmdlLnN0YXJ0RGF0ZSwgcmFuZ2UuZW5kRGF0ZV0uZmlsdGVyKEJvb2xlYW4pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlbD8uaGFzT3duUHJvcGVydHkoJ21pbicpKSB7XG4gICAgICAgLy8gY29taW5nIGZyb20gZGF0YS10YWJsZSBmaWx0ZXIgd2hlcmUgbW9kZWwgZW5kIGRhdGUgaXMgdGhlIGJlZ2lubmluZyBvZiB0aGUgbmV4dCBkYXlcbiAgICAgIGNvbnN0IHJhbmdlID0gdGhpcy5tb2RlbCBhcyBEYXRhVGFibGVSYW5nZU1vZGVsO1xuICAgICAgdGhpcy5zZWxlY3Rpb24gPSBbcmFuZ2UubWluLCBzdWJEYXlzKHJhbmdlLm1heCwgMSldLmZpbHRlcihCb29sZWFuKTtcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMuX29uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgfVxufVxuIl19