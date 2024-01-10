import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export class BreadcrumbService {
    constructor(router) {
        this.router = router;
    }
    navigateTo($event, item) {
        if ($event.button !== 0 || $event.ctrlKey || $event.metaKey || $event.shiftKey) {
            return;
        }
        if (typeof item.target === 'string' && item.target !== '_self') {
            return;
        }
        $event.preventDefault();
        this.router.navigateByUrl(item.link);
    }
}
BreadcrumbService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: BreadcrumbService, deps: [{ token: i1.Router }], target: i0.ɵɵFactoryTarget.Injectable });
BreadcrumbService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: BreadcrumbService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: BreadcrumbService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Router }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnJlYWRjcnVtYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvYnJlYWRjcnVtYnMvQnJlYWRjcnVtYi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFHekMsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QixZQUFvQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFHLENBQUM7SUFDdEMsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJO1FBQ3JCLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDOUUsT0FBTztTQUNSO1FBQ0QsSUFBSSxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssT0FBTyxFQUFFO1lBQzlELE9BQU87U0FDUjtRQUNELE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7K0dBWFUsaUJBQWlCO21IQUFqQixpQkFBaUI7NEZBQWpCLGlCQUFpQjtrQkFEN0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCcmVhZGNydW1iU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHt9XG4gIG5hdmlnYXRlVG8oJGV2ZW50LCBpdGVtKSB7XG4gICAgaWYgKCRldmVudC5idXR0b24gIT09IDAgfHwgJGV2ZW50LmN0cmxLZXkgfHwgJGV2ZW50Lm1ldGFLZXkgfHwgJGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0eXBlb2YgaXRlbS50YXJnZXQgPT09ICdzdHJpbmcnICYmIGl0ZW0udGFyZ2V0ICE9PSAnX3NlbGYnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwoaXRlbS5saW5rKTtcbiAgfVxufVxuIl19