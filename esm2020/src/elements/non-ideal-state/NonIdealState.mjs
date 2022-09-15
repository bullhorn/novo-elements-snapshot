// NG2
import { Component, HostBinding, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../icon/Icon";
import * as i2 from "../common/typography/title/title.component";
import * as i3 from "../common/typography/text/text.component";
import * as i4 from "@angular/common";
export class NonIdealStateElement {
    constructor() {
        this.hb_class = 'novo-non-ideal-state';
        this.theme = 'light';
    }
}
NonIdealStateElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NonIdealStateElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NonIdealStateElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NonIdealStateElement, selector: "novo-non-ideal-state", inputs: { theme: "theme", icon: "icon", title: "title", description: "description" }, host: { properties: { "class": "this.hb_class" } }, ngImport: i0, template: `
    <novo-icon class="novo-non-ideal-state-icon" *ngIf="icon" [color]="theme">{{ icon }}</novo-icon>
    <ng-content select="novo-icon"></ng-content>
    <ng-content select="novo-icon,novo-loading,novo-avatar"></ng-content>
    <novo-title class="novo-non-ideal-state-title" *ngIf="title" marginBefore>{{ title }}</novo-title>
    <ng-content select="novo-title"></ng-content>
    <novo-text *ngIf="description" block marginBefore marginAfter>{{ description }}</novo-text>
    <ng-content select="novo-text"></ng-content>
    <ng-content></ng-content>
  `, isInline: true, styles: [":host{padding:2rem;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}:host .novo-non-ideal-state-icon{font-size:xx-large}:host button{display:inline-block}\n"], components: [{ type: i1.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i2.NovoTitle, selector: "novo-title,[novo-title]" }, { type: i3.NovoText, selector: "novo-text,[novo-text]", inputs: ["block"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NonIdealStateElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-non-ideal-state', template: `
    <novo-icon class="novo-non-ideal-state-icon" *ngIf="icon" [color]="theme">{{ icon }}</novo-icon>
    <ng-content select="novo-icon"></ng-content>
    <ng-content select="novo-icon,novo-loading,novo-avatar"></ng-content>
    <novo-title class="novo-non-ideal-state-title" *ngIf="title" marginBefore>{{ title }}</novo-title>
    <ng-content select="novo-title"></ng-content>
    <novo-text *ngIf="description" block marginBefore marginAfter>{{ description }}</novo-text>
    <ng-content select="novo-text"></ng-content>
    <ng-content></ng-content>
  `, styles: [":host{padding:2rem;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}:host .novo-non-ideal-state-icon{font-size:xx-large}:host button{display:inline-block}\n"] }]
        }], propDecorators: { hb_class: [{
                type: HostBinding,
                args: ['class']
            }], theme: [{
                type: Input
            }], icon: [{
                type: Input
            }], title: [{
                type: Input
            }], description: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm9uSWRlYWxTdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL25vbi1pZGVhbC1zdGF0ZS9Ob25JZGVhbFN0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7OztBQWdCOUQsTUFBTSxPQUFPLG9CQUFvQjtJQWRqQztRQWdCRSxhQUFRLEdBQUcsc0JBQXNCLENBQUM7UUFHbEMsVUFBSyxHQUFXLE9BQU8sQ0FBQztLQU96Qjs7a0hBWlksb0JBQW9CO3NHQUFwQixvQkFBb0Isc01BWHJCOzs7Ozs7Ozs7R0FTVDs0RkFFVSxvQkFBb0I7a0JBZGhDLFNBQVM7K0JBQ0Usc0JBQXNCLFlBRXRCOzs7Ozs7Ozs7R0FTVDs4QkFJRCxRQUFRO3NCQURQLFdBQVc7dUJBQUMsT0FBTztnQkFJcEIsS0FBSztzQkFESixLQUFLO2dCQUdOLElBQUk7c0JBREgsS0FBSztnQkFHTixLQUFLO3NCQURKLEtBQUs7Z0JBR04sV0FBVztzQkFEVixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLW5vbi1pZGVhbC1zdGF0ZScsXG4gIHN0eWxlVXJsczogWycuL05vbklkZWFsU3RhdGUuc2NzcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxub3ZvLWljb24gY2xhc3M9XCJub3ZvLW5vbi1pZGVhbC1zdGF0ZS1pY29uXCIgKm5nSWY9XCJpY29uXCIgW2NvbG9yXT1cInRoZW1lXCI+e3sgaWNvbiB9fTwvbm92by1pY29uPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5vdm8taWNvblwiPjwvbmctY29udGVudD5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJub3ZvLWljb24sbm92by1sb2FkaW5nLG5vdm8tYXZhdGFyXCI+PC9uZy1jb250ZW50PlxuICAgIDxub3ZvLXRpdGxlIGNsYXNzPVwibm92by1ub24taWRlYWwtc3RhdGUtdGl0bGVcIiAqbmdJZj1cInRpdGxlXCIgbWFyZ2luQmVmb3JlPnt7IHRpdGxlIH19PC9ub3ZvLXRpdGxlPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5vdm8tdGl0bGVcIj48L25nLWNvbnRlbnQ+XG4gICAgPG5vdm8tdGV4dCAqbmdJZj1cImRlc2NyaXB0aW9uXCIgYmxvY2sgbWFyZ2luQmVmb3JlIG1hcmdpbkFmdGVyPnt7IGRlc2NyaXB0aW9uIH19PC9ub3ZvLXRleHQ+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibm92by10ZXh0XCI+PC9uZy1jb250ZW50PlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm9uSWRlYWxTdGF0ZUVsZW1lbnQge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgaGJfY2xhc3MgPSAnbm92by1ub24taWRlYWwtc3RhdGUnO1xuXG4gIEBJbnB1dCgpXG4gIHRoZW1lOiBzdHJpbmcgPSAnbGlnaHQnO1xuICBASW5wdXQoKVxuICBpY29uOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHRpdGxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG59XG4iXX0=