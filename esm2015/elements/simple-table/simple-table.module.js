import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoButtonModule } from '../button/Button.module';
import { NovoDatePickerModule } from '../date-picker/DatePicker.module';
import { NovoDropdownModule } from '../dropdown/Dropdown.module';
import { NovoFormExtrasModule } from '../form/extras/FormExtras.module';
import { NovoLoadingModule } from '../loading/Loading.module';
import { NovoSearchBoxModule } from '../search/SearchBox.module';
import { NovoTilesModule } from '../tiles/Tiles.module';
import { NovoSimpleActionCell, NovoSimpleCell, NovoSimpleCellDef, NovoSimpleCheckboxCell, NovoSimpleCheckboxHeaderCell, NovoSimpleColumnDef, NovoSimpleEmptyHeaderCell, NovoSimpleHeaderCell, NovoSimpleHeaderCellDef, } from './cell';
import { NovoSimpleCellHeader, NovoSimpleFilterFocus } from './cell-header';
import { NovoSimpleTablePagination } from './pagination';
import { NovoSimpleHeaderRow, NovoSimpleHeaderRowDef, NovoSimpleRow, NovoSimpleRowDef } from './row';
import { NovoSelection, NovoSortFilter } from './sort';
import { NovoActivityTableState } from './state';
import { NovoActivityTable, NovoActivityTableActions, NovoActivityTableCustomFilter, NovoActivityTableCustomHeader, NovoActivityTableEmptyMessage, NovoActivityTableNoResultsMessage, NovoTable, } from './table';
import * as i0 from "@angular/core";
export class NovoSimpleTableModule {
}
NovoSimpleTableModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoSimpleTableModule });
NovoSimpleTableModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoSimpleTableModule_Factory(t) { return new (t || NovoSimpleTableModule)(); }, providers: [NovoActivityTableState], imports: [[
            NovoDatePickerModule,
            CdkTableModule,
            CommonModule,
            FormsModule,
            NovoButtonModule,
            NovoDropdownModule,
            NovoFormExtrasModule,
            NovoLoadingModule,
            NovoTilesModule,
            NovoSearchBoxModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoSimpleTableModule, { declarations: [NovoTable,
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
        NovoButtonModule,
        NovoDropdownModule,
        NovoFormExtrasModule,
        NovoLoadingModule,
        NovoTilesModule,
        NovoSearchBoxModule], exports: [NovoTable,
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
        NovoActivityTableCustomFilter] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoSimpleTableModule, [{
        type: NgModule,
        args: [{
                imports: [
                    NovoDatePickerModule,
                    CdkTableModule,
                    CommonModule,
                    FormsModule,
                    NovoButtonModule,
                    NovoDropdownModule,
                    NovoFormExtrasModule,
                    NovoLoadingModule,
                    NovoTilesModule,
                    NovoSearchBoxModule,
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
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXRhYmxlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9zaW1wbGUtdGFibGUvc2ltcGxlLXRhYmxlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzlELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsc0JBQXNCLEVBQ3RCLDRCQUE0QixFQUM1QixtQkFBbUIsRUFDbkIseUJBQXlCLEVBQ3pCLG9CQUFvQixFQUNwQix1QkFBdUIsR0FDeEIsTUFBTSxRQUFRLENBQUM7QUFDaEIsT0FBTyxFQUFFLG9CQUFvQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FB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QUNqQix3QkFBd0I7b0JBQ3hCLDZCQUE2QjtpQkFDOUI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLFNBQVM7b0JBQ1QsaUJBQWlCO29CQUNqQix1QkFBdUI7b0JBQ3ZCLG1CQUFtQjtvQkFDbkIsNkJBQTZCO29CQUM3QixpQ0FBaUM7b0JBQ2pDLHNCQUFzQjtvQkFDdEIsZ0JBQWdCO29CQUNoQixvQkFBb0I7b0JBQ3BCLGNBQWM7b0JBQ2Qsb0JBQW9CO29CQUNwQix5QkFBeUI7b0JBQ3pCLG9CQUFvQjtvQkFDcEIsY0FBYztvQkFDZCxtQkFBbUI7b0JBQ25CLGFBQWE7b0JBQ2IscUJBQXFCO29CQUNyQix5QkFBeUI7b0JBQ3pCLDZCQUE2QjtvQkFDN0Isc0JBQXNCO29CQUN0Qiw0QkFBNEI7b0JBQzVCLGFBQWE7b0JBQ2IsaUJBQWlCO29CQUNqQix3QkFBd0I7b0JBQ3hCLDZCQUE2QjtpQkFDOUI7Z0JBQ0QsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7YUFDcEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZGtUYWJsZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTm92b0J1dHRvbk1vZHVsZSB9IGZyb20gJy4uL2J1dHRvbi9CdXR0b24ubW9kdWxlJztcbmltcG9ydCB7IE5vdm9EYXRlUGlja2VyTW9kdWxlIH0gZnJvbSAnLi4vZGF0ZS1waWNrZXIvRGF0ZVBpY2tlci5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0Ryb3Bkb3duTW9kdWxlIH0gZnJvbSAnLi4vZHJvcGRvd24vRHJvcGRvd24ubW9kdWxlJztcbmltcG9ydCB7IE5vdm9Gb3JtRXh0cmFzTW9kdWxlIH0gZnJvbSAnLi4vZm9ybS9leHRyYXMvRm9ybUV4dHJhcy5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0xvYWRpbmdNb2R1bGUgfSBmcm9tICcuLi9sb2FkaW5nL0xvYWRpbmcubW9kdWxlJztcbmltcG9ydCB7IE5vdm9TZWFyY2hCb3hNb2R1bGUgfSBmcm9tICcuLi9zZWFyY2gvU2VhcmNoQm94Lm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvVGlsZXNNb2R1bGUgfSBmcm9tICcuLi90aWxlcy9UaWxlcy5tb2R1bGUnO1xuaW1wb3J0IHtcbiAgTm92b1NpbXBsZUFjdGlvbkNlbGwsXG4gIE5vdm9TaW1wbGVDZWxsLFxuICBOb3ZvU2ltcGxlQ2VsbERlZixcbiAgTm92b1NpbXBsZUNoZWNrYm94Q2VsbCxcbiAgTm92b1NpbXBsZUNoZWNrYm94SGVhZGVyQ2VsbCxcbiAgTm92b1NpbXBsZUNvbHVtbkRlZixcbiAgTm92b1NpbXBsZUVtcHR5SGVhZGVyQ2VsbCxcbiAgTm92b1NpbXBsZUhlYWRlckNlbGwsXG4gIE5vdm9TaW1wbGVIZWFkZXJDZWxsRGVmLFxufSBmcm9tICcuL2NlbGwnO1xuaW1wb3J0IHsgTm92b1NpbXBsZUNlbGxIZWFkZXIsIE5vdm9TaW1wbGVGaWx0ZXJGb2N1cyB9IGZyb20gJy4vY2VsbC1oZWFkZXInO1xuaW1wb3J0IHsgTm92b1NpbXBsZVRhYmxlUGFnaW5hdGlvbiB9IGZyb20gJy4vcGFnaW5hdGlvbic7XG5pbXBvcnQgeyBOb3ZvU2ltcGxlSGVhZGVyUm93LCBOb3ZvU2ltcGxlSGVhZGVyUm93RGVmLCBOb3ZvU2ltcGxlUm93LCBOb3ZvU2ltcGxlUm93RGVmIH0gZnJvbSAnLi9yb3cnO1xuaW1wb3J0IHsgTm92b1NlbGVjdGlvbiwgTm92b1NvcnRGaWx0ZXIgfSBmcm9tICcuL3NvcnQnO1xuaW1wb3J0IHsgTm92b0FjdGl2aXR5VGFibGVTdGF0ZSB9IGZyb20gJy4vc3RhdGUnO1xuaW1wb3J0IHtcbiAgTm92b0FjdGl2aXR5VGFibGUsXG4gIE5vdm9BY3Rpdml0eVRhYmxlQWN0aW9ucyxcbiAgTm92b0FjdGl2aXR5VGFibGVDdXN0b21GaWx0ZXIsXG4gIE5vdm9BY3Rpdml0eVRhYmxlQ3VzdG9tSGVhZGVyLFxuICBOb3ZvQWN0aXZpdHlUYWJsZUVtcHR5TWVzc2FnZSxcbiAgTm92b0FjdGl2aXR5VGFibGVOb1Jlc3VsdHNNZXNzYWdlLFxuICBOb3ZvVGFibGUsXG59IGZyb20gJy4vdGFibGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgTm92b0RhdGVQaWNrZXJNb2R1bGUsXG4gICAgQ2RrVGFibGVNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE5vdm9CdXR0b25Nb2R1bGUsXG4gICAgTm92b0Ryb3Bkb3duTW9kdWxlLFxuICAgIE5vdm9Gb3JtRXh0cmFzTW9kdWxlLFxuICAgIE5vdm9Mb2FkaW5nTW9kdWxlLFxuICAgIE5vdm9UaWxlc01vZHVsZSxcbiAgICBOb3ZvU2VhcmNoQm94TW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTm92b1RhYmxlLFxuICAgIE5vdm9TaW1wbGVDZWxsRGVmLFxuICAgIE5vdm9TaW1wbGVIZWFkZXJDZWxsRGVmLFxuICAgIE5vdm9TaW1wbGVDb2x1bW5EZWYsXG4gICAgTm92b0FjdGl2aXR5VGFibGVFbXB0eU1lc3NhZ2UsXG4gICAgTm92b0FjdGl2aXR5VGFibGVOb1Jlc3VsdHNNZXNzYWdlLFxuICAgIE5vdm9TaW1wbGVIZWFkZXJSb3dEZWYsXG4gICAgTm92b1NpbXBsZVJvd0RlZixcbiAgICBOb3ZvU2ltcGxlQ2VsbEhlYWRlcixcbiAgICBOb3ZvU29ydEZpbHRlcixcbiAgICBOb3ZvU2ltcGxlQWN0aW9uQ2VsbCxcbiAgICBOb3ZvU2ltcGxlRW1wdHlIZWFkZXJDZWxsLFxuICAgIE5vdm9TaW1wbGVIZWFkZXJDZWxsLFxuICAgIE5vdm9TaW1wbGVDZWxsLFxuICAgIE5vdm9TaW1wbGVIZWFkZXJSb3csXG4gICAgTm92b1NpbXBsZVJvdyxcbiAgICBOb3ZvU2ltcGxlRmlsdGVyRm9jdXMsXG4gICAgTm92b1NpbXBsZVRhYmxlUGFnaW5hdGlvbixcbiAgICBOb3ZvQWN0aXZpdHlUYWJsZUN1c3RvbUhlYWRlcixcbiAgICBOb3ZvU2ltcGxlQ2hlY2tib3hDZWxsLFxuICAgIE5vdm9TaW1wbGVDaGVja2JveEhlYWRlckNlbGwsXG4gICAgTm92b1NlbGVjdGlvbixcbiAgICBOb3ZvQWN0aXZpdHlUYWJsZSxcbiAgICBOb3ZvQWN0aXZpdHlUYWJsZUFjdGlvbnMsXG4gICAgTm92b0FjdGl2aXR5VGFibGVDdXN0b21GaWx0ZXIsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5vdm9UYWJsZSxcbiAgICBOb3ZvU2ltcGxlQ2VsbERlZixcbiAgICBOb3ZvU2ltcGxlSGVhZGVyQ2VsbERlZixcbiAgICBOb3ZvU2ltcGxlQ29sdW1uRGVmLFxuICAgIE5vdm9BY3Rpdml0eVRhYmxlRW1wdHlNZXNzYWdlLFxuICAgIE5vdm9BY3Rpdml0eVRhYmxlTm9SZXN1bHRzTWVzc2FnZSxcbiAgICBOb3ZvU2ltcGxlSGVhZGVyUm93RGVmLFxuICAgIE5vdm9TaW1wbGVSb3dEZWYsXG4gICAgTm92b1NpbXBsZUNlbGxIZWFkZXIsXG4gICAgTm92b1NvcnRGaWx0ZXIsXG4gICAgTm92b1NpbXBsZUFjdGlvbkNlbGwsXG4gICAgTm92b1NpbXBsZUVtcHR5SGVhZGVyQ2VsbCxcbiAgICBOb3ZvU2ltcGxlSGVhZGVyQ2VsbCxcbiAgICBOb3ZvU2ltcGxlQ2VsbCxcbiAgICBOb3ZvU2ltcGxlSGVhZGVyUm93LFxuICAgIE5vdm9TaW1wbGVSb3csXG4gICAgTm92b1NpbXBsZUZpbHRlckZvY3VzLFxuICAgIE5vdm9TaW1wbGVUYWJsZVBhZ2luYXRpb24sXG4gICAgTm92b0FjdGl2aXR5VGFibGVDdXN0b21IZWFkZXIsXG4gICAgTm92b1NpbXBsZUNoZWNrYm94Q2VsbCxcbiAgICBOb3ZvU2ltcGxlQ2hlY2tib3hIZWFkZXJDZWxsLFxuICAgIE5vdm9TZWxlY3Rpb24sXG4gICAgTm92b0FjdGl2aXR5VGFibGUsXG4gICAgTm92b0FjdGl2aXR5VGFibGVBY3Rpb25zLFxuICAgIE5vdm9BY3Rpdml0eVRhYmxlQ3VzdG9tRmlsdGVyLFxuICBdLFxuICBwcm92aWRlcnM6IFtOb3ZvQWN0aXZpdHlUYWJsZVN0YXRlXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1NpbXBsZVRhYmxlTW9kdWxlIHt9XG4iXX0=