// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// APP
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoCommonModule } from 'novo-elements/elements/common';
import { NovoDropdownModule } from 'novo-elements/elements/dropdown';
import { NovoSelectModule } from 'novo-elements/elements/select';
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
NovoTableExtrasModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTableExtrasModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoTableExtrasModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTableExtrasModule, declarations: [NovoTableHeaderElement,
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
        NovoDropdownCell], imports: [CommonModule, FormsModule, NovoSelectModule, NovoDropdownModule, NovoButtonModule, NovoCommonModule], exports: [NovoTableHeaderElement,
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
        NovoDropdownCell] });
NovoTableExtrasModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTableExtrasModule, imports: [[CommonModule, FormsModule, NovoSelectModule, NovoDropdownModule, NovoButtonModule, NovoCommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTableExtrasModule, decorators: [{
            type: NgModule,
            args: [{
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
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGVFeHRyYXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvdGFibGUvZXh0cmFzL1RhYmxlRXh0cmFzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE1BQU07QUFDTixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDL0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztBQW1DdEQsTUFBTSxPQUFPLHFCQUFxQjs7bUhBQXJCLHFCQUFxQjtvSEFBckIscUJBQXFCLGlCQTlCOUIsc0JBQXNCO1FBQ3RCLHNCQUFzQjtRQUN0Qix1QkFBdUI7UUFDdkIsd0JBQXdCO1FBQ3hCLFVBQVU7UUFDVixVQUFVO1FBQ1YsU0FBUztRQUNULFdBQVc7UUFDWCxXQUFXO1FBQ1gsVUFBVTtRQUNWLFFBQVE7UUFDUixjQUFjO1FBQ2QsZ0JBQWdCLGFBZFIsWUFBWSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsYUFpQjNHLHNCQUFzQjtRQUN0QixzQkFBc0I7UUFDdEIsdUJBQXVCO1FBQ3ZCLHdCQUF3QjtRQUN4QixVQUFVO1FBQ1YsVUFBVTtRQUNWLFNBQVM7UUFDVCxXQUFXO1FBQ1gsV0FBVztRQUNYLFVBQVU7UUFDVixRQUFRO1FBQ1IsY0FBYztRQUNkLGdCQUFnQjtvSEFHUCxxQkFBcUIsWUFoQ3ZCLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQzs0RkFnQ25HLHFCQUFxQjtrQkFqQ2pDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQztvQkFDOUcsWUFBWSxFQUFFO3dCQUNaLHNCQUFzQjt3QkFDdEIsc0JBQXNCO3dCQUN0Qix1QkFBdUI7d0JBQ3ZCLHdCQUF3Qjt3QkFDeEIsVUFBVTt3QkFDVixVQUFVO3dCQUNWLFNBQVM7d0JBQ1QsV0FBVzt3QkFDWCxXQUFXO3dCQUNYLFVBQVU7d0JBQ1YsUUFBUTt3QkFDUixjQUFjO3dCQUNkLGdCQUFnQjtxQkFDakI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLHNCQUFzQjt3QkFDdEIsc0JBQXNCO3dCQUN0Qix1QkFBdUI7d0JBQ3ZCLHdCQUF3Qjt3QkFDeEIsVUFBVTt3QkFDVixVQUFVO3dCQUNWLFNBQVM7d0JBQ1QsV0FBVzt3QkFDWCxXQUFXO3dCQUNYLFVBQVU7d0JBQ1YsUUFBUTt3QkFDUixjQUFjO3dCQUNkLGdCQUFnQjtxQkFDakI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9CdXR0b25Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2J1dHRvbic7XG5pbXBvcnQgeyBOb3ZvQ29tbW9uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9jb21tb24nO1xuaW1wb3J0IHsgTm92b0Ryb3Bkb3duTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9kcm9wZG93bic7XG5pbXBvcnQgeyBOb3ZvU2VsZWN0TW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9zZWxlY3QnO1xuaW1wb3J0IHsgRGF0ZUNlbGwgfSBmcm9tICcuL2RhdGUtY2VsbC9EYXRlQ2VsbCc7XG5pbXBvcnQgeyBOb3ZvRHJvcGRvd25DZWxsIH0gZnJvbSAnLi9kcm9wZG93bi1jZWxsL0Ryb3Bkb3duQ2VsbCc7XG5pbXBvcnQgeyBOb3ZvVGFibGVLZWVwRmlsdGVyRm9jdXMgfSBmcm9tICcuL2tlZXAtZmlsdGVyLWZvY3VzL0tlZXBGaWx0ZXJGb2N1cyc7XG5pbXBvcnQgeyBQYWdpbmF0aW9uIH0gZnJvbSAnLi9wYWdpbmF0aW9uL1BhZ2luYXRpb24nO1xuaW1wb3J0IHsgUGVyY2VudGFnZUNlbGwgfSBmcm9tICcuL3BlcmNlbnRhZ2UtY2VsbC9QZXJjZW50YWdlQ2VsbCc7XG5pbXBvcnQgeyBSb3dEZXRhaWxzIH0gZnJvbSAnLi9yb3ctZGV0YWlscy9Sb3dEZXRhaWxzJztcbmltcG9ydCB7IE5vdm9UYWJsZUFjdGlvbnNFbGVtZW50IH0gZnJvbSAnLi90YWJsZS1hY3Rpb25zL1RhYmxlQWN0aW9ucyc7XG5pbXBvcnQgeyBUYWJsZUNlbGwgfSBmcm9tICcuL3RhYmxlLWNlbGwvVGFibGVDZWxsJztcbmltcG9ydCB7IFRhYmxlRmlsdGVyIH0gZnJvbSAnLi90YWJsZS1maWx0ZXIvVGFibGVGaWx0ZXInO1xuaW1wb3J0IHsgTm92b1RhYmxlRm9vdGVyRWxlbWVudCB9IGZyb20gJy4vdGFibGUtZm9vdGVyL1RhYmxlRm9vdGVyJztcbmltcG9ydCB7IE5vdm9UYWJsZUhlYWRlckVsZW1lbnQgfSBmcm9tICcuL3RhYmxlLWhlYWRlci9UYWJsZUhlYWRlcic7XG5pbXBvcnQgeyBUaE9yZGVyYWJsZSB9IGZyb20gJy4vdGgtb3JkZXJhYmxlL1RoT3JkZXJhYmxlJztcbmltcG9ydCB7IFRoU29ydGFibGUgfSBmcm9tICcuL3RoLXNvcnRhYmxlL1RoU29ydGFibGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgTm92b1NlbGVjdE1vZHVsZSwgTm92b0Ryb3Bkb3duTW9kdWxlLCBOb3ZvQnV0dG9uTW9kdWxlLCBOb3ZvQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTm92b1RhYmxlSGVhZGVyRWxlbWVudCxcbiAgICBOb3ZvVGFibGVGb290ZXJFbGVtZW50LFxuICAgIE5vdm9UYWJsZUFjdGlvbnNFbGVtZW50LFxuICAgIE5vdm9UYWJsZUtlZXBGaWx0ZXJGb2N1cyxcbiAgICBQYWdpbmF0aW9uLFxuICAgIFJvd0RldGFpbHMsXG4gICAgVGFibGVDZWxsLFxuICAgIFRhYmxlRmlsdGVyLFxuICAgIFRoT3JkZXJhYmxlLFxuICAgIFRoU29ydGFibGUsXG4gICAgRGF0ZUNlbGwsXG4gICAgUGVyY2VudGFnZUNlbGwsXG4gICAgTm92b0Ryb3Bkb3duQ2VsbCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE5vdm9UYWJsZUhlYWRlckVsZW1lbnQsXG4gICAgTm92b1RhYmxlRm9vdGVyRWxlbWVudCxcbiAgICBOb3ZvVGFibGVBY3Rpb25zRWxlbWVudCxcbiAgICBOb3ZvVGFibGVLZWVwRmlsdGVyRm9jdXMsXG4gICAgUGFnaW5hdGlvbixcbiAgICBSb3dEZXRhaWxzLFxuICAgIFRhYmxlQ2VsbCxcbiAgICBUYWJsZUZpbHRlcixcbiAgICBUaE9yZGVyYWJsZSxcbiAgICBUaFNvcnRhYmxlLFxuICAgIERhdGVDZWxsLFxuICAgIFBlcmNlbnRhZ2VDZWxsLFxuICAgIE5vdm9Ecm9wZG93bkNlbGwsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9UYWJsZUV4dHJhc01vZHVsZSB7fVxuIl19