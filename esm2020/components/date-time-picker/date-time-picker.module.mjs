// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IMaskDirectiveModule } from 'angular-imask';
// Vendor
import { NovoDateTimePickerInputElement } from './date-time-picker-input';
import { NovoDateTimePickerElement } from './date-time-picker';
import { NovoTimePickerModule } from 'novo-elements/components/time-picker';
import { NovoDatePickerModule } from 'novo-elements/components/date-picker';
import { NovoOverlayModule } from 'novo-elements/common/overlay';
import * as i0 from "@angular/core";
export class NovoDateTimePickerModule {
}
NovoDateTimePickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDateTimePickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoDateTimePickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDateTimePickerModule, declarations: [NovoDateTimePickerElement, NovoDateTimePickerInputElement], imports: [CommonModule, FormsModule, NovoDatePickerModule, NovoTimePickerModule, IMaskDirectiveModule, NovoOverlayModule], exports: [NovoDateTimePickerElement, NovoDateTimePickerInputElement] });
NovoDateTimePickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDateTimePickerModule, imports: [[CommonModule, FormsModule, NovoDatePickerModule, NovoTimePickerModule, IMaskDirectiveModule, NovoOverlayModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDateTimePickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, NovoDatePickerModule, NovoTimePickerModule, IMaskDirectiveModule, NovoOverlayModule],
                    declarations: [NovoDateTimePickerElement, NovoDateTimePickerInputElement],
                    exports: [NovoDateTimePickerElement, NovoDateTimePickerInputElement],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvZGF0ZS10aW1lLXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsU0FBUztBQUNULE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQU9qRSxNQUFNLE9BQU8sd0JBQXdCOztzSEFBeEIsd0JBQXdCO3VIQUF4Qix3QkFBd0IsaUJBSHBCLHlCQUF5QixFQUFFLDhCQUE4QixhQUQ5RCxZQUFZLEVBQUUsV0FBVyxFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixhQUU5Ryx5QkFBeUIsRUFBRSw4QkFBOEI7dUhBRXhELHdCQUF3QixZQUoxQixDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsaUJBQWlCLENBQUM7NEZBSTlHLHdCQUF3QjtrQkFMcEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixDQUFDO29CQUN6SCxZQUFZLEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSw4QkFBOEIsQ0FBQztvQkFDekUsT0FBTyxFQUFFLENBQUMseUJBQXlCLEVBQUUsOEJBQThCLENBQUM7aUJBQ3JFIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSU1hc2tEaXJlY3RpdmVNb2R1bGUgfSBmcm9tICdhbmd1bGFyLWltYXNrJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgTm92b0RhdGVUaW1lUGlja2VySW5wdXRFbGVtZW50IH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLWlucHV0JztcbmltcG9ydCB7IE5vdm9EYXRlVGltZVBpY2tlckVsZW1lbnQgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXInO1xuaW1wb3J0IHsgTm92b1RpbWVQaWNrZXJNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvdGltZS1waWNrZXInO1xuaW1wb3J0IHsgTm92b0RhdGVQaWNrZXJNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvZGF0ZS1waWNrZXInO1xuaW1wb3J0IHsgTm92b092ZXJsYXlNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbW1vbi9vdmVybGF5JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIE5vdm9EYXRlUGlja2VyTW9kdWxlLCBOb3ZvVGltZVBpY2tlck1vZHVsZSwgSU1hc2tEaXJlY3RpdmVNb2R1bGUsIE5vdm9PdmVybGF5TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTm92b0RhdGVUaW1lUGlja2VyRWxlbWVudCwgTm92b0RhdGVUaW1lUGlja2VySW5wdXRFbGVtZW50XSxcbiAgZXhwb3J0czogW05vdm9EYXRlVGltZVBpY2tlckVsZW1lbnQsIE5vdm9EYXRlVGltZVBpY2tlcklucHV0RWxlbWVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRlVGltZVBpY2tlck1vZHVsZSB7fVxuIl19