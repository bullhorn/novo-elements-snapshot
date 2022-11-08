// NG2
import { NgModule } from '@angular/core';
import { NovoDragulaService } from 'novo-elements/addons';
import { FieldInteractionApi, GooglePlacesService, MENU_OPTIONS, NovoAsideService, NovoModalService, NovoToastService, } from 'novo-elements/components';
import { BrowserGlobalRef, ComponentUtils, DateFormatService, GlobalRef, LocalStorageService, NovoTemplateService, OptionsService, } from 'novo-elements/services';
import * as i0 from "@angular/core";
const NOVO_ELEMENTS_PROVIDERS = [
    { provide: NovoDragulaService, useClass: NovoDragulaService },
    // { provide: NovoAsideRef, useClass: NovoAsideRef },
    { provide: NovoAsideService, useClass: NovoAsideService },
    // { provide: NovoModalRef, useClass: NovoModalRef },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm92by1lbGVtZW50cy5wcm92aWRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9tb2R1bGVzL25vdm8tZWxlbWVudHMucHJvdmlkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRCxPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLG1CQUFtQixFQUVuQixZQUFZLEVBQ1osZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQixnQkFBZ0IsR0FDakIsTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULG1CQUFtQixFQUNuQixtQkFBbUIsRUFDbkIsY0FBYyxHQUNmLE1BQU0sd0JBQXdCLENBQUM7O0FBRWhDLE1BQU0sdUJBQXVCLEdBQUc7SUFDOUIsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFFO0lBQzdELHFEQUFxRDtJQUNyRCxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUU7SUFDekQscURBQXFEO0lBQ3JELEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRTtJQUN6RCxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUU7SUFDL0QsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFO0lBQ3pELEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFO0lBQ3JELEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUU7SUFDbEQsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFO0lBQy9ELEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFO0lBQ3JELG1CQUFtQjtJQUNuQixpQkFBaUI7SUFDakIsbUJBQW1CO0NBQ3BCLENBQUM7QUFLRixNQUFNLE9BQU8sb0JBQW9CO0lBQy9CLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBZ0M7UUFDN0MsT0FBTztZQUNMLFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsU0FBUyxFQUFFO2dCQUNULEdBQUcsdUJBQXVCO2dCQUMxQjtvQkFDRSxPQUFPLEVBQUUsWUFBWTtvQkFDckIsUUFBUSxFQUFFLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSTtpQkFDbEM7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVE7UUFDYixPQUFPO1lBQ0wsUUFBUSxFQUFFLG9CQUFvQjtTQUMvQixDQUFDO0lBQ0osQ0FBQzs7a0hBbEJVLG9CQUFvQjttSEFBcEIsb0JBQW9CO21IQUFwQixvQkFBb0IsWUFGdEIsRUFBRTs0RkFFQSxvQkFBb0I7a0JBSGhDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLEVBQUU7aUJBQ1oiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvRHJhZ3VsYVNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2FkZG9ucyc7XG5pbXBvcnQge1xuICBGaWVsZEludGVyYWN0aW9uQXBpLFxuICBHb29nbGVQbGFjZXNTZXJ2aWNlLFxuICBJTWVudU9wdGlvbnMsXG4gIE1FTlVfT1BUSU9OUyxcbiAgTm92b0FzaWRlU2VydmljZSxcbiAgTm92b01vZGFsU2VydmljZSxcbiAgTm92b1RvYXN0U2VydmljZSxcbn0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzJztcbmltcG9ydCB7XG4gIEJyb3dzZXJHbG9iYWxSZWYsXG4gIENvbXBvbmVudFV0aWxzLFxuICBEYXRlRm9ybWF0U2VydmljZSxcbiAgR2xvYmFsUmVmLFxuICBMb2NhbFN0b3JhZ2VTZXJ2aWNlLFxuICBOb3ZvVGVtcGxhdGVTZXJ2aWNlLFxuICBPcHRpb25zU2VydmljZSxcbn0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5cbmNvbnN0IE5PVk9fRUxFTUVOVFNfUFJPVklERVJTID0gW1xuICB7IHByb3ZpZGU6IE5vdm9EcmFndWxhU2VydmljZSwgdXNlQ2xhc3M6IE5vdm9EcmFndWxhU2VydmljZSB9LFxuICAvLyB7IHByb3ZpZGU6IE5vdm9Bc2lkZVJlZiwgdXNlQ2xhc3M6IE5vdm9Bc2lkZVJlZiB9LFxuICB7IHByb3ZpZGU6IE5vdm9Bc2lkZVNlcnZpY2UsIHVzZUNsYXNzOiBOb3ZvQXNpZGVTZXJ2aWNlIH0sXG4gIC8vIHsgcHJvdmlkZTogTm92b01vZGFsUmVmLCB1c2VDbGFzczogTm92b01vZGFsUmVmIH0sXG4gIHsgcHJvdmlkZTogTm92b01vZGFsU2VydmljZSwgdXNlQ2xhc3M6IE5vdm9Nb2RhbFNlcnZpY2UgfSxcbiAgeyBwcm92aWRlOiBHb29nbGVQbGFjZXNTZXJ2aWNlLCB1c2VDbGFzczogR29vZ2xlUGxhY2VzU2VydmljZSB9LFxuICB7IHByb3ZpZGU6IE5vdm9Ub2FzdFNlcnZpY2UsIHVzZUNsYXNzOiBOb3ZvVG9hc3RTZXJ2aWNlIH0sXG4gIHsgcHJvdmlkZTogQ29tcG9uZW50VXRpbHMsIHVzZUNsYXNzOiBDb21wb25lbnRVdGlscyB9LFxuICB7IHByb3ZpZGU6IEdsb2JhbFJlZiwgdXNlQ2xhc3M6IEJyb3dzZXJHbG9iYWxSZWYgfSxcbiAgeyBwcm92aWRlOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlLCB1c2VDbGFzczogTG9jYWxTdG9yYWdlU2VydmljZSB9LFxuICB7IHByb3ZpZGU6IE9wdGlvbnNTZXJ2aWNlLCB1c2VDbGFzczogT3B0aW9uc1NlcnZpY2UgfSxcbiAgRmllbGRJbnRlcmFjdGlvbkFwaSxcbiAgRGF0ZUZvcm1hdFNlcnZpY2UsXG4gIE5vdm9UZW1wbGF0ZVNlcnZpY2UsXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0VsZW1lbnRQcm92aWRlcnMge1xuICBzdGF0aWMgZm9yUm9vdChvcHRpb25zPzogeyBtZW51OiBJTWVudU9wdGlvbnMgfSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Tm92b0VsZW1lbnRQcm92aWRlcnM+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5vdm9FbGVtZW50UHJvdmlkZXJzLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIC4uLk5PVk9fRUxFTUVOVFNfUFJPVklERVJTLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogTUVOVV9PUFRJT05TLFxuICAgICAgICAgIHVzZVZhbHVlOiBvcHRpb25zICYmIG9wdGlvbnMubWVudSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBmb3JDaGlsZCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE5vdm9FbGVtZW50UHJvdmlkZXJzPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOb3ZvRWxlbWVudFByb3ZpZGVycyxcbiAgICB9O1xuICB9XG59XG4iXX0=