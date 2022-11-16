// NG2
import { Component, HostBinding, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class NovoFlexElement {
    constructor() {
        this.direction = 'row';
        this.align = 'center';
        this.justify = 'flex-start';
        this.wrap = 'nowrap';
    }
    get display() {
        return 'flex';
    }
}
NovoFlexElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFlexElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoFlexElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoFlexElement, selector: "novo-flex,novo-row", inputs: { direction: "direction", align: "align", justify: "justify", wrap: "wrap", gap: "gap" }, host: { properties: { "style.display": "this.display", "style.flex-direction": "this.direction", "style.align-items": "this.align", "style.justify-content": "this.justify", "style.flex-wrap": "this.wrap", "style.gap": "this.gap" } }, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFlexElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-flex,novo-row',
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
export class NovoStackElement extends NovoFlexElement {
    constructor() {
        super(...arguments);
        this.direction = 'column';
        this.align = 'start';
    }
}
NovoStackElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoStackElement, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoStackElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoStackElement, selector: "novo-stack,novo-column", inputs: { direction: "direction", align: "align" }, host: { properties: { "style.flex-direction": "this.direction", "style.align-items": "this.align" } }, usesInheritance: true, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoStackElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-stack,novo-column',
                    template: ` <ng-content></ng-content> `,
                }]
        }], propDecorators: { direction: [{
                type: HostBinding,
                args: ['style.flex-direction']
            }, {
                type: Input
            }], align: [{
                type: HostBinding,
                args: ['style.align-items']
            }, {
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvZmxleC9mbGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTTlELE1BQU0sT0FBTyxlQUFlO0lBSjVCO1FBWUUsY0FBUyxHQUFXLEtBQUssQ0FBQztRQUkxQixVQUFLLEdBQVcsUUFBUSxDQUFDO1FBSXpCLFlBQU8sR0FBVyxZQUFZLENBQUM7UUFJL0IsU0FBSSxHQUFXLFFBQVEsQ0FBQztLQVN6QjtJQTVCQyxJQUNJLE9BQU87UUFDVCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzs2R0FKVSxlQUFlO2lHQUFmLGVBQWUsc1lBRmhCLDZCQUE2Qjs0RkFFNUIsZUFBZTtrQkFKM0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixRQUFRLEVBQUUsNkJBQTZCO2lCQUN4Qzs4QkFHSyxPQUFPO3NCQURWLFdBQVc7dUJBQUMsZUFBZTtnQkFPNUIsU0FBUztzQkFGUixXQUFXO3VCQUFDLHNCQUFzQjs7c0JBQ2xDLEtBQUs7Z0JBS04sS0FBSztzQkFGSixXQUFXO3VCQUFDLG1CQUFtQjs7c0JBQy9CLEtBQUs7Z0JBS04sT0FBTztzQkFGTixXQUFXO3VCQUFDLHVCQUF1Qjs7c0JBQ25DLEtBQUs7Z0JBS04sSUFBSTtzQkFGSCxXQUFXO3VCQUFDLGlCQUFpQjs7c0JBQzdCLEtBQUs7Z0JBS04sR0FBRztzQkFGRixXQUFXO3VCQUFDLFdBQVc7O3NCQUN2QixLQUFLOztBQVlSLE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxlQUFlO0lBSnJEOztRQU9FLGNBQVMsR0FBVyxRQUFRLENBQUM7UUFJN0IsVUFBSyxHQUFXLE9BQU8sQ0FBQztLQUN6Qjs7OEdBUlksZ0JBQWdCO2tHQUFoQixnQkFBZ0IsZ1BBRmpCLDZCQUE2Qjs0RkFFNUIsZ0JBQWdCO2tCQUo1QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLFFBQVEsRUFBRSw2QkFBNkI7aUJBQ3hDOzhCQUlDLFNBQVM7c0JBRlIsV0FBVzt1QkFBQyxzQkFBc0I7O3NCQUNsQyxLQUFLO2dCQUtOLEtBQUs7c0JBRkosV0FBVzt1QkFBQyxtQkFBbUI7O3NCQUMvQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWZsZXgsbm92by1yb3cnLFxuICB0ZW1wbGF0ZTogYCA8bmctY29udGVudD48L25nLWNvbnRlbnQ+IGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9GbGV4RWxlbWVudCB7XG4gIEBIb3N0QmluZGluZygnc3R5bGUuZGlzcGxheScpXG4gIGdldCBkaXNwbGF5KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdmbGV4JztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuZmxleC1kaXJlY3Rpb24nKVxuICBASW5wdXQoKVxuICBkaXJlY3Rpb246IHN0cmluZyA9ICdyb3cnO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuYWxpZ24taXRlbXMnKVxuICBASW5wdXQoKVxuICBhbGlnbjogc3RyaW5nID0gJ2NlbnRlcic7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5qdXN0aWZ5LWNvbnRlbnQnKVxuICBASW5wdXQoKVxuICBqdXN0aWZ5OiBzdHJpbmcgPSAnZmxleC1zdGFydCc7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5mbGV4LXdyYXAnKVxuICBASW5wdXQoKVxuICB3cmFwOiBzdHJpbmcgPSAnbm93cmFwJztcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmdhcCcpXG4gIEBJbnB1dCgpXG4gIGdhcDogc3RyaW5nO1xuXG4gIC8vIGdldCBoYl9ncmlkQ29scygpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5fc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShgcmVwZWF0KCR7dGhpcy5jb2x1bW5zfSwgJHtSZXNvdXJjZVNldHRpbmdzLmV2ZW50V2lkdGh9KWApO1xuICAvLyB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tc3RhY2ssbm92by1jb2x1bW4nLFxuICB0ZW1wbGF0ZTogYCA8bmctY29udGVudD48L25nLWNvbnRlbnQ+IGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TdGFja0VsZW1lbnQgZXh0ZW5kcyBOb3ZvRmxleEVsZW1lbnQge1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmZsZXgtZGlyZWN0aW9uJylcbiAgQElucHV0KClcbiAgZGlyZWN0aW9uOiBzdHJpbmcgPSAnY29sdW1uJztcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmFsaWduLWl0ZW1zJylcbiAgQElucHV0KClcbiAgYWxpZ246IHN0cmluZyA9ICdzdGFydCc7XG59XG4iXX0=