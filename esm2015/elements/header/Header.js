import { Component, HostBinding, Input } from '@angular/core';
export class NovoHeaderSpacer {
}
NovoHeaderSpacer.decorators = [
    { type: Component, args: [{
                selector: 'header-spacer',
                template: `
    <ng-content></ng-content>
  `
            },] }
];
export class NovoUtilsComponent {
}
NovoUtilsComponent.decorators = [
    { type: Component, args: [{
                selector: 'utils',
                template: `
    <ng-content></ng-content>
  `
            },] }
];
export class NovoUtilActionComponent {
}
NovoUtilActionComponent.decorators = [
    { type: Component, args: [{
                selector: 'util-action, novo-action',
                template: `
    <button theme="icon" [icon]="icon" [attr.inverse]="inverse" [disabled]="disabled">
      <ng-content></ng-content>
    </button>
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
        this.headerClass = 'novo-header';
        this.condensed = false;
        this.inverse = 'inverse';
    }
    set theme(theme) {
        this._theme = theme;
        this.inverse = theme === 'white' || theme === 'off-white' || theme === 'light' ? undefined : 'inverse';
    }
    get theme() {
        return this._theme;
    }
    set icon(icon) {
        this._icon = `bhi-${icon}`;
    }
    get icon() {
        return this._icon;
    }
}
NovoHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'header[theme]',
                template: `
    <section>
      <div class="header-title">
        <ng-container *ngIf="title">
          <i *ngIf="icon" class="header-icon" [ngClass]="icon"></i>
          <div class="header-titles">
            <h1>{{ title }}</h1>
            <small *ngIf="subTitle">{{ subTitle }}</small>
          </div>
        </ng-container>
        <ng-container *ngIf="!title">
          <ng-content select="novo-icon, [novo-icon]"></ng-content>
          <div class="header-titles">
            <ng-content select="h1, h2, h3, h4, h5, h6, small, [novo-title], [novo-subtitle]"></ng-content>
          </div>
        </ng-container>
      </div>
      <ng-content select="section"></ng-content>
      <span flex></span>
      <ng-content select="utils"></ng-content>
      <ng-content select="novo-action"></ng-content>
    </section>
    <ng-content></ng-content>
  `
            },] }
];
NovoHeaderComponent.propDecorators = {
    headerClass: [{ type: HostBinding, args: ['class',] }],
    condensed: [{ type: HostBinding, args: ['class.condensed',] }, { type: Input }],
    title: [{ type: Input }],
    subTitle: [{ type: Input }],
    theme: [{ type: HostBinding, args: ['attr.theme',] }, { type: Input }],
    icon: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVhZGVyLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9oZWFkZXIvSGVhZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVE5RCxNQUFNLE9BQU8sZ0JBQWdCOzs7WUFONUIsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUU7O0dBRVQ7YUFDRjs7QUFTRCxNQUFNLE9BQU8sa0JBQWtCOzs7WUFOOUIsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUU7O0dBRVQ7YUFDRjs7QUFXRCxNQUFNLE9BQU8sdUJBQXVCOzs7WUFSbkMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLFFBQVEsRUFBRTs7OztHQUlUO2FBQ0Y7OzttQkFFRSxLQUFLO3NCQUVMLEtBQUs7dUJBRUwsS0FBSzs7QUErQlIsTUFBTSxPQUFPLG1CQUFtQjtJQTNCaEM7UUE2QlMsZ0JBQVcsR0FBVyxhQUFhLENBQUM7UUFHcEMsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUszQixZQUFPLEdBQVcsU0FBUyxDQUFDO0lBd0JyQyxDQUFDO0lBdEJDLElBRUksS0FBSyxDQUFDLEtBQWE7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLEtBQUssT0FBTyxJQUFJLEtBQUssS0FBSyxXQUFXLElBQUksS0FBSyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDekcsQ0FBQztJQUVELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFDSSxJQUFJLENBQUMsSUFBWTtRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDOzs7WUF6REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJUO2FBQ0Y7OzswQkFFRSxXQUFXLFNBQUMsT0FBTzt3QkFFbkIsV0FBVyxTQUFDLGlCQUFpQixjQUM3QixLQUFLO29CQUVMLEtBQUs7dUJBRUwsS0FBSztvQkFJTCxXQUFXLFNBQUMsWUFBWSxjQUN4QixLQUFLO21CQVVMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdoZWFkZXItc3BhY2VyJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gIGAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvSGVhZGVyU3BhY2VyIHt9XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3V0aWxzJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gIGAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvVXRpbHNDb21wb25lbnQge31cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAndXRpbC1hY3Rpb24sIG5vdm8tYWN0aW9uJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGJ1dHRvbiB0aGVtZT1cImljb25cIiBbaWNvbl09XCJpY29uXCIgW2F0dHIuaW52ZXJzZV09XCJpbnZlcnNlXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCI+XHJcbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgIDwvYnV0dG9uPlxyXG4gIGAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvVXRpbEFjdGlvbkNvbXBvbmVudCB7XHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgaWNvbjogc3RyaW5nO1xyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIGludmVyc2U6IGJvb2xlYW47XHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaGVhZGVyW3RoZW1lXScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxzZWN0aW9uPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLXRpdGxlXCI+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInRpdGxlXCI+XHJcbiAgICAgICAgICA8aSAqbmdJZj1cImljb25cIiBjbGFzcz1cImhlYWRlci1pY29uXCIgW25nQ2xhc3NdPVwiaWNvblwiPjwvaT5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItdGl0bGVzXCI+XHJcbiAgICAgICAgICAgIDxoMT57eyB0aXRsZSB9fTwvaDE+XHJcbiAgICAgICAgICAgIDxzbWFsbCAqbmdJZj1cInN1YlRpdGxlXCI+e3sgc3ViVGl0bGUgfX08L3NtYWxsPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiF0aXRsZVwiPlxyXG4gICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibm92by1pY29uLCBbbm92by1pY29uXVwiPjwvbmctY29udGVudD5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItdGl0bGVzXCI+XHJcbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHNtYWxsLCBbbm92by10aXRsZV0sIFtub3ZvLXN1YnRpdGxlXVwiPjwvbmctY29udGVudD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwic2VjdGlvblwiPjwvbmctY29udGVudD5cclxuICAgICAgPHNwYW4gZmxleD48L3NwYW4+XHJcbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInV0aWxzXCI+PC9uZy1jb250ZW50PlxyXG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJub3ZvLWFjdGlvblwiPjwvbmctY29udGVudD5cclxuICAgIDwvc2VjdGlvbj5cclxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICBgLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b0hlYWRlckNvbXBvbmVudCB7XHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXHJcbiAgcHVibGljIGhlYWRlckNsYXNzOiBzdHJpbmcgPSAnbm92by1oZWFkZXInO1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3MuY29uZGVuc2VkJylcclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyBjb25kZW5zZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIHN1YlRpdGxlOiBzdHJpbmc7XHJcbiAgcHVibGljIGludmVyc2U6IHN0cmluZyA9ICdpbnZlcnNlJztcclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnRoZW1lJylcclxuICBASW5wdXQoKVxyXG4gIHNldCB0aGVtZSh0aGVtZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl90aGVtZSA9IHRoZW1lO1xyXG4gICAgdGhpcy5pbnZlcnNlID0gdGhlbWUgPT09ICd3aGl0ZScgfHwgdGhlbWUgPT09ICdvZmYtd2hpdGUnIHx8IHRoZW1lID09PSAnbGlnaHQnID8gdW5kZWZpbmVkIDogJ2ludmVyc2UnO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHRoZW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fdGhlbWU7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBpY29uKGljb246IHN0cmluZykge1xyXG4gICAgdGhpcy5faWNvbiA9IGBiaGktJHtpY29ufWA7XHJcbiAgfVxyXG5cclxuICBnZXQgaWNvbigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ljb247XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF90aGVtZTogc3RyaW5nO1xyXG4gIHByaXZhdGUgX2ljb246IHN0cmluZztcclxufVxyXG4iXX0=