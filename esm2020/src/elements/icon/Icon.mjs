import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Input } from '@angular/core';
import { BooleanInput } from '../../utils/decorators/BooleanInput';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/observers";
export class NovoIconComponent {
    constructor(element, cdr) {
        this.element = element;
        this.cdr = cdr;
        this.role = 'img';
    }
    set alt(value) {
        this.ariaLabel = value;
    }
    get alt() {
        return this.ariaLabel;
    }
    set name(iconName) {
        this.iconName = `bhi-${iconName}`;
    }
    get name() {
        return this.iconName;
    }
    get hb_classBinding() {
        return [this.color ? `text-color-${this.color}` : null, this.size ? `text-size-${this.size}` : null].filter(Boolean).join(' ');
    }
    ngAfterViewInit() {
        if (this.element.nativeElement.textContent.trim()) {
            Promise.resolve().then(() => {
                this.name = this.element.nativeElement.textContent.trim();
                this.cdr.markForCheck();
            });
        }
    }
    projectContentChanged(record) {
        this.name = this.element.nativeElement.textContent.trim();
        this.cdr.detectChanges();
    }
}
NovoIconComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoIconComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NovoIconComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoIconComponent, selector: "novo-icon", inputs: { raised: "raised", theme: "theme", color: "color", size: "size", smaller: "smaller", larger: "larger", alt: "alt", name: "name" }, host: { properties: { "class.novo-icon-raised": "this.raised", "attr.theme": "this.theme", "attr.role": "this.role", "attr.aria-label": "this.ariaLabel", "class.text-size-smaller": "this.smaller", "class.text-size-larger": "this.larger", "class": "this.hb_classBinding" }, classAttribute: "novo-icon" }, ngImport: i0, template: `
    <i [class]="iconName"
      ><span (cdkObserveContent)="projectContentChanged($event)"><ng-content></ng-content></span
    ></i>
  `, isInline: true, directives: [{ type: i1.CdkObserveContent, selector: "[cdkObserveContent]", inputs: ["cdkObserveContentDisabled", "debounce"], outputs: ["cdkObserveContent"], exportAs: ["cdkObserveContent"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoIconComponent.prototype, "smaller", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoIconComponent.prototype, "larger", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoIconComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-icon',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <i [class]="iconName"
      ><span (cdkObserveContent)="projectContentChanged($event)"><ng-content></ng-content></span
    ></i>
  `,
                    host: {
                        class: 'novo-icon',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { raised: [{
                type: HostBinding,
                args: ['class.novo-icon-raised']
            }, {
                type: Input
            }], theme: [{
                type: HostBinding,
                args: ['attr.theme']
            }, {
                type: Input
            }], color: [{
                type: Input
            }], role: [{
                type: HostBinding,
                args: ['attr.role']
            }], ariaLabel: [{
                type: HostBinding,
                args: ['attr.aria-label']
            }], size: [{
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
            }], alt: [{
                type: Input
            }], name: [{
                type: Input
            }], hb_classBinding: [{
                type: HostBinding,
                args: ['class']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSWNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2ljb24vSWNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFpQix1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckksT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFDQUFxQyxDQUFDOzs7QUFlbkUsTUFBTSxPQUFPLGlCQUFpQjtJQXFENUIsWUFBbUIsT0FBbUIsRUFBVSxHQUFzQjtRQUFuRCxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUExQy9ELFNBQUksR0FBVyxLQUFLLENBQUM7SUEwQzZDLENBQUM7SUF6QjFFLElBQ0ksR0FBRyxDQUFDLEtBQWE7UUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksR0FBRztRQUNMLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFDSSxJQUFJLENBQUMsUUFBZ0I7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLFFBQVEsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQ0ksZUFBZTtRQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsY0FBYyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqSSxDQUFDO0lBTU0sZUFBZTtRQUNwQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNqRCxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzFELElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFTSxxQkFBcUIsQ0FBQyxNQUFzQjtRQUNqRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMxRCxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUM7OzhHQW5FVSxpQkFBaUI7a0dBQWpCLGlCQUFpQiw2ZUFUbEI7Ozs7R0FJVDtBQTBCRDtJQURDLFlBQVksRUFBRTs7a0RBQ1M7QUFLeEI7SUFEQyxZQUFZLEVBQUU7O2lEQUNROzJGQTFCWixpQkFBaUI7a0JBWjdCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxRQUFRLEVBQUU7Ozs7R0FJVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLFdBQVc7cUJBQ25CO2lCQUNGO2lJQUlRLE1BQU07c0JBRlosV0FBVzt1QkFBQyx3QkFBd0I7O3NCQUNwQyxLQUFLO2dCQUtDLEtBQUs7c0JBRlgsV0FBVzt1QkFBQyxZQUFZOztzQkFDeEIsS0FBSztnQkFHQyxLQUFLO3NCQURYLEtBQUs7Z0JBR0MsSUFBSTtzQkFEVixXQUFXO3VCQUFDLFdBQVc7Z0JBR2pCLFNBQVM7c0JBRGYsV0FBVzt1QkFBQyxpQkFBaUI7Z0JBSXZCLElBQUk7c0JBRFYsS0FBSztnQkFNQyxPQUFPO3NCQUhiLFdBQVc7dUJBQUMseUJBQXlCOztzQkFDckMsS0FBSztnQkFPQyxNQUFNO3NCQUhaLFdBQVc7dUJBQUMsd0JBQXdCOztzQkFDcEMsS0FBSztnQkFLRixHQUFHO3NCQUROLEtBQUs7Z0JBVUYsSUFBSTtzQkFEUCxLQUFLO2dCQVVGLGVBQWU7c0JBRGxCLFdBQVc7dUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJy4uLy4uL3V0aWxzL2RlY29yYXRvcnMvQm9vbGVhbklucHV0JztcbmltcG9ydCB7IFR5cG9ncmFwaHlTaXplIH0gZnJvbSAnLi4vY29tbW9uL3R5cG9ncmFwaHknO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWljb24nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aSBbY2xhc3NdPVwiaWNvbk5hbWVcIlxuICAgICAgPjxzcGFuIChjZGtPYnNlcnZlQ29udGVudCk9XCJwcm9qZWN0Q29udGVudENoYW5nZWQoJGV2ZW50KVwiPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L3NwYW5cbiAgICA+PC9pPlxuICBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWljb24nLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvSWNvbkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm5vdm8taWNvbi1yYWlzZWQnKVxuICBASW5wdXQoKVxuICBwdWJsaWMgcmFpc2VkOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci50aGVtZScpXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB0aGVtZTogc3RyaW5nO1xuICBASW5wdXQoKVxuICBwdWJsaWMgY29sb3I6IHN0cmluZztcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxuICBwdWJsaWMgcm9sZTogc3RyaW5nID0gJ2ltZyc7XG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWxhYmVsJylcbiAgcHVibGljIGFyaWFMYWJlbDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzaXplOiBUeXBvZ3JhcGh5U2l6ZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtc2l6ZS1zbWFsbGVyJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIHB1YmxpYyBzbWFsbGVyOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC1zaXplLWxhcmdlcicpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBwdWJsaWMgbGFyZ2VyOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBhbHQodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuYXJpYUxhYmVsID0gdmFsdWU7XG4gIH1cblxuICBnZXQgYWx0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYXJpYUxhYmVsO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG5hbWUoaWNvbk5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuaWNvbk5hbWUgPSBgYmhpLSR7aWNvbk5hbWV9YDtcbiAgfVxuXG4gIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaWNvbk5hbWU7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgZ2V0IGhiX2NsYXNzQmluZGluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBbdGhpcy5jb2xvciA/IGB0ZXh0LWNvbG9yLSR7dGhpcy5jb2xvcn1gIDogbnVsbCwgdGhpcy5zaXplID8gYHRleHQtc2l6ZS0ke3RoaXMuc2l6ZX1gIDogbnVsbF0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oJyAnKTtcbiAgfVxuXG4gIHB1YmxpYyBpY29uTmFtZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQudHJpbSgpKSB7XG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQudHJpbSgpO1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBwcm9qZWN0Q29udGVudENoYW5nZWQocmVjb3JkOiBNdXRhdGlvblJlY29yZCkge1xuICAgIHRoaXMubmFtZSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnRleHRDb250ZW50LnRyaW0oKTtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cbn1cbiJdfQ==