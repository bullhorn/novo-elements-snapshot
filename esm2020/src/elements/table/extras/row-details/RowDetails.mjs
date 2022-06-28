// NG2
import { Component, ElementRef, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentUtils } from './../../../../utils/component-utils/ComponentUtils';
// APP
import { BaseRenderer } from './../base-renderer/BaseRenderer';
import * as i0 from "@angular/core";
import * as i1 from "./../../../../utils/component-utils/ComponentUtils";
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
                componentRef.instance.data = this.data;
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
RowDetails.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: RowDetails, deps: [{ token: i0.ElementRef }, { token: i1.ComponentUtils }], target: i0.ɵɵFactoryTarget.Component });
RowDetails.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: RowDetails, selector: "novo-row-details", inputs: { data: "data", renderer: "renderer" }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }], ngImport: i0, template: ` <span #container></span> <span>{{ value }}</span> `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: RowDetails, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-row-details',
                    template: ` <span #container></span> <span>{{ value }}</span> `,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.ComponentUtils }]; }, propDecorators: { container: [{
                type: ViewChild,
                args: ['container', { read: ViewContainerRef, static: true }]
            }], data: [{
                type: Input
            }], renderer: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm93RGV0YWlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3RhYmxlL2V4dHJhcy9yb3ctZGV0YWlscy9Sb3dEZXRhaWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFnQixVQUFVLEVBQUUsS0FBSyxFQUFVLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoSCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDcEYsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7O0FBTS9ELE1BQU0sT0FBTyxVQUFVO0lBV3JCLFlBQW9CLE9BQW1CLEVBQVUsY0FBOEI7UUFBM0QsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUYvRSxVQUFLLEdBQVEsRUFBRSxDQUFDO0lBRWtFLENBQUM7SUFFbkYsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxZQUFZLFlBQVksRUFBRTtnQkFDbkQsTUFBTSxZQUFZLEdBQTZCLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN6RyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ3hDO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdkM7U0FDRjthQUFNO1lBQ0wsMkNBQTJDO1NBQzVDO0lBQ0gsQ0FBQzs7d0dBeEJVLFVBQVU7NEZBQVYsVUFBVSwyTEFDVyxnQkFBZ0IsMkNBSHRDLHFEQUFxRDs0RkFFcEQsVUFBVTtrQkFKdEIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUUscURBQXFEO2lCQUNoRTs4SEFHQyxTQUFTO3NCQURSLFNBQVM7dUJBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBSWhFLElBQUk7c0JBREgsS0FBSztnQkFHTixRQUFRO3NCQURQLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCwgQ29tcG9uZW50UmVmLCBFbGVtZW50UmVmLCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBvbmVudFV0aWxzIH0gZnJvbSAnLi8uLi8uLi8uLi8uLi91dGlscy9jb21wb25lbnQtdXRpbHMvQ29tcG9uZW50VXRpbHMnO1xuLy8gQVBQXG5pbXBvcnQgeyBCYXNlUmVuZGVyZXIgfSBmcm9tICcuLy4uL2Jhc2UtcmVuZGVyZXIvQmFzZVJlbmRlcmVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1yb3ctZGV0YWlscycsXG4gIHRlbXBsYXRlOiBgIDxzcGFuICNjb250YWluZXI+PC9zcGFuPiA8c3Bhbj57eyB2YWx1ZSB9fTwvc3Bhbj4gYCxcbn0pXG5leHBvcnQgY2xhc3MgUm93RGV0YWlscyBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pXG4gIGNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcblxuICBASW5wdXQoKVxuICBkYXRhOiBhbnk7XG4gIEBJbnB1dCgpXG4gIHJlbmRlcmVyOiBhbnk7XG5cbiAgdmFsdWU6IGFueSA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjb21wb25lbnRVdGlsczogQ29tcG9uZW50VXRpbHMpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMucmVuZGVyZXIpIHtcbiAgICAgIGlmICh0aGlzLnJlbmRlcmVyLnByb3RvdHlwZSBpbnN0YW5jZW9mIEJhc2VSZW5kZXJlcikge1xuICAgICAgICBjb25zdCBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxSb3dEZXRhaWxzPiA9IHRoaXMuY29tcG9uZW50VXRpbHMuYXBwZW5kKHRoaXMucmVuZGVyZXIsIHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlLmRhdGEgPSB0aGlzLmRhdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5yZW5kZXJlcih0aGlzLmRhdGEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0aGlzLnZhbHVlID0gdGhpcy5yb3dbdGhpcy5jb2x1bW4ubmFtZV07XG4gICAgfVxuICB9XG59XG4iXX0=