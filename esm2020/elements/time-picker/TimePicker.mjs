// NG2
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isValid } from 'date-fns';
// APP
import { NovoLabelService } from 'novo-elements/services';
import { DateUtil, Helpers } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "novo-elements/elements/list";
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
  `, isInline: true, styles: [":host{display:block;width:-webkit-min-content;width:-moz-min-content;width:min-content;overflow:hidden;border-radius:4px;background-color:var(--background-bright);box-shadow:0 1px 3px #00000026,0 2px 7px #0000001a;z-index:1000}:host .digital{background-color:var(--selection);display:flex;justify-content:center}:host .digital.inline{background:#ffffff;border-bottom:1px solid #f0f0f0}:host .digital.inline.military{border-bottom:none}:host .digital.inline .digital--inner{flex:1}:host .digital.inline .digital--inner .control-block{display:flex;flex:1}:host .digital.inline .digital--inner .control-block .digital--period{color:var(--selection);cursor:pointer;font-size:1em;opacity:.6;padding:1rem;flex:1}:host .digital.inline .digital--inner .control-block .digital--period.active{opacity:1;background-color:var(--selection);color:#fff}:host .digital--inner{display:flex;text-align:center;align-items:center;justify-content:center}:host .digital--clock{color:#fff;font-size:1.8em;font-weight:500}:host .control-block{display:inline-block}:host .digital--period{display:block;color:#fff;cursor:pointer;font-size:1em;opacity:.6;text-transform:uppercase;font-weight:400}:host .digital--period.active{opacity:1;font-weight:600}:host .increments{position:relative;height:250px;width:auto;display:flex;flex-flow:row nowrap}:host .increments novo-list{overflow-y:auto;overflow-x:hidden;height:100%;flex:1;scroll-snap-type:y mandatory;-ms-overflow-style:none;scrollbar-width:none}:host .increments novo-list::-webkit-scrollbar{display:none}:host .increments .increments--hour,:host .increments .increments--minute,:host .increments .increments--meridian{padding:5px 16px;width:50px;scroll-snap-align:start}:host .increments .increments--hour ::ng-deep .list-item,:host .increments .increments--minute ::ng-deep .list-item,:host .increments .increments--meridian ::ng-deep .list-item{line-height:19px}:host .increments .increments--hour:focus,:host .increments .increments--hour:hover,:host .increments .increments--minute:focus,:host .increments .increments--minute:hover,:host .increments .increments--meridian:focus,:host .increments .increments--meridian:hover{background:var(--selection);color:var(--text-selection);filter:brightness(1.25)}:host .increments .increments--hour.active,:host .increments .increments--minute.active,:host .increments .increments--meridian.active{background:var(--selection);color:var(--text-selection);font-weight:500}:host .analog{height:250px;width:250px;position:relative;margin:10% auto}:host .analog--inner{top:0;left:0;right:0;bottom:0;width:100%;position:absolute;transition:transform 125ms linear}:host .analog--face{top:5px;right:5px;left:5px;bottom:5px;position:absolute;border-radius:50%}:host .analog--hand--hours{width:240px;height:240px;display:block;position:absolute;top:0;border-radius:50%;transform:rotate(0);transition:transform .1s linear;z-index:1}:host .analog--hand--hours:before{content:\" \";width:2px;top:0;bottom:0;left:30%;margin:30%;z-index:-1;display:block;position:absolute;transform:rotate(90deg)}:host .analog--hand--hours .analog--ball{height:3rem;width:3rem;display:block;right:3.2rem;top:50%;margin-top:-1.5rem;border-radius:50%;position:absolute;border:3px solid var(--selection);background:var(--selection)}:host .analog--hand--hours.hour-12{transform:rotate(-90deg)}:host .analog--hand--hours.hour-1{transform:rotate(-60deg)}:host .analog--hand--hours.hour-2{transform:rotate(-30deg)}:host .analog--hand--hours.hour-3{transform:rotate(0)}:host .analog--hand--hours.hour-4{transform:rotate(30deg)}:host .analog--hand--hours.hour-5{transform:rotate(60deg)}:host .analog--hand--hours.hour-6{transform:rotate(90deg)}:host .analog--hand--hours.hour-7{transform:rotate(120deg)}:host .analog--hand--hours.hour-8{transform:rotate(150deg)}:host .analog--hand--hours.hour-9{transform:rotate(180deg)}:host .analog--hand--hours.hour-10{transform:rotate(210deg)}:host .analog--hand--hours.hour-11{transform:rotate(240deg)}:host .analog--hand--minutes{width:200px;height:200px;margin:20px;display:block;position:absolute;top:0;border-radius:50%;transform:rotate(0);transition:transform .1s linear;z-index:1}:host .analog--hand--minutes:before{left:23%;margin:33%;content:\" \";width:2px;top:0;bottom:0;z-index:-1;display:block;position:absolute;transform:rotate(90deg)}:host .analog--hand--minutes .analog--ball{display:block;top:50%;border-radius:50%;position:absolute;height:2.4rem;width:2.4rem;right:4.2rem;margin-top:-1.2rem;border:2px solid var(--selection);background:var(--selection);transition:all .16s ease-in-out}:host .analog--hand--minutes .analog--ball.between{height:1px;border-radius:2em;margin-top:0}:host .analog--hand--minutes.min-00{transform:rotate(-90deg)}:host .analog--hand--minutes.min-01{transform:rotate(-84deg)}:host .analog--hand--minutes.min-02{transform:rotate(-78deg)}:host .analog--hand--minutes.min-03{transform:rotate(-72deg)}:host .analog--hand--minutes.min-04{transform:rotate(-66deg)}:host .analog--hand--minutes.min-05{transform:rotate(-60deg)}:host .analog--hand--minutes.min-06{transform:rotate(-54deg)}:host .analog--hand--minutes.min-07{transform:rotate(-48deg)}:host .analog--hand--minutes.min-08{transform:rotate(-42deg)}:host .analog--hand--minutes.min-09{transform:rotate(-36deg)}:host .analog--hand--minutes.min-10{transform:rotate(-30deg)}:host .analog--hand--minutes.min-11{transform:rotate(-24deg)}:host .analog--hand--minutes.min-12{transform:rotate(-18deg)}:host .analog--hand--minutes.min-13{transform:rotate(-12deg)}:host .analog--hand--minutes.min-14{transform:rotate(-6deg)}:host .analog--hand--minutes.min-15{transform:rotate(0)}:host .analog--hand--minutes.min-16{transform:rotate(6deg)}:host .analog--hand--minutes.min-17{transform:rotate(12deg)}:host .analog--hand--minutes.min-18{transform:rotate(18deg)}:host .analog--hand--minutes.min-19{transform:rotate(24deg)}:host .analog--hand--minutes.min-20{transform:rotate(30deg)}:host .analog--hand--minutes.min-21{transform:rotate(36deg)}:host .analog--hand--minutes.min-22{transform:rotate(42deg)}:host .analog--hand--minutes.min-23{transform:rotate(48deg)}:host .analog--hand--minutes.min-24{transform:rotate(54deg)}:host .analog--hand--minutes.min-25{transform:rotate(60deg)}:host .analog--hand--minutes.min-26{transform:rotate(66deg)}:host .analog--hand--minutes.min-27{transform:rotate(72deg)}:host .analog--hand--minutes.min-28{transform:rotate(78deg)}:host .analog--hand--minutes.min-29{transform:rotate(84deg)}:host .analog--hand--minutes.min-30{transform:rotate(90deg)}:host .analog--hand--minutes.min-31{transform:rotate(96deg)}:host .analog--hand--minutes.min-32{transform:rotate(102deg)}:host .analog--hand--minutes.min-33{transform:rotate(108deg)}:host .analog--hand--minutes.min-34{transform:rotate(114deg)}:host .analog--hand--minutes.min-35{transform:rotate(120deg)}:host .analog--hand--minutes.min-36{transform:rotate(126deg)}:host .analog--hand--minutes.min-37{transform:rotate(132deg)}:host .analog--hand--minutes.min-38{transform:rotate(138deg)}:host .analog--hand--minutes.min-39{transform:rotate(144deg)}:host .analog--hand--minutes.min-40{transform:rotate(150deg)}:host .analog--hand--minutes.min-41{transform:rotate(156deg)}:host .analog--hand--minutes.min-42{transform:rotate(162deg)}:host .analog--hand--minutes.min-43{transform:rotate(168deg)}:host .analog--hand--minutes.min-44{transform:rotate(174deg)}:host .analog--hand--minutes.min-45{transform:rotate(180deg)}:host .analog--hand--minutes.min-46{transform:rotate(186deg)}:host .analog--hand--minutes.min-47{transform:rotate(192deg)}:host .analog--hand--minutes.min-48{transform:rotate(198deg)}:host .analog--hand--minutes.min-49{transform:rotate(204deg)}:host .analog--hand--minutes.min-50{transform:rotate(210deg)}:host .analog--hand--minutes.min-51{transform:rotate(216deg)}:host .analog--hand--minutes.min-52{transform:rotate(222deg)}:host .analog--hand--minutes.min-53{transform:rotate(228deg)}:host .analog--hand--minutes.min-54{transform:rotate(234deg)}:host .analog--hand--minutes.min-55{transform:rotate(240deg)}:host .analog--hand--minutes.min-56{transform:rotate(246deg)}:host .analog--hand--minutes.min-57{transform:rotate(252deg)}:host .analog--hand--minutes.min-58{transform:rotate(258deg)}:host .analog--hand--minutes.min-59{transform:rotate(264deg)}:host .analog--center{height:12rem;width:12rem;border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%);z-index:1;margin-top:1px;margin-left:1px;display:block;position:absolute;background-color:#f7f7f7}:host .analog--hour,:host .analog--minute{font-size:1.6rem;color:#666;left:50%;top:50%;z-index:3;text-align:center;width:40px;padding:8px 0;border-radius:50%;cursor:pointer;margin-left:-20px;margin-top:-20px;position:absolute}:host .analog--hour.active,:host .analog--minute.active{color:#fff}:host .analog--minute{font-size:1rem;margin-left:-20px;margin-top:-16px}:host .analog--hours,:host .analog--minutes{width:250px;height:250px;float:left;position:relative}:host .analog--minutes{position:absolute}:host .analog--hour:nth-child(1){transform:rotate(-60deg) translate(4.5em) rotate(60deg)}:host .analog--minute:nth-child(1){transform:rotate(-60deg) translate(4.5em) rotate(60deg)}:host .analog--hour:nth-child(2){transform:rotate(-30deg) translate(4.5em) rotate(30deg)}:host .analog--minute:nth-child(2){transform:rotate(-30deg) translate(4.5em) rotate(30deg)}:host .analog--hour:nth-child(3){transform:rotate(0) translate(4.5em) rotate(0)}:host .analog--minute:nth-child(3){transform:rotate(0) translate(4.5em) rotate(0)}:host .analog--hour:nth-child(4){transform:rotate(30deg) translate(4.5em) rotate(-30deg)}:host .analog--minute:nth-child(4){transform:rotate(30deg) translate(4.5em) rotate(-30deg)}:host .analog--hour:nth-child(5){transform:rotate(60deg) translate(4.5em) rotate(-60deg)}:host .analog--minute:nth-child(5){transform:rotate(60deg) translate(4.5em) rotate(-60deg)}:host .analog--hour:nth-child(6){transform:rotate(90deg) translate(4.5em) rotate(-90deg)}:host .analog--minute:nth-child(6){transform:rotate(90deg) translate(4.5em) rotate(-90deg)}:host .analog--hour:nth-child(7){transform:rotate(120deg) translate(4.5em) rotate(-120deg)}:host .analog--minute:nth-child(7){transform:rotate(120deg) translate(4.5em) rotate(-120deg)}:host .analog--hour:nth-child(8){transform:rotate(150deg) translate(4.5em) rotate(-150deg)}:host .analog--minute:nth-child(8){transform:rotate(150deg) translate(4.5em) rotate(-150deg)}:host .analog--hour:nth-child(9){transform:rotate(180deg) translate(4.5em) rotate(-180deg)}:host .analog--minute:nth-child(9){transform:rotate(180deg) translate(4.5em) rotate(-180deg)}:host .analog--hour:nth-child(10){transform:rotate(210deg) translate(4.5em) rotate(-210deg)}:host .analog--minute:nth-child(10){transform:rotate(210deg) translate(4.5em) rotate(-210deg)}:host .analog--hour:nth-child(11){transform:rotate(240deg) translate(4.5em) rotate(-240deg)}:host .analog--minute:nth-child(11){transform:rotate(240deg) translate(4.5em) rotate(-240deg)}:host .analog--hour:nth-child(12){transform:rotate(270deg) translate(4.5em) rotate(-270deg)}:host .analog--minute:nth-child(12){transform:rotate(270deg) translate(4.5em) rotate(-270deg)}:host.military .analog--hour:nth-child(1){transform:rotate(-90deg) translate(8rem) rotate(90deg)}:host.military .analog--hand--hours.hour-0{transform:rotate(-90deg)}:host.military .analog--hour:nth-child(2){transform:rotate(-75deg) translate(8rem) rotate(75deg)}:host.military .analog--hand--hours.hour-1{transform:rotate(-75deg)}:host.military .analog--hour:nth-child(3){transform:rotate(-60deg) translate(8rem) rotate(60deg)}:host.military .analog--hand--hours.hour-2{transform:rotate(-60deg)}:host.military .analog--hour:nth-child(4){transform:rotate(-45deg) translate(8rem) rotate(45deg)}:host.military .analog--hand--hours.hour-3{transform:rotate(-45deg)}:host.military .analog--hour:nth-child(5){transform:rotate(-30deg) translate(8rem) rotate(30deg)}:host.military .analog--hand--hours.hour-4{transform:rotate(-30deg)}:host.military .analog--hour:nth-child(6){transform:rotate(-15deg) translate(8rem) rotate(15deg)}:host.military .analog--hand--hours.hour-5{transform:rotate(-15deg)}:host.military .analog--hour:nth-child(7){transform:rotate(0) translate(8rem) rotate(0)}:host.military .analog--hand--hours.hour-6{transform:rotate(0)}:host.military .analog--hour:nth-child(8){transform:rotate(15deg) translate(8rem) rotate(-15deg)}:host.military .analog--hand--hours.hour-7{transform:rotate(15deg)}:host.military .analog--hour:nth-child(9){transform:rotate(30deg) translate(8rem) rotate(-30deg)}:host.military .analog--hand--hours.hour-8{transform:rotate(30deg)}:host.military .analog--hour:nth-child(10){transform:rotate(45deg) translate(8rem) rotate(-45deg)}:host.military .analog--hand--hours.hour-9{transform:rotate(45deg)}:host.military .analog--hour:nth-child(11){transform:rotate(60deg) translate(8rem) rotate(-60deg)}:host.military .analog--hand--hours.hour-10{transform:rotate(60deg)}:host.military .analog--hour:nth-child(12){transform:rotate(75deg) translate(8rem) rotate(-75deg)}:host.military .analog--hand--hours.hour-11{transform:rotate(75deg)}:host.military .analog--hour:nth-child(13){transform:rotate(90deg) translate(8rem) rotate(-90deg)}:host.military .analog--hand--hours.hour-12{transform:rotate(90deg)}:host.military .analog--hour:nth-child(14){transform:rotate(105deg) translate(8rem) rotate(-105deg)}:host.military .analog--hand--hours.hour-13{transform:rotate(105deg)}:host.military .analog--hour:nth-child(15){transform:rotate(120deg) translate(8rem) rotate(-120deg)}:host.military .analog--hand--hours.hour-14{transform:rotate(120deg)}:host.military .analog--hour:nth-child(16){transform:rotate(135deg) translate(8rem) rotate(-135deg)}:host.military .analog--hand--hours.hour-15{transform:rotate(135deg)}:host.military .analog--hour:nth-child(17){transform:rotate(150deg) translate(8rem) rotate(-150deg)}:host.military .analog--hand--hours.hour-16{transform:rotate(150deg)}:host.military .analog--hour:nth-child(18){transform:rotate(165deg) translate(8rem) rotate(-165deg)}:host.military .analog--hand--hours.hour-17{transform:rotate(165deg)}:host.military .analog--hour:nth-child(19){transform:rotate(180deg) translate(8rem) rotate(-180deg)}:host.military .analog--hand--hours.hour-18{transform:rotate(180deg)}:host.military .analog--hour:nth-child(20){transform:rotate(195deg) translate(8rem) rotate(-195deg)}:host.military .analog--hand--hours.hour-19{transform:rotate(195deg)}:host.military .analog--hour:nth-child(21){transform:rotate(210deg) translate(8rem) rotate(-210deg)}:host.military .analog--hand--hours.hour-20{transform:rotate(210deg)}:host.military .analog--hour:nth-child(22){transform:rotate(225deg) translate(8rem) rotate(-225deg)}:host.military .analog--hand--hours.hour-21{transform:rotate(225deg)}:host.military .analog--hour:nth-child(23){transform:rotate(240deg) translate(8rem) rotate(-240deg)}:host.military .analog--hand--hours.hour-22{transform:rotate(240deg)}:host.military .analog--hour:nth-child(24){transform:rotate(255deg) translate(8rem) rotate(-255deg)}:host.military .analog--hand--hours{top:-10px;left:-10px}:host.military .analog--hand--hours.hour-23{transform:rotate(255deg)}:host.military .analog--face{top:15px;right:15px;left:15px;bottom:15px}:host.military .analog--hour{font-size:.9rem;margin-left:-2rem;margin-top:-1.2rem}:host.military .analog--hand--minutes{margin:10px}:host.military .analog--hand--hours .analog--ball{height:2.8rem;width:2.8rem;right:2.7rem;margin-top:-1.4rem}\n"], components: [{ type: i2.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { type: i2.NovoListItemElement, selector: "novo-list-item, a[list-item], button[list-item]" }, { type: i2.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
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
                    }, styles: [":host{display:block;width:-webkit-min-content;width:-moz-min-content;width:min-content;overflow:hidden;border-radius:4px;background-color:var(--background-bright);box-shadow:0 1px 3px #00000026,0 2px 7px #0000001a;z-index:1000}:host .digital{background-color:var(--selection);display:flex;justify-content:center}:host .digital.inline{background:#ffffff;border-bottom:1px solid #f0f0f0}:host .digital.inline.military{border-bottom:none}:host .digital.inline .digital--inner{flex:1}:host .digital.inline .digital--inner .control-block{display:flex;flex:1}:host .digital.inline .digital--inner .control-block .digital--period{color:var(--selection);cursor:pointer;font-size:1em;opacity:.6;padding:1rem;flex:1}:host .digital.inline .digital--inner .control-block .digital--period.active{opacity:1;background-color:var(--selection);color:#fff}:host .digital--inner{display:flex;text-align:center;align-items:center;justify-content:center}:host .digital--clock{color:#fff;font-size:1.8em;font-weight:500}:host .control-block{display:inline-block}:host .digital--period{display:block;color:#fff;cursor:pointer;font-size:1em;opacity:.6;text-transform:uppercase;font-weight:400}:host .digital--period.active{opacity:1;font-weight:600}:host .increments{position:relative;height:250px;width:auto;display:flex;flex-flow:row nowrap}:host .increments novo-list{overflow-y:auto;overflow-x:hidden;height:100%;flex:1;scroll-snap-type:y mandatory;-ms-overflow-style:none;scrollbar-width:none}:host .increments novo-list::-webkit-scrollbar{display:none}:host .increments .increments--hour,:host .increments .increments--minute,:host .increments .increments--meridian{padding:5px 16px;width:50px;scroll-snap-align:start}:host .increments .increments--hour ::ng-deep .list-item,:host .increments .increments--minute ::ng-deep .list-item,:host .increments .increments--meridian ::ng-deep .list-item{line-height:19px}:host .increments .increments--hour:focus,:host .increments .increments--hour:hover,:host .increments .increments--minute:focus,:host .increments .increments--minute:hover,:host .increments .increments--meridian:focus,:host .increments .increments--meridian:hover{background:var(--selection);color:var(--text-selection);filter:brightness(1.25)}:host .increments .increments--hour.active,:host .increments .increments--minute.active,:host .increments .increments--meridian.active{background:var(--selection);color:var(--text-selection);font-weight:500}:host .analog{height:250px;width:250px;position:relative;margin:10% auto}:host .analog--inner{top:0;left:0;right:0;bottom:0;width:100%;position:absolute;transition:transform 125ms linear}:host .analog--face{top:5px;right:5px;left:5px;bottom:5px;position:absolute;border-radius:50%}:host .analog--hand--hours{width:240px;height:240px;display:block;position:absolute;top:0;border-radius:50%;transform:rotate(0);transition:transform .1s linear;z-index:1}:host .analog--hand--hours:before{content:\" \";width:2px;top:0;bottom:0;left:30%;margin:30%;z-index:-1;display:block;position:absolute;transform:rotate(90deg)}:host .analog--hand--hours .analog--ball{height:3rem;width:3rem;display:block;right:3.2rem;top:50%;margin-top:-1.5rem;border-radius:50%;position:absolute;border:3px solid var(--selection);background:var(--selection)}:host .analog--hand--hours.hour-12{transform:rotate(-90deg)}:host .analog--hand--hours.hour-1{transform:rotate(-60deg)}:host .analog--hand--hours.hour-2{transform:rotate(-30deg)}:host .analog--hand--hours.hour-3{transform:rotate(0)}:host .analog--hand--hours.hour-4{transform:rotate(30deg)}:host .analog--hand--hours.hour-5{transform:rotate(60deg)}:host .analog--hand--hours.hour-6{transform:rotate(90deg)}:host .analog--hand--hours.hour-7{transform:rotate(120deg)}:host .analog--hand--hours.hour-8{transform:rotate(150deg)}:host .analog--hand--hours.hour-9{transform:rotate(180deg)}:host .analog--hand--hours.hour-10{transform:rotate(210deg)}:host .analog--hand--hours.hour-11{transform:rotate(240deg)}:host .analog--hand--minutes{width:200px;height:200px;margin:20px;display:block;position:absolute;top:0;border-radius:50%;transform:rotate(0);transition:transform .1s linear;z-index:1}:host .analog--hand--minutes:before{left:23%;margin:33%;content:\" \";width:2px;top:0;bottom:0;z-index:-1;display:block;position:absolute;transform:rotate(90deg)}:host .analog--hand--minutes .analog--ball{display:block;top:50%;border-radius:50%;position:absolute;height:2.4rem;width:2.4rem;right:4.2rem;margin-top:-1.2rem;border:2px solid var(--selection);background:var(--selection);transition:all .16s ease-in-out}:host .analog--hand--minutes .analog--ball.between{height:1px;border-radius:2em;margin-top:0}:host .analog--hand--minutes.min-00{transform:rotate(-90deg)}:host .analog--hand--minutes.min-01{transform:rotate(-84deg)}:host .analog--hand--minutes.min-02{transform:rotate(-78deg)}:host .analog--hand--minutes.min-03{transform:rotate(-72deg)}:host .analog--hand--minutes.min-04{transform:rotate(-66deg)}:host .analog--hand--minutes.min-05{transform:rotate(-60deg)}:host .analog--hand--minutes.min-06{transform:rotate(-54deg)}:host .analog--hand--minutes.min-07{transform:rotate(-48deg)}:host .analog--hand--minutes.min-08{transform:rotate(-42deg)}:host .analog--hand--minutes.min-09{transform:rotate(-36deg)}:host .analog--hand--minutes.min-10{transform:rotate(-30deg)}:host .analog--hand--minutes.min-11{transform:rotate(-24deg)}:host .analog--hand--minutes.min-12{transform:rotate(-18deg)}:host .analog--hand--minutes.min-13{transform:rotate(-12deg)}:host .analog--hand--minutes.min-14{transform:rotate(-6deg)}:host .analog--hand--minutes.min-15{transform:rotate(0)}:host .analog--hand--minutes.min-16{transform:rotate(6deg)}:host .analog--hand--minutes.min-17{transform:rotate(12deg)}:host .analog--hand--minutes.min-18{transform:rotate(18deg)}:host .analog--hand--minutes.min-19{transform:rotate(24deg)}:host .analog--hand--minutes.min-20{transform:rotate(30deg)}:host .analog--hand--minutes.min-21{transform:rotate(36deg)}:host .analog--hand--minutes.min-22{transform:rotate(42deg)}:host .analog--hand--minutes.min-23{transform:rotate(48deg)}:host .analog--hand--minutes.min-24{transform:rotate(54deg)}:host .analog--hand--minutes.min-25{transform:rotate(60deg)}:host .analog--hand--minutes.min-26{transform:rotate(66deg)}:host .analog--hand--minutes.min-27{transform:rotate(72deg)}:host .analog--hand--minutes.min-28{transform:rotate(78deg)}:host .analog--hand--minutes.min-29{transform:rotate(84deg)}:host .analog--hand--minutes.min-30{transform:rotate(90deg)}:host .analog--hand--minutes.min-31{transform:rotate(96deg)}:host .analog--hand--minutes.min-32{transform:rotate(102deg)}:host .analog--hand--minutes.min-33{transform:rotate(108deg)}:host .analog--hand--minutes.min-34{transform:rotate(114deg)}:host .analog--hand--minutes.min-35{transform:rotate(120deg)}:host .analog--hand--minutes.min-36{transform:rotate(126deg)}:host .analog--hand--minutes.min-37{transform:rotate(132deg)}:host .analog--hand--minutes.min-38{transform:rotate(138deg)}:host .analog--hand--minutes.min-39{transform:rotate(144deg)}:host .analog--hand--minutes.min-40{transform:rotate(150deg)}:host .analog--hand--minutes.min-41{transform:rotate(156deg)}:host .analog--hand--minutes.min-42{transform:rotate(162deg)}:host .analog--hand--minutes.min-43{transform:rotate(168deg)}:host .analog--hand--minutes.min-44{transform:rotate(174deg)}:host .analog--hand--minutes.min-45{transform:rotate(180deg)}:host .analog--hand--minutes.min-46{transform:rotate(186deg)}:host .analog--hand--minutes.min-47{transform:rotate(192deg)}:host .analog--hand--minutes.min-48{transform:rotate(198deg)}:host .analog--hand--minutes.min-49{transform:rotate(204deg)}:host .analog--hand--minutes.min-50{transform:rotate(210deg)}:host .analog--hand--minutes.min-51{transform:rotate(216deg)}:host .analog--hand--minutes.min-52{transform:rotate(222deg)}:host .analog--hand--minutes.min-53{transform:rotate(228deg)}:host .analog--hand--minutes.min-54{transform:rotate(234deg)}:host .analog--hand--minutes.min-55{transform:rotate(240deg)}:host .analog--hand--minutes.min-56{transform:rotate(246deg)}:host .analog--hand--minutes.min-57{transform:rotate(252deg)}:host .analog--hand--minutes.min-58{transform:rotate(258deg)}:host .analog--hand--minutes.min-59{transform:rotate(264deg)}:host .analog--center{height:12rem;width:12rem;border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%);z-index:1;margin-top:1px;margin-left:1px;display:block;position:absolute;background-color:#f7f7f7}:host .analog--hour,:host .analog--minute{font-size:1.6rem;color:#666;left:50%;top:50%;z-index:3;text-align:center;width:40px;padding:8px 0;border-radius:50%;cursor:pointer;margin-left:-20px;margin-top:-20px;position:absolute}:host .analog--hour.active,:host .analog--minute.active{color:#fff}:host .analog--minute{font-size:1rem;margin-left:-20px;margin-top:-16px}:host .analog--hours,:host .analog--minutes{width:250px;height:250px;float:left;position:relative}:host .analog--minutes{position:absolute}:host .analog--hour:nth-child(1){transform:rotate(-60deg) translate(4.5em) rotate(60deg)}:host .analog--minute:nth-child(1){transform:rotate(-60deg) translate(4.5em) rotate(60deg)}:host .analog--hour:nth-child(2){transform:rotate(-30deg) translate(4.5em) rotate(30deg)}:host .analog--minute:nth-child(2){transform:rotate(-30deg) translate(4.5em) rotate(30deg)}:host .analog--hour:nth-child(3){transform:rotate(0) translate(4.5em) rotate(0)}:host .analog--minute:nth-child(3){transform:rotate(0) translate(4.5em) rotate(0)}:host .analog--hour:nth-child(4){transform:rotate(30deg) translate(4.5em) rotate(-30deg)}:host .analog--minute:nth-child(4){transform:rotate(30deg) translate(4.5em) rotate(-30deg)}:host .analog--hour:nth-child(5){transform:rotate(60deg) translate(4.5em) rotate(-60deg)}:host .analog--minute:nth-child(5){transform:rotate(60deg) translate(4.5em) rotate(-60deg)}:host .analog--hour:nth-child(6){transform:rotate(90deg) translate(4.5em) rotate(-90deg)}:host .analog--minute:nth-child(6){transform:rotate(90deg) translate(4.5em) rotate(-90deg)}:host .analog--hour:nth-child(7){transform:rotate(120deg) translate(4.5em) rotate(-120deg)}:host .analog--minute:nth-child(7){transform:rotate(120deg) translate(4.5em) rotate(-120deg)}:host .analog--hour:nth-child(8){transform:rotate(150deg) translate(4.5em) rotate(-150deg)}:host .analog--minute:nth-child(8){transform:rotate(150deg) translate(4.5em) rotate(-150deg)}:host .analog--hour:nth-child(9){transform:rotate(180deg) translate(4.5em) rotate(-180deg)}:host .analog--minute:nth-child(9){transform:rotate(180deg) translate(4.5em) rotate(-180deg)}:host .analog--hour:nth-child(10){transform:rotate(210deg) translate(4.5em) rotate(-210deg)}:host .analog--minute:nth-child(10){transform:rotate(210deg) translate(4.5em) rotate(-210deg)}:host .analog--hour:nth-child(11){transform:rotate(240deg) translate(4.5em) rotate(-240deg)}:host .analog--minute:nth-child(11){transform:rotate(240deg) translate(4.5em) rotate(-240deg)}:host .analog--hour:nth-child(12){transform:rotate(270deg) translate(4.5em) rotate(-270deg)}:host .analog--minute:nth-child(12){transform:rotate(270deg) translate(4.5em) rotate(-270deg)}:host.military .analog--hour:nth-child(1){transform:rotate(-90deg) translate(8rem) rotate(90deg)}:host.military .analog--hand--hours.hour-0{transform:rotate(-90deg)}:host.military .analog--hour:nth-child(2){transform:rotate(-75deg) translate(8rem) rotate(75deg)}:host.military .analog--hand--hours.hour-1{transform:rotate(-75deg)}:host.military .analog--hour:nth-child(3){transform:rotate(-60deg) translate(8rem) rotate(60deg)}:host.military .analog--hand--hours.hour-2{transform:rotate(-60deg)}:host.military .analog--hour:nth-child(4){transform:rotate(-45deg) translate(8rem) rotate(45deg)}:host.military .analog--hand--hours.hour-3{transform:rotate(-45deg)}:host.military .analog--hour:nth-child(5){transform:rotate(-30deg) translate(8rem) rotate(30deg)}:host.military .analog--hand--hours.hour-4{transform:rotate(-30deg)}:host.military .analog--hour:nth-child(6){transform:rotate(-15deg) translate(8rem) rotate(15deg)}:host.military .analog--hand--hours.hour-5{transform:rotate(-15deg)}:host.military .analog--hour:nth-child(7){transform:rotate(0) translate(8rem) rotate(0)}:host.military .analog--hand--hours.hour-6{transform:rotate(0)}:host.military .analog--hour:nth-child(8){transform:rotate(15deg) translate(8rem) rotate(-15deg)}:host.military .analog--hand--hours.hour-7{transform:rotate(15deg)}:host.military .analog--hour:nth-child(9){transform:rotate(30deg) translate(8rem) rotate(-30deg)}:host.military .analog--hand--hours.hour-8{transform:rotate(30deg)}:host.military .analog--hour:nth-child(10){transform:rotate(45deg) translate(8rem) rotate(-45deg)}:host.military .analog--hand--hours.hour-9{transform:rotate(45deg)}:host.military .analog--hour:nth-child(11){transform:rotate(60deg) translate(8rem) rotate(-60deg)}:host.military .analog--hand--hours.hour-10{transform:rotate(60deg)}:host.military .analog--hour:nth-child(12){transform:rotate(75deg) translate(8rem) rotate(-75deg)}:host.military .analog--hand--hours.hour-11{transform:rotate(75deg)}:host.military .analog--hour:nth-child(13){transform:rotate(90deg) translate(8rem) rotate(-90deg)}:host.military .analog--hand--hours.hour-12{transform:rotate(90deg)}:host.military .analog--hour:nth-child(14){transform:rotate(105deg) translate(8rem) rotate(-105deg)}:host.military .analog--hand--hours.hour-13{transform:rotate(105deg)}:host.military .analog--hour:nth-child(15){transform:rotate(120deg) translate(8rem) rotate(-120deg)}:host.military .analog--hand--hours.hour-14{transform:rotate(120deg)}:host.military .analog--hour:nth-child(16){transform:rotate(135deg) translate(8rem) rotate(-135deg)}:host.military .analog--hand--hours.hour-15{transform:rotate(135deg)}:host.military .analog--hour:nth-child(17){transform:rotate(150deg) translate(8rem) rotate(-150deg)}:host.military .analog--hand--hours.hour-16{transform:rotate(150deg)}:host.military .analog--hour:nth-child(18){transform:rotate(165deg) translate(8rem) rotate(-165deg)}:host.military .analog--hand--hours.hour-17{transform:rotate(165deg)}:host.military .analog--hour:nth-child(19){transform:rotate(180deg) translate(8rem) rotate(-180deg)}:host.military .analog--hand--hours.hour-18{transform:rotate(180deg)}:host.military .analog--hour:nth-child(20){transform:rotate(195deg) translate(8rem) rotate(-195deg)}:host.military .analog--hand--hours.hour-19{transform:rotate(195deg)}:host.military .analog--hour:nth-child(21){transform:rotate(210deg) translate(8rem) rotate(-210deg)}:host.military .analog--hand--hours.hour-20{transform:rotate(210deg)}:host.military .analog--hour:nth-child(22){transform:rotate(225deg) translate(8rem) rotate(-225deg)}:host.military .analog--hand--hours.hour-21{transform:rotate(225deg)}:host.military .analog--hour:nth-child(23){transform:rotate(240deg) translate(8rem) rotate(-240deg)}:host.military .analog--hand--hours.hour-22{transform:rotate(240deg)}:host.military .analog--hour:nth-child(24){transform:rotate(255deg) translate(8rem) rotate(-255deg)}:host.military .analog--hand--hours{top:-10px;left:-10px}:host.military .analog--hand--hours.hour-23{transform:rotate(255deg)}:host.military .analog--face{top:15px;right:15px;left:15px;bottom:15px}:host.military .analog--hour{font-size:.9rem;margin-left:-2rem;margin-top:-1.2rem}:host.military .analog--hand--minutes{margin:10px}:host.military .analog--hand--hours .analog--ball{height:2.8rem;width:2.8rem;right:2.7rem;margin-top:-1.4rem}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZVBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3RpbWUtcGlja2VyL1RpbWVQaWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFHTCxNQUFNLEdBRVAsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbkMsTUFBTTtBQUNOLE9BQU8sRUFBcUIsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7OztBQUV4RCxzREFBc0Q7QUFDdEQsTUFBTSwwQkFBMEIsR0FBRztJQUNqQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMscUJBQXFCLENBQUM7SUFDcEQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBRUYsTUFBTSxDQUFOLElBQVksa0JBR1g7QUFIRCxXQUFZLGtCQUFrQjtJQUM1Qix5Q0FBbUIsQ0FBQTtJQUNuQixtQ0FBYSxDQUFBO0FBQ2YsQ0FBQyxFQUhXLGtCQUFrQixLQUFsQixrQkFBa0IsUUFHN0I7QUFtR0QsTUFBTSxPQUFPLHFCQUFxQjtJQW1DaEMsWUFDUyxPQUFtQixFQUNuQixNQUF3QixFQUNyQixHQUFzQjtRQUZ6QixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3JCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBcENsQyxhQUFRLEdB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LEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDbEIsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNkO1FBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDdkMsS0FBSyxHQUFHLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3hEO1FBQ0QsT0FBTyxHQUFHLEtBQUssSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUMvQixDQUFDOzttSEFoTVUscUJBQXFCO3VHQUFyQixxQkFBcUIsOFBBL0ZyQixDQUFDLDBCQUEwQixDQUFDLCtDQUM3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUZUOzRGQU9VLHFCQUFxQjtrQkFqR2pDLFNBQVM7K0JBQ0Usa0JBQWtCLGFBQ2pCLENBQUMsMEJBQTBCLENBQUMsWUFDN0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVGVCxRQUVLO3dCQUNKLEtBQUssRUFBRSxrQkFBa0I7d0JBQ3pCLGtCQUFrQixFQUFFLFVBQVU7cUJBQy9CO2dLQUlELFFBQVE7c0JBRFAsS0FBSztnQkFHTixNQUFNO3NCQURMLEtBQUs7Z0JBR04sTUFBTTtzQkFETCxLQUFLO2dCQUdOLElBQUk7c0JBREgsS0FBSztnQkFJTixRQUFRO3NCQURQLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgaXNWYWxpZCB9IGZyb20gJ2RhdGUtZm5zJztcbi8vIEFQUFxuaW1wb3J0IHsgRGF0ZUZvcm1hdFNlcnZpY2UsIE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcbmltcG9ydCB7IERhdGVVdGlsLCBIZWxwZXJzIH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5cbi8vIFZhbHVlIGFjY2Vzc29yIGZvciB0aGUgY29tcG9uZW50IChzdXBwb3J0cyBuZ01vZGVsKVxuY29uc3QgVElNRV9QSUNLRVJfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvVGltZVBpY2tlckVsZW1lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbmV4cG9ydCBlbnVtIFRJTUVfVkFMVUVfRk9STUFUUyB7XG4gIGlzbzg2MDEgPSAnaXNvODYwMScsXG4gIERhdGUgPSAnRGF0ZScsXG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tdGltZS1waWNrZXInLFxuICBwcm92aWRlcnM6IFtUSU1FX1BJQ0tFUl9WQUxVRV9BQ0NFU1NPUl0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPCEtLSA8ZGl2IGNsYXNzPVwiZGlnaXRhbFwiIFtjbGFzcy5pbmxpbmVdPVwiaW5saW5lXCIgW2NsYXNzLm1pbGl0YXJ5XT1cIm1pbGl0YXJ5XCIgKm5nSWY9XCJpbmxpbmVcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJkaWdpdGFsLS1pbm5lclwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImRpZ2l0YWwtLWNsb2NrXCIgKm5nSWY9XCJhbmFsb2dcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImhvdXJzXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by10aW1lLXBpY2tlci1ob3Vyc1wiPnt7IGhvdXJzIH19PC9zcGFuXG4gICAgICAgICAgPjo8c3BhbiBjbGFzcz1cIm1pbnV0ZXNcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLXRpbWUtcGlja2VyLW1pbnV0ZXNcIj57eyBtaW51dGVzIH19PC9zcGFuPlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sLWJsb2NrXCIgKm5nSWY9XCIhbWlsaXRhcnkgJiYgYW5hbG9nXCI+XG4gICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBwZXJpb2Qgb2YgTUVSSURJQU5TXCJcbiAgICAgICAgICAgIGNsYXNzPVwiZGlnaXRhbC0tcGVyaW9kXCJcbiAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwibWVyaWRpYW4gPT0gcGVyaW9kXCJcbiAgICAgICAgICAgIChjbGljayk9XCJzZXRQZXJpb2QoJGV2ZW50LCBwZXJpb2QsIHRydWUpXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJwZXJpb2RcIlxuICAgICAgICAgICAgPnt7IHBlcmlvZCB9fTwvc3BhblxuICAgICAgICAgID5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj4gLS0+XG4gICAgPGRpdiBjbGFzcz1cImluY3JlbWVudHNcIiAqbmdJZj1cIiFhbmFsb2dcIj5cbiAgICAgIDxub3ZvLWxpc3QgY2xhc3M9XCJpbmNyZW1lbnRzLS1ob3Vyc1wiIGRpcmVjdGlvbj1cInZlcnRpY2FsXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by10aW1lLXBpY2tlci1ob3Vyc1wiPlxuICAgICAgICA8bm92by1saXN0LWl0ZW1cbiAgICAgICAgICBjbGFzcz1cImluY3JlbWVudHMtLWhvdXJcIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBpbmNyZW1lbnQgb2YgSE9VUlNcIlxuICAgICAgICAgIChjbGljayk9XCJzZXRIb3VycygkZXZlbnQsIGluY3JlbWVudCwgdHJ1ZSlcIlxuICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaW5jcmVtZW50ID09IGFjdGl2ZUhvdXJcIlxuICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJpbmNyZW1lbnRcIlxuICAgICAgICA+XG4gICAgICAgICAgPGl0ZW0tY29udGVudD57eyBpbmNyZW1lbnQgfX08L2l0ZW0tY29udGVudD5cbiAgICAgICAgPC9ub3ZvLWxpc3QtaXRlbT5cbiAgICAgIDwvbm92by1saXN0PlxuICAgICAgPG5vdm8tbGlzdCBjbGFzcz1cImluY3JlbWVudHMtLW1pbnV0ZXNcIiBkaXJlY3Rpb249XCJ2ZXJ0aWNhbFwiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tdGltZS1waWNrZXItbWludXRlc1wiPlxuICAgICAgICA8bm92by1saXN0LWl0ZW1cbiAgICAgICAgICBjbGFzcz1cImluY3JlbWVudHMtLW1pbnV0ZVwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGluY3JlbWVudCBvZiBNSU5VVEVTXCJcbiAgICAgICAgICAoY2xpY2spPVwic2V0TWludXRlcygkZXZlbnQsIGluY3JlbWVudCwgdHJ1ZSlcIlxuICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaW5jcmVtZW50ID09IGFjdGl2ZU1pbnV0ZVwiXG4gICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImluY3JlbWVudFwiXG4gICAgICAgID5cbiAgICAgICAgICA8aXRlbS1jb250ZW50Pnt7IGluY3JlbWVudCB9fTwvaXRlbS1jb250ZW50PlxuICAgICAgICA8L25vdm8tbGlzdC1pdGVtPlxuICAgICAgPC9ub3ZvLWxpc3Q+XG4gICAgICA8bm92by1saXN0IGNsYXNzPVwiaW5jcmVtZW50cy0tbWVyaWRpYW5zXCIgZGlyZWN0aW9uPVwidmVydGljYWxcIiAqbmdJZj1cIiFtaWxpdGFyeVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tdGltZS1waWNrZXItbWVyaWRpYW5zXCI+XG4gICAgICAgIDxub3ZvLWxpc3QtaXRlbVxuICAgICAgICAgIGNsYXNzPVwiaW5jcmVtZW50cy0tbWVyaWRpYW5cIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBwZXJpb2Qgb2YgTUVSSURJQU5TXCJcbiAgICAgICAgICAoY2xpY2spPVwic2V0UGVyaW9kKCRldmVudCwgcGVyaW9kLCB0cnVlKVwiXG4gICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJtZXJpZGlhbiA9PSBwZXJpb2RcIlxuICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJwZXJpb2RcIlxuICAgICAgICA+XG4gICAgICAgICAgPGl0ZW0tY29udGVudD57eyBwZXJpb2QgfX08L2l0ZW0tY29udGVudD5cbiAgICAgICAgPC9ub3ZvLWxpc3QtaXRlbT5cbiAgICAgIDwvbm92by1saXN0PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJhbmFsb2dcIiAqbmdJZj1cImFuYWxvZ1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImFuYWxvZy0taW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFuYWxvZy0tZmFjZVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYW5hbG9nLS1jZW50ZXJcIj48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJhbmFsb2ctLWhhbmQtLWhvdXJzXCIgW25nQ2xhc3NdPVwiaG91cnNDbGFzc1wiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhbmFsb2ctLWJhbGxcIj48L3NwYW4+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYW5hbG9nLS1oYW5kLS1taW51dGVzXCIgW25nQ2xhc3NdPVwibWludXRlc0NsYXNzXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFuYWxvZy0tYmFsbFwiIFtuZ0NsYXNzXT1cInsgYmV0d2VlbjogaW5CZXR3ZWVuIH1cIj48L3NwYW4+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFuYWxvZy0taG91cnNcIj5cbiAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGhvdXIgb2YgSE9VUlNcIlxuICAgICAgICAgICAgY2xhc3M9XCJhbmFsb2ctLWhvdXJcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyBhY3RpdmU6IGFjdGl2ZUhvdXIgPT0gaG91ciB9XCJcbiAgICAgICAgICAgIChjbGljayk9XCJzZXRIb3VycygkZXZlbnQsIGhvdXIsIHRydWUpXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJob3VyXCJcbiAgICAgICAgICAgID57eyBob3VyIH19PC9zcGFuXG4gICAgICAgICAgPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFuYWxvZy0tbWludXRlc1wiPlxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgbWludXRlIG9mIE1JTlVURVNcIlxuICAgICAgICAgICAgY2xhc3M9XCJhbmFsb2ctLW1pbnV0ZVwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7IGFjdGl2ZTogYWN0aXZlTWludXRlID09IG1pbnV0ZSB9XCJcbiAgICAgICAgICAgIChjbGljayk9XCJzZXRNaW51dGVzKCRldmVudCwgbWludXRlLCB0cnVlKVwiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwibWludXRlXCJcbiAgICAgICAgICAgID57eyBtaW51dGUgfX08L3NwYW5cbiAgICAgICAgICA+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuL1RpbWVQaWNrZXIuc2NzcyddLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLXRpbWUtcGlja2VyJyxcbiAgICAnW2NsYXNzLm1pbGl0YXJ5XSc6ICdtaWxpdGFyeScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9UaW1lUGlja2VyRWxlbWVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpXG4gIG1pbGl0YXJ5OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIGFuYWxvZzogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBpbmxpbmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgc3RlcDogbnVtYmVyID0gMTtcblxuICBAT3V0cHV0KClcbiAgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGhvdXJzOiBudW1iZXIgPSAxMjtcbiAgbWludXRlczogbnVtYmVyID0gMDtcbiAgdmFsdWU6IGFueSA9IG51bGw7XG4gIG1lcmlkaWFuOiBzdHJpbmc7XG4gIGluQmV0d2VlbjogYm9vbGVhbjtcbiAgaG91cnNDbGFzczogc3RyaW5nO1xuICBhY3RpdmVIb3VyO1xuICBtaW51dGVzQ2xhc3M6IHN0cmluZztcbiAgYWN0aXZlTWludXRlO1xuICBpbmNyZW1lbnRzOiBzdHJpbmdbXSA9IFtdO1xuICBzZWxlY3RlZDogc3RyaW5nO1xuICBNRVJJRElBTlM6IEFycmF5PHN0cmluZz4gPSBbJ2FtJywgJ3BtJ107XG4gIE1JTlVURVM6IEFycmF5PHN0cmluZz4gPSBbJzA1JywgJzEwJywgJzE1JywgJzIwJywgJzI1JywgJzMwJywgJzM1JywgJzQwJywgJzQ1JywgJzUwJywgJzU1JywgJzAwJ107XG4gIEhPVVJTOiBBcnJheTxzdHJpbmc+ID0gWycxJywgJzInLCAnMycsICc0JywgJzUnLCAnNicsICc3JywgJzgnLCAnOScsICcxMCcsICcxMScsICcxMiddO1xuICBtb2RlbDogYW55O1xuICBfb25DaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gIF9vblRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgZmxhdHRlbihhcnIpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdCguLi5hcnIpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLm1pbGl0YXJ5KSB7XG4gICAgICB0aGlzLkhPVVJTID0gWycwJywgLi4udGhpcy5IT1VSUywgJzEzJywgJzE0JywgJzE1JywgJzE2JywgJzE3JywgJzE4JywgJzE5JywgJzIwJywgJzIxJywgJzIyJywgJzIzJ107XG4gICAgfVxuICAgIGlmICghdGhpcy5hbmFsb2cpIHtcbiAgICAgIGNvbnN0IG1pbnMgPSBBcnJheS5mcm9tKEFycmF5KDYwIC8gdGhpcy5zdGVwKS5rZXlzKCkpLm1hcCgoaSkgPT4gaSAqIHRoaXMuc3RlcCk7XG4gICAgICB0aGlzLk1JTlVURVMgPSBtaW5zLm1hcCgobSkgPT4gYCR7bX1gLnBhZFN0YXJ0KDIsICcwJykpO1xuICAgIH1cbiAgICB0aGlzLm5nT25DaGFuZ2VzKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzPzogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICB0aGlzLmluaXQodGhpcy5tb2RlbCwgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdGVkID0gbnVsbDtcbiAgICAgIHRoaXMuaW5pdChuZXcgRGF0ZSgpLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgaW5pdCh2YWx1ZSwgZGlzcGF0Y2gpIHtcbiAgICBjb25zdCBfdmFsdWUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgbGV0IGhvdXJzOiBzdHJpbmcgfCBudW1iZXIgPSBfdmFsdWUuZ2V0SG91cnMoKTtcbiAgICBsZXQgbWludXRlczogc3RyaW5nIHwgbnVtYmVyID0gX3ZhbHVlLmdldE1pbnV0ZXMoKTtcblxuICAgIGlmICghdGhpcy5taWxpdGFyeSkge1xuICAgICAgdGhpcy5tZXJpZGlhbiA9IGhvdXJzID49IDEyID8gJ3BtJyA6ICdhbSc7XG4gICAgICBob3VycyA9IGhvdXJzICUgMTI7XG4gICAgICBob3VycyA9IGhvdXJzIHx8IDEyO1xuICAgIH1cbiAgICBtaW51dGVzID0gbWludXRlcyA8IDEwID8gYDAke21pbnV0ZXN9YCA6IG1pbnV0ZXM7XG5cbiAgICB0aGlzLnNldEhvdXJzKG51bGwsIGhvdXJzLCBkaXNwYXRjaCk7XG4gICAgdGhpcy5zZXRNaW51dGVzKG51bGwsIG1pbnV0ZXMsIGRpc3BhdGNoKTtcbiAgICB0aGlzLmNoZWNrQmV0d2VlbihtaW51dGVzKTtcbiAgfVxuXG4gIGNoZWNrQmV0d2Vlbih2YWx1ZSkge1xuICAgIHRoaXMuaW5CZXR3ZWVuID0gdGhpcy5NSU5VVEVTLmluZGV4T2YoU3RyaW5nKHZhbHVlKSkgPCAwO1xuICB9XG5cbiAgc2V0VmFsdWUoZXZlbnQsIHZhbHVlKSB7XG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSB2YWx1ZTtcbiAgICBjb25zdCBbdGltZSwgbWVyaWRpYW5dID0gdmFsdWUuc3BsaXQoJyAnKTtcbiAgICBjb25zdCBbaG91cnMsIG1pbnV0ZXNdID0gdGltZS5zcGxpdCgnOicpO1xuICAgIHRoaXMuaG91cnMgPSBob3VycztcbiAgICB0aGlzLm1pbnV0ZXMgPSBtaW51dGVzO1xuICAgIHRoaXMubWVyaWRpYW4gPSBtZXJpZGlhbjtcblxuICAgIHRoaXMuZGlzcGF0Y2hDaGFuZ2UoKTtcbiAgfVxuXG4gIHNldEhvdXJzKGV2ZW50LCBob3VycywgZGlzcGF0Y2gpIHtcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgdGhpcy5ob3VycyA9IGhvdXJzO1xuICAgIHRoaXMuaG91cnNDbGFzcyA9IGBob3VyLSR7aG91cnN9YDtcbiAgICB0aGlzLmFjdGl2ZUhvdXIgPSBob3VycztcblxuICAgIGlmIChkaXNwYXRjaCkge1xuICAgICAgdGhpcy5kaXNwYXRjaENoYW5nZSgpO1xuICAgIH1cbiAgfVxuXG4gIHNldE1pbnV0ZXMoZXZlbnQsIG1pbnV0ZXMsIGRpc3BhdGNoKSB7XG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIHRoaXMubWludXRlcyA9IG1pbnV0ZXM7XG4gICAgdGhpcy5taW51dGVzQ2xhc3MgPSBgbWluLSR7bWludXRlc31gO1xuICAgIHRoaXMuYWN0aXZlTWludXRlID0gbWludXRlcztcbiAgICB0aGlzLmNoZWNrQmV0d2VlbihtaW51dGVzKTtcblxuICAgIGlmIChkaXNwYXRjaCkge1xuICAgICAgdGhpcy5kaXNwYXRjaENoYW5nZSgpO1xuICAgIH1cbiAgfVxuXG4gIHNldFBlcmlvZChldmVudCwgcGVyaW9kLCBkaXNwYXRjaCkge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICB0aGlzLm1lcmlkaWFuID0gcGVyaW9kO1xuXG4gICAgaWYgKGRpc3BhdGNoKSB7XG4gICAgICB0aGlzLmRpc3BhdGNoQ2hhbmdlKCk7XG4gICAgfVxuICB9XG5cbiAgZGlzcGF0Y2hDaGFuZ2UoKSB7XG4gICAgbGV0IGhvdXJzID0gTnVtYmVyKHRoaXMuaG91cnMpO1xuXG4gICAgaWYgKCF0aGlzLm1pbGl0YXJ5KSB7XG4gICAgICBob3VycyA9IHRoaXMubWVyaWRpYW4udG9Mb3dlckNhc2UoKSA9PT0gJ3BtJyA/IGhvdXJzICsgMTIgOiBob3VycztcblxuICAgICAgLy8gU3BlY2lhbCBjYXNlIGZvciAxMlxuICAgICAgaWYgKHRoaXMubWVyaWRpYW4udG9Mb3dlckNhc2UoKSA9PT0gJ3BtJyAmJiBob3VycyA9PT0gMjQpIHtcbiAgICAgICAgaG91cnMgPSAxMjtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5tZXJpZGlhbi50b0xvd2VyQ2FzZSgpID09PSAnYW0nICYmIGhvdXJzID09PSAxMikge1xuICAgICAgICBob3VycyA9IDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdmFsdWUgPSBuZXcgRGF0ZSgpO1xuICAgIHZhbHVlLnNldEhvdXJzKGhvdXJzKTtcbiAgICB2YWx1ZS5zZXRNaW51dGVzKHRoaXMubWludXRlcyk7XG4gICAgdmFsdWUuc2V0U2Vjb25kcygwKTtcbiAgICB0aGlzLnZhbHVlID0gYCR7dGhpcy5ob3Vyc306JHt0aGlzLm1pbnV0ZXN9ICR7dGhpcy5tZXJpZGlhbn1gO1xuICAgIHRoaXMub25TZWxlY3QubmV4dCh7XG4gICAgICBob3VycyxcbiAgICAgIG1pbnV0ZXM6IHRoaXMubWludXRlcyxcbiAgICAgIG1lcmlkaWFuOiB0aGlzLm1lcmlkaWFuLFxuICAgICAgZGF0ZTogdmFsdWUsXG4gICAgICB0ZXh0OiB0aGlzLnZhbHVlLFxuICAgIH0pO1xuICAgIHRoaXMuX29uQ2hhbmdlKHZhbHVlKTtcbiAgfVxuXG4gIC8vIFZhbHVlQWNjZXNzb3IgRnVuY3Rpb25zXG4gIHdyaXRlVmFsdWUobW9kZWw6IGFueSk6IHZvaWQge1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICBpZiAoSGVscGVycy5pc0RhdGUobW9kZWwpKSB7XG4gICAgICB0aGlzLmluaXQobW9kZWwsIGZhbHNlKTtcbiAgICAgIC8vIHRoaXMuZGlzcGF0Y2hDaGFuZ2UoKTtcbiAgICB9XG4gICAgaWYgKEhlbHBlcnMuaXNTdHJpbmcobW9kZWwpKSB7XG4gICAgICBjb25zdCB0aW1lID0gdGhpcy5taWxpdGFyeSA/IG1vZGVsIDogdGhpcy5jb252ZXJ0VGltZTEydG8yNChtb2RlbCk7XG4gICAgICBjb25zdCBkYXRlID0gRGF0ZVV0aWwucGFyc2UoYCR7RGF0ZVV0aWwuZm9ybWF0KERhdGUubm93KCksICdZWVlZLU1NLUREJyl9VCR7dGltZX1gKTtcbiAgICAgIGlmIChpc1ZhbGlkKGRhdGUpKSB7XG4gICAgICAgIHRoaXMuaW5pdChkYXRlLCBmYWxzZSk7XG4gICAgICAgIC8vIHRoaXMuZGlzcGF0Y2hDaGFuZ2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMuX29uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIGNvbnZlcnRUaW1lMTJ0bzI0KHRpbWUxMmg6IHN0cmluZykge1xuICAgIGNvbnN0IHBtRm9ybWF0ID0gdGhpcy5sYWJlbHMudGltZUZvcm1hdFBNLnRvVXBwZXJDYXNlKCk7XG5cbiAgICBjb25zdCBbdGltZSwgbW9kaWZpZXJdID0gdGltZTEyaC5zcGxpdCgnICcpO1xuICAgIGxldCBbaG91cnMsIG1pbnV0ZXNdID0gdGltZS5zcGxpdCgnOicpO1xuICAgIGlmIChob3VycyA9PT0gJzEyJykge1xuICAgICAgaG91cnMgPSAnMDAnO1xuICAgIH1cbiAgICBpZiAoWydQTScsIHBtRm9ybWF0XS5pbmNsdWRlcyhtb2RpZmllcikpIHtcbiAgICAgIGhvdXJzID0gYCR7cGFyc2VJbnQoaG91cnMsIDEwKSArIDEyfWAucGFkU3RhcnQoMiwgJzAnKTtcbiAgICB9XG4gICAgcmV0dXJuIGAke2hvdXJzfToke21pbnV0ZXN9YDtcbiAgfVxufVxuIl19