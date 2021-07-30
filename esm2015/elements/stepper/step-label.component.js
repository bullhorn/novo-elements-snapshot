import { Directive, TemplateRef } from '@angular/core';
import { CdkStepLabel } from '@angular/cdk/stepper';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC1sYWJlbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3N0ZXBwZXIvc3RlcC1sYWJlbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBS3BELE1BQU0sT0FBTyxhQUFjLFNBQVEsWUFBWTtJQUM3QyxZQUFZLFFBQTBCO1FBQ3BDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsQixDQUFDOzs7WUFORixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjthQUM1Qjs7O1lBTG1CLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENka1N0ZXBMYWJlbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zdGVwcGVyJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW25vdm9TdGVwTGFiZWxdJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9TdGVwTGFiZWwgZXh0ZW5kcyBDZGtTdGVwTGFiZWwge1xyXG4gIGNvbnN0cnVjdG9yKHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+KSB7XHJcbiAgICBzdXBlcih0ZW1wbGF0ZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==