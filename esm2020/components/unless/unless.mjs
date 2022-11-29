// NG2
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Security } from 'novo-elements/services';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
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
Unless.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: Unless, deps: [{ token: i0.TemplateRef }, { token: i0.ViewContainerRef }, { token: i1.Security }], target: i0.ɵɵFactoryTarget.Directive });
Unless.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: Unless, selector: "[bhUnless]", inputs: { bhUnless: "bhUnless" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: Unless, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bhUnless]',
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }, { type: i0.ViewContainerRef }, { type: i1.Security }]; }, propDecorators: { bhUnless: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5sZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy91bmxlc3MvdW5sZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7QUFLbEQsTUFBTSxPQUFPLE1BQU07SUFJakIsWUFBbUIsV0FBNkIsRUFBUyxhQUErQixFQUFTLFFBQWtCO1FBQWhHLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVU7UUFIbkgsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFDekIsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFHM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsSUFDSSxRQUFRLENBQUMsS0FBYTtRQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLE9BQU8sR0FBWSxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ25DLE1BQU0sRUFBRSxHQUFRLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdDLEtBQUssTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNsQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFO29CQUMvQixPQUFPLEdBQUcsSUFBSSxDQUFDO2lCQUNoQjthQUNGO1NBQ0Y7YUFBTTtZQUNMLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDbEY7UUFFRCxJQUFJLE9BQU8sRUFBRTtZQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDekQ7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUM1QjtJQUNILENBQUM7O29HQXBDVSxNQUFNO3dGQUFOLE1BQU07NEZBQU4sTUFBTTtrQkFIbEIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtpQkFDdkI7d0pBVUssUUFBUTtzQkFEWCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VjdXJpdHkgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2JoVW5sZXNzXScsXG59KVxuZXhwb3J0IGNsYXNzIFVubGVzcyB7XG4gIHBlcm1pc3Npb25zOiBzdHJpbmcgPSAnJztcbiAgaXNEaXNwbGF5ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sIHB1YmxpYyB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLCBwdWJsaWMgc2VjdXJpdHk6IFNlY3VyaXR5KSB7XG4gICAgdGhpcy5zZWN1cml0eS5zdWJzY3JpYmUodGhpcy5jaGVjay5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBiaFVubGVzcyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5wZXJtaXNzaW9ucyA9IHZhbHVlIHx8ICcnO1xuICAgIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIGNoZWNrKCk6IHZvaWQge1xuICAgIGxldCBkaXNwbGF5OiBib29sZWFuID0gZmFsc2U7XG4gICAgaWYgKH50aGlzLnBlcm1pc3Npb25zLmluZGV4T2YoJ3x8JykpIHtcbiAgICAgIGNvbnN0IHBzOiBhbnkgPSB0aGlzLnBlcm1pc3Npb25zLnNwbGl0KCd8fCcpO1xuICAgICAgZm9yIChjb25zdCBwIG9mIHBzKSB7XG4gICAgICAgIGlmICh0aGlzLnNlY3VyaXR5LmhhcyhwLnRyaW0oKSkpIHtcbiAgICAgICAgICBkaXNwbGF5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkaXNwbGF5ID0gdGhpcy5wZXJtaXNzaW9ucy5zcGxpdCgnJiYnKS5ldmVyeSgocCkgPT4gdGhpcy5zZWN1cml0eS5oYXMocC50cmltKCkpKTtcbiAgICB9XG5cbiAgICBpZiAoZGlzcGxheSkge1xuICAgICAgaWYgKCF0aGlzLmlzRGlzcGxheWVkKSB7XG4gICAgICAgIHRoaXMuaXNEaXNwbGF5ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGVSZWYpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzRGlzcGxheWVkID0gZmFsc2U7XG4gICAgICB0aGlzLnZpZXdDb250YWluZXIuY2xlYXIoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==