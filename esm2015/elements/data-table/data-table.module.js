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
import { NovoCommonModule } from '../common/common.module';
import { NovoSelectModule } from '../select/Select.module';
import { NovoTooltipModule } from '../tooltip/Tooltip.module';
import { NovoDataTable } from './data-table.component';
import { NovoDataTableCell } from './cells/data-table-cell.component';
import { NovoDataTableCheckboxCell } from './cells/data-table-checkbox-cell.component';
import { NovoDataTableExpandCell } from './cells/data-table-expand-cell.component';
import { NovoDataTableHeaderRow } from './rows/data-table-header-row.component';
import { NovoDataTableRow } from './rows/data-table-row.component';
import { NovoDataTableCellHeader } from './cell-headers/data-table-header-cell.component';
import { NovoDataTableExpandHeaderCell } from './cell-headers/data-table-expand-header-cell.component';
import { NovoDataTableCheckboxHeaderCell } from './cell-headers/data-table-checkbox-header-cell.component';
import { NovoDataTableHeaderCell } from './cell-headers/data-table-header-cell.directive';
import { NovoDataTableSortFilter } from './sort-filter/sort-filter.directive';
import { NovoDataTablePagination } from './pagination/data-table-pagination.component';
import { DataTableState } from './state/data-table-state.service';
import { DataTableInterpolatePipe, DateTableDateRendererPipe, DateTableCurrencyRendererPipe, DateTableDateTimeRendererPipe, DateTableNumberRendererPipe, DateTableTimeRendererPipe, DataTableBigDecimalRendererPipe, } from './data-table.pipes';
import { NovoDataTableExpandDirective } from './data-table-expand.directive';
import { NovoDataTableClearButton } from './data-table-clear-button.component';
export class NovoDataTableModule {
}
NovoDataTableModule.decorators = [
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
                    NovoCommonModule,
                    NovoSelectModule,
                    NovoTooltipModule,
                ],
                declarations: [
                    DataTableInterpolatePipe,
                    DateTableDateRendererPipe,
                    DateTableCurrencyRendererPipe,
                    DateTableDateTimeRendererPipe,
                    DateTableNumberRendererPipe,
                    DateTableTimeRendererPipe,
                    DataTableBigDecimalRendererPipe,
                    NovoDataTableCellHeader,
                    NovoDataTableSortFilter,
                    NovoDataTableHeaderCell,
                    NovoDataTableCell,
                    NovoDataTableHeaderRow,
                    NovoDataTableRow,
                    NovoDataTablePagination,
                    NovoDataTableCheckboxCell,
                    NovoDataTableCheckboxHeaderCell,
                    NovoDataTableExpandCell,
                    NovoDataTableExpandHeaderCell,
                    NovoDataTable,
                    NovoDataTableExpandDirective,
                    NovoDataTableClearButton,
                ],
                providers: [DataTableState],
                exports: [
                    NovoDataTable,
                    DataTableInterpolatePipe,
                    DateTableDateRendererPipe,
                    DateTableCurrencyRendererPipe,
                    DateTableDateTimeRendererPipe,
                    DateTableNumberRendererPipe,
                    DateTableTimeRendererPipe,
                    DataTableBigDecimalRendererPipe,
                    NovoDataTableClearButton,
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2RhdGEtdGFibGUvZGF0YS10YWJsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVwRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDakUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFOUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQzFGLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBQzNHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQzFGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNsRSxPQUFPLEVBQ0wsd0JBQXdCLEVBQ3hCLHlCQUF5QixFQUN6Qiw2QkFBNkIsRUFDN0IsNkJBQTZCLEVBQzdCLDJCQUEyQixFQUMzQix5QkFBeUIsRUFDekIsK0JBQStCLEdBQ2hDLE1BQU0sb0JBQW9CLENBQUM7QUFDNUIsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDN0UsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFzRC9FLE1BQU0sT0FBTyxtQkFBbUI7OztZQXBEL0IsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxvQkFBb0I7b0JBQ3BCLGNBQWM7b0JBQ2QsWUFBWTtvQkFDWixXQUFXO29CQUNYLGdCQUFnQjtvQkFDaEIsa0JBQWtCO29CQUNsQixvQkFBb0I7b0JBQ3BCLGlCQUFpQjtvQkFDakIsZUFBZTtvQkFDZixtQkFBbUI7b0JBQ25CLGdCQUFnQjtvQkFDaEIsZ0JBQWdCO29CQUNoQixpQkFBaUI7aUJBQ2xCO2dCQUNELFlBQVksRUFBRTtvQkFDWix3QkFBd0I7b0JBQ3hCLHlCQUF5QjtvQkFDekIsNkJBQTZCO29CQUM3Qiw2QkFBNkI7b0JBQzdCLDJCQUEyQjtvQkFDM0IseUJBQXlCO29CQUN6QiwrQkFBK0I7b0JBQy9CLHVCQUF1QjtvQkFDdkIsdUJBQXVCO29CQUN2Qix1QkFBdUI7b0JBQ3ZCLGlCQUFpQjtvQkFDakIsc0JBQXNCO29CQUN0QixnQkFBZ0I7b0JBQ2hCLHVCQUF1QjtvQkFDdkIseUJBQXlCO29CQUN6QiwrQkFBK0I7b0JBQy9CLHVCQUF1QjtvQkFDdkIsNkJBQTZCO29CQUM3QixhQUFhO29CQUNiLDRCQUE0QjtvQkFDNUIsd0JBQXdCO2lCQUN6QjtnQkFDRCxTQUFTLEVBQUUsQ0FBQyxjQUFjLENBQUM7Z0JBQzNCLE9BQU8sRUFBRTtvQkFDUCxhQUFhO29CQUNiLHdCQUF3QjtvQkFDeEIseUJBQXlCO29CQUN6Qiw2QkFBNkI7b0JBQzdCLDZCQUE2QjtvQkFDN0IsMkJBQTJCO29CQUMzQix5QkFBeUI7b0JBQ3pCLCtCQUErQjtvQkFDL0Isd0JBQXdCO2lCQUN6QjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IENka1RhYmxlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcclxuXHJcbmltcG9ydCB7IE5vdm9CdXR0b25Nb2R1bGUgfSBmcm9tICcuLi9idXR0b24vQnV0dG9uLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9Ecm9wZG93bk1vZHVsZSB9IGZyb20gJy4uL2Ryb3Bkb3duL0Ryb3Bkb3duLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9Gb3JtRXh0cmFzTW9kdWxlIH0gZnJvbSAnLi4vZm9ybS9leHRyYXMvRm9ybUV4dHJhcy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvTG9hZGluZ01vZHVsZSB9IGZyb20gJy4uL2xvYWRpbmcvTG9hZGluZy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvVGlsZXNNb2R1bGUgfSBmcm9tICcuLi90aWxlcy9UaWxlcy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvU2VhcmNoQm94TW9kdWxlIH0gZnJvbSAnLi4vc2VhcmNoL1NlYXJjaEJveC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvRGF0ZVBpY2tlck1vZHVsZSB9IGZyb20gJy4uL2RhdGUtcGlja2VyL0RhdGVQaWNrZXIubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b0NvbW1vbk1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9jb21tb24ubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b1NlbGVjdE1vZHVsZSB9IGZyb20gJy4uL3NlbGVjdC9TZWxlY3QubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b1Rvb2x0aXBNb2R1bGUgfSBmcm9tICcuLi90b29sdGlwL1Rvb2x0aXAubW9kdWxlJztcclxuXHJcbmltcG9ydCB7IE5vdm9EYXRhVGFibGUgfSBmcm9tICcuL2RhdGEtdGFibGUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTm92b0RhdGFUYWJsZUNlbGwgfSBmcm9tICcuL2NlbGxzL2RhdGEtdGFibGUtY2VsbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOb3ZvRGF0YVRhYmxlQ2hlY2tib3hDZWxsIH0gZnJvbSAnLi9jZWxscy9kYXRhLXRhYmxlLWNoZWNrYm94LWNlbGwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTm92b0RhdGFUYWJsZUV4cGFuZENlbGwgfSBmcm9tICcuL2NlbGxzL2RhdGEtdGFibGUtZXhwYW5kLWNlbGwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTm92b0RhdGFUYWJsZUhlYWRlclJvdyB9IGZyb20gJy4vcm93cy9kYXRhLXRhYmxlLWhlYWRlci1yb3cuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTm92b0RhdGFUYWJsZVJvdyB9IGZyb20gJy4vcm93cy9kYXRhLXRhYmxlLXJvdy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOb3ZvRGF0YVRhYmxlQ2VsbEhlYWRlciB9IGZyb20gJy4vY2VsbC1oZWFkZXJzL2RhdGEtdGFibGUtaGVhZGVyLWNlbGwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTm92b0RhdGFUYWJsZUV4cGFuZEhlYWRlckNlbGwgfSBmcm9tICcuL2NlbGwtaGVhZGVycy9kYXRhLXRhYmxlLWV4cGFuZC1oZWFkZXItY2VsbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOb3ZvRGF0YVRhYmxlQ2hlY2tib3hIZWFkZXJDZWxsIH0gZnJvbSAnLi9jZWxsLWhlYWRlcnMvZGF0YS10YWJsZS1jaGVja2JveC1oZWFkZXItY2VsbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOb3ZvRGF0YVRhYmxlSGVhZGVyQ2VsbCB9IGZyb20gJy4vY2VsbC1oZWFkZXJzL2RhdGEtdGFibGUtaGVhZGVyLWNlbGwuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTm92b0RhdGFUYWJsZVNvcnRGaWx0ZXIgfSBmcm9tICcuL3NvcnQtZmlsdGVyL3NvcnQtZmlsdGVyLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE5vdm9EYXRhVGFibGVQYWdpbmF0aW9uIH0gZnJvbSAnLi9wYWdpbmF0aW9uL2RhdGEtdGFibGUtcGFnaW5hdGlvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEYXRhVGFibGVTdGF0ZSB9IGZyb20gJy4vc3RhdGUvZGF0YS10YWJsZS1zdGF0ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHtcclxuICBEYXRhVGFibGVJbnRlcnBvbGF0ZVBpcGUsXHJcbiAgRGF0ZVRhYmxlRGF0ZVJlbmRlcmVyUGlwZSxcclxuICBEYXRlVGFibGVDdXJyZW5jeVJlbmRlcmVyUGlwZSxcclxuICBEYXRlVGFibGVEYXRlVGltZVJlbmRlcmVyUGlwZSxcclxuICBEYXRlVGFibGVOdW1iZXJSZW5kZXJlclBpcGUsXHJcbiAgRGF0ZVRhYmxlVGltZVJlbmRlcmVyUGlwZSxcclxuICBEYXRhVGFibGVCaWdEZWNpbWFsUmVuZGVyZXJQaXBlLFxyXG59IGZyb20gJy4vZGF0YS10YWJsZS5waXBlcyc7XHJcbmltcG9ydCB7IE5vdm9EYXRhVGFibGVFeHBhbmREaXJlY3RpdmUgfSBmcm9tICcuL2RhdGEtdGFibGUtZXhwYW5kLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE5vdm9EYXRhVGFibGVDbGVhckJ1dHRvbiB9IGZyb20gJy4vZGF0YS10YWJsZS1jbGVhci1idXR0b24uY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgTm92b0RhdGVQaWNrZXJNb2R1bGUsXHJcbiAgICBDZGtUYWJsZU1vZHVsZSxcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgTm92b0J1dHRvbk1vZHVsZSxcclxuICAgIE5vdm9Ecm9wZG93bk1vZHVsZSxcclxuICAgIE5vdm9Gb3JtRXh0cmFzTW9kdWxlLFxyXG4gICAgTm92b0xvYWRpbmdNb2R1bGUsXHJcbiAgICBOb3ZvVGlsZXNNb2R1bGUsXHJcbiAgICBOb3ZvU2VhcmNoQm94TW9kdWxlLFxyXG4gICAgTm92b0NvbW1vbk1vZHVsZSxcclxuICAgIE5vdm9TZWxlY3RNb2R1bGUsXHJcbiAgICBOb3ZvVG9vbHRpcE1vZHVsZSxcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgRGF0YVRhYmxlSW50ZXJwb2xhdGVQaXBlLFxyXG4gICAgRGF0ZVRhYmxlRGF0ZVJlbmRlcmVyUGlwZSxcclxuICAgIERhdGVUYWJsZUN1cnJlbmN5UmVuZGVyZXJQaXBlLFxyXG4gICAgRGF0ZVRhYmxlRGF0ZVRpbWVSZW5kZXJlclBpcGUsXHJcbiAgICBEYXRlVGFibGVOdW1iZXJSZW5kZXJlclBpcGUsXHJcbiAgICBEYXRlVGFibGVUaW1lUmVuZGVyZXJQaXBlLFxyXG4gICAgRGF0YVRhYmxlQmlnRGVjaW1hbFJlbmRlcmVyUGlwZSxcclxuICAgIE5vdm9EYXRhVGFibGVDZWxsSGVhZGVyLFxyXG4gICAgTm92b0RhdGFUYWJsZVNvcnRGaWx0ZXIsXHJcbiAgICBOb3ZvRGF0YVRhYmxlSGVhZGVyQ2VsbCxcclxuICAgIE5vdm9EYXRhVGFibGVDZWxsLFxyXG4gICAgTm92b0RhdGFUYWJsZUhlYWRlclJvdyxcclxuICAgIE5vdm9EYXRhVGFibGVSb3csXHJcbiAgICBOb3ZvRGF0YVRhYmxlUGFnaW5hdGlvbixcclxuICAgIE5vdm9EYXRhVGFibGVDaGVja2JveENlbGwsXHJcbiAgICBOb3ZvRGF0YVRhYmxlQ2hlY2tib3hIZWFkZXJDZWxsLFxyXG4gICAgTm92b0RhdGFUYWJsZUV4cGFuZENlbGwsXHJcbiAgICBOb3ZvRGF0YVRhYmxlRXhwYW5kSGVhZGVyQ2VsbCxcclxuICAgIE5vdm9EYXRhVGFibGUsXHJcbiAgICBOb3ZvRGF0YVRhYmxlRXhwYW5kRGlyZWN0aXZlLFxyXG4gICAgTm92b0RhdGFUYWJsZUNsZWFyQnV0dG9uLFxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbRGF0YVRhYmxlU3RhdGVdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIE5vdm9EYXRhVGFibGUsXHJcbiAgICBEYXRhVGFibGVJbnRlcnBvbGF0ZVBpcGUsXHJcbiAgICBEYXRlVGFibGVEYXRlUmVuZGVyZXJQaXBlLFxyXG4gICAgRGF0ZVRhYmxlQ3VycmVuY3lSZW5kZXJlclBpcGUsXHJcbiAgICBEYXRlVGFibGVEYXRlVGltZVJlbmRlcmVyUGlwZSxcclxuICAgIERhdGVUYWJsZU51bWJlclJlbmRlcmVyUGlwZSxcclxuICAgIERhdGVUYWJsZVRpbWVSZW5kZXJlclBpcGUsXHJcbiAgICBEYXRhVGFibGVCaWdEZWNpbWFsUmVuZGVyZXJQaXBlLFxyXG4gICAgTm92b0RhdGFUYWJsZUNsZWFyQnV0dG9uLFxyXG4gIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvRGF0YVRhYmxlTW9kdWxlIHt9XHJcbiJdfQ==