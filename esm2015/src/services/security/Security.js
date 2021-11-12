// NG2
import { EventEmitter, Injectable } from '@angular/core';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VjdXJpdHkuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvc2VjdXJpdHkvU2VjdXJpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3pELE1BQU0sT0FBTyxRQUFRO0lBRHJCO1FBRUUsZ0JBQVcsR0FBYSxFQUFFLENBQUM7UUFDM0IsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBK0RqRCxDQUFDO0lBN0RDLEtBQUssQ0FBQyxJQUFvQjtRQUN4QixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxJQUFJLFlBQVksS0FBSyxFQUFFO1lBQ3pCLEtBQUssTUFBTSxVQUFVLElBQUksSUFBSSxFQUFFO2dCQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDN0M7U0FDRjthQUFNLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQ25DLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO2dCQUN0QixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxLQUFLLEVBQUU7b0JBQzlCLEtBQUssTUFBTSxVQUFVLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDLENBQUM7cUJBQ3JDO2lCQUNGO2FBQ0Y7U0FDRjtRQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsR0FBRyxDQUFDLEtBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBVTtRQUNmLE1BQU0sQ0FBQyxHQUFXLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELFNBQVMsQ0FBQyxFQUFPO1FBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELFdBQVcsQ0FDVCxNQUFtSCxFQUNuSCxPQUFnQztRQUVoQyxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDcEIsS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFNLEVBQUU7WUFDMUIsSUFBSSxLQUFLLENBQUMsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUNqRSxJQUFJLEtBQUssQ0FBQyxXQUFXLFlBQVksUUFBUSxFQUFFO29CQUN6QyxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFO3dCQUNwQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUN0QjtpQkFDRjtxQkFBTSxJQUFJLEtBQUssQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUU7b0JBQ3hELElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTt3QkFDckQsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDdEI7aUJBQ0Y7cUJBQU07b0JBQ0wsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDdEI7YUFDRjtTQUNGO1FBRUQsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQzs7O1lBakVGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IEV2ZW50RW1pdHRlciwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VjdXJpdHkge1xuICBjcmVkZW50aWFsczogc3RyaW5nW10gPSBbXTtcbiAgY2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBncmFudChkYXRhOiBhbnlbXSB8IE9iamVjdCk6IHZvaWQge1xuICAgIGNvbnN0IHBhcnNlZCA9IFtdO1xuICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGZvciAoY29uc3QgcGVybWlzc2lvbiBvZiBkYXRhKSB7XG4gICAgICAgIHBhcnNlZC5wdXNoKHBlcm1pc3Npb24ucmVwbGFjZSgvXFxzL2dpLCAnJykpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRhdGEgPT09ICdvYmplY3QnKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhW2tleV0gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgIGZvciAoY29uc3QgcGVybWlzc2lvbiBvZiBkYXRhW2tleV0pIHtcbiAgICAgICAgICAgIHBhcnNlZC5wdXNoKGAke2tleX0uJHtwZXJtaXNzaW9ufWApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNyZWRlbnRpYWxzID0gW10uY29uY2F0KHRoaXMuY3JlZGVudGlhbHMsIHBhcnNlZCk7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmNyZWRlbnRpYWxzKTtcbiAgfVxuXG4gIGhhcyh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY3JlZGVudGlhbHMuaW5kZXhPZih2YWx1ZSkgPiAtMTtcbiAgfVxuXG4gIHJldm9rZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgaTogbnVtYmVyID0gdGhpcy5jcmVkZW50aWFscy5pbmRleE9mKHZhbHVlKTtcbiAgICB0aGlzLmNyZWRlbnRpYWxzLnNwbGljZShpLCAxKTtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuY3JlZGVudGlhbHMpO1xuICB9XG5cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgdGhpcy5jcmVkZW50aWFscyA9IFtdO1xuICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5jcmVkZW50aWFscyk7XG4gIH1cblxuICBzdWJzY3JpYmUoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMuY2hhbmdlLnN1YnNjcmliZShmbik7XG4gIH1cblxuICBjaGVja1JvdXRlcyhcbiAgICByb3V0ZXM6IHsgZW50aXRpZXM/OiBhbnlbXTsgcGVybWlzc2lvbnM/OiBhbnlbXSB8IEZ1bmN0aW9uOyBwYXRoPzogc3RyaW5nOyBsYWJlbD86IHN0cmluZzsgY2FuRGlzYWJsZT86IEJvb2xlYW4gfVtdLFxuICAgIG9wdGlvbnM6IHsgZW50aXR5VHlwZT86IHN0cmluZyB9LFxuICApOiBhbnkge1xuICAgIGNvbnN0IGZpbHRlcmVkID0gW107XG4gICAgZm9yIChjb25zdCByb3V0ZSBvZiByb3V0ZXMpIHtcbiAgICAgIGlmIChyb3V0ZS5lbnRpdGllcyAmJiB+cm91dGUuZW50aXRpZXMuaW5kZXhPZihvcHRpb25zLmVudGl0eVR5cGUpKSB7XG4gICAgICAgIGlmIChyb3V0ZS5wZXJtaXNzaW9ucyBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgaWYgKHJvdXRlLnBlcm1pc3Npb25zKG9wdGlvbnMsIHRoaXMpKSB7XG4gICAgICAgICAgICBmaWx0ZXJlZC5wdXNoKHJvdXRlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocm91dGUucGVybWlzc2lvbnMgJiYgcm91dGUucGVybWlzc2lvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgaWYgKHJvdXRlLnBlcm1pc3Npb25zLmV2ZXJ5KChwZXJtKSA9PiB0aGlzLmhhcyhwZXJtKSkpIHtcbiAgICAgICAgICAgIGZpbHRlcmVkLnB1c2gocm91dGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmaWx0ZXJlZC5wdXNoKHJvdXRlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmaWx0ZXJlZDtcbiAgfVxufVxuIl19