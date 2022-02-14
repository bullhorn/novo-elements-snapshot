import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { BooleanInput } from '../../../../utils';
import * as i0 from "@angular/core";
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
NovoBaseTextElement.ɵfac = function NovoBaseTextElement_Factory(t) { return new (t || NovoBaseTextElement)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
NovoBaseTextElement.ɵdir = i0.ɵɵdefineDirective({ type: NovoBaseTextElement, hostVars: 26, hostBindings: function NovoBaseTextElement_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassMap(ctx.hb_classBinding);
        i0.ɵɵclassProp("text-size-small", ctx.hb_isSizeSmall)("text-size-large", ctx.hb_isSizeLarge)("text-size-default", ctx.hb_isSizeDefault)("text-weight-thin", ctx.hb_isWeightThin)("text-weight-medium", ctx.hb_isWeightMedium)("text-weight-bold", ctx.hb_isWeightBold)("text-weight-default", ctx.hb_isWeightDefault)("text-disabled", ctx.disabled)("text-color-empty", ctx.muted)("text-color-negative", ctx.error)("margin-before", ctx.marginBefore)("margin-after", ctx.marginAfter);
    } }, inputs: { size: "size", weight: "weight", lineLength: "lineLength", color: "color", disabled: "disabled", muted: "muted", error: "error", marginBefore: "marginBefore", marginAfter: "marginAfter" } });
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
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoBaseTextElement, [{
        type: Directive
    }], function () { return [{ type: i0.ElementRef }]; }, { size: [{
            type: Input
        }], weight: [{
            type: Input
        }], lineLength: [{
            type: Input
        }], color: [{
            type: Input
        }], hb_isSizeSmall: [{
            type: HostBinding,
            args: ['class.text-size-small']
        }], hb_isSizeLarge: [{
            type: HostBinding,
            args: ['class.text-size-large']
        }], hb_isSizeDefault: [{
            type: HostBinding,
            args: ['class.text-size-default']
        }], hb_isWeightThin: [{
            type: HostBinding,
            args: ['class.text-weight-thin']
        }], hb_isWeightMedium: [{
            type: HostBinding,
            args: ['class.text-weight-medium']
        }], hb_isWeightBold: [{
            type: HostBinding,
            args: ['class.text-weight-bold']
        }], hb_isWeightDefault: [{
            type: HostBinding,
            args: ['class.text-weight-default']
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS10ZXh0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9jb21tb24vdHlwb2dyYXBoeS9iYXNlL2Jhc2UtdGV4dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDOztBQUlqRCxNQUFNLE9BQU8sbUJBQW1CO0lBNkU5QixZQUFzQixPQUFtQjtRQUFuQixZQUFPLEdBQVAsT0FBTyxDQUFZO0lBQUcsQ0FBQztJQW5FN0MsSUFDSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQ0ksY0FBYztRQUNoQixPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUNJLGdCQUFnQjtRQUNsQixPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsSUFDSSxlQUFlO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUM7SUFDaEMsQ0FBQztJQUVELElBQ0ksaUJBQWlCO1FBQ25CLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUM7SUFDbEMsQ0FBQztJQUVELElBQ0ksZUFBZTtRQUNqQixPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxJQUNJLGtCQUFrQjtRQUNwQixPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELElBQ0ksZUFBZTtRQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsY0FBYyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxlQUFlLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2FBQy9HLE1BQU0sQ0FBQyxPQUFPLENBQUM7YUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDZixDQUFDO0lBNkJELElBQUksYUFBYTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDcEMsQ0FBQzs7c0ZBakZVLG1CQUFtQjt3REFBbkIsbUJBQW1COzs7O0FBdUQ5QjtJQURDLFlBQVksRUFBRTs7cURBQ0c7QUFLbEI7SUFEQyxZQUFZLEVBQUU7O2tEQUNBO0FBS2Y7SUFEQyxZQUFZLEVBQUU7O2tEQUNBO0FBS2Y7SUFEQyxZQUFZLEVBQUU7O3lEQUNPO0FBS3RCO0lBREMsWUFBWSxFQUFFOzt3REFDTTtrREEzRVYsbUJBQW1CO2NBRC9CLFNBQVM7NkRBR1IsSUFBSTtrQkFESCxLQUFLO1lBR04sTUFBTTtrQkFETCxLQUFLO1lBR04sVUFBVTtrQkFEVCxLQUFLO1lBR04sS0FBSztrQkFESixLQUFLO1lBSUYsY0FBYztrQkFEakIsV0FBVzttQkFBQyx1QkFBdUI7WUFNaEMsY0FBYztrQkFEakIsV0FBVzttQkFBQyx1QkFBdUI7WUFNaEMsZ0JBQWdCO2tCQURuQixXQUFXO21CQUFDLHlCQUF5QjtZQU1sQyxlQUFlO2tCQURsQixXQUFXO21CQUFDLHdCQUF3QjtZQU1qQyxpQkFBaUI7a0JBRHBCLFdBQVc7bUJBQUMsMEJBQTBCO1lBTW5DLGVBQWU7a0JBRGxCLFdBQVc7bUJBQUMsd0JBQXdCO1lBTWpDLGtCQUFrQjtrQkFEckIsV0FBVzttQkFBQywyQkFBMkI7WUFNcEMsZUFBZTtrQkFEbEIsV0FBVzttQkFBQyxPQUFPO1lBVXBCLFFBQVE7a0JBSFAsV0FBVzttQkFBQyxxQkFBcUI7O2tCQUNqQyxLQUFLO1lBT04sS0FBSztrQkFISixXQUFXO21CQUFDLHdCQUF3Qjs7a0JBQ3BDLEtBQUs7WUFPTixLQUFLO2tCQUhKLFdBQVc7bUJBQUMsMkJBQTJCOztrQkFDdkMsS0FBSztZQU9OLFlBQVk7a0JBSFgsV0FBVzttQkFBQyxxQkFBcUI7O2tCQUNqQyxLQUFLO1lBT04sV0FBVztrQkFIVixXQUFXO21CQUFDLG9CQUFvQjs7a0JBQ2hDLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMnO1xuaW1wb3J0IHsgVHlwb2dyYXBoeUxlbmd0aCwgVHlwb2dyYXBoeVNpemUsIFR5cG9ncmFwaHlXZWlnaHQgfSBmcm9tICcuLi90ZXh0LnR5cGVzJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgTm92b0Jhc2VUZXh0RWxlbWVudCB7XG4gIEBJbnB1dCgpXG4gIHNpemU6IFR5cG9ncmFwaHlTaXplO1xuICBASW5wdXQoKVxuICB3ZWlnaHQ6IFR5cG9ncmFwaHlXZWlnaHQ7XG4gIEBJbnB1dCgpXG4gIGxpbmVMZW5ndGg6IFR5cG9ncmFwaHlMZW5ndGg7XG4gIEBJbnB1dCgpXG4gIGNvbG9yOiBzdHJpbmc7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LXNpemUtc21hbGwnKVxuICBnZXQgaGJfaXNTaXplU21hbGwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gJ3NtYWxsJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC1zaXplLWxhcmdlJylcbiAgZ2V0IGhiX2lzU2l6ZUxhcmdlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNpemUgPT09ICdsYXJnZSc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtc2l6ZS1kZWZhdWx0JylcbiAgZ2V0IGhiX2lzU2l6ZURlZmF1bHQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICFbJ3NtYWxsJywgJ2xhcmdlJ10uaW5jbHVkZXModGhpcy5zaXplKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC13ZWlnaHQtdGhpbicpXG4gIGdldCBoYl9pc1dlaWdodFRoaW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMud2VpZ2h0ID09PSAndGhpbic7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtd2VpZ2h0LW1lZGl1bScpXG4gIGdldCBoYl9pc1dlaWdodE1lZGl1bSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy53ZWlnaHQgPT09ICdtZWRpdW0nO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LXdlaWdodC1ib2xkJylcbiAgZ2V0IGhiX2lzV2VpZ2h0Qm9sZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy53ZWlnaHQgPT09ICdib2xkJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC13ZWlnaHQtZGVmYXVsdCcpXG4gIGdldCBoYl9pc1dlaWdodERlZmF1bHQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICFbJ3RoaW4nLCAnbWVkaXVtJywgJ2JvbGQnXS5pbmNsdWRlcyh0aGlzLndlaWdodCk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgZ2V0IGhiX2NsYXNzQmluZGluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBbdGhpcy5jb2xvciA/IGB0ZXh0LWNvbG9yLSR7dGhpcy5jb2xvcn1gIDogbnVsbCwgdGhpcy5saW5lTGVuZ3RoID8gYHRleHQtbGVuZ3RoLSR7dGhpcy5saW5lTGVuZ3RofWAgOiBudWxsXVxuICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgLmpvaW4oJyAnKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC1kaXNhYmxlZCcpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtY29sb3ItZW1wdHknKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgbXV0ZWQ6IGJvb2xlYW47XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LWNvbG9yLW5lZ2F0aXZlJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGVycm9yOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MubWFyZ2luLWJlZm9yZScpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBtYXJnaW5CZWZvcmU6IGJvb2xlYW47XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tYXJnaW4tYWZ0ZXInKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgbWFyZ2luQWZ0ZXI6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHt9XG5cbiAgZ2V0IG5hdGl2ZUVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICB9XG59XG4iXX0=