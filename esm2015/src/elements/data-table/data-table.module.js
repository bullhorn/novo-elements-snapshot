import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoButtonModule } from '../button/Button.module';
import { NovoCheckboxModule } from '../checkbox';
import { NovoCommonModule } from '../common/common.module';
import { NovoOptionModule } from '../common/option';
import { NovoDatePickerModule } from '../date-picker/DatePicker.module';
import { NovoDropdownModule } from '../dropdown/Dropdown.module';
import { NovoFormExtrasModule } from '../form/extras/FormExtras.module';
import { NovoIconModule } from '../icon/Icon.module';
import { NovoLoadingModule } from '../loading/Loading.module';
import { NovoSearchBoxModule } from '../search/SearchBox.module';
import { NovoSelectModule } from '../select/Select.module';
import { NovoTilesModule } from '../tiles/Tiles.module';
import { NovoTooltipModule } from '../tooltip/Tooltip.module';
import { NovoDataTableCheckboxHeaderCell } from './cell-headers/data-table-checkbox-header-cell.component';
import { NovoDataTableExpandHeaderCell } from './cell-headers/data-table-expand-header-cell.component';
import { NovoDataTableCellHeader } from './cell-headers/data-table-header-cell.component';
import { NovoDataTableHeaderCell } from './cell-headers/data-table-header-cell.directive';
import { NovoDataTableCell } from './cells/data-table-cell.component';
import { NovoDataTableCheckboxCell } from './cells/data-table-checkbox-cell.component';
import { NovoDataTableExpandCell } from './cells/data-table-expand-cell.component';
import { NovoDataTableClearButton } from './data-table-clear-button.component';
import { NovoDataTableExpandDirective } from './data-table-expand.directive';
import { NovoDataTable } from './data-table.component';
import { DataTableBigDecimalRendererPipe, DataTableInterpolatePipe, DateTableCurrencyRendererPipe, DateTableDateRendererPipe, DateTableDateTimeRendererPipe, DateTableNumberRendererPipe, DateTableTimeRendererPipe, } from './data-table.pipes';
import { NovoDataTablePagination } from './pagination/data-table-pagination.component';
import { NovoDataTableHeaderRow } from './rows/data-table-header-row.component';
import { NovoDataTableRow } from './rows/data-table-row.component';
import { NovoDataTableSortButton } from './sort-filter/sort-button.component';
import { NovoDataTableSortFilter } from './sort-filter/sort-filter.directive';
import { DataTableState } from './state/data-table-state.service';
export class NovoDataTableModule {
}
NovoDataTableModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    NovoDatePickerModule,
                    CdkTableModule,
                    CommonModule,
                    FormsModule,
                    NovoIconModule,
                    NovoButtonModule,
                    NovoDropdownModule,
                    NovoFormExtrasModule,
                    NovoLoadingModule,
                    NovoTilesModule,
                    NovoSearchBoxModule,
                    NovoCommonModule,
                    NovoSelectModule,
                    NovoTooltipModule,
                    NovoOptionModule,
                    NovoCheckboxModule,
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
                    NovoDataTableSortButton,
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
                    NovoDataTableSortButton,
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvZGF0YS10YWJsZS9kYXRhLXRhYmxlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDOUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDakUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzlELE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBQzNHLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQzFGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQzFGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzdFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQ0wsK0JBQStCLEVBQy9CLHdCQUF3QixFQUN4Qiw2QkFBNkIsRUFDN0IseUJBQXlCLEVBQ3pCLDZCQUE2QixFQUM3QiwyQkFBMkIsRUFDM0IseUJBQXlCLEdBQzFCLE1BQU0sb0JBQW9CLENBQUM7QUFDNUIsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDdkYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbkUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDOUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDOUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBMkRsRSxNQUFNLE9BQU8sbUJBQW1COzs7WUF6RC9CLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1Asb0JBQW9CO29CQUNwQixjQUFjO29CQUNkLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxjQUFjO29CQUNkLGdCQUFnQjtvQkFDaEIsa0JBQWtCO29CQUNsQixvQkFBb0I7b0JBQ3BCLGlCQUFpQjtvQkFDakIsZUFBZTtvQkFDZixtQkFBbUI7b0JBQ25CLGdCQUFnQjtvQkFDaEIsZ0JBQWdCO29CQUNoQixpQkFBaUI7b0JBQ2pCLGdCQUFnQjtvQkFDaEIsa0JBQWtCO2lCQUNuQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osd0JBQXdCO29CQUN4Qix5QkFBeUI7b0JBQ3pCLDZCQUE2QjtvQkFDN0IsNkJBQTZCO29CQUM3QiwyQkFBMkI7b0JBQzNCLHlCQUF5QjtvQkFDekIsK0JBQStCO29CQUMvQix1QkFBdUI7b0JBQ3ZCLHVCQUF1QjtvQkFDdkIsdUJBQXVCO29CQUN2QixpQkFBaUI7b0JBQ2pCLHNCQUFzQjtvQkFDdEIsZ0JBQWdCO29CQUNoQix1QkFBdUI7b0JBQ3ZCLHlCQUF5QjtvQkFDekIsK0JBQStCO29CQUMvQix1QkFBdUI7b0JBQ3ZCLDZCQUE2QjtvQkFDN0IsYUFBYTtvQkFDYiw0QkFBNEI7b0JBQzVCLHdCQUF3QjtvQkFDeEIsdUJBQXVCO2lCQUN4QjtnQkFDRCxTQUFTLEVBQUUsQ0FBQyxjQUFjLENBQUM7Z0JBQzNCLE9BQU8sRUFBRTtvQkFDUCxhQUFhO29CQUNiLHdCQUF3QjtvQkFDeEIseUJBQXlCO29CQUN6Qiw2QkFBNkI7b0JBQzdCLDZCQUE2QjtvQkFDN0IsMkJBQTJCO29CQUMzQix5QkFBeUI7b0JBQ3pCLCtCQUErQjtvQkFDL0Isd0JBQXdCO29CQUN4Qix1QkFBdUI7aUJBQ3hCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZGtUYWJsZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTm92b0J1dHRvbk1vZHVsZSB9IGZyb20gJy4uL2J1dHRvbi9CdXR0b24ubW9kdWxlJztcbmltcG9ydCB7IE5vdm9DaGVja2JveE1vZHVsZSB9IGZyb20gJy4uL2NoZWNrYm94JztcbmltcG9ydCB7IE5vdm9Db21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY29tbW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvT3B0aW9uTW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uL29wdGlvbic7XG5pbXBvcnQgeyBOb3ZvRGF0ZVBpY2tlck1vZHVsZSB9IGZyb20gJy4uL2RhdGUtcGlja2VyL0RhdGVQaWNrZXIubW9kdWxlJztcbmltcG9ydCB7IE5vdm9Ecm9wZG93bk1vZHVsZSB9IGZyb20gJy4uL2Ryb3Bkb3duL0Ryb3Bkb3duLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvRm9ybUV4dHJhc01vZHVsZSB9IGZyb20gJy4uL2Zvcm0vZXh0cmFzL0Zvcm1FeHRyYXMubW9kdWxlJztcbmltcG9ydCB7IE5vdm9JY29uTW9kdWxlIH0gZnJvbSAnLi4vaWNvbi9JY29uLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvTG9hZGluZ01vZHVsZSB9IGZyb20gJy4uL2xvYWRpbmcvTG9hZGluZy5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1NlYXJjaEJveE1vZHVsZSB9IGZyb20gJy4uL3NlYXJjaC9TZWFyY2hCb3gubW9kdWxlJztcbmltcG9ydCB7IE5vdm9TZWxlY3RNb2R1bGUgfSBmcm9tICcuLi9zZWxlY3QvU2VsZWN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvVGlsZXNNb2R1bGUgfSBmcm9tICcuLi90aWxlcy9UaWxlcy5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1Rvb2x0aXBNb2R1bGUgfSBmcm9tICcuLi90b29sdGlwL1Rvb2x0aXAubW9kdWxlJztcbmltcG9ydCB7IE5vdm9EYXRhVGFibGVDaGVja2JveEhlYWRlckNlbGwgfSBmcm9tICcuL2NlbGwtaGVhZGVycy9kYXRhLXRhYmxlLWNoZWNrYm94LWhlYWRlci1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvRGF0YVRhYmxlRXhwYW5kSGVhZGVyQ2VsbCB9IGZyb20gJy4vY2VsbC1oZWFkZXJzL2RhdGEtdGFibGUtZXhwYW5kLWhlYWRlci1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvRGF0YVRhYmxlQ2VsbEhlYWRlciB9IGZyb20gJy4vY2VsbC1oZWFkZXJzL2RhdGEtdGFibGUtaGVhZGVyLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9EYXRhVGFibGVIZWFkZXJDZWxsIH0gZnJvbSAnLi9jZWxsLWhlYWRlcnMvZGF0YS10YWJsZS1oZWFkZXItY2VsbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTm92b0RhdGFUYWJsZUNlbGwgfSBmcm9tICcuL2NlbGxzL2RhdGEtdGFibGUtY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b0RhdGFUYWJsZUNoZWNrYm94Q2VsbCB9IGZyb20gJy4vY2VsbHMvZGF0YS10YWJsZS1jaGVja2JveC1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvRGF0YVRhYmxlRXhwYW5kQ2VsbCB9IGZyb20gJy4vY2VsbHMvZGF0YS10YWJsZS1leHBhbmQtY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b0RhdGFUYWJsZUNsZWFyQnV0dG9uIH0gZnJvbSAnLi9kYXRhLXRhYmxlLWNsZWFyLWJ1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b0RhdGFUYWJsZUV4cGFuZERpcmVjdGl2ZSB9IGZyb20gJy4vZGF0YS10YWJsZS1leHBhbmQuZGlyZWN0aXZlJztcbmltcG9ydCB7IE5vdm9EYXRhVGFibGUgfSBmcm9tICcuL2RhdGEtdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIERhdGFUYWJsZUJpZ0RlY2ltYWxSZW5kZXJlclBpcGUsXG4gIERhdGFUYWJsZUludGVycG9sYXRlUGlwZSxcbiAgRGF0ZVRhYmxlQ3VycmVuY3lSZW5kZXJlclBpcGUsXG4gIERhdGVUYWJsZURhdGVSZW5kZXJlclBpcGUsXG4gIERhdGVUYWJsZURhdGVUaW1lUmVuZGVyZXJQaXBlLFxuICBEYXRlVGFibGVOdW1iZXJSZW5kZXJlclBpcGUsXG4gIERhdGVUYWJsZVRpbWVSZW5kZXJlclBpcGUsXG59IGZyb20gJy4vZGF0YS10YWJsZS5waXBlcyc7XG5pbXBvcnQgeyBOb3ZvRGF0YVRhYmxlUGFnaW5hdGlvbiB9IGZyb20gJy4vcGFnaW5hdGlvbi9kYXRhLXRhYmxlLXBhZ2luYXRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9EYXRhVGFibGVIZWFkZXJSb3cgfSBmcm9tICcuL3Jvd3MvZGF0YS10YWJsZS1oZWFkZXItcm93LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvRGF0YVRhYmxlUm93IH0gZnJvbSAnLi9yb3dzL2RhdGEtdGFibGUtcm93LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvRGF0YVRhYmxlU29ydEJ1dHRvbiB9IGZyb20gJy4vc29ydC1maWx0ZXIvc29ydC1idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9EYXRhVGFibGVTb3J0RmlsdGVyIH0gZnJvbSAnLi9zb3J0LWZpbHRlci9zb3J0LWZpbHRlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGF0YVRhYmxlU3RhdGUgfSBmcm9tICcuL3N0YXRlL2RhdGEtdGFibGUtc3RhdGUuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBOb3ZvRGF0ZVBpY2tlck1vZHVsZSxcbiAgICBDZGtUYWJsZU1vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTm92b0ljb25Nb2R1bGUsXG4gICAgTm92b0J1dHRvbk1vZHVsZSxcbiAgICBOb3ZvRHJvcGRvd25Nb2R1bGUsXG4gICAgTm92b0Zvcm1FeHRyYXNNb2R1bGUsXG4gICAgTm92b0xvYWRpbmdNb2R1bGUsXG4gICAgTm92b1RpbGVzTW9kdWxlLFxuICAgIE5vdm9TZWFyY2hCb3hNb2R1bGUsXG4gICAgTm92b0NvbW1vbk1vZHVsZSxcbiAgICBOb3ZvU2VsZWN0TW9kdWxlLFxuICAgIE5vdm9Ub29sdGlwTW9kdWxlLFxuICAgIE5vdm9PcHRpb25Nb2R1bGUsXG4gICAgTm92b0NoZWNrYm94TW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEYXRhVGFibGVJbnRlcnBvbGF0ZVBpcGUsXG4gICAgRGF0ZVRhYmxlRGF0ZVJlbmRlcmVyUGlwZSxcbiAgICBEYXRlVGFibGVDdXJyZW5jeVJlbmRlcmVyUGlwZSxcbiAgICBEYXRlVGFibGVEYXRlVGltZVJlbmRlcmVyUGlwZSxcbiAgICBEYXRlVGFibGVOdW1iZXJSZW5kZXJlclBpcGUsXG4gICAgRGF0ZVRhYmxlVGltZVJlbmRlcmVyUGlwZSxcbiAgICBEYXRhVGFibGVCaWdEZWNpbWFsUmVuZGVyZXJQaXBlLFxuICAgIE5vdm9EYXRhVGFibGVDZWxsSGVhZGVyLFxuICAgIE5vdm9EYXRhVGFibGVTb3J0RmlsdGVyLFxuICAgIE5vdm9EYXRhVGFibGVIZWFkZXJDZWxsLFxuICAgIE5vdm9EYXRhVGFibGVDZWxsLFxuICAgIE5vdm9EYXRhVGFibGVIZWFkZXJSb3csXG4gICAgTm92b0RhdGFUYWJsZVJvdyxcbiAgICBOb3ZvRGF0YVRhYmxlUGFnaW5hdGlvbixcbiAgICBOb3ZvRGF0YVRhYmxlQ2hlY2tib3hDZWxsLFxuICAgIE5vdm9EYXRhVGFibGVDaGVja2JveEhlYWRlckNlbGwsXG4gICAgTm92b0RhdGFUYWJsZUV4cGFuZENlbGwsXG4gICAgTm92b0RhdGFUYWJsZUV4cGFuZEhlYWRlckNlbGwsXG4gICAgTm92b0RhdGFUYWJsZSxcbiAgICBOb3ZvRGF0YVRhYmxlRXhwYW5kRGlyZWN0aXZlLFxuICAgIE5vdm9EYXRhVGFibGVDbGVhckJ1dHRvbixcbiAgICBOb3ZvRGF0YVRhYmxlU29ydEJ1dHRvbixcbiAgXSxcbiAgcHJvdmlkZXJzOiBbRGF0YVRhYmxlU3RhdGVdLFxuICBleHBvcnRzOiBbXG4gICAgTm92b0RhdGFUYWJsZSxcbiAgICBEYXRhVGFibGVJbnRlcnBvbGF0ZVBpcGUsXG4gICAgRGF0ZVRhYmxlRGF0ZVJlbmRlcmVyUGlwZSxcbiAgICBEYXRlVGFibGVDdXJyZW5jeVJlbmRlcmVyUGlwZSxcbiAgICBEYXRlVGFibGVEYXRlVGltZVJlbmRlcmVyUGlwZSxcbiAgICBEYXRlVGFibGVOdW1iZXJSZW5kZXJlclBpcGUsXG4gICAgRGF0ZVRhYmxlVGltZVJlbmRlcmVyUGlwZSxcbiAgICBEYXRhVGFibGVCaWdEZWNpbWFsUmVuZGVyZXJQaXBlLFxuICAgIE5vdm9EYXRhVGFibGVDbGVhckJ1dHRvbixcbiAgICBOb3ZvRGF0YVRhYmxlU29ydEJ1dHRvbixcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RhdGFUYWJsZU1vZHVsZSB7fVxuIl19