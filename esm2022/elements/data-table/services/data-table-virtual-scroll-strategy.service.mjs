import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class NovoDataTableVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
    constructor() {
        super(33, 1000, 5000); // first property should be rowHeight
        this.rowHeight = 33;
    }
    attach(viewport) {
        this.onDataLengthChanged();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: NovoDataTableVirtualScrollStrategy, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: NovoDataTableVirtualScrollStrategy }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: NovoDataTableVirtualScrollStrategy, decorators: [{
            type: Injectable
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS12aXJ0dWFsLXNjcm9sbC1zdHJhdGVneS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZGF0YS10YWJsZS9zZXJ2aWNlcy9kYXRhLXRhYmxlLXZpcnR1YWwtc2Nyb2xsLXN0cmF0ZWd5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUE0Qiw4QkFBOEIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xHLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRzNDLE1BQU0sT0FBTyxrQ0FBbUMsU0FBUSw4QkFBOEI7SUFJcEY7UUFDRSxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLHFDQUFxQztRQUg5RCxjQUFTLEdBQUcsRUFBRSxDQUFDO0lBSWYsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFrQztRQUN2QyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUM3QixDQUFDOytHQVZVLGtDQUFrQzttSEFBbEMsa0NBQWtDOzs0RkFBbEMsa0NBQWtDO2tCQUQ5QyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0LCBGaXhlZFNpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRhVGFibGVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kgZXh0ZW5kcyBGaXhlZFNpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kge1xuXG4gIHJvd0hlaWdodCA9IDMzO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKDMzLCAxMDAwLCA1MDAwKTsgLy8gZmlyc3QgcHJvcGVydHkgc2hvdWxkIGJlIHJvd0hlaWdodFxuICB9XG5cbiAgYXR0YWNoKHZpZXdwb3J0OiBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQpOiB2b2lkIHtcbiAgICB0aGlzLm9uRGF0YUxlbmd0aENoYW5nZWQoKTtcbiAgfVxufSJdfQ==