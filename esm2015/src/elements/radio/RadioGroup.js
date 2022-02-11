import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ContentChildren, EventEmitter, forwardRef, HostBinding, Input, Output, QueryList, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErrorStateMatcher, mixinErrorState } from '../common';
import { NovoFieldControl } from '../field';
import { NovoRadioElement } from './Radio';
import { NOVO_RADIO_GROUP } from './tokens';
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
NovoRadioGroup.decorators = [
    { type: Component, args: [{
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
                }
            },] }
];
NovoRadioGroup.propDecorators = {
    id: [{ type: Input }],
    tabindex: [{ type: Input }],
    errorStateMatcher: [{ type: Input }],
    change: [{ type: Output }],
    blur: [{ type: Output }],
    _radios: [{ type: ContentChildren, args: [forwardRef(() => NovoRadioElement), { descendants: true },] }],
    appearance: [{ type: Input }],
    value: [{ type: Input }],
    name: [{ type: Input }],
    disabled: [{ type: HostBinding, args: ['class.disabled',] }, { type: Input }],
    required: [{ type: Input }],
    placeholder: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFkaW9Hcm91cC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9yYWRpby9SYWRpb0dyb3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFFTCxTQUFTLEVBQ1QsZUFBZSxFQUNmLFlBQVksRUFDWixVQUFVLEVBQ1YsV0FBVyxFQUNYLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBK0QsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoSCxPQUFPLEVBQTJCLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN4RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDNUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUU1QyxxQ0FBcUM7QUFDckMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ2Ysc0RBQXNEO0FBQ3RELE1BQU0seUJBQXlCLEdBQUc7SUFDaEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQztJQUM3QyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFFRixrQ0FBa0M7QUFDbEMsTUFBTSxrQkFBa0I7SUFDdEIsWUFDUyx5QkFBNEMsRUFDNUMsV0FBbUIsRUFDbkIsZ0JBQW9DLEVBQ3BDLFNBQW9CO1FBSHBCLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBbUI7UUFDNUMsZ0JBQVcsR0FBWCxXQUFXLENB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LENBQUMsS0FBaUI7UUFDaEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxPQUFzQjtRQUMxQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTztTQUNSO1FBQ0QsT0FBTztJQUNULENBQUM7OztZQTFORixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsU0FBUyxFQUFFO29CQUNULHlCQUF5QjtvQkFDekIsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRTtvQkFDMUQsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRTtpQkFDM0Q7Z0JBQ0QsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxrQkFBa0I7b0JBQ3pCLGdEQUFnRCxFQUFFLDBCQUEwQjtvQkFDNUUsOENBQThDLEVBQUUsd0JBQXdCO2lCQUN6RTthQUNGOzs7aUJBa0JFLEtBQUs7dUJBQ0wsS0FBSztnQ0FFTCxLQUFLO3FCQUVMLE1BQU07bUJBQ04sTUFBTTtzQkFHTixlQUFlLFNBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO3lCQUd6RSxLQUFLO29CQVlMLEtBQUs7bUJBWUwsS0FBSzt1QkFXTCxXQUFXLFNBQUMsZ0JBQWdCLGNBQzVCLEtBQUs7dUJBYUwsS0FBSzswQkFVTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBGb2N1c0tleU1hbmFnZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgRm9ybUdyb3VwRGlyZWN0aXZlLCBOZ0NvbnRyb2wsIE5nRm9ybSwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDYW5VcGRhdGVFcnJvclN0YXRlQ3RvciwgRXJyb3JTdGF0ZU1hdGNoZXIsIG1peGluRXJyb3JTdGF0ZSB9IGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgeyBOb3ZvRmllbGRDb250cm9sIH0gZnJvbSAnLi4vZmllbGQnO1xuaW1wb3J0IHsgTm92b1JhZGlvRWxlbWVudCB9IGZyb20gJy4vUmFkaW8nO1xuaW1wb3J0IHsgTk9WT19SQURJT19HUk9VUCB9IGZyb20gJy4vdG9rZW5zJztcblxuLy8gbWFrZSByYWRpby1idXR0b24tZ3JvdXAgaWRzIHVuaXF1ZVxubGV0IG5leHRJZCA9IDA7XG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcbmNvbnN0IFJBRElPR1JPVVBfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvUmFkaW9Hcm91cCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGluc1xuY2xhc3MgTm92b1JhZGlvR3JvdXBCYXNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIF9kZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyLFxuICAgIHB1YmxpYyBfcGFyZW50Rm9ybTogTmdGb3JtLFxuICAgIHB1YmxpYyBfcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgcHVibGljIG5nQ29udHJvbDogTmdDb250cm9sLFxuICApIHt9XG59XG5jb25zdCBOb3ZvUmFkaW9Hcm91cE1peGluczogQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IgJiB0eXBlb2YgTm92b1JhZGlvR3JvdXBCYXNlID0gbWl4aW5FcnJvclN0YXRlKE5vdm9SYWRpb0dyb3VwQmFzZSk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tcmFkaW8tZ3JvdXAnLFxuICBwcm92aWRlcnM6IFtcbiAgICBSQURJT0dST1VQX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHsgcHJvdmlkZTogTk9WT19SQURJT19HUk9VUCwgdXNlRXhpc3Rpbmc6IE5vdm9SYWRpb0dyb3VwIH0sXG4gICAgeyBwcm92aWRlOiBOb3ZvRmllbGRDb250cm9sLCB1c2VFeGlzdGluZzogTm92b1JhZGlvR3JvdXAgfSxcbiAgXSxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1yYWRpby1ncm91cCcsXG4gICAgJ1tjbGFzcy5ub3ZvLXJhZGlvLWdyb3VwLWFwcGVhcmFuY2UtaG9yaXpvbnRhbF0nOiAnYXBwZWFyYW5jZT09XCJob3Jpem9udGFsXCInLFxuICAgICdbY2xhc3Mubm92by1yYWRpby1ncm91cC1hcHBlYXJhbmNlLXZlcnRpY2FsXSc6ICdhcHBlYXJhbmNlPT1cInZlcnRpY2FsXCInLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvUmFkaW9Hcm91cCBleHRlbmRzIE5vdm9SYWRpb0dyb3VwTWl4aW5zIGltcGxlbWVudHMgTm92b0ZpZWxkQ29udHJvbDxhbnk+LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIHByaXZhdGUgX3VuaXF1ZUlkOiBzdHJpbmcgPSBgbm92by1yYWRpby1ncm91cC0keysrbmV4dElkfWA7XG4gIC8qKiBUaGUgYXJpYS1kZXNjcmliZWRieSBhdHRyaWJ1dGUgb24gdGhlIGNoaXAgbGlzdCBmb3IgaW1wcm92ZWQgYTExeS4gKi9cbiAgX2FyaWFEZXNjcmliZWRieTogc3RyaW5nO1xuICAvKiogVGFiIGluZGV4IGZvciB0aGUgY2hpcCBsaXN0LiAqL1xuICBfdGFiSW5kZXggPSAwO1xuICAvKiogVXNlciBkZWZpbmVkIHRhYiBpbmRleC4gKi9cbiAgX3VzZXJUYWJJbmRleDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIC8qKiBUaGUgRm9jdXNLZXlNYW5hZ2VyIHdoaWNoIGhhbmRsZXMgZm9jdXMuICovXG4gIF9rZXlNYW5hZ2VyOiBGb2N1c0tleU1hbmFnZXI8Tm92b1JhZGlvRWxlbWVudD47XG5cbiAgcmVhZG9ubHkgY29udHJvbFR5cGU6IHN0cmluZyA9ICdyYWRpby1ncm91cCc7XG4gIC8qKiBAZG9jcy1wcml2YXRlIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTm92b0ZpZWxkQ29udHJvbC4gKi9cbiAgbGFzdEtleVZhbHVlOiBzdHJpbmcgPSBudWxsO1xuICAvKiogQGRvY3MtcHJpdmF0ZSBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuKi9cbiAgbGFzdENhcmV0UG9zaXRpb246IG51bWJlciB8IG51bGw7XG5cbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IHRoaXMuX3VuaXF1ZUlkO1xuICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyID0gMDtcbiAgLyoqIEFuIG9iamVjdCB1c2VkIHRvIGNvbnRyb2wgd2hlbiBlcnJvciBtZXNzYWdlcyBhcmUgc2hvd24uICovXG4gIEBJbnB1dCgpIGVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcjtcblxuICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYmx1ciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLy8gQE91dHB1dCgpIGZvY3VzZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihmb3J3YXJkUmVmKCgpID0+IE5vdm9SYWRpb0VsZW1lbnQpLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pXG4gIF9yYWRpb3M6IFF1ZXJ5TGlzdDxOb3ZvUmFkaW9FbGVtZW50PjtcblxuICBASW5wdXQoKVxuICBnZXQgYXBwZWFyYW5jZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9hcHBlYXJhbmNlO1xuICB9XG5cbiAgc2V0IGFwcGVhcmFuY2UodmFsdWUpIHtcbiAgICBpZiAodGhpcy5fYXBwZWFyYW5jZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX2FwcGVhcmFuY2UgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX3VwZGF0ZVJhZGlvQnV0dG9uQXBwZWFyYW5jZSgpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLl92YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLl91cGRhdGVTZWxlY3RlZFJhZGlvRnJvbVZhbHVlKCk7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cblxuICBzZXQgbmFtZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX25hbWUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl91cGRhdGVSYWRpb0J1dHRvbk5hbWVzKCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kaXNhYmxlZCcpXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5uZ0NvbnRyb2wgPyAhIXRoaXMubmdDb250cm9sLmRpc2FibGVkIDogdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIHRoaXMuX3VwZGF0ZVJhZGlvQnV0dG9uRGlzYWJsZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCByZXF1aXJlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7XG4gIH1cbiAgc2V0IHJlcXVpcmVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVxdWlyZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgfVxuXG4gIC8qKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuICovXG4gIEBJbnB1dCgpXG4gIGdldCBwbGFjZWhvbGRlcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9wbGFjZWhvbGRlcjtcbiAgfVxuICBzZXQgcGxhY2Vob2xkZXIodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gdmFsdWU7XG4gIH1cblxuICBnZXQgc2VsZWN0ZWQoKTogTm92b1JhZGlvRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uYW1lOiBzdHJpbmcgPSB0aGlzLl91bmlxdWVJZDtcbiAgcHJvdGVjdGVkIF92YWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwcm90ZWN0ZWQgX3NlbGVjdGVkOiBOb3ZvUmFkaW9FbGVtZW50O1xuICBwcm90ZWN0ZWQgX3JlcXVpcmVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByb3RlY3RlZCBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJvdGVjdGVkIF9wbGFjZWhvbGRlcjogc3RyaW5nO1xuICBwcm90ZWN0ZWQgX2FwcGVhcmFuY2U6ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcgPSAnaG9yaXpvbnRhbCc7XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX3VwZGF0ZVJhZGlvQnV0dG9uQXBwZWFyYW5jZSgpO1xuICAgIHRoaXMuX3VwZGF0ZVJhZGlvQnV0dG9uTmFtZXMoKTtcbiAgICB0aGlzLl91cGRhdGVTZWxlY3RlZFJhZGlvRnJvbVZhbHVlKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2sgPSAoXzogYW55KSA9PiB7XG4gICAgLy8gcGxhY2Vob2xkZXJcbiAgfTtcblxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrID0gKCkgPT4ge1xuICAgIC8vIHBsYWNlaG9sZGVyXG4gIH07XG5cbiAgcHJpdmF0ZSBfdXBkYXRlUmFkaW9CdXR0b25BcHBlYXJhbmNlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9yYWRpb3MpIHtcbiAgICAgIHRoaXMuX3JhZGlvcy5mb3JFYWNoKChyYWRpbykgPT4ge1xuICAgICAgICByYWRpby52ZXJ0aWNhbCA9IHRoaXMuYXBwZWFyYW5jZSA9PT0gJ3ZlcnRpY2FsJztcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVJhZGlvQnV0dG9uTmFtZXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3JhZGlvcykge1xuICAgICAgdGhpcy5fcmFkaW9zLmZvckVhY2goKHJhZGlvKSA9PiB7XG4gICAgICAgIHJhZGlvLm5hbWUgPSB0aGlzLm5hbWU7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVSYWRpb0J1dHRvbkRpc2FibGVkKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9yYWRpb3MpIHtcbiAgICAgIHRoaXMuX3JhZGlvcy5mb3JFYWNoKChyYWRpbykgPT4ge1xuICAgICAgICByYWRpby5kaXNhYmxlZCA9IHRoaXMuZGlzYWJsZWQ7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVTZWxlY3RlZFJhZGlvRnJvbVZhbHVlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9yYWRpb3MpIHtcbiAgICAgIHRoaXMuX3JhZGlvcy5mb3JFYWNoKChyYWRpbykgPT4ge1xuICAgICAgICByYWRpby5jaGVja2VkID0gdGhpcy52YWx1ZSA9PT0gcmFkaW8udmFsdWU7XG4gICAgICAgIGlmIChyYWRpby5jaGVja2VkKSB7XG4gICAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSByYWRpbztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFdoZXRoZXIgYW55IHJhZGlvIGJ1dHRvbnMgaGFzIGZvY3VzLiAqL1xuICBnZXQgZm9jdXNlZCgpOiBib29sZWFuIHtcbiAgICAvLyB0b2RvOiBpbXBsZW1lbnQgdGhpcy5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKiogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLiAqL1xuICBnZXQgZW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWUgPT09IG51bGw7XG4gIH1cblxuICAvKiogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLiAqL1xuICBnZXQgc2hvdWxkTGFiZWxGbG9hdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuZW1wdHkgfHwgdGhpcy5mb2N1c2VkO1xuICB9XG5cbiAgLyoqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTm92b0ZpZWxkQ29udHJvbC4gKi9cbiAgc2V0RGVzY3JpYmVkQnlJZHMoaWRzOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuX2FyaWFEZXNjcmliZWRieSA9IGlkcy5qb2luKCcgJyk7XG4gIH1cblxuICAvKiogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLiAqL1xuICBvbkNvbnRhaW5lckNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5mb2N1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzZXMgdGhlIGZpcnN0IG5vbi1kaXNhYmxlZCBjaGlwIGluIHRoaXMgY2hpcCBsaXN0LCBvciB0aGUgYXNzb2NpYXRlZCBpbnB1dCB3aGVuIHRoZXJlXG4gICAqIGFyZSBubyBlbGlnaWJsZSBjaGlwcy5cbiAgICovXG4gIGZvY3VzKG9wdGlvbnM/OiBGb2N1c09wdGlvbnMpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBUT0RPXG4gIH1cbn1cbiJdfQ==