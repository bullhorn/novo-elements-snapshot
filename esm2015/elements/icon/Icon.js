import { Component, ElementRef, Input, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
export class NovoIconComponent {
    constructor(element, cdr) {
        this.element = element;
        this.cdr = cdr;
        this.size = 'medium';
        this.role = 'img';
    }
    set alt(value) {
        this.ariaLabel = value;
    }
    get alt() {
        return this.ariaLabel;
    }
    set name(iconName) {
        this.iconName = `bhi-${iconName}`;
    }
    get name() {
        return this.iconName;
    }
    ngAfterViewInit() {
        if (this.element.nativeElement.textContent.trim()) {
            Promise.resolve().then(() => {
                this.name = this.element.nativeElement.textContent.trim();
                this.cdr.markForCheck();
            });
        }
    }
}
NovoIconComponent.decorators = [
    { type: Component, args: [{
                selector: 'novo-icon',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
        <i [class]="iconName"><span><ng-content></ng-content></span></i>
    `
            },] }
];
NovoIconComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
NovoIconComponent.propDecorators = {
    raised: [{ type: HostBinding, args: ['attr.raised',] }, { type: Input }],
    size: [{ type: HostBinding, args: ['attr.size',] }, { type: Input }],
    theme: [{ type: HostBinding, args: ['attr.theme',] }, { type: Input }],
    color: [{ type: HostBinding, args: ['attr.color',] }, { type: Input }],
    role: [{ type: HostBinding, args: ['attr.role',] }],
    ariaLabel: [{ type: HostBinding, args: ['attr.aria-label',] }],
    alt: [{ type: Input }],
    name: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSWNvbi5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvaWNvbi9JY29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQWlCLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBU3JJLE1BQU0sT0FBTyxpQkFBaUI7SUFzQzVCLFlBQW1CLE9BQW1CLEVBQVUsR0FBc0I7UUFBbkQsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBaEMvRCxTQUFJLEdBQVcsUUFBUSxDQUFDO1FBUXhCLFNBQUksR0FBVyxLQUFLLENBQUM7SUF3QjZDLENBQUM7SUFwQjFFLElBQ0ksR0FBRyxDQUFDLEtBQWE7UUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksR0FBRztRQUNMLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFDSSxJQUFJLENBQUMsUUFBZ0I7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLFFBQVEsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQU1NLGVBQWU7UUFDcEIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDakQsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUMxRCxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7WUF0REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxXQUFXO2dCQUNyQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsUUFBUSxFQUFFOztLQUVQO2FBQ0o7OztZQVJtQixVQUFVO1lBQThELGlCQUFpQjs7O3FCQVUxRyxXQUFXLFNBQUMsYUFBYSxjQUN6QixLQUFLO21CQUVMLFdBQVcsU0FBQyxXQUFXLGNBQ3ZCLEtBQUs7b0JBRUwsV0FBVyxTQUFDLFlBQVksY0FDeEIsS0FBSztvQkFFTCxXQUFXLFNBQUMsWUFBWSxjQUN4QixLQUFLO21CQUVMLFdBQVcsU0FBQyxXQUFXO3dCQUV2QixXQUFXLFNBQUMsaUJBQWlCO2tCQUc3QixLQUFLO21CQVNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBIb3N0QmluZGluZywgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25vdm8taWNvbicsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8aSBbY2xhc3NdPVwiaWNvbk5hbWVcIj48c3Bhbj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9zcGFuPjwvaT5cclxuICAgIGAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvSWNvbkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xyXG4gIEBIb3N0QmluZGluZygnYXR0ci5yYWlzZWQnKVxyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIHJhaXNlZDogYm9vbGVhbjtcclxuICBASG9zdEJpbmRpbmcoJ2F0dHIuc2l6ZScpXHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgc2l6ZTogc3RyaW5nID0gJ21lZGl1bSc7XHJcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnRoZW1lJylcclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyB0aGVtZTogc3RyaW5nO1xyXG4gIEBIb3N0QmluZGluZygnYXR0ci5jb2xvcicpXHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgY29sb3I6IHN0cmluZztcclxuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpXHJcbiAgcHVibGljIHJvbGU6IHN0cmluZyA9ICdpbWcnO1xyXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWxhYmVsJylcclxuICBwdWJsaWMgYXJpYUxhYmVsOiBzdHJpbmc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGFsdCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmFyaWFMYWJlbCA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGFsdCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuYXJpYUxhYmVsO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgbmFtZShpY29uTmFtZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmljb25OYW1lID0gYGJoaS0ke2ljb25OYW1lfWA7XHJcbiAgfVxyXG5cclxuICBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuaWNvbk5hbWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaWNvbk5hbWU6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge31cclxuXHJcbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC50ZXh0Q29udGVudC50cmltKCkpIHtcclxuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQudHJpbSgpO1xyXG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19