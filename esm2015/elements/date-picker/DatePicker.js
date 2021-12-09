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
                            <button [title]="isDisabled(day.date, start, end) ? disabledDateMessage : ''" class="day" [attr.data-automation-id]="day.number" [disabled]="isDisabled(day.date, start, end)" (click)="select($event, day, true)">{{day.number}}</button>
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
    disabledDateMessage: [{ type: Input }],
    onSelect: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9kYXRlLXBpY2tlci9EYXRlUGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQ0wsVUFBVSxFQUNWLFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEdBS1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakYsU0FBUztBQUNULE9BQU8sS0FBSyxPQUFPLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE1BQU07QUFDTixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFckUsc0RBQXNEO0FBQ3RELE1BQU0sMEJBQTBCLEdBQUc7SUFDakMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixDQUFDO0lBQ3BELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQStIRixNQUFNLE9BQU8scUJBQXFCO0lBK0NoQyxZQUFtQixNQUF3QixFQUFVLE9BQW1CO1FBQXJELFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQS9CeEUsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUd0Qiw2QkFBNkI7UUFFN0IsYUFBUSxHQUFzQixJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMs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QkFDSixTQUFTLEVBQUUsa0JBQWtCO3lCQUM5QixDQUFDLENBQ0g7d0JBQ0QsVUFBVSxDQUFDLHVCQUF1QixFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztxQkFDOUQsQ0FBQztpQkFDSDtnQkFDRCxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXlEUDthQUNKOzs7WUFySVEsZ0JBQWdCO1lBakJ2QixVQUFVOzs7c0JBd0pULEtBQUs7c0JBRUwsS0FBSztvQkFFTCxLQUFLO2tCQUVMLEtBQUs7cUJBRUwsS0FBSztvQkFFTCxLQUFLOzhCQUVMLEtBQUs7d0JBRUwsS0FBSztrQ0FFTCxLQUFLO3VCQUdMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7XG4gIEVsZW1lbnRSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBPbkluaXQsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IGFuaW1hdGUsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuLy8gVmVuZG9yXG5pbXBvcnQgKiBhcyBkYXRlRm5zIGZyb20gJ2RhdGUtZm5zJztcbi8vIEFQUFxuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5cbi8vIFZhbHVlIGFjY2Vzc29yIGZvciB0aGUgY29tcG9uZW50IChzdXBwb3J0cyBuZ01vZGVsKVxuY29uc3QgREFURV9QSUNLRVJfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvRGF0ZVBpY2tlckVsZW1lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmFuZ2VNb2RhbCB7XG4gIHN0YXJ0RGF0ZTogRGF0ZTtcbiAgZW5kRGF0ZTogRGF0ZTtcbn1cbmV4cG9ydCB0eXBlIG1vZGVsVHlwZXMgPSBEYXRlIHwgUmFuZ2VNb2RhbDtcblxuZXhwb3J0IGludGVyZmFjZSBEYXkge1xuICBkYXRlOiBEYXRlO1xuICBpc0N1cnJlbnRNb250aD86IGJvb2xlYW47XG4gIGlzVG9kYXk/OiBib29sZWFuO1xuICBuYW1lPzogc3RyaW5nO1xuICBudW1iZXI/OiBzdHJpbmcgfCBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIHJhbmdlU2VsZWN0TW9kZXMgPSAnc3RhcnREYXRlJyB8ICdlbmREYXRlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1kYXRlLXBpY2tlcicsXG4gIHByb3ZpZGVyczogW0RBVEVfUElDS0VSX1ZBTFVFX0FDQ0VTU09SXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ3N0YXJ0RGF0ZVRleHRTdGF0ZScsIFtcbiAgICAgIHN0YXRlKFxuICAgICAgICAnc3RhcnREYXRlJyxcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIG9wYWNpdHk6ICcxLjAnLFxuICAgICAgICB9KSxcbiAgICAgICksXG4gICAgICBzdGF0ZShcbiAgICAgICAgJ2VuZERhdGUnLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogJzAuNicsXG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oJ3N0YXJ0RGF0ZSA8PT4gZW5kRGF0ZScsIGFuaW1hdGUoJzIwMG1zIGVhc2UtaW4nKSksXG4gICAgXSksXG4gICAgdHJpZ2dlcignZW5kRGF0ZVRleHRTdGF0ZScsIFtcbiAgICAgIHN0YXRlKFxuICAgICAgICAnc3RhcnREYXRlJyxcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIG9wYWNpdHk6ICcwLjYnLFxuICAgICAgICB9KSxcbiAgICAgICksXG4gICAgICBzdGF0ZShcbiAgICAgICAgJ2VuZERhdGUnLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogJzEuMCcsXG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oJ3N0YXJ0RGF0ZSA8PT4gZW5kRGF0ZScsIGFuaW1hdGUoJzIwMG1zIGVhc2UtaW4nKSksXG4gICAgXSksXG4gICAgdHJpZ2dlcignaW5kaWNhdG9yU3RhdGUnLCBbXG4gICAgICBzdGF0ZShcbiAgICAgICAgJ3N0YXJ0RGF0ZScsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDAlKScsXG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICAgIHN0YXRlKFxuICAgICAgICAnZW5kRGF0ZScsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDEwMCUpJyxcbiAgICAgICAgfSksXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbignc3RhcnREYXRlIDw9PiBlbmREYXRlJywgYW5pbWF0ZSgnMjAwbXMgZWFzZS1pbicpKSxcbiAgICBdKSxcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhbGVuZGFyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItdG9wXCIgKm5nSWY9XCIhaW5saW5lICYmICFyYW5nZVwiPlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cImRheVwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJoZWFkaW5nPy5kYXlcIj57e2hlYWRpbmc/LmRheX19PC9oND5cbiAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJtb250aFwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJoZWFkaW5nPy5tb250aFwiPnt7aGVhZGluZz8ubW9udGh9fTwvaDI+XG4gICAgICAgICAgICAgICAgPGgxIGNsYXNzPVwiZGF0ZVwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJoZWFkaW5nPy5kYXRlXCI+e3toZWFkaW5nPy5kYXRlfX08L2gxPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInllYXJcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiaGVhZGluZz8ueWVhclwiPnt7aGVhZGluZz8ueWVhcn19PC9oMz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGUtcmFuZ2UtdGFic1wiICpuZ0lmPVwicmFuZ2VcIiBbY2xhc3Mud2Vlay1zZWxlY3QtbW9kZV09XCJ3ZWVrUmFuZ2VTZWxlY3RcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInJhbmdlLXRhYlwiIChjbGljayk9XCJ0b2dnbGVSYW5nZVNlbGVjdCgnc3RhcnREYXRlJylcIiBbQHN0YXJ0RGF0ZVRleHRTdGF0ZV09XCJyYW5nZVNlbGVjdE1vZGVcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJjYWxlbmRhci1zdGFydC1kYXRlXCI+e3tzZWxlY3RlZExhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJyYW5nZS10YWJcIiAoY2xpY2spPVwidG9nZ2xlUmFuZ2VTZWxlY3QoJ2VuZERhdGUnKVwiIFtAZW5kRGF0ZVRleHRTdGF0ZV09XCJyYW5nZVNlbGVjdE1vZGVcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJjYWxlbmRhci1lbmQtZGF0ZVwiPnt7c2VsZWN0ZWQyTGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImluZGljYXRvclwiIFtAaW5kaWNhdG9yU3RhdGVdPVwicmFuZ2VTZWxlY3RNb2RlXCI+PC9pPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcmV2aW91c1wiIChjbGljayk9XCJwcmV2TW9udGgoJGV2ZW50KVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cImNhbGVuZGFyLXByZXZpb3VzXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGVhZGluZ1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1vbnRoXCIgKGNsaWNrKT1cIm9wZW4oJGV2ZW50LCAnbW9udGhzJylcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJoZWFkZXItbW9udGhcIj57e21vbnRoTGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ5ZWFyXCIgKGNsaWNrKT1cIm9wZW4oJGV2ZW50LCAneWVhcnMnKVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cImhlYWRlci15ZWFyXCI+e3ttb250aD8uZ2V0RnVsbFllYXIoKX19PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5leHRcIiAoY2xpY2spPVwibmV4dE1vbnRoKCRldmVudClcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJjYWxlbmRhci1uZXh0XCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJjYWxlbmRhci1jb250ZW50IGRheXNcIiBjZWxsc3BhY2luZz1cIjBcIiBjZWxscGFkZGluZz1cIjBcIiBbaGlkZGVuXT1cIiEodmlldz09J2RheXMnKVwiPlxuICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoICpuZ0Zvcj1cImxldCBkYXkgb2Ygd2Vla2RheXNcIiB0aXRsZT1cInt7ZGF5fX1cIiBjbGFzcz1cIndlZWtkYXlcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiZGF5LnN1YnN0cigwLCAyKVwiPnt7ZGF5LnN1YnN0cigwLCAyKX19PC90aD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgPHRyICpuZ0Zvcj1cImxldCB3ZWVrIG9mIHdlZWtzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgKm5nRm9yPVwibGV0IGRheSBvZiB3ZWVrLmRheXNcIiBbbmdDbGFzc109XCJ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9kYXk6IGRheS5pc1RvZGF5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdub3Rpbm1vbnRoJzogZGF5LmRhdGUuZ2V0TW9udGgoKSAhPT0gdGhpcy5tb250aC5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBpc1NlbGVjdGVkKHJhbmdlLCBkYXkuZGF0ZSwgc2VsZWN0ZWQsIHNlbGVjdGVkMiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbGVyOiBpc0ZpbGxlcihyYW5nZSwgZGF5LmRhdGUsIHNlbGVjdGVkLCBzZWxlY3RlZDIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0ZmlsbDogaXNTdGFydEZpbGwocmFuZ2UsIGRheS5kYXRlLCBzZWxlY3RlZCwgc2VsZWN0ZWQyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRmaWxsOiBpc0VuZEZpbGwocmFuZ2UsIGRheS5kYXRlLCBzZWxlY3RlZCwgc2VsZWN0ZWQyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc2VsZWN0aW5nLXJhbmdlJzogaXNTZWxlY3RpbmdSYW5nZShyYW5nZSwgZGF5LmRhdGUsIHNlbGVjdGVkLCBzZWxlY3RlZDIsIGhvdmVyRGF5LCByYW5nZVNlbGVjdE1vZGUsIHdlZWtSYW5nZVNlbGVjdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cIiAobW91c2VvdmVyKT1cInJhbmdlSG92ZXIoJGV2ZW50LCBkYXkpXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImRheS5udW1iZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIFt0aXRsZV09XCJpc0Rpc2FibGVkKGRheS5kYXRlLCBzdGFydCwgZW5kKSA/IGRpc2FibGVkRGF0ZU1lc3NhZ2UgOiAnJ1wiIGNsYXNzPVwiZGF5XCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImRheS5udW1iZXJcIiBbZGlzYWJsZWRdPVwiaXNEaXNhYmxlZChkYXkuZGF0ZSwgc3RhcnQsIGVuZClcIiAoY2xpY2spPVwic2VsZWN0KCRldmVudCwgZGF5LCB0cnVlKVwiPnt7ZGF5Lm51bWJlcn19PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjYWxlbmRhci1jb250ZW50IG1vbnRoc1wiIFtoaWRkZW5dPVwidmlldyAhPT0gJ21vbnRocydcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBtb250aCBvZiBtb250aHM7bGV0IGkgPSBpbmRleFwiIChjbGljayk9XCJzZXRNb250aChpKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9udGhcIiBbbmdDbGFzc109XCJ7c2VsZWN0ZWQ6IGkgPT09IHNlbGVjdGVkPy5nZXRNb250aCgpfVwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJtb250aFwiPnt7bW9udGh9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjYWxlbmRhci1jb250ZW50IHllYXJzXCIgW2hpZGRlbl09XCJ2aWV3ICE9PSAneWVhcnMnXCI+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgeWVhciBvZiB5ZWFyc1wiIChjbGljayk9XCJzZXRZZWFyKHllYXIpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ5ZWFyXCIgW25nQ2xhc3NdPVwie3NlbGVjdGVkOiB5ZWFyID09IHNlbGVjdGVkPy5nZXRGdWxsWWVhcigpfVwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJ5ZWFyXCI+e3t5ZWFyfX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYWxlbmRhci1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiAoY2xpY2spPVwic2V0VG9kYXkoKVwiIGNsYXNzPVwidG9kYXlcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJjYWxlbmRhci10b2RheVwiPnt7IGxhYmVscy50b2RheSB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGF0ZVBpY2tlckVsZW1lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKVxuICBtaW5ZZWFyOiBzdHJpbmcgfCBudW1iZXI7XG4gIEBJbnB1dCgpXG4gIG1heFllYXI6IHN0cmluZyB8IG51bWJlcjtcbiAgQElucHV0KClcbiAgc3RhcnQ6IERhdGU7XG4gIEBJbnB1dCgpXG4gIGVuZDogRGF0ZTtcbiAgQElucHV0KClcbiAgaW5saW5lOiBib29sZWFuO1xuICBASW5wdXQoKVxuICByYW5nZTogYm9vbGVhbjtcbiAgQElucHV0KClcbiAgd2Vla1JhbmdlU2VsZWN0OiBib29sZWFuO1xuICBASW5wdXQoKVxuICB3ZWVrU3RhcnQ6IG51bWJlciA9IDA7XG4gIEBJbnB1dCgpXG4gIGRpc2FibGVkRGF0ZU1lc3NhZ2U6IHN0cmluZztcbiAgLy8gU2VsZWN0IGNhbGxiYWNrIGZvciBvdXRwdXRcbiAgQE91dHB1dCgpXG4gIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoZmFsc2UpO1xuXG4gIC8vIExpc3Qgb2YgYWxsIHRoZSB3ZWVrZGF5c1xuICB3ZWVrZGF5czogc3RyaW5nW10gPSBbXTtcbiAgLy8gTGlzdCBvZiBhbGwgbW9udGhzXG4gIG1vbnRoczogc3RyaW5nW10gPSBbXTtcbiAgLy8gTGlzdCBvZiBhbGwgeWVhcnMgKGdlbmVyYXRlZCBpbiBuZ09uSW5pdClcbiAgeWVhcnM6IEFycmF5PGFueT4gPSBbXTtcbiAgLy8gRGVmYXVsdCB2aWV3IG1vZGUgKHNlbGVjdCBkYXlzKVxuICB2aWV3OiBzdHJpbmcgPSAnZGF5cyc7XG4gIGhlYWRpbmc6IGFueTtcblxuICBtb2RlbDogbW9kZWxUeXBlcztcbiAgbW9udGg6IERhdGU7XG4gIG1vbnRoTGFiZWw6IHN0cmluZztcbiAgd2Vla3M6IGFueTtcbiAgc2VsZWN0ZWQ6IERhdGU7XG4gIHNlbGVjdGVkTGFiZWw6IHN0cmluZztcbiAgc2VsZWN0ZWQyOiBEYXRlO1xuICBzZWxlY3RlZDJMYWJlbDogc3RyaW5nO1xuICBob3ZlckRheTogYW55O1xuXG4gIHJhbmdlU2VsZWN0TW9kZTogcmFuZ2VTZWxlY3RNb2RlcyA9ICdzdGFydERhdGUnO1xuICBfb25DaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4geyB9O1xuICBfb25Ub3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHsgfTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLCBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIERldGVybWluZSB0aGUgeWVhciBhcnJheVxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3Qgc3RhcnQgPSB0aGlzLm1pblllYXIgPyBOdW1iZXIodGhpcy5taW5ZZWFyKSA6IG5vdy5nZXRGdWxsWWVhcigpIC0gMTAwO1xuICAgIGNvbnN0IGVuZCA9IHRoaXMubWF4WWVhciA/IE51bWJlcih0aGlzLm1heFllYXIpIDogbm93LmdldEZ1bGxZZWFyKCkgKyAxMDtcblxuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8PSBlbmQ7IGkrKykge1xuICAgICAgdGhpcy55ZWFycy5wdXNoKGkpO1xuICAgIH1cblxuICAgIC8vIFNldCB3ZWVrZGF5cyAvIG1vbnRoc1xuICAgIHRoaXMud2Vla2RheXMgPSB0aGlzLnNldHVwV2Vla2RheXMoKTtcbiAgICB0aGlzLm1vbnRocyA9IHRoaXMubGFiZWxzLmdldE1vbnRocygpO1xuXG4gICAgLy8gU2V0IGxhYmVsc1xuICAgIHRoaXMuc2VsZWN0ZWRMYWJlbCA9IHRoaXMubGFiZWxzLnN0YXJ0RGF0ZTtcbiAgICB0aGlzLnNlbGVjdGVkMkxhYmVsID0gdGhpcy5sYWJlbHMuZW5kRGF0ZTtcbiAgICB0aGlzLnVwZGF0ZVZpZXcodGhpcy5tb2RlbCwgZmFsc2UsIHRydWUpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHdlZWtSYW5nZVNlbGVjdENoYW5nZTogU2ltcGxlQ2hhbmdlID0gY2hhbmdlc1snd2Vla1JhbmdlU2VsZWN0J107XG4gICAgaWYgKFxuICAgICAgd2Vla1JhbmdlU2VsZWN0Q2hhbmdlICYmXG4gICAgICB3ZWVrUmFuZ2VTZWxlY3RDaGFuZ2UuY3VycmVudFZhbHVlICE9PSB3ZWVrUmFuZ2VTZWxlY3RDaGFuZ2UucHJldmlvdXNWYWx1ZSAmJlxuICAgICAgIXdlZWtSYW5nZVNlbGVjdENoYW5nZS5maXJzdENoYW5nZVxuICAgICkge1xuICAgICAgdGhpcy5jbGVhclJhbmdlKCk7XG4gICAgfVxuICAgIGNvbnN0IHdlZWtTdGFydENoYW5nZXM6IFNpbXBsZUNoYW5nZSA9IGNoYW5nZXNbJ3dlZWtTdGFydCddO1xuICAgIGlmICh3ZWVrU3RhcnRDaGFuZ2VzICYmIHdlZWtTdGFydENoYW5nZXMuY3VycmVudFZhbHVlICE9PSB3ZWVrU3RhcnRDaGFuZ2VzLnByZXZpb3VzVmFsdWUgJiYgIXdlZWtTdGFydENoYW5nZXMuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMud2Vla2RheXMgPSB0aGlzLnNldHVwV2Vla2RheXMoKTtcbiAgICAgIHRoaXMudXBkYXRlVmlldyh0aGlzLm1vZGVsLCBmYWxzZSwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIHNldHVwV2Vla2RheXMoKTogc3RyaW5nW10ge1xuICAgIGxldCB3ZWVrZGF5cyA9IHRoaXMubGFiZWxzLmdldFdlZWtkYXlzKCk7XG4gICAgLy8gV2Vla3N0YXJ0IG11c3QgYmUgMC02IChTdW5kYXkgLSBTYXR1cmRheSlcbiAgICBpZiAoIUhlbHBlcnMuaXNCbGFuayh0aGlzLndlZWtTdGFydCkgJiYgdGhpcy53ZWVrU3RhcnQgPiAwICYmIHRoaXMud2Vla1N0YXJ0IDw9IDYpIHtcbiAgICAgIGNvbnN0IG5ld1N0YXJ0ID0gd2Vla2RheXMuc3BsaWNlKHRoaXMud2Vla1N0YXJ0KTtcbiAgICAgIHdlZWtkYXlzID0gWy4uLm5ld1N0YXJ0LCAuLi53ZWVrZGF5c107XG4gICAgfVxuICAgIHJldHVybiB3ZWVrZGF5cztcbiAgfVxuXG4gIGlzU2VsZWN0aW5nUmFuZ2UocmFuZ2UsIGRheSwgc2VsZWN0ZWQsIHNlbGVjdGVkMiwgaG92ZXJEYXksIHJhbmdlU2VsZWN0TW9kZSwgd2Vla1JhbmdlU2VsZWN0KSB7XG4gICAgaWYgKHJhbmdlICYmICF3ZWVrUmFuZ2VTZWxlY3QpIHtcbiAgICAgIGNvbnN0IGlzUmFuZ2VNb2RlRW5kRGF0ZSA9XG4gICAgICAgIHJhbmdlU2VsZWN0TW9kZSA9PT0gJ2VuZERhdGUnICYmIChzZWxlY3RlZCAmJiBzZWxlY3RlZDIgJiYgZGF0ZUZucy5pc0FmdGVyKGRheSwgc2VsZWN0ZWQyKSAmJiBkYXRlRm5zLmlzQmVmb3JlKGRheSwgaG92ZXJEYXkpKTtcbiAgICAgIGNvbnN0IGlzUmFuZ2VNb2RlU3RhcnREYXRlID1cbiAgICAgICAgcmFuZ2VTZWxlY3RNb2RlID09PSAnc3RhcnREYXRlJyAmJiAoc2VsZWN0ZWQgJiYgc2VsZWN0ZWQyICYmIGRhdGVGbnMuaXNCZWZvcmUoZGF5LCBzZWxlY3RlZCkgJiYgZGF0ZUZucy5pc0FmdGVyKGRheSwgaG92ZXJEYXkpKTtcbiAgICAgIGNvbnN0IGlzTm90U2VsZWN0ZWQgPSAhc2VsZWN0ZWQgJiYgc2VsZWN0ZWQyICYmIGRhdGVGbnMuaXNCZWZvcmUoZGF5LCBzZWxlY3RlZDIpICYmIGRhdGVGbnMuaXNBZnRlcihkYXksIGhvdmVyRGF5KTtcbiAgICAgIGNvbnN0IGlzTm90U2VsZWN0ZWQyID0gc2VsZWN0ZWQgJiYgIXNlbGVjdGVkMiAmJiBkYXRlRm5zLmlzQWZ0ZXIoZGF5LCBzZWxlY3RlZCkgJiYgZGF0ZUZucy5pc0JlZm9yZShkYXksIGhvdmVyRGF5KTtcbiAgICAgIHJldHVybiBpc05vdFNlbGVjdGVkMiB8fCBpc05vdFNlbGVjdGVkIHx8IGlzUmFuZ2VNb2RlU3RhcnREYXRlIHx8IGlzUmFuZ2VNb2RlRW5kRGF0ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNFbmRGaWxsKHJhbmdlLCBkYXksIHNlbGVjdGVkLCBzZWxlY3RlZDIpIHtcbiAgICBpZiAocmFuZ2UgJiYgc2VsZWN0ZWQyICYmIHNlbGVjdGVkKSB7XG4gICAgICByZXR1cm4gIWRhdGVGbnMuaXNTYW1lRGF5KHNlbGVjdGVkLCBzZWxlY3RlZDIpICYmIGRhdGVGbnMuaXNTYW1lRGF5KGRheSwgc2VsZWN0ZWQyKSAmJiBkYXRlRm5zLmlzQWZ0ZXIoZGF5LCBzZWxlY3RlZCk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzU3RhcnRGaWxsKHJhbmdlLCBkYXksIHNlbGVjdGVkLCBzZWxlY3RlZDIpIHtcbiAgICBpZiAocmFuZ2UgJiYgc2VsZWN0ZWQyICYmIHNlbGVjdGVkKSB7XG4gICAgICByZXR1cm4gIWRhdGVGbnMuaXNTYW1lRGF5KHNlbGVjdGVkLCBzZWxlY3RlZDIpICYmIGRhdGVGbnMuaXNTYW1lRGF5KGRheSwgc2VsZWN0ZWQpICYmIGRhdGVGbnMuaXNCZWZvcmUoZGF5LCBzZWxlY3RlZDIpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc0ZpbGxlcihyYW5nZSwgZGF5LCBzZWxlY3RlZCwgc2VsZWN0ZWQyKSB7XG4gICAgaWYgKHJhbmdlICYmIHNlbGVjdGVkMiAmJiBzZWxlY3RlZCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgKGRhdGVGbnMuaXNBZnRlcihkYXksIHNlbGVjdGVkKSAmJiBkYXRlRm5zLmlzQmVmb3JlKGRheSwgc2VsZWN0ZWQyKSkgfHxcbiAgICAgICAgZGF0ZUZucy5pc1NhbWVEYXkoZGF5LCBzZWxlY3RlZCkgfHxcbiAgICAgICAgZGF0ZUZucy5pc1NhbWVEYXkoZGF5LCBzZWxlY3RlZDIpXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc1NlbGVjdGVkKHJhbmdlLCBkYXksIHNlbGVjdGVkLCBzZWxlY3RlZDIpIHtcbiAgICBpZiAocmFuZ2UpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGRheSAmJlxuICAgICAgICAoKHNlbGVjdGVkICYmXG4gICAgICAgICAgKGRheS5nZXREYXRlKCkgPT09IHNlbGVjdGVkLmdldERhdGUoKSAmJlxuICAgICAgICAgICAgZGF5LmdldE1vbnRoKCkgPT09IHNlbGVjdGVkLmdldE1vbnRoKCkgJiZcbiAgICAgICAgICAgIGRheS5nZXRGdWxsWWVhcigpID09PSBzZWxlY3RlZC5nZXRGdWxsWWVhcigpKSkgfHxcbiAgICAgICAgICAoc2VsZWN0ZWQyICYmXG4gICAgICAgICAgICAoZGF5LmdldERhdGUoKSA9PT0gc2VsZWN0ZWQyLmdldERhdGUoKSAmJlxuICAgICAgICAgICAgICBkYXkuZ2V0TW9udGgoKSA9PT0gc2VsZWN0ZWQyLmdldE1vbnRoKCkgJiZcbiAgICAgICAgICAgICAgZGF5LmdldEZ1bGxZZWFyKCkgPT09IHNlbGVjdGVkMi5nZXRGdWxsWWVhcigpKSkpXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gZGF5LmdldERhdGUoKSA9PT0gc2VsZWN0ZWQuZ2V0RGF0ZSgpICYmIGRheS5nZXRNb250aCgpID09PSBzZWxlY3RlZC5nZXRNb250aCgpICYmIGRheS5nZXRGdWxsWWVhcigpID09PSBzZWxlY3RlZC5nZXRGdWxsWWVhcigpO1xuICB9XG5cbiAgaXNEaXNhYmxlZChkYXksIHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZGF0ZUZucy5pc0JlZm9yZShkYXksIHN0YXJ0KSB8fCBkYXRlRm5zLmlzQWZ0ZXIoZGF5LCBlbmQpO1xuICB9XG5cbiAgdXBkYXRlVmlldyhkYXRlLCBmaXJlRXZlbnRzOiBib29sZWFuLCBtYXJrZWRTZWxlY3RlZDogYm9vbGVhbikge1xuICAgIGlmIChkYXRlICYmIGRhdGUuc3RhcnREYXRlID09PSBudWxsKSB7XG4gICAgICB0aGlzLmNsZWFyUmFuZ2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFkYXRlKSB7XG4gICAgICAgIHRoaXMuY2xlYXJSYW5nZSgpO1xuICAgICAgfVxuICAgICAgbGV0IHZhbHVlOiBhbnkgPSBkYXRlID8gbmV3IERhdGUoZGF0ZSkgOiBuZXcgRGF0ZSgpO1xuICAgICAgdmFsdWUgPSB0aGlzLnJlbW92ZVRpbWUodmFsdWUpO1xuICAgICAgdGhpcy5tb250aCA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICAgIHRoaXMubW9udGhMYWJlbCA9IHRoaXMubGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KHRoaXMubW9udGgsIHsgbW9udGg6ICdzaG9ydCcgfSk7XG5cbiAgICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUodmFsdWUuZ2V0VGltZSgpKTtcbiAgICAgIHN0YXJ0LnNldERhdGUoMSk7XG4gICAgICB0aGlzLnJlbW92ZVRpbWUoc3RhcnQuc2V0RGF0ZSgxKSk7XG5cbiAgICAgIHRoaXMuYnVpbGRNb250aChzdGFydCwgdGhpcy5tb250aCk7XG5cbiAgICAgIGlmIChtYXJrZWRTZWxlY3RlZCkge1xuICAgICAgICB0aGlzLnNlbGVjdChudWxsLCB7IGRhdGU6IHZhbHVlIH0sIGZpcmVFdmVudHMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldFRvZGF5KCkge1xuICAgIGNvbnN0IHRtcCA9IG5ldyBEYXRlKCk7XG4gICAgdGhpcy51cGRhdGVWaWV3KHRtcCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgLy8gR28gYmFjayB0byBkYXlzXG4gICAgdGhpcy5vcGVuKG51bGwsICdkYXlzJyk7XG4gIH1cblxuICBjbGVhclJhbmdlKCkge1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xuICAgIHRoaXMuc2VsZWN0ZWRMYWJlbCA9IHRoaXMubGFiZWxzLnN0YXJ0RGF0ZTtcbiAgICB0aGlzLnNlbGVjdGVkMiA9IG51bGw7XG4gICAgdGhpcy5zZWxlY3RlZDJMYWJlbCA9IHRoaXMubGFiZWxzLmVuZERhdGU7XG4gIH1cblxuICBzZXRNb250aChtb250aDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgZGF0ZSA9IHRoaXMubW9udGggPyB0aGlzLm1vbnRoIDogbmV3IERhdGUoKTtcbiAgICBjb25zdCB0bXAgPSBkYXRlRm5zLnNldE1vbnRoKGRhdGUsIG1vbnRoKTtcbiAgICB0aGlzLnVwZGF0ZVZpZXcodG1wLCB0cnVlLCBmYWxzZSk7XG4gICAgLy8gR28gYmFjayB0byBkYXlzXG4gICAgdGhpcy5vcGVuKG51bGwsICdkYXlzJyk7XG4gIH1cblxuICBzZXRZZWFyKHllYXI6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGRhdGUgPSB0aGlzLm1vbnRoID8gdGhpcy5tb250aCA6IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgdG1wID0gZGF0ZUZucy5zZXRZZWFyKGRhdGUsIHllYXIpO1xuICAgIHRoaXMudXBkYXRlVmlldyh0bXAsIHRydWUsIGZhbHNlKTtcbiAgICAvLyBHbyBiYWNrIHRvIGRheXNcbiAgICB0aGlzLm9wZW4obnVsbCwgJ2RheXMnKTtcbiAgfVxuXG4gIHNlbGVjdChldmVudDogRXZlbnQsIGRheTogRGF5LCBmaXJlRXZlbnRzOiBib29sZWFuKSB7XG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICBpZiAodGhpcy53ZWVrUmFuZ2VTZWxlY3QpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGRhdGVGbnMuc3RhcnRPZldlZWsoZGF5LmRhdGUsIHsgd2Vla1N0YXJ0c09uOiB0aGlzLndlZWtTdGFydCB9KTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZDIgPSBkYXRlRm5zLmVuZE9mV2VlayhkYXkuZGF0ZSwgeyB3ZWVrU3RhcnRzT246IHRoaXMud2Vla1N0YXJ0IH0pO1xuICAgICAgICB0aGlzLnNlbGVjdGVkTGFiZWwgPSB0aGlzLmxhYmVscy5mb3JtYXREYXRlV2l0aEZvcm1hdCh0aGlzLnNlbGVjdGVkLCB7XG4gICAgICAgICAgbW9udGg6ICdzaG9ydCcsXG4gICAgICAgICAgZGF5OiAnMi1kaWdpdCcsXG4gICAgICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZDJMYWJlbCA9IHRoaXMubGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KHRoaXMuc2VsZWN0ZWQyLCB7XG4gICAgICAgICAgbW9udGg6ICdzaG9ydCcsXG4gICAgICAgICAgZGF5OiAnMi1kaWdpdCcsXG4gICAgICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRvIGZpcmUgdGhpcywgc2luY2Ugd2UgZGVmYXVsdCB0byB0aGUgY3VycmVudCB3ZWVrIHNlbGVjdGVkIVxuICAgICAgICBpZiAoIWZpcmVFdmVudHMgJiYgdGhpcy53ZWVrUmFuZ2VTZWxlY3QpIHtcbiAgICAgICAgICB0aGlzLmZpcmVSYW5nZVNlbGVjdCgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucmFuZ2VTZWxlY3RNb2RlID09PSAnc3RhcnREYXRlJykge1xuICAgICAgICAvLyBTRVQgU1RBUlQgREFURVxuICAgICAgICB0aGlzLnNlbGVjdGVkID0gZGF0ZUZucy5zdGFydE9mRGF5KGRheS5kYXRlKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZExhYmVsID0gdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQodGhpcy5zZWxlY3RlZCwge1xuICAgICAgICAgIG1vbnRoOiAnc2hvcnQnLFxuICAgICAgICAgIGRheTogJzItZGlnaXQnLFxuICAgICAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkMiAmJiBkYXRlRm5zLmlzQWZ0ZXIoZGF5LmRhdGUsIHRoaXMuc2VsZWN0ZWQyKSkge1xuICAgICAgICAgIC8vIENMRUFSIEVORCBEQVRFXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZDIgPSBudWxsO1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQyTGFiZWwgPSB0aGlzLmxhYmVscy5lbmREYXRlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgIHRoaXMucmFuZ2VTZWxlY3RNb2RlID0gJ2VuZERhdGUnO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucmFuZ2VTZWxlY3RNb2RlID09PSAnZW5kRGF0ZScpIHtcbiAgICAgICAgLy8gU0VUIEVORCBEQVRFXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQyID0gZGF0ZUZucy5lbmRPZkRheShkYXkuZGF0ZSk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQyTGFiZWwgPSB0aGlzLmxhYmVscy5mb3JtYXREYXRlV2l0aEZvcm1hdCh0aGlzLnNlbGVjdGVkMiwge1xuICAgICAgICAgIG1vbnRoOiAnc2hvcnQnLFxuICAgICAgICAgIGRheTogJzItZGlnaXQnLFxuICAgICAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkICYmIGRhdGVGbnMuaXNCZWZvcmUoZGF5LmRhdGUsIHRoaXMuc2VsZWN0ZWQpKSB7XG4gICAgICAgICAgLy8gQ0xFQVIgU1RBUlQgREFURVxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRMYWJlbCA9IHRoaXMubGFiZWxzLnN0YXJ0RGF0ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICB0aGlzLnJhbmdlU2VsZWN0TW9kZSA9ICdzdGFydERhdGUnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBkYXkuZGF0ZTtcbiAgICAgIHRoaXMuc2VsZWN0ZWRMYWJlbCA9IHRoaXMubGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KHRoaXMuc2VsZWN0ZWQsIHtcbiAgICAgICAgbW9udGg6ICdzaG9ydCcsXG4gICAgICAgIGRheTogJzItZGlnaXQnLFxuICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICB9KTtcbiAgICAgIHRoaXMudXBkYXRlSGVhZGluZygpO1xuICAgIH1cbiAgICBpZiAoZmlyZUV2ZW50cyAmJiB0aGlzLnNlbGVjdGVkKSB7XG4gICAgICAvLyBFbWl0IG91ciBvdXRwdXRcbiAgICAgIGlmICh0aGlzLnJhbmdlICYmIHRoaXMuc2VsZWN0ZWQgJiYgdGhpcy5zZWxlY3RlZDIpIHtcbiAgICAgICAgdGhpcy5maXJlUmFuZ2VTZWxlY3QoKTtcbiAgICAgICAgLy8gQWxzbywgdXBkYXRlIHRoZSBuZ01vZGVsXG4gICAgICAgIHRoaXMuX29uQ2hhbmdlKHtcbiAgICAgICAgICBzdGFydERhdGU6IHRoaXMuc2VsZWN0ZWQsXG4gICAgICAgICAgZW5kRGF0ZTogdGhpcy5zZWxlY3RlZDIgPyB0aGlzLnNlbGVjdGVkMiA6IG51bGwsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm1vZGVsID0ge1xuICAgICAgICAgIHN0YXJ0RGF0ZTogdGhpcy5zZWxlY3RlZCxcbiAgICAgICAgICBlbmREYXRlOiB0aGlzLnNlbGVjdGVkMiA/IHRoaXMuc2VsZWN0ZWQyIDogbnVsbCxcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLnJhbmdlKSB7XG4gICAgICAgIHRoaXMub25TZWxlY3QubmV4dCh7XG4gICAgICAgICAgbW9udGg6IHRoaXMubGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KHRoaXMuc2VsZWN0ZWQsIHsgbW9udGg6ICdsb25nJyB9KSxcbiAgICAgICAgICB5ZWFyOiB0aGlzLnNlbGVjdGVkLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgZGF5OiB0aGlzLmxhYmVscy5mb3JtYXREYXRlV2l0aEZvcm1hdCh0aGlzLnNlbGVjdGVkLCB7IHdlZWtkYXk6ICdsb25nJyB9KSxcbiAgICAgICAgICBkYXRlOiB0aGlzLnNlbGVjdGVkLFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gQWxzbywgdXBkYXRlIHRoZSBuZ01vZGVsXG4gICAgICAgIHRoaXMuX29uQ2hhbmdlKHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICB0aGlzLm1vZGVsID0gdGhpcy5zZWxlY3RlZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmaXJlUmFuZ2VTZWxlY3QoKSB7XG4gICAgLy8gTWFrZSBzdXJlIHRoZSBzdGFydCBkYXRlIGlzIGJlZm9yZSB0aGUgZW5kIGRhdGVcbiAgICBpZiAoZGF0ZUZucy5pc0JlZm9yZSh0aGlzLnNlbGVjdGVkLCB0aGlzLnNlbGVjdGVkMikpIHtcbiAgICAgIHRoaXMub25TZWxlY3QubmV4dCh7XG4gICAgICAgIHN0YXJ0RGF0ZToge1xuICAgICAgICAgIG1vbnRoOiB0aGlzLmxhYmVscy5mb3JtYXREYXRlV2l0aEZvcm1hdCh0aGlzLnNlbGVjdGVkLCB7IG1vbnRoOiAnbG9uZycgfSksXG4gICAgICAgICAgeWVhcjogdGhpcy5zZWxlY3RlZC5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgIGRheTogdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQodGhpcy5zZWxlY3RlZCwgeyB3ZWVrZGF5OiAnbG9uZycgfSksXG4gICAgICAgICAgZGF0ZTogdGhpcy5zZWxlY3RlZCxcbiAgICAgICAgfSxcbiAgICAgICAgZW5kRGF0ZToge1xuICAgICAgICAgIG1vbnRoOiB0aGlzLmxhYmVscy5mb3JtYXREYXRlV2l0aEZvcm1hdCh0aGlzLnNlbGVjdGVkMiwgeyBtb250aDogJ2xvbmcnIH0pLFxuICAgICAgICAgIHllYXI6IHRoaXMuc2VsZWN0ZWQyLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgZGF5OiB0aGlzLmxhYmVscy5mb3JtYXREYXRlV2l0aEZvcm1hdCh0aGlzLnNlbGVjdGVkMiwgeyB3ZWVrZGF5OiAnbG9uZycgfSksXG4gICAgICAgICAgZGF0ZTogdGhpcy5zZWxlY3RlZDIsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvcGVuKGV2ZW50OiBFdmVudCwgdHlwZTogc3RyaW5nKSB7XG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuXG4gICAgLy8gSWYgdGhleSBjbGljayB0aGUgdG9nZ2xlIHR3byB0aW1lIGluIGEgcm93LCBjbG9zZSBpdCAoZ28gYmFjayB0byBkYXlzKVxuICAgIGlmICh0eXBlID09PSB0aGlzLnZpZXcpIHtcbiAgICAgIHRoaXMudmlldyA9ICdkYXlzJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52aWV3ID0gdHlwZTtcbiAgICB9XG5cbiAgICAvLyBNYWtlIHN1cmUgdG8gc2Nyb2xsIHRoZSBzZWxlY3RlZCBvbmUgaW50byB2aWV3XG4gICAgaWYgKHRoaXMudmlldyA9PT0gJ3llYXJzJyB8fCB0aGlzLnZpZXcgPT09ICdtb250aHMnKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihgLmNhbGVuZGFyLWNvbnRlbnQuJHt0aGlzLnZpZXd9YCk7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYC5jYWxlbmRhci1jb250ZW50LiR7dGhpcy52aWV3fSAuJHt0aGlzLnZpZXcgPT09ICd5ZWFycycgPyAneWVhcicgOiAnbW9udGgnfS5zZWxlY3RlZGAsXG4gICAgICAgICk7XG4gICAgICAgIGlmIChjb250YWluZXIgJiYgc2VsZWN0ZWRJdGVtKSB7XG4gICAgICAgICAgY29udGFpbmVyLnNjcm9sbFRvcCA9IHNlbGVjdGVkSXRlbS5vZmZzZXRUb3AgLSAxMDA7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlSGVhZGluZygpO1xuICB9XG5cbiAgcHJldk1vbnRoKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICBjb25zdCB0bXAgPSBkYXRlRm5zLnN1Yk1vbnRocyh0aGlzLm1vbnRoLCAxKTtcbiAgICB0aGlzLnVwZGF0ZVZpZXcodG1wLCBmYWxzZSwgZmFsc2UpO1xuICB9XG5cbiAgbmV4dE1vbnRoKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICBjb25zdCB0bXAgPSBkYXRlRm5zLmFkZE1vbnRocyh0aGlzLm1vbnRoLCAxKTtcbiAgICB0aGlzLnVwZGF0ZVZpZXcodG1wLCBmYWxzZSwgZmFsc2UpO1xuICB9XG5cbiAgdXBkYXRlSGVhZGluZygpIHtcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5oZWFkaW5nID0ge1xuICAgICAgbW9udGg6IHRoaXMubGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KHRoaXMuc2VsZWN0ZWQsIHsgbW9udGg6ICdsb25nJyB9KSxcbiAgICAgIHllYXI6IHRoaXMuc2VsZWN0ZWQuZ2V0RnVsbFllYXIoKSxcbiAgICAgIGRheTogdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQodGhpcy5zZWxlY3RlZCwgeyB3ZWVrZGF5OiAnbG9uZycgfSksXG4gICAgICBkYXRlOiB0aGlzLnNlbGVjdGVkLmdldERhdGUoKSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSB0aGUgdGltZSBhc3BlY3Qgb2YgdGhlIGRhdGVcbiAgICogQHJldHVybnMgd2l0aCB0aW1lIHN0cmlwcGVkIG91dFxuICAgKi9cbiAgcmVtb3ZlVGltZShkYXRlOiBhbnkpOiBEYXRlIHtcbiAgICBjb25zdCByZXQgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICByZXQuc2V0SG91cnMoMTIpO1xuICAgIHJldC5zZXRTZWNvbmRzKDApO1xuICAgIHJldC5zZXRNaWxsaXNlY29uZHMoMCk7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIGJ1aWxkTW9udGgoc3RhcnQ6IERhdGUsIG1vbnRoOiBEYXRlKSB7XG4gICAgLy8gUmVzZXQgdGhlIHdlZWtzXG4gICAgdGhpcy53ZWVrcyA9IFtdO1xuXG4gICAgLy8gSG91c2Uga2VlcGluZyB2YXJpYWJsZXMgdG8ga25vdyB3aGVuIHdlIGFyZSBkb25lIGJ1aWxkaW5nIHRoZSBtb250aFxuICAgIGxldCBkb25lID0gZmFsc2U7XG4gICAgbGV0IGRhdGUgPSBkYXRlRm5zLnN0YXJ0T2ZXZWVrKHN0YXJ0LCB7IHdlZWtTdGFydHNPbjogdGhpcy53ZWVrU3RhcnQgfSk7XG4gICAgbGV0IG1vbnRoSW5kZXggPSBkYXRlLmdldE1vbnRoKCk7XG4gICAgbGV0IGNvdW50ID0gMDtcblxuICAgIHdoaWxlICghZG9uZSkge1xuICAgICAgLy8gQnVpbGQgdGhlIGRheXMgZm9yIHRoZSB3ZWVrc1xuICAgICAgdGhpcy53ZWVrcy5wdXNoKHsgZGF5czogdGhpcy5idWlsZFdlZWsobmV3IERhdGUoZGF0ZS5nZXRUaW1lKCkpLCBtb250aCkgfSk7XG5cbiAgICAgIC8vIEluY3JlbWVudCB2YXJpYWJsZXMgZm9yIHRoZSBuZXh0IGl0ZXJhdGlvblxuICAgICAgZGF0ZSA9IGRhdGVGbnMuYWRkRGF5cyhkYXRlLCA3KTtcbiAgICAgIGRvbmUgPSBjb3VudCsrID4gMiAmJiBtb250aEluZGV4ICE9PSBkYXRlLmdldE1vbnRoKCk7XG4gICAgICBtb250aEluZGV4ID0gZGF0ZS5nZXRNb250aCgpO1xuICAgIH1cbiAgfVxuXG4gIGJ1aWxkV2VlayhkYXRlOiBEYXRlLCBtb250aDogRGF0ZSk6IEFycmF5PE9iamVjdD4ge1xuICAgIC8vIEJ1aWxkIG91dCBvZiB0aGUgZGF5cyBvZiB0aGUgd2Vla1xuICAgIGNvbnN0IGRheXMgPSBbXTtcblxuICAgIC8vIEl0ZXJhdGUgb3ZlciB0aGUgZGF5cyBvZiB0aGUgd2Vla1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAvLyBQdXNoIGEgdmFyaWFibGUgb24gdGhlIGRheSBhcnJheSB3aXRoIGxvdHMgb2YgaGVscGVycyB0byBtYWtlIHRoZSB0ZW1wbGF0ZSBlYXNpZXJcbiAgICAgIGRheXMucHVzaCh7XG4gICAgICAgIG5hbWU6IHRoaXMud2Vla2RheXNbaV0sXG4gICAgICAgIG51bWJlcjogZGF0ZS5nZXREYXRlKCksXG4gICAgICAgIGlzVG9kYXk6IGRhdGVGbnMuaXNUb2RheShkYXRlKSxcbiAgICAgICAgZGF0ZSxcbiAgICAgIH0pO1xuXG4gICAgICAvLyBJbmNyZW1lbnQgZm9yIHRoZSBuZXh0IGl0ZXJhdGlvblxuICAgICAgZGF0ZSA9IGRhdGVGbnMuYWRkRGF5cyhkYXRlLCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF5cztcbiAgfVxuXG4gIHRvZ2dsZVJhbmdlU2VsZWN0KHJhbmdlOiByYW5nZVNlbGVjdE1vZGVzKTogdm9pZCB7XG4gICAgdGhpcy5yYW5nZVNlbGVjdE1vZGUgPSByYW5nZTtcbiAgfVxuXG4gIHJhbmdlSG92ZXIoZXZlbnQ6IEV2ZW50LCBkYXk6IERheSk6IHZvaWQge1xuICAgIHRoaXMuaG92ZXJEYXkgPSBkYXkuZGF0ZTtcbiAgfVxuXG4gIC8vIFZhbHVlQWNjZXNzb3IgRnVuY3Rpb25zXG4gIHdyaXRlVmFsdWUobW9kZWw6IG1vZGVsVHlwZXMpOiB2b2lkIHtcbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgaWYgKEhlbHBlcnMuaXNEYXRlKG1vZGVsKSkge1xuICAgICAgdGhpcy51cGRhdGVWaWV3KG1vZGVsLCBmYWxzZSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cbn1cbiJdfQ==