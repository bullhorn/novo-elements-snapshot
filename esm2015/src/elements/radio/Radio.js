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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFkaW8uanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvcmFkaW8vUmFkaW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsV0FBVyxFQUNYLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGdCQUFnQixFQUFjLE1BQU0sVUFBVSxDQUFDO0FBRXhELGdDQUFnQztBQUNoQyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFFZixzREFBc0Q7QUFDdEQsTUFBTSxvQkFBb0IsR0FBRztJQUMzQixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7SUFDL0MsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBdUNGLE1BQU0sT0FBTyxnQkFBZ0I7SUFrRTNCLFlBQXlELFVBQXNCLEVBQVUsR0FBc0I7UUFBdEQsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBakV2RyxjQUFTLEdBQVcsY0FBYyxFQUFFLE1BQU0sRUFBRSxDQUFDO1FBQzVDLE9BQUUsR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzVCLFNBQUksR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzlCLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFPOUIsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUV4QixVQUFLLEdBQVcsV0FBVyxDQUFDO1FBUWxCLFdBQU0sR0FB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QUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQU87UUFDdEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBTztRQUN2QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFVRCxnQkFBZ0IsQ0FBQyxRQUFpQjtRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDOzs7WUFwSkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2dCQUN0QixTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztnQkFDakMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCVDtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osa0JBQWtCLEVBQUUsVUFBVTtpQkFDL0I7YUFDRjs7OzRDQW1FYyxNQUFNLFNBQUMsZ0JBQWdCLGNBQUcsUUFBUTtZQS9IL0MsaUJBQWlCOzs7aUJBK0RoQixLQUFLO21CQUNMLEtBQUs7dUJBQ0wsS0FBSzt1QkFFTCxLQUFLO29CQUVMLEtBQUs7cUJBRUwsS0FBSztvQkFFTCxLQUFLO21CQUVMLEtBQUs7bUJBRUwsS0FBSztvQkFFTCxLQUFLO3FCQUdMLE1BQU07bUJBQ04sTUFBTTtvQkFDTixNQUFNO3NCQU1OLEtBQUs7b0JBZUwsS0FBSzt1QkFhTCxLQUFLLFlBQ0wsV0FBVyxTQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5PVk9fUkFESU9fR1JPVVAsIFJhZGlvR3JvdXAgfSBmcm9tICcuL3Rva2Vucyc7XG5cbi8vIG1ha2UgcmFkaW8tYnV0dG9ucyBpZHMgdW5pcXVlXG5sZXQgbmV4dElkID0gMDtcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG5jb25zdCBSQURJT19WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9SYWRpb0VsZW1lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tcmFkaW8nLFxuICBwcm92aWRlcnM6IFtSQURJT19WQUxVRV9BQ0NFU1NPUl0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGlucHV0XG4gICAgICB0eXBlPVwicmFkaW9cIlxuICAgICAgW2lkXT1cImlkXCJcbiAgICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgICAgW2NoZWNrZWRdPVwiY2hlY2tlZFwiXG4gICAgICBbdGFiSW5kZXhdPVwidGFiaW5kZXhcIlxuICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgIChmb2N1cyk9XCJmb2N1cy5lbWl0KCRldmVudClcIlxuICAgICAgKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIlxuICAgICAgKGNoYW5nZSk9XCJfb25JbnB1dENoYW5nZSgkZXZlbnQpXCJcbiAgICAvPlxuICAgIDxsYWJlbCBbYXR0ci5mb3JdPVwiaWRcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgIDxub3ZvLWJ1dHRvblxuICAgICAgICAqbmdJZj1cImJ1dHRvblwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInsgdW5jaGVja2VkOiAhY2hlY2tlZCwgY2hlY2tlZDogY2hlY2tlZCwgJ2hhcy1pY29uJzogISFpY29uIH1cIlxuICAgICAgICBbdGhlbWVdPVwidGhlbWVcIlxuICAgICAgICBbY29sb3JdPVwiY2hlY2tlZCA/IGNvbG9yIDogbnVsbFwiXG4gICAgICAgIFtpY29uXT1cImljb25cIlxuICAgICAgICBbc2l6ZV09XCJzaXplXCJcbiAgICAgID5cbiAgICAgICAge3sgbGFiZWwgfX1cbiAgICAgIDwvbm92by1idXR0b24+XG4gICAgICA8ZGl2ICpuZ0lmPVwiIWJ1dHRvblwiIGNsYXNzPVwibm92by1yYWRpby1idXR0b24tbGFiZWxcIj5cbiAgICAgICAgPGkgW25nQ2xhc3NdPVwieyAnYmhpLXJhZGlvLWVtcHR5JzogIWNoZWNrZWQsICdiaGktcmFkaW8tZmlsbGVkJzogY2hlY2tlZCB9XCI+PC9pPlxuICAgICAgICB7eyBsYWJlbCB9fVxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L2xhYmVsPlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy52ZXJ0aWNhbF0nOiAndmVydGljYWwnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvUmFkaW9FbGVtZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XG4gIHByaXZhdGUgX3VuaXF1ZUlkOiBzdHJpbmcgPSBgbm92by1yYWRpby0keysrbmV4dElkfWA7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSB0aGlzLl91bmlxdWVJZDtcbiAgQElucHV0KCkgbmFtZTogc3RyaW5nID0gdGhpcy5fdW5pcXVlSWQ7XG4gIEBJbnB1dCgpIHRhYmluZGV4OiBudW1iZXIgPSAwO1xuXG4gIEBJbnB1dCgpXG4gIHZlcnRpY2FsOiBib29sZWFuO1xuICBASW5wdXQoKVxuICBsYWJlbDogc3RyaW5nO1xuICBASW5wdXQoKVxuICBidXR0b246IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgdGhlbWU6IHN0cmluZyA9ICdzZWNvbmRhcnknO1xuICBASW5wdXQoKVxuICBzaXplOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIGljb246IHN0cmluZztcbiAgQElucHV0KClcbiAgY29sb3I6IHN0cmluZztcblxuICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYmx1ciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgX2NoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfdmFsdWU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoKSBnZXQgY2hlY2tlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY2hlY2tlZDtcbiAgfVxuXG4gIHNldCBjaGVja2VkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdmFsdWUgPSAhIXZhbHVlO1xuICAgIGlmICh0aGlzLl9jaGVja2VkICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fY2hlY2tlZCA9IHZhbHVlO1xuICAgICAgaWYgKHRoaXMuX2NoZWNrZWQgJiYgdGhpcy5yYWRpb0dyb3VwICYmIHRoaXMucmFkaW9Hcm91cC52YWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuICAgICAgICB0aGlzLnJhZGlvR3JvdXAudmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgfVxuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBnZXQgdmFsdWUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLnZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgIGlmICh0aGlzLnJhZGlvR3JvdXApIHtcbiAgICAgICAgdGhpcy5fY2hlY2tlZCA9IHRoaXMucmFkaW9Hcm91cC52YWx1ZSA9PT0gdGhpcy52YWx1ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLl92YWx1ZSk7XG4gICAgfVxuICB9XG4gIC8vIERpc2FibGVkIFN0YXRlXG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZGlzYWJsZWQnKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkIHx8ICh0aGlzLnJhZGlvR3JvdXAgIT0gbnVsbCAmJiB0aGlzLnJhZGlvR3JvdXAuZGlzYWJsZWQpO1xuICB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gISF2YWx1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoTk9WT19SQURJT19HUk9VUCkgQE9wdGlvbmFsKCkgcHVibGljIHJhZGlvR3JvdXA6IFJhZGlvR3JvdXAsIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMucmFkaW9Hcm91cCA9IHJhZGlvR3JvdXA7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5yYWRpb0dyb3VwKSB7XG4gICAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLnJhZGlvR3JvdXAudmFsdWUgPT09IHRoaXMuX3ZhbHVlO1xuICAgICAgdGhpcy5uYW1lID0gdGhpcy5yYWRpb0dyb3VwLm5hbWU7XG4gICAgfVxuICB9XG5cbiAgX29uSW5wdXRDaGFuZ2UoZXZlbnQ6IEV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdChldmVudCk7XG5cbiAgICB0aGlzLmNoZWNrZWQgPSB0cnVlO1xuXG4gICAgaWYgKHRoaXMucmFkaW9Hcm91cCkge1xuICAgICAgdGhpcy5yYWRpb0dyb3VwLnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICB9XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2sgPSAoXzogYW55KSA9PiB7XG4gICAgLy8gcGxhY2Vob2xkZXJcbiAgfTtcblxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrID0gKCkgPT4ge1xuICAgIC8vIHBsYWNlaG9sZGVyXG4gIH07XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShkaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgfVxufVxuIl19