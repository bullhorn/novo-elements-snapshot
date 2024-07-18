import { isDevMode } from '@angular/core';
const notifications = {};
export function notify(message) {
    if (!isDevMode() || message in notifications) {
        return;
    }
    notifications[message] = true;
    console.warn(message); // tslint:disable-line
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXIudXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL3V0aWxzL25vdGlmaWVyL25vdGlmaWVyLnV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxNQUFNLGFBQWEsR0FBK0IsRUFBRSxDQUFDO0FBRXJELE1BQU0sVUFBVSxNQUFNLENBQUMsT0FBZTtJQUNwQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksT0FBTyxJQUFJLGFBQWEsRUFBRSxDQUFDO1FBQzdDLE9BQU87SUFDVCxDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQztJQUM5QixPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsc0JBQXNCO0FBQy9DLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuY29uc3Qgbm90aWZpY2F0aW9uczogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0gPSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5vdGlmeShtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgaWYgKCFpc0Rldk1vZGUoKSB8fCBtZXNzYWdlIGluIG5vdGlmaWNhdGlvbnMpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgbm90aWZpY2F0aW9uc1ttZXNzYWdlXSA9IHRydWU7XG4gIGNvbnNvbGUud2FybihtZXNzYWdlKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxufVxuIl19