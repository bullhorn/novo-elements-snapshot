// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoButtonModule } from '../button/Button.module';
import { NovoRadioElement } from './Radio';
import { NovoRadioGroup } from './RadioGroup';
import * as i0 from "@angular/core";
export class NovoRadioModule {
}
NovoRadioModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoRadioModule });
NovoRadioModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoRadioModule_Factory(t) { return new (t || NovoRadioModule)(); }, imports: [[CommonModule, NovoButtonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoRadioModule, { declarations: [NovoRadioElement, NovoRadioGroup], imports: [CommonModule, NovoButtonModule], exports: [NovoRadioElement, NovoRadioGroup] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoRadioModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, NovoButtonModule],
                declarations: [NovoRadioElement, NovoRadioGroup],
                exports: [NovoRadioElement, NovoRadioGroup],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFkaW8ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3JhZGlvL1JhZGlvLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsTUFBTTtBQUNOLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUMzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sY0FBYyxDQUFDOztBQU85QyxNQUFNLE9BQU8sZUFBZTs7bURBQWYsZUFBZTs2R0FBZixlQUFlLGtCQUpqQixDQUFDLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQzt3RkFJOUIsZUFBZSxtQkFIWCxnQkFBZ0IsRUFBRSxjQUFjLGFBRHJDLFlBQVksRUFBRSxnQkFBZ0IsYUFFOUIsZ0JBQWdCLEVBQUUsY0FBYztrREFFL0IsZUFBZTtjQUwzQixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDO2dCQUN6QyxZQUFZLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxjQUFjLENBQUM7Z0JBQ2hELE9BQU8sRUFBRSxDQUFDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQzthQUM1QyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9CdXR0b25Nb2R1bGUgfSBmcm9tICcuLi9idXR0b24vQnV0dG9uLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvUmFkaW9FbGVtZW50IH0gZnJvbSAnLi9SYWRpbyc7XG5pbXBvcnQgeyBOb3ZvUmFkaW9Hcm91cCB9IGZyb20gJy4vUmFkaW9Hcm91cCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE5vdm9CdXR0b25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtOb3ZvUmFkaW9FbGVtZW50LCBOb3ZvUmFkaW9Hcm91cF0sXG4gIGV4cG9ydHM6IFtOb3ZvUmFkaW9FbGVtZW50LCBOb3ZvUmFkaW9Hcm91cF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9SYWRpb01vZHVsZSB7fVxuIl19