// NG2
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, HostBinding, Inject, Input, Optional, Output, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NOVO_RADIO_GROUP } from './tokens';
// make radio-buttons ids unique
let nextId = 0;
// Value accessor for the component (supports ngModel)
const RADIO_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoRadioElement),
    multi: true,
};
export class NovoRadioElement {
    constructor(radioGroup, ref) {
        this.radioGroup = radioGroup;
        this.ref = ref;
        this._uniqueId = `novo-radio-${++nextId}`;
        this.id = this._uniqueId;
        this.name = this._uniqueId;
        this.tabindex = 0;
        this.vertical = false;
        this.button = false;
        this.theme = 'secondary';
        this.change = new EventEmitter();
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this._checked = false;
        this._value = false;
        this._disabled = false;
        this.onChangeCallback = (_) => {
            // placeholder
        };
        this.onTouchedCallback = () => {
            // placeholder
        };
        this.radioGroup = radioGroup;
    }
    get checked() {
        return this._checked;
    }
    set checked(value) {
        value = !!value;
        if (this._checked !== value) {
            this._checked = value;
            if (this._checked && this.radioGroup && this.radioGroup.value !== this.value) {
                this.radioGroup.value = this.value;
            }
            this.onChangeCallback(this._value);
        }
    }
    get value() {
        return this._value;
    }
    set value(value) {
        if (this.value !== value) {
            this._value = value;
            if (this.radioGroup) {
                this._checked = this.radioGroup.value === this.value;
            }
            this.onChangeCallback(this._value);
        }
    }
    // Disabled State
    get disabled() {
        return this._disabled || (this.radioGroup != null && this.radioGroup.disabled);
    }
    set disabled(value) {
        this._disabled = !!value;
    }
    ngOnInit() {
        if (this.radioGroup) {
            this.checked = this.radioGroup.value === this._value;
            this.vertical = this.radioGroup.appearance === 'vertical';
            this.name = this.radioGroup.name;
        }
    }
    _onInputChange(event) {
        event.stopPropagation();
        this.change.emit(event);
        this.checked = true;
        if (this.radioGroup) {
            this.radioGroup.value = this.value;
        }
    }
    writeValue(value) {
        this.value = value;
        this.ref.markForCheck();
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
    }
}
NovoRadioElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-radio',
                providers: [RADIO_VALUE_ACCESSOR],
                template: `
    <input
      type="radio"
      [id]="id"
      [name]="name"
      [checked]="checked"
      [tabIndex]="tabindex"
      [disabled]="disabled"
      (focus)="focus.emit($event)"
      (blur)="blur.emit($event)"
      (change)="_onInputChange($event)"
    />
    <label [attr.for]="id" [class.disabled]="disabled">
      <novo-button
        *ngIf="button"
        [ngClass]="{ unchecked: !checked, checked: checked, 'has-icon': !!icon }"
        [theme]="theme"
        [color]="checked ? color : null"
        [icon]="icon"
        [size]="size"
      >
        {{ label }}
      </novo-button>
      <div *ngIf="!button" class="novo-radio-button-label">
        <i [ngClass]="{ 'bhi-radio-empty': !checked, 'bhi-radio-filled': checked }"></i>
        {{ label }}
        <ng-content></ng-content>
      </div>
    </label>
  `,
                host: {
                    '[class.vertical]': 'vertical',
                }
            },] }
];
NovoRadioElement.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [NOVO_RADIO_GROUP,] }, { type: Optional }] },
    { type: ChangeDetectorRef }
];
NovoRadioElement.propDecorators = {
    id: [{ type: Input }],
    name: [{ type: Input }],
    tabindex: [{ type: Input }],
    vertical: [{ type: Input }],
    label: [{ type: Input }],
    button: [{ type: Input }],
    theme: [{ type: Input }],
    size: [{ type: Input }],
    icon: [{ type: Input }],
    color: [{ type: Input }],
    change: [{ type: Output }],
    blur: [{ type: Output }],
    focus: [{ type: Output }],
    checked: [{ type: Input }],
    value: [{ type: Input }],
    disabled: [{ type: Input }, { type: HostBinding, args: ['class.disabled',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFkaW8uanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvcmFkaW8vUmFkaW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsV0FBVyxFQUNYLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGdCQUFnQixFQUFjLE1BQU0sVUFBVSxDQUFDO0FBRXhELGdDQUFnQztBQUNoQyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFFZixzREFBc0Q7QUFDdEQsTUFBTSxvQkFBb0IsR0FBRztJQUMzQixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7SUFDL0MsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBdUNGLE1BQU0sT0FBTyxnQkFBZ0I7SUFrRTNCLFlBQXlELFVBQXNCLEVBQVUsR0FBc0I7UUFBdEQsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBakV2RyxjQUFTLEdBQVcsY0FBYyxFQUFFLE1BQU0sRUFBRSxDQUFDO1FBQzVDLE9BQUUsR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzVCLFNBQUksR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzlCLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFHOUIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUkxQixXQUFNLEdBQVksS0FBSyxDQUFDO1FBRXhCLFVBQUssR0FB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QUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDcEM7SUFDSCxDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQVU7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsRUFBTztRQUN0QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxFQUFPO1FBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQVVELGdCQUFnQixDQUFDLFFBQWlCO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzNCLENBQUM7OztZQXJKRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLFNBQVMsRUFBRSxDQUFDLG9CQUFvQixDQUFDO2dCQUNqQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJUO2dCQUNELElBQUksRUFBRTtvQkFDSixrQkFBa0IsRUFBRSxVQUFVO2lCQUMvQjthQUNGOzs7NENBbUVjLE1BQU0sU0FBQyxnQkFBZ0IsY0FBRyxRQUFRO1lBL0gvQyxpQkFBaUI7OztpQkErRGhCLEtBQUs7bUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3VCQUVMLEtBQUs7b0JBRUwsS0FBSztxQkFFTCxLQUFLO29CQUVMLEtBQUs7bUJBRUwsS0FBSzttQkFFTCxLQUFLO29CQUVMLEtBQUs7cUJBR0wsTUFBTTttQkFDTixNQUFNO29CQUNOLE1BQU07c0JBTU4sS0FBSztvQkFlTCxLQUFLO3VCQWFMLEtBQUssWUFDTCxXQUFXLFNBQUMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTk9WT19SQURJT19HUk9VUCwgUmFkaW9Hcm91cCB9IGZyb20gJy4vdG9rZW5zJztcblxuLy8gbWFrZSByYWRpby1idXR0b25zIGlkcyB1bmlxdWVcbmxldCBuZXh0SWQgPSAwO1xuXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcbmNvbnN0IFJBRElPX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b1JhZGlvRWxlbWVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1yYWRpbycsXG4gIHByb3ZpZGVyczogW1JBRElPX1ZBTFVFX0FDQ0VTU09SXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aW5wdXRcbiAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICBbaWRdPVwiaWRcIlxuICAgICAgW25hbWVdPVwibmFtZVwiXG4gICAgICBbY2hlY2tlZF09XCJjaGVja2VkXCJcbiAgICAgIFt0YWJJbmRleF09XCJ0YWJpbmRleFwiXG4gICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgKGZvY3VzKT1cImZvY3VzLmVtaXQoJGV2ZW50KVwiXG4gICAgICAoYmx1cik9XCJibHVyLmVtaXQoJGV2ZW50KVwiXG4gICAgICAoY2hhbmdlKT1cIl9vbklucHV0Q2hhbmdlKCRldmVudClcIlxuICAgIC8+XG4gICAgPGxhYmVsIFthdHRyLmZvcl09XCJpZFwiIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuICAgICAgPG5vdm8tYnV0dG9uXG4gICAgICAgICpuZ0lmPVwiYnV0dG9uXCJcbiAgICAgICAgW25nQ2xhc3NdPVwieyB1bmNoZWNrZWQ6ICFjaGVja2VkLCBjaGVja2VkOiBjaGVja2VkLCAnaGFzLWljb24nOiAhIWljb24gfVwiXG4gICAgICAgIFt0aGVtZV09XCJ0aGVtZVwiXG4gICAgICAgIFtjb2xvcl09XCJjaGVja2VkID8gY29sb3IgOiBudWxsXCJcbiAgICAgICAgW2ljb25dPVwiaWNvblwiXG4gICAgICAgIFtzaXplXT1cInNpemVcIlxuICAgICAgPlxuICAgICAgICB7eyBsYWJlbCB9fVxuICAgICAgPC9ub3ZvLWJ1dHRvbj5cbiAgICAgIDxkaXYgKm5nSWY9XCIhYnV0dG9uXCIgY2xhc3M9XCJub3ZvLXJhZGlvLWJ1dHRvbi1sYWJlbFwiPlxuICAgICAgICA8aSBbbmdDbGFzc109XCJ7ICdiaGktcmFkaW8tZW1wdHknOiAhY2hlY2tlZCwgJ2JoaS1yYWRpby1maWxsZWQnOiBjaGVja2VkIH1cIj48L2k+XG4gICAgICAgIHt7IGxhYmVsIH19XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbGFiZWw+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLnZlcnRpY2FsXSc6ICd2ZXJ0aWNhbCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9SYWRpb0VsZW1lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0IHtcbiAgcHJpdmF0ZSBfdW5pcXVlSWQ6IHN0cmluZyA9IGBub3ZvLXJhZGlvLSR7KytuZXh0SWR9YDtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IHRoaXMuX3VuaXF1ZUlkO1xuICBASW5wdXQoKSBuYW1lOiBzdHJpbmcgPSB0aGlzLl91bmlxdWVJZDtcbiAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciA9IDA7XG5cbiAgQElucHV0KClcbiAgdmVydGljYWw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgbGFiZWw6IHN0cmluZztcbiAgQElucHV0KClcbiAgYnV0dG9uOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIHRoZW1lOiBzdHJpbmcgPSAnc2Vjb25kYXJ5JztcbiAgQElucHV0KClcbiAgc2l6ZTogc3RyaW5nO1xuICBASW5wdXQoKVxuICBpY29uOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIGNvbG9yOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGJsdXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBmb2N1cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIF9jaGVja2VkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX3ZhbHVlOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgZ2V0IGNoZWNrZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoZWNrZWQ7XG4gIH1cblxuICBzZXQgY2hlY2tlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHZhbHVlID0gISF2YWx1ZTtcbiAgICBpZiAodGhpcy5fY2hlY2tlZCAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX2NoZWNrZWQgPSB2YWx1ZTtcbiAgICAgIGlmICh0aGlzLl9jaGVja2VkICYmIHRoaXMucmFkaW9Hcm91cCAmJiB0aGlzLnJhZGlvR3JvdXAudmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgICAgdGhpcy5yYWRpb0dyb3VwLnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLl92YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgZ2V0IHZhbHVlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICBpZiAodGhpcy52YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5yYWRpb0dyb3VwKSB7XG4gICAgICAgIHRoaXMuX2NoZWNrZWQgPSB0aGlzLnJhZGlvR3JvdXAudmFsdWUgPT09IHRoaXMudmFsdWU7XG4gICAgICB9XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgfVxuICAvLyBEaXNhYmxlZCBTdGF0ZVxuICBASW5wdXQoKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmRpc2FibGVkJylcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZCB8fCAodGhpcy5yYWRpb0dyb3VwICE9IG51bGwgJiYgdGhpcy5yYWRpb0dyb3VwLmRpc2FibGVkKTtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9ICEhdmFsdWU7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KE5PVk9fUkFESU9fR1JPVVApIEBPcHRpb25hbCgpIHB1YmxpYyByYWRpb0dyb3VwOiBSYWRpb0dyb3VwLCBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLnJhZGlvR3JvdXAgPSByYWRpb0dyb3VwO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMucmFkaW9Hcm91cCkge1xuICAgICAgdGhpcy5jaGVja2VkID0gdGhpcy5yYWRpb0dyb3VwLnZhbHVlID09PSB0aGlzLl92YWx1ZTtcbiAgICAgIHRoaXMudmVydGljYWwgPSB0aGlzLnJhZGlvR3JvdXAuYXBwZWFyYW5jZSA9PT0gJ3ZlcnRpY2FsJztcbiAgICAgIHRoaXMubmFtZSA9IHRoaXMucmFkaW9Hcm91cC5uYW1lO1xuICAgIH1cbiAgfVxuXG4gIF9vbklucHV0Q2hhbmdlKGV2ZW50OiBFdmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuY2hhbmdlLmVtaXQoZXZlbnQpO1xuXG4gICAgdGhpcy5jaGVja2VkID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLnJhZGlvR3JvdXApIHtcbiAgICAgIHRoaXMucmFkaW9Hcm91cC52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrID0gKF86IGFueSkgPT4ge1xuICAgIC8vIHBsYWNlaG9sZGVyXG4gIH07XG5cbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjayA9ICgpID0+IHtcbiAgICAvLyBwbGFjZWhvbGRlclxuICB9O1xuXG4gIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gIH1cbn1cbiJdfQ==