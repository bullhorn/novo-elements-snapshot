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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS10ZXh0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbW1vbi90eXBvZ3JhcGh5L2Jhc2UvYmFzZS10ZXh0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFHbkQsTUFBTSxPQUFPLG1CQUFtQjtJQWdIOUIsWUFBc0IsT0FBbUI7UUFBbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtJQUFHLENBQUM7SUF0RzdDLElBQ0ksZUFBZTtRQUNqQixPQUFPO1lBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsY0FBYyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsZUFBZSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsZUFBZSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUk7U0FDbEQ7YUFDRSxNQUFNLENBQUMsT0FBTyxDQUFDO2FBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQThGRCxJQUFJLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ3BDLENBQUM7O2lIQXBIVSxtQkFBbUI7cUdBQW5CLG1CQUFtQjtBQXlCOUI7SUFEQyxZQUFZLEVBQUU7O3FEQUNHO0FBS2xCO0lBREMsWUFBWSxFQUFFOztrREFDQTtBQUtmO0lBREMsWUFBWSxFQUFFOztrREFDQTtBQUtmO0lBREMsWUFBWSxFQUFFOzt5REFDTztBQUt0QjtJQURDLFlBQVksRUFBRTs7d0RBQ007QUFLckI7SUFEQyxZQUFZLEVBQUU7O3dEQUNNO0FBS3JCO0lBREMsWUFBWSxFQUFFOztzREFDSTtBQUtuQjtJQURDLFlBQVksRUFBRTs7bURBQ0M7QUFLaEI7SUFEQyxZQUFZLEVBQUU7O3FEQUNHO0FBS2xCO0lBREMsWUFBWSxFQUFFOztvREFDRTtBQUtqQjtJQURDLFlBQVksRUFBRTs7bURBQ0M7QUFLaEI7SUFEQyxZQUFZLEVBQUU7O2lEQUNEO0FBS2Q7SUFEQyxZQUFZLEVBQUU7O29EQUNFO0FBS2pCO0lBREMsWUFBWSxFQUFFOztrREFDQTtBQUtmO0lBREMsWUFBWSxFQUFFOzttREFDQztBQUtoQjtJQURDLFlBQVksRUFBRTs7aURBQ0Q7QUFLZDtJQURDLFlBQVksRUFBRTs7bURBQ0M7QUFLaEI7SUFEQyxZQUFZLEVBQUU7O3NEQUNJOzRGQTlHUixtQkFBbUI7a0JBRC9CLFNBQVM7aUdBR1IsSUFBSTtzQkFESCxLQUFLO2dCQUdOLE1BQU07c0JBREwsS0FBSztnQkFHTixVQUFVO3NCQURULEtBQUs7Z0JBR04sS0FBSztzQkFESixLQUFLO2dCQUlGLGVBQWU7c0JBRGxCLFdBQVc7dUJBQUMsT0FBTztnQkFlcEIsUUFBUTtzQkFIUCxXQUFXO3VCQUFDLHFCQUFxQjs7c0JBQ2pDLEtBQUs7Z0JBT04sS0FBSztzQkFISixXQUFXO3VCQUFDLHdCQUF3Qjs7c0JBQ3BDLEtBQUs7Z0JBT04sS0FBSztzQkFISixXQUFXO3VCQUFDLDJCQUEyQjs7c0JBQ3ZDLEtBQUs7Z0JBT04sWUFBWTtzQkFIWCxXQUFXO3VCQUFDLHFCQUFxQjs7c0JBQ2pDLEtBQUs7Z0JBT04sV0FBVztzQkFIVixXQUFXO3VCQUFDLG9CQUFvQjs7c0JBQ2hDLEtBQUs7Z0JBT04sV0FBVztzQkFIVixXQUFXO3VCQUFDLHdCQUF3Qjs7c0JBQ3BDLEtBQUs7Z0JBT04sU0FBUztzQkFIUixXQUFXO3VCQUFDLHNCQUFzQjs7c0JBQ2xDLEtBQUs7Z0JBT04sTUFBTTtzQkFITCxXQUFXO3VCQUFDLG1CQUFtQjs7c0JBQy9CLEtBQUs7Z0JBT04sUUFBUTtzQkFIUCxXQUFXO3VCQUFDLHFCQUFxQjs7c0JBQ2pDLEtBQUs7Z0JBT04sT0FBTztzQkFITixXQUFXO3VCQUFDLHlCQUF5Qjs7c0JBQ3JDLEtBQUs7Z0JBT04sTUFBTTtzQkFITCxXQUFXO3VCQUFDLHdCQUF3Qjs7c0JBQ3BDLEtBQUs7Z0JBT04sSUFBSTtzQkFISCxXQUFXO3VCQUFDLHdCQUF3Qjs7c0JBQ3BDLEtBQUs7Z0JBT04sT0FBTztzQkFITixXQUFXO3VCQUFDLDJCQUEyQjs7c0JBQ3ZDLEtBQUs7Z0JBT04sS0FBSztzQkFISixXQUFXO3VCQUFDLHlCQUF5Qjs7c0JBQ3JDLEtBQUs7Z0JBT04sTUFBTTtzQkFITCxXQUFXO3VCQUFDLDBCQUEwQjs7c0JBQ3RDLEtBQUs7Z0JBT04sSUFBSTtzQkFISCxXQUFXO3VCQUFDLHdCQUF3Qjs7c0JBQ3BDLEtBQUs7Z0JBT04sTUFBTTtzQkFITCxXQUFXO3VCQUFDLDBCQUEwQjs7c0JBQ3RDLEtBQUs7Z0JBT04sU0FBUztzQkFIUixXQUFXO3VCQUFDLDZCQUE2Qjs7c0JBQ3pDLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHlwb2dyYXBoeUxlbmd0aCwgVHlwb2dyYXBoeVNpemUsIFR5cG9ncmFwaHlXZWlnaHQgfSBmcm9tICcuLi90ZXh0LnR5cGVzJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBOb3ZvQmFzZVRleHRFbGVtZW50IHtcbiAgQElucHV0KClcbiAgc2l6ZTogVHlwb2dyYXBoeVNpemU7XG4gIEBJbnB1dCgpXG4gIHdlaWdodDogVHlwb2dyYXBoeVdlaWdodDtcbiAgQElucHV0KClcbiAgbGluZUxlbmd0aDogVHlwb2dyYXBoeUxlbmd0aDtcbiAgQElucHV0KClcbiAgY29sb3I6IHN0cmluZztcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgZ2V0IGhiX2NsYXNzQmluZGluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBbXG4gICAgICB0aGlzLmNvbG9yID8gYHRleHQtY29sb3ItJHt0aGlzLmNvbG9yfWAgOiBudWxsLFxuICAgICAgdGhpcy5saW5lTGVuZ3RoID8gYHRleHQtbGVuZ3RoLSR7dGhpcy5saW5lTGVuZ3RofWAgOiBudWxsLFxuICAgICAgdGhpcy5zaXplID8gYHRleHQtc2l6ZS0ke3RoaXMuc2l6ZX1gIDogbnVsbCxcbiAgICAgIHRoaXMud2VpZ2h0ID8gYHRleHQtd2VpZ2h0LSR7dGhpcy53ZWlnaHR9YCA6IG51bGwsXG4gICAgXVxuICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgLmpvaW4oJyAnKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC1kaXNhYmxlZCcpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtY29sb3ItZW1wdHknKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgbXV0ZWQ6IGJvb2xlYW47XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LWNvbG9yLW5lZ2F0aXZlJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGVycm9yOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MubWFyZ2luLWJlZm9yZScpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBtYXJnaW5CZWZvcmU6IGJvb2xlYW47XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tYXJnaW4tYWZ0ZXInKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgbWFyZ2luQWZ0ZXI6IGJvb2xlYW47XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LWNhcGl0aWFsaXplJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGNhcGl0aWFsaXplOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC11cHBlcmNhc2UnKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgdXBwZXJjYXNlOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC1ub3dyYXAnKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgbm93cmFwOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC1lbGxpcHNpcycpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBlbGxpcHNpczogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtc2l6ZS1zbWFsbGVyJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIHNtYWxsZXI6IGJvb2xlYW47XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LXNpemUtbGFyZ2VyJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGxhcmdlcjogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtd2VpZ2h0LXRoaW4nKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgdGhpbjogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtd2VpZ2h0LWxpZ2h0ZXInKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgbGlnaHRlcjogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtd2VpZ2h0LWxpZ2h0JylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGxpZ2h0OiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC13ZWlnaHQtbWVkaXVtJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIG1lZGl1bTogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtd2VpZ2h0LWJvbGQnKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgYm9sZDogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtd2VpZ2h0LWJvbGRlcicpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBib2xkZXI6IGJvb2xlYW47XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LXdlaWdodC1leHRyYWJvbGQnKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgZXh0cmFib2xkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBlbGVtZW50OiBFbGVtZW50UmVmKSB7fVxuXG4gIGdldCBuYXRpdmVFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgfVxufVxuIl19