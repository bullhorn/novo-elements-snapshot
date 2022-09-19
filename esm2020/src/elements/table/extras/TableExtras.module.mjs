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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGVFeHRyYXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvdGFibGUvZXh0cmFzL1RhYmxlRXh0cmFzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzlELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE1BQU07QUFDTixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDL0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztBQW1DdEQsTUFBTSxPQUFPLHFCQUFxQjs7bUhBQXJCLHFCQUFxQjtvSEFBckIscUJBQXFCLGlCQTlCOUIsc0JBQXNCO1FBQ3RCLHNCQUFzQjtRQUN0Qix1QkFBdUI7UUFDdkIsd0JBQXdCO1FBQ3hCLFVBQVU7UUFDVixVQUFVO1FBQ1YsU0FBUztRQUNULFdBQVc7UUFDWCxXQUFXO1FBQ1gsVUFBVTtRQUNWLFFBQVE7UUFDUixjQUFjO1FBQ2QsZ0JBQWdCLGFBZFIsWUFBWSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsYUFpQjNHLHNCQUFzQjtRQUN0QixzQkFBc0I7UUFDdEIsdUJBQXVCO1FBQ3ZCLHdCQUF3QjtRQUN4QixVQUFVO1FBQ1YsVUFBVTtRQUNWLFNBQVM7UUFDVCxXQUFXO1FBQ1gsV0FBVztRQUNYLFVBQVU7UUFDVixRQUFRO1FBQ1IsY0FBYztRQUNkLGdCQUFnQjtvSEFHUCxxQkFBcUIsWUFoQ3ZCLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQzs0RkFnQ25HLHFCQUFxQjtrQkFqQ2pDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQztvQkFDOUcsWUFBWSxFQUFFO3dCQUNaLHNCQUFzQjt3QkFDdEIsc0JBQXNCO3dCQUN0Qix1QkFBdUI7d0JBQ3ZCLHdCQUF3Qjt3QkFDeEIsVUFBVTt3QkFDVixVQUFVO3dCQUNWLFNBQVM7d0JBQ1QsV0FBVzt3QkFDWCxXQUFXO3dCQUNYLFVBQVU7d0JBQ1YsUUFBUTt3QkFDUixjQUFjO3dCQUNkLGdCQUFnQjtxQkFDakI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLHNCQUFzQjt3QkFDdEIsc0JBQXNCO3dCQUN0Qix1QkFBdUI7d0JBQ3ZCLHdCQUF3Qjt3QkFDeEIsVUFBVTt3QkFDVixVQUFVO3dCQUNWLFNBQVM7d0JBQ1QsV0FBVzt3QkFDWCxXQUFXO3dCQUNYLFVBQVU7d0JBQ1YsUUFBUTt3QkFDUixjQUFjO3dCQUNkLGdCQUFnQjtxQkFDakI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vLi4vYnV0dG9uL0J1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0NvbW1vbk1vZHVsZSB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb21tb24ubW9kdWxlJztcbmltcG9ydCB7IE5vdm9Ecm9wZG93bk1vZHVsZSB9IGZyb20gJy4uLy4uL2Ryb3Bkb3duL0Ryb3Bkb3duLm1vZHVsZSc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9TZWxlY3RNb2R1bGUgfSBmcm9tICcuLi8uLi9zZWxlY3QvU2VsZWN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBEYXRlQ2VsbCB9IGZyb20gJy4vZGF0ZS1jZWxsL0RhdGVDZWxsJztcbmltcG9ydCB7IE5vdm9Ecm9wZG93bkNlbGwgfSBmcm9tICcuL2Ryb3Bkb3duLWNlbGwvRHJvcGRvd25DZWxsJztcbmltcG9ydCB7IE5vdm9UYWJsZUtlZXBGaWx0ZXJGb2N1cyB9IGZyb20gJy4va2VlcC1maWx0ZXItZm9jdXMvS2VlcEZpbHRlckZvY3VzJztcbmltcG9ydCB7IFBhZ2luYXRpb24gfSBmcm9tICcuL3BhZ2luYXRpb24vUGFnaW5hdGlvbic7XG5pbXBvcnQgeyBQZXJjZW50YWdlQ2VsbCB9IGZyb20gJy4vcGVyY2VudGFnZS1jZWxsL1BlcmNlbnRhZ2VDZWxsJztcbmltcG9ydCB7IFJvd0RldGFpbHMgfSBmcm9tICcuL3Jvdy1kZXRhaWxzL1Jvd0RldGFpbHMnO1xuaW1wb3J0IHsgTm92b1RhYmxlQWN0aW9uc0VsZW1lbnQgfSBmcm9tICcuL3RhYmxlLWFjdGlvbnMvVGFibGVBY3Rpb25zJztcbmltcG9ydCB7IFRhYmxlQ2VsbCB9IGZyb20gJy4vdGFibGUtY2VsbC9UYWJsZUNlbGwnO1xuaW1wb3J0IHsgVGFibGVGaWx0ZXIgfSBmcm9tICcuL3RhYmxlLWZpbHRlci9UYWJsZUZpbHRlcic7XG5pbXBvcnQgeyBOb3ZvVGFibGVGb290ZXJFbGVtZW50IH0gZnJvbSAnLi90YWJsZS1mb290ZXIvVGFibGVGb290ZXInO1xuaW1wb3J0IHsgTm92b1RhYmxlSGVhZGVyRWxlbWVudCB9IGZyb20gJy4vdGFibGUtaGVhZGVyL1RhYmxlSGVhZGVyJztcbmltcG9ydCB7IFRoT3JkZXJhYmxlIH0gZnJvbSAnLi90aC1vcmRlcmFibGUvVGhPcmRlcmFibGUnO1xuaW1wb3J0IHsgVGhTb3J0YWJsZSB9IGZyb20gJy4vdGgtc29ydGFibGUvVGhTb3J0YWJsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBOb3ZvU2VsZWN0TW9kdWxlLCBOb3ZvRHJvcGRvd25Nb2R1bGUsIE5vdm9CdXR0b25Nb2R1bGUsIE5vdm9Db21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOb3ZvVGFibGVIZWFkZXJFbGVtZW50LFxuICAgIE5vdm9UYWJsZUZvb3RlckVsZW1lbnQsXG4gICAgTm92b1RhYmxlQWN0aW9uc0VsZW1lbnQsXG4gICAgTm92b1RhYmxlS2VlcEZpbHRlckZvY3VzLFxuICAgIFBhZ2luYXRpb24sXG4gICAgUm93RGV0YWlscyxcbiAgICBUYWJsZUNlbGwsXG4gICAgVGFibGVGaWx0ZXIsXG4gICAgVGhPcmRlcmFibGUsXG4gICAgVGhTb3J0YWJsZSxcbiAgICBEYXRlQ2VsbCxcbiAgICBQZXJjZW50YWdlQ2VsbCxcbiAgICBOb3ZvRHJvcGRvd25DZWxsLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTm92b1RhYmxlSGVhZGVyRWxlbWVudCxcbiAgICBOb3ZvVGFibGVGb290ZXJFbGVtZW50LFxuICAgIE5vdm9UYWJsZUFjdGlvbnNFbGVtZW50LFxuICAgIE5vdm9UYWJsZUtlZXBGaWx0ZXJGb2N1cyxcbiAgICBQYWdpbmF0aW9uLFxuICAgIFJvd0RldGFpbHMsXG4gICAgVGFibGVDZWxsLFxuICAgIFRhYmxlRmlsdGVyLFxuICAgIFRoT3JkZXJhYmxlLFxuICAgIFRoU29ydGFibGUsXG4gICAgRGF0ZUNlbGwsXG4gICAgUGVyY2VudGFnZUNlbGwsXG4gICAgTm92b0Ryb3Bkb3duQ2VsbCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1RhYmxlRXh0cmFzTW9kdWxlIHt9XG4iXX0=