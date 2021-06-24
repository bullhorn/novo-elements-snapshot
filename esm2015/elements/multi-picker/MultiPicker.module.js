// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// APP
import { NovoPickerModule } from './../picker/Picker.module';
import { NovoChipsModule } from './../chips/Chips.module';
import { NovoMultiPickerElement } from './MultiPicker';
import * as i0 from "@angular/core";
export class NovoMultiPickerModule {
}
NovoMultiPickerModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoMultiPickerModule });
NovoMultiPickerModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoMultiPickerModule_Factory(t) { return new (t || NovoMultiPickerModule)(); }, imports: [[CommonModule, FormsModule, NovoPickerModule, NovoChipsModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoMultiPickerModule, { declarations: [NovoMultiPickerElement], imports: [CommonModule, FormsModule, NovoPickerModule, NovoChipsModule], exports: [NovoMultiPickerElement] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoMultiPickerModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, FormsModule, NovoPickerModule, NovoChipsModule],
                declarations: [NovoMultiPickerElement],
                exports: [NovoMultiPickerElement],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXVsdGlQaWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL211bHRpLXBpY2tlci9NdWx0aVBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzFELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFPdkQsTUFBTSxPQUFPLHFCQUFxQjs7eURBQXJCLHFCQUFxQjt5SEFBckIscUJBQXFCLGtCQUp2QixDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxDQUFDO3dGQUk1RCxxQkFBcUIsbUJBSGpCLHNCQUFzQixhQUQzQixZQUFZLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsYUFFNUQsc0JBQXNCO2tEQUVyQixxQkFBcUI7Y0FMakMsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxDQUFDO2dCQUN2RSxZQUFZLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztnQkFDdEMsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7YUFDbEMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9QaWNrZXJNb2R1bGUgfSBmcm9tICcuLy4uL3BpY2tlci9QaWNrZXIubW9kdWxlJztcbmltcG9ydCB7IE5vdm9DaGlwc01vZHVsZSB9IGZyb20gJy4vLi4vY2hpcHMvQ2hpcHMubW9kdWxlJztcbmltcG9ydCB7IE5vdm9NdWx0aVBpY2tlckVsZW1lbnQgfSBmcm9tICcuL011bHRpUGlja2VyJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIE5vdm9QaWNrZXJNb2R1bGUsIE5vdm9DaGlwc01vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW05vdm9NdWx0aVBpY2tlckVsZW1lbnRdLFxuICBleHBvcnRzOiBbTm92b011bHRpUGlja2VyRWxlbWVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9NdWx0aVBpY2tlck1vZHVsZSB7fVxuIl19