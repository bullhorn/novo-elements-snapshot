// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoOverlayModule } from '../common/overlay/Overlay.module';
import { NovoIconModule } from '../icon';
import { NovoPickerModule } from './../picker/Picker.module';
import { NovoTooltipModule } from './../tooltip/Tooltip.module';
import { NovoSearchBoxElement } from './SearchBox';
import * as i0 from "@angular/core";
export class NovoSearchBoxModule {
}
NovoSearchBoxModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoSearchBoxModule });
NovoSearchBoxModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoSearchBoxModule_Factory(t) { return new (t || NovoSearchBoxModule)(); }, imports: [[CommonModule, NovoIconModule, NovoPickerModule, NovoTooltipModule, NovoOverlayModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoSearchBoxModule, { declarations: [NovoSearchBoxElement], imports: [CommonModule, NovoIconModule, NovoPickerModule, NovoTooltipModule, NovoOverlayModule], exports: [NovoSearchBoxElement] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoSearchBoxModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, NovoIconModule, NovoPickerModule, NovoTooltipModule, NovoOverlayModule],
                declarations: [NovoSearchBoxElement],
                exports: [NovoSearchBoxElement],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VhcmNoQm94Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9zZWFyY2gvU2VhcmNoQm94Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsTUFBTTtBQUNOLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDekMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDaEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sYUFBYSxDQUFDOztBQU1uRCxNQUFNLE9BQU8sbUJBQW1COzt1REFBbkIsbUJBQW1CO3FIQUFuQixtQkFBbUIsa0JBSnJCLENBQUMsWUFBWSxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQzt3RkFJcEYsbUJBQW1CLG1CQUhmLG9CQUFvQixhQUR6QixZQUFZLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixhQUVwRixvQkFBb0I7a0RBRW5CLG1CQUFtQjtjQUwvQixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQztnQkFDL0YsWUFBWSxFQUFFLENBQUMsb0JBQW9CLENBQUM7Z0JBQ3BDLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixDQUFDO2FBQ2hDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEFQUFxuaW1wb3J0IHsgTm92b092ZXJsYXlNb2R1bGUgfSBmcm9tICcuLi9jb21tb24vb3ZlcmxheS9PdmVybGF5Lm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvSWNvbk1vZHVsZSB9IGZyb20gJy4uL2ljb24nO1xuaW1wb3J0IHsgTm92b1BpY2tlck1vZHVsZSB9IGZyb20gJy4vLi4vcGlja2VyL1BpY2tlci5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1Rvb2x0aXBNb2R1bGUgfSBmcm9tICcuLy4uL3Rvb2x0aXAvVG9vbHRpcC5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1NlYXJjaEJveEVsZW1lbnQgfSBmcm9tICcuL1NlYXJjaEJveCc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBOb3ZvSWNvbk1vZHVsZSwgTm92b1BpY2tlck1vZHVsZSwgTm92b1Rvb2x0aXBNb2R1bGUsIE5vdm9PdmVybGF5TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTm92b1NlYXJjaEJveEVsZW1lbnRdLFxuICBleHBvcnRzOiBbTm92b1NlYXJjaEJveEVsZW1lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvU2VhcmNoQm94TW9kdWxlIHt9XG4iXX0=