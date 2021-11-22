import { CdkStepperNext, CdkStepperPrevious } from '@angular/cdk/stepper';
import { Directive } from '@angular/core';
/** Button that moves to the next step in a stepper workflow. */
export class NovoStepperNext extends CdkStepperNext {
}
NovoStepperNext.decorators = [
    { type: Directive, args: [{
                selector: 'button[novoStepperNext],novo-button[novoStepperNext]',
                host: {
                    class: 'novo-stepper-next',
                    '[type]': 'type',
                },
                inputs: ['type'],
            },] }
];
/** Button that moves to the previous step in a stepper workflow. */
export class NovoStepperPrevious extends CdkStepperPrevious {
}
NovoStepperPrevious.decorators = [
    { type: Directive, args: [{
                selector: 'button[novoStepperPrevious],novo-button[novoStepperPrevious]',
                host: {
                    class: 'novo-stepper-previous',
                    '[type]': 'type',
                },
                inputs: ['type'],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci1idXR0b25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9zdGVwcGVyL3N0ZXBwZXItYnV0dG9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUMsZ0VBQWdFO0FBU2hFLE1BQU0sT0FBTyxlQUFnQixTQUFRLGNBQWM7OztZQVJsRCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNEQUFzRDtnQkFDaEUsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxtQkFBbUI7b0JBQzFCLFFBQVEsRUFBRSxNQUFNO2lCQUNqQjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUM7YUFDakI7O0FBR0Qsb0VBQW9FO0FBU3BFLE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxrQkFBa0I7OztZQVIxRCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDhEQUE4RDtnQkFDeEUsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSx1QkFBdUI7b0JBQzlCLFFBQVEsRUFBRSxNQUFNO2lCQUNqQjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUM7YUFDakIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZGtTdGVwcGVyTmV4dCwgQ2RrU3RlcHBlclByZXZpb3VzIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3N0ZXBwZXInO1xuaW1wb3J0IHsgRGlyZWN0aXZlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKiBCdXR0b24gdGhhdCBtb3ZlcyB0byB0aGUgbmV4dCBzdGVwIGluIGEgc3RlcHBlciB3b3JrZmxvdy4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2J1dHRvbltub3ZvU3RlcHBlck5leHRdLG5vdm8tYnV0dG9uW25vdm9TdGVwcGVyTmV4dF0nLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLXN0ZXBwZXItbmV4dCcsXG4gICAgJ1t0eXBlXSc6ICd0eXBlJyxcbiAgfSxcbiAgaW5wdXRzOiBbJ3R5cGUnXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1N0ZXBwZXJOZXh0IGV4dGVuZHMgQ2RrU3RlcHBlck5leHQge31cblxuLyoqIEJ1dHRvbiB0aGF0IG1vdmVzIHRvIHRoZSBwcmV2aW91cyBzdGVwIGluIGEgc3RlcHBlciB3b3JrZmxvdy4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2J1dHRvbltub3ZvU3RlcHBlclByZXZpb3VzXSxub3ZvLWJ1dHRvbltub3ZvU3RlcHBlclByZXZpb3VzXScsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tc3RlcHBlci1wcmV2aW91cycsXG4gICAgJ1t0eXBlXSc6ICd0eXBlJyxcbiAgfSxcbiAgaW5wdXRzOiBbJ3R5cGUnXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1N0ZXBwZXJQcmV2aW91cyBleHRlbmRzIENka1N0ZXBwZXJQcmV2aW91cyB7fVxuIl19