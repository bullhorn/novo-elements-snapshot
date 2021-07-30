// NG2
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// APP
import { Helpers } from './../../utils/Helpers';
// Value accessor for the component (supports ngModel)
const TIME_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoTimePickerElement),
    multi: true,
};
export class NovoTimePickerElement {
    constructor() {
        this.military = false;
        this.analog = false;
        this.inline = false;
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
            this.increments = this.flatten([...this.HOURS.map((hour) => [`${hour}:00`, `${hour}:15`, `${hour}:30`, `${hour}:45`])]);
        }
        else {
            const hours = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
            this.increments = this.flatten([
                ...hours.map((hour) => [`${hour}:00 AM`, `${hour}:15 AM`, `${hour}:30 AM`, `${hour}:45 AM`]),
                ...hours.map((hour) => [`${hour}:00 PM`, `${hour}:15 PM`, `${hour}:30 PM`, `${hour}:45 PM`]),
            ]);
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
        }
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
}
NovoTimePickerElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-time-picker',
                providers: [TIME_PICKER_VALUE_ACCESSOR],
                template: `
        <div class="digital" [class.inline]="inline" [class.military]="military">
            <div class="digital--inner">
                <span class="digital--clock" *ngIf="!inline">
                    <span class="hours" data-automation-id="novo-time-picker-hours">{{hours}}</span>:<span class="minutes" data-automation-id="novo-time-picker-minutes">{{minutes}}</span>
                </span>
                <div class="control-block" *ngIf="!military">
                    <span *ngFor="let period of MERIDIANS" class="digital--period" [class.active]="meridian==period" (click)="setPeriod($event, period, true)" [attr.data-automation-id]="period">{{period}}</span>
                </div>
            </div>
        </div>
        <div class="increments" *ngIf="!analog">
            <novo-list direction="vertical" data-automation-id="novo-time-picker-increments">
                <novo-list-item *ngFor="let increment of increments" (click)="setValue($event, increment)" [class.active]="increment==selected" [attr.data-automation-id]="increment">
                    <item-content>{{increment}}</item-content>
                    <i *ngIf="increment==selected" class="bhi-check"></i>
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
                        <span class="analog--ball" [ngClass]="{between: inBetween}"></span>
                    </span>
                </div>
                <div class="analog--hours">
                    <span *ngFor="let hour of HOURS" class="analog--hour" [ngClass]="{active: activeHour == hour}" (click)="setHours($event, hour, true)" [attr.data-automation-id]="hour">{{hour}}</span>
                </div>
                <div class="analog--minutes">
                    <span *ngFor="let minute of MINUTES" class="analog--minute" [ngClass]="{active: activeMinute == minute}" (click)="setMinutes($event, minute, true)" [attr.data-automation-id]="minute">{{minute}}</span>
                </div>
            </div>
        </div>
    `,
                host: {
                    '[class.military]': 'military',
                }
            },] }
];
NovoTimePickerElement.propDecorators = {
    military: [{ type: Input }],
    analog: [{ type: Input }],
    inline: [{ type: Input }],
    onSelect: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZVBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvdGltZS1waWNrZXIvVGltZVBpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQW9DLE1BQU0sZUFBZSxDQUFDO0FBQ3JILE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxNQUFNO0FBQ04sT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRWhELHNEQUFzRDtBQUN0RCxNQUFNLDBCQUEwQixHQUFHO0lBQ2pDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztJQUNwRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFnREYsTUFBTSxPQUFPLHFCQUFxQjtJQTlDbEM7UUFnREUsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUUxQixXQUFNLEdBQVksS0FBSyxDQUFDO1FBRXhCLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFFeEIsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWpELFVBQUssR0FBVyxFQUFFLENBQUM7UUFDbkIsWUFBTyxHQUFXLENBQUMsQ0FBQztRQUNwQixVQUFLLEdBQVEsSUFBSSxDQUFDO1FBT2xCLGVBQVUsR0FBYSxFQUFFLENBQUM7UUFFMUIsY0FBUyxHQUFrQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4QyxZQUFPLEdBQWtCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxF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LDBCQUEwQjtJQUMxQixVQUFVLENBQUMsS0FBVTtRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsRUFBWTtRQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBWTtRQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7WUFoTkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO2dCQUN2QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBc0NQO2dCQUNILElBQUksRUFBRTtvQkFDSixrQkFBa0IsRUFBRSxVQUFVO2lCQUMvQjthQUNGOzs7dUJBRUUsS0FBSztxQkFFTCxLQUFLO3FCQUVMLEtBQUs7dUJBRUwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5wdXQsIE91dHB1dCwgT25Jbml0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG4vLyBBUFBcclxuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4vLi4vLi4vdXRpbHMvSGVscGVycyc7XHJcblxyXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcclxuY29uc3QgVElNRV9QSUNLRVJfVkFMVUVfQUNDRVNTT1IgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b1RpbWVQaWNrZXJFbGVtZW50KSxcclxuICBtdWx0aTogdHJ1ZSxcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbm92by10aW1lLXBpY2tlcicsXHJcbiAgcHJvdmlkZXJzOiBbVElNRV9QSUNLRVJfVkFMVUVfQUNDRVNTT1JdLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImRpZ2l0YWxcIiBbY2xhc3MuaW5saW5lXT1cImlubGluZVwiIFtjbGFzcy5taWxpdGFyeV09XCJtaWxpdGFyeVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGlnaXRhbC0taW5uZXJcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGlnaXRhbC0tY2xvY2tcIiAqbmdJZj1cIiFpbmxpbmVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhvdXJzXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by10aW1lLXBpY2tlci1ob3Vyc1wiPnt7aG91cnN9fTwvc3Bhbj46PHNwYW4gY2xhc3M9XCJtaW51dGVzXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by10aW1lLXBpY2tlci1taW51dGVzXCI+e3ttaW51dGVzfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbC1ibG9ja1wiICpuZ0lmPVwiIW1pbGl0YXJ5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nRm9yPVwibGV0IHBlcmlvZCBvZiBNRVJJRElBTlNcIiBjbGFzcz1cImRpZ2l0YWwtLXBlcmlvZFwiIFtjbGFzcy5hY3RpdmVdPVwibWVyaWRpYW49PXBlcmlvZFwiIChjbGljayk9XCJzZXRQZXJpb2QoJGV2ZW50LCBwZXJpb2QsIHRydWUpXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cInBlcmlvZFwiPnt7cGVyaW9kfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImluY3JlbWVudHNcIiAqbmdJZj1cIiFhbmFsb2dcIj5cclxuICAgICAgICAgICAgPG5vdm8tbGlzdCBkaXJlY3Rpb249XCJ2ZXJ0aWNhbFwiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tdGltZS1waWNrZXItaW5jcmVtZW50c1wiPlxyXG4gICAgICAgICAgICAgICAgPG5vdm8tbGlzdC1pdGVtICpuZ0Zvcj1cImxldCBpbmNyZW1lbnQgb2YgaW5jcmVtZW50c1wiIChjbGljayk9XCJzZXRWYWx1ZSgkZXZlbnQsIGluY3JlbWVudClcIiBbY2xhc3MuYWN0aXZlXT1cImluY3JlbWVudD09c2VsZWN0ZWRcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiaW5jcmVtZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGl0ZW0tY29udGVudD57e2luY3JlbWVudH19PC9pdGVtLWNvbnRlbnQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGkgKm5nSWY9XCJpbmNyZW1lbnQ9PXNlbGVjdGVkXCIgY2xhc3M9XCJiaGktY2hlY2tcIj48L2k+XHJcbiAgICAgICAgICAgICAgICA8L25vdm8tbGlzdC1pdGVtPlxyXG4gICAgICAgICAgICA8L25vdm8tbGlzdD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYW5hbG9nXCIgKm5nSWY9XCJhbmFsb2dcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFuYWxvZy0taW5uZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbmFsb2ctLWZhY2VcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFuYWxvZy0tY2VudGVyXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYW5hbG9nLS1oYW5kLS1ob3Vyc1wiIFtuZ0NsYXNzXT1cImhvdXJzQ2xhc3NcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhbmFsb2ctLWJhbGxcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYW5hbG9nLS1oYW5kLS1taW51dGVzXCIgW25nQ2xhc3NdPVwibWludXRlc0NsYXNzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYW5hbG9nLS1iYWxsXCIgW25nQ2xhc3NdPVwie2JldHdlZW46IGluQmV0d2Vlbn1cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW5hbG9nLS1ob3Vyc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0Zvcj1cImxldCBob3VyIG9mIEhPVVJTXCIgY2xhc3M9XCJhbmFsb2ctLWhvdXJcIiBbbmdDbGFzc109XCJ7YWN0aXZlOiBhY3RpdmVIb3VyID09IGhvdXJ9XCIgKGNsaWNrKT1cInNldEhvdXJzKCRldmVudCwgaG91ciwgdHJ1ZSlcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiaG91clwiPnt7aG91cn19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW5hbG9nLS1taW51dGVzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nRm9yPVwibGV0IG1pbnV0ZSBvZiBNSU5VVEVTXCIgY2xhc3M9XCJhbmFsb2ctLW1pbnV0ZVwiIFtuZ0NsYXNzXT1cInthY3RpdmU6IGFjdGl2ZU1pbnV0ZSA9PSBtaW51dGV9XCIgKGNsaWNrKT1cInNldE1pbnV0ZXMoJGV2ZW50LCBtaW51dGUsIHRydWUpXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIm1pbnV0ZVwiPnt7bWludXRlfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gIGhvc3Q6IHtcclxuICAgICdbY2xhc3MubWlsaXRhcnldJzogJ21pbGl0YXJ5JyxcclxuICB9LFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b1RpbWVQaWNrZXJFbGVtZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKVxyXG4gIG1pbGl0YXJ5OiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KClcclxuICBhbmFsb2c6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKVxyXG4gIGlubGluZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBPdXRwdXQoKVxyXG4gIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgaG91cnM6IG51bWJlciA9IDEyO1xyXG4gIG1pbnV0ZXM6IG51bWJlciA9IDA7XHJcbiAgdmFsdWU6IGFueSA9IG51bGw7XHJcbiAgbWVyaWRpYW46IHN0cmluZztcclxuICBpbkJldHdlZW46IGJvb2xlYW47XHJcbiAgaG91cnNDbGFzczogc3RyaW5nO1xyXG4gIGFjdGl2ZUhvdXI7XHJcbiAgbWludXRlc0NsYXNzOiBzdHJpbmc7XHJcbiAgYWN0aXZlTWludXRlO1xyXG4gIGluY3JlbWVudHM6IHN0cmluZ1tdID0gW107XHJcbiAgc2VsZWN0ZWQ6IHN0cmluZztcclxuICBNRVJJRElBTlM6IEFycmF5PHN0cmluZz4gPSBbJ2FtJywgJ3BtJ107XHJcbiAgTUlOVVRFUzogQXJyYXk8c3RyaW5nPiA9IFsnMDUnLCAnMTAnLCAnMTUnLCAnMjAnLCAnMjUnLCAnMzAnLCAnMzUnLCAnNDAnLCAnNDUnLCAnNTAnLCAnNTUnLCAnMDAnXTtcclxuICBIT1VSUzogQXJyYXk8c3RyaW5nPiA9IFsnMScsICcyJywgJzMnLCAnNCcsICc1JywgJzYnLCAnNycsICc4JywgJzknLCAnMTAnLCAnMTEnLCAnMTInXTtcclxuICBtb2RlbDogYW55O1xyXG4gIF9vbkNoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcclxuICBfb25Ub3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xyXG5cclxuICBmbGF0dGVuKGFycikge1xyXG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5jb25jYXQoLi4uYXJyKTtcclxuICB9XHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5taWxpdGFyeSkge1xyXG4gICAgICB0aGlzLkhPVVJTID0gWycwJywgLi4udGhpcy5IT1VSUywgJzEzJywgJzE0JywgJzE1JywgJzE2JywgJzE3JywgJzE4JywgJzE5JywgJzIwJywgJzIxJywgJzIyJywgJzIzJ107XHJcbiAgICAgIHRoaXMuaW5jcmVtZW50cyA9IHRoaXMuZmxhdHRlbihbLi4udGhpcy5IT1VSUy5tYXAoKGhvdXIpID0+IFtgJHtob3VyfTowMGAsIGAke2hvdXJ9OjE1YCwgYCR7aG91cn06MzBgLCBgJHtob3VyfTo0NWBdKV0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgaG91cnM6IEFycmF5PHN0cmluZz4gPSBbJzEyJywgJzEnLCAnMicsICczJywgJzQnLCAnNScsICc2JywgJzcnLCAnOCcsICc5JywgJzEwJywgJzExJ107XHJcbiAgICAgIHRoaXMuaW5jcmVtZW50cyA9IHRoaXMuZmxhdHRlbihbXHJcbiAgICAgICAgLi4uaG91cnMubWFwKChob3VyKSA9PiBbYCR7aG91cn06MDAgQU1gLCBgJHtob3VyfToxNSBBTWAsIGAke2hvdXJ9OjMwIEFNYCwgYCR7aG91cn06NDUgQU1gXSksXHJcbiAgICAgICAgLi4uaG91cnMubWFwKChob3VyKSA9PiBbYCR7aG91cn06MDAgUE1gLCBgJHtob3VyfToxNSBQTWAsIGAke2hvdXJ9OjMwIFBNYCwgYCR7aG91cn06NDUgUE1gXSksXHJcbiAgICAgIF0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5uZ09uQ2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlcz86IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmICh0aGlzLm1vZGVsKSB7XHJcbiAgICAgIHRoaXMuaW5pdCh0aGlzLm1vZGVsLCBmYWxzZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkID0gbnVsbDtcclxuICAgICAgdGhpcy5pbml0KG5ldyBEYXRlKCksIGZhbHNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGluaXQodmFsdWUsIGRpc3BhdGNoKSB7XHJcbiAgICBjb25zdCBfdmFsdWUgPSBuZXcgRGF0ZSh2YWx1ZSk7XHJcbiAgICBsZXQgaG91cnM6IHN0cmluZyB8IG51bWJlciA9IF92YWx1ZS5nZXRIb3VycygpO1xyXG4gICAgbGV0IG1pbnV0ZXM6IHN0cmluZyB8IG51bWJlciA9IF92YWx1ZS5nZXRNaW51dGVzKCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLm1pbGl0YXJ5KSB7XHJcbiAgICAgIHRoaXMubWVyaWRpYW4gPSBob3VycyA+PSAxMiA/ICdwbScgOiAnYW0nO1xyXG4gICAgICBob3VycyA9IGhvdXJzICUgMTI7XHJcbiAgICAgIGhvdXJzID0gaG91cnMgfHwgMTI7XHJcbiAgICB9XHJcbiAgICBtaW51dGVzID0gbWludXRlcyA8IDEwID8gYDAke21pbnV0ZXN9YCA6IG1pbnV0ZXM7XHJcblxyXG4gICAgdGhpcy5zZXRIb3VycyhudWxsLCBob3VycywgZGlzcGF0Y2gpO1xyXG4gICAgdGhpcy5zZXRNaW51dGVzKG51bGwsIG1pbnV0ZXMsIGRpc3BhdGNoKTtcclxuICAgIHRoaXMuY2hlY2tCZXR3ZWVuKG1pbnV0ZXMpO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tCZXR3ZWVuKHZhbHVlKSB7XHJcbiAgICB0aGlzLmluQmV0d2VlbiA9IHRoaXMuTUlOVVRFUy5pbmRleE9mKFN0cmluZyh2YWx1ZSkpIDwgMDtcclxuICB9XHJcblxyXG4gIHNldFZhbHVlKGV2ZW50LCB2YWx1ZSkge1xyXG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xyXG4gICAgdGhpcy5zZWxlY3RlZCA9IHZhbHVlO1xyXG4gICAgY29uc3QgW3RpbWUsIG1lcmlkaWFuXSA9IHZhbHVlLnNwbGl0KCcgJyk7XHJcbiAgICBjb25zdCBbaG91cnMsIG1pbnV0ZXNdID0gdGltZS5zcGxpdCgnOicpO1xyXG4gICAgdGhpcy5ob3VycyA9IGhvdXJzO1xyXG4gICAgdGhpcy5taW51dGVzID0gbWludXRlcztcclxuICAgIHRoaXMubWVyaWRpYW4gPSBtZXJpZGlhbjtcclxuXHJcbiAgICB0aGlzLmRpc3BhdGNoQ2hhbmdlKCk7XHJcbiAgfVxyXG5cclxuICBzZXRIb3VycyhldmVudCwgaG91cnMsIGRpc3BhdGNoKSB7XHJcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XHJcbiAgICB0aGlzLmhvdXJzID0gaG91cnM7XHJcbiAgICB0aGlzLmhvdXJzQ2xhc3MgPSBgaG91ci0ke2hvdXJzfWA7XHJcbiAgICB0aGlzLmFjdGl2ZUhvdXIgPSBob3VycztcclxuXHJcbiAgICBpZiAoZGlzcGF0Y2gpIHtcclxuICAgICAgdGhpcy5kaXNwYXRjaENoYW5nZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0TWludXRlcyhldmVudCwgbWludXRlcywgZGlzcGF0Y2gpIHtcclxuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcclxuICAgIHRoaXMubWludXRlcyA9IG1pbnV0ZXM7XHJcbiAgICB0aGlzLm1pbnV0ZXNDbGFzcyA9IGBtaW4tJHttaW51dGVzfWA7XHJcbiAgICB0aGlzLmFjdGl2ZU1pbnV0ZSA9IG1pbnV0ZXM7XHJcbiAgICB0aGlzLmNoZWNrQmV0d2VlbihtaW51dGVzKTtcclxuXHJcbiAgICBpZiAoZGlzcGF0Y2gpIHtcclxuICAgICAgdGhpcy5kaXNwYXRjaENoYW5nZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0UGVyaW9kKGV2ZW50LCBwZXJpb2QsIGRpc3BhdGNoKSB7XHJcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XHJcbiAgICB0aGlzLm1lcmlkaWFuID0gcGVyaW9kO1xyXG5cclxuICAgIGlmIChkaXNwYXRjaCkge1xyXG4gICAgICB0aGlzLmRpc3BhdGNoQ2hhbmdlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkaXNwYXRjaENoYW5nZSgpIHtcclxuICAgIGxldCBob3VycyA9IE51bWJlcih0aGlzLmhvdXJzKTtcclxuXHJcbiAgICBpZiAoIXRoaXMubWlsaXRhcnkpIHtcclxuICAgICAgaG91cnMgPSB0aGlzLm1lcmlkaWFuLnRvTG93ZXJDYXNlKCkgPT09ICdwbScgPyBob3VycyArIDEyIDogaG91cnM7XHJcblxyXG4gICAgICAvLyBTcGVjaWFsIGNhc2UgZm9yIDEyXHJcbiAgICAgIGlmICh0aGlzLm1lcmlkaWFuLnRvTG93ZXJDYXNlKCkgPT09ICdwbScgJiYgaG91cnMgPT09IDI0KSB7XHJcbiAgICAgICAgaG91cnMgPSAxMjtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLm1lcmlkaWFuLnRvTG93ZXJDYXNlKCkgPT09ICdhbScgJiYgaG91cnMgPT09IDEyKSB7XHJcbiAgICAgICAgaG91cnMgPSAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdmFsdWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgdmFsdWUuc2V0SG91cnMoaG91cnMpO1xyXG4gICAgdmFsdWUuc2V0TWludXRlcyh0aGlzLm1pbnV0ZXMpO1xyXG4gICAgdmFsdWUuc2V0U2Vjb25kcygwKTtcclxuICAgIHRoaXMudmFsdWUgPSBgJHt0aGlzLmhvdXJzfToke3RoaXMubWludXRlc30gJHt0aGlzLm1lcmlkaWFufWA7XHJcbiAgICB0aGlzLm9uU2VsZWN0Lm5leHQoe1xyXG4gICAgICBob3VycyxcclxuICAgICAgbWludXRlczogdGhpcy5taW51dGVzLFxyXG4gICAgICBtZXJpZGlhbjogdGhpcy5tZXJpZGlhbixcclxuICAgICAgZGF0ZTogdmFsdWUsXHJcbiAgICAgIHRleHQ6IHRoaXMudmFsdWUsXHJcbiAgICB9KTtcclxuICAgIHRoaXMuX29uQ2hhbmdlKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIC8vIFZhbHVlQWNjZXNzb3IgRnVuY3Rpb25zXHJcbiAgd3JpdGVWYWx1ZShtb2RlbDogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XHJcbiAgICBpZiAoSGVscGVycy5pc0RhdGUobW9kZWwpKSB7XHJcbiAgICAgIHRoaXMuaW5pdChtb2RlbCwgZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgIHRoaXMuX29uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgIHRoaXMuX29uVG91Y2hlZCA9IGZuO1xyXG4gIH1cclxufVxyXG4iXX0=