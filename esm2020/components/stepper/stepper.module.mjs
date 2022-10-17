import { A11yModule } from '@angular/cdk/a11y';
import { PortalModule } from '@angular/cdk/portal';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoHorizontalStepper, NovoStep, NovoStepper, NovoVerticalStepper } from './stepper.component';
import { NovoStepperNext, NovoStepperPrevious } from './stepper-buttons.component';
import { NovoStepStatus } from './step-status.component';
import { NovoStepLabel } from './step-label.component';
import { NovoStepHeader } from './step-header.component';
import { NovoIconModule } from 'novo-elements/components/icon';
import { NovoButtonModule } from 'novo-elements/components/button';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL3N0ZXBwZXIvc3RlcHBlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hHLE9BQU8sRUFBRSxlQUFlLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNuRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUNBQWlDLENBQUM7O0FBMEJuRSxNQUFNLE9BQU8saUJBQWlCOzsrR0FBakIsaUJBQWlCO2dIQUFqQixpQkFBaUIsaUJBWDFCLHFCQUFxQjtRQUNyQixtQkFBbUI7UUFDbkIsUUFBUTtRQUNSLGFBQWE7UUFDYixXQUFXO1FBQ1gsY0FBYztRQUNkLGNBQWM7UUFDZCxlQUFlO1FBQ2YsbUJBQW1CLGFBckJYLFlBQVksRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLFVBQVUsYUFFbEcscUJBQXFCO1FBQ3JCLG1CQUFtQjtRQUNuQixRQUFRO1FBQ1IsYUFBYTtRQUNiLFdBQVc7UUFDWCxjQUFjO1FBQ2QsY0FBYztRQUNkLGVBQWU7UUFDZixtQkFBbUI7Z0hBY1YsaUJBQWlCLFlBeEJuQixDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLFVBQVUsQ0FBQzs0RkF3QjFGLGlCQUFpQjtrQkF6QjdCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsVUFBVSxDQUFDO29CQUNyRyxPQUFPLEVBQUU7d0JBQ1AscUJBQXFCO3dCQUNyQixtQkFBbUI7d0JBQ25CLFFBQVE7d0JBQ1IsYUFBYTt3QkFDYixXQUFXO3dCQUNYLGNBQWM7d0JBQ2QsY0FBYzt3QkFDZCxlQUFlO3dCQUNmLG1CQUFtQjtxQkFDcEI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLHFCQUFxQjt3QkFDckIsbUJBQW1CO3dCQUNuQixRQUFRO3dCQUNSLGFBQWE7d0JBQ2IsV0FBVzt3QkFDWCxjQUFjO3dCQUNkLGNBQWM7d0JBQ2QsZUFBZTt3QkFDZixtQkFBbUI7cUJBQ3BCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IFBvcnRhbE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgQ2RrU3RlcHBlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zdGVwcGVyJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0hvcml6b250YWxTdGVwcGVyLCBOb3ZvU3RlcCwgTm92b1N0ZXBwZXIsIE5vdm9WZXJ0aWNhbFN0ZXBwZXIgfSBmcm9tICcuL3N0ZXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9TdGVwcGVyTmV4dCwgTm92b1N0ZXBwZXJQcmV2aW91cyB9IGZyb20gJy4vc3RlcHBlci1idXR0b25zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvU3RlcFN0YXR1cyB9IGZyb20gJy4vc3RlcC1zdGF0dXMuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9TdGVwTGFiZWwgfSBmcm9tICcuL3N0ZXAtbGFiZWwuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9TdGVwSGVhZGVyIH0gZnJvbSAnLi9zdGVwLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b0ljb25Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvaWNvbic7XG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL2J1dHRvbic7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBQb3J0YWxNb2R1bGUsIE5vdm9CdXR0b25Nb2R1bGUsIENka1N0ZXBwZXJNb2R1bGUsIE5vdm9JY29uTW9kdWxlLCBBMTF5TW9kdWxlXSxcbiAgZXhwb3J0czogW1xuICAgIE5vdm9Ib3Jpem9udGFsU3RlcHBlcixcbiAgICBOb3ZvVmVydGljYWxTdGVwcGVyLFxuICAgIE5vdm9TdGVwLFxuICAgIE5vdm9TdGVwTGFiZWwsXG4gICAgTm92b1N0ZXBwZXIsXG4gICAgTm92b1N0ZXBIZWFkZXIsXG4gICAgTm92b1N0ZXBTdGF0dXMsXG4gICAgTm92b1N0ZXBwZXJOZXh0LFxuICAgIE5vdm9TdGVwcGVyUHJldmlvdXMsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5vdm9Ib3Jpem9udGFsU3RlcHBlcixcbiAgICBOb3ZvVmVydGljYWxTdGVwcGVyLFxuICAgIE5vdm9TdGVwLFxuICAgIE5vdm9TdGVwTGFiZWwsXG4gICAgTm92b1N0ZXBwZXIsXG4gICAgTm92b1N0ZXBIZWFkZXIsXG4gICAgTm92b1N0ZXBTdGF0dXMsXG4gICAgTm92b1N0ZXBwZXJOZXh0LFxuICAgIE5vdm9TdGVwcGVyUHJldmlvdXMsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TdGVwcGVyTW9kdWxlIHt9XG4iXX0=