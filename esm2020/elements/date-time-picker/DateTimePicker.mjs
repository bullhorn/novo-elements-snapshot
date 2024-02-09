// NG2
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// Vendor
import { getHours, getMilliseconds, getMinutes, getSeconds, setHours, setMilliseconds, setMinutes, setSeconds } from 'date-fns';
// APP
import { NovoLabelService } from 'novo-elements/services';
import { Helpers } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "novo-elements/elements/date-picker";
import * as i3 from "novo-elements/elements/time-picker";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
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
    onModelChange(event) {
        this.model = this.createFullDateValue(this.datePickerValue, event);
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
        if (this.defaultTime === 'start') {
            this.timePickerValue = new Date(this.timePickerValue.setHours(0, 0, 0));
        }
        else if (this.defaultTime === 'end') {
            this.timePickerValue = new Date(this.timePickerValue.setHours(23, 59, 59));
        }
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
        return setMilliseconds(setSeconds(setMinutes(setHours(datePickerValue, getHours(timePickerValue)), getMinutes(timePickerValue)), getSeconds(timePickerValue)), getMilliseconds(timePickerValue));
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
            this.setDateLabels(this.datePickerValue);
            this.setTimeLabels(this.timePickerValue);
        }
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
}
NovoDateTimePickerElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDateTimePickerElement, deps: [{ token: i1.NovoLabelService }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
NovoDateTimePickerElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDateTimePickerElement, selector: "novo-date-time-picker", inputs: { defaultTime: "defaultTime", minYear: "minYear", maxYear: "maxYear", start: "start", end: "end", military: "military", weekStart: "weekStart", disabledDateMessage: "disabledDateMessage" }, outputs: { onSelect: "onSelect" }, providers: [DATE_TIME_PICKER_VALUE_ACCESSOR], ngImport: i0, template: `
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
            inline
            [minYear]="minYear"
            [maxYear]="maxYear"
            [start]="start"
            [end]="end"
            [disabledDateMessage]="disabledDateMessage"
            [weekStart]="weekStart"
          ></novo-date-picker>
        </div>
        <div class="time-picker">
          <novo-time-picker (onSelect)="onTimeSelected($event)" [(ngModel)]="model" (ngModelChange)="onModelChange($event)" [military]="military" inline></novo-time-picker>
        </div>
      </div>
    </div>
  `, isInline: true, styles: [":host{display:block;width:-webkit-min-content;width:-moz-min-content;width:min-content;overflow:hidden;border-radius:4px;background-color:#fff;box-shadow:0 1px 3px #00000026,0 2px 7px #0000001a;z-index:9001}:host .date-time-container{position:relative}:host .date-time-container .view-container{position:relative}:host .date-time-container ::ng-deep .time-picker{position:absolute;height:100%;width:100%;background:#fff;transform:translate(100%);transition:transform .2s ease-in-out;z-index:10;top:0}:host .date-time-container ::ng-deep .time-picker novo-time-picker{width:inherit;border-radius:0}:host .date-time-container ::ng-deep .time-picker .increments{width:unset}:host .date-time-container ::ng-deep .time-picker .increments novo-list-item{width:auto}:host .date-time-container .date-time-tabs{border-bottom:1px solid #e0e0e0;display:flex;align-items:center;justify-content:space-between;position:relative;height:45px}:host .date-time-container .date-time-tabs>span{color:#4a89dc;text-align:center;flex:1;cursor:pointer;transition:opacity .2s ease-in-out;opacity:.6}:host .date-time-container .date-time-tabs>span:hover{opacity:1!important}:host .date-time-container .date-time-tabs>span .meridian{text-transform:uppercase}:host .date-time-container .date-time-tabs .date-time-indicator{position:absolute;width:50%;height:2px;bottom:0;left:0;background:#4a89dc;transition:transform .2s ease-in-out}:host .calendar{box-shadow:none;background:transparent}:host .digital{height:45px}:host novo-time-picker{box-shadow:none}:host novo-time-picker .analog{margin:0}\n"], components: [{ type: i2.NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "disabledDateMessage", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }, { type: i3.NovoTimePickerElement, selector: "novo-time-picker", inputs: ["military", "analog", "inline", "step", "hasButtons", "saveDisabled"], outputs: ["onSelect", "onSave", "onCancel"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], animations: [
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
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDateTimePickerElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-date-time-picker', providers: [DATE_TIME_PICKER_VALUE_ACCESSOR], animations: [
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
                    ], template: `
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
            inline
            [minYear]="minYear"
            [maxYear]="maxYear"
            [start]="start"
            [end]="end"
            [disabledDateMessage]="disabledDateMessage"
            [weekStart]="weekStart"
          ></novo-date-picker>
        </div>
        <div class="time-picker">
          <novo-time-picker (onSelect)="onTimeSelected($event)" [(ngModel)]="model" (ngModelChange)="onModelChange($event)" [military]="military" inline></novo-time-picker>
        </div>
      </div>
    </div>
  `, styles: [":host{display:block;width:-webkit-min-content;width:-moz-min-content;width:min-content;overflow:hidden;border-radius:4px;background-color:#fff;box-shadow:0 1px 3px #00000026,0 2px 7px #0000001a;z-index:9001}:host .date-time-container{position:relative}:host .date-time-container .view-container{position:relative}:host .date-time-container ::ng-deep .time-picker{position:absolute;height:100%;width:100%;background:#fff;transform:translate(100%);transition:transform .2s ease-in-out;z-index:10;top:0}:host .date-time-container ::ng-deep .time-picker novo-time-picker{width:inherit;border-radius:0}:host .date-time-container ::ng-deep .time-picker .increments{width:unset}:host .date-time-container ::ng-deep .time-picker .increments novo-list-item{width:auto}:host .date-time-container .date-time-tabs{border-bottom:1px solid #e0e0e0;display:flex;align-items:center;justify-content:space-between;position:relative;height:45px}:host .date-time-container .date-time-tabs>span{color:#4a89dc;text-align:center;flex:1;cursor:pointer;transition:opacity .2s ease-in-out;opacity:.6}:host .date-time-container .date-time-tabs>span:hover{opacity:1!important}:host .date-time-container .date-time-tabs>span .meridian{text-transform:uppercase}:host .date-time-container .date-time-tabs .date-time-indicator{position:absolute;width:50%;height:2px;bottom:0;left:0;background:#4a89dc;transition:transform .2s ease-in-out}:host .calendar{box-shadow:none;background:transparent}:host .digital{height:45px}:host novo-time-picker{box-shadow:none}:host novo-time-picker .analog{margin:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }, { type: i0.ElementRef }]; }, propDecorators: { defaultTime: [{
                type: Input
            }], minYear: [{
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
            }], disabledDateMessage: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVRpbWVQaWNrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9kYXRlLXRpbWUtcGlja2VyL0RhdGVUaW1lUGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsU0FBUztBQUNULE9BQU8sRUFBTyxRQUFRLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3JJLE1BQU07QUFDTixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7Ozs7QUFFOUMsc0RBQXNEO0FBQ3RELE1BQU0sK0JBQStCLEdBQUc7SUFDdEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHlCQUF5QixDQUFDO0lBQ3hELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQStHRixNQUFNLE9BQU8seUJBQXlCO0lBaUNwQyxZQUFtQixNQUF3QixFQUFVLE9BQW1CO1FBQXJELFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQW5CeEUsY0FBUyxHQUFRLENB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QUFDLGVBQWUsQ0FBQyxDQUFDO3lCQUN0RCxDQUFDO3FCQUNILFlBQ1M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUNUO2dJQUtELFdBQVc7c0JBRFYsS0FBSztnQkFHTixPQUFPO3NCQUROLEtBQUs7Z0JBR04sT0FBTztzQkFETixLQUFLO2dCQUdOLEtBQUs7c0JBREosS0FBSztnQkFHTixHQUFHO3NCQURGLEtBQUs7Z0JBR04sUUFBUTtzQkFEUCxLQUFLO2dCQUdOLFNBQVM7c0JBRFIsS0FBSztnQkFHTixtQkFBbUI7c0JBRGxCLEtBQUs7Z0JBSU4sUUFBUTtzQkFEUCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBhbmltYXRlLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBWZW5kb3JcbmltcG9ydCB7IERheSwgZ2V0SG91cnMsIGdldE1pbGxpc2Vjb25kcywgZ2V0TWludXRlcywgZ2V0U2Vjb25kcywgc2V0SG91cnMsIHNldE1pbGxpc2Vjb25kcywgc2V0TWludXRlcywgc2V0U2Vjb25kcyB9IGZyb20gJ2RhdGUtZm5zJztcbi8vIEFQUFxuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcbmNvbnN0IERBVEVfVElNRV9QSUNLRVJfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvRGF0ZVRpbWVQaWNrZXJFbGVtZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWRhdGUtdGltZS1waWNrZXInLFxuICBwcm92aWRlcnM6IFtEQVRFX1RJTUVfUElDS0VSX1ZBTFVFX0FDQ0VTU09SXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2RhdGVUZXh0U3RhdGUnLCBbXG4gICAgICBzdGF0ZShcbiAgICAgICAgJ2RhdGUnLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogJzEuMCcsXG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICAgIHN0YXRlKFxuICAgICAgICAndGltZScsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5OiAnMC42JyxcbiAgICAgICAgfSksXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbignZGF0ZSA8PT4gdGltZScsIGFuaW1hdGUoJzIwMG1zIGVhc2UtaW4nKSksXG4gICAgXSksXG4gICAgdHJpZ2dlcigndGltZVRleHRTdGF0ZScsIFtcbiAgICAgIHN0YXRlKFxuICAgICAgICAnZGF0ZScsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5OiAnMC42JyxcbiAgICAgICAgfSksXG4gICAgICApLFxuICAgICAgc3RhdGUoXG4gICAgICAgICd0aW1lJyxcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIG9wYWNpdHk6ICcxLjAnLFxuICAgICAgICB9KSxcbiAgICAgICksXG4gICAgICB0cmFuc2l0aW9uKCdkYXRlIDw9PiB0aW1lJywgYW5pbWF0ZSgnMjAwbXMgZWFzZS1pbicpKSxcbiAgICBdKSxcbiAgICB0cmlnZ2VyKCdpbmRpY2F0b3JTdGF0ZScsIFtcbiAgICAgIHN0YXRlKFxuICAgICAgICAnZGF0ZScsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDAlKScsXG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICAgIHN0YXRlKFxuICAgICAgICAndGltZScsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDEwMCUpJyxcbiAgICAgICAgfSksXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbignZGF0ZSA8PT4gdGltZScsIGFuaW1hdGUoJzIwMG1zIGVhc2UtaW4nKSksXG4gICAgXSksXG4gICAgdHJpZ2dlcignY29udGFpbmVyU3RhdGUnLCBbXG4gICAgICBzdGF0ZShcbiAgICAgICAgJ2RhdGUnLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwJSknLFxuICAgICAgICB9KSxcbiAgICAgICksXG4gICAgICBzdGF0ZShcbiAgICAgICAgJ3RpbWUnLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtMTAwJSknLFxuICAgICAgICB9KSxcbiAgICAgICksXG4gICAgICB0cmFuc2l0aW9uKCdkYXRlIDw9PiB0aW1lJywgYW5pbWF0ZSgnMjAwbXMgZWFzZS1pbicpKSxcbiAgICBdKSxcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiZGF0ZS10aW1lLWNvbnRhaW5lclwiPlxuICAgICAgPGRpdiBjbGFzcz1cImRhdGUtdGltZS10YWJzXCI+XG4gICAgICAgIDxzcGFuXG4gICAgICAgICAgY2xhc3M9XCJkYXRlLXRhYlwiXG4gICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZVZpZXcoJ2RhdGUnKVwiXG4gICAgICAgICAgW0BkYXRlVGV4dFN0YXRlXT1cImNvbXBvbmVudFRhYlN0YXRlXCJcbiAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRhdGUtdGltZS1kYXRlLXRhYlwiXG4gICAgICAgICAgPnt7IHNlbGVjdGVkTGFiZWwgfX08L3NwYW5cbiAgICAgICAgPlxuICAgICAgICA8c3BhblxuICAgICAgICAgIGNsYXNzPVwidGltZS10YWJcIlxuICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVWaWV3KCd0aW1lJylcIlxuICAgICAgICAgIFtAdGltZVRleHRTdGF0ZV09XCJjb21wb25lbnRUYWJTdGF0ZVwiXG4gICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1kYXRlLXRpbWUtdGltZS10YWJcIlxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJob3Vyc1wiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tdGltZS1waWNrZXItaG91cnNcIj57eyBob3VycyB9fTwvc3BhblxuICAgICAgICAgID46PHNwYW4gY2xhc3M9XCJtaW51dGVzXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by10aW1lLXBpY2tlci1taW51dGVzXCI+e3sgbWludXRlcyB9fTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFtaWxpdGFyeVwiIGNsYXNzPVwibWVyaWRpYW5cIj4ge3sgbWVyaWRpYW4gfX08L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPGkgY2xhc3M9XCJkYXRlLXRpbWUtaW5kaWNhdG9yXCIgW0BpbmRpY2F0b3JTdGF0ZV09XCJjb21wb25lbnRUYWJTdGF0ZVwiPjwvaT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInZpZXctY29udGFpbmVyXCIgW0Bjb250YWluZXJTdGF0ZV09XCJjb21wb25lbnRUYWJTdGF0ZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXJcIj5cbiAgICAgICAgICA8bm92by1kYXRlLXBpY2tlclxuICAgICAgICAgICAgKG9uU2VsZWN0KT1cIm9uRGF0ZVNlbGVjdGVkKCRldmVudClcIlxuICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJtb2RlbFwiXG4gICAgICAgICAgICBpbmxpbmVcbiAgICAgICAgICAgIFttaW5ZZWFyXT1cIm1pblllYXJcIlxuICAgICAgICAgICAgW21heFllYXJdPVwibWF4WWVhclwiXG4gICAgICAgICAgICBbc3RhcnRdPVwic3RhcnRcIlxuICAgICAgICAgICAgW2VuZF09XCJlbmRcIlxuICAgICAgICAgICAgW2Rpc2FibGVkRGF0ZU1lc3NhZ2VdPVwiZGlzYWJsZWREYXRlTWVzc2FnZVwiXG4gICAgICAgICAgICBbd2Vla1N0YXJ0XT1cIndlZWtTdGFydFwiXG4gICAgICAgICAgPjwvbm92by1kYXRlLXBpY2tlcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lLXBpY2tlclwiPlxuICAgICAgICAgIDxub3ZvLXRpbWUtcGlja2VyIChvblNlbGVjdCk9XCJvblRpbWVTZWxlY3RlZCgkZXZlbnQpXCIgWyhuZ01vZGVsKV09XCJtb2RlbFwiIChuZ01vZGVsQ2hhbmdlKT1cIm9uTW9kZWxDaGFuZ2UoJGV2ZW50KVwiIFttaWxpdGFyeV09XCJtaWxpdGFyeVwiIGlubGluZT48L25vdm8tdGltZS1waWNrZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuL19EYXRlVGltZVBpY2tlci5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRlVGltZVBpY2tlckVsZW1lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBJbnB1dCgpXG4gIGRlZmF1bHRUaW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIG1pblllYXI6IHN0cmluZyB8IG51bWJlcjtcbiAgQElucHV0KClcbiAgbWF4WWVhcjogc3RyaW5nIHwgbnVtYmVyO1xuICBASW5wdXQoKVxuICBzdGFydDogRGF0ZTtcbiAgQElucHV0KClcbiAgZW5kOiBEYXRlO1xuICBASW5wdXQoKVxuICBtaWxpdGFyeTogYm9vbGVhbjtcbiAgQElucHV0KClcbiAgd2Vla1N0YXJ0OiBEYXkgPSAwO1xuICBASW5wdXQoKVxuICBkaXNhYmxlZERhdGVNZXNzYWdlOiBzdHJpbmc7XG4gIC8vIFNlbGVjdCBjYWxsYmFjayBmb3Igb3V0cHV0XG4gIEBPdXRwdXQoKVxuICBvblNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcblxuICBjb21wb25lbnRUYWJTdGF0ZTogc3RyaW5nID0gJ2RhdGUnO1xuICBzZWxlY3RlZExhYmVsOiBzdHJpbmc7XG4gIGhvdXJzOiBzdHJpbmc7XG4gIG1pbnV0ZXM6IHN0cmluZztcbiAgbWVyaWRpYW46IHN0cmluZztcbiAgZGF0ZVBpY2tlclZhbHVlOiBEYXRlID0gbmV3IERhdGUoKTtcbiAgdGltZVBpY2tlclZhbHVlOiBEYXRlID0gbmV3IERhdGUoKTtcblxuICBtb2RlbDogYW55O1xuICBfb25DaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gIF9vblRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgY29uc3RydWN0b3IocHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSwgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmKSB7fVxuXG4gIHRvZ2dsZVZpZXcodGFiOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmNvbXBvbmVudFRhYlN0YXRlID0gdGFiO1xuICB9XG5cbiAgb25Nb2RlbENoYW5nZShldmVudCkge1xuICAgIHRoaXMubW9kZWwgPSB0aGlzLmNyZWF0ZUZ1bGxEYXRlVmFsdWUodGhpcy5kYXRlUGlja2VyVmFsdWUsIGV2ZW50KTtcbiAgfVxuXG4gIHNldERhdGVMYWJlbHModmFsdWU6IERhdGUpIHtcbiAgICB0aGlzLnNlbGVjdGVkTGFiZWwgPSB0aGlzLmxhYmVscy5mb3JtYXREYXRlV2l0aEZvcm1hdCh2YWx1ZSwge1xuICAgICAgbW9udGg6ICdzaG9ydCcsXG4gICAgICBkYXk6ICcyLWRpZ2l0JyxcbiAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICB9KTtcbiAgfVxuXG4gIHNldFRpbWVMYWJlbHModmFsdWU6IERhdGUpIHtcbiAgICBsZXQgaG91cnMgPSB2YWx1ZS5nZXRIb3VycygpO1xuICAgIGNvbnN0IG1pbnV0ZXMgPSB2YWx1ZS5nZXRNaW51dGVzKCk7XG5cbiAgICB0aGlzLm1lcmlkaWFuID0gdmFsdWUudG9Mb2NhbGVUaW1lU3RyaW5nKCkuc2xpY2UoLTIpO1xuXG4gICAgaWYgKCF0aGlzLm1pbGl0YXJ5KSB7XG4gICAgICBob3VycyA9IHRoaXMubWVyaWRpYW4gPT09ICdQTScgJiYgaG91cnMgPiAxMiA/IGhvdXJzIC0gMTIgOiBob3VycztcblxuICAgICAgLy8gU3BlY2lhbCBjYXNlIGZvciAxMlxuICAgICAgaWYgKHRoaXMubWVyaWRpYW4gPT09ICdQTScgJiYgaG91cnMgPT09IDI0KSB7XG4gICAgICAgIGhvdXJzID0gMTI7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMubWVyaWRpYW4gPT09ICdBTScgJiYgaG91cnMgPT09IDApIHtcbiAgICAgICAgaG91cnMgPSAxMjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmhvdXJzID0gaG91cnMudG9TdHJpbmcoKTtcbiAgICB0aGlzLm1pbnV0ZXMgPSBtaW51dGVzLnRvU3RyaW5nKCkubGVuZ3RoID09PSAxID8gYDAke21pbnV0ZXMudG9TdHJpbmcoKX1gIDogbWludXRlcy50b1N0cmluZygpO1xuICB9XG5cbiAgb25EYXRlU2VsZWN0ZWQoZXZlbnQ6IHsgbW9udGg/OiBhbnk7IHllYXI/OiBhbnk7IGRheT86IGFueTsgZGF0ZT86IERhdGUgfSkge1xuICAgIHRoaXMuZGF0ZVBpY2tlclZhbHVlID0gZXZlbnQuZGF0ZTtcbiAgICBpZiAodGhpcy5kZWZhdWx0VGltZSA9PT0gJ3N0YXJ0Jykge1xuICAgICAgdGhpcy50aW1lUGlja2VyVmFsdWUgPSBuZXcgRGF0ZSh0aGlzLnRpbWVQaWNrZXJWYWx1ZS5zZXRIb3VycygwLCAwLCAwKSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmRlZmF1bHRUaW1lID09PSAnZW5kJykge1xuICAgICAgdGhpcy50aW1lUGlja2VyVmFsdWUgPSBuZXcgRGF0ZSh0aGlzLnRpbWVQaWNrZXJWYWx1ZS5zZXRIb3VycygyMywgNTksIDU5KSk7XG4gICAgfVxuICAgIHRoaXMubW9kZWwgPSB0aGlzLmNyZWF0ZUZ1bGxEYXRlVmFsdWUodGhpcy5kYXRlUGlja2VyVmFsdWUsIHRoaXMudGltZVBpY2tlclZhbHVlKTtcbiAgICB0aGlzLnNldERhdGVMYWJlbHModGhpcy5tb2RlbCk7XG4gICAgdGhpcy5vblNlbGVjdC5lbWl0KHsgZGF0ZTogdGhpcy5tb2RlbCB9KTtcbiAgICB0aGlzLl9vbkNoYW5nZSh0aGlzLm1vZGVsKTtcbiAgICB0aGlzLnRvZ2dsZVZpZXcoJ3RpbWUnKTtcbiAgfVxuXG4gIG9uVGltZVNlbGVjdGVkKGV2ZW50OiB7IGhvdXJzPzogbnVtYmVyOyBtaW51dGVzPzogbnVtYmVyOyBtZXJpZGlhbj86IHN0cmluZzsgZGF0ZT86IERhdGU7IHRleHQ/OiBzdHJpbmcgfSkge1xuICAgIHRoaXMudGltZVBpY2tlclZhbHVlID0gZXZlbnQuZGF0ZTtcbiAgICB0aGlzLm1vZGVsID0gdGhpcy5jcmVhdGVGdWxsRGF0ZVZhbHVlKHRoaXMubW9kZWwsIHRoaXMudGltZVBpY2tlclZhbHVlKTtcbiAgICB0aGlzLnNldFRpbWVMYWJlbHModGhpcy5tb2RlbCk7XG4gICAgdGhpcy5vblNlbGVjdC5lbWl0KHsgZGF0ZTogdGhpcy5tb2RlbCB9KTtcbiAgICB0aGlzLl9vbkNoYW5nZSh0aGlzLm1vZGVsKTtcbiAgfVxuXG4gIGNyZWF0ZUZ1bGxEYXRlVmFsdWUoZGF0ZVBpY2tlclZhbHVlOiBEYXRlLCB0aW1lUGlja2VyVmFsdWU6IERhdGUpIHtcbiAgICByZXR1cm4gc2V0TWlsbGlzZWNvbmRzKFxuICAgICAgc2V0U2Vjb25kcyhcbiAgICAgICAgc2V0TWludXRlcyhzZXRIb3VycyhkYXRlUGlja2VyVmFsdWUsIGdldEhvdXJzKHRpbWVQaWNrZXJWYWx1ZSkpLCBnZXRNaW51dGVzKHRpbWVQaWNrZXJWYWx1ZSkpLFxuICAgICAgICBnZXRTZWNvbmRzKHRpbWVQaWNrZXJWYWx1ZSksXG4gICAgICApLFxuICAgICAgZ2V0TWlsbGlzZWNvbmRzKHRpbWVQaWNrZXJWYWx1ZSksXG4gICAgKTtcbiAgfVxuXG4gIC8vIFZhbHVlQWNjZXNzb3IgRnVuY3Rpb25zXG4gIHdyaXRlVmFsdWUobW9kZWw6IGFueSk6IHZvaWQge1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICBpZiAoSGVscGVycy5pc0VtcHR5KG1vZGVsKSkge1xuICAgICAgdGhpcy5tb2RlbCA9IG5ldyBEYXRlKCk7XG4gICAgfSBlbHNlIGlmICghaXNOYU4obW9kZWwpKSB7XG4gICAgICB0aGlzLm1vZGVsID0gbmV3IERhdGUobW9kZWwpO1xuICAgIH1cbiAgICB0aGlzLmRhdGVQaWNrZXJWYWx1ZSA9IHRoaXMubW9kZWw7XG4gICAgdGhpcy50aW1lUGlja2VyVmFsdWUgPSB0aGlzLm1vZGVsO1xuICAgIGlmIChIZWxwZXJzLmlzRGF0ZSh0aGlzLm1vZGVsKSkge1xuICAgICAgdGhpcy5zZXREYXRlTGFiZWxzKHRoaXMuZGF0ZVBpY2tlclZhbHVlKTtcbiAgICAgIHRoaXMuc2V0VGltZUxhYmVscyh0aGlzLnRpbWVQaWNrZXJWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cbn1cbiJdfQ==