// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoChipsModule } from './../chips/Chips.module';
// APP
import { NovoPickerModule } from './../picker/Picker.module';
import { NovoMultiPickerElement } from './MultiPicker';
import * as i0 from "@angular/core";
export class NovoMultiPickerModule {
}
NovoMultiPickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoMultiPickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoMultiPickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoMultiPickerModule, declarations: [NovoMultiPickerElement], imports: [CommonModule, FormsModule, NovoPickerModule, NovoChipsModule], exports: [NovoMultiPickerElement] });
NovoMultiPickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoMultiPickerModule, imports: [[CommonModule, FormsModule, NovoPickerModule, NovoChipsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoMultiPickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, NovoPickerModule, NovoChipsModule],
                    declarations: [NovoMultiPickerElement],
                    exports: [NovoMultiPickerElement],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXVsdGlQaWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvbXVsdGktcGlja2VyL011bHRpUGlja2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMxRCxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZUFBZSxDQUFDOztBQU92RCxNQUFNLE9BQU8scUJBQXFCOztrSEFBckIscUJBQXFCO21IQUFyQixxQkFBcUIsaUJBSGpCLHNCQUFzQixhQUQzQixZQUFZLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsYUFFNUQsc0JBQXNCO21IQUVyQixxQkFBcUIsWUFKdkIsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsQ0FBQzsyRkFJNUQscUJBQXFCO2tCQUxqQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxDQUFDO29CQUN2RSxZQUFZLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztvQkFDdEMsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7aUJBQ2xDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTm92b0NoaXBzTW9kdWxlIH0gZnJvbSAnLi8uLi9jaGlwcy9DaGlwcy5tb2R1bGUnO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvUGlja2VyTW9kdWxlIH0gZnJvbSAnLi8uLi9waWNrZXIvUGlja2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvTXVsdGlQaWNrZXJFbGVtZW50IH0gZnJvbSAnLi9NdWx0aVBpY2tlcic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBOb3ZvUGlja2VyTW9kdWxlLCBOb3ZvQ2hpcHNNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtOb3ZvTXVsdGlQaWNrZXJFbGVtZW50XSxcbiAgZXhwb3J0czogW05vdm9NdWx0aVBpY2tlckVsZW1lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvTXVsdGlQaWNrZXJNb2R1bGUge31cbiJdfQ==