// NG2
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { format, isValid, parse } from 'date-fns';
import { DateFormatService, NovoLabelService } from '../../services';
// APP
import { Helpers } from './../../utils/Helpers';
import * as i0 from "@angular/core";
import * as i1 from "../../services";
import * as i2 from "../list/List";
import * as i3 from "@angular/common";
// Value accessor for the component (supports ngModel)
const TIME_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoTimePickerElement),
    multi: true,
};
export var TIME_VALUE_FORMATS;
(function (TIME_VALUE_FORMATS) {
    TIME_VALUE_FORMATS["iso8601"] = "iso8601";
    TIME_VALUE_FORMATS["Date"] = "Date";
})(TIME_VALUE_FORMATS || (TIME_VALUE_FORMATS = {}));
export class NovoTimePickerElement {
    constructor(element, labels, dateFormatService, cdr) {
        this.element = element;
        this.labels = labels;
        this.dateFormatService = dateFormatService;
        this.cdr = cdr;
        this.military = false;
        this.analog = false;
        this.inline = false;
        this.step = 1;
        this.onSelect = new EventEmitter();
        this.hours = 12;
        this.minutes = 0;
        this.value = null;
        this.increments = [];
        this.MERIDIANS = ['am', 'pm'];
        this.MINUTES = ['05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '00'];
        this.HOURS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        this._onChange = () => { };
        this._onTouched = () => { };
    }
    flatten(arr) {
        return Array.prototype.concat(...arr);
    }
    ngOnInit() {
        if (this.military) {
            this.HOURS = ['0', ...this.HOURS, '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
        }
        if (!this.analog) {
            const mins = Array.from(Array(60 / this.step).keys()).map((i) => i * this.step);
            this.MINUTES = mins.map((m) => `${m}`.padStart(2, '0'));
        }
        this.ngOnChanges();
    }
    ngOnChanges(changes) {
        if (this.model) {
            this.init(this.model, false);
        }
        else {
            this.selected = null;
            this.init(new Date(), false);
        }
    }
    init(value, dispatch) {
        const _value = new Date(value);
        let hours = _value.getHours();
        let minutes = _value.getMinutes();
        if (!this.military) {
            this.meridian = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours || 12;
        }
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        this.setHours(null, hours, dispatch);
        this.setMinutes(null, minutes, dispatch);
        this.checkBetween(minutes);
    }
    checkBetween(value) {
        this.inBetween = this.MINUTES.indexOf(String(value)) < 0;
    }
    setValue(event, value) {
        Helpers.swallowEvent(event);
        this.selected = value;
        const [time, meridian] = value.split(' ');
        const [hours, minutes] = time.split(':');
        this.hours = hours;
        this.minutes = minutes;
        this.meridian = meridian;
        this.dispatchChange();
    }
    setHours(event, hours, dispatch) {
        Helpers.swallowEvent(event);
        this.hours = hours;
        this.hoursClass = `hour-${hours}`;
        this.activeHour = hours;
        if (dispatch) {
            this.dispatchChange();
        }
    }
    setMinutes(event, minutes, dispatch) {
        Helpers.swallowEvent(event);
        this.minutes = minutes;
        this.minutesClass = `min-${minutes}`;
        this.activeMinute = minutes;
        this.checkBetween(minutes);
        if (dispatch) {
            this.dispatchChange();
        }
    }
    setPeriod(event, period, dispatch) {
        Helpers.swallowEvent(event);
        this.meridian = period;
        if (dispatch) {
            this.dispatchChange();
        }
    }
    dispatchChange() {
        let hours = Number(this.hours);
        if (!this.military) {
            hours = this.meridian.toLowerCase() === 'pm' ? hours + 12 : hours;
            // Special case for 12
            if (this.meridian.toLowerCase() === 'pm' && hours === 24) {
                hours = 12;
            }
            else if (this.meridian.toLowerCase() === 'am' && hours === 12) {
                hours = 0;
            }
        }
        const value = new Date();
        value.setHours(hours);
        value.setMinutes(this.minutes);
        value.setSeconds(0);
        this.value = `${this.hours}:${this.minutes} ${this.meridian}`;
        this.onSelect.next({
            hours,
            minutes: this.minutes,
            meridian: this.meridian,
            date: value,
            text: this.value,
        });
        this._onChange(value);
    }
    // ValueAccessor Functions
    writeValue(model) {
        this.model = model;
        if (Helpers.isDate(model)) {
            this.init(model, false);
            // this.dispatchChange();
        }
        if (Helpers.isString(model)) {
            const time = this.military ? model : this.convertTime12to24(model);
            const date = parse(`${format(Date.now(), 'YYYY-MM-DD')}T${time}`);
            if (isValid(date)) {
                this.init(date, false);
                // this.dispatchChange();
            }
        }
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    convertTime12to24(time12h) {
        const pmFormat = this.labels.timeFormatPM.toUpperCase();
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') {
            hours = '00';
        }
        if (['PM', pmFormat].includes(modifier)) {
            hours = `${parseInt(hours, 10) + 12}`.padStart(2, '0');
        }
        return `${hours}:${minutes}`;
    }
}
NovoTimePickerElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoTimePickerElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i1.DateFormatService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NovoTimePickerElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoTimePickerElement, selector: "novo-time-picker", inputs: { military: "military", analog: "analog", inline: "inline", step: "step" }, outputs: { onSelect: "onSelect" }, host: { properties: { "class.military": "military" }, classAttribute: "novo-time-picker" }, providers: [TIME_PICKER_VALUE_ACCESSOR], usesOnChanges: true, ngImport: i0, template: `
    <!-- <div class="digital" [class.inline]="inline" [class.military]="military" *ngIf="inline">
      <div class="digital--inner">
        <span class="digital--clock" *ngIf="analog">
          <span class="hours" data-automation-id="novo-time-picker-hours">{{ hours }}</span
          >:<span class="minutes" data-automation-id="novo-time-picker-minutes">{{ minutes }}</span>
        </span>
        <div class="control-block" *ngIf="!military && analog">
          <span
            *ngFor="let period of MERIDIANS"
            class="digital--period"
            [class.active]="meridian == period"
            (click)="setPeriod($event, period, true)"
            [attr.data-automation-id]="period"
            >{{ period }}</span
          >
        </div>
      </div>
    </div> -->
    <div class="increments" *ngIf="!analog">
      <novo-list class="increments--hours" direction="vertical" data-automation-id="novo-time-picker-hours">
        <novo-list-item
          class="increments--hour"
          *ngFor="let increment of HOURS"
          (click)="setHours($event, increment, true)"
          [class.active]="increment == activeHour"
          [attr.data-automation-id]="increment"
        >
          <item-content>{{ increment }}</item-content>
        </novo-list-item>
      </novo-list>
      <novo-list class="increments--minutes" direction="vertical" data-automation-id="novo-time-picker-minutes">
        <novo-list-item
          class="increments--minute"
          *ngFor="let increment of MINUTES"
          (click)="setMinutes($event, increment, true)"
          [class.active]="increment == activeMinute"
          [attr.data-automation-id]="increment"
        >
          <item-content>{{ increment }}</item-content>
        </novo-list-item>
      </novo-list>
      <novo-list class="increments--meridians" direction="vertical" *ngIf="!military" data-automation-id="novo-time-picker-meridians">
        <novo-list-item
          class="increments--meridian"
          *ngFor="let period of MERIDIANS"
          (click)="setPeriod($event, period, true)"
          [class.active]="meridian == period"
          [attr.data-automation-id]="period"
        >
          <item-content>{{ period }}</item-content>
        </novo-list-item>
      </novo-list>
    </div>
    <div class="analog" *ngIf="analog">
      <div class="analog--inner">
        <div class="analog--face">
          <span class="analog--center"></span>
          <span class="analog--hand--hours" [ngClass]="hoursClass">
            <span class="analog--ball"></span>
          </span>
          <span class="analog--hand--minutes" [ngClass]="minutesClass">
            <span class="analog--ball" [ngClass]="{ between: inBetween }"></span>
          </span>
        </div>
        <div class="analog--hours">
          <span
            *ngFor="let hour of HOURS"
            class="analog--hour"
            [ngClass]="{ active: activeHour == hour }"
            (click)="setHours($event, hour, true)"
            [attr.data-automation-id]="hour"
            >{{ hour }}</span
          >
        </div>
        <div class="analog--minutes">
          <span
            *ngFor="let minute of MINUTES"
            class="analog--minute"
            [ngClass]="{ active: activeMinute == minute }"
            (click)="setMinutes($event, minute, true)"
            [attr.data-automation-id]="minute"
            >{{ minute }}</span
          >
        </div>
      </div>
    </div>
  `, isInline: true, components: [{ type: i2.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { type: i2.NovoListItemElement, selector: "novo-list-item, a[list-item], button[list-item]" }, { type: i2.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoTimePickerElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-time-picker',
                    providers: [TIME_PICKER_VALUE_ACCESSOR],
                    template: `
    <!-- <div class="digital" [class.inline]="inline" [class.military]="military" *ngIf="inline">
      <div class="digital--inner">
        <span class="digital--clock" *ngIf="analog">
          <span class="hours" data-automation-id="novo-time-picker-hours">{{ hours }}</span
          >:<span class="minutes" data-automation-id="novo-time-picker-minutes">{{ minutes }}</span>
        </span>
        <div class="control-block" *ngIf="!military && analog">
          <span
            *ngFor="let period of MERIDIANS"
            class="digital--period"
            [class.active]="meridian == period"
            (click)="setPeriod($event, period, true)"
            [attr.data-automation-id]="period"
            >{{ period }}</span
          >
        </div>
      </div>
    </div> -->
    <div class="increments" *ngIf="!analog">
      <novo-list class="increments--hours" direction="vertical" data-automation-id="novo-time-picker-hours">
        <novo-list-item
          class="increments--hour"
          *ngFor="let increment of HOURS"
          (click)="setHours($event, increment, true)"
          [class.active]="increment == activeHour"
          [attr.data-automation-id]="increment"
        >
          <item-content>{{ increment }}</item-content>
        </novo-list-item>
      </novo-list>
      <novo-list class="increments--minutes" direction="vertical" data-automation-id="novo-time-picker-minutes">
        <novo-list-item
          class="increments--minute"
          *ngFor="let increment of MINUTES"
          (click)="setMinutes($event, increment, true)"
          [class.active]="increment == activeMinute"
          [attr.data-automation-id]="increment"
        >
          <item-content>{{ increment }}</item-content>
        </novo-list-item>
      </novo-list>
      <novo-list class="increments--meridians" direction="vertical" *ngIf="!military" data-automation-id="novo-time-picker-meridians">
        <novo-list-item
          class="increments--meridian"
          *ngFor="let period of MERIDIANS"
          (click)="setPeriod($event, period, true)"
          [class.active]="meridian == period"
          [attr.data-automation-id]="period"
        >
          <item-content>{{ period }}</item-content>
        </novo-list-item>
      </novo-list>
    </div>
    <div class="analog" *ngIf="analog">
      <div class="analog--inner">
        <div class="analog--face">
          <span class="analog--center"></span>
          <span class="analog--hand--hours" [ngClass]="hoursClass">
            <span class="analog--ball"></span>
          </span>
          <span class="analog--hand--minutes" [ngClass]="minutesClass">
            <span class="analog--ball" [ngClass]="{ between: inBetween }"></span>
          </span>
        </div>
        <div class="analog--hours">
          <span
            *ngFor="let hour of HOURS"
            class="analog--hour"
            [ngClass]="{ active: activeHour == hour }"
            (click)="setHours($event, hour, true)"
            [attr.data-automation-id]="hour"
            >{{ hour }}</span
          >
        </div>
        <div class="analog--minutes">
          <span
            *ngFor="let minute of MINUTES"
            class="analog--minute"
            [ngClass]="{ active: activeMinute == minute }"
            (click)="setMinutes($event, minute, true)"
            [attr.data-automation-id]="minute"
            >{{ minute }}</span
          >
        </div>
      </div>
    </div>
  `,
                    host: {
                        class: 'novo-time-picker',
                        '[class.military]': 'military',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i1.DateFormatService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { military: [{
                type: Input
            }], analog: [{
                type: Input
            }], inline: [{
                type: Input
            }], step: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZVBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3RpbWUtcGlja2VyL1RpbWVQaWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFHTCxNQUFNLEdBRVAsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRSxNQUFNO0FBQ04sT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7OztBQUVoRCxzREFBc0Q7QUFDdEQsTUFBTSwwQkFBMEIsR0FBRztJQUNqQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMscUJBQXFCLENBQUM7SUFDcEQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBRUYsTUFBTSxDQUFOLElBQVksa0JBR1g7QUFIRCxXQUFZLGtCQUFrQjtJQUM1Qix5Q0FBbUIsQ0FBQTtJQUNuQixtQ0FBYSxDQUFBO0FBQ2YsQ0FBQyxFQUhXLGtCQUFrQixLQUFsQixrQkFBa0IsUUFHN0I7QUFrR0QsTUFBTSxPQUFPLHFCQUFxQjtJQW1DaEMsWUFDUyxPQUFtQixFQUNuQixNQUF3QixFQUN4QixpQkFBb0MsRUFDakMsR0FBc0I7UUFIekIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUN4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LFFBQVE7c0JBRFAsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBmb3JtYXQsIGlzVmFsaWQsIHBhcnNlIH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHsgRGF0ZUZvcm1hdFNlcnZpY2UsIE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcyc7XG4vLyBBUFBcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICcuLy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xuXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcbmNvbnN0IFRJTUVfUElDS0VSX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b1RpbWVQaWNrZXJFbGVtZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5leHBvcnQgZW51bSBUSU1FX1ZBTFVFX0ZPUk1BVFMge1xuICBpc284NjAxID0gJ2lzbzg2MDEnLFxuICBEYXRlID0gJ0RhdGUnLFxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXRpbWUtcGlja2VyJyxcbiAgcHJvdmlkZXJzOiBbVElNRV9QSUNLRVJfVkFMVUVfQUNDRVNTT1JdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDwhLS0gPGRpdiBjbGFzcz1cImRpZ2l0YWxcIiBbY2xhc3MuaW5saW5lXT1cImlubGluZVwiIFtjbGFzcy5taWxpdGFyeV09XCJtaWxpdGFyeVwiICpuZ0lmPVwiaW5saW5lXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZGlnaXRhbC0taW5uZXJcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJkaWdpdGFsLS1jbG9ja1wiICpuZ0lmPVwiYW5hbG9nXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJob3Vyc1wiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tdGltZS1waWNrZXItaG91cnNcIj57eyBob3VycyB9fTwvc3BhblxuICAgICAgICAgID46PHNwYW4gY2xhc3M9XCJtaW51dGVzXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by10aW1lLXBpY2tlci1taW51dGVzXCI+e3sgbWludXRlcyB9fTwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbC1ibG9ja1wiICpuZ0lmPVwiIW1pbGl0YXJ5ICYmIGFuYWxvZ1wiPlxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgcGVyaW9kIG9mIE1FUklESUFOU1wiXG4gICAgICAgICAgICBjbGFzcz1cImRpZ2l0YWwtLXBlcmlvZFwiXG4gICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIm1lcmlkaWFuID09IHBlcmlvZFwiXG4gICAgICAgICAgICAoY2xpY2spPVwic2V0UGVyaW9kKCRldmVudCwgcGVyaW9kLCB0cnVlKVwiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwicGVyaW9kXCJcbiAgICAgICAgICAgID57eyBwZXJpb2QgfX08L3NwYW5cbiAgICAgICAgICA+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+IC0tPlxuICAgIDxkaXYgY2xhc3M9XCJpbmNyZW1lbnRzXCIgKm5nSWY9XCIhYW5hbG9nXCI+XG4gICAgICA8bm92by1saXN0IGNsYXNzPVwiaW5jcmVtZW50cy0taG91cnNcIiBkaXJlY3Rpb249XCJ2ZXJ0aWNhbFwiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tdGltZS1waWNrZXItaG91cnNcIj5cbiAgICAgICAgPG5vdm8tbGlzdC1pdGVtXG4gICAgICAgICAgY2xhc3M9XCJpbmNyZW1lbnRzLS1ob3VyXCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgaW5jcmVtZW50IG9mIEhPVVJTXCJcbiAgICAgICAgICAoY2xpY2spPVwic2V0SG91cnMoJGV2ZW50LCBpbmNyZW1lbnQsIHRydWUpXCJcbiAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImluY3JlbWVudCA9PSBhY3RpdmVIb3VyXCJcbiAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiaW5jcmVtZW50XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxpdGVtLWNvbnRlbnQ+e3sgaW5jcmVtZW50IH19PC9pdGVtLWNvbnRlbnQ+XG4gICAgICAgIDwvbm92by1saXN0LWl0ZW0+XG4gICAgICA8L25vdm8tbGlzdD5cbiAgICAgIDxub3ZvLWxpc3QgY2xhc3M9XCJpbmNyZW1lbnRzLS1taW51dGVzXCIgZGlyZWN0aW9uPVwidmVydGljYWxcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLXRpbWUtcGlja2VyLW1pbnV0ZXNcIj5cbiAgICAgICAgPG5vdm8tbGlzdC1pdGVtXG4gICAgICAgICAgY2xhc3M9XCJpbmNyZW1lbnRzLS1taW51dGVcIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBpbmNyZW1lbnQgb2YgTUlOVVRFU1wiXG4gICAgICAgICAgKGNsaWNrKT1cInNldE1pbnV0ZXMoJGV2ZW50LCBpbmNyZW1lbnQsIHRydWUpXCJcbiAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImluY3JlbWVudCA9PSBhY3RpdmVNaW51dGVcIlxuICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJpbmNyZW1lbnRcIlxuICAgICAgICA+XG4gICAgICAgICAgPGl0ZW0tY29udGVudD57eyBpbmNyZW1lbnQgfX08L2l0ZW0tY29udGVudD5cbiAgICAgICAgPC9ub3ZvLWxpc3QtaXRlbT5cbiAgICAgIDwvbm92by1saXN0PlxuICAgICAgPG5vdm8tbGlzdCBjbGFzcz1cImluY3JlbWVudHMtLW1lcmlkaWFuc1wiIGRpcmVjdGlvbj1cInZlcnRpY2FsXCIgKm5nSWY9XCIhbWlsaXRhcnlcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLXRpbWUtcGlja2VyLW1lcmlkaWFuc1wiPlxuICAgICAgICA8bm92by1saXN0LWl0ZW1cbiAgICAgICAgICBjbGFzcz1cImluY3JlbWVudHMtLW1lcmlkaWFuXCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgcGVyaW9kIG9mIE1FUklESUFOU1wiXG4gICAgICAgICAgKGNsaWNrKT1cInNldFBlcmlvZCgkZXZlbnQsIHBlcmlvZCwgdHJ1ZSlcIlxuICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwibWVyaWRpYW4gPT0gcGVyaW9kXCJcbiAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwicGVyaW9kXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxpdGVtLWNvbnRlbnQ+e3sgcGVyaW9kIH19PC9pdGVtLWNvbnRlbnQ+XG4gICAgICAgIDwvbm92by1saXN0LWl0ZW0+XG4gICAgICA8L25vdm8tbGlzdD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiYW5hbG9nXCIgKm5nSWY9XCJhbmFsb2dcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhbmFsb2ctLWlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbmFsb2ctLWZhY2VcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImFuYWxvZy0tY2VudGVyXCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYW5hbG9nLS1oYW5kLS1ob3Vyc1wiIFtuZ0NsYXNzXT1cImhvdXJzQ2xhc3NcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYW5hbG9nLS1iYWxsXCI+PC9zcGFuPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImFuYWxvZy0taGFuZC0tbWludXRlc1wiIFtuZ0NsYXNzXT1cIm1pbnV0ZXNDbGFzc1wiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhbmFsb2ctLWJhbGxcIiBbbmdDbGFzc109XCJ7IGJldHdlZW46IGluQmV0d2VlbiB9XCI+PC9zcGFuPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbmFsb2ctLWhvdXJzXCI+XG4gICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBob3VyIG9mIEhPVVJTXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYW5hbG9nLS1ob3VyXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgYWN0aXZlOiBhY3RpdmVIb3VyID09IGhvdXIgfVwiXG4gICAgICAgICAgICAoY2xpY2spPVwic2V0SG91cnMoJGV2ZW50LCBob3VyLCB0cnVlKVwiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiaG91clwiXG4gICAgICAgICAgICA+e3sgaG91ciB9fTwvc3BhblxuICAgICAgICAgID5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbmFsb2ctLW1pbnV0ZXNcIj5cbiAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IG1pbnV0ZSBvZiBNSU5VVEVTXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYW5hbG9nLS1taW51dGVcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyBhY3RpdmU6IGFjdGl2ZU1pbnV0ZSA9PSBtaW51dGUgfVwiXG4gICAgICAgICAgICAoY2xpY2spPVwic2V0TWludXRlcygkZXZlbnQsIG1pbnV0ZSwgdHJ1ZSlcIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIm1pbnV0ZVwiXG4gICAgICAgICAgICA+e3sgbWludXRlIH19PC9zcGFuXG4gICAgICAgICAgPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLXRpbWUtcGlja2VyJyxcbiAgICAnW2NsYXNzLm1pbGl0YXJ5XSc6ICdtaWxpdGFyeScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9UaW1lUGlja2VyRWxlbWVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpXG4gIG1pbGl0YXJ5OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIGFuYWxvZzogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBpbmxpbmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgc3RlcDogbnVtYmVyID0gMTtcblxuICBAT3V0cHV0KClcbiAgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGhvdXJzOiBudW1iZXIgPSAxMjtcbiAgbWludXRlczogbnVtYmVyID0gMDtcbiAgdmFsdWU6IGFueSA9IG51bGw7XG4gIG1lcmlkaWFuOiBzdHJpbmc7XG4gIGluQmV0d2VlbjogYm9vbGVhbjtcbiAgaG91cnNDbGFzczogc3RyaW5nO1xuICBhY3RpdmVIb3VyO1xuICBtaW51dGVzQ2xhc3M6IHN0cmluZztcbiAgYWN0aXZlTWludXRlO1xuICBpbmNyZW1lbnRzOiBzdHJpbmdbXSA9IFtdO1xuICBzZWxlY3RlZDogc3RyaW5nO1xuICBNRVJJRElBTlM6IEFycmF5PHN0cmluZz4gPSBbJ2FtJywgJ3BtJ107XG4gIE1JTlVURVM6IEFycmF5PHN0cmluZz4gPSBbJzA1JywgJzEwJywgJzE1JywgJzIwJywgJzI1JywgJzMwJywgJzM1JywgJzQwJywgJzQ1JywgJzUwJywgJzU1JywgJzAwJ107XG4gIEhPVVJTOiBBcnJheTxzdHJpbmc+ID0gWycxJywgJzInLCAnMycsICc0JywgJzUnLCAnNicsICc3JywgJzgnLCAnOScsICcxMCcsICcxMScsICcxMiddO1xuICBtb2RlbDogYW55O1xuICBfb25DaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gIF9vblRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgZmxhdHRlbihhcnIpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdCguLi5hcnIpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSxcbiAgICBwdWJsaWMgZGF0ZUZvcm1hdFNlcnZpY2U6IERhdGVGb3JtYXRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMubWlsaXRhcnkpIHtcbiAgICAgIHRoaXMuSE9VUlMgPSBbJzAnLCAuLi50aGlzLkhPVVJTLCAnMTMnLCAnMTQnLCAnMTUnLCAnMTYnLCAnMTcnLCAnMTgnLCAnMTknLCAnMjAnLCAnMjEnLCAnMjInLCAnMjMnXTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmFuYWxvZykge1xuICAgICAgY29uc3QgbWlucyA9IEFycmF5LmZyb20oQXJyYXkoNjAgLyB0aGlzLnN0ZXApLmtleXMoKSkubWFwKChpKSA9PiBpICogdGhpcy5zdGVwKTtcbiAgICAgIHRoaXMuTUlOVVRFUyA9IG1pbnMubWFwKChtKSA9PiBgJHttfWAucGFkU3RhcnQoMiwgJzAnKSk7XG4gICAgfVxuICAgIHRoaXMubmdPbkNoYW5nZXMoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM/OiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgIHRoaXMuaW5pdCh0aGlzLm1vZGVsLCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xuICAgICAgdGhpcy5pbml0KG5ldyBEYXRlKCksIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBpbml0KHZhbHVlLCBkaXNwYXRjaCkge1xuICAgIGNvbnN0IF92YWx1ZSA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICBsZXQgaG91cnM6IHN0cmluZyB8IG51bWJlciA9IF92YWx1ZS5nZXRIb3VycygpO1xuICAgIGxldCBtaW51dGVzOiBzdHJpbmcgfCBudW1iZXIgPSBfdmFsdWUuZ2V0TWludXRlcygpO1xuXG4gICAgaWYgKCF0aGlzLm1pbGl0YXJ5KSB7XG4gICAgICB0aGlzLm1lcmlkaWFuID0gaG91cnMgPj0gMTIgPyAncG0nIDogJ2FtJztcbiAgICAgIGhvdXJzID0gaG91cnMgJSAxMjtcbiAgICAgIGhvdXJzID0gaG91cnMgfHwgMTI7XG4gICAgfVxuICAgIG1pbnV0ZXMgPSBtaW51dGVzIDwgMTAgPyBgMCR7bWludXRlc31gIDogbWludXRlcztcblxuICAgIHRoaXMuc2V0SG91cnMobnVsbCwgaG91cnMsIGRpc3BhdGNoKTtcbiAgICB0aGlzLnNldE1pbnV0ZXMobnVsbCwgbWludXRlcywgZGlzcGF0Y2gpO1xuICAgIHRoaXMuY2hlY2tCZXR3ZWVuKG1pbnV0ZXMpO1xuICB9XG5cbiAgY2hlY2tCZXR3ZWVuKHZhbHVlKSB7XG4gICAgdGhpcy5pbkJldHdlZW4gPSB0aGlzLk1JTlVURVMuaW5kZXhPZihTdHJpbmcodmFsdWUpKSA8IDA7XG4gIH1cblxuICBzZXRWYWx1ZShldmVudCwgdmFsdWUpIHtcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHZhbHVlO1xuICAgIGNvbnN0IFt0aW1lLCBtZXJpZGlhbl0gPSB2YWx1ZS5zcGxpdCgnICcpO1xuICAgIGNvbnN0IFtob3VycywgbWludXRlc10gPSB0aW1lLnNwbGl0KCc6Jyk7XG4gICAgdGhpcy5ob3VycyA9IGhvdXJzO1xuICAgIHRoaXMubWludXRlcyA9IG1pbnV0ZXM7XG4gICAgdGhpcy5tZXJpZGlhbiA9IG1lcmlkaWFuO1xuXG4gICAgdGhpcy5kaXNwYXRjaENoYW5nZSgpO1xuICB9XG5cbiAgc2V0SG91cnMoZXZlbnQsIGhvdXJzLCBkaXNwYXRjaCkge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICB0aGlzLmhvdXJzID0gaG91cnM7XG4gICAgdGhpcy5ob3Vyc0NsYXNzID0gYGhvdXItJHtob3Vyc31gO1xuICAgIHRoaXMuYWN0aXZlSG91ciA9IGhvdXJzO1xuXG4gICAgaWYgKGRpc3BhdGNoKSB7XG4gICAgICB0aGlzLmRpc3BhdGNoQ2hhbmdlKCk7XG4gICAgfVxuICB9XG5cbiAgc2V0TWludXRlcyhldmVudCwgbWludXRlcywgZGlzcGF0Y2gpIHtcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgdGhpcy5taW51dGVzID0gbWludXRlcztcbiAgICB0aGlzLm1pbnV0ZXNDbGFzcyA9IGBtaW4tJHttaW51dGVzfWA7XG4gICAgdGhpcy5hY3RpdmVNaW51dGUgPSBtaW51dGVzO1xuICAgIHRoaXMuY2hlY2tCZXR3ZWVuKG1pbnV0ZXMpO1xuXG4gICAgaWYgKGRpc3BhdGNoKSB7XG4gICAgICB0aGlzLmRpc3BhdGNoQ2hhbmdlKCk7XG4gICAgfVxuICB9XG5cbiAgc2V0UGVyaW9kKGV2ZW50LCBwZXJpb2QsIGRpc3BhdGNoKSB7XG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIHRoaXMubWVyaWRpYW4gPSBwZXJpb2Q7XG5cbiAgICBpZiAoZGlzcGF0Y2gpIHtcbiAgICAgIHRoaXMuZGlzcGF0Y2hDaGFuZ2UoKTtcbiAgICB9XG4gIH1cblxuICBkaXNwYXRjaENoYW5nZSgpIHtcbiAgICBsZXQgaG91cnMgPSBOdW1iZXIodGhpcy5ob3Vycyk7XG5cbiAgICBpZiAoIXRoaXMubWlsaXRhcnkpIHtcbiAgICAgIGhvdXJzID0gdGhpcy5tZXJpZGlhbi50b0xvd2VyQ2FzZSgpID09PSAncG0nID8gaG91cnMgKyAxMiA6IGhvdXJzO1xuXG4gICAgICAvLyBTcGVjaWFsIGNhc2UgZm9yIDEyXG4gICAgICBpZiAodGhpcy5tZXJpZGlhbi50b0xvd2VyQ2FzZSgpID09PSAncG0nICYmIGhvdXJzID09PSAyNCkge1xuICAgICAgICBob3VycyA9IDEyO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm1lcmlkaWFuLnRvTG93ZXJDYXNlKCkgPT09ICdhbScgJiYgaG91cnMgPT09IDEyKSB7XG4gICAgICAgIGhvdXJzID0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZSA9IG5ldyBEYXRlKCk7XG4gICAgdmFsdWUuc2V0SG91cnMoaG91cnMpO1xuICAgIHZhbHVlLnNldE1pbnV0ZXModGhpcy5taW51dGVzKTtcbiAgICB2YWx1ZS5zZXRTZWNvbmRzKDApO1xuICAgIHRoaXMudmFsdWUgPSBgJHt0aGlzLmhvdXJzfToke3RoaXMubWludXRlc30gJHt0aGlzLm1lcmlkaWFufWA7XG4gICAgdGhpcy5vblNlbGVjdC5uZXh0KHtcbiAgICAgIGhvdXJzLFxuICAgICAgbWludXRlczogdGhpcy5taW51dGVzLFxuICAgICAgbWVyaWRpYW46IHRoaXMubWVyaWRpYW4sXG4gICAgICBkYXRlOiB2YWx1ZSxcbiAgICAgIHRleHQ6IHRoaXMudmFsdWUsXG4gICAgfSk7XG4gICAgdGhpcy5fb25DaGFuZ2UodmFsdWUpO1xuICB9XG5cbiAgLy8gVmFsdWVBY2Nlc3NvciBGdW5jdGlvbnNcbiAgd3JpdGVWYWx1ZShtb2RlbDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIGlmIChIZWxwZXJzLmlzRGF0ZShtb2RlbCkpIHtcbiAgICAgIHRoaXMuaW5pdChtb2RlbCwgZmFsc2UpO1xuICAgICAgLy8gdGhpcy5kaXNwYXRjaENoYW5nZSgpO1xuICAgIH1cbiAgICBpZiAoSGVscGVycy5pc1N0cmluZyhtb2RlbCkpIHtcbiAgICAgIGNvbnN0IHRpbWUgPSB0aGlzLm1pbGl0YXJ5ID8gbW9kZWwgOiB0aGlzLmNvbnZlcnRUaW1lMTJ0bzI0KG1vZGVsKTtcbiAgICAgIGNvbnN0IGRhdGUgPSBwYXJzZShgJHtmb3JtYXQoRGF0ZS5ub3coKSwgJ1lZWVktTU0tREQnKX1UJHt0aW1lfWApO1xuICAgICAgaWYgKGlzVmFsaWQoZGF0ZSkpIHtcbiAgICAgICAgdGhpcy5pbml0KGRhdGUsIGZhbHNlKTtcbiAgICAgICAgLy8gdGhpcy5kaXNwYXRjaENoYW5nZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMuX29uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgY29udmVydFRpbWUxMnRvMjQodGltZTEyaDogc3RyaW5nKSB7XG4gICAgY29uc3QgcG1Gb3JtYXQgPSB0aGlzLmxhYmVscy50aW1lRm9ybWF0UE0udG9VcHBlckNhc2UoKTtcblxuICAgIGNvbnN0IFt0aW1lLCBtb2RpZmllcl0gPSB0aW1lMTJoLnNwbGl0KCcgJyk7XG4gICAgbGV0IFtob3VycywgbWludXRlc10gPSB0aW1lLnNwbGl0KCc6Jyk7XG4gICAgaWYgKGhvdXJzID09PSAnMTInKSB7XG4gICAgICBob3VycyA9ICcwMCc7XG4gICAgfVxuICAgIGlmIChbJ1BNJywgcG1Gb3JtYXRdLmluY2x1ZGVzKG1vZGlmaWVyKSkge1xuICAgICAgaG91cnMgPSBgJHtwYXJzZUludChob3VycywgMTApICsgMTJ9YC5wYWRTdGFydCgyLCAnMCcpO1xuICAgIH1cbiAgICByZXR1cm4gYCR7aG91cnN9OiR7bWludXRlc31gO1xuICB9XG59XG4iXX0=