import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccentColorDirective } from './directives/accent.directive';
import { BackgroundColorDirective } from './directives/bgc.directive';
import { BorderDirective } from './directives/border.directive';
import { TextColorDirective } from './directives/color.directive';
import { FillColorDirective } from './directives/fill.directive';
import { GapDirective, MarginDirective, PaddingDirective } from './directives/space.directive';
import { NovoTemplate } from './novo-template/novo-template.directive';
import { NovoOptionModule } from './option';
import { NovoCaption } from './typography/caption/caption.component';
import { NovoLabel } from './typography/label/label.component';
import { NovoLink } from './typography/link/link.component';
import { NovoText } from './typography/text/text.component';
import { NovoTitle } from './typography/title/title.component';
export class NovoCommonModule {
}
NovoCommonModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, NovoOptionModule],
                exports: [
                    NovoTemplate,
                    NovoText,
                    NovoTitle,
                    NovoCaption,
                    NovoLabel,
                    NovoLink,
                    MarginDirective,
                    PaddingDirective,
                    BackgroundColorDirective,
                    TextColorDirective,
                    BorderDirective,
                    GapDirective,
                    AccentColorDirective,
                    FillColorDirective,
                ],
                declarations: [
                    NovoTemplate,
                    NovoText,
                    NovoTitle,
                    NovoCaption,
                    NovoLabel,
                    NovoLink,
                    MarginDirective,
                    PaddingDirective,
                    BackgroundColorDirective,
                    TextColorDirective,
                    BorderDirective,
                    GapDirective,
                    AccentColorDirective,
                    FillColorDirective,
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9jb21tb24vY29tbW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNyRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDakUsT0FBTyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDL0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzVELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUM1RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFxQy9ELE1BQU0sT0FBTyxnQkFBZ0I7OztZQW5DNUIsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQztnQkFDekMsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osUUFBUTtvQkFDUixTQUFTO29CQUNULFdBQVc7b0JBQ1gsU0FBUztvQkFDVCxRQUFRO29CQUNSLGVBQWU7b0JBQ2YsZ0JBQWdCO29CQUNoQix3QkFBd0I7b0JBQ3hCLGtCQUFrQjtvQkFDbEIsZUFBZTtvQkFDZixZQUFZO29CQUNaLG9CQUFvQjtvQkFDcEIsa0JBQWtCO2lCQUNuQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osWUFBWTtvQkFDWixRQUFRO29CQUNSLFNBQVM7b0JBQ1QsV0FBVztvQkFDWCxTQUFTO29CQUNULFFBQVE7b0JBQ1IsZUFBZTtvQkFDZixnQkFBZ0I7b0JBQ2hCLHdCQUF3QjtvQkFDeEIsa0JBQWtCO29CQUNsQixlQUFlO29CQUNmLFlBQVk7b0JBQ1osb0JBQW9CO29CQUNwQixrQkFBa0I7aUJBQ25CO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjY2VudENvbG9yRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2FjY2VudC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQmFja2dyb3VuZENvbG9yRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2JnYy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQm9yZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2JvcmRlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVGV4dENvbG9yRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2NvbG9yLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBGaWxsQ29sb3JEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZmlsbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgR2FwRGlyZWN0aXZlLCBNYXJnaW5EaXJlY3RpdmUsIFBhZGRpbmdEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc3BhY2UuZGlyZWN0aXZlJztcbmltcG9ydCB7IE5vdm9UZW1wbGF0ZSB9IGZyb20gJy4vbm92by10ZW1wbGF0ZS9ub3ZvLXRlbXBsYXRlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOb3ZvT3B0aW9uTW9kdWxlIH0gZnJvbSAnLi9vcHRpb24nO1xuaW1wb3J0IHsgTm92b0NhcHRpb24gfSBmcm9tICcuL3R5cG9ncmFwaHkvY2FwdGlvbi9jYXB0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvTGFiZWwgfSBmcm9tICcuL3R5cG9ncmFwaHkvbGFiZWwvbGFiZWwuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9MaW5rIH0gZnJvbSAnLi90eXBvZ3JhcGh5L2xpbmsvbGluay5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b1RleHQgfSBmcm9tICcuL3R5cG9ncmFwaHkvdGV4dC90ZXh0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvVGl0bGUgfSBmcm9tICcuL3R5cG9ncmFwaHkvdGl0bGUvdGl0bGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTm92b09wdGlvbk1vZHVsZV0sXG4gIGV4cG9ydHM6IFtcbiAgICBOb3ZvVGVtcGxhdGUsXG4gICAgTm92b1RleHQsXG4gICAgTm92b1RpdGxlLFxuICAgIE5vdm9DYXB0aW9uLFxuICAgIE5vdm9MYWJlbCxcbiAgICBOb3ZvTGluayxcbiAgICBNYXJnaW5EaXJlY3RpdmUsXG4gICAgUGFkZGluZ0RpcmVjdGl2ZSxcbiAgICBCYWNrZ3JvdW5kQ29sb3JEaXJlY3RpdmUsXG4gICAgVGV4dENvbG9yRGlyZWN0aXZlLFxuICAgIEJvcmRlckRpcmVjdGl2ZSxcbiAgICBHYXBEaXJlY3RpdmUsXG4gICAgQWNjZW50Q29sb3JEaXJlY3RpdmUsXG4gICAgRmlsbENvbG9yRGlyZWN0aXZlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOb3ZvVGVtcGxhdGUsXG4gICAgTm92b1RleHQsXG4gICAgTm92b1RpdGxlLFxuICAgIE5vdm9DYXB0aW9uLFxuICAgIE5vdm9MYWJlbCxcbiAgICBOb3ZvTGluayxcbiAgICBNYXJnaW5EaXJlY3RpdmUsXG4gICAgUGFkZGluZ0RpcmVjdGl2ZSxcbiAgICBCYWNrZ3JvdW5kQ29sb3JEaXJlY3RpdmUsXG4gICAgVGV4dENvbG9yRGlyZWN0aXZlLFxuICAgIEJvcmRlckRpcmVjdGl2ZSxcbiAgICBHYXBEaXJlY3RpdmUsXG4gICAgQWNjZW50Q29sb3JEaXJlY3RpdmUsXG4gICAgRmlsbENvbG9yRGlyZWN0aXZlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQ29tbW9uTW9kdWxlIHt9XG4iXX0=