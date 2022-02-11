import { __decorate, __metadata } from "tslib";
// NG2
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, HostBinding, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BooleanInput } from '../../utils';
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
        this.model = !this.model;
        this.onChange.next(this.model);
        this.onModelChange(this.model);
        this.ref.markForCheck();
    }
    writeValue(model) {
        this.model = model;
        this.ref.markForCheck();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
}
NovoSwitchElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-switch',
                providers: [SWITCH_VALUE_ACCESSOR],
                template: `
    <div (click)="toggle($event)">
      <div class="novo-switch-container">
        <div class="novo-switch-bar"></div>
        <div class="novo-switch-thumb-container">
          <div class="novo-switch-thumb">
            <novo-icon *ngIf="!model" smaller>{{ icons[0] }}</novo-icon>
            <novo-icon *ngIf="model" smaller>{{ icons[1] }}</novo-icon>
          </div>
        </div>
      </div>
      <div class="novo-switch-label"><ng-content></ng-content></div>
    </div>
  `,
                host: {
                    role: 'checkbox',
                    class: 'novo-switch',
                    '[attr.aria-checked]': 'model',
                    '[attr.aria-disabled]': 'disabled',
                    '(keydown)': 'onKeydown($event)',
                    '[class]': 'theme',
                }
            },] }
];
NovoSwitchElement.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
NovoSwitchElement.propDecorators = {
    theme: [{ type: Input }],
    icons: [{ type: Input }],
    disabled: [{ type: Input }, { type: HostBinding, args: ['class.novo-switch-disabled',] }],
    onChange: [{ type: Output }]
};
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoSwitchElement.prototype, "disabled", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3dpdGNoLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL3N3aXRjaC9Td2l0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkgsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxZQUFZLEVBQU8sTUFBTSxhQUFhLENBQUM7QUFFaEQsc0RBQXNEO0FBQ3RELE1BQU0scUJBQXFCLEdBQUc7SUFDNUIsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDO0lBQ2hELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQTRCRixNQUFNLE9BQU8saUJBQWlCO0lBbUI1QixZQUFvQixHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQWpCMUMsVUFBSyxHQUFXLE9BQU8sQ0FBQztRQUd4QixVQUFLLEdBQXFCLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBS3pDLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFHMUIsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBR2pELGtCQUFhLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBQ25DLG1CQUFjLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBRVMsQ0FBQztJQUU5QyxTQUFTLENBQUMsS0FBb0I7UUFDNUIsSUFBSSxLQUFLLENBQUMsR0FBRyxvQkFBYyxFQUFFO1lBQzNCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFLO1FBQ1YsSUFBSSxLQUFLLEVBQUU7WUFDVCxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDeEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3hCO1FBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBYztRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxFQUFZO1FBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxFQUFZO1FBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQzNCLENBQUM7OztZQWpGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO2dCQUNsQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7R0FhVDtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLEtBQUssRUFBRSxhQUFhO29CQUNwQixxQkFBcUIsRUFBRSxPQUFPO29CQUM5QixzQkFBc0IsRUFBRSxVQUFVO29CQUNsQyxXQUFXLEVBQUUsbUJBQW1CO29CQUNoQyxTQUFTLEVBQUUsT0FBTztpQkFDbkI7YUFDRjs7O1lBcENRLGlCQUFpQjs7O29CQXNDdkIsS0FBSztvQkFHTCxLQUFLO3VCQUdMLEtBQUssWUFFTCxXQUFXLFNBQUMsNEJBQTRCO3VCQUd4QyxNQUFNOztBQUZQO0lBRkMsWUFBWSxFQUFFOzttREFFVyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBIb3N0QmluZGluZywgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBLZXkgfSBmcm9tICcuLi8uLi91dGlscyc7XG5cbi8vIFZhbHVlIGFjY2Vzc29yIGZvciB0aGUgY29tcG9uZW50IChzdXBwb3J0cyBuZ01vZGVsKVxuY29uc3QgU1dJVENIX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b1N3aXRjaEVsZW1lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tc3dpdGNoJyxcbiAgcHJvdmlkZXJzOiBbU1dJVENIX1ZBTFVFX0FDQ0VTU09SXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IChjbGljayk9XCJ0b2dnbGUoJGV2ZW50KVwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tc3dpdGNoLWNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibm92by1zd2l0Y2gtYmFyXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLXN3aXRjaC10aHVtYi1jb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibm92by1zd2l0Y2gtdGh1bWJcIj5cbiAgICAgICAgICAgIDxub3ZvLWljb24gKm5nSWY9XCIhbW9kZWxcIiBzbWFsbGVyPnt7IGljb25zWzBdIH19PC9ub3ZvLWljb24+XG4gICAgICAgICAgICA8bm92by1pY29uICpuZ0lmPVwibW9kZWxcIiBzbWFsbGVyPnt7IGljb25zWzFdIH19PC9ub3ZvLWljb24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibm92by1zd2l0Y2gtbGFiZWxcIj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICByb2xlOiAnY2hlY2tib3gnLFxuICAgIGNsYXNzOiAnbm92by1zd2l0Y2gnLFxuICAgICdbYXR0ci5hcmlhLWNoZWNrZWRdJzogJ21vZGVsJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICcoa2V5ZG93biknOiAnb25LZXlkb3duKCRldmVudCknLFxuICAgICdbY2xhc3NdJzogJ3RoZW1lJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1N3aXRjaEVsZW1lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBJbnB1dCgpXG4gIHRoZW1lOiBzdHJpbmcgPSAnb2NlYW4nO1xuXG4gIEBJbnB1dCgpXG4gIGljb25zOiBbc3RyaW5nLCBzdHJpbmddID0gWyd4JywgJ2NoZWNrJ107XG5cbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3Mubm92by1zd2l0Y2gtZGlzYWJsZWQnKVxuICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKVxuICBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgbW9kZWw6IGJvb2xlYW47XG4gIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBvbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5ID09PSBLZXkuU3BhY2UpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnRvZ2dsZShldmVudCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm1vZGVsID0gIXRoaXMubW9kZWw7XG4gICAgdGhpcy5vbkNoYW5nZS5uZXh0KHRoaXMubW9kZWwpO1xuICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLm1vZGVsKTtcbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUobW9kZWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICB9XG59XG4iXX0=