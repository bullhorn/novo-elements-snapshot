import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoButtonModule } from '../button/Button.module';
import { NovoCheckboxModule } from '../checkbox';
import { NovoCommonModule, NovoOptionModule } from '../common';
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
NovoSimpleTableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoSimpleTableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoSimpleTableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoSimpleTableModule, declarations: [NovoTable,
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
        NovoActivityTableCustomFilter] });
NovoSimpleTableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoSimpleTableModule, providers: [NovoActivityTableState], imports: [[
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoSimpleTableModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXRhYmxlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3NpbXBsZS10YWJsZS9zaW1wbGUtdGFibGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUMvRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixjQUFjLEVBQ2QsaUJBQWlCLEVBQ2pCLHNCQUFzQixFQUN0Qiw0QkFBNEIsRUFDNUIsbUJBQW1CLEVBQ25CLHlCQUF5QixFQUN6QixvQkFBb0IsRUFDcEIsdUJBQXVCLEdBQ3hCLE1BQU0sUUFBUSxDQUFDO0FBQ2hCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLHNCQUFzQixFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNyRyxPQUFPLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUN2RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDakQsT0FBTyxFQUNMLGlCQUFpQixFQUNqQix3QkFBd0IsRUFDeEIsNkJBQTZCLEVBQzdCLDZCQUE2QixFQUM3Qiw2QkFBNkIsRUFDN0IsaUNBQWlDLEVBQ2pDLFNBQVMsR0FDVixNQUFNLFNBQVMsQ0FBQzs7QUEwRWpCLE1BQU0sT0FBTyxxQkFBcUI7O2tIQUFyQixxQkFBcUI7bUhBQXJCLHFCQUFxQixpQkE1QjlCLFNBQVM7UUFDVCxpQkFBaUI7UUFDakIsdUJBQXVCO1FBQ3ZCLG1CQUFtQjtRQUNuQiw2QkFBNkI7UUFDN0IsaUNBQWlDO1FBQ2pDLHNCQUFzQjtRQUN0QixnQkFBZ0I7UUFDaEIsb0JBQW9CO1FBQ3BCLGNBQWM7UUFDZCxvQkFBb0I7UUFDcEIseUJBQXlCO1FBQ3pCLG9CQUFvQjtRQUNwQixjQUFjO1FBQ2QsbUJBQW1CO1FBQ25CLGFBQWE7UUFDYixxQkFBcUI7UUFDckIseUJBQXlCO1FBQ3pCLDZCQUE2QjtRQUM3QixzQkFBc0I7UUFDdEIsNEJBQTRCO1FBQzVCLGFBQWE7UUFDYixpQkFBaUI7UUFDakIsd0JBQXdCO1FBQ3hCLDZCQUE2QixhQWxFN0Isb0JBQW9CO1FBQ3BCLGNBQWM7UUFDZCxZQUFZO1FBQ1osV0FBVztRQUNYLGdCQUFnQjtRQUNoQixnQkFBZ0I7UUFDaEIsa0JBQWtCO1FBQ2xCLG9CQUFvQjtRQUNwQixpQkFBaUI7UUFDakIsZUFBZTtRQUNmLG1CQUFtQjtRQUNuQixrQkFBa0I7UUFDbEIsZ0JBQWdCLGFBR2hCLFNBQVM7UUFDVCxpQkFBaUI7UUFDakIsdUJBQXVCO1FBQ3ZCLG1CQUFtQjtRQUNuQiw2QkFBNkI7UUFDN0IsaUNBQWlDO1FBQ2pDLHNCQUFzQjtRQUN0QixnQkFBZ0I7UUFDaEIsb0JBQW9CO1FBQ3BCLGNBQWM7UUFDZCxvQkFBb0I7UUFDcEIseUJBQXlCO1FBQ3pCLG9CQUFvQjtRQUNwQixjQUFjO1FBQ2QsbUJBQW1CO1FBQ25CLGFBQWE7UUFDYixxQkFBcUI7UUFDckIseUJBQXlCO1FBQ3pCLDZCQUE2QjtRQUM3QixzQkFBc0I7UUFDdEIsNEJBQTRCO1FBQzVCLGFBQWE7UUFDYixpQkFBaUI7UUFDakIsd0JBQXdCO1FBQ3hCLDZCQUE2QjttSEErQnBCLHFCQUFxQixhQUZyQixDQUFDLHNCQUFzQixDQUFDLFlBckUxQjtZQUNQLG9CQUFvQjtZQUNwQixjQUFjO1lBQ2QsWUFBWTtZQUNaLFdBQVc7WUFDWCxnQkFBZ0I7WUFDaEIsZ0JBQWdCO1lBQ2hCLGtCQUFrQjtZQUNsQixvQkFBb0I7WUFDcEIsaUJBQWlCO1lBQ2pCLGVBQWU7WUFDZixtQkFBbUI7WUFDbkIsa0JBQWtCO1lBQ2xCLGdCQUFnQjtTQUNqQjsyRkF5RFUscUJBQXFCO2tCQXhFakMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1Asb0JBQW9CO3dCQUNwQixjQUFjO3dCQUNkLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxnQkFBZ0I7d0JBQ2hCLGdCQUFnQjt3QkFDaEIsa0JBQWtCO3dCQUNsQixvQkFBb0I7d0JBQ3BCLGlCQUFpQjt3QkFDakIsZUFBZTt3QkFDZixtQkFBbUI7d0JBQ25CLGtCQUFrQjt3QkFDbEIsZ0JBQWdCO3FCQUNqQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsU0FBUzt3QkFDVCxpQkFBaUI7d0JBQ2pCLHVCQUF1Qjt3QkFDdkIsbUJBQW1CO3dCQUNuQiw2QkFBNkI7d0JBQzdCLGlDQUFpQzt3QkFDakMsc0JBQXNCO3dCQUN0QixnQkFBZ0I7d0JBQ2hCLG9CQUFvQjt3QkFDcEIsY0FBYzt3QkFDZCxvQkFBb0I7d0JBQ3BCLHlCQUF5Qjt3QkFDekIsb0JBQW9CO3dCQUNwQixjQUFjO3dCQUNkLG1CQUFtQjt3QkFDbkIsYUFBYTt3QkFDYixxQkFBcUI7d0JBQ3JCLHlCQUF5Qjt3QkFDekIsNkJBQTZCO3dCQUM3QixzQkFBc0I7d0JBQ3RCLDRCQUE0Qjt3QkFDNUIsYUFBYTt3QkFDYixpQkFBaUI7d0JBQ2pCLHdCQUF3Qjt3QkFDeEIsNkJBQTZCO3FCQUM5QjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osU0FBUzt3QkFDVCxpQkFBaUI7d0JBQ2pCLHVCQUF1Qjt3QkFDdkIsbUJBQW1CO3dCQUNuQiw2QkFBNkI7d0JBQzdCLGlDQUFpQzt3QkFDakMsc0JBQXNCO3dCQUN0QixnQkFBZ0I7d0JBQ2hCLG9CQUFvQjt3QkFDcEIsY0FBYzt3QkFDZCxvQkFBb0I7d0JBQ3BCLHlCQUF5Qjt3QkFDekIsb0JBQW9CO3dCQUNwQixjQUFjO3dCQUNkLG1CQUFtQjt3QkFDbkIsYUFBYTt3QkFDYixxQkFBcUI7d0JBQ3JCLHlCQUF5Qjt3QkFDekIsNkJBQTZCO3dCQUM3QixzQkFBc0I7d0JBQ3RCLDRCQUE0Qjt3QkFDNUIsYUFBYTt3QkFDYixpQkFBaUI7d0JBQ2pCLHdCQUF3Qjt3QkFDeEIsNkJBQTZCO3FCQUM5QjtvQkFDRCxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztpQkFDcEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZGtUYWJsZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTm92b0J1dHRvbk1vZHVsZSB9IGZyb20gJy4uL2J1dHRvbi9CdXR0b24ubW9kdWxlJztcbmltcG9ydCB7IE5vdm9DaGVja2JveE1vZHVsZSB9IGZyb20gJy4uL2NoZWNrYm94JztcbmltcG9ydCB7IE5vdm9Db21tb25Nb2R1bGUsIE5vdm9PcHRpb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IHsgTm92b0RhdGVQaWNrZXJNb2R1bGUgfSBmcm9tICcuLi9kYXRlLXBpY2tlci9EYXRlUGlja2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvRHJvcGRvd25Nb2R1bGUgfSBmcm9tICcuLi9kcm9wZG93bi9Ecm9wZG93bi5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0Zvcm1FeHRyYXNNb2R1bGUgfSBmcm9tICcuLi9mb3JtL2V4dHJhcy9Gb3JtRXh0cmFzLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvTG9hZGluZ01vZHVsZSB9IGZyb20gJy4uL2xvYWRpbmcvTG9hZGluZy5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1NlYXJjaEJveE1vZHVsZSB9IGZyb20gJy4uL3NlYXJjaC9TZWFyY2hCb3gubW9kdWxlJztcbmltcG9ydCB7IE5vdm9UaWxlc01vZHVsZSB9IGZyb20gJy4uL3RpbGVzL1RpbGVzLm1vZHVsZSc7XG5pbXBvcnQge1xuICBOb3ZvU2ltcGxlQWN0aW9uQ2VsbCxcbiAgTm92b1NpbXBsZUNlbGwsXG4gIE5vdm9TaW1wbGVDZWxsRGVmLFxuICBOb3ZvU2ltcGxlQ2hlY2tib3hDZWxsLFxuICBOb3ZvU2ltcGxlQ2hlY2tib3hIZWFkZXJDZWxsLFxuICBOb3ZvU2ltcGxlQ29sdW1uRGVmLFxuICBOb3ZvU2ltcGxlRW1wdHlIZWFkZXJDZWxsLFxuICBOb3ZvU2ltcGxlSGVhZGVyQ2VsbCxcbiAgTm92b1NpbXBsZUhlYWRlckNlbGxEZWYsXG59IGZyb20gJy4vY2VsbCc7XG5pbXBvcnQgeyBOb3ZvU2ltcGxlQ2VsbEhlYWRlciwgTm92b1NpbXBsZUZpbHRlckZvY3VzIH0gZnJvbSAnLi9jZWxsLWhlYWRlcic7XG5pbXBvcnQgeyBOb3ZvU2ltcGxlVGFibGVQYWdpbmF0aW9uIH0gZnJvbSAnLi9wYWdpbmF0aW9uJztcbmltcG9ydCB7IE5vdm9TaW1wbGVIZWFkZXJSb3csIE5vdm9TaW1wbGVIZWFkZXJSb3dEZWYsIE5vdm9TaW1wbGVSb3csIE5vdm9TaW1wbGVSb3dEZWYgfSBmcm9tICcuL3Jvdyc7XG5pbXBvcnQgeyBOb3ZvU2VsZWN0aW9uLCBOb3ZvU29ydEZpbHRlciB9IGZyb20gJy4vc29ydCc7XG5pbXBvcnQgeyBOb3ZvQWN0aXZpdHlUYWJsZVN0YXRlIH0gZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQge1xuICBOb3ZvQWN0aXZpdHlUYWJsZSxcbiAgTm92b0FjdGl2aXR5VGFibGVBY3Rpb25zLFxuICBOb3ZvQWN0aXZpdHlUYWJsZUN1c3RvbUZpbHRlcixcbiAgTm92b0FjdGl2aXR5VGFibGVDdXN0b21IZWFkZXIsXG4gIE5vdm9BY3Rpdml0eVRhYmxlRW1wdHlNZXNzYWdlLFxuICBOb3ZvQWN0aXZpdHlUYWJsZU5vUmVzdWx0c01lc3NhZ2UsXG4gIE5vdm9UYWJsZSxcbn0gZnJvbSAnLi90YWJsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBOb3ZvRGF0ZVBpY2tlck1vZHVsZSxcbiAgICBDZGtUYWJsZU1vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTm92b0NvbW1vbk1vZHVsZSxcbiAgICBOb3ZvQnV0dG9uTW9kdWxlLFxuICAgIE5vdm9Ecm9wZG93bk1vZHVsZSxcbiAgICBOb3ZvRm9ybUV4dHJhc01vZHVsZSxcbiAgICBOb3ZvTG9hZGluZ01vZHVsZSxcbiAgICBOb3ZvVGlsZXNNb2R1bGUsXG4gICAgTm92b1NlYXJjaEJveE1vZHVsZSxcbiAgICBOb3ZvQ2hlY2tib3hNb2R1bGUsXG4gICAgTm92b09wdGlvbk1vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE5vdm9UYWJsZSxcbiAgICBOb3ZvU2ltcGxlQ2VsbERlZixcbiAgICBOb3ZvU2ltcGxlSGVhZGVyQ2VsbERlZixcbiAgICBOb3ZvU2ltcGxlQ29sdW1uRGVmLFxuICAgIE5vdm9BY3Rpdml0eVRhYmxlRW1wdHlNZXNzYWdlLFxuICAgIE5vdm9BY3Rpdml0eVRhYmxlTm9SZXN1bHRzTWVzc2FnZSxcbiAgICBOb3ZvU2ltcGxlSGVhZGVyUm93RGVmLFxuICAgIE5vdm9TaW1wbGVSb3dEZWYsXG4gICAgTm92b1NpbXBsZUNlbGxIZWFkZXIsXG4gICAgTm92b1NvcnRGaWx0ZXIsXG4gICAgTm92b1NpbXBsZUFjdGlvbkNlbGwsXG4gICAgTm92b1NpbXBsZUVtcHR5SGVhZGVyQ2VsbCxcbiAgICBOb3ZvU2ltcGxlSGVhZGVyQ2VsbCxcbiAgICBOb3ZvU2ltcGxlQ2VsbCxcbiAgICBOb3ZvU2ltcGxlSGVhZGVyUm93LFxuICAgIE5vdm9TaW1wbGVSb3csXG4gICAgTm92b1NpbXBsZUZpbHRlckZvY3VzLFxuICAgIE5vdm9TaW1wbGVUYWJsZVBhZ2luYXRpb24sXG4gICAgTm92b0FjdGl2aXR5VGFibGVDdXN0b21IZWFkZXIsXG4gICAgTm92b1NpbXBsZUNoZWNrYm94Q2VsbCxcbiAgICBOb3ZvU2ltcGxlQ2hlY2tib3hIZWFkZXJDZWxsLFxuICAgIE5vdm9TZWxlY3Rpb24sXG4gICAgTm92b0FjdGl2aXR5VGFibGUsXG4gICAgTm92b0FjdGl2aXR5VGFibGVBY3Rpb25zLFxuICAgIE5vdm9BY3Rpdml0eVRhYmxlQ3VzdG9tRmlsdGVyLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOb3ZvVGFibGUsXG4gICAgTm92b1NpbXBsZUNlbGxEZWYsXG4gICAgTm92b1NpbXBsZUhlYWRlckNlbGxEZWYsXG4gICAgTm92b1NpbXBsZUNvbHVtbkRlZixcbiAgICBOb3ZvQWN0aXZpdHlUYWJsZUVtcHR5TWVzc2FnZSxcbiAgICBOb3ZvQWN0aXZpdHlUYWJsZU5vUmVzdWx0c01lc3NhZ2UsXG4gICAgTm92b1NpbXBsZUhlYWRlclJvd0RlZixcbiAgICBOb3ZvU2ltcGxlUm93RGVmLFxuICAgIE5vdm9TaW1wbGVDZWxsSGVhZGVyLFxuICAgIE5vdm9Tb3J0RmlsdGVyLFxuICAgIE5vdm9TaW1wbGVBY3Rpb25DZWxsLFxuICAgIE5vdm9TaW1wbGVFbXB0eUhlYWRlckNlbGwsXG4gICAgTm92b1NpbXBsZUhlYWRlckNlbGwsXG4gICAgTm92b1NpbXBsZUNlbGwsXG4gICAgTm92b1NpbXBsZUhlYWRlclJvdyxcbiAgICBOb3ZvU2ltcGxlUm93LFxuICAgIE5vdm9TaW1wbGVGaWx0ZXJGb2N1cyxcbiAgICBOb3ZvU2ltcGxlVGFibGVQYWdpbmF0aW9uLFxuICAgIE5vdm9BY3Rpdml0eVRhYmxlQ3VzdG9tSGVhZGVyLFxuICAgIE5vdm9TaW1wbGVDaGVja2JveENlbGwsXG4gICAgTm92b1NpbXBsZUNoZWNrYm94SGVhZGVyQ2VsbCxcbiAgICBOb3ZvU2VsZWN0aW9uLFxuICAgIE5vdm9BY3Rpdml0eVRhYmxlLFxuICAgIE5vdm9BY3Rpdml0eVRhYmxlQWN0aW9ucyxcbiAgICBOb3ZvQWN0aXZpdHlUYWJsZUN1c3RvbUZpbHRlcixcbiAgXSxcbiAgcHJvdmlkZXJzOiBbTm92b0FjdGl2aXR5VGFibGVTdGF0ZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TaW1wbGVUYWJsZU1vZHVsZSB7fVxuIl19