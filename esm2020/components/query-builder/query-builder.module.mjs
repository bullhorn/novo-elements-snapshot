import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NovoCommonModule, NovoOptionModule } from 'novo-elements/common';
import { NovoAutoCompleteModule } from 'novo-elements/components/autocomplete';
import { NovoButtonModule } from 'novo-elements/components/button';
import { NovoCardModule } from 'novo-elements/components/card';
import { NovoChipsModule } from 'novo-elements/components/chips';
import { NovoDatePickerModule } from 'novo-elements/components/date-picker';
import { NovoDateTimePickerModule } from 'novo-elements/components/date-time-picker';
import { NovoDropdownModule } from 'novo-elements/components/dropdown';
import { NovoFieldModule } from 'novo-elements/components/field';
import { NovoFlexModule } from 'novo-elements/components/flex';
import { NovoFormModule } from 'novo-elements/components/form';
import { NovoIconModule } from 'novo-elements/components/icon';
import { NovoLoadingModule } from 'novo-elements/components/loading';
import { NovoNonIdealStateModule } from 'novo-elements/components/non-ideal-state';
import { NovoRadioModule } from 'novo-elements/components/radio';
import { NovoSearchBoxModule } from 'novo-elements/components/search';
import { NovoSelectModule } from 'novo-elements/components/select';
import { NovoSelectSearchModule } from 'novo-elements/components/select-search';
import { NovoSwitchModule } from 'novo-elements/components/switch';
import { NovoTabModule } from 'novo-elements/components/tabs';
import { ConditionBuilderComponent, ConditionInputOutlet, ConditionOperatorOutlet } from './condition-builder/condition-builder.component';
import { NovoDefaultAddressConditionDef } from './condition-definitions/address-condition.definition';
import { NovoDefaultBooleanConditionDef } from './condition-definitions/boolean-condition.definition';
import { NovoDefaultDateConditionDef } from './condition-definitions/date-condition.definition';
import { NovoDefaultDateTimeConditionDef } from './condition-definitions/date-time-condition.definition';
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
        NovoDefaultDateTimeConditionDef,
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
        NovoDateTimePickerModule,
        NovoIconModule,
        NovoRadioModule,
        NovoSearchBoxModule,
        NovoSwitchModule,
        NovoChipsModule,
        NovoSelectSearchModule,
        NovoDropdownModule,
        NovoAutoCompleteModule], exports: [CriteriaBuilderComponent,
        ConditionBuilderComponent,
        NovoDefaultAddressConditionDef,
        NovoDefaultBooleanConditionDef,
        NovoDefaultDateConditionDef,
        NovoDefaultDateTimeConditionDef,
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
            NovoDateTimePickerModule,
            NovoIconModule,
            NovoRadioModule,
            NovoSearchBoxModule,
            NovoSwitchModule,
            NovoChipsModule,
            NovoSelectSearchModule,
            NovoDropdownModule,
            NovoAutoCompleteModule,
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
                        NovoDateTimePickerModule,
                        NovoIconModule,
                        NovoRadioModule,
                        NovoSearchBoxModule,
                        NovoSwitchModule,
                        NovoChipsModule,
                        NovoSelectSearchModule,
                        NovoDropdownModule,
                        NovoAutoCompleteModule,
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
                        NovoDefaultDateTimeConditionDef,
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
                        NovoDefaultDateTimeConditionDef,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktYnVpbGRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL3F1ZXJ5LWJ1aWxkZXIvcXVlcnktYnVpbGRlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDMUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNyRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQkFBK0IsQ0FB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QkFDUCx3QkFBd0I7d0JBQ3hCLHlCQUF5Qjt3QkFDekIsOEJBQThCO3dCQUM5Qiw4QkFBOEI7d0JBQzlCLDJCQUEyQjt3QkFDM0IsK0JBQStCO3dCQUMvQix5QkFBeUI7d0JBQ3pCLHFCQUFxQjt3QkFDckIscUJBQXFCO3dCQUNyQiw2QkFBNkI7d0JBQzdCLDZCQUE2Qjt3QkFDN0IseUJBQXlCO3dCQUN6Qiw2QkFBNkI7cUJBQzlCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRHJhZ0Ryb3BNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7IENka1RhYmxlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOb3ZvQ29tbW9uTW9kdWxlLCBOb3ZvT3B0aW9uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21tb24nO1xuaW1wb3J0IHsgTm92b0F1dG9Db21wbGV0ZU1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy9hdXRvY29tcGxldGUnO1xuaW1wb3J0IHsgTm92b0J1dHRvbk1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy9idXR0b24nO1xuaW1wb3J0IHsgTm92b0NhcmRNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvY2FyZCc7XG5pbXBvcnQgeyBOb3ZvQ2hpcHNNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvY2hpcHMnO1xuaW1wb3J0IHsgTm92b0RhdGVQaWNrZXJNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvZGF0ZS1waWNrZXInO1xuaW1wb3J0IHsgTm92b0RhdGVUaW1lUGlja2VyTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXInO1xuaW1wb3J0IHsgTm92b0Ryb3Bkb3duTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL2Ryb3Bkb3duJztcbmltcG9ydCB7IE5vdm9GaWVsZE1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy9maWVsZCc7XG5pbXBvcnQgeyBOb3ZvRmxleE1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy9mbGV4JztcbmltcG9ydCB7IE5vdm9Gb3JtTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL2Zvcm0nO1xuaW1wb3J0IHsgTm92b0ljb25Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvaWNvbic7XG5pbXBvcnQgeyBOb3ZvTG9hZGluZ01vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy9sb2FkaW5nJztcbmltcG9ydCB7IE5vdm9Ob25JZGVhbFN0YXRlTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL25vbi1pZGVhbC1zdGF0ZSc7XG5pbXBvcnQgeyBOb3ZvUmFkaW9Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvcmFkaW8nO1xuaW1wb3J0IHsgTm92b1NlYXJjaEJveE1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy9zZWFyY2gnO1xuaW1wb3J0IHsgTm92b1NlbGVjdE1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy9zZWxlY3QnO1xuaW1wb3J0IHsgTm92b1NlbGVjdFNlYXJjaE1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy9zZWxlY3Qtc2VhcmNoJztcbmltcG9ydCB7IE5vdm9Td2l0Y2hNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvc3dpdGNoJztcbmltcG9ydCB7IE5vdm9UYWJNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvdGFicyc7XG5pbXBvcnQgeyBDb25kaXRpb25CdWlsZGVyQ29tcG9uZW50LCBDb25kaXRpb25JbnB1dE91dGxldCwgQ29uZGl0aW9uT3BlcmF0b3JPdXRsZXQgfSBmcm9tICcuL2NvbmRpdGlvbi1idWlsZGVyL2NvbmRpdGlvbi1idWlsZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvRGVmYXVsdEFkZHJlc3NDb25kaXRpb25EZWYgfSBmcm9tICcuL2NvbmRpdGlvbi1kZWZpbml0aW9ucy9hZGRyZXNzLWNvbmRpdGlvbi5kZWZpbml0aW9uJztcbmltcG9ydCB7IE5vdm9EZWZhdWx0Qm9vbGVhbkNvbmRpdGlvbkRlZiB9IGZyb20gJy4vY29uZGl0aW9uLWRlZmluaXRpb25zL2Jvb2xlYW4tY29uZGl0aW9uLmRlZmluaXRpb24nO1xuaW1wb3J0IHsgTm92b0RlZmF1bHREYXRlQ29uZGl0aW9uRGVmIH0gZnJvbSAnLi9jb25kaXRpb24tZGVmaW5pdGlvbnMvZGF0ZS1jb25kaXRpb24uZGVmaW5pdGlvbic7XG5pbXBvcnQgeyBOb3ZvRGVmYXVsdERhdGVUaW1lQ29uZGl0aW9uRGVmIH0gZnJvbSAnLi9jb25kaXRpb24tZGVmaW5pdGlvbnMvZGF0ZS10aW1lLWNvbmRpdGlvbi5kZWZpbml0aW9uJztcbmltcG9ydCB7IE5vdm9EZWZhdWx0SWRDb25kaXRpb25EZWYgfSBmcm9tICcuL2NvbmRpdGlvbi1kZWZpbml0aW9ucy9pZC1jb25kaXRpb24uZGVmaW5pdGlvbic7XG5pbXBvcnQgeyBOb3ZvRGVmYXVsdE51bWJlckNvbmRpdGlvbkRlZiB9IGZyb20gJy4vY29uZGl0aW9uLWRlZmluaXRpb25zL251bWJlci1jb25kaXRpb24uZGVmaW5pdGlvbic7XG5pbXBvcnQgeyBOb3ZvRGVmYXVsdFBpY2tlckNvbmRpdGlvbkRlZiB9IGZyb20gJy4vY29uZGl0aW9uLWRlZmluaXRpb25zL3BpY2tlci1jb25kaXRpb24uZGVmaW5pdGlvbic7XG5pbXBvcnQgeyBOb3ZvRGVmYXVsdFN0cmluZ0NvbmRpdGlvbkRlZiB9IGZyb20gJy4vY29uZGl0aW9uLWRlZmluaXRpb25zL3N0cmluZy1jb25kaXRpb24uZGVmaW5pdGlvbic7XG5pbXBvcnQgeyBDb25kaXRpb25Hcm91cENvbXBvbmVudCB9IGZyb20gJy4vY29uZGl0aW9uLWdyb3VwL2NvbmRpdGlvbi1ncm91cC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ3JpdGVyaWFCdWlsZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jcml0ZXJpYS1idWlsZGVyL2NyaXRlcmlhLWJ1aWxkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9Db25kaXRpb25GaWVsZERlZiwgTm92b0NvbmRpdGlvbklucHV0RGVmLCBOb3ZvQ29uZGl0aW9uT3BlcmF0b3JzRGVmIH0gZnJvbSAnLi9xdWVyeS1idWlsZGVyLmRpcmVjdGl2ZXMnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIERyYWdEcm9wTW9kdWxlLFxuICAgIENka1RhYmxlTW9kdWxlLFxuICAgIE5vdm9CdXR0b25Nb2R1bGUsXG4gICAgTm92b0NvbW1vbk1vZHVsZSxcbiAgICBOb3ZvRm9ybU1vZHVsZSxcbiAgICBOb3ZvU2VsZWN0TW9kdWxlLFxuICAgIE5vdm9Ob25JZGVhbFN0YXRlTW9kdWxlLFxuICAgIE5vdm9GaWVsZE1vZHVsZSxcbiAgICBOb3ZvT3B0aW9uTW9kdWxlLFxuICAgIE5vdm9GbGV4TW9kdWxlLFxuICAgIE5vdm9UYWJNb2R1bGUsXG4gICAgTm92b0xvYWRpbmdNb2R1bGUsXG4gICAgTm92b0NhcmRNb2R1bGUsXG4gICAgTm92b0RhdGVQaWNrZXJNb2R1bGUsXG4gICAgTm92b0RhdGVUaW1lUGlja2VyTW9kdWxlLFxuICAgIE5vdm9JY29uTW9kdWxlLFxuICAgIE5vdm9SYWRpb01vZHVsZSxcbiAgICBOb3ZvU2VhcmNoQm94TW9kdWxlLFxuICAgIE5vdm9Td2l0Y2hNb2R1bGUsXG4gICAgTm92b0NoaXBzTW9kdWxlLFxuICAgIE5vdm9TZWxlY3RTZWFyY2hNb2R1bGUsXG4gICAgTm92b0Ryb3Bkb3duTW9kdWxlLFxuICAgIE5vdm9BdXRvQ29tcGxldGVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENyaXRlcmlhQnVpbGRlckNvbXBvbmVudCxcbiAgICBDb25kaXRpb25CdWlsZGVyQ29tcG9uZW50LFxuICAgIENvbmRpdGlvbklucHV0T3V0bGV0LFxuICAgIENvbmRpdGlvbk9wZXJhdG9yT3V0bGV0LFxuICAgIENvbmRpdGlvbkdyb3VwQ29tcG9uZW50LFxuICAgIE5vdm9EZWZhdWx0QWRkcmVzc0NvbmRpdGlvbkRlZixcbiAgICBOb3ZvRGVmYXVsdEJvb2xlYW5Db25kaXRpb25EZWYsXG4gICAgTm92b0RlZmF1bHREYXRlQ29uZGl0aW9uRGVmLFxuICAgIE5vdm9EZWZhdWx0RGF0ZVRpbWVDb25kaXRpb25EZWYsXG4gICAgTm92b0NvbmRpdGlvbk9wZXJhdG9yc0RlZixcbiAgICBOb3ZvQ29uZGl0aW9uSW5wdXREZWYsXG4gICAgTm92b0NvbmRpdGlvbkZpZWxkRGVmLFxuICAgIE5vdm9EZWZhdWx0U3RyaW5nQ29uZGl0aW9uRGVmLFxuICAgIE5vdm9EZWZhdWx0TnVtYmVyQ29uZGl0aW9uRGVmLFxuICAgIE5vdm9EZWZhdWx0SWRDb25kaXRpb25EZWYsXG4gICAgTm92b0RlZmF1bHRQaWNrZXJDb25kaXRpb25EZWYsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBDcml0ZXJpYUJ1aWxkZXJDb21wb25lbnQsXG4gICAgQ29uZGl0aW9uQnVpbGRlckNvbXBvbmVudCxcbiAgICBOb3ZvRGVmYXVsdEFkZHJlc3NDb25kaXRpb25EZWYsXG4gICAgTm92b0RlZmF1bHRCb29sZWFuQ29uZGl0aW9uRGVmLFxuICAgIE5vdm9EZWZhdWx0RGF0ZUNvbmRpdGlvbkRlZixcbiAgICBOb3ZvRGVmYXVsdERhdGVUaW1lQ29uZGl0aW9uRGVmLFxuICAgIE5vdm9Db25kaXRpb25PcGVyYXRvcnNEZWYsXG4gICAgTm92b0NvbmRpdGlvbklucHV0RGVmLFxuICAgIE5vdm9Db25kaXRpb25GaWVsZERlZixcbiAgICBOb3ZvRGVmYXVsdFN0cmluZ0NvbmRpdGlvbkRlZixcbiAgICBOb3ZvRGVmYXVsdE51bWJlckNvbmRpdGlvbkRlZixcbiAgICBOb3ZvRGVmYXVsdElkQ29uZGl0aW9uRGVmLFxuICAgIE5vdm9EZWZhdWx0UGlja2VyQ29uZGl0aW9uRGVmLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvUXVlcnlCdWlsZGVyTW9kdWxlIHt9XG4iXX0=