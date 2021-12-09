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
            [disabledDateMessage]="disabledDateMessage"
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
    disabledDateMessage: [{ type: Input }],
    onSelect: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVRpbWVQaWNrZXIuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZGF0ZS10aW1lLXBpY2tlci9EYXRlVGltZVBpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9GLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakYsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLFNBQVM7QUFDVCxPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQztBQUNwQyxNQUFNO0FBQ04sT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRXJFLHNEQUFzRDtBQUN0RCxNQUFNLCtCQUErQixHQUFHO0lBQ3RDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztJQUN4RCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUE4R0YsTUFBTSxPQUFPLHlCQUF5QjtJQStCcEMsWUFBbUIsTUFBd0IsRUFBVSxPQUFtQjtRQUFyRCxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFuQnhFLGNBQVMsR0FBVyxDQUFDLENBQUM7UUFHdEIsNkJBQTZCO1FBRTdCLGFBQVEsR0FBc0IsSUFBSSxZQUFZLENB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QWdCO3lCQUM1QixDQUFDLENBQ0g7d0JBQ0QsS0FBSyxDQUNILE1BQU0sRUFDTixLQUFLLENBQUM7NEJBQ0osU0FBUyxFQUFFLGtCQUFrQjt5QkFDOUIsQ0FBQyxDQUNIO3dCQUNELFVBQVUsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO3FCQUN0RCxDQUFDO29CQUNGLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRTt3QkFDeEIsS0FBSyxDQUNILE1BQU0sRUFDTixLQUFLLENBQUM7NEJBQ0osU0FBUyxFQUFFLGdCQUFnQjt5QkFDNUIsQ0FBQyxDQUNIO3dCQUNELEtBQUssQ0FDSCxNQUFNLEVBQ04sS0FBSyxDQUFDOzRCQUNKLFNBQVMsRUFBRSxtQkFBbUI7eUJBQy9CLENBQUMsQ0FDSDt3QkFDRCxVQUFVLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztxQkFDdEQsQ0FBQztpQkFDSDtnQkFDRCxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUNUO2FBQ0Y7OztZQXBIUSxnQkFBZ0I7WUFQaEIsVUFBVTs7O3NCQTZIaEIsS0FBSztzQkFFTCxLQUFLO29CQUVMLEtBQUs7a0JBRUwsS0FBSzt1QkFFTCxLQUFLO3dCQUVMLEtBQUs7a0NBRUwsS0FBSzt1QkFHTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBFbGVtZW50UmVmLCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdHJpZ2dlciwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCBhbmltYXRlIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBWZW5kb3JcbmltcG9ydCAqIGFzIGRhdGVGbnMgZnJvbSAnZGF0ZS1mbnMnO1xuLy8gQVBQXG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vdXRpbHMvSGVscGVycyc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG5jb25zdCBEQVRFX1RJTUVfUElDS0VSX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b0RhdGVUaW1lUGlja2VyRWxlbWVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1kYXRlLXRpbWUtcGlja2VyJyxcbiAgcHJvdmlkZXJzOiBbREFURV9USU1FX1BJQ0tFUl9WQUxVRV9BQ0NFU1NPUl0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdkYXRlVGV4dFN0YXRlJywgW1xuICAgICAgc3RhdGUoXG4gICAgICAgICdkYXRlJyxcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIG9wYWNpdHk6ICcxLjAnLFxuICAgICAgICB9KSxcbiAgICAgICksXG4gICAgICBzdGF0ZShcbiAgICAgICAgJ3RpbWUnLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogJzAuNicsXG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oJ2RhdGUgPD0+IHRpbWUnLCBhbmltYXRlKCcyMDBtcyBlYXNlLWluJykpLFxuICAgIF0pLFxuICAgIHRyaWdnZXIoJ3RpbWVUZXh0U3RhdGUnLCBbXG4gICAgICBzdGF0ZShcbiAgICAgICAgJ2RhdGUnLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogJzAuNicsXG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICAgIHN0YXRlKFxuICAgICAgICAndGltZScsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5OiAnMS4wJyxcbiAgICAgICAgfSksXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbignZGF0ZSA8PT4gdGltZScsIGFuaW1hdGUoJzIwMG1zIGVhc2UtaW4nKSksXG4gICAgXSksXG4gICAgdHJpZ2dlcignaW5kaWNhdG9yU3RhdGUnLCBbXG4gICAgICBzdGF0ZShcbiAgICAgICAgJ2RhdGUnLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwJSknLFxuICAgICAgICB9KSxcbiAgICAgICksXG4gICAgICBzdGF0ZShcbiAgICAgICAgJ3RpbWUnLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgxMDAlKScsXG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oJ2RhdGUgPD0+IHRpbWUnLCBhbmltYXRlKCcyMDBtcyBlYXNlLWluJykpLFxuICAgIF0pLFxuICAgIHRyaWdnZXIoJ2NvbnRhaW5lclN0YXRlJywgW1xuICAgICAgc3RhdGUoXG4gICAgICAgICdkYXRlJyxcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCUpJyxcbiAgICAgICAgfSksXG4gICAgICApLFxuICAgICAgc3RhdGUoXG4gICAgICAgICd0aW1lJyxcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTEwMCUpJyxcbiAgICAgICAgfSksXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbignZGF0ZSA8PT4gdGltZScsIGFuaW1hdGUoJzIwMG1zIGVhc2UtaW4nKSksXG4gICAgXSksXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImRhdGUtdGltZS1jb250YWluZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJkYXRlLXRpbWUtdGFic1wiPlxuICAgICAgICA8c3BhblxuICAgICAgICAgIGNsYXNzPVwiZGF0ZS10YWJcIlxuICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVWaWV3KCdkYXRlJylcIlxuICAgICAgICAgIFtAZGF0ZVRleHRTdGF0ZV09XCJjb21wb25lbnRUYWJTdGF0ZVwiXG4gICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1kYXRlLXRpbWUtZGF0ZS10YWJcIlxuICAgICAgICAgID57eyBzZWxlY3RlZExhYmVsIH19PC9zcGFuXG4gICAgICAgID5cbiAgICAgICAgPHNwYW5cbiAgICAgICAgICBjbGFzcz1cInRpbWUtdGFiXCJcbiAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlVmlldygndGltZScpXCJcbiAgICAgICAgICBbQHRpbWVUZXh0U3RhdGVdPVwiY29tcG9uZW50VGFiU3RhdGVcIlxuICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZGF0ZS10aW1lLXRpbWUtdGFiXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaG91cnNcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLXRpbWUtcGlja2VyLWhvdXJzXCI+e3sgaG91cnMgfX08L3NwYW5cbiAgICAgICAgICA+OjxzcGFuIGNsYXNzPVwibWludXRlc1wiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tdGltZS1waWNrZXItbWludXRlc1wiPnt7IG1pbnV0ZXMgfX08L3NwYW4+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCIhbWlsaXRhcnlcIiBjbGFzcz1cIm1lcmlkaWFuXCI+IHt7IG1lcmlkaWFuIH19PC9zcGFuPlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxpIGNsYXNzPVwiZGF0ZS10aW1lLWluZGljYXRvclwiIFtAaW5kaWNhdG9yU3RhdGVdPVwiY29tcG9uZW50VGFiU3RhdGVcIj48L2k+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ2aWV3LWNvbnRhaW5lclwiIFtAY29udGFpbmVyU3RhdGVdPVwiY29tcG9uZW50VGFiU3RhdGVcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNhbGVuZGFyXCI+XG4gICAgICAgICAgPG5vdm8tZGF0ZS1waWNrZXJcbiAgICAgICAgICAgIChvblNlbGVjdCk9XCJvbkRhdGVTZWxlY3RlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgIFsobmdNb2RlbCldPVwibW9kZWxcIlxuICAgICAgICAgICAgaW5saW5lPVwidHJ1ZVwiXG4gICAgICAgICAgICBbbWluWWVhcl09XCJtaW5ZZWFyXCJcbiAgICAgICAgICAgIFttYXhZZWFyXT1cIm1heFllYXJcIlxuICAgICAgICAgICAgW3N0YXJ0XT1cInN0YXJ0XCJcbiAgICAgICAgICAgIFtlbmRdPVwiZW5kXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZERhdGVNZXNzYWdlXT1cImRpc2FibGVkRGF0ZU1lc3NhZ2VcIlxuICAgICAgICAgICAgW3dlZWtTdGFydF09XCJ3ZWVrU3RhcnRcIlxuICAgICAgICAgID48L25vdm8tZGF0ZS1waWNrZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGltZS1waWNrZXJcIj5cbiAgICAgICAgICA8bm92by10aW1lLXBpY2tlciAob25TZWxlY3QpPVwib25UaW1lU2VsZWN0ZWQoJGV2ZW50KVwiIFsobmdNb2RlbCldPVwibW9kZWxcIiBbbWlsaXRhcnldPVwibWlsaXRhcnlcIiBpbmxpbmU9XCJ0cnVlXCI+PC9ub3ZvLXRpbWUtcGlja2VyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGF0ZVRpbWVQaWNrZXJFbGVtZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBASW5wdXQoKVxuICBtaW5ZZWFyOiBhbnk7XG4gIEBJbnB1dCgpXG4gIG1heFllYXI6IGFueTtcbiAgQElucHV0KClcbiAgc3RhcnQ6IGFueTtcbiAgQElucHV0KClcbiAgZW5kOiBhbnk7XG4gIEBJbnB1dCgpXG4gIG1pbGl0YXJ5OiBhbnk7XG4gIEBJbnB1dCgpXG4gIHdlZWtTdGFydDogbnVtYmVyID0gMDtcbiAgQElucHV0KClcbiAgZGlzYWJsZWREYXRlTWVzc2FnZTogc3RyaW5nO1xuICAvLyBTZWxlY3QgY2FsbGJhY2sgZm9yIG91dHB1dFxuICBAT3V0cHV0KClcbiAgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcihmYWxzZSk7XG5cbiAgY29tcG9uZW50VGFiU3RhdGU6IHN0cmluZyA9ICdkYXRlJztcbiAgc2VsZWN0ZWRMYWJlbDogc3RyaW5nO1xuICBob3Vyczogc3RyaW5nO1xuICBtaW51dGVzOiBzdHJpbmc7XG4gIG1lcmlkaWFuOiBzdHJpbmc7XG4gIGRhdGVQaWNrZXJWYWx1ZTogRGF0ZSA9IG5ldyBEYXRlKCk7XG4gIHRpbWVQaWNrZXJWYWx1ZTogRGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgbW9kZWw6IGFueTtcbiAgX29uQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICBfb25Ub3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UsIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZikge31cblxuICB0b2dnbGVWaWV3KHRhYjogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5jb21wb25lbnRUYWJTdGF0ZSA9IHRhYjtcbiAgfVxuXG4gIHNldERhdGVMYWJlbHModmFsdWU6IERhdGUpIHtcbiAgICB0aGlzLnNlbGVjdGVkTGFiZWwgPSB0aGlzLmxhYmVscy5mb3JtYXREYXRlV2l0aEZvcm1hdCh2YWx1ZSwge1xuICAgICAgbW9udGg6ICdzaG9ydCcsXG4gICAgICBkYXk6ICcyLWRpZ2l0JyxcbiAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICB9KTtcbiAgfVxuXG4gIHNldFRpbWVMYWJlbHModmFsdWU6IERhdGUpIHtcbiAgICBsZXQgaG91cnMgPSB2YWx1ZS5nZXRIb3VycygpO1xuICAgIGNvbnN0IG1pbnV0ZXMgPSB2YWx1ZS5nZXRNaW51dGVzKCk7XG5cbiAgICB0aGlzLm1lcmlkaWFuID0gdmFsdWUudG9Mb2NhbGVUaW1lU3RyaW5nKCkuc2xpY2UoLTIpO1xuXG4gICAgaWYgKCF0aGlzLm1pbGl0YXJ5KSB7XG4gICAgICBob3VycyA9IHRoaXMubWVyaWRpYW4gPT09ICdQTScgJiYgaG91cnMgPiAxMiA/IGhvdXJzIC0gMTIgOiBob3VycztcblxuICAgICAgLy8gU3BlY2lhbCBjYXNlIGZvciAxMlxuICAgICAgaWYgKHRoaXMubWVyaWRpYW4gPT09ICdQTScgJiYgaG91cnMgPT09IDI0KSB7XG4gICAgICAgIGhvdXJzID0gMTI7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMubWVyaWRpYW4gPT09ICdBTScgJiYgaG91cnMgPT09IDApIHtcbiAgICAgICAgaG91cnMgPSAxMjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmhvdXJzID0gaG91cnMudG9TdHJpbmcoKTtcbiAgICB0aGlzLm1pbnV0ZXMgPSBtaW51dGVzLnRvU3RyaW5nKCkubGVuZ3RoID09PSAxID8gYDAke21pbnV0ZXMudG9TdHJpbmcoKX1gIDogbWludXRlcy50b1N0cmluZygpO1xuICB9XG5cbiAgb25EYXRlU2VsZWN0ZWQoZXZlbnQ6IHsgbW9udGg/OiBhbnk7IHllYXI/OiBhbnk7IGRheT86IGFueTsgZGF0ZT86IERhdGUgfSkge1xuICAgIHRoaXMuZGF0ZVBpY2tlclZhbHVlID0gZXZlbnQuZGF0ZTtcbiAgICB0aGlzLm1vZGVsID0gdGhpcy5jcmVhdGVGdWxsRGF0ZVZhbHVlKHRoaXMuZGF0ZVBpY2tlclZhbHVlLCB0aGlzLnRpbWVQaWNrZXJWYWx1ZSk7XG4gICAgdGhpcy5zZXREYXRlTGFiZWxzKHRoaXMubW9kZWwpO1xuICAgIHRoaXMub25TZWxlY3QuZW1pdCh7IGRhdGU6IHRoaXMubW9kZWwgfSk7XG4gICAgdGhpcy5fb25DaGFuZ2UodGhpcy5tb2RlbCk7XG4gICAgdGhpcy50b2dnbGVWaWV3KCd0aW1lJyk7XG4gIH1cblxuICBvblRpbWVTZWxlY3RlZChldmVudDogeyBob3Vycz86IG51bWJlcjsgbWludXRlcz86IG51bWJlcjsgbWVyaWRpYW4/OiBzdHJpbmc7IGRhdGU/OiBEYXRlOyB0ZXh0Pzogc3RyaW5nIH0pIHtcbiAgICB0aGlzLnRpbWVQaWNrZXJWYWx1ZSA9IGV2ZW50LmRhdGU7XG4gICAgdGhpcy5tb2RlbCA9IHRoaXMuY3JlYXRlRnVsbERhdGVWYWx1ZSh0aGlzLm1vZGVsLCB0aGlzLnRpbWVQaWNrZXJWYWx1ZSk7XG4gICAgdGhpcy5zZXRUaW1lTGFiZWxzKHRoaXMubW9kZWwpO1xuICAgIHRoaXMub25TZWxlY3QuZW1pdCh7IGRhdGU6IHRoaXMubW9kZWwgfSk7XG4gICAgdGhpcy5fb25DaGFuZ2UodGhpcy5tb2RlbCk7XG4gIH1cblxuICBjcmVhdGVGdWxsRGF0ZVZhbHVlKGRhdGVQaWNrZXJWYWx1ZTogRGF0ZSwgdGltZVBpY2tlclZhbHVlOiBEYXRlKSB7XG4gICAgcmV0dXJuIGRhdGVGbnMuc2V0TWlsbGlzZWNvbmRzKFxuICAgICAgZGF0ZUZucy5zZXRTZWNvbmRzKFxuICAgICAgICBkYXRlRm5zLnNldE1pbnV0ZXMoZGF0ZUZucy5zZXRIb3VycyhkYXRlUGlja2VyVmFsdWUsIGRhdGVGbnMuZ2V0SG91cnModGltZVBpY2tlclZhbHVlKSksIGRhdGVGbnMuZ2V0TWludXRlcyh0aW1lUGlja2VyVmFsdWUpKSxcbiAgICAgICAgZGF0ZUZucy5nZXRTZWNvbmRzKHRpbWVQaWNrZXJWYWx1ZSksXG4gICAgICApLFxuICAgICAgZGF0ZUZucy5nZXRNaWxsaXNlY29uZHModGltZVBpY2tlclZhbHVlKSxcbiAgICApO1xuICB9XG5cbiAgLy8gVmFsdWVBY2Nlc3NvciBGdW5jdGlvbnNcbiAgd3JpdGVWYWx1ZShtb2RlbDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIGlmIChIZWxwZXJzLmlzRW1wdHkobW9kZWwpKSB7XG4gICAgICB0aGlzLm1vZGVsID0gbmV3IERhdGUoKTtcbiAgICB9IGVsc2UgaWYgKCFpc05hTihtb2RlbCkpIHtcbiAgICAgIHRoaXMubW9kZWwgPSBuZXcgRGF0ZShtb2RlbCk7XG4gICAgfVxuICAgIHRoaXMuZGF0ZVBpY2tlclZhbHVlID0gdGhpcy5tb2RlbDtcbiAgICB0aGlzLnRpbWVQaWNrZXJWYWx1ZSA9IHRoaXMubW9kZWw7XG4gICAgaWYgKEhlbHBlcnMuaXNEYXRlKHRoaXMubW9kZWwpKSB7XG4gICAgICB0aGlzLnNldERhdGVMYWJlbHModGhpcy5tb2RlbCk7XG4gICAgICB0aGlzLnNldFRpbWVMYWJlbHModGhpcy5tb2RlbCk7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cbn1cbiJdfQ==