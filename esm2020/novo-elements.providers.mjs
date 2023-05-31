import { NgModule } from '@angular/core';
import { NovoAsideService, NovoDragulaService, FieldInteractionApi, MENU_OPTIONS, NovoModalService, GooglePlacesService, NovoToastService, } from 'novo-elements/elements';
import { BrowserGlobalRef, ComponentUtils, DateFormatService, GlobalRef, LocalStorageService, NovoTemplateService, OptionsService, } from 'novo-elements/services';
import * as i0 from "@angular/core";
const NOVO_ELEMENTS_PROVIDERS = [
    { provide: NovoDragulaService, useClass: NovoDragulaService },
    { provide: NovoAsideService, useClass: NovoAsideService },
    { provide: NovoModalService, useClass: NovoModalService },
    { provide: GooglePlacesService, useClass: GooglePlacesService },
    { provide: NovoToastService, useClass: NovoToastService },
    { provide: ComponentUtils, useClass: ComponentUtils },
    { provide: GlobalRef, useClass: BrowserGlobalRef },
    { provide: LocalStorageService, useClass: LocalStorageService },
    { provide: OptionsService, useClass: OptionsService },
    FieldInteractionApi,
    DateFormatService,
    NovoTemplateService,
];
export class NovoElementProviders {
    static forRoot(options) {
        return {
            ngModule: NovoElementProviders,
            providers: [
                ...NOVO_ELEMENTS_PROVIDERS,
                {
                    provide: MENU_OPTIONS,
                    useValue: options && options.menu,
                },
            ],
        };
    }
    static forChild() {
        return {
            ngModule: NovoElementProviders,
        };
    }
}
NovoElementProviders.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoElementProviders, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoElementProviders.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoElementProviders });
NovoElementProviders.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoElementProviders, imports: [[]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoElementProviders, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm92by1lbGVtZW50cy5wcm92aWRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9ub3ZvLWVsZW1lbnRzLnByb3ZpZGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLGtCQUFrQixFQUNsQixtQkFBbUIsRUFDTCxZQUFZLEVBQzFCLGdCQUFnQixFQUNoQixtQkFBbUIsRUFDbkIsZ0JBQWdCLEdBQ2pCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixjQUFjLEVBQ2QsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxtQkFBbUIsRUFDbkIsbUJBQW1CLEVBQ25CLGNBQWMsR0FDZixNQUFNLHdCQUF3QixDQUFDOztBQUVoQyxNQUFNLHVCQUF1QixHQUFHO0lBQzlCLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRTtJQUM3RCxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUU7SUFDekQsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFO0lBQ3pELEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRTtJQUMvRCxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUU7SUFDekQsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUU7SUFDckQsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRTtJQUNsRCxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUU7SUFDL0QsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUU7SUFDckQsbUJBQW1CO0lBQ25CLGlCQUFpQjtJQUNqQixtQkFBbUI7Q0FDcEIsQ0FBQztBQUtGLE1BQU0sT0FBTyxvQkFBb0I7SUFDL0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFnQztRQUM3QyxPQUFPO1lBQ0wsUUFBUSxFQUFFLG9CQUFvQjtZQUM5QixTQUFTLEVBQUU7Z0JBQ1QsR0FBRyx1QkFBdUI7Z0JBQzFCO29CQUNFLE9BQU8sRUFBRSxZQUFZO29CQUNyQixRQUFRLEVBQUUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJO2lCQUNsQzthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsUUFBUTtRQUNiLE9BQU87WUFDTCxRQUFRLEVBQUUsb0JBQW9CO1NBQy9CLENBQUM7SUFDSixDQUFDOztrSEFsQlUsb0JBQW9CO21IQUFwQixvQkFBb0I7bUhBQXBCLG9CQUFvQixZQUZ0QixFQUFFOzRGQUVBLG9CQUFvQjtrQkFIaEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsRUFBRTtpQkFDWiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBOb3ZvQXNpZGVTZXJ2aWNlLFxuICBOb3ZvRHJhZ3VsYVNlcnZpY2UsXG4gIEZpZWxkSW50ZXJhY3Rpb25BcGksXG4gIElNZW51T3B0aW9ucywgTUVOVV9PUFRJT05TLFxuICBOb3ZvTW9kYWxTZXJ2aWNlLFxuICBHb29nbGVQbGFjZXNTZXJ2aWNlLFxuICBOb3ZvVG9hc3RTZXJ2aWNlLFxufSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzJztcbmltcG9ydCB7XG4gIEJyb3dzZXJHbG9iYWxSZWYsXG4gIENvbXBvbmVudFV0aWxzLFxuICBEYXRlRm9ybWF0U2VydmljZSxcbiAgR2xvYmFsUmVmLFxuICBMb2NhbFN0b3JhZ2VTZXJ2aWNlLFxuICBOb3ZvVGVtcGxhdGVTZXJ2aWNlLFxuICBPcHRpb25zU2VydmljZSxcbn0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5cbmNvbnN0IE5PVk9fRUxFTUVOVFNfUFJPVklERVJTID0gW1xuICB7IHByb3ZpZGU6IE5vdm9EcmFndWxhU2VydmljZSwgdXNlQ2xhc3M6IE5vdm9EcmFndWxhU2VydmljZSB9LFxuICB7IHByb3ZpZGU6IE5vdm9Bc2lkZVNlcnZpY2UsIHVzZUNsYXNzOiBOb3ZvQXNpZGVTZXJ2aWNlIH0sXG4gIHsgcHJvdmlkZTogTm92b01vZGFsU2VydmljZSwgdXNlQ2xhc3M6IE5vdm9Nb2RhbFNlcnZpY2UgfSxcbiAgeyBwcm92aWRlOiBHb29nbGVQbGFjZXNTZXJ2aWNlLCB1c2VDbGFzczogR29vZ2xlUGxhY2VzU2VydmljZSB9LFxuICB7IHByb3ZpZGU6IE5vdm9Ub2FzdFNlcnZpY2UsIHVzZUNsYXNzOiBOb3ZvVG9hc3RTZXJ2aWNlIH0sXG4gIHsgcHJvdmlkZTogQ29tcG9uZW50VXRpbHMsIHVzZUNsYXNzOiBDb21wb25lbnRVdGlscyB9LFxuICB7IHByb3ZpZGU6IEdsb2JhbFJlZiwgdXNlQ2xhc3M6IEJyb3dzZXJHbG9iYWxSZWYgfSxcbiAgeyBwcm92aWRlOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlLCB1c2VDbGFzczogTG9jYWxTdG9yYWdlU2VydmljZSB9LFxuICB7IHByb3ZpZGU6IE9wdGlvbnNTZXJ2aWNlLCB1c2VDbGFzczogT3B0aW9uc1NlcnZpY2UgfSxcbiAgRmllbGRJbnRlcmFjdGlvbkFwaSxcbiAgRGF0ZUZvcm1hdFNlcnZpY2UsXG4gIE5vdm9UZW1wbGF0ZVNlcnZpY2UsXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0VsZW1lbnRQcm92aWRlcnMge1xuICBzdGF0aWMgZm9yUm9vdChvcHRpb25zPzogeyBtZW51OiBJTWVudU9wdGlvbnMgfSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Tm92b0VsZW1lbnRQcm92aWRlcnM+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5vdm9FbGVtZW50UHJvdmlkZXJzLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIC4uLk5PVk9fRUxFTUVOVFNfUFJPVklERVJTLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogTUVOVV9PUFRJT05TLFxuICAgICAgICAgIHVzZVZhbHVlOiBvcHRpb25zICYmIG9wdGlvbnMubWVudSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBmb3JDaGlsZCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE5vdm9FbGVtZW50UHJvdmlkZXJzPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOb3ZvRWxlbWVudFByb3ZpZGVycyxcbiAgICB9O1xuICB9XG59XG4iXX0=