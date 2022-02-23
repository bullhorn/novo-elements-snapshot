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
export class NovoSimpleTableModule {
}
NovoSimpleTableModule.decorators = [
    { type: NgModule, args: [{
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXRhYmxlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9zaW1wbGUtdGFibGUvc2ltcGxlLXRhYmxlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDL0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDakUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDOUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDakUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3hELE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsY0FBYyxFQUNkLGlCQUFpQixFQUNqQixzQkFBc0IsRUFDdEIsNEJBQTRCLEVBQzVCLG1CQUFtQixFQUNuQix5QkFBeUIsRUFDekIsb0JBQW9CLEVBQ3BCLHVCQUF1QixHQUN4QixNQUFNLFFBQVEsQ0FBQztBQUNoQixPQUFPLEVBQUUsb0JBQW9CLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3pELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxzQkFBc0IsRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDckcsT0FBTyxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDdkQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2pELE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsd0JBQXdCLEVBQ3hCLDZCQUE2QixFQUM3Qiw2QkFBNkIsRUFDN0IsNkJBQTZCLEVBQzdCLGlDQUFpQyxFQUNqQyxTQUFTLEdBQ1YsTUFBTSxTQUFTLENBQUM7QUEwRWpCLE1BQU0sT0FBTyxxQkFBcUI7OztZQXhFakMsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxvQkFBb0I7b0JBQ3BCLGNBQWM7b0JBQ2QsWUFBWTtvQkFDWixXQUFXO29CQUNYLGdCQUFnQjtvQkFDaEIsZ0JBQWdCO29CQUNoQixrQkFBa0I7b0JBQ2xCLG9CQUFvQjtvQkFDcEIsaUJBQWlCO29CQUNqQixlQUFlO29CQUNmLG1CQUFtQjtvQkFDbkIsa0JBQWtCO29CQUNsQixnQkFBZ0I7aUJBQ2pCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxTQUFTO29CQUNULGlCQUFpQjtvQkFDakIsdUJBQXVCO29CQUN2QixtQkFBbUI7b0JBQ25CLDZCQUE2QjtvQkFDN0IsaUNBQWlDO29CQUNqQyxzQkFBc0I7b0JBQ3RCLGdCQUFnQjtvQkFDaEIsb0JBQW9CO29CQUNwQixjQUFjO29CQUNkLG9CQUFvQjtvQkFDcEIseUJBQXlCO29CQUN6QixvQkFBb0I7b0JBQ3BCLGNBQWM7b0JBQ2QsbUJBQW1CO29CQUNuQixhQUFhO29CQUNiLHFCQUFxQjtvQkFDckIseUJBQXlCO29CQUN6Qiw2QkFBNkI7b0JBQzdCLHNCQUFzQjtvQkFDdEIsNEJBQTRCO29CQUM1QixhQUFhO29CQUNiLGlCQUFpQjtvQkFDakIsd0JBQXdCO29CQUN4Qiw2QkFBNkI7aUJBQzlCO2dCQUNELFlBQVksRUFBRTtvQkFDWixTQUFTO29CQUNULGlCQUFpQjtvQkFDakIsdUJBQXVCO29CQUN2QixtQkFBbUI7b0JBQ25CLDZCQUE2QjtvQkFDN0IsaUNBQWlDO29CQUNqQyxzQkFBc0I7b0JBQ3RCLGdCQUFnQjtvQkFDaEIsb0JBQW9CO29CQUNwQixjQUFjO29CQUNkLG9CQUFvQjtvQkFDcEIseUJBQXlCO29CQUN6QixvQkFBb0I7b0JBQ3BCLGNBQWM7b0JBQ2QsbUJBQW1CO29CQUNuQixhQUFhO29CQUNiLHFCQUFxQjtvQkFDckIseUJBQXlCO29CQUN6Qiw2QkFBNkI7b0JBQzdCLHNCQUFzQjtvQkFDdEIsNEJBQTRCO29CQUM1QixhQUFhO29CQUNiLGlCQUFpQjtvQkFDakIsd0JBQXdCO29CQUN4Qiw2QkFBNkI7aUJBQzlCO2dCQUNELFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO2FBQ3BDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2RrVGFibGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5vdm9CdXR0b25Nb2R1bGUgfSBmcm9tICcuLi9idXR0b24vQnV0dG9uLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvQ2hlY2tib3hNb2R1bGUgfSBmcm9tICcuLi9jaGVja2JveCc7XG5pbXBvcnQgeyBOb3ZvQ29tbW9uTW9kdWxlLCBOb3ZvT3B0aW9uTW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCB7IE5vdm9EYXRlUGlja2VyTW9kdWxlIH0gZnJvbSAnLi4vZGF0ZS1waWNrZXIvRGF0ZVBpY2tlci5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0Ryb3Bkb3duTW9kdWxlIH0gZnJvbSAnLi4vZHJvcGRvd24vRHJvcGRvd24ubW9kdWxlJztcbmltcG9ydCB7IE5vdm9Gb3JtRXh0cmFzTW9kdWxlIH0gZnJvbSAnLi4vZm9ybS9leHRyYXMvRm9ybUV4dHJhcy5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0xvYWRpbmdNb2R1bGUgfSBmcm9tICcuLi9sb2FkaW5nL0xvYWRpbmcubW9kdWxlJztcbmltcG9ydCB7IE5vdm9TZWFyY2hCb3hNb2R1bGUgfSBmcm9tICcuLi9zZWFyY2gvU2VhcmNoQm94Lm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvVGlsZXNNb2R1bGUgfSBmcm9tICcuLi90aWxlcy9UaWxlcy5tb2R1bGUnO1xuaW1wb3J0IHtcbiAgTm92b1NpbXBsZUFjdGlvbkNlbGwsXG4gIE5vdm9TaW1wbGVDZWxsLFxuICBOb3ZvU2ltcGxlQ2VsbERlZixcbiAgTm92b1NpbXBsZUNoZWNrYm94Q2VsbCxcbiAgTm92b1NpbXBsZUNoZWNrYm94SGVhZGVyQ2VsbCxcbiAgTm92b1NpbXBsZUNvbHVtbkRlZixcbiAgTm92b1NpbXBsZUVtcHR5SGVhZGVyQ2VsbCxcbiAgTm92b1NpbXBsZUhlYWRlckNlbGwsXG4gIE5vdm9TaW1wbGVIZWFkZXJDZWxsRGVmLFxufSBmcm9tICcuL2NlbGwnO1xuaW1wb3J0IHsgTm92b1NpbXBsZUNlbGxIZWFkZXIsIE5vdm9TaW1wbGVGaWx0ZXJGb2N1cyB9IGZyb20gJy4vY2VsbC1oZWFkZXInO1xuaW1wb3J0IHsgTm92b1NpbXBsZVRhYmxlUGFnaW5hdGlvbiB9IGZyb20gJy4vcGFnaW5hdGlvbic7XG5pbXBvcnQgeyBOb3ZvU2ltcGxlSGVhZGVyUm93LCBOb3ZvU2ltcGxlSGVhZGVyUm93RGVmLCBOb3ZvU2ltcGxlUm93LCBOb3ZvU2ltcGxlUm93RGVmIH0gZnJvbSAnLi9yb3cnO1xuaW1wb3J0IHsgTm92b1NlbGVjdGlvbiwgTm92b1NvcnRGaWx0ZXIgfSBmcm9tICcuL3NvcnQnO1xuaW1wb3J0IHsgTm92b0FjdGl2aXR5VGFibGVTdGF0ZSB9IGZyb20gJy4vc3RhdGUnO1xuaW1wb3J0IHtcbiAgTm92b0FjdGl2aXR5VGFibGUsXG4gIE5vdm9BY3Rpdml0eVRhYmxlQWN0aW9ucyxcbiAgTm92b0FjdGl2aXR5VGFibGVDdXN0b21GaWx0ZXIsXG4gIE5vdm9BY3Rpdml0eVRhYmxlQ3VzdG9tSGVhZGVyLFxuICBOb3ZvQWN0aXZpdHlUYWJsZUVtcHR5TWVzc2FnZSxcbiAgTm92b0FjdGl2aXR5VGFibGVOb1Jlc3VsdHNNZXNzYWdlLFxuICBOb3ZvVGFibGUsXG59IGZyb20gJy4vdGFibGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgTm92b0RhdGVQaWNrZXJNb2R1bGUsXG4gICAgQ2RrVGFibGVNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE5vdm9Db21tb25Nb2R1bGUsXG4gICAgTm92b0J1dHRvbk1vZHVsZSxcbiAgICBOb3ZvRHJvcGRvd25Nb2R1bGUsXG4gICAgTm92b0Zvcm1FeHRyYXNNb2R1bGUsXG4gICAgTm92b0xvYWRpbmdNb2R1bGUsXG4gICAgTm92b1RpbGVzTW9kdWxlLFxuICAgIE5vdm9TZWFyY2hCb3hNb2R1bGUsXG4gICAgTm92b0NoZWNrYm94TW9kdWxlLFxuICAgIE5vdm9PcHRpb25Nb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOb3ZvVGFibGUsXG4gICAgTm92b1NpbXBsZUNlbGxEZWYsXG4gICAgTm92b1NpbXBsZUhlYWRlckNlbGxEZWYsXG4gICAgTm92b1NpbXBsZUNvbHVtbkRlZixcbiAgICBOb3ZvQWN0aXZpdHlUYWJsZUVtcHR5TWVzc2FnZSxcbiAgICBOb3ZvQWN0aXZpdHlUYWJsZU5vUmVzdWx0c01lc3NhZ2UsXG4gICAgTm92b1NpbXBsZUhlYWRlclJvd0RlZixcbiAgICBOb3ZvU2ltcGxlUm93RGVmLFxuICAgIE5vdm9TaW1wbGVDZWxsSGVhZGVyLFxuICAgIE5vdm9Tb3J0RmlsdGVyLFxuICAgIE5vdm9TaW1wbGVBY3Rpb25DZWxsLFxuICAgIE5vdm9TaW1wbGVFbXB0eUhlYWRlckNlbGwsXG4gICAgTm92b1NpbXBsZUhlYWRlckNlbGwsXG4gICAgTm92b1NpbXBsZUNlbGwsXG4gICAgTm92b1NpbXBsZUhlYWRlclJvdyxcbiAgICBOb3ZvU2ltcGxlUm93LFxuICAgIE5vdm9TaW1wbGVGaWx0ZXJGb2N1cyxcbiAgICBOb3ZvU2ltcGxlVGFibGVQYWdpbmF0aW9uLFxuICAgIE5vdm9BY3Rpdml0eVRhYmxlQ3VzdG9tSGVhZGVyLFxuICAgIE5vdm9TaW1wbGVDaGVja2JveENlbGwsXG4gICAgTm92b1NpbXBsZUNoZWNrYm94SGVhZGVyQ2VsbCxcbiAgICBOb3ZvU2VsZWN0aW9uLFxuICAgIE5vdm9BY3Rpdml0eVRhYmxlLFxuICAgIE5vdm9BY3Rpdml0eVRhYmxlQWN0aW9ucyxcbiAgICBOb3ZvQWN0aXZpdHlUYWJsZUN1c3RvbUZpbHRlcixcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTm92b1RhYmxlLFxuICAgIE5vdm9TaW1wbGVDZWxsRGVmLFxuICAgIE5vdm9TaW1wbGVIZWFkZXJDZWxsRGVmLFxuICAgIE5vdm9TaW1wbGVDb2x1bW5EZWYsXG4gICAgTm92b0FjdGl2aXR5VGFibGVFbXB0eU1lc3NhZ2UsXG4gICAgTm92b0FjdGl2aXR5VGFibGVOb1Jlc3VsdHNNZXNzYWdlLFxuICAgIE5vdm9TaW1wbGVIZWFkZXJSb3dEZWYsXG4gICAgTm92b1NpbXBsZVJvd0RlZixcbiAgICBOb3ZvU2ltcGxlQ2VsbEhlYWRlcixcbiAgICBOb3ZvU29ydEZpbHRlcixcbiAgICBOb3ZvU2ltcGxlQWN0aW9uQ2VsbCxcbiAgICBOb3ZvU2ltcGxlRW1wdHlIZWFkZXJDZWxsLFxuICAgIE5vdm9TaW1wbGVIZWFkZXJDZWxsLFxuICAgIE5vdm9TaW1wbGVDZWxsLFxuICAgIE5vdm9TaW1wbGVIZWFkZXJSb3csXG4gICAgTm92b1NpbXBsZVJvdyxcbiAgICBOb3ZvU2ltcGxlRmlsdGVyRm9jdXMsXG4gICAgTm92b1NpbXBsZVRhYmxlUGFnaW5hdGlvbixcbiAgICBOb3ZvQWN0aXZpdHlUYWJsZUN1c3RvbUhlYWRlcixcbiAgICBOb3ZvU2ltcGxlQ2hlY2tib3hDZWxsLFxuICAgIE5vdm9TaW1wbGVDaGVja2JveEhlYWRlckNlbGwsXG4gICAgTm92b1NlbGVjdGlvbixcbiAgICBOb3ZvQWN0aXZpdHlUYWJsZSxcbiAgICBOb3ZvQWN0aXZpdHlUYWJsZUFjdGlvbnMsXG4gICAgTm92b0FjdGl2aXR5VGFibGVDdXN0b21GaWx0ZXIsXG4gIF0sXG4gIHByb3ZpZGVyczogW05vdm9BY3Rpdml0eVRhYmxlU3RhdGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvU2ltcGxlVGFibGVNb2R1bGUge31cbiJdfQ==