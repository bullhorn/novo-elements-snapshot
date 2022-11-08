// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoColorSwatchComponent } from './color-swatch.component';
import { NovoColorPickerComponent } from './color-picker.component';
import { NovoColorInputElement } from './color-input.component';
import { NovoIconModule } from 'novo-elements/components/icon';
import { NovoFieldModule } from 'novo-elements/components/field';
import { NovoOverlayModule } from 'novo-elements/common/overlay';
import { NovoPipesModule } from 'novo-elements/pipes';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvY29sb3ItcGlja2VyL2NvbG9yLXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFPdEQsTUFBTSxPQUFPLHFCQUFxQjs7bUhBQXJCLHFCQUFxQjtvSEFBckIscUJBQXFCLGlCQUhqQix3QkFBd0IsRUFBRSxxQkFBcUIsRUFBRSx3QkFBd0IsYUFEOUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixFQUFFLGNBQWMsYUFFOUYsd0JBQXdCLEVBQUUscUJBQXFCLEVBQUUsd0JBQXdCO29IQUV4RSxxQkFBcUIsWUFKdkIsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxDQUFDOzRGQUk5RixxQkFBcUI7a0JBTGpDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixFQUFFLGNBQWMsQ0FBQztvQkFDekcsWUFBWSxFQUFFLENBQUMsd0JBQXdCLEVBQUUscUJBQXFCLEVBQUUsd0JBQXdCLENBQUM7b0JBQ3pGLE9BQU8sRUFBRSxDQUFDLHdCQUF3QixFQUFFLHFCQUFxQixFQUFFLHdCQUF3QixDQUFDO2lCQUNyRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5vdm9Db2xvclN3YXRjaENvbXBvbmVudCB9IGZyb20gJy4vY29sb3Itc3dhdGNoLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvQ29sb3JQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbG9yLXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b0NvbG9ySW5wdXRFbGVtZW50IH0gZnJvbSAnLi9jb2xvci1pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b0ljb25Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvaWNvbic7XG5pbXBvcnQgeyBOb3ZvRmllbGRNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvZmllbGQnO1xuaW1wb3J0IHsgTm92b092ZXJsYXlNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbW1vbi9vdmVybGF5JztcbmltcG9ydCB7IE5vdm9QaXBlc01vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvcGlwZXMnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgTm92b1BpcGVzTW9kdWxlLCBOb3ZvRmllbGRNb2R1bGUsIE5vdm9PdmVybGF5TW9kdWxlLCBOb3ZvSWNvbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW05vdm9Db2xvclBpY2tlckNvbXBvbmVudCwgTm92b0NvbG9ySW5wdXRFbGVtZW50LCBOb3ZvQ29sb3JTd2F0Y2hDb21wb25lbnRdLFxuICBleHBvcnRzOiBbTm92b0NvbG9yUGlja2VyQ29tcG9uZW50LCBOb3ZvQ29sb3JJbnB1dEVsZW1lbnQsIE5vdm9Db2xvclN3YXRjaENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Db2xvclBpY2tlck1vZHVsZSB7fVxuIl19