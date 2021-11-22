import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoButtonModule } from '../button/Button.module';
import { NovoCheckboxModule } from '../checkbox';
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
export class NovoSimpleTableModule {
}
NovoSimpleTableModule.decorators = [
    { type: NgModule, args: [{
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
                    NovoCheckboxModule,
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXRhYmxlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9zaW1wbGUtdGFibGUvc2ltcGxlLXRhYmxlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNqRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixjQUFjLEVBQ2QsaUJBQWlCLEVBQ2pCLHNCQUFzQixFQUN0Qiw0QkFBNEIsRUFDNUIsbUJBQW1CLEVBQ25CLHlCQUF5QixFQUN6QixvQkFBb0IsRUFDcEIsdUJBQXVCLEdBQ3hCLE1BQU0sUUFBUSxDQUFDO0FBQ2hCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLHNCQUFzQixFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNyRyxPQUFPLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUN2RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDakQsT0FBTyxFQUNMLGlCQUFpQixFQUNqQix3QkFBd0IsRUFDeEIsNkJBQTZCLEVBQzdCLDZCQUE2QixFQUM3Qiw2QkFBNkIsRUFDN0IsaUNBQWlDLEVBQ2pDLFNBQVMsR0FDVixNQUFNLFNBQVMsQ0FBQztBQXdFakIsTUFBTSxPQUFPLHFCQUFxQjs7O1lBdEVqQyxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLG9CQUFvQjtvQkFDcEIsY0FBYztvQkFDZCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsZ0JBQWdCO29CQUNoQixrQkFBa0I7b0JBQ2xCLG9CQUFvQjtvQkFDcEIsaUJBQWlCO29CQUNqQixlQUFlO29CQUNmLG1CQUFtQjtvQkFDbkIsa0JBQWtCO2lCQUNuQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsU0FBUztvQkFDVCxpQkFBaUI7b0JBQ2pCLHVCQUF1QjtvQkFDdkIsbUJBQW1CO29CQUNuQiw2QkFBNkI7b0JBQzdCLGlDQUFpQztvQkFDakMsc0JBQXNCO29CQUN0QixnQkFBZ0I7b0JBQ2hCLG9CQUFvQjtvQkFDcEIsY0FBYztvQkFDZCxvQkFBb0I7b0JBQ3BCLHlCQUF5QjtvQkFDekIsb0JBQW9CO29CQUNwQixjQUFjO29CQUNkLG1CQUFtQjtvQkFDbkIsYUFBYTtvQkFDYixxQkFBcUI7b0JBQ3JCLHlCQUF5QjtvQkFDekIsNkJBQTZCO29CQUM3QixzQkFBc0I7b0JBQ3RCLDRCQUE0QjtvQkFDNUIsYUFBYTtvQkFDYixpQkFBaUI7b0JBQ2pCLHdCQUF3QjtvQkFDeEIsNkJBQTZCO2lCQUM5QjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osU0FBUztvQkFDVCxpQkFBaUI7b0JBQ2pCLHVCQUF1QjtvQkFDdkIsbUJBQW1CO29CQUNuQiw2QkFBNkI7b0JBQzdCLGlDQUFpQztvQkFDakMsc0JBQXNCO29CQUN0QixnQkFBZ0I7b0JBQ2hCLG9CQUFvQjtvQkFDcEIsY0FBYztvQkFDZCxvQkFBb0I7b0JBQ3BCLHlCQUF5QjtvQkFDekIsb0JBQW9CO29CQUNwQixjQUFjO29CQUNkLG1CQUFtQjtvQkFDbkIsYUFBYTtvQkFDYixxQkFBcUI7b0JBQ3JCLHlCQUF5QjtvQkFDekIsNkJBQTZCO29CQUM3QixzQkFBc0I7b0JBQ3RCLDRCQUE0QjtvQkFDNUIsYUFBYTtvQkFDYixpQkFBaUI7b0JBQ2pCLHdCQUF3QjtvQkFDeEIsNkJBQTZCO2lCQUM5QjtnQkFDRCxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQzthQUNwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENka1RhYmxlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vYnV0dG9uL0J1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0NoZWNrYm94TW9kdWxlIH0gZnJvbSAnLi4vY2hlY2tib3gnO1xuaW1wb3J0IHsgTm92b0RhdGVQaWNrZXJNb2R1bGUgfSBmcm9tICcuLi9kYXRlLXBpY2tlci9EYXRlUGlja2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvRHJvcGRvd25Nb2R1bGUgfSBmcm9tICcuLi9kcm9wZG93bi9Ecm9wZG93bi5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0Zvcm1FeHRyYXNNb2R1bGUgfSBmcm9tICcuLi9mb3JtL2V4dHJhcy9Gb3JtRXh0cmFzLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvTG9hZGluZ01vZHVsZSB9IGZyb20gJy4uL2xvYWRpbmcvTG9hZGluZy5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1NlYXJjaEJveE1vZHVsZSB9IGZyb20gJy4uL3NlYXJjaC9TZWFyY2hCb3gubW9kdWxlJztcbmltcG9ydCB7IE5vdm9UaWxlc01vZHVsZSB9IGZyb20gJy4uL3RpbGVzL1RpbGVzLm1vZHVsZSc7XG5pbXBvcnQge1xuICBOb3ZvU2ltcGxlQWN0aW9uQ2VsbCxcbiAgTm92b1NpbXBsZUNlbGwsXG4gIE5vdm9TaW1wbGVDZWxsRGVmLFxuICBOb3ZvU2ltcGxlQ2hlY2tib3hDZWxsLFxuICBOb3ZvU2ltcGxlQ2hlY2tib3hIZWFkZXJDZWxsLFxuICBOb3ZvU2ltcGxlQ29sdW1uRGVmLFxuICBOb3ZvU2ltcGxlRW1wdHlIZWFkZXJDZWxsLFxuICBOb3ZvU2ltcGxlSGVhZGVyQ2VsbCxcbiAgTm92b1NpbXBsZUhlYWRlckNlbGxEZWYsXG59IGZyb20gJy4vY2VsbCc7XG5pbXBvcnQgeyBOb3ZvU2ltcGxlQ2VsbEhlYWRlciwgTm92b1NpbXBsZUZpbHRlckZvY3VzIH0gZnJvbSAnLi9jZWxsLWhlYWRlcic7XG5pbXBvcnQgeyBOb3ZvU2ltcGxlVGFibGVQYWdpbmF0aW9uIH0gZnJvbSAnLi9wYWdpbmF0aW9uJztcbmltcG9ydCB7IE5vdm9TaW1wbGVIZWFkZXJSb3csIE5vdm9TaW1wbGVIZWFkZXJSb3dEZWYsIE5vdm9TaW1wbGVSb3csIE5vdm9TaW1wbGVSb3dEZWYgfSBmcm9tICcuL3Jvdyc7XG5pbXBvcnQgeyBOb3ZvU2VsZWN0aW9uLCBOb3ZvU29ydEZpbHRlciB9IGZyb20gJy4vc29ydCc7XG5pbXBvcnQgeyBOb3ZvQWN0aXZpdHlUYWJsZVN0YXRlIH0gZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQge1xuICBOb3ZvQWN0aXZpdHlUYWJsZSxcbiAgTm92b0FjdGl2aXR5VGFibGVBY3Rpb25zLFxuICBOb3ZvQWN0aXZpdHlUYWJsZUN1c3RvbUZpbHRlcixcbiAgTm92b0FjdGl2aXR5VGFibGVDdXN0b21IZWFkZXIsXG4gIE5vdm9BY3Rpdml0eVRhYmxlRW1wdHlNZXNzYWdlLFxuICBOb3ZvQWN0aXZpdHlUYWJsZU5vUmVzdWx0c01lc3NhZ2UsXG4gIE5vdm9UYWJsZSxcbn0gZnJvbSAnLi90YWJsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBOb3ZvRGF0ZVBpY2tlck1vZHVsZSxcbiAgICBDZGtUYWJsZU1vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTm92b0J1dHRvbk1vZHVsZSxcbiAgICBOb3ZvRHJvcGRvd25Nb2R1bGUsXG4gICAgTm92b0Zvcm1FeHRyYXNNb2R1bGUsXG4gICAgTm92b0xvYWRpbmdNb2R1bGUsXG4gICAgTm92b1RpbGVzTW9kdWxlLFxuICAgIE5vdm9TZWFyY2hCb3hNb2R1bGUsXG4gICAgTm92b0NoZWNrYm94TW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTm92b1RhYmxlLFxuICAgIE5vdm9TaW1wbGVDZWxsRGVmLFxuICAgIE5vdm9TaW1wbGVIZWFkZXJDZWxsRGVmLFxuICAgIE5vdm9TaW1wbGVDb2x1bW5EZWYsXG4gICAgTm92b0FjdGl2aXR5VGFibGVFbXB0eU1lc3NhZ2UsXG4gICAgTm92b0FjdGl2aXR5VGFibGVOb1Jlc3VsdHNNZXNzYWdlLFxuICAgIE5vdm9TaW1wbGVIZWFkZXJSb3dEZWYsXG4gICAgTm92b1NpbXBsZVJvd0RlZixcbiAgICBOb3ZvU2ltcGxlQ2VsbEhlYWRlcixcbiAgICBOb3ZvU29ydEZpbHRlcixcbiAgICBOb3ZvU2ltcGxlQWN0aW9uQ2VsbCxcbiAgICBOb3ZvU2ltcGxlRW1wdHlIZWFkZXJDZWxsLFxuICAgIE5vdm9TaW1wbGVIZWFkZXJDZWxsLFxuICAgIE5vdm9TaW1wbGVDZWxsLFxuICAgIE5vdm9TaW1wbGVIZWFkZXJSb3csXG4gICAgTm92b1NpbXBsZVJvdyxcbiAgICBOb3ZvU2ltcGxlRmlsdGVyRm9jdXMsXG4gICAgTm92b1NpbXBsZVRhYmxlUGFnaW5hdGlvbixcbiAgICBOb3ZvQWN0aXZpdHlUYWJsZUN1c3RvbUhlYWRlcixcbiAgICBOb3ZvU2ltcGxlQ2hlY2tib3hDZWxsLFxuICAgIE5vdm9TaW1wbGVDaGVja2JveEhlYWRlckNlbGwsXG4gICAgTm92b1NlbGVjdGlvbixcbiAgICBOb3ZvQWN0aXZpdHlUYWJsZSxcbiAgICBOb3ZvQWN0aXZpdHlUYWJsZUFjdGlvbnMsXG4gICAgTm92b0FjdGl2aXR5VGFibGVDdXN0b21GaWx0ZXIsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5vdm9UYWJsZSxcbiAgICBOb3ZvU2ltcGxlQ2VsbERlZixcbiAgICBOb3ZvU2ltcGxlSGVhZGVyQ2VsbERlZixcbiAgICBOb3ZvU2ltcGxlQ29sdW1uRGVmLFxuICAgIE5vdm9BY3Rpdml0eVRhYmxlRW1wdHlNZXNzYWdlLFxuICAgIE5vdm9BY3Rpdml0eVRhYmxlTm9SZXN1bHRzTWVzc2FnZSxcbiAgICBOb3ZvU2ltcGxlSGVhZGVyUm93RGVmLFxuICAgIE5vdm9TaW1wbGVSb3dEZWYsXG4gICAgTm92b1NpbXBsZUNlbGxIZWFkZXIsXG4gICAgTm92b1NvcnRGaWx0ZXIsXG4gICAgTm92b1NpbXBsZUFjdGlvbkNlbGwsXG4gICAgTm92b1NpbXBsZUVtcHR5SGVhZGVyQ2VsbCxcbiAgICBOb3ZvU2ltcGxlSGVhZGVyQ2VsbCxcbiAgICBOb3ZvU2ltcGxlQ2VsbCxcbiAgICBOb3ZvU2ltcGxlSGVhZGVyUm93LFxuICAgIE5vdm9TaW1wbGVSb3csXG4gICAgTm92b1NpbXBsZUZpbHRlckZvY3VzLFxuICAgIE5vdm9TaW1wbGVUYWJsZVBhZ2luYXRpb24sXG4gICAgTm92b0FjdGl2aXR5VGFibGVDdXN0b21IZWFkZXIsXG4gICAgTm92b1NpbXBsZUNoZWNrYm94Q2VsbCxcbiAgICBOb3ZvU2ltcGxlQ2hlY2tib3hIZWFkZXJDZWxsLFxuICAgIE5vdm9TZWxlY3Rpb24sXG4gICAgTm92b0FjdGl2aXR5VGFibGUsXG4gICAgTm92b0FjdGl2aXR5VGFibGVBY3Rpb25zLFxuICAgIE5vdm9BY3Rpdml0eVRhYmxlQ3VzdG9tRmlsdGVyLFxuICBdLFxuICBwcm92aWRlcnM6IFtOb3ZvQWN0aXZpdHlUYWJsZVN0YXRlXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1NpbXBsZVRhYmxlTW9kdWxlIHt9XG4iXX0=