import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class GlobalRef {
}
export class BrowserGlobalRef extends GlobalRef {
    get nativeGlobal() {
        return window;
    }
}
BrowserGlobalRef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: BrowserGlobalRef, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
BrowserGlobalRef.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: BrowserGlobalRef });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: BrowserGlobalRef, decorators: [{
            type: Injectable
        }] });
export class NodeGlobalRef extends GlobalRef {
    get nativeGlobal() {
        throw new Error(`global doesn't compile for some reason`);
        // return global as Global;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9zZXJ2aWNlcy9nbG9iYWwvZ2xvYmFsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFJM0MsTUFBTSxPQUFnQixTQUFTO0NBRTlCO0FBR0QsTUFBTSxPQUFPLGdCQUFpQixTQUFRLFNBQVM7SUFDN0MsSUFBSSxZQUFZO1FBQ2QsT0FBTyxNQUFnQixDQUFDO0lBQzFCLENBQUM7OzhHQUhVLGdCQUFnQjtrSEFBaEIsZ0JBQWdCOzRGQUFoQixnQkFBZ0I7a0JBRDVCLFVBQVU7O0FBTVgsTUFBTSxPQUFPLGFBQWMsU0FBUSxTQUFTO0lBQzFDLElBQUksWUFBWTtRQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztRQUMxRCwyQkFBMkI7SUFDN0IsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdsb2JhbCB7fVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgR2xvYmFsUmVmIHtcbiAgYWJzdHJhY3QgZ2V0IG5hdGl2ZUdsb2JhbCgpOiBHbG9iYWw7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCcm93c2VyR2xvYmFsUmVmIGV4dGVuZHMgR2xvYmFsUmVmIHtcbiAgZ2V0IG5hdGl2ZUdsb2JhbCgpOiBHbG9iYWwge1xuICAgIHJldHVybiB3aW5kb3cgYXMgR2xvYmFsO1xuICB9XG59XG5leHBvcnQgY2xhc3MgTm9kZUdsb2JhbFJlZiBleHRlbmRzIEdsb2JhbFJlZiB7XG4gIGdldCBuYXRpdmVHbG9iYWwoKTogR2xvYmFsIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGdsb2JhbCBkb2Vzbid0IGNvbXBpbGUgZm9yIHNvbWUgcmVhc29uYCk7XG4gICAgLy8gcmV0dXJuIGdsb2JhbCBhcyBHbG9iYWw7XG4gIH1cbn1cbiJdfQ==