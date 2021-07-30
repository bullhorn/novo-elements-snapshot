// NG
import { FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
export class NovoFormGroup extends FormGroup {
    constructor() {
        super(...arguments);
        this.fieldInteractionEvents = new EventEmitter();
    }
    get value() {
        return this.getRawValue();
    }
    set value(v) {
        this._value = v;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm92b0Zvcm1Hcm91cC5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZm9ybS9Ob3ZvRm9ybUdyb3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEtBQUs7QUFDTCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUs3QyxNQUFNLE9BQU8sYUFBYyxTQUFRLFNBQVM7SUFBNUM7O1FBQ1MsMkJBQXNCLEdBQXlDLElBQUksWUFBWSxFQUFFLENBQUM7SUFrQzNGLENBQUM7SUF6QkMsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQUksS0FBSyxDQUFDLENBQU07UUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBRU0saUJBQWlCO1FBQ3RCLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUMvQixJQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFxQixDQUFDLFFBQVEsRUFBRTtnQkFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQXFCLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUM3QjtTQUNGO0lBQ0gsQ0FBQztJQUVNLGtCQUFrQjtRQUN2QixLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDL0IsSUFBSSxDQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFxQixDQUFDLFFBQVEsRUFBRTtnQkFDcEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQXFCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDeEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUM5QjtTQUNGO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkdcclxuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuLy8gQXBwXHJcbmltcG9ydCB7IElGaWVsZEludGVyYWN0aW9uRXZlbnQgfSBmcm9tICcuL0Zvcm1JbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgTm92b0Zvcm1Db250cm9sIH0gZnJvbSAnLi9Ob3ZvRm9ybUNvbnRyb2wnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5vdm9Gb3JtR3JvdXAgZXh0ZW5kcyBGb3JtR3JvdXAge1xyXG4gIHB1YmxpYyBmaWVsZEludGVyYWN0aW9uRXZlbnRzOiBFdmVudEVtaXR0ZXI8SUZpZWxkSW50ZXJhY3Rpb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgcHVibGljIGxheW91dDogc3RyaW5nO1xyXG4gIHB1YmxpYyBlZGl0OiBib29sZWFuO1xyXG4gIHB1YmxpYyBjdXJyZW50RW50aXR5OiBzdHJpbmc7XHJcbiAgcHVibGljIGN1cnJlbnRFbnRpdHlJZDogc3RyaW5nO1xyXG4gIHB1YmxpYyBhc3NvY2lhdGlvbnM6IG9iamVjdDtcclxuICBwdWJsaWMgZmllbGRzZXRzOiBhbnlbXTtcclxuICBwdWJsaWMgX3ZhbHVlOiBhbnk7XHJcblxyXG4gIGdldCB2YWx1ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmdldFJhd1ZhbHVlKCk7XHJcbiAgfVxyXG5cclxuICBzZXQgdmFsdWUodjogYW55KSB7XHJcbiAgICB0aGlzLl92YWx1ZSA9IHY7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZW5hYmxlQWxsQ29udHJvbHMoKTogdm9pZCB7XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmNvbnRyb2xzKSB7XHJcbiAgICAgIGlmICgodGhpcy5jb250cm9sc1trZXldIGFzIE5vdm9Gb3JtQ29udHJvbCkucmVhZE9ubHkpIHtcclxuICAgICAgICAodGhpcy5jb250cm9sc1trZXldIGFzIE5vdm9Gb3JtQ29udHJvbCkucmVhZE9ubHkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xzW2tleV0uZW5hYmxlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBkaXNhYmxlQWxsQ29udHJvbHMoKTogdm9pZCB7XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmNvbnRyb2xzKSB7XHJcbiAgICAgIGlmICghKHRoaXMuY29udHJvbHNba2V5XSBhcyBOb3ZvRm9ybUNvbnRyb2wpLnJlYWRPbmx5KSB7XHJcbiAgICAgICAgKHRoaXMuY29udHJvbHNba2V5XSBhcyBOb3ZvRm9ybUNvbnRyb2wpLnJlYWRPbmx5ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xzW2tleV0uZGlzYWJsZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==