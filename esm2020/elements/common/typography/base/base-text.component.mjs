var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { BooleanInput } from 'novo-elements/utils';
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
NovoBaseTextElement.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoBaseTextElement, inputs: { size: "size", weight: "weight", lineLength: "lineLength", color: "color", disabled: "disabled", muted: "muted", error: "error", marginBefore: "marginBefore", marginAfter: "marginAfter", capitialize: "capitialize", uppercase: "uppercase", nowrap: "nowrap", ellipsis: "ellipsis", smaller: "smaller", larger: "larger", thin: "thin", lighter: "lighter", light: "light", medium: "medium", bold: "bold", bolder: "bolder", extrabold: "extrabold" }, host: { properties: { "class": "this.hb_classBinding", "class.text-disabled": "this.disabled", "class.text-color-empty": "this.muted", "class.text-color-negative": "this.error", "class.margin-before": "this.marginBefore", "class.margin-after": "this.marginAfter", "class.text-capitialize": "this.capitialize", "class.text-uppercase": "this.uppercase", "class.text-nowrap": "this.nowrap", "class.text-ellipsis": "this.ellipsis", "class.text-size-smaller": "this.smaller", "class.text-size-larger": "this.larger", "class.text-weight-thin": "this.thin", "class.text-weight-lighter": "this.lighter", "class.text-weight-light": "this.light", "class.text-weight-medium": "this.medium", "class.text-weight-bold": "this.bold", "class.text-weight-bolder": "this.bolder", "class.text-weight-extrabold": "this.extrabold" } }, ngImport: i0 });
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
], NovoBaseTextElement.prototype, "capitialize", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoBaseTextElement.prototype, "uppercase", void 0);
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
            }], capitialize: [{
                type: HostBinding,
                args: ['class.text-capitialize']
            }, {
                type: Input
            }], uppercase: [{
                type: HostBinding,
                args: ['class.text-uppercase']
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS10ZXh0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2NvbW1vbi90eXBvZ3JhcGh5L2Jhc2UvYmFzZS10ZXh0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxZQUFZLEVBQXNCLE1BQU0scUJBQXFCLENBQUM7O0FBSXZFLE1BQU0sT0FBTyxtQkFBbUI7SUFrSTlCLFlBQXNCLE9BQW1CO1FBQW5CLFlBQU8sR0FBUCxPQUFPLENBQVk7SUFBRyxDQUFDO0lBeEg3QyxJQUNJLGVBQWU7UUFDakIsT0FBTztZQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGNBQWMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGVBQWUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQ3pELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGFBQWEsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGVBQWUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJO1NBQ2xEO2FBQ0UsTUFBTSxDQUFDLE9BQU8sQ0FBQzthQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNmLENBQUM7SUFnSEQsSUFBSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUNwQyxDQUFDOztpSEF0SVUsbUJBQW1CO3FHQUFuQixtQkFBbUI7QUF5QjlCO0lBREMsWUFBWSxFQUFFOztxREFDRztBQU1sQjtJQURDLFlBQVksRUFBRTs7a0RBQ0E7QUFNZjtJQURDLFlBQVksRUFBRTs7a0RBQ0E7QUFNZjtJQURDLFlBQVksRUFBRTs7eURBQ087QUFNdEI7SUFEQyxZQUFZLEVBQUU7O3dEQUNNO0FBTXJCO0lBREMsWUFBWSxFQUFFOzt3REFDTTtBQU1yQjtJQURDLFlBQVksRUFBRTs7c0RBQ0k7QUFNbkI7SUFEQyxZQUFZLEVBQUU7O21EQUNDO0FBTWhCO0lBREMsWUFBWSxFQUFFOztxREFDRztBQU1sQjtJQURDLFlBQVksRUFBRTs7b0RBQ0U7QUFNakI7SUFEQyxZQUFZLEVBQUU7O21EQUNDO0FBTWhCO0lBREMsWUFBWSxFQUFFOztpREFDRDtBQU1kO0lBREMsWUFBWSxFQUFFOztvREFDRTtBQU1qQjtJQURDLFlBQVksRUFBRTs7a0RBQ0E7QUFNZjtJQURDLFlBQVksRUFBRTs7bURBQ0M7QUFNaEI7SUFEQyxZQUFZLEVBQUU7O2lEQUNEO0FBTWQ7SUFEQyxZQUFZLEVBQUU7O21EQUNDO0FBTWhCO0lBREMsWUFBWSxFQUFFOztzREFDSTs0RkEvSFIsbUJBQW1CO2tCQUQvQixTQUFTO2lHQUdSLElBQUk7c0JBREgsS0FBSztnQkFHTixNQUFNO3NCQURMLEtBQUs7Z0JBR04sVUFBVTtzQkFEVCxLQUFLO2dCQUdOLEtBQUs7c0JBREosS0FBSztnQkFJRixlQUFlO3NCQURsQixXQUFXO3VCQUFDLE9BQU87Z0JBZXBCLFFBQVE7c0JBSFAsV0FBVzt1QkFBQyxxQkFBcUI7O3NCQUNqQyxLQUFLO2dCQVFOLEtBQUs7c0JBSEosV0FBVzt1QkFBQyx3QkFBd0I7O3NCQUNwQyxLQUFLO2dCQVFOLEtBQUs7c0JBSEosV0FBVzt1QkFBQywyQkFBMkI7O3NCQUN2QyxLQUFLO2dCQVFOLFlBQVk7c0JBSFgsV0FBVzt1QkFBQyxxQkFBcUI7O3NCQUNqQyxLQUFLO2dCQVFOLFdBQVc7c0JBSFYsV0FBVzt1QkFBQyxvQkFBb0I7O3NCQUNoQyxLQUFLO2dCQVFOLFdBQVc7c0JBSFYsV0FBVzt1QkFBQyx3QkFBd0I7O3NCQUNwQyxLQUFLO2dCQVFOLFNBQVM7c0JBSFIsV0FBVzt1QkFBQyxzQkFBc0I7O3NCQUNsQyxLQUFLO2dCQVFOLE1BQU07c0JBSEwsV0FBVzt1QkFBQyxtQkFBbUI7O3NCQUMvQixLQUFLO2dCQVFOLFFBQVE7c0JBSFAsV0FBVzt1QkFBQyxxQkFBcUI7O3NCQUNqQyxLQUFLO2dCQVFOLE9BQU87c0JBSE4sV0FBVzt1QkFBQyx5QkFBeUI7O3NCQUNyQyxLQUFLO2dCQVFOLE1BQU07c0JBSEwsV0FBVzt1QkFBQyx3QkFBd0I7O3NCQUNwQyxLQUFLO2dCQVFOLElBQUk7c0JBSEgsV0FBVzt1QkFBQyx3QkFBd0I7O3NCQUNwQyxLQUFLO2dCQVFOLE9BQU87c0JBSE4sV0FBVzt1QkFBQywyQkFBMkI7O3NCQUN2QyxLQUFLO2dCQVFOLEtBQUs7c0JBSEosV0FBVzt1QkFBQyx5QkFBeUI7O3NCQUNyQyxLQUFLO2dCQVFOLE1BQU07c0JBSEwsV0FBVzt1QkFBQywwQkFBMEI7O3NCQUN0QyxLQUFLO2dCQVFOLElBQUk7c0JBSEgsV0FBVzt1QkFBQyx3QkFBd0I7O3NCQUNwQyxLQUFLO2dCQVFOLE1BQU07c0JBSEwsV0FBVzt1QkFBQywwQkFBMEI7O3NCQUN0QyxLQUFLO2dCQVFOLFNBQVM7c0JBSFIsV0FBVzt1QkFBQyw2QkFBNkI7O3NCQUN6QyxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgQm9vbGVhbklucHV0QWNjZXB0IH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5pbXBvcnQgeyBUeXBvZ3JhcGh5TGVuZ3RoLCBUeXBvZ3JhcGh5U2l6ZSwgVHlwb2dyYXBoeVdlaWdodCB9IGZyb20gJy4uL3RleHQudHlwZXMnO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBOb3ZvQmFzZVRleHRFbGVtZW50IHtcbiAgQElucHV0KClcbiAgc2l6ZTogVHlwb2dyYXBoeVNpemU7XG4gIEBJbnB1dCgpXG4gIHdlaWdodDogVHlwb2dyYXBoeVdlaWdodDtcbiAgQElucHV0KClcbiAgbGluZUxlbmd0aDogVHlwb2dyYXBoeUxlbmd0aDtcbiAgQElucHV0KClcbiAgY29sb3I6IHN0cmluZztcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgZ2V0IGhiX2NsYXNzQmluZGluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBbXG4gICAgICB0aGlzLmNvbG9yID8gYHRleHQtY29sb3ItJHt0aGlzLmNvbG9yfWAgOiBudWxsLFxuICAgICAgdGhpcy5saW5lTGVuZ3RoID8gYHRleHQtbGVuZ3RoLSR7dGhpcy5saW5lTGVuZ3RofWAgOiBudWxsLFxuICAgICAgdGhpcy5zaXplID8gYHRleHQtc2l6ZS0ke3RoaXMuc2l6ZX1gIDogbnVsbCxcbiAgICAgIHRoaXMud2VpZ2h0ID8gYHRleHQtd2VpZ2h0LSR7dGhpcy53ZWlnaHR9YCA6IG51bGwsXG4gICAgXVxuICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgLmpvaW4oJyAnKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC1kaXNhYmxlZCcpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBkaXNhYmxlZDogYm9vbGVhbjtcbiAgc3RhdGljIHJlYWRvbmx5IG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXRBY2NlcHQ7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LWNvbG9yLWVtcHR5JylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIG11dGVkOiBib29sZWFuO1xuICBzdGF0aWMgcmVhZG9ubHkgbmdBY2NlcHRJbnB1dFR5cGVfbXV0ZWQ6IEJvb2xlYW5JbnB1dEFjY2VwdDtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtY29sb3ItbmVnYXRpdmUnKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgZXJyb3I6IGJvb2xlYW47XG4gIHN0YXRpYyByZWFkb25seSBuZ0FjY2VwdElucHV0VHlwZV9lcnJvcjogQm9vbGVhbklucHV0QWNjZXB0O1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MubWFyZ2luLWJlZm9yZScpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBtYXJnaW5CZWZvcmU6IGJvb2xlYW47XG4gIHN0YXRpYyByZWFkb25seSBuZ0FjY2VwdElucHV0VHlwZV9tYXJnaW5CZWZvcmU6IEJvb2xlYW5JbnB1dEFjY2VwdDtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm1hcmdpbi1hZnRlcicpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBtYXJnaW5BZnRlcjogYm9vbGVhbjtcbiAgc3RhdGljIHJlYWRvbmx5IG5nQWNjZXB0SW5wdXRUeXBlX21hcmdpbkFmdGVyOiBCb29sZWFuSW5wdXRBY2NlcHQ7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LWNhcGl0aWFsaXplJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGNhcGl0aWFsaXplOiBib29sZWFuO1xuICBzdGF0aWMgcmVhZG9ubHkgbmdBY2NlcHRJbnB1dFR5cGVfY2FwaXRhbGl6ZTogQm9vbGVhbklucHV0QWNjZXB0O1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC11cHBlcmNhc2UnKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgdXBwZXJjYXNlOiBib29sZWFuO1xuICBzdGF0aWMgcmVhZG9ubHkgbmdBY2NlcHRJbnB1dFR5cGVfdXBwZXJjYXNlOiBCb29sZWFuSW5wdXRBY2NlcHQ7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LW5vd3JhcCcpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBub3dyYXA6IGJvb2xlYW47XG4gIHN0YXRpYyByZWFkb25seSBuZ0FjY2VwdElucHV0VHlwZV9ub3dyYXA6IEJvb2xlYW5JbnB1dEFjY2VwdDtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtZWxsaXBzaXMnKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgZWxsaXBzaXM6IGJvb2xlYW47XG4gIHN0YXRpYyByZWFkb25seSBuZ0FjY2VwdElucHV0VHlwZV9lbGxpcHNpczogQm9vbGVhbklucHV0QWNjZXB0O1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC1zaXplLXNtYWxsZXInKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgc21hbGxlcjogYm9vbGVhbjtcbiAgc3RhdGljIHJlYWRvbmx5IG5nQWNjZXB0SW5wdXRUeXBlX3NtYWxsZXI6IEJvb2xlYW5JbnB1dEFjY2VwdDtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtc2l6ZS1sYXJnZXInKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgbGFyZ2VyOiBib29sZWFuO1xuICBzdGF0aWMgcmVhZG9ubHkgbmdBY2NlcHRJbnB1dFR5cGVfbGFyZ2VyOiBCb29sZWFuSW5wdXRBY2NlcHQ7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LXdlaWdodC10aGluJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIHRoaW46IGJvb2xlYW47XG4gIHN0YXRpYyByZWFkb25seSBuZ0FjY2VwdElucHV0VHlwZV90aGluOiBCb29sZWFuSW5wdXRBY2NlcHQ7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LXdlaWdodC1saWdodGVyJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGxpZ2h0ZXI6IGJvb2xlYW47XG4gIHN0YXRpYyByZWFkb25seSBuZ0FjY2VwdElucHV0VHlwZV9saWdodGVyOiBCb29sZWFuSW5wdXRBY2NlcHQ7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LXdlaWdodC1saWdodCcpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBsaWdodDogYm9vbGVhbjtcbiAgc3RhdGljIHJlYWRvbmx5IG5nQWNjZXB0SW5wdXRUeXBlX2xpZ2h0OiBCb29sZWFuSW5wdXRBY2NlcHQ7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LXdlaWdodC1tZWRpdW0nKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgbWVkaXVtOiBib29sZWFuO1xuICBzdGF0aWMgcmVhZG9ubHkgbmdBY2NlcHRJbnB1dFR5cGVfbWVkaXVtOiBCb29sZWFuSW5wdXRBY2NlcHQ7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LXdlaWdodC1ib2xkJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGJvbGQ6IGJvb2xlYW47XG4gIHN0YXRpYyByZWFkb25seSBuZ0FjY2VwdElucHV0VHlwZV9ib2xkOiBCb29sZWFuSW5wdXRBY2NlcHQ7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LXdlaWdodC1ib2xkZXInKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgYm9sZGVyOiBib29sZWFuO1xuICBzdGF0aWMgcmVhZG9ubHkgbmdBY2NlcHRJbnB1dFR5cGVfYm9sZGVyOiBCb29sZWFuSW5wdXRBY2NlcHQ7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LXdlaWdodC1leHRyYWJvbGQnKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgZXh0cmFib2xkOiBib29sZWFuO1xuICBzdGF0aWMgcmVhZG9ubHkgbmdBY2NlcHRJbnB1dFR5cGVfZXh0cmFib2xkOiBCb29sZWFuSW5wdXRBY2NlcHQ7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHt9XG5cbiAgZ2V0IG5hdGl2ZUVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICB9XG59XG4iXX0=