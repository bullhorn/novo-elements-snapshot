// NG2
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Inject, Input, Optional, Output, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NOVO_RADIO_GROUP } from './tokens';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/elements/button";
import * as i2 from "@angular/common";
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
        this._value = false;
        this._checked = false;
        this.id = this._uniqueId;
        this.name = this._uniqueId;
        this.tabindex = 0;
        this.vertical = false;
        this.button = false;
        this.theme = 'secondary';
        this.change = new EventEmitter();
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
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
    ngOnInit() {
        if (this.radioGroup) {
            this.checked = this.radioGroup.value === this._value;
            this.vertical = this.radioGroup.appearance === 'vertical';
            this.name = this.radioGroup.name;
            this.disabled = this.disabled || this.radioGroup.disabled;
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
NovoRadioElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoRadioElement, deps: [{ token: NOVO_RADIO_GROUP, optional: true }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NovoRadioElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoRadioElement, selector: "novo-radio", inputs: { id: "id", name: "name", tabindex: "tabindex", vertical: "vertical", label: "label", button: "button", theme: "theme", size: "size", icon: "icon", color: "color", disabled: "disabled", checked: "checked", value: "value" }, outputs: { change: "change", blur: "blur", focus: "focus" }, host: { properties: { "class.vertical": "vertical" } }, providers: [RADIO_VALUE_ACCESSOR], ngImport: i0, template: `
    <input
      type="radio"
      [id]="id"
      [name]="name"
      [checked]="_checked"
      [tabIndex]="tabindex"
      [disabled]="disabled"
      (focus)="focus.emit($event)"
      (blur)="blur.emit($event)"
      (change)="_onInputChange($event)"
    />
    <label [attr.for]="id" [class.disabled]="disabled">
      <novo-button
        *ngIf="button"
        [ngClass]="{ unchecked: !_checked, checked: _checked, 'has-icon': !!icon }"
        [theme]="theme"
        [color]="_checked ? color : null"
        [icon]="icon"
        [size]="size"
      >
        {{ label }}
      </novo-button>
      <div *ngIf="!button" class="novo-radio-button-label">
        <i [ngClass]="{ 'bhi-radio-empty': !_checked, 'bhi-radio-filled': _checked }"></i>
        {{ label }}
        <ng-content></ng-content>
      </div>
    </label>
  `, isInline: true, components: [{ type: i1.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoRadioElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-radio',
                    providers: [RADIO_VALUE_ACCESSOR],
                    template: `
    <input
      type="radio"
      [id]="id"
      [name]="name"
      [checked]="_checked"
      [tabIndex]="tabindex"
      [disabled]="disabled"
      (focus)="focus.emit($event)"
      (blur)="blur.emit($event)"
      (change)="_onInputChange($event)"
    />
    <label [attr.for]="id" [class.disabled]="disabled">
      <novo-button
        *ngIf="button"
        [ngClass]="{ unchecked: !_checked, checked: _checked, 'has-icon': !!icon }"
        [theme]="theme"
        [color]="_checked ? color : null"
        [icon]="icon"
        [size]="size"
      >
        {{ label }}
      </novo-button>
      <div *ngIf="!button" class="novo-radio-button-label">
        <i [ngClass]="{ 'bhi-radio-empty': !_checked, 'bhi-radio-filled': _checked }"></i>
        {{ label }}
        <ng-content></ng-content>
      </div>
    </label>
  `,
                    host: {
                        '[class.vertical]': 'vertical',
                    },
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [NOVO_RADIO_GROUP]
                }, {
                    type: Optional
                }] }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { id: [{
                type: Input
            }], name: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], vertical: [{
                type: Input
            }], label: [{
                type: Input
            }], button: [{
                type: Input
            }], theme: [{
                type: Input
            }], size: [{
                type: Input
            }], icon: [{
                type: Input
            }], color: [{
                type: Input
            }], disabled: [{
                type: Input
            }], change: [{
                type: Output
            }], blur: [{
                type: Output
            }], focus: [{
                type: Output
            }], checked: [{
                type: Input
            }], value: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9yYWRpby9SYWRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUVMLFFBQVEsRUFDUixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBYyxNQUFNLFVBQVUsQ0FBQzs7OztBQUV4RCxnQ0FBZ0M7QUFDaEMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBRWYsc0RBQXNEO0FBQ3RELE1BQU0sb0JBQW9CLEdBQUc7SUFDM0IsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDO0lBQy9DLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQXVDRixNQUFNLE9BQU8sZ0JBQWdCO0lBa0QzQixZQUF5RCxVQUFzQixFQUFVLEdBQXNCO1FBQXRELGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQWpEdkcsY0FBUyxHQUFXLGNBQWMsRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUM3QyxXQUFNLEdBQVksS0FBSyxDQUFDO1FBQ2hDLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFFakIsT0FBRSxHQUFXLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDNUIsU0FBSSxHQUFXLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDOUIsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUNyQixhQUFRLEdBQVksS0FBSyxDQUFDO1FBRTFCLFdBQU0sR0FBWSxLQUFLLENBQUM7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RGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTk9WT19SQURJT19HUk9VUCwgUmFkaW9Hcm91cCB9IGZyb20gJy4vdG9rZW5zJztcblxuLy8gbWFrZSByYWRpby1idXR0b25zIGlkcyB1bmlxdWVcbmxldCBuZXh0SWQgPSAwO1xuXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcbmNvbnN0IFJBRElPX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b1JhZGlvRWxlbWVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1yYWRpbycsXG4gIHByb3ZpZGVyczogW1JBRElPX1ZBTFVFX0FDQ0VTU09SXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aW5wdXRcbiAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICBbaWRdPVwiaWRcIlxuICAgICAgW25hbWVdPVwibmFtZVwiXG4gICAgICBbY2hlY2tlZF09XCJfY2hlY2tlZFwiXG4gICAgICBbdGFiSW5kZXhdPVwidGFiaW5kZXhcIlxuICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgIChmb2N1cyk9XCJmb2N1cy5lbWl0KCRldmVudClcIlxuICAgICAgKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIlxuICAgICAgKGNoYW5nZSk9XCJfb25JbnB1dENoYW5nZSgkZXZlbnQpXCJcbiAgICAvPlxuICAgIDxsYWJlbCBbYXR0ci5mb3JdPVwiaWRcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgIDxub3ZvLWJ1dHRvblxuICAgICAgICAqbmdJZj1cImJ1dHRvblwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInsgdW5jaGVja2VkOiAhX2NoZWNrZWQsIGNoZWNrZWQ6IF9jaGVja2VkLCAnaGFzLWljb24nOiAhIWljb24gfVwiXG4gICAgICAgIFt0aGVtZV09XCJ0aGVtZVwiXG4gICAgICAgIFtjb2xvcl09XCJfY2hlY2tlZCA/IGNvbG9yIDogbnVsbFwiXG4gICAgICAgIFtpY29uXT1cImljb25cIlxuICAgICAgICBbc2l6ZV09XCJzaXplXCJcbiAgICAgID5cbiAgICAgICAge3sgbGFiZWwgfX1cbiAgICAgIDwvbm92by1idXR0b24+XG4gICAgICA8ZGl2ICpuZ0lmPVwiIWJ1dHRvblwiIGNsYXNzPVwibm92by1yYWRpby1idXR0b24tbGFiZWxcIj5cbiAgICAgICAgPGkgW25nQ2xhc3NdPVwieyAnYmhpLXJhZGlvLWVtcHR5JzogIV9jaGVja2VkLCAnYmhpLXJhZGlvLWZpbGxlZCc6IF9jaGVja2VkIH1cIj48L2k+XG4gICAgICAgIHt7IGxhYmVsIH19XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbGFiZWw+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLnZlcnRpY2FsXSc6ICd2ZXJ0aWNhbCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9SYWRpb0VsZW1lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0IHtcbiAgcHJpdmF0ZSBfdW5pcXVlSWQ6IHN0cmluZyA9IGBub3ZvLXJhZGlvLSR7KytuZXh0SWR9YDtcbiAgcHJpdmF0ZSBfdmFsdWU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgX2NoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoKSBpZDogc3RyaW5nID0gdGhpcy5fdW5pcXVlSWQ7XG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZyA9IHRoaXMuX3VuaXF1ZUlkO1xuICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyID0gMDtcbiAgQElucHV0KCkgdmVydGljYWw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcbiAgQElucHV0KCkgYnV0dG9uOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRoZW1lOiBzdHJpbmcgPSAnc2Vjb25kYXJ5JztcbiAgQElucHV0KCkgc2l6ZTogc3RyaW5nO1xuICBASW5wdXQoKSBpY29uOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBibHVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZm9jdXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQElucHV0KClcbiAgZ2V0IGNoZWNrZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoZWNrZWQ7XG4gIH1cbiAgc2V0IGNoZWNrZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9ICEhdmFsdWU7XG4gICAgaWYgKHRoaXMuX2NoZWNrZWQgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9jaGVja2VkID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5fY2hlY2tlZCAmJiB0aGlzLnJhZGlvR3JvdXAgJiYgdGhpcy5yYWRpb0dyb3VwLnZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG4gICAgICAgIHRoaXMucmFkaW9Hcm91cC52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICB9XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCB2YWx1ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMudmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgaWYgKHRoaXMucmFkaW9Hcm91cCkge1xuICAgICAgICB0aGlzLl9jaGVja2VkID0gdGhpcy5yYWRpb0dyb3VwLnZhbHVlID09PSB0aGlzLnZhbHVlO1xuICAgICAgfVxuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KE5PVk9fUkFESU9fR1JPVVApIEBPcHRpb25hbCgpIHB1YmxpYyByYWRpb0dyb3VwOiBSYWRpb0dyb3VwLCBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLnJhZGlvR3JvdXAgPSByYWRpb0dyb3VwO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMucmFkaW9Hcm91cCkge1xuICAgICAgdGhpcy5jaGVja2VkID0gdGhpcy5yYWRpb0dyb3VwLnZhbHVlID09PSB0aGlzLl92YWx1ZTtcbiAgICAgIHRoaXMudmVydGljYWwgPSB0aGlzLnJhZGlvR3JvdXAuYXBwZWFyYW5jZSA9PT0gJ3ZlcnRpY2FsJztcbiAgICAgIHRoaXMubmFtZSA9IHRoaXMucmFkaW9Hcm91cC5uYW1lO1xuICAgICAgdGhpcy5kaXNhYmxlZCA9IHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5yYWRpb0dyb3VwLmRpc2FibGVkO1xuICAgIH1cbiAgfVxuXG4gIF9vbklucHV0Q2hhbmdlKGV2ZW50OiBFdmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuY2hhbmdlLmVtaXQoZXZlbnQpO1xuXG4gICAgdGhpcy5jaGVja2VkID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLnJhZGlvR3JvdXApIHtcbiAgICAgIHRoaXMucmFkaW9Hcm91cC52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrID0gKF86IGFueSkgPT4ge1xuICAgIC8vIHBsYWNlaG9sZGVyXG4gIH07XG5cbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjayA9ICgpID0+IHtcbiAgICAvLyBwbGFjZWhvbGRlclxuICB9O1xuXG4gIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gIH1cbn1cbiJdfQ==