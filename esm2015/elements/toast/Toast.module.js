// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoButtonModule } from '../button';
// APP
import { NovoToastElement } from './Toast';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../button/Button";
export class NovoToastModule {
}
NovoToastModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoToastModule });
NovoToastModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoToastModule_Factory(t) { return new (t || NovoToastModule)(); }, imports: [[CommonModule, NovoButtonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoToastModule, { declarations: [NovoToastElement], imports: [CommonModule, NovoButtonModule], exports: [NovoToastElement] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoToastModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, NovoButtonModule],
                declarations: [NovoToastElement],
                exports: [NovoToastElement],
            }]
    }], null, null); })();
i0.ɵɵsetComponentScope(NovoToastElement, [i1.NgClass, i1.NgComponentOutlet, i1.NgForOf, i1.NgIf, i1.NgTemplateOutlet, i1.NgStyle, i1.NgSwitch, i1.NgSwitchCase, i1.NgSwitchDefault, i1.NgPlural, i1.NgPluralCase, i2.NovoButtonElement, NovoToastElement], [i1.AsyncPipe, i1.UpperCasePipe, i1.LowerCasePipe, i1.JsonPipe, i1.SlicePipe, i1.DecimalPipe, i1.PercentPipe, i1.TitleCasePipe, i1.CurrencyPipe, i1.DatePipe, i1.I18nPluralPipe, i1.I18nSelectPipe, i1.KeyValuePipe]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9hc3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3RvYXN0L1RvYXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzdDLE1BQU07QUFDTixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxTQUFTLENBQUM7Ozs7QUFPM0MsTUFBTSxPQUFPLGVBQWU7O21EQUFmLGVBQWU7NkdBQWYsZUFBZSxrQkFKakIsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLENBQUM7d0ZBSTlCLGVBQWUsbUJBSFgsZ0JBQWdCLGFBRHJCLFlBQVksRUFBRSxnQkFBZ0IsYUFFOUIsZ0JBQWdCO2tEQUVmLGVBQWU7Y0FMM0IsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQztnQkFDekMsWUFBWSxFQUFFLENBQUMsZ0JBQWdCLENBQUM7Z0JBQ2hDLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDO2FBQzVCOzt1QkFGZ0IsZ0JBQWdCLGlNQUFoQixnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0J1dHRvbk1vZHVsZSB9IGZyb20gJy4uL2J1dHRvbic7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9Ub2FzdEVsZW1lbnQgfSBmcm9tICcuL1RvYXN0JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTm92b0J1dHRvbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW05vdm9Ub2FzdEVsZW1lbnRdLFxuICBleHBvcnRzOiBbTm92b1RvYXN0RWxlbWVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Ub2FzdE1vZHVsZSB7fVxuIl19