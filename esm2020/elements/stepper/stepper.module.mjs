import { A11yModule } from '@angular/cdk/a11y';
import { PortalModule } from '@angular/cdk/portal';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { NovoStepHeader } from './step-header.component';
import { NovoStepLabel } from './step-label.component';
import { NovoStepStatus } from './step-status.component';
import { NovoStepperNext, NovoStepperPrevious } from './stepper-buttons.component';
import { NovoHorizontalStepper, NovoStep, NovoStepper, NovoVerticalStepper } from './stepper.component';
import * as i0 from "@angular/core";
export class NovoStepperModule {
}
NovoStepperModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoStepperModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoStepperModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoStepperModule, declarations: [NovoHorizontalStepper,
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
NovoStepperModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoStepperModule, imports: [[CommonModule, PortalModule, NovoButtonModule, CdkStepperModule, NovoIconModule, A11yModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoStepperModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9zdGVwcGVyL3N0ZXBwZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDakUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNuRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztBQTBCeEcsTUFBTSxPQUFPLGlCQUFpQjs7K0dBQWpCLGlCQUFpQjtnSEFBakIsaUJBQWlCLGlCQVgxQixxQkFBcUI7UUFDckIsbUJBQW1CO1FBQ25CLFFBQVE7UUFDUixhQUFhO1FBQ2IsV0FBVztRQUNYLGNBQWM7UUFDZCxjQUFjO1FBQ2QsZUFBZTtRQUNmLG1CQUFtQixhQXJCWCxZQUFZLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxVQUFVLGFBRWxHLHFCQUFxQjtRQUNyQixtQkFBbUI7UUFDbkIsUUFBUTtRQUNSLGFBQWE7UUFDYixXQUFXO1FBQ1gsY0FBYztRQUNkLGNBQWM7UUFDZCxlQUFlO1FBQ2YsbUJBQW1CO2dIQWNWLGlCQUFpQixZQXhCbkIsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxVQUFVLENBQUM7NEZBd0IxRixpQkFBaUI7a0JBekI3QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLFVBQVUsQ0FBQztvQkFDckcsT0FBTyxFQUFFO3dCQUNQLHFCQUFxQjt3QkFDckIsbUJBQW1CO3dCQUNuQixRQUFRO3dCQUNSLGFBQWE7d0JBQ2IsV0FBVzt3QkFDWCxjQUFjO3dCQUNkLGNBQWM7d0JBQ2QsZUFBZTt3QkFDZixtQkFBbUI7cUJBQ3BCO29CQUNELFlBQVksRUFBRTt3QkFDWixxQkFBcUI7d0JBQ3JCLG1CQUFtQjt3QkFDbkIsUUFBUTt3QkFDUixhQUFhO3dCQUNiLFdBQVc7d0JBQ1gsY0FBYzt3QkFDZCxjQUFjO3dCQUNkLGVBQWU7d0JBQ2YsbUJBQW1CO3FCQUNwQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEExMXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBQb3J0YWxNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IENka1N0ZXBwZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvc3RlcHBlcic7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9CdXR0b25Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2J1dHRvbic7XG5pbXBvcnQgeyBOb3ZvSWNvbk1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvaWNvbic7XG5pbXBvcnQgeyBOb3ZvU3RlcEhlYWRlciB9IGZyb20gJy4vc3RlcC1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9TdGVwTGFiZWwgfSBmcm9tICcuL3N0ZXAtbGFiZWwuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9TdGVwU3RhdHVzIH0gZnJvbSAnLi9zdGVwLXN0YXR1cy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b1N0ZXBwZXJOZXh0LCBOb3ZvU3RlcHBlclByZXZpb3VzIH0gZnJvbSAnLi9zdGVwcGVyLWJ1dHRvbnMuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9Ib3Jpem9udGFsU3RlcHBlciwgTm92b1N0ZXAsIE5vdm9TdGVwcGVyLCBOb3ZvVmVydGljYWxTdGVwcGVyIH0gZnJvbSAnLi9zdGVwcGVyLmNvbXBvbmVudCc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBQb3J0YWxNb2R1bGUsIE5vdm9CdXR0b25Nb2R1bGUsIENka1N0ZXBwZXJNb2R1bGUsIE5vdm9JY29uTW9kdWxlLCBBMTF5TW9kdWxlXSxcbiAgZXhwb3J0czogW1xuICAgIE5vdm9Ib3Jpem9udGFsU3RlcHBlcixcbiAgICBOb3ZvVmVydGljYWxTdGVwcGVyLFxuICAgIE5vdm9TdGVwLFxuICAgIE5vdm9TdGVwTGFiZWwsXG4gICAgTm92b1N0ZXBwZXIsXG4gICAgTm92b1N0ZXBIZWFkZXIsXG4gICAgTm92b1N0ZXBTdGF0dXMsXG4gICAgTm92b1N0ZXBwZXJOZXh0LFxuICAgIE5vdm9TdGVwcGVyUHJldmlvdXMsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5vdm9Ib3Jpem9udGFsU3RlcHBlcixcbiAgICBOb3ZvVmVydGljYWxTdGVwcGVyLFxuICAgIE5vdm9TdGVwLFxuICAgIE5vdm9TdGVwTGFiZWwsXG4gICAgTm92b1N0ZXBwZXIsXG4gICAgTm92b1N0ZXBIZWFkZXIsXG4gICAgTm92b1N0ZXBTdGF0dXMsXG4gICAgTm92b1N0ZXBwZXJOZXh0LFxuICAgIE5vdm9TdGVwcGVyUHJldmlvdXMsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TdGVwcGVyTW9kdWxlIHt9XG4iXX0=