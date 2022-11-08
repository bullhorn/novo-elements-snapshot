// NG2
import { Component, HostBinding, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/components/icon";
import * as i2 from "novo-elements/common";
import * as i3 from "@angular/common";
export class NonIdealStateElement {
    constructor() {
        this.hb_class = 'novo-non-ideal-state';
        this.theme = 'light';
    }
}
NonIdealStateElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NonIdealStateElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NonIdealStateElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NonIdealStateElement, selector: "novo-non-ideal-state", inputs: { theme: "theme", icon: "icon", title: "title", description: "description" }, host: { properties: { "class": "this.hb_class" } }, ngImport: i0, template: `
    <novo-icon class="novo-non-ideal-state-icon" *ngIf="icon" [color]="theme">{{ icon }}</novo-icon>
    <ng-content select="novo-icon,novo-loading,novo-avatar"></ng-content>
    <novo-title class="novo-non-ideal-state-title" *ngIf="title" marginBefore>{{ title }}</novo-title>
    <ng-content select="novo-title"></ng-content>
    <novo-text *ngIf="description" block marginBefore marginAfter>{{ description }}</novo-text>
    <ng-content select="novo-text"></ng-content>
    <ng-content></ng-content>
  `, isInline: true, styles: [":host{padding:2rem;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}:host .novo-non-ideal-state-icon{font-size:xx-large}:host button{display:inline-block}\n"], components: [{ type: i1.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i2.NovoTitle, selector: "novo-title,[novo-title]" }, { type: i2.NovoText, selector: "novo-text,[novo-text]", inputs: ["block"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NonIdealStateElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-non-ideal-state', template: `
    <novo-icon class="novo-non-ideal-state-icon" *ngIf="icon" [color]="theme">{{ icon }}</novo-icon>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9uLWlkZWFsLXN0YXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9ub24taWRlYWwtc3RhdGUvbm9uLWlkZWFsLXN0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBZTlELE1BQU0sT0FBTyxvQkFBb0I7SUFiakM7UUFlRSxhQUFRLEdBQUcsc0JBQXNCLENBQUM7UUFHbEMsVUFBSyxHQUFXLE9BQU8sQ0FBQztLQU96Qjs7a0hBWlksb0JBQW9CO3NHQUFwQixvQkFBb0Isc01BVnJCOzs7Ozs7OztHQVFUOzRGQUVVLG9CQUFvQjtrQkFiaEMsU0FBUzsrQkFDRSxzQkFBc0IsWUFFdEI7Ozs7Ozs7O0dBUVQ7OEJBSUQsUUFBUTtzQkFEUCxXQUFXO3VCQUFDLE9BQU87Z0JBSXBCLEtBQUs7c0JBREosS0FBSztnQkFHTixJQUFJO3NCQURILEtBQUs7Z0JBR04sS0FBSztzQkFESixLQUFLO2dCQUdOLFdBQVc7c0JBRFYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1ub24taWRlYWwtc3RhdGUnLFxuICBzdHlsZVVybHM6IFsnLi9ub24taWRlYWwtc3RhdGUuc2NzcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxub3ZvLWljb24gY2xhc3M9XCJub3ZvLW5vbi1pZGVhbC1zdGF0ZS1pY29uXCIgKm5nSWY9XCJpY29uXCIgW2NvbG9yXT1cInRoZW1lXCI+e3sgaWNvbiB9fTwvbm92by1pY29uPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5vdm8taWNvbixub3ZvLWxvYWRpbmcsbm92by1hdmF0YXJcIj48L25nLWNvbnRlbnQ+XG4gICAgPG5vdm8tdGl0bGUgY2xhc3M9XCJub3ZvLW5vbi1pZGVhbC1zdGF0ZS10aXRsZVwiICpuZ0lmPVwidGl0bGVcIiBtYXJnaW5CZWZvcmU+e3sgdGl0bGUgfX08L25vdm8tdGl0bGU+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibm92by10aXRsZVwiPjwvbmctY29udGVudD5cbiAgICA8bm92by10ZXh0ICpuZ0lmPVwiZGVzY3JpcHRpb25cIiBibG9jayBtYXJnaW5CZWZvcmUgbWFyZ2luQWZ0ZXI+e3sgZGVzY3JpcHRpb24gfX08L25vdm8tdGV4dD5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJub3ZvLXRleHRcIj48L25nLWNvbnRlbnQ+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb25JZGVhbFN0YXRlRWxlbWVudCB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBoYl9jbGFzcyA9ICdub3ZvLW5vbi1pZGVhbC1zdGF0ZSc7XG5cbiAgQElucHV0KClcbiAgdGhlbWU6IHN0cmluZyA9ICdsaWdodCc7XG4gIEBJbnB1dCgpXG4gIGljb246IHN0cmluZztcbiAgQElucHV0KClcbiAgdGl0bGU6IHN0cmluZztcbiAgQElucHV0KClcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbn1cbiJdfQ==