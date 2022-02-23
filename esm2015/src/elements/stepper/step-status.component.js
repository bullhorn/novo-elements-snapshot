import { ChangeDetectionStrategy, Component, forwardRef, Inject, Input } from '@angular/core';
import { NovoStepHeader } from './step-header.component';
import { NovoStepper } from './stepper.component';
export class NovoStepStatus {
    constructor(stepper, step) { }
}
NovoStepStatus.decorators = [
    { type: Component, args: [{
                selector: 'novo-step-status',
                template: "<div class=\"novo-stepper-status-line\" [ngClass]=\"state\"></div>\n<div [ngSwitch]=\"state\" class=\"novo-stepper-status-icon\">\n  <novo-icon color=\"positive\" *ngSwitchCase=\"'edit'\">check-circle</novo-icon>\n  <novo-icon color=\"positive\" *ngSwitchCase=\"'done'\">check-circle-filled</novo-icon>\n  <novo-icon color=\"positive\" *ngSwitchDefault>circle-o</novo-icon>\n</div>",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC1zdGF0dXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL3N0ZXBwZXIvc3RlcC1zdGF0dXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQVlsRCxNQUFNLE9BQU8sY0FBYztJQUl6QixZQUN5QyxPQUFvQixFQUNqQixJQUFvQixJQUM3RCxDQUFDOzs7WUFqQkwsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLHlZQUF5QztnQkFDekMseUNBQXlDO2dCQUN6QyxtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxrQkFBa0I7aUJBQzFCO2FBQ0Y7OztZQVhRLFdBQVcsdUJBaUJmLE1BQU0sU0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDO1lBbEJoQyxjQUFjLHVCQW1CbEIsTUFBTSxTQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUM7OztvQkFMekMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIGZvcndhcmRSZWYsIEluamVjdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9TdGVwSGVhZGVyIH0gZnJvbSAnLi9zdGVwLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b1N0ZXBwZXIgfSBmcm9tICcuL3N0ZXBwZXIuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1zdGVwLXN0YXR1cycsXG4gIHRlbXBsYXRlVXJsOiAnc3RlcC1zdGF0dXMuY29tcG9uZW50Lmh0bWwnLFxuICAvLyBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tc3RlcC1zdGF0dXMnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvU3RlcFN0YXR1cyB7XG4gIEBJbnB1dCgpXG4gIHN0YXRlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5vdm9TdGVwcGVyKSkgc3RlcHBlcjogTm92b1N0ZXBwZXIsXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5vdm9TdGVwSGVhZGVyKSkgc3RlcDogTm92b1N0ZXBIZWFkZXIsXG4gICkge31cbn1cbiJdfQ==