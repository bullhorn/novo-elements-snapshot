// NG2
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
// App
import { Security } from './../../services/security/Security';
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
Unless.decorators = [
    { type: Directive, args: [{
                selector: '[bhUnless]',
            },] }
];
Unless.ctorParameters = () => [
    { type: TemplateRef },
    { type: ViewContainerRef },
    { type: Security }
];
Unless.propDecorators = {
    bhUnless: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVW5sZXNzLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy91bmxlc3MvVW5sZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsTUFBTTtBQUNOLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUs5RCxNQUFNLE9BQU8sTUFBTTtJQUlqQixZQUFtQixXQUE2QixFQUFTLGFBQStCLEVBQVMsUUFBa0I7UUFBaEcsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO1FBQVMsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUhuSCxnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUczQixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxJQUNJLFFBQVEsQ0FBQyxLQUFhO1FBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsS0FBSztRQUNILElBQUksT0FBTyxHQUFZLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDbkMsTUFBTSxFQUFFLEdBQVEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0MsS0FBSyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ2xCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUU7b0JBQy9CLE9BQU8sR0FBRyxJQUFJLENBQUM7aUJBQ2hCO2FBQ0Y7U0FDRjthQUFNO1lBQ0wsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNsRjtRQUVELElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUN6RDtTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQzVCO0lBQ0gsQ0FBQzs7O1lBdkNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsWUFBWTthQUN2Qjs7O1lBTjBCLFdBQVc7WUFBRSxnQkFBZ0I7WUFFL0MsUUFBUTs7O3VCQWFkLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcclxuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuLy8gQXBwXHJcbmltcG9ydCB7IFNlY3VyaXR5IH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9zZWN1cml0eS9TZWN1cml0eSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tiaFVubGVzc10nLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVW5sZXNzIHtcclxuICBwZXJtaXNzaW9uczogc3RyaW5nID0gJyc7XHJcbiAgaXNEaXNwbGF5ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LCBwdWJsaWMgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZiwgcHVibGljIHNlY3VyaXR5OiBTZWN1cml0eSkge1xyXG4gICAgdGhpcy5zZWN1cml0eS5zdWJzY3JpYmUodGhpcy5jaGVjay5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGJoVW5sZXNzKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMucGVybWlzc2lvbnMgPSB2YWx1ZSB8fCAnJztcclxuICAgIHRoaXMuY2hlY2soKTtcclxuICB9XHJcblxyXG4gIGNoZWNrKCk6IHZvaWQge1xyXG4gICAgbGV0IGRpc3BsYXk6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGlmICh+dGhpcy5wZXJtaXNzaW9ucy5pbmRleE9mKCd8fCcpKSB7XHJcbiAgICAgIGNvbnN0IHBzOiBhbnkgPSB0aGlzLnBlcm1pc3Npb25zLnNwbGl0KCd8fCcpO1xyXG4gICAgICBmb3IgKGNvbnN0IHAgb2YgcHMpIHtcclxuICAgICAgICBpZiAodGhpcy5zZWN1cml0eS5oYXMocC50cmltKCkpKSB7XHJcbiAgICAgICAgICBkaXNwbGF5ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRpc3BsYXkgPSB0aGlzLnBlcm1pc3Npb25zLnNwbGl0KCcmJicpLmV2ZXJ5KChwKSA9PiB0aGlzLnNlY3VyaXR5LmhhcyhwLnRyaW0oKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkaXNwbGF5KSB7XHJcbiAgICAgIGlmICghdGhpcy5pc0Rpc3BsYXllZCkge1xyXG4gICAgICAgIHRoaXMuaXNEaXNwbGF5ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50ZW1wbGF0ZVJlZik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXNEaXNwbGF5ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNsZWFyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==