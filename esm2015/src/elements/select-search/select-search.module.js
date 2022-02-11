import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NovoButtonModule } from '../button';
import { NovoCheckboxModule } from '../checkbox';
import { NovoCommonModule } from '../common';
import { NovoIconModule } from '../icon';
import { NovoLoadingModule } from '../loading';
import { NovoTooltipModule } from '../tooltip';
import { NovoSelectSearchClearDirective } from './select-search-clear.directive';
import { NovoSelectSearchComponent } from './select-search.component';
// export const NovoSelectSearchVersion = '3.3.0';
export class NovoSelectSearchModule {
}
NovoSelectSearchModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    NovoCheckboxModule,
                    NovoButtonModule,
                    NovoCommonModule,
                    NovoIconModule,
                    NovoLoadingModule,
                    NovoTooltipModule,
                ],
                declarations: [NovoSelectSearchComponent, NovoSelectSearchClearDirective],
                exports: [NovoSelectSearchComponent, NovoSelectSearchClearDirective],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXNlYXJjaC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvc2VsZWN0LXNlYXJjaC9zZWxlY3Qtc2VhcmNoLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDN0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM3QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDL0MsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDakYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFdEUsa0RBQWtEO0FBZ0JsRCxNQUFNLE9BQU8sc0JBQXNCOzs7WUFkbEMsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLG1CQUFtQjtvQkFDbkIsa0JBQWtCO29CQUNsQixnQkFBZ0I7b0JBQ2hCLGdCQUFnQjtvQkFDaEIsY0FBYztvQkFDZCxpQkFBaUI7b0JBQ2pCLGlCQUFpQjtpQkFDbEI7Z0JBQ0QsWUFBWSxFQUFFLENBQUMseUJBQXlCLEVBQUUsOEJBQThCLENBQUM7Z0JBQ3pFLE9BQU8sRUFBRSxDQUFDLHlCQUF5QixFQUFFLDhCQUE4QixDQUFDO2FBQ3JFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTm92b0J1dHRvbk1vZHVsZSB9IGZyb20gJy4uL2J1dHRvbic7XG5pbXBvcnQgeyBOb3ZvQ2hlY2tib3hNb2R1bGUgfSBmcm9tICcuLi9jaGVja2JveCc7XG5pbXBvcnQgeyBOb3ZvQ29tbW9uTW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCB7IE5vdm9JY29uTW9kdWxlIH0gZnJvbSAnLi4vaWNvbic7XG5pbXBvcnQgeyBOb3ZvTG9hZGluZ01vZHVsZSB9IGZyb20gJy4uL2xvYWRpbmcnO1xuaW1wb3J0IHsgTm92b1Rvb2x0aXBNb2R1bGUgfSBmcm9tICcuLi90b29sdGlwJztcbmltcG9ydCB7IE5vdm9TZWxlY3RTZWFyY2hDbGVhckRpcmVjdGl2ZSB9IGZyb20gJy4vc2VsZWN0LXNlYXJjaC1jbGVhci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTm92b1NlbGVjdFNlYXJjaENvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LXNlYXJjaC5jb21wb25lbnQnO1xuXG4vLyBleHBvcnQgY29uc3QgTm92b1NlbGVjdFNlYXJjaFZlcnNpb24gPSAnMy4zLjAnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgTm92b0NoZWNrYm94TW9kdWxlLFxuICAgIE5vdm9CdXR0b25Nb2R1bGUsXG4gICAgTm92b0NvbW1vbk1vZHVsZSxcbiAgICBOb3ZvSWNvbk1vZHVsZSxcbiAgICBOb3ZvTG9hZGluZ01vZHVsZSxcbiAgICBOb3ZvVG9vbHRpcE1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbTm92b1NlbGVjdFNlYXJjaENvbXBvbmVudCwgTm92b1NlbGVjdFNlYXJjaENsZWFyRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW05vdm9TZWxlY3RTZWFyY2hDb21wb25lbnQsIE5vdm9TZWxlY3RTZWFyY2hDbGVhckRpcmVjdGl2ZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TZWxlY3RTZWFyY2hNb2R1bGUge31cbiJdfQ==