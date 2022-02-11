// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoButtonModule } from '../../button/Button.module';
import { NovoCommonModule } from '../../common/common.module';
import { NovoDropdownModule } from '../../dropdown/Dropdown.module';
// APP
import { NovoSelectModule } from '../../select/Select.module';
import { DateCell } from './date-cell/DateCell';
import { NovoDropdownCell } from './dropdown-cell/DropdownCell';
import { NovoTableKeepFilterFocus } from './keep-filter-focus/KeepFilterFocus';
import { Pagination } from './pagination/Pagination';
import { PercentageCell } from './percentage-cell/PercentageCell';
import { RowDetails } from './row-details/RowDetails';
import { NovoTableActionsElement } from './table-actions/TableActions';
import { TableCell } from './table-cell/TableCell';
import { TableFilter } from './table-filter/TableFilter';
import { NovoTableFooterElement } from './table-footer/TableFooter';
import { NovoTableHeaderElement } from './table-header/TableHeader';
import { ThOrderable } from './th-orderable/ThOrderable';
import { ThSortable } from './th-sortable/ThSortable';
export class NovoTableExtrasModule {
}
NovoTableExtrasModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule, NovoSelectModule, NovoDropdownModule, NovoButtonModule, NovoCommonModule],
                declarations: [
                    NovoTableHeaderElement,
                    NovoTableFooterElement,
                    NovoTableActionsElement,
                    NovoTableKeepFilterFocus,
                    Pagination,
                    RowDetails,
                    TableCell,
                    TableFilter,
                    ThOrderable,
                    ThSortable,
                    DateCell,
                    PercentageCell,
                    NovoDropdownCell,
                ],
                exports: [
                    NovoTableHeaderElement,
                    NovoTableFooterElement,
                    NovoTableActionsElement,
                    NovoTableKeepFilterFocus,
                    Pagination,
                    RowDetails,
                    TableCell,
                    TableFilter,
                    ThOrderable,
                    ThSortable,
                    DateCell,
                    PercentageCell,
                    NovoDropdownCell,
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGVFeHRyYXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL3RhYmxlL2V4dHJhcy9UYWJsZUV4dHJhcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDbEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3RELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQW1DdEQsTUFBTSxPQUFPLHFCQUFxQjs7O1lBakNqQyxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQztnQkFDOUcsWUFBWSxFQUFFO29CQUNaLHNCQUFzQjtvQkFDdEIsc0JBQXNCO29CQUN0Qix1QkFBdUI7b0JBQ3ZCLHdCQUF3QjtvQkFDeEIsVUFBVTtvQkFDVixVQUFVO29CQUNWLFNBQVM7b0JBQ1QsV0FBVztvQkFDWCxXQUFXO29CQUNYLFVBQVU7b0JBQ1YsUUFBUTtvQkFDUixjQUFjO29CQUNkLGdCQUFnQjtpQkFDakI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLHNCQUFzQjtvQkFDdEIsc0JBQXNCO29CQUN0Qix1QkFBdUI7b0JBQ3ZCLHdCQUF3QjtvQkFDeEIsVUFBVTtvQkFDVixVQUFVO29CQUNWLFNBQVM7b0JBQ1QsV0FBVztvQkFDWCxXQUFXO29CQUNYLFVBQVU7b0JBQ1YsUUFBUTtvQkFDUixjQUFjO29CQUNkLGdCQUFnQjtpQkFDakI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5vdm9CdXR0b25Nb2R1bGUgfSBmcm9tICcuLi8uLi9idXR0b24vQnV0dG9uLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvQ29tbW9uTW9kdWxlIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbW1vbi5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0Ryb3Bkb3duTW9kdWxlIH0gZnJvbSAnLi4vLi4vZHJvcGRvd24vRHJvcGRvd24ubW9kdWxlJztcbi8vIEFQUFxuaW1wb3J0IHsgTm92b1NlbGVjdE1vZHVsZSB9IGZyb20gJy4uLy4uL3NlbGVjdC9TZWxlY3QubW9kdWxlJztcbmltcG9ydCB7IERhdGVDZWxsIH0gZnJvbSAnLi9kYXRlLWNlbGwvRGF0ZUNlbGwnO1xuaW1wb3J0IHsgTm92b0Ryb3Bkb3duQ2VsbCB9IGZyb20gJy4vZHJvcGRvd24tY2VsbC9Ecm9wZG93bkNlbGwnO1xuaW1wb3J0IHsgTm92b1RhYmxlS2VlcEZpbHRlckZvY3VzIH0gZnJvbSAnLi9rZWVwLWZpbHRlci1mb2N1cy9LZWVwRmlsdGVyRm9jdXMnO1xuaW1wb3J0IHsgUGFnaW5hdGlvbiB9IGZyb20gJy4vcGFnaW5hdGlvbi9QYWdpbmF0aW9uJztcbmltcG9ydCB7IFBlcmNlbnRhZ2VDZWxsIH0gZnJvbSAnLi9wZXJjZW50YWdlLWNlbGwvUGVyY2VudGFnZUNlbGwnO1xuaW1wb3J0IHsgUm93RGV0YWlscyB9IGZyb20gJy4vcm93LWRldGFpbHMvUm93RGV0YWlscyc7XG5pbXBvcnQgeyBOb3ZvVGFibGVBY3Rpb25zRWxlbWVudCB9IGZyb20gJy4vdGFibGUtYWN0aW9ucy9UYWJsZUFjdGlvbnMnO1xuaW1wb3J0IHsgVGFibGVDZWxsIH0gZnJvbSAnLi90YWJsZS1jZWxsL1RhYmxlQ2VsbCc7XG5pbXBvcnQgeyBUYWJsZUZpbHRlciB9IGZyb20gJy4vdGFibGUtZmlsdGVyL1RhYmxlRmlsdGVyJztcbmltcG9ydCB7IE5vdm9UYWJsZUZvb3RlckVsZW1lbnQgfSBmcm9tICcuL3RhYmxlLWZvb3Rlci9UYWJsZUZvb3Rlcic7XG5pbXBvcnQgeyBOb3ZvVGFibGVIZWFkZXJFbGVtZW50IH0gZnJvbSAnLi90YWJsZS1oZWFkZXIvVGFibGVIZWFkZXInO1xuaW1wb3J0IHsgVGhPcmRlcmFibGUgfSBmcm9tICcuL3RoLW9yZGVyYWJsZS9UaE9yZGVyYWJsZSc7XG5pbXBvcnQgeyBUaFNvcnRhYmxlIH0gZnJvbSAnLi90aC1zb3J0YWJsZS9UaFNvcnRhYmxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIE5vdm9TZWxlY3RNb2R1bGUsIE5vdm9Ecm9wZG93bk1vZHVsZSwgTm92b0J1dHRvbk1vZHVsZSwgTm92b0NvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5vdm9UYWJsZUhlYWRlckVsZW1lbnQsXG4gICAgTm92b1RhYmxlRm9vdGVyRWxlbWVudCxcbiAgICBOb3ZvVGFibGVBY3Rpb25zRWxlbWVudCxcbiAgICBOb3ZvVGFibGVLZWVwRmlsdGVyRm9jdXMsXG4gICAgUGFnaW5hdGlvbixcbiAgICBSb3dEZXRhaWxzLFxuICAgIFRhYmxlQ2VsbCxcbiAgICBUYWJsZUZpbHRlcixcbiAgICBUaE9yZGVyYWJsZSxcbiAgICBUaFNvcnRhYmxlLFxuICAgIERhdGVDZWxsLFxuICAgIFBlcmNlbnRhZ2VDZWxsLFxuICAgIE5vdm9Ecm9wZG93bkNlbGwsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOb3ZvVGFibGVIZWFkZXJFbGVtZW50LFxuICAgIE5vdm9UYWJsZUZvb3RlckVsZW1lbnQsXG4gICAgTm92b1RhYmxlQWN0aW9uc0VsZW1lbnQsXG4gICAgTm92b1RhYmxlS2VlcEZpbHRlckZvY3VzLFxuICAgIFBhZ2luYXRpb24sXG4gICAgUm93RGV0YWlscyxcbiAgICBUYWJsZUNlbGwsXG4gICAgVGFibGVGaWx0ZXIsXG4gICAgVGhPcmRlcmFibGUsXG4gICAgVGhTb3J0YWJsZSxcbiAgICBEYXRlQ2VsbCxcbiAgICBQZXJjZW50YWdlQ2VsbCxcbiAgICBOb3ZvRHJvcGRvd25DZWxsLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVGFibGVFeHRyYXNNb2R1bGUge31cbiJdfQ==