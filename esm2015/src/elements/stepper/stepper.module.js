import { A11yModule } from '@angular/cdk/a11y';
import { PortalModule } from '@angular/cdk/portal';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoButtonModule } from '../button/Button.module';
import { NovoIconModule } from '../icon/Icon.module';
import { NovoStepHeader } from './step-header.component';
import { NovoStepLabel } from './step-label.component';
import { NovoStepStatus } from './step-status.component';
import { NovoStepperNext, NovoStepperPrevious } from './stepper-buttons.component';
import { NovoHorizontalStepper, NovoStep, NovoStepper, NovoVerticalStepper } from './stepper.component';
export class NovoStepperModule {
}
NovoStepperModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, PortalModule, NovoButtonModule, CdkStepperModule, NovoIconModule, A11yModule],
                exports: [
                    NovoHorizontalStepper,
                    NovoVerticalStepper,
                    NovoStep,
                    NovoStepLabel,
                    NovoStepper,
                    NovoStepHeader,
                    NovoStepStatus,
                    NovoStepperNext,
                    NovoStepperPrevious,
                ],
                declarations: [
                    NovoHorizontalStepper,
                    NovoVerticalStepper,
                    NovoStep,
                    NovoStepLabel,
                    NovoStepper,
                    NovoStepHeader,
                    NovoStepStatus,
                    NovoStepperNext,
                    NovoStepperPrevious,
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvc3RlcHBlci9zdGVwcGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZUFBZSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDbkYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQTBCeEcsTUFBTSxPQUFPLGlCQUFpQjs7O1lBekI3QixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsVUFBVSxDQUFDO2dCQUNyRyxPQUFPLEVBQUU7b0JBQ1AscUJBQXFCO29CQUNyQixtQkFBbUI7b0JBQ25CLFFBQVE7b0JBQ1IsYUFBYTtvQkFDYixXQUFXO29CQUNYLGNBQWM7b0JBQ2QsY0FBYztvQkFDZCxlQUFlO29CQUNmLG1CQUFtQjtpQkFDcEI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLHFCQUFxQjtvQkFDckIsbUJBQW1CO29CQUNuQixRQUFRO29CQUNSLGFBQWE7b0JBQ2IsV0FBVztvQkFDWCxjQUFjO29CQUNkLGNBQWM7b0JBQ2QsZUFBZTtvQkFDZixtQkFBbUI7aUJBQ3BCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBMTF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgUG9ydGFsTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBDZGtTdGVwcGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3N0ZXBwZXInO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vYnV0dG9uL0J1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0ljb25Nb2R1bGUgfSBmcm9tICcuLi9pY29uL0ljb24ubW9kdWxlJztcbmltcG9ydCB7IE5vdm9TdGVwSGVhZGVyIH0gZnJvbSAnLi9zdGVwLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b1N0ZXBMYWJlbCB9IGZyb20gJy4vc3RlcC1sYWJlbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b1N0ZXBTdGF0dXMgfSBmcm9tICcuL3N0ZXAtc3RhdHVzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvU3RlcHBlck5leHQsIE5vdm9TdGVwcGVyUHJldmlvdXMgfSBmcm9tICcuL3N0ZXBwZXItYnV0dG9ucy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b0hvcml6b250YWxTdGVwcGVyLCBOb3ZvU3RlcCwgTm92b1N0ZXBwZXIsIE5vdm9WZXJ0aWNhbFN0ZXBwZXIgfSBmcm9tICcuL3N0ZXBwZXIuY29tcG9uZW50JztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFBvcnRhbE1vZHVsZSwgTm92b0J1dHRvbk1vZHVsZSwgQ2RrU3RlcHBlck1vZHVsZSwgTm92b0ljb25Nb2R1bGUsIEExMXlNb2R1bGVdLFxuICBleHBvcnRzOiBbXG4gICAgTm92b0hvcml6b250YWxTdGVwcGVyLFxuICAgIE5vdm9WZXJ0aWNhbFN0ZXBwZXIsXG4gICAgTm92b1N0ZXAsXG4gICAgTm92b1N0ZXBMYWJlbCxcbiAgICBOb3ZvU3RlcHBlcixcbiAgICBOb3ZvU3RlcEhlYWRlcixcbiAgICBOb3ZvU3RlcFN0YXR1cyxcbiAgICBOb3ZvU3RlcHBlck5leHQsXG4gICAgTm92b1N0ZXBwZXJQcmV2aW91cyxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTm92b0hvcml6b250YWxTdGVwcGVyLFxuICAgIE5vdm9WZXJ0aWNhbFN0ZXBwZXIsXG4gICAgTm92b1N0ZXAsXG4gICAgTm92b1N0ZXBMYWJlbCxcbiAgICBOb3ZvU3RlcHBlcixcbiAgICBOb3ZvU3RlcEhlYWRlcixcbiAgICBOb3ZvU3RlcFN0YXR1cyxcbiAgICBOb3ZvU3RlcHBlck5leHQsXG4gICAgTm92b1N0ZXBwZXJQcmV2aW91cyxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1N0ZXBwZXJNb2R1bGUge31cbiJdfQ==