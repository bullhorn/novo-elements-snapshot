import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { BooleanInput } from '../../../../utils/decorators';
import * as i0 from "@angular/core";
export class NovoBaseTextElement {
    constructor(element) {
        this.element = element;
    }
    get hb_classBinding() {
        return [
            this.color ? `text-color-${this.color}` : null,
            this.lineLength ? `text-length-${this.lineLength}` : null,
            this.size ? `text-size-${this.size}` : null,
            this.weight ? `text-weight-${this.weight}` : null,
        ]
            .filter(Boolean)
            .join(' ');
    }
    get nativeElement() {
        return this.element.nativeElement;
    }
}
NovoBaseTextElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoBaseTextElement, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NovoBaseTextElement.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoBaseTextElement, inputs: { size: "size", weight: "weight", lineLength: "lineLength", color: "color", disabled: "disabled", muted: "muted", error: "error", marginBefore: "marginBefore", marginAfter: "marginAfter", nowrap: "nowrap", ellipsis: "ellipsis", smaller: "smaller", larger: "larger", thin: "thin", lighter: "lighter", light: "light", medium: "medium", bold: "bold", bolder: "bolder", extrabold: "extrabold" }, host: { properties: { "class": "this.hb_classBinding", "class.text-disabled": "this.disabled", "class.text-color-empty": "this.muted", "class.text-color-negative": "this.error", "class.margin-before": "this.marginBefore", "class.margin-after": "this.marginAfter", "class.text-nowrap": "this.nowrap", "class.text-ellipsis": "this.ellipsis", "class.text-size-smaller": "this.smaller", "class.text-size-larger": "this.larger", "class.text-weight-thin": "this.thin", "class.text-weight-lighter": "this.lighter", "class.text-weight-light": "this.light", "class.text-weight-medium": "this.medium", "class.text-weight-bold": "this.bold", "class.text-weight-bolder": "this.bolder", "class.text-weight-extrabold": "this.extrabold" } }, ngImport: i0 });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoBaseTextElement.prototype, "disabled", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoBaseTextElement.prototype, "muted", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoBaseTextElement.prototype, "error", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoBaseTextElement.prototype, "marginBefore", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoBaseTextElement.prototype, "marginAfter", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoBaseTextElement.prototype, "nowrap", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoBaseTextElement.prototype, "ellipsis", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoBaseTextElement.prototype, "smaller", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoBaseTextElement.prototype, "larger", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoBaseTextElement.prototype, "thin", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoBaseTextElement.prototype, "lighter", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoBaseTextElement.prototype, "light", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoBaseTextElement.prototype, "medium", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoBaseTextElement.prototype, "bold", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoBaseTextElement.prototype, "bolder", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoBaseTextElement.prototype, "extrabold", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoBaseTextElement, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { size: [{
                type: Input
            }], weight: [{
                type: Input
            }], lineLength: [{
                type: Input
            }], color: [{
                type: Input
            }], hb_classBinding: [{
                type: HostBinding,
                args: ['class']
            }], disabled: [{
                type: HostBinding,
                args: ['class.text-disabled']
            }, {
                type: Input
            }], muted: [{
                type: HostBinding,
                args: ['class.text-color-empty']
            }, {
                type: Input
            }], error: [{
                type: HostBinding,
                args: ['class.text-color-negative']
            }, {
                type: Input
            }], marginBefore: [{
                type: HostBinding,
                args: ['class.margin-before']
            }, {
                type: Input
            }], marginAfter: [{
                type: HostBinding,
                args: ['class.margin-after']
            }, {
                type: Input
            }], nowrap: [{
                type: HostBinding,
                args: ['class.text-nowrap']
            }, {
                type: Input
            }], ellipsis: [{
                type: HostBinding,
                args: ['class.text-ellipsis']
            }, {
                type: Input
            }], smaller: [{
                type: HostBinding,
                args: ['class.text-size-smaller']
            }, {
                type: Input
            }], larger: [{
                type: HostBinding,
                args: ['class.text-size-larger']
            }, {
                type: Input
            }], thin: [{
                type: HostBinding,
                args: ['class.text-weight-thin']
            }, {
                type: Input
            }], lighter: [{
                type: HostBinding,
                args: ['class.text-weight-lighter']
            }, {
                type: Input
            }], light: [{
                type: HostBinding,
                args: ['class.text-weight-light']
            }, {
                type: Input
            }], medium: [{
                type: HostBinding,
                args: ['class.text-weight-medium']
            }, {
                type: Input
            }], bold: [{
                type: HostBinding,
                args: ['class.text-weight-bold']
            }, {
                type: Input
            }], bolder: [{
                type: HostBinding,
                args: ['class.text-weight-bolder']
            }, {
                type: Input
            }], extrabold: [{
                type: HostBinding,
                args: ['class.text-weight-extrabold']
            }, {
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS10ZXh0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2NvbW1vbi90eXBvZ3JhcGh5L2Jhc2UvYmFzZS10ZXh0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBSTVELE1BQU0sT0FBTyxtQkFBbUI7SUFzRzlCLFlBQXNCLE9BQW1CO1FBQW5CLFlBQU8sR0FBUCxPQUFPLENBQVk7SUFBRyxDQUFDO0lBNUY3QyxJQUNJLGVBQWU7UUFDakIsT0FBTztZQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGNBQWMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGVBQWUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQ3pELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGFBQWEsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGVBQWUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJO1NBQ2xEO2FBQ0UsTUFBTSxDQUFDLE9BQU8sQ0FBQzthQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNmLENBQUM7SUFvRkQsSUFBSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUNwQyxDQUFDOztpSEExR1UsbUJBQW1CO3FHQUFuQixtQkFBbUI7QUF5QjlCO0lBREMsWUFBWSxFQUFFOztxREFDRztBQUtsQjtJQURDLFlBQVksRUFBRTs7a0RBQ0E7QUFLZjtJQURDLFlBQVksRUFBRTs7a0RBQ0E7QUFLZjtJQURDLFlBQVksRUFBRTs7eURBQ087QUFLdEI7SUFEQyxZQUFZLEVBQUU7O3dEQUNNO0FBS3JCO0lBREMsWUFBWSxFQUFFOzttREFDQztBQUtoQjtJQURDLFlBQVksRUFBRTs7cURBQ0c7QUFLbEI7SUFEQyxZQUFZLEVBQUU7O29EQUNFO0FBS2pCO0lBREMsWUFBWSxFQUFFOzttREFDQztBQUtoQjtJQURDLFlBQVksRUFBRTs7aURBQ0Q7QUFLZDtJQURDLFlBQVksRUFBRTs7b0RBQ0U7QUFLakI7SUFEQyxZQUFZLEVBQUU7O2tEQUNBO0FBS2Y7SUFEQyxZQUFZLEVBQUU7O21EQUNDO0FBS2hCO0lBREMsWUFBWSxFQUFFOztpREFDRDtBQUtkO0lBREMsWUFBWSxFQUFFOzttREFDQztBQUtoQjtJQURDLFlBQVksRUFBRTs7c0RBQ0k7NEZBcEdSLG1CQUFtQjtrQkFEL0IsU0FBUztpR0FHUixJQUFJO3NCQURILEtBQUs7Z0JBR04sTUFBTTtzQkFETCxLQUFLO2dCQUdOLFVBQVU7c0JBRFQsS0FBSztnQkFHTixLQUFLO3NCQURKLEtBQUs7Z0JBSUYsZUFBZTtzQkFEbEIsV0FBVzt1QkFBQyxPQUFPO2dCQWVwQixRQUFRO3NCQUhQLFdBQVc7dUJBQUMscUJBQXFCOztzQkFDakMsS0FBSztnQkFPTixLQUFLO3NCQUhKLFdBQVc7dUJBQUMsd0JBQXdCOztzQkFDcEMsS0FBSztnQkFPTixLQUFLO3NCQUhKLFdBQVc7dUJBQUMsMkJBQTJCOztzQkFDdkMsS0FBSztnQkFPTixZQUFZO3NCQUhYLFdBQVc7dUJBQUMscUJBQXFCOztzQkFDakMsS0FBSztnQkFPTixXQUFXO3NCQUhWLFdBQVc7dUJBQUMsb0JBQW9COztzQkFDaEMsS0FBSztnQkFPTixNQUFNO3NCQUhMLFdBQVc7dUJBQUMsbUJBQW1COztzQkFDL0IsS0FBSztnQkFPTixRQUFRO3NCQUhQLFdBQVc7dUJBQUMscUJBQXFCOztzQkFDakMsS0FBSztnQkFPTixPQUFPO3NCQUhOLFdBQVc7dUJBQUMseUJBQXlCOztzQkFDckMsS0FBSztnQkFPTixNQUFNO3NCQUhMLFdBQVc7dUJBQUMsd0JBQXdCOztzQkFDcEMsS0FBSztnQkFPTixJQUFJO3NCQUhILFdBQVc7dUJBQUMsd0JBQXdCOztzQkFDcEMsS0FBSztnQkFPTixPQUFPO3NCQUhOLFdBQVc7dUJBQUMsMkJBQTJCOztzQkFDdkMsS0FBSztnQkFPTixLQUFLO3NCQUhKLFdBQVc7dUJBQUMseUJBQXlCOztzQkFDckMsS0FBSztnQkFPTixNQUFNO3NCQUhMLFdBQVc7dUJBQUMsMEJBQTBCOztzQkFDdEMsS0FBSztnQkFPTixJQUFJO3NCQUhILFdBQVc7dUJBQUMsd0JBQXdCOztzQkFDcEMsS0FBSztnQkFPTixNQUFNO3NCQUhMLFdBQVc7dUJBQUMsMEJBQTBCOztzQkFDdEMsS0FBSztnQkFPTixTQUFTO3NCQUhSLFdBQVc7dUJBQUMsNkJBQTZCOztzQkFDekMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICcuLi8uLi8uLi8uLi91dGlscy9kZWNvcmF0b3JzJztcbmltcG9ydCB7IFR5cG9ncmFwaHlMZW5ndGgsIFR5cG9ncmFwaHlTaXplLCBUeXBvZ3JhcGh5V2VpZ2h0IH0gZnJvbSAnLi4vdGV4dC50eXBlcyc7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIE5vdm9CYXNlVGV4dEVsZW1lbnQge1xuICBASW5wdXQoKVxuICBzaXplOiBUeXBvZ3JhcGh5U2l6ZTtcbiAgQElucHV0KClcbiAgd2VpZ2h0OiBUeXBvZ3JhcGh5V2VpZ2h0O1xuICBASW5wdXQoKVxuICBsaW5lTGVuZ3RoOiBUeXBvZ3JhcGh5TGVuZ3RoO1xuICBASW5wdXQoKVxuICBjb2xvcjogc3RyaW5nO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgaGJfY2xhc3NCaW5kaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHRoaXMuY29sb3IgPyBgdGV4dC1jb2xvci0ke3RoaXMuY29sb3J9YCA6IG51bGwsXG4gICAgICB0aGlzLmxpbmVMZW5ndGggPyBgdGV4dC1sZW5ndGgtJHt0aGlzLmxpbmVMZW5ndGh9YCA6IG51bGwsXG4gICAgICB0aGlzLnNpemUgPyBgdGV4dC1zaXplLSR7dGhpcy5zaXplfWAgOiBudWxsLFxuICAgICAgdGhpcy53ZWlnaHQgPyBgdGV4dC13ZWlnaHQtJHt0aGlzLndlaWdodH1gIDogbnVsbCxcbiAgICBdXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAuam9pbignICcpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LWRpc2FibGVkJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC1jb2xvci1lbXB0eScpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBtdXRlZDogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtY29sb3ItbmVnYXRpdmUnKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgZXJyb3I6IGJvb2xlYW47XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tYXJnaW4tYmVmb3JlJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIG1hcmdpbkJlZm9yZTogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm1hcmdpbi1hZnRlcicpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBtYXJnaW5BZnRlcjogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtbm93cmFwJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIG5vd3JhcDogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtZWxsaXBzaXMnKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgZWxsaXBzaXM6IGJvb2xlYW47XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LXNpemUtc21hbGxlcicpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBzbWFsbGVyOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC1zaXplLWxhcmdlcicpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBsYXJnZXI6IGJvb2xlYW47XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LXdlaWdodC10aGluJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIHRoaW46IGJvb2xlYW47XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LXdlaWdodC1saWdodGVyJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGxpZ2h0ZXI6IGJvb2xlYW47XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LXdlaWdodC1saWdodCcpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBsaWdodDogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtd2VpZ2h0LW1lZGl1bScpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBtZWRpdW06IGJvb2xlYW47XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LXdlaWdodC1ib2xkJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGJvbGQ6IGJvb2xlYW47XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LXdlaWdodC1ib2xkZXInKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgYm9sZGVyOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC13ZWlnaHQtZXh0cmFib2xkJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGV4dHJhYm9sZDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZWxlbWVudDogRWxlbWVudFJlZikge31cblxuICBnZXQgbmF0aXZlRWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cbiJdfQ==