import { ChangeDetectionStrategy, Component, Input, Inject, forwardRef } from '@angular/core';
import { NovoStepper } from './stepper.component';
import { NovoStepHeader } from './step-header.component';
export class NovoStepStatus {
    constructor(stepper, step) { }
}
NovoStepStatus.decorators = [
    { type: Component, args: [{
                selector: 'novo-step-status',
                template: "<div class=\"novo-stepper-status-line\" [ngClass]=\"state\"></div>\r\n<div [ngSwitch]=\"state\" class=\"novo-stepper-status-icon\">\r\n  <novo-icon size=\"small\" color=\"positive\" *ngSwitchCase=\"'edit'\">check-circle</novo-icon>\r\n  <novo-icon size=\"small\" color=\"positive\" *ngSwitchCase=\"'done'\">check-circle-filled</novo-icon>\r\n  <novo-icon size=\"small\" color=\"positive\" *ngSwitchDefault>circle-o</novo-icon>\r\n</div>\r\n",
                // encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    class: 'novo-step-status',
                }
            },] }
];
NovoStepStatus.ctorParameters = () => [
    { type: NovoStepper, decorators: [{ type: Inject, args: [forwardRef(() => NovoStepper),] }] },
    { type: NovoStepHeader, decorators: [{ type: Inject, args: [forwardRef(() => NovoStepHeader),] }] }
];
NovoStepStatus.propDecorators = {
    state: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC1zdGF0dXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9zdGVwcGVyL3N0ZXAtc3RhdHVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFZekQsTUFBTSxPQUFPLGNBQWM7SUFJekIsWUFDeUMsT0FBb0IsRUFDakIsSUFBb0IsSUFDN0QsQ0FBQzs7O1lBakJMLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixvY0FBeUM7Z0JBQ3pDLHlDQUF5QztnQkFDekMsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsa0JBQWtCO2lCQUMxQjthQUNGOzs7WUFaUSxXQUFXLHVCQWtCZixNQUFNLFNBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQWpCaEMsY0FBYyx1QkFrQmxCLE1BQU0sU0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDOzs7b0JBTHpDLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgSW5qZWN0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5vdm9TdGVwcGVyIH0gZnJvbSAnLi9zdGVwcGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5vdm9TdGVwSGVhZGVyIH0gZnJvbSAnLi9zdGVwLWhlYWRlci5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLXN0ZXAtc3RhdHVzJyxcclxuICB0ZW1wbGF0ZVVybDogJ3N0ZXAtc3RhdHVzLmNvbXBvbmVudC5odG1sJyxcclxuICAvLyBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIGhvc3Q6IHtcclxuICAgIGNsYXNzOiAnbm92by1zdGVwLXN0YXR1cycsXHJcbiAgfSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9TdGVwU3RhdHVzIHtcclxuICBASW5wdXQoKVxyXG4gIHN0YXRlOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5vdm9TdGVwcGVyKSkgc3RlcHBlcjogTm92b1N0ZXBwZXIsXHJcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTm92b1N0ZXBIZWFkZXIpKSBzdGVwOiBOb3ZvU3RlcEhlYWRlcixcclxuICApIHt9XHJcbn1cclxuIl19