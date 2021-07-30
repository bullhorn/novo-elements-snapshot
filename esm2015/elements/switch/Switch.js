// NG2
import { Component, Input, Output, EventEmitter, forwardRef, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// APP
import { KeyCodes } from '../../utils/key-codes/KeyCodes';
// Value accessor for the component (supports ngModel)
const SWITCH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoSwitchElement),
    multi: true,
};
export class NovoSwitchElement {
    constructor(ref) {
        this.ref = ref;
        this.onChange = new EventEmitter();
        this._disabled = false;
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = !value;
    }
    onKeydown(event) {
        if (event.keyCode === KeyCodes.SPACE) {
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
                    <div class="novo-switch-thumb"></div>
                </div>
            </div>
            <div class="novo-switch-label"><ng-content></ng-content></div>
        </div>
    `,
                host: {
                    role: 'checkbox',
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
    onChange: [{ type: Output }],
    disabled: [{ type: Input, args: ['disabled',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3dpdGNoLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9zd2l0Y2gvU3dpdGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RyxPQUFPLEVBQUUsaUJBQWlCLEVBQXdCLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsTUFBTTtBQUNOLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUUxRCxzREFBc0Q7QUFDdEQsTUFBTSxxQkFBcUIsR0FBRztJQUM1QixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUM7SUFDaEQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBd0JGLE1BQU0sT0FBTyxpQkFBaUI7SUFvQjVCLFlBQW9CLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBaEIxQyxhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFakQsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixrQkFBYSxHQUFhLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUNuQyxtQkFBYyxHQUFhLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztJQVdTLENBQUM7SUFUOUMsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUNJLFFBQVEsQ0FBQyxLQUFLO1FBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUlELFNBQVMsQ0FBQyxLQUFLO1FBQ2IsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLFFBQVEsQ0FBQyxLQUFLLEVBQUU7WUFDcEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEI7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQUs7UUFDVixJQUFJLEtBQUssRUFBRTtZQUNULEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDeEI7UUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFjO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQVk7UUFDM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELGlCQUFpQixDQUFDLEVBQVk7UUFDNUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7O1lBOUVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsU0FBUyxFQUFFLENBQUMscUJBQXFCLENBQUM7Z0JBQ2xDLFFBQVEsRUFBRTs7Ozs7Ozs7OztLQVVQO2dCQUNILElBQUksRUFBRTtvQkFDSixJQUFJLEVBQUUsVUFBVTtvQkFDaEIscUJBQXFCLEVBQUUsT0FBTztvQkFDOUIsc0JBQXNCLEVBQUUsVUFBVTtvQkFDbEMsV0FBVyxFQUFFLG1CQUFtQjtvQkFDaEMsU0FBUyxFQUFFLE9BQU87aUJBQ25CO2FBQ0Y7OztZQWpDNEQsaUJBQWlCOzs7b0JBbUMzRSxLQUFLO3VCQUVMLE1BQU07dUJBWU4sS0FBSyxTQUFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuLy8gQVBQXHJcbmltcG9ydCB7IEtleUNvZGVzIH0gZnJvbSAnLi4vLi4vdXRpbHMva2V5LWNvZGVzL0tleUNvZGVzJztcclxuXHJcbi8vIFZhbHVlIGFjY2Vzc29yIGZvciB0aGUgY29tcG9uZW50IChzdXBwb3J0cyBuZ01vZGVsKVxyXG5jb25zdCBTV0lUQ0hfVkFMVUVfQUNDRVNTT1IgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b1N3aXRjaEVsZW1lbnQpLFxyXG4gIG11bHRpOiB0cnVlLFxyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLXN3aXRjaCcsXHJcbiAgcHJvdmlkZXJzOiBbU1dJVENIX1ZBTFVFX0FDQ0VTU09SXSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgKGNsaWNrKT1cInRvZ2dsZSgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLXN3aXRjaC1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLXN3aXRjaC1iYXJcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLXN3aXRjaC10aHVtYi1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibm92by1zd2l0Y2gtdGh1bWJcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tc3dpdGNoLWxhYmVsXCI+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICBob3N0OiB7XHJcbiAgICByb2xlOiAnY2hlY2tib3gnLFxyXG4gICAgJ1thdHRyLmFyaWEtY2hlY2tlZF0nOiAnbW9kZWwnLFxyXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcclxuICAgICcoa2V5ZG93biknOiAnb25LZXlkb3duKCRldmVudCknLFxyXG4gICAgJ1tjbGFzc10nOiAndGhlbWUnLFxyXG4gIH0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvU3dpdGNoRWxlbWVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuICBASW5wdXQoKVxyXG4gIHRoZW1lOiBzdHJpbmc7XHJcbiAgQE91dHB1dCgpXHJcbiAgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBtb2RlbDogYm9vbGVhbjtcclxuICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xyXG4gIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xyXG5cclxuICBnZXQgZGlzYWJsZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoJ2Rpc2FibGVkJylcclxuICBzZXQgZGlzYWJsZWQodmFsdWUpIHtcclxuICAgIHRoaXMuX2Rpc2FibGVkID0gIXZhbHVlO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxyXG5cclxuICBvbktleWRvd24oZXZlbnQpIHtcclxuICAgIGlmIChldmVudC5rZXlDb2RlID09PSBLZXlDb2Rlcy5TUEFDRSkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0aGlzLnRvZ2dsZShldmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0b2dnbGUoZXZlbnQpIHtcclxuICAgIGlmIChldmVudCkge1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tb2RlbCA9ICF0aGlzLm1vZGVsO1xyXG4gICAgdGhpcy5vbkNoYW5nZS5uZXh0KHRoaXMubW9kZWwpO1xyXG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMubW9kZWwpO1xyXG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICB3cml0ZVZhbHVlKG1vZGVsOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XHJcbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xyXG4gIH1cclxufVxyXG4iXX0=