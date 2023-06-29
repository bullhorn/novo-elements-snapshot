var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, HostBinding, Input } from '@angular/core';
import { BooleanInput } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/elements/button";
import * as i2 from "novo-elements/elements/common";
import * as i3 from "novo-elements/elements/icon";
import * as i4 from "@angular/common";
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
  `, isInline: true, components: [{ type: i3.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i2.NovoTitle, selector: "novo-title,[novo-title]" }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVhZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvaGVhZGVyL0hlYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7QUFNbkQsTUFBTSxPQUFPLGdCQUFnQjs7OEdBQWhCLGdCQUFnQjtrR0FBaEIsZ0JBQWdCLHFEQUZqQiwyQkFBMkI7NEZBRTFCLGdCQUFnQjtrQkFKNUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFLDJCQUEyQjtpQkFDdEM7O0FBT0QsTUFBTSxPQUFPLGtCQUFrQjs7Z0hBQWxCLGtCQUFrQjtvR0FBbEIsa0JBQWtCLDZDQUZuQiwyQkFBMkI7NEZBRTFCLGtCQUFrQjtrQkFKOUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsT0FBTztvQkFDakIsUUFBUSxFQUFFLDJCQUEyQjtpQkFDdEM7O0FBY0QsTUFBTSxPQUFPLHVCQUF1Qjs7cUhBQXZCLHVCQUF1Qjt5R0FBdkIsdUJBQXVCLDJMQVR4Qjs7OztHQUlUOzRGQUtVLHVCQUF1QjtrQkFYbkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxRQUFRLEVBQUU7Ozs7R0FJVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLGFBQWE7cUJBQ3JCO2lCQUNGOzhCQUdRLElBQUk7c0JBRFYsS0FBSztnQkFHQyxJQUFJO3NCQURWLEtBQUs7Z0JBR0MsT0FBTztzQkFEYixLQUFLO2dCQUdDLFFBQVE7c0JBRGQsS0FBSzs7QUFtQ1IsTUFBTSxPQUFPLG1CQUFtQjtJQS9CaEM7UUFpQ1MsU0FBSSxHQUFHLFNBQVMsQ0FBQztRQUVqQixnQkFBVyxHQUFXLGFBQWEsQ0FBQztRQUlwQyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBSzNCLFlBQU8sR0FBVyxTQUFTLENBQUM7S0FtQ3BDO0lBM0JDLElBQ0ksY0FBYztRQUNoQixPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUNJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQztJQUMvQixDQUFDO0lBRUQsSUFDSSxnQkFBZ0I7UUFDbEIsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELElBRUksS0FBSyxDQUFDLEtBQWE7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLEtBQUssT0FBTyxJQUFJLEtBQUssS0FBSyxXQUFXLElBQUksS0FBSyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDekcsQ0FBQztJQUVELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDOztpSEE3Q1UsbUJBQW1CO3FHQUFuQixtQkFBbUIsa2ZBN0JwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJUO0FBVUQ7SUFEQyxZQUFZLEVBQUU7O3NEQUNtQjs0RkFSdkIsbUJBQW1CO2tCQS9CL0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsMENBQTBDO29CQUNwRCxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCVDtpQkFDRjs4QkFHUSxJQUFJO3NCQURWLFdBQVc7dUJBQUMsV0FBVztnQkFHakIsV0FBVztzQkFEakIsV0FBVzt1QkFBQyxPQUFPO2dCQUtiLFNBQVM7c0JBSGYsV0FBVzt1QkFBQyxpQkFBaUI7O3NCQUM3QixLQUFLO2dCQUlDLEtBQUs7c0JBRFgsS0FBSztnQkFHQyxRQUFRO3NCQURkLEtBQUs7Z0JBS0MsSUFBSTtzQkFEVixLQUFLO2dCQUlDLElBQUk7c0JBRFYsS0FBSztnQkFJRixjQUFjO3NCQURqQixXQUFXO3VCQUFDLHlCQUF5QjtnQkFNbEMsY0FBYztzQkFEakIsV0FBVzt1QkFBQyx5QkFBeUI7Z0JBTWxDLGdCQUFnQjtzQkFEbkIsV0FBVzt1QkFBQywyQkFBMkI7Z0JBT3BDLEtBQUs7c0JBRlIsV0FBVzt1QkFBQyxZQUFZOztzQkFDeEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaGVhZGVyLXNwYWNlcicsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9IZWFkZXJTcGFjZXIge31cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXRpbHMnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVXRpbHNDb21wb25lbnQge31cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXRpbC1hY3Rpb24sIG5vdm8tYWN0aW9uJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bm92by1idXR0b24gdGhlbWU9XCJpY29uXCIgW2ljb25dPVwiaWNvblwiIFtzaXplXT1cInNpemVcIiBbYXR0ci5pbnZlcnNlXT1cImludmVyc2VcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L25vdm8tYnV0dG9uPlxuICBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWFjdGlvbicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9VdGlsQWN0aW9uQ29tcG9uZW50IHtcbiAgQElucHV0KClcbiAgcHVibGljIGljb246IHN0cmluZztcbiAgQElucHV0KClcbiAgcHVibGljIHNpemU6IHN0cmluZztcbiAgQElucHV0KClcbiAgcHVibGljIGludmVyc2U6IGJvb2xlYW47XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBkaXNhYmxlZDogYm9vbGVhbjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1oZWFkZXIsaGVhZGVyW3RoZW1lXSxoZWFkZXJbYWNjZW50XScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNlY3Rpb24+XG4gICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLXRpdGxlXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltwcmVmaXhdXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwidGl0bGVcIj5cbiAgICAgICAgICA8bm92by1pY29uIGNsYXNzPVwiaGVhZGVyLWljb25cIiAqbmdJZj1cImljb25cIj57eyBpY29uIH19PC9ub3ZvLWljb24+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci10aXRsZXNcIj5cbiAgICAgICAgICAgIDxub3ZvLXRpdGxlIHNpemU9XCJ4bFwiPnt7IHRpdGxlIH19PC9ub3ZvLXRpdGxlPlxuICAgICAgICAgICAgPG5vdm8tdGl0bGUgc2l6ZT1cIm1kXCIgKm5nSWY9XCJzdWJUaXRsZVwiPnt7IHN1YlRpdGxlIH19PC9ub3ZvLXRpdGxlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiF0aXRsZVwiPlxuICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5vdm8taWNvbiwgW25vdm8taWNvbl1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci10aXRsZXNcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHNtYWxsLCBub3ZvLXRpdGxlLCBbbm92by10aXRsZV0sIFtub3ZvLXN1YnRpdGxlXVwiPjwvbmctY29udGVudD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInNlY3Rpb25cIj48L25nLWNvbnRlbnQ+XG4gICAgICA8c3BhbiBjbGFzcz1cInNwYWNlclwiPjwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItYWN0aW9uc1wiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJub3ZvLWFjdGlvbixbbm92by1hY3Rpb25dXCI+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJ1dGlsc1wiPjwvbmctY29udGVudD5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltzdWZmaXhdXCI+PC9uZy1jb250ZW50PlxuICAgIDwvc2VjdGlvbj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9IZWFkZXJDb21wb25lbnQge1xuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpXG4gIHB1YmxpYyByb2xlID0gJ2hlYWRpbmcnO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgcHVibGljIGhlYWRlckNsYXNzOiBzdHJpbmcgPSAnbm92by1oZWFkZXInO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmNvbmRlbnNlZCcpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBwdWJsaWMgY29uZGVuc2VkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuICBASW5wdXQoKVxuICBwdWJsaWMgc3ViVGl0bGU6IHN0cmluZztcbiAgcHVibGljIGludmVyc2U6IHN0cmluZyA9ICdpbnZlcnNlJztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgaWNvbjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzaXplOiAnc21hbGwnIHwgJ21lZGl1bScgfCAnbGFyZ2UnO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuaGVhZGVyLXNpemUtc21hbGwnKVxuICBnZXQgaGJfaXNTaXplU21hbGwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gJ3NtYWxsJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuaGVhZGVyLXNpemUtbGFyZ2UnKVxuICBnZXQgaGJfaXNTaXplTGFyZ2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gJ2xhcmdlJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuaGVhZGVyLXNpemUtZGVmYXVsdCcpXG4gIGdldCBoYl9pc1NpemVEZWZhdWx0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhWydzbWFsbCcsICdsYXJnZSddLmluY2x1ZGVzKHRoaXMuc2l6ZSk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIudGhlbWUnKVxuICBASW5wdXQoKVxuICBzZXQgdGhlbWUodGhlbWU6IHN0cmluZykge1xuICAgIHRoaXMuX3RoZW1lID0gdGhlbWU7XG4gICAgdGhpcy5pbnZlcnNlID0gdGhlbWUgPT09ICd3aGl0ZScgfHwgdGhlbWUgPT09ICdvZmYtd2hpdGUnIHx8IHRoZW1lID09PSAnbGlnaHQnID8gdW5kZWZpbmVkIDogJ2ludmVyc2UnO1xuICB9XG5cbiAgZ2V0IHRoZW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3RoZW1lO1xuICB9XG5cbiAgcHJpdmF0ZSBfdGhlbWU6IHN0cmluZztcbn1cbiJdfQ==