import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoCommonModule, NovoOptionModule, NovoOverlayModule } from 'novo-elements/common';
import { NovoButtonModule } from 'novo-elements/components/button';
import { NovoChipsModule } from 'novo-elements/components/chips';
import { NovoFieldModule } from 'novo-elements/components/field';
import { NovoAutocompleteElement } from './autocomplete.component';
import * as i0 from "@angular/core";
export class NovoAutoCompleteModule {
}
NovoAutoCompleteModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAutoCompleteModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoAutoCompleteModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAutoCompleteModule, declarations: [NovoAutocompleteElement], imports: [CommonModule, NovoButtonModule, NovoOverlayModule, NovoOptionModule, NovoCommonModule, NovoFieldModule, NovoChipsModule], exports: [NovoAutocompleteElement] });
NovoAutoCompleteModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAutoCompleteModule, imports: [[CommonModule, NovoButtonModule, NovoOverlayModule, NovoOptionModule, NovoCommonModule, NovoFieldModule, NovoChipsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAutoCompleteModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoButtonModule, NovoOverlayModule, NovoOptionModule, NovoCommonModule, NovoFieldModule, NovoChipsModule],
                    declarations: [NovoAutocompleteElement],
                    exports: [NovoAutocompleteElement],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDN0YsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7QUFPbkUsTUFBTSxPQUFPLHNCQUFzQjs7b0hBQXRCLHNCQUFzQjtxSEFBdEIsc0JBQXNCLGlCQUhsQix1QkFBdUIsYUFENUIsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxlQUFlLGFBRXZILHVCQUF1QjtxSEFFdEIsc0JBQXNCLFlBSnhCLENBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxlQUFlLENBQUM7NEZBSXZILHNCQUFzQjtrQkFMbEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLGVBQWUsQ0FBQztvQkFDbEksWUFBWSxFQUFFLENBQUMsdUJBQXVCLENBQUM7b0JBQ3ZDLE9BQU8sRUFBRSxDQUFDLHVCQUF1QixDQUFDO2lCQUNuQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0NvbW1vbk1vZHVsZSwgTm92b09wdGlvbk1vZHVsZSwgTm92b092ZXJsYXlNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbW1vbic7XG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL2J1dHRvbic7XG5pbXBvcnQgeyBOb3ZvQ2hpcHNNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvY2hpcHMnO1xuaW1wb3J0IHsgTm92b0ZpZWxkTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL2ZpZWxkJztcbmltcG9ydCB7IE5vdm9BdXRvY29tcGxldGVFbGVtZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTm92b0J1dHRvbk1vZHVsZSwgTm92b092ZXJsYXlNb2R1bGUsIE5vdm9PcHRpb25Nb2R1bGUsIE5vdm9Db21tb25Nb2R1bGUsIE5vdm9GaWVsZE1vZHVsZSwgTm92b0NoaXBzTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTm92b0F1dG9jb21wbGV0ZUVsZW1lbnRdLFxuICBleHBvcnRzOiBbTm92b0F1dG9jb21wbGV0ZUVsZW1lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQXV0b0NvbXBsZXRlTW9kdWxlIHt9XG4iXX0=