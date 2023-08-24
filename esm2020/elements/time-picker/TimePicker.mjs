// NG2
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isValid } from 'date-fns';
// APP
import { DateFormatService, NovoLabelService } from 'novo-elements/services';
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
NovoTimePickerElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTimePickerElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i1.DateFormatService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZVBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3RpbWUtcGlja2VyL1RpbWVQaWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFHTCxNQUFNLEdBRVAsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbkMsTUFBTTtBQUNOLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdFLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7O0FBRXhELHNEQUFzRDtBQUN0RCxNQUFNLDBCQUEwQixHQUFHO0lBQ2pDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztJQUNwRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFFRixNQUFNLENBQU4sSUFBWSxrQkFHWDtBQUhELFdBQVksa0JBQWtCO0lBQzVCLHlDQUFtQixDQUFBO0lBQ25CLG1DQUFhLENBQUE7QUFDZixDQUFDLEVBSFcsa0JBQWtCLEtBQWxCLGtCQUFrQixRQUc3QjtBQW1HRCxNQUFNLE9BQU8scUJBQXFCO0lBbUNoQyxZQUNTLE9BQW1CLEVBQ25CLE1BQXdCLEVBQ3hCLGlCQUFvQyxFQUNqQyxHQUFzQjtRQUh6QixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLHNCQUFpQixHQUFq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b3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBpc1ZhbGlkIH0gZnJvbSAnZGF0ZS1mbnMnO1xuLy8gQVBQXG5pbXBvcnQgeyBEYXRlRm9ybWF0U2VydmljZSwgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgRGF0ZVV0aWwsIEhlbHBlcnMgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG5jb25zdCBUSU1FX1BJQ0tFUl9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9UaW1lUGlja2VyRWxlbWVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuZXhwb3J0IGVudW0gVElNRV9WQUxVRV9GT1JNQVRTIHtcbiAgaXNvODYwMSA9ICdpc284NjAxJyxcbiAgRGF0ZSA9ICdEYXRlJyxcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by10aW1lLXBpY2tlcicsXG4gIHByb3ZpZGVyczogW1RJTUVfUElDS0VSX1ZBTFVFX0FDQ0VTU09SXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8IS0tIDxkaXYgY2xhc3M9XCJkaWdpdGFsXCIgW2NsYXNzLmlubGluZV09XCJpbmxpbmVcIiBbY2xhc3MubWlsaXRhcnldPVwibWlsaXRhcnlcIiAqbmdJZj1cImlubGluZVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImRpZ2l0YWwtLWlubmVyXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZGlnaXRhbC0tY2xvY2tcIiAqbmdJZj1cImFuYWxvZ1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaG91cnNcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLXRpbWUtcGlja2VyLWhvdXJzXCI+e3sgaG91cnMgfX08L3NwYW5cbiAgICAgICAgICA+OjxzcGFuIGNsYXNzPVwibWludXRlc1wiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tdGltZS1waWNrZXItbWludXRlc1wiPnt7IG1pbnV0ZXMgfX08L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2wtYmxvY2tcIiAqbmdJZj1cIiFtaWxpdGFyeSAmJiBhbmFsb2dcIj5cbiAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IHBlcmlvZCBvZiBNRVJJRElBTlNcIlxuICAgICAgICAgICAgY2xhc3M9XCJkaWdpdGFsLS1wZXJpb2RcIlxuICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJtZXJpZGlhbiA9PSBwZXJpb2RcIlxuICAgICAgICAgICAgKGNsaWNrKT1cInNldFBlcmlvZCgkZXZlbnQsIHBlcmlvZCwgdHJ1ZSlcIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cInBlcmlvZFwiXG4gICAgICAgICAgICA+e3sgcGVyaW9kIH19PC9zcGFuXG4gICAgICAgICAgPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PiAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiaW5jcmVtZW50c1wiICpuZ0lmPVwiIWFuYWxvZ1wiPlxuICAgICAgPG5vdm8tbGlzdCBjbGFzcz1cImluY3JlbWVudHMtLWhvdXJzXCIgZGlyZWN0aW9uPVwidmVydGljYWxcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLXRpbWUtcGlja2VyLWhvdXJzXCI+XG4gICAgICAgIDxub3ZvLWxpc3QtaXRlbVxuICAgICAgICAgIGNsYXNzPVwiaW5jcmVtZW50cy0taG91clwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGluY3JlbWVudCBvZiBIT1VSU1wiXG4gICAgICAgICAgKGNsaWNrKT1cInNldEhvdXJzKCRldmVudCwgaW5jcmVtZW50LCB0cnVlKVwiXG4gICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJpbmNyZW1lbnQgPT0gYWN0aXZlSG91clwiXG4gICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImluY3JlbWVudFwiXG4gICAgICAgID5cbiAgICAgICAgICA8aXRlbS1jb250ZW50Pnt7IGluY3JlbWVudCB9fTwvaXRlbS1jb250ZW50PlxuICAgICAgICA8L25vdm8tbGlzdC1pdGVtPlxuICAgICAgPC9ub3ZvLWxpc3Q+XG4gICAgICA8bm92by1saXN0IGNsYXNzPVwiaW5jcmVtZW50cy0tbWludXRlc1wiIGRpcmVjdGlvbj1cInZlcnRpY2FsXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by10aW1lLXBpY2tlci1taW51dGVzXCI+XG4gICAgICAgIDxub3ZvLWxpc3QtaXRlbVxuICAgICAgICAgIGNsYXNzPVwiaW5jcmVtZW50cy0tbWludXRlXCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgaW5jcmVtZW50IG9mIE1JTlVURVNcIlxuICAgICAgICAgIChjbGljayk9XCJzZXRNaW51dGVzKCRldmVudCwgaW5jcmVtZW50LCB0cnVlKVwiXG4gICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJpbmNyZW1lbnQgPT0gYWN0aXZlTWludXRlXCJcbiAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiaW5jcmVtZW50XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxpdGVtLWNvbnRlbnQ+e3sgaW5jcmVtZW50IH19PC9pdGVtLWNvbnRlbnQ+XG4gICAgICAgIDwvbm92by1saXN0LWl0ZW0+XG4gICAgICA8L25vdm8tbGlzdD5cbiAgICAgIDxub3ZvLWxpc3QgY2xhc3M9XCJpbmNyZW1lbnRzLS1tZXJpZGlhbnNcIiBkaXJlY3Rpb249XCJ2ZXJ0aWNhbFwiICpuZ0lmPVwiIW1pbGl0YXJ5XCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by10aW1lLXBpY2tlci1tZXJpZGlhbnNcIj5cbiAgICAgICAgPG5vdm8tbGlzdC1pdGVtXG4gICAgICAgICAgY2xhc3M9XCJpbmNyZW1lbnRzLS1tZXJpZGlhblwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IHBlcmlvZCBvZiBNRVJJRElBTlNcIlxuICAgICAgICAgIChjbGljayk9XCJzZXRQZXJpb2QoJGV2ZW50LCBwZXJpb2QsIHRydWUpXCJcbiAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIm1lcmlkaWFuID09IHBlcmlvZFwiXG4gICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cInBlcmlvZFwiXG4gICAgICAgID5cbiAgICAgICAgICA8aXRlbS1jb250ZW50Pnt7IHBlcmlvZCB9fTwvaXRlbS1jb250ZW50PlxuICAgICAgICA8L25vdm8tbGlzdC1pdGVtPlxuICAgICAgPC9ub3ZvLWxpc3Q+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImFuYWxvZ1wiICpuZ0lmPVwiYW5hbG9nXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYW5hbG9nLS1pbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYW5hbG9nLS1mYWNlXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJhbmFsb2ctLWNlbnRlclwiPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImFuYWxvZy0taGFuZC0taG91cnNcIiBbbmdDbGFzc109XCJob3Vyc0NsYXNzXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFuYWxvZy0tYmFsbFwiPjwvc3Bhbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJhbmFsb2ctLWhhbmQtLW1pbnV0ZXNcIiBbbmdDbGFzc109XCJtaW51dGVzQ2xhc3NcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYW5hbG9nLS1iYWxsXCIgW25nQ2xhc3NdPVwieyBiZXR3ZWVuOiBpbkJldHdlZW4gfVwiPjwvc3Bhbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYW5hbG9nLS1ob3Vyc1wiPlxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgaG91ciBvZiBIT1VSU1wiXG4gICAgICAgICAgICBjbGFzcz1cImFuYWxvZy0taG91clwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7IGFjdGl2ZTogYWN0aXZlSG91ciA9PSBob3VyIH1cIlxuICAgICAgICAgICAgKGNsaWNrKT1cInNldEhvdXJzKCRldmVudCwgaG91ciwgdHJ1ZSlcIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImhvdXJcIlxuICAgICAgICAgICAgPnt7IGhvdXIgfX08L3NwYW5cbiAgICAgICAgICA+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYW5hbG9nLS1taW51dGVzXCI+XG4gICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBtaW51dGUgb2YgTUlOVVRFU1wiXG4gICAgICAgICAgICBjbGFzcz1cImFuYWxvZy0tbWludXRlXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgYWN0aXZlOiBhY3RpdmVNaW51dGUgPT0gbWludXRlIH1cIlxuICAgICAgICAgICAgKGNsaWNrKT1cInNldE1pbnV0ZXMoJGV2ZW50LCBtaW51dGUsIHRydWUpXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJtaW51dGVcIlxuICAgICAgICAgICAgPnt7IG1pbnV0ZSB9fTwvc3BhblxuICAgICAgICAgID5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vVGltZVBpY2tlci5zY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tdGltZS1waWNrZXInLFxuICAgICdbY2xhc3MubWlsaXRhcnldJzogJ21pbGl0YXJ5JyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1RpbWVQaWNrZXJFbGVtZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KClcbiAgbWlsaXRhcnk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgYW5hbG9nOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIGlubGluZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBzdGVwOiBudW1iZXIgPSAxO1xuXG4gIEBPdXRwdXQoKVxuICBvblNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgaG91cnM6IG51bWJlciA9IDEyO1xuICBtaW51dGVzOiBudW1iZXIgPSAwO1xuICB2YWx1ZTogYW55ID0gbnVsbDtcbiAgbWVyaWRpYW46IHN0cmluZztcbiAgaW5CZXR3ZWVuOiBib29sZWFuO1xuICBob3Vyc0NsYXNzOiBzdHJpbmc7XG4gIGFjdGl2ZUhvdXI7XG4gIG1pbnV0ZXNDbGFzczogc3RyaW5nO1xuICBhY3RpdmVNaW51dGU7XG4gIGluY3JlbWVudHM6IHN0cmluZ1tdID0gW107XG4gIHNlbGVjdGVkOiBzdHJpbmc7XG4gIE1FUklESUFOUzogQXJyYXk8c3RyaW5nPiA9IFsnYW0nLCAncG0nXTtcbiAgTUlOVVRFUzogQXJyYXk8c3RyaW5nPiA9IFsnMDUnLCAnMTAnLCAnMTUnLCAnMjAnLCAnMjUnLCAnMzAnLCAnMzUnLCAnNDAnLCAnNDUnLCAnNTAnLCAnNTUnLCAnMDAnXTtcbiAgSE9VUlM6IEFycmF5PHN0cmluZz4gPSBbJzEnLCAnMicsICczJywgJzQnLCAnNScsICc2JywgJzcnLCAnOCcsICc5JywgJzEwJywgJzExJywgJzEyJ107XG4gIG1vZGVsOiBhbnk7XG4gIF9vbkNoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgX29uVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICBmbGF0dGVuKGFycikge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0KC4uLmFycik7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLFxuICAgIHB1YmxpYyBkYXRlRm9ybWF0U2VydmljZTogRGF0ZUZvcm1hdFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5taWxpdGFyeSkge1xuICAgICAgdGhpcy5IT1VSUyA9IFsnMCcsIC4uLnRoaXMuSE9VUlMsICcxMycsICcxNCcsICcxNScsICcxNicsICcxNycsICcxOCcsICcxOScsICcyMCcsICcyMScsICcyMicsICcyMyddO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuYW5hbG9nKSB7XG4gICAgICBjb25zdCBtaW5zID0gQXJyYXkuZnJvbShBcnJheSg2MCAvIHRoaXMuc3RlcCkua2V5cygpKS5tYXAoKGkpID0+IGkgKiB0aGlzLnN0ZXApO1xuICAgICAgdGhpcy5NSU5VVEVTID0gbWlucy5tYXAoKG0pID0+IGAke219YC5wYWRTdGFydCgyLCAnMCcpKTtcbiAgICB9XG4gICAgdGhpcy5uZ09uQ2hhbmdlcygpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlcz86IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAodGhpcy5tb2RlbCkge1xuICAgICAgdGhpcy5pbml0KHRoaXMubW9kZWwsIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZCA9IG51bGw7XG4gICAgICB0aGlzLmluaXQobmV3IERhdGUoKSwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIGluaXQodmFsdWUsIGRpc3BhdGNoKSB7XG4gICAgY29uc3QgX3ZhbHVlID0gbmV3IERhdGUodmFsdWUpO1xuICAgIGxldCBob3Vyczogc3RyaW5nIHwgbnVtYmVyID0gX3ZhbHVlLmdldEhvdXJzKCk7XG4gICAgbGV0IG1pbnV0ZXM6IHN0cmluZyB8IG51bWJlciA9IF92YWx1ZS5nZXRNaW51dGVzKCk7XG5cbiAgICBpZiAoIXRoaXMubWlsaXRhcnkpIHtcbiAgICAgIHRoaXMubWVyaWRpYW4gPSBob3VycyA+PSAxMiA/ICdwbScgOiAnYW0nO1xuICAgICAgaG91cnMgPSBob3VycyAlIDEyO1xuICAgICAgaG91cnMgPSBob3VycyB8fCAxMjtcbiAgICB9XG4gICAgbWludXRlcyA9IG1pbnV0ZXMgPCAxMCA/IGAwJHttaW51dGVzfWAgOiBtaW51dGVzO1xuXG4gICAgdGhpcy5zZXRIb3VycyhudWxsLCBob3VycywgZGlzcGF0Y2gpO1xuICAgIHRoaXMuc2V0TWludXRlcyhudWxsLCBtaW51dGVzLCBkaXNwYXRjaCk7XG4gICAgdGhpcy5jaGVja0JldHdlZW4obWludXRlcyk7XG4gIH1cblxuICBjaGVja0JldHdlZW4odmFsdWUpIHtcbiAgICB0aGlzLmluQmV0d2VlbiA9IHRoaXMuTUlOVVRFUy5pbmRleE9mKFN0cmluZyh2YWx1ZSkpIDwgMDtcbiAgfVxuXG4gIHNldFZhbHVlKGV2ZW50LCB2YWx1ZSkge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICB0aGlzLnNlbGVjdGVkID0gdmFsdWU7XG4gICAgY29uc3QgW3RpbWUsIG1lcmlkaWFuXSA9IHZhbHVlLnNwbGl0KCcgJyk7XG4gICAgY29uc3QgW2hvdXJzLCBtaW51dGVzXSA9IHRpbWUuc3BsaXQoJzonKTtcbiAgICB0aGlzLmhvdXJzID0gaG91cnM7XG4gICAgdGhpcy5taW51dGVzID0gbWludXRlcztcbiAgICB0aGlzLm1lcmlkaWFuID0gbWVyaWRpYW47XG5cbiAgICB0aGlzLmRpc3BhdGNoQ2hhbmdlKCk7XG4gIH1cblxuICBzZXRIb3VycyhldmVudCwgaG91cnMsIGRpc3BhdGNoKSB7XG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIHRoaXMuaG91cnMgPSBob3VycztcbiAgICB0aGlzLmhvdXJzQ2xhc3MgPSBgaG91ci0ke2hvdXJzfWA7XG4gICAgdGhpcy5hY3RpdmVIb3VyID0gaG91cnM7XG5cbiAgICBpZiAoZGlzcGF0Y2gpIHtcbiAgICAgIHRoaXMuZGlzcGF0Y2hDaGFuZ2UoKTtcbiAgICB9XG4gIH1cblxuICBzZXRNaW51dGVzKGV2ZW50LCBtaW51dGVzLCBkaXNwYXRjaCkge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICB0aGlzLm1pbnV0ZXMgPSBtaW51dGVzO1xuICAgIHRoaXMubWludXRlc0NsYXNzID0gYG1pbi0ke21pbnV0ZXN9YDtcbiAgICB0aGlzLmFjdGl2ZU1pbnV0ZSA9IG1pbnV0ZXM7XG4gICAgdGhpcy5jaGVja0JldHdlZW4obWludXRlcyk7XG5cbiAgICBpZiAoZGlzcGF0Y2gpIHtcbiAgICAgIHRoaXMuZGlzcGF0Y2hDaGFuZ2UoKTtcbiAgICB9XG4gIH1cblxuICBzZXRQZXJpb2QoZXZlbnQsIHBlcmlvZCwgZGlzcGF0Y2gpIHtcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgdGhpcy5tZXJpZGlhbiA9IHBlcmlvZDtcblxuICAgIGlmIChkaXNwYXRjaCkge1xuICAgICAgdGhpcy5kaXNwYXRjaENoYW5nZSgpO1xuICAgIH1cbiAgfVxuXG4gIGRpc3BhdGNoQ2hhbmdlKCkge1xuICAgIGxldCBob3VycyA9IE51bWJlcih0aGlzLmhvdXJzKTtcblxuICAgIGlmICghdGhpcy5taWxpdGFyeSkge1xuICAgICAgaG91cnMgPSB0aGlzLm1lcmlkaWFuLnRvTG93ZXJDYXNlKCkgPT09ICdwbScgPyBob3VycyArIDEyIDogaG91cnM7XG5cbiAgICAgIC8vIFNwZWNpYWwgY2FzZSBmb3IgMTJcbiAgICAgIGlmICh0aGlzLm1lcmlkaWFuLnRvTG93ZXJDYXNlKCkgPT09ICdwbScgJiYgaG91cnMgPT09IDI0KSB7XG4gICAgICAgIGhvdXJzID0gMTI7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMubWVyaWRpYW4udG9Mb3dlckNhc2UoKSA9PT0gJ2FtJyAmJiBob3VycyA9PT0gMTIpIHtcbiAgICAgICAgaG91cnMgPSAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHZhbHVlID0gbmV3IERhdGUoKTtcbiAgICB2YWx1ZS5zZXRIb3Vycyhob3Vycyk7XG4gICAgdmFsdWUuc2V0TWludXRlcyh0aGlzLm1pbnV0ZXMpO1xuICAgIHZhbHVlLnNldFNlY29uZHMoMCk7XG4gICAgdGhpcy52YWx1ZSA9IGAke3RoaXMuaG91cnN9OiR7dGhpcy5taW51dGVzfSAke3RoaXMubWVyaWRpYW59YDtcbiAgICB0aGlzLm9uU2VsZWN0Lm5leHQoe1xuICAgICAgaG91cnMsXG4gICAgICBtaW51dGVzOiB0aGlzLm1pbnV0ZXMsXG4gICAgICBtZXJpZGlhbjogdGhpcy5tZXJpZGlhbixcbiAgICAgIGRhdGU6IHZhbHVlLFxuICAgICAgdGV4dDogdGhpcy52YWx1ZSxcbiAgICB9KTtcbiAgICB0aGlzLl9vbkNoYW5nZSh2YWx1ZSk7XG4gIH1cblxuICAvLyBWYWx1ZUFjY2Vzc29yIEZ1bmN0aW9uc1xuICB3cml0ZVZhbHVlKG1vZGVsOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgaWYgKEhlbHBlcnMuaXNEYXRlKG1vZGVsKSkge1xuICAgICAgdGhpcy5pbml0KG1vZGVsLCBmYWxzZSk7XG4gICAgICAvLyB0aGlzLmRpc3BhdGNoQ2hhbmdlKCk7XG4gICAgfVxuICAgIGlmIChIZWxwZXJzLmlzU3RyaW5nKG1vZGVsKSkge1xuICAgICAgY29uc3QgdGltZSA9IHRoaXMubWlsaXRhcnkgPyBtb2RlbCA6IHRoaXMuY29udmVydFRpbWUxMnRvMjQobW9kZWwpO1xuICAgICAgY29uc3QgZGF0ZSA9IERhdGVVdGlsLnBhcnNlKGAke0RhdGVVdGlsLmZvcm1hdChEYXRlLm5vdygpLCAnWVlZWS1NTS1ERCcpfVQke3RpbWV9YCk7XG4gICAgICBpZiAoaXNWYWxpZChkYXRlKSkge1xuICAgICAgICB0aGlzLmluaXQoZGF0ZSwgZmFsc2UpO1xuICAgICAgICAvLyB0aGlzLmRpc3BhdGNoQ2hhbmdlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBjb252ZXJ0VGltZTEydG8yNCh0aW1lMTJoOiBzdHJpbmcpIHtcbiAgICBjb25zdCBwbUZvcm1hdCA9IHRoaXMubGFiZWxzLnRpbWVGb3JtYXRQTS50b1VwcGVyQ2FzZSgpO1xuXG4gICAgY29uc3QgW3RpbWUsIG1vZGlmaWVyXSA9IHRpbWUxMmguc3BsaXQoJyAnKTtcbiAgICBsZXQgW2hvdXJzLCBtaW51dGVzXSA9IHRpbWUuc3BsaXQoJzonKTtcbiAgICBpZiAoaG91cnMgPT09ICcxMicpIHtcbiAgICAgIGhvdXJzID0gJzAwJztcbiAgICB9XG4gICAgaWYgKFsnUE0nLCBwbUZvcm1hdF0uaW5jbHVkZXMobW9kaWZpZXIpKSB7XG4gICAgICBob3VycyA9IGAke3BhcnNlSW50KGhvdXJzLCAxMCkgKyAxMn1gLnBhZFN0YXJ0KDIsICcwJyk7XG4gICAgfVxuICAgIHJldHVybiBgJHtob3Vyc306JHttaW51dGVzfWA7XG4gIH1cbn1cbiJdfQ==