// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
// APP
import { NovoTabbedGroupPickerElement } from './TabbedGroupPicker';
import { NovoTabModule } from '../tabs/Tabs.module';
import { NovoListModule } from '../list/List.module';
import { NovoFormExtrasModule } from '../form/extras/FormExtras.module';
import { NovoButtonModule } from '../button/Button.module';
import { NovoDropdownModule } from '../dropdown/Dropdown.module';
import { NovoLabelService } from '../../services/novo-label-service';
export class NovoTabbedGroupPickerModule {
}
NovoTabbedGroupPickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ScrollingModule,
                    NovoTabModule,
                    NovoListModule,
                    NovoFormExtrasModule,
                    NovoButtonModule,
                    NovoDropdownModule,
                ],
                providers: [NovoLabelService],
                declarations: [NovoTabbedGroupPickerElement],
                exports: [NovoTabbedGroupPickerElement],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFiYmVkR3JvdXBQaWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy90YWJiZWQtZ3JvdXAtcGlja2VyL1RhYmJlZEdyb3VwUGlja2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxNQUFNO0FBQ04sT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQWlCckUsTUFBTSxPQUFPLDJCQUEyQjs7O1lBZnZDLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixXQUFXO29CQUNYLGVBQWU7b0JBQ2YsYUFBYTtvQkFDYixjQUFjO29CQUNkLG9CQUFvQjtvQkFDcEIsZ0JBQWdCO29CQUNoQixrQkFBa0I7aUJBQ25CO2dCQUNELFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO2dCQUM3QixZQUFZLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztnQkFDNUMsT0FBTyxFQUFFLENBQUMsNEJBQTRCLENBQUM7YUFDeEMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFNjcm9sbGluZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xyXG4vLyBBUFBcclxuaW1wb3J0IHsgTm92b1RhYmJlZEdyb3VwUGlja2VyRWxlbWVudCB9IGZyb20gJy4vVGFiYmVkR3JvdXBQaWNrZXInO1xyXG5pbXBvcnQgeyBOb3ZvVGFiTW9kdWxlIH0gZnJvbSAnLi4vdGFicy9UYWJzLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9MaXN0TW9kdWxlIH0gZnJvbSAnLi4vbGlzdC9MaXN0Lm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9Gb3JtRXh0cmFzTW9kdWxlIH0gZnJvbSAnLi4vZm9ybS9leHRyYXMvRm9ybUV4dHJhcy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vYnV0dG9uL0J1dHRvbi5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvRHJvcGRvd25Nb2R1bGUgfSBmcm9tICcuLi9kcm9wZG93bi9Ecm9wZG93bi5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBTY3JvbGxpbmdNb2R1bGUsXHJcbiAgICBOb3ZvVGFiTW9kdWxlLFxyXG4gICAgTm92b0xpc3RNb2R1bGUsXHJcbiAgICBOb3ZvRm9ybUV4dHJhc01vZHVsZSxcclxuICAgIE5vdm9CdXR0b25Nb2R1bGUsXHJcbiAgICBOb3ZvRHJvcGRvd25Nb2R1bGUsXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtOb3ZvTGFiZWxTZXJ2aWNlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtOb3ZvVGFiYmVkR3JvdXBQaWNrZXJFbGVtZW50XSxcclxuICBleHBvcnRzOiBbTm92b1RhYmJlZEdyb3VwUGlja2VyRWxlbWVudF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvVGFiYmVkR3JvdXBQaWNrZXJNb2R1bGUge31cclxuIl19