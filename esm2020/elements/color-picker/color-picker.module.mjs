// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// APP
import { NovoPipesModule } from 'novo-elements/pipes';
import { NovoOverlayModule } from 'novo-elements/elements/common';
import { NovoFieldModule } from 'novo-elements/elements/field';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { NovoColorInputElement } from './color-input.component';
import { NovoColorPickerComponent } from './color-picker.component';
import { NovoColorSwatchComponent } from './color-swatch.component';
import * as i0 from "@angular/core";
export class NovoColorPickerModule {
}
NovoColorPickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoColorPickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoColorPickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoColorPickerModule, declarations: [NovoColorPickerComponent, NovoColorInputElement, NovoColorSwatchComponent], imports: [CommonModule, FormsModule, NovoPipesModule, NovoFieldModule, NovoOverlayModule, NovoIconModule], exports: [NovoColorPickerComponent, NovoColorInputElement, NovoColorSwatchComponent] });
NovoColorPickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoColorPickerModule, imports: [[CommonModule, FormsModule, NovoPipesModule, NovoFieldModule, NovoOverlayModule, NovoIconModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoColorPickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, NovoPipesModule, NovoFieldModule, NovoOverlayModule, NovoIconModule],
                    declarations: [NovoColorPickerComponent, NovoColorInputElement, NovoColorSwatchComponent],
                    exports: [NovoColorPickerComponent, NovoColorInputElement, NovoColorSwatchComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2NvbG9yLXBpY2tlci9jb2xvci1waWNrZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsTUFBTTtBQUNOLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztBQU9wRSxNQUFNLE9BQU8scUJBQXFCOzttSEFBckIscUJBQXFCO29IQUFyQixxQkFBcUIsaUJBSGpCLHdCQUF3QixFQUFFLHFCQUFxQixFQUFFLHdCQUF3QixhQUQ5RSxZQUFZLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxhQUU5Rix3QkFBd0IsRUFBRSxxQkFBcUIsRUFBRSx3QkFBd0I7b0hBRXhFLHFCQUFxQixZQUp2QixDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLENBQUM7NEZBSTlGLHFCQUFxQjtrQkFMakMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxDQUFDO29CQUN6RyxZQUFZLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxxQkFBcUIsRUFBRSx3QkFBd0IsQ0FBQztvQkFDekYsT0FBTyxFQUFFLENBQUMsd0JBQXdCLEVBQUUscUJBQXFCLEVBQUUsd0JBQXdCLENBQUM7aUJBQ3JGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvUGlwZXNNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3BpcGVzJztcbmltcG9ydCB7IE5vdm9PdmVybGF5TW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9jb21tb24nO1xuaW1wb3J0IHsgTm92b0ZpZWxkTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9maWVsZCc7XG5pbXBvcnQgeyBOb3ZvSWNvbk1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvaWNvbic7XG5pbXBvcnQgeyBOb3ZvQ29sb3JJbnB1dEVsZW1lbnQgfSBmcm9tICcuL2NvbG9yLWlucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvQ29sb3JQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbG9yLXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b0NvbG9yU3dhdGNoQ29tcG9uZW50IH0gZnJvbSAnLi9jb2xvci1zd2F0Y2guY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIE5vdm9QaXBlc01vZHVsZSwgTm92b0ZpZWxkTW9kdWxlLCBOb3ZvT3ZlcmxheU1vZHVsZSwgTm92b0ljb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtOb3ZvQ29sb3JQaWNrZXJDb21wb25lbnQsIE5vdm9Db2xvcklucHV0RWxlbWVudCwgTm92b0NvbG9yU3dhdGNoQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW05vdm9Db2xvclBpY2tlckNvbXBvbmVudCwgTm92b0NvbG9ySW5wdXRFbGVtZW50LCBOb3ZvQ29sb3JTd2F0Y2hDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQ29sb3JQaWNrZXJNb2R1bGUge31cbiJdfQ==