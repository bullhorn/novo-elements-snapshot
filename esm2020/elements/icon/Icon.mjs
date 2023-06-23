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
import { BooleanInput } from 'novo-elements/utils';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSWNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2ljb24vSWNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQWlCLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNySSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7OztBQWVuRCxNQUFNLE9BQU8saUJBQWlCO0lBNEQ1QixZQUFtQixPQUFtQixFQUFVLEdBQXNCO1FBQW5ELFlBQU8sR0FBUCxPQUFPLENBQVk7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQWpEL0QsVUFBSyxHQUFXLEtBQUssQ0FBQztRQU10QixTQUFJLEdBQVcsS0FBSyxDQUFDO0lBMkM2QyxDQUFDO0lBekIxRSxJQUNJLEdBQUcsQ0FBQyxLQUFhO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJLEdBQUc7UUFDTCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQ0ksSUFBSSxDQUFDLFFBQWdCO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxRQUFRLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUNJLGVBQWU7UUFDakIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGNBQWMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakksQ0FBQztJQU1NLGVBQWU7UUFDcEIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDakQsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUMxRCxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRU0scUJBQXFCLENBQUMsTUFBc0I7UUFDakQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDMUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDOzsrR0ExRVUsaUJBQWlCO21HQUFqQixpQkFBaUIseWhCQVRsQjs7OztHQUlUO0FBaUNEO0lBREMsWUFBWSxFQUFFOztrREFDUztBQUt4QjtJQURDLFlBQVksRUFBRTs7aURBQ1E7NEZBakNaLGlCQUFpQjtrQkFaN0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztvQkFDckIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFFBQVEsRUFBRTs7OztHQUlUO29CQUNELElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsV0FBVztxQkFDbkI7aUJBQ0Y7aUlBSVEsTUFBTTtzQkFGWixXQUFXO3VCQUFDLHdCQUF3Qjs7c0JBQ3BDLEtBQUs7Z0JBS0MsS0FBSztzQkFGWCxXQUFXO3VCQUFDLFlBQVk7O3NCQUN4QixLQUFLO2dCQUtDLEtBQUs7c0JBRlgsV0FBVzt1QkFBQyxZQUFZOztzQkFDeEIsS0FBSztnQkFJQyxLQUFLO3NCQURYLEtBQUs7Z0JBSUMsSUFBSTtzQkFEVixXQUFXO3VCQUFDLFdBQVc7Z0JBSWpCLFNBQVM7c0JBRGYsV0FBVzt1QkFBQyxpQkFBaUI7Z0JBSXZCLElBQUk7c0JBRFYsS0FBSztnQkFNQyxPQUFPO3NCQUhiLFdBQVc7dUJBQUMseUJBQXlCOztzQkFDckMsS0FBSztnQkFPQyxNQUFNO3NCQUhaLFdBQVc7dUJBQUMsd0JBQXdCOztzQkFDcEMsS0FBSztnQkFLRixHQUFHO3NCQUROLEtBQUs7Z0JBVUYsSUFBSTtzQkFEUCxLQUFLO2dCQVVGLGVBQWU7c0JBRGxCLFdBQVc7dUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuaW1wb3J0IHsgVHlwb2dyYXBoeVNpemUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8taWNvbicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxpIFtjbGFzc109XCJpY29uTmFtZVwiXG4gICAgICA+PHNwYW4gKGNka09ic2VydmVDb250ZW50KT1cInByb2plY3RDb250ZW50Q2hhbmdlZCgkZXZlbnQpXCI+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50Pjwvc3BhblxuICAgID48L2k+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8taWNvbicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9JY29uQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBIb3N0QmluZGluZygnY2xhc3Mubm92by1pY29uLXJhaXNlZCcpXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyByYWlzZWQ6IGJvb2xlYW47XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnRoZW1lJylcbiAgQElucHV0KClcbiAgcHVibGljIHRoZW1lOiBzdHJpbmc7XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnNoYXBlJylcbiAgQElucHV0KClcbiAgcHVibGljIHNoYXBlOiBzdHJpbmcgPSAnYm94JztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgY29sb3I6IHN0cmluZztcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpXG4gIHB1YmxpYyByb2xlOiBzdHJpbmcgPSAnaW1nJztcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1sYWJlbCcpXG4gIHB1YmxpYyBhcmlhTGFiZWw6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2l6ZTogVHlwb2dyYXBoeVNpemU7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5pY29uLXNpemUtc21hbGxlcicpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBwdWJsaWMgc21hbGxlcjogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmljb24tc2l6ZS1sYXJnZXInKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgcHVibGljIGxhcmdlcjogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBzZXQgYWx0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLmFyaWFMYWJlbCA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IGFsdCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmFyaWFMYWJlbDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuYW1lKGljb25OYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLmljb25OYW1lID0gYGJoaS0ke2ljb25OYW1lfWA7XG4gIH1cblxuICBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmljb25OYW1lO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGdldCBoYl9jbGFzc0JpbmRpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gW3RoaXMuY29sb3IgPyBgdGV4dC1jb2xvci0ke3RoaXMuY29sb3J9YCA6IG51bGwsIHRoaXMuc2l6ZSA/IGB0ZXh0LXNpemUtJHt0aGlzLnNpemV9YCA6IG51bGxdLmZpbHRlcihCb29sZWFuKS5qb2luKCcgJyk7XG4gIH1cblxuICBwdWJsaWMgaWNvbk5hbWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnRleHRDb250ZW50LnRyaW0oKSkge1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMubmFtZSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnRleHRDb250ZW50LnRyaW0oKTtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcHJvamVjdENvbnRlbnRDaGFuZ2VkKHJlY29yZDogTXV0YXRpb25SZWNvcmQpIHtcbiAgICB0aGlzLm5hbWUgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC50ZXh0Q29udGVudC50cmltKCk7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG59XG4iXX0=