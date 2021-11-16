import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BackgroundColorDirective } from './directives/bgc.directive';
import { BorderDirective } from './directives/border.directive';
import { TextColorDirective } from './directives/color.directive';
import { MarginDirective, PaddingDirective } from './directives/space.directive';
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
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9jb21tb24vY29tbW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDNUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMvRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDNUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzVELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQThCL0QsTUFBTSxPQUFPLGdCQUFnQjs7O1lBN0I1QixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDO2dCQUN6QyxPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixRQUFRO29CQUNSLFNBQVM7b0JBQ1QsV0FBVztvQkFDWCxTQUFTO29CQUNULFFBQVE7b0JBQ1IsZUFBZTtvQkFDZixnQkFBZ0I7b0JBQ2hCLHdCQUF3QjtvQkFDeEIsa0JBQWtCO29CQUNsQixlQUFlO2lCQUNoQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osWUFBWTtvQkFDWixRQUFRO29CQUNSLFNBQVM7b0JBQ1QsV0FBVztvQkFDWCxTQUFTO29CQUNULFFBQVE7b0JBQ1IsZUFBZTtvQkFDZixnQkFBZ0I7b0JBQ2hCLHdCQUF3QjtvQkFDeEIsa0JBQWtCO29CQUNsQixlQUFlO2lCQUNoQjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYWNrZ3JvdW5kQ29sb3JEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYmdjLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCb3JkZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYm9yZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUZXh0Q29sb3JEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvY29sb3IuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1hcmdpbkRpcmVjdGl2ZSwgUGFkZGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zcGFjZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTm92b1RlbXBsYXRlIH0gZnJvbSAnLi9ub3ZvLXRlbXBsYXRlL25vdm8tdGVtcGxhdGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IE5vdm9PcHRpb25Nb2R1bGUgfSBmcm9tICcuL29wdGlvbic7XG5pbXBvcnQgeyBOb3ZvQ2FwdGlvbiB9IGZyb20gJy4vdHlwb2dyYXBoeS9jYXB0aW9uL2NhcHRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9MYWJlbCB9IGZyb20gJy4vdHlwb2dyYXBoeS9sYWJlbC9sYWJlbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b0xpbmsgfSBmcm9tICcuL3R5cG9ncmFwaHkvbGluay9saW5rLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvVGV4dCB9IGZyb20gJy4vdHlwb2dyYXBoeS90ZXh0L3RleHQuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9UaXRsZSB9IGZyb20gJy4vdHlwb2dyYXBoeS90aXRsZS90aXRsZS5jb21wb25lbnQnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTm92b09wdGlvbk1vZHVsZV0sXG4gIGV4cG9ydHM6IFtcbiAgICBOb3ZvVGVtcGxhdGUsXG4gICAgTm92b1RleHQsXG4gICAgTm92b1RpdGxlLFxuICAgIE5vdm9DYXB0aW9uLFxuICAgIE5vdm9MYWJlbCxcbiAgICBOb3ZvTGluayxcbiAgICBNYXJnaW5EaXJlY3RpdmUsXG4gICAgUGFkZGluZ0RpcmVjdGl2ZSxcbiAgICBCYWNrZ3JvdW5kQ29sb3JEaXJlY3RpdmUsXG4gICAgVGV4dENvbG9yRGlyZWN0aXZlLFxuICAgIEJvcmRlckRpcmVjdGl2ZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTm92b1RlbXBsYXRlLFxuICAgIE5vdm9UZXh0LFxuICAgIE5vdm9UaXRsZSxcbiAgICBOb3ZvQ2FwdGlvbixcbiAgICBOb3ZvTGFiZWwsXG4gICAgTm92b0xpbmssXG4gICAgTWFyZ2luRGlyZWN0aXZlLFxuICAgIFBhZGRpbmdEaXJlY3RpdmUsXG4gICAgQmFja2dyb3VuZENvbG9yRGlyZWN0aXZlLFxuICAgIFRleHRDb2xvckRpcmVjdGl2ZSxcbiAgICBCb3JkZXJEaXJlY3RpdmUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Db21tb25Nb2R1bGUge31cbiJdfQ==