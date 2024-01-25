// tslint:disable: directive-selector
import { ChangeDetectorRef, Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { NovoTheme } from '../theme/theme-options';
import * as i0 from "@angular/core";
import * as i1 from "../theme/theme-options";
export class AccentColorDirective {
    get hb_textColor() {
        // Support legacy classic theme... for now
        if (this.theme.themeName === 'classic') {
            return `novo-theme-${this.accent}`;
        }
        return `novo-accent-${this.accent}`;
    }
    constructor(el, theme, cdr) {
        this.el = el;
        this.theme = theme;
        this.cdr = cdr;
        this.subscription = this.theme.onThemeChange.subscribe((event) => {
            this.cdr.markForCheck();
        });
    }
    onDestroy() {
        this.subscription.unsubscribe();
    }
}
AccentColorDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AccentColorDirective, deps: [{ token: i0.ElementRef }, { token: i1.NovoTheme }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
AccentColorDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: AccentColorDirective, selector: "[accent]", inputs: { accent: "accent" }, host: { properties: { "class": "this.hb_textColor" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AccentColorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[accent]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoTheme }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { accent: [{
                type: Input
            }], hb_textColor: [{
                type: HostBinding,
                args: ['class']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZW50LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2NvbW1vbi9kaXJlY3RpdmVzL2FjY2VudC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscUNBQXFDO0FBQ3JDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFN0YsT0FBTyxFQUFFLFNBQVMsRUFBb0IsTUFBTSx3QkFBd0IsQ0FBQzs7O0FBS3JFLE1BQU0sT0FBTyxvQkFBb0I7SUFLL0IsSUFDSSxZQUFZO1FBQ2QsMENBQTBDO1FBQzFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQ3RDLE9BQU8sY0FBYyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDcEM7UUFDRCxPQUFPLGVBQWUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRCxZQUFvQixFQUFjLEVBQVUsS0FBZ0IsRUFBWSxHQUFzQjtRQUExRSxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBVztRQUFZLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQzVGLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBdUIsRUFBRSxFQUFFO1lBQ2pGLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7a0hBdEJVLG9CQUFvQjtzR0FBcEIsb0JBQW9COzRGQUFwQixvQkFBb0I7a0JBSGhDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFVBQVU7aUJBQ3JCO3lKQUlVLE1BQU07c0JBQWQsS0FBSztnQkFHRixZQUFZO3NCQURmLFdBQVc7dUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOiBkaXJlY3RpdmUtc2VsZWN0b3JcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOb3ZvVGhlbWUsIFRoZW1lQ2hhbmdlRXZlbnQgfSBmcm9tICcuLi90aGVtZS90aGVtZS1vcHRpb25zJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FjY2VudF0nLFxufSlcbmV4cG9ydCBjbGFzcyBBY2NlbnRDb2xvckRpcmVjdGl2ZSB7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgQElucHV0KCkgYWNjZW50OiBzdHJpbmc7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGdldCBoYl90ZXh0Q29sb3IoKSB7XG4gICAgLy8gU3VwcG9ydCBsZWdhY3kgY2xhc3NpYyB0aGVtZS4uLiBmb3Igbm93XG4gICAgaWYgKHRoaXMudGhlbWUudGhlbWVOYW1lID09PSAnY2xhc3NpYycpIHtcbiAgICAgIHJldHVybiBgbm92by10aGVtZS0ke3RoaXMuYWNjZW50fWA7XG4gICAgfVxuICAgIHJldHVybiBgbm92by1hY2NlbnQtJHt0aGlzLmFjY2VudH1gO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSB0aGVtZTogTm92b1RoZW1lLCBwcm90ZWN0ZWQgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy50aGVtZS5vblRoZW1lQ2hhbmdlLnN1YnNjcmliZSgoZXZlbnQ6IFRoZW1lQ2hhbmdlRXZlbnQpID0+IHtcbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgb25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==