// NG2
import { Component, ContentChild, ElementRef, Input } from '@angular/core';
export class NovoListElement {
    constructor(element) {
        this.element = element;
    }
}
NovoListElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-list',
                host: {
                    class: 'novo-list',
                    '[class.vertical-list]': 'direction === "vertical"',
                    '[class.horizontal-list]': 'direction === "horizontal"',
                    '[attr.theme]': 'theme',
                },
                template: ` <ng-content></ng-content> `
            },] }
];
NovoListElement.ctorParameters = () => [
    { type: ElementRef }
];
NovoListElement.propDecorators = {
    theme: [{ type: Input }],
    direction: [{ type: Input }]
};
export class NovoItemAvatarElement {
}
NovoItemAvatarElement.decorators = [
    { type: Component, args: [{
                selector: 'item-avatar, novo-item-avatar',
                template: ` <novo-icon *ngIf="icon" [color]="color || icon">{{ icon }}</novo-icon> `,
                host: {
                    class: 'novo-item-avatar',
                }
            },] }
];
NovoItemAvatarElement.propDecorators = {
    icon: [{ type: Input }],
    color: [{ type: Input }]
};
export class NovoItemTitleElement {
}
NovoItemTitleElement.decorators = [
    { type: Component, args: [{
                selector: 'item-title, novo-item-title',
                template: `<ng-content></ng-content>`,
                host: {
                    class: 'novo-item-title',
                }
            },] }
];
export class NovoItemHeaderElement {
}
NovoItemHeaderElement.decorators = [
    { type: Component, args: [{
                selector: 'item-header, novo-item-header',
                template: `
    <novo-title class="novo-item-header-container" size="md">
      <ng-content select="item-avatar, novo-item-avatar"></ng-content>
      <ng-content select="item-title, novo-item-title"></ng-content>
      <ng-content select="item-header-end, novo-item-header-end"></ng-content>
    </novo-title>
  `,
                host: {
                    class: 'novo-item-header',
                }
            },] }
];
export class NovoItemDateElement {
}
NovoItemDateElement.decorators = [
    { type: Component, args: [{
                selector: 'item-header-end, novo-item-header-end',
                template: ` <ng-content></ng-content> `,
                host: {
                    class: 'novo-item-header-end',
                }
            },] }
];
export class NovoItemContentElement {
}
NovoItemContentElement.decorators = [
    { type: Component, args: [{
                selector: 'item-content, novo-item-content',
                host: {
                    class: 'novo-item-content',
                    '[class.vertical-list]': 'direction === "vertical"',
                    '[class.horizontal-list]': 'direction === "horizontal"',
                },
                template: ` <ng-content></ng-content> `
            },] }
];
NovoItemContentElement.propDecorators = {
    direction: [{ type: Input }]
};
export class NovoItemEndElement {
}
NovoItemEndElement.decorators = [
    { type: Component, args: [{
                selector: 'item-end, novo-item-end',
                template: ` <ng-content></ng-content> `,
                host: {
                    class: 'novo-item-end',
                }
            },] }
];
export class NovoListItemElement {
    constructor(element) {
        this.element = element;
        this.avatar = false;
    }
    ngOnInit() {
        this.avatar = !!this.element.nativeElement.querySelector('item-avatar');
    }
}
NovoListItemElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-list-item, a[list-item], button[list-item]',
                template: `
    <div class="list-item" [ngClass]="{ avatar: avatar }" *ngIf="_content || _header">
      <ng-content select="item-header, novo-item-header"></ng-content>
      <ng-content select="item-content, novo-item-content"></ng-content>
    </div>
    <ng-content></ng-content>
    <ng-content select="item-end, novo-item-end"></ng-content>
  `,
                host: {
                    class: 'novo-list-item',
                }
            },] }
];
NovoListItemElement.ctorParameters = () => [
    { type: ElementRef }
];
NovoListItemElement.propDecorators = {
    _content: [{ type: ContentChild, args: [NovoItemContentElement,] }],
    _header: [{ type: ContentChild, args: [NovoItemHeaderElement,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9saXN0L0xpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFZbkYsTUFBTSxPQUFPLGVBQWU7SUFNMUIsWUFBbUIsT0FBbUI7UUFBbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtJQUFHLENBQUM7OztZQWhCM0MsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxXQUFXO2dCQUNyQixJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLFdBQVc7b0JBQ2xCLHVCQUF1QixFQUFFLDBCQUEwQjtvQkFDbkQseUJBQXlCLEVBQUUsNEJBQTRCO29CQUN2RCxjQUFjLEVBQUUsT0FBTztpQkFDeEI7Z0JBQ0QsUUFBUSxFQUFFLDZCQUE2QjthQUN4Qzs7O1lBWGlDLFVBQVU7OztvQkFhekMsS0FBSzt3QkFFTCxLQUFLOztBQWFSLE1BQU0sT0FBTyxxQkFBcUI7OztZQVBqQyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLCtCQUErQjtnQkFDekMsUUFBUSxFQUFFLDBFQUEwRTtnQkFDcEYsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxrQkFBa0I7aUJBQzFCO2FBQ0Y7OzttQkFFRSxLQUFLO29CQUVMLEtBQUs7O0FBV1IsTUFBTSxPQUFPLG9CQUFvQjs7O1lBUGhDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNkJBQTZCO2dCQUN2QyxRQUFRLEVBQUUsMkJBQTJCO2dCQUNyQyxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLGlCQUFpQjtpQkFDekI7YUFDRjs7QUFnQkQsTUFBTSxPQUFPLHFCQUFxQjs7O1lBYmpDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsK0JBQStCO2dCQUN6QyxRQUFRLEVBQUU7Ozs7OztHQU1UO2dCQUNELElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsa0JBQWtCO2lCQUMxQjthQUNGOztBQVVELE1BQU0sT0FBTyxtQkFBbUI7OztZQVAvQixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVDQUF1QztnQkFDakQsUUFBUSxFQUFFLDZCQUE2QjtnQkFDdkMsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxzQkFBc0I7aUJBQzlCO2FBQ0Y7O0FBWUQsTUFBTSxPQUFPLHNCQUFzQjs7O1lBVGxDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUNBQWlDO2dCQUMzQyxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLG1CQUFtQjtvQkFDMUIsdUJBQXVCLEVBQUUsMEJBQTBCO29CQUNuRCx5QkFBeUIsRUFBRSw0QkFBNEI7aUJBQ3hEO2dCQUNELFFBQVEsRUFBRSw2QkFBNkI7YUFDeEM7Ozt3QkFFRSxLQUFLOztBQVdSLE1BQU0sT0FBTyxrQkFBa0I7OztZQVA5QixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsUUFBUSxFQUFFLDZCQUE2QjtnQkFDdkMsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxlQUFlO2lCQUN2QjthQUNGOztBQWlCRCxNQUFNLE9BQU8sbUJBQW1CO0lBSzlCLFlBQW9CLE9BQW1CO1FBQW5CLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFKdkMsV0FBTSxHQUFZLEtBQUssQ0FBQztJQUlrQixDQUFDO0lBRTNDLFFBQVE7UUFDTixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDMUUsQ0FBQzs7O1lBdkJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaURBQWlEO2dCQUMzRCxRQUFRLEVBQUU7Ozs7Ozs7R0FPVDtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLGdCQUFnQjtpQkFDeEI7YUFDRjs7O1lBeEdpQyxVQUFVOzs7dUJBMkd6QyxZQUFZLFNBQUMsc0JBQXNCO3NCQUNuQyxZQUFZLFNBQUMscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgRWxlbWVudFJlZiwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWxpc3QnLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWxpc3QnLFxuICAgICdbY2xhc3MudmVydGljYWwtbGlzdF0nOiAnZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCInLFxuICAgICdbY2xhc3MuaG9yaXpvbnRhbC1saXN0XSc6ICdkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiJyxcbiAgICAnW2F0dHIudGhlbWVdJzogJ3RoZW1lJyxcbiAgfSxcbiAgdGVtcGxhdGU6IGAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvTGlzdEVsZW1lbnQge1xuICBASW5wdXQoKVxuICB0aGVtZTogc3RyaW5nO1xuICBASW5wdXQoKVxuICBkaXJlY3Rpb246IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZikge31cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaXRlbS1hdmF0YXIsIG5vdm8taXRlbS1hdmF0YXInLFxuICB0ZW1wbGF0ZTogYCA8bm92by1pY29uICpuZ0lmPVwiaWNvblwiIFtjb2xvcl09XCJjb2xvciB8fCBpY29uXCI+e3sgaWNvbiB9fTwvbm92by1pY29uPiBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWl0ZW0tYXZhdGFyJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0l0ZW1BdmF0YXJFbGVtZW50IHtcbiAgQElucHV0KClcbiAgaWNvbjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBjb2xvcjogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpdGVtLXRpdGxlLCBub3ZvLWl0ZW0tdGl0bGUnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWl0ZW0tdGl0bGUnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvSXRlbVRpdGxlRWxlbWVudCB7fVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpdGVtLWhlYWRlciwgbm92by1pdGVtLWhlYWRlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5vdm8tdGl0bGUgY2xhc3M9XCJub3ZvLWl0ZW0taGVhZGVyLWNvbnRhaW5lclwiIHNpemU9XCJtZFwiPlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiaXRlbS1hdmF0YXIsIG5vdm8taXRlbS1hdmF0YXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJpdGVtLXRpdGxlLCBub3ZvLWl0ZW0tdGl0bGVcIj48L25nLWNvbnRlbnQ+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJpdGVtLWhlYWRlci1lbmQsIG5vdm8taXRlbS1oZWFkZXItZW5kXCI+PC9uZy1jb250ZW50PlxuICAgIDwvbm92by10aXRsZT5cbiAgYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1pdGVtLWhlYWRlcicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9JdGVtSGVhZGVyRWxlbWVudCB7fVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpdGVtLWhlYWRlci1lbmQsIG5vdm8taXRlbS1oZWFkZXItZW5kJyxcbiAgdGVtcGxhdGU6IGAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWl0ZW0taGVhZGVyLWVuZCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9JdGVtRGF0ZUVsZW1lbnQge31cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaXRlbS1jb250ZW50LCBub3ZvLWl0ZW0tY29udGVudCcsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8taXRlbS1jb250ZW50JyxcbiAgICAnW2NsYXNzLnZlcnRpY2FsLWxpc3RdJzogJ2RpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiJyxcbiAgICAnW2NsYXNzLmhvcml6b250YWwtbGlzdF0nOiAnZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIicsXG4gIH0sXG4gIHRlbXBsYXRlOiBgIDxuZy1jb250ZW50PjwvbmctY29udGVudD4gYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0l0ZW1Db250ZW50RWxlbWVudCB7XG4gIEBJbnB1dCgpXG4gIGRpcmVjdGlvbjogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpdGVtLWVuZCwgbm92by1pdGVtLWVuZCcsXG4gIHRlbXBsYXRlOiBgIDxuZy1jb250ZW50PjwvbmctY29udGVudD4gYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1pdGVtLWVuZCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9JdGVtRW5kRWxlbWVudCB7fVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWxpc3QtaXRlbSwgYVtsaXN0LWl0ZW1dLCBidXR0b25bbGlzdC1pdGVtXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImxpc3QtaXRlbVwiIFtuZ0NsYXNzXT1cInsgYXZhdGFyOiBhdmF0YXIgfVwiICpuZ0lmPVwiX2NvbnRlbnQgfHwgX2hlYWRlclwiPlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiaXRlbS1oZWFkZXIsIG5vdm8taXRlbS1oZWFkZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJpdGVtLWNvbnRlbnQsIG5vdm8taXRlbS1jb250ZW50XCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJpdGVtLWVuZCwgbm92by1pdGVtLWVuZFwiPjwvbmctY29udGVudD5cbiAgYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1saXN0LWl0ZW0nLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvTGlzdEl0ZW1FbGVtZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgYXZhdGFyOiBib29sZWFuID0gZmFsc2U7XG4gIEBDb250ZW50Q2hpbGQoTm92b0l0ZW1Db250ZW50RWxlbWVudCkgX2NvbnRlbnQ6IE5vdm9JdGVtQ29udGVudEVsZW1lbnQ7XG4gIEBDb250ZW50Q2hpbGQoTm92b0l0ZW1IZWFkZXJFbGVtZW50KSBfaGVhZGVyOiBOb3ZvSXRlbUhlYWRlckVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYXZhdGFyID0gISF0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpdGVtLWF2YXRhcicpO1xuICB9XG59XG4iXX0=