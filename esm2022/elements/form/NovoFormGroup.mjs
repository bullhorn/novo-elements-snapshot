// NG
import { EventEmitter } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
export class NovoFormGroup extends UntypedFormGroup {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm92b0Zvcm1Hcm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2Zvcm0vTm92b0Zvcm1Hcm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxLQUFLO0FBQ0wsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUtsRCxNQUFNLE9BQU8sYUFBYyxTQUFRLGdCQUFnQjtJQUFuRDs7UUFDUywyQkFBc0IsR0FBeUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQTRCM0YsQ0FBQztJQWpCUSxpQkFBaUI7UUFDdEIsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEMsSUFBSyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBcUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDcEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQXFCLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUM5QixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFTSxrQkFBa0I7UUFDdkIsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFxQixDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNyRCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBcUIsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUN4RCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQy9CLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkdcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVW50eXBlZEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIEFwcFxuaW1wb3J0IHsgSUZpZWxkSW50ZXJhY3Rpb25FdmVudCB9IGZyb20gJy4vRm9ybUludGVyZmFjZXMnO1xuaW1wb3J0IHsgTm92b0Zvcm1Db250cm9sIH0gZnJvbSAnLi9Ob3ZvRm9ybUNvbnRyb2wnO1xuXG5leHBvcnQgY2xhc3MgTm92b0Zvcm1Hcm91cCBleHRlbmRzIFVudHlwZWRGb3JtR3JvdXAge1xuICBwdWJsaWMgZmllbGRJbnRlcmFjdGlvbkV2ZW50czogRXZlbnRFbWl0dGVyPElGaWVsZEludGVyYWN0aW9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwdWJsaWMgbGF5b3V0OiBzdHJpbmc7XG4gIHB1YmxpYyBlZGl0OiBib29sZWFuO1xuICBwdWJsaWMgY3VycmVudEVudGl0eTogc3RyaW5nO1xuICBwdWJsaWMgY3VycmVudEVudGl0eUlkOiBzdHJpbmc7XG4gIHB1YmxpYyBhc3NvY2lhdGlvbnM6IG9iamVjdDtcbiAgcHVibGljIGZpZWxkc2V0czogYW55W107XG4gIHB1YmxpYyBfdmFsdWU6IGFueTtcbiAgcHVibGljIGNvbnRyb2xzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9O1xuICBwdWJsaWMgbm92b0NvbnRyb2xzOiBhbnlbXTtcblxuICBwdWJsaWMgZW5hYmxlQWxsQ29udHJvbHMoKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5jb250cm9scykge1xuICAgICAgaWYgKCh0aGlzLmNvbnRyb2xzW2tleV0gYXMgTm92b0Zvcm1Db250cm9sKS5yZWFkT25seSkge1xuICAgICAgICAodGhpcy5jb250cm9sc1trZXldIGFzIE5vdm9Gb3JtQ29udHJvbCkucmVhZE9ubHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb250cm9sc1trZXldLmVuYWJsZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkaXNhYmxlQWxsQ29udHJvbHMoKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5jb250cm9scykge1xuICAgICAgaWYgKCEodGhpcy5jb250cm9sc1trZXldIGFzIE5vdm9Gb3JtQ29udHJvbCkucmVhZE9ubHkpIHtcbiAgICAgICAgKHRoaXMuY29udHJvbHNba2V5XSBhcyBOb3ZvRm9ybUNvbnRyb2wpLnJlYWRPbmx5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sc1trZXldLmRpc2FibGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==