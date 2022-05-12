// NG2
import { Component, ContentChild, ElementRef, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../icon/Icon";
import * as i2 from "@angular/common";
import * as i3 from "../common/typography/title/title.component";
export class NovoListElement {
    constructor(element) {
        this.element = element;
    }
}
NovoListElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoListElement, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
NovoListElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoListElement, selector: "novo-list", inputs: { theme: "theme", direction: "direction" }, host: { properties: { "class.vertical-list": "direction === \"vertical\"", "class.horizontal-list": "direction === \"horizontal\"", "attr.theme": "theme" }, classAttribute: "novo-list" }, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoListElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-list',
                    host: {
                        class: 'novo-list',
                        '[class.vertical-list]': 'direction === "vertical"',
                        '[class.horizontal-list]': 'direction === "horizontal"',
                        '[attr.theme]': 'theme',
                    },
                    template: ` <ng-content></ng-content> `,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { theme: [{
                type: Input
            }], direction: [{
                type: Input
            }] } });
export class NovoItemAvatarElement {
}
NovoItemAvatarElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoItemAvatarElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoItemAvatarElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoItemAvatarElement, selector: "item-avatar, novo-item-avatar", inputs: { icon: "icon", color: "color" }, host: { classAttribute: "novo-item-avatar" }, ngImport: i0, template: ` <novo-icon *ngIf="icon" [color]="color || icon">{{ icon }}</novo-icon> `, isInline: true, components: [{ type: i1.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoItemAvatarElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'item-avatar, novo-item-avatar',
                    template: ` <novo-icon *ngIf="icon" [color]="color || icon">{{ icon }}</novo-icon> `,
                    host: {
                        class: 'novo-item-avatar',
                    },
                }]
        }], propDecorators: { icon: [{
                type: Input
            }], color: [{
                type: Input
            }] } });
export class NovoItemTitleElement {
}
NovoItemTitleElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoItemTitleElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoItemTitleElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoItemTitleElement, selector: "item-title, novo-item-title", host: { classAttribute: "novo-item-title" }, ngImport: i0, template: `<ng-content></ng-content>`, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoItemTitleElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'item-title, novo-item-title',
                    template: `<ng-content></ng-content>`,
                    host: {
                        class: 'novo-item-title',
                    },
                }]
        }] });
export class NovoItemHeaderElement {
}
NovoItemHeaderElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoItemHeaderElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoItemHeaderElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoItemHeaderElement, selector: "item-header, novo-item-header", host: { classAttribute: "novo-item-header" }, ngImport: i0, template: `
    <novo-title class="novo-item-header-container" size="md">
      <ng-content select="item-avatar, novo-item-avatar"></ng-content>
      <ng-content select="item-title, novo-item-title"></ng-content>
      <ng-content select="item-header-end, novo-item-header-end"></ng-content>
    </novo-title>
  `, isInline: true, components: [{ type: i3.NovoTitle, selector: "novo-title,[novo-title]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoItemHeaderElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'item-header, novo-item-header',
                    template: `
    <novo-title class="novo-item-header-container" size="md">
      <ng-content select="item-avatar, novo-item-avatar"></ng-content>
      <ng-content select="item-title, novo-item-title"></ng-content>
      <ng-content select="item-header-end, novo-item-header-end"></ng-content>
    </novo-title>
  `,
                    host: {
                        class: 'novo-item-header',
                    },
                }]
        }] });
export class NovoItemDateElement {
}
NovoItemDateElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoItemDateElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoItemDateElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoItemDateElement, selector: "item-header-end, novo-item-header-end", host: { classAttribute: "novo-item-header-end" }, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoItemDateElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'item-header-end, novo-item-header-end',
                    template: ` <ng-content></ng-content> `,
                    host: {
                        class: 'novo-item-header-end',
                    },
                }]
        }] });
export class NovoItemContentElement {
}
NovoItemContentElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoItemContentElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoItemContentElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoItemContentElement, selector: "item-content, novo-item-content", inputs: { direction: "direction" }, host: { properties: { "class.vertical-list": "direction === \"vertical\"", "class.horizontal-list": "direction === \"horizontal\"" }, classAttribute: "novo-item-content" }, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoItemContentElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'item-content, novo-item-content',
                    host: {
                        class: 'novo-item-content',
                        '[class.vertical-list]': 'direction === "vertical"',
                        '[class.horizontal-list]': 'direction === "horizontal"',
                    },
                    template: ` <ng-content></ng-content> `,
                }]
        }], propDecorators: { direction: [{
                type: Input
            }] } });
export class NovoItemEndElement {
}
NovoItemEndElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoItemEndElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoItemEndElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoItemEndElement, selector: "item-end, novo-item-end", host: { classAttribute: "novo-item-end" }, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoItemEndElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'item-end, novo-item-end',
                    template: ` <ng-content></ng-content> `,
                    host: {
                        class: 'novo-item-end',
                    },
                }]
        }] });
export class NovoListItemElement {
    constructor(element) {
        this.element = element;
        this.avatar = false;
    }
    ngOnInit() {
        this.avatar = !!this.element.nativeElement.querySelector('item-avatar');
    }
}
NovoListItemElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoListItemElement, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
NovoListItemElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoListItemElement, selector: "novo-list-item, a[list-item], button[list-item]", host: { classAttribute: "novo-list-item" }, queries: [{ propertyName: "_content", first: true, predicate: NovoItemContentElement, descendants: true }, { propertyName: "_header", first: true, predicate: NovoItemHeaderElement, descendants: true }], ngImport: i0, template: `
    <div class="list-item" [ngClass]="{ avatar: avatar }" *ngIf="_content || _header">
      <ng-content select="item-header, novo-item-header"></ng-content>
      <ng-content select="item-content, novo-item-content"></ng-content>
    </div>
    <ng-content></ng-content>
    <ng-content select="item-end, novo-item-end"></ng-content>
  `, isInline: true, directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoListItemElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-list-item, a[list-item], button[list-item]',
                    template: `
    <div class="list-item" [ngClass]="{ avatar: avatar }" *ngIf="_content || _header">
      <ng-content select="item-header, novo-item-header"></ng-content>
      <ng-content select="item-content, novo-item-content"></ng-content>
    </div>
    <ng-content></ng-content>
    <ng-content select="item-end, novo-item-end"></ng-content>
  `,
                    host: {
                        class: 'novo-list-item',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { _content: [{
                type: ContentChild,
                args: [NovoItemContentElement]
            }], _header: [{
                type: ContentChild,
                args: [NovoItemHeaderElement]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2xpc3QvTGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFZbkYsTUFBTSxPQUFPLGVBQWU7SUFNMUIsWUFBbUIsT0FBbUI7UUFBbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtJQUFHLENBQUM7OzRHQU4vQixlQUFlO2dHQUFmLGVBQWUsaVNBRmhCLDZCQUE2QjsyRkFFNUIsZUFBZTtrQkFWM0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztvQkFDckIsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxXQUFXO3dCQUNsQix1QkFBdUIsRUFBRSwwQkFBMEI7d0JBQ25ELHlCQUF5QixFQUFFLDRCQUE0Qjt3QkFDdkQsY0FBYyxFQUFFLE9BQU87cUJBQ3hCO29CQUNELFFBQVEsRUFBRSw2QkFBNkI7aUJBQ3hDO2lHQUdDLEtBQUs7c0JBREosS0FBSztnQkFHTixTQUFTO3NCQURSLEtBQUs7O0FBYVIsTUFBTSxPQUFPLHFCQUFxQjs7a0hBQXJCLHFCQUFxQjtzR0FBckIscUJBQXFCLDZKQUx0QiwwRUFBMEU7MkZBS3pFLHFCQUFxQjtrQkFQakMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsK0JBQStCO29CQUN6QyxRQUFRLEVBQUUsMEVBQTBFO29CQUNwRixJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLGtCQUFrQjtxQkFDMUI7aUJBQ0Y7OEJBR0MsSUFBSTtzQkFESCxLQUFLO2dCQUdOLEtBQUs7c0JBREosS0FBSzs7QUFXUixNQUFNLE9BQU8sb0JBQW9COztpSEFBcEIsb0JBQW9CO3FHQUFwQixvQkFBb0IsZ0hBTHJCLDJCQUEyQjsyRkFLMUIsb0JBQW9CO2tCQVBoQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSw2QkFBNkI7b0JBQ3ZDLFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsaUJBQWlCO3FCQUN6QjtpQkFDRjs7QUFnQkQsTUFBTSxPQUFPLHFCQUFxQjs7a0hBQXJCLHFCQUFxQjtzR0FBckIscUJBQXFCLG1IQVh0Qjs7Ozs7O0dBTVQ7MkZBS1UscUJBQXFCO2tCQWJqQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSwrQkFBK0I7b0JBQ3pDLFFBQVEsRUFBRTs7Ozs7O0dBTVQ7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxrQkFBa0I7cUJBQzFCO2lCQUNGOztBQVVELE1BQU0sT0FBTyxtQkFBbUI7O2dIQUFuQixtQkFBbUI7b0dBQW5CLG1CQUFtQiwrSEFMcEIsNkJBQTZCOzJGQUs1QixtQkFBbUI7a0JBUC9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHVDQUF1QztvQkFDakQsUUFBUSxFQUFFLDZCQUE2QjtvQkFDdkMsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxzQkFBc0I7cUJBQzlCO2lCQUNGOztBQVlELE1BQU0sT0FBTyxzQkFBc0I7O21IQUF0QixzQkFBc0I7dUdBQXRCLHNCQUFzQix3UkFGdkIsNkJBQTZCOzJGQUU1QixzQkFBc0I7a0JBVGxDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlDQUFpQztvQkFDM0MsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxtQkFBbUI7d0JBQzFCLHVCQUF1QixFQUFFLDBCQUEwQjt3QkFDbkQseUJBQXlCLEVBQUUsNEJBQTRCO3FCQUN4RDtvQkFDRCxRQUFRLEVBQUUsNkJBQTZCO2lCQUN4Qzs4QkFHQyxTQUFTO3NCQURSLEtBQUs7O0FBV1IsTUFBTSxPQUFPLGtCQUFrQjs7K0dBQWxCLGtCQUFrQjttR0FBbEIsa0JBQWtCLDBHQUxuQiw2QkFBNkI7MkZBSzVCLGtCQUFrQjtrQkFQOUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUseUJBQXlCO29CQUNuQyxRQUFRLEVBQUUsNkJBQTZCO29CQUN2QyxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLGVBQWU7cUJBQ3ZCO2lCQUNGOztBQWlCRCxNQUFNLE9BQU8sbUJBQW1CO0lBSzlCLFlBQW9CLE9BQW1CO1FBQW5CLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFKdkMsV0FBTSxHQUFZLEtBQUssQ0FBQztJQUlrQixDQUFDO0lBRTNDLFFBQVE7UUFDTixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDMUUsQ0FBQzs7Z0hBVFUsbUJBQW1CO29HQUFuQixtQkFBbUIseUtBRWhCLHNCQUFzQiwwRUFDdEIscUJBQXFCLGdEQWZ6Qjs7Ozs7OztHQU9UOzJGQUtVLG1CQUFtQjtrQkFkL0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsaURBQWlEO29CQUMzRCxRQUFRLEVBQUU7Ozs7Ozs7R0FPVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLGdCQUFnQjtxQkFDeEI7aUJBQ0Y7aUdBR3VDLFFBQVE7c0JBQTdDLFlBQVk7dUJBQUMsc0JBQXNCO2dCQUNDLE9BQU87c0JBQTNDLFlBQVk7dUJBQUMscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgRWxlbWVudFJlZiwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWxpc3QnLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWxpc3QnLFxuICAgICdbY2xhc3MudmVydGljYWwtbGlzdF0nOiAnZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCInLFxuICAgICdbY2xhc3MuaG9yaXpvbnRhbC1saXN0XSc6ICdkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiJyxcbiAgICAnW2F0dHIudGhlbWVdJzogJ3RoZW1lJyxcbiAgfSxcbiAgdGVtcGxhdGU6IGAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvTGlzdEVsZW1lbnQge1xuICBASW5wdXQoKVxuICB0aGVtZTogc3RyaW5nO1xuICBASW5wdXQoKVxuICBkaXJlY3Rpb246IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZikge31cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaXRlbS1hdmF0YXIsIG5vdm8taXRlbS1hdmF0YXInLFxuICB0ZW1wbGF0ZTogYCA8bm92by1pY29uICpuZ0lmPVwiaWNvblwiIFtjb2xvcl09XCJjb2xvciB8fCBpY29uXCI+e3sgaWNvbiB9fTwvbm92by1pY29uPiBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWl0ZW0tYXZhdGFyJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0l0ZW1BdmF0YXJFbGVtZW50IHtcbiAgQElucHV0KClcbiAgaWNvbjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBjb2xvcjogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpdGVtLXRpdGxlLCBub3ZvLWl0ZW0tdGl0bGUnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWl0ZW0tdGl0bGUnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvSXRlbVRpdGxlRWxlbWVudCB7fVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpdGVtLWhlYWRlciwgbm92by1pdGVtLWhlYWRlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5vdm8tdGl0bGUgY2xhc3M9XCJub3ZvLWl0ZW0taGVhZGVyLWNvbnRhaW5lclwiIHNpemU9XCJtZFwiPlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiaXRlbS1hdmF0YXIsIG5vdm8taXRlbS1hdmF0YXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJpdGVtLXRpdGxlLCBub3ZvLWl0ZW0tdGl0bGVcIj48L25nLWNvbnRlbnQ+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJpdGVtLWhlYWRlci1lbmQsIG5vdm8taXRlbS1oZWFkZXItZW5kXCI+PC9uZy1jb250ZW50PlxuICAgIDwvbm92by10aXRsZT5cbiAgYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1pdGVtLWhlYWRlcicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9JdGVtSGVhZGVyRWxlbWVudCB7fVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpdGVtLWhlYWRlci1lbmQsIG5vdm8taXRlbS1oZWFkZXItZW5kJyxcbiAgdGVtcGxhdGU6IGAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWl0ZW0taGVhZGVyLWVuZCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9JdGVtRGF0ZUVsZW1lbnQge31cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaXRlbS1jb250ZW50LCBub3ZvLWl0ZW0tY29udGVudCcsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8taXRlbS1jb250ZW50JyxcbiAgICAnW2NsYXNzLnZlcnRpY2FsLWxpc3RdJzogJ2RpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiJyxcbiAgICAnW2NsYXNzLmhvcml6b250YWwtbGlzdF0nOiAnZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIicsXG4gIH0sXG4gIHRlbXBsYXRlOiBgIDxuZy1jb250ZW50PjwvbmctY29udGVudD4gYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0l0ZW1Db250ZW50RWxlbWVudCB7XG4gIEBJbnB1dCgpXG4gIGRpcmVjdGlvbjogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpdGVtLWVuZCwgbm92by1pdGVtLWVuZCcsXG4gIHRlbXBsYXRlOiBgIDxuZy1jb250ZW50PjwvbmctY29udGVudD4gYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1pdGVtLWVuZCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9JdGVtRW5kRWxlbWVudCB7fVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWxpc3QtaXRlbSwgYVtsaXN0LWl0ZW1dLCBidXR0b25bbGlzdC1pdGVtXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImxpc3QtaXRlbVwiIFtuZ0NsYXNzXT1cInsgYXZhdGFyOiBhdmF0YXIgfVwiICpuZ0lmPVwiX2NvbnRlbnQgfHwgX2hlYWRlclwiPlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiaXRlbS1oZWFkZXIsIG5vdm8taXRlbS1oZWFkZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJpdGVtLWNvbnRlbnQsIG5vdm8taXRlbS1jb250ZW50XCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJpdGVtLWVuZCwgbm92by1pdGVtLWVuZFwiPjwvbmctY29udGVudD5cbiAgYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1saXN0LWl0ZW0nLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvTGlzdEl0ZW1FbGVtZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgYXZhdGFyOiBib29sZWFuID0gZmFsc2U7XG4gIEBDb250ZW50Q2hpbGQoTm92b0l0ZW1Db250ZW50RWxlbWVudCkgX2NvbnRlbnQ6IE5vdm9JdGVtQ29udGVudEVsZW1lbnQ7XG4gIEBDb250ZW50Q2hpbGQoTm92b0l0ZW1IZWFkZXJFbGVtZW50KSBfaGVhZGVyOiBOb3ZvSXRlbUhlYWRlckVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYXZhdGFyID0gISF0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpdGVtLWF2YXRhcicpO1xuICB9XG59XG4iXX0=