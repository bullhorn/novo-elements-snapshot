import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NovoAutoCompleteModule } from 'novo-elements/elements/autocomplete';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoCardModule } from 'novo-elements/elements/card';
import { NovoChipsModule } from 'novo-elements/elements/chips';
import { NovoCommonModule, NovoOptionModule, NovoOverlayModule } from 'novo-elements/elements/common';
import { NovoDatePickerModule } from 'novo-elements/elements/date-picker';
import { NovoDateTimePickerModule } from 'novo-elements/elements/date-time-picker';
import { NovoDropdownModule } from 'novo-elements/elements/dropdown';
import { NovoFieldModule } from 'novo-elements/elements/field';
import { NovoFlexModule } from 'novo-elements/elements/flex';
import { NovoFormModule } from 'novo-elements/elements/form';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { NovoLoadingModule } from 'novo-elements/elements/loading';
import { NovoNonIdealStateModule } from 'novo-elements/elements/non-ideal-state';
import { GooglePlacesModule } from 'novo-elements/elements/places';
import { NovoRadioModule } from 'novo-elements/elements/radio';
import { NovoSearchBoxModule } from 'novo-elements/elements/search';
import { NovoSelectModule } from 'novo-elements/elements/select';
import { NovoSelectSearchModule } from 'novo-elements/elements/select-search';
import { NovoSwitchModule } from 'novo-elements/elements/switch';
import { NovoTabModule } from 'novo-elements/elements/tabs';
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
        GooglePlacesModule,
        NovoAutoCompleteModule,
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
        NovoOverlayModule,
        NovoRadioModule,
        NovoSearchBoxModule,
        NovoSwitchModule,
        NovoChipsModule,
        NovoSelectSearchModule,
        NovoDropdownModule], exports: [CriteriaBuilderComponent,
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
            GooglePlacesModule,
            NovoAutoCompleteModule,
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
            NovoOverlayModule,
            NovoRadioModule,
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
                        GooglePlacesModule,
                        NovoAutoCompleteModule,
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
                        NovoOverlayModule,
                        NovoRadioModule,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktYnVpbGRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9xdWVyeS1idWlsZGVyL3F1ZXJ5LWJ1aWxkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDdEcsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDMUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbkYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDckUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsY0FBYyxF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LDJCQUEyQjt3QkFDM0IsK0JBQStCO3dCQUMvQix5QkFBeUI7d0JBQ3pCLHFCQUFxQjt3QkFDckIscUJBQXFCO3dCQUNyQiw2QkFBNkI7d0JBQzdCLDZCQUE2Qjt3QkFDN0IseUJBQXlCO3dCQUN6Qiw2QkFBNkI7cUJBQzlCO29CQUNELE9BQU8sRUFBRTt3QkFDUCx3QkFBd0I7d0JBQ3hCLHlCQUF5Qjt3QkFDekIsOEJBQThCO3dCQUM5Qiw4QkFBOEI7d0JBQzlCLDJCQUEyQjt3QkFDM0IsK0JBQStCO3dCQUMvQix5QkFBeUI7d0JBQ3pCLHFCQUFxQjt3QkFDckIscUJBQXFCO3dCQUNyQiw2QkFBNkI7d0JBQzdCLDZCQUE2Qjt3QkFDN0IseUJBQXlCO3dCQUN6Qiw2QkFBNkI7cUJBQzlCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRHJhZ0Ryb3BNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7IENka1RhYmxlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOb3ZvQXV0b0NvbXBsZXRlTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9hdXRvY29tcGxldGUnO1xuaW1wb3J0IHsgTm92b0J1dHRvbk1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvYnV0dG9uJztcbmltcG9ydCB7IE5vdm9DYXJkTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9jYXJkJztcbmltcG9ydCB7IE5vdm9DaGlwc01vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvY2hpcHMnO1xuaW1wb3J0IHsgTm92b0NvbW1vbk1vZHVsZSwgTm92b09wdGlvbk1vZHVsZSwgTm92b092ZXJsYXlNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2NvbW1vbic7XG5pbXBvcnQgeyBOb3ZvRGF0ZVBpY2tlck1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvZGF0ZS1waWNrZXInO1xuaW1wb3J0IHsgTm92b0RhdGVUaW1lUGlja2VyTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9kYXRlLXRpbWUtcGlja2VyJztcbmltcG9ydCB7IE5vdm9Ecm9wZG93bk1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvZHJvcGRvd24nO1xuaW1wb3J0IHsgTm92b0ZpZWxkTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9maWVsZCc7XG5pbXBvcnQgeyBOb3ZvRmxleE1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvZmxleCc7XG5pbXBvcnQgeyBOb3ZvRm9ybU1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvZm9ybSc7XG5pbXBvcnQgeyBOb3ZvSWNvbk1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvaWNvbic7XG5pbXBvcnQgeyBOb3ZvTG9hZGluZ01vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvbG9hZGluZyc7XG5pbXBvcnQgeyBOb3ZvTm9uSWRlYWxTdGF0ZU1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvbm9uLWlkZWFsLXN0YXRlJztcbmltcG9ydCB7IEdvb2dsZVBsYWNlc01vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvcGxhY2VzJztcbmltcG9ydCB7IE5vdm9SYWRpb01vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvcmFkaW8nXG5pbXBvcnQgeyBOb3ZvU2VhcmNoQm94TW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9zZWFyY2gnO1xuaW1wb3J0IHsgTm92b1NlbGVjdE1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvc2VsZWN0JztcbmltcG9ydCB7IE5vdm9TZWxlY3RTZWFyY2hNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL3NlbGVjdC1zZWFyY2gnO1xuaW1wb3J0IHsgTm92b1N3aXRjaE1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvc3dpdGNoJztcbmltcG9ydCB7IE5vdm9UYWJNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL3RhYnMnO1xuaW1wb3J0IHsgQ29uZGl0aW9uQnVpbGRlckNvbXBvbmVudCwgQ29uZGl0aW9uSW5wdXRPdXRsZXQsIENvbmRpdGlvbk9wZXJhdG9yT3V0bGV0IH0gZnJvbSAnLi9jb25kaXRpb24tYnVpbGRlci9jb25kaXRpb24tYnVpbGRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b0RlZmF1bHRBZGRyZXNzQ29uZGl0aW9uRGVmIH0gZnJvbSAnLi9jb25kaXRpb24tZGVmaW5pdGlvbnMvYWRkcmVzcy1jb25kaXRpb24uZGVmaW5pdGlvbic7XG5pbXBvcnQgeyBOb3ZvRGVmYXVsdEJvb2xlYW5Db25kaXRpb25EZWYgfSBmcm9tICcuL2NvbmRpdGlvbi1kZWZpbml0aW9ucy9ib29sZWFuLWNvbmRpdGlvbi5kZWZpbml0aW9uJztcbmltcG9ydCB7IE5vdm9EZWZhdWx0RGF0ZUNvbmRpdGlvbkRlZiB9IGZyb20gJy4vY29uZGl0aW9uLWRlZmluaXRpb25zL2RhdGUtY29uZGl0aW9uLmRlZmluaXRpb24nO1xuaW1wb3J0IHsgTm92b0RlZmF1bHREYXRlVGltZUNvbmRpdGlvbkRlZiB9IGZyb20gJy4vY29uZGl0aW9uLWRlZmluaXRpb25zL2RhdGUtdGltZS1jb25kaXRpb24uZGVmaW5pdGlvbic7XG5pbXBvcnQgeyBOb3ZvRGVmYXVsdElkQ29uZGl0aW9uRGVmIH0gZnJvbSAnLi9jb25kaXRpb24tZGVmaW5pdGlvbnMvaWQtY29uZGl0aW9uLmRlZmluaXRpb24nO1xuaW1wb3J0IHsgTm92b0RlZmF1bHROdW1iZXJDb25kaXRpb25EZWYgfSBmcm9tICcuL2NvbmRpdGlvbi1kZWZpbml0aW9ucy9udW1iZXItY29uZGl0aW9uLmRlZmluaXRpb24nO1xuaW1wb3J0IHsgTm92b0RlZmF1bHRQaWNrZXJDb25kaXRpb25EZWYgfSBmcm9tICcuL2NvbmRpdGlvbi1kZWZpbml0aW9ucy9waWNrZXItY29uZGl0aW9uLmRlZmluaXRpb24nO1xuaW1wb3J0IHsgTm92b0RlZmF1bHRTdHJpbmdDb25kaXRpb25EZWYgfSBmcm9tICcuL2NvbmRpdGlvbi1kZWZpbml0aW9ucy9zdHJpbmctY29uZGl0aW9uLmRlZmluaXRpb24nO1xuaW1wb3J0IHsgQ29uZGl0aW9uR3JvdXBDb21wb25lbnQgfSBmcm9tICcuL2NvbmRpdGlvbi1ncm91cC9jb25kaXRpb24tZ3JvdXAuY29tcG9uZW50JztcbmltcG9ydCB7IENyaXRlcmlhQnVpbGRlckNvbXBvbmVudCB9IGZyb20gJy4vY3JpdGVyaWEtYnVpbGRlci9jcml0ZXJpYS1idWlsZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvQ29uZGl0aW9uRmllbGREZWYsIE5vdm9Db25kaXRpb25JbnB1dERlZiwgTm92b0NvbmRpdGlvbk9wZXJhdG9yc0RlZiB9IGZyb20gJy4vcXVlcnktYnVpbGRlci5kaXJlY3RpdmVzJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIERyYWdEcm9wTW9kdWxlLFxuICAgIENka1RhYmxlTW9kdWxlLFxuICAgIEdvb2dsZVBsYWNlc01vZHVsZSxcbiAgICBOb3ZvQXV0b0NvbXBsZXRlTW9kdWxlLFxuICAgIE5vdm9CdXR0b25Nb2R1bGUsXG4gICAgTm92b0NvbW1vbk1vZHVsZSxcbiAgICBOb3ZvRm9ybU1vZHVsZSxcbiAgICBOb3ZvU2VsZWN0TW9kdWxlLFxuICAgIE5vdm9Ob25JZGVhbFN0YXRlTW9kdWxlLFxuICAgIE5vdm9GaWVsZE1vZHVsZSxcbiAgICBOb3ZvT3B0aW9uTW9kdWxlLFxuICAgIE5vdm9GbGV4TW9kdWxlLFxuICAgIE5vdm9UYWJNb2R1bGUsXG4gICAgTm92b0xvYWRpbmdNb2R1bGUsXG4gICAgTm92b0NhcmRNb2R1bGUsXG4gICAgTm92b0RhdGVQaWNrZXJNb2R1bGUsXG4gICAgTm92b0RhdGVUaW1lUGlja2VyTW9kdWxlLFxuICAgIE5vdm9JY29uTW9kdWxlLFxuICAgIE5vdm9PdmVybGF5TW9kdWxlLFxuICAgIE5vdm9SYWRpb01vZHVsZSxcbiAgICBOb3ZvU2VhcmNoQm94TW9kdWxlLFxuICAgIE5vdm9Td2l0Y2hNb2R1bGUsXG4gICAgTm92b0NoaXBzTW9kdWxlLFxuICAgIE5vdm9TZWxlY3RTZWFyY2hNb2R1bGUsXG4gICAgTm92b0Ryb3Bkb3duTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDcml0ZXJpYUJ1aWxkZXJDb21wb25lbnQsXG4gICAgQ29uZGl0aW9uQnVpbGRlckNvbXBvbmVudCxcbiAgICBDb25kaXRpb25JbnB1dE91dGxldCxcbiAgICBDb25kaXRpb25PcGVyYXRvck91dGxldCxcbiAgICBDb25kaXRpb25Hcm91cENvbXBvbmVudCxcbiAgICBOb3ZvRGVmYXVsdEFkZHJlc3NDb25kaXRpb25EZWYsXG4gICAgTm92b0RlZmF1bHRCb29sZWFuQ29uZGl0aW9uRGVmLFxuICAgIE5vdm9EZWZhdWx0RGF0ZUNvbmRpdGlvbkRlZixcbiAgICBOb3ZvRGVmYXVsdERhdGVUaW1lQ29uZGl0aW9uRGVmLFxuICAgIE5vdm9Db25kaXRpb25PcGVyYXRvcnNEZWYsXG4gICAgTm92b0NvbmRpdGlvbklucHV0RGVmLFxuICAgIE5vdm9Db25kaXRpb25GaWVsZERlZixcbiAgICBOb3ZvRGVmYXVsdFN0cmluZ0NvbmRpdGlvbkRlZixcbiAgICBOb3ZvRGVmYXVsdE51bWJlckNvbmRpdGlvbkRlZixcbiAgICBOb3ZvRGVmYXVsdElkQ29uZGl0aW9uRGVmLFxuICAgIE5vdm9EZWZhdWx0UGlja2VyQ29uZGl0aW9uRGVmLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQ3JpdGVyaWFCdWlsZGVyQ29tcG9uZW50LFxuICAgIENvbmRpdGlvbkJ1aWxkZXJDb21wb25lbnQsXG4gICAgTm92b0RlZmF1bHRBZGRyZXNzQ29uZGl0aW9uRGVmLFxuICAgIE5vdm9EZWZhdWx0Qm9vbGVhbkNvbmRpdGlvbkRlZixcbiAgICBOb3ZvRGVmYXVsdERhdGVDb25kaXRpb25EZWYsXG4gICAgTm92b0RlZmF1bHREYXRlVGltZUNvbmRpdGlvbkRlZixcbiAgICBOb3ZvQ29uZGl0aW9uT3BlcmF0b3JzRGVmLFxuICAgIE5vdm9Db25kaXRpb25JbnB1dERlZixcbiAgICBOb3ZvQ29uZGl0aW9uRmllbGREZWYsXG4gICAgTm92b0RlZmF1bHRTdHJpbmdDb25kaXRpb25EZWYsXG4gICAgTm92b0RlZmF1bHROdW1iZXJDb25kaXRpb25EZWYsXG4gICAgTm92b0RlZmF1bHRJZENvbmRpdGlvbkRlZixcbiAgICBOb3ZvRGVmYXVsdFBpY2tlckNvbmRpdGlvbkRlZixcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1F1ZXJ5QnVpbGRlck1vZHVsZSB7fVxuIl19