// NG2
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// Vendor
import * as dateFns from 'date-fns';
import { NovoLabelService } from '../../services/novo-label-service';
// APP
import { Helpers } from '../../utils/Helpers';
import * as i0 from "@angular/core";
import * as i1 from "../../services/novo-label-service";
import * as i2 from "@angular/common";
import * as i3 from "../date-picker/DatePicker";
import * as i4 from "@angular/forms";
import * as i5 from "../time-picker/TimePicker";
function NovoDateTimePickerElement_span_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 13);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.meridian, "");
} }
// Value accessor for the component (supports ngModel)
const DATE_TIME_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoDateTimePickerElement),
    multi: true,
};
export class NovoDateTimePickerElement {
    constructor(labels, element) {
        this.labels = labels;
        this.element = element;
        this.weekStart = 0;
        // Select callback for output
        this.onSelect = new EventEmitter(false);
        this.componentTabState = 'date';
        this.datePickerValue = new Date();
        this.timePickerValue = new Date();
        this._onChange = () => { };
        this._onTouched = () => { };
    }
    toggleView(tab) {
        this.componentTabState = tab;
    }
    setDateLabels(value) {
        this.selectedLabel = this.labels.formatDateWithFormat(value, {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
    }
    setTimeLabels(value) {
        let hours = value.getHours();
        const minutes = value.getMinutes();
        this.meridian = value.toLocaleTimeString().slice(-2);
        if (!this.military) {
            hours = this.meridian === 'PM' && hours > 12 ? hours - 12 : hours;
            // Special case for 12
            if (this.meridian === 'PM' && hours === 24) {
                hours = 12;
            }
            else if (this.meridian === 'AM' && hours === 0) {
                hours = 12;
            }
        }
        this.hours = hours.toString();
        this.minutes = minutes.toString().length === 1 ? `0${minutes.toString()}` : minutes.toString();
    }
    onDateSelected(event) {
        this.datePickerValue = event.date;
        this.model = this.createFullDateValue(this.datePickerValue, this.timePickerValue);
        this.setDateLabels(this.model);
        this.onSelect.emit({ date: this.model });
        this._onChange(this.model);
        this.toggleView('time');
    }
    onTimeSelected(event) {
        this.timePickerValue = event.date;
        this.model = this.createFullDateValue(this.model, this.timePickerValue);
        this.setTimeLabels(this.model);
        this.onSelect.emit({ date: this.model });
        this._onChange(this.model);
    }
    createFullDateValue(datePickerValue, timePickerValue) {
        return dateFns.setMilliseconds(dateFns.setSeconds(dateFns.setMinutes(dateFns.setHours(datePickerValue, dateFns.getHours(timePickerValue)), dateFns.getMinutes(timePickerValue)), dateFns.getSeconds(timePickerValue)), dateFns.getMilliseconds(timePickerValue));
    }
    // ValueAccessor Functions
    writeValue(model) {
        this.model = model;
        if (Helpers.isEmpty(model)) {
            this.model = new Date();
        }
        else if (!isNaN(model)) {
            this.model = new Date(model);
        }
        this.datePickerValue = this.model;
        this.timePickerValue = this.model;
        if (Helpers.isDate(this.model)) {
            this.setDateLabels(this.model);
            this.setTimeLabels(this.model);
        }
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
}
NovoDateTimePickerElement.ɵfac = function NovoDateTimePickerElement_Factory(t) { return new (t || NovoDateTimePickerElement)(i0.ɵɵdirectiveInject(i1.NovoLabelService), i0.ɵɵdirectiveInject(i0.ElementRef)); };
NovoDateTimePickerElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoDateTimePickerElement, selectors: [["novo-date-time-picker"]], inputs: { minYear: "minYear", maxYear: "maxYear", start: "start", end: "end", military: "military", weekStart: "weekStart" }, outputs: { onSelect: "onSelect" }, features: [i0.ɵɵProvidersFeature([DATE_TIME_PICKER_VALUE_ACCESSOR])], decls: 17, vars: 16, consts: [[1, "date-time-container"], [1, "date-time-tabs"], ["data-automation-id", "novo-date-time-date-tab", 1, "date-tab", 3, "click"], ["data-automation-id", "novo-date-time-time-tab", 1, "time-tab", 3, "click"], ["data-automation-id", "novo-time-picker-hours", 1, "hours"], ["data-automation-id", "novo-time-picker-minutes", 1, "minutes"], ["class", "meridian", 4, "ngIf"], [1, "date-time-indicator"], [1, "view-container"], [1, "calendar"], ["inline", "true", 3, "ngModel", "minYear", "maxYear", "start", "end", "weekStart", "onSelect", "ngModelChange"], [1, "time-picker"], ["inline", "true", 3, "ngModel", "military", "onSelect", "ngModelChange"], [1, "meridian"]], template: function NovoDateTimePickerElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "span", 2);
        i0.ɵɵlistener("click", function NovoDateTimePickerElement_Template_span_click_2_listener() { return ctx.toggleView("date"); });
        i0.ɵɵtext(3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "span", 3);
        i0.ɵɵlistener("click", function NovoDateTimePickerElement_Template_span_click_4_listener() { return ctx.toggleView("time"); });
        i0.ɵɵelementStart(5, "span", 4);
        i0.ɵɵtext(6);
        i0.ɵɵelementEnd();
        i0.ɵɵtext(7, ":");
        i0.ɵɵelementStart(8, "span", 5);
        i0.ɵɵtext(9);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(10, NovoDateTimePickerElement_span_10_Template, 2, 1, "span", 6);
        i0.ɵɵelementEnd();
        i0.ɵɵelement(11, "i", 7);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(12, "div", 8);
        i0.ɵɵelementStart(13, "div", 9);
        i0.ɵɵelementStart(14, "novo-date-picker", 10);
        i0.ɵɵlistener("onSelect", function NovoDateTimePickerElement_Template_novo_date_picker_onSelect_14_listener($event) { return ctx.onDateSelected($event); })("ngModelChange", function NovoDateTimePickerElement_Template_novo_date_picker_ngModelChange_14_listener($event) { return ctx.model = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "div", 11);
        i0.ɵɵelementStart(16, "novo-time-picker", 12);
        i0.ɵɵlistener("onSelect", function NovoDateTimePickerElement_Template_novo_time_picker_onSelect_16_listener($event) { return ctx.onTimeSelected($event); })("ngModelChange", function NovoDateTimePickerElement_Template_novo_time_picker_ngModelChange_16_listener($event) { return ctx.model = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("@dateTextState", ctx.componentTabState);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.selectedLabel);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("@timeTextState", ctx.componentTabState);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.hours);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(ctx.minutes);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.military);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("@indicatorState", ctx.componentTabState);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("@containerState", ctx.componentTabState);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngModel", ctx.model)("minYear", ctx.minYear)("maxYear", ctx.maxYear)("start", ctx.start)("end", ctx.end)("weekStart", ctx.weekStart);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngModel", ctx.model)("military", ctx.military);
    } }, directives: [i2.NgIf, i3.NovoDatePickerElement, i4.NgControlStatus, i4.NgModel, i5.NovoTimePickerElement], encapsulation: 2, data: { animation: [
            trigger('dateTextState', [
                state('date', style({
                    opacity: '1.0',
                })),
                state('time', style({
                    opacity: '0.6',
                })),
                transition('date <=> time', animate('200ms ease-in')),
            ]),
            trigger('timeTextState', [
                state('date', style({
                    opacity: '0.6',
                })),
                state('time', style({
                    opacity: '1.0',
                })),
                transition('date <=> time', animate('200ms ease-in')),
            ]),
            trigger('indicatorState', [
                state('date', style({
                    transform: 'translateX(0%)',
                })),
                state('time', style({
                    transform: 'translateX(100%)',
                })),
                transition('date <=> time', animate('200ms ease-in')),
            ]),
            trigger('containerState', [
                state('date', style({
                    transform: 'translateX(0%)',
                })),
                state('time', style({
                    transform: 'translateX(-100%)',
                })),
                transition('date <=> time', animate('200ms ease-in')),
            ]),
        ] } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoDateTimePickerElement, [{
        type: Component,
        args: [{
                selector: 'novo-date-time-picker',
                providers: [DATE_TIME_PICKER_VALUE_ACCESSOR],
                animations: [
                    trigger('dateTextState', [
                        state('date', style({
                            opacity: '1.0',
                        })),
                        state('time', style({
                            opacity: '0.6',
                        })),
                        transition('date <=> time', animate('200ms ease-in')),
                    ]),
                    trigger('timeTextState', [
                        state('date', style({
                            opacity: '0.6',
                        })),
                        state('time', style({
                            opacity: '1.0',
                        })),
                        transition('date <=> time', animate('200ms ease-in')),
                    ]),
                    trigger('indicatorState', [
                        state('date', style({
                            transform: 'translateX(0%)',
                        })),
                        state('time', style({
                            transform: 'translateX(100%)',
                        })),
                        transition('date <=> time', animate('200ms ease-in')),
                    ]),
                    trigger('containerState', [
                        state('date', style({
                            transform: 'translateX(0%)',
                        })),
                        state('time', style({
                            transform: 'translateX(-100%)',
                        })),
                        transition('date <=> time', animate('200ms ease-in')),
                    ]),
                ],
                template: `
    <div class="date-time-container">
      <div class="date-time-tabs">
        <span
          class="date-tab"
          (click)="toggleView('date')"
          [@dateTextState]="componentTabState"
          data-automation-id="novo-date-time-date-tab"
          >{{ selectedLabel }}</span
        >
        <span
          class="time-tab"
          (click)="toggleView('time')"
          [@timeTextState]="componentTabState"
          data-automation-id="novo-date-time-time-tab"
        >
          <span class="hours" data-automation-id="novo-time-picker-hours">{{ hours }}</span
          >:<span class="minutes" data-automation-id="novo-time-picker-minutes">{{ minutes }}</span>
          <span *ngIf="!military" class="meridian"> {{ meridian }}</span>
        </span>
        <i class="date-time-indicator" [@indicatorState]="componentTabState"></i>
      </div>
      <div class="view-container" [@containerState]="componentTabState">
        <div class="calendar">
          <novo-date-picker
            (onSelect)="onDateSelected($event)"
            [(ngModel)]="model"
            inline="true"
            [minYear]="minYear"
            [maxYear]="maxYear"
            [start]="start"
            [end]="end"
            [weekStart]="weekStart"
          ></novo-date-picker>
        </div>
        <div class="time-picker">
          <novo-time-picker (onSelect)="onTimeSelected($event)" [(ngModel)]="model" [military]="military" inline="true"></novo-time-picker>
        </div>
      </div>
    </div>
  `,
            }]
    }], function () { return [{ type: i1.NovoLabelService }, { type: i0.ElementRef }]; }, { minYear: [{
            type: Input
        }], maxYear: [{
            type: Input
        }], start: [{
            type: Input
        }], end: [{
            type: Input
        }], military: [{
            type: Input
        }], weekStart: [{
            type: Input
        }], onSelect: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVRpbWVQaWNrZXIuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZGF0ZS10aW1lLXBpY2tlci9EYXRlVGltZVBpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRixPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0YsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLFNBQVM7QUFDVCxPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQztBQUNwQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNyRSxNQUFNO0FBQ04sT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7OztJQTRGcEMsZ0NBQTBDO0lBQUEsWUFBYztJQUFBLGlCQUFPOzs7SUFBckIsZUFBYztJQUFkLCtDQUFjOztBQTFGbEUsc0RBQXNEO0FBQ3RELE1BQU0sK0JBQStCLEdBQUc7SUFDdEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHlCQUF5QixDQUFDO0lBQ3hELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQTZHRixNQUFNLE9BQU8seUJBQXlCO0lBOEJwQyxZQUFtQixNQUF3QixFQUFVLE9BQW1CO1FBQXJELFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBWTtR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QUFLLENBQUM7NEJBQ0osU0FBUyxFQUFFLGdCQUFnQjt5QkFDNUIsQ0FBQyxDQUNIO3dCQUNELEtBQUssQ0FDSCxNQUFNLEVBQ04sS0FBSyxDQUFDOzRCQUNKLFNBQVMsRUFBRSxrQkFBa0I7eUJBQzlCLENBQUMsQ0FDSDt3QkFDRCxVQUFVLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztxQkFDdEQsQ0FBQztvQkFDRixPQUFPLENBQUMsZ0JBQWdCLEVBQUU7d0JBQ3hCLEtBQUssQ0FDSCxNQUFNLEVBQ04sS0FBSyxDQUFDOzRCQUNKLFNBQVMsRUFBRSxnQkFBZ0I7eUJBQzVCLENBQUMsQ0FDSDt3QkFDRCxLQUFLLENBQ0gsTUFBTSxFQUNOLEtBQUssQ0FBQzs0QkFDSixTQUFTLEVBQUUsbUJBQW1CO3lCQUMvQixDQUFDLENBQ0g7d0JBQ0QsVUFBVSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7cUJBQ3RELENBQUM7aUJBQ0g7Z0JBQ0QsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0NUO2FBQ0Y7NEZBR0MsT0FBTztrQkFETixLQUFLO1lBR04sT0FBTztrQkFETixLQUFLO1lBR04sS0FBSztrQkFESixLQUFLO1lBR04sR0FBRztrQkFERixLQUFLO1lBR04sUUFBUTtrQkFEUCxLQUFLO1lBR04sU0FBUztrQkFEUixLQUFLO1lBS04sUUFBUTtrQkFEUCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBhbmltYXRlLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBWZW5kb3JcbmltcG9ydCAqIGFzIGRhdGVGbnMgZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG4vLyBBUFBcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICcuLi8uLi91dGlscy9IZWxwZXJzJztcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG5jb25zdCBEQVRFX1RJTUVfUElDS0VSX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b0RhdGVUaW1lUGlja2VyRWxlbWVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1kYXRlLXRpbWUtcGlja2VyJyxcbiAgcHJvdmlkZXJzOiBbREFURV9USU1FX1BJQ0tFUl9WQUxVRV9BQ0NFU1NPUl0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdkYXRlVGV4dFN0YXRlJywgW1xuICAgICAgc3RhdGUoXG4gICAgICAgICdkYXRlJyxcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIG9wYWNpdHk6ICcxLjAnLFxuICAgICAgICB9KSxcbiAgICAgICksXG4gICAgICBzdGF0ZShcbiAgICAgICAgJ3RpbWUnLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogJzAuNicsXG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oJ2RhdGUgPD0+IHRpbWUnLCBhbmltYXRlKCcyMDBtcyBlYXNlLWluJykpLFxuICAgIF0pLFxuICAgIHRyaWdnZXIoJ3RpbWVUZXh0U3RhdGUnLCBbXG4gICAgICBzdGF0ZShcbiAgICAgICAgJ2RhdGUnLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogJzAuNicsXG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICAgIHN0YXRlKFxuICAgICAgICAndGltZScsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5OiAnMS4wJyxcbiAgICAgICAgfSksXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbignZGF0ZSA8PT4gdGltZScsIGFuaW1hdGUoJzIwMG1zIGVhc2UtaW4nKSksXG4gICAgXSksXG4gICAgdHJpZ2dlcignaW5kaWNhdG9yU3RhdGUnLCBbXG4gICAgICBzdGF0ZShcbiAgICAgICAgJ2RhdGUnLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwJSknLFxuICAgICAgICB9KSxcbiAgICAgICksXG4gICAgICBzdGF0ZShcbiAgICAgICAgJ3RpbWUnLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgxMDAlKScsXG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oJ2RhdGUgPD0+IHRpbWUnLCBhbmltYXRlKCcyMDBtcyBlYXNlLWluJykpLFxuICAgIF0pLFxuICAgIHRyaWdnZXIoJ2NvbnRhaW5lclN0YXRlJywgW1xuICAgICAgc3RhdGUoXG4gICAgICAgICdkYXRlJyxcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCUpJyxcbiAgICAgICAgfSksXG4gICAgICApLFxuICAgICAgc3RhdGUoXG4gICAgICAgICd0aW1lJyxcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTEwMCUpJyxcbiAgICAgICAgfSksXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbignZGF0ZSA8PT4gdGltZScsIGFuaW1hdGUoJzIwMG1zIGVhc2UtaW4nKSksXG4gICAgXSksXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImRhdGUtdGltZS1jb250YWluZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJkYXRlLXRpbWUtdGFic1wiPlxuICAgICAgICA8c3BhblxuICAgICAgICAgIGNsYXNzPVwiZGF0ZS10YWJcIlxuICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVWaWV3KCdkYXRlJylcIlxuICAgICAgICAgIFtAZGF0ZVRleHRTdGF0ZV09XCJjb21wb25lbnRUYWJTdGF0ZVwiXG4gICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1kYXRlLXRpbWUtZGF0ZS10YWJcIlxuICAgICAgICAgID57eyBzZWxlY3RlZExhYmVsIH19PC9zcGFuXG4gICAgICAgID5cbiAgICAgICAgPHNwYW5cbiAgICAgICAgICBjbGFzcz1cInRpbWUtdGFiXCJcbiAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlVmlldygndGltZScpXCJcbiAgICAgICAgICBbQHRpbWVUZXh0U3RhdGVdPVwiY29tcG9uZW50VGFiU3RhdGVcIlxuICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZGF0ZS10aW1lLXRpbWUtdGFiXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaG91cnNcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLXRpbWUtcGlja2VyLWhvdXJzXCI+e3sgaG91cnMgfX08L3NwYW5cbiAgICAgICAgICA+OjxzcGFuIGNsYXNzPVwibWludXRlc1wiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tdGltZS1waWNrZXItbWludXRlc1wiPnt7IG1pbnV0ZXMgfX08L3NwYW4+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCIhbWlsaXRhcnlcIiBjbGFzcz1cIm1lcmlkaWFuXCI+IHt7IG1lcmlkaWFuIH19PC9zcGFuPlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxpIGNsYXNzPVwiZGF0ZS10aW1lLWluZGljYXRvclwiIFtAaW5kaWNhdG9yU3RhdGVdPVwiY29tcG9uZW50VGFiU3RhdGVcIj48L2k+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ2aWV3LWNvbnRhaW5lclwiIFtAY29udGFpbmVyU3RhdGVdPVwiY29tcG9uZW50VGFiU3RhdGVcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNhbGVuZGFyXCI+XG4gICAgICAgICAgPG5vdm8tZGF0ZS1waWNrZXJcbiAgICAgICAgICAgIChvblNlbGVjdCk9XCJvbkRhdGVTZWxlY3RlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgIFsobmdNb2RlbCldPVwibW9kZWxcIlxuICAgICAgICAgICAgaW5saW5lPVwidHJ1ZVwiXG4gICAgICAgICAgICBbbWluWWVhcl09XCJtaW5ZZWFyXCJcbiAgICAgICAgICAgIFttYXhZZWFyXT1cIm1heFllYXJcIlxuICAgICAgICAgICAgW3N0YXJ0XT1cInN0YXJ0XCJcbiAgICAgICAgICAgIFtlbmRdPVwiZW5kXCJcbiAgICAgICAgICAgIFt3ZWVrU3RhcnRdPVwid2Vla1N0YXJ0XCJcbiAgICAgICAgICA+PC9ub3ZvLWRhdGUtcGlja2VyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRpbWUtcGlja2VyXCI+XG4gICAgICAgICAgPG5vdm8tdGltZS1waWNrZXIgKG9uU2VsZWN0KT1cIm9uVGltZVNlbGVjdGVkKCRldmVudClcIiBbKG5nTW9kZWwpXT1cIm1vZGVsXCIgW21pbGl0YXJ5XT1cIm1pbGl0YXJ5XCIgaW5saW5lPVwidHJ1ZVwiPjwvbm92by10aW1lLXBpY2tlcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RhdGVUaW1lUGlja2VyRWxlbWVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQElucHV0KClcbiAgbWluWWVhcjogYW55O1xuICBASW5wdXQoKVxuICBtYXhZZWFyOiBhbnk7XG4gIEBJbnB1dCgpXG4gIHN0YXJ0OiBhbnk7XG4gIEBJbnB1dCgpXG4gIGVuZDogYW55O1xuICBASW5wdXQoKVxuICBtaWxpdGFyeTogYW55O1xuICBASW5wdXQoKVxuICB3ZWVrU3RhcnQ6IG51bWJlciA9IDA7XG5cbiAgLy8gU2VsZWN0IGNhbGxiYWNrIGZvciBvdXRwdXRcbiAgQE91dHB1dCgpXG4gIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoZmFsc2UpO1xuXG4gIGNvbXBvbmVudFRhYlN0YXRlOiBzdHJpbmcgPSAnZGF0ZSc7XG4gIHNlbGVjdGVkTGFiZWw6IHN0cmluZztcbiAgaG91cnM6IHN0cmluZztcbiAgbWludXRlczogc3RyaW5nO1xuICBtZXJpZGlhbjogc3RyaW5nO1xuICBkYXRlUGlja2VyVmFsdWU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICB0aW1lUGlja2VyVmFsdWU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gIG1vZGVsOiBhbnk7XG4gIF9vbkNoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgX29uVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLCBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHt9XG5cbiAgdG9nZ2xlVmlldyh0YWI6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuY29tcG9uZW50VGFiU3RhdGUgPSB0YWI7XG4gIH1cblxuICBzZXREYXRlTGFiZWxzKHZhbHVlOiBEYXRlKSB7XG4gICAgdGhpcy5zZWxlY3RlZExhYmVsID0gdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQodmFsdWUsIHtcbiAgICAgIG1vbnRoOiAnc2hvcnQnLFxuICAgICAgZGF5OiAnMi1kaWdpdCcsXG4gICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgfSk7XG4gIH1cblxuICBzZXRUaW1lTGFiZWxzKHZhbHVlOiBEYXRlKSB7XG4gICAgbGV0IGhvdXJzID0gdmFsdWUuZ2V0SG91cnMoKTtcbiAgICBjb25zdCBtaW51dGVzID0gdmFsdWUuZ2V0TWludXRlcygpO1xuXG4gICAgdGhpcy5tZXJpZGlhbiA9IHZhbHVlLnRvTG9jYWxlVGltZVN0cmluZygpLnNsaWNlKC0yKTtcblxuICAgIGlmICghdGhpcy5taWxpdGFyeSkge1xuICAgICAgaG91cnMgPSB0aGlzLm1lcmlkaWFuID09PSAnUE0nICYmIGhvdXJzID4gMTIgPyBob3VycyAtIDEyIDogaG91cnM7XG5cbiAgICAgIC8vIFNwZWNpYWwgY2FzZSBmb3IgMTJcbiAgICAgIGlmICh0aGlzLm1lcmlkaWFuID09PSAnUE0nICYmIGhvdXJzID09PSAyNCkge1xuICAgICAgICBob3VycyA9IDEyO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm1lcmlkaWFuID09PSAnQU0nICYmIGhvdXJzID09PSAwKSB7XG4gICAgICAgIGhvdXJzID0gMTI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5ob3VycyA9IGhvdXJzLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5taW51dGVzID0gbWludXRlcy50b1N0cmluZygpLmxlbmd0aCA9PT0gMSA/IGAwJHttaW51dGVzLnRvU3RyaW5nKCl9YCA6IG1pbnV0ZXMudG9TdHJpbmcoKTtcbiAgfVxuXG4gIG9uRGF0ZVNlbGVjdGVkKGV2ZW50OiB7IG1vbnRoPzogYW55OyB5ZWFyPzogYW55OyBkYXk/OiBhbnk7IGRhdGU/OiBEYXRlIH0pIHtcbiAgICB0aGlzLmRhdGVQaWNrZXJWYWx1ZSA9IGV2ZW50LmRhdGU7XG4gICAgdGhpcy5tb2RlbCA9IHRoaXMuY3JlYXRlRnVsbERhdGVWYWx1ZSh0aGlzLmRhdGVQaWNrZXJWYWx1ZSwgdGhpcy50aW1lUGlja2VyVmFsdWUpO1xuICAgIHRoaXMuc2V0RGF0ZUxhYmVscyh0aGlzLm1vZGVsKTtcbiAgICB0aGlzLm9uU2VsZWN0LmVtaXQoeyBkYXRlOiB0aGlzLm1vZGVsIH0pO1xuICAgIHRoaXMuX29uQ2hhbmdlKHRoaXMubW9kZWwpO1xuICAgIHRoaXMudG9nZ2xlVmlldygndGltZScpO1xuICB9XG5cbiAgb25UaW1lU2VsZWN0ZWQoZXZlbnQ6IHsgaG91cnM/OiBudW1iZXI7IG1pbnV0ZXM/OiBudW1iZXI7IG1lcmlkaWFuPzogc3RyaW5nOyBkYXRlPzogRGF0ZTsgdGV4dD86IHN0cmluZyB9KSB7XG4gICAgdGhpcy50aW1lUGlja2VyVmFsdWUgPSBldmVudC5kYXRlO1xuICAgIHRoaXMubW9kZWwgPSB0aGlzLmNyZWF0ZUZ1bGxEYXRlVmFsdWUodGhpcy5tb2RlbCwgdGhpcy50aW1lUGlja2VyVmFsdWUpO1xuICAgIHRoaXMuc2V0VGltZUxhYmVscyh0aGlzLm1vZGVsKTtcbiAgICB0aGlzLm9uU2VsZWN0LmVtaXQoeyBkYXRlOiB0aGlzLm1vZGVsIH0pO1xuICAgIHRoaXMuX29uQ2hhbmdlKHRoaXMubW9kZWwpO1xuICB9XG5cbiAgY3JlYXRlRnVsbERhdGVWYWx1ZShkYXRlUGlja2VyVmFsdWU6IERhdGUsIHRpbWVQaWNrZXJWYWx1ZTogRGF0ZSkge1xuICAgIHJldHVybiBkYXRlRm5zLnNldE1pbGxpc2Vjb25kcyhcbiAgICAgIGRhdGVGbnMuc2V0U2Vjb25kcyhcbiAgICAgICAgZGF0ZUZucy5zZXRNaW51dGVzKGRhdGVGbnMuc2V0SG91cnMoZGF0ZVBpY2tlclZhbHVlLCBkYXRlRm5zLmdldEhvdXJzKHRpbWVQaWNrZXJWYWx1ZSkpLCBkYXRlRm5zLmdldE1pbnV0ZXModGltZVBpY2tlclZhbHVlKSksXG4gICAgICAgIGRhdGVGbnMuZ2V0U2Vjb25kcyh0aW1lUGlja2VyVmFsdWUpLFxuICAgICAgKSxcbiAgICAgIGRhdGVGbnMuZ2V0TWlsbGlzZWNvbmRzKHRpbWVQaWNrZXJWYWx1ZSksXG4gICAgKTtcbiAgfVxuXG4gIC8vIFZhbHVlQWNjZXNzb3IgRnVuY3Rpb25zXG4gIHdyaXRlVmFsdWUobW9kZWw6IGFueSk6IHZvaWQge1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICBpZiAoSGVscGVycy5pc0VtcHR5KG1vZGVsKSkge1xuICAgICAgdGhpcy5tb2RlbCA9IG5ldyBEYXRlKCk7XG4gICAgfSBlbHNlIGlmICghaXNOYU4obW9kZWwpKSB7XG4gICAgICB0aGlzLm1vZGVsID0gbmV3IERhdGUobW9kZWwpO1xuICAgIH1cbiAgICB0aGlzLmRhdGVQaWNrZXJWYWx1ZSA9IHRoaXMubW9kZWw7XG4gICAgdGhpcy50aW1lUGlja2VyVmFsdWUgPSB0aGlzLm1vZGVsO1xuICAgIGlmIChIZWxwZXJzLmlzRGF0ZSh0aGlzLm1vZGVsKSkge1xuICAgICAgdGhpcy5zZXREYXRlTGFiZWxzKHRoaXMubW9kZWwpO1xuICAgICAgdGhpcy5zZXRUaW1lTGFiZWxzKHRoaXMubW9kZWwpO1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMuX29uVG91Y2hlZCA9IGZuO1xuICB9XG59XG4iXX0=