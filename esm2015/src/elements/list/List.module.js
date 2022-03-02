// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoCommonModule } from '../common';
import { NovoIconModule } from '../icon';
// APP
import { NovoItemAvatarElement, NovoItemContentElement, NovoItemDateElement, NovoItemEndElement, NovoItemHeaderElement, NovoItemTitleElement, NovoListElement, NovoListItemElement, } from './List';
export class NovoListModule {
}
NovoListModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, NovoCommonModule, NovoIconModule],
                declarations: [
                    NovoListElement,
                    NovoListItemElement,
                    NovoItemAvatarElement,
                    NovoItemTitleElement,
                    NovoItemContentElement,
                    NovoItemEndElement,
                    NovoItemHeaderElement,
                    NovoItemDateElement,
                ],
                exports: [
                    NovoListElement,
                    NovoListItemElement,
                    NovoItemAvatarElement,
                    NovoItemTitleElement,
                    NovoItemHeaderElement,
                    NovoItemContentElement,
                    NovoItemEndElement,
                    NovoItemDateElement,
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvbGlzdC9MaXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDekMsTUFBTTtBQUNOLE9BQU8sRUFDTCxxQkFBcUIsRUFDckIsc0JBQXNCLEVBQ3RCLG1CQUFtQixFQUNuQixrQkFBa0IsRUFDbEIscUJBQXFCLEVBQ3JCLG9CQUFvQixFQUNwQixlQUFlLEVBQ2YsbUJBQW1CLEdBQ3BCLE1BQU0sUUFBUSxDQUFDO0FBeUJoQixNQUFNLE9BQU8sY0FBYzs7O1lBdkIxQixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsQ0FBQztnQkFDekQsWUFBWSxFQUFFO29CQUNaLGVBQWU7b0JBQ2YsbUJBQW1CO29CQUNuQixxQkFBcUI7b0JBQ3JCLG9CQUFvQjtvQkFDcEIsc0JBQXNCO29CQUN0QixrQkFBa0I7b0JBQ2xCLHFCQUFxQjtvQkFDckIsbUJBQW1CO2lCQUNwQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsZUFBZTtvQkFDZixtQkFBbUI7b0JBQ25CLHFCQUFxQjtvQkFDckIsb0JBQW9CO29CQUNwQixxQkFBcUI7b0JBQ3JCLHNCQUFzQjtvQkFDdEIsa0JBQWtCO29CQUNsQixtQkFBbUI7aUJBQ3BCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0NvbW1vbk1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgeyBOb3ZvSWNvbk1vZHVsZSB9IGZyb20gJy4uL2ljb24nO1xuLy8gQVBQXG5pbXBvcnQge1xuICBOb3ZvSXRlbUF2YXRhckVsZW1lbnQsXG4gIE5vdm9JdGVtQ29udGVudEVsZW1lbnQsXG4gIE5vdm9JdGVtRGF0ZUVsZW1lbnQsXG4gIE5vdm9JdGVtRW5kRWxlbWVudCxcbiAgTm92b0l0ZW1IZWFkZXJFbGVtZW50LFxuICBOb3ZvSXRlbVRpdGxlRWxlbWVudCxcbiAgTm92b0xpc3RFbGVtZW50LFxuICBOb3ZvTGlzdEl0ZW1FbGVtZW50LFxufSBmcm9tICcuL0xpc3QnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBOb3ZvQ29tbW9uTW9kdWxlLCBOb3ZvSWNvbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5vdm9MaXN0RWxlbWVudCxcbiAgICBOb3ZvTGlzdEl0ZW1FbGVtZW50LFxuICAgIE5vdm9JdGVtQXZhdGFyRWxlbWVudCxcbiAgICBOb3ZvSXRlbVRpdGxlRWxlbWVudCxcbiAgICBOb3ZvSXRlbUNvbnRlbnRFbGVtZW50LFxuICAgIE5vdm9JdGVtRW5kRWxlbWVudCxcbiAgICBOb3ZvSXRlbUhlYWRlckVsZW1lbnQsXG4gICAgTm92b0l0ZW1EYXRlRWxlbWVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE5vdm9MaXN0RWxlbWVudCxcbiAgICBOb3ZvTGlzdEl0ZW1FbGVtZW50LFxuICAgIE5vdm9JdGVtQXZhdGFyRWxlbWVudCxcbiAgICBOb3ZvSXRlbVRpdGxlRWxlbWVudCxcbiAgICBOb3ZvSXRlbUhlYWRlckVsZW1lbnQsXG4gICAgTm92b0l0ZW1Db250ZW50RWxlbWVudCxcbiAgICBOb3ZvSXRlbUVuZEVsZW1lbnQsXG4gICAgTm92b0l0ZW1EYXRlRWxlbWVudCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0xpc3RNb2R1bGUge31cbiJdfQ==