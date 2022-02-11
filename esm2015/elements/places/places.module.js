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
GooglePlacesModule.ɵmod = i0.ɵɵdefineNgModule({ type: GooglePlacesModule });
GooglePlacesModule.ɵinj = i0.ɵɵdefineInjector({ factory: function GooglePlacesModule_Factory(t) { return new (t || GooglePlacesModule)(); }, providers: [GooglePlacesService], imports: [[CommonModule, HttpClientModule, FormsModule, NovoListModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(GooglePlacesModule, { declarations: [PlacesListComponent], imports: [CommonModule, HttpClientModule, FormsModule, NovoListModule], exports: [PlacesListComponent] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(GooglePlacesModule, [{
        type: NgModule,
        args: [{
                declarations: [PlacesListComponent],
                imports: [CommonModule, HttpClientModule, FormsModule, NovoListModule],
                exports: [PlacesListComponent],
                providers: [GooglePlacesService],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2VzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9wbGFjZXMvcGxhY2VzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDOztBQVF2RCxNQUFNLE9BQU8sa0JBQWtCOztzREFBbEIsa0JBQWtCO21IQUFsQixrQkFBa0IsbUJBRmxCLENBQUMsbUJBQW1CLENBQUMsWUFGdkIsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLGNBQWMsQ0FBQzt3RkFJM0Qsa0JBQWtCLG1CQUxkLG1CQUFtQixhQUN4QixZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLGNBQWMsYUFDM0QsbUJBQW1CO2tEQUdsQixrQkFBa0I7Y0FOOUIsUUFBUTtlQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLG1CQUFtQixDQUFDO2dCQUNuQyxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLGNBQWMsQ0FBQztnQkFDdEUsT0FBTyxFQUFFLENBQUMsbUJBQW1CLENBQUM7Z0JBQzlCLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixDQUFDO2FBQ2pDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOb3ZvTGlzdE1vZHVsZSB9IGZyb20gJy4uL2xpc3QvTGlzdC5tb2R1bGUnO1xuaW1wb3J0IHsgUGxhY2VzTGlzdENvbXBvbmVudCB9IGZyb20gJy4vcGxhY2VzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHb29nbGVQbGFjZXNTZXJ2aWNlIH0gZnJvbSAnLi9wbGFjZXMuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1BsYWNlc0xpc3RDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBIdHRwQ2xpZW50TW9kdWxlLCBGb3Jtc01vZHVsZSwgTm92b0xpc3RNb2R1bGVdLFxuICBleHBvcnRzOiBbUGxhY2VzTGlzdENvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW0dvb2dsZVBsYWNlc1NlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBHb29nbGVQbGFjZXNNb2R1bGUge31cbiJdfQ==