import { __decorate, __metadata } from "tslib";
// NG2
import { ChangeDetectionStrategy, Component, ContentChildren, HostBinding, Input, QueryList } from '@angular/core';
import { BooleanInput } from '../../utils';
import { NovoFieldElement } from './field';
export class NovoFieldsElement {
    constructor() {
        this._layout = 'horizontal';
        this._appearance = 'standard';
        this.fullWidth = false;
    }
    get layout() {
        return this._layout;
    }
    set layout(value) {
        if (this._layout !== value) {
            this._layout = value;
            this._updateFieldLayout();
        }
    }
    get appearance() {
        return this._appearance;
    }
    set appearance(value) {
        if (this._appearance !== value) {
            this._appearance = value;
            this._updateFieldAppearance();
        }
    }
    ngAfterContentInit() {
        this._updateFieldLayout();
        this._updateFieldAppearance();
    }
    _updateFieldLayout() {
        if (this._fields) {
            this._fields.forEach((field) => {
                field.layout = this.layout;
            });
        }
    }
    _updateFieldAppearance() {
        if (this._fields) {
            this._fields.forEach((field) => {
                field.appearance = this.appearance;
            });
        }
    }
}
NovoFieldsElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-fields',
                template: "<ng-content></ng-content>",
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    class: 'novo-field',
                    '[class.novo-fieldset-appearance-standard]': 'appearance == "standard"',
                    '[class.novo-fieldset-appearance-fill]': 'appearance == "fill"',
                    '[class.novo-fieldset-appearance-outline]': 'appearance == "outline"',
                    '[class.novo-fieldset-appearance-list]': 'appearance == "list"',
                },
                styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}:host{display:grid;grid-gap:1.2rem}:host.novo-fieldset-appearance-list{grid-gap:0}:host.full-width::ng-deep novo-field.novo-field-layout-vertical{grid-template-columns:minmax(300px,1fr);width:-webkit-fill-available}:host.full-width::ng-deep novo-field.novo-field-layout-vertical .novo-input-element{width:100%}:host.full-width::ng-deep novo-field.novo-field-layout-horizontal{grid-template-columns:150px minmax(150px,1fr)}:host.full-width::ng-deep novo-field.novo-field-layout-horizontal .novo-input-element{width:100%}"]
            },] }
];
NovoFieldsElement.propDecorators = {
    _fields: [{ type: ContentChildren, args: [NovoFieldElement,] }],
    layout: [{ type: Input }],
    appearance: [{ type: Input }],
    fullWidth: [{ type: HostBinding, args: ['class.full-width',] }, { type: Input }]
};
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoFieldsElement.prototype, "fullWidth", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGRzZXQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvZmllbGQvZmllbGRzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU07QUFDTixPQUFPLEVBQW9CLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckksT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFpQjNDLE1BQU0sT0FBTyxpQkFBaUI7SUFmOUI7UUFtQkUsWUFBTyxHQUE4QixZQUFZLENBQUM7UUFXbEQsZ0JBQVcsR0FBNkMsVUFBVSxDQUFDO1FBY25FLGNBQVMsR0FBWSxLQUFLLENBQUM7SUFzQjdCLENBQUM7SUE5Q0MsSUFBYSxNQUFNO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBQ0QsSUFBSSxNQUFNLENBQUMsS0FBSztRQUNkLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxLQUFLLEVBQUU7WUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBR0QsSUFBYSxVQUFVO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBQ0QsSUFBSSxVQUFVLENBQUMsS0FBSztRQUNsQixJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssS0FBSyxFQUFFO1lBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1NBQy9CO0lBQ0gsQ0FBQztJQU9ELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRU8sa0JBQWtCO1FBQ3hCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUM3QixLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFTyxzQkFBc0I7UUFDNUIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQzdCLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNyQyxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7O1lBakVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIscUNBQThCO2dCQUU5QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxZQUFZO29CQUNuQiwyQ0FBMkMsRUFBRSwwQkFBMEI7b0JBQ3ZFLHVDQUF1QyxFQUFFLHNCQUFzQjtvQkFDL0QsMENBQTBDLEVBQUUseUJBQXlCO29CQUNyRSx1Q0FBdUMsRUFBRSxzQkFBc0I7aUJBR2hFOzthQUNGOzs7c0JBRUUsZUFBZSxTQUFDLGdCQUFnQjtxQkFJaEMsS0FBSzt5QkFXTCxLQUFLO3dCQVVMLFdBQVcsU0FBQyxrQkFBa0IsY0FDOUIsS0FBSzs7QUFFTjtJQURDLFlBQVksRUFBRTs7b0RBQ1kiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgSG9zdEJpbmRpbmcsIElucHV0LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IE5vdm9GaWVsZEVsZW1lbnQgfSBmcm9tICcuL2ZpZWxkJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1maWVsZHMnLFxuICB0ZW1wbGF0ZVVybDogJy4vZmllbGRzZXQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ZpZWxkc2V0LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tZmllbGQnLFxuICAgICdbY2xhc3Mubm92by1maWVsZHNldC1hcHBlYXJhbmNlLXN0YW5kYXJkXSc6ICdhcHBlYXJhbmNlID09IFwic3RhbmRhcmRcIicsXG4gICAgJ1tjbGFzcy5ub3ZvLWZpZWxkc2V0LWFwcGVhcmFuY2UtZmlsbF0nOiAnYXBwZWFyYW5jZSA9PSBcImZpbGxcIicsXG4gICAgJ1tjbGFzcy5ub3ZvLWZpZWxkc2V0LWFwcGVhcmFuY2Utb3V0bGluZV0nOiAnYXBwZWFyYW5jZSA9PSBcIm91dGxpbmVcIicsXG4gICAgJ1tjbGFzcy5ub3ZvLWZpZWxkc2V0LWFwcGVhcmFuY2UtbGlzdF0nOiAnYXBwZWFyYW5jZSA9PSBcImxpc3RcIicsXG4gICAgLy8gJ1tjbGFzcy5ub3ZvLWZpZWxkLWxheW91dC1ob3Jpem9udGFsXSc6ICdsYXlvdXQ9PVwiaG9yaXpvbnRhbFwiJyxcbiAgICAvLyAnW2NsYXNzLm5vdm8tZmllbGQtbGF5b3V0LXZlcnRpY2FsXSc6ICdsYXlvdXQ9PVwidmVydGljYWxcIicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9GaWVsZHNFbGVtZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIEBDb250ZW50Q2hpbGRyZW4oTm92b0ZpZWxkRWxlbWVudClcbiAgX2ZpZWxkczogUXVlcnlMaXN0PE5vdm9GaWVsZEVsZW1lbnQ+O1xuXG4gIF9sYXlvdXQ6ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcgPSAnaG9yaXpvbnRhbCc7XG4gIEBJbnB1dCgpIGdldCBsYXlvdXQoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fbGF5b3V0O1xuICB9XG4gIHNldCBsYXlvdXQodmFsdWUpIHtcbiAgICBpZiAodGhpcy5fbGF5b3V0ICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fbGF5b3V0ID0gdmFsdWU7XG4gICAgICB0aGlzLl91cGRhdGVGaWVsZExheW91dCgpO1xuICAgIH1cbiAgfVxuXG4gIF9hcHBlYXJhbmNlOiAnc3RhbmRhcmQnIHwgJ291dGxpbmUnIHwgJ2ZpbGwnIHwgJ2xpc3QnID0gJ3N0YW5kYXJkJztcbiAgQElucHV0KCkgZ2V0IGFwcGVhcmFuY2UoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fYXBwZWFyYW5jZTtcbiAgfVxuICBzZXQgYXBwZWFyYW5jZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLl9hcHBlYXJhbmNlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fYXBwZWFyYW5jZSA9IHZhbHVlO1xuICAgICAgdGhpcy5fdXBkYXRlRmllbGRBcHBlYXJhbmNlKCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mdWxsLXdpZHRoJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGZ1bGxXaWR0aDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiBhbnkge1xuICAgIHRoaXMuX3VwZGF0ZUZpZWxkTGF5b3V0KCk7XG4gICAgdGhpcy5fdXBkYXRlRmllbGRBcHBlYXJhbmNlKCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVGaWVsZExheW91dCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZmllbGRzKSB7XG4gICAgICB0aGlzLl9maWVsZHMuZm9yRWFjaCgoZmllbGQpID0+IHtcbiAgICAgICAgZmllbGQubGF5b3V0ID0gdGhpcy5sYXlvdXQ7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVGaWVsZEFwcGVhcmFuY2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2ZpZWxkcykge1xuICAgICAgdGhpcy5fZmllbGRzLmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgICAgIGZpZWxkLmFwcGVhcmFuY2UgPSB0aGlzLmFwcGVhcmFuY2U7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==