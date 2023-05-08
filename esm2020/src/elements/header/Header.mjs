import { __decorate, __metadata } from "tslib";
import { Component, HostBinding, Input } from '@angular/core';
import { BooleanInput } from '../../utils';
import * as i0 from "@angular/core";
import * as i1 from "../button/Button";
import * as i2 from "../common/directives/theme.directive";
import * as i3 from "../icon/Icon";
import * as i4 from "../common/typography/title/title.component";
import * as i5 from "@angular/common";
export class NovoHeaderSpacer {
}
NovoHeaderSpacer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoHeaderSpacer, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoHeaderSpacer.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoHeaderSpacer, selector: "header-spacer", ngImport: i0, template: `<ng-content></ng-content>`, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoHeaderSpacer, decorators: [{
            type: Component,
            args: [{
                    selector: 'header-spacer',
                    template: `<ng-content></ng-content>`,
                }]
        }] });
export class NovoUtilsComponent {
}
NovoUtilsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoUtilsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoUtilsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoUtilsComponent, selector: "utils", ngImport: i0, template: `<ng-content></ng-content>`, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoUtilsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'utils',
                    template: `<ng-content></ng-content>`,
                }]
        }] });
export class NovoUtilActionComponent {
}
NovoUtilActionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoUtilActionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoUtilActionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoUtilActionComponent, selector: "util-action, novo-action", inputs: { icon: "icon", size: "size", inverse: "inverse", disabled: "disabled" }, host: { classAttribute: "novo-action" }, ngImport: i0, template: `
    <novo-button theme="icon" [icon]="icon" [size]="size" [attr.inverse]="inverse" [disabled]="disabled">
      <ng-content></ng-content>
    </novo-button>
  `, isInline: true, components: [{ type: i1.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }], directives: [{ type: i2.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoUtilActionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'util-action, novo-action',
                    template: `
    <novo-button theme="icon" [icon]="icon" [size]="size" [attr.inverse]="inverse" [disabled]="disabled">
      <ng-content></ng-content>
    </novo-button>
  `,
                    host: {
                        class: 'novo-action',
                    },
                }]
        }], propDecorators: { icon: [{
                type: Input
            }], size: [{
                type: Input
            }], inverse: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });
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
NovoHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoHeaderComponent, selector: "novo-header,header[theme],header[accent]", inputs: { condensed: "condensed", title: "title", subTitle: "subTitle", icon: "icon", size: "size", theme: "theme" }, host: { properties: { "attr.role": "this.role", "class": "this.headerClass", "class.condensed": "this.condensed", "class.header-size-small": "this.hb_isSizeSmall", "class.header-size-large": "this.hb_isSizeLarge", "class.header-size-default": "this.hb_isSizeDefault", "attr.theme": "this.theme" } }, ngImport: i0, template: `
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
  `, isInline: true, components: [{ type: i3.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i4.NovoTitle, selector: "novo-title,[novo-title]" }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoHeaderComponent.prototype, "condensed", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoHeaderComponent, decorators: [{
            type: Component,
            args: [{
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
  `,
                }]
        }], propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }], headerClass: [{
                type: HostBinding,
                args: ['class']
            }], condensed: [{
                type: HostBinding,
                args: ['class.condensed']
            }, {
                type: Input
            }], title: [{
                type: Input
            }], subTitle: [{
                type: Input
            }], icon: [{
                type: Input
            }], size: [{
                type: Input
            }], hb_isSizeSmall: [{
                type: HostBinding,
                args: ['class.header-size-small']
            }], hb_isSizeLarge: [{
                type: HostBinding,
                args: ['class.header-size-large']
            }], hb_isSizeDefault: [{
                type: HostBinding,
                args: ['class.header-size-default']
            }], theme: [{
                type: HostBinding,
                args: ['attr.theme']
            }, {
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVhZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvaGVhZGVyL0hlYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7Ozs7QUFNM0MsTUFBTSxPQUFPLGdCQUFnQjs7OEdBQWhCLGdCQUFnQjtrR0FBaEIsZ0JBQWdCLHFEQUZqQiwyQkFBMkI7NEZBRTFCLGdCQUFnQjtrQkFKNUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFLDJCQUEyQjtpQkFDdEM7O0FBT0QsTUFBTSxPQUFPLGtCQUFrQjs7Z0hBQWxCLGtCQUFrQjtvR0FBbEIsa0JBQWtCLDZDQUZuQiwyQkFBMkI7NEZBRTFCLGtCQUFrQjtrQkFKOUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsT0FBTztvQkFDakIsUUFBUSxFQUFFLDJCQUEyQjtpQkFDdEM7O0FBY0QsTUFBTSxPQUFPLHVCQUF1Qjs7cUhBQXZCLHVCQUF1Qjt5R0FBdkIsdUJBQXVCLDJMQVR4Qjs7OztHQUlUOzRGQUtVLHVCQUF1QjtrQkFYbkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxRQUFRLEVBQUU7Ozs7R0FJVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLGFBQWE7cUJBQ3JCO2lCQUNGOzhCQUdRLElBQUk7c0JBRFYsS0FBSztnQkFHQyxJQUFJO3NCQURWLEtBQUs7Z0JBR0MsT0FBTztzQkFEYixLQUFLO2dCQUdDLFFBQVE7c0JBRGQsS0FBSzs7QUFtQ1IsTUFBTSxPQUFPLG1CQUFtQjtJQS9CaEM7UUFpQ1MsU0FBSSxHQUFHLFNBQVMsQ0FBQztRQUVqQixnQkFBVyxHQUFXLGFBQWEsQ0FBQztRQUlwQyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBSzNCLFlBQU8sR0FBVyxTQUFTLENBQUM7S0FtQ3BDO0lBM0JDLElBQ0ksY0FBYztRQUNoQixPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUNJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQztJQUMvQixDQUFDO0lBRUQsSUFDSSxnQkFBZ0I7UUFDbEIsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELElBRUksS0FBSyxDQUFDLEtBQWE7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLEtBQUssT0FBTyxJQUFJLEtBQUssS0FBSyxXQUFXLElBQUksS0FBSyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDekcsQ0FBQztJQUVELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDOztpSEE3Q1UsbUJBQW1CO3FHQUFuQixtQkFBbUIsa2ZBN0JwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJUO0FBVUQ7SUFEQyxZQUFZLEVBQUU7O3NEQUNtQjs0RkFSdkIsbUJBQW1CO2tCQS9CL0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsMENBQTBDO29CQUNwRCxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCVDtpQkFDRjs4QkFHUSxJQUFJO3NCQURWLFdBQVc7dUJBQUMsV0FBVztnQkFHakIsV0FBVztzQkFEakIsV0FBVzt1QkFBQyxPQUFPO2dCQUtiLFNBQVM7c0JBSGYsV0FBVzt1QkFBQyxpQkFBaUI7O3NCQUM3QixLQUFLO2dCQUlDLEtBQUs7c0JBRFgsS0FBSztnQkFHQyxRQUFRO3NCQURkLEtBQUs7Z0JBS0MsSUFBSTtzQkFEVixLQUFLO2dCQUlDLElBQUk7c0JBRFYsS0FBSztnQkFJRixjQUFjO3NCQURqQixXQUFXO3VCQUFDLHlCQUF5QjtnQkFNbEMsY0FBYztzQkFEakIsV0FBVzt1QkFBQyx5QkFBeUI7Z0JBTWxDLGdCQUFnQjtzQkFEbkIsV0FBVzt1QkFBQywyQkFBMkI7Z0JBT3BDLEtBQUs7c0JBRlIsV0FBVzt1QkFBQyxZQUFZOztzQkFDeEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICcuLi8uLi91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2hlYWRlci1zcGFjZXInLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvSGVhZGVyU3BhY2VyIHt9XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3V0aWxzJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1V0aWxzQ29tcG9uZW50IHt9XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3V0aWwtYWN0aW9uLCBub3ZvLWFjdGlvbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5vdm8tYnV0dG9uIHRoZW1lPVwiaWNvblwiIFtpY29uXT1cImljb25cIiBbc2l6ZV09XCJzaXplXCIgW2F0dHIuaW52ZXJzZV09XCJpbnZlcnNlXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9ub3ZvLWJ1dHRvbj5cbiAgYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1hY3Rpb24nLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVXRpbEFjdGlvbkNvbXBvbmVudCB7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBpY29uOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzaXplOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBpbnZlcnNlOiBib29sZWFuO1xuICBASW5wdXQoKVxuICBwdWJsaWMgZGlzYWJsZWQ6IGJvb2xlYW47XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8taGVhZGVyLGhlYWRlclt0aGVtZV0saGVhZGVyW2FjY2VudF0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzZWN0aW9uPlxuICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci10aXRsZVwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbcHJlZml4XVwiPjwvbmctY29udGVudD5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInRpdGxlXCI+XG4gICAgICAgICAgPG5vdm8taWNvbiBjbGFzcz1cImhlYWRlci1pY29uXCIgKm5nSWY9XCJpY29uXCI+e3sgaWNvbiB9fTwvbm92by1pY29uPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItdGl0bGVzXCI+XG4gICAgICAgICAgICA8bm92by10aXRsZSBzaXplPVwieGxcIj57eyB0aXRsZSB9fTwvbm92by10aXRsZT5cbiAgICAgICAgICAgIDxub3ZvLXRpdGxlIHNpemU9XCJtZFwiICpuZ0lmPVwic3ViVGl0bGVcIj57eyBzdWJUaXRsZSB9fTwvbm92by10aXRsZT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhdGl0bGVcIj5cbiAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJub3ZvLWljb24sIFtub3ZvLWljb25dXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItdGl0bGVzXCI+XG4gICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJoMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBzbWFsbCwgbm92by10aXRsZSwgW25vdm8tdGl0bGVdLCBbbm92by1zdWJ0aXRsZV1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJzZWN0aW9uXCI+PC9uZy1jb250ZW50PlxuICAgICAgPHNwYW4gY2xhc3M9XCJzcGFjZXJcIj48L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWFjdGlvbnNcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibm92by1hY3Rpb24sW25vdm8tYWN0aW9uXVwiPjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwidXRpbHNcIj48L25nLWNvbnRlbnQ+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbc3VmZml4XVwiPjwvbmctY29udGVudD5cbiAgICA8L3NlY3Rpb24+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvSGVhZGVyQ29tcG9uZW50IHtcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxuICBwdWJsaWMgcm9sZSA9ICdoZWFkaW5nJztcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIHB1YmxpYyBoZWFkZXJDbGFzczogc3RyaW5nID0gJ25vdm8taGVhZGVyJztcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jb25kZW5zZWQnKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgcHVibGljIGNvbmRlbnNlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBwdWJsaWMgdGl0bGU6IHN0cmluZztcbiAgQElucHV0KClcbiAgcHVibGljIHN1YlRpdGxlOiBzdHJpbmc7XG4gIHB1YmxpYyBpbnZlcnNlOiBzdHJpbmcgPSAnaW52ZXJzZSc7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGljb246IHN0cmluZztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2l6ZTogJ3NtYWxsJyB8ICdtZWRpdW0nIHwgJ2xhcmdlJztcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmhlYWRlci1zaXplLXNtYWxsJylcbiAgZ2V0IGhiX2lzU2l6ZVNtYWxsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNpemUgPT09ICdzbWFsbCc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmhlYWRlci1zaXplLWxhcmdlJylcbiAgZ2V0IGhiX2lzU2l6ZUxhcmdlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNpemUgPT09ICdsYXJnZSc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmhlYWRlci1zaXplLWRlZmF1bHQnKVxuICBnZXQgaGJfaXNTaXplRGVmYXVsdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIVsnc21hbGwnLCAnbGFyZ2UnXS5pbmNsdWRlcyh0aGlzLnNpemUpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnRoZW1lJylcbiAgQElucHV0KClcbiAgc2V0IHRoZW1lKHRoZW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl90aGVtZSA9IHRoZW1lO1xuICAgIHRoaXMuaW52ZXJzZSA9IHRoZW1lID09PSAnd2hpdGUnIHx8IHRoZW1lID09PSAnb2ZmLXdoaXRlJyB8fCB0aGVtZSA9PT0gJ2xpZ2h0JyA/IHVuZGVmaW5lZCA6ICdpbnZlcnNlJztcbiAgfVxuXG4gIGdldCB0aGVtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl90aGVtZTtcbiAgfVxuXG4gIHByaXZhdGUgX3RoZW1lOiBzdHJpbmc7XG59XG4iXX0=