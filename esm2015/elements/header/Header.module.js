import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoButtonModule } from './../button/Button.module';
import { NovoCommonModule } from './../common/common.module';
import { NovoIconModule } from './../icon/Icon.module';
import { NovoHeaderComponent, NovoHeaderSpacer, NovoUtilActionComponent, NovoUtilsComponent } from './Header';
import * as i0 from "@angular/core";
export class NovoHeaderModule {
}
NovoHeaderModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoHeaderModule });
NovoHeaderModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoHeaderModule_Factory(t) { return new (t || NovoHeaderModule)(); }, imports: [[CommonModule, NovoCommonModule, NovoIconModule, NovoButtonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoHeaderModule, { declarations: [NovoHeaderComponent, NovoUtilActionComponent, NovoUtilsComponent, NovoHeaderSpacer], imports: [CommonModule, NovoCommonModule, NovoIconModule, NovoButtonModule], exports: [NovoHeaderComponent, NovoUtilActionComponent, NovoUtilsComponent, NovoHeaderSpacer] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoHeaderModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, NovoCommonModule, NovoIconModule, NovoButtonModule],
                declarations: [NovoHeaderComponent, NovoUtilActionComponent, NovoUtilsComponent, NovoHeaderSpacer],
                exports: [NovoHeaderComponent, NovoUtilActionComponent, NovoUtilsComponent, NovoHeaderSpacer],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVhZGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9oZWFkZXIvSGVhZGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLGdCQUFnQixFQUFFLHVCQUF1QixFQUFFLGtCQUFrQixFQUFFLE1BQU0sVUFBVSxDQUFDOztBQU85RyxNQUFNLE9BQU8sZ0JBQWdCOztvREFBaEIsZ0JBQWdCOytHQUFoQixnQkFBZ0Isa0JBSmxCLENBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQzt3RkFJaEUsZ0JBQWdCLG1CQUhaLG1CQUFtQixFQUFFLHVCQUF1QixFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixhQUR2RixZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixhQUVoRSxtQkFBbUIsRUFBRSx1QkFBdUIsRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0I7a0RBRWpGLGdCQUFnQjtjQUw1QixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQztnQkFDM0UsWUFBWSxFQUFFLENBQUMsbUJBQW1CLEVBQUUsdUJBQXVCLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLENBQUM7Z0JBQ2xHLE9BQU8sRUFBRSxDQUFDLG1CQUFtQixFQUFFLHVCQUF1QixFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixDQUFDO2FBQzlGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi8uLi9idXR0b24vQnV0dG9uLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvQ29tbW9uTW9kdWxlIH0gZnJvbSAnLi8uLi9jb21tb24vY29tbW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvSWNvbk1vZHVsZSB9IGZyb20gJy4vLi4vaWNvbi9JY29uLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvSGVhZGVyQ29tcG9uZW50LCBOb3ZvSGVhZGVyU3BhY2VyLCBOb3ZvVXRpbEFjdGlvbkNvbXBvbmVudCwgTm92b1V0aWxzQ29tcG9uZW50IH0gZnJvbSAnLi9IZWFkZXInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBOb3ZvQ29tbW9uTW9kdWxlLCBOb3ZvSWNvbk1vZHVsZSwgTm92b0J1dHRvbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW05vdm9IZWFkZXJDb21wb25lbnQsIE5vdm9VdGlsQWN0aW9uQ29tcG9uZW50LCBOb3ZvVXRpbHNDb21wb25lbnQsIE5vdm9IZWFkZXJTcGFjZXJdLFxuICBleHBvcnRzOiBbTm92b0hlYWRlckNvbXBvbmVudCwgTm92b1V0aWxBY3Rpb25Db21wb25lbnQsIE5vdm9VdGlsc0NvbXBvbmVudCwgTm92b0hlYWRlclNwYWNlcl0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9IZWFkZXJNb2R1bGUge31cbiJdfQ==