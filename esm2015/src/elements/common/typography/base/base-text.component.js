import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { BooleanInput } from '../../../../utils';
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
NovoBaseTextElement.decorators = [
    { type: Directive }
];
NovoBaseTextElement.ctorParameters = () => [
    { type: ElementRef }
];
NovoBaseTextElement.propDecorators = {
    size: [{ type: Input }],
    weight: [{ type: Input }],
    lineLength: [{ type: Input }],
    color: [{ type: Input }],
    hb_classBinding: [{ type: HostBinding, args: ['class',] }],
    disabled: [{ type: HostBinding, args: ['class.text-disabled',] }, { type: Input }],
    muted: [{ type: HostBinding, args: ['class.text-color-empty',] }, { type: Input }],
    error: [{ type: HostBinding, args: ['class.text-color-negative',] }, { type: Input }],
    marginBefore: [{ type: HostBinding, args: ['class.margin-before',] }, { type: Input }],
    marginAfter: [{ type: HostBinding, args: ['class.margin-after',] }, { type: Input }],
    nowrap: [{ type: HostBinding, args: ['class.text-nowrap',] }, { type: Input }],
    smaller: [{ type: HostBinding, args: ['class.text-size-smaller',] }, { type: Input }],
    larger: [{ type: HostBinding, args: ['class.text-size-larger',] }, { type: Input }],
    thin: [{ type: HostBinding, args: ['class.text-weight-thin',] }, { type: Input }],
    lighter: [{ type: HostBinding, args: ['class.text-weight-lighter',] }, { type: Input }],
    light: [{ type: HostBinding, args: ['class.text-weight-light',] }, { type: Input }],
    medium: [{ type: HostBinding, args: ['class.text-weight-medium',] }, { type: Input }],
    bold: [{ type: HostBinding, args: ['class.text-weight-bold',] }, { type: Input }],
    bolder: [{ type: HostBinding, args: ['class.text-weight-bolder',] }, { type: Input }],
    extrabold: [{ type: HostBinding, args: ['class.text-weight-extrabold',] }, { type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS10ZXh0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9jb21tb24vdHlwb2dyYXBoeS9iYXNlL2Jhc2UtdGV4dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBSWpELE1BQU0sT0FBTyxtQkFBbUI7SUFpRzlCLFlBQXNCLE9BQW1CO1FBQW5CLFlBQU8sR0FBUCxPQUFPLENBQVk7SUFBRyxDQUFDO0lBdkY3QyxJQUNJLGVBQWU7UUFDakIsT0FBTztZQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGNBQWMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGVBQWUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQ3pELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGFBQWEsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGVBQWUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJO1NBQ2xEO2FBQ0UsTUFBTSxDQUFDLE9BQU8sQ0FBQzthQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNmLENBQUM7SUErRUQsSUFBSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUNwQyxDQUFDOzs7WUF0R0YsU0FBUzs7O1lBSlUsVUFBVTs7O21CQU0zQixLQUFLO3FCQUVMLEtBQUs7eUJBRUwsS0FBSztvQkFFTCxLQUFLOzhCQUdMLFdBQVcsU0FBQyxPQUFPO3VCQVluQixXQUFXLFNBQUMscUJBQXFCLGNBQ2pDLEtBQUs7b0JBSUwsV0FBVyxTQUFDLHdCQUF3QixjQUNwQyxLQUFLO29CQUlMLFdBQVcsU0FBQywyQkFBMkIsY0FDdkMsS0FBSzsyQkFJTCxXQUFXLFNBQUMscUJBQXFCLGNBQ2pDLEtBQUs7MEJBSUwsV0FBVyxTQUFDLG9CQUFvQixjQUNoQyxLQUFLO3FCQUlMLFdBQVcsU0FBQyxtQkFBbUIsY0FDL0IsS0FBSztzQkFJTCxXQUFXLFNBQUMseUJBQXlCLGNBQ3JDLEtBQUs7cUJBSUwsV0FBVyxTQUFDLHdCQUF3QixjQUNwQyxLQUFLO21CQUlMLFdBQVcsU0FBQyx3QkFBd0IsY0FDcEMsS0FBSztzQkFJTCxXQUFXLFNBQUMsMkJBQTJCLGNBQ3ZDLEtBQUs7b0JBSUwsV0FBVyxTQUFDLHlCQUF5QixjQUNyQyxLQUFLO3FCQUlMLFdBQVcsU0FBQywwQkFBMEIsY0FDdEMsS0FBSzttQkFJTCxXQUFXLFNBQUMsd0JBQXdCLGNBQ3BDLEtBQUs7cUJBSUwsV0FBVyxTQUFDLDBCQUEwQixjQUN0QyxLQUFLO3dCQUlMLFdBQVcsU0FBQyw2QkFBNkIsY0FDekMsS0FBSzs7QUFwRU47SUFEQyxZQUFZLEVBQUU7O3FEQUNHO0FBS2xCO0lBREMsWUFBWSxFQUFFOztrREFDQTtBQUtmO0lBREMsWUFBWSxFQUFFOztrREFDQTtBQUtmO0lBREMsWUFBWSxFQUFFOzt5REFDTztBQUt0QjtJQURDLFlBQVksRUFBRTs7d0RBQ007QUFLckI7SUFEQyxZQUFZLEVBQUU7O21EQUNDO0FBS2hCO0lBREMsWUFBWSxFQUFFOztvREFDRTtBQUtqQjtJQURDLFlBQVksRUFBRTs7bURBQ0M7QUFLaEI7SUFEQyxZQUFZLEVBQUU7O2lEQUNEO0FBS2Q7SUFEQyxZQUFZLEVBQUU7O29EQUNFO0FBS2pCO0lBREMsWUFBWSxFQUFFOztrREFDQTtBQUtmO0lBREMsWUFBWSxFQUFFOzttREFDQztBQUtoQjtJQURDLFlBQVksRUFBRTs7aURBQ0Q7QUFLZDtJQURDLFlBQVksRUFBRTs7bURBQ0M7QUFLaEI7SUFEQyxZQUFZLEVBQUU7O3NEQUNJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IFR5cG9ncmFwaHlMZW5ndGgsIFR5cG9ncmFwaHlTaXplLCBUeXBvZ3JhcGh5V2VpZ2h0IH0gZnJvbSAnLi4vdGV4dC50eXBlcyc7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIE5vdm9CYXNlVGV4dEVsZW1lbnQge1xuICBASW5wdXQoKVxuICBzaXplOiBUeXBvZ3JhcGh5U2l6ZTtcbiAgQElucHV0KClcbiAgd2VpZ2h0OiBUeXBvZ3JhcGh5V2VpZ2h0O1xuICBASW5wdXQoKVxuICBsaW5lTGVuZ3RoOiBUeXBvZ3JhcGh5TGVuZ3RoO1xuICBASW5wdXQoKVxuICBjb2xvcjogc3RyaW5nO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgaGJfY2xhc3NCaW5kaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHRoaXMuY29sb3IgPyBgdGV4dC1jb2xvci0ke3RoaXMuY29sb3J9YCA6IG51bGwsXG4gICAgICB0aGlzLmxpbmVMZW5ndGggPyBgdGV4dC1sZW5ndGgtJHt0aGlzLmxpbmVMZW5ndGh9YCA6IG51bGwsXG4gICAgICB0aGlzLnNpemUgPyBgdGV4dC1zaXplLSR7dGhpcy5zaXplfWAgOiBudWxsLFxuICAgICAgdGhpcy53ZWlnaHQgPyBgdGV4dC13ZWlnaHQtJHt0aGlzLndlaWdodH1gIDogbnVsbCxcbiAgICBdXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAuam9pbignICcpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LWRpc2FibGVkJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC1jb2xvci1lbXB0eScpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBtdXRlZDogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtY29sb3ItbmVnYXRpdmUnKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgZXJyb3I6IGJvb2xlYW47XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tYXJnaW4tYmVmb3JlJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIG1hcmdpbkJlZm9yZTogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm1hcmdpbi1hZnRlcicpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBtYXJnaW5BZnRlcjogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtbm93cmFwJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIG5vd3JhcDogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtc2l6ZS1zbWFsbGVyJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIHNtYWxsZXI6IGJvb2xlYW47XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LXNpemUtbGFyZ2VyJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGxhcmdlcjogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtd2VpZ2h0LXRoaW4nKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgdGhpbjogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtd2VpZ2h0LWxpZ2h0ZXInKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgbGlnaHRlcjogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtd2VpZ2h0LWxpZ2h0JylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGxpZ2h0OiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC13ZWlnaHQtbWVkaXVtJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIG1lZGl1bTogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtd2VpZ2h0LWJvbGQnKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgYm9sZDogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtd2VpZ2h0LWJvbGRlcicpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBib2xkZXI6IGJvb2xlYW47XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LXdlaWdodC1leHRyYWJvbGQnKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgZXh0cmFib2xkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBlbGVtZW50OiBFbGVtZW50UmVmKSB7fVxuXG4gIGdldCBuYXRpdmVFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgfVxufVxuIl19