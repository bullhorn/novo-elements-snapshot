var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// NG2
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Attribute, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BooleanInput, Helpers } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
import * as i2 from "@angular/common";
// Value accessor for the component (supports ngModel)
const CHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoCheckboxElement),
    multi: true,
};
/** Change event object emitted by NovoCheckbox. */
export class NovoCheckboxChange {
}
const LAYOUT_DEFAULTS = { iconStyle: 'box' };
let nextId = 0;
export class NovoCheckboxElement {
    /** Whether the checkbox is required. */
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = coerceBooleanProperty(value);
    }
    /** Whether the checkbox is checked. */
    get checked() {
        return this._checked;
    }
    set checked(value) {
        if (value !== this.checked) {
            this._checked = value;
            this._cdr.markForCheck();
        }
    }
    get indeterminate() {
        return this._indeterminate;
    }
    set indeterminate(value) {
        const changed = value !== this._indeterminate;
        this._indeterminate = coerceBooleanProperty(value);
        if (changed) {
            this.indeterminateChange.emit(this._indeterminate);
        }
        this._syncIndeterminate(this._indeterminate);
    }
    constructor(_cdr, _focusMonitor, tabIndex) {
        this._cdr = _cdr;
        this._focusMonitor = _focusMonitor;
        /**
         * Attached to the aria-label attribute of the host element. In most cases, aria-labelledby will
         * take precedence so this may be omitted.
         */
        this.ariaLabel = '';
        /**
         * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
         */
        this.ariaLabelledby = null;
        this._uniqueId = `novo-checkbox-${++nextId}`;
        this.boxIcon = true;
        this.id = this._uniqueId;
        this.name = this._uniqueId;
        this.disabled = false;
        this._checked = false;
        this._indeterminate = false;
        /** Event emitted when the checkbox's `checked` value changes. */
        this.change = new EventEmitter();
        /** Event emitted when the checkbox's `indeterminate` value changes. */
        this.indeterminateChange = new EventEmitter();
        this.onSelect = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
        // this.color = this.defaultColor = this._options.color || defaults.color;
        this.tabIndex = parseInt(tabIndex, 10) || 0;
    }
    ngOnInit() {
        this.layoutOptions = Object.assign({}, LAYOUT_DEFAULTS, this.layoutOptions);
        this.boxIcon = this.layoutOptions.iconStyle === 'box';
    }
    select(event) {
        Helpers.swallowEvent(event);
        if (!this.disabled) {
            this.checked = !this.checked;
            this.onModelChange(this.checked);
            this.onSelect.emit({ originalEvent: event, value: this.checked });
        }
    }
    // Implemented as part of ControlValueAccessor.
    writeValue(value) {
        this.checked = !!value;
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
    }
    _getAriaChecked() {
        if (this.checked) {
            return 'true';
        }
        return this.indeterminate ? 'mixed' : 'false';
    }
    _emitChangeEvent() {
        const event = new NovoCheckboxChange();
        event.source = this;
        event.checked = this.checked;
        this.onModelChange(this.checked);
        this.change.emit(event);
        // Assigning the value again here is redundant, but we have to do it in case it was
        // changed inside the `change` listener which will cause the input to be out of sync.
        if (this._inputElement) {
            this._inputElement.nativeElement.checked = this.checked;
        }
    }
    /** Toggles the `checked` state of the checkbox. */
    toggle() {
        this.checked = !this.checked;
    }
    /**
     * Event handler for checkbox input element.
     * Toggles checked state if element is not disabled.
     * Do not toggle on (change) event since IE doesn't fire change event when
     *   indeterminate checkbox is clicked.
     * @param event
     */
    _onInputClick(event) {
        // We have to stop propagation for click events on the visual hidden input element.
        // By default, when a user clicks on a label element, a generated click event will be
        // dispatched on the associated input element. Since we are using a label element as our
        // root container, the click event on the `checkbox` will be executed twice.
        // The real click event will bubble up, and the generated click event also tries to bubble up.
        // This will lead to multiple click events.
        // Preventing bubbling for the second event will solve that issue.
        event.stopPropagation();
        if (!this.disabled) {
            // When user manually click on the checkbox, `indeterminate` is set to false.
            if (this.indeterminate) {
                Promise.resolve().then(() => {
                    this._indeterminate = false;
                    this.indeterminateChange.emit(this._indeterminate);
                });
            }
            this.toggle();
            // Emit our custom change event if the native input emitted one.
            // It is important to only emit it, if the native input triggered one, because
            // we don't want to trigger a change event, when the `checked` variable changes for example.
            this._emitChangeEvent();
        }
    }
    /** Focuses the checkbox. */
    focus(origin, options) {
        if (origin) {
            this._focusMonitor.focusVia(this._inputElement, origin, options);
        }
        else {
            this._inputElement.nativeElement.focus(options);
        }
    }
    _onInteractionEvent(event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the `change` output.
        event.stopPropagation();
    }
    _syncIndeterminate(value) {
        const nativeCheckbox = this._inputElement;
        if (nativeCheckbox) {
            nativeCheckbox.nativeElement.indeterminate = value;
        }
    }
}
NovoCheckboxElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoCheckboxElement, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.FocusMonitor }, { token: 'tabindex', attribute: true }], target: i0.ɵɵFactoryTarget.Component });
NovoCheckboxElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: NovoCheckboxElement, selector: "novo-checkbox", inputs: { ariaLabel: ["aria-label", "ariaLabel"], ariaLabelledby: ["aria-labelledby", "ariaLabelledby"], ariaDescribedby: ["aria-describedby", "ariaDescribedby"], id: "id", name: "name", label: "label", disabled: "disabled", layoutOptions: "layoutOptions", color: "color", value: "value", tabIndex: "tabIndex", required: "required", checked: "checked", indeterminate: "indeterminate" }, outputs: { change: "change", indeterminateChange: "indeterminateChange", onSelect: "onSelect" }, host: { properties: { "class.has-label": "label" }, classAttribute: "novo-checkbox" }, providers: [CHECKBOX_VALUE_ACCESSOR], viewQueries: [{ propertyName: "_inputElement", first: true, predicate: ["input"], descendants: true }], ngImport: i0, template: `
    <div class="novo-checkbox-group" [class.checked]="checked" [class.disabled]="disabled">
      <input
        #input
        type="checkbox"
        [required]="_required"
        [checked]="checked"
        [id]="id"
        [attr.name]="name"
        [attr.value]="value"
        [disabled]="disabled"
        [tabIndex]="tabIndex"
        [attr.aria-label]="ariaLabel || null"
        [attr.aria-labelledby]="ariaLabelledby"
        [attr.aria-checked]="_getAriaChecked()"
        [attr.aria-describedby]="ariaDescribedby"
        (change)="_onInteractionEvent($event)"
        (click)="_onInputClick($event)"
      />
      <label [attr.for]="name" (click)="select($event)" [class.disabled]="disabled">
        <i
          [class.bhi-checkbox-empty]="!checked && !indeterminate && boxIcon"
          [class.bhi-checkbox-filled]="checked && !indeterminate && boxIcon"
          [class.bhi-checkbox-indeterminate]="indeterminate && boxIcon"
          [class.bhi-circle-o]="!checked && !indeterminate && !boxIcon"
          [class.bhi-check]="checked && !indeterminate && !boxIcon"
          [class.bhi-circle]="indeterminate && !boxIcon"
        ></i>
        <span *ngIf="label">{{ label }}</span>
        <span *ngIf="!label" class="novo-checkbox-text"><ng-content></ng-content></span>
      </label>
    </div>
  `, isInline: true, styles: [":host{display:flex;flex-flow:row wrap}:host.has-label [class*=-group]{margin-right:15px}:host .novo-checkbox-text{margin-left:15px}:host .novo-checkbox-group{cursor:pointer;position:relative}:host .novo-checkbox-group:hover:not(.disabled) label i.bhi-checkbox-empty,:host .novo-checkbox-group:hover:not(.disabled) label i.bhi-radio-empty{color:#4a89dc}:host .novo-checkbox-group.checked label{color:#393939}:host .novo-checkbox-group.checked label i{animation:iconEnter .16s ease-in-out}:host .novo-checkbox-group.disabled{pointer-events:auto}:host .novo-checkbox-group.disabled label{cursor:not-allowed;opacity:.4}:host .novo-checkbox-group input[type=checkbox]{appearance:none!important;height:0!important;border:none!important;position:absolute}:host .novo-checkbox-group input[type=checkbox]:focus+label i.bhi-checkbox-empty,:host .novo-checkbox-group input[type=checkbox]:focus+label i.bhi-checkbox-filled{color:#4a89dc}:host .novo-checkbox-group label{color:#868686;margin-left:0;cursor:pointer;transition:all .2s ease-in-out;display:flex;align-items:baseline}:host .novo-checkbox-group label i{margin-right:5px;transition:all .2s ease-in-out}:host .novo-checkbox-group label i.bhi-checkbox-empty,:host .novo-checkbox-group label i.bhi-radio-empty,:host .novo-checkbox-group label i.bhi-circle-o{color:#d2d2d2}:host .novo-checkbox-group label i.bhi-check{background:#d2d2d2;color:#fff;padding:.15em 0 0 .3em;font-size:1em;width:20px;height:20px;border-radius:50%}:host .novo-checkbox-group label i.bhi-checkbox-filled,:host .novo-checkbox-group label i.bhi-radio-filled{color:#4a89dc}:host .novo-checkbox-group label span{display:inline-block}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NovoCheckboxElement.prototype, "checked", null);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NovoCheckboxElement.prototype, "indeterminate", null);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoCheckboxElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-checkbox', providers: [CHECKBOX_VALUE_ACCESSOR], template: `
    <div class="novo-checkbox-group" [class.checked]="checked" [class.disabled]="disabled">
      <input
        #input
        type="checkbox"
        [required]="_required"
        [checked]="checked"
        [id]="id"
        [attr.name]="name"
        [attr.value]="value"
        [disabled]="disabled"
        [tabIndex]="tabIndex"
        [attr.aria-label]="ariaLabel || null"
        [attr.aria-labelledby]="ariaLabelledby"
        [attr.aria-checked]="_getAriaChecked()"
        [attr.aria-describedby]="ariaDescribedby"
        (change)="_onInteractionEvent($event)"
        (click)="_onInputClick($event)"
      />
      <label [attr.for]="name" (click)="select($event)" [class.disabled]="disabled">
        <i
          [class.bhi-checkbox-empty]="!checked && !indeterminate && boxIcon"
          [class.bhi-checkbox-filled]="checked && !indeterminate && boxIcon"
          [class.bhi-checkbox-indeterminate]="indeterminate && boxIcon"
          [class.bhi-circle-o]="!checked && !indeterminate && !boxIcon"
          [class.bhi-check]="checked && !indeterminate && !boxIcon"
          [class.bhi-circle]="indeterminate && !boxIcon"
        ></i>
        <span *ngIf="label">{{ label }}</span>
        <span *ngIf="!label" class="novo-checkbox-text"><ng-content></ng-content></span>
      </label>
    </div>
  `, host: {
                        class: 'novo-checkbox',
                        '[class.has-label]': 'label',
                    }, styles: [":host{display:flex;flex-flow:row wrap}:host.has-label [class*=-group]{margin-right:15px}:host .novo-checkbox-text{margin-left:15px}:host .novo-checkbox-group{cursor:pointer;position:relative}:host .novo-checkbox-group:hover:not(.disabled) label i.bhi-checkbox-empty,:host .novo-checkbox-group:hover:not(.disabled) label i.bhi-radio-empty{color:#4a89dc}:host .novo-checkbox-group.checked label{color:#393939}:host .novo-checkbox-group.checked label i{animation:iconEnter .16s ease-in-out}:host .novo-checkbox-group.disabled{pointer-events:auto}:host .novo-checkbox-group.disabled label{cursor:not-allowed;opacity:.4}:host .novo-checkbox-group input[type=checkbox]{appearance:none!important;height:0!important;border:none!important;position:absolute}:host .novo-checkbox-group input[type=checkbox]:focus+label i.bhi-checkbox-empty,:host .novo-checkbox-group input[type=checkbox]:focus+label i.bhi-checkbox-filled{color:#4a89dc}:host .novo-checkbox-group label{color:#868686;margin-left:0;cursor:pointer;transition:all .2s ease-in-out;display:flex;align-items:baseline}:host .novo-checkbox-group label i{margin-right:5px;transition:all .2s ease-in-out}:host .novo-checkbox-group label i.bhi-checkbox-empty,:host .novo-checkbox-group label i.bhi-radio-empty,:host .novo-checkbox-group label i.bhi-circle-o{color:#d2d2d2}:host .novo-checkbox-group label i.bhi-check{background:#d2d2d2;color:#fff;padding:.15em 0 0 .3em;font-size:1em;width:20px;height:20px;border-radius:50%}:host .novo-checkbox-group label i.bhi-checkbox-filled,:host .novo-checkbox-group label i.bhi-radio-filled{color:#4a89dc}:host .novo-checkbox-group label span{display:inline-block}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.FocusMonitor }, { type: undefined, decorators: [{
                    type: Attribute,
                    args: ['tabindex']
                }] }]; }, propDecorators: { ariaLabel: [{
                type: Input,
                args: ['aria-label']
            }], ariaLabelledby: [{
                type: Input,
                args: ['aria-labelledby']
            }], ariaDescribedby: [{
                type: Input,
                args: ['aria-describedby']
            }], id: [{
                type: Input
            }], name: [{
                type: Input
            }], label: [{
                type: Input
            }], disabled: [{
                type: Input
            }], layoutOptions: [{
                type: Input
            }], color: [{
                type: Input
            }], value: [{
                type: Input
            }], tabIndex: [{
                type: Input
            }], required: [{
                type: Input
            }], checked: [{
                type: Input
            }], indeterminate: [{
                type: Input
            }], _inputElement: [{
                type: ViewChild,
                args: ['input']
            }], change: [{
                type: Output
            }], indeterminateChange: [{
                type: Output
            }], onSelect: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2tib3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9jaGVja2JveC9DaGVja2JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBZSxNQUFNLG1CQUFtQixDQUFDO0FBQzlELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFDTCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7OztBQUU1RCxzREFBc0Q7QUFDdEQsTUFBTSx1QkFBdUIsR0FBRztJQUM5QixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUM7SUFDbEQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBRUYsbURBQW1EO0FBQ25ELE1BQU0sT0FBTyxrQkFBa0I7Q0FLOUI7QUFFRCxNQUFNLGVBQWUsR0FBRyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUM3QyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUEyQ2YsTUFBTSxPQUFPLG1CQUFtQjtJQTRCOUIsd0NBQXdDO0lBQ3hDLElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFH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Z0JBR1ksbUJBQW1CO3NCQUFyQyxNQUFNO2dCQUVHLFFBQVE7c0JBQWpCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IEZvY3VzTW9uaXRvciwgRm9jdXNPcmlnaW4gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQXR0cmlidXRlLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgSGVscGVycyB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcbmNvbnN0IENIRUNLQk9YX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b0NoZWNrYm94RWxlbWVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuLyoqIENoYW5nZSBldmVudCBvYmplY3QgZW1pdHRlZCBieSBOb3ZvQ2hlY2tib3guICovXG5leHBvcnQgY2xhc3MgTm92b0NoZWNrYm94Q2hhbmdlIHtcbiAgLyoqIFRoZSBzb3VyY2UgTm92b0NoZWNrYm94IG9mIHRoZSBldmVudC4gKi9cbiAgc291cmNlOiBOb3ZvQ2hlY2tib3hFbGVtZW50O1xuICAvKiogVGhlIG5ldyBgY2hlY2tlZGAgdmFsdWUgb2YgdGhlIGNoZWNrYm94LiAqL1xuICBjaGVja2VkOiBib29sZWFuO1xufVxuXG5jb25zdCBMQVlPVVRfREVGQVVMVFMgPSB7IGljb25TdHlsZTogJ2JveCcgfTtcbmxldCBuZXh0SWQgPSAwO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1jaGVja2JveCcsXG4gIHByb3ZpZGVyczogW0NIRUNLQk9YX1ZBTFVFX0FDQ0VTU09SXSxcbiAgc3R5bGVVcmxzOiBbJy4vQ2hlY2tib3guc2NzcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLWNoZWNrYm94LWdyb3VwXCIgW2NsYXNzLmNoZWNrZWRdPVwiY2hlY2tlZFwiIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuICAgICAgPGlucHV0XG4gICAgICAgICNpbnB1dFxuICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICBbcmVxdWlyZWRdPVwiX3JlcXVpcmVkXCJcbiAgICAgICAgW2NoZWNrZWRdPVwiY2hlY2tlZFwiXG4gICAgICAgIFtpZF09XCJpZFwiXG4gICAgICAgIFthdHRyLm5hbWVdPVwibmFtZVwiXG4gICAgICAgIFthdHRyLnZhbHVlXT1cInZhbHVlXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgW3RhYkluZGV4XT1cInRhYkluZGV4XCJcbiAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWwgfHwgbnVsbFwiXG4gICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRieVwiXG4gICAgICAgIFthdHRyLmFyaWEtY2hlY2tlZF09XCJfZ2V0QXJpYUNoZWNrZWQoKVwiXG4gICAgICAgIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiYXJpYURlc2NyaWJlZGJ5XCJcbiAgICAgICAgKGNoYW5nZSk9XCJfb25JbnRlcmFjdGlvbkV2ZW50KCRldmVudClcIlxuICAgICAgICAoY2xpY2spPVwiX29uSW5wdXRDbGljaygkZXZlbnQpXCJcbiAgICAgIC8+XG4gICAgICA8bGFiZWwgW2F0dHIuZm9yXT1cIm5hbWVcIiAoY2xpY2spPVwic2VsZWN0KCRldmVudClcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgICAgPGlcbiAgICAgICAgICBbY2xhc3MuYmhpLWNoZWNrYm94LWVtcHR5XT1cIiFjaGVja2VkICYmICFpbmRldGVybWluYXRlICYmIGJveEljb25cIlxuICAgICAgICAgIFtjbGFzcy5iaGktY2hlY2tib3gtZmlsbGVkXT1cImNoZWNrZWQgJiYgIWluZGV0ZXJtaW5hdGUgJiYgYm94SWNvblwiXG4gICAgICAgICAgW2NsYXNzLmJoaS1jaGVja2JveC1pbmRldGVybWluYXRlXT1cImluZGV0ZXJtaW5hdGUgJiYgYm94SWNvblwiXG4gICAgICAgICAgW2NsYXNzLmJoaS1jaXJjbGUtb109XCIhY2hlY2tlZCAmJiAhaW5kZXRlcm1pbmF0ZSAmJiAhYm94SWNvblwiXG4gICAgICAgICAgW2NsYXNzLmJoaS1jaGVja109XCJjaGVja2VkICYmICFpbmRldGVybWluYXRlICYmICFib3hJY29uXCJcbiAgICAgICAgICBbY2xhc3MuYmhpLWNpcmNsZV09XCJpbmRldGVybWluYXRlICYmICFib3hJY29uXCJcbiAgICAgICAgPjwvaT5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJsYWJlbFwiPnt7IGxhYmVsIH19PC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cIiFsYWJlbFwiIGNsYXNzPVwibm92by1jaGVja2JveC10ZXh0XCI+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50Pjwvc3Bhbj5cbiAgICAgIDwvbGFiZWw+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tY2hlY2tib3gnLFxuICAgICdbY2xhc3MuaGFzLWxhYmVsXSc6ICdsYWJlbCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9DaGVja2JveEVsZW1lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0IHtcbiAgLyoqXG4gICAqIEF0dGFjaGVkIHRvIHRoZSBhcmlhLWxhYmVsIGF0dHJpYnV0ZSBvZiB0aGUgaG9zdCBlbGVtZW50LiBJbiBtb3N0IGNhc2VzLCBhcmlhLWxhYmVsbGVkYnkgd2lsbFxuICAgKiB0YWtlIHByZWNlZGVuY2Ugc28gdGhpcyBtYXkgYmUgb21pdHRlZC5cbiAgICovXG4gIEBJbnB1dCgnYXJpYS1sYWJlbCcpIGFyaWFMYWJlbDogc3RyaW5nID0gJyc7XG5cbiAgLyoqXG4gICAqIFVzZXJzIGNhbiBzcGVjaWZ5IHRoZSBgYXJpYS1sYWJlbGxlZGJ5YCBhdHRyaWJ1dGUgd2hpY2ggd2lsbCBiZSBmb3J3YXJkZWQgdG8gdGhlIGlucHV0IGVsZW1lbnRcbiAgICovXG4gIEBJbnB1dCgnYXJpYS1sYWJlbGxlZGJ5JykgYXJpYUxhYmVsbGVkYnk6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIC8qKiBUaGUgJ2FyaWEtZGVzY3JpYmVkYnknIGF0dHJpYnV0ZSBpcyByZWFkIGFmdGVyIHRoZSBlbGVtZW50J3MgbGFiZWwgYW5kIGZpZWxkIHR5cGUuICovXG4gIEBJbnB1dCgnYXJpYS1kZXNjcmliZWRieScpIGFyaWFEZXNjcmliZWRieTogc3RyaW5nO1xuXG4gIHByaXZhdGUgX3VuaXF1ZUlkOiBzdHJpbmcgPSBgbm92by1jaGVja2JveC0keysrbmV4dElkfWA7XG4gIGJveEljb246IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSB0aGlzLl91bmlxdWVJZDtcbiAgQElucHV0KCkgbmFtZTogc3RyaW5nID0gdGhpcy5fdW5pcXVlSWQ7XG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGxheW91dE9wdGlvbnM6IHsgaWNvblN0eWxlPzogc3RyaW5nIH07IC8vIFRPRE8gLSBhdm9pZCBjb25maWdzIGxpa2UgdGhpc1xuICBASW5wdXQoKSBjb2xvcjogc3RyaW5nO1xuICAvKiogVGhlIHZhbHVlIGF0dHJpYnV0ZSBvZiB0aGUgbmF0aXZlIGlucHV0IGVsZW1lbnQgKi9cbiAgQElucHV0KCkgdmFsdWU6IHN0cmluZztcbiAgQElucHV0KCkgdGFiSW5kZXg6IG51bWJlcjtcblxuICAvKiogV2hldGhlciB0aGUgY2hlY2tib3ggaXMgcmVxdWlyZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCByZXF1aXJlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7XG4gIH1cbiAgc2V0IHJlcXVpcmVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVxdWlyZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIF9yZXF1aXJlZDogYm9vbGVhbjtcblxuICAvKiogV2hldGhlciB0aGUgY2hlY2tib3ggaXMgY2hlY2tlZC4gKi9cbiAgQEJvb2xlYW5JbnB1dCgpXG4gIEBJbnB1dCgpXG4gIGdldCBjaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9jaGVja2VkO1xuICB9XG4gIHNldCBjaGVja2VkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLmNoZWNrZWQpIHtcbiAgICAgIHRoaXMuX2NoZWNrZWQgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cbiAgX2NoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBAQm9vbGVhbklucHV0KClcbiAgQElucHV0KClcbiAgZ2V0IGluZGV0ZXJtaW5hdGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2luZGV0ZXJtaW5hdGU7XG4gIH1cbiAgc2V0IGluZGV0ZXJtaW5hdGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBjb25zdCBjaGFuZ2VkID0gdmFsdWUgIT09IHRoaXMuX2luZGV0ZXJtaW5hdGU7XG4gICAgdGhpcy5faW5kZXRlcm1pbmF0ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgIHRoaXMuaW5kZXRlcm1pbmF0ZUNoYW5nZS5lbWl0KHRoaXMuX2luZGV0ZXJtaW5hdGUpO1xuICAgIH1cbiAgICB0aGlzLl9zeW5jSW5kZXRlcm1pbmF0ZSh0aGlzLl9pbmRldGVybWluYXRlKTtcbiAgfVxuICBfaW5kZXRlcm1pbmF0ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBUaGUgbmF0aXZlIGA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCI+YCBlbGVtZW50ICovXG4gIEBWaWV3Q2hpbGQoJ2lucHV0JykgX2lucHV0RWxlbWVudDogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PjtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBjaGVja2JveCdzIGBjaGVja2VkYCB2YWx1ZSBjaGFuZ2VzLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8Tm92b0NoZWNrYm94Q2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8Tm92b0NoZWNrYm94Q2hhbmdlPigpO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGNoZWNrYm94J3MgYGluZGV0ZXJtaW5hdGVgIHZhbHVlIGNoYW5nZXMuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBpbmRldGVybWluYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgQE91dHB1dCgpIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXG4gIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgX2ZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLCBAQXR0cmlidXRlKCd0YWJpbmRleCcpIHRhYkluZGV4OiBzdHJpbmcpIHtcbiAgICAvLyB0aGlzLmNvbG9yID0gdGhpcy5kZWZhdWx0Q29sb3IgPSB0aGlzLl9vcHRpb25zLmNvbG9yIHx8IGRlZmF1bHRzLmNvbG9yO1xuICAgIHRoaXMudGFiSW5kZXggPSBwYXJzZUludCh0YWJJbmRleCwgMTApIHx8IDA7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmxheW91dE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBMQVlPVVRfREVGQVVMVFMsIHRoaXMubGF5b3V0T3B0aW9ucyk7XG4gICAgdGhpcy5ib3hJY29uID0gdGhpcy5sYXlvdXRPcHRpb25zLmljb25TdHlsZSA9PT0gJ2JveCc7XG4gIH1cblxuICBzZWxlY3QoZXZlbnQ6IEV2ZW50KSB7XG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5jaGVja2VkID0gIXRoaXMuY2hlY2tlZDtcbiAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLmNoZWNrZWQpO1xuICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIHZhbHVlOiB0aGlzLmNoZWNrZWQgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5jaGVja2VkID0gISF2YWx1ZTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGRpc2FibGVkO1xuICB9XG5cbiAgX2dldEFyaWFDaGVja2VkKCk6ICd0cnVlJyB8ICdmYWxzZScgfCAnbWl4ZWQnIHtcbiAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICByZXR1cm4gJ3RydWUnO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmluZGV0ZXJtaW5hdGUgPyAnbWl4ZWQnIDogJ2ZhbHNlJztcbiAgfVxuXG4gIHByaXZhdGUgX2VtaXRDaGFuZ2VFdmVudCgpIHtcbiAgICBjb25zdCBldmVudCA9IG5ldyBOb3ZvQ2hlY2tib3hDaGFuZ2UoKTtcbiAgICBldmVudC5zb3VyY2UgPSB0aGlzO1xuICAgIGV2ZW50LmNoZWNrZWQgPSB0aGlzLmNoZWNrZWQ7XG5cbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5jaGVja2VkKTtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KGV2ZW50KTtcblxuICAgIC8vIEFzc2lnbmluZyB0aGUgdmFsdWUgYWdhaW4gaGVyZSBpcyByZWR1bmRhbnQsIGJ1dCB3ZSBoYXZlIHRvIGRvIGl0IGluIGNhc2UgaXQgd2FzXG4gICAgLy8gY2hhbmdlZCBpbnNpZGUgdGhlIGBjaGFuZ2VgIGxpc3RlbmVyIHdoaWNoIHdpbGwgY2F1c2UgdGhlIGlucHV0IHRvIGJlIG91dCBvZiBzeW5jLlxuICAgIGlmICh0aGlzLl9pbnB1dEVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX2lucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmNoZWNrZWQgPSB0aGlzLmNoZWNrZWQ7XG4gICAgfVxuICB9XG5cbiAgLyoqIFRvZ2dsZXMgdGhlIGBjaGVja2VkYCBzdGF0ZSBvZiB0aGUgY2hlY2tib3guICovXG4gIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrZWQgPSAhdGhpcy5jaGVja2VkO1xuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgZm9yIGNoZWNrYm94IGlucHV0IGVsZW1lbnQuXG4gICAqIFRvZ2dsZXMgY2hlY2tlZCBzdGF0ZSBpZiBlbGVtZW50IGlzIG5vdCBkaXNhYmxlZC5cbiAgICogRG8gbm90IHRvZ2dsZSBvbiAoY2hhbmdlKSBldmVudCBzaW5jZSBJRSBkb2Vzbid0IGZpcmUgY2hhbmdlIGV2ZW50IHdoZW5cbiAgICogICBpbmRldGVybWluYXRlIGNoZWNrYm94IGlzIGNsaWNrZWQuXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgX29uSW5wdXRDbGljayhldmVudDogRXZlbnQpIHtcbiAgICAvLyBXZSBoYXZlIHRvIHN0b3AgcHJvcGFnYXRpb24gZm9yIGNsaWNrIGV2ZW50cyBvbiB0aGUgdmlzdWFsIGhpZGRlbiBpbnB1dCBlbGVtZW50LlxuICAgIC8vIEJ5IGRlZmF1bHQsIHdoZW4gYSB1c2VyIGNsaWNrcyBvbiBhIGxhYmVsIGVsZW1lbnQsIGEgZ2VuZXJhdGVkIGNsaWNrIGV2ZW50IHdpbGwgYmVcbiAgICAvLyBkaXNwYXRjaGVkIG9uIHRoZSBhc3NvY2lhdGVkIGlucHV0IGVsZW1lbnQuIFNpbmNlIHdlIGFyZSB1c2luZyBhIGxhYmVsIGVsZW1lbnQgYXMgb3VyXG4gICAgLy8gcm9vdCBjb250YWluZXIsIHRoZSBjbGljayBldmVudCBvbiB0aGUgYGNoZWNrYm94YCB3aWxsIGJlIGV4ZWN1dGVkIHR3aWNlLlxuICAgIC8vIFRoZSByZWFsIGNsaWNrIGV2ZW50IHdpbGwgYnViYmxlIHVwLCBhbmQgdGhlIGdlbmVyYXRlZCBjbGljayBldmVudCBhbHNvIHRyaWVzIHRvIGJ1YmJsZSB1cC5cbiAgICAvLyBUaGlzIHdpbGwgbGVhZCB0byBtdWx0aXBsZSBjbGljayBldmVudHMuXG4gICAgLy8gUHJldmVudGluZyBidWJibGluZyBmb3IgdGhlIHNlY29uZCBldmVudCB3aWxsIHNvbHZlIHRoYXQgaXNzdWUuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAvLyBXaGVuIHVzZXIgbWFudWFsbHkgY2xpY2sgb24gdGhlIGNoZWNrYm94LCBgaW5kZXRlcm1pbmF0ZWAgaXMgc2V0IHRvIGZhbHNlLlxuICAgICAgaWYgKHRoaXMuaW5kZXRlcm1pbmF0ZSkge1xuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLl9pbmRldGVybWluYXRlID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5pbmRldGVybWluYXRlQ2hhbmdlLmVtaXQodGhpcy5faW5kZXRlcm1pbmF0ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICAgIC8vIEVtaXQgb3VyIGN1c3RvbSBjaGFuZ2UgZXZlbnQgaWYgdGhlIG5hdGl2ZSBpbnB1dCBlbWl0dGVkIG9uZS5cbiAgICAgIC8vIEl0IGlzIGltcG9ydGFudCB0byBvbmx5IGVtaXQgaXQsIGlmIHRoZSBuYXRpdmUgaW5wdXQgdHJpZ2dlcmVkIG9uZSwgYmVjYXVzZVxuICAgICAgLy8gd2UgZG9uJ3Qgd2FudCB0byB0cmlnZ2VyIGEgY2hhbmdlIGV2ZW50LCB3aGVuIHRoZSBgY2hlY2tlZGAgdmFyaWFibGUgY2hhbmdlcyBmb3IgZXhhbXBsZS5cbiAgICAgIHRoaXMuX2VtaXRDaGFuZ2VFdmVudCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBGb2N1c2VzIHRoZSBjaGVja2JveC4gKi9cbiAgZm9jdXMob3JpZ2luPzogRm9jdXNPcmlnaW4sIG9wdGlvbnM/OiBGb2N1c09wdGlvbnMpOiB2b2lkIHtcbiAgICBpZiAob3JpZ2luKSB7XG4gICAgICB0aGlzLl9mb2N1c01vbml0b3IuZm9jdXNWaWEodGhpcy5faW5wdXRFbGVtZW50LCBvcmlnaW4sIG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cyhvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBfb25JbnRlcmFjdGlvbkV2ZW50KGV2ZW50OiBFdmVudCkge1xuICAgIC8vIFdlIGFsd2F5cyBoYXZlIHRvIHN0b3AgcHJvcGFnYXRpb24gb24gdGhlIGNoYW5nZSBldmVudC5cbiAgICAvLyBPdGhlcndpc2UgdGhlIGNoYW5nZSBldmVudCwgZnJvbSB0aGUgaW5wdXQgZWxlbWVudCwgd2lsbCBidWJibGUgdXAgYW5kXG4gICAgLy8gZW1pdCBpdHMgZXZlbnQgb2JqZWN0IHRvIHRoZSBgY2hhbmdlYCBvdXRwdXQuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBwcml2YXRlIF9zeW5jSW5kZXRlcm1pbmF0ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIGNvbnN0IG5hdGl2ZUNoZWNrYm94ID0gdGhpcy5faW5wdXRFbGVtZW50O1xuICAgIGlmIChuYXRpdmVDaGVja2JveCkge1xuICAgICAgbmF0aXZlQ2hlY2tib3gubmF0aXZlRWxlbWVudC5pbmRldGVybWluYXRlID0gdmFsdWU7XG4gICAgfVxuICB9XG59XG4iXX0=