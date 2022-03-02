// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoButtonModule } from '../button/Button.module';
import { NovoIconModule } from '../icon';
// APP
import { NovoLoadingModule } from '../loading/Loading.module';
import { NovoTooltipModule } from '../tooltip/Tooltip.module';
import { CardActionsElement, CardContentElement, CardElement, CardFooterElement, CardHeaderElement } from './Card';
export class NovoCardModule {
}
NovoCardModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, NovoIconModule, NovoButtonModule, NovoLoadingModule, NovoTooltipModule],
                declarations: [CardElement, CardActionsElement, CardContentElement, CardHeaderElement, CardFooterElement],
                exports: [CardElement, CardActionsElement, CardContentElement, CardHeaderElement, CardFooterElement],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FyZC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvY2FyZC9DYXJkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUN6QyxNQUFNO0FBQ04sT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQU9uSCxNQUFNLE9BQU8sY0FBYzs7O1lBTDFCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixDQUFDO2dCQUMvRixZQUFZLEVBQUUsQ0FBQyxXQUFXLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUM7Z0JBQ3pHLE9BQU8sRUFBRSxDQUFDLFdBQVcsRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQzthQUNyRyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vYnV0dG9uL0J1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0ljb25Nb2R1bGUgfSBmcm9tICcuLi9pY29uJztcbi8vIEFQUFxuaW1wb3J0IHsgTm92b0xvYWRpbmdNb2R1bGUgfSBmcm9tICcuLi9sb2FkaW5nL0xvYWRpbmcubW9kdWxlJztcbmltcG9ydCB7IE5vdm9Ub29sdGlwTW9kdWxlIH0gZnJvbSAnLi4vdG9vbHRpcC9Ub29sdGlwLm1vZHVsZSc7XG5pbXBvcnQgeyBDYXJkQWN0aW9uc0VsZW1lbnQsIENhcmRDb250ZW50RWxlbWVudCwgQ2FyZEVsZW1lbnQsIENhcmRGb290ZXJFbGVtZW50LCBDYXJkSGVhZGVyRWxlbWVudCB9IGZyb20gJy4vQ2FyZCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE5vdm9JY29uTW9kdWxlLCBOb3ZvQnV0dG9uTW9kdWxlLCBOb3ZvTG9hZGluZ01vZHVsZSwgTm92b1Rvb2x0aXBNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtDYXJkRWxlbWVudCwgQ2FyZEFjdGlvbnNFbGVtZW50LCBDYXJkQ29udGVudEVsZW1lbnQsIENhcmRIZWFkZXJFbGVtZW50LCBDYXJkRm9vdGVyRWxlbWVudF0sXG4gIGV4cG9ydHM6IFtDYXJkRWxlbWVudCwgQ2FyZEFjdGlvbnNFbGVtZW50LCBDYXJkQ29udGVudEVsZW1lbnQsIENhcmRIZWFkZXJFbGVtZW50LCBDYXJkRm9vdGVyRWxlbWVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9DYXJkTW9kdWxlIHt9XG4iXX0=