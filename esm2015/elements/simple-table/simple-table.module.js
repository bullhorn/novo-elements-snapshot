import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { NovoButtonModule } from '../button/Button.module';
import { NovoDropdownModule } from '../dropdown/Dropdown.module';
import { NovoFormExtrasModule } from '../form/extras/FormExtras.module';
import { NovoLoadingModule } from '../loading/Loading.module';
import { NovoTilesModule } from '../tiles/Tiles.module';
import { NovoSearchBoxModule } from '../search/SearchBox.module';
import { NovoDatePickerModule } from '../date-picker/DatePicker.module';
import { NovoTable, NovoActivityTable, NovoActivityTableActions, NovoActivityTableCustomFilter, NovoActivityTableEmptyMessage, NovoActivityTableNoResultsMessage, NovoActivityTableCustomHeader, } from './table';
import { NovoSimpleCell, NovoSimpleCheckboxCell, NovoSimpleCheckboxHeaderCell, NovoSimpleHeaderCell, NovoSimpleCellDef, NovoSimpleHeaderCellDef, NovoSimpleColumnDef, NovoSimpleActionCell, NovoSimpleEmptyHeaderCell, } from './cell';
import { NovoSimpleHeaderRow, NovoSimpleRow, NovoSimpleHeaderRowDef, NovoSimpleRowDef } from './row';
import { NovoSimpleCellHeader, NovoSimpleFilterFocus } from './cell-header';
import { NovoSortFilter, NovoSelection } from './sort';
import { NovoSimpleTablePagination } from './pagination';
import { NovoActivityTableState } from './state';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXRhYmxlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvc2ltcGxlLXRhYmxlL3NpbXBsZS10YWJsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVwRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDakUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFeEUsT0FBTyxFQUNMLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsd0JBQXdCLEVBQ3hCLDZCQUE2QixFQUM3Qiw2QkFBNkIsRUFDN0IsaUNBQWlDLEVBQ2pDLDZCQUE2QixHQUM5QixNQUFNLFNBQVMsQ0FBQztBQUNqQixPQUFPLEVBQ0wsY0FBYyxFQUNkLHNCQUFzQixFQUN0Qiw0QkFBNEIsRUFDNUIsb0JBQW9CLEVBQ3BCLGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsbUJBQW1CLEVBQ25CLG9CQUFvQixFQUNwQix5QkFBeUIsR0FDMUIsTUFBTSxRQUFRLENBQUM7QUFDaEIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLGFBQWEsRUFBRSxzQkFBc0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNyRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDdkQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3pELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQXVFakQsTUFBTSxPQUFPLHFCQUFxQjs7O1lBckVqQyxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLG9CQUFvQjtvQkFDcEIsY0FBYztvQkFDZCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsZ0JBQWdCO29CQUNoQixrQkFBa0I7b0JBQ2xCLG9CQUFvQjtvQkFDcEIsaUJBQWlCO29CQUNqQixlQUFlO29CQUNmLG1CQUFtQjtpQkFDcEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFNBQVM7b0JBQ1QsaUJBQWlCO29CQUNqQix1QkFBdUI7b0JBQ3ZCLG1CQUFtQjtvQkFDbkIsNkJBQTZCO29CQUM3QixpQ0FBaUM7b0JBQ2pDLHNCQUFzQjtvQkFDdEIsZ0JBQWdCO29CQUNoQixvQkFBb0I7b0JBQ3BCLGNBQWM7b0JBQ2Qsb0JBQW9CO29CQUNwQix5QkFBeUI7b0JBQ3pCLG9CQUFvQjtvQkFDcEIsY0FBYztvQkFDZCxtQkFBbUI7b0JBQ25CLGFBQWE7b0JBQ2IscUJBQXFCO29CQUNyQix5QkFBeUI7b0JBQ3pCLDZCQUE2QjtvQkFDN0Isc0JBQXNCO29CQUN0Qiw0QkFBNEI7b0JBQzVCLGFBQWE7b0JBQ2IsaUJBQWlCO29CQUNqQix3QkFBd0I7b0JBQ3hCLDZCQUE2QjtpQkFDOUI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLFNBQVM7b0JBQ1QsaUJBQWlCO29CQUNqQix1QkFBdUI7b0JBQ3ZCLG1CQUFtQjtvQkFDbkIsNkJBQTZCO29CQUM3QixpQ0FBaUM7b0JBQ2pDLHNCQUFzQjtvQkFDdEIsZ0JBQWdCO29CQUNoQixvQkFBb0I7b0JBQ3BCLGNBQWM7b0JBQ2Qsb0JBQW9CO29CQUNwQix5QkFBeUI7b0JBQ3pCLG9CQUFvQjtvQkFDcEIsY0FBYztvQkFDZCxtQkFBbUI7b0JBQ25CLGFBQWE7b0JBQ2IscUJBQXFCO29CQUNyQix5QkFBeUI7b0JBQ3pCLDZCQUE2QjtvQkFDN0Isc0JBQXNCO29CQUN0Qiw0QkFBNEI7b0JBQzVCLGFBQWE7b0JBQ2IsaUJBQWlCO29CQUNqQix3QkFBd0I7b0JBQ3hCLDZCQUE2QjtpQkFDOUI7Z0JBQ0QsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7YUFDcEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQ2RrVGFibGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xyXG5cclxuaW1wb3J0IHsgTm92b0J1dHRvbk1vZHVsZSB9IGZyb20gJy4uL2J1dHRvbi9CdXR0b24ubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b0Ryb3Bkb3duTW9kdWxlIH0gZnJvbSAnLi4vZHJvcGRvd24vRHJvcGRvd24ubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b0Zvcm1FeHRyYXNNb2R1bGUgfSBmcm9tICcuLi9mb3JtL2V4dHJhcy9Gb3JtRXh0cmFzLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9Mb2FkaW5nTW9kdWxlIH0gZnJvbSAnLi4vbG9hZGluZy9Mb2FkaW5nLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9UaWxlc01vZHVsZSB9IGZyb20gJy4uL3RpbGVzL1RpbGVzLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9TZWFyY2hCb3hNb2R1bGUgfSBmcm9tICcuLi9zZWFyY2gvU2VhcmNoQm94Lm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9EYXRlUGlja2VyTW9kdWxlIH0gZnJvbSAnLi4vZGF0ZS1waWNrZXIvRGF0ZVBpY2tlci5tb2R1bGUnO1xyXG5cclxuaW1wb3J0IHtcclxuICBOb3ZvVGFibGUsXHJcbiAgTm92b0FjdGl2aXR5VGFibGUsXHJcbiAgTm92b0FjdGl2aXR5VGFibGVBY3Rpb25zLFxyXG4gIE5vdm9BY3Rpdml0eVRhYmxlQ3VzdG9tRmlsdGVyLFxyXG4gIE5vdm9BY3Rpdml0eVRhYmxlRW1wdHlNZXNzYWdlLFxyXG4gIE5vdm9BY3Rpdml0eVRhYmxlTm9SZXN1bHRzTWVzc2FnZSxcclxuICBOb3ZvQWN0aXZpdHlUYWJsZUN1c3RvbUhlYWRlcixcclxufSBmcm9tICcuL3RhYmxlJztcclxuaW1wb3J0IHtcclxuICBOb3ZvU2ltcGxlQ2VsbCxcclxuICBOb3ZvU2ltcGxlQ2hlY2tib3hDZWxsLFxyXG4gIE5vdm9TaW1wbGVDaGVja2JveEhlYWRlckNlbGwsXHJcbiAgTm92b1NpbXBsZUhlYWRlckNlbGwsXHJcbiAgTm92b1NpbXBsZUNlbGxEZWYsXHJcbiAgTm92b1NpbXBsZUhlYWRlckNlbGxEZWYsXHJcbiAgTm92b1NpbXBsZUNvbHVtbkRlZixcclxuICBOb3ZvU2ltcGxlQWN0aW9uQ2VsbCxcclxuICBOb3ZvU2ltcGxlRW1wdHlIZWFkZXJDZWxsLFxyXG59IGZyb20gJy4vY2VsbCc7XHJcbmltcG9ydCB7IE5vdm9TaW1wbGVIZWFkZXJSb3csIE5vdm9TaW1wbGVSb3csIE5vdm9TaW1wbGVIZWFkZXJSb3dEZWYsIE5vdm9TaW1wbGVSb3dEZWYgfSBmcm9tICcuL3Jvdyc7XHJcbmltcG9ydCB7IE5vdm9TaW1wbGVDZWxsSGVhZGVyLCBOb3ZvU2ltcGxlRmlsdGVyRm9jdXMgfSBmcm9tICcuL2NlbGwtaGVhZGVyJztcclxuaW1wb3J0IHsgTm92b1NvcnRGaWx0ZXIsIE5vdm9TZWxlY3Rpb24gfSBmcm9tICcuL3NvcnQnO1xyXG5pbXBvcnQgeyBOb3ZvU2ltcGxlVGFibGVQYWdpbmF0aW9uIH0gZnJvbSAnLi9wYWdpbmF0aW9uJztcclxuaW1wb3J0IHsgTm92b0FjdGl2aXR5VGFibGVTdGF0ZSB9IGZyb20gJy4vc3RhdGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBOb3ZvRGF0ZVBpY2tlck1vZHVsZSxcclxuICAgIENka1RhYmxlTW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBOb3ZvQnV0dG9uTW9kdWxlLFxyXG4gICAgTm92b0Ryb3Bkb3duTW9kdWxlLFxyXG4gICAgTm92b0Zvcm1FeHRyYXNNb2R1bGUsXHJcbiAgICBOb3ZvTG9hZGluZ01vZHVsZSxcclxuICAgIE5vdm9UaWxlc01vZHVsZSxcclxuICAgIE5vdm9TZWFyY2hCb3hNb2R1bGUsXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBOb3ZvVGFibGUsXHJcbiAgICBOb3ZvU2ltcGxlQ2VsbERlZixcclxuICAgIE5vdm9TaW1wbGVIZWFkZXJDZWxsRGVmLFxyXG4gICAgTm92b1NpbXBsZUNvbHVtbkRlZixcclxuICAgIE5vdm9BY3Rpdml0eVRhYmxlRW1wdHlNZXNzYWdlLFxyXG4gICAgTm92b0FjdGl2aXR5VGFibGVOb1Jlc3VsdHNNZXNzYWdlLFxyXG4gICAgTm92b1NpbXBsZUhlYWRlclJvd0RlZixcclxuICAgIE5vdm9TaW1wbGVSb3dEZWYsXHJcbiAgICBOb3ZvU2ltcGxlQ2VsbEhlYWRlcixcclxuICAgIE5vdm9Tb3J0RmlsdGVyLFxyXG4gICAgTm92b1NpbXBsZUFjdGlvbkNlbGwsXHJcbiAgICBOb3ZvU2ltcGxlRW1wdHlIZWFkZXJDZWxsLFxyXG4gICAgTm92b1NpbXBsZUhlYWRlckNlbGwsXHJcbiAgICBOb3ZvU2ltcGxlQ2VsbCxcclxuICAgIE5vdm9TaW1wbGVIZWFkZXJSb3csXHJcbiAgICBOb3ZvU2ltcGxlUm93LFxyXG4gICAgTm92b1NpbXBsZUZpbHRlckZvY3VzLFxyXG4gICAgTm92b1NpbXBsZVRhYmxlUGFnaW5hdGlvbixcclxuICAgIE5vdm9BY3Rpdml0eVRhYmxlQ3VzdG9tSGVhZGVyLFxyXG4gICAgTm92b1NpbXBsZUNoZWNrYm94Q2VsbCxcclxuICAgIE5vdm9TaW1wbGVDaGVja2JveEhlYWRlckNlbGwsXHJcbiAgICBOb3ZvU2VsZWN0aW9uLFxyXG4gICAgTm92b0FjdGl2aXR5VGFibGUsXHJcbiAgICBOb3ZvQWN0aXZpdHlUYWJsZUFjdGlvbnMsXHJcbiAgICBOb3ZvQWN0aXZpdHlUYWJsZUN1c3RvbUZpbHRlcixcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgTm92b1RhYmxlLFxyXG4gICAgTm92b1NpbXBsZUNlbGxEZWYsXHJcbiAgICBOb3ZvU2ltcGxlSGVhZGVyQ2VsbERlZixcclxuICAgIE5vdm9TaW1wbGVDb2x1bW5EZWYsXHJcbiAgICBOb3ZvQWN0aXZpdHlUYWJsZUVtcHR5TWVzc2FnZSxcclxuICAgIE5vdm9BY3Rpdml0eVRhYmxlTm9SZXN1bHRzTWVzc2FnZSxcclxuICAgIE5vdm9TaW1wbGVIZWFkZXJSb3dEZWYsXHJcbiAgICBOb3ZvU2ltcGxlUm93RGVmLFxyXG4gICAgTm92b1NpbXBsZUNlbGxIZWFkZXIsXHJcbiAgICBOb3ZvU29ydEZpbHRlcixcclxuICAgIE5vdm9TaW1wbGVBY3Rpb25DZWxsLFxyXG4gICAgTm92b1NpbXBsZUVtcHR5SGVhZGVyQ2VsbCxcclxuICAgIE5vdm9TaW1wbGVIZWFkZXJDZWxsLFxyXG4gICAgTm92b1NpbXBsZUNlbGwsXHJcbiAgICBOb3ZvU2ltcGxlSGVhZGVyUm93LFxyXG4gICAgTm92b1NpbXBsZVJvdyxcclxuICAgIE5vdm9TaW1wbGVGaWx0ZXJGb2N1cyxcclxuICAgIE5vdm9TaW1wbGVUYWJsZVBhZ2luYXRpb24sXHJcbiAgICBOb3ZvQWN0aXZpdHlUYWJsZUN1c3RvbUhlYWRlcixcclxuICAgIE5vdm9TaW1wbGVDaGVja2JveENlbGwsXHJcbiAgICBOb3ZvU2ltcGxlQ2hlY2tib3hIZWFkZXJDZWxsLFxyXG4gICAgTm92b1NlbGVjdGlvbixcclxuICAgIE5vdm9BY3Rpdml0eVRhYmxlLFxyXG4gICAgTm92b0FjdGl2aXR5VGFibGVBY3Rpb25zLFxyXG4gICAgTm92b0FjdGl2aXR5VGFibGVDdXN0b21GaWx0ZXIsXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtOb3ZvQWN0aXZpdHlUYWJsZVN0YXRlXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9TaW1wbGVUYWJsZU1vZHVsZSB7fVxyXG4iXX0=