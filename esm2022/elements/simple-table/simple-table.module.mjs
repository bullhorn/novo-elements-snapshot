import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoCheckboxModule } from 'novo-elements/elements/checkbox';
import { NovoCommonModule, NovoOptionModule } from 'novo-elements/elements/common';
import { NovoDatePickerModule } from 'novo-elements/elements/date-picker';
import { NovoDropdownModule } from 'novo-elements/elements/dropdown';
import { NovoFormExtrasModule } from 'novo-elements/elements/form';
import { NovoLoadingModule } from 'novo-elements/elements/loading';
import { NovoSearchBoxModule } from 'novo-elements/elements/search';
import { NovoTilesModule } from 'novo-elements/elements/tiles';
import { NovoSimpleActionCell, NovoSimpleCell, NovoSimpleCellDef, NovoSimpleCheckboxCell, NovoSimpleCheckboxHeaderCell, NovoSimpleColumnDef, NovoSimpleEmptyHeaderCell, NovoSimpleHeaderCell, NovoSimpleHeaderCellDef, } from './cell';
import { NovoSimpleCellHeader, NovoSimpleFilterFocus } from './cell-header';
import { NovoSimpleTablePagination } from './pagination';
import { NovoSimpleHeaderRow, NovoSimpleHeaderRowDef, NovoSimpleRow, NovoSimpleRowDef } from './row';
import { NovoSelection, NovoSortFilter } from './sort';
import { NovoActivityTableState } from './state';
import { NovoActivityTable, NovoActivityTableActions, NovoActivityTableCustomFilter, NovoActivityTableCustomHeader, NovoActivityTableEmptyMessage, NovoActivityTableNoResultsMessage, NovoTable, } from './table';
import * as i0 from "@angular/core";
export class NovoSimpleTableModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoSimpleTableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: NovoSimpleTableModule, declarations: [NovoTable,
            NovoSimpleCellDef,
            NovoSimpleHeaderCellDef,
            NovoSimpleColumnDef,
            NovoActivityTableEmptyMessage,
            NovoActivityTableNoResultsMessage,
            NovoSimpleHeaderRowDef,
            NovoSimpleRowDef,
            NovoSimpleCellHeader,
            NovoSortFilter,
            NovoSimpleActionCell,
            NovoSimpleEmptyHeaderCell,
            NovoSimpleHeaderCell,
            NovoSimpleCell,
            NovoSimpleHeaderRow,
            NovoSimpleRow,
            NovoSimpleFilterFocus,
            NovoSimpleTablePagination,
            NovoActivityTableCustomHeader,
            NovoSimpleCheckboxCell,
            NovoSimpleCheckboxHeaderCell,
            NovoSelection,
            NovoActivityTable,
            NovoActivityTableActions,
            NovoActivityTableCustomFilter], imports: [NovoDatePickerModule,
            CdkTableModule,
            CommonModule,
            FormsModule,
            NovoCommonModule,
            NovoButtonModule,
            NovoDropdownModule,
            NovoFormExtrasModule,
            NovoLoadingModule,
            NovoTilesModule,
            NovoSearchBoxModule,
            NovoCheckboxModule,
            NovoOptionModule], exports: [NovoTable,
            NovoSimpleCellDef,
            NovoSimpleHeaderCellDef,
            NovoSimpleColumnDef,
            NovoActivityTableEmptyMessage,
            NovoActivityTableNoResultsMessage,
            NovoSimpleHeaderRowDef,
            NovoSimpleRowDef,
            NovoSimpleCellHeader,
            NovoSortFilter,
            NovoSimpleActionCell,
            NovoSimpleEmptyHeaderCell,
            NovoSimpleHeaderCell,
            NovoSimpleCell,
            NovoSimpleHeaderRow,
            NovoSimpleRow,
            NovoSimpleFilterFocus,
            NovoSimpleTablePagination,
            NovoActivityTableCustomHeader,
            NovoSimpleCheckboxCell,
            NovoSimpleCheckboxHeaderCell,
            NovoSelection,
            NovoActivityTable,
            NovoActivityTableActions,
            NovoActivityTableCustomFilter] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoSimpleTableModule, providers: [NovoActivityTableState], imports: [NovoDatePickerModule,
            CdkTableModule,
            CommonModule,
            FormsModule,
            NovoCommonModule,
            NovoButtonModule,
            NovoDropdownModule,
            NovoFormExtrasModule,
            NovoLoadingModule,
            NovoTilesModule,
            NovoSearchBoxModule,
            NovoCheckboxModule,
            NovoOptionModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoSimpleTableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        NovoDatePickerModule,
                        CdkTableModule,
                        CommonModule,
                        FormsModule,
                        NovoCommonModule,
                        NovoButtonModule,
                        NovoDropdownModule,
                        NovoFormExtrasModule,
                        NovoLoadingModule,
                        NovoTilesModule,
                        NovoSearchBoxModule,
                        NovoCheckboxModule,
                        NovoOptionModule,
                    ],
                    exports: [
                        NovoTable,
                        NovoSimpleCellDef,
                        NovoSimpleHeaderCellDef,
                        NovoSimpleColumnDef,
                        NovoActivityTableEmptyMessage,
                        NovoActivityTableNoResultsMessage,
                        NovoSimpleHeaderRowDef,
                        NovoSimpleRowDef,
                        NovoSimpleCellHeader,
                        NovoSortFilter,
                        NovoSimpleActionCell,
                        NovoSimpleEmptyHeaderCell,
                        NovoSimpleHeaderCell,
                        NovoSimpleCell,
                        NovoSimpleHeaderRow,
                        NovoSimpleRow,
                        NovoSimpleFilterFocus,
                        NovoSimpleTablePagination,
                        NovoActivityTableCustomHeader,
                        NovoSimpleCheckboxCell,
                        NovoSimpleCheckboxHeaderCell,
                        NovoSelection,
                        NovoActivityTable,
                        NovoActivityTableActions,
                        NovoActivityTableCustomFilter,
                    ],
                    declarations: [
                        NovoTable,
                        NovoSimpleCellDef,
                        NovoSimpleHeaderCellDef,
                        NovoSimpleColumnDef,
                        NovoActivityTableEmptyMessage,
                        NovoActivityTableNoResultsMessage,
                        NovoSimpleHeaderRowDef,
                        NovoSimpleRowDef,
                        NovoSimpleCellHeader,
                        NovoSortFilter,
                        NovoSimpleActionCell,
                        NovoSimpleEmptyHeaderCell,
                        NovoSimpleHeaderCell,
                        NovoSimpleCell,
                        NovoSimpleHeaderRow,
                        NovoSimpleRow,
                        NovoSimpleFilterFocus,
                        NovoSimpleTablePagination,
                        NovoActivityTableCustomHeader,
                        NovoSimpleCheckboxCell,
                        NovoSimpleCheckboxHeaderCell,
                        NovoSelection,
                        NovoActivityTable,
                        NovoActivityTableActions,
                        NovoActivityTableCustomFilter,
                    ],
                    providers: [NovoActivityTableState],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXRhYmxlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3NpbXBsZS10YWJsZS9zaW1wbGUtdGFibGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDakUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDckUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbkYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDMUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDckUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDbkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsY0FBYyxFQUNkLGlCQUFpQixFQUNqQixzQkFBc0IsRUFDdEIsNEJBQTRCLEVBQzVCLG1CQUFtQixFQUNuQix5QkFBeUIsRUFDekIsb0JBQW9CLEVBQ3BCLHVCQUF1QixHQUN4QixN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QixjQUFjO3dCQUNkLG9CQUFvQjt3QkFDcEIseUJBQXlCO3dCQUN6QixvQkFBb0I7d0JBQ3BCLGNBQWM7d0JBQ2QsbUJBQW1CO3dCQUNuQixhQUFhO3dCQUNiLHFCQUFxQjt3QkFDckIseUJBQXlCO3dCQUN6Qiw2QkFBNkI7d0JBQzdCLHNCQUFzQjt3QkFDdEIsNEJBQTRCO3dCQUM1QixhQUFhO3dCQUNiLGlCQUFpQjt3QkFDakIsd0JBQXdCO3dCQUN4Qiw2QkFBNkI7cUJBQzlCO29CQUNELFlBQVksRUFBRTt3QkFDWixTQUFTO3dCQUNULGlCQUFpQjt3QkFDakIsdUJBQXVCO3dCQUN2QixtQkFBbUI7d0JBQ25CLDZCQUE2Qjt3QkFDN0IsaUNBQWlDO3dCQUNqQyxzQkFBc0I7d0JBQ3RCLGdCQUFnQjt3QkFDaEIsb0JBQW9CO3dCQUNwQixjQUFjO3dCQUNkLG9CQUFvQjt3QkFDcEIseUJBQXlCO3dCQUN6QixvQkFBb0I7d0JBQ3BCLGNBQWM7d0JBQ2QsbUJBQW1CO3dCQUNuQixhQUFhO3dCQUNiLHFCQUFxQjt3QkFDckIseUJBQXlCO3dCQUN6Qiw2QkFBNkI7d0JBQzdCLHNCQUFzQjt3QkFDdEIsNEJBQTRCO3dCQUM1QixhQUFhO3dCQUNiLGlCQUFpQjt3QkFDakIsd0JBQXdCO3dCQUN4Qiw2QkFBNkI7cUJBQzlCO29CQUNELFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO2lCQUNwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENka1RhYmxlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9idXR0b24nO1xuaW1wb3J0IHsgTm92b0NoZWNrYm94TW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9jaGVja2JveCc7XG5pbXBvcnQgeyBOb3ZvQ29tbW9uTW9kdWxlLCBOb3ZvT3B0aW9uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9jb21tb24nO1xuaW1wb3J0IHsgTm92b0RhdGVQaWNrZXJNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2RhdGUtcGlja2VyJztcbmltcG9ydCB7IE5vdm9Ecm9wZG93bk1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvZHJvcGRvd24nO1xuaW1wb3J0IHsgTm92b0Zvcm1FeHRyYXNNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2Zvcm0nO1xuaW1wb3J0IHsgTm92b0xvYWRpbmdNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2xvYWRpbmcnO1xuaW1wb3J0IHsgTm92b1NlYXJjaEJveE1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvc2VhcmNoJztcbmltcG9ydCB7IE5vdm9UaWxlc01vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvdGlsZXMnO1xuaW1wb3J0IHtcbiAgTm92b1NpbXBsZUFjdGlvbkNlbGwsXG4gIE5vdm9TaW1wbGVDZWxsLFxuICBOb3ZvU2ltcGxlQ2VsbERlZixcbiAgTm92b1NpbXBsZUNoZWNrYm94Q2VsbCxcbiAgTm92b1NpbXBsZUNoZWNrYm94SGVhZGVyQ2VsbCxcbiAgTm92b1NpbXBsZUNvbHVtbkRlZixcbiAgTm92b1NpbXBsZUVtcHR5SGVhZGVyQ2VsbCxcbiAgTm92b1NpbXBsZUhlYWRlckNlbGwsXG4gIE5vdm9TaW1wbGVIZWFkZXJDZWxsRGVmLFxufSBmcm9tICcuL2NlbGwnO1xuaW1wb3J0IHsgTm92b1NpbXBsZUNlbGxIZWFkZXIsIE5vdm9TaW1wbGVGaWx0ZXJGb2N1cyB9IGZyb20gJy4vY2VsbC1oZWFkZXInO1xuaW1wb3J0IHsgTm92b1NpbXBsZVRhYmxlUGFnaW5hdGlvbiB9IGZyb20gJy4vcGFnaW5hdGlvbic7XG5pbXBvcnQgeyBOb3ZvU2ltcGxlSGVhZGVyUm93LCBOb3ZvU2ltcGxlSGVhZGVyUm93RGVmLCBOb3ZvU2ltcGxlUm93LCBOb3ZvU2ltcGxlUm93RGVmIH0gZnJvbSAnLi9yb3cnO1xuaW1wb3J0IHsgTm92b1NlbGVjdGlvbiwgTm92b1NvcnRGaWx0ZXIgfSBmcm9tICcuL3NvcnQnO1xuaW1wb3J0IHsgTm92b0FjdGl2aXR5VGFibGVTdGF0ZSB9IGZyb20gJy4vc3RhdGUnO1xuaW1wb3J0IHtcbiAgTm92b0FjdGl2aXR5VGFibGUsXG4gIE5vdm9BY3Rpdml0eVRhYmxlQWN0aW9ucyxcbiAgTm92b0FjdGl2aXR5VGFibGVDdXN0b21GaWx0ZXIsXG4gIE5vdm9BY3Rpdml0eVRhYmxlQ3VzdG9tSGVhZGVyLFxuICBOb3ZvQWN0aXZpdHlUYWJsZUVtcHR5TWVzc2FnZSxcbiAgTm92b0FjdGl2aXR5VGFibGVOb1Jlc3VsdHNNZXNzYWdlLFxuICBOb3ZvVGFibGUsXG59IGZyb20gJy4vdGFibGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgTm92b0RhdGVQaWNrZXJNb2R1bGUsXG4gICAgQ2RrVGFibGVNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE5vdm9Db21tb25Nb2R1bGUsXG4gICAgTm92b0J1dHRvbk1vZHVsZSxcbiAgICBOb3ZvRHJvcGRvd25Nb2R1bGUsXG4gICAgTm92b0Zvcm1FeHRyYXNNb2R1bGUsXG4gICAgTm92b0xvYWRpbmdNb2R1bGUsXG4gICAgTm92b1RpbGVzTW9kdWxlLFxuICAgIE5vdm9TZWFyY2hCb3hNb2R1bGUsXG4gICAgTm92b0NoZWNrYm94TW9kdWxlLFxuICAgIE5vdm9PcHRpb25Nb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOb3ZvVGFibGUsXG4gICAgTm92b1NpbXBsZUNlbGxEZWYsXG4gICAgTm92b1NpbXBsZUhlYWRlckNlbGxEZWYsXG4gICAgTm92b1NpbXBsZUNvbHVtbkRlZixcbiAgICBOb3ZvQWN0aXZpdHlUYWJsZUVtcHR5TWVzc2FnZSxcbiAgICBOb3ZvQWN0aXZpdHlUYWJsZU5vUmVzdWx0c01lc3NhZ2UsXG4gICAgTm92b1NpbXBsZUhlYWRlclJvd0RlZixcbiAgICBOb3ZvU2ltcGxlUm93RGVmLFxuICAgIE5vdm9TaW1wbGVDZWxsSGVhZGVyLFxuICAgIE5vdm9Tb3J0RmlsdGVyLFxuICAgIE5vdm9TaW1wbGVBY3Rpb25DZWxsLFxuICAgIE5vdm9TaW1wbGVFbXB0eUhlYWRlckNlbGwsXG4gICAgTm92b1NpbXBsZUhlYWRlckNlbGwsXG4gICAgTm92b1NpbXBsZUNlbGwsXG4gICAgTm92b1NpbXBsZUhlYWRlclJvdyxcbiAgICBOb3ZvU2ltcGxlUm93LFxuICAgIE5vdm9TaW1wbGVGaWx0ZXJGb2N1cyxcbiAgICBOb3ZvU2ltcGxlVGFibGVQYWdpbmF0aW9uLFxuICAgIE5vdm9BY3Rpdml0eVRhYmxlQ3VzdG9tSGVhZGVyLFxuICAgIE5vdm9TaW1wbGVDaGVja2JveENlbGwsXG4gICAgTm92b1NpbXBsZUNoZWNrYm94SGVhZGVyQ2VsbCxcbiAgICBOb3ZvU2VsZWN0aW9uLFxuICAgIE5vdm9BY3Rpdml0eVRhYmxlLFxuICAgIE5vdm9BY3Rpdml0eVRhYmxlQWN0aW9ucyxcbiAgICBOb3ZvQWN0aXZpdHlUYWJsZUN1c3RvbUZpbHRlcixcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTm92b1RhYmxlLFxuICAgIE5vdm9TaW1wbGVDZWxsRGVmLFxuICAgIE5vdm9TaW1wbGVIZWFkZXJDZWxsRGVmLFxuICAgIE5vdm9TaW1wbGVDb2x1bW5EZWYsXG4gICAgTm92b0FjdGl2aXR5VGFibGVFbXB0eU1lc3NhZ2UsXG4gICAgTm92b0FjdGl2aXR5VGFibGVOb1Jlc3VsdHNNZXNzYWdlLFxuICAgIE5vdm9TaW1wbGVIZWFkZXJSb3dEZWYsXG4gICAgTm92b1NpbXBsZVJvd0RlZixcbiAgICBOb3ZvU2ltcGxlQ2VsbEhlYWRlcixcbiAgICBOb3ZvU29ydEZpbHRlcixcbiAgICBOb3ZvU2ltcGxlQWN0aW9uQ2VsbCxcbiAgICBOb3ZvU2ltcGxlRW1wdHlIZWFkZXJDZWxsLFxuICAgIE5vdm9TaW1wbGVIZWFkZXJDZWxsLFxuICAgIE5vdm9TaW1wbGVDZWxsLFxuICAgIE5vdm9TaW1wbGVIZWFkZXJSb3csXG4gICAgTm92b1NpbXBsZVJvdyxcbiAgICBOb3ZvU2ltcGxlRmlsdGVyRm9jdXMsXG4gICAgTm92b1NpbXBsZVRhYmxlUGFnaW5hdGlvbixcbiAgICBOb3ZvQWN0aXZpdHlUYWJsZUN1c3RvbUhlYWRlcixcbiAgICBOb3ZvU2ltcGxlQ2hlY2tib3hDZWxsLFxuICAgIE5vdm9TaW1wbGVDaGVja2JveEhlYWRlckNlbGwsXG4gICAgTm92b1NlbGVjdGlvbixcbiAgICBOb3ZvQWN0aXZpdHlUYWJsZSxcbiAgICBOb3ZvQWN0aXZpdHlUYWJsZUFjdGlvbnMsXG4gICAgTm92b0FjdGl2aXR5VGFibGVDdXN0b21GaWx0ZXIsXG4gIF0sXG4gIHByb3ZpZGVyczogW05vdm9BY3Rpdml0eVRhYmxlU3RhdGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvU2ltcGxlVGFibGVNb2R1bGUge31cbiJdfQ==