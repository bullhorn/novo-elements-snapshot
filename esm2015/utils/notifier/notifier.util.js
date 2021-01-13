import { isDevMode } from '@angular/core';
const notifications = {};
export function notify(message) {
    if (!isDevMode() || message in notifications) {
        return;
    }
    notifications[message] = true;
    console.warn(message); // tslint:disable-line
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXIudXRpbC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS90cmF2aXMvYnVpbGQvYnVsbGhvcm4vbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbInV0aWxzL25vdGlmaWVyL25vdGlmaWVyLnV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxNQUFNLGFBQWEsR0FBK0IsRUFBRSxDQUFDO0FBRXJELE1BQU0sVUFBVSxNQUFNLENBQUMsT0FBZTtJQUNwQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksT0FBTyxJQUFJLGFBQWEsRUFBRTtRQUM1QyxPQUFPO0tBQ1I7SUFDRCxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQzlCLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxzQkFBc0I7QUFDL0MsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jb25zdCBub3RpZmljYXRpb25zOiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xuXG5leHBvcnQgZnVuY3Rpb24gbm90aWZ5KG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuICBpZiAoIWlzRGV2TW9kZSgpIHx8IG1lc3NhZ2UgaW4gbm90aWZpY2F0aW9ucykge1xuICAgIHJldHVybjtcbiAgfVxuICBub3RpZmljYXRpb25zW21lc3NhZ2VdID0gdHJ1ZTtcbiAgY29uc29sZS53YXJuKG1lc3NhZ2UpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG59XG4iXX0=