import { CdkStepperNext, CdkStepperPrevious } from '@angular/cdk/stepper';
import { Directive } from '@angular/core';
import * as i0 from "@angular/core";
/** Button that moves to the next step in a stepper workflow. */
export class NovoStepperNext extends CdkStepperNext {
}
NovoStepperNext.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoStepperNext, deps: null, target: i0.ɵɵFactoryTarget.Directive });
NovoStepperNext.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoStepperNext, selector: "button[novoStepperNext],novo-button[novoStepperNext]", inputs: { type: "type" }, host: { properties: { "type": "type" }, classAttribute: "novo-stepper-next" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoStepperNext, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[novoStepperNext],novo-button[novoStepperNext]',
                    host: {
                        class: 'novo-stepper-next',
                        '[type]': 'type',
                    },
                    inputs: ['type'],
                }]
        }] });
/** Button that moves to the previous step in a stepper workflow. */
export class NovoStepperPrevious extends CdkStepperPrevious {
}
NovoStepperPrevious.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoStepperPrevious, deps: null, target: i0.ɵɵFactoryTarget.Directive });
NovoStepperPrevious.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoStepperPrevious, selector: "button[novoStepperPrevious],novo-button[novoStepperPrevious]", inputs: { type: "type" }, host: { properties: { "type": "type" }, classAttribute: "novo-stepper-previous" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoStepperPrevious, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[novoStepperPrevious],novo-button[novoStepperPrevious]',
                    host: {
                        class: 'novo-stepper-previous',
                        '[type]': 'type',
                    },
                    inputs: ['type'],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci1idXR0b25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvc3RlcHBlci9zdGVwcGVyLWJ1dHRvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUxQyxnRUFBZ0U7QUFTaEUsTUFBTSxPQUFPLGVBQWdCLFNBQVEsY0FBYzs7NkdBQXRDLGVBQWU7aUdBQWYsZUFBZTs0RkFBZixlQUFlO2tCQVIzQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxzREFBc0Q7b0JBQ2hFLElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsbUJBQW1CO3dCQUMxQixRQUFRLEVBQUUsTUFBTTtxQkFDakI7b0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDO2lCQUNqQjs7QUFHRCxvRUFBb0U7QUFTcEUsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGtCQUFrQjs7aUhBQTlDLG1CQUFtQjtxR0FBbkIsbUJBQW1COzRGQUFuQixtQkFBbUI7a0JBUi9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDhEQUE4RDtvQkFDeEUsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSx1QkFBdUI7d0JBQzlCLFFBQVEsRUFBRSxNQUFNO3FCQUNqQjtvQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUM7aUJBQ2pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2RrU3RlcHBlck5leHQsIENka1N0ZXBwZXJQcmV2aW91cyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zdGVwcGVyJztcbmltcG9ydCB7IERpcmVjdGl2ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKiogQnV0dG9uIHRoYXQgbW92ZXMgdG8gdGhlIG5leHQgc3RlcCBpbiBhIHN0ZXBwZXIgd29ya2Zsb3cuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdidXR0b25bbm92b1N0ZXBwZXJOZXh0XSxub3ZvLWJ1dHRvbltub3ZvU3RlcHBlck5leHRdJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1zdGVwcGVyLW5leHQnLFxuICAgICdbdHlwZV0nOiAndHlwZScsXG4gIH0sXG4gIGlucHV0czogWyd0eXBlJ10sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TdGVwcGVyTmV4dCBleHRlbmRzIENka1N0ZXBwZXJOZXh0IHt9XG5cbi8qKiBCdXR0b24gdGhhdCBtb3ZlcyB0byB0aGUgcHJldmlvdXMgc3RlcCBpbiBhIHN0ZXBwZXIgd29ya2Zsb3cuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdidXR0b25bbm92b1N0ZXBwZXJQcmV2aW91c10sbm92by1idXR0b25bbm92b1N0ZXBwZXJQcmV2aW91c10nLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLXN0ZXBwZXItcHJldmlvdXMnLFxuICAgICdbdHlwZV0nOiAndHlwZScsXG4gIH0sXG4gIGlucHV0czogWyd0eXBlJ10sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TdGVwcGVyUHJldmlvdXMgZXh0ZW5kcyBDZGtTdGVwcGVyUHJldmlvdXMge31cbiJdfQ==