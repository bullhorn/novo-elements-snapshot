var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
NovoIconComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoIconComponent, selector: "novo-icon", inputs: { raised: "raised", theme: "theme", shape: "shape", color: "color", size: "size", smaller: "smaller", larger: "larger", alt: "alt", name: "name" }, host: { properties: { "class.novo-icon-raised": "this.raised", "attr.theme": "this.theme", "attr.shape": "this.shape", "attr.role": "this.role", "attr.aria-label": "this.ariaLabel", "class.icon-size-smaller": "this.smaller", "class.icon-size-larger": "this.larger", "class": "this.hb_classBinding" }, classAttribute: "novo-icon" }, ngImport: i0, template: `
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
                args: ['class.icon-size-smaller']
            }, {
                type: Input
            }], larger: [{
                type: HostBinding,
                args: ['class.icon-size-larger']
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSWNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2ljb24vSWNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQWlCLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNySSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUNBQXFDLENBQUM7OztBQWVuRSxNQUFNLE9BQU8saUJBQWlCO0lBNEQ1QixZQUFtQixPQUFtQixFQUFVLEdBQXNCO1FBQW5ELFlBQU8sR0FBUCxPQUFPLENBQVk7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQWpEL0QsVUFBSyxHQUFXLEtBQUssQ0FBQztRQU10QixTQUFJLEdBQVcsS0FBSyxDQUFDO0lBMkM2QyxDQUFDO0lBekIxRSxJQUNJLEdBQUcsQ0FBQyxLQUFhO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJLEdBQUc7UUFDTCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQ0ksSUFBSSxDQUFDLFFBQWdCO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxRQUFRLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUNJLGVBQWU7UUFDakIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGNBQWMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakksQ0FBQztJQU1NLGVBQWU7UUFDcEIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDakQsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUMxRCxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRU0scUJBQXFCLENBQUMsTUFBc0I7UUFDakQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDMUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDOzsrR0ExRVUsaUJBQWlCO21HQUFqQixpQkFBaUIseWhCQVRsQjs7OztHQUlUO0FBaUNEO0lBREMsWUFBWSxFQUFFOztrREFDUztBQUt4QjtJQURDLFlBQVksRUFBRTs7aURBQ1E7NEZBakNaLGlCQUFpQjtrQkFaN0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztvQkFDckIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFFBQVEsRUFBRTs7OztHQUlUO29CQUNELElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsV0FBVztxQkFDbkI7aUJBQ0Y7aUlBSVEsTUFBTTtzQkFGWixXQUFXO3VCQUFDLHdCQUF3Qjs7c0JBQ3BDLEtBQUs7Z0JBS0MsS0FBSztzQkFGWCxXQUFXO3VCQUFDLFlBQVk7O3NCQUN4QixLQUFLO2dCQUtDLEtBQUs7c0JBRlgsV0FBVzt1QkFBQyxZQUFZOztzQkFDeEIsS0FBSztnQkFJQyxLQUFLO3NCQURYLEtBQUs7Z0JBSUMsSUFBSTtzQkFEVixXQUFXO3VCQUFDLFdBQVc7Z0JBSWpCLFNBQVM7c0JBRGYsV0FBVzt1QkFBQyxpQkFBaUI7Z0JBSXZCLElBQUk7c0JBRFYsS0FBSztnQkFNQyxPQUFPO3NCQUhiLFdBQVc7dUJBQUMseUJBQXlCOztzQkFDckMsS0FBSztnQkFPQyxNQUFNO3NCQUhaLFdBQVc7dUJBQUMsd0JBQXdCOztzQkFDcEMsS0FBSztnQkFLRixHQUFHO3NCQUROLEtBQUs7Z0JBVUYsSUFBSTtzQkFEUCxLQUFLO2dCQVVGLGVBQWU7c0JBRGxCLFdBQVc7dUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJy4uLy4uL3V0aWxzL2RlY29yYXRvcnMvQm9vbGVhbklucHV0JztcbmltcG9ydCB7IFR5cG9ncmFwaHlTaXplIH0gZnJvbSAnLi4vY29tbW9uL3R5cG9ncmFwaHknO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWljb24nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aSBbY2xhc3NdPVwiaWNvbk5hbWVcIlxuICAgICAgPjxzcGFuIChjZGtPYnNlcnZlQ29udGVudCk9XCJwcm9qZWN0Q29udGVudENoYW5nZWQoJGV2ZW50KVwiPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L3NwYW5cbiAgICA+PC9pPlxuICBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWljb24nLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvSWNvbkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm5vdm8taWNvbi1yYWlzZWQnKVxuICBASW5wdXQoKVxuICBwdWJsaWMgcmFpc2VkOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci50aGVtZScpXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB0aGVtZTogc3RyaW5nO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5zaGFwZScpXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzaGFwZTogc3RyaW5nID0gJ2JveCc7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGNvbG9yOiBzdHJpbmc7XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxuICBwdWJsaWMgcm9sZTogc3RyaW5nID0gJ2ltZyc7XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtbGFiZWwnKVxuICBwdWJsaWMgYXJpYUxhYmVsOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNpemU6IFR5cG9ncmFwaHlTaXplO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuaWNvbi1zaXplLXNtYWxsZXInKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgcHVibGljIHNtYWxsZXI6IGJvb2xlYW47XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5pY29uLXNpemUtbGFyZ2VyJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIHB1YmxpYyBsYXJnZXI6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgc2V0IGFsdCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5hcmlhTGFiZWwgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBhbHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5hcmlhTGFiZWw7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbmFtZShpY29uTmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5pY29uTmFtZSA9IGBiaGktJHtpY29uTmFtZX1gO1xuICB9XG5cbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pY29uTmFtZTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgaGJfY2xhc3NCaW5kaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFt0aGlzLmNvbG9yID8gYHRleHQtY29sb3ItJHt0aGlzLmNvbG9yfWAgOiBudWxsLCB0aGlzLnNpemUgPyBgdGV4dC1zaXplLSR7dGhpcy5zaXplfWAgOiBudWxsXS5maWx0ZXIoQm9vbGVhbikuam9pbignICcpO1xuICB9XG5cbiAgcHVibGljIGljb25OYW1lOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC50ZXh0Q29udGVudC50cmltKCkpIHtcbiAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC50ZXh0Q29udGVudC50cmltKCk7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHByb2plY3RDb250ZW50Q2hhbmdlZChyZWNvcmQ6IE11dGF0aW9uUmVjb3JkKSB7XG4gICAgdGhpcy5uYW1lID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQudHJpbSgpO1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxufVxuIl19