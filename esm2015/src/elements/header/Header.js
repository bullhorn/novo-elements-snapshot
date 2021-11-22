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
  `,
                host: {
                    class: 'novo-action',
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVhZGVyLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2hlYWRlci9IZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBTTNDLE1BQU0sT0FBTyxnQkFBZ0I7OztZQUo1QixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRSwyQkFBMkI7YUFDdEM7O0FBT0QsTUFBTSxPQUFPLGtCQUFrQjs7O1lBSjlCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsT0FBTztnQkFDakIsUUFBUSxFQUFFLDJCQUEyQjthQUN0Qzs7QUFjRCxNQUFNLE9BQU8sdUJBQXVCOzs7WUFYbkMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLFFBQVEsRUFBRTs7OztHQUlUO2dCQUNELElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsYUFBYTtpQkFDckI7YUFDRjs7O21CQUVFLEtBQUs7c0JBRUwsS0FBSzt1QkFFTCxLQUFLOztBQW1DUixNQUFNLE9BQU8sbUJBQW1CO0lBL0JoQztRQWlDUyxTQUFJLEdBQUcsU0FBUyxDQUFDO1FBRWpCLGdCQUFXLEdBQVcsYUFBYSxDQUFDO1FBSXBDLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFLM0IsWUFBTyxHQUFXLFNBQVMsQ0FBQztJQW1DckMsQ0FBQztJQTNCQyxJQUNJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQztJQUMvQixDQUFDO0lBRUQsSUFDSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQ0ksZ0JBQWdCO1FBQ2xCLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxJQUVJLEtBQUssQ0FBQyxLQUFhO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxLQUFLLE9BQU8sSUFBSSxLQUFLLEtBQUssV0FBVyxJQUFJLEtBQUssS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3pHLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQzs7O1lBNUVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMkJBQTJCO2dCQUNyQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCVDthQUNGOzs7bUJBRUUsV0FBVyxTQUFDLFdBQVc7MEJBRXZCLFdBQVcsU0FBQyxPQUFPO3dCQUVuQixXQUFXLFNBQUMsaUJBQWlCLGNBQzdCLEtBQUs7b0JBR0wsS0FBSzt1QkFFTCxLQUFLO21CQUlMLEtBQUs7bUJBR0wsS0FBSzs2QkFHTCxXQUFXLFNBQUMseUJBQXlCOzZCQUtyQyxXQUFXLFNBQUMseUJBQXlCOytCQUtyQyxXQUFXLFNBQUMsMkJBQTJCO29CQUt2QyxXQUFXLFNBQUMsWUFBWSxjQUN4QixLQUFLOztBQTdCTjtJQURDLFlBQVksRUFBRTs7c0RBQ21CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJy4uLy4uL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaGVhZGVyLXNwYWNlcicsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9IZWFkZXJTcGFjZXIge31cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXRpbHMnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVXRpbHNDb21wb25lbnQge31cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXRpbC1hY3Rpb24sIG5vdm8tYWN0aW9uJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bm92by1idXR0b24gdGhlbWU9XCJpY29uXCIgW2ljb25dPVwiaWNvblwiIFthdHRyLmludmVyc2VdPVwiaW52ZXJzZVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvbm92by1idXR0b24+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tYWN0aW9uJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1V0aWxBY3Rpb25Db21wb25lbnQge1xuICBASW5wdXQoKVxuICBwdWJsaWMgaWNvbjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBwdWJsaWMgaW52ZXJzZTogYm9vbGVhbjtcbiAgQElucHV0KClcbiAgcHVibGljIGRpc2FibGVkOiBib29sZWFuO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWhlYWRlcixoZWFkZXJbdGhlbWVdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c2VjdGlvbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItdGl0bGVcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3ByZWZpeF1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ0aXRsZVwiPlxuICAgICAgICAgIDxub3ZvLWljb24gY2xhc3M9XCJoZWFkZXItaWNvblwiICpuZ0lmPVwiaWNvblwiPnt7IGljb24gfX08L25vdm8taWNvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLXRpdGxlc1wiPlxuICAgICAgICAgICAgPG5vdm8tdGl0bGUgc2l6ZT1cImxhcmdlXCI+e3sgdGl0bGUgfX08L25vdm8tdGl0bGU+XG4gICAgICAgICAgICA8bm92by10aXRsZSBzaXplPVwic21hbGxcIj57eyBzdWJUaXRsZSB9fTwvbm92by10aXRsZT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhdGl0bGVcIj5cbiAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJub3ZvLWljb24sIFtub3ZvLWljb25dXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItdGl0bGVzXCI+XG4gICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJoMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBzbWFsbCwgbm92by10aXRsZSwgW25vdm8tdGl0bGVdLCBbbm92by1zdWJ0aXRsZV1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJzZWN0aW9uXCI+PC9uZy1jb250ZW50PlxuICAgICAgPHNwYW4gY2xhc3M9XCJzcGFjZXJcIj48L3NwYW4+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJ1dGlsc1wiPjwvbmctY29udGVudD5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltzdWZmaXhdXCI+PC9uZy1jb250ZW50PlxuICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1hY3Rpb25zXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5vdm8tYWN0aW9uLFtub3ZvLWFjdGlvbl1cIj48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvSGVhZGVyQ29tcG9uZW50IHtcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxuICBwdWJsaWMgcm9sZSA9ICdoZWFkaW5nJztcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIHB1YmxpYyBoZWFkZXJDbGFzczogc3RyaW5nID0gJ25vdm8taGVhZGVyJztcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jb25kZW5zZWQnKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgcHVibGljIGNvbmRlbnNlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBwdWJsaWMgdGl0bGU6IHN0cmluZztcbiAgQElucHV0KClcbiAgcHVibGljIHN1YlRpdGxlOiBzdHJpbmc7XG4gIHB1YmxpYyBpbnZlcnNlOiBzdHJpbmcgPSAnaW52ZXJzZSc7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGljb246IHN0cmluZztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2l6ZTogJ3NtYWxsJyB8ICdtZWRpdW0nIHwgJ2xhcmdlJztcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmhlYWRlci1zaXplLXNtYWxsJylcbiAgZ2V0IGhiX2lzU2l6ZVNtYWxsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNpemUgPT09ICdzbWFsbCc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmhlYWRlci1zaXplLWxhcmdlJylcbiAgZ2V0IGhiX2lzU2l6ZUxhcmdlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNpemUgPT09ICdsYXJnZSc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmhlYWRlci1zaXplLWRlZmF1bHQnKVxuICBnZXQgaGJfaXNTaXplRGVmYXVsdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIVsnc21hbGwnLCAnbGFyZ2UnXS5pbmNsdWRlcyh0aGlzLnNpemUpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnRoZW1lJylcbiAgQElucHV0KClcbiAgc2V0IHRoZW1lKHRoZW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl90aGVtZSA9IHRoZW1lO1xuICAgIHRoaXMuaW52ZXJzZSA9IHRoZW1lID09PSAnd2hpdGUnIHx8IHRoZW1lID09PSAnb2ZmLXdoaXRlJyB8fCB0aGVtZSA9PT0gJ2xpZ2h0JyA/IHVuZGVmaW5lZCA6ICdpbnZlcnNlJztcbiAgfVxuXG4gIGdldCB0aGVtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl90aGVtZTtcbiAgfVxuXG4gIHByaXZhdGUgX3RoZW1lOiBzdHJpbmc7XG59XG4iXX0=