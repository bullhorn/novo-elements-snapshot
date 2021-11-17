// tslint:disable: directive-selector
import { Directive, HostBinding, Input } from '@angular/core';
export class BackgroundColorDirective {
    get background() {
        return `bgc-${this.bgc}`;
    }
}
BackgroundColorDirective.decorators = [
    { type: Directive, args: [{
                selector: '[bgc]',
            },] }
];
BackgroundColorDirective.propDecorators = {
    bgc: [{ type: Input }],
    background: [{ type: HostBinding, args: ['class',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmdjLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9jb21tb24vZGlyZWN0aXZlcy9iZ2MuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFDQUFxQztBQUNyQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLOUQsTUFBTSxPQUFPLHdCQUF3QjtJQUduQyxJQUNJLFVBQVU7UUFDWixPQUFPLE9BQU8sSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLENBQUM7OztZQVRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsT0FBTzthQUNsQjs7O2tCQUVFLEtBQUs7eUJBRUwsV0FBVyxTQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTogZGlyZWN0aXZlLXNlbGVjdG9yXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYmdjXScsXG59KVxuZXhwb3J0IGNsYXNzIEJhY2tncm91bmRDb2xvckRpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpIGJnYzogc3RyaW5nO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgYmFja2dyb3VuZCgpIHtcbiAgICByZXR1cm4gYGJnYy0ke3RoaXMuYmdjfWA7XG4gIH1cbn1cbiJdfQ==