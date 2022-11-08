// NG2
import { Component, HostBinding, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class NovoBoxElement {
    constructor() {
        this.direction = 'row';
        this.align = 'center';
        this.justify = 'flex-start';
        this.wrap = 'nowrap';
    }
    get display() {
        return 'block';
    }
}
NovoBoxElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoBoxElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoBoxElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoBoxElement, selector: "novo-box", inputs: { direction: "direction", align: "align", justify: "justify", wrap: "wrap", gap: "gap" }, host: { properties: { "style.display": "this.display", "style.flex-direction": "this.direction", "style.align-items": "this.align", "style.justify-content": "this.justify", "style.flex-wrap": "this.wrap", "style.gap": "this.gap" } }, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoBoxElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-box',
                    template: ` <ng-content></ng-content> `,
                }]
        }], propDecorators: { display: [{
                type: HostBinding,
                args: ['style.display']
            }], direction: [{
                type: HostBinding,
                args: ['style.flex-direction']
            }, {
                type: Input
            }], align: [{
                type: HostBinding,
                args: ['style.align-items']
            }, {
                type: Input
            }], justify: [{
                type: HostBinding,
                args: ['style.justify-content']
            }, {
                type: Input
            }], wrap: [{
                type: HostBinding,
                args: ['style.flex-wrap']
            }, {
                type: Input
            }], gap: [{
                type: HostBinding,
                args: ['style.gap']
            }, {
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm94LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9mbGV4L2JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQU05RCxNQUFNLE9BQU8sY0FBYztJQUozQjtRQVlFLGNBQVMsR0FBVyxLQUFLLENBQUM7UUFJMUIsVUFBSyxHQUFXLFFBQVEsQ0FBQztRQUl6QixZQUFPLEdBQVcsWUFBWSxDQUFDO1FBSS9CLFNBQUksR0FBVyxRQUFRLENBQUM7S0FTekI7SUE1QkMsSUFDSSxPQUFPO1FBQ1QsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7NEdBSlUsY0FBYztnR0FBZCxjQUFjLDRYQUZmLDZCQUE2Qjs0RkFFNUIsY0FBYztrQkFKMUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsUUFBUSxFQUFFLDZCQUE2QjtpQkFDeEM7OEJBR0ssT0FBTztzQkFEVixXQUFXO3VCQUFDLGVBQWU7Z0JBTzVCLFNBQVM7c0JBRlIsV0FBVzt1QkFBQyxzQkFBc0I7O3NCQUNsQyxLQUFLO2dCQUtOLEtBQUs7c0JBRkosV0FBVzt1QkFBQyxtQkFBbUI7O3NCQUMvQixLQUFLO2dCQUtOLE9BQU87c0JBRk4sV0FBVzt1QkFBQyx1QkFBdUI7O3NCQUNuQyxLQUFLO2dCQUtOLElBQUk7c0JBRkgsV0FBVzt1QkFBQyxpQkFBaUI7O3NCQUM3QixLQUFLO2dCQUtOLEdBQUc7c0JBRkYsV0FBVzt1QkFBQyxXQUFXOztzQkFDdkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1ib3gnLFxuICB0ZW1wbGF0ZTogYCA8bmctY29udGVudD48L25nLWNvbnRlbnQ+IGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Cb3hFbGVtZW50IHtcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5kaXNwbGF5JylcbiAgZ2V0IGRpc3BsYXkoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ2Jsb2NrJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuZmxleC1kaXJlY3Rpb24nKVxuICBASW5wdXQoKVxuICBkaXJlY3Rpb246IHN0cmluZyA9ICdyb3cnO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuYWxpZ24taXRlbXMnKVxuICBASW5wdXQoKVxuICBhbGlnbjogc3RyaW5nID0gJ2NlbnRlcic7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5qdXN0aWZ5LWNvbnRlbnQnKVxuICBASW5wdXQoKVxuICBqdXN0aWZ5OiBzdHJpbmcgPSAnZmxleC1zdGFydCc7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5mbGV4LXdyYXAnKVxuICBASW5wdXQoKVxuICB3cmFwOiBzdHJpbmcgPSAnbm93cmFwJztcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmdhcCcpXG4gIEBJbnB1dCgpXG4gIGdhcDogc3RyaW5nO1xuXG4gIC8vIGdldCBoYl9ncmlkQ29scygpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5fc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShgcmVwZWF0KCR7dGhpcy5jb2x1bW5zfSwgJHtSZXNvdXJjZVNldHRpbmdzLmV2ZW50V2lkdGh9KWApO1xuICAvLyB9XG59XG4iXX0=