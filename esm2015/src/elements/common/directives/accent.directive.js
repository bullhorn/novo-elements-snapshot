// tslint:disable: directive-selector
import { ChangeDetectorRef, Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { NovoTheme } from '../theme/theme-options';
export class AccentColorDirective {
    constructor(el, theme, cdr) {
        this.el = el;
        this.theme = theme;
        this.cdr = cdr;
        this.subscription = this.theme.onThemeChange.subscribe((event) => {
            this.cdr.markForCheck();
        });
    }
    get hb_textColor() {
        // Support legacy classic theme... for now
        if (this.theme.themeName === 'classic') {
            return `novo-theme-${this.accent}`;
        }
        return `novo-accent-${this.accent}`;
    }
    onDestroy() {
        this.subscription.unsubscribe();
    }
}
AccentColorDirective.decorators = [
    { type: Directive, args: [{
                selector: '[accent]',
            },] }
];
AccentColorDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NovoTheme },
    { type: ChangeDetectorRef }
];
AccentColorDirective.propDecorators = {
    accent: [{ type: Input }],
    hb_textColor: [{ type: HostBinding, args: ['class',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZW50LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9jb21tb24vZGlyZWN0aXZlcy9hY2NlbnQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFDQUFxQztBQUNyQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTdGLE9BQU8sRUFBRSxTQUFTLEVBQW9CLE1BQU0sd0JBQXdCLENBQUM7QUFLckUsTUFBTSxPQUFPLG9CQUFvQjtJQWMvQixZQUFvQixFQUFjLEVBQVUsS0FBZ0IsRUFBWSxHQUFzQjtRQUExRSxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBVztRQUFZLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQzVGLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBdUIsRUFBRSxFQUFFO1lBQ2pGLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBYkQsSUFDSSxZQUFZO1FBQ2QsMENBQTBDO1FBQzFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQ3RDLE9BQU8sY0FBYyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDcEM7UUFDRCxPQUFPLGVBQWUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFRRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzs7WUF6QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxVQUFVO2FBQ3JCOzs7WUFOc0MsVUFBVTtZQUV4QyxTQUFTO1lBRlQsaUJBQWlCOzs7cUJBVXZCLEtBQUs7MkJBRUwsV0FBVyxTQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTogZGlyZWN0aXZlLXNlbGVjdG9yXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTm92b1RoZW1lLCBUaGVtZUNoYW5nZUV2ZW50IH0gZnJvbSAnLi4vdGhlbWUvdGhlbWUtb3B0aW9ucyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thY2NlbnRdJyxcbn0pXG5leHBvcnQgY2xhc3MgQWNjZW50Q29sb3JEaXJlY3RpdmUge1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIEBJbnB1dCgpIGFjY2VudDogc3RyaW5nO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgaGJfdGV4dENvbG9yKCkge1xuICAgIC8vIFN1cHBvcnQgbGVnYWN5IGNsYXNzaWMgdGhlbWUuLi4gZm9yIG5vd1xuICAgIGlmICh0aGlzLnRoZW1lLnRoZW1lTmFtZSA9PT0gJ2NsYXNzaWMnKSB7XG4gICAgICByZXR1cm4gYG5vdm8tdGhlbWUtJHt0aGlzLmFjY2VudH1gO1xuICAgIH1cbiAgICByZXR1cm4gYG5vdm8tYWNjZW50LSR7dGhpcy5hY2NlbnR9YDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgdGhlbWU6IE5vdm9UaGVtZSwgcHJvdGVjdGVkIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMudGhlbWUub25UaGVtZUNoYW5nZS5zdWJzY3JpYmUoKGV2ZW50OiBUaGVtZUNoYW5nZUV2ZW50KSA9PiB7XG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=