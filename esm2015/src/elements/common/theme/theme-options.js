import { EventEmitter, Injectable } from '@angular/core';
import { of } from 'rxjs';
import * as i0 from "@angular/core";
export class NovoThemeOptions {
}
export class NovoTheme {
    constructor() {
        this._defaultTheme = { themeName: 'modern-light' };
        this.onThemeChange = new EventEmitter();
    }
    /** Name of the theme being used. defaults to `modern-light` */
    get themeName() {
        var _a;
        return ((_a = this._currentTheme) === null || _a === void 0 ? void 0 : _a.themeName) || this._defaultTheme.themeName;
    }
    set themeName(value) {
        this._currentTheme = { themeName: value };
        this.changeTheme(this._currentTheme);
    }
    use(options) {
        // future: don't change the theme if the theme given is already selected
        this.changeTheme(options);
        // this might become async in future
        return of(options);
    }
    /**
     * Changes the current theme
     */
    changeTheme(theme) {
        this._currentTheme = theme;
        this.onThemeChange.emit({ themeName: theme.themeName, options: theme });
    }
}
NovoTheme.ɵprov = i0.ɵɵdefineInjectable({ factory: function NovoTheme_Factory() { return new NovoTheme(); }, token: NovoTheme, providedIn: "root" });
NovoTheme.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtb3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9jb21tb24vdGhlbWUvdGhlbWUtb3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUV0QyxNQUFNLE9BQU8sZ0JBQWdCO0NBRTVCO0FBU0QsTUFBTSxPQUFPLFNBQVM7SUFIdEI7UUFJVSxrQkFBYSxHQUFxQixFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsQ0FBQztRQUd4RSxrQkFBYSxHQUFtQyxJQUFJLFlBQVksRUFBb0IsQ0FBQztLQXlCdEY7SUF2QkMsK0RBQStEO0lBQy9ELElBQUksU0FBUzs7UUFDWCxPQUFPLE9BQUEsSUFBSSxDQUFDLGFBQWEsMENBQUUsU0FBUyxLQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO0lBQ3ZFLENBQUM7SUFDRCxJQUFJLFNBQVMsQ0FBQyxLQUFhO1FBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVNLEdBQUcsQ0FBQyxPQUF5QjtRQUNsQyx3RUFBd0U7UUFDeEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQixvQ0FBb0M7UUFDcEMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVEOztPQUVHO0lBQ0ssV0FBVyxDQUFDLEtBQXVCO1FBQ3pDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDMUUsQ0FBQzs7OztZQS9CRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBjbGFzcyBOb3ZvVGhlbWVPcHRpb25zIHtcbiAgdGhlbWVOYW1lOiBzdHJpbmc7XG59XG5leHBvcnQgaW50ZXJmYWNlIFRoZW1lQ2hhbmdlRXZlbnQge1xuICB0aGVtZU5hbWU6IHN0cmluZztcbiAgb3B0aW9ucz86IE5vdm9UaGVtZU9wdGlvbnM7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVGhlbWUge1xuICBwcml2YXRlIF9kZWZhdWx0VGhlbWU6IE5vdm9UaGVtZU9wdGlvbnMgPSB7IHRoZW1lTmFtZTogJ21vZGVybi1saWdodCcgfTtcbiAgcHJpdmF0ZSBfY3VycmVudFRoZW1lOiBOb3ZvVGhlbWVPcHRpb25zO1xuXG4gIG9uVGhlbWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxUaGVtZUNoYW5nZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8VGhlbWVDaGFuZ2VFdmVudD4oKTtcblxuICAvKiogTmFtZSBvZiB0aGUgdGhlbWUgYmVpbmcgdXNlZC4gZGVmYXVsdHMgdG8gYG1vZGVybi1saWdodGAgKi9cbiAgZ2V0IHRoZW1lTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFRoZW1lPy50aGVtZU5hbWUgfHwgdGhpcy5fZGVmYXVsdFRoZW1lLnRoZW1lTmFtZTtcbiAgfVxuICBzZXQgdGhlbWVOYW1lKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jdXJyZW50VGhlbWUgPSB7IHRoZW1lTmFtZTogdmFsdWUgfTtcbiAgICB0aGlzLmNoYW5nZVRoZW1lKHRoaXMuX2N1cnJlbnRUaGVtZSk7XG4gIH1cblxuICBwdWJsaWMgdXNlKG9wdGlvbnM6IE5vdm9UaGVtZU9wdGlvbnMpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIC8vIGZ1dHVyZTogZG9uJ3QgY2hhbmdlIHRoZSB0aGVtZSBpZiB0aGUgdGhlbWUgZ2l2ZW4gaXMgYWxyZWFkeSBzZWxlY3RlZFxuICAgIHRoaXMuY2hhbmdlVGhlbWUob3B0aW9ucyk7XG4gICAgLy8gdGhpcyBtaWdodCBiZWNvbWUgYXN5bmMgaW4gZnV0dXJlXG4gICAgcmV0dXJuIG9mKG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZXMgdGhlIGN1cnJlbnQgdGhlbWVcbiAgICovXG4gIHByaXZhdGUgY2hhbmdlVGhlbWUodGhlbWU6IE5vdm9UaGVtZU9wdGlvbnMpOiB2b2lkIHtcbiAgICB0aGlzLl9jdXJyZW50VGhlbWUgPSB0aGVtZTtcbiAgICB0aGlzLm9uVGhlbWVDaGFuZ2UuZW1pdCh7IHRoZW1lTmFtZTogdGhlbWUudGhlbWVOYW1lLCBvcHRpb25zOiB0aGVtZSB9KTtcbiAgfVxufVxuXG4vKiBGVVRVUkUgVEhPVUdIVFMgKi9cbi8qKlxuIGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KVxuICAgIC5nZXRQcm9wZXJ0eVZhbHVlKCctLW15LXZhcmlhYmxlLW5hbWUnKTsgLy8gIzk5OTk5OVxuIFxuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZVxuICAgIC5zZXRQcm9wZXJ0eSgnLS1teS12YXJpYWJsZS1uYW1lJywgJ3BpbmsnKTtcbiovXG4iXX0=