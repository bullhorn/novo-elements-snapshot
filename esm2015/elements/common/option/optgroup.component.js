import { ChangeDetectionStrategy, Component, Directive, Inject, InjectionToken, Input, Optional, ViewEncapsulation } from '@angular/core';
import { mixinDisabled } from '../mixins/disabled.mixin';
import { NOVO_OPTION_PARENT_COMPONENT } from './option-parent';
import * as i0 from "@angular/core";
const _c0 = ["*", [["novo-option"], ["ng-container"], ["novo-divider"]]];
const _c1 = ["*", "novo-option, ng-container, novo-divider"];
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
NovoOptgroupBase.ɵfac = function NovoOptgroupBase_Factory(t) { return new (t || NovoOptgroupBase)(); };
NovoOptgroupBase.ɵdir = i0.ɵɵdefineDirective({ type: NovoOptgroupBase, inputs: { label: "label" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoOptgroupBase, [{
        type: Directive
    }], null, { label: [{
            type: Input
        }] }); })();
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
NovoOptgroup.ɵfac = function NovoOptgroup_Factory(t) { return new (t || NovoOptgroup)(i0.ɵɵdirectiveInject(NOVO_OPTION_PARENT_COMPONENT, 8)); };
NovoOptgroup.ɵcmp = i0.ɵɵdefineComponent({ type: NovoOptgroup, selectors: [["novo-optgroup"]], hostAttrs: [1, "novo-optgroup"], hostVars: 5, hostBindings: function NovoOptgroup_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵattribute("role", ctx._inert ? null : "group")("aria-disabled", ctx._inert ? null : ctx.disabled.toString())("aria-labelledby", ctx._inert ? null : ctx._labelId);
        i0.ɵɵclassProp("novo-optgroup-disabled", ctx.disabled);
    } }, inputs: { disabled: "disabled" }, exportAs: ["novoOptgroup"], features: [i0.ɵɵProvidersFeature([{ provide: NOVO_OPTGROUP, useExisting: NovoOptgroup }]), i0.ɵɵInheritDefinitionFeature], ngContentSelectors: _c1, decls: 4, vars: 2, consts: [["aria-hidden", "true", 1, "novo-optgroup-label", 3, "id"]], template: function NovoOptgroup_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef(_c0);
        i0.ɵɵelementStart(0, "span", 0);
        i0.ɵɵtext(1);
        i0.ɵɵprojection(2);
        i0.ɵɵelementEnd();
        i0.ɵɵprojection(3, 1);
    } if (rf & 2) {
        i0.ɵɵproperty("id", ctx._labelId);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1("", ctx.label, " ");
    } }, styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}.novo-optgroup-label{color:#707070;color:#999;cursor:default;display:inline;display:block;flex:1;font-size:1.1rem;font-weight:500;line-height:1.2rem;overflow-wrap:break-word;padding:5px 10px;text-transform:uppercase;transition:.2s ease-out;word-break:word-break}div.filter-search input{background:transparent;border:none;border-bottom:2px solid #bebebe;margin:0 auto;width:90%}div.filter-search input:focus{border-bottom:2px solid #4a89dc;outline:none}div.filter-search input:focus~i.bhi-search{color:#4a89dc}"], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoOptgroup, [{
        type: Component,
        args: [{
                selector: 'novo-optgroup',
                exportAs: 'novoOptgroup',
                templateUrl: 'optgroup.component.html',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                inputs: ['disabled'],
                styleUrls: ['optgroup.component.scss'],
                host: {
                    class: 'novo-optgroup',
                    '[attr.role]': '_inert ? null : "group"',
                    '[attr.aria-disabled]': '_inert ? null : disabled.toString()',
                    '[attr.aria-labelledby]': '_inert ? null : _labelId',
                    '[class.novo-optgroup-disabled]': 'disabled',
                },
                providers: [{ provide: NOVO_OPTGROUP, useExisting: NovoOptgroup }],
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [NOVO_OPTION_PARENT_COMPONENT]
            }, {
                type: Optional
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0Z3JvdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NvbW1vbi9vcHRpb24vb3B0Z3JvdXAuY29tcG9uZW50LnRzIiwiZWxlbWVudHMvY29tbW9uL29wdGlvbi9vcHRncm91cC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUksT0FBTyxFQUE4QixhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNyRixPQUFPLEVBQTZCLDRCQUE0QixFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFFMUYsK0RBQStEO0FBQy9ELDJGQUEyRjtBQUMzRixnR0FBZ0c7QUFDaEcsa0dBQWtHO0FBQ2xHLDZGQUE2RjtBQUM3RiwwRkFBMEY7QUFDMUYseUNBQXlDO0FBQ3pDLDhGQUE4RjtBQUM5RixtR0FBbUc7QUFDbkcsaUdBQWlHO0FBQ2pHLG1HQUFtRztBQUNuRyxtRkFBbUY7QUFDbkYsb0dBQW9HO0FBQ3BHLDJGQUEyRjtBQUMzRix3QkFBd0I7QUFDeEIsa0dBQWtHO0FBQ2xHLDRDQUE0QztBQUM1QyxnR0FBZ0c7QUFDaEcsd0RBQXdEO0FBRXhELG1EQUFtRDtBQUVuRCxNQUFNLE9BQU8sZ0JBQWdCO0lBRDdCO1FBT0UsMENBQTBDO1FBQzFDLGFBQVEsR0FBVyx1QkFBdUIsd0JBQXdCLEVBQUUsRUFBRSxDQUFDO0tBSXhFOztnRkFYWSxnQkFBZ0I7cURBQWhCLGdCQUFnQjtrREFBaEIsZ0JBQWdCO2NBRDVCLFNBQVM7Z0JBS0MsS0FBSztrQkFBYixLQUFLOztBQVFSLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUE2QyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUUvRyxnQ0FBZ0M7QUFDaEMsSUFBSSx3QkFBd0IsR0FBRyxDQUFDLENBQUM7QUFFakM7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxJQUFJLGNBQWMsQ0FBZSxjQUFjLENBQUMsQ0FBQztBQUU5RTs7R0FFRztBQWtCSCxNQUFNLE9BQU8sWUFBYSxTQUFRLHFCQUFxQjtJQUNyRCxZQUE4RCxNQUFrQzs7UUFDOUYsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsTUFBTSxTQUFHLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxXQUFXLG1DQUFJLEtBQUssQ0FBQztJQUM3QyxDQUFDOzt3RUFKVSxZQUFZLHVCQUNILDRCQUE0QjtpREFEckMsWUFBWTs7O3dHQUZaLENBQUMsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsQ0FBQzs7UUNyRXBFLCtCQUFxRTtRQUFBLFlBQVk7UUFBQSxrQkFBWTtRQUFhLGlCQUFPO1FBQ2pILHFCQUE2RDs7UUFEUixpQ0FBZTtRQUFDLGVBQVk7UUFBWix5Q0FBWTs7a0REdUVwRSxZQUFZO2NBakJ4QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRSxjQUFjO2dCQUN4QixXQUFXLEVBQUUseUJBQXlCO2dCQUN0QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQztnQkFDcEIsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7Z0JBQ3RDLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsZUFBZTtvQkFDdEIsYUFBYSxFQUFFLHlCQUF5QjtvQkFDeEMsc0JBQXNCLEVBQUUscUNBQXFDO29CQUM3RCx3QkFBd0IsRUFBRSwwQkFBMEI7b0JBQ3BELGdDQUFnQyxFQUFFLFVBQVU7aUJBQzdDO2dCQUNELFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLENBQUM7YUFDbkU7O3NCQUVjLE1BQU07dUJBQUMsNEJBQTRCOztzQkFBRyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIERpcmVjdGl2ZSwgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbiwgSW5wdXQsIE9wdGlvbmFsLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuRGlzYWJsZSwgQ2FuRGlzYWJsZUN0b3IsIG1peGluRGlzYWJsZWQgfSBmcm9tICcuLi9taXhpbnMvZGlzYWJsZWQubWl4aW4nO1xuaW1wb3J0IHsgTm92b09wdGlvblBhcmVudENvbXBvbmVudCwgTk9WT19PUFRJT05fUEFSRU5UX0NPTVBPTkVOVCB9IGZyb20gJy4vb3B0aW9uLXBhcmVudCc7XG5cbi8vIE5vdGVzIG9uIHRoZSBhY2Nlc3NpYmlsaXR5IHBhdHRlcm4gdXNlZCBmb3IgYG5vdm8tb3B0Z3JvdXBgLlxuLy8gVGhlIG9wdGlvbiBncm91cCBoYXMgdHdvIGRpZmZlcmVudCBcIm1vZGVzXCI6IHJlZ3VsYXIgYW5kIGluZXJ0LiBUaGUgcmVndWxhciBtb2RlIHVzZXMgdGhlXG4vLyByZWNvbW1lbmRlZCBhMTF5IHBhdHRlcm4gd2hpY2ggaGFzIGByb2xlPVwiZ3JvdXBcImAgb24gdGhlIGdyb3VwIGVsZW1lbnQgd2l0aCBgYXJpYS1sYWJlbGxlZGJ5YFxuLy8gcG9pbnRpbmcgdG8gdGhlIGxhYmVsLiBUaGlzIHdvcmtzIGZvciBgbm92by1zZWxlY3RgLCBidXQgaXQgc2VlbXMgdG8gaGl0IGEgYnVnIGZvciBhdXRvY29tcGxldGVcbi8vIHVuZGVyIFZvaWNlT3ZlciB3aGVyZSB0aGUgZ3JvdXAgZG9lc24ndCBnZXQgcmVhZCBvdXQgYXQgYWxsLiBUaGUgYnVnIGFwcGVhcnMgdG8gYmUgdGhhdCBpZlxuLy8gdGhlcmUncyBfX2FueV9fIGExMXktcmVsYXRlZCBhdHRyaWJ1dGUgb24gdGhlIGdyb3VwIChlLmcuIGByb2xlYCBvciBgYXJpYS1sYWJlbGxlZGJ5YCksXG4vLyBWb2ljZU92ZXIgb24gU2FmYXJpIHdvbid0IHJlYWQgaXQgb3V0LlxuLy8gV2UndmUgaW50cm9kdWNlZCB0aGUgYGluZXJ0YCBtb2RlIGFzIGEgd29ya2Fyb3VuZC4gVW5kZXIgdGhpcyBtb2RlLCBhbGwgYTExeSBhdHRyaWJ1dGVzIGFyZVxuLy8gcmVtb3ZlZCBmcm9tIHRoZSBncm91cCwgYW5kIHdlIGdldCB0aGUgc2NyZWVuIHJlYWRlciB0byByZWFkIG91dCB0aGUgZ3JvdXAgbGFiZWwgYnkgbWlycm9yaW5nIGl0XG4vLyBpbnNpZGUgYW4gaW52aXNpYmxlIGVsZW1lbnQgaW4gdGhlIG9wdGlvbi4gVGhpcyBpcyBzdWItb3B0aW1hbCwgYmVjYXVzZSB0aGUgc2NyZWVuIHJlYWRlciB3aWxsXG4vLyByZXBlYXQgdGhlIGdyb3VwIGxhYmVsIG9uIGVhY2ggbmF2aWdhdGlvbiwgd2hlcmVhcyB0aGUgZGVmYXVsdCBwYXR0ZXJuIG9ubHkgcmVhZHMgdGhlIGdyb3VwIHdoZW5cbi8vIHRoZSB1c2VyIGVudGVycyBhIG5ldyBncm91cC4gVGhlIGZvbGxvd2luZyBhbHRlcm5hdGUgYXBwcm9hY2hlcyB3ZXJlIGNvbnNpZGVyZWQ6XG4vLyAxLiBSZWFkaW5nIG91dCB0aGUgZ3JvdXAgbGFiZWwgdXNpbmcgdGhlIGBMaXZlQW5ub3VuY2VyYCBzb2x2ZXMgdGhlIHByb2JsZW0sIGJ1dCB3ZSBjYW4ndCBjb250cm9sXG4vLyAgICB3aGVuIHRoZSB0ZXh0IHdpbGwgYmUgcmVhZCBvdXQgc28gc29tZXRpbWVzIGl0IGNvbWVzIGluIHRvbyBsYXRlIG9yIG5ldmVyIGlmIHRoZSB1c2VyXG4vLyAgICBuYXZpZ2F0ZXMgcXVpY2tseS5cbi8vIDIuIGA8bm92by1vcHRpb24gYXJpYS1kZXNjcmliZWRieT1cImdyb3VwTGFiZWxcImAgLSBUaGlzIHdvcmtzIG9uIFNhZmFyaSwgYnV0IFZvaWNlT3ZlciBpbiBDaHJvbWVcbi8vICAgIHdvbid0IHJlYWQgb3V0IHRoZSBkZXNjcmlwdGlvbiBhdCBhbGwuXG4vLyAzLiBgPG5vdm8tb3B0aW9uIGFyaWEtbGFiZWxsZWRieT1cIm9wdGlvbkxhYmVsIGdyb3VwTGFiZWxcImAgLSBUaGlzIHdvcmtzIG9uIENocm9tZSwgYnV0IFNhZmFyaVxuLy8gICAgIGRvZXNuJ3QgcmVhZCBvdXQgdGhlIHRleHQgYXQgYWxsLiBGdXJ0aGVybW9yZSwgb25cblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBOb3ZvT3B0Z3JvdXAuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBOb3ZvT3B0Z3JvdXBCYXNlIGltcGxlbWVudHMgQ2FuRGlzYWJsZSB7XG4gIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIC8qKiBMYWJlbCBmb3IgdGhlIG9wdGlvbiBncm91cC4gKi9cbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcblxuICAvKiogVW5pcXVlIGlkIGZvciB0aGUgdW5kZXJseWluZyBsYWJlbC4gKi9cbiAgX2xhYmVsSWQ6IHN0cmluZyA9IGBub3ZvLW9wdGdyb3VwLWxhYmVsLSR7X3VuaXF1ZU9wdGdyb3VwSWRDb3VudGVyKyt9YDtcblxuICAvKiogV2hldGhlciB0aGUgZ3JvdXAgaXMgaW4gaW5lcnQgYTExeSBtb2RlLiAqL1xuICBfaW5lcnQ6IGJvb2xlYW47XG59XG5leHBvcnQgY29uc3QgTm92b09wdGdyb3VwTWl4aW5CYXNlOiBDYW5EaXNhYmxlQ3RvciAmIHR5cGVvZiBOb3ZvT3B0Z3JvdXBCYXNlID0gbWl4aW5EaXNhYmxlZChOb3ZvT3B0Z3JvdXBCYXNlKTtcblxuLy8gQ291bnRlciBmb3IgdW5pcXVlIGdyb3VwIGlkcy5cbmxldCBfdW5pcXVlT3B0Z3JvdXBJZENvdW50ZXIgPSAwO1xuXG4vKipcbiAqIEluamVjdGlvbiB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlZmVyZW5jZSBpbnN0YW5jZXMgb2YgYE5vdm9PcHRncm91cGAuIEl0IHNlcnZlcyBhc1xuICogYWx0ZXJuYXRpdmUgdG9rZW4gdG8gdGhlIGFjdHVhbCBgTm92b09wdGdyb3VwYCBjbGFzcyB3aGljaCBjb3VsZCBjYXVzZSB1bm5lY2Vzc2FyeVxuICogcmV0ZW50aW9uIG9mIHRoZSBjbGFzcyBhbmQgaXRzIGNvbXBvbmVudCBtZXRhZGF0YS5cbiAqL1xuZXhwb3J0IGNvbnN0IE5PVk9fT1BUR1JPVVAgPSBuZXcgSW5qZWN0aW9uVG9rZW48Tm92b09wdGdyb3VwPignTm92b09wdGdyb3VwJyk7XG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgaXMgdXNlZCB0byBncm91cCBpbnN0YW5jZXMgb2YgYG5vdm8tb3B0aW9uYC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1vcHRncm91cCcsXG4gIGV4cG9ydEFzOiAnbm92b09wdGdyb3VwJyxcbiAgdGVtcGxhdGVVcmw6ICdvcHRncm91cC5jb21wb25lbnQuaHRtbCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgc3R5bGVVcmxzOiBbJ29wdGdyb3VwLmNvbXBvbmVudC5zY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tb3B0Z3JvdXAnLFxuICAgICdbYXR0ci5yb2xlXSc6ICdfaW5lcnQgPyBudWxsIDogXCJncm91cFwiJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnX2luZXJ0ID8gbnVsbCA6IGRpc2FibGVkLnRvU3RyaW5nKCknLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsbGVkYnldJzogJ19pbmVydCA/IG51bGwgOiBfbGFiZWxJZCcsXG4gICAgJ1tjbGFzcy5ub3ZvLW9wdGdyb3VwLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gIH0sXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTk9WT19PUFRHUk9VUCwgdXNlRXhpc3Rpbmc6IE5vdm9PcHRncm91cCB9XSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b09wdGdyb3VwIGV4dGVuZHMgTm92b09wdGdyb3VwTWl4aW5CYXNlIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChOT1ZPX09QVElPTl9QQVJFTlRfQ09NUE9ORU5UKSBAT3B0aW9uYWwoKSBwYXJlbnQ/OiBOb3ZvT3B0aW9uUGFyZW50Q29tcG9uZW50KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9pbmVydCA9IHBhcmVudD8uaW5lcnRHcm91cHMgPz8gZmFsc2U7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cbiIsIjxzcGFuIGNsYXNzPVwibm92by1vcHRncm91cC1sYWJlbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIFtpZF09XCJfbGFiZWxJZFwiPnt7IGxhYmVsIH19IDxuZy1jb250ZW50PjwvbmctY29udGVudD48L3NwYW4+XG48bmctY29udGVudCBzZWxlY3Q9XCJub3ZvLW9wdGlvbiwgbmctY29udGFpbmVyLCBub3ZvLWRpdmlkZXJcIj48L25nLWNvbnRlbnQ+Il19