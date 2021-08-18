// NG2
import { Injectable, EventEmitter } from '@angular/core';
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
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VjdXJpdHkuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsic2VydmljZXMvc2VjdXJpdHkvU2VjdXJpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUt6RCxNQUFNLE9BQU8sUUFBUTtJQUhyQjtRQUlFLGdCQUFXLEdBQWEsRUFBRSxDQUFDO1FBQzNCLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztLQStEaEQ7SUE3REMsS0FBSyxDQUFDLElBQW9CO1FBQ3hCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLElBQUksWUFBWSxLQUFLLEVBQUU7WUFDekIsS0FBSyxNQUFNLFVBQVUsSUFBSSxJQUFJLEVBQUU7Z0JBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUM3QztTQUNGO2FBQU0sSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDbkMsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUU7Z0JBQ3RCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEtBQUssRUFBRTtvQkFDOUIsS0FBSyxNQUFNLFVBQVUsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUMsQ0FBQztxQkFDckM7aUJBQ0Y7YUFDRjtTQUNGO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxHQUFHLENBQUMsS0FBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFVO1FBQ2YsTUFBTSxDQUFDLEdBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsU0FBUyxDQUFDLEVBQU87UUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsV0FBVyxDQUNULE1BQW1ILEVBQ25ILE9BQWdDO1FBRWhDLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNwQixLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtZQUMxQixJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ2pFLElBQUksS0FBSyxDQUFDLFdBQVcsWUFBWSxRQUFRLEVBQUU7b0JBQ3pDLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUU7d0JBQ3BDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3RCO2lCQUNGO3FCQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRTtvQkFDeEQsSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO3dCQUNyRCxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUN0QjtpQkFDRjtxQkFBTTtvQkFDTCxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN0QjthQUNGO1NBQ0Y7UUFFRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDOzs7O1lBbkVGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBTZWN1cml0eSB7XG4gIGNyZWRlbnRpYWxzOiBzdHJpbmdbXSA9IFtdO1xuICBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGdyYW50KGRhdGE6IGFueVtdIHwgT2JqZWN0KTogdm9pZCB7XG4gICAgY29uc3QgcGFyc2VkID0gW107XG4gICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgZm9yIChjb25zdCBwZXJtaXNzaW9uIG9mIGRhdGEpIHtcbiAgICAgICAgcGFyc2VkLnB1c2gocGVybWlzc2lvbi5yZXBsYWNlKC9cXHMvZ2ksICcnKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGFba2V5XSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgZm9yIChjb25zdCBwZXJtaXNzaW9uIG9mIGRhdGFba2V5XSkge1xuICAgICAgICAgICAgcGFyc2VkLnB1c2goYCR7a2V5fS4ke3Blcm1pc3Npb259YCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY3JlZGVudGlhbHMgPSBbXS5jb25jYXQodGhpcy5jcmVkZW50aWFscywgcGFyc2VkKTtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuY3JlZGVudGlhbHMpO1xuICB9XG5cbiAgaGFzKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jcmVkZW50aWFscy5pbmRleE9mKHZhbHVlKSA+IC0xO1xuICB9XG5cbiAgcmV2b2tlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBpOiBudW1iZXIgPSB0aGlzLmNyZWRlbnRpYWxzLmluZGV4T2YodmFsdWUpO1xuICAgIHRoaXMuY3JlZGVudGlhbHMuc3BsaWNlKGksIDEpO1xuICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5jcmVkZW50aWFscyk7XG4gIH1cblxuICBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLmNyZWRlbnRpYWxzID0gW107XG4gICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmNyZWRlbnRpYWxzKTtcbiAgfVxuXG4gIHN1YnNjcmliZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5jaGFuZ2Uuc3Vic2NyaWJlKGZuKTtcbiAgfVxuXG4gIGNoZWNrUm91dGVzKFxuICAgIHJvdXRlczogeyBlbnRpdGllcz86IGFueVtdOyBwZXJtaXNzaW9ucz86IGFueVtdIHwgRnVuY3Rpb247IHBhdGg/OiBzdHJpbmc7IGxhYmVsPzogc3RyaW5nOyBjYW5EaXNhYmxlPzogQm9vbGVhbiB9W10sXG4gICAgb3B0aW9uczogeyBlbnRpdHlUeXBlPzogc3RyaW5nIH0sXG4gICk6IGFueSB7XG4gICAgY29uc3QgZmlsdGVyZWQgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHJvdXRlIG9mIHJvdXRlcykge1xuICAgICAgaWYgKHJvdXRlLmVudGl0aWVzICYmIH5yb3V0ZS5lbnRpdGllcy5pbmRleE9mKG9wdGlvbnMuZW50aXR5VHlwZSkpIHtcbiAgICAgICAgaWYgKHJvdXRlLnBlcm1pc3Npb25zIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICBpZiAocm91dGUucGVybWlzc2lvbnMob3B0aW9ucywgdGhpcykpIHtcbiAgICAgICAgICAgIGZpbHRlcmVkLnB1c2gocm91dGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChyb3V0ZS5wZXJtaXNzaW9ucyAmJiByb3V0ZS5wZXJtaXNzaW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICBpZiAocm91dGUucGVybWlzc2lvbnMuZXZlcnkoKHBlcm0pID0+IHRoaXMuaGFzKHBlcm0pKSkge1xuICAgICAgICAgICAgZmlsdGVyZWQucHVzaChyb3V0ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZpbHRlcmVkLnB1c2gocm91dGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbHRlcmVkO1xuICB9XG59XG4iXX0=