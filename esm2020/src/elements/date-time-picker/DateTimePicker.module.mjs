// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IMaskDirectiveModule } from 'angular-imask';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
// APP
import { NovoOverlayModule } from '../common/overlay/Overlay.module';
import { NovoDatePickerModule } from '../date-picker/DatePicker.module';
import { NovoTimePickerModule } from '../time-picker/TimePicker.module';
import { NovoDateTimePickerElement } from './DateTimePicker';
import { NovoDateTimePickerInputElement } from './DateTimePickerInput';
import * as i0 from "@angular/core";
export class NovoDateTimePickerModule {
}
NovoDateTimePickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDateTimePickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoDateTimePickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDateTimePickerModule, declarations: [NovoDateTimePickerElement, NovoDateTimePickerInputElement], imports: [CommonModule, FormsModule, NovoDatePickerModule, NovoTimePickerModule, IMaskDirectiveModule, TextMaskModule, NovoOverlayModule], exports: [NovoDateTimePickerElement, NovoDateTimePickerInputElement] });
NovoDateTimePickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDateTimePickerModule, imports: [[CommonModule, FormsModule, NovoDatePickerModule, NovoTimePickerModule, IMaskDirectiveModule, TextMaskModule, NovoOverlayModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDateTimePickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, NovoDatePickerModule, NovoTimePickerModule, IMaskDirectiveModule, TextMaskModule, NovoOverlayModule],
                    declarations: [NovoDateTimePickerElement, NovoDateTimePickerInputElement],
                    exports: [NovoDateTimePickerElement, NovoDateTimePickerInputElement],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVRpbWVQaWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZGF0ZS10aW1lLXBpY2tlci9EYXRlVGltZVBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsU0FBUztBQUNULE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxNQUFNO0FBQ04sT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDeEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDeEUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDN0QsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBT3ZFLE1BQU0sT0FBTyx3QkFBd0I7O3NIQUF4Qix3QkFBd0I7dUhBQXhCLHdCQUF3QixpQkFIcEIseUJBQXlCLEVBQUUsOEJBQThCLGFBRDlELFlBQVksRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixhQUU5SCx5QkFBeUIsRUFBRSw4QkFBOEI7dUhBRXhELHdCQUF3QixZQUoxQixDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixDQUFDOzRGQUk5SCx3QkFBd0I7a0JBTHBDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLENBQUM7b0JBQ3pJLFlBQVksRUFBRSxDQUFDLHlCQUF5QixFQUFFLDhCQUE4QixDQUFDO29CQUN6RSxPQUFPLEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSw4QkFBOEIsQ0FBQztpQkFDckUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBJTWFza0RpcmVjdGl2ZU1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItaW1hc2snO1xuLy8gVmVuZG9yXG5pbXBvcnQgeyBUZXh0TWFza01vZHVsZSB9IGZyb20gJ2FuZ3VsYXIyLXRleHQtbWFzayc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9PdmVybGF5TW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uL292ZXJsYXkvT3ZlcmxheS5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0RhdGVQaWNrZXJNb2R1bGUgfSBmcm9tICcuLi9kYXRlLXBpY2tlci9EYXRlUGlja2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvVGltZVBpY2tlck1vZHVsZSB9IGZyb20gJy4uL3RpbWUtcGlja2VyL1RpbWVQaWNrZXIubW9kdWxlJztcbmltcG9ydCB7IE5vdm9EYXRlVGltZVBpY2tlckVsZW1lbnQgfSBmcm9tICcuL0RhdGVUaW1lUGlja2VyJztcbmltcG9ydCB7IE5vdm9EYXRlVGltZVBpY2tlcklucHV0RWxlbWVudCB9IGZyb20gJy4vRGF0ZVRpbWVQaWNrZXJJbnB1dCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBOb3ZvRGF0ZVBpY2tlck1vZHVsZSwgTm92b1RpbWVQaWNrZXJNb2R1bGUsIElNYXNrRGlyZWN0aXZlTW9kdWxlLCBUZXh0TWFza01vZHVsZSwgTm92b092ZXJsYXlNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtOb3ZvRGF0ZVRpbWVQaWNrZXJFbGVtZW50LCBOb3ZvRGF0ZVRpbWVQaWNrZXJJbnB1dEVsZW1lbnRdLFxuICBleHBvcnRzOiBbTm92b0RhdGVUaW1lUGlja2VyRWxlbWVudCwgTm92b0RhdGVUaW1lUGlja2VySW5wdXRFbGVtZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RhdGVUaW1lUGlja2VyTW9kdWxlIHt9XG4iXX0=