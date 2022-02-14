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
NovoTimePickerModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoTimePickerModule });
NovoTimePickerModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoTimePickerModule_Factory(t) { return new (t || NovoTimePickerModule)(); }, imports: [[CommonModule, FormsModule, IMaskDirectiveModule, TextMaskModule, NovoOverlayModule, NovoListModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoTimePickerModule, { declarations: [NovoTimePickerElement, NovoTimePickerInputElement], imports: [CommonModule, FormsModule, IMaskDirectiveModule, TextMaskModule, NovoOverlayModule, NovoListModule], exports: [NovoTimePickerElement, NovoTimePickerInputElement] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoTimePickerModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, FormsModule, IMaskDirectiveModule, TextMaskModule, NovoOverlayModule, NovoListModule],
                declarations: [NovoTimePickerElement, NovoTimePickerInputElement],
                exports: [NovoTimePickerElement, NovoTimePickerInputElement],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZVBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvdGltZS1waWNrZXIvVGltZVBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsU0FBUztBQUNULE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxNQUFNO0FBQ04sT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNyRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFPL0QsTUFBTSxPQUFPLG9CQUFvQjs7d0RBQXBCLG9CQUFvQjt1SEFBcEIsb0JBQW9CLGtCQUp0QixDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFFLGNBQWMsQ0FBQzt3RkFJbEcsb0JBQW9CLG1CQUhoQixxQkFBcUIsRUFBRSwwQkFBMEIsYUFEdEQsWUFBWSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxhQUVsRyxxQkFBcUIsRUFBRSwwQkFBMEI7a0RBRWhELG9CQUFvQjtjQUxoQyxRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxDQUFDO2dCQUM3RyxZQUFZLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSwwQkFBMEIsQ0FBQztnQkFDakUsT0FBTyxFQUFFLENBQUMscUJBQXFCLEVBQUUsMEJBQTBCLENBQUM7YUFDN0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBJTWFza0RpcmVjdGl2ZU1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItaW1hc2snO1xuLy8gVmVuZG9yXG5pbXBvcnQgeyBUZXh0TWFza01vZHVsZSB9IGZyb20gJ2FuZ3VsYXIyLXRleHQtbWFzayc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9PdmVybGF5TW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uL292ZXJsYXkvT3ZlcmxheS5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0xpc3RNb2R1bGUgfSBmcm9tICcuLi9saXN0L0xpc3QubW9kdWxlJztcbmltcG9ydCB7IE5vdm9UaW1lUGlja2VyRWxlbWVudCB9IGZyb20gJy4vVGltZVBpY2tlcic7XG5pbXBvcnQgeyBOb3ZvVGltZVBpY2tlcklucHV0RWxlbWVudCB9IGZyb20gJy4vVGltZVBpY2tlcklucHV0JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIElNYXNrRGlyZWN0aXZlTW9kdWxlLCBUZXh0TWFza01vZHVsZSwgTm92b092ZXJsYXlNb2R1bGUsIE5vdm9MaXN0TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTm92b1RpbWVQaWNrZXJFbGVtZW50LCBOb3ZvVGltZVBpY2tlcklucHV0RWxlbWVudF0sXG4gIGV4cG9ydHM6IFtOb3ZvVGltZVBpY2tlckVsZW1lbnQsIE5vdm9UaW1lUGlja2VySW5wdXRFbGVtZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1RpbWVQaWNrZXJNb2R1bGUge31cbiJdfQ==