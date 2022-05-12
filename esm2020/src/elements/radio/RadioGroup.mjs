import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ContentChildren, EventEmitter, forwardRef, HostBinding, Input, Output, QueryList, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErrorStateMatcher, mixinErrorState } from '../common';
import { NovoFieldControl } from '../field';
import { NovoRadioElement } from './Radio';
import { NOVO_RADIO_GROUP } from './tokens';
import * as i0 from "@angular/core";
// make radio-button-group ids unique
let nextId = 0;
// Value accessor for the component (supports ngModel)
const RADIOGROUP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoRadioGroup),
    multi: true,
};
// Boilerplate for applying mixins
class NovoRadioGroupBase {
    constructor(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) {
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
    }
}
const NovoRadioGroupMixins = mixinErrorState(NovoRadioGroupBase);
export class NovoRadioGroup extends NovoRadioGroupMixins {
    constructor() {
        super(...arguments);
        this._uniqueId = `novo-radio-group-${++nextId}`;
        /** Tab index for the chip list. */
        this._tabIndex = 0;
        /** User defined tab index. */
        this._userTabIndex = null;
        this.controlType = 'radio-group';
        /** @docs-private Implemented as part of NovoFieldControl. */
        this.lastKeyValue = null;
        this.id = this._uniqueId;
        this.tabindex = 0;
        this.change = new EventEmitter();
        this.blur = new EventEmitter();
        this._name = this._uniqueId;
        this._value = false;
        this._required = false;
        this._disabled = false;
        this._appearance = 'horizontal';
        this.onChangeCallback = (_) => {
            // placeholder
        };
        this.onTouchedCallback = () => {
            // placeholder
        };
    }
    get appearance() {
        return this._appearance;
    }
    set appearance(value) {
        if (this._appearance !== value) {
            this._appearance = value;
            this._updateRadioButtonAppearance();
        }
    }
    get value() {
        return this._value;
    }
    set value(value) {
        if (this._value !== value) {
            this._value = value;
            this._updateSelectedRadioFromValue();
            this.onChangeCallback(this._value);
        }
    }
    get name() {
        return this._name;
    }
    set name(value) {
        if (this._name !== value) {
            this._updateRadioButtonNames();
        }
    }
    get disabled() {
        return this.ngControl ? !!this.ngControl.disabled : this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        this._updateRadioButtonDisabled();
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    /** Implemented as part of NovoFieldControl. */
    get placeholder() {
        return this._placeholder;
    }
    set placeholder(value) {
        this._placeholder = value;
    }
    get selected() {
        return this._selected;
    }
    ngAfterContentInit() {
        this._updateRadioButtonAppearance();
        this._updateRadioButtonNames();
        this._updateSelectedRadioFromValue();
    }
    writeValue(value) {
        this.value = value;
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    _updateRadioButtonAppearance() {
        if (this._radios) {
            this._radios.forEach((radio) => {
                radio.vertical = this.appearance === 'vertical';
            });
        }
    }
    _updateRadioButtonNames() {
        if (this._radios) {
            this._radios.forEach((radio) => {
                radio.name = this.name;
            });
        }
    }
    _updateRadioButtonDisabled() {
        if (this._radios) {
            this._radios.forEach((radio) => {
                radio.disabled = this.disabled;
            });
        }
    }
    _updateSelectedRadioFromValue() {
        if (this._radios) {
            this._radios.forEach((radio) => {
                radio.checked = this.value === radio.value;
                if (radio.checked) {
                    this._selected = radio;
                }
            });
        }
    }
    /** Whether any radio buttons has focus. */
    get focused() {
        // todo: implement this.
        return false;
    }
    /** Implemented as part of NovoFieldControl. */
    get empty() {
        return this.value === null;
    }
    /** Implemented as part of NovoFieldControl. */
    get shouldLabelFloat() {
        return !this.empty || this.focused;
    }
    /** Implemented as part of NovoFieldControl. */
    setDescribedByIds(ids) {
        this._ariaDescribedby = ids.join(' ');
    }
    /** Implemented as part of NovoFieldControl. */
    onContainerClick(event) {
        this.focus();
    }
    /**
     * Focuses the first non-disabled chip in this chip list, or the associated input when there
     * are no eligible chips.
     */
    focus(options) {
        if (this.disabled) {
            return;
        }
        // TODO
    }
}
NovoRadioGroup.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoRadioGroup, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoRadioGroup.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoRadioGroup, selector: "novo-radio-group", inputs: { id: "id", tabindex: "tabindex", errorStateMatcher: "errorStateMatcher", appearance: "appearance", value: "value", name: "name", disabled: "disabled", required: "required", placeholder: "placeholder" }, outputs: { change: "change", blur: "blur" }, host: { properties: { "class.novo-radio-group-appearance-horizontal": "appearance==\"horizontal\"", "class.novo-radio-group-appearance-vertical": "appearance==\"vertical\"", "class.disabled": "this.disabled" }, classAttribute: "novo-radio-group" }, providers: [
        RADIOGROUP_VALUE_ACCESSOR,
        { provide: NOVO_RADIO_GROUP, useExisting: NovoRadioGroup },
        { provide: NovoFieldControl, useExisting: NovoRadioGroup },
    ], queries: [{ propertyName: "_radios", predicate: i0.forwardRef(function () { return NovoRadioElement; }), descendants: true }], usesInheritance: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoRadioGroup, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-radio-group',
                    providers: [
                        RADIOGROUP_VALUE_ACCESSOR,
                        { provide: NOVO_RADIO_GROUP, useExisting: NovoRadioGroup },
                        { provide: NovoFieldControl, useExisting: NovoRadioGroup },
                    ],
                    template: '<ng-content></ng-content>',
                    host: {
                        class: 'novo-radio-group',
                        '[class.novo-radio-group-appearance-horizontal]': 'appearance=="horizontal"',
                        '[class.novo-radio-group-appearance-vertical]': 'appearance=="vertical"',
                    },
                }]
        }], propDecorators: { id: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], errorStateMatcher: [{
                type: Input
            }], change: [{
                type: Output
            }], blur: [{
                type: Output
            }], _radios: [{
                type: ContentChildren,
                args: [forwardRef(() => NovoRadioElement), { descendants: true }]
            }], appearance: [{
                type: Input
            }], value: [{
                type: Input
            }], name: [{
                type: Input
            }], disabled: [{
                type: HostBinding,
                args: ['class.disabled']
            }, {
                type: Input
            }], required: [{
                type: Input
            }], placeholder: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFkaW9Hcm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3JhZGlvL1JhZGlvR3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUVMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsWUFBWSxFQUNaLFVBQVUsRUFDVixXQUFXLEVBQ1gsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUErRCxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hILE9BQU8sRUFBMkIsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sVUFBVSxDQUFDOztBQUU1QyxxQ0FBcUM7QUFDckMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ2Ysc0RBQXNEO0FBQ3RELE1BQU0seUJBQXlCLEdBQUc7SUFDaEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQztJQUM3QyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFFRixrQ0FBa0M7QUFDbEMsTUFBTSxrQkFBa0I7SUFDdEIsWUFDUyx5QkFBNEMsRUFDNUMsV0FBbUIsRUFDbkIsZ0JBQW9DLEVBQ3BDLFNBQW9CO1FBSHBCLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBbUI7UUFDNUMsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFDbkIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFvQjtRQUNwQyxjQUFTLEdBQVQsU0FBUyxDQUFXO0lBQzFCLENBQUM7Q0FDTDtBQUNELE1BQU0sb0JBQW9CLEdBQXdELGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBZ0J0SCxNQUFNLE9BQU8sY0FBZSxTQUFRLG9CQUFvQjtJQWR4RDs7UUFlVSxjQUFTLEdBQVcsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLENBQUM7UUFHM0QsbUNBQW1DO1FBQ25DLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCw4QkFBOEI7UUFDOUIsa0JBQWEsR0FBa0IsSUFBSSxDQUFDO1FBSTNCLGdCQUFXLEdBQVcsYUFBYSxDQUFDO1FBQzdDLDZEQUE2RDtRQUM3RCxpQkFBWSxHQUFXLElBQUksQ0FBQztRQUluQixPQUFFLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUM1QixhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBSXBCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBNkUxQixVQUFLLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMvQixXQUFNLEdBQVksS0FBSyxDQUFDO1FBRXhCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixnQkFBVyxHQUE4QixZQUFZLENBQUM7UUFvQnhELHFCQUFnQixHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUU7WUFDcEMsY0FBYztRQUNoQixDQUFDLENBQUM7UUFFTSxzQkFBaUIsR0FBRyxHQUFHLEVBQUU7WUFDL0IsY0FBYztRQUNoQixDQUFDLENBQUM7S0F5RUg7SUFoTEMsSUFDSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLFVBQVUsQ0FBQyxLQUFLO1FBQ2xCLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxLQUFLLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLDRCQUE0QixFQUFFLENBQUM7U0FDckM7SUFDSCxDQUFDO0lBRUQsSUFBYSxLQUFLO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBSSxLQUFLLENBQUMsS0FBSztRQUNiLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxLQUFLLEVBQUU7WUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNwQztJQUNILENBQUM7SUFFRCxJQUNJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVELElBQUksSUFBSSxDQUFDLEtBQWE7UUFDcEIsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRTtZQUN4QixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztTQUNoQztJQUNILENBQUM7SUFFRCxJQUVJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUNyRSxDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUNJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCwrQ0FBK0M7SUFDL0MsSUFDSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFDRCxJQUFJLFdBQVcsQ0FBQyxLQUFhO1FBQzNCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQVVELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQVU7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQU87UUFDdEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBTztRQUN2QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFVTyw0QkFBNEI7UUFDbEMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQzdCLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFTyx1QkFBdUI7UUFDN0IsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQzdCLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVPLDBCQUEwQjtRQUNoQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDN0IsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRU8sNkJBQTZCO1FBQ25DLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUM3QixLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLEtBQUssQ0FBQztnQkFDM0MsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO29CQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztpQkFDeEI7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVELDJDQUEyQztJQUMzQyxJQUFJLE9BQU87UUFDVCx3QkFBd0I7UUFDeEIsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsK0NBQStDO0lBQy9DLElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUVELCtDQUErQztJQUMvQyxJQUFJLGdCQUFnQjtRQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3JDLENBQUM7SUFFRCwrQ0FBK0M7SUFDL0MsaUJBQWlCLENBQUMsR0FBYTtRQUM3QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsK0NBQStDO0lBQy9DLGdCQUFnQixDQUFDLEtBQWlCO1FBQ2hDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsT0FBc0I7UUFDMUIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUNELE9BQU87SUFDVCxDQUFDOzsyR0E1TVUsY0FBYzsrRkFBZCxjQUFjLHFpQkFaZDtRQUNULHlCQUF5QjtRQUN6QixFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFO1FBQzFELEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUU7S0FDM0QscUZBa0NpQyxnQkFBZ0IsMkVBakN4QywyQkFBMkI7MkZBTzFCLGNBQWM7a0JBZDFCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsU0FBUyxFQUFFO3dCQUNULHlCQUF5Qjt3QkFDekIsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxnQkFBZ0IsRUFBRTt3QkFDMUQsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxnQkFBZ0IsRUFBRTtxQkFDM0Q7b0JBQ0QsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxrQkFBa0I7d0JBQ3pCLGdEQUFnRCxFQUFFLDBCQUEwQjt3QkFDNUUsOENBQThDLEVBQUUsd0JBQXdCO3FCQUN6RTtpQkFDRjs4QkFrQlUsRUFBRTtzQkFBVixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRUcsaUJBQWlCO3NCQUF6QixLQUFLO2dCQUVJLE1BQU07c0JBQWYsTUFBTTtnQkFDRyxJQUFJO3NCQUFiLE1BQU07Z0JBSVAsT0FBTztzQkFETixlQUFlO3VCQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtnQkFJdEUsVUFBVTtzQkFEYixLQUFLO2dCQVlPLEtBQUs7c0JBQWpCLEtBQUs7Z0JBYUYsSUFBSTtzQkFEUCxLQUFLO2dCQWFGLFFBQVE7c0JBRlgsV0FBVzt1QkFBQyxnQkFBZ0I7O3NCQUM1QixLQUFLO2dCQWNGLFFBQVE7c0JBRFgsS0FBSztnQkFXRixXQUFXO3NCQURkLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IEZvY3VzS2V5TWFuYWdlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3JtR3JvdXBEaXJlY3RpdmUsIE5nQ29udHJvbCwgTmdGb3JtLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENhblVwZGF0ZUVycm9yU3RhdGVDdG9yLCBFcnJvclN0YXRlTWF0Y2hlciwgbWl4aW5FcnJvclN0YXRlIH0gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCB7IE5vdm9GaWVsZENvbnRyb2wgfSBmcm9tICcuLi9maWVsZCc7XG5pbXBvcnQgeyBOb3ZvUmFkaW9FbGVtZW50IH0gZnJvbSAnLi9SYWRpbyc7XG5pbXBvcnQgeyBOT1ZPX1JBRElPX0dST1VQIH0gZnJvbSAnLi90b2tlbnMnO1xuXG4vLyBtYWtlIHJhZGlvLWJ1dHRvbi1ncm91cCBpZHMgdW5pcXVlXG5sZXQgbmV4dElkID0gMDtcbi8vIFZhbHVlIGFjY2Vzc29yIGZvciB0aGUgY29tcG9uZW50IChzdXBwb3J0cyBuZ01vZGVsKVxuY29uc3QgUkFESU9HUk9VUF9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9SYWRpb0dyb3VwKSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zXG5jbGFzcyBOb3ZvUmFkaW9Hcm91cEJhc2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgX2RlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgcHVibGljIF9wYXJlbnRGb3JtOiBOZ0Zvcm0sXG4gICAgcHVibGljIF9wYXJlbnRGb3JtR3JvdXA6IEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgICBwdWJsaWMgbmdDb250cm9sOiBOZ0NvbnRyb2wsXG4gICkge31cbn1cbmNvbnN0IE5vdm9SYWRpb0dyb3VwTWl4aW5zOiBDYW5VcGRhdGVFcnJvclN0YXRlQ3RvciAmIHR5cGVvZiBOb3ZvUmFkaW9Hcm91cEJhc2UgPSBtaXhpbkVycm9yU3RhdGUoTm92b1JhZGlvR3JvdXBCYXNlKTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1yYWRpby1ncm91cCcsXG4gIHByb3ZpZGVyczogW1xuICAgIFJBRElPR1JPVVBfVkFMVUVfQUNDRVNTT1IsXG4gICAgeyBwcm92aWRlOiBOT1ZPX1JBRElPX0dST1VQLCB1c2VFeGlzdGluZzogTm92b1JhZGlvR3JvdXAgfSxcbiAgICB7IHByb3ZpZGU6IE5vdm9GaWVsZENvbnRyb2wsIHVzZUV4aXN0aW5nOiBOb3ZvUmFkaW9Hcm91cCB9LFxuICBdLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLXJhZGlvLWdyb3VwJyxcbiAgICAnW2NsYXNzLm5vdm8tcmFkaW8tZ3JvdXAtYXBwZWFyYW5jZS1ob3Jpem9udGFsXSc6ICdhcHBlYXJhbmNlPT1cImhvcml6b250YWxcIicsXG4gICAgJ1tjbGFzcy5ub3ZvLXJhZGlvLWdyb3VwLWFwcGVhcmFuY2UtdmVydGljYWxdJzogJ2FwcGVhcmFuY2U9PVwidmVydGljYWxcIicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9SYWRpb0dyb3VwIGV4dGVuZHMgTm92b1JhZGlvR3JvdXBNaXhpbnMgaW1wbGVtZW50cyBOb3ZvRmllbGRDb250cm9sPGFueT4sIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlckNvbnRlbnRJbml0IHtcbiAgcHJpdmF0ZSBfdW5pcXVlSWQ6IHN0cmluZyA9IGBub3ZvLXJhZGlvLWdyb3VwLSR7KytuZXh0SWR9YDtcbiAgLyoqIFRoZSBhcmlhLWRlc2NyaWJlZGJ5IGF0dHJpYnV0ZSBvbiB0aGUgY2hpcCBsaXN0IGZvciBpbXByb3ZlZCBhMTF5LiAqL1xuICBfYXJpYURlc2NyaWJlZGJ5OiBzdHJpbmc7XG4gIC8qKiBUYWIgaW5kZXggZm9yIHRoZSBjaGlwIGxpc3QuICovXG4gIF90YWJJbmRleCA9IDA7XG4gIC8qKiBVc2VyIGRlZmluZWQgdGFiIGluZGV4LiAqL1xuICBfdXNlclRhYkluZGV4OiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgLyoqIFRoZSBGb2N1c0tleU1hbmFnZXIgd2hpY2ggaGFuZGxlcyBmb2N1cy4gKi9cbiAgX2tleU1hbmFnZXI6IEZvY3VzS2V5TWFuYWdlcjxOb3ZvUmFkaW9FbGVtZW50PjtcblxuICByZWFkb25seSBjb250cm9sVHlwZTogc3RyaW5nID0gJ3JhZGlvLWdyb3VwJztcbiAgLyoqIEBkb2NzLXByaXZhdGUgSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLiAqL1xuICBsYXN0S2V5VmFsdWU6IHN0cmluZyA9IG51bGw7XG4gIC8qKiBAZG9jcy1wcml2YXRlIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTm92b0ZpZWxkQ29udHJvbC4qL1xuICBsYXN0Q2FyZXRQb3NpdGlvbjogbnVtYmVyIHwgbnVsbDtcblxuICBASW5wdXQoKSBpZDogc3RyaW5nID0gdGhpcy5fdW5pcXVlSWQ7XG4gIEBJbnB1dCgpIHRhYmluZGV4OiBudW1iZXIgPSAwO1xuICAvKiogQW4gb2JqZWN0IHVzZWQgdG8gY29udHJvbCB3aGVuIGVycm9yIG1lc3NhZ2VzIGFyZSBzaG93bi4gKi9cbiAgQElucHV0KCkgZXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyO1xuXG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBibHVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAvLyBAT3V0cHV0KCkgZm9jdXNlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAQ29udGVudENoaWxkcmVuKGZvcndhcmRSZWYoKCkgPT4gTm92b1JhZGlvRWxlbWVudCksIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgX3JhZGlvczogUXVlcnlMaXN0PE5vdm9SYWRpb0VsZW1lbnQ+O1xuXG4gIEBJbnB1dCgpXG4gIGdldCBhcHBlYXJhbmNlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2FwcGVhcmFuY2U7XG4gIH1cblxuICBzZXQgYXBwZWFyYW5jZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLl9hcHBlYXJhbmNlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fYXBwZWFyYW5jZSA9IHZhbHVlO1xuICAgICAgdGhpcy5fdXBkYXRlUmFkaW9CdXR0b25BcHBlYXJhbmNlKCk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuX3ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX3VwZGF0ZVNlbGVjdGVkUmFkaW9Gcm9tVmFsdWUoKTtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLl92YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KClcbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuXG4gIHNldCBuYW1lKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fbmFtZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX3VwZGF0ZVJhZGlvQnV0dG9uTmFtZXMoKTtcbiAgICB9XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmRpc2FibGVkJylcbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm5nQ29udHJvbCA/ICEhdGhpcy5uZ0NvbnRyb2wuZGlzYWJsZWQgOiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgdGhpcy5fdXBkYXRlUmFkaW9CdXR0b25EaXNhYmxlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTm92b0ZpZWxkQ29udHJvbC5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZXF1aXJlZDtcbiAgfVxuICBzZXQgcmVxdWlyZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZXF1aXJlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG5cbiAgLyoqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTm92b0ZpZWxkQ29udHJvbC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHBsYWNlaG9sZGVyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3BsYWNlaG9sZGVyO1xuICB9XG4gIHNldCBwbGFjZWhvbGRlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fcGxhY2Vob2xkZXIgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBzZWxlY3RlZCgpOiBOb3ZvUmFkaW9FbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25hbWU6IHN0cmluZyA9IHRoaXMuX3VuaXF1ZUlkO1xuICBwcm90ZWN0ZWQgX3ZhbHVlOiBib29sZWFuID0gZmFsc2U7XG4gIHByb3RlY3RlZCBfc2VsZWN0ZWQ6IE5vdm9SYWRpb0VsZW1lbnQ7XG4gIHByb3RlY3RlZCBfcmVxdWlyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJvdGVjdGVkIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcm90ZWN0ZWQgX3BsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHByb3RlY3RlZCBfYXBwZWFyYW5jZTogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICdob3Jpem9udGFsJztcblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5fdXBkYXRlUmFkaW9CdXR0b25BcHBlYXJhbmNlKCk7XG4gICAgdGhpcy5fdXBkYXRlUmFkaW9CdXR0b25OYW1lcygpO1xuICAgIHRoaXMuX3VwZGF0ZVNlbGVjdGVkUmFkaW9Gcm9tVmFsdWUoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjayA9IChfOiBhbnkpID0+IHtcbiAgICAvLyBwbGFjZWhvbGRlclxuICB9O1xuXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgLy8gcGxhY2Vob2xkZXJcbiAgfTtcblxuICBwcml2YXRlIF91cGRhdGVSYWRpb0J1dHRvbkFwcGVhcmFuY2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3JhZGlvcykge1xuICAgICAgdGhpcy5fcmFkaW9zLmZvckVhY2goKHJhZGlvKSA9PiB7XG4gICAgICAgIHJhZGlvLnZlcnRpY2FsID0gdGhpcy5hcHBlYXJhbmNlID09PSAndmVydGljYWwnO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlUmFkaW9CdXR0b25OYW1lcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcmFkaW9zKSB7XG4gICAgICB0aGlzLl9yYWRpb3MuZm9yRWFjaCgocmFkaW8pID0+IHtcbiAgICAgICAgcmFkaW8ubmFtZSA9IHRoaXMubmFtZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVJhZGlvQnV0dG9uRGlzYWJsZWQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3JhZGlvcykge1xuICAgICAgdGhpcy5fcmFkaW9zLmZvckVhY2goKHJhZGlvKSA9PiB7XG4gICAgICAgIHJhZGlvLmRpc2FibGVkID0gdGhpcy5kaXNhYmxlZDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVNlbGVjdGVkUmFkaW9Gcm9tVmFsdWUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3JhZGlvcykge1xuICAgICAgdGhpcy5fcmFkaW9zLmZvckVhY2goKHJhZGlvKSA9PiB7XG4gICAgICAgIHJhZGlvLmNoZWNrZWQgPSB0aGlzLnZhbHVlID09PSByYWRpby52YWx1ZTtcbiAgICAgICAgaWYgKHJhZGlvLmNoZWNrZWQpIHtcbiAgICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHJhZGlvO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKiogV2hldGhlciBhbnkgcmFkaW8gYnV0dG9ucyBoYXMgZm9jdXMuICovXG4gIGdldCBmb2N1c2VkKCk6IGJvb2xlYW4ge1xuICAgIC8vIHRvZG86IGltcGxlbWVudCB0aGlzLlxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuICovXG4gIGdldCBlbXB0eSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZSA9PT0gbnVsbDtcbiAgfVxuXG4gIC8qKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuICovXG4gIGdldCBzaG91bGRMYWJlbEZsb2F0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5lbXB0eSB8fCB0aGlzLmZvY3VzZWQ7XG4gIH1cblxuICAvKiogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLiAqL1xuICBzZXREZXNjcmliZWRCeUlkcyhpZHM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5fYXJpYURlc2NyaWJlZGJ5ID0gaWRzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIC8qKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuICovXG4gIG9uQ29udGFpbmVyQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLmZvY3VzKCk7XG4gIH1cblxuICAvKipcbiAgICogRm9jdXNlcyB0aGUgZmlyc3Qgbm9uLWRpc2FibGVkIGNoaXAgaW4gdGhpcyBjaGlwIGxpc3QsIG9yIHRoZSBhc3NvY2lhdGVkIGlucHV0IHdoZW4gdGhlcmVcbiAgICogYXJlIG5vIGVsaWdpYmxlIGNoaXBzLlxuICAgKi9cbiAgZm9jdXMob3B0aW9ucz86IEZvY3VzT3B0aW9ucyk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIFRPRE9cbiAgfVxufVxuIl19