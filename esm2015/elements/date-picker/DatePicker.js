// NG2
import { ElementRef, Component, EventEmitter, forwardRef, Input, Output, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
// Vendor
import * as dateFns from 'date-fns';
// APP
import { Helpers } from '../../utils/Helpers';
import { NovoLabelService } from '../../services/novo-label-service';
// Value accessor for the component (supports ngModel)
const DATE_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoDatePickerElement),
    multi: true,
};
export class NovoDatePickerElement {
    constructor(labels, element) {
        this.labels = labels;
        this.element = element;
        this.weekStart = 0;
        // Select callback for output
        this.onSelect = new EventEmitter(false);
        // List of all the weekdays
        this.weekdays = [];
        // List of all months
        this.months = [];
        // List of all years (generated in ngOnInit)
        this.years = [];
        // Default view mode (select days)
        this.view = 'days';
        this.rangeSelectMode = 'startDate';
        this._onChange = () => { };
        this._onTouched = () => { };
    }
    ngOnInit() {
        // Determine the year array
        const now = new Date();
        const start = this.minYear ? Number(this.minYear) : now.getFullYear() - 100;
        const end = this.maxYear ? Number(this.maxYear) : now.getFullYear() + 10;
        for (let i = start; i <= end; i++) {
            this.years.push(i);
        }
        // Set weekdays / months
        this.weekdays = this.setupWeekdays();
        this.months = this.labels.getMonths();
        // Set labels
        this.selectedLabel = this.labels.startDate;
        this.selected2Label = this.labels.endDate;
        this.updateView(this.model, false, true);
    }
    ngOnChanges(changes) {
        const weekRangeSelectChange = changes['weekRangeSelect'];
        if (weekRangeSelectChange &&
            weekRangeSelectChange.currentValue !== weekRangeSelectChange.previousValue &&
            !weekRangeSelectChange.firstChange) {
            this.clearRange();
        }
        const weekStartChanges = changes['weekStart'];
        if (weekStartChanges && weekStartChanges.currentValue !== weekStartChanges.previousValue && !weekStartChanges.firstChange) {
            this.weekdays = this.setupWeekdays();
            this.updateView(this.model, false, false);
        }
    }
    setupWeekdays() {
        let weekdays = this.labels.getWeekdays();
        // Weekstart must be 0-6 (Sunday - Saturday)
        if (!Helpers.isBlank(this.weekStart) && this.weekStart > 0 && this.weekStart <= 6) {
            const newStart = weekdays.splice(this.weekStart);
            weekdays = [...newStart, ...weekdays];
        }
        return weekdays;
    }
    isSelectingRange(range, day, selected, selected2, hoverDay, rangeSelectMode, weekRangeSelect) {
        if (range && !weekRangeSelect) {
            const isRangeModeEndDate = rangeSelectMode === 'endDate' && (selected && selected2 && dateFns.isAfter(day, selected2) && dateFns.isBefore(day, hoverDay));
            const isRangeModeStartDate = rangeSelectMode === 'startDate' && (selected && selected2 && dateFns.isBefore(day, selected) && dateFns.isAfter(day, hoverDay));
            const isNotSelected = !selected && selected2 && dateFns.isBefore(day, selected2) && dateFns.isAfter(day, hoverDay);
            const isNotSelected2 = selected && !selected2 && dateFns.isAfter(day, selected) && dateFns.isBefore(day, hoverDay);
            return isNotSelected2 || isNotSelected || isRangeModeStartDate || isRangeModeEndDate;
        }
        return false;
    }
    isEndFill(range, day, selected, selected2) {
        if (range && selected2 && selected) {
            return !dateFns.isSameDay(selected, selected2) && dateFns.isSameDay(day, selected2) && dateFns.isAfter(day, selected);
        }
        return false;
    }
    isStartFill(range, day, selected, selected2) {
        if (range && selected2 && selected) {
            return !dateFns.isSameDay(selected, selected2) && dateFns.isSameDay(day, selected) && dateFns.isBefore(day, selected2);
        }
        return false;
    }
    isFiller(range, day, selected, selected2) {
        if (range && selected2 && selected) {
            return ((dateFns.isAfter(day, selected) && dateFns.isBefore(day, selected2)) ||
                dateFns.isSameDay(day, selected) ||
                dateFns.isSameDay(day, selected2));
        }
        return false;
    }
    isSelected(range, day, selected, selected2) {
        if (range) {
            return (day &&
                ((selected &&
                    (day.getDate() === selected.getDate() &&
                        day.getMonth() === selected.getMonth() &&
                        day.getFullYear() === selected.getFullYear())) ||
                    (selected2 &&
                        (day.getDate() === selected2.getDate() &&
                            day.getMonth() === selected2.getMonth() &&
                            day.getFullYear() === selected2.getFullYear()))));
        }
        return day.getDate() === selected.getDate() && day.getMonth() === selected.getMonth() && day.getFullYear() === selected.getFullYear();
    }
    isDisabled(day, start, end) {
        return dateFns.isBefore(day, start) || dateFns.isAfter(day, end);
    }
    updateView(date, fireEvents, markedSelected) {
        if (date && date.startDate === null) {
            this.clearRange();
        }
        else {
            if (!date) {
                this.clearRange();
            }
            let value = date ? new Date(date) : new Date();
            value = this.removeTime(value);
            this.month = new Date(value);
            this.monthLabel = this.labels.formatDateWithFormat(this.month, { month: 'short' });
            const start = new Date(value.getTime());
            start.setDate(1);
            this.removeTime(start.setDate(1));
            this.buildMonth(start, this.month);
            if (markedSelected) {
                this.select(null, { date: value }, fireEvents);
            }
        }
    }
    setToday() {
        const tmp = new Date();
        this.updateView(tmp, true, true);
        // Go back to days
        this.open(null, 'days');
    }
    clearRange() {
        this.selected = null;
        this.selectedLabel = this.labels.startDate;
        this.selected2 = null;
        this.selected2Label = this.labels.endDate;
    }
    setMonth(month) {
        const date = this.month ? this.month : new Date();
        const tmp = dateFns.setMonth(date, month);
        this.updateView(tmp, true, false);
        // Go back to days
        this.open(null, 'days');
    }
    setYear(year) {
        const date = this.month ? this.month : new Date();
        const tmp = dateFns.setYear(date, year);
        this.updateView(tmp, true, false);
        // Go back to days
        this.open(null, 'days');
    }
    select(event, day, fireEvents) {
        Helpers.swallowEvent(event);
        if (this.range) {
            if (this.weekRangeSelect) {
                this.selected = dateFns.startOfWeek(day.date, { weekStartsOn: this.weekStart });
                this.selected2 = dateFns.endOfWeek(day.date, { weekStartsOn: this.weekStart });
                this.selectedLabel = this.labels.formatDateWithFormat(this.selected, {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                });
                this.selected2Label = this.labels.formatDateWithFormat(this.selected2, {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                });
                // Make sure to fire this, since we default to the current week selected!
                if (!fireEvents && this.weekRangeSelect) {
                    this.fireRangeSelect();
                }
            }
            else if (this.rangeSelectMode === 'startDate') {
                // SET START DATE
                this.selected = dateFns.startOfDay(day.date);
                this.selectedLabel = this.labels.formatDateWithFormat(this.selected, {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                });
                if (this.selected2 && dateFns.isAfter(day.date, this.selected2)) {
                    // CLEAR END DATE
                    this.selected2 = null;
                    this.selected2Label = this.labels.endDate;
                }
                if (event) {
                    this.rangeSelectMode = 'endDate';
                }
            }
            else if (this.rangeSelectMode === 'endDate') {
                // SET END DATE
                this.selected2 = dateFns.endOfDay(day.date);
                this.selected2Label = this.labels.formatDateWithFormat(this.selected2, {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                });
                if (this.selected && dateFns.isBefore(day.date, this.selected)) {
                    // CLEAR START DATE
                    this.selected = null;
                    this.selectedLabel = this.labels.startDate;
                }
                if (event) {
                    this.rangeSelectMode = 'startDate';
                }
            }
        }
        else {
            this.selected = day.date;
            this.selectedLabel = this.labels.formatDateWithFormat(this.selected, {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
            });
            this.updateHeading();
        }
        if (fireEvents && this.selected) {
            // Emit our output
            if (this.range && this.selected && this.selected2) {
                this.fireRangeSelect();
                // Also, update the ngModel
                this._onChange({
                    startDate: this.selected,
                    endDate: this.selected2 ? this.selected2 : null,
                });
                this.model = {
                    startDate: this.selected,
                    endDate: this.selected2 ? this.selected2 : null,
                };
            }
            if (!this.range) {
                this.onSelect.next({
                    month: this.labels.formatDateWithFormat(this.selected, { month: 'long' }),
                    year: this.selected.getFullYear(),
                    day: this.labels.formatDateWithFormat(this.selected, { weekday: 'long' }),
                    date: this.selected,
                });
                // Also, update the ngModel
                this._onChange(this.selected);
                this.model = this.selected;
            }
        }
    }
    fireRangeSelect() {
        // Make sure the start date is before the end date
        if (dateFns.isBefore(this.selected, this.selected2)) {
            this.onSelect.next({
                startDate: {
                    month: this.labels.formatDateWithFormat(this.selected, { month: 'long' }),
                    year: this.selected.getFullYear(),
                    day: this.labels.formatDateWithFormat(this.selected, { weekday: 'long' }),
                    date: this.selected,
                },
                endDate: {
                    month: this.labels.formatDateWithFormat(this.selected2, { month: 'long' }),
                    year: this.selected2.getFullYear(),
                    day: this.labels.formatDateWithFormat(this.selected2, { weekday: 'long' }),
                    date: this.selected2,
                },
            });
        }
    }
    open(event, type) {
        Helpers.swallowEvent(event);
        // If they click the toggle two time in a row, close it (go back to days)
        if (type === this.view) {
            this.view = 'days';
        }
        else {
            this.view = type;
        }
        // Make sure to scroll the selected one into view
        if (this.view === 'years' || this.view === 'months') {
            setTimeout(() => {
                const container = this.element.nativeElement.querySelector(`.calendar-content.${this.view}`);
                const selectedItem = this.element.nativeElement.querySelector(`.calendar-content.${this.view} .${this.view === 'years' ? 'year' : 'month'}.selected`);
                if (container && selectedItem) {
                    container.scrollTop = selectedItem.offsetTop - 100;
                }
            });
        }
        this.updateHeading();
    }
    prevMonth(event) {
        Helpers.swallowEvent(event);
        const tmp = dateFns.subMonths(this.month, 1);
        this.updateView(tmp, false, false);
    }
    nextMonth(event) {
        Helpers.swallowEvent(event);
        const tmp = dateFns.addMonths(this.month, 1);
        this.updateView(tmp, false, false);
    }
    updateHeading() {
        if (!this.selected) {
            return;
        }
        this.heading = {
            month: this.labels.formatDateWithFormat(this.selected, { month: 'long' }),
            year: this.selected.getFullYear(),
            day: this.labels.formatDateWithFormat(this.selected, { weekday: 'long' }),
            date: this.selected.getDate(),
        };
    }
    /**
     * Remove the time aspect of the date
     * @returns with time stripped out
     */
    removeTime(date) {
        const ret = new Date(date);
        ret.setHours(12);
        ret.setSeconds(0);
        ret.setMilliseconds(0);
        return ret;
    }
    buildMonth(start, month) {
        // Reset the weeks
        this.weeks = [];
        // House keeping variables to know when we are done building the month
        let done = false;
        let date = dateFns.startOfWeek(start, { weekStartsOn: this.weekStart });
        let monthIndex = date.getMonth();
        let count = 0;
        while (!done) {
            // Build the days for the weeks
            this.weeks.push({ days: this.buildWeek(new Date(date.getTime()), month) });
            // Increment variables for the next iteration
            date = dateFns.addDays(date, 7);
            done = count++ > 2 && monthIndex !== date.getMonth();
            monthIndex = date.getMonth();
        }
    }
    buildWeek(date, month) {
        // Build out of the days of the week
        const days = [];
        // Iterate over the days of the week
        for (let i = 0; i < 7; i++) {
            // Push a variable on the day array with lots of helpers to make the template easier
            days.push({
                name: this.weekdays[i],
                number: date.getDate(),
                isToday: dateFns.isToday(date),
                date,
            });
            // Increment for the next iteration
            date = dateFns.addDays(date, 1);
        }
        return days;
    }
    toggleRangeSelect(range) {
        this.rangeSelectMode = range;
    }
    rangeHover(event, day) {
        this.hoverDay = day.date;
    }
    // ValueAccessor Functions
    writeValue(model) {
        this.model = model;
        if (Helpers.isDate(model)) {
            this.updateView(model, false, true);
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
        <div class="calendar">
            <div class="calendar-top" *ngIf="!inline && !range">
                <h4 class="day" [attr.data-automation-id]="heading?.day">{{heading?.day}}</h4>
                <h2 class="month" [attr.data-automation-id]="heading?.month">{{heading?.month}}</h2>
                <h1 class="date" [attr.data-automation-id]="heading?.date">{{heading?.date}}</h1>
                <h3 class="year" [attr.data-automation-id]="heading?.year">{{heading?.year}}</h3>
            </div>
            <div class="date-range-tabs" *ngIf="range" [class.week-select-mode]="weekRangeSelect">
                <span class="range-tab" (click)="toggleRangeSelect('startDate')" [@startDateTextState]="rangeSelectMode" data-automation-id="calendar-start-date">{{selectedLabel}}</span>
                <span class="range-tab" (click)="toggleRangeSelect('endDate')" [@endDateTextState]="rangeSelectMode" data-automation-id="calendar-end-date">{{selected2Label}}</span>
                <i class="indicator" [@indicatorState]="rangeSelectMode"></i>
            </div>
            <div class="calendar-header">
                <span class="previous" (click)="prevMonth($event)" data-automation-id="calendar-previous"></span>
                <span class="heading">
                    <span class="month" (click)="open($event, 'months')" data-automation-id="header-month">{{monthLabel}}</span>
                    <span class="year" (click)="open($event, 'years')" data-automation-id="header-year">{{month?.getFullYear()}}</span>
                </span>
                <span class="next" (click)="nextMonth($event)" data-automation-id="calendar-next"></span>
            </div>
            <table class="calendar-content days" cellspacing="0" cellpadding="0" [hidden]="!(view=='days')">
                <thead>
                    <tr>
                        <th *ngFor="let day of weekdays" title="{{day}}" class="weekday" [attr.data-automation-id]="day.substr(0, 2)">{{day.substr(0, 2)}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let week of weeks">
                        <td *ngFor="let day of week.days" [ngClass]="{
                            today: day.isToday,
                            'notinmonth': day.date.getMonth() !== this.month.getMonth(),
                            selected: isSelected(range, day.date, selected, selected2),
                            filler: isFiller(range, day.date, selected, selected2),
                            startfill: isStartFill(range, day.date, selected, selected2),
                            endfill: isEndFill(range, day.date, selected, selected2),
                            'selecting-range': isSelectingRange(range, day.date, selected, selected2, hoverDay, rangeSelectMode, weekRangeSelect)
                           }" (mouseover)="rangeHover($event, day)" [attr.data-automation-id]="day.number">
                            <button class="day" [attr.data-automation-id]="day.number" [disabled]="isDisabled(day.date, start, end)" (click)="select($event, day, true)">{{day.number}}</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <section class="calendar-content months" [hidden]="view !== 'months'">
                <div *ngFor="let month of months;let i = index" (click)="setMonth(i)">
                    <div class="month" [ngClass]="{selected: i === selected?.getMonth()}" [attr.data-automation-id]="month">{{month}}</div>
                </div>
            </section>
            <section class="calendar-content years" [hidden]="view !== 'years'">
                <div *ngFor="let year of years" (click)="setYear(year)">
                    <div class="year" [ngClass]="{selected: year == selected?.getFullYear()}" [attr.data-automation-id]="year">{{year}}</div>
                </div>
            </section>
            <div class="calendar-footer">
                <span (click)="setToday()" class="today" data-automation-id="calendar-today">{{ labels.today }}</span>
            </div>
        </div>
    `
            },] }
];
NovoDatePickerElement.ctorParameters = () => [
    { type: NovoLabelService },
    { type: ElementRef }
];
NovoDatePickerElement.propDecorators = {
    minYear: [{ type: Input }],
    maxYear: [{ type: Input }],
    start: [{ type: Input }],
    end: [{ type: Input }],
    inline: [{ type: Input }],
    range: [{ type: Input }],
    weekRangeSelect: [{ type: Input }],
    weekStart: [{ type: Input }],
    onSelect: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZGF0ZS1waWNrZXIvRGF0ZVBpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUNMLFVBQVUsRUFDVixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxHQUtQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pGLFNBQVM7QUFDVCxPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQztBQUNwQyxNQUFNO0FBQ04sT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRXJFLHNEQUFzRDtBQUN0RCxNQUFNLDBCQUEwQixHQUFHO0lBQ2pDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztJQUNwRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUErSEYsTUFBTSxPQUFPLHFCQUFxQjtJQTZDaEMsWUFBbUIsTUFBd0IsRUFBVSxPQUFtQjtRQUFyRCxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVk7UUE3QnhFLGNBQVMsR0FBVyxDQUFDLENBQUM7UUFDdEIsNkJBQTZCO1FBRTdCLGFBQVEsR0FBc0IsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFdEQsMkJB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LGtCQUFrQjt5QkFDOUIsQ0FBQyxDQUNIO3dCQUNELFVBQVUsQ0FBQyx1QkFBdUIsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7cUJBQzlELENBQUM7aUJBQ0g7Z0JBQ0QsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0F5RFA7YUFDSjs7O1lBcklRLGdCQUFnQjtZQWpCdkIsVUFBVTs7O3NCQXdKVCxLQUFLO3NCQUVMLEtBQUs7b0JBRUwsS0FBSztrQkFFTCxLQUFLO3FCQUVMLEtBQUs7b0JBRUwsS0FBSzs4QkFFTCxLQUFLO3dCQUVMLEtBQUs7dUJBR0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQge1xyXG4gIEVsZW1lbnRSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBmb3J3YXJkUmVmLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBPbkluaXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgU2ltcGxlQ2hhbmdlLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IGFuaW1hdGUsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG4vLyBWZW5kb3JcclxuaW1wb3J0ICogYXMgZGF0ZUZucyBmcm9tICdkYXRlLWZucyc7XHJcbi8vIEFQUFxyXG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vdXRpbHMvSGVscGVycyc7XHJcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xyXG5cclxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXHJcbmNvbnN0IERBVEVfUElDS0VSX1ZBTFVFX0FDQ0VTU09SID0ge1xyXG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9EYXRlUGlja2VyRWxlbWVudCksXHJcbiAgbXVsdGk6IHRydWUsXHJcbn07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJhbmdlTW9kYWwge1xyXG4gIHN0YXJ0RGF0ZTogRGF0ZTtcclxuICBlbmREYXRlOiBEYXRlO1xyXG59XHJcbmV4cG9ydCB0eXBlIG1vZGVsVHlwZXMgPSBEYXRlIHwgUmFuZ2VNb2RhbDtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGF5IHtcclxuICBkYXRlOiBEYXRlO1xyXG4gIGlzQ3VycmVudE1vbnRoPzogYm9vbGVhbjtcclxuICBpc1RvZGF5PzogYm9vbGVhbjtcclxuICBuYW1lPzogc3RyaW5nO1xyXG4gIG51bWJlcj86IHN0cmluZyB8IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgcmFuZ2VTZWxlY3RNb2RlcyA9ICdzdGFydERhdGUnIHwgJ2VuZERhdGUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLWRhdGUtcGlja2VyJyxcclxuICBwcm92aWRlcnM6IFtEQVRFX1BJQ0tFUl9WQUxVRV9BQ0NFU1NPUl0sXHJcbiAgYW5pbWF0aW9uczogW1xyXG4gICAgdHJpZ2dlcignc3RhcnREYXRlVGV4dFN0YXRlJywgW1xyXG4gICAgICBzdGF0ZShcclxuICAgICAgICAnc3RhcnREYXRlJyxcclxuICAgICAgICBzdHlsZSh7XHJcbiAgICAgICAgICBvcGFjaXR5OiAnMS4wJyxcclxuICAgICAgICB9KSxcclxuICAgICAgKSxcclxuICAgICAgc3RhdGUoXHJcbiAgICAgICAgJ2VuZERhdGUnLFxyXG4gICAgICAgIHN0eWxlKHtcclxuICAgICAgICAgIG9wYWNpdHk6ICcwLjYnLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICApLFxyXG4gICAgICB0cmFuc2l0aW9uKCdzdGFydERhdGUgPD0+IGVuZERhdGUnLCBhbmltYXRlKCcyMDBtcyBlYXNlLWluJykpLFxyXG4gICAgXSksXHJcbiAgICB0cmlnZ2VyKCdlbmREYXRlVGV4dFN0YXRlJywgW1xyXG4gICAgICBzdGF0ZShcclxuICAgICAgICAnc3RhcnREYXRlJyxcclxuICAgICAgICBzdHlsZSh7XHJcbiAgICAgICAgICBvcGFjaXR5OiAnMC42JyxcclxuICAgICAgICB9KSxcclxuICAgICAgKSxcclxuICAgICAgc3RhdGUoXHJcbiAgICAgICAgJ2VuZERhdGUnLFxyXG4gICAgICAgIHN0eWxlKHtcclxuICAgICAgICAgIG9wYWNpdHk6ICcxLjAnLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICApLFxyXG4gICAgICB0cmFuc2l0aW9uKCdzdGFydERhdGUgPD0+IGVuZERhdGUnLCBhbmltYXRlKCcyMDBtcyBlYXNlLWluJykpLFxyXG4gICAgXSksXHJcbiAgICB0cmlnZ2VyKCdpbmRpY2F0b3JTdGF0ZScsIFtcclxuICAgICAgc3RhdGUoXHJcbiAgICAgICAgJ3N0YXJ0RGF0ZScsXHJcbiAgICAgICAgc3R5bGUoe1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwJSknLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICApLFxyXG4gICAgICBzdGF0ZShcclxuICAgICAgICAnZW5kRGF0ZScsXHJcbiAgICAgICAgc3R5bGUoe1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgxMDAlKScsXHJcbiAgICAgICAgfSksXHJcbiAgICAgICksXHJcbiAgICAgIHRyYW5zaXRpb24oJ3N0YXJ0RGF0ZSA8PT4gZW5kRGF0ZScsIGFuaW1hdGUoJzIwMG1zIGVhc2UtaW4nKSksXHJcbiAgICBdKSxcclxuICBdLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhbGVuZGFyXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYWxlbmRhci10b3BcIiAqbmdJZj1cIiFpbmxpbmUgJiYgIXJhbmdlXCI+XHJcbiAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJkYXlcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiaGVhZGluZz8uZGF5XCI+e3toZWFkaW5nPy5kYXl9fTwvaDQ+XHJcbiAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJtb250aFwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJoZWFkaW5nPy5tb250aFwiPnt7aGVhZGluZz8ubW9udGh9fTwvaDI+XHJcbiAgICAgICAgICAgICAgICA8aDEgY2xhc3M9XCJkYXRlXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImhlYWRpbmc/LmRhdGVcIj57e2hlYWRpbmc/LmRhdGV9fTwvaDE+XHJcbiAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJ5ZWFyXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImhlYWRpbmc/LnllYXJcIj57e2hlYWRpbmc/LnllYXJ9fTwvaDM+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0ZS1yYW5nZS10YWJzXCIgKm5nSWY9XCJyYW5nZVwiIFtjbGFzcy53ZWVrLXNlbGVjdC1tb2RlXT1cIndlZWtSYW5nZVNlbGVjdFwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJyYW5nZS10YWJcIiAoY2xpY2spPVwidG9nZ2xlUmFuZ2VTZWxlY3QoJ3N0YXJ0RGF0ZScpXCIgW0BzdGFydERhdGVUZXh0U3RhdGVdPVwicmFuZ2VTZWxlY3RNb2RlXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwiY2FsZW5kYXItc3RhcnQtZGF0ZVwiPnt7c2VsZWN0ZWRMYWJlbH19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJyYW5nZS10YWJcIiAoY2xpY2spPVwidG9nZ2xlUmFuZ2VTZWxlY3QoJ2VuZERhdGUnKVwiIFtAZW5kRGF0ZVRleHRTdGF0ZV09XCJyYW5nZVNlbGVjdE1vZGVcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJjYWxlbmRhci1lbmQtZGF0ZVwiPnt7c2VsZWN0ZWQyTGFiZWx9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiaW5kaWNhdG9yXCIgW0BpbmRpY2F0b3JTdGF0ZV09XCJyYW5nZVNlbGVjdE1vZGVcIj48L2k+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByZXZpb3VzXCIgKGNsaWNrKT1cInByZXZNb250aCgkZXZlbnQpXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwiY2FsZW5kYXItcHJldmlvdXNcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlYWRpbmdcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1vbnRoXCIgKGNsaWNrKT1cIm9wZW4oJGV2ZW50LCAnbW9udGhzJylcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJoZWFkZXItbW9udGhcIj57e21vbnRoTGFiZWx9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInllYXJcIiAoY2xpY2spPVwib3BlbigkZXZlbnQsICd5ZWFycycpXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwiaGVhZGVyLXllYXJcIj57e21vbnRoPy5nZXRGdWxsWWVhcigpfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5leHRcIiAoY2xpY2spPVwibmV4dE1vbnRoKCRldmVudClcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJjYWxlbmRhci1uZXh0XCI+PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwiY2FsZW5kYXItY29udGVudCBkYXlzXCIgY2VsbHNwYWNpbmc9XCIwXCIgY2VsbHBhZGRpbmc9XCIwXCIgW2hpZGRlbl09XCIhKHZpZXc9PSdkYXlzJylcIj5cclxuICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCAqbmdGb3I9XCJsZXQgZGF5IG9mIHdlZWtkYXlzXCIgdGl0bGU9XCJ7e2RheX19XCIgY2xhc3M9XCJ3ZWVrZGF5XCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImRheS5zdWJzdHIoMCwgMilcIj57e2RheS5zdWJzdHIoMCwgMil9fTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRyICpuZ0Zvcj1cImxldCB3ZWVrIG9mIHdlZWtzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgZGF5IG9mIHdlZWsuZGF5c1wiIFtuZ0NsYXNzXT1cIntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZGF5OiBkYXkuaXNUb2RheSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdub3Rpbm1vbnRoJzogZGF5LmRhdGUuZ2V0TW9udGgoKSAhPT0gdGhpcy5tb250aC5nZXRNb250aCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGlzU2VsZWN0ZWQocmFuZ2UsIGRheS5kYXRlLCBzZWxlY3RlZCwgc2VsZWN0ZWQyKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxlcjogaXNGaWxsZXIocmFuZ2UsIGRheS5kYXRlLCBzZWxlY3RlZCwgc2VsZWN0ZWQyKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0ZmlsbDogaXNTdGFydEZpbGwocmFuZ2UsIGRheS5kYXRlLCBzZWxlY3RlZCwgc2VsZWN0ZWQyKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZGZpbGw6IGlzRW5kRmlsbChyYW5nZSwgZGF5LmRhdGUsIHNlbGVjdGVkLCBzZWxlY3RlZDIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3NlbGVjdGluZy1yYW5nZSc6IGlzU2VsZWN0aW5nUmFuZ2UocmFuZ2UsIGRheS5kYXRlLCBzZWxlY3RlZCwgc2VsZWN0ZWQyLCBob3ZlckRheSwgcmFuZ2VTZWxlY3RNb2RlLCB3ZWVrUmFuZ2VTZWxlY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cIiAobW91c2VvdmVyKT1cInJhbmdlSG92ZXIoJGV2ZW50LCBkYXkpXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImRheS5udW1iZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkYXlcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiZGF5Lm51bWJlclwiIFtkaXNhYmxlZF09XCJpc0Rpc2FibGVkKGRheS5kYXRlLCBzdGFydCwgZW5kKVwiIChjbGljayk9XCJzZWxlY3QoJGV2ZW50LCBkYXksIHRydWUpXCI+e3tkYXkubnVtYmVyfX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjYWxlbmRhci1jb250ZW50IG1vbnRoc1wiIFtoaWRkZW5dPVwidmlldyAhPT0gJ21vbnRocydcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IG1vbnRoIG9mIG1vbnRocztsZXQgaSA9IGluZGV4XCIgKGNsaWNrKT1cInNldE1vbnRoKGkpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vbnRoXCIgW25nQ2xhc3NdPVwie3NlbGVjdGVkOiBpID09PSBzZWxlY3RlZD8uZ2V0TW9udGgoKX1cIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwibW9udGhcIj57e21vbnRofX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiY2FsZW5kYXItY29udGVudCB5ZWFyc1wiIFtoaWRkZW5dPVwidmlldyAhPT0gJ3llYXJzJ1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgeWVhciBvZiB5ZWFyc1wiIChjbGljayk9XCJzZXRZZWFyKHllYXIpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInllYXJcIiBbbmdDbGFzc109XCJ7c2VsZWN0ZWQ6IHllYXIgPT0gc2VsZWN0ZWQ/LmdldEZ1bGxZZWFyKCl9XCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cInllYXJcIj57e3llYXJ9fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhbGVuZGFyLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gKGNsaWNrKT1cInNldFRvZGF5KClcIiBjbGFzcz1cInRvZGF5XCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwiY2FsZW5kYXItdG9kYXlcIj57eyBsYWJlbHMudG9kYXkgfX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9EYXRlUGlja2VyRWxlbWVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KClcclxuICBtaW5ZZWFyOiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgQElucHV0KClcclxuICBtYXhZZWFyOiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgQElucHV0KClcclxuICBzdGFydDogRGF0ZTtcclxuICBASW5wdXQoKVxyXG4gIGVuZDogRGF0ZTtcclxuICBASW5wdXQoKVxyXG4gIGlubGluZTogYm9vbGVhbjtcclxuICBASW5wdXQoKVxyXG4gIHJhbmdlOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpXHJcbiAgd2Vla1JhbmdlU2VsZWN0OiBib29sZWFuO1xyXG4gIEBJbnB1dCgpXHJcbiAgd2Vla1N0YXJ0OiBudW1iZXIgPSAwO1xyXG4gIC8vIFNlbGVjdCBjYWxsYmFjayBmb3Igb3V0cHV0XHJcbiAgQE91dHB1dCgpXHJcbiAgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcihmYWxzZSk7XHJcblxyXG4gIC8vIExpc3Qgb2YgYWxsIHRoZSB3ZWVrZGF5c1xyXG4gIHdlZWtkYXlzOiBzdHJpbmdbXSA9IFtdO1xyXG4gIC8vIExpc3Qgb2YgYWxsIG1vbnRoc1xyXG4gIG1vbnRoczogc3RyaW5nW10gPSBbXTtcclxuICAvLyBMaXN0IG9mIGFsbCB5ZWFycyAoZ2VuZXJhdGVkIGluIG5nT25Jbml0KVxyXG4gIHllYXJzOiBBcnJheTxhbnk+ID0gW107XHJcbiAgLy8gRGVmYXVsdCB2aWV3IG1vZGUgKHNlbGVjdCBkYXlzKVxyXG4gIHZpZXc6IHN0cmluZyA9ICdkYXlzJztcclxuICBoZWFkaW5nOiBhbnk7XHJcblxyXG4gIG1vZGVsOiBtb2RlbFR5cGVzO1xyXG4gIG1vbnRoOiBEYXRlO1xyXG4gIG1vbnRoTGFiZWw6IHN0cmluZztcclxuICB3ZWVrczogYW55O1xyXG4gIHNlbGVjdGVkOiBEYXRlO1xyXG4gIHNlbGVjdGVkTGFiZWw6IHN0cmluZztcclxuICBzZWxlY3RlZDI6IERhdGU7XHJcbiAgc2VsZWN0ZWQyTGFiZWw6IHN0cmluZztcclxuICBob3ZlckRheTogYW55O1xyXG5cclxuICByYW5nZVNlbGVjdE1vZGU6IHJhbmdlU2VsZWN0TW9kZXMgPSAnc3RhcnREYXRlJztcclxuICBfb25DaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4geyB9O1xyXG4gIF9vblRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4geyB9O1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLCBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIC8vIERldGVybWluZSB0aGUgeWVhciBhcnJheVxyXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5taW5ZZWFyID8gTnVtYmVyKHRoaXMubWluWWVhcikgOiBub3cuZ2V0RnVsbFllYXIoKSAtIDEwMDtcclxuICAgIGNvbnN0IGVuZCA9IHRoaXMubWF4WWVhciA/IE51bWJlcih0aGlzLm1heFllYXIpIDogbm93LmdldEZ1bGxZZWFyKCkgKyAxMDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPD0gZW5kOyBpKyspIHtcclxuICAgICAgdGhpcy55ZWFycy5wdXNoKGkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNldCB3ZWVrZGF5cyAvIG1vbnRoc1xyXG4gICAgdGhpcy53ZWVrZGF5cyA9IHRoaXMuc2V0dXBXZWVrZGF5cygpO1xyXG4gICAgdGhpcy5tb250aHMgPSB0aGlzLmxhYmVscy5nZXRNb250aHMoKTtcclxuXHJcbiAgICAvLyBTZXQgbGFiZWxzXHJcbiAgICB0aGlzLnNlbGVjdGVkTGFiZWwgPSB0aGlzLmxhYmVscy5zdGFydERhdGU7XHJcbiAgICB0aGlzLnNlbGVjdGVkMkxhYmVsID0gdGhpcy5sYWJlbHMuZW5kRGF0ZTtcclxuICAgIHRoaXMudXBkYXRlVmlldyh0aGlzLm1vZGVsLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBjb25zdCB3ZWVrUmFuZ2VTZWxlY3RDaGFuZ2U6IFNpbXBsZUNoYW5nZSA9IGNoYW5nZXNbJ3dlZWtSYW5nZVNlbGVjdCddO1xyXG4gICAgaWYgKFxyXG4gICAgICB3ZWVrUmFuZ2VTZWxlY3RDaGFuZ2UgJiZcclxuICAgICAgd2Vla1JhbmdlU2VsZWN0Q2hhbmdlLmN1cnJlbnRWYWx1ZSAhPT0gd2Vla1JhbmdlU2VsZWN0Q2hhbmdlLnByZXZpb3VzVmFsdWUgJiZcclxuICAgICAgIXdlZWtSYW5nZVNlbGVjdENoYW5nZS5maXJzdENoYW5nZVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuY2xlYXJSYW5nZSgpO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgd2Vla1N0YXJ0Q2hhbmdlczogU2ltcGxlQ2hhbmdlID0gY2hhbmdlc1snd2Vla1N0YXJ0J107XHJcbiAgICBpZiAod2Vla1N0YXJ0Q2hhbmdlcyAmJiB3ZWVrU3RhcnRDaGFuZ2VzLmN1cnJlbnRWYWx1ZSAhPT0gd2Vla1N0YXJ0Q2hhbmdlcy5wcmV2aW91c1ZhbHVlICYmICF3ZWVrU3RhcnRDaGFuZ2VzLmZpcnN0Q2hhbmdlKSB7XHJcbiAgICAgIHRoaXMud2Vla2RheXMgPSB0aGlzLnNldHVwV2Vla2RheXMoKTtcclxuICAgICAgdGhpcy51cGRhdGVWaWV3KHRoaXMubW9kZWwsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXR1cFdlZWtkYXlzKCk6IHN0cmluZ1tdIHtcclxuICAgIGxldCB3ZWVrZGF5cyA9IHRoaXMubGFiZWxzLmdldFdlZWtkYXlzKCk7XHJcbiAgICAvLyBXZWVrc3RhcnQgbXVzdCBiZSAwLTYgKFN1bmRheSAtIFNhdHVyZGF5KVxyXG4gICAgaWYgKCFIZWxwZXJzLmlzQmxhbmsodGhpcy53ZWVrU3RhcnQpICYmIHRoaXMud2Vla1N0YXJ0ID4gMCAmJiB0aGlzLndlZWtTdGFydCA8PSA2KSB7XHJcbiAgICAgIGNvbnN0IG5ld1N0YXJ0ID0gd2Vla2RheXMuc3BsaWNlKHRoaXMud2Vla1N0YXJ0KTtcclxuICAgICAgd2Vla2RheXMgPSBbLi4ubmV3U3RhcnQsIC4uLndlZWtkYXlzXTtcclxuICAgIH1cclxuICAgIHJldHVybiB3ZWVrZGF5cztcclxuICB9XHJcblxyXG4gIGlzU2VsZWN0aW5nUmFuZ2UocmFuZ2UsIGRheSwgc2VsZWN0ZWQsIHNlbGVjdGVkMiwgaG92ZXJEYXksIHJhbmdlU2VsZWN0TW9kZSwgd2Vla1JhbmdlU2VsZWN0KSB7XHJcbiAgICBpZiAocmFuZ2UgJiYgIXdlZWtSYW5nZVNlbGVjdCkge1xyXG4gICAgICBjb25zdCBpc1JhbmdlTW9kZUVuZERhdGUgPVxyXG4gICAgICAgIHJhbmdlU2VsZWN0TW9kZSA9PT0gJ2VuZERhdGUnICYmIChzZWxlY3RlZCAmJiBzZWxlY3RlZDIgJiYgZGF0ZUZucy5pc0FmdGVyKGRheSwgc2VsZWN0ZWQyKSAmJiBkYXRlRm5zLmlzQmVmb3JlKGRheSwgaG92ZXJEYXkpKTtcclxuICAgICAgY29uc3QgaXNSYW5nZU1vZGVTdGFydERhdGUgPVxyXG4gICAgICAgIHJhbmdlU2VsZWN0TW9kZSA9PT0gJ3N0YXJ0RGF0ZScgJiYgKHNlbGVjdGVkICYmIHNlbGVjdGVkMiAmJiBkYXRlRm5zLmlzQmVmb3JlKGRheSwgc2VsZWN0ZWQpICYmIGRhdGVGbnMuaXNBZnRlcihkYXksIGhvdmVyRGF5KSk7XHJcbiAgICAgIGNvbnN0IGlzTm90U2VsZWN0ZWQgPSAhc2VsZWN0ZWQgJiYgc2VsZWN0ZWQyICYmIGRhdGVGbnMuaXNCZWZvcmUoZGF5LCBzZWxlY3RlZDIpICYmIGRhdGVGbnMuaXNBZnRlcihkYXksIGhvdmVyRGF5KTtcclxuICAgICAgY29uc3QgaXNOb3RTZWxlY3RlZDIgPSBzZWxlY3RlZCAmJiAhc2VsZWN0ZWQyICYmIGRhdGVGbnMuaXNBZnRlcihkYXksIHNlbGVjdGVkKSAmJiBkYXRlRm5zLmlzQmVmb3JlKGRheSwgaG92ZXJEYXkpO1xyXG4gICAgICByZXR1cm4gaXNOb3RTZWxlY3RlZDIgfHwgaXNOb3RTZWxlY3RlZCB8fCBpc1JhbmdlTW9kZVN0YXJ0RGF0ZSB8fCBpc1JhbmdlTW9kZUVuZERhdGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpc0VuZEZpbGwocmFuZ2UsIGRheSwgc2VsZWN0ZWQsIHNlbGVjdGVkMikge1xyXG4gICAgaWYgKHJhbmdlICYmIHNlbGVjdGVkMiAmJiBzZWxlY3RlZCkge1xyXG4gICAgICByZXR1cm4gIWRhdGVGbnMuaXNTYW1lRGF5KHNlbGVjdGVkLCBzZWxlY3RlZDIpICYmIGRhdGVGbnMuaXNTYW1lRGF5KGRheSwgc2VsZWN0ZWQyKSAmJiBkYXRlRm5zLmlzQWZ0ZXIoZGF5LCBzZWxlY3RlZCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpc1N0YXJ0RmlsbChyYW5nZSwgZGF5LCBzZWxlY3RlZCwgc2VsZWN0ZWQyKSB7XHJcbiAgICBpZiAocmFuZ2UgJiYgc2VsZWN0ZWQyICYmIHNlbGVjdGVkKSB7XHJcbiAgICAgIHJldHVybiAhZGF0ZUZucy5pc1NhbWVEYXkoc2VsZWN0ZWQsIHNlbGVjdGVkMikgJiYgZGF0ZUZucy5pc1NhbWVEYXkoZGF5LCBzZWxlY3RlZCkgJiYgZGF0ZUZucy5pc0JlZm9yZShkYXksIHNlbGVjdGVkMik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpc0ZpbGxlcihyYW5nZSwgZGF5LCBzZWxlY3RlZCwgc2VsZWN0ZWQyKSB7XHJcbiAgICBpZiAocmFuZ2UgJiYgc2VsZWN0ZWQyICYmIHNlbGVjdGVkKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgKGRhdGVGbnMuaXNBZnRlcihkYXksIHNlbGVjdGVkKSAmJiBkYXRlRm5zLmlzQmVmb3JlKGRheSwgc2VsZWN0ZWQyKSkgfHxcclxuICAgICAgICBkYXRlRm5zLmlzU2FtZURheShkYXksIHNlbGVjdGVkKSB8fFxyXG4gICAgICAgIGRhdGVGbnMuaXNTYW1lRGF5KGRheSwgc2VsZWN0ZWQyKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaXNTZWxlY3RlZChyYW5nZSwgZGF5LCBzZWxlY3RlZCwgc2VsZWN0ZWQyKSB7XHJcbiAgICBpZiAocmFuZ2UpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICBkYXkgJiZcclxuICAgICAgICAoKHNlbGVjdGVkICYmXHJcbiAgICAgICAgICAoZGF5LmdldERhdGUoKSA9PT0gc2VsZWN0ZWQuZ2V0RGF0ZSgpICYmXHJcbiAgICAgICAgICAgIGRheS5nZXRNb250aCgpID09PSBzZWxlY3RlZC5nZXRNb250aCgpICYmXHJcbiAgICAgICAgICAgIGRheS5nZXRGdWxsWWVhcigpID09PSBzZWxlY3RlZC5nZXRGdWxsWWVhcigpKSkgfHxcclxuICAgICAgICAgIChzZWxlY3RlZDIgJiZcclxuICAgICAgICAgICAgKGRheS5nZXREYXRlKCkgPT09IHNlbGVjdGVkMi5nZXREYXRlKCkgJiZcclxuICAgICAgICAgICAgICBkYXkuZ2V0TW9udGgoKSA9PT0gc2VsZWN0ZWQyLmdldE1vbnRoKCkgJiZcclxuICAgICAgICAgICAgICBkYXkuZ2V0RnVsbFllYXIoKSA9PT0gc2VsZWN0ZWQyLmdldEZ1bGxZZWFyKCkpKSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiBkYXkuZ2V0RGF0ZSgpID09PSBzZWxlY3RlZC5nZXREYXRlKCkgJiYgZGF5LmdldE1vbnRoKCkgPT09IHNlbGVjdGVkLmdldE1vbnRoKCkgJiYgZGF5LmdldEZ1bGxZZWFyKCkgPT09IHNlbGVjdGVkLmdldEZ1bGxZZWFyKCk7XHJcbiAgfVxyXG5cclxuICBpc0Rpc2FibGVkKGRheSwgc3RhcnQsIGVuZCkge1xyXG4gICAgcmV0dXJuIGRhdGVGbnMuaXNCZWZvcmUoZGF5LCBzdGFydCkgfHwgZGF0ZUZucy5pc0FmdGVyKGRheSwgZW5kKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVZpZXcoZGF0ZSwgZmlyZUV2ZW50czogYm9vbGVhbiwgbWFya2VkU2VsZWN0ZWQ6IGJvb2xlYW4pIHtcclxuICAgIGlmIChkYXRlICYmIGRhdGUuc3RhcnREYXRlID09PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuY2xlYXJSYW5nZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKCFkYXRlKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhclJhbmdlKCk7XHJcbiAgICAgIH1cclxuICAgICAgbGV0IHZhbHVlOiBhbnkgPSBkYXRlID8gbmV3IERhdGUoZGF0ZSkgOiBuZXcgRGF0ZSgpO1xyXG4gICAgICB2YWx1ZSA9IHRoaXMucmVtb3ZlVGltZSh2YWx1ZSk7XHJcbiAgICAgIHRoaXMubW9udGggPSBuZXcgRGF0ZSh2YWx1ZSk7XHJcbiAgICAgIHRoaXMubW9udGhMYWJlbCA9IHRoaXMubGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KHRoaXMubW9udGgsIHsgbW9udGg6ICdzaG9ydCcgfSk7XHJcblxyXG4gICAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKHZhbHVlLmdldFRpbWUoKSk7XHJcbiAgICAgIHN0YXJ0LnNldERhdGUoMSk7XHJcbiAgICAgIHRoaXMucmVtb3ZlVGltZShzdGFydC5zZXREYXRlKDEpKTtcclxuXHJcbiAgICAgIHRoaXMuYnVpbGRNb250aChzdGFydCwgdGhpcy5tb250aCk7XHJcblxyXG4gICAgICBpZiAobWFya2VkU2VsZWN0ZWQpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdChudWxsLCB7IGRhdGU6IHZhbHVlIH0sIGZpcmVFdmVudHMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRUb2RheSgpIHtcclxuICAgIGNvbnN0IHRtcCA9IG5ldyBEYXRlKCk7XHJcbiAgICB0aGlzLnVwZGF0ZVZpZXcodG1wLCB0cnVlLCB0cnVlKTtcclxuICAgIC8vIEdvIGJhY2sgdG8gZGF5c1xyXG4gICAgdGhpcy5vcGVuKG51bGwsICdkYXlzJyk7XHJcbiAgfVxyXG5cclxuICBjbGVhclJhbmdlKCkge1xyXG4gICAgdGhpcy5zZWxlY3RlZCA9IG51bGw7XHJcbiAgICB0aGlzLnNlbGVjdGVkTGFiZWwgPSB0aGlzLmxhYmVscy5zdGFydERhdGU7XHJcbiAgICB0aGlzLnNlbGVjdGVkMiA9IG51bGw7XHJcbiAgICB0aGlzLnNlbGVjdGVkMkxhYmVsID0gdGhpcy5sYWJlbHMuZW5kRGF0ZTtcclxuICB9XHJcblxyXG4gIHNldE1vbnRoKG1vbnRoOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGNvbnN0IGRhdGUgPSB0aGlzLm1vbnRoID8gdGhpcy5tb250aCA6IG5ldyBEYXRlKCk7XHJcbiAgICBjb25zdCB0bXAgPSBkYXRlRm5zLnNldE1vbnRoKGRhdGUsIG1vbnRoKTtcclxuICAgIHRoaXMudXBkYXRlVmlldyh0bXAsIHRydWUsIGZhbHNlKTtcclxuICAgIC8vIEdvIGJhY2sgdG8gZGF5c1xyXG4gICAgdGhpcy5vcGVuKG51bGwsICdkYXlzJyk7XHJcbiAgfVxyXG5cclxuICBzZXRZZWFyKHllYXI6IG51bWJlcik6IHZvaWQge1xyXG4gICAgY29uc3QgZGF0ZSA9IHRoaXMubW9udGggPyB0aGlzLm1vbnRoIDogbmV3IERhdGUoKTtcclxuICAgIGNvbnN0IHRtcCA9IGRhdGVGbnMuc2V0WWVhcihkYXRlLCB5ZWFyKTtcclxuICAgIHRoaXMudXBkYXRlVmlldyh0bXAsIHRydWUsIGZhbHNlKTtcclxuICAgIC8vIEdvIGJhY2sgdG8gZGF5c1xyXG4gICAgdGhpcy5vcGVuKG51bGwsICdkYXlzJyk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3QoZXZlbnQ6IEV2ZW50LCBkYXk6IERheSwgZmlyZUV2ZW50czogYm9vbGVhbikge1xyXG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xyXG4gICAgaWYgKHRoaXMucmFuZ2UpIHtcclxuICAgICAgaWYgKHRoaXMud2Vla1JhbmdlU2VsZWN0KSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGRhdGVGbnMuc3RhcnRPZldlZWsoZGF5LmRhdGUsIHsgd2Vla1N0YXJ0c09uOiB0aGlzLndlZWtTdGFydCB9KTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkMiA9IGRhdGVGbnMuZW5kT2ZXZWVrKGRheS5kYXRlLCB7IHdlZWtTdGFydHNPbjogdGhpcy53ZWVrU3RhcnQgfSk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZExhYmVsID0gdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQodGhpcy5zZWxlY3RlZCwge1xyXG4gICAgICAgICAgbW9udGg6ICdzaG9ydCcsXHJcbiAgICAgICAgICBkYXk6ICcyLWRpZ2l0JyxcclxuICAgICAgICAgIHllYXI6ICdudW1lcmljJyxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkMkxhYmVsID0gdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQodGhpcy5zZWxlY3RlZDIsIHtcclxuICAgICAgICAgIG1vbnRoOiAnc2hvcnQnLFxyXG4gICAgICAgICAgZGF5OiAnMi1kaWdpdCcsXHJcbiAgICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRvIGZpcmUgdGhpcywgc2luY2Ugd2UgZGVmYXVsdCB0byB0aGUgY3VycmVudCB3ZWVrIHNlbGVjdGVkIVxyXG4gICAgICAgIGlmICghZmlyZUV2ZW50cyAmJiB0aGlzLndlZWtSYW5nZVNlbGVjdCkge1xyXG4gICAgICAgICAgdGhpcy5maXJlUmFuZ2VTZWxlY3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5yYW5nZVNlbGVjdE1vZGUgPT09ICdzdGFydERhdGUnKSB7XHJcbiAgICAgICAgLy8gU0VUIFNUQVJUIERBVEVcclxuICAgICAgICB0aGlzLnNlbGVjdGVkID0gZGF0ZUZucy5zdGFydE9mRGF5KGRheS5kYXRlKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkTGFiZWwgPSB0aGlzLmxhYmVscy5mb3JtYXREYXRlV2l0aEZvcm1hdCh0aGlzLnNlbGVjdGVkLCB7XHJcbiAgICAgICAgICBtb250aDogJ3Nob3J0JyxcclxuICAgICAgICAgIGRheTogJzItZGlnaXQnLFxyXG4gICAgICAgICAgeWVhcjogJ251bWVyaWMnLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkMiAmJiBkYXRlRm5zLmlzQWZ0ZXIoZGF5LmRhdGUsIHRoaXMuc2VsZWN0ZWQyKSkge1xyXG4gICAgICAgICAgLy8gQ0xFQVIgRU5EIERBVEVcclxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQyID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQyTGFiZWwgPSB0aGlzLmxhYmVscy5lbmREYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgICAgIHRoaXMucmFuZ2VTZWxlY3RNb2RlID0gJ2VuZERhdGUnO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLnJhbmdlU2VsZWN0TW9kZSA9PT0gJ2VuZERhdGUnKSB7XHJcbiAgICAgICAgLy8gU0VUIEVORCBEQVRFXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZDIgPSBkYXRlRm5zLmVuZE9mRGF5KGRheS5kYXRlKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkMkxhYmVsID0gdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQodGhpcy5zZWxlY3RlZDIsIHtcclxuICAgICAgICAgIG1vbnRoOiAnc2hvcnQnLFxyXG4gICAgICAgICAgZGF5OiAnMi1kaWdpdCcsXHJcbiAgICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQgJiYgZGF0ZUZucy5pc0JlZm9yZShkYXkuZGF0ZSwgdGhpcy5zZWxlY3RlZCkpIHtcclxuICAgICAgICAgIC8vIENMRUFSIFNUQVJUIERBVEVcclxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZExhYmVsID0gdGhpcy5sYWJlbHMuc3RhcnREYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgICAgIHRoaXMucmFuZ2VTZWxlY3RNb2RlID0gJ3N0YXJ0RGF0ZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkID0gZGF5LmRhdGU7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRMYWJlbCA9IHRoaXMubGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KHRoaXMuc2VsZWN0ZWQsIHtcclxuICAgICAgICBtb250aDogJ3Nob3J0JyxcclxuICAgICAgICBkYXk6ICcyLWRpZ2l0JyxcclxuICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLnVwZGF0ZUhlYWRpbmcoKTtcclxuICAgIH1cclxuICAgIGlmIChmaXJlRXZlbnRzICYmIHRoaXMuc2VsZWN0ZWQpIHtcclxuICAgICAgLy8gRW1pdCBvdXIgb3V0cHV0XHJcbiAgICAgIGlmICh0aGlzLnJhbmdlICYmIHRoaXMuc2VsZWN0ZWQgJiYgdGhpcy5zZWxlY3RlZDIpIHtcclxuICAgICAgICB0aGlzLmZpcmVSYW5nZVNlbGVjdCgpO1xyXG4gICAgICAgIC8vIEFsc28sIHVwZGF0ZSB0aGUgbmdNb2RlbFxyXG4gICAgICAgIHRoaXMuX29uQ2hhbmdlKHtcclxuICAgICAgICAgIHN0YXJ0RGF0ZTogdGhpcy5zZWxlY3RlZCxcclxuICAgICAgICAgIGVuZERhdGU6IHRoaXMuc2VsZWN0ZWQyID8gdGhpcy5zZWxlY3RlZDIgOiBudWxsLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSB7XHJcbiAgICAgICAgICBzdGFydERhdGU6IHRoaXMuc2VsZWN0ZWQsXHJcbiAgICAgICAgICBlbmREYXRlOiB0aGlzLnNlbGVjdGVkMiA/IHRoaXMuc2VsZWN0ZWQyIDogbnVsbCxcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXRoaXMucmFuZ2UpIHtcclxuICAgICAgICB0aGlzLm9uU2VsZWN0Lm5leHQoe1xyXG4gICAgICAgICAgbW9udGg6IHRoaXMubGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KHRoaXMuc2VsZWN0ZWQsIHsgbW9udGg6ICdsb25nJyB9KSxcclxuICAgICAgICAgIHllYXI6IHRoaXMuc2VsZWN0ZWQuZ2V0RnVsbFllYXIoKSxcclxuICAgICAgICAgIGRheTogdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQodGhpcy5zZWxlY3RlZCwgeyB3ZWVrZGF5OiAnbG9uZycgfSksXHJcbiAgICAgICAgICBkYXRlOiB0aGlzLnNlbGVjdGVkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIEFsc28sIHVwZGF0ZSB0aGUgbmdNb2RlbFxyXG4gICAgICAgIHRoaXMuX29uQ2hhbmdlKHRoaXMuc2VsZWN0ZWQpO1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSB0aGlzLnNlbGVjdGVkO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmaXJlUmFuZ2VTZWxlY3QoKSB7XHJcbiAgICAvLyBNYWtlIHN1cmUgdGhlIHN0YXJ0IGRhdGUgaXMgYmVmb3JlIHRoZSBlbmQgZGF0ZVxyXG4gICAgaWYgKGRhdGVGbnMuaXNCZWZvcmUodGhpcy5zZWxlY3RlZCwgdGhpcy5zZWxlY3RlZDIpKSB7XHJcbiAgICAgIHRoaXMub25TZWxlY3QubmV4dCh7XHJcbiAgICAgICAgc3RhcnREYXRlOiB7XHJcbiAgICAgICAgICBtb250aDogdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQodGhpcy5zZWxlY3RlZCwgeyBtb250aDogJ2xvbmcnIH0pLFxyXG4gICAgICAgICAgeWVhcjogdGhpcy5zZWxlY3RlZC5nZXRGdWxsWWVhcigpLFxyXG4gICAgICAgICAgZGF5OiB0aGlzLmxhYmVscy5mb3JtYXREYXRlV2l0aEZvcm1hdCh0aGlzLnNlbGVjdGVkLCB7IHdlZWtkYXk6ICdsb25nJyB9KSxcclxuICAgICAgICAgIGRhdGU6IHRoaXMuc2VsZWN0ZWQsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbmREYXRlOiB7XHJcbiAgICAgICAgICBtb250aDogdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQodGhpcy5zZWxlY3RlZDIsIHsgbW9udGg6ICdsb25nJyB9KSxcclxuICAgICAgICAgIHllYXI6IHRoaXMuc2VsZWN0ZWQyLmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgICBkYXk6IHRoaXMubGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KHRoaXMuc2VsZWN0ZWQyLCB7IHdlZWtkYXk6ICdsb25nJyB9KSxcclxuICAgICAgICAgIGRhdGU6IHRoaXMuc2VsZWN0ZWQyLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb3BlbihldmVudDogRXZlbnQsIHR5cGU6IHN0cmluZykge1xyXG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xyXG5cclxuICAgIC8vIElmIHRoZXkgY2xpY2sgdGhlIHRvZ2dsZSB0d28gdGltZSBpbiBhIHJvdywgY2xvc2UgaXQgKGdvIGJhY2sgdG8gZGF5cylcclxuICAgIGlmICh0eXBlID09PSB0aGlzLnZpZXcpIHtcclxuICAgICAgdGhpcy52aWV3ID0gJ2RheXMnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy52aWV3ID0gdHlwZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNYWtlIHN1cmUgdG8gc2Nyb2xsIHRoZSBzZWxlY3RlZCBvbmUgaW50byB2aWV3XHJcbiAgICBpZiAodGhpcy52aWV3ID09PSAneWVhcnMnIHx8IHRoaXMudmlldyA9PT0gJ21vbnRocycpIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihgLmNhbGVuZGFyLWNvbnRlbnQuJHt0aGlzLnZpZXd9YCk7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRJdGVtID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgICAgIGAuY2FsZW5kYXItY29udGVudC4ke3RoaXMudmlld30gLiR7dGhpcy52aWV3ID09PSAneWVhcnMnID8gJ3llYXInIDogJ21vbnRoJ30uc2VsZWN0ZWRgLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKGNvbnRhaW5lciAmJiBzZWxlY3RlZEl0ZW0pIHtcclxuICAgICAgICAgIGNvbnRhaW5lci5zY3JvbGxUb3AgPSBzZWxlY3RlZEl0ZW0ub2Zmc2V0VG9wIC0gMTAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51cGRhdGVIZWFkaW5nKCk7XHJcbiAgfVxyXG5cclxuICBwcmV2TW9udGgoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XHJcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XHJcbiAgICBjb25zdCB0bXAgPSBkYXRlRm5zLnN1Yk1vbnRocyh0aGlzLm1vbnRoLCAxKTtcclxuICAgIHRoaXMudXBkYXRlVmlldyh0bXAsIGZhbHNlLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBuZXh0TW9udGgoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XHJcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XHJcbiAgICBjb25zdCB0bXAgPSBkYXRlRm5zLmFkZE1vbnRocyh0aGlzLm1vbnRoLCAxKTtcclxuICAgIHRoaXMudXBkYXRlVmlldyh0bXAsIGZhbHNlLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVIZWFkaW5nKCkge1xyXG4gICAgaWYgKCF0aGlzLnNlbGVjdGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuaGVhZGluZyA9IHtcclxuICAgICAgbW9udGg6IHRoaXMubGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KHRoaXMuc2VsZWN0ZWQsIHsgbW9udGg6ICdsb25nJyB9KSxcclxuICAgICAgeWVhcjogdGhpcy5zZWxlY3RlZC5nZXRGdWxsWWVhcigpLFxyXG4gICAgICBkYXk6IHRoaXMubGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KHRoaXMuc2VsZWN0ZWQsIHsgd2Vla2RheTogJ2xvbmcnIH0pLFxyXG4gICAgICBkYXRlOiB0aGlzLnNlbGVjdGVkLmdldERhdGUoKSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIHRpbWUgYXNwZWN0IG9mIHRoZSBkYXRlXHJcbiAgICogQHJldHVybnMgd2l0aCB0aW1lIHN0cmlwcGVkIG91dFxyXG4gICAqL1xyXG4gIHJlbW92ZVRpbWUoZGF0ZTogYW55KTogRGF0ZSB7XHJcbiAgICBjb25zdCByZXQgPSBuZXcgRGF0ZShkYXRlKTtcclxuICAgIHJldC5zZXRIb3VycygxMik7XHJcbiAgICByZXQuc2V0U2Vjb25kcygwKTtcclxuICAgIHJldC5zZXRNaWxsaXNlY29uZHMoMCk7XHJcbiAgICByZXR1cm4gcmV0O1xyXG4gIH1cclxuXHJcbiAgYnVpbGRNb250aChzdGFydDogRGF0ZSwgbW9udGg6IERhdGUpIHtcclxuICAgIC8vIFJlc2V0IHRoZSB3ZWVrc1xyXG4gICAgdGhpcy53ZWVrcyA9IFtdO1xyXG5cclxuICAgIC8vIEhvdXNlIGtlZXBpbmcgdmFyaWFibGVzIHRvIGtub3cgd2hlbiB3ZSBhcmUgZG9uZSBidWlsZGluZyB0aGUgbW9udGhcclxuICAgIGxldCBkb25lID0gZmFsc2U7XHJcbiAgICBsZXQgZGF0ZSA9IGRhdGVGbnMuc3RhcnRPZldlZWsoc3RhcnQsIHsgd2Vla1N0YXJ0c09uOiB0aGlzLndlZWtTdGFydCB9KTtcclxuICAgIGxldCBtb250aEluZGV4ID0gZGF0ZS5nZXRNb250aCgpO1xyXG4gICAgbGV0IGNvdW50ID0gMDtcclxuXHJcbiAgICB3aGlsZSAoIWRvbmUpIHtcclxuICAgICAgLy8gQnVpbGQgdGhlIGRheXMgZm9yIHRoZSB3ZWVrc1xyXG4gICAgICB0aGlzLndlZWtzLnB1c2goeyBkYXlzOiB0aGlzLmJ1aWxkV2VlayhuZXcgRGF0ZShkYXRlLmdldFRpbWUoKSksIG1vbnRoKSB9KTtcclxuXHJcbiAgICAgIC8vIEluY3JlbWVudCB2YXJpYWJsZXMgZm9yIHRoZSBuZXh0IGl0ZXJhdGlvblxyXG4gICAgICBkYXRlID0gZGF0ZUZucy5hZGREYXlzKGRhdGUsIDcpO1xyXG4gICAgICBkb25lID0gY291bnQrKyA+IDIgJiYgbW9udGhJbmRleCAhPT0gZGF0ZS5nZXRNb250aCgpO1xyXG4gICAgICBtb250aEluZGV4ID0gZGF0ZS5nZXRNb250aCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYnVpbGRXZWVrKGRhdGU6IERhdGUsIG1vbnRoOiBEYXRlKTogQXJyYXk8T2JqZWN0PiB7XHJcbiAgICAvLyBCdWlsZCBvdXQgb2YgdGhlIGRheXMgb2YgdGhlIHdlZWtcclxuICAgIGNvbnN0IGRheXMgPSBbXTtcclxuXHJcbiAgICAvLyBJdGVyYXRlIG92ZXIgdGhlIGRheXMgb2YgdGhlIHdlZWtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XHJcbiAgICAgIC8vIFB1c2ggYSB2YXJpYWJsZSBvbiB0aGUgZGF5IGFycmF5IHdpdGggbG90cyBvZiBoZWxwZXJzIHRvIG1ha2UgdGhlIHRlbXBsYXRlIGVhc2llclxyXG4gICAgICBkYXlzLnB1c2goe1xyXG4gICAgICAgIG5hbWU6IHRoaXMud2Vla2RheXNbaV0sXHJcbiAgICAgICAgbnVtYmVyOiBkYXRlLmdldERhdGUoKSxcclxuICAgICAgICBpc1RvZGF5OiBkYXRlRm5zLmlzVG9kYXkoZGF0ZSksXHJcbiAgICAgICAgZGF0ZSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBJbmNyZW1lbnQgZm9yIHRoZSBuZXh0IGl0ZXJhdGlvblxyXG4gICAgICBkYXRlID0gZGF0ZUZucy5hZGREYXlzKGRhdGUsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkYXlzO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlUmFuZ2VTZWxlY3QocmFuZ2U6IHJhbmdlU2VsZWN0TW9kZXMpOiB2b2lkIHtcclxuICAgIHRoaXMucmFuZ2VTZWxlY3RNb2RlID0gcmFuZ2U7XHJcbiAgfVxyXG5cclxuICByYW5nZUhvdmVyKGV2ZW50OiBFdmVudCwgZGF5OiBEYXkpOiB2b2lkIHtcclxuICAgIHRoaXMuaG92ZXJEYXkgPSBkYXkuZGF0ZTtcclxuICB9XHJcblxyXG4gIC8vIFZhbHVlQWNjZXNzb3IgRnVuY3Rpb25zXHJcbiAgd3JpdGVWYWx1ZShtb2RlbDogbW9kZWxUeXBlcyk6IHZvaWQge1xyXG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xyXG4gICAgaWYgKEhlbHBlcnMuaXNEYXRlKG1vZGVsKSkge1xyXG4gICAgICB0aGlzLnVwZGF0ZVZpZXcobW9kZWwsIGZhbHNlLCB0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcclxuICB9XHJcbn1cclxuIl19