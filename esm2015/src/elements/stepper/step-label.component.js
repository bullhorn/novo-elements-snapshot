import { CdkStepLabel } from '@angular/cdk/stepper';
import { Directive, TemplateRef } from '@angular/core';
export class NovoStepLabel extends CdkStepLabel {
    constructor(template) {
        super(template);
    }
}
NovoStepLabel.decorators = [
    { type: Directive, args: [{
                selector: '[novoStepLabel]',
            },] }
];
NovoStepLabel.ctorParameters = () => [
    { type: TemplateRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC1sYWJlbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvc3RlcHBlci9zdGVwLWxhYmVsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLdkQsTUFBTSxPQUFPLGFBQWMsU0FBUSxZQUFZO0lBQzdDLFlBQVksUUFBMEI7UUFDcEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7OztZQU5GLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2FBQzVCOzs7WUFKbUIsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENka1N0ZXBMYWJlbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zdGVwcGVyJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25vdm9TdGVwTGFiZWxdJyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1N0ZXBMYWJlbCBleHRlbmRzIENka1N0ZXBMYWJlbCB7XG4gIGNvbnN0cnVjdG9yKHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgc3VwZXIodGVtcGxhdGUpO1xuICB9XG59XG4iXX0=