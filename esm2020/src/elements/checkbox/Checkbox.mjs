import { __decorate, __metadata } from "tslib";
// NG2
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Attribute, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BooleanInput } from '../../utils';
// APP
import { Helpers } from '../../utils/Helpers';
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
NovoCheckboxElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCheckboxElement, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.FocusMonitor }, { token: 'tabindex', attribute: true }], target: i0.ɵɵFactoryTarget.Component });
NovoCheckboxElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoCheckboxElement, selector: "novo-checkbox", inputs: { ariaLabel: ["aria-label", "ariaLabel"], ariaLabelledby: ["aria-labelledby", "ariaLabelledby"], ariaDescribedby: ["aria-describedby", "ariaDescribedby"], id: "id", name: "name", label: "label", disabled: "disabled", layoutOptions: "layoutOptions", color: "color", value: "value", tabIndex: "tabIndex", required: "required", checked: "checked", indeterminate: "indeterminate" }, outputs: { change: "change", indeterminateChange: "indeterminateChange", onSelect: "onSelect" }, host: { properties: { "class.has-label": "label" }, classAttribute: "novo-checkbox" }, providers: [CHECKBOX_VALUE_ACCESSOR], viewQueries: [{ propertyName: "_inputElement", first: true, predicate: ["input"], descendants: true }], ngImport: i0, template: `
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
  `, isInline: true, styles: [":host{display:flex;flex-flow:row wrap}:host.has-label [class*=-group]{margin-right:15px}:host .novo-checkbox-text{margin-left:15px}:host .novo-checkbox-group{cursor:pointer;position:relative}:host .novo-checkbox-group:hover:not(.disabled) label i.bhi-checkbox-empty,:host .novo-checkbox-group:hover:not(.disabled) label i.bhi-radio-empty{color:#4a89dc}:host .novo-checkbox-group.checked label{color:#393939}:host .novo-checkbox-group.checked label i{-webkit-animation:iconEnter .16s ease-in-out;animation:iconEnter .16s ease-in-out}:host .novo-checkbox-group.disabled{pointer-events:auto}:host .novo-checkbox-group.disabled label{cursor:not-allowed;opacity:.4}:host .novo-checkbox-group input[type=checkbox]{-webkit-appearance:none!important;-moz-appearance:none!important;appearance:none!important;height:0!important;border:none!important;position:absolute}:host .novo-checkbox-group input[type=checkbox]:focus+label i.bhi-checkbox-empty,:host .novo-checkbox-group input[type=checkbox]:focus+label i.bhi-checkbox-filled{color:#4a89dc}:host .novo-checkbox-group label{color:#868686;margin-left:0;cursor:pointer;transition:all .2s ease-in-out;display:flex;align-items:baseline}:host .novo-checkbox-group label i{margin-right:5px;transition:all .2s ease-in-out}:host .novo-checkbox-group label i.bhi-checkbox-empty,:host .novo-checkbox-group label i.bhi-radio-empty,:host .novo-checkbox-group label i.bhi-circle-o{color:#d2d2d2}:host .novo-checkbox-group label i.bhi-check{background:#d2d2d2;color:#fff;padding:.15em 0 0 .3em;font-size:1em;width:20px;height:20px;border-radius:50%}:host .novo-checkbox-group label i.bhi-checkbox-filled,:host .novo-checkbox-group label i.bhi-radio-filled{color:#4a89dc}:host .novo-checkbox-group label span{display:inline-block}\n"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCheckboxElement, decorators: [{
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
                    }, styles: [":host{display:flex;flex-flow:row wrap}:host.has-label [class*=-group]{margin-right:15px}:host .novo-checkbox-text{margin-left:15px}:host .novo-checkbox-group{cursor:pointer;position:relative}:host .novo-checkbox-group:hover:not(.disabled) label i.bhi-checkbox-empty,:host .novo-checkbox-group:hover:not(.disabled) label i.bhi-radio-empty{color:#4a89dc}:host .novo-checkbox-group.checked label{color:#393939}:host .novo-checkbox-group.checked label i{-webkit-animation:iconEnter .16s ease-in-out;animation:iconEnter .16s ease-in-out}:host .novo-checkbox-group.disabled{pointer-events:auto}:host .novo-checkbox-group.disabled label{cursor:not-allowed;opacity:.4}:host .novo-checkbox-group input[type=checkbox]{-webkit-appearance:none!important;-moz-appearance:none!important;appearance:none!important;height:0!important;border:none!important;position:absolute}:host .novo-checkbox-group input[type=checkbox]:focus+label i.bhi-checkbox-empty,:host .novo-checkbox-group input[type=checkbox]:focus+label i.bhi-checkbox-filled{color:#4a89dc}:host .novo-checkbox-group label{color:#868686;margin-left:0;cursor:pointer;transition:all .2s ease-in-out;display:flex;align-items:baseline}:host .novo-checkbox-group label i{margin-right:5px;transition:all .2s ease-in-out}:host .novo-checkbox-group label i.bhi-checkbox-empty,:host .novo-checkbox-group label i.bhi-radio-empty,:host .novo-checkbox-group label i.bhi-circle-o{color:#d2d2d2}:host .novo-checkbox-group label i.bhi-check{background:#d2d2d2;color:#fff;padding:.15em 0 0 .3em;font-size:1em;width:20px;height:20px;border-radius:50%}:host .novo-checkbox-group label i.bhi-checkbox-filled,:host .novo-checkbox-group label i.bhi-radio-filled{color:#4a89dc}:host .novo-checkbox-group label span{display:inline-block}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2tib3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9jaGVja2JveC9DaGVja2JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0wsU0FBUyxFQUNULGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDM0MsTUFBTTtBQUNOLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7OztBQUU5QyxzREFBc0Q7QUFDdEQsTUFBTSx1QkFBdUIsR0FBRztJQUM5QixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUM7SUFDbEQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBRUYsbURBQW1EO0FBQ25ELE1BQU0sT0FBTyxrQkFBa0I7Q0FLOUI7QUFFRCxNQUFNLGVBQWUsR0FBRyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUM3QyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUEyQ2YsTUFBTSxPQUFPLG1CQUFtQjtJQWtGOUIsWUFBb0IsSUFBdUIsRUFBVSxhQUEyQixFQUF5QixRQUFnQjtRQUFyRyxTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUFVLGtCQUFhLEdBQWIs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QVM7dUJBQUMsT0FBTztnQkFHQyxNQUFNO3NCQUF4QixNQUFNO2dCQUdZLG1CQUFtQjtzQkFBckMsTUFBTTtnQkFFRyxRQUFRO3NCQUFqQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBGb2N1c01vbml0b3IsIEZvY3VzT3JpZ2luIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIEF0dHJpYnV0ZSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICcuLi8uLi91dGlscyc7XG4vLyBBUFBcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICcuLi8uLi91dGlscy9IZWxwZXJzJztcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG5jb25zdCBDSEVDS0JPWF9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9DaGVja2JveEVsZW1lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbi8qKiBDaGFuZ2UgZXZlbnQgb2JqZWN0IGVtaXR0ZWQgYnkgTm92b0NoZWNrYm94LiAqL1xuZXhwb3J0IGNsYXNzIE5vdm9DaGVja2JveENoYW5nZSB7XG4gIC8qKiBUaGUgc291cmNlIE5vdm9DaGVja2JveCBvZiB0aGUgZXZlbnQuICovXG4gIHNvdXJjZTogTm92b0NoZWNrYm94RWxlbWVudDtcbiAgLyoqIFRoZSBuZXcgYGNoZWNrZWRgIHZhbHVlIG9mIHRoZSBjaGVja2JveC4gKi9cbiAgY2hlY2tlZDogYm9vbGVhbjtcbn1cblxuY29uc3QgTEFZT1VUX0RFRkFVTFRTID0geyBpY29uU3R5bGU6ICdib3gnIH07XG5sZXQgbmV4dElkID0gMDtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tY2hlY2tib3gnLFxuICBwcm92aWRlcnM6IFtDSEVDS0JPWF9WQUxVRV9BQ0NFU1NPUl0sXG4gIHN0eWxlVXJsczogWycuL0NoZWNrYm94LnNjc3MnXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwibm92by1jaGVja2JveC1ncm91cFwiIFtjbGFzcy5jaGVja2VkXT1cImNoZWNrZWRcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgIDxpbnB1dFxuICAgICAgICAjaW5wdXRcbiAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgW3JlcXVpcmVkXT1cIl9yZXF1aXJlZFwiXG4gICAgICAgIFtjaGVja2VkXT1cImNoZWNrZWRcIlxuICAgICAgICBbaWRdPVwiaWRcIlxuICAgICAgICBbYXR0ci5uYW1lXT1cIm5hbWVcIlxuICAgICAgICBbYXR0ci52YWx1ZV09XCJ2YWx1ZVwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgIFt0YWJJbmRleF09XCJ0YWJJbmRleFwiXG4gICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsIHx8IG51bGxcIlxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkYnlcIlxuICAgICAgICBbYXR0ci5hcmlhLWNoZWNrZWRdPVwiX2dldEFyaWFDaGVja2VkKClcIlxuICAgICAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cImFyaWFEZXNjcmliZWRieVwiXG4gICAgICAgIChjaGFuZ2UpPVwiX29uSW50ZXJhY3Rpb25FdmVudCgkZXZlbnQpXCJcbiAgICAgICAgKGNsaWNrKT1cIl9vbklucHV0Q2xpY2soJGV2ZW50KVwiXG4gICAgICAvPlxuICAgICAgPGxhYmVsIFthdHRyLmZvcl09XCJuYW1lXCIgKGNsaWNrKT1cInNlbGVjdCgkZXZlbnQpXCIgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgICAgIDxpXG4gICAgICAgICAgW2NsYXNzLmJoaS1jaGVja2JveC1lbXB0eV09XCIhY2hlY2tlZCAmJiAhaW5kZXRlcm1pbmF0ZSAmJiBib3hJY29uXCJcbiAgICAgICAgICBbY2xhc3MuYmhpLWNoZWNrYm94LWZpbGxlZF09XCJjaGVja2VkICYmICFpbmRldGVybWluYXRlICYmIGJveEljb25cIlxuICAgICAgICAgIFtjbGFzcy5iaGktY2hlY2tib3gtaW5kZXRlcm1pbmF0ZV09XCJpbmRldGVybWluYXRlICYmIGJveEljb25cIlxuICAgICAgICAgIFtjbGFzcy5iaGktY2lyY2xlLW9dPVwiIWNoZWNrZWQgJiYgIWluZGV0ZXJtaW5hdGUgJiYgIWJveEljb25cIlxuICAgICAgICAgIFtjbGFzcy5iaGktY2hlY2tdPVwiY2hlY2tlZCAmJiAhaW5kZXRlcm1pbmF0ZSAmJiAhYm94SWNvblwiXG4gICAgICAgICAgW2NsYXNzLmJoaS1jaXJjbGVdPVwiaW5kZXRlcm1pbmF0ZSAmJiAhYm94SWNvblwiXG4gICAgICAgID48L2k+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwibGFiZWxcIj57eyBsYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCIhbGFiZWxcIiBjbGFzcz1cIm5vdm8tY2hlY2tib3gtdGV4dFwiPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L3NwYW4+XG4gICAgICA8L2xhYmVsPlxuICAgIDwvZGl2PlxuICBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWNoZWNrYm94JyxcbiAgICAnW2NsYXNzLmhhcy1sYWJlbF0nOiAnbGFiZWwnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQ2hlY2tib3hFbGVtZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XG4gIC8qKlxuICAgKiBBdHRhY2hlZCB0byB0aGUgYXJpYS1sYWJlbCBhdHRyaWJ1dGUgb2YgdGhlIGhvc3QgZWxlbWVudC4gSW4gbW9zdCBjYXNlcywgYXJpYS1sYWJlbGxlZGJ5IHdpbGxcbiAgICogdGFrZSBwcmVjZWRlbmNlIHNvIHRoaXMgbWF5IGJlIG9taXR0ZWQuXG4gICAqL1xuICBASW5wdXQoJ2FyaWEtbGFiZWwnKSBhcmlhTGFiZWw6IHN0cmluZyA9ICcnO1xuXG4gIC8qKlxuICAgKiBVc2VycyBjYW4gc3BlY2lmeSB0aGUgYGFyaWEtbGFiZWxsZWRieWAgYXR0cmlidXRlIHdoaWNoIHdpbGwgYmUgZm9yd2FyZGVkIHRvIHRoZSBpbnB1dCBlbGVtZW50XG4gICAqL1xuICBASW5wdXQoJ2FyaWEtbGFiZWxsZWRieScpIGFyaWFMYWJlbGxlZGJ5OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAvKiogVGhlICdhcmlhLWRlc2NyaWJlZGJ5JyBhdHRyaWJ1dGUgaXMgcmVhZCBhZnRlciB0aGUgZWxlbWVudCdzIGxhYmVsIGFuZCBmaWVsZCB0eXBlLiAqL1xuICBASW5wdXQoJ2FyaWEtZGVzY3JpYmVkYnknKSBhcmlhRGVzY3JpYmVkYnk6IHN0cmluZztcblxuICBwcml2YXRlIF91bmlxdWVJZDogc3RyaW5nID0gYG5vdm8tY2hlY2tib3gtJHsrK25leHRJZH1gO1xuICBib3hJY29uOiBib29sZWFuID0gdHJ1ZTtcblxuICBASW5wdXQoKSBpZDogc3RyaW5nID0gdGhpcy5fdW5pcXVlSWQ7XG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZyA9IHRoaXMuX3VuaXF1ZUlkO1xuICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBsYXlvdXRPcHRpb25zOiB7IGljb25TdHlsZT86IHN0cmluZyB9OyAvLyBUT0RPIC0gYXZvaWQgY29uZmlncyBsaWtlIHRoaXNcbiAgQElucHV0KCkgY29sb3I6IHN0cmluZztcbiAgLyoqIFRoZSB2YWx1ZSBhdHRyaWJ1dGUgb2YgdGhlIG5hdGl2ZSBpbnB1dCBlbGVtZW50ICovXG4gIEBJbnB1dCgpIHZhbHVlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRhYkluZGV4OiBudW1iZXI7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNoZWNrYm94IGlzIHJlcXVpcmVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVpcmVkO1xuICB9XG4gIHNldCByZXF1aXJlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBfcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNoZWNrYm94IGlzIGNoZWNrZWQuICovXG4gIEBCb29sZWFuSW5wdXQoKVxuICBASW5wdXQoKVxuICBnZXQgY2hlY2tlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY2hlY2tlZDtcbiAgfVxuICBzZXQgY2hlY2tlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5jaGVja2VkKSB7XG4gICAgICB0aGlzLl9jaGVja2VkID0gdmFsdWU7XG4gICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG4gIF9jaGVja2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQEJvb2xlYW5JbnB1dCgpXG4gIEBJbnB1dCgpXG4gIGdldCBpbmRldGVybWluYXRlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pbmRldGVybWluYXRlO1xuICB9XG4gIHNldCBpbmRldGVybWluYXRlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgY29uc3QgY2hhbmdlZCA9IHZhbHVlICE9PSB0aGlzLl9pbmRldGVybWluYXRlO1xuICAgIHRoaXMuX2luZGV0ZXJtaW5hdGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICB0aGlzLmluZGV0ZXJtaW5hdGVDaGFuZ2UuZW1pdCh0aGlzLl9pbmRldGVybWluYXRlKTtcbiAgICB9XG4gICAgdGhpcy5fc3luY0luZGV0ZXJtaW5hdGUodGhpcy5faW5kZXRlcm1pbmF0ZSk7XG4gIH1cbiAgX2luZGV0ZXJtaW5hdGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogVGhlIG5hdGl2ZSBgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiPmAgZWxlbWVudCAqL1xuICBAVmlld0NoaWxkKCdpbnB1dCcpIF9pbnB1dEVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD47XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgY2hlY2tib3gncyBgY2hlY2tlZGAgdmFsdWUgY2hhbmdlcy4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGNoYW5nZTogRXZlbnRFbWl0dGVyPE5vdm9DaGVja2JveENoYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE5vdm9DaGVja2JveENoYW5nZT4oKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBjaGVja2JveCdzIGBpbmRldGVybWluYXRlYCB2YWx1ZSBjaGFuZ2VzLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgaW5kZXRlcm1pbmF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIEBPdXRwdXQoKSBvblNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIF9mb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvciwgQEF0dHJpYnV0ZSgndGFiaW5kZXgnKSB0YWJJbmRleDogc3RyaW5nKSB7XG4gICAgLy8gdGhpcy5jb2xvciA9IHRoaXMuZGVmYXVsdENvbG9yID0gdGhpcy5fb3B0aW9ucy5jb2xvciB8fCBkZWZhdWx0cy5jb2xvcjtcbiAgICB0aGlzLnRhYkluZGV4ID0gcGFyc2VJbnQodGFiSW5kZXgsIDEwKSB8fCAwO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5sYXlvdXRPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgTEFZT1VUX0RFRkFVTFRTLCB0aGlzLmxheW91dE9wdGlvbnMpO1xuICAgIHRoaXMuYm94SWNvbiA9IHRoaXMubGF5b3V0T3B0aW9ucy5pY29uU3R5bGUgPT09ICdib3gnO1xuICB9XG5cbiAgc2VsZWN0KGV2ZW50OiBFdmVudCkge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG4gICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5jaGVja2VkKTtcbiAgICAgIHRoaXMub25TZWxlY3QuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCB2YWx1ZTogdGhpcy5jaGVja2VkIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMuY2hlY2tlZCA9ICEhdmFsdWU7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShkaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgfVxuXG4gIF9nZXRBcmlhQ2hlY2tlZCgpOiAndHJ1ZScgfCAnZmFsc2UnIHwgJ21peGVkJyB7XG4gICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgcmV0dXJuICd0cnVlJztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5pbmRldGVybWluYXRlID8gJ21peGVkJyA6ICdmYWxzZSc7XG4gIH1cblxuICBwcml2YXRlIF9lbWl0Q2hhbmdlRXZlbnQoKSB7XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgTm92b0NoZWNrYm94Q2hhbmdlKCk7XG4gICAgZXZlbnQuc291cmNlID0gdGhpcztcbiAgICBldmVudC5jaGVja2VkID0gdGhpcy5jaGVja2VkO1xuXG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMuY2hlY2tlZCk7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdChldmVudCk7XG5cbiAgICAvLyBBc3NpZ25pbmcgdGhlIHZhbHVlIGFnYWluIGhlcmUgaXMgcmVkdW5kYW50LCBidXQgd2UgaGF2ZSB0byBkbyBpdCBpbiBjYXNlIGl0IHdhc1xuICAgIC8vIGNoYW5nZWQgaW5zaWRlIHRoZSBgY2hhbmdlYCBsaXN0ZW5lciB3aGljaCB3aWxsIGNhdXNlIHRoZSBpbnB1dCB0byBiZSBvdXQgb2Ygc3luYy5cbiAgICBpZiAodGhpcy5faW5wdXRFbGVtZW50KSB7XG4gICAgICB0aGlzLl9pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5jaGVja2VkID0gdGhpcy5jaGVja2VkO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBUb2dnbGVzIHRoZSBgY2hlY2tlZGAgc3RhdGUgb2YgdGhlIGNoZWNrYm94LiAqL1xuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgdGhpcy5jaGVja2VkID0gIXRoaXMuY2hlY2tlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIGZvciBjaGVja2JveCBpbnB1dCBlbGVtZW50LlxuICAgKiBUb2dnbGVzIGNoZWNrZWQgc3RhdGUgaWYgZWxlbWVudCBpcyBub3QgZGlzYWJsZWQuXG4gICAqIERvIG5vdCB0b2dnbGUgb24gKGNoYW5nZSkgZXZlbnQgc2luY2UgSUUgZG9lc24ndCBmaXJlIGNoYW5nZSBldmVudCB3aGVuXG4gICAqICAgaW5kZXRlcm1pbmF0ZSBjaGVja2JveCBpcyBjbGlja2VkLlxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIF9vbklucHV0Q2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgLy8gV2UgaGF2ZSB0byBzdG9wIHByb3BhZ2F0aW9uIGZvciBjbGljayBldmVudHMgb24gdGhlIHZpc3VhbCBoaWRkZW4gaW5wdXQgZWxlbWVudC5cbiAgICAvLyBCeSBkZWZhdWx0LCB3aGVuIGEgdXNlciBjbGlja3Mgb24gYSBsYWJlbCBlbGVtZW50LCBhIGdlbmVyYXRlZCBjbGljayBldmVudCB3aWxsIGJlXG4gICAgLy8gZGlzcGF0Y2hlZCBvbiB0aGUgYXNzb2NpYXRlZCBpbnB1dCBlbGVtZW50LiBTaW5jZSB3ZSBhcmUgdXNpbmcgYSBsYWJlbCBlbGVtZW50IGFzIG91clxuICAgIC8vIHJvb3QgY29udGFpbmVyLCB0aGUgY2xpY2sgZXZlbnQgb24gdGhlIGBjaGVja2JveGAgd2lsbCBiZSBleGVjdXRlZCB0d2ljZS5cbiAgICAvLyBUaGUgcmVhbCBjbGljayBldmVudCB3aWxsIGJ1YmJsZSB1cCwgYW5kIHRoZSBnZW5lcmF0ZWQgY2xpY2sgZXZlbnQgYWxzbyB0cmllcyB0byBidWJibGUgdXAuXG4gICAgLy8gVGhpcyB3aWxsIGxlYWQgdG8gbXVsdGlwbGUgY2xpY2sgZXZlbnRzLlxuICAgIC8vIFByZXZlbnRpbmcgYnViYmxpbmcgZm9yIHRoZSBzZWNvbmQgZXZlbnQgd2lsbCBzb2x2ZSB0aGF0IGlzc3VlLlxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgLy8gV2hlbiB1c2VyIG1hbnVhbGx5IGNsaWNrIG9uIHRoZSBjaGVja2JveCwgYGluZGV0ZXJtaW5hdGVgIGlzIHNldCB0byBmYWxzZS5cbiAgICAgIGlmICh0aGlzLmluZGV0ZXJtaW5hdGUpIHtcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5faW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuaW5kZXRlcm1pbmF0ZUNoYW5nZS5lbWl0KHRoaXMuX2luZGV0ZXJtaW5hdGUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgICAvLyBFbWl0IG91ciBjdXN0b20gY2hhbmdlIGV2ZW50IGlmIHRoZSBuYXRpdmUgaW5wdXQgZW1pdHRlZCBvbmUuXG4gICAgICAvLyBJdCBpcyBpbXBvcnRhbnQgdG8gb25seSBlbWl0IGl0LCBpZiB0aGUgbmF0aXZlIGlucHV0IHRyaWdnZXJlZCBvbmUsIGJlY2F1c2VcbiAgICAgIC8vIHdlIGRvbid0IHdhbnQgdG8gdHJpZ2dlciBhIGNoYW5nZSBldmVudCwgd2hlbiB0aGUgYGNoZWNrZWRgIHZhcmlhYmxlIGNoYW5nZXMgZm9yIGV4YW1wbGUuXG4gICAgICB0aGlzLl9lbWl0Q2hhbmdlRXZlbnQoKTtcbiAgICB9XG4gIH1cblxuICAvKiogRm9jdXNlcyB0aGUgY2hlY2tib3guICovXG4gIGZvY3VzKG9yaWdpbj86IEZvY3VzT3JpZ2luLCBvcHRpb25zPzogRm9jdXNPcHRpb25zKTogdm9pZCB7XG4gICAgaWYgKG9yaWdpbikge1xuICAgICAgdGhpcy5fZm9jdXNNb25pdG9yLmZvY3VzVmlhKHRoaXMuX2lucHV0RWxlbWVudCwgb3JpZ2luLCBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMob3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgX29uSW50ZXJhY3Rpb25FdmVudChldmVudDogRXZlbnQpIHtcbiAgICAvLyBXZSBhbHdheXMgaGF2ZSB0byBzdG9wIHByb3BhZ2F0aW9uIG9uIHRoZSBjaGFuZ2UgZXZlbnQuXG4gICAgLy8gT3RoZXJ3aXNlIHRoZSBjaGFuZ2UgZXZlbnQsIGZyb20gdGhlIGlucHV0IGVsZW1lbnQsIHdpbGwgYnViYmxlIHVwIGFuZFxuICAgIC8vIGVtaXQgaXRzIGV2ZW50IG9iamVjdCB0byB0aGUgYGNoYW5nZWAgb3V0cHV0LlxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3luY0luZGV0ZXJtaW5hdGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBjb25zdCBuYXRpdmVDaGVja2JveCA9IHRoaXMuX2lucHV0RWxlbWVudDtcbiAgICBpZiAobmF0aXZlQ2hlY2tib3gpIHtcbiAgICAgIG5hdGl2ZUNoZWNrYm94Lm5hdGl2ZUVsZW1lbnQuaW5kZXRlcm1pbmF0ZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxufVxuIl19