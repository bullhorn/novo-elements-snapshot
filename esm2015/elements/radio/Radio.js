// NG2
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// APP
import { Helpers } from '../../utils/Helpers';
// Value accessor for the component (supports ngModel)
const RADIO_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoRadioElement),
    multi: true,
};
export class NovoRadioGroup {
}
NovoRadioGroup.decorators = [
    { type: Component, args: [{
                selector: 'novo-radio-group',
                template: '<ng-content></ng-content>',
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
export class NovoRadioElement {
    constructor(ref) {
        this.ref = ref;
        this.button = false;
        this.theme = 'secondary';
        this.disabled = false;
        this.change = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    select(event) {
        Helpers.swallowEvent(event);
        // Only change the checked state if this is a new radio, they are not toggle buttons
        if (!this.checked) {
            this.checked = !this.checked;
            this.change.emit(this.value);
            this.onModelChange(this.value);
            this.ref.markForCheck();
        }
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
    setDisabledState(disabled) {
        this.disabled = disabled;
    }
}
NovoRadioElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-radio',
                providers: [RADIO_VALUE_ACCESSOR],
                template: `
        <input [name]="name" type="radio" [checked]="checked" [attr.id]="name" (change)="select($event)" [disabled]="disabled">
        <label [attr.for]="name" (click)="select($event)" [class.disabled]="disabled">
            <button *ngIf="button" [ngClass]="{'unchecked': !checked, 'checked': checked, 'has-icon': !!icon}" [theme]="theme" [icon]="icon">{{ label }}</button>
            <div *ngIf="!button">
                <i [ngClass]="{'bhi-radio-empty': !checked, 'bhi-radio-filled': checked}"></i>
                {{ label }}
                <ng-content></ng-content>
            </div>
        </label>
    `,
                host: {
                    '[class.vertical]': 'vertical',
                },
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NovoRadioElement.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
NovoRadioElement.propDecorators = {
    name: [{ type: Input }],
    value: [{ type: Input }],
    checked: [{ type: Input }],
    vertical: [{ type: Input }],
    label: [{ type: Input }],
    button: [{ type: Input }],
    theme: [{ type: Input }],
    icon: [{ type: Input }],
    disabled: [{ type: Input }],
    change: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFkaW8uanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvcmFkaW8vUmFkaW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9ILE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxNQUFNO0FBQ04sT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRTlDLHNEQUFzRDtBQUN0RCxNQUFNLG9CQUFvQixHQUFHO0lBQzNCLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztJQUMvQyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFPRixNQUFNLE9BQU8sY0FBYzs7O1lBTDFCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixRQUFRLEVBQUUsMkJBQTJCO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7QUFzQkQsTUFBTSxPQUFPLGdCQUFnQjtJQTJCM0IsWUFBb0IsR0FBc0I7UUFBdEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFmMUMsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUV4QixVQUFLLEdBQVcsV0FBVyxDQUFDO1FBSTVCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFHMUIsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRy9DLGtCQUFhLEdBQWEsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLG1CQUFjLEdBQWEsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRVMsQ0FBQztJQUUvQyxNQUFNLENBQUMsS0FBaUI7UUFDdEIsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixvRkFBb0Y7UUFDcEYsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQVU7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsRUFBWTtRQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBWTtRQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsUUFBaUI7UUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQzs7O1lBMUVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsU0FBUyxFQUFFLENBQUMsb0JBQW9CLENBQUM7Z0JBQ2pDLFFBQVEsRUFBRTs7Ozs7Ozs7OztLQVVQO2dCQUNILElBQUksRUFBRTtvQkFDSixrQkFBa0IsRUFBRSxVQUFVO2lCQUMvQjtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7O1lBckNpQyxpQkFBaUI7OzttQkF1Q2hELEtBQUs7b0JBRUwsS0FBSztzQkFFTCxLQUFLO3VCQUVMLEtBQUs7b0JBRUwsS0FBSztxQkFFTCxLQUFLO29CQUVMLEtBQUs7bUJBRUwsS0FBSzt1QkFFTCxLQUFLO3FCQUdMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIEFQUFxuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xuXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcbmNvbnN0IFJBRElPX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b1JhZGlvRWxlbWVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1yYWRpby1ncm91cCcsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvUmFkaW9Hcm91cCB7IH1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1yYWRpbycsXG4gIHByb3ZpZGVyczogW1JBRElPX1ZBTFVFX0FDQ0VTU09SXSxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGlucHV0IFtuYW1lXT1cIm5hbWVcIiB0eXBlPVwicmFkaW9cIiBbY2hlY2tlZF09XCJjaGVja2VkXCIgW2F0dHIuaWRdPVwibmFtZVwiIChjaGFuZ2UpPVwic2VsZWN0KCRldmVudClcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgICAgPGxhYmVsIFthdHRyLmZvcl09XCJuYW1lXCIgKGNsaWNrKT1cInNlbGVjdCgkZXZlbnQpXCIgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwiYnV0dG9uXCIgW25nQ2xhc3NdPVwieyd1bmNoZWNrZWQnOiAhY2hlY2tlZCwgJ2NoZWNrZWQnOiBjaGVja2VkLCAnaGFzLWljb24nOiAhIWljb259XCIgW3RoZW1lXT1cInRoZW1lXCIgW2ljb25dPVwiaWNvblwiPnt7IGxhYmVsIH19PC9idXR0b24+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIWJ1dHRvblwiPlxuICAgICAgICAgICAgICAgIDxpIFtuZ0NsYXNzXT1cInsnYmhpLXJhZGlvLWVtcHR5JzogIWNoZWNrZWQsICdiaGktcmFkaW8tZmlsbGVkJzogY2hlY2tlZH1cIj48L2k+XG4gICAgICAgICAgICAgICAge3sgbGFiZWwgfX1cbiAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9sYWJlbD5cbiAgICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy52ZXJ0aWNhbF0nOiAndmVydGljYWwnLFxuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1JhZGlvRWxlbWVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQElucHV0KClcbiAgbmFtZTogc3RyaW5nO1xuICBASW5wdXQoKVxuICB2YWx1ZTogYW55O1xuICBASW5wdXQoKVxuICBjaGVja2VkOiBib29sZWFuO1xuICBASW5wdXQoKVxuICB2ZXJ0aWNhbDogYm9vbGVhbjtcbiAgQElucHV0KClcbiAgbGFiZWw6IHN0cmluZztcbiAgQElucHV0KClcbiAgYnV0dG9uOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIHRoZW1lOiBzdHJpbmcgPSAnc2Vjb25kYXJ5JztcbiAgQElucHV0KClcbiAgaWNvbjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKVxuICBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIG1vZGVsOiBhbnk7XG4gIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4geyB9O1xuICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7IH07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmKSB7IH1cblxuICBzZWxlY3QoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgLy8gT25seSBjaGFuZ2UgdGhlIGNoZWNrZWQgc3RhdGUgaWYgdGhpcyBpcyBhIG5ldyByYWRpbywgdGhleSBhcmUgbm90IHRvZ2dsZSBidXR0b25zXG4gICAgaWYgKCF0aGlzLmNoZWNrZWQpIHtcbiAgICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG4gICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMudmFsdWUpO1xuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZShtb2RlbDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gIH1cbn1cbiJdfQ==