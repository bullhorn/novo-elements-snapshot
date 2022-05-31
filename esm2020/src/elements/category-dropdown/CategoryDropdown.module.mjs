// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoListModule } from './../list/List.module';
import { NovoTabModule } from './../tabs/Tabs.module';
// APP
import { NovoCategoryDropdownElement } from './CategoryDropdown';
import * as i0 from "@angular/core";
export class NovoCategoryDropdownModule {
}
NovoCategoryDropdownModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoCategoryDropdownModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoCategoryDropdownModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoCategoryDropdownModule, declarations: [NovoCategoryDropdownElement], imports: [CommonModule, NovoTabModule, NovoListModule], exports: [NovoCategoryDropdownElement] });
NovoCategoryDropdownModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoCategoryDropdownModule, imports: [[CommonModule, NovoTabModule, NovoListModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoCategoryDropdownModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoTabModule, NovoListModule],
                    declarations: [NovoCategoryDropdownElement],
                    exports: [NovoCategoryDropdownElement],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2F0ZWdvcnlEcm9wZG93bi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9jYXRlZ29yeS1kcm9wZG93bi9DYXRlZ29yeURyb3Bkb3duLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RCxNQUFNO0FBQ04sT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0FBT2pFLE1BQU0sT0FBTywwQkFBMEI7O3VIQUExQiwwQkFBMEI7d0hBQTFCLDBCQUEwQixpQkFIdEIsMkJBQTJCLGFBRGhDLFlBQVksRUFBRSxhQUFhLEVBQUUsY0FBYyxhQUUzQywyQkFBMkI7d0hBRTFCLDBCQUEwQixZQUo1QixDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsY0FBYyxDQUFDOzJGQUkzQywwQkFBMEI7a0JBTHRDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxjQUFjLENBQUM7b0JBQ3RELFlBQVksRUFBRSxDQUFDLDJCQUEyQixDQUFDO29CQUMzQyxPQUFPLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztpQkFDdkMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0xpc3RNb2R1bGUgfSBmcm9tICcuLy4uL2xpc3QvTGlzdC5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1RhYk1vZHVsZSB9IGZyb20gJy4vLi4vdGFicy9UYWJzLm1vZHVsZSc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9DYXRlZ29yeURyb3Bkb3duRWxlbWVudCB9IGZyb20gJy4vQ2F0ZWdvcnlEcm9wZG93bic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE5vdm9UYWJNb2R1bGUsIE5vdm9MaXN0TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTm92b0NhdGVnb3J5RHJvcGRvd25FbGVtZW50XSxcbiAgZXhwb3J0czogW05vdm9DYXRlZ29yeURyb3Bkb3duRWxlbWVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9DYXRlZ29yeURyb3Bkb3duTW9kdWxlIHt9XG4iXX0=