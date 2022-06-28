import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Input } from '@angular/core';
import { BooleanInput } from '../../utils/decorators/BooleanInput';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/observers";
export class NovoIconComponent {
    constructor(element, cdr) {
        this.element = element;
        this.cdr = cdr;
        this.shape = 'box';
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
NovoIconComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoIconComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NovoIconComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoIconComponent, selector: "novo-icon", inputs: { raised: "raised", theme: "theme", shape: "shape", color: "color", size: "size", smaller: "smaller", larger: "larger", alt: "alt", name: "name" }, host: { properties: { "class.novo-icon-raised": "this.raised", "attr.theme": "this.theme", "attr.shape": "this.shape", "attr.role": "this.role", "attr.aria-label": "this.ariaLabel", "class.text-size-smaller": "this.smaller", "class.text-size-larger": "this.larger", "class": "this.hb_classBinding" }, classAttribute: "novo-icon" }, ngImport: i0, template: `
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoIconComponent, decorators: [{
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
            }], shape: [{
                type: HostBinding,
                args: ['attr.shape']
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSWNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2ljb24vSWNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFpQix1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckksT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFDQUFxQyxDQUFDOzs7QUFlbkUsTUFBTSxPQUFPLGlCQUFpQjtJQTRENUIsWUFBbUIsT0FBbUIsRUFBVSxHQUFzQjtRQUFuRCxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFqRC9ELFVBQUssR0FBVyxLQUFLLENBQUM7UUFNdEIsU0FBSSxHQUFXLEtBQUssQ0FBQztJQTJDNkMsQ0FBQztJQXpCMUUsSUFDSSxHQUFHLENBQUMsS0FBYTtRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUNJLElBQUksQ0FBQyxRQUFnQjtRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sUUFBUSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFDSSxlQUFlO1FBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxjQUFjLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGFBQWEsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pJLENBQUM7SUFNTSxlQUFlO1FBQ3BCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2pELE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUMxQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDMUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVNLHFCQUFxQixDQUFDLE1BQXNCO1FBQ2pELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzFELElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7K0dBMUVVLGlCQUFpQjttR0FBakIsaUJBQWlCLHloQkFUbEI7Ozs7R0FJVDtBQWlDRDtJQURDLFlBQVksRUFBRTs7a0RBQ1M7QUFLeEI7SUFEQyxZQUFZLEVBQUU7O2lEQUNROzRGQWpDWixpQkFBaUI7a0JBWjdCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxRQUFRLEVBQUU7Ozs7R0FJVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLFdBQVc7cUJBQ25CO2lCQUNGO2lJQUlRLE1BQU07c0JBRlosV0FBVzt1QkFBQyx3QkFBd0I7O3NCQUNwQyxLQUFLO2dCQUtDLEtBQUs7c0JBRlgsV0FBVzt1QkFBQyxZQUFZOztzQkFDeEIsS0FBSztnQkFLQyxLQUFLO3NCQUZYLFdBQVc7dUJBQUMsWUFBWTs7c0JBQ3hCLEtBQUs7Z0JBSUMsS0FBSztzQkFEWCxLQUFLO2dCQUlDLElBQUk7c0JBRFYsV0FBVzt1QkFBQyxXQUFXO2dCQUlqQixTQUFTO3NCQURmLFdBQVc7dUJBQUMsaUJBQWlCO2dCQUl2QixJQUFJO3NCQURWLEtBQUs7Z0JBTUMsT0FBTztzQkFIYixXQUFXO3VCQUFDLHlCQUF5Qjs7c0JBQ3JDLEtBQUs7Z0JBT0MsTUFBTTtzQkFIWixXQUFXO3VCQUFDLHdCQUF3Qjs7c0JBQ3BDLEtBQUs7Z0JBS0YsR0FBRztzQkFETixLQUFLO2dCQVVGLElBQUk7c0JBRFAsS0FBSztnQkFVRixlQUFlO3NCQURsQixXQUFXO3VCQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICcuLi8uLi91dGlscy9kZWNvcmF0b3JzL0Jvb2xlYW5JbnB1dCc7XG5pbXBvcnQgeyBUeXBvZ3JhcGh5U2l6ZSB9IGZyb20gJy4uL2NvbW1vbi90eXBvZ3JhcGh5JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1pY29uJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGkgW2NsYXNzXT1cImljb25OYW1lXCJcbiAgICAgID48c3BhbiAoY2RrT2JzZXJ2ZUNvbnRlbnQpPVwicHJvamVjdENvbnRlbnRDaGFuZ2VkKCRldmVudClcIj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9zcGFuXG4gICAgPjwvaT5cbiAgYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1pY29uJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0ljb25Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5ub3ZvLWljb24tcmFpc2VkJylcbiAgQElucHV0KClcbiAgcHVibGljIHJhaXNlZDogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIudGhlbWUnKVxuICBASW5wdXQoKVxuICBwdWJsaWMgdGhlbWU6IHN0cmluZztcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuc2hhcGUnKVxuICBASW5wdXQoKVxuICBwdWJsaWMgc2hhcGU6IHN0cmluZyA9ICdib3gnO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBjb2xvcjogc3RyaW5nO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcbiAgcHVibGljIHJvbGU6IHN0cmluZyA9ICdpbWcnO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWxhYmVsJylcbiAgcHVibGljIGFyaWFMYWJlbDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzaXplOiBUeXBvZ3JhcGh5U2l6ZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtc2l6ZS1zbWFsbGVyJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIHB1YmxpYyBzbWFsbGVyOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC1zaXplLWxhcmdlcicpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBwdWJsaWMgbGFyZ2VyOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBhbHQodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuYXJpYUxhYmVsID0gdmFsdWU7XG4gIH1cblxuICBnZXQgYWx0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYXJpYUxhYmVsO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG5hbWUoaWNvbk5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuaWNvbk5hbWUgPSBgYmhpLSR7aWNvbk5hbWV9YDtcbiAgfVxuXG4gIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaWNvbk5hbWU7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgZ2V0IGhiX2NsYXNzQmluZGluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBbdGhpcy5jb2xvciA/IGB0ZXh0LWNvbG9yLSR7dGhpcy5jb2xvcn1gIDogbnVsbCwgdGhpcy5zaXplID8gYHRleHQtc2l6ZS0ke3RoaXMuc2l6ZX1gIDogbnVsbF0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oJyAnKTtcbiAgfVxuXG4gIHB1YmxpYyBpY29uTmFtZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQudHJpbSgpKSB7XG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQudHJpbSgpO1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBwcm9qZWN0Q29udGVudENoYW5nZWQocmVjb3JkOiBNdXRhdGlvblJlY29yZCkge1xuICAgIHRoaXMubmFtZSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnRleHRDb250ZW50LnRyaW0oKTtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cbn1cbiJdfQ==