// NG2
import { Injectable, EventEmitter } from '@angular/core';
export class Security {
    constructor() {
        this.credentials = [];
        this.change = new EventEmitter();
    }
    grant(data) {
        const parsed = [];
        if (data instanceof Array) {
            for (const permission of data) {
                parsed.push(permission.replace(/\s/gi, ''));
            }
        }
        else if (typeof data === 'object') {
            for (const key in data) {
                if (data[key] instanceof Array) {
                    for (const permission of data[key]) {
                        parsed.push(`${key}.${permission}`);
                    }
                }
            }
        }
        this.credentials = [].concat(this.credentials, parsed);
        this.change.emit(this.credentials);
    }
    has(value) {
        return this.credentials.indexOf(value) > -1;
    }
    revoke(value) {
        const i = this.credentials.indexOf(value);
        this.credentials.splice(i, 1);
        this.change.emit(this.credentials);
    }
    clear() {
        this.credentials = [];
        this.change.emit(this.credentials);
    }
    subscribe(fn) {
        this.change.subscribe(fn);
    }
    checkRoutes(routes, options) {
        const filtered = [];
        for (const route of routes) {
            if (route.entities && ~route.entities.indexOf(options.entityType)) {
                if (route.permissions instanceof Function) {
                    if (route.permissions(options, this)) {
                        filtered.push(route);
                    }
                }
                else if (route.permissions && route.permissions.length) {
                    if (route.permissions.every((perm) => this.has(perm))) {
                        filtered.push(route);
                    }
                }
                else {
                    filtered.push(route);
                }
            }
        }
        return filtered;
    }
}
Security.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VjdXJpdHkuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL3NlY3VyaXR5L1NlY3VyaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd6RCxNQUFNLE9BQU8sUUFBUTtJQURyQjtRQUVFLGdCQUFXLEdBQWEsRUFBRSxDQUFDO1FBQzNCLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQStEakQsQ0FBQztJQTdEQyxLQUFLLENBQUMsSUFBb0I7UUFDeEIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksSUFBSSxZQUFZLEtBQUssRUFBRTtZQUN6QixLQUFLLE1BQU0sVUFBVSxJQUFJLElBQUksRUFBRTtnQkFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzdDO1NBQ0Y7YUFBTSxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUNuQyxLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRTtnQkFDdEIsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksS0FBSyxFQUFFO29CQUM5QixLQUFLLE1BQU0sVUFBVSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQyxDQUFDO3FCQUNyQztpQkFDRjthQUNGO1NBQ0Y7UUFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELEdBQUcsQ0FBQyxLQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQVU7UUFDZixNQUFNLENBQUMsR0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxTQUFTLENBQUMsRUFBTztRQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxXQUFXLENBQ1QsTUFBbUgsRUFDbkgsT0FBZ0M7UUFFaEMsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFO1lBQzFCLElBQUksS0FBSyxDQUFDLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDakUsSUFBSSxLQUFLLENBQUMsV0FBVyxZQUFZLFFBQVEsRUFBRTtvQkFDekMsSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRTt3QkFDcEMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDdEI7aUJBQ0Y7cUJBQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO29CQUN4RCxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7d0JBQ3JELFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3RCO2lCQUNGO3FCQUFNO29CQUNMLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3RCO2FBQ0Y7U0FDRjtRQUVELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7OztZQWpFRixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXHJcbmltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU2VjdXJpdHkge1xyXG4gIGNyZWRlbnRpYWxzOiBzdHJpbmdbXSA9IFtdO1xyXG4gIGNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGdyYW50KGRhdGE6IGFueVtdIHwgT2JqZWN0KTogdm9pZCB7XHJcbiAgICBjb25zdCBwYXJzZWQgPSBbXTtcclxuICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgZm9yIChjb25zdCBwZXJtaXNzaW9uIG9mIGRhdGEpIHtcclxuICAgICAgICBwYXJzZWQucHVzaChwZXJtaXNzaW9uLnJlcGxhY2UoL1xccy9naSwgJycpKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xyXG4gICAgICAgIGlmIChkYXRhW2tleV0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgZm9yIChjb25zdCBwZXJtaXNzaW9uIG9mIGRhdGFba2V5XSkge1xyXG4gICAgICAgICAgICBwYXJzZWQucHVzaChgJHtrZXl9LiR7cGVybWlzc2lvbn1gKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuY3JlZGVudGlhbHMgPSBbXS5jb25jYXQodGhpcy5jcmVkZW50aWFscywgcGFyc2VkKTtcclxuICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5jcmVkZW50aWFscyk7XHJcbiAgfVxyXG5cclxuICBoYXModmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY3JlZGVudGlhbHMuaW5kZXhPZih2YWx1ZSkgPiAtMTtcclxuICB9XHJcblxyXG4gIHJldm9rZSh2YWx1ZTogYW55KTogdm9pZCB7XHJcbiAgICBjb25zdCBpOiBudW1iZXIgPSB0aGlzLmNyZWRlbnRpYWxzLmluZGV4T2YodmFsdWUpO1xyXG4gICAgdGhpcy5jcmVkZW50aWFscy5zcGxpY2UoaSwgMSk7XHJcbiAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuY3JlZGVudGlhbHMpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXIoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNyZWRlbnRpYWxzID0gW107XHJcbiAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuY3JlZGVudGlhbHMpO1xyXG4gIH1cclxuXHJcbiAgc3Vic2NyaWJlKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMuY2hhbmdlLnN1YnNjcmliZShmbik7XHJcbiAgfVxyXG5cclxuICBjaGVja1JvdXRlcyhcclxuICAgIHJvdXRlczogeyBlbnRpdGllcz86IGFueVtdOyBwZXJtaXNzaW9ucz86IGFueVtdIHwgRnVuY3Rpb247IHBhdGg/OiBzdHJpbmc7IGxhYmVsPzogc3RyaW5nOyBjYW5EaXNhYmxlPzogQm9vbGVhbiB9W10sXHJcbiAgICBvcHRpb25zOiB7IGVudGl0eVR5cGU/OiBzdHJpbmcgfSxcclxuICApOiBhbnkge1xyXG4gICAgY29uc3QgZmlsdGVyZWQgPSBbXTtcclxuICAgIGZvciAoY29uc3Qgcm91dGUgb2Ygcm91dGVzKSB7XHJcbiAgICAgIGlmIChyb3V0ZS5lbnRpdGllcyAmJiB+cm91dGUuZW50aXRpZXMuaW5kZXhPZihvcHRpb25zLmVudGl0eVR5cGUpKSB7XHJcbiAgICAgICAgaWYgKHJvdXRlLnBlcm1pc3Npb25zIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgICAgIGlmIChyb3V0ZS5wZXJtaXNzaW9ucyhvcHRpb25zLCB0aGlzKSkge1xyXG4gICAgICAgICAgICBmaWx0ZXJlZC5wdXNoKHJvdXRlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHJvdXRlLnBlcm1pc3Npb25zICYmIHJvdXRlLnBlcm1pc3Npb25zLmxlbmd0aCkge1xyXG4gICAgICAgICAgaWYgKHJvdXRlLnBlcm1pc3Npb25zLmV2ZXJ5KChwZXJtKSA9PiB0aGlzLmhhcyhwZXJtKSkpIHtcclxuICAgICAgICAgICAgZmlsdGVyZWQucHVzaChyb3V0ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZpbHRlcmVkLnB1c2gocm91dGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmaWx0ZXJlZDtcclxuICB9XHJcbn1cclxuIl19