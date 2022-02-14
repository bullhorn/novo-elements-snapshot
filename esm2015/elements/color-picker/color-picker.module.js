// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// APP
import { NovoPipesModule } from '../../pipes/Pipes.module';
import { NovoOverlayModule } from '../common/overlay/Overlay.module';
import { NovoFieldModule } from '../field/field.module';
import { NovoIconModule } from '../icon/Icon.module';
import { NovoColorInputElement } from './color-input.component';
import { NovoColorPickerComponent } from './color-picker.component';
import { NovoColorSwatchComponent } from './color-swatch.component';
import * as i0 from "@angular/core";
export class NovoColorPickerModule {
}
NovoColorPickerModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoColorPickerModule });
NovoColorPickerModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoColorPickerModule_Factory(t) { return new (t || NovoColorPickerModule)(); }, imports: [[CommonModule, FormsModule, NovoPipesModule, NovoFieldModule, NovoOverlayModule, NovoIconModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoColorPickerModule, { declarations: [NovoColorPickerComponent, NovoColorInputElement, NovoColorSwatchComponent], imports: [CommonModule, FormsModule, NovoPipesModule, NovoFieldModule, NovoOverlayModule, NovoIconModule], exports: [NovoColorPickerComponent, NovoColorInputElement, NovoColorSwatchComponent] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoColorPickerModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, FormsModule, NovoPipesModule, NovoFieldModule, NovoOverlayModule, NovoIconModule],
                declarations: [NovoColorPickerComponent, NovoColorInputElement, NovoColorSwatchComponent],
                exports: [NovoColorPickerComponent, NovoColorInputElement, NovoColorSwatchComponent],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9jb2xvci1waWNrZXIvY29sb3ItcGlja2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE1BQU07QUFDTixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7QUFPcEUsTUFBTSxPQUFPLHFCQUFxQjs7eURBQXJCLHFCQUFxQjt5SEFBckIscUJBQXFCLGtCQUp2QixDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLENBQUM7d0ZBSTlGLHFCQUFxQixtQkFIakIsd0JBQXdCLEVBQUUscUJBQXFCLEVBQUUsd0JBQXdCLGFBRDlFLFlBQVksRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLGFBRTlGLHdCQUF3QixFQUFFLHFCQUFxQixFQUFFLHdCQUF3QjtrREFFeEUscUJBQXFCO2NBTGpDLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxDQUFDO2dCQUN6RyxZQUFZLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxxQkFBcUIsRUFBRSx3QkFBd0IsQ0FBQztnQkFDekYsT0FBTyxFQUFFLENBQUMsd0JBQXdCLEVBQUUscUJBQXFCLEVBQUUsd0JBQXdCLENBQUM7YUFDckYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9QaXBlc01vZHVsZSB9IGZyb20gJy4uLy4uL3BpcGVzL1BpcGVzLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvT3ZlcmxheU1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9vdmVybGF5L092ZXJsYXkubW9kdWxlJztcbmltcG9ydCB7IE5vdm9GaWVsZE1vZHVsZSB9IGZyb20gJy4uL2ZpZWxkL2ZpZWxkLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvSWNvbk1vZHVsZSB9IGZyb20gJy4uL2ljb24vSWNvbi5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0NvbG9ySW5wdXRFbGVtZW50IH0gZnJvbSAnLi9jb2xvci1pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b0NvbG9yUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb2xvci1waWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9Db2xvclN3YXRjaENvbXBvbmVudCB9IGZyb20gJy4vY29sb3Itc3dhdGNoLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBOb3ZvUGlwZXNNb2R1bGUsIE5vdm9GaWVsZE1vZHVsZSwgTm92b092ZXJsYXlNb2R1bGUsIE5vdm9JY29uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTm92b0NvbG9yUGlja2VyQ29tcG9uZW50LCBOb3ZvQ29sb3JJbnB1dEVsZW1lbnQsIE5vdm9Db2xvclN3YXRjaENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtOb3ZvQ29sb3JQaWNrZXJDb21wb25lbnQsIE5vdm9Db2xvcklucHV0RWxlbWVudCwgTm92b0NvbG9yU3dhdGNoQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0NvbG9yUGlja2VyTW9kdWxlIHt9XG4iXX0=