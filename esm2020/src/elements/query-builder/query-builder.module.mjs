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
import { NovoDropdownModule } from '../dropdown';
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
import { ConditionGroupComponent } from './condition-group/condition-group.component';
import { CriteriaBuilderComponent } from './criteria-builder/criteria-builder.component';
import { NovoConditionFieldDef, NovoConditionInputDef, NovoConditionOperatorsDef } from './query-builder.directives';
import * as i0 from "@angular/core";
export class NovoQueryBuilderModule {
}
NovoQueryBuilderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoQueryBuilderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoQueryBuilderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoQueryBuilderModule, declarations: [CriteriaBuilderComponent,
        ConditionBuilderComponent,
        ConditionInputOutlet,
        ConditionOperatorOutlet,
        ConditionGroupComponent,
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
        NovoSelectSearchModule,
        NovoDropdownModule], exports: [CriteriaBuilderComponent,
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
            NovoDropdownModule,
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
                        NovoDropdownModule,
                    ],
                    declarations: [
                        CriteriaBuilderComponent,
                        ConditionBuilderComponent,
                        ConditionInputOutlet,
                        ConditionOperatorOutlet,
                        ConditionGroupComponent,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktYnVpbGRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9xdWVyeS1idWlsZGVyL3F1ZXJ5LWJ1aWxkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM3QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUN6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMvQyxPQUFP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QUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsY0FBYzt3QkFDZCxjQUFjO3dCQUNkLGdCQUFnQjt3QkFDaEIsZ0JBQWdCO3dCQUNoQixjQUFjO3dCQUNkLGdCQUFnQjt3QkFDaEIsdUJBQXVCO3dCQUN2QixlQUFlO3dCQUNmLGdCQUFnQjt3QkFDaEIsY0FBYzt3QkFDZCxhQUFhO3dCQUNiLGlCQUFpQjt3QkFDakIsY0FBYzt3QkFDZCxvQkFBb0I7d0JBQ3BCLGNBQWM7d0JBQ2QsbUJBQW1CO3dCQUNuQixnQkFBZ0I7d0JBQ2hCLGVBQWU7d0JBQ2Ysc0JBQXNCO3dCQUN0QixrQkFBa0I7cUJBQ25CO29CQUNELFlBQVksRUFBRTt3QkFDWix3QkFBd0I7d0JBQ3hCLHlCQUF5Qjt3QkFDekIsb0JBQW9CO3dCQUNwQix1QkFBdUI7d0JBQ3ZCLHVCQUF1Qjt3QkFDdkIsOEJBQThCO3dCQUM5Qiw4QkFBOEI7d0JBQzlCLDJCQUEyQjt3QkFDM0IseUJBQXlCO3dCQUN6QixxQkFBcUI7d0JBQ3JCLHFCQUFxQjt3QkFDckIsNkJBQTZCO3dCQUM3Qiw2QkFBNkI7d0JBQzdCLHlCQUF5Qjt3QkFDekIsNkJBQTZCO3FCQUM5QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1Asd0JBQXdCO3dCQUN4Qix5QkFBeUI7d0JBQ3pCLDhCQUE4Qjt3QkFDOUIsOEJBQThCO3dCQUM5QiwyQkFBMkI7d0JBQzNCLHlCQUF5Qjt3QkFDekIscUJBQXFCO3dCQUNyQixxQkFBcUI7d0JBQ3JCLDZCQUE2Qjt3QkFDN0IsNkJBQTZCO3dCQUM3Qix5QkFBeUI7d0JBQ3pCLDZCQUE2QjtxQkFDOUI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEcmFnRHJvcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHsgQ2RrVGFibGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5vdm9CdXR0b25Nb2R1bGUgfSBmcm9tICcuLi9idXR0b24nO1xuaW1wb3J0IHsgTm92b0NhcmRNb2R1bGUgfSBmcm9tICcuLi9jYXJkJztcbmltcG9ydCB7IE5vdm9DaGlwc01vZHVsZSB9IGZyb20gJy4uL2NoaXBzJztcbmltcG9ydCB7IE5vdm9Db21tb25Nb2R1bGUsIE5vdm9PcHRpb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IHsgTm92b0RhdGVQaWNrZXJNb2R1bGUgfSBmcm9tICcuLi9kYXRlLXBpY2tlcic7XG5pbXBvcnQgeyBOb3ZvRHJvcGRvd25Nb2R1bGUgfSBmcm9tICcuLi9kcm9wZG93bic7XG5pbXBvcnQgeyBOb3ZvRmllbGRNb2R1bGUgfSBmcm9tICcuLi9maWVsZCc7XG5pbXBvcnQgeyBOb3ZvRmxleE1vZHVsZSB9IGZyb20gJy4uL2ZsZXgnO1xuaW1wb3J0IHsgTm92b0Zvcm1Nb2R1bGUgfSBmcm9tICcuLi9mb3JtJztcbmltcG9ydCB7IE5vdm9JY29uTW9kdWxlIH0gZnJvbSAnLi4vaWNvbic7XG5pbXBvcnQgeyBOb3ZvTG9hZGluZ01vZHVsZSB9IGZyb20gJy4uL2xvYWRpbmcnO1xuaW1wb3J0IHsgTm92b05vbklkZWFsU3RhdGVNb2R1bGUgfSBmcm9tICcuLi9ub24taWRlYWwtc3RhdGUnO1xuaW1wb3J0IHsgTm92b1NlYXJjaEJveE1vZHVsZSB9IGZyb20gJy4uL3NlYXJjaCc7XG5pbXBvcnQgeyBOb3ZvU2VsZWN0TW9kdWxlIH0gZnJvbSAnLi4vc2VsZWN0JztcbmltcG9ydCB7IE5vdm9TZWxlY3RTZWFyY2hNb2R1bGUgfSBmcm9tICcuLi9zZWxlY3Qtc2VhcmNoJztcbmltcG9ydCB7IE5vdm9Td2l0Y2hNb2R1bGUgfSBmcm9tICcuLi9zd2l0Y2gnO1xuaW1wb3J0IHsgTm92b1RhYk1vZHVsZSB9IGZyb20gJy4uL3RhYnMnO1xuaW1wb3J0IHsgQ29uZGl0aW9uQnVpbGRlckNvbXBvbmVudCwgQ29uZGl0aW9uSW5wdXRPdXRsZXQsIENvbmRpdGlvbk9wZXJhdG9yT3V0bGV0IH0gZnJvbSAnLi9jb25kaXRpb24tYnVpbGRlci9jb25kaXRpb24tYnVpbGRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b0RlZmF1bHRBZGRyZXNzQ29uZGl0aW9uRGVmIH0gZnJvbSAnLi9jb25kaXRpb24tZGVmaW5pdGlvbnMvYWRkcmVzcy1jb25kaXRpb24uZGVmaW5pdGlvbic7XG5pbXBvcnQgeyBOb3ZvRGVmYXVsdEJvb2xlYW5Db25kaXRpb25EZWYgfSBmcm9tICcuL2NvbmRpdGlvbi1kZWZpbml0aW9ucy9ib29sZWFuLWNvbmRpdGlvbi5kZWZpbml0aW9uJztcbmltcG9ydCB7IE5vdm9EZWZhdWx0RGF0ZUNvbmRpdGlvbkRlZiB9IGZyb20gJy4vY29uZGl0aW9uLWRlZmluaXRpb25zL2RhdGUtY29uZGl0aW9uLmRlZmluaXRpb24nO1xuaW1wb3J0IHsgTm92b0RlZmF1bHRJZENvbmRpdGlvbkRlZiB9IGZyb20gJy4vY29uZGl0aW9uLWRlZmluaXRpb25zL2lkLWNvbmRpdGlvbi5kZWZpbml0aW9uJztcbmltcG9ydCB7IE5vdm9EZWZhdWx0TnVtYmVyQ29uZGl0aW9uRGVmIH0gZnJvbSAnLi9jb25kaXRpb24tZGVmaW5pdGlvbnMvbnVtYmVyLWNvbmRpdGlvbi5kZWZpbml0aW9uJztcbmltcG9ydCB7IE5vdm9EZWZhdWx0UGlja2VyQ29uZGl0aW9uRGVmIH0gZnJvbSAnLi9jb25kaXRpb24tZGVmaW5pdGlvbnMvcGlja2VyLWNvbmRpdGlvbi5kZWZpbml0aW9uJztcbmltcG9ydCB7IE5vdm9EZWZhdWx0U3RyaW5nQ29uZGl0aW9uRGVmIH0gZnJvbSAnLi9jb25kaXRpb24tZGVmaW5pdGlvbnMvc3RyaW5nLWNvbmRpdGlvbi5kZWZpbml0aW9uJztcbmltcG9ydCB7IENvbmRpdGlvbkdyb3VwQ29tcG9uZW50IH0gZnJvbSAnLi9jb25kaXRpb24tZ3JvdXAvY29uZGl0aW9uLWdyb3VwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDcml0ZXJpYUJ1aWxkZXJDb21wb25lbnQgfSBmcm9tICcuL2NyaXRlcmlhLWJ1aWxkZXIvY3JpdGVyaWEtYnVpbGRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b0NvbmRpdGlvbkZpZWxkRGVmLCBOb3ZvQ29uZGl0aW9uSW5wdXREZWYsIE5vdm9Db25kaXRpb25PcGVyYXRvcnNEZWYgfSBmcm9tICcuL3F1ZXJ5LWJ1aWxkZXIuZGlyZWN0aXZlcyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBEcmFnRHJvcE1vZHVsZSxcbiAgICBDZGtUYWJsZU1vZHVsZSxcbiAgICBOb3ZvQnV0dG9uTW9kdWxlLFxuICAgIE5vdm9Db21tb25Nb2R1bGUsXG4gICAgTm92b0Zvcm1Nb2R1bGUsXG4gICAgTm92b1NlbGVjdE1vZHVsZSxcbiAgICBOb3ZvTm9uSWRlYWxTdGF0ZU1vZHVsZSxcbiAgICBOb3ZvRmllbGRNb2R1bGUsXG4gICAgTm92b09wdGlvbk1vZHVsZSxcbiAgICBOb3ZvRmxleE1vZHVsZSxcbiAgICBOb3ZvVGFiTW9kdWxlLFxuICAgIE5vdm9Mb2FkaW5nTW9kdWxlLFxuICAgIE5vdm9DYXJkTW9kdWxlLFxuICAgIE5vdm9EYXRlUGlja2VyTW9kdWxlLFxuICAgIE5vdm9JY29uTW9kdWxlLFxuICAgIE5vdm9TZWFyY2hCb3hNb2R1bGUsXG4gICAgTm92b1N3aXRjaE1vZHVsZSxcbiAgICBOb3ZvQ2hpcHNNb2R1bGUsXG4gICAgTm92b1NlbGVjdFNlYXJjaE1vZHVsZSxcbiAgICBOb3ZvRHJvcGRvd25Nb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENyaXRlcmlhQnVpbGRlckNvbXBvbmVudCxcbiAgICBDb25kaXRpb25CdWlsZGVyQ29tcG9uZW50LFxuICAgIENvbmRpdGlvbklucHV0T3V0bGV0LFxuICAgIENvbmRpdGlvbk9wZXJhdG9yT3V0bGV0LFxuICAgIENvbmRpdGlvbkdyb3VwQ29tcG9uZW50LFxuICAgIE5vdm9EZWZhdWx0QWRkcmVzc0NvbmRpdGlvbkRlZixcbiAgICBOb3ZvRGVmYXVsdEJvb2xlYW5Db25kaXRpb25EZWYsXG4gICAgTm92b0RlZmF1bHREYXRlQ29uZGl0aW9uRGVmLFxuICAgIE5vdm9Db25kaXRpb25PcGVyYXRvcnNEZWYsXG4gICAgTm92b0NvbmRpdGlvbklucHV0RGVmLFxuICAgIE5vdm9Db25kaXRpb25GaWVsZERlZixcbiAgICBOb3ZvRGVmYXVsdFN0cmluZ0NvbmRpdGlvbkRlZixcbiAgICBOb3ZvRGVmYXVsdE51bWJlckNvbmRpdGlvbkRlZixcbiAgICBOb3ZvRGVmYXVsdElkQ29uZGl0aW9uRGVmLFxuICAgIE5vdm9EZWZhdWx0UGlja2VyQ29uZGl0aW9uRGVmLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQ3JpdGVyaWFCdWlsZGVyQ29tcG9uZW50LFxuICAgIENvbmRpdGlvbkJ1aWxkZXJDb21wb25lbnQsXG4gICAgTm92b0RlZmF1bHRBZGRyZXNzQ29uZGl0aW9uRGVmLFxuICAgIE5vdm9EZWZhdWx0Qm9vbGVhbkNvbmRpdGlvbkRlZixcbiAgICBOb3ZvRGVmYXVsdERhdGVDb25kaXRpb25EZWYsXG4gICAgTm92b0NvbmRpdGlvbk9wZXJhdG9yc0RlZixcbiAgICBOb3ZvQ29uZGl0aW9uSW5wdXREZWYsXG4gICAgTm92b0NvbmRpdGlvbkZpZWxkRGVmLFxuICAgIE5vdm9EZWZhdWx0U3RyaW5nQ29uZGl0aW9uRGVmLFxuICAgIE5vdm9EZWZhdWx0TnVtYmVyQ29uZGl0aW9uRGVmLFxuICAgIE5vdm9EZWZhdWx0SWRDb25kaXRpb25EZWYsXG4gICAgTm92b0RlZmF1bHRQaWNrZXJDb25kaXRpb25EZWYsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9RdWVyeUJ1aWxkZXJNb2R1bGUge31cbiJdfQ==