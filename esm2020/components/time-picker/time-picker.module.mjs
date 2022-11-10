// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IMaskDirectiveModule } from 'angular-imask';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
import { NovoTimePickerInputElement } from './time-picker-input';
import { NovoTimePickerElement } from './time-picker';
import { NovoListModule } from 'novo-elements/components/list';
import { NovoOverlayModule } from 'novo-elements/common/overlay';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy90aW1lLXBpY2tlci90aW1lLXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsU0FBUztBQUNULE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQU9qRSxNQUFNLE9BQU8sb0JBQW9COztrSEFBcEIsb0JBQW9CO21IQUFwQixvQkFBb0IsaUJBSGhCLHFCQUFxQixFQUFFLDBCQUEwQixhQUR0RCxZQUFZLEVBQUUsV0FBVyxFQUFFLG9CQUFvQixFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLGFBRWxHLHFCQUFxQixFQUFFLDBCQUEwQjttSEFFaEQsb0JBQW9CLFlBSnRCLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxDQUFDOzRGQUlsRyxvQkFBb0I7a0JBTGhDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxDQUFDO29CQUM3RyxZQUFZLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSwwQkFBMEIsQ0FBQztvQkFDakUsT0FBTyxFQUFFLENBQUMscUJBQXFCLEVBQUUsMEJBQTBCLENBQUM7aUJBQzdEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSU1hc2tEaXJlY3RpdmVNb2R1bGUgfSBmcm9tICdhbmd1bGFyLWltYXNrJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgVGV4dE1hc2tNb2R1bGUgfSBmcm9tICdhbmd1bGFyMi10ZXh0LW1hc2snO1xuaW1wb3J0IHsgTm92b1RpbWVQaWNrZXJJbnB1dEVsZW1lbnQgfSBmcm9tICcuL3RpbWUtcGlja2VyLWlucHV0JztcbmltcG9ydCB7IE5vdm9UaW1lUGlja2VyRWxlbWVudCB9IGZyb20gJy4vdGltZS1waWNrZXInO1xuaW1wb3J0IHsgTm92b0xpc3RNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvbGlzdCc7XG5pbXBvcnQgeyBOb3ZvT3ZlcmxheU1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tbW9uL292ZXJsYXknO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgSU1hc2tEaXJlY3RpdmVNb2R1bGUsIFRleHRNYXNrTW9kdWxlLCBOb3ZvT3ZlcmxheU1vZHVsZSwgTm92b0xpc3RNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtOb3ZvVGltZVBpY2tlckVsZW1lbnQsIE5vdm9UaW1lUGlja2VySW5wdXRFbGVtZW50XSxcbiAgZXhwb3J0czogW05vdm9UaW1lUGlja2VyRWxlbWVudCwgTm92b1RpbWVQaWNrZXJJbnB1dEVsZW1lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVGltZVBpY2tlck1vZHVsZSB7fVxuIl19