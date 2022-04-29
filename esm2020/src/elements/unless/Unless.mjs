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
Unless.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: Unless, deps: [{ token: i0.TemplateRef }, { token: i0.ViewContainerRef }, { token: i1.Security }], target: i0.ɵɵFactoryTarget.Directive });
Unless.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: Unless, selector: "[bhUnless]", inputs: { bhUnless: "bhUnless" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: Unless, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bhUnless]',
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }, { type: i0.ViewContainerRef }, { type: i1.Security }]; }, propDecorators: { bhUnless: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVW5sZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvdW5sZXNzL1VubGVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hGLE1BQU07QUFDTixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7OztBQUs5RCxNQUFNLE9BQU8sTUFBTTtJQUlqQixZQUFtQixXQUE2QixFQUFTLGFBQStCLEVBQVMsUUFBa0I7UUFBaEcsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO1FBQVMsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUhuSCxnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUczQixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxJQUNJLFFBQVEsQ0FBQyxLQUFhO1FBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsS0FBSztRQUNILElBQUksT0FBTyxHQUFZLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDbkMsTUFBTSxFQUFFLEdBQVEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0MsS0FBSyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ2xCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUU7b0JBQy9CLE9BQU8sR0FBRyxJQUFJLENBQUM7aUJBQ2hCO2FBQ0Y7U0FDRjthQUFNO1lBQ0wsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNsRjtRQUVELElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUN6RDtTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQzVCO0lBQ0gsQ0FBQzs7bUdBcENVLE1BQU07dUZBQU4sTUFBTTsyRkFBTixNQUFNO2tCQUhsQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO2lCQUN2Qjt3SkFVSyxRQUFRO3NCQURYLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBBcHBcbmltcG9ydCB7IFNlY3VyaXR5IH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9zZWN1cml0eS9TZWN1cml0eSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tiaFVubGVzc10nLFxufSlcbmV4cG9ydCBjbGFzcyBVbmxlc3Mge1xuICBwZXJtaXNzaW9uczogc3RyaW5nID0gJyc7XG4gIGlzRGlzcGxheWVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LCBwdWJsaWMgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZiwgcHVibGljIHNlY3VyaXR5OiBTZWN1cml0eSkge1xuICAgIHRoaXMuc2VjdXJpdHkuc3Vic2NyaWJlKHRoaXMuY2hlY2suYmluZCh0aGlzKSk7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgYmhVbmxlc3ModmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMucGVybWlzc2lvbnMgPSB2YWx1ZSB8fCAnJztcbiAgICB0aGlzLmNoZWNrKCk7XG4gIH1cblxuICBjaGVjaygpOiB2b2lkIHtcbiAgICBsZXQgZGlzcGxheTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlmICh+dGhpcy5wZXJtaXNzaW9ucy5pbmRleE9mKCd8fCcpKSB7XG4gICAgICBjb25zdCBwczogYW55ID0gdGhpcy5wZXJtaXNzaW9ucy5zcGxpdCgnfHwnKTtcbiAgICAgIGZvciAoY29uc3QgcCBvZiBwcykge1xuICAgICAgICBpZiAodGhpcy5zZWN1cml0eS5oYXMocC50cmltKCkpKSB7XG4gICAgICAgICAgZGlzcGxheSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGlzcGxheSA9IHRoaXMucGVybWlzc2lvbnMuc3BsaXQoJyYmJykuZXZlcnkoKHApID0+IHRoaXMuc2VjdXJpdHkuaGFzKHAudHJpbSgpKSk7XG4gICAgfVxuXG4gICAgaWYgKGRpc3BsYXkpIHtcbiAgICAgIGlmICghdGhpcy5pc0Rpc3BsYXllZCkge1xuICAgICAgICB0aGlzLmlzRGlzcGxheWVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLnRlbXBsYXRlUmVmKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc0Rpc3BsYXllZCA9IGZhbHNlO1xuICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgfVxuICB9XG59XG4iXX0=