import { __decorate, __metadata } from "tslib";
import { Component, HostBinding, Input } from '@angular/core';
import { BooleanInput } from '../../utils';
export class NovoHeaderSpacer {
}
NovoHeaderSpacer.decorators = [
    { type: Component, args: [{
                selector: 'header-spacer',
                template: `<ng-content></ng-content>`
            },] }
];
export class NovoUtilsComponent {
}
NovoUtilsComponent.decorators = [
    { type: Component, args: [{
                selector: 'utils',
                template: `<ng-content></ng-content>`
            },] }
];
export class NovoUtilActionComponent {
}
NovoUtilActionComponent.decorators = [
    { type: Component, args: [{
                selector: 'util-action, novo-action',
                template: `
    <novo-button theme="icon" [icon]="icon" [attr.inverse]="inverse" [disabled]="disabled">
      <ng-content></ng-content>
    </novo-button>
  `
            },] }
];
NovoUtilActionComponent.propDecorators = {
    icon: [{ type: Input }],
    inverse: [{ type: Input }],
    disabled: [{ type: Input }]
};
export class NovoHeaderComponent {
    constructor() {
        this.role = 'heading';
        this.headerClass = 'novo-header';
        this.condensed = false;
        this.inverse = 'inverse';
    }
    get hb_isSizeSmall() {
        return this.size === 'small';
    }
    get hb_isSizeLarge() {
        return this.size === 'large';
    }
    get hb_isSizeDefault() {
        return !['small', 'large'].includes(this.size);
    }
    set theme(theme) {
        this._theme = theme;
        this.inverse = theme === 'white' || theme === 'off-white' || theme === 'light' ? undefined : 'inverse';
    }
    get theme() {
        return this._theme;
    }
}
NovoHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'novo-header,header[theme]',
                template: `
    <section>
      <div class="header-title">
        <ng-content select="[prefix]"></ng-content>
        <ng-container *ngIf="title">
          <novo-icon class="header-icon" *ngIf="icon">{{ icon }}</novo-icon>
          <div class="header-titles">
            <novo-title size="large">{{ title }}</novo-title>
            <novo-title size="small">{{ subTitle }}</novo-title>
          </div>
        </ng-container>
        <ng-container *ngIf="!title">
          <ng-content select="novo-icon, [novo-icon]"></ng-content>
          <div class="header-titles">
            <ng-content select="h1, h2, h3, h4, h5, h6, small, novo-title, [novo-title], [novo-subtitle]"></ng-content>
          </div>
        </ng-container>
      </div>
      <ng-content select="section"></ng-content>
      <span class="spacer"></span>
      <ng-content select="utils"></ng-content>
      <ng-content select="[suffix]"></ng-content>
      <div class="header-actions">
        <ng-content select="novo-action,[novo-action]"></ng-content>
      </div>
    </section>
    <ng-content></ng-content>
  `
            },] }
];
NovoHeaderComponent.propDecorators = {
    role: [{ type: HostBinding, args: ['attr.role',] }],
    headerClass: [{ type: HostBinding, args: ['class',] }],
    condensed: [{ type: HostBinding, args: ['class.condensed',] }, { type: Input }],
    title: [{ type: Input }],
    subTitle: [{ type: Input }],
    icon: [{ type: Input }],
    size: [{ type: Input }],
    hb_isSizeSmall: [{ type: HostBinding, args: ['class.header-size-small',] }],
    hb_isSizeLarge: [{ type: HostBinding, args: ['class.header-size-large',] }],
    hb_isSizeDefault: [{ type: HostBinding, args: ['class.header-size-default',] }],
    theme: [{ type: HostBinding, args: ['attr.theme',] }, { type: Input }]
};
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoHeaderComponent.prototype, "condensed", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVhZGVyLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2hlYWRlci9IZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBTTNDLE1BQU0sT0FBTyxnQkFBZ0I7OztZQUo1QixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRSwyQkFBMkI7YUFDdEM7O0FBT0QsTUFBTSxPQUFPLGtCQUFrQjs7O1lBSjlCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsT0FBTztnQkFDakIsUUFBUSxFQUFFLDJCQUEyQjthQUN0Qzs7QUFXRCxNQUFNLE9BQU8sdUJBQXVCOzs7WUFSbkMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLFFBQVEsRUFBRTs7OztHQUlUO2FBQ0Y7OzttQkFFRSxLQUFLO3NCQUVMLEtBQUs7dUJBRUwsS0FBSzs7QUFtQ1IsTUFBTSxPQUFPLG1CQUFtQjtJQS9CaEM7UUFpQ1MsU0FBSSxHQUFHLFNBQVMsQ0FBQztRQUVqQixnQkFBVyxHQUFXLGFBQWEsQ0FBQztRQUlwQyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBSzNCLFlBQU8sR0FBVyxTQUFTLENBQUM7SUFtQ3JDLENBQUM7SUEzQkMsSUFDSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQ0ksY0FBYztRQUNoQixPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUNJLGdCQUFnQjtRQUNsQixPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsSUFFSSxLQUFLLENBQUMsS0FBYTtRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssS0FBSyxPQUFPLElBQUksS0FBSyxLQUFLLFdBQVcsSUFBSSxLQUFLLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUN6RyxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7OztZQTVFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQlQ7YUFDRjs7O21CQUVFLFdBQVcsU0FBQyxXQUFXOzBCQUV2QixXQUFXLFNBQUMsT0FBTzt3QkFFbkIsV0FBVyxTQUFDLGlCQUFpQixjQUM3QixLQUFLO29CQUdMLEtBQUs7dUJBRUwsS0FBSzttQkFJTCxLQUFLO21CQUdMLEtBQUs7NkJBR0wsV0FBVyxTQUFDLHlCQUF5Qjs2QkFLckMsV0FBVyxTQUFDLHlCQUF5QjsrQkFLckMsV0FBVyxTQUFDLDJCQUEyQjtvQkFLdkMsV0FBVyxTQUFDLFlBQVksY0FDeEIsS0FBSzs7QUE3Qk47SUFEQyxZQUFZLEVBQUU7O3NEQUNtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICcuLi8uLi91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2hlYWRlci1zcGFjZXInLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvSGVhZGVyU3BhY2VyIHt9XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3V0aWxzJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1V0aWxzQ29tcG9uZW50IHt9XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3V0aWwtYWN0aW9uLCBub3ZvLWFjdGlvbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5vdm8tYnV0dG9uIHRoZW1lPVwiaWNvblwiIFtpY29uXT1cImljb25cIiBbYXR0ci5pbnZlcnNlXT1cImludmVyc2VcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L25vdm8tYnV0dG9uPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVXRpbEFjdGlvbkNvbXBvbmVudCB7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBpY29uOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBpbnZlcnNlOiBib29sZWFuO1xuICBASW5wdXQoKVxuICBwdWJsaWMgZGlzYWJsZWQ6IGJvb2xlYW47XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8taGVhZGVyLGhlYWRlclt0aGVtZV0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzZWN0aW9uPlxuICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci10aXRsZVwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbcHJlZml4XVwiPjwvbmctY29udGVudD5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInRpdGxlXCI+XG4gICAgICAgICAgPG5vdm8taWNvbiBjbGFzcz1cImhlYWRlci1pY29uXCIgKm5nSWY9XCJpY29uXCI+e3sgaWNvbiB9fTwvbm92by1pY29uPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItdGl0bGVzXCI+XG4gICAgICAgICAgICA8bm92by10aXRsZSBzaXplPVwibGFyZ2VcIj57eyB0aXRsZSB9fTwvbm92by10aXRsZT5cbiAgICAgICAgICAgIDxub3ZvLXRpdGxlIHNpemU9XCJzbWFsbFwiPnt7IHN1YlRpdGxlIH19PC9ub3ZvLXRpdGxlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiF0aXRsZVwiPlxuICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5vdm8taWNvbiwgW25vdm8taWNvbl1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci10aXRsZXNcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHNtYWxsLCBub3ZvLXRpdGxlLCBbbm92by10aXRsZV0sIFtub3ZvLXN1YnRpdGxlXVwiPjwvbmctY29udGVudD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInNlY3Rpb25cIj48L25nLWNvbnRlbnQ+XG4gICAgICA8c3BhbiBjbGFzcz1cInNwYWNlclwiPjwvc3Bhbj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInV0aWxzXCI+PC9uZy1jb250ZW50PlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3N1ZmZpeF1cIj48L25nLWNvbnRlbnQ+XG4gICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWFjdGlvbnNcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibm92by1hY3Rpb24sW25vdm8tYWN0aW9uXVwiPjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9IZWFkZXJDb21wb25lbnQge1xuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpXG4gIHB1YmxpYyByb2xlID0gJ2hlYWRpbmcnO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgcHVibGljIGhlYWRlckNsYXNzOiBzdHJpbmcgPSAnbm92by1oZWFkZXInO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmNvbmRlbnNlZCcpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBwdWJsaWMgY29uZGVuc2VkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuICBASW5wdXQoKVxuICBwdWJsaWMgc3ViVGl0bGU6IHN0cmluZztcbiAgcHVibGljIGludmVyc2U6IHN0cmluZyA9ICdpbnZlcnNlJztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgaWNvbjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzaXplOiAnc21hbGwnIHwgJ21lZGl1bScgfCAnbGFyZ2UnO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuaGVhZGVyLXNpemUtc21hbGwnKVxuICBnZXQgaGJfaXNTaXplU21hbGwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gJ3NtYWxsJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuaGVhZGVyLXNpemUtbGFyZ2UnKVxuICBnZXQgaGJfaXNTaXplTGFyZ2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gJ2xhcmdlJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuaGVhZGVyLXNpemUtZGVmYXVsdCcpXG4gIGdldCBoYl9pc1NpemVEZWZhdWx0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhWydzbWFsbCcsICdsYXJnZSddLmluY2x1ZGVzKHRoaXMuc2l6ZSk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIudGhlbWUnKVxuICBASW5wdXQoKVxuICBzZXQgdGhlbWUodGhlbWU6IHN0cmluZykge1xuICAgIHRoaXMuX3RoZW1lID0gdGhlbWU7XG4gICAgdGhpcy5pbnZlcnNlID0gdGhlbWUgPT09ICd3aGl0ZScgfHwgdGhlbWUgPT09ICdvZmYtd2hpdGUnIHx8IHRoZW1lID09PSAnbGlnaHQnID8gdW5kZWZpbmVkIDogJ2ludmVyc2UnO1xuICB9XG5cbiAgZ2V0IHRoZW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3RoZW1lO1xuICB9XG5cbiAgcHJpdmF0ZSBfdGhlbWU6IHN0cmluZztcbn1cbiJdfQ==