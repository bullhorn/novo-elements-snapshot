import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { BooleanInput } from '../../../../utils';
export class NovoBaseTextElement {
    constructor(element) {
        this.element = element;
    }
    get hb_isSizeSmall() {
        return this.size === 'small';
    }
    get hb_isSizeLarge() {
        return this.size === 'large';
    }
    get hb_isSizeDefault() {
        return !['small', 'large'].includes(this.size);
    }
    get hb_isWeightThin() {
        return this.weight === 'thin';
    }
    get hb_isWeightMedium() {
        return this.weight === 'medium';
    }
    get hb_isWeightBold() {
        return this.weight === 'bold';
    }
    get hb_isWeightDefault() {
        return !['thin', 'medium', 'bold'].includes(this.weight);
    }
    get hb_classBinding() {
        return [this.color ? `text-color-${this.color}` : null, this.lineLength ? `text-length-${this.lineLength}` : null]
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
    hb_isSizeSmall: [{ type: HostBinding, args: ['class.text-size-small',] }],
    hb_isSizeLarge: [{ type: HostBinding, args: ['class.text-size-large',] }],
    hb_isSizeDefault: [{ type: HostBinding, args: ['class.text-size-default',] }],
    hb_isWeightThin: [{ type: HostBinding, args: ['class.text-weight-thin',] }],
    hb_isWeightMedium: [{ type: HostBinding, args: ['class.text-weight-medium',] }],
    hb_isWeightBold: [{ type: HostBinding, args: ['class.text-weight-bold',] }],
    hb_isWeightDefault: [{ type: HostBinding, args: ['class.text-weight-default',] }],
    hb_classBinding: [{ type: HostBinding, args: ['class',] }],
    disabled: [{ type: HostBinding, args: ['class.text-disabled',] }, { type: Input }],
    muted: [{ type: HostBinding, args: ['class.text-color-empty',] }, { type: Input }],
    error: [{ type: HostBinding, args: ['class.text-color-negative',] }, { type: Input }],
    marginBefore: [{ type: HostBinding, args: ['class.margin-before',] }, { type: Input }],
    marginAfter: [{ type: HostBinding, args: ['class.margin-after',] }, { type: Input }],
    nowrap: [{ type: HostBinding, args: ['class.text-nowrap',] }, { type: Input }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS10ZXh0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9jb21tb24vdHlwb2dyYXBoeS9iYXNlL2Jhc2UtdGV4dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBSWpELE1BQU0sT0FBTyxtQkFBbUI7SUFrRjlCLFlBQXNCLE9BQW1CO1FBQW5CLFlBQU8sR0FBUCxPQUFPLENBQVk7SUFBRyxDQUFDO0lBeEU3QyxJQUNJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQztJQUMvQixDQUFDO0lBRUQsSUFDSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQ0ksZ0JBQWdCO1FBQ2xCLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxJQUNJLGVBQWU7UUFDakIsT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQztJQUNoQyxDQUFDO0lBRUQsSUFDSSxpQkFBaUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQztJQUNsQyxDQUFDO0lBRUQsSUFDSSxlQUFlO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUM7SUFDaEMsQ0FBQztJQUVELElBQ0ksa0JBQWtCO1FBQ3BCLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsSUFDSSxlQUFlO1FBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxjQUFjLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGVBQWUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7YUFDL0csTUFBTSxDQUFDLE9BQU8sQ0FBQzthQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNmLENBQUM7SUFrQ0QsSUFBSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUNwQyxDQUFDOzs7WUF2RkYsU0FBUzs7O1lBSlUsVUFBVTs7O21CQU0zQixLQUFLO3FCQUVMLEtBQUs7eUJBRUwsS0FBSztvQkFFTCxLQUFLOzZCQUdMLFdBQVcsU0FBQyx1QkFBdUI7NkJBS25DLFdBQVcsU0FBQyx1QkFBdUI7K0JBS25DLFdBQVcsU0FBQyx5QkFBeUI7OEJBS3JDLFdBQVcsU0FBQyx3QkFBd0I7Z0NBS3BDLFdBQVcsU0FBQywwQkFBMEI7OEJBS3RDLFdBQVcsU0FBQyx3QkFBd0I7aUNBS3BDLFdBQVcsU0FBQywyQkFBMkI7OEJBS3ZDLFdBQVcsU0FBQyxPQUFPO3VCQU9uQixXQUFXLFNBQUMscUJBQXFCLGNBQ2pDLEtBQUs7b0JBSUwsV0FBVyxTQUFDLHdCQUF3QixjQUNwQyxLQUFLO29CQUlMLFdBQVcsU0FBQywyQkFBMkIsY0FDdkMsS0FBSzsyQkFJTCxXQUFXLFNBQUMscUJBQXFCLGNBQ2pDLEtBQUs7MEJBSUwsV0FBVyxTQUFDLG9CQUFvQixjQUNoQyxLQUFLO3FCQUlMLFdBQVcsU0FBQyxtQkFBbUIsY0FDL0IsS0FBSzs7QUF2Qk47SUFEQyxZQUFZLEVBQUU7O3FEQUNHO0FBS2xCO0lBREMsWUFBWSxFQUFFOztrREFDQTtBQUtmO0lBREMsWUFBWSxFQUFFOztrREFDQTtBQUtmO0lBREMsWUFBWSxFQUFFOzt5REFDTztBQUt0QjtJQURDLFlBQVksRUFBRTs7d0RBQ007QUFLckI7SUFEQyxZQUFZLEVBQUU7O21EQUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IFR5cG9ncmFwaHlMZW5ndGgsIFR5cG9ncmFwaHlTaXplLCBUeXBvZ3JhcGh5V2VpZ2h0IH0gZnJvbSAnLi4vdGV4dC50eXBlcyc7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIE5vdm9CYXNlVGV4dEVsZW1lbnQge1xuICBASW5wdXQoKVxuICBzaXplOiBUeXBvZ3JhcGh5U2l6ZTtcbiAgQElucHV0KClcbiAgd2VpZ2h0OiBUeXBvZ3JhcGh5V2VpZ2h0O1xuICBASW5wdXQoKVxuICBsaW5lTGVuZ3RoOiBUeXBvZ3JhcGh5TGVuZ3RoO1xuICBASW5wdXQoKVxuICBjb2xvcjogc3RyaW5nO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC1zaXplLXNtYWxsJylcbiAgZ2V0IGhiX2lzU2l6ZVNtYWxsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNpemUgPT09ICdzbWFsbCc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtc2l6ZS1sYXJnZScpXG4gIGdldCBoYl9pc1NpemVMYXJnZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zaXplID09PSAnbGFyZ2UnO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LXNpemUtZGVmYXVsdCcpXG4gIGdldCBoYl9pc1NpemVEZWZhdWx0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhWydzbWFsbCcsICdsYXJnZSddLmluY2x1ZGVzKHRoaXMuc2l6ZSk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtd2VpZ2h0LXRoaW4nKVxuICBnZXQgaGJfaXNXZWlnaHRUaGluKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLndlaWdodCA9PT0gJ3RoaW4nO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LXdlaWdodC1tZWRpdW0nKVxuICBnZXQgaGJfaXNXZWlnaHRNZWRpdW0oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMud2VpZ2h0ID09PSAnbWVkaXVtJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC13ZWlnaHQtYm9sZCcpXG4gIGdldCBoYl9pc1dlaWdodEJvbGQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMud2VpZ2h0ID09PSAnYm9sZCc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtd2VpZ2h0LWRlZmF1bHQnKVxuICBnZXQgaGJfaXNXZWlnaHREZWZhdWx0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhWyd0aGluJywgJ21lZGl1bScsICdib2xkJ10uaW5jbHVkZXModGhpcy53ZWlnaHQpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGdldCBoYl9jbGFzc0JpbmRpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gW3RoaXMuY29sb3IgPyBgdGV4dC1jb2xvci0ke3RoaXMuY29sb3J9YCA6IG51bGwsIHRoaXMubGluZUxlbmd0aCA/IGB0ZXh0LWxlbmd0aC0ke3RoaXMubGluZUxlbmd0aH1gIDogbnVsbF1cbiAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgIC5qb2luKCcgJyk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtZGlzYWJsZWQnKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LWNvbG9yLWVtcHR5JylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIG11dGVkOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC1jb2xvci1uZWdhdGl2ZScpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBlcnJvcjogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm1hcmdpbi1iZWZvcmUnKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgbWFyZ2luQmVmb3JlOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MubWFyZ2luLWFmdGVyJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIG1hcmdpbkFmdGVyOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC1ub3dyYXAnKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgbm93cmFwOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBlbGVtZW50OiBFbGVtZW50UmVmKSB7fVxuXG4gIGdldCBuYXRpdmVFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgfVxufVxuIl19