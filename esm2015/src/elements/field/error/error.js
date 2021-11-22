// NG2
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export class NovoErrorElement {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    ngOnInit() { }
}
NovoErrorElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-error',
                template: "<ng-content></ng-content>",
                styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}:host{color:#da4453;display:flex;flex:1;font-size:.8em;padding-bottom:5px}"]
            },] }
];
NovoErrorElement.ctorParameters = () => [
    { type: DomSanitizer }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvZmllbGQvZXJyb3IvZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBT3pELE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0IsWUFBb0IsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztJQUFHLENBQUM7SUFFL0MsUUFBUSxLQUFTLENBQUM7OztZQVJuQixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLHFDQUEyQjs7YUFFNUI7OztZQU5RLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1lcnJvcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9lcnJvci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZXJyb3Iuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRXJyb3JFbGVtZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cblxuICBuZ09uSW5pdCgpOiBhbnkge31cbn1cbiJdfQ==