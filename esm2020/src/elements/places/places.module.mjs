import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoListModule } from '../list/List.module';
import { PlacesListComponent } from './places.component';
import { GooglePlacesService } from './places.service';
import * as i0 from "@angular/core";
export class GooglePlacesModule {
}
GooglePlacesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: GooglePlacesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GooglePlacesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: GooglePlacesModule, declarations: [PlacesListComponent], imports: [CommonModule, HttpClientModule, FormsModule, NovoListModule], exports: [PlacesListComponent] });
GooglePlacesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: GooglePlacesModule, providers: [GooglePlacesService], imports: [[CommonModule, HttpClientModule, FormsModule, NovoListModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: GooglePlacesModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [PlacesListComponent],
                    imports: [CommonModule, HttpClientModule, FormsModule, NovoListModule],
                    exports: [PlacesListComponent],
                    providers: [GooglePlacesService],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2VzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3BsYWNlcy9wbGFjZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDekQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7O0FBUXZELE1BQU0sT0FBTyxrQkFBa0I7O2dIQUFsQixrQkFBa0I7aUhBQWxCLGtCQUFrQixpQkFMZCxtQkFBbUIsYUFDeEIsWUFBWSxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxjQUFjLGFBQzNELG1CQUFtQjtpSEFHbEIsa0JBQWtCLGFBRmxCLENBQUMsbUJBQW1CLENBQUMsWUFGdkIsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLGNBQWMsQ0FBQzs0RkFJM0Qsa0JBQWtCO2tCQU45QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLG1CQUFtQixDQUFDO29CQUNuQyxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLGNBQWMsQ0FBQztvQkFDdEUsT0FBTyxFQUFFLENBQUMsbUJBQW1CLENBQUM7b0JBQzlCLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixDQUFDO2lCQUNqQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTm92b0xpc3RNb2R1bGUgfSBmcm9tICcuLi9saXN0L0xpc3QubW9kdWxlJztcbmltcG9ydCB7IFBsYWNlc0xpc3RDb21wb25lbnQgfSBmcm9tICcuL3BsYWNlcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgR29vZ2xlUGxhY2VzU2VydmljZSB9IGZyb20gJy4vcGxhY2VzLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtQbGFjZXNMaXN0Q29tcG9uZW50XSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSHR0cENsaWVudE1vZHVsZSwgRm9ybXNNb2R1bGUsIE5vdm9MaXN0TW9kdWxlXSxcbiAgZXhwb3J0czogW1BsYWNlc0xpc3RDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtHb29nbGVQbGFjZXNTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgR29vZ2xlUGxhY2VzTW9kdWxlIHt9XG4iXX0=