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
                selector: 'novo-header,header[theme],header[accent]',
                template: `
    <section>
      <div class="header-title">
        <ng-content select="[prefix]"></ng-content>
        <ng-container *ngIf="title">
          <novo-icon class="header-icon" *ngIf="icon">{{ icon }}</novo-icon>
          <div class="header-titles">
            <novo-title size="xl">{{ title }}</novo-title>
            <novo-title size="md" *ngIf="subTitle">{{ subTitle }}</novo-title>
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
      <div class="header-actions">
        <ng-content select="novo-action,[novo-action]"></ng-content>
      </div>
      <ng-content select="utils"></ng-content>
      <ng-content select="[suffix]"></ng-content>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVhZGVyLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2hlYWRlci9IZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBTTNDLE1BQU0sT0FBTyxnQkFBZ0I7OztZQUo1QixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRSwyQkFBMkI7YUFDdEM7O0FBT0QsTUFBTSxPQUFPLGtCQUFrQjs7O1lBSjlCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsT0FBTztnQkFDakIsUUFBUSxFQUFFLDJCQUEyQjthQUN0Qzs7QUFjRCxNQUFNLE9BQU8sdUJBQXVCOzs7WUFYbkMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLFFBQVEsRUFBRTs7OztHQUlUO2dCQUNELElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsYUFBYTtpQkFDckI7YUFDRjs7O21CQUVFLEtBQUs7c0JBRUwsS0FBSzt1QkFFTCxLQUFLOztBQW1DUixNQUFNLE9BQU8sbUJBQW1CO0lBL0JoQztRQWlDUyxTQUFJLEdBQUcsU0FBUyxDQUFDO1FBRWpCLGdCQUFXLEdBQVcsYUFBYSxDQUFDO1FBSXBDLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFLM0IsWUFBTyxHQUFXLFNBQVMsQ0FBQztJQW1DckMsQ0FBQztJQTNCQyxJQUNJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQztJQUMvQixDQUFDO0lBRUQsSUFDSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQ0ksZ0JBQWdCO1FBQ2xCLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxJQUVJLEtBQUssQ0FBQyxLQUFhO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxLQUFLLE9BQU8sSUFBSSxLQUFLLEtBQUssV0FBVyxJQUFJLEtBQUssS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3pHLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQzs7O1lBNUVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMENBQTBDO2dCQUNwRCxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCVDthQUNGOzs7bUJBRUUsV0FBVyxTQUFDLFdBQVc7MEJBRXZCLFdBQVcsU0FBQyxPQUFPO3dCQUVuQixXQUFXLFNBQUMsaUJBQWlCLGNBQzdCLEtBQUs7b0JBR0wsS0FBSzt1QkFFTCxLQUFLO21CQUlMLEtBQUs7bUJBR0wsS0FBSzs2QkFHTCxXQUFXLFNBQUMseUJBQXlCOzZCQUtyQyxXQUFXLFNBQUMseUJBQXlCOytCQUtyQyxXQUFXLFNBQUMsMkJBQTJCO29CQUt2QyxXQUFXLFNBQUMsWUFBWSxjQUN4QixLQUFLOztBQTdCTjtJQURDLFlBQVksRUFBRTs7c0RBQ21CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJy4uLy4uL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaGVhZGVyLXNwYWNlcicsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9IZWFkZXJTcGFjZXIge31cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXRpbHMnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVXRpbHNDb21wb25lbnQge31cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXRpbC1hY3Rpb24sIG5vdm8tYWN0aW9uJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bm92by1idXR0b24gdGhlbWU9XCJpY29uXCIgW2ljb25dPVwiaWNvblwiIFthdHRyLmludmVyc2VdPVwiaW52ZXJzZVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvbm92by1idXR0b24+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tYWN0aW9uJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1V0aWxBY3Rpb25Db21wb25lbnQge1xuICBASW5wdXQoKVxuICBwdWJsaWMgaWNvbjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBwdWJsaWMgaW52ZXJzZTogYm9vbGVhbjtcbiAgQElucHV0KClcbiAgcHVibGljIGRpc2FibGVkOiBib29sZWFuO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWhlYWRlcixoZWFkZXJbdGhlbWVdLGhlYWRlclthY2NlbnRdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c2VjdGlvbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItdGl0bGVcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3ByZWZpeF1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ0aXRsZVwiPlxuICAgICAgICAgIDxub3ZvLWljb24gY2xhc3M9XCJoZWFkZXItaWNvblwiICpuZ0lmPVwiaWNvblwiPnt7IGljb24gfX08L25vdm8taWNvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLXRpdGxlc1wiPlxuICAgICAgICAgICAgPG5vdm8tdGl0bGUgc2l6ZT1cInhsXCI+e3sgdGl0bGUgfX08L25vdm8tdGl0bGU+XG4gICAgICAgICAgICA8bm92by10aXRsZSBzaXplPVwibWRcIiAqbmdJZj1cInN1YlRpdGxlXCI+e3sgc3ViVGl0bGUgfX08L25vdm8tdGl0bGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXRpdGxlXCI+XG4gICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibm92by1pY29uLCBbbm92by1pY29uXVwiPjwvbmctY29udGVudD5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLXRpdGxlc1wiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgc21hbGwsIG5vdm8tdGl0bGUsIFtub3ZvLXRpdGxlXSwgW25vdm8tc3VidGl0bGVdXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwic2VjdGlvblwiPjwvbmctY29udGVudD5cbiAgICAgIDxzcGFuIGNsYXNzPVwic3BhY2VyXCI+PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1hY3Rpb25zXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5vdm8tYWN0aW9uLFtub3ZvLWFjdGlvbl1cIj48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInV0aWxzXCI+PC9uZy1jb250ZW50PlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3N1ZmZpeF1cIj48L25nLWNvbnRlbnQ+XG4gICAgPC9zZWN0aW9uPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0hlYWRlckNvbXBvbmVudCB7XG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcbiAgcHVibGljIHJvbGUgPSAnaGVhZGluZyc7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBwdWJsaWMgaGVhZGVyQ2xhc3M6IHN0cmluZyA9ICdub3ZvLWhlYWRlcic7XG4gIEBIb3N0QmluZGluZygnY2xhc3MuY29uZGVuc2VkJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIHB1YmxpYyBjb25kZW5zZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzdWJUaXRsZTogc3RyaW5nO1xuICBwdWJsaWMgaW52ZXJzZTogc3RyaW5nID0gJ2ludmVyc2UnO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBpY29uOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNpemU6ICdzbWFsbCcgfCAnbWVkaXVtJyB8ICdsYXJnZSc7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5oZWFkZXItc2l6ZS1zbWFsbCcpXG4gIGdldCBoYl9pc1NpemVTbWFsbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zaXplID09PSAnc21hbGwnO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5oZWFkZXItc2l6ZS1sYXJnZScpXG4gIGdldCBoYl9pc1NpemVMYXJnZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zaXplID09PSAnbGFyZ2UnO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5oZWFkZXItc2l6ZS1kZWZhdWx0JylcbiAgZ2V0IGhiX2lzU2l6ZURlZmF1bHQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICFbJ3NtYWxsJywgJ2xhcmdlJ10uaW5jbHVkZXModGhpcy5zaXplKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci50aGVtZScpXG4gIEBJbnB1dCgpXG4gIHNldCB0aGVtZSh0aGVtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fdGhlbWUgPSB0aGVtZTtcbiAgICB0aGlzLmludmVyc2UgPSB0aGVtZSA9PT0gJ3doaXRlJyB8fCB0aGVtZSA9PT0gJ29mZi13aGl0ZScgfHwgdGhlbWUgPT09ICdsaWdodCcgPyB1bmRlZmluZWQgOiAnaW52ZXJzZSc7XG4gIH1cblxuICBnZXQgdGhlbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdGhlbWU7XG4gIH1cblxuICBwcml2YXRlIF90aGVtZTogc3RyaW5nO1xufVxuIl19