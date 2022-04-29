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
NonIdealStateElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NonIdealStateElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NonIdealStateElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NonIdealStateElement, selector: "novo-non-ideal-state", inputs: { theme: "theme", icon: "icon", title: "title", description: "description" }, host: { properties: { "class": "this.hb_class" } }, ngImport: i0, template: `
    <novo-icon class="novo-non-ideal-state-icon" *ngIf="icon" [color]="theme">{{ icon }}</novo-icon>
    <novo-title class="novo-non-ideal-state-title" *ngIf="title" marginBefore>{{ title }}</novo-title>
    <novo-text *ngIf="description" block marginBefore marginAfter>{{ description }}</novo-text>
    <ng-content></ng-content>
  `, isInline: true, styles: [":host{padding:2rem;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}:host .novo-non-ideal-state-icon{font-size:xx-large}:host button{display:inline-block}\n"], components: [{ type: i1.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i2.NovoTitle, selector: "novo-title,[novo-title]" }, { type: i3.NovoText, selector: "novo-text,[novo-text]", inputs: ["block"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NonIdealStateElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-non-ideal-state', template: `
    <novo-icon class="novo-non-ideal-state-icon" *ngIf="icon" [color]="theme">{{ icon }}</novo-icon>
    <novo-title class="novo-non-ideal-state-title" *ngIf="title" marginBefore>{{ title }}</novo-title>
    <novo-text *ngIf="description" block marginBefore marginAfter>{{ description }}</novo-text>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm9uSWRlYWxTdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL25vbi1pZGVhbC1zdGF0ZS9Ob25JZGVhbFN0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7OztBQVk5RCxNQUFNLE9BQU8sb0JBQW9CO0lBVmpDO1FBWUUsYUFBUSxHQUFHLHNCQUFzQixDQUFDO1FBR2xDLFVBQUssR0FBVyxPQUFPLENBQUM7S0FPekI7O2lIQVpZLG9CQUFvQjtxR0FBcEIsb0JBQW9CLHNNQVByQjs7Ozs7R0FLVDsyRkFFVSxvQkFBb0I7a0JBVmhDLFNBQVM7K0JBQ0Usc0JBQXNCLFlBRXRCOzs7OztHQUtUOzhCQUlELFFBQVE7c0JBRFAsV0FBVzt1QkFBQyxPQUFPO2dCQUlwQixLQUFLO3NCQURKLEtBQUs7Z0JBR04sSUFBSTtzQkFESCxLQUFLO2dCQUdOLEtBQUs7c0JBREosS0FBSztnQkFHTixXQUFXO3NCQURWLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tbm9uLWlkZWFsLXN0YXRlJyxcbiAgc3R5bGVVcmxzOiBbJy4vTm9uSWRlYWxTdGF0ZS5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5vdm8taWNvbiBjbGFzcz1cIm5vdm8tbm9uLWlkZWFsLXN0YXRlLWljb25cIiAqbmdJZj1cImljb25cIiBbY29sb3JdPVwidGhlbWVcIj57eyBpY29uIH19PC9ub3ZvLWljb24+XG4gICAgPG5vdm8tdGl0bGUgY2xhc3M9XCJub3ZvLW5vbi1pZGVhbC1zdGF0ZS10aXRsZVwiICpuZ0lmPVwidGl0bGVcIiBtYXJnaW5CZWZvcmU+e3sgdGl0bGUgfX08L25vdm8tdGl0bGU+XG4gICAgPG5vdm8tdGV4dCAqbmdJZj1cImRlc2NyaXB0aW9uXCIgYmxvY2sgbWFyZ2luQmVmb3JlIG1hcmdpbkFmdGVyPnt7IGRlc2NyaXB0aW9uIH19PC9ub3ZvLXRleHQ+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb25JZGVhbFN0YXRlRWxlbWVudCB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBoYl9jbGFzcyA9ICdub3ZvLW5vbi1pZGVhbC1zdGF0ZSc7XG5cbiAgQElucHV0KClcbiAgdGhlbWU6IHN0cmluZyA9ICdsaWdodCc7XG4gIEBJbnB1dCgpXG4gIGljb246IHN0cmluZztcbiAgQElucHV0KClcbiAgdGl0bGU6IHN0cmluZztcbiAgQElucHV0KClcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbn1cbiJdfQ==