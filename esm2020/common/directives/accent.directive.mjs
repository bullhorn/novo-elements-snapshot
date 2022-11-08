// tslint:disable: directive-selector
import { ChangeDetectorRef, Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { NovoTheme } from '../theme/theme-options';
import * as i0 from "@angular/core";
import * as i1 from "../theme/theme-options";
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
        if (!this.accent)
            return '';
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
AccentColorDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: AccentColorDirective, deps: [{ token: i0.ElementRef }, { token: i1.NovoTheme }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
AccentColorDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: AccentColorDirective, selector: "[accent]", inputs: { accent: "accent" }, host: { properties: { "class": "this.hb_textColor" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: AccentColorDirective, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZW50LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbW1vbi9kaXJlY3RpdmVzL2FjY2VudC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscUNBQXFDO0FBQ3JDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFN0YsT0FBTyxFQUFFLFNBQVMsRUFBb0IsTUFBTSx3QkFBd0IsQ0FBQzs7O0FBS3JFLE1BQU0sT0FBTyxvQkFBb0I7SUFlL0IsWUFBb0IsRUFBYyxFQUFVLEtBQWdCLEVBQVksR0FBc0I7UUFBMUUsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVc7UUFBWSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUM1RixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQXVCLEVBQUUsRUFBRTtZQUNqRixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQWRELElBQ0ksWUFBWTtRQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQzVCLDBDQUEwQztRQUMxQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtZQUN0QyxPQUFPLGNBQWMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3BDO1FBQ0QsT0FBTyxlQUFlLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBUUQsU0FBUztRQUNQLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7a0hBdkJVLG9CQUFvQjtzR0FBcEIsb0JBQW9COzRGQUFwQixvQkFBb0I7a0JBSGhDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFVBQVU7aUJBQ3JCO3lKQUlVLE1BQU07c0JBQWQsS0FBSztnQkFHRixZQUFZO3NCQURmLFdBQVc7dUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOiBkaXJlY3RpdmUtc2VsZWN0b3JcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOb3ZvVGhlbWUsIFRoZW1lQ2hhbmdlRXZlbnQgfSBmcm9tICcuLi90aGVtZS90aGVtZS1vcHRpb25zJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FjY2VudF0nLFxufSlcbmV4cG9ydCBjbGFzcyBBY2NlbnRDb2xvckRpcmVjdGl2ZSB7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgQElucHV0KCkgYWNjZW50OiBzdHJpbmc7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGdldCBoYl90ZXh0Q29sb3IoKSB7XG4gICAgaWYgKCF0aGlzLmFjY2VudCkgcmV0dXJuICcnO1xuICAgIC8vIFN1cHBvcnQgbGVnYWN5IGNsYXNzaWMgdGhlbWUuLi4gZm9yIG5vd1xuICAgIGlmICh0aGlzLnRoZW1lLnRoZW1lTmFtZSA9PT0gJ2NsYXNzaWMnKSB7XG4gICAgICByZXR1cm4gYG5vdm8tdGhlbWUtJHt0aGlzLmFjY2VudH1gO1xuICAgIH1cbiAgICByZXR1cm4gYG5vdm8tYWNjZW50LSR7dGhpcy5hY2NlbnR9YDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgdGhlbWU6IE5vdm9UaGVtZSwgcHJvdGVjdGVkIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMudGhlbWUub25UaGVtZUNoYW5nZS5zdWJzY3JpYmUoKGV2ZW50OiBUaGVtZUNoYW5nZUV2ZW50KSA9PiB7XG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=