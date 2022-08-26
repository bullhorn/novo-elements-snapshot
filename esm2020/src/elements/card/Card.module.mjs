// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoButtonModule } from '../button/Button.module';
import { NovoIconModule } from '../icon';
// APP
import { NovoLoadingModule } from '../loading/Loading.module';
import { NovoTooltipModule } from '../tooltip/Tooltip.module';
import { CardActionsElement, CardContentElement, CardElement, CardFooterElement, CardHeaderElement } from './Card';
import * as i0 from "@angular/core";
export class NovoCardModule {
}
NovoCardModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoCardModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCardModule, declarations: [CardElement, CardActionsElement, CardContentElement, CardHeaderElement, CardFooterElement], imports: [CommonModule, NovoIconModule, NovoButtonModule, NovoLoadingModule, NovoTooltipModule], exports: [CardElement, CardActionsElement, CardContentElement, CardHeaderElement, CardFooterElement] });
NovoCardModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCardModule, imports: [[CommonModule, NovoIconModule, NovoButtonModule, NovoLoadingModule, NovoTooltipModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCardModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoIconModule, NovoButtonModule, NovoLoadingModule, NovoTooltipModule],
                    declarations: [CardElement, CardActionsElement, CardContentElement, CardHeaderElement, CardFooterElement],
                    exports: [CardElement, CardActionsElement, CardContentElement, CardHeaderElement, CardFooterElement],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FyZC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9jYXJkL0NhcmQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3pDLE1BQU07QUFDTixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sUUFBUSxDQUFDOztBQU9uSCxNQUFNLE9BQU8sY0FBYzs7NEdBQWQsY0FBYzs2R0FBZCxjQUFjLGlCQUhWLFdBQVcsRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsYUFEOUYsWUFBWSxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsYUFFcEYsV0FBVyxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLGlCQUFpQixFQUFFLGlCQUFpQjs2R0FFeEYsY0FBYyxZQUpoQixDQUFDLFlBQVksRUFBRSxjQUFjLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUM7NEZBSXBGLGNBQWM7a0JBTDFCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQztvQkFDL0YsWUFBWSxFQUFFLENBQUMsV0FBVyxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixDQUFDO29CQUN6RyxPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUM7aUJBQ3JHIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9CdXR0b25Nb2R1bGUgfSBmcm9tICcuLi9idXR0b24vQnV0dG9uLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvSWNvbk1vZHVsZSB9IGZyb20gJy4uL2ljb24nO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvTG9hZGluZ01vZHVsZSB9IGZyb20gJy4uL2xvYWRpbmcvTG9hZGluZy5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1Rvb2x0aXBNb2R1bGUgfSBmcm9tICcuLi90b29sdGlwL1Rvb2x0aXAubW9kdWxlJztcbmltcG9ydCB7IENhcmRBY3Rpb25zRWxlbWVudCwgQ2FyZENvbnRlbnRFbGVtZW50LCBDYXJkRWxlbWVudCwgQ2FyZEZvb3RlckVsZW1lbnQsIENhcmRIZWFkZXJFbGVtZW50IH0gZnJvbSAnLi9DYXJkJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTm92b0ljb25Nb2R1bGUsIE5vdm9CdXR0b25Nb2R1bGUsIE5vdm9Mb2FkaW5nTW9kdWxlLCBOb3ZvVG9vbHRpcE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0NhcmRFbGVtZW50LCBDYXJkQWN0aW9uc0VsZW1lbnQsIENhcmRDb250ZW50RWxlbWVudCwgQ2FyZEhlYWRlckVsZW1lbnQsIENhcmRGb290ZXJFbGVtZW50XSxcbiAgZXhwb3J0czogW0NhcmRFbGVtZW50LCBDYXJkQWN0aW9uc0VsZW1lbnQsIENhcmRDb250ZW50RWxlbWVudCwgQ2FyZEhlYWRlckVsZW1lbnQsIENhcmRGb290ZXJFbGVtZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0NhcmRNb2R1bGUge31cbiJdfQ==