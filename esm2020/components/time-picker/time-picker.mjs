// NG2
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isValid } from 'date-fns';
import { NovoLabelService } from 'novo-elements/services';
import { DateUtil, Helpers } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "novo-elements/components/list";
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
    constructor(element, labels, cdr) {
        this.element = element;
        this.labels = labels;
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
            const date = DateUtil.parse(`${DateUtil.format(Date.now(), 'YYYY-MM-DD')}T${time}`);
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
NovoTimePickerElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTimePickerElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NovoTimePickerElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoTimePickerElement, selector: "novo-time-picker", inputs: { military: "military", analog: "analog", inline: "inline", step: "step" }, outputs: { onSelect: "onSelect" }, host: { properties: { "class.military": "military" }, classAttribute: "novo-time-picker" }, providers: [TIME_PICKER_VALUE_ACCESSOR], usesOnChanges: true, ngImport: i0, template: `
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
  `, isInline: true, styles: [":host{display:block;width:-webkit-min-content;width:-moz-min-content;width:min-content;overflow:hidden;border-radius:4px;background-color:var(--color-background);box-shadow:0 1px 3px #00000026,0 2px 7px #0000001a;z-index:z(overlay)}:host .digital{background-color:var(--color-selection);display:flex;justify-content:center}:host .digital.inline{background:var(--color-background);border-bottom:var(--border-main)}:host .digital.inline.military{border-bottom:none}:host .digital.inline .digital--inner{flex:1}:host .digital.inline .digital--inner .control-block{display:flex;flex:1}:host .digital.inline .digital--inner .control-block .digital--period{color:var(--color-selection);cursor:pointer;font-size:1em;opacity:.6;padding:1rem;flex:1}:host .digital.inline .digital--inner .control-block .digital--period.active{opacity:1;background-color:var(--color-selection);color:var(--text-selection)}:host .digital--inner{display:flex;text-align:center;align-items:center;justify-content:center}:host .digital--clock{color:#fff;font-size:1.8em;font-weight:500}:host .control-block{display:inline-block}:host .digital--period{display:block;color:#fff;cursor:pointer;font-size:1em;opacity:.6;text-transform:uppercase;font-weight:400}:host .digital--period.active{opacity:1;font-weight:600}:host .increments{position:relative;height:250px;width:auto;display:flex;flex-flow:row nowrap}:host .increments novo-list{overflow-y:auto;overflow-x:hidden;height:100%;flex:1;scroll-snap-type:y mandatory;-ms-overflow-style:none;scrollbar-width:none}:host .increments novo-list::-webkit-scrollbar{display:none}:host .increments .increments--hour,:host .increments .increments--minute,:host .increments .increments--meridian{padding:5px 16px;width:50px;scroll-snap-align:start}:host .increments .increments--hour .list-item,:host .increments .increments--minute .list-item,:host .increments .increments--meridian .list-item{line-height:19px}:host .increments .increments--hour:focus,:host .increments .increments--hour:hover,:host .increments .increments--minute:focus,:host .increments .increments--minute:hover,:host .increments .increments--meridian:focus,:host .increments .increments--meridian:hover{background:var(--color-selection);color:var(--text-selection);filter:brightness(1.25)}:host .increments .increments--hour.active,:host .increments .increments--minute.active,:host .increments .increments--meridian.active{background:var(--color-selection);color:var(--text-selection);font-weight:500}:host .analog{height:250px;width:250px;position:relative;margin:10% auto}:host .analog--inner{top:0;left:0;right:0;bottom:0;width:100%;position:absolute;transition:transform 125ms linear}:host .analog--face{top:5px;right:5px;left:5px;bottom:5px;position:absolute;border-radius:50%}:host .analog--hand--hours{width:240px;height:240px;display:block;position:absolute;top:0;border-radius:50%;transform:rotate(0);transition:transform .1s linear;z-index:1}:host .analog--hand--hours:before{content:\" \";width:2px;top:0;bottom:0;left:30%;margin:30%;z-index:-1;display:block;position:absolute;transform:rotate(90deg)}:host .analog--hand--hours .analog--ball{height:3rem;width:3rem;display:block;right:3.2rem;top:50%;margin-top:-1.5rem;border-radius:50%;position:absolute;border:3px solid var(--color-selection);background:var(--color-selection)}:host .analog--hand--hours.hour-12{transform:rotate(-90deg)}:host .analog--hand--hours.hour-1{transform:rotate(-60deg)}:host .analog--hand--hours.hour-2{transform:rotate(-30deg)}:host .analog--hand--hours.hour-3{transform:rotate(0)}:host .analog--hand--hours.hour-4{transform:rotate(30deg)}:host .analog--hand--hours.hour-5{transform:rotate(60deg)}:host .analog--hand--hours.hour-6{transform:rotate(90deg)}:host .analog--hand--hours.hour-7{transform:rotate(120deg)}:host .analog--hand--hours.hour-8{transform:rotate(150deg)}:host .analog--hand--hours.hour-9{transform:rotate(180deg)}:host .analog--hand--hours.hour-10{transform:rotate(210deg)}:host .analog--hand--hours.hour-11{transform:rotate(240deg)}:host .analog--hand--minutes{width:200px;height:200px;margin:20px;display:block;position:absolute;top:0;border-radius:50%;transform:rotate(0);transition:transform .1s linear;z-index:1}:host .analog--hand--minutes:before{left:23%;margin:33%;content:\" \";width:2px;top:0;bottom:0;z-index:-1;display:block;position:absolute;transform:rotate(90deg)}:host .analog--hand--minutes .analog--ball{display:block;top:50%;border-radius:50%;position:absolute;height:2.4rem;width:2.4rem;right:4.2rem;margin-top:-1.2rem;border:2px solid var(--color-selection);background:var(--color-selection);transition:all .16s ease-in-out}:host .analog--hand--minutes .analog--ball.between{height:1px;border-radius:2em;margin-top:0}:host .analog--hand--minutes.min-00{transform:rotate(-90deg)}:host .analog--hand--minutes.min-01{transform:rotate(-84deg)}:host .analog--hand--minutes.min-02{transform:rotate(-78deg)}:host .analog--hand--minutes.min-03{transform:rotate(-72deg)}:host .analog--hand--minutes.min-04{transform:rotate(-66deg)}:host .analog--hand--minutes.min-05{transform:rotate(-60deg)}:host .analog--hand--minutes.min-06{transform:rotate(-54deg)}:host .analog--hand--minutes.min-07{transform:rotate(-48deg)}:host .analog--hand--minutes.min-08{transform:rotate(-42deg)}:host .analog--hand--minutes.min-09{transform:rotate(-36deg)}:host .analog--hand--minutes.min-10{transform:rotate(-30deg)}:host .analog--hand--minutes.min-11{transform:rotate(-24deg)}:host .analog--hand--minutes.min-12{transform:rotate(-18deg)}:host .analog--hand--minutes.min-13{transform:rotate(-12deg)}:host .analog--hand--minutes.min-14{transform:rotate(-6deg)}:host .analog--hand--minutes.min-15{transform:rotate(0)}:host .analog--hand--minutes.min-16{transform:rotate(6deg)}:host .analog--hand--minutes.min-17{transform:rotate(12deg)}:host .analog--hand--minutes.min-18{transform:rotate(18deg)}:host .analog--hand--minutes.min-19{transform:rotate(24deg)}:host .analog--hand--minutes.min-20{transform:rotate(30deg)}:host .analog--hand--minutes.min-21{transform:rotate(36deg)}:host .analog--hand--minutes.min-22{transform:rotate(42deg)}:host .analog--hand--minutes.min-23{transform:rotate(48deg)}:host .analog--hand--minutes.min-24{transform:rotate(54deg)}:host .analog--hand--minutes.min-25{transform:rotate(60deg)}:host .analog--hand--minutes.min-26{transform:rotate(66deg)}:host .analog--hand--minutes.min-27{transform:rotate(72deg)}:host .analog--hand--minutes.min-28{transform:rotate(78deg)}:host .analog--hand--minutes.min-29{transform:rotate(84deg)}:host .analog--hand--minutes.min-30{transform:rotate(90deg)}:host .analog--hand--minutes.min-31{transform:rotate(96deg)}:host .analog--hand--minutes.min-32{transform:rotate(102deg)}:host .analog--hand--minutes.min-33{transform:rotate(108deg)}:host .analog--hand--minutes.min-34{transform:rotate(114deg)}:host .analog--hand--minutes.min-35{transform:rotate(120deg)}:host .analog--hand--minutes.min-36{transform:rotate(126deg)}:host .analog--hand--minutes.min-37{transform:rotate(132deg)}:host .analog--hand--minutes.min-38{transform:rotate(138deg)}:host .analog--hand--minutes.min-39{transform:rotate(144deg)}:host .analog--hand--minutes.min-40{transform:rotate(150deg)}:host .analog--hand--minutes.min-41{transform:rotate(156deg)}:host .analog--hand--minutes.min-42{transform:rotate(162deg)}:host .analog--hand--minutes.min-43{transform:rotate(168deg)}:host .analog--hand--minutes.min-44{transform:rotate(174deg)}:host .analog--hand--minutes.min-45{transform:rotate(180deg)}:host .analog--hand--minutes.min-46{transform:rotate(186deg)}:host .analog--hand--minutes.min-47{transform:rotate(192deg)}:host .analog--hand--minutes.min-48{transform:rotate(198deg)}:host .analog--hand--minutes.min-49{transform:rotate(204deg)}:host .analog--hand--minutes.min-50{transform:rotate(210deg)}:host .analog--hand--minutes.min-51{transform:rotate(216deg)}:host .analog--hand--minutes.min-52{transform:rotate(222deg)}:host .analog--hand--minutes.min-53{transform:rotate(228deg)}:host .analog--hand--minutes.min-54{transform:rotate(234deg)}:host .analog--hand--minutes.min-55{transform:rotate(240deg)}:host .analog--hand--minutes.min-56{transform:rotate(246deg)}:host .analog--hand--minutes.min-57{transform:rotate(252deg)}:host .analog--hand--minutes.min-58{transform:rotate(258deg)}:host .analog--hand--minutes.min-59{transform:rotate(264deg)}:host .analog--center{height:12rem;width:12rem;border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%);z-index:1;margin-top:1px;margin-left:1px;display:block;position:absolute;background-color:var(--color-background)}:host .analog--hour,:host .analog--minute{font-size:1.6rem;color:#666;left:50%;top:50%;z-index:3;text-align:center;width:40px;padding:8px 0;border-radius:50%;cursor:pointer;margin-left:-20px;margin-top:-20px;position:absolute}:host .analog--hour.active,:host .analog--minute.active{color:#fff}:host .analog--minute{font-size:1rem;margin-left:-20px;margin-top:-16px}:host .analog--hours,:host .analog--minutes{width:250px;height:250px;float:left;position:relative}:host .analog--minutes{position:absolute}:host .analog--hour:nth-child(1){transform:rotate(-60deg) translate(4.5em) rotate(60deg)}:host .analog--minute:nth-child(1){transform:rotate(-60deg) translate(4.5em) rotate(60deg)}:host .analog--hour:nth-child(2){transform:rotate(-30deg) translate(4.5em) rotate(30deg)}:host .analog--minute:nth-child(2){transform:rotate(-30deg) translate(4.5em) rotate(30deg)}:host .analog--hour:nth-child(3){transform:rotate(0) translate(4.5em) rotate(0)}:host .analog--minute:nth-child(3){transform:rotate(0) translate(4.5em) rotate(0)}:host .analog--hour:nth-child(4){transform:rotate(30deg) translate(4.5em) rotate(-30deg)}:host .analog--minute:nth-child(4){transform:rotate(30deg) translate(4.5em) rotate(-30deg)}:host .analog--hour:nth-child(5){transform:rotate(60deg) translate(4.5em) rotate(-60deg)}:host .analog--minute:nth-child(5){transform:rotate(60deg) translate(4.5em) rotate(-60deg)}:host .analog--hour:nth-child(6){transform:rotate(90deg) translate(4.5em) rotate(-90deg)}:host .analog--minute:nth-child(6){transform:rotate(90deg) translate(4.5em) rotate(-90deg)}:host .analog--hour:nth-child(7){transform:rotate(120deg) translate(4.5em) rotate(-120deg)}:host .analog--minute:nth-child(7){transform:rotate(120deg) translate(4.5em) rotate(-120deg)}:host .analog--hour:nth-child(8){transform:rotate(150deg) translate(4.5em) rotate(-150deg)}:host .analog--minute:nth-child(8){transform:rotate(150deg) translate(4.5em) rotate(-150deg)}:host .analog--hour:nth-child(9){transform:rotate(180deg) translate(4.5em) rotate(-180deg)}:host .analog--minute:nth-child(9){transform:rotate(180deg) translate(4.5em) rotate(-180deg)}:host .analog--hour:nth-child(10){transform:rotate(210deg) translate(4.5em) rotate(-210deg)}:host .analog--minute:nth-child(10){transform:rotate(210deg) translate(4.5em) rotate(-210deg)}:host .analog--hour:nth-child(11){transform:rotate(240deg) translate(4.5em) rotate(-240deg)}:host .analog--minute:nth-child(11){transform:rotate(240deg) translate(4.5em) rotate(-240deg)}:host .analog--hour:nth-child(12){transform:rotate(270deg) translate(4.5em) rotate(-270deg)}:host .analog--minute:nth-child(12){transform:rotate(270deg) translate(4.5em) rotate(-270deg)}:host.military .analog--hour:nth-child(1){transform:rotate(-90deg) translate(8rem) rotate(90deg)}:host.military .analog--hand--hours.hour-0{transform:rotate(-90deg)}:host.military .analog--hour:nth-child(2){transform:rotate(-75deg) translate(8rem) rotate(75deg)}:host.military .analog--hand--hours.hour-1{transform:rotate(-75deg)}:host.military .analog--hour:nth-child(3){transform:rotate(-60deg) translate(8rem) rotate(60deg)}:host.military .analog--hand--hours.hour-2{transform:rotate(-60deg)}:host.military .analog--hour:nth-child(4){transform:rotate(-45deg) translate(8rem) rotate(45deg)}:host.military .analog--hand--hours.hour-3{transform:rotate(-45deg)}:host.military .analog--hour:nth-child(5){transform:rotate(-30deg) translate(8rem) rotate(30deg)}:host.military .analog--hand--hours.hour-4{transform:rotate(-30deg)}:host.military .analog--hour:nth-child(6){transform:rotate(-15deg) translate(8rem) rotate(15deg)}:host.military .analog--hand--hours.hour-5{transform:rotate(-15deg)}:host.military .analog--hour:nth-child(7){transform:rotate(0) translate(8rem) rotate(0)}:host.military .analog--hand--hours.hour-6{transform:rotate(0)}:host.military .analog--hour:nth-child(8){transform:rotate(15deg) translate(8rem) rotate(-15deg)}:host.military .analog--hand--hours.hour-7{transform:rotate(15deg)}:host.military .analog--hour:nth-child(9){transform:rotate(30deg) translate(8rem) rotate(-30deg)}:host.military .analog--hand--hours.hour-8{transform:rotate(30deg)}:host.military .analog--hour:nth-child(10){transform:rotate(45deg) translate(8rem) rotate(-45deg)}:host.military .analog--hand--hours.hour-9{transform:rotate(45deg)}:host.military .analog--hour:nth-child(11){transform:rotate(60deg) translate(8rem) rotate(-60deg)}:host.military .analog--hand--hours.hour-10{transform:rotate(60deg)}:host.military .analog--hour:nth-child(12){transform:rotate(75deg) translate(8rem) rotate(-75deg)}:host.military .analog--hand--hours.hour-11{transform:rotate(75deg)}:host.military .analog--hour:nth-child(13){transform:rotate(90deg) translate(8rem) rotate(-90deg)}:host.military .analog--hand--hours.hour-12{transform:rotate(90deg)}:host.military .analog--hour:nth-child(14){transform:rotate(105deg) translate(8rem) rotate(-105deg)}:host.military .analog--hand--hours.hour-13{transform:rotate(105deg)}:host.military .analog--hour:nth-child(15){transform:rotate(120deg) translate(8rem) rotate(-120deg)}:host.military .analog--hand--hours.hour-14{transform:rotate(120deg)}:host.military .analog--hour:nth-child(16){transform:rotate(135deg) translate(8rem) rotate(-135deg)}:host.military .analog--hand--hours.hour-15{transform:rotate(135deg)}:host.military .analog--hour:nth-child(17){transform:rotate(150deg) translate(8rem) rotate(-150deg)}:host.military .analog--hand--hours.hour-16{transform:rotate(150deg)}:host.military .analog--hour:nth-child(18){transform:rotate(165deg) translate(8rem) rotate(-165deg)}:host.military .analog--hand--hours.hour-17{transform:rotate(165deg)}:host.military .analog--hour:nth-child(19){transform:rotate(180deg) translate(8rem) rotate(-180deg)}:host.military .analog--hand--hours.hour-18{transform:rotate(180deg)}:host.military .analog--hour:nth-child(20){transform:rotate(195deg) translate(8rem) rotate(-195deg)}:host.military .analog--hand--hours.hour-19{transform:rotate(195deg)}:host.military .analog--hour:nth-child(21){transform:rotate(210deg) translate(8rem) rotate(-210deg)}:host.military .analog--hand--hours.hour-20{transform:rotate(210deg)}:host.military .analog--hour:nth-child(22){transform:rotate(225deg) translate(8rem) rotate(-225deg)}:host.military .analog--hand--hours.hour-21{transform:rotate(225deg)}:host.military .analog--hour:nth-child(23){transform:rotate(240deg) translate(8rem) rotate(-240deg)}:host.military .analog--hand--hours.hour-22{transform:rotate(240deg)}:host.military .analog--hour:nth-child(24){transform:rotate(255deg) translate(8rem) rotate(-255deg)}:host.military .analog--hand--hours{top:-10px;left:-10px}:host.military .analog--hand--hours.hour-23{transform:rotate(255deg)}:host.military .analog--face{top:15px;right:15px;left:15px;bottom:15px}:host.military .analog--hour{font-size:.9rem;margin-left:-2rem;margin-top:-1.2rem}:host.military .analog--hand--minutes{margin:10px}:host.military .analog--hand--hours .analog--ball{height:2.8rem;width:2.8rem;right:2.7rem;margin-top:-1.4rem}\n"], components: [{ type: i2.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { type: i2.NovoListItemElement, selector: "novo-list-item, [list-item]" }, { type: i2.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTimePickerElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-time-picker', providers: [TIME_PICKER_VALUE_ACCESSOR], template: `
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
  `, host: {
                        class: 'novo-time-picker',
                        '[class.military]': 'military',
                    }, styles: [":host{display:block;width:-webkit-min-content;width:-moz-min-content;width:min-content;overflow:hidden;border-radius:4px;background-color:var(--color-background);box-shadow:0 1px 3px #00000026,0 2px 7px #0000001a;z-index:z(overlay)}:host .digital{background-color:var(--color-selection);display:flex;justify-content:center}:host .digital.inline{background:var(--color-background);border-bottom:var(--border-main)}:host .digital.inline.military{border-bottom:none}:host .digital.inline .digital--inner{flex:1}:host .digital.inline .digital--inner .control-block{display:flex;flex:1}:host .digital.inline .digital--inner .control-block .digital--period{color:var(--color-selection);cursor:pointer;font-size:1em;opacity:.6;padding:1rem;flex:1}:host .digital.inline .digital--inner .control-block .digital--period.active{opacity:1;background-color:var(--color-selection);color:var(--text-selection)}:host .digital--inner{display:flex;text-align:center;align-items:center;justify-content:center}:host .digital--clock{color:#fff;font-size:1.8em;font-weight:500}:host .control-block{display:inline-block}:host .digital--period{display:block;color:#fff;cursor:pointer;font-size:1em;opacity:.6;text-transform:uppercase;font-weight:400}:host .digital--period.active{opacity:1;font-weight:600}:host .increments{position:relative;height:250px;width:auto;display:flex;flex-flow:row nowrap}:host .increments novo-list{overflow-y:auto;overflow-x:hidden;height:100%;flex:1;scroll-snap-type:y mandatory;-ms-overflow-style:none;scrollbar-width:none}:host .increments novo-list::-webkit-scrollbar{display:none}:host .increments .increments--hour,:host .increments .increments--minute,:host .increments .increments--meridian{padding:5px 16px;width:50px;scroll-snap-align:start}:host .increments .increments--hour .list-item,:host .increments .increments--minute .list-item,:host .increments .increments--meridian .list-item{line-height:19px}:host .increments .increments--hour:focus,:host .increments .increments--hour:hover,:host .increments .increments--minute:focus,:host .increments .increments--minute:hover,:host .increments .increments--meridian:focus,:host .increments .increments--meridian:hover{background:var(--color-selection);color:var(--text-selection);filter:brightness(1.25)}:host .increments .increments--hour.active,:host .increments .increments--minute.active,:host .increments .increments--meridian.active{background:var(--color-selection);color:var(--text-selection);font-weight:500}:host .analog{height:250px;width:250px;position:relative;margin:10% auto}:host .analog--inner{top:0;left:0;right:0;bottom:0;width:100%;position:absolute;transition:transform 125ms linear}:host .analog--face{top:5px;right:5px;left:5px;bottom:5px;position:absolute;border-radius:50%}:host .analog--hand--hours{width:240px;height:240px;display:block;position:absolute;top:0;border-radius:50%;transform:rotate(0);transition:transform .1s linear;z-index:1}:host .analog--hand--hours:before{content:\" \";width:2px;top:0;bottom:0;left:30%;margin:30%;z-index:-1;display:block;position:absolute;transform:rotate(90deg)}:host .analog--hand--hours .analog--ball{height:3rem;width:3rem;display:block;right:3.2rem;top:50%;margin-top:-1.5rem;border-radius:50%;position:absolute;border:3px solid var(--color-selection);background:var(--color-selection)}:host .analog--hand--hours.hour-12{transform:rotate(-90deg)}:host .analog--hand--hours.hour-1{transform:rotate(-60deg)}:host .analog--hand--hours.hour-2{transform:rotate(-30deg)}:host .analog--hand--hours.hour-3{transform:rotate(0)}:host .analog--hand--hours.hour-4{transform:rotate(30deg)}:host .analog--hand--hours.hour-5{transform:rotate(60deg)}:host .analog--hand--hours.hour-6{transform:rotate(90deg)}:host .analog--hand--hours.hour-7{transform:rotate(120deg)}:host .analog--hand--hours.hour-8{transform:rotate(150deg)}:host .analog--hand--hours.hour-9{transform:rotate(180deg)}:host .analog--hand--hours.hour-10{transform:rotate(210deg)}:host .analog--hand--hours.hour-11{transform:rotate(240deg)}:host .analog--hand--minutes{width:200px;height:200px;margin:20px;display:block;position:absolute;top:0;border-radius:50%;transform:rotate(0);transition:transform .1s linear;z-index:1}:host .analog--hand--minutes:before{left:23%;margin:33%;content:\" \";width:2px;top:0;bottom:0;z-index:-1;display:block;position:absolute;transform:rotate(90deg)}:host .analog--hand--minutes .analog--ball{display:block;top:50%;border-radius:50%;position:absolute;height:2.4rem;width:2.4rem;right:4.2rem;margin-top:-1.2rem;border:2px solid var(--color-selection);background:var(--color-selection);transition:all .16s ease-in-out}:host .analog--hand--minutes .analog--ball.between{height:1px;border-radius:2em;margin-top:0}:host .analog--hand--minutes.min-00{transform:rotate(-90deg)}:host .analog--hand--minutes.min-01{transform:rotate(-84deg)}:host .analog--hand--minutes.min-02{transform:rotate(-78deg)}:host .analog--hand--minutes.min-03{transform:rotate(-72deg)}:host .analog--hand--minutes.min-04{transform:rotate(-66deg)}:host .analog--hand--minutes.min-05{transform:rotate(-60deg)}:host .analog--hand--minutes.min-06{transform:rotate(-54deg)}:host .analog--hand--minutes.min-07{transform:rotate(-48deg)}:host .analog--hand--minutes.min-08{transform:rotate(-42deg)}:host .analog--hand--minutes.min-09{transform:rotate(-36deg)}:host .analog--hand--minutes.min-10{transform:rotate(-30deg)}:host .analog--hand--minutes.min-11{transform:rotate(-24deg)}:host .analog--hand--minutes.min-12{transform:rotate(-18deg)}:host .analog--hand--minutes.min-13{transform:rotate(-12deg)}:host .analog--hand--minutes.min-14{transform:rotate(-6deg)}:host .analog--hand--minutes.min-15{transform:rotate(0)}:host .analog--hand--minutes.min-16{transform:rotate(6deg)}:host .analog--hand--minutes.min-17{transform:rotate(12deg)}:host .analog--hand--minutes.min-18{transform:rotate(18deg)}:host .analog--hand--minutes.min-19{transform:rotate(24deg)}:host .analog--hand--minutes.min-20{transform:rotate(30deg)}:host .analog--hand--minutes.min-21{transform:rotate(36deg)}:host .analog--hand--minutes.min-22{transform:rotate(42deg)}:host .analog--hand--minutes.min-23{transform:rotate(48deg)}:host .analog--hand--minutes.min-24{transform:rotate(54deg)}:host .analog--hand--minutes.min-25{transform:rotate(60deg)}:host .analog--hand--minutes.min-26{transform:rotate(66deg)}:host .analog--hand--minutes.min-27{transform:rotate(72deg)}:host .analog--hand--minutes.min-28{transform:rotate(78deg)}:host .analog--hand--minutes.min-29{transform:rotate(84deg)}:host .analog--hand--minutes.min-30{transform:rotate(90deg)}:host .analog--hand--minutes.min-31{transform:rotate(96deg)}:host .analog--hand--minutes.min-32{transform:rotate(102deg)}:host .analog--hand--minutes.min-33{transform:rotate(108deg)}:host .analog--hand--minutes.min-34{transform:rotate(114deg)}:host .analog--hand--minutes.min-35{transform:rotate(120deg)}:host .analog--hand--minutes.min-36{transform:rotate(126deg)}:host .analog--hand--minutes.min-37{transform:rotate(132deg)}:host .analog--hand--minutes.min-38{transform:rotate(138deg)}:host .analog--hand--minutes.min-39{transform:rotate(144deg)}:host .analog--hand--minutes.min-40{transform:rotate(150deg)}:host .analog--hand--minutes.min-41{transform:rotate(156deg)}:host .analog--hand--minutes.min-42{transform:rotate(162deg)}:host .analog--hand--minutes.min-43{transform:rotate(168deg)}:host .analog--hand--minutes.min-44{transform:rotate(174deg)}:host .analog--hand--minutes.min-45{transform:rotate(180deg)}:host .analog--hand--minutes.min-46{transform:rotate(186deg)}:host .analog--hand--minutes.min-47{transform:rotate(192deg)}:host .analog--hand--minutes.min-48{transform:rotate(198deg)}:host .analog--hand--minutes.min-49{transform:rotate(204deg)}:host .analog--hand--minutes.min-50{transform:rotate(210deg)}:host .analog--hand--minutes.min-51{transform:rotate(216deg)}:host .analog--hand--minutes.min-52{transform:rotate(222deg)}:host .analog--hand--minutes.min-53{transform:rotate(228deg)}:host .analog--hand--minutes.min-54{transform:rotate(234deg)}:host .analog--hand--minutes.min-55{transform:rotate(240deg)}:host .analog--hand--minutes.min-56{transform:rotate(246deg)}:host .analog--hand--minutes.min-57{transform:rotate(252deg)}:host .analog--hand--minutes.min-58{transform:rotate(258deg)}:host .analog--hand--minutes.min-59{transform:rotate(264deg)}:host .analog--center{height:12rem;width:12rem;border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%);z-index:1;margin-top:1px;margin-left:1px;display:block;position:absolute;background-color:var(--color-background)}:host .analog--hour,:host .analog--minute{font-size:1.6rem;color:#666;left:50%;top:50%;z-index:3;text-align:center;width:40px;padding:8px 0;border-radius:50%;cursor:pointer;margin-left:-20px;margin-top:-20px;position:absolute}:host .analog--hour.active,:host .analog--minute.active{color:#fff}:host .analog--minute{font-size:1rem;margin-left:-20px;margin-top:-16px}:host .analog--hours,:host .analog--minutes{width:250px;height:250px;float:left;position:relative}:host .analog--minutes{position:absolute}:host .analog--hour:nth-child(1){transform:rotate(-60deg) translate(4.5em) rotate(60deg)}:host .analog--minute:nth-child(1){transform:rotate(-60deg) translate(4.5em) rotate(60deg)}:host .analog--hour:nth-child(2){transform:rotate(-30deg) translate(4.5em) rotate(30deg)}:host .analog--minute:nth-child(2){transform:rotate(-30deg) translate(4.5em) rotate(30deg)}:host .analog--hour:nth-child(3){transform:rotate(0) translate(4.5em) rotate(0)}:host .analog--minute:nth-child(3){transform:rotate(0) translate(4.5em) rotate(0)}:host .analog--hour:nth-child(4){transform:rotate(30deg) translate(4.5em) rotate(-30deg)}:host .analog--minute:nth-child(4){transform:rotate(30deg) translate(4.5em) rotate(-30deg)}:host .analog--hour:nth-child(5){transform:rotate(60deg) translate(4.5em) rotate(-60deg)}:host .analog--minute:nth-child(5){transform:rotate(60deg) translate(4.5em) rotate(-60deg)}:host .analog--hour:nth-child(6){transform:rotate(90deg) translate(4.5em) rotate(-90deg)}:host .analog--minute:nth-child(6){transform:rotate(90deg) translate(4.5em) rotate(-90deg)}:host .analog--hour:nth-child(7){transform:rotate(120deg) translate(4.5em) rotate(-120deg)}:host .analog--minute:nth-child(7){transform:rotate(120deg) translate(4.5em) rotate(-120deg)}:host .analog--hour:nth-child(8){transform:rotate(150deg) translate(4.5em) rotate(-150deg)}:host .analog--minute:nth-child(8){transform:rotate(150deg) translate(4.5em) rotate(-150deg)}:host .analog--hour:nth-child(9){transform:rotate(180deg) translate(4.5em) rotate(-180deg)}:host .analog--minute:nth-child(9){transform:rotate(180deg) translate(4.5em) rotate(-180deg)}:host .analog--hour:nth-child(10){transform:rotate(210deg) translate(4.5em) rotate(-210deg)}:host .analog--minute:nth-child(10){transform:rotate(210deg) translate(4.5em) rotate(-210deg)}:host .analog--hour:nth-child(11){transform:rotate(240deg) translate(4.5em) rotate(-240deg)}:host .analog--minute:nth-child(11){transform:rotate(240deg) translate(4.5em) rotate(-240deg)}:host .analog--hour:nth-child(12){transform:rotate(270deg) translate(4.5em) rotate(-270deg)}:host .analog--minute:nth-child(12){transform:rotate(270deg) translate(4.5em) rotate(-270deg)}:host.military .analog--hour:nth-child(1){transform:rotate(-90deg) translate(8rem) rotate(90deg)}:host.military .analog--hand--hours.hour-0{transform:rotate(-90deg)}:host.military .analog--hour:nth-child(2){transform:rotate(-75deg) translate(8rem) rotate(75deg)}:host.military .analog--hand--hours.hour-1{transform:rotate(-75deg)}:host.military .analog--hour:nth-child(3){transform:rotate(-60deg) translate(8rem) rotate(60deg)}:host.military .analog--hand--hours.hour-2{transform:rotate(-60deg)}:host.military .analog--hour:nth-child(4){transform:rotate(-45deg) translate(8rem) rotate(45deg)}:host.military .analog--hand--hours.hour-3{transform:rotate(-45deg)}:host.military .analog--hour:nth-child(5){transform:rotate(-30deg) translate(8rem) rotate(30deg)}:host.military .analog--hand--hours.hour-4{transform:rotate(-30deg)}:host.military .analog--hour:nth-child(6){transform:rotate(-15deg) translate(8rem) rotate(15deg)}:host.military .analog--hand--hours.hour-5{transform:rotate(-15deg)}:host.military .analog--hour:nth-child(7){transform:rotate(0) translate(8rem) rotate(0)}:host.military .analog--hand--hours.hour-6{transform:rotate(0)}:host.military .analog--hour:nth-child(8){transform:rotate(15deg) translate(8rem) rotate(-15deg)}:host.military .analog--hand--hours.hour-7{transform:rotate(15deg)}:host.military .analog--hour:nth-child(9){transform:rotate(30deg) translate(8rem) rotate(-30deg)}:host.military .analog--hand--hours.hour-8{transform:rotate(30deg)}:host.military .analog--hour:nth-child(10){transform:rotate(45deg) translate(8rem) rotate(-45deg)}:host.military .analog--hand--hours.hour-9{transform:rotate(45deg)}:host.military .analog--hour:nth-child(11){transform:rotate(60deg) translate(8rem) rotate(-60deg)}:host.military .analog--hand--hours.hour-10{transform:rotate(60deg)}:host.military .analog--hour:nth-child(12){transform:rotate(75deg) translate(8rem) rotate(-75deg)}:host.military .analog--hand--hours.hour-11{transform:rotate(75deg)}:host.military .analog--hour:nth-child(13){transform:rotate(90deg) translate(8rem) rotate(-90deg)}:host.military .analog--hand--hours.hour-12{transform:rotate(90deg)}:host.military .analog--hour:nth-child(14){transform:rotate(105deg) translate(8rem) rotate(-105deg)}:host.military .analog--hand--hours.hour-13{transform:rotate(105deg)}:host.military .analog--hour:nth-child(15){transform:rotate(120deg) translate(8rem) rotate(-120deg)}:host.military .analog--hand--hours.hour-14{transform:rotate(120deg)}:host.military .analog--hour:nth-child(16){transform:rotate(135deg) translate(8rem) rotate(-135deg)}:host.military .analog--hand--hours.hour-15{transform:rotate(135deg)}:host.military .analog--hour:nth-child(17){transform:rotate(150deg) translate(8rem) rotate(-150deg)}:host.military .analog--hand--hours.hour-16{transform:rotate(150deg)}:host.military .analog--hour:nth-child(18){transform:rotate(165deg) translate(8rem) rotate(-165deg)}:host.military .analog--hand--hours.hour-17{transform:rotate(165deg)}:host.military .analog--hour:nth-child(19){transform:rotate(180deg) translate(8rem) rotate(-180deg)}:host.military .analog--hand--hours.hour-18{transform:rotate(180deg)}:host.military .analog--hour:nth-child(20){transform:rotate(195deg) translate(8rem) rotate(-195deg)}:host.military .analog--hand--hours.hour-19{transform:rotate(195deg)}:host.military .analog--hour:nth-child(21){transform:rotate(210deg) translate(8rem) rotate(-210deg)}:host.military .analog--hand--hours.hour-20{transform:rotate(210deg)}:host.military .analog--hour:nth-child(22){transform:rotate(225deg) translate(8rem) rotate(-225deg)}:host.military .analog--hand--hours.hour-21{transform:rotate(225deg)}:host.military .analog--hour:nth-child(23){transform:rotate(240deg) translate(8rem) rotate(-240deg)}:host.military .analog--hand--hours.hour-22{transform:rotate(240deg)}:host.military .analog--hour:nth-child(24){transform:rotate(255deg) translate(8rem) rotate(-255deg)}:host.military .analog--hand--hours{top:-10px;left:-10px}:host.military .analog--hand--hours.hour-23{transform:rotate(255deg)}:host.military .analog--face{top:15px;right:15px;left:15px;bottom:15px}:host.military .analog--hour{font-size:.9rem;margin-left:-2rem;margin-top:-1.2rem}:host.military .analog--hand--minutes{margin:10px}:host.military .analog--hand--hours .analog--ball{height:2.8rem;width:2.8rem;right:2.7rem;margin-top:-1.4rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { military: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL3RpbWUtcGlja2VyL3RpbWUtcGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBR0wsTUFBTSxHQUVQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ25DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7O0FBRXhELHNEQUFzRDtBQUN0RCxNQUFNLDBCQUEwQixHQUFHO0lBQ2pDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztJQUNwRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFFRixNQUFNLENBQU4sSUFBWSxrQkFHWDtBQUhELFdBQVksa0JBQWtCO0lBQzVCLHlDQUFtQixDQUFBO0lBQ25CLG1DQUFhLENBQUE7QUFDZixDQUFDLEVBSFcsa0JBQWtCLEtBQWxCLGtCQUFrQixRQUc3QjtBQW1HRCxNQUFNLE9BQU8scUJBQXFCO0lBbUNoQyxZQUNTLE9BQW1CLEVBQ25CLE1BQXdCLEVBQ3JCLEdBQXNCO1FBRnpCLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDckIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFwQ2xDLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFF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S0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtZQUNsQixLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ2Q7UUFDRCxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN2QyxLQUFLLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDeEQ7UUFDRCxPQUFPLEdBQUcsS0FBSyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBQy9CLENBQUM7O21IQWhNVSxxQkFBcUI7dUdBQXJCLHFCQUFxQiw4UEE5RnJCLENBQUMsMEJBQTBCLENBQUMsK0NBQzdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1RlQ7NEZBTVUscUJBQXFCO2tCQWpHakMsU0FBUzsrQkFDRSxrQkFBa0IsYUFFakIsQ0FBQywwQkFBMEIsQ0FBQyxZQUM3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUZULFFBQ0s7d0JBQ0osS0FBSyxFQUFFLGtCQUFrQjt3QkFDekIsa0JBQWtCLEVBQUUsVUFBVTtxQkFDL0I7Z0tBSUQsUUFBUTtzQkFEUCxLQUFLO2dCQUdOLE1BQU07c0JBREwsS0FBSztnQkFHTixNQUFNO3NCQURMLEtBQUs7Z0JBR04sSUFBSTtzQkFESCxLQUFLO2dCQUlOLFFBQVE7c0JBRFAsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBpc1ZhbGlkIH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgRGF0ZVV0aWwsIEhlbHBlcnMgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG5jb25zdCBUSU1FX1BJQ0tFUl9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9UaW1lUGlja2VyRWxlbWVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuZXhwb3J0IGVudW0gVElNRV9WQUxVRV9GT1JNQVRTIHtcbiAgaXNvODYwMSA9ICdpc284NjAxJyxcbiAgRGF0ZSA9ICdEYXRlJyxcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by10aW1lLXBpY2tlcicsXG4gIHN0eWxlVXJsczogWycuL3RpbWUtcGlja2VyLnNjc3MnXSxcbiAgcHJvdmlkZXJzOiBbVElNRV9QSUNLRVJfVkFMVUVfQUNDRVNTT1JdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDwhLS0gPGRpdiBjbGFzcz1cImRpZ2l0YWxcIiBbY2xhc3MuaW5saW5lXT1cImlubGluZVwiIFtjbGFzcy5taWxpdGFyeV09XCJtaWxpdGFyeVwiICpuZ0lmPVwiaW5saW5lXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZGlnaXRhbC0taW5uZXJcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJkaWdpdGFsLS1jbG9ja1wiICpuZ0lmPVwiYW5hbG9nXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJob3Vyc1wiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tdGltZS1waWNrZXItaG91cnNcIj57eyBob3VycyB9fTwvc3BhblxuICAgICAgICAgID46PHNwYW4gY2xhc3M9XCJtaW51dGVzXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by10aW1lLXBpY2tlci1taW51dGVzXCI+e3sgbWludXRlcyB9fTwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbC1ibG9ja1wiICpuZ0lmPVwiIW1pbGl0YXJ5ICYmIGFuYWxvZ1wiPlxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgcGVyaW9kIG9mIE1FUklESUFOU1wiXG4gICAgICAgICAgICBjbGFzcz1cImRpZ2l0YWwtLXBlcmlvZFwiXG4gICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIm1lcmlkaWFuID09IHBlcmlvZFwiXG4gICAgICAgICAgICAoY2xpY2spPVwic2V0UGVyaW9kKCRldmVudCwgcGVyaW9kLCB0cnVlKVwiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwicGVyaW9kXCJcbiAgICAgICAgICAgID57eyBwZXJpb2QgfX08L3NwYW5cbiAgICAgICAgICA+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+IC0tPlxuICAgIDxkaXYgY2xhc3M9XCJpbmNyZW1lbnRzXCIgKm5nSWY9XCIhYW5hbG9nXCI+XG4gICAgICA8bm92by1saXN0IGNsYXNzPVwiaW5jcmVtZW50cy0taG91cnNcIiBkaXJlY3Rpb249XCJ2ZXJ0aWNhbFwiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tdGltZS1waWNrZXItaG91cnNcIj5cbiAgICAgICAgPG5vdm8tbGlzdC1pdGVtXG4gICAgICAgICAgY2xhc3M9XCJpbmNyZW1lbnRzLS1ob3VyXCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgaW5jcmVtZW50IG9mIEhPVVJTXCJcbiAgICAgICAgICAoY2xpY2spPVwic2V0SG91cnMoJGV2ZW50LCBpbmNyZW1lbnQsIHRydWUpXCJcbiAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImluY3JlbWVudCA9PSBhY3RpdmVIb3VyXCJcbiAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiaW5jcmVtZW50XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxpdGVtLWNvbnRlbnQ+e3sgaW5jcmVtZW50IH19PC9pdGVtLWNvbnRlbnQ+XG4gICAgICAgIDwvbm92by1saXN0LWl0ZW0+XG4gICAgICA8L25vdm8tbGlzdD5cbiAgICAgIDxub3ZvLWxpc3QgY2xhc3M9XCJpbmNyZW1lbnRzLS1taW51dGVzXCIgZGlyZWN0aW9uPVwidmVydGljYWxcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLXRpbWUtcGlja2VyLW1pbnV0ZXNcIj5cbiAgICAgICAgPG5vdm8tbGlzdC1pdGVtXG4gICAgICAgICAgY2xhc3M9XCJpbmNyZW1lbnRzLS1taW51dGVcIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBpbmNyZW1lbnQgb2YgTUlOVVRFU1wiXG4gICAgICAgICAgKGNsaWNrKT1cInNldE1pbnV0ZXMoJGV2ZW50LCBpbmNyZW1lbnQsIHRydWUpXCJcbiAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImluY3JlbWVudCA9PSBhY3RpdmVNaW51dGVcIlxuICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJpbmNyZW1lbnRcIlxuICAgICAgICA+XG4gICAgICAgICAgPGl0ZW0tY29udGVudD57eyBpbmNyZW1lbnQgfX08L2l0ZW0tY29udGVudD5cbiAgICAgICAgPC9ub3ZvLWxpc3QtaXRlbT5cbiAgICAgIDwvbm92by1saXN0PlxuICAgICAgPG5vdm8tbGlzdCBjbGFzcz1cImluY3JlbWVudHMtLW1lcmlkaWFuc1wiIGRpcmVjdGlvbj1cInZlcnRpY2FsXCIgKm5nSWY9XCIhbWlsaXRhcnlcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLXRpbWUtcGlja2VyLW1lcmlkaWFuc1wiPlxuICAgICAgICA8bm92by1saXN0LWl0ZW1cbiAgICAgICAgICBjbGFzcz1cImluY3JlbWVudHMtLW1lcmlkaWFuXCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgcGVyaW9kIG9mIE1FUklESUFOU1wiXG4gICAgICAgICAgKGNsaWNrKT1cInNldFBlcmlvZCgkZXZlbnQsIHBlcmlvZCwgdHJ1ZSlcIlxuICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwibWVyaWRpYW4gPT0gcGVyaW9kXCJcbiAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwicGVyaW9kXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxpdGVtLWNvbnRlbnQ+e3sgcGVyaW9kIH19PC9pdGVtLWNvbnRlbnQ+XG4gICAgICAgIDwvbm92by1saXN0LWl0ZW0+XG4gICAgICA8L25vdm8tbGlzdD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiYW5hbG9nXCIgKm5nSWY9XCJhbmFsb2dcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhbmFsb2ctLWlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbmFsb2ctLWZhY2VcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImFuYWxvZy0tY2VudGVyXCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYW5hbG9nLS1oYW5kLS1ob3Vyc1wiIFtuZ0NsYXNzXT1cImhvdXJzQ2xhc3NcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYW5hbG9nLS1iYWxsXCI+PC9zcGFuPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImFuYWxvZy0taGFuZC0tbWludXRlc1wiIFtuZ0NsYXNzXT1cIm1pbnV0ZXNDbGFzc1wiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhbmFsb2ctLWJhbGxcIiBbbmdDbGFzc109XCJ7IGJldHdlZW46IGluQmV0d2VlbiB9XCI+PC9zcGFuPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbmFsb2ctLWhvdXJzXCI+XG4gICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBob3VyIG9mIEhPVVJTXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYW5hbG9nLS1ob3VyXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgYWN0aXZlOiBhY3RpdmVIb3VyID09IGhvdXIgfVwiXG4gICAgICAgICAgICAoY2xpY2spPVwic2V0SG91cnMoJGV2ZW50LCBob3VyLCB0cnVlKVwiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiaG91clwiXG4gICAgICAgICAgICA+e3sgaG91ciB9fTwvc3BhblxuICAgICAgICAgID5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbmFsb2ctLW1pbnV0ZXNcIj5cbiAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IG1pbnV0ZSBvZiBNSU5VVEVTXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYW5hbG9nLS1taW51dGVcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyBhY3RpdmU6IGFjdGl2ZU1pbnV0ZSA9PSBtaW51dGUgfVwiXG4gICAgICAgICAgICAoY2xpY2spPVwic2V0TWludXRlcygkZXZlbnQsIG1pbnV0ZSwgdHJ1ZSlcIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIm1pbnV0ZVwiXG4gICAgICAgICAgICA+e3sgbWludXRlIH19PC9zcGFuXG4gICAgICAgICAgPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLXRpbWUtcGlja2VyJyxcbiAgICAnW2NsYXNzLm1pbGl0YXJ5XSc6ICdtaWxpdGFyeScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9UaW1lUGlja2VyRWxlbWVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpXG4gIG1pbGl0YXJ5OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIGFuYWxvZzogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBpbmxpbmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgc3RlcDogbnVtYmVyID0gMTtcblxuICBAT3V0cHV0KClcbiAgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGhvdXJzOiBudW1iZXIgPSAxMjtcbiAgbWludXRlczogbnVtYmVyID0gMDtcbiAgdmFsdWU6IGFueSA9IG51bGw7XG4gIG1lcmlkaWFuOiBzdHJpbmc7XG4gIGluQmV0d2VlbjogYm9vbGVhbjtcbiAgaG91cnNDbGFzczogc3RyaW5nO1xuICBhY3RpdmVIb3VyO1xuICBtaW51dGVzQ2xhc3M6IHN0cmluZztcbiAgYWN0aXZlTWludXRlO1xuICBpbmNyZW1lbnRzOiBzdHJpbmdbXSA9IFtdO1xuICBzZWxlY3RlZDogc3RyaW5nO1xuICBNRVJJRElBTlM6IEFycmF5PHN0cmluZz4gPSBbJ2FtJywgJ3BtJ107XG4gIE1JTlVURVM6IEFycmF5PHN0cmluZz4gPSBbJzA1JywgJzEwJywgJzE1JywgJzIwJywgJzI1JywgJzMwJywgJzM1JywgJzQwJywgJzQ1JywgJzUwJywgJzU1JywgJzAwJ107XG4gIEhPVVJTOiBBcnJheTxzdHJpbmc+ID0gWycxJywgJzInLCAnMycsICc0JywgJzUnLCAnNicsICc3JywgJzgnLCAnOScsICcxMCcsICcxMScsICcxMiddO1xuICBtb2RlbDogYW55O1xuICBfb25DaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gIF9vblRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgZmxhdHRlbihhcnIpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdCguLi5hcnIpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLm1pbGl0YXJ5KSB7XG4gICAgICB0aGlzLkhPVVJTID0gWycwJywgLi4udGhpcy5IT1VSUywgJzEzJywgJzE0JywgJzE1JywgJzE2JywgJzE3JywgJzE4JywgJzE5JywgJzIwJywgJzIxJywgJzIyJywgJzIzJ107XG4gICAgfVxuICAgIGlmICghdGhpcy5hbmFsb2cpIHtcbiAgICAgIGNvbnN0IG1pbnMgPSBBcnJheS5mcm9tKEFycmF5KDYwIC8gdGhpcy5zdGVwKS5rZXlzKCkpLm1hcCgoaSkgPT4gaSAqIHRoaXMuc3RlcCk7XG4gICAgICB0aGlzLk1JTlVURVMgPSBtaW5zLm1hcCgobSkgPT4gYCR7bX1gLnBhZFN0YXJ0KDIsICcwJykpO1xuICAgIH1cbiAgICB0aGlzLm5nT25DaGFuZ2VzKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzPzogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICB0aGlzLmluaXQodGhpcy5tb2RlbCwgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdGVkID0gbnVsbDtcbiAgICAgIHRoaXMuaW5pdChuZXcgRGF0ZSgpLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgaW5pdCh2YWx1ZSwgZGlzcGF0Y2gpIHtcbiAgICBjb25zdCBfdmFsdWUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgbGV0IGhvdXJzOiBzdHJpbmcgfCBudW1iZXIgPSBfdmFsdWUuZ2V0SG91cnMoKTtcbiAgICBsZXQgbWludXRlczogc3RyaW5nIHwgbnVtYmVyID0gX3ZhbHVlLmdldE1pbnV0ZXMoKTtcblxuICAgIGlmICghdGhpcy5taWxpdGFyeSkge1xuICAgICAgdGhpcy5tZXJpZGlhbiA9IGhvdXJzID49IDEyID8gJ3BtJyA6ICdhbSc7XG4gICAgICBob3VycyA9IGhvdXJzICUgMTI7XG4gICAgICBob3VycyA9IGhvdXJzIHx8IDEyO1xuICAgIH1cbiAgICBtaW51dGVzID0gbWludXRlcyA8IDEwID8gYDAke21pbnV0ZXN9YCA6IG1pbnV0ZXM7XG5cbiAgICB0aGlzLnNldEhvdXJzKG51bGwsIGhvdXJzLCBkaXNwYXRjaCk7XG4gICAgdGhpcy5zZXRNaW51dGVzKG51bGwsIG1pbnV0ZXMsIGRpc3BhdGNoKTtcbiAgICB0aGlzLmNoZWNrQmV0d2VlbihtaW51dGVzKTtcbiAgfVxuXG4gIGNoZWNrQmV0d2Vlbih2YWx1ZSkge1xuICAgIHRoaXMuaW5CZXR3ZWVuID0gdGhpcy5NSU5VVEVTLmluZGV4T2YoU3RyaW5nKHZhbHVlKSkgPCAwO1xuICB9XG5cbiAgc2V0VmFsdWUoZXZlbnQsIHZhbHVlKSB7XG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSB2YWx1ZTtcbiAgICBjb25zdCBbdGltZSwgbWVyaWRpYW5dID0gdmFsdWUuc3BsaXQoJyAnKTtcbiAgICBjb25zdCBbaG91cnMsIG1pbnV0ZXNdID0gdGltZS5zcGxpdCgnOicpO1xuICAgIHRoaXMuaG91cnMgPSBob3VycztcbiAgICB0aGlzLm1pbnV0ZXMgPSBtaW51dGVzO1xuICAgIHRoaXMubWVyaWRpYW4gPSBtZXJpZGlhbjtcblxuICAgIHRoaXMuZGlzcGF0Y2hDaGFuZ2UoKTtcbiAgfVxuXG4gIHNldEhvdXJzKGV2ZW50LCBob3VycywgZGlzcGF0Y2gpIHtcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgdGhpcy5ob3VycyA9IGhvdXJzO1xuICAgIHRoaXMuaG91cnNDbGFzcyA9IGBob3VyLSR7aG91cnN9YDtcbiAgICB0aGlzLmFjdGl2ZUhvdXIgPSBob3VycztcblxuICAgIGlmIChkaXNwYXRjaCkge1xuICAgICAgdGhpcy5kaXNwYXRjaENoYW5nZSgpO1xuICAgIH1cbiAgfVxuXG4gIHNldE1pbnV0ZXMoZXZlbnQsIG1pbnV0ZXMsIGRpc3BhdGNoKSB7XG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIHRoaXMubWludXRlcyA9IG1pbnV0ZXM7XG4gICAgdGhpcy5taW51dGVzQ2xhc3MgPSBgbWluLSR7bWludXRlc31gO1xuICAgIHRoaXMuYWN0aXZlTWludXRlID0gbWludXRlcztcbiAgICB0aGlzLmNoZWNrQmV0d2VlbihtaW51dGVzKTtcblxuICAgIGlmIChkaXNwYXRjaCkge1xuICAgICAgdGhpcy5kaXNwYXRjaENoYW5nZSgpO1xuICAgIH1cbiAgfVxuXG4gIHNldFBlcmlvZChldmVudCwgcGVyaW9kLCBkaXNwYXRjaCkge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICB0aGlzLm1lcmlkaWFuID0gcGVyaW9kO1xuXG4gICAgaWYgKGRpc3BhdGNoKSB7XG4gICAgICB0aGlzLmRpc3BhdGNoQ2hhbmdlKCk7XG4gICAgfVxuICB9XG5cbiAgZGlzcGF0Y2hDaGFuZ2UoKSB7XG4gICAgbGV0IGhvdXJzID0gTnVtYmVyKHRoaXMuaG91cnMpO1xuXG4gICAgaWYgKCF0aGlzLm1pbGl0YXJ5KSB7XG4gICAgICBob3VycyA9IHRoaXMubWVyaWRpYW4udG9Mb3dlckNhc2UoKSA9PT0gJ3BtJyA/IGhvdXJzICsgMTIgOiBob3VycztcblxuICAgICAgLy8gU3BlY2lhbCBjYXNlIGZvciAxMlxuICAgICAgaWYgKHRoaXMubWVyaWRpYW4udG9Mb3dlckNhc2UoKSA9PT0gJ3BtJyAmJiBob3VycyA9PT0gMjQpIHtcbiAgICAgICAgaG91cnMgPSAxMjtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5tZXJpZGlhbi50b0xvd2VyQ2FzZSgpID09PSAnYW0nICYmIGhvdXJzID09PSAxMikge1xuICAgICAgICBob3VycyA9IDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdmFsdWUgPSBuZXcgRGF0ZSgpO1xuICAgIHZhbHVlLnNldEhvdXJzKGhvdXJzKTtcbiAgICB2YWx1ZS5zZXRNaW51dGVzKHRoaXMubWludXRlcyk7XG4gICAgdmFsdWUuc2V0U2Vjb25kcygwKTtcbiAgICB0aGlzLnZhbHVlID0gYCR7dGhpcy5ob3Vyc306JHt0aGlzLm1pbnV0ZXN9ICR7dGhpcy5tZXJpZGlhbn1gO1xuICAgIHRoaXMub25TZWxlY3QubmV4dCh7XG4gICAgICBob3VycyxcbiAgICAgIG1pbnV0ZXM6IHRoaXMubWludXRlcyxcbiAgICAgIG1lcmlkaWFuOiB0aGlzLm1lcmlkaWFuLFxuICAgICAgZGF0ZTogdmFsdWUsXG4gICAgICB0ZXh0OiB0aGlzLnZhbHVlLFxuICAgIH0pO1xuICAgIHRoaXMuX29uQ2hhbmdlKHZhbHVlKTtcbiAgfVxuXG4gIC8vIFZhbHVlQWNjZXNzb3IgRnVuY3Rpb25zXG4gIHdyaXRlVmFsdWUobW9kZWw6IGFueSk6IHZvaWQge1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICBpZiAoSGVscGVycy5pc0RhdGUobW9kZWwpKSB7XG4gICAgICB0aGlzLmluaXQobW9kZWwsIGZhbHNlKTtcbiAgICAgIC8vIHRoaXMuZGlzcGF0Y2hDaGFuZ2UoKTtcbiAgICB9XG4gICAgaWYgKEhlbHBlcnMuaXNTdHJpbmcobW9kZWwpKSB7XG4gICAgICBjb25zdCB0aW1lID0gdGhpcy5taWxpdGFyeSA/IG1vZGVsIDogdGhpcy5jb252ZXJ0VGltZTEydG8yNChtb2RlbCk7XG4gICAgICBjb25zdCBkYXRlID0gRGF0ZVV0aWwucGFyc2UoYCR7RGF0ZVV0aWwuZm9ybWF0KERhdGUubm93KCksICdZWVlZLU1NLUREJyl9VCR7dGltZX1gKTtcbiAgICAgIGlmIChpc1ZhbGlkKGRhdGUpKSB7XG4gICAgICAgIHRoaXMuaW5pdChkYXRlLCBmYWxzZSk7XG4gICAgICAgIC8vIHRoaXMuZGlzcGF0Y2hDaGFuZ2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMuX29uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIGNvbnZlcnRUaW1lMTJ0bzI0KHRpbWUxMmg6IHN0cmluZykge1xuICAgIGNvbnN0IHBtRm9ybWF0ID0gdGhpcy5sYWJlbHMudGltZUZvcm1hdFBNLnRvVXBwZXJDYXNlKCk7XG5cbiAgICBjb25zdCBbdGltZSwgbW9kaWZpZXJdID0gdGltZTEyaC5zcGxpdCgnICcpO1xuICAgIGxldCBbaG91cnMsIG1pbnV0ZXNdID0gdGltZS5zcGxpdCgnOicpO1xuICAgIGlmIChob3VycyA9PT0gJzEyJykge1xuICAgICAgaG91cnMgPSAnMDAnO1xuICAgIH1cbiAgICBpZiAoWydQTScsIHBtRm9ybWF0XS5pbmNsdWRlcyhtb2RpZmllcikpIHtcbiAgICAgIGhvdXJzID0gYCR7cGFyc2VJbnQoaG91cnMsIDEwKSArIDEyfWAucGFkU3RhcnQoMiwgJzAnKTtcbiAgICB9XG4gICAgcmV0dXJuIGAke2hvdXJzfToke21pbnV0ZXN9YDtcbiAgfVxufVxuIl19