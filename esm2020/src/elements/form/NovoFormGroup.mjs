// NG
import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
export class NovoFormGroup extends FormGroup {
    constructor() {
        super(...arguments);
        this.fieldInteractionEvents = new EventEmitter();
    }
    enableAllControls() {
        for (const key in this.controls) {
            if (this.controls[key].readOnly) {
                this.controls[key].readOnly = false;
                this.controls[key].enable();
            }
        }
    }
    disableAllControls() {
        for (const key in this.controls) {
            if (!this.controls[key].readOnly) {
                this.controls[key].readOnly = true;
                this.controls[key].disable();
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm92b0Zvcm1Hcm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2Zvcm0vTm92b0Zvcm1Hcm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxLQUFLO0FBQ0wsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFLM0MsTUFBTSxPQUFPLGFBQWMsU0FBUSxTQUFTO0lBQTVDOztRQUNTLDJCQUFzQixHQUF5QyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBNEIzRixDQUFDO0lBakJRLGlCQUFpQjtRQUN0QixLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDL0IsSUFBSyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBcUIsQ0FBQyxRQUFRLEVBQUU7Z0JBQ25ELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFxQixDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQ3pELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDN0I7U0FDRjtJQUNILENBQUM7SUFFTSxrQkFBa0I7UUFDdkIsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQy9CLElBQUksQ0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBcUIsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3BELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFxQixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3hELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDOUI7U0FDRjtJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIEFwcFxuaW1wb3J0IHsgSUZpZWxkSW50ZXJhY3Rpb25FdmVudCB9IGZyb20gJy4vRm9ybUludGVyZmFjZXMnO1xuaW1wb3J0IHsgTm92b0Zvcm1Db250cm9sIH0gZnJvbSAnLi9Ob3ZvRm9ybUNvbnRyb2wnO1xuXG5leHBvcnQgY2xhc3MgTm92b0Zvcm1Hcm91cCBleHRlbmRzIEZvcm1Hcm91cCB7XG4gIHB1YmxpYyBmaWVsZEludGVyYWN0aW9uRXZlbnRzOiBFdmVudEVtaXR0ZXI8SUZpZWxkSW50ZXJhY3Rpb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHB1YmxpYyBsYXlvdXQ6IHN0cmluZztcbiAgcHVibGljIGVkaXQ6IGJvb2xlYW47XG4gIHB1YmxpYyBjdXJyZW50RW50aXR5OiBzdHJpbmc7XG4gIHB1YmxpYyBjdXJyZW50RW50aXR5SWQ6IHN0cmluZztcbiAgcHVibGljIGFzc29jaWF0aW9uczogb2JqZWN0O1xuICBwdWJsaWMgZmllbGRzZXRzOiBhbnlbXTtcbiAgcHVibGljIF92YWx1ZTogYW55O1xuICBwdWJsaWMgY29udHJvbHM6IHsgW2tleTogc3RyaW5nXTogYW55IH07XG4gIHB1YmxpYyBub3ZvQ29udHJvbHM6IGFueVtdO1xuXG4gIHB1YmxpYyBlbmFibGVBbGxDb250cm9scygpOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmNvbnRyb2xzKSB7XG4gICAgICBpZiAoKHRoaXMuY29udHJvbHNba2V5XSBhcyBOb3ZvRm9ybUNvbnRyb2wpLnJlYWRPbmx5KSB7XG4gICAgICAgICh0aGlzLmNvbnRyb2xzW2tleV0gYXMgTm92b0Zvcm1Db250cm9sKS5yZWFkT25seSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvbnRyb2xzW2tleV0uZW5hYmxlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRpc2FibGVBbGxDb250cm9scygpOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmNvbnRyb2xzKSB7XG4gICAgICBpZiAoISh0aGlzLmNvbnRyb2xzW2tleV0gYXMgTm92b0Zvcm1Db250cm9sKS5yZWFkT25seSkge1xuICAgICAgICAodGhpcy5jb250cm9sc1trZXldIGFzIE5vdm9Gb3JtQ29udHJvbCkucmVhZE9ubHkgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRyb2xzW2tleV0uZGlzYWJsZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19