// NG2
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
// App
import { Security } from './../../services/security/Security';
import * as i0 from "@angular/core";
import * as i1 from "./../../services/security/Security";
export class Unless {
    constructor(templateRef, viewContainer, security) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.security = security;
        this.permissions = '';
        this.isDisplayed = false;
        this.security.subscribe(this.check.bind(this));
    }
    set bhUnless(value) {
        this.permissions = value || '';
        this.check();
    }
    check() {
        let display = false;
        if (~this.permissions.indexOf('||')) {
            const ps = this.permissions.split('||');
            for (const p of ps) {
                if (this.security.has(p.trim())) {
                    display = true;
                }
            }
        }
        else {
            display = this.permissions.split('&&').every((p) => this.security.has(p.trim()));
        }
        if (display) {
            if (!this.isDisplayed) {
                this.isDisplayed = true;
                this.viewContainer.createEmbeddedView(this.templateRef);
            }
        }
        else {
            this.isDisplayed = false;
            this.viewContainer.clear();
        }
    }
}
Unless.ɵfac = function Unless_Factory(t) { return new (t || Unless)(i0.ɵɵdirectiveInject(i0.TemplateRef), i0.ɵɵdirectiveInject(i0.ViewContainerRef), i0.ɵɵdirectiveInject(i1.Security)); };
Unless.ɵdir = i0.ɵɵdefineDirective({ type: Unless, selectors: [["", "bhUnless", ""]], inputs: { bhUnless: "bhUnless" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(Unless, [{
        type: Directive,
        args: [{
                selector: '[bhUnless]',
            }]
    }], function () { return [{ type: i0.TemplateRef }, { type: i0.ViewContainerRef }, { type: i1.Security }]; }, { bhUnless: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVW5sZXNzLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3VubGVzcy9Vbmxlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRixNQUFNO0FBQ04sT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOzs7QUFLOUQsTUFBTSxPQUFPLE1BQU07SUFJakIsWUFBbUIsV0FBNkIsRUFBUyxhQUErQixFQUFTLFFBQWtCO1FBQWhHLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVU7UUFIbkgsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFDekIsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFHM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsSUFDSSxRQUFRLENBQUMsS0FBYTtRQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLE9BQU8sR0FBWSxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ25DLE1BQU0sRUFBRSxHQUFRLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdDLEtBQUssTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNsQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFO29CQUMvQixPQUFPLEdBQUcsSUFBSSxDQUFDO2lCQUNoQjthQUNGO1NBQ0Y7YUFBTTtZQUNMLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDbEY7UUFFRCxJQUFJLE9BQU8sRUFBRTtZQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDekQ7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUM1QjtJQUNILENBQUM7OzREQXBDVSxNQUFNOzJDQUFOLE1BQU07a0RBQU4sTUFBTTtjQUhsQixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7YUFDdkI7b0hBVUssUUFBUTtrQkFEWCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQXBwXG5pbXBvcnQgeyBTZWN1cml0eSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvc2VjdXJpdHkvU2VjdXJpdHknO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYmhVbmxlc3NdJyxcbn0pXG5leHBvcnQgY2xhc3MgVW5sZXNzIHtcbiAgcGVybWlzc2lvbnM6IHN0cmluZyA9ICcnO1xuICBpc0Rpc3BsYXllZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PiwgcHVibGljIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsIHB1YmxpYyBzZWN1cml0eTogU2VjdXJpdHkpIHtcbiAgICB0aGlzLnNlY3VyaXR5LnN1YnNjcmliZSh0aGlzLmNoZWNrLmJpbmQodGhpcykpO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGJoVW5sZXNzKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnBlcm1pc3Npb25zID0gdmFsdWUgfHwgJyc7XG4gICAgdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgY2hlY2soKTogdm9pZCB7XG4gICAgbGV0IGRpc3BsYXk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpZiAofnRoaXMucGVybWlzc2lvbnMuaW5kZXhPZignfHwnKSkge1xuICAgICAgY29uc3QgcHM6IGFueSA9IHRoaXMucGVybWlzc2lvbnMuc3BsaXQoJ3x8Jyk7XG4gICAgICBmb3IgKGNvbnN0IHAgb2YgcHMpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VjdXJpdHkuaGFzKHAudHJpbSgpKSkge1xuICAgICAgICAgIGRpc3BsYXkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpc3BsYXkgPSB0aGlzLnBlcm1pc3Npb25zLnNwbGl0KCcmJicpLmV2ZXJ5KChwKSA9PiB0aGlzLnNlY3VyaXR5LmhhcyhwLnRyaW0oKSkpO1xuICAgIH1cblxuICAgIGlmIChkaXNwbGF5KSB7XG4gICAgICBpZiAoIXRoaXMuaXNEaXNwbGF5ZWQpIHtcbiAgICAgICAgdGhpcy5pc0Rpc3BsYXllZCA9IHRydWU7XG4gICAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50ZW1wbGF0ZVJlZik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNEaXNwbGF5ZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jbGVhcigpO1xuICAgIH1cbiAgfVxufVxuIl19