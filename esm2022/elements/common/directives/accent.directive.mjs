// tslint:disable: directive-selector
import { ChangeDetectorRef, Directive, HostBinding, Input } from '@angular/core';
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
    constructor(theme, cdr) {
        this.theme = theme;
        this.cdr = cdr;
        this.subscription = this.theme.onThemeChange.subscribe((event) => {
            this.cdr.markForCheck();
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: AccentColorDirective, deps: [{ token: i1.NovoTheme }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.3.12", type: AccentColorDirective, selector: "[accent]", inputs: { accent: "accent" }, host: { properties: { "class": "this.hb_textColor" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: AccentColorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[accent]',
                }]
        }], ctorParameters: () => [{ type: i1.NovoTheme }, { type: i0.ChangeDetectorRef }], propDecorators: { accent: [{
                type: Input
            }], hb_textColor: [{
                type: HostBinding,
                args: ['class']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZW50LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2NvbW1vbi9kaXJlY3RpdmVzL2FjY2VudC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscUNBQXFDO0FBQ3JDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUU1RixPQUFPLEVBQUUsU0FBUyxFQUFvQixNQUFNLHdCQUF3QixDQUFDOzs7QUFLckUsTUFBTSxPQUFPLG9CQUFvQjtJQUsvQixJQUNJLFlBQVk7UUFDZCwwQ0FBMEM7UUFDMUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUN2QyxPQUFPLGNBQWMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3JDLENBQUM7UUFDRCxPQUFPLGVBQWUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRCxZQUFvQixLQUFnQixFQUFZLEdBQXNCO1FBQWxELFVBQUssR0FBTCxLQUFLLENBQVc7UUFBWSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUNwRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQXVCLEVBQUUsRUFBRTtZQUNqRixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7K0dBdEJVLG9CQUFvQjttR0FBcEIsb0JBQW9COzs0RkFBcEIsb0JBQW9CO2tCQUhoQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxVQUFVO2lCQUNyQjs4R0FJVSxNQUFNO3NCQUFkLEtBQUs7Z0JBR0YsWUFBWTtzQkFEZixXQUFXO3VCQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTogZGlyZWN0aXZlLXNlbGVjdG9yXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBIb3N0QmluZGluZywgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOb3ZvVGhlbWUsIFRoZW1lQ2hhbmdlRXZlbnQgfSBmcm9tICcuLi90aGVtZS90aGVtZS1vcHRpb25zJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FjY2VudF0nLFxufSlcbmV4cG9ydCBjbGFzcyBBY2NlbnRDb2xvckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgQElucHV0KCkgYWNjZW50OiBzdHJpbmc7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGdldCBoYl90ZXh0Q29sb3IoKSB7XG4gICAgLy8gU3VwcG9ydCBsZWdhY3kgY2xhc3NpYyB0aGVtZS4uLiBmb3Igbm93XG4gICAgaWYgKHRoaXMudGhlbWUudGhlbWVOYW1lID09PSAnY2xhc3NpYycpIHtcbiAgICAgIHJldHVybiBgbm92by10aGVtZS0ke3RoaXMuYWNjZW50fWA7XG4gICAgfVxuICAgIHJldHVybiBgbm92by1hY2NlbnQtJHt0aGlzLmFjY2VudH1gO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0aGVtZTogTm92b1RoZW1lLCBwcm90ZWN0ZWQgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy50aGVtZS5vblRoZW1lQ2hhbmdlLnN1YnNjcmliZSgoZXZlbnQ6IFRoZW1lQ2hhbmdlRXZlbnQpID0+IHtcbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19