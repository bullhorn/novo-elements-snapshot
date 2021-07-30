// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoListElement, NovoListItemElement, NovoItemAvatarElement, NovoItemTitleElement, NovoItemContentElement, NovoItemEndElement, NovoItemHeaderElement, NovoItemDateElement, } from './List';
export class NovoListModule {
}
NovoListModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2xpc3QvTGlzdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE1BQU07QUFDTixPQUFPLEVBQ0wsZUFBZSxFQUNmLG1CQUFtQixFQUNuQixxQkFBcUIsRUFDckIsb0JBQW9CLEVBQ3BCLHNCQUFzQixFQUN0QixrQkFBa0IsRUFDbEIscUJBQXFCLEVBQ3JCLG1CQUFtQixHQUNwQixNQUFNLFFBQVEsQ0FBQztBQXlCaEIsTUFBTSxPQUFPLGNBQWM7OztZQXZCMUIsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsWUFBWSxFQUFFO29CQUNaLGVBQWU7b0JBQ2YsbUJBQW1CO29CQUNuQixxQkFBcUI7b0JBQ3JCLG9CQUFvQjtvQkFDcEIsc0JBQXNCO29CQUN0QixrQkFBa0I7b0JBQ2xCLHFCQUFxQjtvQkFDckIsbUJBQW1CO2lCQUNwQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsZUFBZTtvQkFDZixtQkFBbUI7b0JBQ25CLHFCQUFxQjtvQkFDckIsb0JBQW9CO29CQUNwQixxQkFBcUI7b0JBQ3JCLHNCQUFzQjtvQkFDdEIsa0JBQWtCO29CQUNsQixtQkFBbUI7aUJBQ3BCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuLy8gQVBQXHJcbmltcG9ydCB7XHJcbiAgTm92b0xpc3RFbGVtZW50LFxyXG4gIE5vdm9MaXN0SXRlbUVsZW1lbnQsXHJcbiAgTm92b0l0ZW1BdmF0YXJFbGVtZW50LFxyXG4gIE5vdm9JdGVtVGl0bGVFbGVtZW50LFxyXG4gIE5vdm9JdGVtQ29udGVudEVsZW1lbnQsXHJcbiAgTm92b0l0ZW1FbmRFbGVtZW50LFxyXG4gIE5vdm9JdGVtSGVhZGVyRWxlbWVudCxcclxuICBOb3ZvSXRlbURhdGVFbGVtZW50LFxyXG59IGZyb20gJy4vTGlzdCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgTm92b0xpc3RFbGVtZW50LFxyXG4gICAgTm92b0xpc3RJdGVtRWxlbWVudCxcclxuICAgIE5vdm9JdGVtQXZhdGFyRWxlbWVudCxcclxuICAgIE5vdm9JdGVtVGl0bGVFbGVtZW50LFxyXG4gICAgTm92b0l0ZW1Db250ZW50RWxlbWVudCxcclxuICAgIE5vdm9JdGVtRW5kRWxlbWVudCxcclxuICAgIE5vdm9JdGVtSGVhZGVyRWxlbWVudCxcclxuICAgIE5vdm9JdGVtRGF0ZUVsZW1lbnQsXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBOb3ZvTGlzdEVsZW1lbnQsXHJcbiAgICBOb3ZvTGlzdEl0ZW1FbGVtZW50LFxyXG4gICAgTm92b0l0ZW1BdmF0YXJFbGVtZW50LFxyXG4gICAgTm92b0l0ZW1UaXRsZUVsZW1lbnQsXHJcbiAgICBOb3ZvSXRlbUhlYWRlckVsZW1lbnQsXHJcbiAgICBOb3ZvSXRlbUNvbnRlbnRFbGVtZW50LFxyXG4gICAgTm92b0l0ZW1FbmRFbGVtZW50LFxyXG4gICAgTm92b0l0ZW1EYXRlRWxlbWVudCxcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b0xpc3RNb2R1bGUge31cclxuIl19