// NG2
import { Component, ElementRef, ViewContainerRef, ViewChild, Input } from '@angular/core';
// APP
import { BaseRenderer } from './../base-renderer/BaseRenderer';
import { ComponentUtils } from './../../../../utils/component-utils/ComponentUtils';
export class RowDetails {
    constructor(element, componentUtils) {
        this.element = element;
        this.componentUtils = componentUtils;
        this.value = '';
    }
    ngOnInit() {
        if (this.renderer) {
            if (this.renderer.prototype instanceof BaseRenderer) {
                const componentRef = this.componentUtils.append(this.renderer, this.container);
                componentRef.instance['data'] = this.data;
            }
            else {
                this.value = this.renderer(this.data);
            }
        }
        else {
            // this.value = this.row[this.column.name];
        }
    }
}
RowDetails.decorators = [
    { type: Component, args: [{
                selector: 'novo-row-details',
                template: `
    <span #container></span> <span>{{ value }}</span>
  `
            },] }
];
RowDetails.ctorParameters = () => [
    { type: ElementRef },
    { type: ComponentUtils }
];
RowDetails.propDecorators = {
    container: [{ type: ViewChild, args: ['container', { read: ViewContainerRef, static: true },] }],
    data: [{ type: Input }],
    renderer: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm93RGV0YWlscy5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvdGFibGUvZXh0cmFzL3Jvdy1kZXRhaWxzL1Jvd0RldGFpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEcsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFRcEYsTUFBTSxPQUFPLFVBQVU7SUFXckIsWUFBb0IsT0FBbUIsRUFBVSxjQUE4QjtRQUEzRCxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBRi9FLFVBQUssR0FBUSxFQUFFLENBQUM7SUFFa0UsQ0FBQztJQUVuRixRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLFlBQVksWUFBWSxFQUFFO2dCQUNuRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDL0UsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQzNDO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdkM7U0FDRjthQUFNO1lBQ0wsMkNBQTJDO1NBQzVDO0lBQ0gsQ0FBQzs7O1lBOUJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixRQUFRLEVBQUU7O0dBRVQ7YUFDRjs7O1lBVm1CLFVBQVU7WUFHckIsY0FBYzs7O3dCQVNwQixTQUFTLFNBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7bUJBRy9ELEtBQUs7dUJBRUwsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIFZpZXdDb250YWluZXJSZWYsIFZpZXdDaGlsZCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4vLyBBUFBcclxuaW1wb3J0IHsgQmFzZVJlbmRlcmVyIH0gZnJvbSAnLi8uLi9iYXNlLXJlbmRlcmVyL0Jhc2VSZW5kZXJlcic7XHJcbmltcG9ydCB7IENvbXBvbmVudFV0aWxzIH0gZnJvbSAnLi8uLi8uLi8uLi8uLi91dGlscy9jb21wb25lbnQtdXRpbHMvQ29tcG9uZW50VXRpbHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLXJvdy1kZXRhaWxzJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHNwYW4gI2NvbnRhaW5lcj48L3NwYW4+IDxzcGFuPnt7IHZhbHVlIH19PC9zcGFuPlxyXG4gIGAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSb3dEZXRhaWxzIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBAVmlld0NoaWxkKCdjb250YWluZXInLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KVxyXG4gIGNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcclxuXHJcbiAgQElucHV0KClcclxuICBkYXRhOiBhbnk7XHJcbiAgQElucHV0KClcclxuICByZW5kZXJlcjogYW55O1xyXG5cclxuICB2YWx1ZTogYW55ID0gJyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjb21wb25lbnRVdGlsczogQ29tcG9uZW50VXRpbHMpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKHRoaXMucmVuZGVyZXIpIHtcclxuICAgICAgaWYgKHRoaXMucmVuZGVyZXIucHJvdG90eXBlIGluc3RhbmNlb2YgQmFzZVJlbmRlcmVyKSB7XHJcbiAgICAgICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5jb21wb25lbnRVdGlscy5hcHBlbmQodGhpcy5yZW5kZXJlciwgdGhpcy5jb250YWluZXIpO1xyXG4gICAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnZGF0YSddID0gdGhpcy5kYXRhO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnJlbmRlcmVyKHRoaXMuZGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIHRoaXMudmFsdWUgPSB0aGlzLnJvd1t0aGlzLmNvbHVtbi5uYW1lXTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19