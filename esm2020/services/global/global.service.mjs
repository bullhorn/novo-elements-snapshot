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
BrowserGlobalRef.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: BrowserGlobalRef, providedIn: `root` });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: BrowserGlobalRef, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: `root`,
                }]
        }] });
export class NodeGlobalRef extends GlobalRef {
    get nativeGlobal() {
        throw new Error(`global doesn't compile for some reason`);
        // return global as Global;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9zZXJ2aWNlcy9nbG9iYWwvZ2xvYmFsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFJM0MsTUFBTSxPQUFnQixTQUFTO0NBRTlCO0FBS0QsTUFBTSxPQUFPLGdCQUFpQixTQUFRLFNBQVM7SUFDN0MsSUFBSSxZQUFZO1FBQ2QsT0FBTyxNQUFnQixDQUFDO0lBQzFCLENBQUM7OzhHQUhVLGdCQUFnQjtrSEFBaEIsZ0JBQWdCLGNBRmYsTUFBTTs0RkFFUCxnQkFBZ0I7a0JBSDVCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COztBQU1ELE1BQU0sT0FBTyxhQUFjLFNBQVEsU0FBUztJQUMxQyxJQUFJLFlBQVk7UUFDZCxNQUFNLElBQUksS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7UUFDMUQsMkJBQTJCO0lBQzdCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBHbG9iYWwge31cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEdsb2JhbFJlZiB7XG4gIGFic3RyYWN0IGdldCBuYXRpdmVHbG9iYWwoKTogR2xvYmFsO1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46IGByb290YCxcbn0pXG5leHBvcnQgY2xhc3MgQnJvd3Nlckdsb2JhbFJlZiBleHRlbmRzIEdsb2JhbFJlZiB7XG4gIGdldCBuYXRpdmVHbG9iYWwoKTogR2xvYmFsIHtcbiAgICByZXR1cm4gd2luZG93IGFzIEdsb2JhbDtcbiAgfVxufVxuZXhwb3J0IGNsYXNzIE5vZGVHbG9iYWxSZWYgZXh0ZW5kcyBHbG9iYWxSZWYge1xuICBnZXQgbmF0aXZlR2xvYmFsKCk6IEdsb2JhbCB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBnbG9iYWwgZG9lc24ndCBjb21waWxlIGZvciBzb21lIHJlYXNvbmApO1xuICAgIC8vIHJldHVybiBnbG9iYWwgYXMgR2xvYmFsO1xuICB9XG59XG4iXX0=