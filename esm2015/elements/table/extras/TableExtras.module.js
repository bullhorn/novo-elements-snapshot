// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoButtonModule } from '../../button/Button.module';
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
import * as i0 from "@angular/core";
export class NovoTableExtrasModule {
}
NovoTableExtrasModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoTableExtrasModule });
NovoTableExtrasModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoTableExtrasModule_Factory(t) { return new (t || NovoTableExtrasModule)(); }, imports: [[CommonModule, FormsModule, NovoSelectModule, NovoDropdownModule, NovoButtonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoTableExtrasModule, { declarations: [NovoTableHeaderElement,
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
        NovoDropdownCell], imports: [CommonModule, FormsModule, NovoSelectModule, NovoDropdownModule, NovoButtonModule], exports: [NovoTableHeaderElement,
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
        NovoDropdownCell] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoTableExtrasModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, FormsModule, NovoSelectModule, NovoDropdownModule, NovoButtonModule],
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
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGVFeHRyYXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3RhYmxlL2V4dHJhcy9UYWJsZUV4dHJhcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDbEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3RELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7QUFtQ3RELE1BQU0sT0FBTyxxQkFBcUI7O3lEQUFyQixxQkFBcUI7eUhBQXJCLHFCQUFxQixrQkFoQ3ZCLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsQ0FBQzt3RkFnQ2pGLHFCQUFxQixtQkE5QjlCLHNCQUFzQjtRQUN0QixzQkFBc0I7UUFDdEIsdUJBQXVCO1FBQ3ZCLHdCQUF3QjtRQUN4QixVQUFVO1FBQ1YsVUFBVTtRQUNWLFNBQVM7UUFDVCxXQUFXO1FBQ1gsV0FBVztRQUNYLFVBQVU7UUFDVixRQUFRO1FBQ1IsY0FBYztRQUNkLGdCQUFnQixhQWRSLFlBQVksRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLGFBaUJ6RixzQkFBc0I7UUFDdEIsc0JBQXNCO1FBQ3RCLHVCQUF1QjtRQUN2Qix3QkFBd0I7UUFDeEIsVUFBVTtRQUNWLFVBQVU7UUFDVixTQUFTO1FBQ1QsV0FBVztRQUNYLFdBQVc7UUFDWCxVQUFVO1FBQ1YsUUFBUTtRQUNSLGNBQWM7UUFDZCxnQkFBZ0I7a0RBR1AscUJBQXFCO2NBakNqQyxRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsQ0FBQztnQkFDNUYsWUFBWSxFQUFFO29CQUNaLHNCQUFzQjtvQkFDdEIsc0JBQXNCO29CQUN0Qix1QkFBdUI7b0JBQ3ZCLHdCQUF3QjtvQkFDeEIsVUFBVTtvQkFDVixVQUFVO29CQUNWLFNBQVM7b0JBQ1QsV0FBVztvQkFDWCxXQUFXO29CQUNYLFVBQVU7b0JBQ1YsUUFBUTtvQkFDUixjQUFjO29CQUNkLGdCQUFnQjtpQkFDakI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLHNCQUFzQjtvQkFDdEIsc0JBQXNCO29CQUN0Qix1QkFBdUI7b0JBQ3ZCLHdCQUF3QjtvQkFDeEIsVUFBVTtvQkFDVixVQUFVO29CQUNWLFNBQVM7b0JBQ1QsV0FBVztvQkFDWCxXQUFXO29CQUNYLFVBQVU7b0JBQ1YsUUFBUTtvQkFDUixjQUFjO29CQUNkLGdCQUFnQjtpQkFDakI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5vdm9CdXR0b25Nb2R1bGUgfSBmcm9tICcuLi8uLi9idXR0b24vQnV0dG9uLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvRHJvcGRvd25Nb2R1bGUgfSBmcm9tICcuLi8uLi9kcm9wZG93bi9Ecm9wZG93bi5tb2R1bGUnO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvU2VsZWN0TW9kdWxlIH0gZnJvbSAnLi4vLi4vc2VsZWN0L1NlbGVjdC5tb2R1bGUnO1xuaW1wb3J0IHsgRGF0ZUNlbGwgfSBmcm9tICcuL2RhdGUtY2VsbC9EYXRlQ2VsbCc7XG5pbXBvcnQgeyBOb3ZvRHJvcGRvd25DZWxsIH0gZnJvbSAnLi9kcm9wZG93bi1jZWxsL0Ryb3Bkb3duQ2VsbCc7XG5pbXBvcnQgeyBOb3ZvVGFibGVLZWVwRmlsdGVyRm9jdXMgfSBmcm9tICcuL2tlZXAtZmlsdGVyLWZvY3VzL0tlZXBGaWx0ZXJGb2N1cyc7XG5pbXBvcnQgeyBQYWdpbmF0aW9uIH0gZnJvbSAnLi9wYWdpbmF0aW9uL1BhZ2luYXRpb24nO1xuaW1wb3J0IHsgUGVyY2VudGFnZUNlbGwgfSBmcm9tICcuL3BlcmNlbnRhZ2UtY2VsbC9QZXJjZW50YWdlQ2VsbCc7XG5pbXBvcnQgeyBSb3dEZXRhaWxzIH0gZnJvbSAnLi9yb3ctZGV0YWlscy9Sb3dEZXRhaWxzJztcbmltcG9ydCB7IE5vdm9UYWJsZUFjdGlvbnNFbGVtZW50IH0gZnJvbSAnLi90YWJsZS1hY3Rpb25zL1RhYmxlQWN0aW9ucyc7XG5pbXBvcnQgeyBUYWJsZUNlbGwgfSBmcm9tICcuL3RhYmxlLWNlbGwvVGFibGVDZWxsJztcbmltcG9ydCB7IFRhYmxlRmlsdGVyIH0gZnJvbSAnLi90YWJsZS1maWx0ZXIvVGFibGVGaWx0ZXInO1xuaW1wb3J0IHsgTm92b1RhYmxlRm9vdGVyRWxlbWVudCB9IGZyb20gJy4vdGFibGUtZm9vdGVyL1RhYmxlRm9vdGVyJztcbmltcG9ydCB7IE5vdm9UYWJsZUhlYWRlckVsZW1lbnQgfSBmcm9tICcuL3RhYmxlLWhlYWRlci9UYWJsZUhlYWRlcic7XG5pbXBvcnQgeyBUaE9yZGVyYWJsZSB9IGZyb20gJy4vdGgtb3JkZXJhYmxlL1RoT3JkZXJhYmxlJztcbmltcG9ydCB7IFRoU29ydGFibGUgfSBmcm9tICcuL3RoLXNvcnRhYmxlL1RoU29ydGFibGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgTm92b1NlbGVjdE1vZHVsZSwgTm92b0Ryb3Bkb3duTW9kdWxlLCBOb3ZvQnV0dG9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTm92b1RhYmxlSGVhZGVyRWxlbWVudCxcbiAgICBOb3ZvVGFibGVGb290ZXJFbGVtZW50LFxuICAgIE5vdm9UYWJsZUFjdGlvbnNFbGVtZW50LFxuICAgIE5vdm9UYWJsZUtlZXBGaWx0ZXJGb2N1cyxcbiAgICBQYWdpbmF0aW9uLFxuICAgIFJvd0RldGFpbHMsXG4gICAgVGFibGVDZWxsLFxuICAgIFRhYmxlRmlsdGVyLFxuICAgIFRoT3JkZXJhYmxlLFxuICAgIFRoU29ydGFibGUsXG4gICAgRGF0ZUNlbGwsXG4gICAgUGVyY2VudGFnZUNlbGwsXG4gICAgTm92b0Ryb3Bkb3duQ2VsbCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE5vdm9UYWJsZUhlYWRlckVsZW1lbnQsXG4gICAgTm92b1RhYmxlRm9vdGVyRWxlbWVudCxcbiAgICBOb3ZvVGFibGVBY3Rpb25zRWxlbWVudCxcbiAgICBOb3ZvVGFibGVLZWVwRmlsdGVyRm9jdXMsXG4gICAgUGFnaW5hdGlvbixcbiAgICBSb3dEZXRhaWxzLFxuICAgIFRhYmxlQ2VsbCxcbiAgICBUYWJsZUZpbHRlcixcbiAgICBUaE9yZGVyYWJsZSxcbiAgICBUaFNvcnRhYmxlLFxuICAgIERhdGVDZWxsLFxuICAgIFBlcmNlbnRhZ2VDZWxsLFxuICAgIE5vdm9Ecm9wZG93bkNlbGwsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9UYWJsZUV4dHJhc01vZHVsZSB7fVxuIl19