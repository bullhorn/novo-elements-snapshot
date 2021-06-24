// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
// APP
import { NovoOverlayModule } from '../overlay/Overlay.module';
import { NovoDateTimePickerElement } from './DateTimePicker';
import { NovoDateTimePickerInputElement } from './DateTimePickerInput';
import { NovoDatePickerModule } from '../date-picker/DatePicker.module';
import { NovoTimePickerModule } from '../time-picker/TimePicker.module';
import * as i0 from "@angular/core";
export class NovoDateTimePickerModule {
}
NovoDateTimePickerModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoDateTimePickerModule });
NovoDateTimePickerModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoDateTimePickerModule_Factory(t) { return new (t || NovoDateTimePickerModule)(); }, imports: [[CommonModule, FormsModule, NovoDatePickerModule, NovoTimePickerModule, TextMaskModule, NovoOverlayModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoDateTimePickerModule, { declarations: [NovoDateTimePickerElement, NovoDateTimePickerInputElement], imports: [CommonModule, FormsModule, NovoDatePickerModule, NovoTimePickerModule, TextMaskModule, NovoOverlayModule], exports: [NovoDateTimePickerElement, NovoDateTimePickerInputElement] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoDateTimePickerModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, FormsModule, NovoDatePickerModule, NovoTimePickerModule, TextMaskModule, NovoOverlayModule],
                declarations: [NovoDateTimePickerElement, NovoDateTimePickerInputElement],
                exports: [NovoDateTimePickerElement, NovoDateTimePickerInputElement],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVRpbWVQaWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2RhdGUtdGltZS1waWNrZXIvRGF0ZVRpbWVQaWNrZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsU0FBUztBQUNULE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxNQUFNO0FBQ04sT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDN0QsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDeEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7O0FBT3hFLE1BQU0sT0FBTyx3QkFBd0I7OzREQUF4Qix3QkFBd0I7K0hBQXhCLHdCQUF3QixrQkFKMUIsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixFQUFFLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQzt3RkFJeEcsd0JBQXdCLG1CQUhwQix5QkFBeUIsRUFBRSw4QkFBOEIsYUFEOUQsWUFBWSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLGFBRXhHLHlCQUF5QixFQUFFLDhCQUE4QjtrREFFeEQsd0JBQXdCO2NBTHBDLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixFQUFFLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQztnQkFDbkgsWUFBWSxFQUFFLENBQUMseUJBQXlCLEVBQUUsOEJBQThCLENBQUM7Z0JBQ3pFLE9BQU8sRUFBRSxDQUFDLHlCQUF5QixFQUFFLDhCQUE4QixDQUFDO2FBQ3JFIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuLy8gVmVuZG9yXG5pbXBvcnQgeyBUZXh0TWFza01vZHVsZSB9IGZyb20gJ2FuZ3VsYXIyLXRleHQtbWFzayc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9PdmVybGF5TW9kdWxlIH0gZnJvbSAnLi4vb3ZlcmxheS9PdmVybGF5Lm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvRGF0ZVRpbWVQaWNrZXJFbGVtZW50IH0gZnJvbSAnLi9EYXRlVGltZVBpY2tlcic7XG5pbXBvcnQgeyBOb3ZvRGF0ZVRpbWVQaWNrZXJJbnB1dEVsZW1lbnQgfSBmcm9tICcuL0RhdGVUaW1lUGlja2VySW5wdXQnO1xuaW1wb3J0IHsgTm92b0RhdGVQaWNrZXJNb2R1bGUgfSBmcm9tICcuLi9kYXRlLXBpY2tlci9EYXRlUGlja2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvVGltZVBpY2tlck1vZHVsZSB9IGZyb20gJy4uL3RpbWUtcGlja2VyL1RpbWVQaWNrZXIubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIE5vdm9EYXRlUGlja2VyTW9kdWxlLCBOb3ZvVGltZVBpY2tlck1vZHVsZSwgVGV4dE1hc2tNb2R1bGUsIE5vdm9PdmVybGF5TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTm92b0RhdGVUaW1lUGlja2VyRWxlbWVudCwgTm92b0RhdGVUaW1lUGlja2VySW5wdXRFbGVtZW50XSxcbiAgZXhwb3J0czogW05vdm9EYXRlVGltZVBpY2tlckVsZW1lbnQsIE5vdm9EYXRlVGltZVBpY2tlcklucHV0RWxlbWVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRlVGltZVBpY2tlck1vZHVsZSB7fVxuIl19