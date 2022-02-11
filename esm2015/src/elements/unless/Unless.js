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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVW5sZXNzLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL3VubGVzcy9Vbmxlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRixNQUFNO0FBQ04sT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBSzlELE1BQU0sT0FBTyxNQUFNO0lBSWpCLFlBQW1CLFdBQTZCLEVBQVMsYUFBK0IsRUFBUyxRQUFrQjtRQUFoRyxnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFBUyxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBSG5ILGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBRzNCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELElBQ0ksUUFBUSxDQUFDLEtBQWE7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxPQUFPLEdBQVksS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNuQyxNQUFNLEVBQUUsR0FBUSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QyxLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDbEIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRTtvQkFDL0IsT0FBTyxHQUFHLElBQUksQ0FBQztpQkFDaEI7YUFDRjtTQUNGO2FBQU07WUFDTCxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2xGO1FBRUQsSUFBSSxPQUFPLEVBQUU7WUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3pEO1NBQ0Y7YUFBTTtZQUNMLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDNUI7SUFDSCxDQUFDOzs7WUF2Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2FBQ3ZCOzs7WUFOMEIsV0FBVztZQUFFLGdCQUFnQjtZQUUvQyxRQUFROzs7dUJBYWQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEFwcFxuaW1wb3J0IHsgU2VjdXJpdHkgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL3NlY3VyaXR5L1NlY3VyaXR5JztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2JoVW5sZXNzXScsXG59KVxuZXhwb3J0IGNsYXNzIFVubGVzcyB7XG4gIHBlcm1pc3Npb25zOiBzdHJpbmcgPSAnJztcbiAgaXNEaXNwbGF5ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sIHB1YmxpYyB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLCBwdWJsaWMgc2VjdXJpdHk6IFNlY3VyaXR5KSB7XG4gICAgdGhpcy5zZWN1cml0eS5zdWJzY3JpYmUodGhpcy5jaGVjay5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBiaFVubGVzcyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5wZXJtaXNzaW9ucyA9IHZhbHVlIHx8ICcnO1xuICAgIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIGNoZWNrKCk6IHZvaWQge1xuICAgIGxldCBkaXNwbGF5OiBib29sZWFuID0gZmFsc2U7XG4gICAgaWYgKH50aGlzLnBlcm1pc3Npb25zLmluZGV4T2YoJ3x8JykpIHtcbiAgICAgIGNvbnN0IHBzOiBhbnkgPSB0aGlzLnBlcm1pc3Npb25zLnNwbGl0KCd8fCcpO1xuICAgICAgZm9yIChjb25zdCBwIG9mIHBzKSB7XG4gICAgICAgIGlmICh0aGlzLnNlY3VyaXR5LmhhcyhwLnRyaW0oKSkpIHtcbiAgICAgICAgICBkaXNwbGF5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkaXNwbGF5ID0gdGhpcy5wZXJtaXNzaW9ucy5zcGxpdCgnJiYnKS5ldmVyeSgocCkgPT4gdGhpcy5zZWN1cml0eS5oYXMocC50cmltKCkpKTtcbiAgICB9XG5cbiAgICBpZiAoZGlzcGxheSkge1xuICAgICAgaWYgKCF0aGlzLmlzRGlzcGxheWVkKSB7XG4gICAgICAgIHRoaXMuaXNEaXNwbGF5ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGVSZWYpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzRGlzcGxheWVkID0gZmFsc2U7XG4gICAgICB0aGlzLnZpZXdDb250YWluZXIuY2xlYXIoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==