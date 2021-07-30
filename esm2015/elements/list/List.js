// NG2
import { Component, ElementRef, Input } from '@angular/core';
export class NovoListElement {
    constructor(element) {
        this.element = element;
    }
}
NovoListElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-list',
                host: {
                    '[class.vertical-list]': 'direction === "vertical"',
                    '[class.horizontal-list]': 'direction === "horizontal"',
                    '[attr.theme]': 'theme',
                },
                template: `
        <ng-content></ng-content>
    `
            },] }
];
NovoListElement.ctorParameters = () => [
    { type: ElementRef }
];
NovoListElement.propDecorators = {
    theme: [{ type: Input }],
    direction: [{ type: Input }]
};
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
                selector: 'novo-list-item',
                template: `
        <div class="list-item" [ngClass]="{'avatar': avatar}">
            <ng-content select="item-header"></ng-content>
            <ng-content select="item-content"></ng-content>
        </div>
        <ng-content></ng-content>
        <ng-content select="item-end"></ng-content>
    `
            },] }
];
NovoListItemElement.ctorParameters = () => [
    { type: ElementRef }
];
export class NovoItemAvatarElement {
    ngOnChanges(changes) {
        this.iconClass = this.icon ? `bhi-${this.icon}` : null;
        this.classMap = [this.iconClass, this.icon];
    }
    ngOnInit() {
        this.ngOnChanges();
    }
}
NovoItemAvatarElement.decorators = [
    { type: Component, args: [{
                selector: 'item-avatar',
                template: `
        <i *ngIf="iconClass" [ngClass]="classMap" theme="contained"></i>
    `
            },] }
];
NovoItemAvatarElement.propDecorators = {
    icon: [{ type: Input }]
};
export class NovoItemTitleElement {
}
NovoItemTitleElement.decorators = [
    { type: Component, args: [{
                selector: 'item-title',
                template: `
        <h6><ng-content></ng-content></h6>
    `
            },] }
];
export class NovoItemHeaderElement {
}
NovoItemHeaderElement.decorators = [
    { type: Component, args: [{
                selector: 'item-header',
                template: `
        <ng-content select="item-avatar"></ng-content>
        <ng-content select="item-title"></ng-content>
        <ng-content select="item-header-end"></ng-content>
    `
            },] }
];
export class NovoItemDateElement {
}
NovoItemDateElement.decorators = [
    { type: Component, args: [{
                selector: 'item-header-end',
                template: `
        <ng-content></ng-content>
    `
            },] }
];
export class NovoItemContentElement {
}
NovoItemContentElement.decorators = [
    { type: Component, args: [{
                selector: 'item-content',
                host: {
                    '[class.vertical-list]': 'direction === "vertical"',
                    '[class.horizontal-list]': 'direction === "horizontal"',
                },
                template: `
        <ng-content></ng-content>
    `
            },] }
];
NovoItemContentElement.propDecorators = {
    direction: [{ type: Input }]
};
export class NovoItemEndElement {
}
NovoItemEndElement.decorators = [
    { type: Component, args: [{
                selector: 'item-end',
                template: `
        <ng-content></ng-content>
    `
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvbGlzdC9MaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQW9DLE1BQU0sZUFBZSxDQUFDO0FBYS9GLE1BQU0sT0FBTyxlQUFlO0lBTTFCLFlBQW1CLE9BQW1CO1FBQW5CLFlBQU8sR0FBUCxPQUFPLENBQVk7SUFBRyxDQUFDOzs7WUFqQjNDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsSUFBSSxFQUFFO29CQUNKLHVCQUF1QixFQUFFLDBCQUEwQjtvQkFDbkQseUJBQXlCLEVBQUUsNEJBQTRCO29CQUN2RCxjQUFjLEVBQUUsT0FBTztpQkFDeEI7Z0JBQ0QsUUFBUSxFQUFFOztLQUVQO2FBQ0o7OztZQVptQixVQUFVOzs7b0JBYzNCLEtBQUs7d0JBRUwsS0FBSzs7QUFpQlIsTUFBTSxPQUFPLG1CQUFtQjtJQUc5QixZQUFvQixPQUFtQjtRQUFuQixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBRnZDLFdBQU0sR0FBWSxLQUFLLENBQUM7SUFFa0IsQ0FBQztJQUUzQyxRQUFRO1FBQ04sSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzFFLENBQUM7OztZQWxCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFOzs7Ozs7O0tBT1A7YUFDSjs7O1lBaENtQixVQUFVOztBQWlEOUIsTUFBTSxPQUFPLHFCQUFxQjtJQU9oQyxXQUFXLENBQUMsT0FBdUI7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3ZELElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDOzs7WUFwQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUU7O0tBRVA7YUFDSjs7O21CQUVFLEtBQUs7O0FBc0JSLE1BQU0sT0FBTyxvQkFBb0I7OztZQU5oQyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLFFBQVEsRUFBRTs7S0FFUDthQUNKOztBQVdELE1BQU0sT0FBTyxxQkFBcUI7OztZQVJqQyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFFBQVEsRUFBRTs7OztLQUlQO2FBQ0o7O0FBU0QsTUFBTSxPQUFPLG1CQUFtQjs7O1lBTi9CLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUU7O0tBRVA7YUFDSjs7QUFhRCxNQUFNLE9BQU8sc0JBQXNCOzs7WUFWbEMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixJQUFJLEVBQUU7b0JBQ0osdUJBQXVCLEVBQUUsMEJBQTBCO29CQUNuRCx5QkFBeUIsRUFBRSw0QkFBNEI7aUJBQ3hEO2dCQUNELFFBQVEsRUFBRTs7S0FFUDthQUNKOzs7d0JBRUUsS0FBSzs7QUFVUixNQUFNLE9BQU8sa0JBQWtCOzs7WUFOOUIsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxVQUFVO2dCQUNwQixRQUFRLEVBQUU7O0tBRVA7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLWxpc3QnLFxyXG4gIGhvc3Q6IHtcclxuICAgICdbY2xhc3MudmVydGljYWwtbGlzdF0nOiAnZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCInLFxyXG4gICAgJ1tjbGFzcy5ob3Jpem9udGFsLWxpc3RdJzogJ2RpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCInLFxyXG4gICAgJ1thdHRyLnRoZW1lXSc6ICd0aGVtZScsXHJcbiAgfSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgIGAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvTGlzdEVsZW1lbnQge1xyXG4gIEBJbnB1dCgpXHJcbiAgdGhlbWU6IHN0cmluZztcclxuICBASW5wdXQoKVxyXG4gIGRpcmVjdGlvbjogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZikge31cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLWxpc3QtaXRlbScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC1pdGVtXCIgW25nQ2xhc3NdPVwieydhdmF0YXInOiBhdmF0YXJ9XCI+XHJcbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIml0ZW0taGVhZGVyXCI+PC9uZy1jb250ZW50PlxyXG4gICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJpdGVtLWNvbnRlbnRcIj48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIml0ZW0tZW5kXCI+PC9uZy1jb250ZW50PlxyXG4gICAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9MaXN0SXRlbUVsZW1lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIGF2YXRhcjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5hdmF0YXIgPSAhIXRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2l0ZW0tYXZhdGFyJyk7XHJcbiAgfVxyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2l0ZW0tYXZhdGFyJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxpICpuZ0lmPVwiaWNvbkNsYXNzXCIgW25nQ2xhc3NdPVwiY2xhc3NNYXBcIiB0aGVtZT1cImNvbnRhaW5lZFwiPjwvaT5cclxuICAgIGAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvSXRlbUF2YXRhckVsZW1lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XHJcbiAgQElucHV0KClcclxuICBpY29uOiBzdHJpbmc7XHJcblxyXG4gIGljb25DbGFzczogc3RyaW5nO1xyXG4gIGNsYXNzTWFwOiBhbnk7XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM/OiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICB0aGlzLmljb25DbGFzcyA9IHRoaXMuaWNvbiA/IGBiaGktJHt0aGlzLmljb259YCA6IG51bGw7XHJcbiAgICB0aGlzLmNsYXNzTWFwID0gW3RoaXMuaWNvbkNsYXNzLCB0aGlzLmljb25dO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLm5nT25DaGFuZ2VzKCk7XHJcbiAgfVxyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2l0ZW0tdGl0bGUnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGg2PjxuZy1jb250ZW50PjwvbmctY29udGVudD48L2g2PlxyXG4gICAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9JdGVtVGl0bGVFbGVtZW50IHt9XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2l0ZW0taGVhZGVyJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIml0ZW0tYXZhdGFyXCI+PC9uZy1jb250ZW50PlxyXG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIml0ZW0tdGl0bGVcIj48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiaXRlbS1oZWFkZXItZW5kXCI+PC9uZy1jb250ZW50PlxyXG4gICAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9JdGVtSGVhZGVyRWxlbWVudCB7fVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpdGVtLWhlYWRlci1lbmQnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9JdGVtRGF0ZUVsZW1lbnQge31cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaXRlbS1jb250ZW50JyxcclxuICBob3N0OiB7XHJcbiAgICAnW2NsYXNzLnZlcnRpY2FsLWxpc3RdJzogJ2RpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiJyxcclxuICAgICdbY2xhc3MuaG9yaXpvbnRhbC1saXN0XSc6ICdkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiJyxcclxuICB9LFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9JdGVtQ29udGVudEVsZW1lbnQge1xyXG4gIEBJbnB1dCgpXHJcbiAgZGlyZWN0aW9uOiBzdHJpbmc7XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaXRlbS1lbmQnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9JdGVtRW5kRWxlbWVudCB7fVxyXG4iXX0=