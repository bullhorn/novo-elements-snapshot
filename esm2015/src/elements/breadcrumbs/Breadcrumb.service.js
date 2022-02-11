import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
BreadcrumbService.decorators = [
    { type: Injectable }
];
BreadcrumbService.ctorParameters = () => [
    { type: Router }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnJlYWRjcnVtYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2JyZWFkY3J1bWJzL0JyZWFkY3J1bWIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUd6QyxNQUFNLE9BQU8saUJBQWlCO0lBQzVCLFlBQW9CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQUcsQ0FBQztJQUN0QyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUk7UUFDckIsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUM5RSxPQUFPO1NBQ1I7UUFDRCxJQUFJLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxRQUFRLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7WUFDOUQsT0FBTztTQUNSO1FBQ0QsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7WUFaRixVQUFVOzs7WUFGRixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJyZWFkY3J1bWJTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge31cbiAgbmF2aWdhdGVUbygkZXZlbnQsIGl0ZW0pIHtcbiAgICBpZiAoJGV2ZW50LmJ1dHRvbiAhPT0gMCB8fCAkZXZlbnQuY3RybEtleSB8fCAkZXZlbnQubWV0YUtleSB8fCAkZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBpdGVtLnRhcmdldCA9PT0gJ3N0cmluZycgJiYgaXRlbS50YXJnZXQgIT09ICdfc2VsZicpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybChpdGVtLmxpbmspO1xuICB9XG59XG4iXX0=