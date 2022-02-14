// NG2
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { format, isValid, parse } from 'date-fns';
import { DateFormatService, NovoLabelService } from '../../services';
// APP
import { Helpers } from './../../utils/Helpers';
import * as i0 from "@angular/core";
import * as i1 from "../../services";
import * as i2 from "@angular/common";
import * as i3 from "../list/List";
function NovoTimePickerElement_div_0_novo_list_item_2_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-list-item", 6);
    i0.ɵɵlistener("click", function NovoTimePickerElement_div_0_novo_list_item_2_Template_novo_list_item_click_0_listener($event) { i0.ɵɵrestoreView(_r7); const increment_r5 = ctx.$implicit; const ctx_r6 = i0.ɵɵnextContext(2); return ctx_r6.setHours($event, increment_r5, true); });
    i0.ɵɵelementStart(1, "item-content");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const increment_r5 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", increment_r5 == ctx_r2.activeHour);
    i0.ɵɵattribute("data-automation-id", increment_r5);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(increment_r5);
} }
function NovoTimePickerElement_div_0_novo_list_item_4_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-list-item", 6);
    i0.ɵɵlistener("click", function NovoTimePickerElement_div_0_novo_list_item_4_Template_novo_list_item_click_0_listener($event) { i0.ɵɵrestoreView(_r10); const increment_r8 = ctx.$implicit; const ctx_r9 = i0.ɵɵnextContext(2); return ctx_r9.setMinutes($event, increment_r8, true); });
    i0.ɵɵelementStart(1, "item-content");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const increment_r8 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", increment_r8 == ctx_r3.activeMinute);
    i0.ɵɵattribute("data-automation-id", increment_r8);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(increment_r8);
} }
function NovoTimePickerElement_div_0_novo_list_5_novo_list_item_1_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-list-item", 6);
    i0.ɵɵlistener("click", function NovoTimePickerElement_div_0_novo_list_5_novo_list_item_1_Template_novo_list_item_click_0_listener($event) { i0.ɵɵrestoreView(_r14); const period_r12 = ctx.$implicit; const ctx_r13 = i0.ɵɵnextContext(3); return ctx_r13.setPeriod($event, period_r12, true); });
    i0.ɵɵelementStart(1, "item-content");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const period_r12 = ctx.$implicit;
    const ctx_r11 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("active", ctx_r11.meridian == period_r12);
    i0.ɵɵattribute("data-automation-id", period_r12);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(period_r12);
} }
function NovoTimePickerElement_div_0_novo_list_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "novo-list", 7);
    i0.ɵɵtemplate(1, NovoTimePickerElement_div_0_novo_list_5_novo_list_item_1_Template, 3, 4, "novo-list-item", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r4.MERIDIANS);
} }
function NovoTimePickerElement_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelementStart(1, "novo-list", 3);
    i0.ɵɵtemplate(2, NovoTimePickerElement_div_0_novo_list_item_2_Template, 3, 4, "novo-list-item", 4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "novo-list", 3);
    i0.ɵɵtemplate(4, NovoTimePickerElement_div_0_novo_list_item_4_Template, 3, 4, "novo-list-item", 4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, NovoTimePickerElement_div_0_novo_list_5_Template, 2, 1, "novo-list", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r0.HOURS);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r0.MINUTES);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.military);
} }
const _c0 = function (a0) { return { active: a0 }; };
function NovoTimePickerElement_div_1_span_9_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 20);
    i0.ɵɵlistener("click", function NovoTimePickerElement_div_1_span_9_Template_span_click_0_listener($event) { i0.ɵɵrestoreView(_r19); const hour_r17 = ctx.$implicit; const ctx_r18 = i0.ɵɵnextContext(2); return ctx_r18.setHours($event, hour_r17, true); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const hour_r17 = ctx.$implicit;
    const ctx_r15 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(3, _c0, ctx_r15.activeHour == hour_r17));
    i0.ɵɵattribute("data-automation-id", hour_r17);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(hour_r17);
} }
function NovoTimePickerElement_div_1_span_11_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 21);
    i0.ɵɵlistener("click", function NovoTimePickerElement_div_1_span_11_Template_span_click_0_listener($event) { i0.ɵɵrestoreView(_r22); const minute_r20 = ctx.$implicit; const ctx_r21 = i0.ɵɵnextContext(2); return ctx_r21.setMinutes($event, minute_r20, true); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const minute_r20 = ctx.$implicit;
    const ctx_r16 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(3, _c0, ctx_r16.activeMinute == minute_r20));
    i0.ɵɵattribute("data-automation-id", minute_r20);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(minute_r20);
} }
const _c1 = function (a0) { return { between: a0 }; };
function NovoTimePickerElement_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵelementStart(1, "div", 9);
    i0.ɵɵelementStart(2, "div", 10);
    i0.ɵɵelement(3, "span", 11);
    i0.ɵɵelementStart(4, "span", 12);
    i0.ɵɵelement(5, "span", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 14);
    i0.ɵɵelement(7, "span", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 16);
    i0.ɵɵtemplate(9, NovoTimePickerElement_div_1_span_9_Template, 2, 5, "span", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 18);
    i0.ɵɵtemplate(11, NovoTimePickerElement_div_1_span_11_Template, 2, 5, "span", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngClass", ctx_r1.hoursClass);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r1.minutesClass);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(5, _c1, ctx_r1.inBetween));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.HOURS);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.MINUTES);
} }
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
NovoTimePickerElement.ɵfac = function NovoTimePickerElement_Factory(t) { return new (t || NovoTimePickerElement)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.NovoLabelService), i0.ɵɵdirectiveInject(i1.DateFormatService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
NovoTimePickerElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoTimePickerElement, selectors: [["novo-time-picker"]], hostVars: 2, hostBindings: function NovoTimePickerElement_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("military", ctx.military);
    } }, inputs: { military: "military", analog: "analog", inline: "inline", step: "step" }, outputs: { onSelect: "onSelect" }, features: [i0.ɵɵProvidersFeature([TIME_PICKER_VALUE_ACCESSOR]), i0.ɵɵNgOnChangesFeature], decls: 2, vars: 2, consts: [["class", "increments", 4, "ngIf"], ["class", "analog", 4, "ngIf"], [1, "increments"], ["direction", "vertical", "data-automation-id", "novo-time-picker-increments"], [3, "active", "click", 4, "ngFor", "ngForOf"], ["direction", "vertical", "data-automation-id", "novo-time-picker-meridians", 4, "ngIf"], [3, "click"], ["direction", "vertical", "data-automation-id", "novo-time-picker-meridians"], [1, "analog"], [1, "analog--inner"], [1, "analog--face"], [1, "analog--center"], [1, "analog--hand--hours", 3, "ngClass"], [1, "analog--ball"], [1, "analog--hand--minutes", 3, "ngClass"], [1, "analog--ball", 3, "ngClass"], [1, "analog--hours"], ["class", "analog--hour", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "analog--minutes"], ["class", "analog--minute", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "analog--hour", 3, "ngClass", "click"], [1, "analog--minute", 3, "ngClass", "click"]], template: function NovoTimePickerElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, NovoTimePickerElement_div_0_Template, 6, 3, "div", 0);
        i0.ɵɵtemplate(1, NovoTimePickerElement_div_1_Template, 12, 7, "div", 1);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !ctx.analog);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.analog);
    } }, directives: [i2.NgIf, i3.NovoListElement, i2.NgForOf, i3.NovoListItemElement, i3.NovoItemContentElement, i2.NgClass], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoTimePickerElement, [{
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
      <novo-list direction="vertical" data-automation-id="novo-time-picker-increments">
        <novo-list-item
          *ngFor="let increment of HOURS"
          (click)="setHours($event, increment, true)"
          [class.active]="increment == activeHour"
          [attr.data-automation-id]="increment"
        >
          <item-content>{{ increment }}</item-content>
        </novo-list-item>
      </novo-list>
      <novo-list direction="vertical" data-automation-id="novo-time-picker-increments">
        <novo-list-item
          *ngFor="let increment of MINUTES"
          (click)="setMinutes($event, increment, true)"
          [class.active]="increment == activeMinute"
          [attr.data-automation-id]="increment"
        >
          <item-content>{{ increment }}</item-content>
        </novo-list-item>
      </novo-list>
      <novo-list direction="vertical" *ngIf="!military" data-automation-id="novo-time-picker-meridians">
        <novo-list-item
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
                    '[class.military]': 'military',
                },
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i1.DateFormatService }, { type: i0.ChangeDetectorRef }]; }, { military: [{
            type: Input
        }], analog: [{
            type: Input
        }], inline: [{
            type: Input
        }], step: [{
            type: Input
        }], onSelect: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZVBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy90aW1lLXBpY2tlci9UaW1lUGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBR0wsTUFBTSxHQUVQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckUsTUFBTTtBQUNOLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7OztJQXNDeEMseUNBTUU7SUFKQSw0UUFBcUMsSUFBSSxLQUFFO0lBSTNDLG9DQUFjO0lBQUEsWUFBZTtJQUFBLGlCQUFlO0lBQzlDLGlCQUFpQjs7OztJQUpmLDJEQUF3QztJQUN4QyxrREFBcUM7SUFFdkIsZUFBZTtJQUFmLGtDQUFlOzs7O0lBSS9CLHlDQU1FO0lBSkEsK1FBQXVDLElBQUksS0FBRTtJQUk3QyxvQ0FBYztJQUFBLFlBQWU7SUFBQSxpQkFBZTtJQUM5QyxpQkFBaUI7Ozs7SUFKZiw2REFBMEM7SUFDMUMsa0RBQXFDO0lBRXZCLGVBQWU7SUFBZixrQ0FBZTs7OztJQUkvQix5Q0FNRTtJQUpBLHdSQUFtQyxJQUFJLEtBQUU7SUFJekMsb0NBQWM7SUFBQSxZQUFZO0lBQUEsaUJBQWU7SUFDM0MsaUJBQWlCOzs7O0lBSmYsd0RBQW1DO0lBQ25D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UyxFQUFFLENBQUMsMEJBQTBCLENBQUM7Z0JBQ3ZDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0ZUO2dCQUNELElBQUksRUFBRTtvQkFDSixrQkFBa0IsRUFBRSxVQUFVO2lCQUMvQjthQUNGOzRKQUdDLFFBQVE7a0JBRFAsS0FBSztZQUdOLE1BQU07a0JBREwsS0FBSztZQUdOLE1BQU07a0JBREwsS0FBSztZQUdOLElBQUk7a0JBREgsS0FBSztZQUlOLFFBQVE7a0JBRFAsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBmb3JtYXQsIGlzVmFsaWQsIHBhcnNlIH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHsgRGF0ZUZvcm1hdFNlcnZpY2UsIE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcyc7XG4vLyBBUFBcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICcuLy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xuXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcbmNvbnN0IFRJTUVfUElDS0VSX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b1RpbWVQaWNrZXJFbGVtZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5leHBvcnQgZW51bSBUSU1FX1ZBTFVFX0ZPUk1BVFMge1xuICBpc284NjAxID0gJ2lzbzg2MDEnLFxuICBEYXRlID0gJ0RhdGUnLFxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXRpbWUtcGlja2VyJyxcbiAgcHJvdmlkZXJzOiBbVElNRV9QSUNLRVJfVkFMVUVfQUNDRVNTT1JdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDwhLS0gPGRpdiBjbGFzcz1cImRpZ2l0YWxcIiBbY2xhc3MuaW5saW5lXT1cImlubGluZVwiIFtjbGFzcy5taWxpdGFyeV09XCJtaWxpdGFyeVwiICpuZ0lmPVwiaW5saW5lXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZGlnaXRhbC0taW5uZXJcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJkaWdpdGFsLS1jbG9ja1wiICpuZ0lmPVwiYW5hbG9nXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJob3Vyc1wiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tdGltZS1waWNrZXItaG91cnNcIj57eyBob3VycyB9fTwvc3BhblxuICAgICAgICAgID46PHNwYW4gY2xhc3M9XCJtaW51dGVzXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by10aW1lLXBpY2tlci1taW51dGVzXCI+e3sgbWludXRlcyB9fTwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbC1ibG9ja1wiICpuZ0lmPVwiIW1pbGl0YXJ5ICYmIGFuYWxvZ1wiPlxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgcGVyaW9kIG9mIE1FUklESUFOU1wiXG4gICAgICAgICAgICBjbGFzcz1cImRpZ2l0YWwtLXBlcmlvZFwiXG4gICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIm1lcmlkaWFuID09IHBlcmlvZFwiXG4gICAgICAgICAgICAoY2xpY2spPVwic2V0UGVyaW9kKCRldmVudCwgcGVyaW9kLCB0cnVlKVwiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwicGVyaW9kXCJcbiAgICAgICAgICAgID57eyBwZXJpb2QgfX08L3NwYW5cbiAgICAgICAgICA+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+IC0tPlxuICAgIDxkaXYgY2xhc3M9XCJpbmNyZW1lbnRzXCIgKm5nSWY9XCIhYW5hbG9nXCI+XG4gICAgICA8bm92by1saXN0IGRpcmVjdGlvbj1cInZlcnRpY2FsXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by10aW1lLXBpY2tlci1pbmNyZW1lbnRzXCI+XG4gICAgICAgIDxub3ZvLWxpc3QtaXRlbVxuICAgICAgICAgICpuZ0Zvcj1cImxldCBpbmNyZW1lbnQgb2YgSE9VUlNcIlxuICAgICAgICAgIChjbGljayk9XCJzZXRIb3VycygkZXZlbnQsIGluY3JlbWVudCwgdHJ1ZSlcIlxuICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaW5jcmVtZW50ID09IGFjdGl2ZUhvdXJcIlxuICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJpbmNyZW1lbnRcIlxuICAgICAgICA+XG4gICAgICAgICAgPGl0ZW0tY29udGVudD57eyBpbmNyZW1lbnQgfX08L2l0ZW0tY29udGVudD5cbiAgICAgICAgPC9ub3ZvLWxpc3QtaXRlbT5cbiAgICAgIDwvbm92by1saXN0PlxuICAgICAgPG5vdm8tbGlzdCBkaXJlY3Rpb249XCJ2ZXJ0aWNhbFwiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tdGltZS1waWNrZXItaW5jcmVtZW50c1wiPlxuICAgICAgICA8bm92by1saXN0LWl0ZW1cbiAgICAgICAgICAqbmdGb3I9XCJsZXQgaW5jcmVtZW50IG9mIE1JTlVURVNcIlxuICAgICAgICAgIChjbGljayk9XCJzZXRNaW51dGVzKCRldmVudCwgaW5jcmVtZW50LCB0cnVlKVwiXG4gICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJpbmNyZW1lbnQgPT0gYWN0aXZlTWludXRlXCJcbiAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiaW5jcmVtZW50XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxpdGVtLWNvbnRlbnQ+e3sgaW5jcmVtZW50IH19PC9pdGVtLWNvbnRlbnQ+XG4gICAgICAgIDwvbm92by1saXN0LWl0ZW0+XG4gICAgICA8L25vdm8tbGlzdD5cbiAgICAgIDxub3ZvLWxpc3QgZGlyZWN0aW9uPVwidmVydGljYWxcIiAqbmdJZj1cIiFtaWxpdGFyeVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tdGltZS1waWNrZXItbWVyaWRpYW5zXCI+XG4gICAgICAgIDxub3ZvLWxpc3QtaXRlbVxuICAgICAgICAgICpuZ0Zvcj1cImxldCBwZXJpb2Qgb2YgTUVSSURJQU5TXCJcbiAgICAgICAgICAoY2xpY2spPVwic2V0UGVyaW9kKCRldmVudCwgcGVyaW9kLCB0cnVlKVwiXG4gICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJtZXJpZGlhbiA9PSBwZXJpb2RcIlxuICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJwZXJpb2RcIlxuICAgICAgICA+XG4gICAgICAgICAgPGl0ZW0tY29udGVudD57eyBwZXJpb2QgfX08L2l0ZW0tY29udGVudD5cbiAgICAgICAgPC9ub3ZvLWxpc3QtaXRlbT5cbiAgICAgIDwvbm92by1saXN0PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJhbmFsb2dcIiAqbmdJZj1cImFuYWxvZ1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImFuYWxvZy0taW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFuYWxvZy0tZmFjZVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYW5hbG9nLS1jZW50ZXJcIj48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJhbmFsb2ctLWhhbmQtLWhvdXJzXCIgW25nQ2xhc3NdPVwiaG91cnNDbGFzc1wiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhbmFsb2ctLWJhbGxcIj48L3NwYW4+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYW5hbG9nLS1oYW5kLS1taW51dGVzXCIgW25nQ2xhc3NdPVwibWludXRlc0NsYXNzXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFuYWxvZy0tYmFsbFwiIFtuZ0NsYXNzXT1cInsgYmV0d2VlbjogaW5CZXR3ZWVuIH1cIj48L3NwYW4+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFuYWxvZy0taG91cnNcIj5cbiAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGhvdXIgb2YgSE9VUlNcIlxuICAgICAgICAgICAgY2xhc3M9XCJhbmFsb2ctLWhvdXJcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyBhY3RpdmU6IGFjdGl2ZUhvdXIgPT0gaG91ciB9XCJcbiAgICAgICAgICAgIChjbGljayk9XCJzZXRIb3VycygkZXZlbnQsIGhvdXIsIHRydWUpXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJob3VyXCJcbiAgICAgICAgICAgID57eyBob3VyIH19PC9zcGFuXG4gICAgICAgICAgPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFuYWxvZy0tbWludXRlc1wiPlxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgbWludXRlIG9mIE1JTlVURVNcIlxuICAgICAgICAgICAgY2xhc3M9XCJhbmFsb2ctLW1pbnV0ZVwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7IGFjdGl2ZTogYWN0aXZlTWludXRlID09IG1pbnV0ZSB9XCJcbiAgICAgICAgICAgIChjbGljayk9XCJzZXRNaW51dGVzKCRldmVudCwgbWludXRlLCB0cnVlKVwiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwibWludXRlXCJcbiAgICAgICAgICAgID57eyBtaW51dGUgfX08L3NwYW5cbiAgICAgICAgICA+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLm1pbGl0YXJ5XSc6ICdtaWxpdGFyeScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9UaW1lUGlja2VyRWxlbWVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpXG4gIG1pbGl0YXJ5OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIGFuYWxvZzogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBpbmxpbmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgc3RlcDogbnVtYmVyID0gMTtcblxuICBAT3V0cHV0KClcbiAgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGhvdXJzOiBudW1iZXIgPSAxMjtcbiAgbWludXRlczogbnVtYmVyID0gMDtcbiAgdmFsdWU6IGFueSA9IG51bGw7XG4gIG1lcmlkaWFuOiBzdHJpbmc7XG4gIGluQmV0d2VlbjogYm9vbGVhbjtcbiAgaG91cnNDbGFzczogc3RyaW5nO1xuICBhY3RpdmVIb3VyO1xuICBtaW51dGVzQ2xhc3M6IHN0cmluZztcbiAgYWN0aXZlTWludXRlO1xuICBpbmNyZW1lbnRzOiBzdHJpbmdbXSA9IFtdO1xuICBzZWxlY3RlZDogc3RyaW5nO1xuICBNRVJJRElBTlM6IEFycmF5PHN0cmluZz4gPSBbJ2FtJywgJ3BtJ107XG4gIE1JTlVURVM6IEFycmF5PHN0cmluZz4gPSBbJzA1JywgJzEwJywgJzE1JywgJzIwJywgJzI1JywgJzMwJywgJzM1JywgJzQwJywgJzQ1JywgJzUwJywgJzU1JywgJzAwJ107XG4gIEhPVVJTOiBBcnJheTxzdHJpbmc+ID0gWycxJywgJzInLCAnMycsICc0JywgJzUnLCAnNicsICc3JywgJzgnLCAnOScsICcxMCcsICcxMScsICcxMiddO1xuICBtb2RlbDogYW55O1xuICBfb25DaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gIF9vblRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgZmxhdHRlbihhcnIpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdCguLi5hcnIpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSxcbiAgICBwdWJsaWMgZGF0ZUZvcm1hdFNlcnZpY2U6IERhdGVGb3JtYXRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMubWlsaXRhcnkpIHtcbiAgICAgIHRoaXMuSE9VUlMgPSBbJzAnLCAuLi50aGlzLkhPVVJTLCAnMTMnLCAnMTQnLCAnMTUnLCAnMTYnLCAnMTcnLCAnMTgnLCAnMTknLCAnMjAnLCAnMjEnLCAnMjInLCAnMjMnXTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmFuYWxvZykge1xuICAgICAgY29uc3QgbWlucyA9IEFycmF5LmZyb20oQXJyYXkoNjAgLyB0aGlzLnN0ZXApLmtleXMoKSkubWFwKChpKSA9PiBpICogdGhpcy5zdGVwKTtcbiAgICAgIHRoaXMuTUlOVVRFUyA9IG1pbnMubWFwKChtKSA9PiBgJHttfWAucGFkU3RhcnQoMiwgJzAnKSk7XG4gICAgfVxuICAgIHRoaXMubmdPbkNoYW5nZXMoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM/OiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgIHRoaXMuaW5pdCh0aGlzLm1vZGVsLCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xuICAgICAgdGhpcy5pbml0KG5ldyBEYXRlKCksIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBpbml0KHZhbHVlLCBkaXNwYXRjaCkge1xuICAgIGNvbnN0IF92YWx1ZSA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICBsZXQgaG91cnM6IHN0cmluZyB8IG51bWJlciA9IF92YWx1ZS5nZXRIb3VycygpO1xuICAgIGxldCBtaW51dGVzOiBzdHJpbmcgfCBudW1iZXIgPSBfdmFsdWUuZ2V0TWludXRlcygpO1xuXG4gICAgaWYgKCF0aGlzLm1pbGl0YXJ5KSB7XG4gICAgICB0aGlzLm1lcmlkaWFuID0gaG91cnMgPj0gMTIgPyAncG0nIDogJ2FtJztcbiAgICAgIGhvdXJzID0gaG91cnMgJSAxMjtcbiAgICAgIGhvdXJzID0gaG91cnMgfHwgMTI7XG4gICAgfVxuICAgIG1pbnV0ZXMgPSBtaW51dGVzIDwgMTAgPyBgMCR7bWludXRlc31gIDogbWludXRlcztcblxuICAgIHRoaXMuc2V0SG91cnMobnVsbCwgaG91cnMsIGRpc3BhdGNoKTtcbiAgICB0aGlzLnNldE1pbnV0ZXMobnVsbCwgbWludXRlcywgZGlzcGF0Y2gpO1xuICAgIHRoaXMuY2hlY2tCZXR3ZWVuKG1pbnV0ZXMpO1xuICB9XG5cbiAgY2hlY2tCZXR3ZWVuKHZhbHVlKSB7XG4gICAgdGhpcy5pbkJldHdlZW4gPSB0aGlzLk1JTlVURVMuaW5kZXhPZihTdHJpbmcodmFsdWUpKSA8IDA7XG4gIH1cblxuICBzZXRWYWx1ZShldmVudCwgdmFsdWUpIHtcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHZhbHVlO1xuICAgIGNvbnN0IFt0aW1lLCBtZXJpZGlhbl0gPSB2YWx1ZS5zcGxpdCgnICcpO1xuICAgIGNvbnN0IFtob3VycywgbWludXRlc10gPSB0aW1lLnNwbGl0KCc6Jyk7XG4gICAgdGhpcy5ob3VycyA9IGhvdXJzO1xuICAgIHRoaXMubWludXRlcyA9IG1pbnV0ZXM7XG4gICAgdGhpcy5tZXJpZGlhbiA9IG1lcmlkaWFuO1xuXG4gICAgdGhpcy5kaXNwYXRjaENoYW5nZSgpO1xuICB9XG5cbiAgc2V0SG91cnMoZXZlbnQsIGhvdXJzLCBkaXNwYXRjaCkge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICB0aGlzLmhvdXJzID0gaG91cnM7XG4gICAgdGhpcy5ob3Vyc0NsYXNzID0gYGhvdXItJHtob3Vyc31gO1xuICAgIHRoaXMuYWN0aXZlSG91ciA9IGhvdXJzO1xuXG4gICAgaWYgKGRpc3BhdGNoKSB7XG4gICAgICB0aGlzLmRpc3BhdGNoQ2hhbmdlKCk7XG4gICAgfVxuICB9XG5cbiAgc2V0TWludXRlcyhldmVudCwgbWludXRlcywgZGlzcGF0Y2gpIHtcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgdGhpcy5taW51dGVzID0gbWludXRlcztcbiAgICB0aGlzLm1pbnV0ZXNDbGFzcyA9IGBtaW4tJHttaW51dGVzfWA7XG4gICAgdGhpcy5hY3RpdmVNaW51dGUgPSBtaW51dGVzO1xuICAgIHRoaXMuY2hlY2tCZXR3ZWVuKG1pbnV0ZXMpO1xuXG4gICAgaWYgKGRpc3BhdGNoKSB7XG4gICAgICB0aGlzLmRpc3BhdGNoQ2hhbmdlKCk7XG4gICAgfVxuICB9XG5cbiAgc2V0UGVyaW9kKGV2ZW50LCBwZXJpb2QsIGRpc3BhdGNoKSB7XG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIHRoaXMubWVyaWRpYW4gPSBwZXJpb2Q7XG5cbiAgICBpZiAoZGlzcGF0Y2gpIHtcbiAgICAgIHRoaXMuZGlzcGF0Y2hDaGFuZ2UoKTtcbiAgICB9XG4gIH1cblxuICBkaXNwYXRjaENoYW5nZSgpIHtcbiAgICBsZXQgaG91cnMgPSBOdW1iZXIodGhpcy5ob3Vycyk7XG5cbiAgICBpZiAoIXRoaXMubWlsaXRhcnkpIHtcbiAgICAgIGhvdXJzID0gdGhpcy5tZXJpZGlhbi50b0xvd2VyQ2FzZSgpID09PSAncG0nID8gaG91cnMgKyAxMiA6IGhvdXJzO1xuXG4gICAgICAvLyBTcGVjaWFsIGNhc2UgZm9yIDEyXG4gICAgICBpZiAodGhpcy5tZXJpZGlhbi50b0xvd2VyQ2FzZSgpID09PSAncG0nICYmIGhvdXJzID09PSAyNCkge1xuICAgICAgICBob3VycyA9IDEyO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm1lcmlkaWFuLnRvTG93ZXJDYXNlKCkgPT09ICdhbScgJiYgaG91cnMgPT09IDEyKSB7XG4gICAgICAgIGhvdXJzID0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZSA9IG5ldyBEYXRlKCk7XG4gICAgdmFsdWUuc2V0SG91cnMoaG91cnMpO1xuICAgIHZhbHVlLnNldE1pbnV0ZXModGhpcy5taW51dGVzKTtcbiAgICB2YWx1ZS5zZXRTZWNvbmRzKDApO1xuICAgIHRoaXMudmFsdWUgPSBgJHt0aGlzLmhvdXJzfToke3RoaXMubWludXRlc30gJHt0aGlzLm1lcmlkaWFufWA7XG4gICAgdGhpcy5vblNlbGVjdC5uZXh0KHtcbiAgICAgIGhvdXJzLFxuICAgICAgbWludXRlczogdGhpcy5taW51dGVzLFxuICAgICAgbWVyaWRpYW46IHRoaXMubWVyaWRpYW4sXG4gICAgICBkYXRlOiB2YWx1ZSxcbiAgICAgIHRleHQ6IHRoaXMudmFsdWUsXG4gICAgfSk7XG4gICAgdGhpcy5fb25DaGFuZ2UodmFsdWUpO1xuICB9XG5cbiAgLy8gVmFsdWVBY2Nlc3NvciBGdW5jdGlvbnNcbiAgd3JpdGVWYWx1ZShtb2RlbDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIGlmIChIZWxwZXJzLmlzRGF0ZShtb2RlbCkpIHtcbiAgICAgIHRoaXMuaW5pdChtb2RlbCwgZmFsc2UpO1xuICAgICAgLy8gdGhpcy5kaXNwYXRjaENoYW5nZSgpO1xuICAgIH1cbiAgICBpZiAoSGVscGVycy5pc1N0cmluZyhtb2RlbCkpIHtcbiAgICAgIGNvbnN0IHRpbWUgPSB0aGlzLm1pbGl0YXJ5ID8gbW9kZWwgOiB0aGlzLmNvbnZlcnRUaW1lMTJ0bzI0KG1vZGVsKTtcbiAgICAgIGNvbnN0IGRhdGUgPSBwYXJzZShgJHtmb3JtYXQoRGF0ZS5ub3coKSwgJ1lZWVktTU0tREQnKX1UJHt0aW1lfWApO1xuICAgICAgaWYgKGlzVmFsaWQoZGF0ZSkpIHtcbiAgICAgICAgdGhpcy5pbml0KGRhdGUsIGZhbHNlKTtcbiAgICAgICAgLy8gdGhpcy5kaXNwYXRjaENoYW5nZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMuX29uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgY29udmVydFRpbWUxMnRvMjQodGltZTEyaDogc3RyaW5nKSB7XG4gICAgY29uc3QgcG1Gb3JtYXQgPSB0aGlzLmxhYmVscy50aW1lRm9ybWF0UE0udG9VcHBlckNhc2UoKTtcblxuICAgIGNvbnN0IFt0aW1lLCBtb2RpZmllcl0gPSB0aW1lMTJoLnNwbGl0KCcgJyk7XG4gICAgbGV0IFtob3VycywgbWludXRlc10gPSB0aW1lLnNwbGl0KCc6Jyk7XG4gICAgaWYgKGhvdXJzID09PSAnMTInKSB7XG4gICAgICBob3VycyA9ICcwMCc7XG4gICAgfVxuICAgIGlmIChbJ1BNJywgcG1Gb3JtYXRdLmluY2x1ZGVzKG1vZGlmaWVyKSkge1xuICAgICAgaG91cnMgPSBgJHtwYXJzZUludChob3VycywgMTApICsgMTJ9YC5wYWRTdGFydCgyLCAnMCcpO1xuICAgIH1cbiAgICByZXR1cm4gYCR7aG91cnN9OiR7bWludXRlc31gO1xuICB9XG59XG4iXX0=