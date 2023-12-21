import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoListModule } from 'novo-elements/elements/list';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2VzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3BsYWNlcy9wbGFjZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDekQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7O0FBUXZELE1BQU0sT0FBTyxrQkFBa0I7O2dIQUFsQixrQkFBa0I7aUhBQWxCLGtCQUFrQixpQkFMZCxtQkFBbUIsYUFDeEIsWUFBWSxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxjQUFjLGFBQzNELG1CQUFtQjtpSEFHbEIsa0JBQWtCLGFBRmxCLENBQUMsbUJBQW1CLENBQUMsWUFGdkIsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLGNBQWMsQ0FBQzs0RkFJM0Qsa0JBQWtCO2tCQU45QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLG1CQUFtQixDQUFDO29CQUNuQyxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLGNBQWMsQ0FBQztvQkFDdEUsT0FBTyxFQUFFLENBQUMsbUJBQW1CLENBQUM7b0JBQzlCLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixDQUFDO2lCQUNqQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTm92b0xpc3RNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2xpc3QnO1xuaW1wb3J0IHsgUGxhY2VzTGlzdENvbXBvbmVudCB9IGZyb20gJy4vcGxhY2VzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHb29nbGVQbGFjZXNTZXJ2aWNlIH0gZnJvbSAnLi9wbGFjZXMuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1BsYWNlc0xpc3RDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBIdHRwQ2xpZW50TW9kdWxlLCBGb3Jtc01vZHVsZSwgTm92b0xpc3RNb2R1bGVdLFxuICBleHBvcnRzOiBbUGxhY2VzTGlzdENvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW0dvb2dsZVBsYWNlc1NlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBHb29nbGVQbGFjZXNNb2R1bGUge31cbiJdfQ==