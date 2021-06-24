// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
// APP
import { NovoOverlayModule } from '../overlay/Overlay.module';
import { NovoDatePickerElement } from './DatePicker';
import { NovoDatePickerInputElement } from './DatePickerInput';
import * as i0 from "@angular/core";
export class NovoDatePickerModule {
}
NovoDatePickerModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoDatePickerModule });
NovoDatePickerModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoDatePickerModule_Factory(t) { return new (t || NovoDatePickerModule)(); }, imports: [[CommonModule, FormsModule, NovoOverlayModule, TextMaskModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoDatePickerModule, { declarations: [NovoDatePickerElement, NovoDatePickerInputElement], imports: [CommonModule, FormsModule, NovoOverlayModule, TextMaskModule], exports: [NovoDatePickerElement, NovoDatePickerInputElement] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoDatePickerModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, FormsModule, NovoOverlayModule, TextMaskModule],
                declarations: [NovoDatePickerElement, NovoDatePickerInputElement],
                exports: [NovoDatePickerElement, NovoDatePickerInputElement],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZGF0ZS1waWNrZXIvRGF0ZVBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxTQUFTO0FBQ1QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE1BQU07QUFDTixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM5RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDckQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0FBTy9ELE1BQU0sT0FBTyxvQkFBb0I7O3dEQUFwQixvQkFBb0I7dUhBQXBCLG9CQUFvQixrQkFKdEIsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLGNBQWMsQ0FBQzt3RkFJNUQsb0JBQW9CLG1CQUhoQixxQkFBcUIsRUFBRSwwQkFBMEIsYUFEdEQsWUFBWSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLGFBRTVELHFCQUFxQixFQUFFLDBCQUEwQjtrREFFaEQsb0JBQW9CO2NBTGhDLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLGNBQWMsQ0FBQztnQkFDdkUsWUFBWSxFQUFFLENBQUMscUJBQXFCLEVBQUUsMEJBQTBCLENBQUM7Z0JBQ2pFLE9BQU8sRUFBRSxDQUFDLHFCQUFxQixFQUFFLDBCQUEwQixDQUFDO2FBQzdEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuLy8gVmVuZG9yXG5pbXBvcnQgeyBUZXh0TWFza01vZHVsZSB9IGZyb20gJ2FuZ3VsYXIyLXRleHQtbWFzayc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9PdmVybGF5TW9kdWxlIH0gZnJvbSAnLi4vb3ZlcmxheS9PdmVybGF5Lm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvRGF0ZVBpY2tlckVsZW1lbnQgfSBmcm9tICcuL0RhdGVQaWNrZXInO1xuaW1wb3J0IHsgTm92b0RhdGVQaWNrZXJJbnB1dEVsZW1lbnQgfSBmcm9tICcuL0RhdGVQaWNrZXJJbnB1dCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBOb3ZvT3ZlcmxheU1vZHVsZSwgVGV4dE1hc2tNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtOb3ZvRGF0ZVBpY2tlckVsZW1lbnQsIE5vdm9EYXRlUGlja2VySW5wdXRFbGVtZW50XSxcbiAgZXhwb3J0czogW05vdm9EYXRlUGlja2VyRWxlbWVudCwgTm92b0RhdGVQaWNrZXJJbnB1dEVsZW1lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGF0ZVBpY2tlck1vZHVsZSB7fVxuIl19