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
NovoColorPickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoColorPickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoColorPickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoColorPickerModule, declarations: [NovoColorPickerComponent, NovoColorInputElement, NovoColorSwatchComponent], imports: [CommonModule, FormsModule, NovoPipesModule, NovoFieldModule, NovoOverlayModule, NovoIconModule], exports: [NovoColorPickerComponent, NovoColorInputElement, NovoColorSwatchComponent] });
NovoColorPickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoColorPickerModule, imports: [[CommonModule, FormsModule, NovoPipesModule, NovoFieldModule, NovoOverlayModule, NovoIconModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoColorPickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, NovoPipesModule, NovoFieldModule, NovoOverlayModule, NovoIconModule],
                    declarations: [NovoColorPickerComponent, NovoColorInputElement, NovoColorSwatchComponent],
                    exports: [NovoColorPickerComponent, NovoColorInputElement, NovoColorSwatchComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2NvbG9yLXBpY2tlci9jb2xvci1waWNrZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsTUFBTTtBQUNOLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztBQU9wRSxNQUFNLE9BQU8scUJBQXFCOztrSEFBckIscUJBQXFCO21IQUFyQixxQkFBcUIsaUJBSGpCLHdCQUF3QixFQUFFLHFCQUFxQixFQUFFLHdCQUF3QixhQUQ5RSxZQUFZLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxhQUU5Rix3QkFBd0IsRUFBRSxxQkFBcUIsRUFBRSx3QkFBd0I7bUhBRXhFLHFCQUFxQixZQUp2QixDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLENBQUM7MkZBSTlGLHFCQUFxQjtrQkFMakMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxDQUFDO29CQUN6RyxZQUFZLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxxQkFBcUIsRUFBRSx3QkFBd0IsQ0FBQztvQkFDekYsT0FBTyxFQUFFLENBQUMsd0JBQXdCLEVBQUUscUJBQXFCLEVBQUUsd0JBQXdCLENBQUM7aUJBQ3JGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvUGlwZXNNb2R1bGUgfSBmcm9tICcuLi8uLi9waXBlcy9QaXBlcy5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b092ZXJsYXlNb2R1bGUgfSBmcm9tICcuLi9jb21tb24vb3ZlcmxheS9PdmVybGF5Lm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvRmllbGRNb2R1bGUgfSBmcm9tICcuLi9maWVsZC9maWVsZC5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0ljb25Nb2R1bGUgfSBmcm9tICcuLi9pY29uL0ljb24ubW9kdWxlJztcbmltcG9ydCB7IE5vdm9Db2xvcklucHV0RWxlbWVudCB9IGZyb20gJy4vY29sb3ItaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9Db2xvclBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vY29sb3ItcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvQ29sb3JTd2F0Y2hDb21wb25lbnQgfSBmcm9tICcuL2NvbG9yLXN3YXRjaC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgTm92b1BpcGVzTW9kdWxlLCBOb3ZvRmllbGRNb2R1bGUsIE5vdm9PdmVybGF5TW9kdWxlLCBOb3ZvSWNvbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW05vdm9Db2xvclBpY2tlckNvbXBvbmVudCwgTm92b0NvbG9ySW5wdXRFbGVtZW50LCBOb3ZvQ29sb3JTd2F0Y2hDb21wb25lbnRdLFxuICBleHBvcnRzOiBbTm92b0NvbG9yUGlja2VyQ29tcG9uZW50LCBOb3ZvQ29sb3JJbnB1dEVsZW1lbnQsIE5vdm9Db2xvclN3YXRjaENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Db2xvclBpY2tlck1vZHVsZSB7fVxuIl19