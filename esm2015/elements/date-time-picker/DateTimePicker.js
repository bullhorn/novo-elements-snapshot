// NG2
import { ElementRef, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// Vendor
import * as dateFns from 'date-fns';
// APP
import { Helpers } from '../../utils/Helpers';
import { NovoLabelService } from '../../services/novo-label-service';
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
NovoDateTimePickerElement.decorators = [
    { type: Component, args: [{
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
  `
            },] }
];
NovoDateTimePickerElement.ctorParameters = () => [
    { type: NovoLabelService },
    { type: ElementRef }
];
NovoDateTimePickerElement.propDecorators = {
    minYear: [{ type: Input }],
    maxYear: [{ type: Input }],
    start: [{ type: Input }],
    end: [{ type: Input }],
    military: [{ type: Input }],
    weekStart: [{ type: Input }],
    onSelect: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVRpbWVQaWNrZXIuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2RhdGUtdGltZS1waWNrZXIvRGF0ZVRpbWVQaWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRixPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxTQUFTO0FBQ1QsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFDcEMsTUFBTTtBQUNOLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVyRSxzREFBc0Q7QUFDdEQsTUFBTSwrQkFBK0IsR0FBRztJQUN0QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMseUJBQXlCLENBQUM7SUFDeEQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBNkdGLE1BQU0sT0FBTyx5QkFBeUI7SUE4QnBDLFlBQW1CLE1BQXdCLEVBQVUsT0FBbUI7UUFBckQsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBbEJ4RSxjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBRXRCLDZCQUE2QjtRQUU3QixhQUFRLEdBQXNCLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxD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QyxDQUNIO3dCQUNELEtBQUssQ0FDSCxNQUFNLEVBQ04sS0FBSyxDQUFDOzRCQUNKLFNBQVMsRUFBRSxrQkFBa0I7eUJBQzlCLENBQUMsQ0FDSDt3QkFDRCxVQUFVLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztxQkFDdEQsQ0FBQztvQkFDRixPQUFPLENBQUMsZ0JBQWdCLEVBQUU7d0JBQ3hCLEtBQUssQ0FDSCxNQUFNLEVBQ04sS0FBSyxDQUFDOzRCQUNKLFNBQVMsRUFBRSxnQkFBZ0I7eUJBQzVCLENBQUMsQ0FDSDt3QkFDRCxLQUFLLENBQ0gsTUFBTSxFQUNOLEtBQUssQ0FBQzs0QkFDSixTQUFTLEVBQUUsbUJBQW1CO3lCQUMvQixDQUFDLENBQ0g7d0JBQ0QsVUFBVSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7cUJBQ3RELENBQUM7aUJBQ0g7Z0JBQ0QsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0NUO2FBQ0Y7OztZQW5IUSxnQkFBZ0I7WUFQaEIsVUFBVTs7O3NCQTRIaEIsS0FBSztzQkFFTCxLQUFLO29CQUVMLEtBQUs7a0JBRUwsS0FBSzt1QkFFTCxLQUFLO3dCQUVMLEtBQUs7dUJBSUwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQgeyBFbGVtZW50UmVmLCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyB0cmlnZ2VyLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIGFuaW1hdGUgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG4vLyBWZW5kb3JcclxuaW1wb3J0ICogYXMgZGF0ZUZucyBmcm9tICdkYXRlLWZucyc7XHJcbi8vIEFQUFxyXG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vdXRpbHMvSGVscGVycyc7XHJcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xyXG5cclxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXHJcbmNvbnN0IERBVEVfVElNRV9QSUNLRVJfVkFMVUVfQUNDRVNTT1IgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b0RhdGVUaW1lUGlja2VyRWxlbWVudCksXHJcbiAgbXVsdGk6IHRydWUsXHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25vdm8tZGF0ZS10aW1lLXBpY2tlcicsXHJcbiAgcHJvdmlkZXJzOiBbREFURV9USU1FX1BJQ0tFUl9WQUxVRV9BQ0NFU1NPUl0sXHJcbiAgYW5pbWF0aW9uczogW1xyXG4gICAgdHJpZ2dlcignZGF0ZVRleHRTdGF0ZScsIFtcclxuICAgICAgc3RhdGUoXHJcbiAgICAgICAgJ2RhdGUnLFxyXG4gICAgICAgIHN0eWxlKHtcclxuICAgICAgICAgIG9wYWNpdHk6ICcxLjAnLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICApLFxyXG4gICAgICBzdGF0ZShcclxuICAgICAgICAndGltZScsXHJcbiAgICAgICAgc3R5bGUoe1xyXG4gICAgICAgICAgb3BhY2l0eTogJzAuNicsXHJcbiAgICAgICAgfSksXHJcbiAgICAgICksXHJcbiAgICAgIHRyYW5zaXRpb24oJ2RhdGUgPD0+IHRpbWUnLCBhbmltYXRlKCcyMDBtcyBlYXNlLWluJykpLFxyXG4gICAgXSksXHJcbiAgICB0cmlnZ2VyKCd0aW1lVGV4dFN0YXRlJywgW1xyXG4gICAgICBzdGF0ZShcclxuICAgICAgICAnZGF0ZScsXHJcbiAgICAgICAgc3R5bGUoe1xyXG4gICAgICAgICAgb3BhY2l0eTogJzAuNicsXHJcbiAgICAgICAgfSksXHJcbiAgICAgICksXHJcbiAgICAgIHN0YXRlKFxyXG4gICAgICAgICd0aW1lJyxcclxuICAgICAgICBzdHlsZSh7XHJcbiAgICAgICAgICBvcGFjaXR5OiAnMS4wJyxcclxuICAgICAgICB9KSxcclxuICAgICAgKSxcclxuICAgICAgdHJhbnNpdGlvbignZGF0ZSA8PT4gdGltZScsIGFuaW1hdGUoJzIwMG1zIGVhc2UtaW4nKSksXHJcbiAgICBdKSxcclxuICAgIHRyaWdnZXIoJ2luZGljYXRvclN0YXRlJywgW1xyXG4gICAgICBzdGF0ZShcclxuICAgICAgICAnZGF0ZScsXHJcbiAgICAgICAgc3R5bGUoe1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwJSknLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICApLFxyXG4gICAgICBzdGF0ZShcclxuICAgICAgICAndGltZScsXHJcbiAgICAgICAgc3R5bGUoe1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgxMDAlKScsXHJcbiAgICAgICAgfSksXHJcbiAgICAgICksXHJcbiAgICAgIHRyYW5zaXRpb24oJ2RhdGUgPD0+IHRpbWUnLCBhbmltYXRlKCcyMDBtcyBlYXNlLWluJykpLFxyXG4gICAgXSksXHJcbiAgICB0cmlnZ2VyKCdjb250YWluZXJTdGF0ZScsIFtcclxuICAgICAgc3RhdGUoXHJcbiAgICAgICAgJ2RhdGUnLFxyXG4gICAgICAgIHN0eWxlKHtcclxuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCUpJyxcclxuICAgICAgICB9KSxcclxuICAgICAgKSxcclxuICAgICAgc3RhdGUoXHJcbiAgICAgICAgJ3RpbWUnLFxyXG4gICAgICAgIHN0eWxlKHtcclxuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTEwMCUpJyxcclxuICAgICAgICB9KSxcclxuICAgICAgKSxcclxuICAgICAgdHJhbnNpdGlvbignZGF0ZSA8PT4gdGltZScsIGFuaW1hdGUoJzIwMG1zIGVhc2UtaW4nKSksXHJcbiAgICBdKSxcclxuICBdLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwiZGF0ZS10aW1lLWNvbnRhaW5lclwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZGF0ZS10aW1lLXRhYnNcIj5cclxuICAgICAgICA8c3BhblxyXG4gICAgICAgICAgY2xhc3M9XCJkYXRlLXRhYlwiXHJcbiAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlVmlldygnZGF0ZScpXCJcclxuICAgICAgICAgIFtAZGF0ZVRleHRTdGF0ZV09XCJjb21wb25lbnRUYWJTdGF0ZVwiXHJcbiAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRhdGUtdGltZS1kYXRlLXRhYlwiXHJcbiAgICAgICAgICA+e3sgc2VsZWN0ZWRMYWJlbCB9fTwvc3BhblxyXG4gICAgICAgID5cclxuICAgICAgICA8c3BhblxyXG4gICAgICAgICAgY2xhc3M9XCJ0aW1lLXRhYlwiXHJcbiAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlVmlldygndGltZScpXCJcclxuICAgICAgICAgIFtAdGltZVRleHRTdGF0ZV09XCJjb21wb25lbnRUYWJTdGF0ZVwiXHJcbiAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRhdGUtdGltZS10aW1lLXRhYlwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJob3Vyc1wiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tdGltZS1waWNrZXItaG91cnNcIj57eyBob3VycyB9fTwvc3BhblxyXG4gICAgICAgICAgPjo8c3BhbiBjbGFzcz1cIm1pbnV0ZXNcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLXRpbWUtcGlja2VyLW1pbnV0ZXNcIj57eyBtaW51dGVzIH19PC9zcGFuPlxyXG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCIhbWlsaXRhcnlcIiBjbGFzcz1cIm1lcmlkaWFuXCI+IHt7IG1lcmlkaWFuIH19PC9zcGFuPlxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA8aSBjbGFzcz1cImRhdGUtdGltZS1pbmRpY2F0b3JcIiBbQGluZGljYXRvclN0YXRlXT1cImNvbXBvbmVudFRhYlN0YXRlXCI+PC9pPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cInZpZXctY29udGFpbmVyXCIgW0Bjb250YWluZXJTdGF0ZV09XCJjb21wb25lbnRUYWJTdGF0ZVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYWxlbmRhclwiPlxyXG4gICAgICAgICAgPG5vdm8tZGF0ZS1waWNrZXJcclxuICAgICAgICAgICAgKG9uU2VsZWN0KT1cIm9uRGF0ZVNlbGVjdGVkKCRldmVudClcIlxyXG4gICAgICAgICAgICBbKG5nTW9kZWwpXT1cIm1vZGVsXCJcclxuICAgICAgICAgICAgaW5saW5lPVwidHJ1ZVwiXHJcbiAgICAgICAgICAgIFttaW5ZZWFyXT1cIm1pblllYXJcIlxyXG4gICAgICAgICAgICBbbWF4WWVhcl09XCJtYXhZZWFyXCJcclxuICAgICAgICAgICAgW3N0YXJ0XT1cInN0YXJ0XCJcclxuICAgICAgICAgICAgW2VuZF09XCJlbmRcIlxyXG4gICAgICAgICAgICBbd2Vla1N0YXJ0XT1cIndlZWtTdGFydFwiXHJcbiAgICAgICAgICA+PC9ub3ZvLWRhdGUtcGlja2VyPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lLXBpY2tlclwiPlxyXG4gICAgICAgICAgPG5vdm8tdGltZS1waWNrZXIgKG9uU2VsZWN0KT1cIm9uVGltZVNlbGVjdGVkKCRldmVudClcIiBbKG5nTW9kZWwpXT1cIm1vZGVsXCIgW21pbGl0YXJ5XT1cIm1pbGl0YXJ5XCIgaW5saW5lPVwidHJ1ZVwiPjwvbm92by10aW1lLXBpY2tlcj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICBgLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b0RhdGVUaW1lUGlja2VyRWxlbWVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuICBASW5wdXQoKVxyXG4gIG1pblllYXI6IGFueTtcclxuICBASW5wdXQoKVxyXG4gIG1heFllYXI6IGFueTtcclxuICBASW5wdXQoKVxyXG4gIHN0YXJ0OiBhbnk7XHJcbiAgQElucHV0KClcclxuICBlbmQ6IGFueTtcclxuICBASW5wdXQoKVxyXG4gIG1pbGl0YXJ5OiBhbnk7XHJcbiAgQElucHV0KClcclxuICB3ZWVrU3RhcnQ6IG51bWJlciA9IDA7XHJcblxyXG4gIC8vIFNlbGVjdCBjYWxsYmFjayBmb3Igb3V0cHV0XHJcbiAgQE91dHB1dCgpXHJcbiAgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcihmYWxzZSk7XHJcblxyXG4gIGNvbXBvbmVudFRhYlN0YXRlOiBzdHJpbmcgPSAnZGF0ZSc7XHJcbiAgc2VsZWN0ZWRMYWJlbDogc3RyaW5nO1xyXG4gIGhvdXJzOiBzdHJpbmc7XHJcbiAgbWludXRlczogc3RyaW5nO1xyXG4gIG1lcmlkaWFuOiBzdHJpbmc7XHJcbiAgZGF0ZVBpY2tlclZhbHVlOiBEYXRlID0gbmV3IERhdGUoKTtcclxuICB0aW1lUGlja2VyVmFsdWU6IERhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICBtb2RlbDogYW55O1xyXG4gIF9vbkNoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcclxuICBfb25Ub3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLCBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHt9XHJcblxyXG4gIHRvZ2dsZVZpZXcodGFiOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMuY29tcG9uZW50VGFiU3RhdGUgPSB0YWI7XHJcbiAgfVxyXG5cclxuICBzZXREYXRlTGFiZWxzKHZhbHVlOiBEYXRlKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkTGFiZWwgPSB0aGlzLmxhYmVscy5mb3JtYXREYXRlV2l0aEZvcm1hdCh2YWx1ZSwge1xyXG4gICAgICBtb250aDogJ3Nob3J0JyxcclxuICAgICAgZGF5OiAnMi1kaWdpdCcsXHJcbiAgICAgIHllYXI6ICdudW1lcmljJyxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0VGltZUxhYmVscyh2YWx1ZTogRGF0ZSkge1xyXG4gICAgbGV0IGhvdXJzID0gdmFsdWUuZ2V0SG91cnMoKTtcclxuICAgIGNvbnN0IG1pbnV0ZXMgPSB2YWx1ZS5nZXRNaW51dGVzKCk7XHJcblxyXG4gICAgdGhpcy5tZXJpZGlhbiA9IHZhbHVlLnRvTG9jYWxlVGltZVN0cmluZygpLnNsaWNlKC0yKTtcclxuXHJcbiAgICBpZiAoIXRoaXMubWlsaXRhcnkpIHtcclxuICAgICAgaG91cnMgPSB0aGlzLm1lcmlkaWFuID09PSAnUE0nICYmIGhvdXJzID4gMTIgPyBob3VycyAtIDEyIDogaG91cnM7XHJcblxyXG4gICAgICAvLyBTcGVjaWFsIGNhc2UgZm9yIDEyXHJcbiAgICAgIGlmICh0aGlzLm1lcmlkaWFuID09PSAnUE0nICYmIGhvdXJzID09PSAyNCkge1xyXG4gICAgICAgIGhvdXJzID0gMTI7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5tZXJpZGlhbiA9PT0gJ0FNJyAmJiBob3VycyA9PT0gMCkge1xyXG4gICAgICAgIGhvdXJzID0gMTI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmhvdXJzID0gaG91cnMudG9TdHJpbmcoKTtcclxuICAgIHRoaXMubWludXRlcyA9IG1pbnV0ZXMudG9TdHJpbmcoKS5sZW5ndGggPT09IDEgPyBgMCR7bWludXRlcy50b1N0cmluZygpfWAgOiBtaW51dGVzLnRvU3RyaW5nKCk7XHJcbiAgfVxyXG5cclxuICBvbkRhdGVTZWxlY3RlZChldmVudDogeyBtb250aD86IGFueTsgeWVhcj86IGFueTsgZGF5PzogYW55OyBkYXRlPzogRGF0ZSB9KSB7XHJcbiAgICB0aGlzLmRhdGVQaWNrZXJWYWx1ZSA9IGV2ZW50LmRhdGU7XHJcbiAgICB0aGlzLm1vZGVsID0gdGhpcy5jcmVhdGVGdWxsRGF0ZVZhbHVlKHRoaXMuZGF0ZVBpY2tlclZhbHVlLCB0aGlzLnRpbWVQaWNrZXJWYWx1ZSk7XHJcbiAgICB0aGlzLnNldERhdGVMYWJlbHModGhpcy5tb2RlbCk7XHJcbiAgICB0aGlzLm9uU2VsZWN0LmVtaXQoeyBkYXRlOiB0aGlzLm1vZGVsIH0pO1xyXG4gICAgdGhpcy5fb25DaGFuZ2UodGhpcy5tb2RlbCk7XHJcbiAgICB0aGlzLnRvZ2dsZVZpZXcoJ3RpbWUnKTtcclxuICB9XHJcblxyXG4gIG9uVGltZVNlbGVjdGVkKGV2ZW50OiB7IGhvdXJzPzogbnVtYmVyOyBtaW51dGVzPzogbnVtYmVyOyBtZXJpZGlhbj86IHN0cmluZzsgZGF0ZT86IERhdGU7IHRleHQ/OiBzdHJpbmcgfSkge1xyXG4gICAgdGhpcy50aW1lUGlja2VyVmFsdWUgPSBldmVudC5kYXRlO1xyXG4gICAgdGhpcy5tb2RlbCA9IHRoaXMuY3JlYXRlRnVsbERhdGVWYWx1ZSh0aGlzLm1vZGVsLCB0aGlzLnRpbWVQaWNrZXJWYWx1ZSk7XHJcbiAgICB0aGlzLnNldFRpbWVMYWJlbHModGhpcy5tb2RlbCk7XHJcbiAgICB0aGlzLm9uU2VsZWN0LmVtaXQoeyBkYXRlOiB0aGlzLm1vZGVsIH0pO1xyXG4gICAgdGhpcy5fb25DaGFuZ2UodGhpcy5tb2RlbCk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVGdWxsRGF0ZVZhbHVlKGRhdGVQaWNrZXJWYWx1ZTogRGF0ZSwgdGltZVBpY2tlclZhbHVlOiBEYXRlKSB7XHJcbiAgICByZXR1cm4gZGF0ZUZucy5zZXRNaWxsaXNlY29uZHMoXHJcbiAgICAgIGRhdGVGbnMuc2V0U2Vjb25kcyhcclxuICAgICAgICBkYXRlRm5zLnNldE1pbnV0ZXMoZGF0ZUZucy5zZXRIb3VycyhkYXRlUGlja2VyVmFsdWUsIGRhdGVGbnMuZ2V0SG91cnModGltZVBpY2tlclZhbHVlKSksIGRhdGVGbnMuZ2V0TWludXRlcyh0aW1lUGlja2VyVmFsdWUpKSxcclxuICAgICAgICBkYXRlRm5zLmdldFNlY29uZHModGltZVBpY2tlclZhbHVlKSxcclxuICAgICAgKSxcclxuICAgICAgZGF0ZUZucy5nZXRNaWxsaXNlY29uZHModGltZVBpY2tlclZhbHVlKSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvLyBWYWx1ZUFjY2Vzc29yIEZ1bmN0aW9uc1xyXG4gIHdyaXRlVmFsdWUobW9kZWw6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xyXG4gICAgaWYgKEhlbHBlcnMuaXNFbXB0eShtb2RlbCkpIHtcclxuICAgICAgdGhpcy5tb2RlbCA9IG5ldyBEYXRlKCk7XHJcbiAgICB9IGVsc2UgaWYgKCFpc05hTihtb2RlbCkpIHtcclxuICAgICAgdGhpcy5tb2RlbCA9IG5ldyBEYXRlKG1vZGVsKTtcclxuICAgIH1cclxuICAgIHRoaXMuZGF0ZVBpY2tlclZhbHVlID0gdGhpcy5tb2RlbDtcclxuICAgIHRoaXMudGltZVBpY2tlclZhbHVlID0gdGhpcy5tb2RlbDtcclxuICAgIGlmIChIZWxwZXJzLmlzRGF0ZSh0aGlzLm1vZGVsKSkge1xyXG4gICAgICB0aGlzLnNldERhdGVMYWJlbHModGhpcy5tb2RlbCk7XHJcbiAgICAgIHRoaXMuc2V0VGltZUxhYmVscyh0aGlzLm1vZGVsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcclxuICB9XHJcbn1cclxuIl19