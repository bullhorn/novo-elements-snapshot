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
import { NovoSwitchModule } from '../switch';
import { NovoTabModule } from '../tabs';
import { ExpressionBuilderComponent } from './expression-builder/expression-builder.component';
import { NovoFilterFieldDef, NovoFilterFieldInputDef, NovoFilterFieldOperatorsDef, NovoFilterFieldTypeDef, } from './filter-builder/base-filter-field.definition';
import { NovoDefaultDateFilterFieldDef } from './filter-builder/default-condition-defs/date-filter-field.definition';
import { NovoDefaultIdFilterFieldDef } from './filter-builder/default-condition-defs/id-filter-field.definition';
import { NovoDefaultNumberFilterFieldDef } from './filter-builder/default-condition-defs/number-filter-field.definition';
import { NovoDefaultPickerFilterFieldDef } from './filter-builder/default-condition-defs/picker-filter-field.definition';
import { NovoDefaultStringFilterFieldDef } from './filter-builder/default-condition-defs/string-filter-field.definition';
import { FilterBuilderComponent, QueryFilterInputOutlet, QueryFilterOperatorOutlet } from './filter-builder/filter-builder.component';
import { QueryBuilderComponent } from './query-builder.component';
import * as i0 from "@angular/core";
export class NovoQueryBuilderModule {
}
NovoQueryBuilderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoQueryBuilderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoQueryBuilderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoQueryBuilderModule, declarations: [ExpressionBuilderComponent,
        QueryBuilderComponent,
        FilterBuilderComponent,
        QueryFilterInputOutlet,
        QueryFilterOperatorOutlet,
        NovoDefaultDateFilterFieldDef,
        NovoFilterFieldOperatorsDef,
        NovoFilterFieldInputDef,
        NovoFilterFieldTypeDef,
        NovoFilterFieldDef,
        NovoDefaultStringFilterFieldDef,
        NovoDefaultNumberFilterFieldDef,
        NovoDefaultIdFilterFieldDef,
        NovoDefaultPickerFilterFieldDef], imports: [CommonModule,
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
        NovoChipsModule], exports: [ExpressionBuilderComponent,
        QueryBuilderComponent,
        FilterBuilderComponent,
        NovoDefaultDateFilterFieldDef,
        NovoFilterFieldOperatorsDef,
        NovoFilterFieldInputDef,
        NovoFilterFieldTypeDef,
        NovoFilterFieldDef,
        NovoDefaultStringFilterFieldDef,
        NovoDefaultNumberFilterFieldDef,
        NovoDefaultIdFilterFieldDef,
        NovoDefaultPickerFilterFieldDef] });
NovoQueryBuilderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoQueryBuilderModule, imports: [[
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
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoQueryBuilderModule, decorators: [{
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
                    ],
                    declarations: [
                        ExpressionBuilderComponent,
                        QueryBuilderComponent,
                        FilterBuilderComponent,
                        QueryFilterInputOutlet,
                        QueryFilterOperatorOutlet,
                        NovoDefaultDateFilterFieldDef,
                        NovoFilterFieldOperatorsDef,
                        NovoFilterFieldInputDef,
                        NovoFilterFieldTypeDef,
                        NovoFilterFieldDef,
                        NovoDefaultStringFilterFieldDef,
                        NovoDefaultNumberFilterFieldDef,
                        NovoDefaultIdFilterFieldDef,
                        NovoDefaultPickerFilterFieldDef,
                    ],
                    exports: [
                        ExpressionBuilderComponent,
                        QueryBuilderComponent,
                        FilterBuilderComponent,
                        NovoDefaultDateFilterFieldDef,
                        NovoFilterFieldOperatorsDef,
                        NovoFilterFieldInputDef,
                        NovoFilterFieldTypeDef,
                        NovoFilterFieldDef,
                        NovoDefaultStringFilterFieldDef,
                        NovoDefaultNumberFilterFieldDef,
                        NovoDefaultIdFilterFieldDef,
                        NovoDefaultPickerFilterFieldDef,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktYnVpbGRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9xdWVyeS1idWlsZGVyL3F1ZXJ5LWJ1aWxkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM3QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUN6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQy9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzdELE9B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Y0FBYzt3QkFDZCxtQkFBbUI7d0JBQ25CLGdCQUFnQjt3QkFDaEIsZUFBZTtxQkFDaEI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLDBCQUEwQjt3QkFDMUIscUJBQXFCO3dCQUNyQixzQkFBc0I7d0JBQ3RCLHNCQUFzQjt3QkFDdEIseUJBQXlCO3dCQUN6Qiw2QkFBNkI7d0JBQzdCLDJCQUEyQjt3QkFDM0IsdUJBQXVCO3dCQUN2QixzQkFBc0I7d0JBQ3RCLGtCQUFrQjt3QkFDbEIsK0JBQStCO3dCQUMvQiwrQkFBK0I7d0JBQy9CLDJCQUEyQjt3QkFDM0IsK0JBQStCO3FCQUNoQztvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsMEJBQTBCO3dCQUMxQixxQkFBcUI7d0JBQ3JCLHNCQUFzQjt3QkFDdEIsNkJBQTZCO3dCQUM3QiwyQkFBMkI7d0JBQzNCLHVCQUF1Qjt3QkFDdkIsc0JBQXNCO3dCQUN0QixrQkFBa0I7d0JBQ2xCLCtCQUErQjt3QkFDL0IsK0JBQStCO3dCQUMvQiwyQkFBMkI7d0JBQzNCLCtCQUErQjtxQkFDaEM7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEcmFnRHJvcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHsgQ2RrVGFibGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5vdm9CdXR0b25Nb2R1bGUgfSBmcm9tICcuLi9idXR0b24nO1xuaW1wb3J0IHsgTm92b0NhcmRNb2R1bGUgfSBmcm9tICcuLi9jYXJkJztcbmltcG9ydCB7IE5vdm9DaGlwc01vZHVsZSB9IGZyb20gJy4uL2NoaXBzJztcbmltcG9ydCB7IE5vdm9Db21tb25Nb2R1bGUsIE5vdm9PcHRpb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IHsgTm92b0RhdGVQaWNrZXJNb2R1bGUgfSBmcm9tICcuLi9kYXRlLXBpY2tlcic7XG5pbXBvcnQgeyBOb3ZvRmllbGRNb2R1bGUgfSBmcm9tICcuLi9maWVsZCc7XG5pbXBvcnQgeyBOb3ZvRmxleE1vZHVsZSB9IGZyb20gJy4uL2ZsZXgnO1xuaW1wb3J0IHsgTm92b0Zvcm1Nb2R1bGUgfSBmcm9tICcuLi9mb3JtJztcbmltcG9ydCB7IE5vdm9JY29uTW9kdWxlIH0gZnJvbSAnLi4vaWNvbic7XG5pbXBvcnQgeyBOb3ZvTG9hZGluZ01vZHVsZSB9IGZyb20gJy4uL2xvYWRpbmcnO1xuaW1wb3J0IHsgTm92b05vbklkZWFsU3RhdGVNb2R1bGUgfSBmcm9tICcuLi9ub24taWRlYWwtc3RhdGUnO1xuaW1wb3J0IHsgTm92b1NlYXJjaEJveE1vZHVsZSB9IGZyb20gJy4uL3NlYXJjaCc7XG5pbXBvcnQgeyBOb3ZvU2VsZWN0TW9kdWxlIH0gZnJvbSAnLi4vc2VsZWN0JztcbmltcG9ydCB7IE5vdm9Td2l0Y2hNb2R1bGUgfSBmcm9tICcuLi9zd2l0Y2gnO1xuaW1wb3J0IHsgTm92b1RhYk1vZHVsZSB9IGZyb20gJy4uL3RhYnMnO1xuaW1wb3J0IHsgRXhwcmVzc2lvbkJ1aWxkZXJDb21wb25lbnQgfSBmcm9tICcuL2V4cHJlc3Npb24tYnVpbGRlci9leHByZXNzaW9uLWJ1aWxkZXIuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIE5vdm9GaWx0ZXJGaWVsZERlZixcbiAgTm92b0ZpbHRlckZpZWxkSW5wdXREZWYsXG4gIE5vdm9GaWx0ZXJGaWVsZE9wZXJhdG9yc0RlZixcbiAgTm92b0ZpbHRlckZpZWxkVHlwZURlZixcbn0gZnJvbSAnLi9maWx0ZXItYnVpbGRlci9iYXNlLWZpbHRlci1maWVsZC5kZWZpbml0aW9uJztcbmltcG9ydCB7IE5vdm9EZWZhdWx0RGF0ZUZpbHRlckZpZWxkRGVmIH0gZnJvbSAnLi9maWx0ZXItYnVpbGRlci9kZWZhdWx0LWNvbmRpdGlvbi1kZWZzL2RhdGUtZmlsdGVyLWZpZWxkLmRlZmluaXRpb24nO1xuaW1wb3J0IHsgTm92b0RlZmF1bHRJZEZpbHRlckZpZWxkRGVmIH0gZnJvbSAnLi9maWx0ZXItYnVpbGRlci9kZWZhdWx0LWNvbmRpdGlvbi1kZWZzL2lkLWZpbHRlci1maWVsZC5kZWZpbml0aW9uJztcbmltcG9ydCB7IE5vdm9EZWZhdWx0TnVtYmVyRmlsdGVyRmllbGREZWYgfSBmcm9tICcuL2ZpbHRlci1idWlsZGVyL2RlZmF1bHQtY29uZGl0aW9uLWRlZnMvbnVtYmVyLWZpbHRlci1maWVsZC5kZWZpbml0aW9uJztcbmltcG9ydCB7IE5vdm9EZWZhdWx0UGlja2VyRmlsdGVyRmllbGREZWYgfSBmcm9tICcuL2ZpbHRlci1idWlsZGVyL2RlZmF1bHQtY29uZGl0aW9uLWRlZnMvcGlja2VyLWZpbHRlci1maWVsZC5kZWZpbml0aW9uJztcbmltcG9ydCB7IE5vdm9EZWZhdWx0U3RyaW5nRmlsdGVyRmllbGREZWYgfSBmcm9tICcuL2ZpbHRlci1idWlsZGVyL2RlZmF1bHQtY29uZGl0aW9uLWRlZnMvc3RyaW5nLWZpbHRlci1maWVsZC5kZWZpbml0aW9uJztcbmltcG9ydCB7IEZpbHRlckJ1aWxkZXJDb21wb25lbnQsIFF1ZXJ5RmlsdGVySW5wdXRPdXRsZXQsIFF1ZXJ5RmlsdGVyT3BlcmF0b3JPdXRsZXQgfSBmcm9tICcuL2ZpbHRlci1idWlsZGVyL2ZpbHRlci1idWlsZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBRdWVyeUJ1aWxkZXJDb21wb25lbnQgfSBmcm9tICcuL3F1ZXJ5LWJ1aWxkZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIERyYWdEcm9wTW9kdWxlLFxuICAgIENka1RhYmxlTW9kdWxlLFxuICAgIE5vdm9CdXR0b25Nb2R1bGUsXG4gICAgTm92b0NvbW1vbk1vZHVsZSxcbiAgICBOb3ZvRm9ybU1vZHVsZSxcbiAgICBOb3ZvU2VsZWN0TW9kdWxlLFxuICAgIE5vdm9Ob25JZGVhbFN0YXRlTW9kdWxlLFxuICAgIE5vdm9GaWVsZE1vZHVsZSxcbiAgICBOb3ZvT3B0aW9uTW9kdWxlLFxuICAgIE5vdm9GbGV4TW9kdWxlLFxuICAgIE5vdm9UYWJNb2R1bGUsXG4gICAgTm92b0xvYWRpbmdNb2R1bGUsXG4gICAgTm92b0NhcmRNb2R1bGUsXG4gICAgTm92b0RhdGVQaWNrZXJNb2R1bGUsXG4gICAgTm92b0ljb25Nb2R1bGUsXG4gICAgTm92b1NlYXJjaEJveE1vZHVsZSxcbiAgICBOb3ZvU3dpdGNoTW9kdWxlLFxuICAgIE5vdm9DaGlwc01vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRXhwcmVzc2lvbkJ1aWxkZXJDb21wb25lbnQsXG4gICAgUXVlcnlCdWlsZGVyQ29tcG9uZW50LFxuICAgIEZpbHRlckJ1aWxkZXJDb21wb25lbnQsXG4gICAgUXVlcnlGaWx0ZXJJbnB1dE91dGxldCxcbiAgICBRdWVyeUZpbHRlck9wZXJhdG9yT3V0bGV0LFxuICAgIE5vdm9EZWZhdWx0RGF0ZUZpbHRlckZpZWxkRGVmLFxuICAgIE5vdm9GaWx0ZXJGaWVsZE9wZXJhdG9yc0RlZixcbiAgICBOb3ZvRmlsdGVyRmllbGRJbnB1dERlZixcbiAgICBOb3ZvRmlsdGVyRmllbGRUeXBlRGVmLFxuICAgIE5vdm9GaWx0ZXJGaWVsZERlZixcbiAgICBOb3ZvRGVmYXVsdFN0cmluZ0ZpbHRlckZpZWxkRGVmLFxuICAgIE5vdm9EZWZhdWx0TnVtYmVyRmlsdGVyRmllbGREZWYsXG4gICAgTm92b0RlZmF1bHRJZEZpbHRlckZpZWxkRGVmLFxuICAgIE5vdm9EZWZhdWx0UGlja2VyRmlsdGVyRmllbGREZWYsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBFeHByZXNzaW9uQnVpbGRlckNvbXBvbmVudCxcbiAgICBRdWVyeUJ1aWxkZXJDb21wb25lbnQsXG4gICAgRmlsdGVyQnVpbGRlckNvbXBvbmVudCxcbiAgICBOb3ZvRGVmYXVsdERhdGVGaWx0ZXJGaWVsZERlZixcbiAgICBOb3ZvRmlsdGVyRmllbGRPcGVyYXRvcnNEZWYsXG4gICAgTm92b0ZpbHRlckZpZWxkSW5wdXREZWYsXG4gICAgTm92b0ZpbHRlckZpZWxkVHlwZURlZixcbiAgICBOb3ZvRmlsdGVyRmllbGREZWYsXG4gICAgTm92b0RlZmF1bHRTdHJpbmdGaWx0ZXJGaWVsZERlZixcbiAgICBOb3ZvRGVmYXVsdE51bWJlckZpbHRlckZpZWxkRGVmLFxuICAgIE5vdm9EZWZhdWx0SWRGaWx0ZXJGaWVsZERlZixcbiAgICBOb3ZvRGVmYXVsdFBpY2tlckZpbHRlckZpZWxkRGVmLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvUXVlcnlCdWlsZGVyTW9kdWxlIHt9XG4iXX0=