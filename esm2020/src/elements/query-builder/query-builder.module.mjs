import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NovoButtonModule } from '../button';
import { NovoCardModule } from '../card';
import { NovoChipsModule } from '../chips';
import { NovoCommonModule, NovoOptionModule } from '../common';
import { NovoDatePickerModule } from '../date-picker';
import { NovoFieldModule } from '../field';
import { NovoFlexModule } from '../flex';
import { NovoFormModule } from '../form';
import { NovoIconModule } from '../icon';
import { NovoLoadingModule } from '../loading';
import { NovoNonIdealStateModule } from '../non-ideal-state';
import { NovoSearchBoxModule } from '../search';
import { NovoSelectModule } from '../select';
import { NovoSelectSearchModule } from '../select-search';
import { NovoSwitchModule } from '../switch';
import { NovoTabModule } from '../tabs';
import { ConditionBuilderComponent, ConditionInputOutlet, ConditionOperatorOutlet } from './condition-builder/condition-builder.component';
import { NovoDefaultAddressConditionDef } from './condition-definitions/address-condition.definition';
import { NovoDefaultBooleanConditionDef } from './condition-definitions/boolean-condition.definition';
import { NovoDefaultDateConditionDef } from './condition-definitions/date-condition.definition';
import { NovoDefaultIdConditionDef } from './condition-definitions/id-condition.definition';
import { NovoDefaultNumberConditionDef } from './condition-definitions/number-condition.definition';
import { NovoDefaultPickerConditionDef } from './condition-definitions/picker-condition.definition';
import { NovoDefaultStringConditionDef } from './condition-definitions/string-condition.definition';
import { CriteriaBuilderComponent } from './criteria-builder/criteria-builder.component';
import { QueryBuilderComponent } from './query-builder.component';
import { NovoConditionFieldDef, NovoConditionInputDef, NovoConditionOperatorsDef } from './query-builder.directives';
import * as i0 from "@angular/core";
export class NovoQueryBuilderModule {
}
NovoQueryBuilderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoQueryBuilderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoQueryBuilderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoQueryBuilderModule, declarations: [CriteriaBuilderComponent,
        QueryBuilderComponent,
        ConditionBuilderComponent,
        ConditionInputOutlet,
        ConditionOperatorOutlet,
        NovoDefaultAddressConditionDef,
        NovoDefaultBooleanConditionDef,
        NovoDefaultDateConditionDef,
        NovoConditionOperatorsDef,
        NovoConditionInputDef,
        NovoConditionFieldDef,
        NovoDefaultStringConditionDef,
        NovoDefaultNumberConditionDef,
        NovoDefaultIdConditionDef,
        NovoDefaultPickerConditionDef], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DragDropModule,
        CdkTableModule,
        NovoButtonModule,
        NovoCommonModule,
        NovoFormModule,
        NovoSelectModule,
        NovoNonIdealStateModule,
        NovoFieldModule,
        NovoOptionModule,
        NovoFlexModule,
        NovoTabModule,
        NovoLoadingModule,
        NovoCardModule,
        NovoDatePickerModule,
        NovoIconModule,
        NovoSearchBoxModule,
        NovoSwitchModule,
        NovoChipsModule,
        NovoSelectSearchModule], exports: [CriteriaBuilderComponent,
        QueryBuilderComponent,
        ConditionBuilderComponent,
        NovoDefaultAddressConditionDef,
        NovoDefaultBooleanConditionDef,
        NovoDefaultDateConditionDef,
        NovoConditionOperatorsDef,
        NovoConditionInputDef,
        NovoConditionFieldDef,
        NovoDefaultStringConditionDef,
        NovoDefaultNumberConditionDef,
        NovoDefaultIdConditionDef,
        NovoDefaultPickerConditionDef] });
NovoQueryBuilderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoQueryBuilderModule, imports: [[
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            DragDropModule,
            CdkTableModule,
            NovoButtonModule,
            NovoCommonModule,
            NovoFormModule,
            NovoSelectModule,
            NovoNonIdealStateModule,
            NovoFieldModule,
            NovoOptionModule,
            NovoFlexModule,
            NovoTabModule,
            NovoLoadingModule,
            NovoCardModule,
            NovoDatePickerModule,
            NovoIconModule,
            NovoSearchBoxModule,
            NovoSwitchModule,
            NovoChipsModule,
            NovoSelectSearchModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoQueryBuilderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        DragDropModule,
                        CdkTableModule,
                        NovoButtonModule,
                        NovoCommonModule,
                        NovoFormModule,
                        NovoSelectModule,
                        NovoNonIdealStateModule,
                        NovoFieldModule,
                        NovoOptionModule,
                        NovoFlexModule,
                        NovoTabModule,
                        NovoLoadingModule,
                        NovoCardModule,
                        NovoDatePickerModule,
                        NovoIconModule,
                        NovoSearchBoxModule,
                        NovoSwitchModule,
                        NovoChipsModule,
                        NovoSelectSearchModule,
                    ],
                    declarations: [
                        CriteriaBuilderComponent,
                        QueryBuilderComponent,
                        ConditionBuilderComponent,
                        ConditionInputOutlet,
                        ConditionOperatorOutlet,
                        NovoDefaultAddressConditionDef,
                        NovoDefaultBooleanConditionDef,
                        NovoDefaultDateConditionDef,
                        NovoConditionOperatorsDef,
                        NovoConditionInputDef,
                        NovoConditionFieldDef,
                        NovoDefaultStringConditionDef,
                        NovoDefaultNumberConditionDef,
                        NovoDefaultIdConditionDef,
                        NovoDefaultPickerConditionDef,
                    ],
                    exports: [
                        CriteriaBuilderComponent,
                        QueryBuilderComponent,
                        ConditionBuilderComponent,
                        NovoDefaultAddressConditionDef,
                        NovoDefaultBooleanConditionDef,
                        NovoDefaultDateConditionDef,
                        NovoConditionOperatorsDef,
                        NovoConditionInputDef,
                        NovoConditionFieldDef,
                        NovoDefaultStringConditionDef,
                        NovoDefaultNumberConditionDef,
                        NovoDefaultIdConditionDef,
                        NovoDefaultPickerConditionDef,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktYnVpbGRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9xdWVyeS1idWlsZGVyL3F1ZXJ5LWJ1aWxkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM3QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUN6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQy9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzdELE9B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d0JBQ2QsY0FBYzt3QkFDZCxnQkFBZ0I7d0JBQ2hCLGdCQUFnQjt3QkFDaEIsY0FBYzt3QkFDZCxnQkFBZ0I7d0JBQ2hCLHVCQUF1Qjt3QkFDdkIsZUFBZTt3QkFDZixnQkFBZ0I7d0JBQ2hCLGNBQWM7d0JBQ2QsYUFBYTt3QkFDYixpQkFBaUI7d0JBQ2pCLGNBQWM7d0JBQ2Qsb0JBQW9CO3dCQUNwQixjQUFjO3dCQUNkLG1CQUFtQjt3QkFDbkIsZ0JBQWdCO3dCQUNoQixlQUFlO3dCQUNmLHNCQUFzQjtxQkFDdkI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLHdCQUF3Qjt3QkFDeEIscUJBQXFCO3dCQUNyQix5QkFBeUI7d0JBQ3pCLG9CQUFvQjt3QkFDcEIsdUJBQXVCO3dCQUN2Qiw4QkFBOEI7d0JBQzlCLDhCQUE4Qjt3QkFDOUIsMkJBQTJCO3dCQUMzQix5QkFBeUI7d0JBQ3pCLHFCQUFxQjt3QkFDckIscUJBQXFCO3dCQUNyQiw2QkFBNkI7d0JBQzdCLDZCQUE2Qjt3QkFDN0IseUJBQXlCO3dCQUN6Qiw2QkFBNkI7cUJBQzlCO29CQUNELE9BQU8sRUFBRTt3QkFDUCx3QkFBd0I7d0JBQ3hCLHFCQUFxQjt3QkFDckIseUJBQXlCO3dCQUN6Qiw4QkFBOEI7d0JBQzlCLDhCQUE4Qjt3QkFDOUIsMkJBQTJCO3dCQUMzQix5QkFBeUI7d0JBQ3pCLHFCQUFxQjt3QkFDckIscUJBQXFCO3dCQUNyQiw2QkFBNkI7d0JBQzdCLDZCQUE2Qjt3QkFDN0IseUJBQXlCO3dCQUN6Qiw2QkFBNkI7cUJBQzlCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRHJhZ0Ryb3BNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7IENka1RhYmxlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vYnV0dG9uJztcbmltcG9ydCB7IE5vdm9DYXJkTW9kdWxlIH0gZnJvbSAnLi4vY2FyZCc7XG5pbXBvcnQgeyBOb3ZvQ2hpcHNNb2R1bGUgfSBmcm9tICcuLi9jaGlwcyc7XG5pbXBvcnQgeyBOb3ZvQ29tbW9uTW9kdWxlLCBOb3ZvT3B0aW9uTW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCB7IE5vdm9EYXRlUGlja2VyTW9kdWxlIH0gZnJvbSAnLi4vZGF0ZS1waWNrZXInO1xuaW1wb3J0IHsgTm92b0ZpZWxkTW9kdWxlIH0gZnJvbSAnLi4vZmllbGQnO1xuaW1wb3J0IHsgTm92b0ZsZXhNb2R1bGUgfSBmcm9tICcuLi9mbGV4JztcbmltcG9ydCB7IE5vdm9Gb3JtTW9kdWxlIH0gZnJvbSAnLi4vZm9ybSc7XG5pbXBvcnQgeyBOb3ZvSWNvbk1vZHVsZSB9IGZyb20gJy4uL2ljb24nO1xuaW1wb3J0IHsgTm92b0xvYWRpbmdNb2R1bGUgfSBmcm9tICcuLi9sb2FkaW5nJztcbmltcG9ydCB7IE5vdm9Ob25JZGVhbFN0YXRlTW9kdWxlIH0gZnJvbSAnLi4vbm9uLWlkZWFsLXN0YXRlJztcbmltcG9ydCB7IE5vdm9TZWFyY2hCb3hNb2R1bGUgfSBmcm9tICcuLi9zZWFyY2gnO1xuaW1wb3J0IHsgTm92b1NlbGVjdE1vZHVsZSB9IGZyb20gJy4uL3NlbGVjdCc7XG5pbXBvcnQgeyBOb3ZvU2VsZWN0U2VhcmNoTW9kdWxlIH0gZnJvbSAnLi4vc2VsZWN0LXNlYXJjaCc7XG5pbXBvcnQgeyBOb3ZvU3dpdGNoTW9kdWxlIH0gZnJvbSAnLi4vc3dpdGNoJztcbmltcG9ydCB7IE5vdm9UYWJNb2R1bGUgfSBmcm9tICcuLi90YWJzJztcbmltcG9ydCB7IENvbmRpdGlvbkJ1aWxkZXJDb21wb25lbnQsIENvbmRpdGlvbklucHV0T3V0bGV0LCBDb25kaXRpb25PcGVyYXRvck91dGxldCB9IGZyb20gJy4vY29uZGl0aW9uLWJ1aWxkZXIvY29uZGl0aW9uLWJ1aWxkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9EZWZhdWx0QWRkcmVzc0NvbmRpdGlvbkRlZiB9IGZyb20gJy4vY29uZGl0aW9uLWRlZmluaXRpb25zL2FkZHJlc3MtY29uZGl0aW9uLmRlZmluaXRpb24nO1xuaW1wb3J0IHsgTm92b0RlZmF1bHRCb29sZWFuQ29uZGl0aW9uRGVmIH0gZnJvbSAnLi9jb25kaXRpb24tZGVmaW5pdGlvbnMvYm9vbGVhbi1jb25kaXRpb24uZGVmaW5pdGlvbic7XG5pbXBvcnQgeyBOb3ZvRGVmYXVsdERhdGVDb25kaXRpb25EZWYgfSBmcm9tICcuL2NvbmRpdGlvbi1kZWZpbml0aW9ucy9kYXRlLWNvbmRpdGlvbi5kZWZpbml0aW9uJztcbmltcG9ydCB7IE5vdm9EZWZhdWx0SWRDb25kaXRpb25EZWYgfSBmcm9tICcuL2NvbmRpdGlvbi1kZWZpbml0aW9ucy9pZC1jb25kaXRpb24uZGVmaW5pdGlvbic7XG5pbXBvcnQgeyBOb3ZvRGVmYXVsdE51bWJlckNvbmRpdGlvbkRlZiB9IGZyb20gJy4vY29uZGl0aW9uLWRlZmluaXRpb25zL251bWJlci1jb25kaXRpb24uZGVmaW5pdGlvbic7XG5pbXBvcnQgeyBOb3ZvRGVmYXVsdFBpY2tlckNvbmRpdGlvbkRlZiB9IGZyb20gJy4vY29uZGl0aW9uLWRlZmluaXRpb25zL3BpY2tlci1jb25kaXRpb24uZGVmaW5pdGlvbic7XG5pbXBvcnQgeyBOb3ZvRGVmYXVsdFN0cmluZ0NvbmRpdGlvbkRlZiB9IGZyb20gJy4vY29uZGl0aW9uLWRlZmluaXRpb25zL3N0cmluZy1jb25kaXRpb24uZGVmaW5pdGlvbic7XG5pbXBvcnQgeyBDcml0ZXJpYUJ1aWxkZXJDb21wb25lbnQgfSBmcm9tICcuL2NyaXRlcmlhLWJ1aWxkZXIvY3JpdGVyaWEtYnVpbGRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUXVlcnlCdWlsZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9xdWVyeS1idWlsZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvQ29uZGl0aW9uRmllbGREZWYsIE5vdm9Db25kaXRpb25JbnB1dERlZiwgTm92b0NvbmRpdGlvbk9wZXJhdG9yc0RlZiB9IGZyb20gJy4vcXVlcnktYnVpbGRlci5kaXJlY3RpdmVzJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIERyYWdEcm9wTW9kdWxlLFxuICAgIENka1RhYmxlTW9kdWxlLFxuICAgIE5vdm9CdXR0b25Nb2R1bGUsXG4gICAgTm92b0NvbW1vbk1vZHVsZSxcbiAgICBOb3ZvRm9ybU1vZHVsZSxcbiAgICBOb3ZvU2VsZWN0TW9kdWxlLFxuICAgIE5vdm9Ob25JZGVhbFN0YXRlTW9kdWxlLFxuICAgIE5vdm9GaWVsZE1vZHVsZSxcbiAgICBOb3ZvT3B0aW9uTW9kdWxlLFxuICAgIE5vdm9GbGV4TW9kdWxlLFxuICAgIE5vdm9UYWJNb2R1bGUsXG4gICAgTm92b0xvYWRpbmdNb2R1bGUsXG4gICAgTm92b0NhcmRNb2R1bGUsXG4gICAgTm92b0RhdGVQaWNrZXJNb2R1bGUsXG4gICAgTm92b0ljb25Nb2R1bGUsXG4gICAgTm92b1NlYXJjaEJveE1vZHVsZSxcbiAgICBOb3ZvU3dpdGNoTW9kdWxlLFxuICAgIE5vdm9DaGlwc01vZHVsZSxcbiAgICBOb3ZvU2VsZWN0U2VhcmNoTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDcml0ZXJpYUJ1aWxkZXJDb21wb25lbnQsXG4gICAgUXVlcnlCdWlsZGVyQ29tcG9uZW50LFxuICAgIENvbmRpdGlvbkJ1aWxkZXJDb21wb25lbnQsXG4gICAgQ29uZGl0aW9uSW5wdXRPdXRsZXQsXG4gICAgQ29uZGl0aW9uT3BlcmF0b3JPdXRsZXQsXG4gICAgTm92b0RlZmF1bHRBZGRyZXNzQ29uZGl0aW9uRGVmLFxuICAgIE5vdm9EZWZhdWx0Qm9vbGVhbkNvbmRpdGlvbkRlZixcbiAgICBOb3ZvRGVmYXVsdERhdGVDb25kaXRpb25EZWYsXG4gICAgTm92b0NvbmRpdGlvbk9wZXJhdG9yc0RlZixcbiAgICBOb3ZvQ29uZGl0aW9uSW5wdXREZWYsXG4gICAgTm92b0NvbmRpdGlvbkZpZWxkRGVmLFxuICAgIE5vdm9EZWZhdWx0U3RyaW5nQ29uZGl0aW9uRGVmLFxuICAgIE5vdm9EZWZhdWx0TnVtYmVyQ29uZGl0aW9uRGVmLFxuICAgIE5vdm9EZWZhdWx0SWRDb25kaXRpb25EZWYsXG4gICAgTm92b0RlZmF1bHRQaWNrZXJDb25kaXRpb25EZWYsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBDcml0ZXJpYUJ1aWxkZXJDb21wb25lbnQsXG4gICAgUXVlcnlCdWlsZGVyQ29tcG9uZW50LFxuICAgIENvbmRpdGlvbkJ1aWxkZXJDb21wb25lbnQsXG4gICAgTm92b0RlZmF1bHRBZGRyZXNzQ29uZGl0aW9uRGVmLFxuICAgIE5vdm9EZWZhdWx0Qm9vbGVhbkNvbmRpdGlvbkRlZixcbiAgICBOb3ZvRGVmYXVsdERhdGVDb25kaXRpb25EZWYsXG4gICAgTm92b0NvbmRpdGlvbk9wZXJhdG9yc0RlZixcbiAgICBOb3ZvQ29uZGl0aW9uSW5wdXREZWYsXG4gICAgTm92b0NvbmRpdGlvbkZpZWxkRGVmLFxuICAgIE5vdm9EZWZhdWx0U3RyaW5nQ29uZGl0aW9uRGVmLFxuICAgIE5vdm9EZWZhdWx0TnVtYmVyQ29uZGl0aW9uRGVmLFxuICAgIE5vdm9EZWZhdWx0SWRDb25kaXRpb25EZWYsXG4gICAgTm92b0RlZmF1bHRQaWNrZXJDb25kaXRpb25EZWYsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9RdWVyeUJ1aWxkZXJNb2R1bGUge31cbiJdfQ==