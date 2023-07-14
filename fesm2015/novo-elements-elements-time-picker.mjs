import * as i0 from '@angular/core';
import { forwardRef, EventEmitter, Component, Input, Output, HostBinding, ViewChild, NgModule } from '@angular/core';
import * as i4 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { isValid } from 'date-fns';
import { Helpers, DateUtil } from 'novo-elements/utils';
import * as i1 from 'novo-elements/services';
import * as i2 from 'novo-elements/elements/list';
import { NovoListModule } from 'novo-elements/elements/list';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from 'angular2-text-mask';
import * as i5 from 'angular-imask';
import { IMaskDirectiveModule } from 'angular-imask';
import * as i2$1 from 'novo-elements/elements/common';
import { NovoOverlayTemplateComponent, NovoOverlayModule } from 'novo-elements/elements/common';
import * as IMask from 'imask';

// NG2
// Value accessor for the component (supports ngModel)
const TIME_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoTimePickerElement),
    multi: true,
};
var TIME_VALUE_FORMATS;
(function (TIME_VALUE_FORMATS) {
    TIME_VALUE_FORMATS["iso8601"] = "iso8601";
    TIME_VALUE_FORMATS["Date"] = "Date";
})(TIME_VALUE_FORMATS || (TIME_VALUE_FORMATS = {}));
class NovoTimePickerElement {
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
  `, isInline: true, components: [{ type: i2.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { type: i2.NovoListItemElement, selector: "novo-list-item, a[list-item], button[list-item]" }, { type: i2.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTimePickerElement, decorators: [{
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

// NG
// Value accessor for the component (supports ngModel)
const DATE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoTimePickerInputElement),
    multi: true,
};
class NovoTimePickerInputElement {
    constructor(element, labels, dateFormatService, _changeDetectorRef) {
        this.element = element;
        this.labels = labels;
        this.dateFormatService = dateFormatService;
        this._changeDetectorRef = _changeDetectorRef;
        /** View -> model callback called when value changes */
        this._onChange = () => { };
        /** View -> model callback called when autocomplete has been touched */
        this._onTouched = () => { };
        this.military = false;
        this.disabled = false;
        /**
         * @deprecated don't use
         */
        this.analog = false;
        this.blurEvent = new EventEmitter();
        this.focusEvent = new EventEmitter();
        this.changeEvent = new EventEmitter();
    }
    ngOnInit() {
        this.initFormatOptions();
    }
    ngOnChanges(changes) {
        // set icon and styling
        if (Object.keys(changes).some((key) => ['military', 'maskOptions'].includes(key))) {
            this.initFormatOptions();
        }
    }
    initFormatOptions() {
        this.placeholder = this.military ? this.labels.timeFormatPlaceholder24Hour : this.labels.timeFormatPlaceholderAM;
        const timeFormat = this.military ? 'HH:mm' : 'hh:mm A';
        const amFormat = this.labels.timeFormatAM.toUpperCase();
        const pmFormat = this.labels.timeFormatPM.toUpperCase();
        this.maskOptions = {
            mask: Date,
            pattern: this.military ? 'HH:mm' : 'hh:mm aa',
            overwrite: true,
            autofix: true,
            lazy: false,
            min: new Date(1970, 0, 1),
            max: new Date(2030, 0, 1),
            prepare(str) {
                return str.toUpperCase();
            },
            format(date) {
                return DateUtil.format(date, timeFormat);
            },
            parse: (str) => {
                const time = this.military ? str : this.convertTime12to24(str);
                return DateUtil.parse(`${DateUtil.format(Date.now(), 'YYYY-MM-DD')}T${time}`);
            },
            blocks: {
                HH: {
                    mask: IMask.MaskedRange,
                    placeholderChar: 'H',
                    maxLength: 2,
                    from: 0,
                    to: 23,
                },
                hh: {
                    mask: IMask.MaskedRange,
                    placeholderChar: 'h',
                    maxLength: 2,
                    from: 1,
                    to: 12,
                },
                mm: {
                    mask: IMask.MaskedRange,
                    placeholderChar: 'm',
                    maxLength: 2,
                    from: 0,
                    to: 59,
                },
                aa: {
                    mask: IMask.MaskedEnum,
                    placeholderChar: 'x',
                    enum: ['AM', 'PM', 'am', 'pm', amFormat, pmFormat],
                },
            },
        };
    }
    /** BEGIN: Convenient Panel Methods. */
    openPanel() {
        if (!this.overlay.panelOpen) {
            this.overlay.openPanel();
            const hour = new Date().getHours();
            Promise.resolve(null).then(() => this.scrollToIndex(hour * 4));
        }
    }
    closePanel() {
        this.overlay.closePanel();
    }
    get panelOpen() {
        return this.overlay && this.overlay.panelOpen;
    }
    /** END: Convenient Panel Methods. */
    _handleKeydown(event) {
        const input = event.target;
        const hour = input.value.slice(0, 2);
        if ((event.key === "Escape" /* Escape */ || event.key === "Enter" /* Enter */) && this.panelOpen) {
            this.closePanel();
            event.stopPropagation();
            event.stopImmediatePropagation();
            if (this.hourOneFormatRequired(hour)) {
                input.value = `01:${input.value.slice(3, input.value.length)}`;
            }
        }
        else if (event.key === "Tab" /* Tab */ && input.selectionStart <= 2 && this.hourOneFormatRequired(hour)) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            input.value = `01:${input.value.slice(3, input.value.length)}`;
            input.setSelectionRange(3, 3);
        }
        else if (event.key === "Backspace" /* Backspace */ && input.selectionStart === input.value.length) {
            input.value = `${input.value.slice(0, 5)} xx`;
        }
        else if (event.key === "Tab" /* Tab */ && this.panelOpen) {
            this.closePanel();
            event.stopPropagation();
            event.stopImmediatePropagation();
        }
        else if (event.key === "ArrowRight" /* ArrowRight */ && input.selectionStart >= 2 && this.hourOneFormatRequired(hour)) {
            input.value = `01:${input.value.slice(3, input.value.length)}`;
            input.setSelectionRange(2, 2);
        }
    }
    _handleInput(event) {
        if (document.activeElement === event.target) {
            const text = event.target.value;
            const hour = text.slice(0, 2);
            this.openPanel();
            if ((this.military && Number(text[0]) > 2) || (!this.military && Number(text[0]) > 1)) {
                event.preventDefault();
                event.target.value = `0${text}`;
            }
            if (!this.military) {
                const test = text.substr(5, 4).replace(/x/g, '').trim().slice(0, 2);
                const timePeriod = this.maskOptions.blocks.aa.enum.find((it) => it[0] === test[0]);
                if (timePeriod) {
                    event.target.value = `${event.target.value.slice(0, 5)} ${timePeriod}`;
                }
                if (event.target.selectionStart >= 3 && this.hourOneFormatRequired(hour)) {
                    event.target.value = `01:${event.target.value.slice(3, event.target.value.length)}`;
                }
            }
        }
    }
    _handleChange(event) {
        var _a;
        const text = (_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.value;
        this.formatTime(text);
        this.changeEvent.emit();
    }
    _handleBlur(event) {
        const text = event.target.value;
        const hour = text.slice(0, 2);
        if (!this.military) {
            const test = text.substr(5, 4).replace(/x/g, '').trim().slice(0, 2);
            const timePeriod = this.maskOptions.blocks.aa.enum.find((it) => it[0] === test[0]);
            if (this.hourOneFormatRequired(hour)) {
                event.target.value = `01:${text.slice(3, text.length)}`;
            }
            if (!timePeriod) {
                event.target.value = `${event.target.value.slice(0, 5)} xx`;
            }
        }
    }
    _handleFocus(event) {
        this.openPanel();
        this.focusEvent.emit(event);
    }
    writeValue(value) {
        Promise.resolve(null).then(() => this._setTriggerValue(value));
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
    }
    dispatchOnChange(newValue, skip = false) {
        if (newValue !== this.value) {
            this._onChange(newValue);
            this.changeEvent.emit(newValue);
            !skip && this.writeValue(newValue);
        }
    }
    _setTriggerValue(value) {
        if (value instanceof Date && this.value instanceof Date) {
            value = new Date(value.setFullYear(this.value.getFullYear(), this.value.getMonth(), this.value.getDate()));
        }
        this.value = value;
        this._changeDetectorRef.markForCheck();
    }
    setValueAndClose(event) {
        this.setValue(event);
        this.closePanel();
    }
    setValue(event) {
        if (event && event.date) {
            this.dispatchOnChange(event.date);
        }
    }
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    clearValue() {
        this.dispatchOnChange(null);
    }
    get hasValue() {
        return !Helpers.isEmpty(this.value);
    }
    scrollToIndex(index) {
        const element = this.overlay.overlayRef.overlayElement;
        const list = element.querySelector('.increments');
        const items = list.querySelectorAll('novo-list-item');
        const item = items[index];
        if (item) {
            list.scrollTop = item.offsetTop;
        }
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
    hourOneFormatRequired(hourInput) {
        return hourInput === 'h1' || hourInput === '1h';
    }
    formatTime(value) {
        try {
            const [dateTimeValue, formatted] = this.dateFormatService.parseString(value, this.military, 'time');
            if (!isNaN(dateTimeValue.getUTCDate())) {
                const dt = new Date(dateTimeValue);
                this.dispatchOnChange(dt);
            }
            else {
                this.dispatchOnChange(null);
            }
        }
        catch (err) { }
    }
}
NovoTimePickerInputElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTimePickerInputElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i1.DateFormatService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NovoTimePickerInputElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoTimePickerInputElement, selector: "novo-time-picker-input", inputs: { name: "name", placeholder: "placeholder", military: "military", maskOptions: "maskOptions", disabled: "disabled", analog: "analog" }, outputs: { blurEvent: "blurEvent", focusEvent: "focusEvent", changeEvent: "changeEvent" }, host: { properties: { "class.disabled": "this.disabled" } }, providers: [DATE_VALUE_ACCESSOR], viewQueries: [{ propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true }, { propertyName: "input", first: true, predicate: ["input"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
    <input
      type="text"
      [name]="name"
      [(ngModel)]="value"
      [imask]="maskOptions"
      [unmask]="'typed'"
      [placeholder]="placeholder"
      (change)="_handleChange($event)"
      (focus)="_handleFocus($event)"
      (keydown)="_handleKeydown($event)"
      (input)="_handleInput($event)"
      (blur)="_handleBlur($event)"
      #input
      data-automation-id="time-input"
      [disabled]="disabled"
    />
    <i *ngIf="!hasValue" (click)="openPanel()" class="bhi-clock"></i> <i *ngIf="hasValue" (click)="clearValue()" class="bhi-times"></i>
    <novo-overlay-template [parent]="element" position="above-below">
      <novo-time-picker
        inline="true"
        [analog]="analog"
        (onSelect)="setValue($event)"
        [ngModel]="value"
        [military]="military"
      ></novo-time-picker>
    </novo-overlay-template>
  `, isInline: true, components: [{ type: i2$1.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing"] }, { type: NovoTimePickerElement, selector: "novo-time-picker", inputs: ["military", "analog", "inline", "step"], outputs: ["onSelect"] }], directives: [{ type: i4.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i5.IMaskDirective, selector: "[imask]", inputs: ["imaskElement", "imask", "unmask"], outputs: ["accept", "complete"], exportAs: ["imask"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTimePickerInputElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-time-picker-input',
                    providers: [DATE_VALUE_ACCESSOR],
                    template: `
    <input
      type="text"
      [name]="name"
      [(ngModel)]="value"
      [imask]="maskOptions"
      [unmask]="'typed'"
      [placeholder]="placeholder"
      (change)="_handleChange($event)"
      (focus)="_handleFocus($event)"
      (keydown)="_handleKeydown($event)"
      (input)="_handleInput($event)"
      (blur)="_handleBlur($event)"
      #input
      data-automation-id="time-input"
      [disabled]="disabled"
    />
    <i *ngIf="!hasValue" (click)="openPanel()" class="bhi-clock"></i> <i *ngIf="hasValue" (click)="clearValue()" class="bhi-times"></i>
    <novo-overlay-template [parent]="element" position="above-below">
      <novo-time-picker
        inline="true"
        [analog]="analog"
        (onSelect)="setValue($event)"
        [ngModel]="value"
        [military]="military"
      ></novo-time-picker>
    </novo-overlay-template>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i1.DateFormatService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { name: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], military: [{
                type: Input
            }], maskOptions: [{
                type: Input
            }], disabled: [{
                type: HostBinding,
                args: ['class.disabled']
            }, {
                type: Input
            }], analog: [{
                type: Input
            }], blurEvent: [{
                type: Output
            }], focusEvent: [{
                type: Output
            }], changeEvent: [{
                type: Output
            }], overlay: [{
                type: ViewChild,
                args: [NovoOverlayTemplateComponent]
            }], input: [{
                type: ViewChild,
                args: ['input']
            }] } });

// NG2
class NovoTimePickerModule {
}
NovoTimePickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTimePickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoTimePickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTimePickerModule, declarations: [NovoTimePickerElement, NovoTimePickerInputElement], imports: [CommonModule, FormsModule, IMaskDirectiveModule, TextMaskModule, NovoOverlayModule, NovoListModule], exports: [NovoTimePickerElement, NovoTimePickerInputElement] });
NovoTimePickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTimePickerModule, imports: [[CommonModule, FormsModule, IMaskDirectiveModule, TextMaskModule, NovoOverlayModule, NovoListModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTimePickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, IMaskDirectiveModule, TextMaskModule, NovoOverlayModule, NovoListModule],
                    declarations: [NovoTimePickerElement, NovoTimePickerInputElement],
                    exports: [NovoTimePickerElement, NovoTimePickerInputElement],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoTimePickerElement, NovoTimePickerInputElement, NovoTimePickerModule, TIME_VALUE_FORMATS };
//# sourceMappingURL=novo-elements-elements-time-picker.mjs.map
