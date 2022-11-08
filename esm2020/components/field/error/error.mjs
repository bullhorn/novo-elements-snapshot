// NG2
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
export class NovoErrorElement {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    ngOnInit() { }
}
NovoErrorElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoErrorElement, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
NovoErrorElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoErrorElement, selector: "novo-error", ngImport: i0, template: "<ng-content></ng-content>", styles: [":host{display:flex;padding-bottom:5px;flex:1;font-size:.8em;color:var(--color-error)}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoErrorElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-error', template: "<ng-content></ng-content>", styles: [":host{display:flex;padding-bottom:5px;flex:1;font-size:.8em;color:var(--color-error)}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.DomSanitizer }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL2ZpZWxkL2Vycm9yL2Vycm9yLnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9maWVsZC9lcnJvci9lcnJvci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7O0FBT3pELE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0IsWUFBb0IsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztJQUFHLENBQUM7SUFFL0MsUUFBUSxLQUFTLENBQUM7OzhHQUhQLGdCQUFnQjtrR0FBaEIsZ0JBQWdCLGtEQ1Q3QiwyQkFBeUI7NEZEU1osZ0JBQWdCO2tCQUw1QixTQUFTOytCQUNFLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1lcnJvcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9lcnJvci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZXJyb3Iuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRXJyb3JFbGVtZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cblxuICBuZ09uSW5pdCgpOiBhbnkge31cbn1cbiIsIjxuZy1jb250ZW50PjwvbmctY29udGVudD4iXX0=