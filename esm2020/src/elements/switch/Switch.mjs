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
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, HostBinding, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BooleanInput } from '../../utils';
import * as i0 from "@angular/core";
import * as i1 from "../icon/Icon";
import * as i2 from "@angular/common";
// Value accessor for the component (supports ngModel)
const SWITCH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoSwitchElement),
    multi: true,
};
export class NovoSwitchElement {
    constructor(ref) {
        this.ref = ref;
        this.theme = 'ocean';
        this.icons = ['x', 'check'];
        this.disabled = false;
        this.onChange = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    onKeydown(event) {
        if (event.key === " " /* Space */) {
            event.preventDefault();
            this.toggle(event);
        }
    }
    toggle(event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        if (this.disabled) {
            return;
        }
        this.value = !this.value;
        this.onChange.next(this.value);
        this.onModelChange(this.value);
        this.ref.markForCheck();
    }
    writeValue(model) {
        this.value = model;
        this.ref.markForCheck();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
}
NovoSwitchElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSwitchElement, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NovoSwitchElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoSwitchElement, selector: "novo-switch", inputs: { theme: "theme", icons: "icons", disabled: "disabled" }, outputs: { onChange: "onChange" }, host: { attributes: { "role": "checkbox" }, listeners: { "keydown": "onKeydown($event)" }, properties: { "attr.aria-checked": "value", "attr.aria-disabled": "disabled", "class": "theme", "class.novo-switch-disabled": "this.disabled" }, classAttribute: "novo-switch" }, providers: [SWITCH_VALUE_ACCESSOR], ngImport: i0, template: `
    <div (click)="toggle($event)">
      <div class="novo-switch-container">
        <div class="novo-switch-bar"></div>
        <div class="novo-switch-thumb-container">
          <div class="novo-switch-thumb">
            <novo-icon *ngIf="!value" smaller>{{ icons[0] }}</novo-icon>
            <novo-icon *ngIf="value" smaller>{{ icons[1] }}</novo-icon>
          </div>
        </div>
      </div>
      <div class="novo-switch-label"><ng-content></ng-content></div>
    </div>
  `, isInline: true, components: [{ type: i1.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoSwitchElement.prototype, "disabled", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSwitchElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-switch',
                    providers: [SWITCH_VALUE_ACCESSOR],
                    template: `
    <div (click)="toggle($event)">
      <div class="novo-switch-container">
        <div class="novo-switch-bar"></div>
        <div class="novo-switch-thumb-container">
          <div class="novo-switch-thumb">
            <novo-icon *ngIf="!value" smaller>{{ icons[0] }}</novo-icon>
            <novo-icon *ngIf="value" smaller>{{ icons[1] }}</novo-icon>
          </div>
        </div>
      </div>
      <div class="novo-switch-label"><ng-content></ng-content></div>
    </div>
  `,
                    host: {
                        role: 'checkbox',
                        class: 'novo-switch',
                        '[attr.aria-checked]': 'value',
                        '[attr.aria-disabled]': 'disabled',
                        '(keydown)': 'onKeydown($event)',
                        '[class]': 'theme',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { theme: [{
                type: Input
            }], icons: [{
                type: Input
            }], disabled: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.novo-switch-disabled']
            }], onChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3dpdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvc3dpdGNoL1N3aXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ILE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsWUFBWSxFQUFPLE1BQU0sYUFBYSxDQUFDOzs7O0FBRWhELHNEQUFzRDtBQUN0RCxNQUFNLHFCQUFxQixHQUFHO0lBQzVCLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztJQUNoRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUE0QkYsTUFBTSxPQUFPLGlCQUFpQjtJQXlCNUIsWUFBb0IsR0FBc0I7UUFBdEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUF2QjFDLFVBQUssR0FBVyxPQUFPLENBQUM7UUFHeEIsVUFBSyxHQUFxQixDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUt6QyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBRzFCLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVNqRCxrQkFBYSxHQUFhLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUNuQyxtQkFBYyxHQUFhLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztJQUVTLENBQUM7SUFUOUMsSUFBVyxLQUFLO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxJQUFXLEtBQUssQ0FBQyxLQUFjO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFNRCxTQUFTLENBQUMsS0FBb0I7UUFDNUIsSUFBSSxLQUFLLENBQUMsR0FBRyxvQkFBYyxFQUFFO1lBQzNCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFLO1FBQ1YsSUFBSSxLQUFLLEVBQUU7WUFDVCxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDeEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3hCO1FBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBYztRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxFQUFZO1FBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxFQUFZO1FBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQzNCLENBQUM7OytHQTdEVSxpQkFBaUI7bUdBQWpCLGlCQUFpQix3WkF4QmpCLENBQUMscUJBQXFCLENBQUMsMEJBQ3hCOzs7Ozs7Ozs7Ozs7O0dBYVQ7QUFvQkQ7SUFGQyxZQUFZLEVBQUU7O21EQUVXOzRGQVZmLGlCQUFpQjtrQkExQjdCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO29CQUNsQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7R0FhVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLEtBQUssRUFBRSxhQUFhO3dCQUNwQixxQkFBcUIsRUFBRSxPQUFPO3dCQUM5QixzQkFBc0IsRUFBRSxVQUFVO3dCQUNsQyxXQUFXLEVBQUUsbUJBQW1CO3dCQUNoQyxTQUFTLEVBQUUsT0FBTztxQkFDbkI7aUJBQ0Y7d0dBR0MsS0FBSztzQkFESixLQUFLO2dCQUlOLEtBQUs7c0JBREosS0FBSztnQkFNTixRQUFRO3NCQUhQLEtBQUs7O3NCQUVMLFdBQVc7dUJBQUMsNEJBQTRCO2dCQUl6QyxRQUFRO3NCQURQLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSG9zdEJpbmRpbmcsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcbmNvbnN0IFNXSVRDSF9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9Td2l0Y2hFbGVtZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXN3aXRjaCcsXG4gIHByb3ZpZGVyczogW1NXSVRDSF9WQUxVRV9BQ0NFU1NPUl0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAoY2xpY2spPVwidG9nZ2xlKCRldmVudClcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLXN3aXRjaC1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tc3dpdGNoLWJhclwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibm92by1zd2l0Y2gtdGh1bWItY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tc3dpdGNoLXRodW1iXCI+XG4gICAgICAgICAgICA8bm92by1pY29uICpuZ0lmPVwiIXZhbHVlXCIgc21hbGxlcj57eyBpY29uc1swXSB9fTwvbm92by1pY29uPlxuICAgICAgICAgICAgPG5vdm8taWNvbiAqbmdJZj1cInZhbHVlXCIgc21hbGxlcj57eyBpY29uc1sxXSB9fTwvbm92by1pY29uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tc3dpdGNoLWxhYmVsXCI+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBob3N0OiB7XG4gICAgcm9sZTogJ2NoZWNrYm94JyxcbiAgICBjbGFzczogJ25vdm8tc3dpdGNoJyxcbiAgICAnW2F0dHIuYXJpYS1jaGVja2VkXSc6ICd2YWx1ZScsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnKGtleWRvd24pJzogJ29uS2V5ZG93bigkZXZlbnQpJyxcbiAgICAnW2NsYXNzXSc6ICd0aGVtZScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Td2l0Y2hFbGVtZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBASW5wdXQoKVxuICB0aGVtZTogc3RyaW5nID0gJ29jZWFuJztcblxuICBASW5wdXQoKVxuICBpY29uczogW3N0cmluZywgc3RyaW5nXSA9IFsneCcsICdjaGVjayddO1xuXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm5vdm8tc3dpdGNoLWRpc2FibGVkJylcbiAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBAT3V0cHV0KClcbiAgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgX3ZhbHVlOiBib29sZWFuO1xuICBwdWJsaWMgZ2V0IHZhbHVlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHZhbHVlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxuICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleSA9PT0gS2V5LlNwYWNlKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy50b2dnbGUoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZShldmVudCkge1xuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy52YWx1ZSA9ICF0aGlzLnZhbHVlO1xuICAgIHRoaXMub25DaGFuZ2UubmV4dCh0aGlzLnZhbHVlKTtcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKG1vZGVsOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IG1vZGVsO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgfVxufVxuIl19