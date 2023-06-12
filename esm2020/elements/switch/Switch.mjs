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
import { BooleanInput } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/elements/icon";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3dpdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvc3dpdGNoL1N3aXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ILE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsWUFBWSxFQUFPLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFFeEQsc0RBQXNEO0FBQ3RELE1BQU0scUJBQXFCLEdBQUc7SUFDNUIsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDO0lBQ2hELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQTRCRixNQUFNLE9BQU8saUJBQWlCO0lBeUI1QixZQUFvQixHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQXZCMUMsVUFBSyxHQUFXLE9BQU8sQ0FBQztRQUd4QixVQUFLLEdBQXFCLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBS3pDLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFHMUIsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBU2pELGtCQUFhLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBQ25DLG1CQUFjLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBRVMsQ0FBQztJQVQ5QyxJQUFXLEtBQUs7UUFDZCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUNELElBQVcsS0FBSyxDQUFDLEtBQWM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQU1ELFNBQVMsQ0FBQyxLQUFvQjtRQUM1QixJQUFJLEtBQUssQ0FBQyxHQUFHLG9CQUFjLEVBQUU7WUFDM0IsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEI7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQUs7UUFDVixJQUFJLEtBQUssRUFBRTtZQUNULEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDeEI7UUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFjO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQVk7UUFDM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELGlCQUFpQixDQUFDLEVBQVk7UUFDNUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7K0dBN0RVLGlCQUFpQjttR0FBakIsaUJBQWlCLHdaQXhCakIsQ0FBQyxxQkFBcUIsQ0FBQywwQkFDeEI7Ozs7Ozs7Ozs7Ozs7R0FhVDtBQW9CRDtJQUZDLFlBQVksRUFBRTs7bURBRVc7NEZBVmYsaUJBQWlCO2tCQTFCN0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsU0FBUyxFQUFFLENBQUMscUJBQXFCLENBQUM7b0JBQ2xDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7OztHQWFUO29CQUNELElBQUksRUFBRTt3QkFDSixJQUFJLEVBQUUsVUFBVTt3QkFDaEIsS0FBSyxFQUFFLGFBQWE7d0JBQ3BCLHFCQUFxQixFQUFFLE9BQU87d0JBQzlCLHNCQUFzQixFQUFFLFVBQVU7d0JBQ2xDLFdBQVcsRUFBRSxtQkFBbUI7d0JBQ2hDLFNBQVMsRUFBRSxPQUFPO3FCQUNuQjtpQkFDRjt3R0FHQyxLQUFLO3NCQURKLEtBQUs7Z0JBSU4sS0FBSztzQkFESixLQUFLO2dCQU1OLFFBQVE7c0JBSFAsS0FBSzs7c0JBRUwsV0FBVzt1QkFBQyw0QkFBNEI7Z0JBSXpDLFFBQVE7c0JBRFAsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBIb3N0QmluZGluZywgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBLZXkgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG5jb25zdCBTV0lUQ0hfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvU3dpdGNoRWxlbWVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1zd2l0Y2gnLFxuICBwcm92aWRlcnM6IFtTV0lUQ0hfVkFMVUVfQUNDRVNTT1JdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgKGNsaWNrKT1cInRvZ2dsZSgkZXZlbnQpXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibm92by1zd2l0Y2gtY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLXN3aXRjaC1iYXJcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tc3dpdGNoLXRodW1iLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLXN3aXRjaC10aHVtYlwiPlxuICAgICAgICAgICAgPG5vdm8taWNvbiAqbmdJZj1cIiF2YWx1ZVwiIHNtYWxsZXI+e3sgaWNvbnNbMF0gfX08L25vdm8taWNvbj5cbiAgICAgICAgICAgIDxub3ZvLWljb24gKm5nSWY9XCJ2YWx1ZVwiIHNtYWxsZXI+e3sgaWNvbnNbMV0gfX08L25vdm8taWNvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLXN3aXRjaC1sYWJlbFwiPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDoge1xuICAgIHJvbGU6ICdjaGVja2JveCcsXG4gICAgY2xhc3M6ICdub3ZvLXN3aXRjaCcsXG4gICAgJ1thdHRyLmFyaWEtY2hlY2tlZF0nOiAndmFsdWUnLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJyhrZXlkb3duKSc6ICdvbktleWRvd24oJGV2ZW50KScsXG4gICAgJ1tjbGFzc10nOiAndGhlbWUnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvU3dpdGNoRWxlbWVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQElucHV0KClcbiAgdGhlbWU6IHN0cmluZyA9ICdvY2Vhbic7XG5cbiAgQElucHV0KClcbiAgaWNvbnM6IFtzdHJpbmcsIHN0cmluZ10gPSBbJ3gnLCAnY2hlY2snXTtcblxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5ub3ZvLXN3aXRjaC1kaXNhYmxlZCcpXG4gIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpXG4gIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIF92YWx1ZTogYm9vbGVhbjtcbiAgcHVibGljIGdldCB2YWx1ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCB2YWx1ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gIH1cbiAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmIChldmVudC5rZXkgPT09IEtleS5TcGFjZSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMudG9nZ2xlKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICB0b2dnbGUoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMudmFsdWUgPSAhdGhpcy52YWx1ZTtcbiAgICB0aGlzLm9uQ2hhbmdlLm5leHQodGhpcy52YWx1ZSk7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZShtb2RlbDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSBtb2RlbDtcbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gIH1cbn1cbiJdfQ==