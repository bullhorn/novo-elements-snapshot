import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoCommonModule, NovoOptionModule } from 'novo-elements/common';
import { NovoButtonModule } from 'novo-elements/components/button';
import { NovoCheckboxModule } from 'novo-elements/components/checkbox';
import { NovoDatePickerModule } from 'novo-elements/components/date-picker';
import { NovoDropdownModule } from 'novo-elements/components/dropdown';
import { NovoFormExtrasModule } from 'novo-elements/components/form/extras';
import { NovoLoadingModule } from 'novo-elements/components/loading';
import { NovoSearchBoxModule } from 'novo-elements/components/search';
import { NovoTilesModule } from 'novo-elements/components/tiles';
import { NovoActionCell, NovoCell, NovoCellDef, NovoCheckboxCell, NovoCheckboxHeaderCell, NovoColumnDef, NovoEmptyHeaderCell, NovoHeaderCell, NovoHeaderCellDef, } from './cell';
import { NovoAdvancedHeaderCell, NovoFilterFocus } from './cell-header';
import { NovoTablePagination } from './pagination';
import { NovoHeaderRow, NovoHeaderRowDef, NovoRow, NovoRowDef } from './row';
import { NovoSelection, NovoSortFilter } from './sort';
import { NovoActivityTableState } from './state';
import { NovoActivityTable, NovoActivityTableActions, NovoActivityTableCustomFilter, NovoActivityTableCustomHeader, NovoActivityTableEmptyMessage, NovoActivityTableNoResultsMessage, NovoTable, } from './table';
import * as i0 from "@angular/core";
export class NovoTableModule {
}
NovoTableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoTableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTableModule, declarations: [NovoTable,
        NovoCellDef,
        NovoHeaderCellDef,
        NovoColumnDef,
        NovoActivityTableEmptyMessage,
        NovoActivityTableNoResultsMessage,
        NovoHeaderRowDef,
        NovoRowDef,
        NovoAdvancedHeaderCell,
        NovoSortFilter,
        NovoActionCell,
        NovoEmptyHeaderCell,
        NovoHeaderCell,
        NovoCell,
        NovoHeaderRow,
        NovoRow,
        NovoFilterFocus,
        NovoTablePagination,
        NovoActivityTableCustomHeader,
        NovoCheckboxCell,
        NovoCheckboxHeaderCell,
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
        NovoCellDef,
        NovoHeaderCellDef,
        NovoColumnDef,
        NovoActivityTableEmptyMessage,
        NovoActivityTableNoResultsMessage,
        NovoHeaderRowDef,
        NovoRowDef,
        NovoAdvancedHeaderCell,
        NovoSortFilter,
        NovoActionCell,
        NovoEmptyHeaderCell,
        NovoHeaderCell,
        NovoCell,
        NovoHeaderRow,
        NovoRow,
        NovoFilterFocus,
        NovoTablePagination,
        NovoActivityTableCustomHeader,
        NovoCheckboxCell,
        NovoCheckboxHeaderCell,
        NovoSelection,
        NovoActivityTable,
        NovoActivityTableActions,
        NovoActivityTableCustomFilter] });
NovoTableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTableModule, providers: [NovoActivityTableState], imports: [[
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
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTableModule, decorators: [{
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
                        NovoCellDef,
                        NovoHeaderCellDef,
                        NovoColumnDef,
                        NovoActivityTableEmptyMessage,
                        NovoActivityTableNoResultsMessage,
                        NovoHeaderRowDef,
                        NovoRowDef,
                        NovoAdvancedHeaderCell,
                        NovoSortFilter,
                        NovoActionCell,
                        NovoEmptyHeaderCell,
                        NovoHeaderCell,
                        NovoCell,
                        NovoHeaderRow,
                        NovoRow,
                        NovoFilterFocus,
                        NovoTablePagination,
                        NovoActivityTableCustomHeader,
                        NovoCheckboxCell,
                        NovoCheckboxHeaderCell,
                        NovoSelection,
                        NovoActivityTable,
                        NovoActivityTableActions,
                        NovoActivityTableCustomFilter,
                    ],
                    declarations: [
                        NovoTable,
                        NovoCellDef,
                        NovoHeaderCellDef,
                        NovoColumnDef,
                        NovoActivityTableEmptyMessage,
                        NovoActivityTableNoResultsMessage,
                        NovoHeaderRowDef,
                        NovoRowDef,
                        NovoAdvancedHeaderCell,
                        NovoSortFilter,
                        NovoActionCell,
                        NovoEmptyHeaderCell,
                        NovoHeaderCell,
                        NovoCell,
                        NovoHeaderRow,
                        NovoRow,
                        NovoFilterFocus,
                        NovoTablePagination,
                        NovoActivityTableCustomHeader,
                        NovoCheckboxCell,
                        NovoCheckboxHeaderCell,
                        NovoSelection,
                        NovoActivityTable,
                        NovoActivityTableActions,
                        NovoActivityTableCustomFilter,
                    ],
                    providers: [NovoActivityTableState],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy90YWJsZS90YWJsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNuRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUNMLGNBQWMsRUFDZCxRQUFRLEVBQ1IsV0FBVyxFQUNYLGdCQUFnQixFQUNoQixzQkFBc0IsRUFDdEIsYUFBYSxFQUNiLG1CQUFtQixFQUNuQixjQUFjLEVBQ2QsaUJBQWlCLEdBQ2xCLE1BQU0sUUFBUSxDQUFDO0FBQ2hCLE9BQU8sRUFBRSxzQkFBc0IsRUFB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O3dCQUNuQiw2QkFBNkI7d0JBQzdCLGdCQUFnQjt3QkFDaEIsc0JBQXNCO3dCQUN0QixhQUFhO3dCQUNiLGlCQUFpQjt3QkFDakIsd0JBQXdCO3dCQUN4Qiw2QkFBNkI7cUJBQzlCO29CQUNELFlBQVksRUFBRTt3QkFDWixTQUFTO3dCQUNULFdBQVc7d0JBQ1gsaUJBQWlCO3dCQUNqQixhQUFhO3dCQUNiLDZCQUE2Qjt3QkFDN0IsaUNBQWlDO3dCQUNqQyxnQkFBZ0I7d0JBQ2hCLFVBQVU7d0JBQ1Ysc0JBQXNCO3dCQUN0QixjQUFjO3dCQUNkLGNBQWM7d0JBQ2QsbUJBQW1CO3dCQUNuQixjQUFjO3dCQUNkLFFBQVE7d0JBQ1IsYUFBYTt3QkFDYixPQUFPO3dCQUNQLGVBQWU7d0JBQ2YsbUJBQW1CO3dCQUNuQiw2QkFBNkI7d0JBQzdCLGdCQUFnQjt3QkFDaEIsc0JBQXNCO3dCQUN0QixhQUFhO3dCQUNiLGlCQUFpQjt3QkFDakIsd0JBQXdCO3dCQUN4Qiw2QkFBNkI7cUJBQzlCO29CQUNELFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO2lCQUNwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENka1RhYmxlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOb3ZvQ29tbW9uTW9kdWxlLCBOb3ZvT3B0aW9uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21tb24nO1xuaW1wb3J0IHsgTm92b0J1dHRvbk1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy9idXR0b24nO1xuaW1wb3J0IHsgTm92b0NoZWNrYm94TW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL2NoZWNrYm94JztcbmltcG9ydCB7IE5vdm9EYXRlUGlja2VyTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL2RhdGUtcGlja2VyJztcbmltcG9ydCB7IE5vdm9Ecm9wZG93bk1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy9kcm9wZG93bic7XG5pbXBvcnQgeyBOb3ZvRm9ybUV4dHJhc01vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy9mb3JtL2V4dHJhcyc7XG5pbXBvcnQgeyBOb3ZvTG9hZGluZ01vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy9sb2FkaW5nJztcbmltcG9ydCB7IE5vdm9TZWFyY2hCb3hNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvc2VhcmNoJztcbmltcG9ydCB7IE5vdm9UaWxlc01vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy90aWxlcyc7XG5pbXBvcnQge1xuICBOb3ZvQWN0aW9uQ2VsbCxcbiAgTm92b0NlbGwsXG4gIE5vdm9DZWxsRGVmLFxuICBOb3ZvQ2hlY2tib3hDZWxsLFxuICBOb3ZvQ2hlY2tib3hIZWFkZXJDZWxsLFxuICBOb3ZvQ29sdW1uRGVmLFxuICBOb3ZvRW1wdHlIZWFkZXJDZWxsLFxuICBOb3ZvSGVhZGVyQ2VsbCxcbiAgTm92b0hlYWRlckNlbGxEZWYsXG59IGZyb20gJy4vY2VsbCc7XG5pbXBvcnQgeyBOb3ZvQWR2YW5jZWRIZWFkZXJDZWxsLCBOb3ZvRmlsdGVyRm9jdXMgfSBmcm9tICcuL2NlbGwtaGVhZGVyJztcbmltcG9ydCB7IE5vdm9UYWJsZVBhZ2luYXRpb24gfSBmcm9tICcuL3BhZ2luYXRpb24nO1xuaW1wb3J0IHsgTm92b0hlYWRlclJvdywgTm92b0hlYWRlclJvd0RlZiwgTm92b1JvdywgTm92b1Jvd0RlZiB9IGZyb20gJy4vcm93JztcbmltcG9ydCB7IE5vdm9TZWxlY3Rpb24sIE5vdm9Tb3J0RmlsdGVyIH0gZnJvbSAnLi9zb3J0JztcbmltcG9ydCB7IE5vdm9BY3Rpdml0eVRhYmxlU3RhdGUgfSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7XG4gIE5vdm9BY3Rpdml0eVRhYmxlLFxuICBOb3ZvQWN0aXZpdHlUYWJsZUFjdGlvbnMsXG4gIE5vdm9BY3Rpdml0eVRhYmxlQ3VzdG9tRmlsdGVyLFxuICBOb3ZvQWN0aXZpdHlUYWJsZUN1c3RvbUhlYWRlcixcbiAgTm92b0FjdGl2aXR5VGFibGVFbXB0eU1lc3NhZ2UsXG4gIE5vdm9BY3Rpdml0eVRhYmxlTm9SZXN1bHRzTWVzc2FnZSxcbiAgTm92b1RhYmxlLFxufSBmcm9tICcuL3RhYmxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIE5vdm9EYXRlUGlja2VyTW9kdWxlLFxuICAgIENka1RhYmxlTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBOb3ZvQ29tbW9uTW9kdWxlLFxuICAgIE5vdm9CdXR0b25Nb2R1bGUsXG4gICAgTm92b0Ryb3Bkb3duTW9kdWxlLFxuICAgIE5vdm9Gb3JtRXh0cmFzTW9kdWxlLFxuICAgIE5vdm9Mb2FkaW5nTW9kdWxlLFxuICAgIE5vdm9UaWxlc01vZHVsZSxcbiAgICBOb3ZvU2VhcmNoQm94TW9kdWxlLFxuICAgIE5vdm9DaGVja2JveE1vZHVsZSxcbiAgICBOb3ZvT3B0aW9uTW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTm92b1RhYmxlLFxuICAgIE5vdm9DZWxsRGVmLFxuICAgIE5vdm9IZWFkZXJDZWxsRGVmLFxuICAgIE5vdm9Db2x1bW5EZWYsXG4gICAgTm92b0FjdGl2aXR5VGFibGVFbXB0eU1lc3NhZ2UsXG4gICAgTm92b0FjdGl2aXR5VGFibGVOb1Jlc3VsdHNNZXNzYWdlLFxuICAgIE5vdm9IZWFkZXJSb3dEZWYsXG4gICAgTm92b1Jvd0RlZixcbiAgICBOb3ZvQWR2YW5jZWRIZWFkZXJDZWxsLFxuICAgIE5vdm9Tb3J0RmlsdGVyLFxuICAgIE5vdm9BY3Rpb25DZWxsLFxuICAgIE5vdm9FbXB0eUhlYWRlckNlbGwsXG4gICAgTm92b0hlYWRlckNlbGwsXG4gICAgTm92b0NlbGwsXG4gICAgTm92b0hlYWRlclJvdyxcbiAgICBOb3ZvUm93LFxuICAgIE5vdm9GaWx0ZXJGb2N1cyxcbiAgICBOb3ZvVGFibGVQYWdpbmF0aW9uLFxuICAgIE5vdm9BY3Rpdml0eVRhYmxlQ3VzdG9tSGVhZGVyLFxuICAgIE5vdm9DaGVja2JveENlbGwsXG4gICAgTm92b0NoZWNrYm94SGVhZGVyQ2VsbCxcbiAgICBOb3ZvU2VsZWN0aW9uLFxuICAgIE5vdm9BY3Rpdml0eVRhYmxlLFxuICAgIE5vdm9BY3Rpdml0eVRhYmxlQWN0aW9ucyxcbiAgICBOb3ZvQWN0aXZpdHlUYWJsZUN1c3RvbUZpbHRlcixcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTm92b1RhYmxlLFxuICAgIE5vdm9DZWxsRGVmLFxuICAgIE5vdm9IZWFkZXJDZWxsRGVmLFxuICAgIE5vdm9Db2x1bW5EZWYsXG4gICAgTm92b0FjdGl2aXR5VGFibGVFbXB0eU1lc3NhZ2UsXG4gICAgTm92b0FjdGl2aXR5VGFibGVOb1Jlc3VsdHNNZXNzYWdlLFxuICAgIE5vdm9IZWFkZXJSb3dEZWYsXG4gICAgTm92b1Jvd0RlZixcbiAgICBOb3ZvQWR2YW5jZWRIZWFkZXJDZWxsLFxuICAgIE5vdm9Tb3J0RmlsdGVyLFxuICAgIE5vdm9BY3Rpb25DZWxsLFxuICAgIE5vdm9FbXB0eUhlYWRlckNlbGwsXG4gICAgTm92b0hlYWRlckNlbGwsXG4gICAgTm92b0NlbGwsXG4gICAgTm92b0hlYWRlclJvdyxcbiAgICBOb3ZvUm93LFxuICAgIE5vdm9GaWx0ZXJGb2N1cyxcbiAgICBOb3ZvVGFibGVQYWdpbmF0aW9uLFxuICAgIE5vdm9BY3Rpdml0eVRhYmxlQ3VzdG9tSGVhZGVyLFxuICAgIE5vdm9DaGVja2JveENlbGwsXG4gICAgTm92b0NoZWNrYm94SGVhZGVyQ2VsbCxcbiAgICBOb3ZvU2VsZWN0aW9uLFxuICAgIE5vdm9BY3Rpdml0eVRhYmxlLFxuICAgIE5vdm9BY3Rpdml0eVRhYmxlQWN0aW9ucyxcbiAgICBOb3ZvQWN0aXZpdHlUYWJsZUN1c3RvbUZpbHRlcixcbiAgXSxcbiAgcHJvdmlkZXJzOiBbTm92b0FjdGl2aXR5VGFibGVTdGF0ZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9UYWJsZU1vZHVsZSB7fVxuIl19