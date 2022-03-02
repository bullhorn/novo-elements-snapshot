import { __decorate, __metadata } from "tslib";
// NG2
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, HostBinding, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
// Vendor
import { isDate, isValid, parse, startOfDay } from 'date-fns';
import { NovoLabelService } from '../../services/novo-label-service';
import { BooleanInput } from '../../utils';
// APP
import { Helpers } from '../../utils/Helpers';
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
        // this.selection = this._strategy.selectionFinished();
        switch (this.mode) {
            case 'multiple':
                this.selection = model;
                break;
            case 'range':
            case 'week':
                const range = this.model;
                this.selection = [range.startDate, range.endDate].filter(Boolean);
                break;
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
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
}
NovoDatePickerElement.decorators = [
    { type: Component, args: [{
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
  `
            },] }
];
NovoDatePickerElement.ctorParameters = () => [
    { type: NovoLabelService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: DomSanitizer }
];
NovoDatePickerElement.propDecorators = {
    minYear: [{ type: Input }],
    maxYear: [{ type: Input }],
    start: [{ type: Input }],
    end: [{ type: Input }],
    inline: [{ type: Input }],
    weekStart: [{ type: Input }],
    preselected: [{ type: Input }],
    hideOverflowDays: [{ type: Input }, { type: HostBinding, args: ['class.hide-overflow-days',] }],
    hideFooter: [{ type: Input }],
    disabledDateMessage: [{ type: Input }],
    onSelect: [{ type: Output }],
    numberOfMonths: [{ type: Input }],
    mode: [{ type: Input }],
    range: [{ type: Input }],
    weekRangeSelect: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9kYXRlLXBpY2tlci9EYXRlUGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZJLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsU0FBUztBQUNULE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDOUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMzQyxNQUFNO0FBQ04sT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRzlDLHNEQUFzRDtBQUN0RCxNQUFNLDBCQUEwQixHQUFHO0lBQ2pDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztJQUNwRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUEwRkYsTUFBTSxPQUFPLHFCQUFxQjtJQTZJaEMsWUFDUyxNQUF3QixFQUN2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QVlOLEtBQUs7bUJBWUwsS0FBSztvQkFZTCxLQUFLOzhCQWNMLEtBQUs7O0FBL0VOO0lBREMsWUFBWSxFQUFFOztxREFDQztBQWlCaEI7SUFGQyxZQUFZLEVBQUU7OytEQUUwQjtBQU16QztJQURDLFlBQVksRUFBRTs7eURBQ29CIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBhbmltYXRlLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG4vLyBWZW5kb3JcbmltcG9ydCB7IGlzRGF0ZSwgaXNWYWxpZCwgcGFyc2UsIHN0YXJ0T2ZEYXkgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJy4uLy4uL3V0aWxzJztcbi8vIEFQUFxuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xuaW1wb3J0IHsgRGF0ZVBpY2tlclNlbGVjdE1vZGVzLCBtb2RlbFR5cGVzLCBSYW5nZU1vZGVsLCByYW5nZVNlbGVjdE1vZGVzIH0gZnJvbSAnLi9kYXRlLXBpY2tlci50eXBlcyc7XG5cbi8vIFZhbHVlIGFjY2Vzc29yIGZvciB0aGUgY29tcG9uZW50IChzdXBwb3J0cyBuZ01vZGVsKVxuY29uc3QgREFURV9QSUNLRVJfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvRGF0ZVBpY2tlckVsZW1lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tZGF0ZS1waWNrZXInLFxuICBwcm92aWRlcnM6IFtEQVRFX1BJQ0tFUl9WQUxVRV9BQ0NFU1NPUl0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdzdGFydERhdGVUZXh0U3RhdGUnLCBbXG4gICAgICBzdGF0ZShcbiAgICAgICAgJ3N0YXJ0RGF0ZScsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5OiAnMS4wJyxcbiAgICAgICAgfSksXG4gICAgICApLFxuICAgICAgc3RhdGUoXG4gICAgICAgICdlbmREYXRlJyxcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIG9wYWNpdHk6ICcwLjYnLFxuICAgICAgICB9KSxcbiAgICAgICksXG4gICAgICB0cmFuc2l0aW9uKCdzdGFydERhdGUgPD0+IGVuZERhdGUnLCBhbmltYXRlKCcyMDBtcyBlYXNlLWluJykpLFxuICAgIF0pLFxuICAgIHRyaWdnZXIoJ2VuZERhdGVUZXh0U3RhdGUnLCBbXG4gICAgICBzdGF0ZShcbiAgICAgICAgJ3N0YXJ0RGF0ZScsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5OiAnMC42JyxcbiAgICAgICAgfSksXG4gICAgICApLFxuICAgICAgc3RhdGUoXG4gICAgICAgICdlbmREYXRlJyxcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIG9wYWNpdHk6ICcxLjAnLFxuICAgICAgICB9KSxcbiAgICAgICksXG4gICAgICB0cmFuc2l0aW9uKCdzdGFydERhdGUgPD0+IGVuZERhdGUnLCBhbmltYXRlKCcyMDBtcyBlYXNlLWluJykpLFxuICAgIF0pLFxuICAgIHRyaWdnZXIoJ2luZGljYXRvclN0YXRlJywgW1xuICAgICAgc3RhdGUoXG4gICAgICAgICdzdGFydERhdGUnLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwJSknLFxuICAgICAgICB9KSxcbiAgICAgICksXG4gICAgICBzdGF0ZShcbiAgICAgICAgJ2VuZERhdGUnLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgxMDAlKScsXG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oJ3N0YXJ0RGF0ZSA8PT4gZW5kRGF0ZScsIGFuaW1hdGUoJzIwMG1zIGVhc2UtaW4nKSksXG4gICAgXSksXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImRhdGUtcGlja2VyLWNvbnRhaW5lclwiPlxuICAgICAgPGRpdiBjbGFzcz1cImRhdGUtcmFuZ2UtdGFic1wiICpuZ0lmPVwicmFuZ2VcIiBbY2xhc3Mud2Vlay1zZWxlY3QtbW9kZV09XCJ3ZWVrUmFuZ2VTZWxlY3RcIj5cbiAgICAgICAgPHNwYW5cbiAgICAgICAgICBjbGFzcz1cInJhbmdlLXRhYlwiXG4gICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZVJhbmdlU2VsZWN0KCdzdGFydERhdGUnKVwiXG4gICAgICAgICAgW0BzdGFydERhdGVUZXh0U3RhdGVdPVwicmFuZ2VTZWxlY3RNb2RlXCJcbiAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJjYWxlbmRhci1zdGFydC1kYXRlXCJcbiAgICAgICAgICA+e3sgc3RhcnREYXRlTGFiZWwgfX08L3NwYW5cbiAgICAgICAgPlxuICAgICAgICA8c3BhblxuICAgICAgICAgIGNsYXNzPVwicmFuZ2UtdGFiXCJcbiAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlUmFuZ2VTZWxlY3QoJ2VuZERhdGUnKVwiXG4gICAgICAgICAgW0BlbmREYXRlVGV4dFN0YXRlXT1cInJhbmdlU2VsZWN0TW9kZVwiXG4gICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwiY2FsZW5kYXItZW5kLWRhdGVcIlxuICAgICAgICAgID57eyBlbmREYXRlTGFiZWwgfX08L3NwYW5cbiAgICAgICAgPlxuICAgICAgICA8aSBjbGFzcz1cImluZGljYXRvclwiIFtAaW5kaWNhdG9yU3RhdGVdPVwicmFuZ2VTZWxlY3RNb2RlXCI+PC9pPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxub3ZvLWNhbGVuZGFyXG4gICAgICAgIFthY3RpdmVEYXRlXT1cImFjdGl2ZURhdGVcIlxuICAgICAgICBbKHNlbGVjdGVkKV09XCJzZWxlY3Rpb25cIlxuICAgICAgICAoc2VsZWN0ZWRDaGFuZ2UpPVwidXBkYXRlU2VsZWN0aW9uKCRldmVudClcIlxuICAgICAgICBbbW9kZV09XCJtb2RlXCJcbiAgICAgICAgW251bWJlck9mTW9udGhzXT1cIm51bWJlck9mTW9udGhzXCJcbiAgICAgICAgW3dlZWtTdGFydHNPbl09XCJ3ZWVrU3RhcnRcIlxuICAgICAgICBbZGlzYWJsZWREYXRlTWVzc2FnZV09XCJkaXNhYmxlZERhdGVNZXNzYWdlXCJcbiAgICAgICAgW21pbkRhdGVdPVwic3RhcnRcIlxuICAgICAgICBbbWF4RGF0ZV09XCJlbmRcIlxuICAgICAgPjwvbm92by1jYWxlbmRhcj5cblxuICAgICAgPGRpdiBjbGFzcz1cImNhbGVuZGFyLWZvb3RlclwiIFtoaWRkZW5dPVwiaGlkZUZvb3RlclwiPlxuICAgICAgICA8bm92by1idXR0b24gKGNsaWNrKT1cInNldFRvZGF5KClcIiBjbGFzcz1cInRvZGF5XCIgc2l6ZT1cInNtYWxsXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwiY2FsZW5kYXItdG9kYXlcIj57eyBsYWJlbHMudG9kYXkgfX08L25vdm8tYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRlUGlja2VyRWxlbWVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQge1xuICAvKipcbiAgICogVGhlIG1pbmltdW0geWVhciB0byBhbGxvdyBzZWxlY3RlZCBpbiB5ZWFyIHNlbGVjdCB2aWV3XG4gICAqKi9cbiAgQElucHV0KClcbiAgbWluWWVhcjogc3RyaW5nIHwgbnVtYmVyO1xuICAvKipcbiAgICogVGhlIG1heGltdW0geWVhciB0byBhbGxvdyBzZWxlY3RlZCBpbiB5ZWFyIHNlbGVjdCB2aWV3XG4gICAqKi9cbiAgQElucHV0KClcbiAgbWF4WWVhcjogc3RyaW5nIHwgbnVtYmVyO1xuICAvKipcbiAgICogVGhlIG1pbmltdW0gZGF0ZSB0aGF0IGNhbiBiZSBzZWxlY3RlZC5cbiAgICoqL1xuICBASW5wdXQoKVxuICBzdGFydDogRGF0ZTtcbiAgLyoqXG4gICAqIFRoZSBtYXhpbXVtIGRhdGUgdGhhdCBjYW4gYmUgc2VsZWN0ZWQuXG4gICAqKi9cbiAgQElucHV0KClcbiAgZW5kOiBEYXRlO1xuICAvKipcbiAgICogKipEZXByZWNhdGVkKiogV2hldGhlciB0aGUgZGF0ZS1waWNrZXIgaXMgdXNlZCBvdXRzaWRlIG9mIGFuIG92ZXJsYXkuXG4gICAqKi9cbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGlubGluZTogYm9vbGVhbjtcbiAgLyoqXG4gICAqIERheSBvZiB0aGUgd2VlayB0aGUgY2FsZW5kYXIgc2hvdWxkIGRpc3BsYXkgZmlyc3QsIFN1bmRheT0wLi4uU2F0dXJkYXk9NlxuICAgKiovXG4gIEBJbnB1dCgpXG4gIHdlZWtTdGFydDogbnVtYmVyID0gMDtcbiAgLyoqXG4gICAqIENlcnRhaW4gZGF0ZXMgdGhhdCBhcmUgYWxyZWFkeSBzZWxlY3RlZC5cbiAgICoqL1xuICBASW5wdXQoKVxuICBwcmVzZWxlY3RlZDogRGF0ZVtdID0gW107XG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBkYXlzIGZvciB0aGUgcHJldmlvdXMgYW5kIG5leHQgbW9udGggc2hvdWxkIGJlIGhpZGRlbi5cbiAgICoqL1xuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5oaWRlLW92ZXJmbG93LWRheXMnKVxuICBwdWJsaWMgaGlkZU92ZXJmbG93RGF5czogYm9vbGVhbiA9IGZhbHNlO1xuICAvKipcbiAgICogV2hldGhlciB0aGUgZm9vdGVyIHdoaWNoIGNvbnRhaW5zIGB0b2RheWAgYnV0dG9uIHNob3VsZCBiZSBoaWRkZW4uXG4gICAqKi9cbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIHB1YmxpYyBoaWRlRm9vdGVyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgZGlzYWJsZWREYXRlTWVzc2FnZTogc3RyaW5nO1xuXG4gIC8vIFNlbGVjdCBjYWxsYmFjayBmb3Igb3V0cHV0XG4gIEBPdXRwdXQoKVxuICBvblNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcblxuICBfbW9kZTogRGF0ZVBpY2tlclNlbGVjdE1vZGVzID0gJ3NpbmdsZSc7XG4gIF9yYW5nZTogYm9vbGVhbjtcbiAgX3dlZWtSYW5nZVNlbGVjdDogYm9vbGVhbjtcbiAgX251bWJlck9mTW9udGhzOiBudW1iZXJbXSA9IFswXTtcblxuICAvKipcbiAgICogTnVtYmVyIG9mIG1vbnRocyB0byBkaXNwbGF5IGF0IG9uY2UuXG4gICAqIEBkZWZhdWx0IDFcbiAgICoqL1xuICBASW5wdXQoKVxuICBnZXQgbnVtYmVyT2ZNb250aHMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbnVtYmVyT2ZNb250aHMubGVuZ3RoO1xuICB9XG4gIHNldCBudW1iZXJPZk1vbnRocyh2YWx1ZSkge1xuICAgIHRoaXMuX251bWJlck9mTW9udGhzID0gQXJyYXkuZnJvbShBcnJheShOdW1iZXIodmFsdWUpKS5rZXlzKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhvdyB0aGUgZGF0ZSBzZWxlY3Rpb24gc2hvdWxkIHdvcmsuXG4gICAqIEBkZWZhdWx0IHNpbmdsZVxuICAgKiovXG4gIEBJbnB1dCgpXG4gIGdldCBtb2RlKCk6IERhdGVQaWNrZXJTZWxlY3RNb2RlcyB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGU7XG4gIH1cbiAgc2V0IG1vZGUodmFsdWUpIHtcbiAgICBpZiAodGhpcy5fbW9kZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX21vZGUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqICoqZGVwcmVjYXRlZCoqIHBsZWFzZSB1c2UgYG1vZGU9XCJyYW5nZVwiYC5cbiAgICoqL1xuICBASW5wdXQoKVxuICBnZXQgcmFuZ2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIFsncmFuZ2UnLCAnd2VlayddLmluY2x1ZGVzKHRoaXMubW9kZSkgfHwgdGhpcy5fcmFuZ2U7XG4gIH1cbiAgc2V0IHJhbmdlKHZhbHVlKSB7XG4gICAgY29uc29sZS53YXJuKGAncmFuZ2UnIHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgJ21vZGU9XCJyYW5nZVwiJy5gKTtcbiAgICBpZiAodGhpcy5fcmFuZ2UgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9yYW5nZSA9IHZhbHVlO1xuICAgICAgdGhpcy5tb2RlID0gJ3JhbmdlJztcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqICoqZGVwcmVjYXRlZCoqIHBsZWFzZSB1c2UgYG1vZGU9XCJ3ZWVrXCJgLlxuICAgKiovXG4gIEBJbnB1dCgpXG4gIGdldCB3ZWVrUmFuZ2VTZWxlY3QoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGUgPT09ICd3ZWVrJyB8fCB0aGlzLl93ZWVrUmFuZ2VTZWxlY3Q7XG4gIH1cbiAgc2V0IHdlZWtSYW5nZVNlbGVjdCh2YWx1ZSkge1xuICAgIGNvbnNvbGUud2FybihgJ3dlZWtSYW5nZVNlbGVjdCcgcHJvcGVydHkgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSAnbW9kZT1cIndlZWtcIicuYCk7XG4gICAgaWYgKHRoaXMuX3dlZWtSYW5nZVNlbGVjdCAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX3dlZWtSYW5nZVNlbGVjdCA9IHZhbHVlO1xuICAgICAgdGhpcy5tb2RlID0gJ3dlZWsnO1xuICAgIH1cbiAgfVxuXG4gIC8vIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgnKVxuICAvLyBnZXQgaGJfd2lkdGgoKSB7XG4gIC8vICAgcmV0dXJuIHRoaXMuX3Nhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoYCR7dGhpcy5udW1iZXJPZk1vbnRocyAqIDIyOH1weGApO1xuICAvLyB9XG5cbiAgbW9kZWw6IG1vZGVsVHlwZXM7XG4gIGFjdGl2ZURhdGU6IERhdGU7XG5cbiAgX3NlbGVjdGlvbjogRGF0ZVtdID0gW107XG4gIHByZXZpZXc6IERhdGVbXSA9IFtdO1xuICBzdGFydERhdGVMYWJlbDogc3RyaW5nO1xuICBlbmREYXRlTGFiZWw6IHN0cmluZztcblxuICByYW5nZVNlbGVjdE1vZGU6IHJhbmdlU2VsZWN0TW9kZXMgPSAnc3RhcnREYXRlJztcbiAgX29uQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICBfb25Ub3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gIGdldCBzZWxlY3Rpb24oKTogRGF0ZVtdIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uO1xuICB9XG4gIHNldCBzZWxlY3Rpb24odmFsdWUpIHtcbiAgICB0aGlzLl9zZWxlY3Rpb24gPSB2YWx1ZSA/IHZhbHVlLmZpbHRlcihpc0RhdGUpLm1hcCgoZCkgPT4gc3RhcnRPZkRheShkKSkgOiBbXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIF9zYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIERldGVybWluZSB0aGUgeWVhciBhcnJheVxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgLy8gU2V0IGxhYmVsc1xuICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICB0aGlzLm1vZGVsVG9TZWxlY3Rpb24odGhpcy5tb2RlbCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNlbGVjdGlvbiAmJiB0aGlzLnNlbGVjdGlvbi5sZW5ndGgpIHtcbiAgICAgIHRoaXMudXBkYXRlVmlldyh0aGlzLnNlbGVjdGlvblswXSk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlVmlldyhkYXRlKSB7XG4gICAgY29uc3QgdmFsdWU6IGFueSA9IGRhdGUgPyBuZXcgRGF0ZShkYXRlKSA6IG5ldyBEYXRlKCk7XG4gICAgdGhpcy5hY3RpdmVEYXRlID0gbmV3IERhdGUodmFsdWUpO1xuICB9XG5cbiAgdXBkYXRlU2VsZWN0aW9uKHNlbGVjdGVkOiBEYXRlW10sIGZpcmVFdmVudHMgPSB0cnVlKSB7XG4gICAgLy8gSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIHRoaXMuc2VsZWN0aW9uID0gc2VsZWN0ZWQ7XG5cbiAgICB0aGlzLnN0YXJ0RGF0ZUxhYmVsID0gdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQodGhpcy5zZWxlY3Rpb25bMF0sIHtcbiAgICAgIG1vbnRoOiAnc2hvcnQnLFxuICAgICAgZGF5OiAnMi1kaWdpdCcsXG4gICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgfSk7XG5cbiAgICB0aGlzLmVuZERhdGVMYWJlbCA9IHRoaXMubGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KHRoaXMuc2VsZWN0aW9uWzFdLCB7XG4gICAgICBtb250aDogJ3Nob3J0JyxcbiAgICAgIGRheTogJzItZGlnaXQnLFxuICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgIH0pO1xuXG4gICAgaWYgKGZpcmVFdmVudHMpIHtcbiAgICAgIHN3aXRjaCAodGhpcy5tb2RlKSB7XG4gICAgICAgIGNhc2UgJ211bHRpcGxlJzpcbiAgICAgICAgICB0aGlzLmZpcmVTZWxlY3QoKTtcbiAgICAgICAgICAvLyBBbHNvLCB1cGRhdGUgdGhlIG5nTW9kZWxcbiAgICAgICAgICB0aGlzLl9vbkNoYW5nZSh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgICAgdGhpcy5tb2RlbCA9IHRoaXMuc2VsZWN0aW9uO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdyYW5nZSc6XG4gICAgICAgIGNhc2UgJ3dlZWsnOlxuICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbi5maWx0ZXIoQm9vbGVhbikubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICB0aGlzLmZpcmVSYW5nZVNlbGVjdCgpO1xuICAgICAgICAgICAgLy8gQWxzbywgdXBkYXRlIHRoZSBuZ01vZGVsXG4gICAgICAgICAgICBjb25zdCBtb2RlbCA9IHtcbiAgICAgICAgICAgICAgc3RhcnREYXRlOiB0aGlzLnNlbGVjdGlvblswXSxcbiAgICAgICAgICAgICAgZW5kRGF0ZTogdGhpcy5zZWxlY3Rpb25bMV0sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2UobW9kZWwpO1xuICAgICAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnc2luZ2xlJzpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aGlzLmZpcmVTZWxlY3QoKTtcbiAgICAgICAgICAvLyBBbHNvLCB1cGRhdGUgdGhlIG5nTW9kZWxcbiAgICAgICAgICB0aGlzLl9vbkNoYW5nZSh0aGlzLnNlbGVjdGlvblswXSk7XG4gICAgICAgICAgdGhpcy5tb2RlbCA9IHRoaXMuc2VsZWN0aW9uWzBdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZXZlbnREYXRhKGRhdGU6IERhdGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgbW9udGg6IHRoaXMubGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KGRhdGUsIHsgbW9udGg6ICdsb25nJyB9KSxcbiAgICAgIGRheTogdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQoZGF0ZSwgeyB3ZWVrZGF5OiAnbG9uZycgfSksXG4gICAgICBkYXRlLFxuICAgIH07XG4gIH1cblxuICBmaXJlU2VsZWN0KCkge1xuICAgIGlmICh0aGlzLm1vZGUgPT09ICdtdWx0aXBsZScpIHtcbiAgICAgIHRoaXMub25TZWxlY3QubmV4dCh0aGlzLnNlbGVjdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub25TZWxlY3QubmV4dCh0aGlzLmV2ZW50RGF0YSh0aGlzLnNlbGVjdGlvblswXSkpO1xuICAgIH1cbiAgfVxuXG4gIGZpcmVSYW5nZVNlbGVjdCgpIHtcbiAgICAvLyBNYWtlIHN1cmUgdGhlIHN0YXJ0IGRhdGUgaXMgYmVmb3JlIHRoZSBlbmQgZGF0ZVxuICAgIGlmICh0aGlzLnNlbGVjdGlvbi5maWx0ZXIoQm9vbGVhbikubGVuZ3RoID09PSAyKSB7XG4gICAgICBjb25zdCBbc3RhcnQsIGVuZF0gPSB0aGlzLnNlbGVjdGlvbjtcbiAgICAgIHRoaXMub25TZWxlY3QubmV4dCh7XG4gICAgICAgIHN0YXJ0RGF0ZTogdGhpcy5ldmVudERhdGEoc3RhcnQpLFxuICAgICAgICBlbmREYXRlOiB0aGlzLmV2ZW50RGF0YShlbmQpLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0VG9kYXkoKSB7XG4gICAgY29uc3QgdG1wID0gbmV3IERhdGUoKTtcbiAgICB0aGlzLnVwZGF0ZVZpZXcodG1wKTtcbiAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvbihBcnJheS5vZih0bXApKTtcbiAgfVxuXG4gIHRvZ2dsZVJhbmdlU2VsZWN0KHJhbmdlOiByYW5nZVNlbGVjdE1vZGVzKTogdm9pZCB7XG4gICAgdGhpcy5yYW5nZVNlbGVjdE1vZGUgPSByYW5nZTtcbiAgICBpZiAocmFuZ2UgPT09ICdzdGFydERhdGUnICYmIHRoaXMuc2VsZWN0aW9uLmxlbmd0aCkge1xuICAgICAgdGhpcy51cGRhdGVWaWV3KHRoaXMuc2VsZWN0aW9uWzBdKTtcbiAgICB9XG4gICAgaWYgKHJhbmdlID09PSAnZW5kRGF0ZScgJiYgdGhpcy5zZWxlY3Rpb24ubGVuZ3RoID09PSAyKSB7XG4gICAgICB0aGlzLnVwZGF0ZVZpZXcodGhpcy5zZWxlY3Rpb25bMV0pO1xuICAgIH1cbiAgfVxuXG4gIG1vZGVsVG9TZWxlY3Rpb24obW9kZWw6IG1vZGVsVHlwZXMpIHtcbiAgICAvLyB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuX3N0cmF0ZWd5LnNlbGVjdGlvbkZpbmlzaGVkKCk7XG4gICAgc3dpdGNoICh0aGlzLm1vZGUpIHtcbiAgICAgIGNhc2UgJ211bHRpcGxlJzpcbiAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBtb2RlbCBhcyBEYXRlW107XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmFuZ2UnOlxuICAgICAgY2FzZSAnd2Vlayc6XG4gICAgICAgIGNvbnN0IHJhbmdlID0gdGhpcy5tb2RlbCBhcyBSYW5nZU1vZGVsO1xuICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IFtyYW5nZS5zdGFydERhdGUsIHJhbmdlLmVuZERhdGVdLmZpbHRlcihCb29sZWFuKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzaW5nbGUnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBbbW9kZWwgYXMgRGF0ZV07XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vIFZhbHVlQWNjZXNzb3IgRnVuY3Rpb25zXG4gIHdyaXRlVmFsdWUobW9kZWw6IG1vZGVsVHlwZXMpOiB2b2lkIHtcbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgaWYgKHRoaXMubW9kZSA9PT0gJ211bHRpcGxlJykge1xuICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLm1vZGVsIGFzIERhdGVbXTtcbiAgICB9XG4gICAgaWYgKEhlbHBlcnMuaXNEYXRlKG1vZGVsKSkge1xuICAgICAgdGhpcy51cGRhdGVWaWV3KG1vZGVsKTtcbiAgICAgIHRoaXMubW9kZWxUb1NlbGVjdGlvbihtb2RlbCk7XG4gICAgfSBlbHNlIGlmIChIZWxwZXJzLmlzU3RyaW5nKG1vZGVsKSkge1xuICAgICAgY29uc3QgZGF0ZSA9IHBhcnNlKG1vZGVsIGFzIGFueSk7XG4gICAgICBpZiAoaXNWYWxpZChkYXRlKSkge1xuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoZGF0ZSk7XG4gICAgICAgIHRoaXMubW9kZWxUb1NlbGVjdGlvbihkYXRlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMuX29uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgfVxufVxuIl19