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
BreadcrumbService.ɵfac = function BreadcrumbService_Factory(t) { return new (t || BreadcrumbService)(i0.ɵɵinject(i1.Router)); };
BreadcrumbService.ɵprov = i0.ɵɵdefineInjectable({ token: BreadcrumbService, factory: BreadcrumbService.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BreadcrumbService, [{
        type: Injectable
    }], function () { return [{ type: i1.Router }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnJlYWRjcnVtYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2JyZWFkY3J1bWJzL0JyZWFkY3J1bWIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBR3pDLE1BQU0sT0FBTyxpQkFBaUI7SUFDNUIsWUFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7SUFBRyxDQUFDO0lBQ3RDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSTtRQUNyQixJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQzlFLE9BQU87U0FDUjtRQUNELElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTtZQUM5RCxPQUFPO1NBQ1I7UUFDRCxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7O2tGQVhVLGlCQUFpQjt5REFBakIsaUJBQWlCLFdBQWpCLGlCQUFpQjtrREFBakIsaUJBQWlCO2NBRDdCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQnJlYWRjcnVtYlNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7fVxuICBuYXZpZ2F0ZVRvKCRldmVudCwgaXRlbSkge1xuICAgIGlmICgkZXZlbnQuYnV0dG9uICE9PSAwIHx8ICRldmVudC5jdHJsS2V5IHx8ICRldmVudC5tZXRhS2V5IHx8ICRldmVudC5zaGlmdEtleSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGl0ZW0udGFyZ2V0ID09PSAnc3RyaW5nJyAmJiBpdGVtLnRhcmdldCAhPT0gJ19zZWxmJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKGl0ZW0ubGluayk7XG4gIH1cbn1cbiJdfQ==