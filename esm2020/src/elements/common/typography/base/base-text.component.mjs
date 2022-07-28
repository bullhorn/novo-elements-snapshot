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
NovoBaseTextElement.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoBaseTextElement, inputs: { size: "size", weight: "weight", lineLength: "lineLength", color: "color", disabled: "disabled", muted: "muted", error: "error", marginBefore: "marginBefore", marginAfter: "marginAfter", nowrap: "nowrap", smaller: "smaller", larger: "larger", thin: "thin", lighter: "lighter", light: "light", medium: "medium", bold: "bold", bolder: "bolder", extrabold: "extrabold" }, host: { properties: { "class": "this.hb_classBinding", "class.text-disabled": "this.disabled", "class.text-color-empty": "this.muted", "class.text-color-negative": "this.error", "class.margin-before": "this.marginBefore", "class.margin-after": "this.marginAfter", "class.text-nowrap": "this.nowrap", "class.text-size-smaller": "this.smaller", "class.text-size-larger": "this.larger", "class.text-weight-thin": "this.thin", "class.text-weight-lighter": "this.lighter", "class.text-weight-light": "this.light", "class.text-weight-medium": "this.medium", "class.text-weight-bold": "this.bold", "class.text-weight-bolder": "this.bolder", "class.text-weight-extrabold": "this.extrabold" } }, ngImport: i0 });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS10ZXh0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2NvbW1vbi90eXBvZ3JhcGh5L2Jhc2UvYmFzZS10ZXh0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBSTVELE1BQU0sT0FBTyxtQkFBbUI7SUFpRzlCLFlBQXNCLE9BQW1CO1FBQW5CLFlBQU8sR0FBUCxPQUFPLENBQVk7SUFBRyxDQUFDO0lBdkY3QyxJQUNJLGVBQWU7UUFDakIsT0FBTztZQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGNBQWMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGVBQWUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQ3pELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGFBQWEsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGVBQWUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJO1NBQ2xEO2FBQ0UsTUFBTSxDQUFDLE9BQU8sQ0FBQzthQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNmLENBQUM7SUErRUQsSUFBSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUNwQyxDQUFDOztpSEFyR1UsbUJBQW1CO3FHQUFuQixtQkFBbUI7QUF5QjlCO0lBREMsWUFBWSxFQUFFOztxREFDRztBQUtsQjtJQURDLFlBQVksRUFBRTs7a0RBQ0E7QUFLZjtJQURDLFlBQVksRUFBRTs7a0RBQ0E7QUFLZjtJQURDLFlBQVksRUFBRTs7eURBQ087QUFLdEI7SUFEQyxZQUFZLEVBQUU7O3dEQUNNO0FBS3JCO0lBREMsWUFBWSxFQUFFOzttREFDQztBQUtoQjtJQURDLFlBQVksRUFBRTs7b0RBQ0U7QUFLakI7SUFEQyxZQUFZLEVBQUU7O21EQUNDO0FBS2hCO0lBREMsWUFBWSxFQUFFOztpREFDRDtBQUtkO0lBREMsWUFBWSxFQUFFOztvREFDRTtBQUtqQjtJQURDLFlBQVksRUFBRTs7a0RBQ0E7QUFLZjtJQURDLFlBQVksRUFBRTs7bURBQ0M7QUFLaEI7SUFEQyxZQUFZLEVBQUU7O2lEQUNEO0FBS2Q7SUFEQyxZQUFZLEVBQUU7O21EQUNDO0FBS2hCO0lBREMsWUFBWSxFQUFFOztzREFDSTs0RkEvRlIsbUJBQW1CO2tCQUQvQixTQUFTO2lHQUdSLElBQUk7c0JBREgsS0FBSztnQkFHTixNQUFNO3NCQURMLEtBQUs7Z0JBR04sVUFBVTtzQkFEVCxLQUFLO2dCQUdOLEtBQUs7c0JBREosS0FBSztnQkFJRixlQUFlO3NCQURsQixXQUFXO3VCQUFDLE9BQU87Z0JBZXBCLFFBQVE7c0JBSFAsV0FBVzt1QkFBQyxxQkFBcUI7O3NCQUNqQyxLQUFLO2dCQU9OLEtBQUs7c0JBSEosV0FBVzt1QkFBQyx3QkFBd0I7O3NCQUNwQyxLQUFLO2dCQU9OLEtBQUs7c0JBSEosV0FBVzt1QkFBQywyQkFBMkI7O3NCQUN2QyxLQUFLO2dCQU9OLFlBQVk7c0JBSFgsV0FBVzt1QkFBQyxxQkFBcUI7O3NCQUNqQyxLQUFLO2dCQU9OLFdBQVc7c0JBSFYsV0FBVzt1QkFBQyxvQkFBb0I7O3NCQUNoQyxLQUFLO2dCQU9OLE1BQU07c0JBSEwsV0FBVzt1QkFBQyxtQkFBbUI7O3NCQUMvQixLQUFLO2dCQU9OLE9BQU87c0JBSE4sV0FBVzt1QkFBQyx5QkFBeUI7O3NCQUNyQyxLQUFLO2dCQU9OLE1BQU07c0JBSEwsV0FBVzt1QkFBQyx3QkFBd0I7O3NCQUNwQyxLQUFLO2dCQU9OLElBQUk7c0JBSEgsV0FBVzt1QkFBQyx3QkFBd0I7O3NCQUNwQyxLQUFLO2dCQU9OLE9BQU87c0JBSE4sV0FBVzt1QkFBQywyQkFBMkI7O3NCQUN2QyxLQUFLO2dCQU9OLEtBQUs7c0JBSEosV0FBVzt1QkFBQyx5QkFBeUI7O3NCQUNyQyxLQUFLO2dCQU9OLE1BQU07c0JBSEwsV0FBVzt1QkFBQywwQkFBMEI7O3NCQUN0QyxLQUFLO2dCQU9OLElBQUk7c0JBSEgsV0FBVzt1QkFBQyx3QkFBd0I7O3NCQUNwQyxLQUFLO2dCQU9OLE1BQU07c0JBSEwsV0FBVzt1QkFBQywwQkFBMEI7O3NCQUN0QyxLQUFLO2dCQU9OLFNBQVM7c0JBSFIsV0FBVzt1QkFBQyw2QkFBNkI7O3NCQUN6QyxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWxzL2RlY29yYXRvcnMnO1xuaW1wb3J0IHsgVHlwb2dyYXBoeUxlbmd0aCwgVHlwb2dyYXBoeVNpemUsIFR5cG9ncmFwaHlXZWlnaHQgfSBmcm9tICcuLi90ZXh0LnR5cGVzJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgTm92b0Jhc2VUZXh0RWxlbWVudCB7XG4gIEBJbnB1dCgpXG4gIHNpemU6IFR5cG9ncmFwaHlTaXplO1xuICBASW5wdXQoKVxuICB3ZWlnaHQ6IFR5cG9ncmFwaHlXZWlnaHQ7XG4gIEBJbnB1dCgpXG4gIGxpbmVMZW5ndGg6IFR5cG9ncmFwaHlMZW5ndGg7XG4gIEBJbnB1dCgpXG4gIGNvbG9yOiBzdHJpbmc7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGdldCBoYl9jbGFzc0JpbmRpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gW1xuICAgICAgdGhpcy5jb2xvciA/IGB0ZXh0LWNvbG9yLSR7dGhpcy5jb2xvcn1gIDogbnVsbCxcbiAgICAgIHRoaXMubGluZUxlbmd0aCA/IGB0ZXh0LWxlbmd0aC0ke3RoaXMubGluZUxlbmd0aH1gIDogbnVsbCxcbiAgICAgIHRoaXMuc2l6ZSA/IGB0ZXh0LXNpemUtJHt0aGlzLnNpemV9YCA6IG51bGwsXG4gICAgICB0aGlzLndlaWdodCA/IGB0ZXh0LXdlaWdodC0ke3RoaXMud2VpZ2h0fWAgOiBudWxsLFxuICAgIF1cbiAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgIC5qb2luKCcgJyk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtZGlzYWJsZWQnKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LWNvbG9yLWVtcHR5JylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIG11dGVkOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC1jb2xvci1uZWdhdGl2ZScpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBlcnJvcjogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm1hcmdpbi1iZWZvcmUnKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgbWFyZ2luQmVmb3JlOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MubWFyZ2luLWFmdGVyJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIG1hcmdpbkFmdGVyOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC1ub3dyYXAnKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgbm93cmFwOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC1zaXplLXNtYWxsZXInKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgc21hbGxlcjogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtc2l6ZS1sYXJnZXInKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgbGFyZ2VyOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC13ZWlnaHQtdGhpbicpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICB0aGluOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC13ZWlnaHQtbGlnaHRlcicpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBsaWdodGVyOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC13ZWlnaHQtbGlnaHQnKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgbGlnaHQ6IGJvb2xlYW47XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LXdlaWdodC1tZWRpdW0nKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgbWVkaXVtOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC13ZWlnaHQtYm9sZCcpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBib2xkOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC13ZWlnaHQtYm9sZGVyJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGJvbGRlcjogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtd2VpZ2h0LWV4dHJhYm9sZCcpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBleHRyYWJvbGQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHt9XG5cbiAgZ2V0IG5hdGl2ZUVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICB9XG59XG4iXX0=