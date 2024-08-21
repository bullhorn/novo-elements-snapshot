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
import { NovoConditionTemplatesComponent } from './condition-templates/condition-templates.component';
import * as i0 from "@angular/core";
export class NovoQueryBuilderModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoQueryBuilderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.3", ngImport: i0, type: NovoQueryBuilderModule, declarations: [CriteriaBuilderComponent,
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
            NovoConditionTemplatesComponent], imports: [CommonModule,
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
            NovoDefaultPickerConditionDef,
            NovoConditionTemplatesComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoQueryBuilderModule, imports: [CommonModule,
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
            NovoDropdownModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoQueryBuilderModule, decorators: [{
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
                        NovoConditionTemplatesComponent,
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
                        NovoConditionTemplatesComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktYnVpbGRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9xdWVyeS1idWlsZGVyL3F1ZXJ5LWJ1aWxkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDdEcsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDMUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbkYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDckUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsY0FBYyxF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QUNwQix1QkFBdUI7d0JBQ3ZCLHVCQUF1Qjt3QkFDdkIsOEJBQThCO3dCQUM5Qiw4QkFBOEI7d0JBQzlCLDJCQUEyQjt3QkFDM0IsK0JBQStCO3dCQUMvQix5QkFBeUI7d0JBQ3pCLHFCQUFxQjt3QkFDckIscUJBQXFCO3dCQUNyQiw2QkFBNkI7d0JBQzdCLDZCQUE2Qjt3QkFDN0IseUJBQXlCO3dCQUN6Qiw2QkFBNkI7d0JBQzdCLCtCQUErQjtxQkFDaEM7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLHdCQUF3Qjt3QkFDeEIseUJBQXlCO3dCQUN6Qiw4QkFBOEI7d0JBQzlCLDhCQUE4Qjt3QkFDOUIsMkJBQTJCO3dCQUMzQiwrQkFBK0I7d0JBQy9CLHlCQUF5Qjt3QkFDekIscUJBQXFCO3dCQUNyQixxQkFBcUI7d0JBQ3JCLDZCQUE2Qjt3QkFDN0IsNkJBQTZCO3dCQUM3Qix5QkFBeUI7d0JBQ3pCLDZCQUE2Qjt3QkFDN0IsK0JBQStCO3FCQUNoQztpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERyYWdEcm9wTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQgeyBDZGtUYWJsZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTm92b0F1dG9Db21wbGV0ZU1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvYXV0b2NvbXBsZXRlJztcbmltcG9ydCB7IE5vdm9CdXR0b25Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2J1dHRvbic7XG5pbXBvcnQgeyBOb3ZvQ2FyZE1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvY2FyZCc7XG5pbXBvcnQgeyBOb3ZvQ2hpcHNNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2NoaXBzJztcbmltcG9ydCB7IE5vdm9Db21tb25Nb2R1bGUsIE5vdm9PcHRpb25Nb2R1bGUsIE5vdm9PdmVybGF5TW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9jb21tb24nO1xuaW1wb3J0IHsgTm92b0RhdGVQaWNrZXJNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2RhdGUtcGlja2VyJztcbmltcG9ydCB7IE5vdm9EYXRlVGltZVBpY2tlck1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvZGF0ZS10aW1lLXBpY2tlcic7XG5pbXBvcnQgeyBOb3ZvRHJvcGRvd25Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2Ryb3Bkb3duJztcbmltcG9ydCB7IE5vdm9GaWVsZE1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvZmllbGQnO1xuaW1wb3J0IHsgTm92b0ZsZXhNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2ZsZXgnO1xuaW1wb3J0IHsgTm92b0Zvcm1Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2Zvcm0nO1xuaW1wb3J0IHsgTm92b0ljb25Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2ljb24nO1xuaW1wb3J0IHsgTm92b0xvYWRpbmdNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2xvYWRpbmcnO1xuaW1wb3J0IHsgTm92b05vbklkZWFsU3RhdGVNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL25vbi1pZGVhbC1zdGF0ZSc7XG5pbXBvcnQgeyBHb29nbGVQbGFjZXNNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL3BsYWNlcyc7XG5pbXBvcnQgeyBOb3ZvUmFkaW9Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL3JhZGlvJ1xuaW1wb3J0IHsgTm92b1NlYXJjaEJveE1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvc2VhcmNoJztcbmltcG9ydCB7IE5vdm9TZWxlY3RNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL3NlbGVjdCc7XG5pbXBvcnQgeyBOb3ZvU2VsZWN0U2VhcmNoTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9zZWxlY3Qtc2VhcmNoJztcbmltcG9ydCB7IE5vdm9Td2l0Y2hNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL3N3aXRjaCc7XG5pbXBvcnQgeyBOb3ZvVGFiTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy90YWJzJztcbmltcG9ydCB7IENvbmRpdGlvbkJ1aWxkZXJDb21wb25lbnQsIENvbmRpdGlvbklucHV0T3V0bGV0LCBDb25kaXRpb25PcGVyYXRvck91dGxldCB9IGZyb20gJy4vY29uZGl0aW9uLWJ1aWxkZXIvY29uZGl0aW9uLWJ1aWxkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9EZWZhdWx0QWRkcmVzc0NvbmRpdGlvbkRlZiB9IGZyb20gJy4vY29uZGl0aW9uLWRlZmluaXRpb25zL2FkZHJlc3MtY29uZGl0aW9uLmRlZmluaXRpb24nO1xuaW1wb3J0IHsgTm92b0RlZmF1bHRCb29sZWFuQ29uZGl0aW9uRGVmIH0gZnJvbSAnLi9jb25kaXRpb24tZGVmaW5pdGlvbnMvYm9vbGVhbi1jb25kaXRpb24uZGVmaW5pdGlvbic7XG5pbXBvcnQgeyBOb3ZvRGVmYXVsdERhdGVDb25kaXRpb25EZWYgfSBmcm9tICcuL2NvbmRpdGlvbi1kZWZpbml0aW9ucy9kYXRlLWNvbmRpdGlvbi5kZWZpbml0aW9uJztcbmltcG9ydCB7IE5vdm9EZWZhdWx0RGF0ZVRpbWVDb25kaXRpb25EZWYgfSBmcm9tICcuL2NvbmRpdGlvbi1kZWZpbml0aW9ucy9kYXRlLXRpbWUtY29uZGl0aW9uLmRlZmluaXRpb24nO1xuaW1wb3J0IHsgTm92b0RlZmF1bHRJZENvbmRpdGlvbkRlZiB9IGZyb20gJy4vY29uZGl0aW9uLWRlZmluaXRpb25zL2lkLWNvbmRpdGlvbi5kZWZpbml0aW9uJztcbmltcG9ydCB7IE5vdm9EZWZhdWx0TnVtYmVyQ29uZGl0aW9uRGVmIH0gZnJvbSAnLi9jb25kaXRpb24tZGVmaW5pdGlvbnMvbnVtYmVyLWNvbmRpdGlvbi5kZWZpbml0aW9uJztcbmltcG9ydCB7IE5vdm9EZWZhdWx0UGlja2VyQ29uZGl0aW9uRGVmIH0gZnJvbSAnLi9jb25kaXRpb24tZGVmaW5pdGlvbnMvcGlja2VyLWNvbmRpdGlvbi5kZWZpbml0aW9uJztcbmltcG9ydCB7IE5vdm9EZWZhdWx0U3RyaW5nQ29uZGl0aW9uRGVmIH0gZnJvbSAnLi9jb25kaXRpb24tZGVmaW5pdGlvbnMvc3RyaW5nLWNvbmRpdGlvbi5kZWZpbml0aW9uJztcbmltcG9ydCB7IENvbmRpdGlvbkdyb3VwQ29tcG9uZW50IH0gZnJvbSAnLi9jb25kaXRpb24tZ3JvdXAvY29uZGl0aW9uLWdyb3VwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDcml0ZXJpYUJ1aWxkZXJDb21wb25lbnQgfSBmcm9tICcuL2NyaXRlcmlhLWJ1aWxkZXIvY3JpdGVyaWEtYnVpbGRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b0NvbmRpdGlvbkZpZWxkRGVmLCBOb3ZvQ29uZGl0aW9uSW5wdXREZWYsIE5vdm9Db25kaXRpb25PcGVyYXRvcnNEZWYgfSBmcm9tICcuL3F1ZXJ5LWJ1aWxkZXIuZGlyZWN0aXZlcyc7XG5pbXBvcnQgeyBOb3ZvQ29uZGl0aW9uVGVtcGxhdGVzQ29tcG9uZW50IH0gZnJvbSAnLi9jb25kaXRpb24tdGVtcGxhdGVzL2NvbmRpdGlvbi10ZW1wbGF0ZXMuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIERyYWdEcm9wTW9kdWxlLFxuICAgIENka1RhYmxlTW9kdWxlLFxuICAgIEdvb2dsZVBsYWNlc01vZHVsZSxcbiAgICBOb3ZvQXV0b0NvbXBsZXRlTW9kdWxlLFxuICAgIE5vdm9CdXR0b25Nb2R1bGUsXG4gICAgTm92b0NvbW1vbk1vZHVsZSxcbiAgICBOb3ZvRm9ybU1vZHVsZSxcbiAgICBOb3ZvU2VsZWN0TW9kdWxlLFxuICAgIE5vdm9Ob25JZGVhbFN0YXRlTW9kdWxlLFxuICAgIE5vdm9GaWVsZE1vZHVsZSxcbiAgICBOb3ZvT3B0aW9uTW9kdWxlLFxuICAgIE5vdm9GbGV4TW9kdWxlLFxuICAgIE5vdm9UYWJNb2R1bGUsXG4gICAgTm92b0xvYWRpbmdNb2R1bGUsXG4gICAgTm92b0NhcmRNb2R1bGUsXG4gICAgTm92b0RhdGVQaWNrZXJNb2R1bGUsXG4gICAgTm92b0RhdGVUaW1lUGlja2VyTW9kdWxlLFxuICAgIE5vdm9JY29uTW9kdWxlLFxuICAgIE5vdm9PdmVybGF5TW9kdWxlLFxuICAgIE5vdm9SYWRpb01vZHVsZSxcbiAgICBOb3ZvU2VhcmNoQm94TW9kdWxlLFxuICAgIE5vdm9Td2l0Y2hNb2R1bGUsXG4gICAgTm92b0NoaXBzTW9kdWxlLFxuICAgIE5vdm9TZWxlY3RTZWFyY2hNb2R1bGUsXG4gICAgTm92b0Ryb3Bkb3duTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDcml0ZXJpYUJ1aWxkZXJDb21wb25lbnQsXG4gICAgQ29uZGl0aW9uQnVpbGRlckNvbXBvbmVudCxcbiAgICBDb25kaXRpb25JbnB1dE91dGxldCxcbiAgICBDb25kaXRpb25PcGVyYXRvck91dGxldCxcbiAgICBDb25kaXRpb25Hcm91cENvbXBvbmVudCxcbiAgICBOb3ZvRGVmYXVsdEFkZHJlc3NDb25kaXRpb25EZWYsXG4gICAgTm92b0RlZmF1bHRCb29sZWFuQ29uZGl0aW9uRGVmLFxuICAgIE5vdm9EZWZhdWx0RGF0ZUNvbmRpdGlvbkRlZixcbiAgICBOb3ZvRGVmYXVsdERhdGVUaW1lQ29uZGl0aW9uRGVmLFxuICAgIE5vdm9Db25kaXRpb25PcGVyYXRvcnNEZWYsXG4gICAgTm92b0NvbmRpdGlvbklucHV0RGVmLFxuICAgIE5vdm9Db25kaXRpb25GaWVsZERlZixcbiAgICBOb3ZvRGVmYXVsdFN0cmluZ0NvbmRpdGlvbkRlZixcbiAgICBOb3ZvRGVmYXVsdE51bWJlckNvbmRpdGlvbkRlZixcbiAgICBOb3ZvRGVmYXVsdElkQ29uZGl0aW9uRGVmLFxuICAgIE5vdm9EZWZhdWx0UGlja2VyQ29uZGl0aW9uRGVmLFxuICAgIE5vdm9Db25kaXRpb25UZW1wbGF0ZXNDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBDcml0ZXJpYUJ1aWxkZXJDb21wb25lbnQsXG4gICAgQ29uZGl0aW9uQnVpbGRlckNvbXBvbmVudCxcbiAgICBOb3ZvRGVmYXVsdEFkZHJlc3NDb25kaXRpb25EZWYsXG4gICAgTm92b0RlZmF1bHRCb29sZWFuQ29uZGl0aW9uRGVmLFxuICAgIE5vdm9EZWZhdWx0RGF0ZUNvbmRpdGlvbkRlZixcbiAgICBOb3ZvRGVmYXVsdERhdGVUaW1lQ29uZGl0aW9uRGVmLFxuICAgIE5vdm9Db25kaXRpb25PcGVyYXRvcnNEZWYsXG4gICAgTm92b0NvbmRpdGlvbklucHV0RGVmLFxuICAgIE5vdm9Db25kaXRpb25GaWVsZERlZixcbiAgICBOb3ZvRGVmYXVsdFN0cmluZ0NvbmRpdGlvbkRlZixcbiAgICBOb3ZvRGVmYXVsdE51bWJlckNvbmRpdGlvbkRlZixcbiAgICBOb3ZvRGVmYXVsdElkQ29uZGl0aW9uRGVmLFxuICAgIE5vdm9EZWZhdWx0UGlja2VyQ29uZGl0aW9uRGVmLFxuICAgIE5vdm9Db25kaXRpb25UZW1wbGF0ZXNDb21wb25lbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9RdWVyeUJ1aWxkZXJNb2R1bGUge31cbiJdfQ==