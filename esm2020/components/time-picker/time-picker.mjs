// NG2
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { format, isValid, parse } from 'date-fns';
import { DateFormatService, NovoLabelService } from 'novo-elements/services';
import { Helpers } from 'novo-elements/utils';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL3RpbWUtcGlja2VyL3RpbWUtcGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBR0wsTUFBTSxHQUVQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDN0UsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7OztBQUU5QyxzREFBc0Q7QUFDdEQsTUFBTSwwQkFBMEIsR0FBRztJQUNqQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMscUJBQXFCLENBQUM7SUFDcEQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBRUYsTUFBTSxDQUFOLElBQVksa0JBR1g7QUFIRCxXQUFZLGtCQUFrQjtJQUM1Qix5Q0FBbUIsQ0FBQTtJQUNuQixtQ0FBYSxDQUFBO0FBQ2YsQ0FBQyxFQUhXLGtCQUFrQixLQUFsQixrQkFBa0IsUUFHN0I7QUFtR0QsTUFBTSxPQUFPLHFCQUFxQjtJQW1DaEMsWUFDUyxPQUFtQixFQUNuQixNQUF3QixFQUN4QixpQkFBb0MsRUFDakMsR0FBc0I7UUFIekIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUN4QixzQkFBaUIsR0FBakIsaUJB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ZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IGZvcm1hdCwgaXNWYWxpZCwgcGFyc2UgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgeyBEYXRlRm9ybWF0U2VydmljZSwgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcbmNvbnN0IFRJTUVfUElDS0VSX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b1RpbWVQaWNrZXJFbGVtZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5leHBvcnQgZW51bSBUSU1FX1ZBTFVFX0ZPUk1BVFMge1xuICBpc284NjAxID0gJ2lzbzg2MDEnLFxuICBEYXRlID0gJ0RhdGUnLFxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXRpbWUtcGlja2VyJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGltZS1waWNrZXIuc2NzcyddLFxuICBwcm92aWRlcnM6IFtUSU1FX1BJQ0tFUl9WQUxVRV9BQ0NFU1NPUl0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPCEtLSA8ZGl2IGNsYXNzPVwiZGlnaXRhbFwiIFtjbGFzcy5pbmxpbmVdPVwiaW5saW5lXCIgW2NsYXNzLm1pbGl0YXJ5XT1cIm1pbGl0YXJ5XCIgKm5nSWY9XCJpbmxpbmVcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJkaWdpdGFsLS1pbm5lclwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImRpZ2l0YWwtLWNsb2NrXCIgKm5nSWY9XCJhbmFsb2dcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImhvdXJzXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by10aW1lLXBpY2tlci1ob3Vyc1wiPnt7IGhvdXJzIH19PC9zcGFuXG4gICAgICAgICAgPjo8c3BhbiBjbGFzcz1cIm1pbnV0ZXNcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLXRpbWUtcGlja2VyLW1pbnV0ZXNcIj57eyBtaW51dGVzIH19PC9zcGFuPlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sLWJsb2NrXCIgKm5nSWY9XCIhbWlsaXRhcnkgJiYgYW5hbG9nXCI+XG4gICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBwZXJpb2Qgb2YgTUVSSURJQU5TXCJcbiAgICAgICAgICAgIGNsYXNzPVwiZGlnaXRhbC0tcGVyaW9kXCJcbiAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwibWVyaWRpYW4gPT0gcGVyaW9kXCJcbiAgICAgICAgICAgIChjbGljayk9XCJzZXRQZXJpb2QoJGV2ZW50LCBwZXJpb2QsIHRydWUpXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJwZXJpb2RcIlxuICAgICAgICAgICAgPnt7IHBlcmlvZCB9fTwvc3BhblxuICAgICAgICAgID5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj4gLS0+XG4gICAgPGRpdiBjbGFzcz1cImluY3JlbWVudHNcIiAqbmdJZj1cIiFhbmFsb2dcIj5cbiAgICAgIDxub3ZvLWxpc3QgY2xhc3M9XCJpbmNyZW1lbnRzLS1ob3Vyc1wiIGRpcmVjdGlvbj1cInZlcnRpY2FsXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by10aW1lLXBpY2tlci1ob3Vyc1wiPlxuICAgICAgICA8bm92by1saXN0LWl0ZW1cbiAgICAgICAgICBjbGFzcz1cImluY3JlbWVudHMtLWhvdXJcIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBpbmNyZW1lbnQgb2YgSE9VUlNcIlxuICAgICAgICAgIChjbGljayk9XCJzZXRIb3VycygkZXZlbnQsIGluY3JlbWVudCwgdHJ1ZSlcIlxuICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaW5jcmVtZW50ID09IGFjdGl2ZUhvdXJcIlxuICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJpbmNyZW1lbnRcIlxuICAgICAgICA+XG4gICAgICAgICAgPGl0ZW0tY29udGVudD57eyBpbmNyZW1lbnQgfX08L2l0ZW0tY29udGVudD5cbiAgICAgICAgPC9ub3ZvLWxpc3QtaXRlbT5cbiAgICAgIDwvbm92by1saXN0PlxuICAgICAgPG5vdm8tbGlzdCBjbGFzcz1cImluY3JlbWVudHMtLW1pbnV0ZXNcIiBkaXJlY3Rpb249XCJ2ZXJ0aWNhbFwiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tdGltZS1waWNrZXItbWludXRlc1wiPlxuICAgICAgICA8bm92by1saXN0LWl0ZW1cbiAgICAgICAgICBjbGFzcz1cImluY3JlbWVudHMtLW1pbnV0ZVwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGluY3JlbWVudCBvZiBNSU5VVEVTXCJcbiAgICAgICAgICAoY2xpY2spPVwic2V0TWludXRlcygkZXZlbnQsIGluY3JlbWVudCwgdHJ1ZSlcIlxuICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaW5jcmVtZW50ID09IGFjdGl2ZU1pbnV0ZVwiXG4gICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImluY3JlbWVudFwiXG4gICAgICAgID5cbiAgICAgICAgICA8aXRlbS1jb250ZW50Pnt7IGluY3JlbWVudCB9fTwvaXRlbS1jb250ZW50PlxuICAgICAgICA8L25vdm8tbGlzdC1pdGVtPlxuICAgICAgPC9ub3ZvLWxpc3Q+XG4gICAgICA8bm92by1saXN0IGNsYXNzPVwiaW5jcmVtZW50cy0tbWVyaWRpYW5zXCIgZGlyZWN0aW9uPVwidmVydGljYWxcIiAqbmdJZj1cIiFtaWxpdGFyeVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tdGltZS1waWNrZXItbWVyaWRpYW5zXCI+XG4gICAgICAgIDxub3ZvLWxpc3QtaXRlbVxuICAgICAgICAgIGNsYXNzPVwiaW5jcmVtZW50cy0tbWVyaWRpYW5cIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBwZXJpb2Qgb2YgTUVSSURJQU5TXCJcbiAgICAgICAgICAoY2xpY2spPVwic2V0UGVyaW9kKCRldmVudCwgcGVyaW9kLCB0cnVlKVwiXG4gICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJtZXJpZGlhbiA9PSBwZXJpb2RcIlxuICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJwZXJpb2RcIlxuICAgICAgICA+XG4gICAgICAgICAgPGl0ZW0tY29udGVudD57eyBwZXJpb2QgfX08L2l0ZW0tY29udGVudD5cbiAgICAgICAgPC9ub3ZvLWxpc3QtaXRlbT5cbiAgICAgIDwvbm92by1saXN0PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJhbmFsb2dcIiAqbmdJZj1cImFuYWxvZ1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImFuYWxvZy0taW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFuYWxvZy0tZmFjZVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYW5hbG9nLS1jZW50ZXJcIj48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJhbmFsb2ctLWhhbmQtLWhvdXJzXCIgW25nQ2xhc3NdPVwiaG91cnNDbGFzc1wiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhbmFsb2ctLWJhbGxcIj48L3NwYW4+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYW5hbG9nLS1oYW5kLS1taW51dGVzXCIgW25nQ2xhc3NdPVwibWludXRlc0NsYXNzXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFuYWxvZy0tYmFsbFwiIFtuZ0NsYXNzXT1cInsgYmV0d2VlbjogaW5CZXR3ZWVuIH1cIj48L3NwYW4+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFuYWxvZy0taG91cnNcIj5cbiAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGhvdXIgb2YgSE9VUlNcIlxuICAgICAgICAgICAgY2xhc3M9XCJhbmFsb2ctLWhvdXJcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyBhY3RpdmU6IGFjdGl2ZUhvdXIgPT0gaG91ciB9XCJcbiAgICAgICAgICAgIChjbGljayk9XCJzZXRIb3VycygkZXZlbnQsIGhvdXIsIHRydWUpXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJob3VyXCJcbiAgICAgICAgICAgID57eyBob3VyIH19PC9zcGFuXG4gICAgICAgICAgPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFuYWxvZy0tbWludXRlc1wiPlxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgbWludXRlIG9mIE1JTlVURVNcIlxuICAgICAgICAgICAgY2xhc3M9XCJhbmFsb2ctLW1pbnV0ZVwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7IGFjdGl2ZTogYWN0aXZlTWludXRlID09IG1pbnV0ZSB9XCJcbiAgICAgICAgICAgIChjbGljayk9XCJzZXRNaW51dGVzKCRldmVudCwgbWludXRlLCB0cnVlKVwiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwibWludXRlXCJcbiAgICAgICAgICAgID57eyBtaW51dGUgfX08L3NwYW5cbiAgICAgICAgICA+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tdGltZS1waWNrZXInLFxuICAgICdbY2xhc3MubWlsaXRhcnldJzogJ21pbGl0YXJ5JyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1RpbWVQaWNrZXJFbGVtZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KClcbiAgbWlsaXRhcnk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgYW5hbG9nOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIGlubGluZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBzdGVwOiBudW1iZXIgPSAxO1xuXG4gIEBPdXRwdXQoKVxuICBvblNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgaG91cnM6IG51bWJlciA9IDEyO1xuICBtaW51dGVzOiBudW1iZXIgPSAwO1xuICB2YWx1ZTogYW55ID0gbnVsbDtcbiAgbWVyaWRpYW46IHN0cmluZztcbiAgaW5CZXR3ZWVuOiBib29sZWFuO1xuICBob3Vyc0NsYXNzOiBzdHJpbmc7XG4gIGFjdGl2ZUhvdXI7XG4gIG1pbnV0ZXNDbGFzczogc3RyaW5nO1xuICBhY3RpdmVNaW51dGU7XG4gIGluY3JlbWVudHM6IHN0cmluZ1tdID0gW107XG4gIHNlbGVjdGVkOiBzdHJpbmc7XG4gIE1FUklESUFOUzogQXJyYXk8c3RyaW5nPiA9IFsnYW0nLCAncG0nXTtcbiAgTUlOVVRFUzogQXJyYXk8c3RyaW5nPiA9IFsnMDUnLCAnMTAnLCAnMTUnLCAnMjAnLCAnMjUnLCAnMzAnLCAnMzUnLCAnNDAnLCAnNDUnLCAnNTAnLCAnNTUnLCAnMDAnXTtcbiAgSE9VUlM6IEFycmF5PHN0cmluZz4gPSBbJzEnLCAnMicsICczJywgJzQnLCAnNScsICc2JywgJzcnLCAnOCcsICc5JywgJzEwJywgJzExJywgJzEyJ107XG4gIG1vZGVsOiBhbnk7XG4gIF9vbkNoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgX29uVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICBmbGF0dGVuKGFycikge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0KC4uLmFycik7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLFxuICAgIHB1YmxpYyBkYXRlRm9ybWF0U2VydmljZTogRGF0ZUZvcm1hdFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5taWxpdGFyeSkge1xuICAgICAgdGhpcy5IT1VSUyA9IFsnMCcsIC4uLnRoaXMuSE9VUlMsICcxMycsICcxNCcsICcxNScsICcxNicsICcxNycsICcxOCcsICcxOScsICcyMCcsICcyMScsICcyMicsICcyMyddO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuYW5hbG9nKSB7XG4gICAgICBjb25zdCBtaW5zID0gQXJyYXkuZnJvbShBcnJheSg2MCAvIHRoaXMuc3RlcCkua2V5cygpKS5tYXAoKGkpID0+IGkgKiB0aGlzLnN0ZXApO1xuICAgICAgdGhpcy5NSU5VVEVTID0gbWlucy5tYXAoKG0pID0+IGAke219YC5wYWRTdGFydCgyLCAnMCcpKTtcbiAgICB9XG4gICAgdGhpcy5uZ09uQ2hhbmdlcygpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlcz86IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAodGhpcy5tb2RlbCkge1xuICAgICAgdGhpcy5pbml0KHRoaXMubW9kZWwsIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZCA9IG51bGw7XG4gICAgICB0aGlzLmluaXQobmV3IERhdGUoKSwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIGluaXQodmFsdWUsIGRpc3BhdGNoKSB7XG4gICAgY29uc3QgX3ZhbHVlID0gbmV3IERhdGUodmFsdWUpO1xuICAgIGxldCBob3Vyczogc3RyaW5nIHwgbnVtYmVyID0gX3ZhbHVlLmdldEhvdXJzKCk7XG4gICAgbGV0IG1pbnV0ZXM6IHN0cmluZyB8IG51bWJlciA9IF92YWx1ZS5nZXRNaW51dGVzKCk7XG5cbiAgICBpZiAoIXRoaXMubWlsaXRhcnkpIHtcbiAgICAgIHRoaXMubWVyaWRpYW4gPSBob3VycyA+PSAxMiA/ICdwbScgOiAnYW0nO1xuICAgICAgaG91cnMgPSBob3VycyAlIDEyO1xuICAgICAgaG91cnMgPSBob3VycyB8fCAxMjtcbiAgICB9XG4gICAgbWludXRlcyA9IG1pbnV0ZXMgPCAxMCA/IGAwJHttaW51dGVzfWAgOiBtaW51dGVzO1xuXG4gICAgdGhpcy5zZXRIb3VycyhudWxsLCBob3VycywgZGlzcGF0Y2gpO1xuICAgIHRoaXMuc2V0TWludXRlcyhudWxsLCBtaW51dGVzLCBkaXNwYXRjaCk7XG4gICAgdGhpcy5jaGVja0JldHdlZW4obWludXRlcyk7XG4gIH1cblxuICBjaGVja0JldHdlZW4odmFsdWUpIHtcbiAgICB0aGlzLmluQmV0d2VlbiA9IHRoaXMuTUlOVVRFUy5pbmRleE9mKFN0cmluZyh2YWx1ZSkpIDwgMDtcbiAgfVxuXG4gIHNldFZhbHVlKGV2ZW50LCB2YWx1ZSkge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICB0aGlzLnNlbGVjdGVkID0gdmFsdWU7XG4gICAgY29uc3QgW3RpbWUsIG1lcmlkaWFuXSA9IHZhbHVlLnNwbGl0KCcgJyk7XG4gICAgY29uc3QgW2hvdXJzLCBtaW51dGVzXSA9IHRpbWUuc3BsaXQoJzonKTtcbiAgICB0aGlzLmhvdXJzID0gaG91cnM7XG4gICAgdGhpcy5taW51dGVzID0gbWludXRlcztcbiAgICB0aGlzLm1lcmlkaWFuID0gbWVyaWRpYW47XG5cbiAgICB0aGlzLmRpc3BhdGNoQ2hhbmdlKCk7XG4gIH1cblxuICBzZXRIb3VycyhldmVudCwgaG91cnMsIGRpc3BhdGNoKSB7XG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIHRoaXMuaG91cnMgPSBob3VycztcbiAgICB0aGlzLmhvdXJzQ2xhc3MgPSBgaG91ci0ke2hvdXJzfWA7XG4gICAgdGhpcy5hY3RpdmVIb3VyID0gaG91cnM7XG5cbiAgICBpZiAoZGlzcGF0Y2gpIHtcbiAgICAgIHRoaXMuZGlzcGF0Y2hDaGFuZ2UoKTtcbiAgICB9XG4gIH1cblxuICBzZXRNaW51dGVzKGV2ZW50LCBtaW51dGVzLCBkaXNwYXRjaCkge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICB0aGlzLm1pbnV0ZXMgPSBtaW51dGVzO1xuICAgIHRoaXMubWludXRlc0NsYXNzID0gYG1pbi0ke21pbnV0ZXN9YDtcbiAgICB0aGlzLmFjdGl2ZU1pbnV0ZSA9IG1pbnV0ZXM7XG4gICAgdGhpcy5jaGVja0JldHdlZW4obWludXRlcyk7XG5cbiAgICBpZiAoZGlzcGF0Y2gpIHtcbiAgICAgIHRoaXMuZGlzcGF0Y2hDaGFuZ2UoKTtcbiAgICB9XG4gIH1cblxuICBzZXRQZXJpb2QoZXZlbnQsIHBlcmlvZCwgZGlzcGF0Y2gpIHtcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgdGhpcy5tZXJpZGlhbiA9IHBlcmlvZDtcblxuICAgIGlmIChkaXNwYXRjaCkge1xuICAgICAgdGhpcy5kaXNwYXRjaENoYW5nZSgpO1xuICAgIH1cbiAgfVxuXG4gIGRpc3BhdGNoQ2hhbmdlKCkge1xuICAgIGxldCBob3VycyA9IE51bWJlcih0aGlzLmhvdXJzKTtcblxuICAgIGlmICghdGhpcy5taWxpdGFyeSkge1xuICAgICAgaG91cnMgPSB0aGlzLm1lcmlkaWFuLnRvTG93ZXJDYXNlKCkgPT09ICdwbScgPyBob3VycyArIDEyIDogaG91cnM7XG5cbiAgICAgIC8vIFNwZWNpYWwgY2FzZSBmb3IgMTJcbiAgICAgIGlmICh0aGlzLm1lcmlkaWFuLnRvTG93ZXJDYXNlKCkgPT09ICdwbScgJiYgaG91cnMgPT09IDI0KSB7XG4gICAgICAgIGhvdXJzID0gMTI7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMubWVyaWRpYW4udG9Mb3dlckNhc2UoKSA9PT0gJ2FtJyAmJiBob3VycyA9PT0gMTIpIHtcbiAgICAgICAgaG91cnMgPSAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHZhbHVlID0gbmV3IERhdGUoKTtcbiAgICB2YWx1ZS5zZXRIb3Vycyhob3Vycyk7XG4gICAgdmFsdWUuc2V0TWludXRlcyh0aGlzLm1pbnV0ZXMpO1xuICAgIHZhbHVlLnNldFNlY29uZHMoMCk7XG4gICAgdGhpcy52YWx1ZSA9IGAke3RoaXMuaG91cnN9OiR7dGhpcy5taW51dGVzfSAke3RoaXMubWVyaWRpYW59YDtcbiAgICB0aGlzLm9uU2VsZWN0Lm5leHQoe1xuICAgICAgaG91cnMsXG4gICAgICBtaW51dGVzOiB0aGlzLm1pbnV0ZXMsXG4gICAgICBtZXJpZGlhbjogdGhpcy5tZXJpZGlhbixcbiAgICAgIGRhdGU6IHZhbHVlLFxuICAgICAgdGV4dDogdGhpcy52YWx1ZSxcbiAgICB9KTtcbiAgICB0aGlzLl9vbkNoYW5nZSh2YWx1ZSk7XG4gIH1cblxuICAvLyBWYWx1ZUFjY2Vzc29yIEZ1bmN0aW9uc1xuICB3cml0ZVZhbHVlKG1vZGVsOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgaWYgKEhlbHBlcnMuaXNEYXRlKG1vZGVsKSkge1xuICAgICAgdGhpcy5pbml0KG1vZGVsLCBmYWxzZSk7XG4gICAgICAvLyB0aGlzLmRpc3BhdGNoQ2hhbmdlKCk7XG4gICAgfVxuICAgIGlmIChIZWxwZXJzLmlzU3RyaW5nKG1vZGVsKSkge1xuICAgICAgY29uc3QgdGltZSA9IHRoaXMubWlsaXRhcnkgPyBtb2RlbCA6IHRoaXMuY29udmVydFRpbWUxMnRvMjQobW9kZWwpO1xuICAgICAgY29uc3QgZGF0ZSA9IHBhcnNlKGAke2Zvcm1hdChEYXRlLm5vdygpLCAnWVlZWS1NTS1ERCcpfVQke3RpbWV9YCk7XG4gICAgICBpZiAoaXNWYWxpZChkYXRlKSkge1xuICAgICAgICB0aGlzLmluaXQoZGF0ZSwgZmFsc2UpO1xuICAgICAgICAvLyB0aGlzLmRpc3BhdGNoQ2hhbmdlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBjb252ZXJ0VGltZTEydG8yNCh0aW1lMTJoOiBzdHJpbmcpIHtcbiAgICBjb25zdCBwbUZvcm1hdCA9IHRoaXMubGFiZWxzLnRpbWVGb3JtYXRQTS50b1VwcGVyQ2FzZSgpO1xuXG4gICAgY29uc3QgW3RpbWUsIG1vZGlmaWVyXSA9IHRpbWUxMmguc3BsaXQoJyAnKTtcbiAgICBsZXQgW2hvdXJzLCBtaW51dGVzXSA9IHRpbWUuc3BsaXQoJzonKTtcbiAgICBpZiAoaG91cnMgPT09ICcxMicpIHtcbiAgICAgIGhvdXJzID0gJzAwJztcbiAgICB9XG4gICAgaWYgKFsnUE0nLCBwbUZvcm1hdF0uaW5jbHVkZXMobW9kaWZpZXIpKSB7XG4gICAgICBob3VycyA9IGAke3BhcnNlSW50KGhvdXJzLCAxMCkgKyAxMn1gLnBhZFN0YXJ0KDIsICcwJyk7XG4gICAgfVxuICAgIHJldHVybiBgJHtob3Vyc306JHttaW51dGVzfWA7XG4gIH1cbn1cbiJdfQ==