// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Vendor
import { IMaskDirectiveModule } from 'angular-imask';
// APP
import { NovoOverlayModule } from 'novo-elements/elements/common';
import { NovoListModule } from 'novo-elements/elements/list';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoTimePickerElement } from './TimePicker';
import { NovoTimePickerInputElement } from './TimePickerInput';
import * as i0 from "@angular/core";
export class NovoTimePickerModule {
}
NovoTimePickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTimePickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoTimePickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTimePickerModule, declarations: [NovoTimePickerElement, NovoTimePickerInputElement], imports: [CommonModule, FormsModule, IMaskDirectiveModule, NovoOverlayModule, NovoListModule, NovoButtonModule], exports: [NovoTimePickerElement, NovoTimePickerInputElement] });
NovoTimePickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTimePickerModule, imports: [[CommonModule, FormsModule, IMaskDirectiveModule, NovoOverlayModule, NovoListModule, NovoButtonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTimePickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, IMaskDirectiveModule, NovoOverlayModule, NovoListModule, NovoButtonModule],
                    declarations: [NovoTimePickerElement, NovoTimePickerInputElement],
                    exports: [NovoTimePickerElement, NovoTimePickerInputElement],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZVBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy90aW1lLXBpY2tlci9UaW1lUGlja2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLFNBQVM7QUFDVCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsTUFBTTtBQUNOLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDckQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0FBTy9ELE1BQU0sT0FBTyxvQkFBb0I7O2tIQUFwQixvQkFBb0I7bUhBQXBCLG9CQUFvQixpQkFIaEIscUJBQXFCLEVBQUUsMEJBQTBCLGFBRHRELFlBQVksRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixhQUVwRyxxQkFBcUIsRUFBRSwwQkFBMEI7bUhBRWhELG9CQUFvQixZQUp0QixDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixDQUFDOzRGQUlwRyxvQkFBb0I7a0JBTGhDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsZ0JBQWdCLENBQUM7b0JBQy9HLFlBQVksRUFBRSxDQUFDLHFCQUFxQixFQUFFLDBCQUEwQixDQUFDO29CQUNqRSxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSwwQkFBMEIsQ0FBQztpQkFDN0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBWZW5kb3JcbmltcG9ydCB7IElNYXNrRGlyZWN0aXZlTW9kdWxlIH0gZnJvbSAnYW5ndWxhci1pbWFzayc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9PdmVybGF5TW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9jb21tb24nO1xuaW1wb3J0IHsgTm92b0xpc3RNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2xpc3QnO1xuaW1wb3J0IHsgTm92b0J1dHRvbk1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvYnV0dG9uJztcbmltcG9ydCB7IE5vdm9UaW1lUGlja2VyRWxlbWVudCB9IGZyb20gJy4vVGltZVBpY2tlcic7XG5pbXBvcnQgeyBOb3ZvVGltZVBpY2tlcklucHV0RWxlbWVudCB9IGZyb20gJy4vVGltZVBpY2tlcklucHV0JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIElNYXNrRGlyZWN0aXZlTW9kdWxlLCBOb3ZvT3ZlcmxheU1vZHVsZSwgTm92b0xpc3RNb2R1bGUsIE5vdm9CdXR0b25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtOb3ZvVGltZVBpY2tlckVsZW1lbnQsIE5vdm9UaW1lUGlja2VySW5wdXRFbGVtZW50XSxcbiAgZXhwb3J0czogW05vdm9UaW1lUGlja2VyRWxlbWVudCwgTm92b1RpbWVQaWNrZXJJbnB1dEVsZW1lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVGltZVBpY2tlck1vZHVsZSB7fVxuIl19