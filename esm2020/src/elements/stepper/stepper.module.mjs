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
import * as i0 from "@angular/core";
export class NovoStepperModule {
}
NovoStepperModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoStepperModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoStepperModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoStepperModule, declarations: [NovoHorizontalStepper,
        NovoVerticalStepper,
        NovoStep,
        NovoStepLabel,
        NovoStepper,
        NovoStepHeader,
        NovoStepStatus,
        NovoStepperNext,
        NovoStepperPrevious], imports: [CommonModule, PortalModule, NovoButtonModule, CdkStepperModule, NovoIconModule, A11yModule], exports: [NovoHorizontalStepper,
        NovoVerticalStepper,
        NovoStep,
        NovoStepLabel,
        NovoStepper,
        NovoStepHeader,
        NovoStepStatus,
        NovoStepperNext,
        NovoStepperPrevious] });
NovoStepperModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoStepperModule, imports: [[CommonModule, PortalModule, NovoButtonModule, CdkStepperModule, NovoIconModule, A11yModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoStepperModule, decorators: [{
            type: NgModule,
            args: [{
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
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9zdGVwcGVyL3N0ZXBwZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNuRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztBQTBCeEcsTUFBTSxPQUFPLGlCQUFpQjs7OEdBQWpCLGlCQUFpQjsrR0FBakIsaUJBQWlCLGlCQVgxQixxQkFBcUI7UUFDckIsbUJBQW1CO1FBQ25CLFFBQVE7UUFDUixhQUFhO1FBQ2IsV0FBVztRQUNYLGNBQWM7UUFDZCxjQUFjO1FBQ2QsZUFBZTtRQUNmLG1CQUFtQixhQXJCWCxZQUFZLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxVQUFVLGFBRWxHLHFCQUFxQjtRQUNyQixtQkFBbUI7UUFDbkIsUUFBUTtRQUNSLGFBQWE7UUFDYixXQUFXO1FBQ1gsY0FBYztRQUNkLGNBQWM7UUFDZCxlQUFlO1FBQ2YsbUJBQW1COytHQWNWLGlCQUFpQixZQXhCbkIsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxVQUFVLENBQUM7MkZBd0IxRixpQkFBaUI7a0JBekI3QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLFVBQVUsQ0FBQztvQkFDckcsT0FBTyxFQUFFO3dCQUNQLHFCQUFxQjt3QkFDckIsbUJBQW1CO3dCQUNuQixRQUFRO3dCQUNSLGFBQWE7d0JBQ2IsV0FBVzt3QkFDWCxjQUFjO3dCQUNkLGNBQWM7d0JBQ2QsZUFBZTt3QkFDZixtQkFBbUI7cUJBQ3BCO29CQUNELFlBQVksRUFBRTt3QkFDWixxQkFBcUI7d0JBQ3JCLG1CQUFtQjt3QkFDbkIsUUFBUTt3QkFDUixhQUFhO3dCQUNiLFdBQVc7d0JBQ1gsY0FBYzt3QkFDZCxjQUFjO3dCQUNkLGVBQWU7d0JBQ2YsbUJBQW1CO3FCQUNwQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEExMXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBQb3J0YWxNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IENka1N0ZXBwZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvc3RlcHBlcic7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9CdXR0b25Nb2R1bGUgfSBmcm9tICcuLi9idXR0b24vQnV0dG9uLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvSWNvbk1vZHVsZSB9IGZyb20gJy4uL2ljb24vSWNvbi5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1N0ZXBIZWFkZXIgfSBmcm9tICcuL3N0ZXAtaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvU3RlcExhYmVsIH0gZnJvbSAnLi9zdGVwLWxhYmVsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvU3RlcFN0YXR1cyB9IGZyb20gJy4vc3RlcC1zdGF0dXMuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9TdGVwcGVyTmV4dCwgTm92b1N0ZXBwZXJQcmV2aW91cyB9IGZyb20gJy4vc3RlcHBlci1idXR0b25zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvSG9yaXpvbnRhbFN0ZXBwZXIsIE5vdm9TdGVwLCBOb3ZvU3RlcHBlciwgTm92b1ZlcnRpY2FsU3RlcHBlciB9IGZyb20gJy4vc3RlcHBlci5jb21wb25lbnQnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUG9ydGFsTW9kdWxlLCBOb3ZvQnV0dG9uTW9kdWxlLCBDZGtTdGVwcGVyTW9kdWxlLCBOb3ZvSWNvbk1vZHVsZSwgQTExeU1vZHVsZV0sXG4gIGV4cG9ydHM6IFtcbiAgICBOb3ZvSG9yaXpvbnRhbFN0ZXBwZXIsXG4gICAgTm92b1ZlcnRpY2FsU3RlcHBlcixcbiAgICBOb3ZvU3RlcCxcbiAgICBOb3ZvU3RlcExhYmVsLFxuICAgIE5vdm9TdGVwcGVyLFxuICAgIE5vdm9TdGVwSGVhZGVyLFxuICAgIE5vdm9TdGVwU3RhdHVzLFxuICAgIE5vdm9TdGVwcGVyTmV4dCxcbiAgICBOb3ZvU3RlcHBlclByZXZpb3VzLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOb3ZvSG9yaXpvbnRhbFN0ZXBwZXIsXG4gICAgTm92b1ZlcnRpY2FsU3RlcHBlcixcbiAgICBOb3ZvU3RlcCxcbiAgICBOb3ZvU3RlcExhYmVsLFxuICAgIE5vdm9TdGVwcGVyLFxuICAgIE5vdm9TdGVwSGVhZGVyLFxuICAgIE5vdm9TdGVwU3RhdHVzLFxuICAgIE5vdm9TdGVwcGVyTmV4dCxcbiAgICBOb3ZvU3RlcHBlclByZXZpb3VzLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvU3RlcHBlck1vZHVsZSB7fVxuIl19