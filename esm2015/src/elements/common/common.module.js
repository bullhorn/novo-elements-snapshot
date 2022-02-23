import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccentColorDirective } from './directives/accent.directive';
import { BackgroundColorDirective } from './directives/bg.directive';
import { BorderDirective } from './directives/border.directive';
import { TextColorDirective } from './directives/color.directive';
import { FillColorDirective } from './directives/fill.directive';
import { FlexDirective } from './directives/flex.directive';
import { GapDirective, MarginDirective, PaddingDirective } from './directives/space.directive';
import { ThemeColorDirective } from './directives/theme.directive';
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
                    FlexDirective,
                    ThemeColorDirective,
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
                    FlexDirective,
                    ThemeColorDirective,
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9jb21tb24vY29tbW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNyRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDakUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDL0YsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDckUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUM1RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDNUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBeUMvRCxNQUFNLE9BQU8sZ0JBQWdCOzs7WUF2QzVCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLENBQUM7Z0JBQ3pDLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLFFBQVE7b0JBQ1IsU0FBUztvQkFDVCxXQUFXO29CQUNYLFNBQVM7b0JBQ1QsUUFBUTtvQkFDUixlQUFlO29CQUNmLGdCQUFnQjtvQkFDaEIsd0JBQXdCO29CQUN4QixrQkFBa0I7b0JBQ2xCLGVBQWU7b0JBQ2YsWUFBWTtvQkFDWixvQkFBb0I7b0JBQ3BCLGtCQUFrQjtvQkFDbEIsYUFBYTtvQkFDYixtQkFBbUI7aUJBQ3BCO2dCQUNELFlBQVksRUFBRTtvQkFDWixZQUFZO29CQUNaLFFBQVE7b0JBQ1IsU0FBUztvQkFDVCxXQUFXO29CQUNYLFNBQVM7b0JBQ1QsUUFBUTtvQkFDUixlQUFlO29CQUNmLGdCQUFnQjtvQkFDaEIsd0JBQXdCO29CQUN4QixrQkFBa0I7b0JBQ2xCLGVBQWU7b0JBQ2YsWUFBWTtvQkFDWixvQkFBb0I7b0JBQ3BCLGtCQUFrQjtvQkFDbEIsYUFBYTtvQkFDYixtQkFBbUI7aUJBQ3BCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjY2VudENvbG9yRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2FjY2VudC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQmFja2dyb3VuZENvbG9yRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2JnLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCb3JkZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYm9yZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUZXh0Q29sb3JEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvY29sb3IuZGlyZWN0aXZlJztcbmltcG9ydCB7IEZpbGxDb2xvckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9maWxsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBGbGV4RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2ZsZXguZGlyZWN0aXZlJztcbmltcG9ydCB7IEdhcERpcmVjdGl2ZSwgTWFyZ2luRGlyZWN0aXZlLCBQYWRkaW5nRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3NwYWNlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUaGVtZUNvbG9yRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3RoZW1lLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOb3ZvVGVtcGxhdGUgfSBmcm9tICcuL25vdm8tdGVtcGxhdGUvbm92by10ZW1wbGF0ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTm92b09wdGlvbk1vZHVsZSB9IGZyb20gJy4vb3B0aW9uJztcbmltcG9ydCB7IE5vdm9DYXB0aW9uIH0gZnJvbSAnLi90eXBvZ3JhcGh5L2NhcHRpb24vY2FwdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b0xhYmVsIH0gZnJvbSAnLi90eXBvZ3JhcGh5L2xhYmVsL2xhYmVsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvTGluayB9IGZyb20gJy4vdHlwb2dyYXBoeS9saW5rL2xpbmsuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9UZXh0IH0gZnJvbSAnLi90eXBvZ3JhcGh5L3RleHQvdGV4dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b1RpdGxlIH0gZnJvbSAnLi90eXBvZ3JhcGh5L3RpdGxlL3RpdGxlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE5vdm9PcHRpb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbXG4gICAgTm92b1RlbXBsYXRlLFxuICAgIE5vdm9UZXh0LFxuICAgIE5vdm9UaXRsZSxcbiAgICBOb3ZvQ2FwdGlvbixcbiAgICBOb3ZvTGFiZWwsXG4gICAgTm92b0xpbmssXG4gICAgTWFyZ2luRGlyZWN0aXZlLFxuICAgIFBhZGRpbmdEaXJlY3RpdmUsXG4gICAgQmFja2dyb3VuZENvbG9yRGlyZWN0aXZlLFxuICAgIFRleHRDb2xvckRpcmVjdGl2ZSxcbiAgICBCb3JkZXJEaXJlY3RpdmUsXG4gICAgR2FwRGlyZWN0aXZlLFxuICAgIEFjY2VudENvbG9yRGlyZWN0aXZlLFxuICAgIEZpbGxDb2xvckRpcmVjdGl2ZSxcbiAgICBGbGV4RGlyZWN0aXZlLFxuICAgIFRoZW1lQ29sb3JEaXJlY3RpdmUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5vdm9UZW1wbGF0ZSxcbiAgICBOb3ZvVGV4dCxcbiAgICBOb3ZvVGl0bGUsXG4gICAgTm92b0NhcHRpb24sXG4gICAgTm92b0xhYmVsLFxuICAgIE5vdm9MaW5rLFxuICAgIE1hcmdpbkRpcmVjdGl2ZSxcbiAgICBQYWRkaW5nRGlyZWN0aXZlLFxuICAgIEJhY2tncm91bmRDb2xvckRpcmVjdGl2ZSxcbiAgICBUZXh0Q29sb3JEaXJlY3RpdmUsXG4gICAgQm9yZGVyRGlyZWN0aXZlLFxuICAgIEdhcERpcmVjdGl2ZSxcbiAgICBBY2NlbnRDb2xvckRpcmVjdGl2ZSxcbiAgICBGaWxsQ29sb3JEaXJlY3RpdmUsXG4gICAgRmxleERpcmVjdGl2ZSxcbiAgICBUaGVtZUNvbG9yRGlyZWN0aXZlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQ29tbW9uTW9kdWxlIHt9XG4iXX0=