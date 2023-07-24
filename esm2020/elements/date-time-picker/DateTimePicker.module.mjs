// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Vendor
import { IMaskDirectiveModule } from 'angular-imask';
import { TextMaskModule } from 'angular2-text-mask';
// APP
import { NovoOverlayModule } from 'novo-elements/elements/common';
import { NovoDatePickerModule } from 'novo-elements/elements/date-picker';
import { NovoTimePickerModule } from 'novo-elements/elements/time-picker';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVRpbWVQaWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZGF0ZS10aW1lLXBpY2tlci9EYXRlVGltZVBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxTQUFTO0FBQ1QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxNQUFNO0FBQ04sT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDMUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDMUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDN0QsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBT3ZFLE1BQU0sT0FBTyx3QkFBd0I7O3NIQUF4Qix3QkFBd0I7dUhBQXhCLHdCQUF3QixpQkFIcEIseUJBQXlCLEVBQUUsOEJBQThCLGFBRDlELFlBQVksRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixhQUU5SCx5QkFBeUIsRUFBRSw4QkFBOEI7dUhBRXhELHdCQUF3QixZQUoxQixDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixDQUFDOzRGQUk5SCx3QkFBd0I7a0JBTHBDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLENBQUM7b0JBQ3pJLFlBQVksRUFBRSxDQUFDLHlCQUF5QixFQUFFLDhCQUE4QixDQUFDO29CQUN6RSxPQUFPLEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSw4QkFBOEIsQ0FBQztpQkFDckUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBWZW5kb3JcbmltcG9ydCB7IElNYXNrRGlyZWN0aXZlTW9kdWxlIH0gZnJvbSAnYW5ndWxhci1pbWFzayc7XG5pbXBvcnQgeyBUZXh0TWFza01vZHVsZSB9IGZyb20gJ2FuZ3VsYXIyLXRleHQtbWFzayc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9PdmVybGF5TW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9jb21tb24nO1xuaW1wb3J0IHsgTm92b0RhdGVQaWNrZXJNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2RhdGUtcGlja2VyJztcbmltcG9ydCB7IE5vdm9UaW1lUGlja2VyTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy90aW1lLXBpY2tlcic7XG5pbXBvcnQgeyBOb3ZvRGF0ZVRpbWVQaWNrZXJFbGVtZW50IH0gZnJvbSAnLi9EYXRlVGltZVBpY2tlcic7XG5pbXBvcnQgeyBOb3ZvRGF0ZVRpbWVQaWNrZXJJbnB1dEVsZW1lbnQgfSBmcm9tICcuL0RhdGVUaW1lUGlja2VySW5wdXQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgTm92b0RhdGVQaWNrZXJNb2R1bGUsIE5vdm9UaW1lUGlja2VyTW9kdWxlLCBJTWFza0RpcmVjdGl2ZU1vZHVsZSwgVGV4dE1hc2tNb2R1bGUsIE5vdm9PdmVybGF5TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTm92b0RhdGVUaW1lUGlja2VyRWxlbWVudCwgTm92b0RhdGVUaW1lUGlja2VySW5wdXRFbGVtZW50XSxcbiAgZXhwb3J0czogW05vdm9EYXRlVGltZVBpY2tlckVsZW1lbnQsIE5vdm9EYXRlVGltZVBpY2tlcklucHV0RWxlbWVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRlVGltZVBpY2tlck1vZHVsZSB7fVxuIl19