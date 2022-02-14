import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/observers";
const _c0 = ["*"];
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
NovoIconComponent.ɵfac = function NovoIconComponent_Factory(t) { return new (t || NovoIconComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
NovoIconComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NovoIconComponent, selectors: [["novo-icon"]], hostVars: 6, hostBindings: function NovoIconComponent_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵattribute("raised", ctx.raised)("size", ctx.size)("theme", ctx.theme)("color", ctx.color)("role", ctx.role)("aria-label", ctx.ariaLabel);
    } }, inputs: { raised: "raised", size: "size", theme: "theme", color: "color", alt: "alt", name: "name" }, ngContentSelectors: _c0, decls: 3, vars: 2, consts: [[3, "cdkObserveContent"]], template: function NovoIconComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵelementStart(0, "i");
        i0.ɵɵelementStart(1, "span", 0);
        i0.ɵɵlistener("cdkObserveContent", function NovoIconComponent_Template_span_cdkObserveContent_1_listener($event) { return ctx.projectContentChanged($event); });
        i0.ɵɵprojection(2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵclassMap(ctx.iconName);
    } }, directives: [i1.CdkObserveContent], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoIconComponent, [{
        type: Component,
        args: [{
                selector: 'novo-icon',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <i [class]="iconName"
      ><span (cdkObserveContent)="projectContentChanged($event)"><ng-content></ng-content></span
    ></i>
  `,
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, { raised: [{
            type: HostBinding,
            args: ['attr.raised']
        }, {
            type: Input
        }], size: [{
            type: HostBinding,
            args: ['attr.size']
        }, {
            type: Input
        }], theme: [{
            type: HostBinding,
            args: ['attr.theme']
        }, {
            type: Input
        }], color: [{
            type: HostBinding,
            args: ['attr.color']
        }, {
            type: Input
        }], role: [{
            type: HostBinding,
            args: ['attr.role']
        }], ariaLabel: [{
            type: HostBinding,
            args: ['attr.aria-label']
        }], alt: [{
            type: Input
        }], name: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSWNvbi5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9pY29uL0ljb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQix1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFXckksTUFBTSxPQUFPLGlCQUFpQjtJQXNDNUIsWUFBbUIsT0FBbUIsRUFBVSxHQUFzQjtRQUFuRCxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUF4Qi9ELFNBQUksR0FBVyxLQUFLLENBQUM7SUF3QjZDLENBQUM7SUFwQjFFLElBQ0ksR0FBRyxDQUFDLEtBQWE7UUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksR0FBRztRQUNMLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFDSSxJQUFJLENBQUMsUUFBZ0I7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLFFBQVEsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQU1NLGVBQWU7UUFDcEIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDakQsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUMxRCxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRU0scUJBQXFCLENBQUMsTUFBc0I7UUFDakQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDMUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDOztrRkFwRFUsaUJBQWlCO3NEQUFqQixpQkFBaUI7Ozs7UUFMMUIseUJBQ0c7UUFBQSwrQkFBMEQ7UUFBcEQsMEhBQXFCLGlDQUE2QixJQUFDO1FBQUMsa0JBQVk7UUFBYSxpQkFDckY7UUFBQSxpQkFBSTs7UUFGRiwyQkFBa0I7O2tEQUtaLGlCQUFpQjtjQVQ3QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxRQUFRLEVBQUU7Ozs7R0FJVDthQUNGOzZGQUlRLE1BQU07a0JBRlosV0FBVzttQkFBQyxhQUFhOztrQkFDekIsS0FBSztZQUlDLElBQUk7a0JBRlYsV0FBVzttQkFBQyxXQUFXOztrQkFDdkIsS0FBSztZQUlDLEtBQUs7a0JBRlgsV0FBVzttQkFBQyxZQUFZOztrQkFDeEIsS0FBSztZQUlDLEtBQUs7a0JBRlgsV0FBVzttQkFBQyxZQUFZOztrQkFDeEIsS0FBSztZQUdDLElBQUk7a0JBRFYsV0FBVzttQkFBQyxXQUFXO1lBR2pCLFNBQVM7a0JBRGYsV0FBVzttQkFBQyxpQkFBaUI7WUFJMUIsR0FBRztrQkFETixLQUFLO1lBVUYsSUFBSTtrQkFEUCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWljb24nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aSBbY2xhc3NdPVwiaWNvbk5hbWVcIlxuICAgICAgPjxzcGFuIChjZGtPYnNlcnZlQ29udGVudCk9XCJwcm9qZWN0Q29udGVudENoYW5nZWQoJGV2ZW50KVwiPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L3NwYW5cbiAgICA+PC9pPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvSWNvbkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBASG9zdEJpbmRpbmcoJ2F0dHIucmFpc2VkJylcbiAgQElucHV0KClcbiAgcHVibGljIHJhaXNlZDogYm9vbGVhbjtcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnNpemUnKVxuICBASW5wdXQoKVxuICBwdWJsaWMgc2l6ZTogc3RyaW5nO1xuICBASG9zdEJpbmRpbmcoJ2F0dHIudGhlbWUnKVxuICBASW5wdXQoKVxuICBwdWJsaWMgdGhlbWU6IHN0cmluZztcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmNvbG9yJylcbiAgQElucHV0KClcbiAgcHVibGljIGNvbG9yOiBzdHJpbmc7XG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcbiAgcHVibGljIHJvbGU6IHN0cmluZyA9ICdpbWcnO1xuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1sYWJlbCcpXG4gIHB1YmxpYyBhcmlhTGFiZWw6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBzZXQgYWx0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLmFyaWFMYWJlbCA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IGFsdCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmFyaWFMYWJlbDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuYW1lKGljb25OYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLmljb25OYW1lID0gYGJoaS0ke2ljb25OYW1lfWA7XG4gIH1cblxuICBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmljb25OYW1lO1xuICB9XG5cbiAgcHVibGljIGljb25OYW1lOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC50ZXh0Q29udGVudC50cmltKCkpIHtcbiAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC50ZXh0Q29udGVudC50cmltKCk7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHByb2plY3RDb250ZW50Q2hhbmdlZChyZWNvcmQ6IE11dGF0aW9uUmVjb3JkKSB7XG4gICAgdGhpcy5uYW1lID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQudHJpbSgpO1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxufVxuIl19