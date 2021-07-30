// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// APP
import { NovoSelectModule } from '../../select/Select.module';
import { NovoDropdownModule } from '../../dropdown/Dropdown.module';
import { NovoButtonModule } from '../../button/Button.module';
import { Pagination } from './pagination/Pagination';
import { RowDetails } from './row-details/RowDetails';
import { TableCell } from './table-cell/TableCell';
import { TableFilter } from './table-filter/TableFilter';
import { ThOrderable } from './th-orderable/ThOrderable';
import { ThSortable } from './th-sortable/ThSortable';
import { DateCell } from './date-cell/DateCell';
import { PercentageCell } from './percentage-cell/PercentageCell';
import { NovoDropdownCell } from './dropdown-cell/DropdownCell';
import { NovoTableKeepFilterFocus } from './keep-filter-focus/KeepFilterFocus';
import { NovoTableActionsElement } from './table-actions/TableActions';
import { NovoTableFooterElement } from './table-footer/TableFooter';
import { NovoTableHeaderElement } from './table-header/TableHeader';
export class NovoTableExtrasModule {
}
NovoTableExtrasModule.decorators = [
    { type: NgModule, args: [{
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGVFeHRyYXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy90YWJsZS9leHRyYXMvVGFibGVFeHRyYXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsTUFBTTtBQUNOLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzlELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDL0UsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFtQ3BFLE1BQU0sT0FBTyxxQkFBcUI7OztZQWpDakMsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLENBQUM7Z0JBQzVGLFlBQVksRUFBRTtvQkFDWixzQkFBc0I7b0JBQ3RCLHNCQUFzQjtvQkFDdEIsdUJBQXVCO29CQUN2Qix3QkFBd0I7b0JBQ3hCLFVBQVU7b0JBQ1YsVUFBVTtvQkFDVixTQUFTO29CQUNULFdBQVc7b0JBQ1gsV0FBVztvQkFDWCxVQUFVO29CQUNWLFFBQVE7b0JBQ1IsY0FBYztvQkFDZCxnQkFBZ0I7aUJBQ2pCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxzQkFBc0I7b0JBQ3RCLHNCQUFzQjtvQkFDdEIsdUJBQXVCO29CQUN2Qix3QkFBd0I7b0JBQ3hCLFVBQVU7b0JBQ1YsVUFBVTtvQkFDVixTQUFTO29CQUNULFdBQVc7b0JBQ1gsV0FBVztvQkFDWCxVQUFVO29CQUNWLFFBQVE7b0JBQ1IsY0FBYztvQkFDZCxnQkFBZ0I7aUJBQ2pCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbi8vIEFQUFxyXG5pbXBvcnQgeyBOb3ZvU2VsZWN0TW9kdWxlIH0gZnJvbSAnLi4vLi4vc2VsZWN0L1NlbGVjdC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvRHJvcGRvd25Nb2R1bGUgfSBmcm9tICcuLi8uLi9kcm9wZG93bi9Ecm9wZG93bi5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vLi4vYnV0dG9uL0J1dHRvbi5tb2R1bGUnO1xyXG5pbXBvcnQgeyBQYWdpbmF0aW9uIH0gZnJvbSAnLi9wYWdpbmF0aW9uL1BhZ2luYXRpb24nO1xyXG5pbXBvcnQgeyBSb3dEZXRhaWxzIH0gZnJvbSAnLi9yb3ctZGV0YWlscy9Sb3dEZXRhaWxzJztcclxuaW1wb3J0IHsgVGFibGVDZWxsIH0gZnJvbSAnLi90YWJsZS1jZWxsL1RhYmxlQ2VsbCc7XHJcbmltcG9ydCB7IFRhYmxlRmlsdGVyIH0gZnJvbSAnLi90YWJsZS1maWx0ZXIvVGFibGVGaWx0ZXInO1xyXG5pbXBvcnQgeyBUaE9yZGVyYWJsZSB9IGZyb20gJy4vdGgtb3JkZXJhYmxlL1RoT3JkZXJhYmxlJztcclxuaW1wb3J0IHsgVGhTb3J0YWJsZSB9IGZyb20gJy4vdGgtc29ydGFibGUvVGhTb3J0YWJsZSc7XHJcbmltcG9ydCB7IERhdGVDZWxsIH0gZnJvbSAnLi9kYXRlLWNlbGwvRGF0ZUNlbGwnO1xyXG5pbXBvcnQgeyBQZXJjZW50YWdlQ2VsbCB9IGZyb20gJy4vcGVyY2VudGFnZS1jZWxsL1BlcmNlbnRhZ2VDZWxsJztcclxuaW1wb3J0IHsgTm92b0Ryb3Bkb3duQ2VsbCB9IGZyb20gJy4vZHJvcGRvd24tY2VsbC9Ecm9wZG93bkNlbGwnO1xyXG5pbXBvcnQgeyBOb3ZvVGFibGVLZWVwRmlsdGVyRm9jdXMgfSBmcm9tICcuL2tlZXAtZmlsdGVyLWZvY3VzL0tlZXBGaWx0ZXJGb2N1cyc7XHJcbmltcG9ydCB7IE5vdm9UYWJsZUFjdGlvbnNFbGVtZW50IH0gZnJvbSAnLi90YWJsZS1hY3Rpb25zL1RhYmxlQWN0aW9ucyc7XHJcbmltcG9ydCB7IE5vdm9UYWJsZUZvb3RlckVsZW1lbnQgfSBmcm9tICcuL3RhYmxlLWZvb3Rlci9UYWJsZUZvb3Rlcic7XHJcbmltcG9ydCB7IE5vdm9UYWJsZUhlYWRlckVsZW1lbnQgfSBmcm9tICcuL3RhYmxlLWhlYWRlci9UYWJsZUhlYWRlcic7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBOb3ZvU2VsZWN0TW9kdWxlLCBOb3ZvRHJvcGRvd25Nb2R1bGUsIE5vdm9CdXR0b25Nb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgTm92b1RhYmxlSGVhZGVyRWxlbWVudCxcclxuICAgIE5vdm9UYWJsZUZvb3RlckVsZW1lbnQsXHJcbiAgICBOb3ZvVGFibGVBY3Rpb25zRWxlbWVudCxcclxuICAgIE5vdm9UYWJsZUtlZXBGaWx0ZXJGb2N1cyxcclxuICAgIFBhZ2luYXRpb24sXHJcbiAgICBSb3dEZXRhaWxzLFxyXG4gICAgVGFibGVDZWxsLFxyXG4gICAgVGFibGVGaWx0ZXIsXHJcbiAgICBUaE9yZGVyYWJsZSxcclxuICAgIFRoU29ydGFibGUsXHJcbiAgICBEYXRlQ2VsbCxcclxuICAgIFBlcmNlbnRhZ2VDZWxsLFxyXG4gICAgTm92b0Ryb3Bkb3duQ2VsbCxcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIE5vdm9UYWJsZUhlYWRlckVsZW1lbnQsXHJcbiAgICBOb3ZvVGFibGVGb290ZXJFbGVtZW50LFxyXG4gICAgTm92b1RhYmxlQWN0aW9uc0VsZW1lbnQsXHJcbiAgICBOb3ZvVGFibGVLZWVwRmlsdGVyRm9jdXMsXHJcbiAgICBQYWdpbmF0aW9uLFxyXG4gICAgUm93RGV0YWlscyxcclxuICAgIFRhYmxlQ2VsbCxcclxuICAgIFRhYmxlRmlsdGVyLFxyXG4gICAgVGhPcmRlcmFibGUsXHJcbiAgICBUaFNvcnRhYmxlLFxyXG4gICAgRGF0ZUNlbGwsXHJcbiAgICBQZXJjZW50YWdlQ2VsbCxcclxuICAgIE5vdm9Ecm9wZG93bkNlbGwsXHJcbiAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9UYWJsZUV4dHJhc01vZHVsZSB7IH1cclxuIl19