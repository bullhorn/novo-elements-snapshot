import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BackgroundColorDirective } from './directives/bgc.directive';
import { BorderDirective } from './directives/border.directive';
import { TextColorDirective } from './directives/color.directive';
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
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9jb21tb24vY29tbW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDL0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzVELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUM1RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFnQy9ELE1BQU0sT0FBTyxnQkFBZ0I7OztZQS9CNUIsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQztnQkFDekMsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osUUFBUTtvQkFDUixTQUFTO29CQUNULFdBQVc7b0JBQ1gsU0FBUztvQkFDVCxRQUFRO29CQUNSLGVBQWU7b0JBQ2YsZ0JBQWdCO29CQUNoQix3QkFBd0I7b0JBQ3hCLGtCQUFrQjtvQkFDbEIsZUFBZTtvQkFDZixZQUFZO2lCQUNiO2dCQUNELFlBQVksRUFBRTtvQkFDWixZQUFZO29CQUNaLFFBQVE7b0JBQ1IsU0FBUztvQkFDVCxXQUFXO29CQUNYLFNBQVM7b0JBQ1QsUUFBUTtvQkFDUixlQUFlO29CQUNmLGdCQUFnQjtvQkFDaEIsd0JBQXdCO29CQUN4QixrQkFBa0I7b0JBQ2xCLGVBQWU7b0JBQ2YsWUFBWTtpQkFDYjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYWNrZ3JvdW5kQ29sb3JEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYmdjLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCb3JkZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYm9yZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUZXh0Q29sb3JEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvY29sb3IuZGlyZWN0aXZlJztcbmltcG9ydCB7IEdhcERpcmVjdGl2ZSwgTWFyZ2luRGlyZWN0aXZlLCBQYWRkaW5nRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3NwYWNlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOb3ZvVGVtcGxhdGUgfSBmcm9tICcuL25vdm8tdGVtcGxhdGUvbm92by10ZW1wbGF0ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTm92b09wdGlvbk1vZHVsZSB9IGZyb20gJy4vb3B0aW9uJztcbmltcG9ydCB7IE5vdm9DYXB0aW9uIH0gZnJvbSAnLi90eXBvZ3JhcGh5L2NhcHRpb24vY2FwdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b0xhYmVsIH0gZnJvbSAnLi90eXBvZ3JhcGh5L2xhYmVsL2xhYmVsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvTGluayB9IGZyb20gJy4vdHlwb2dyYXBoeS9saW5rL2xpbmsuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9UZXh0IH0gZnJvbSAnLi90eXBvZ3JhcGh5L3RleHQvdGV4dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b1RpdGxlIH0gZnJvbSAnLi90eXBvZ3JhcGh5L3RpdGxlL3RpdGxlLmNvbXBvbmVudCc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBOb3ZvT3B0aW9uTW9kdWxlXSxcbiAgZXhwb3J0czogW1xuICAgIE5vdm9UZW1wbGF0ZSxcbiAgICBOb3ZvVGV4dCxcbiAgICBOb3ZvVGl0bGUsXG4gICAgTm92b0NhcHRpb24sXG4gICAgTm92b0xhYmVsLFxuICAgIE5vdm9MaW5rLFxuICAgIE1hcmdpbkRpcmVjdGl2ZSxcbiAgICBQYWRkaW5nRGlyZWN0aXZlLFxuICAgIEJhY2tncm91bmRDb2xvckRpcmVjdGl2ZSxcbiAgICBUZXh0Q29sb3JEaXJlY3RpdmUsXG4gICAgQm9yZGVyRGlyZWN0aXZlLFxuICAgIEdhcERpcmVjdGl2ZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTm92b1RlbXBsYXRlLFxuICAgIE5vdm9UZXh0LFxuICAgIE5vdm9UaXRsZSxcbiAgICBOb3ZvQ2FwdGlvbixcbiAgICBOb3ZvTGFiZWwsXG4gICAgTm92b0xpbmssXG4gICAgTWFyZ2luRGlyZWN0aXZlLFxuICAgIFBhZGRpbmdEaXJlY3RpdmUsXG4gICAgQmFja2dyb3VuZENvbG9yRGlyZWN0aXZlLFxuICAgIFRleHRDb2xvckRpcmVjdGl2ZSxcbiAgICBCb3JkZXJEaXJlY3RpdmUsXG4gICAgR2FwRGlyZWN0aXZlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQ29tbW9uTW9kdWxlIHt9XG4iXX0=