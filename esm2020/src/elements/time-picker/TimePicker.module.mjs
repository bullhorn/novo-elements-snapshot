// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IMaskDirectiveModule } from 'angular-imask';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
// APP
import { NovoOverlayModule } from '../common/overlay/Overlay.module';
import { NovoListModule } from '../list/List.module';
import { NovoTimePickerElement } from './TimePicker';
import { NovoTimePickerInputElement } from './TimePickerInput';
import * as i0 from "@angular/core";
export class NovoTimePickerModule {
}
NovoTimePickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTimePickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoTimePickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTimePickerModule, declarations: [NovoTimePickerElement, NovoTimePickerInputElement], imports: [CommonModule, FormsModule, IMaskDirectiveModule, TextMaskModule, NovoOverlayModule, NovoListModule], exports: [NovoTimePickerElement, NovoTimePickerInputElement] });
NovoTimePickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTimePickerModule, imports: [[CommonModule, FormsModule, IMaskDirectiveModule, TextMaskModule, NovoOverlayModule, NovoListModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTimePickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, IMaskDirectiveModule, TextMaskModule, NovoOverlayModule, NovoListModule],
                    declarations: [NovoTimePickerElement, NovoTimePickerInputElement],
                    exports: [NovoTimePickerElement, NovoTimePickerInputElement],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZVBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy90aW1lLXBpY2tlci9UaW1lUGlja2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxTQUFTO0FBQ1QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE1BQU07QUFDTixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3JELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLG1CQUFtQixDQUFDOztBQU8vRCxNQUFNLE9BQU8sb0JBQW9COztrSEFBcEIsb0JBQW9CO21IQUFwQixvQkFBb0IsaUJBSGhCLHFCQUFxQixFQUFFLDBCQUEwQixhQUR0RCxZQUFZLEVBQUUsV0FBVyxFQUFFLG9CQUFvQixFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLGFBRWxHLHFCQUFxQixFQUFFLDBCQUEwQjttSEFFaEQsb0JBQW9CLFlBSnRCLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxDQUFDOzRGQUlsRyxvQkFBb0I7a0JBTGhDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxDQUFDO29CQUM3RyxZQUFZLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSwwQkFBMEIsQ0FBQztvQkFDakUsT0FBTyxFQUFFLENBQUMscUJBQXFCLEVBQUUsMEJBQTBCLENBQUM7aUJBQzdEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSU1hc2tEaXJlY3RpdmVNb2R1bGUgfSBmcm9tICdhbmd1bGFyLWltYXNrJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgVGV4dE1hc2tNb2R1bGUgfSBmcm9tICdhbmd1bGFyMi10ZXh0LW1hc2snO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvT3ZlcmxheU1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9vdmVybGF5L092ZXJsYXkubW9kdWxlJztcbmltcG9ydCB7IE5vdm9MaXN0TW9kdWxlIH0gZnJvbSAnLi4vbGlzdC9MaXN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvVGltZVBpY2tlckVsZW1lbnQgfSBmcm9tICcuL1RpbWVQaWNrZXInO1xuaW1wb3J0IHsgTm92b1RpbWVQaWNrZXJJbnB1dEVsZW1lbnQgfSBmcm9tICcuL1RpbWVQaWNrZXJJbnB1dCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBJTWFza0RpcmVjdGl2ZU1vZHVsZSwgVGV4dE1hc2tNb2R1bGUsIE5vdm9PdmVybGF5TW9kdWxlLCBOb3ZvTGlzdE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW05vdm9UaW1lUGlja2VyRWxlbWVudCwgTm92b1RpbWVQaWNrZXJJbnB1dEVsZW1lbnRdLFxuICBleHBvcnRzOiBbTm92b1RpbWVQaWNrZXJFbGVtZW50LCBOb3ZvVGltZVBpY2tlcklucHV0RWxlbWVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9UaW1lUGlja2VyTW9kdWxlIHt9XG4iXX0=