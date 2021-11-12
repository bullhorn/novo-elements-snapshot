import { ChangeDetectionStrategy, Component, Directive, Inject, InjectionToken, Input, Optional, ViewEncapsulation } from '@angular/core';
import { mixinDisabled } from '../mixins/disabled.mixin';
import { NOVO_OPTION_PARENT_COMPONENT } from './option-parent';
// Notes on the accessibility pattern used for `novo-optgroup`.
// The option group has two different "modes": regular and inert. The regular mode uses the
// recommended a11y pattern which has `role="group"` on the group element with `aria-labelledby`
// pointing to the label. This works for `novo-select`, but it seems to hit a bug for autocomplete
// under VoiceOver where the group doesn't get read out at all. The bug appears to be that if
// there's __any__ a11y-related attribute on the group (e.g. `role` or `aria-labelledby`),
// VoiceOver on Safari won't read it out.
// We've introduced the `inert` mode as a workaround. Under this mode, all a11y attributes are
// removed from the group, and we get the screen reader to read out the group label by mirroring it
// inside an invisible element in the option. This is sub-optimal, because the screen reader will
// repeat the group label on each navigation, whereas the default pattern only reads the group when
// the user enters a new group. The following alternate approaches were considered:
// 1. Reading out the group label using the `LiveAnnouncer` solves the problem, but we can't control
//    when the text will be read out so sometimes it comes in too late or never if the user
//    navigates quickly.
// 2. `<novo-option aria-describedby="groupLabel"` - This works on Safari, but VoiceOver in Chrome
//    won't read out the description at all.
// 3. `<novo-option aria-labelledby="optionLabel groupLabel"` - This works on Chrome, but Safari
//     doesn't read out the text at all. Furthermore, on
// Boilerplate for applying mixins to NovoOptgroup.
export class NovoOptgroupBase {
    constructor() {
        /** Unique id for the underlying label. */
        this._labelId = `novo-optgroup-label-${_uniqueOptgroupIdCounter++}`;
    }
}
NovoOptgroupBase.decorators = [
    { type: Directive }
];
NovoOptgroupBase.propDecorators = {
    label: [{ type: Input }]
};
export const NovoOptgroupMixinBase = mixinDisabled(NovoOptgroupBase);
// Counter for unique group ids.
let _uniqueOptgroupIdCounter = 0;
/**
 * Injection token that can be used to reference instances of `NovoOptgroup`. It serves as
 * alternative token to the actual `NovoOptgroup` class which could cause unnecessary
 * retention of the class and its component metadata.
 */
export const NOVO_OPTGROUP = new InjectionToken('NovoOptgroup');
/**
 * Component that is used to group instances of `novo-option`.
 */
export class NovoOptgroup extends NovoOptgroupMixinBase {
    constructor(parent) {
        var _a;
        super();
        this._inert = (_a = parent === null || parent === void 0 ? void 0 : parent.inertGroups) !== null && _a !== void 0 ? _a : false;
    }
}
NovoOptgroup.decorators = [
    { type: Component, args: [{
                selector: 'novo-optgroup',
                exportAs: 'novoOptgroup',
                template: "<span class=\"novo-optgroup-label\" aria-hidden=\"true\" [id]=\"_labelId\">{{ label }} <ng-content></ng-content></span>\n<ng-content select=\"novo-option, ng-container, novo-divider\"></ng-content>",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                inputs: ['disabled'],
                host: {
                    class: 'novo-optgroup',
                    '[attr.role]': '_inert ? null : "group"',
                    '[attr.aria-disabled]': '_inert ? null : disabled.toString()',
                    '[attr.aria-labelledby]': '_inert ? null : _labelId',
                    '[class.novo-optgroup-disabled]': 'disabled',
                },
                providers: [{ provide: NOVO_OPTGROUP, useExisting: NovoOptgroup }],
                styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}.novo-optgroup-label{color:#707070;color:#9e9e9e;cursor:default;display:block;flex:1;font-size:1.1rem;font-weight:500;line-height:1.375;overflow-wrap:break-word;padding:5px 10px;text-transform:uppercase;transition:.2s ease-out;word-break:word-break}"]
            },] }
];
NovoOptgroup.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [NOVO_OPTION_PARENT_COMPONENT,] }, { type: Optional }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0Z3JvdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2NvbW1vbi9vcHRpb24vb3B0Z3JvdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxSSxPQUFPLEVBQThCLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JGLE9BQU8sRUFBNkIsNEJBQTRCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUxRiwrREFBK0Q7QUFDL0QsMkZBQTJGO0FBQzNGLGdHQUFnRztBQUNoRyxrR0FBa0c7QUFDbEcsNkZBQTZGO0FBQzdGLDBGQUEwRjtBQUMxRix5Q0FBeUM7QUFDekMsOEZBQThGO0FBQzlGLG1HQUFtRztBQUNuRyxpR0FBaUc7QUFDakcsbUdBQW1HO0FBQ25HLG1GQUFtRjtBQUNuRixvR0FBb0c7QUFDcEcsMkZBQTJGO0FBQzNGLHdCQUF3QjtBQUN4QixrR0FBa0c7QUFDbEcsNENBQTRDO0FBQzVDLGdHQUFnRztBQUNoRyx3REFBd0Q7QUFFeEQsbURBQW1EO0FBRW5ELE1BQU0sT0FBTyxnQkFBZ0I7SUFEN0I7UUFPRSwwQ0FBMEM7UUFDMUMsYUFBUSxHQUFXLHVCQUF1Qix3QkFBd0IsRUFBRSxFQUFFLENBQUM7SUFJekUsQ0FBQzs7O1lBWkEsU0FBUzs7O29CQUtQLEtBQUs7O0FBUVIsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQTZDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBRS9HLGdDQUFnQztBQUNoQyxJQUFJLHdCQUF3QixHQUFHLENBQUMsQ0FBQztBQUVqQzs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHLElBQUksY0FBYyxDQUFlLGNBQWMsQ0FBQyxDQUFDO0FBRTlFOztHQUVHO0FBa0JILE1BQU0sT0FBTyxZQUFhLFNBQVEscUJBQXFCO0lBQ3JELFlBQThELE1BQWtDOztRQUM5RixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxNQUFNLFNBQUcsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLFdBQVcsbUNBQUksS0FBSyxDQUFDO0lBQzdDLENBQUM7OztZQXJCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRSxjQUFjO2dCQUN4QixpTkFBc0M7Z0JBQ3RDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDO2dCQUVwQixJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLGVBQWU7b0JBQ3RCLGFBQWEsRUFBRSx5QkFBeUI7b0JBQ3hDLHNCQUFzQixFQUFFLHFDQUFxQztvQkFDN0Qsd0JBQXdCLEVBQUUsMEJBQTBCO29CQUNwRCxnQ0FBZ0MsRUFBRSxVQUFVO2lCQUM3QztnQkFDRCxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxDQUFDOzthQUNuRTs7OzRDQUVjLE1BQU0sU0FBQyw0QkFBNEIsY0FBRyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIERpcmVjdGl2ZSwgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbiwgSW5wdXQsIE9wdGlvbmFsLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuRGlzYWJsZSwgQ2FuRGlzYWJsZUN0b3IsIG1peGluRGlzYWJsZWQgfSBmcm9tICcuLi9taXhpbnMvZGlzYWJsZWQubWl4aW4nO1xuaW1wb3J0IHsgTm92b09wdGlvblBhcmVudENvbXBvbmVudCwgTk9WT19PUFRJT05fUEFSRU5UX0NPTVBPTkVOVCB9IGZyb20gJy4vb3B0aW9uLXBhcmVudCc7XG5cbi8vIE5vdGVzIG9uIHRoZSBhY2Nlc3NpYmlsaXR5IHBhdHRlcm4gdXNlZCBmb3IgYG5vdm8tb3B0Z3JvdXBgLlxuLy8gVGhlIG9wdGlvbiBncm91cCBoYXMgdHdvIGRpZmZlcmVudCBcIm1vZGVzXCI6IHJlZ3VsYXIgYW5kIGluZXJ0LiBUaGUgcmVndWxhciBtb2RlIHVzZXMgdGhlXG4vLyByZWNvbW1lbmRlZCBhMTF5IHBhdHRlcm4gd2hpY2ggaGFzIGByb2xlPVwiZ3JvdXBcImAgb24gdGhlIGdyb3VwIGVsZW1lbnQgd2l0aCBgYXJpYS1sYWJlbGxlZGJ5YFxuLy8gcG9pbnRpbmcgdG8gdGhlIGxhYmVsLiBUaGlzIHdvcmtzIGZvciBgbm92by1zZWxlY3RgLCBidXQgaXQgc2VlbXMgdG8gaGl0IGEgYnVnIGZvciBhdXRvY29tcGxldGVcbi8vIHVuZGVyIFZvaWNlT3ZlciB3aGVyZSB0aGUgZ3JvdXAgZG9lc24ndCBnZXQgcmVhZCBvdXQgYXQgYWxsLiBUaGUgYnVnIGFwcGVhcnMgdG8gYmUgdGhhdCBpZlxuLy8gdGhlcmUncyBfX2FueV9fIGExMXktcmVsYXRlZCBhdHRyaWJ1dGUgb24gdGhlIGdyb3VwIChlLmcuIGByb2xlYCBvciBgYXJpYS1sYWJlbGxlZGJ5YCksXG4vLyBWb2ljZU92ZXIgb24gU2FmYXJpIHdvbid0IHJlYWQgaXQgb3V0LlxuLy8gV2UndmUgaW50cm9kdWNlZCB0aGUgYGluZXJ0YCBtb2RlIGFzIGEgd29ya2Fyb3VuZC4gVW5kZXIgdGhpcyBtb2RlLCBhbGwgYTExeSBhdHRyaWJ1dGVzIGFyZVxuLy8gcmVtb3ZlZCBmcm9tIHRoZSBncm91cCwgYW5kIHdlIGdldCB0aGUgc2NyZWVuIHJlYWRlciB0byByZWFkIG91dCB0aGUgZ3JvdXAgbGFiZWwgYnkgbWlycm9yaW5nIGl0XG4vLyBpbnNpZGUgYW4gaW52aXNpYmxlIGVsZW1lbnQgaW4gdGhlIG9wdGlvbi4gVGhpcyBpcyBzdWItb3B0aW1hbCwgYmVjYXVzZSB0aGUgc2NyZWVuIHJlYWRlciB3aWxsXG4vLyByZXBlYXQgdGhlIGdyb3VwIGxhYmVsIG9uIGVhY2ggbmF2aWdhdGlvbiwgd2hlcmVhcyB0aGUgZGVmYXVsdCBwYXR0ZXJuIG9ubHkgcmVhZHMgdGhlIGdyb3VwIHdoZW5cbi8vIHRoZSB1c2VyIGVudGVycyBhIG5ldyBncm91cC4gVGhlIGZvbGxvd2luZyBhbHRlcm5hdGUgYXBwcm9hY2hlcyB3ZXJlIGNvbnNpZGVyZWQ6XG4vLyAxLiBSZWFkaW5nIG91dCB0aGUgZ3JvdXAgbGFiZWwgdXNpbmcgdGhlIGBMaXZlQW5ub3VuY2VyYCBzb2x2ZXMgdGhlIHByb2JsZW0sIGJ1dCB3ZSBjYW4ndCBjb250cm9sXG4vLyAgICB3aGVuIHRoZSB0ZXh0IHdpbGwgYmUgcmVhZCBvdXQgc28gc29tZXRpbWVzIGl0IGNvbWVzIGluIHRvbyBsYXRlIG9yIG5ldmVyIGlmIHRoZSB1c2VyXG4vLyAgICBuYXZpZ2F0ZXMgcXVpY2tseS5cbi8vIDIuIGA8bm92by1vcHRpb24gYXJpYS1kZXNjcmliZWRieT1cImdyb3VwTGFiZWxcImAgLSBUaGlzIHdvcmtzIG9uIFNhZmFyaSwgYnV0IFZvaWNlT3ZlciBpbiBDaHJvbWVcbi8vICAgIHdvbid0IHJlYWQgb3V0IHRoZSBkZXNjcmlwdGlvbiBhdCBhbGwuXG4vLyAzLiBgPG5vdm8tb3B0aW9uIGFyaWEtbGFiZWxsZWRieT1cIm9wdGlvbkxhYmVsIGdyb3VwTGFiZWxcImAgLSBUaGlzIHdvcmtzIG9uIENocm9tZSwgYnV0IFNhZmFyaVxuLy8gICAgIGRvZXNuJ3QgcmVhZCBvdXQgdGhlIHRleHQgYXQgYWxsLiBGdXJ0aGVybW9yZSwgb25cblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBOb3ZvT3B0Z3JvdXAuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBOb3ZvT3B0Z3JvdXBCYXNlIGltcGxlbWVudHMgQ2FuRGlzYWJsZSB7XG4gIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIC8qKiBMYWJlbCBmb3IgdGhlIG9wdGlvbiBncm91cC4gKi9cbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcblxuICAvKiogVW5pcXVlIGlkIGZvciB0aGUgdW5kZXJseWluZyBsYWJlbC4gKi9cbiAgX2xhYmVsSWQ6IHN0cmluZyA9IGBub3ZvLW9wdGdyb3VwLWxhYmVsLSR7X3VuaXF1ZU9wdGdyb3VwSWRDb3VudGVyKyt9YDtcblxuICAvKiogV2hldGhlciB0aGUgZ3JvdXAgaXMgaW4gaW5lcnQgYTExeSBtb2RlLiAqL1xuICBfaW5lcnQ6IGJvb2xlYW47XG59XG5leHBvcnQgY29uc3QgTm92b09wdGdyb3VwTWl4aW5CYXNlOiBDYW5EaXNhYmxlQ3RvciAmIHR5cGVvZiBOb3ZvT3B0Z3JvdXBCYXNlID0gbWl4aW5EaXNhYmxlZChOb3ZvT3B0Z3JvdXBCYXNlKTtcblxuLy8gQ291bnRlciBmb3IgdW5pcXVlIGdyb3VwIGlkcy5cbmxldCBfdW5pcXVlT3B0Z3JvdXBJZENvdW50ZXIgPSAwO1xuXG4vKipcbiAqIEluamVjdGlvbiB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlZmVyZW5jZSBpbnN0YW5jZXMgb2YgYE5vdm9PcHRncm91cGAuIEl0IHNlcnZlcyBhc1xuICogYWx0ZXJuYXRpdmUgdG9rZW4gdG8gdGhlIGFjdHVhbCBgTm92b09wdGdyb3VwYCBjbGFzcyB3aGljaCBjb3VsZCBjYXVzZSB1bm5lY2Vzc2FyeVxuICogcmV0ZW50aW9uIG9mIHRoZSBjbGFzcyBhbmQgaXRzIGNvbXBvbmVudCBtZXRhZGF0YS5cbiAqL1xuZXhwb3J0IGNvbnN0IE5PVk9fT1BUR1JPVVAgPSBuZXcgSW5qZWN0aW9uVG9rZW48Tm92b09wdGdyb3VwPignTm92b09wdGdyb3VwJyk7XG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgaXMgdXNlZCB0byBncm91cCBpbnN0YW5jZXMgb2YgYG5vdm8tb3B0aW9uYC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1vcHRncm91cCcsXG4gIGV4cG9ydEFzOiAnbm92b09wdGdyb3VwJyxcbiAgdGVtcGxhdGVVcmw6ICdvcHRncm91cC5jb21wb25lbnQuaHRtbCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgc3R5bGVVcmxzOiBbJ29wdGdyb3VwLmNvbXBvbmVudC5zY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tb3B0Z3JvdXAnLFxuICAgICdbYXR0ci5yb2xlXSc6ICdfaW5lcnQgPyBudWxsIDogXCJncm91cFwiJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnX2luZXJ0ID8gbnVsbCA6IGRpc2FibGVkLnRvU3RyaW5nKCknLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsbGVkYnldJzogJ19pbmVydCA/IG51bGwgOiBfbGFiZWxJZCcsXG4gICAgJ1tjbGFzcy5ub3ZvLW9wdGdyb3VwLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gIH0sXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTk9WT19PUFRHUk9VUCwgdXNlRXhpc3Rpbmc6IE5vdm9PcHRncm91cCB9XSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b09wdGdyb3VwIGV4dGVuZHMgTm92b09wdGdyb3VwTWl4aW5CYXNlIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChOT1ZPX09QVElPTl9QQVJFTlRfQ09NUE9ORU5UKSBAT3B0aW9uYWwoKSBwYXJlbnQ/OiBOb3ZvT3B0aW9uUGFyZW50Q29tcG9uZW50KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9pbmVydCA9IHBhcmVudD8uaW5lcnRHcm91cHMgPz8gZmFsc2U7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==