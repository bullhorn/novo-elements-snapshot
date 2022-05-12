// NG2
import { EventEmitter, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
Security.ɵprov = i0.ɵɵdefineInjectable({ factory: function Security_Factory() { return new Security(); }, token: Security, providedIn: "root" });
Security.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VjdXJpdHkuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvc2VjdXJpdHkvU2VjdXJpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUd6RCxNQUFNLE9BQU8sUUFBUTtJQURyQjtRQUVFLGdCQUFXLEdBQWEsRUFBRSxDQUFDO1FBQzNCLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztLQStEaEQ7SUE3REMsS0FBSyxDQUFDLElBQW9CO1FBQ3hCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLElBQUksWUFBWSxLQUFLLEVBQUU7WUFDekIsS0FBSyxNQUFNLFVBQVUsSUFBSSxJQUFJLEVBQUU7Z0JBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUM3QztTQUNGO2FBQU0sSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDbkMsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUU7Z0JBQ3RCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEtBQUssRUFBRTtvQkFDOUIsS0FBSyxNQUFNLFVBQVUsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUMsQ0FBQztxQkFDckM7aUJBQ0Y7YUFDRjtTQUNGO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxHQUFHLENBQUMsS0FBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFVO1FBQ2YsTUFBTSxDQUFDLEdBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsU0FBUyxDQUFDLEVBQU87UUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsV0FBVyxDQUNULE1BQW1ILEVBQ25ILE9BQWdDO1FBRWhDLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNwQixLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtZQUMxQixJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ2pFLElBQUksS0FBSyxDQUFDLFdBQVcsWUFBWSxRQUFRLEVBQUU7b0JBQ3pDLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUU7d0JBQ3BDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3RCO2lCQUNGO3FCQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRTtvQkFDeEQsSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO3dCQUNyRCxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUN0QjtpQkFDRjtxQkFBTTtvQkFDTCxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN0QjthQUNGO1NBQ0Y7UUFFRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDOzs7O1lBakVGLFVBQVUsU0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IEV2ZW50RW1pdHRlciwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFNlY3VyaXR5IHtcbiAgY3JlZGVudGlhbHM6IHN0cmluZ1tdID0gW107XG4gIGNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgZ3JhbnQoZGF0YTogYW55W10gfCBPYmplY3QpOiB2b2lkIHtcbiAgICBjb25zdCBwYXJzZWQgPSBbXTtcbiAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBmb3IgKGNvbnN0IHBlcm1pc3Npb24gb2YgZGF0YSkge1xuICAgICAgICBwYXJzZWQucHVzaChwZXJtaXNzaW9uLnJlcGxhY2UoL1xccy9naSwgJycpKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0Jykge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuICAgICAgICBpZiAoZGF0YVtrZXldIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IHBlcm1pc3Npb24gb2YgZGF0YVtrZXldKSB7XG4gICAgICAgICAgICBwYXJzZWQucHVzaChgJHtrZXl9LiR7cGVybWlzc2lvbn1gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jcmVkZW50aWFscyA9IFtdLmNvbmNhdCh0aGlzLmNyZWRlbnRpYWxzLCBwYXJzZWQpO1xuICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5jcmVkZW50aWFscyk7XG4gIH1cblxuICBoYXModmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNyZWRlbnRpYWxzLmluZGV4T2YodmFsdWUpID4gLTE7XG4gIH1cblxuICByZXZva2UodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGk6IG51bWJlciA9IHRoaXMuY3JlZGVudGlhbHMuaW5kZXhPZih2YWx1ZSk7XG4gICAgdGhpcy5jcmVkZW50aWFscy5zcGxpY2UoaSwgMSk7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmNyZWRlbnRpYWxzKTtcbiAgfVxuXG4gIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMuY3JlZGVudGlhbHMgPSBbXTtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuY3JlZGVudGlhbHMpO1xuICB9XG5cbiAgc3Vic2NyaWJlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmNoYW5nZS5zdWJzY3JpYmUoZm4pO1xuICB9XG5cbiAgY2hlY2tSb3V0ZXMoXG4gICAgcm91dGVzOiB7IGVudGl0aWVzPzogYW55W107IHBlcm1pc3Npb25zPzogYW55W10gfCBGdW5jdGlvbjsgcGF0aD86IHN0cmluZzsgbGFiZWw/OiBzdHJpbmc7IGNhbkRpc2FibGU/OiBCb29sZWFuIH1bXSxcbiAgICBvcHRpb25zOiB7IGVudGl0eVR5cGU/OiBzdHJpbmcgfSxcbiAgKTogYW55IHtcbiAgICBjb25zdCBmaWx0ZXJlZCA9IFtdO1xuICAgIGZvciAoY29uc3Qgcm91dGUgb2Ygcm91dGVzKSB7XG4gICAgICBpZiAocm91dGUuZW50aXRpZXMgJiYgfnJvdXRlLmVudGl0aWVzLmluZGV4T2Yob3B0aW9ucy5lbnRpdHlUeXBlKSkge1xuICAgICAgICBpZiAocm91dGUucGVybWlzc2lvbnMgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgIGlmIChyb3V0ZS5wZXJtaXNzaW9ucyhvcHRpb25zLCB0aGlzKSkge1xuICAgICAgICAgICAgZmlsdGVyZWQucHVzaChyb3V0ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJvdXRlLnBlcm1pc3Npb25zICYmIHJvdXRlLnBlcm1pc3Npb25zLmxlbmd0aCkge1xuICAgICAgICAgIGlmIChyb3V0ZS5wZXJtaXNzaW9ucy5ldmVyeSgocGVybSkgPT4gdGhpcy5oYXMocGVybSkpKSB7XG4gICAgICAgICAgICBmaWx0ZXJlZC5wdXNoKHJvdXRlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmlsdGVyZWQucHVzaChyb3V0ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmlsdGVyZWQ7XG4gIH1cbn1cbiJdfQ==