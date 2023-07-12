import { NgModule } from '@angular/core';
import { NovoDragulaService } from 'novo-elements/addons';
import { NovoAsideService, FieldInteractionApi, MENU_OPTIONS, NovoModalService, GooglePlacesService, NovoToastService, } from 'novo-elements/elements';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm92by1lbGVtZW50cy5wcm92aWRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9ub3ZvLWVsZW1lbnRzLnByb3ZpZGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRCxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLG1CQUFtQixFQUNMLFlBQVksRUFDMUIsZ0JBQWdCLEVBQ2hCLG1CQUFtQixFQUNuQixnQkFBZ0IsR0FDakIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULG1CQUFtQixFQUNuQixtQkFBbUIsRUFDbkIsY0FBYyxHQUNmLE1BQU0sd0JBQXdCLENBQUM7O0FBRWhDLE1BQU0sdUJBQXVCLEdBQUc7SUFDOUIsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFFO0lBQzdELEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRTtJQUN6RCxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUU7SUFDekQsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFO0lBQy9ELEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRTtJQUN6RCxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRTtJQUNyRCxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFO0lBQ2xELEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRTtJQUMvRCxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRTtJQUNyRCxtQkFBbUI7SUFDbkIsaUJBQWlCO0lBQ2pCLG1CQUFtQjtDQUNwQixDQUFDO0FBS0YsTUFBTSxPQUFPLG9CQUFvQjtJQUMvQixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQWdDO1FBQzdDLE9BQU87WUFDTCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLFNBQVMsRUFBRTtnQkFDVCxHQUFHLHVCQUF1QjtnQkFDMUI7b0JBQ0UsT0FBTyxFQUFFLFlBQVk7b0JBQ3JCLFFBQVEsRUFBRSxPQUFPLElBQUksT0FBTyxDQUFDLElBQUk7aUJBQ2xDO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRO1FBQ2IsT0FBTztZQUNMLFFBQVEsRUFBRSxvQkFBb0I7U0FDL0IsQ0FBQztJQUNKLENBQUM7O2tIQWxCVSxvQkFBb0I7bUhBQXBCLG9CQUFvQjttSEFBcEIsb0JBQW9CLFlBRnRCLEVBQUU7NEZBRUEsb0JBQW9CO2tCQUhoQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxFQUFFO2lCQUNaIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9EcmFndWxhU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvYWRkb25zJztcbmltcG9ydCB7XG4gIE5vdm9Bc2lkZVNlcnZpY2UsXG4gIEZpZWxkSW50ZXJhY3Rpb25BcGksXG4gIElNZW51T3B0aW9ucywgTUVOVV9PUFRJT05TLFxuICBOb3ZvTW9kYWxTZXJ2aWNlLFxuICBHb29nbGVQbGFjZXNTZXJ2aWNlLFxuICBOb3ZvVG9hc3RTZXJ2aWNlLFxufSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzJztcbmltcG9ydCB7XG4gIEJyb3dzZXJHbG9iYWxSZWYsXG4gIENvbXBvbmVudFV0aWxzLFxuICBEYXRlRm9ybWF0U2VydmljZSxcbiAgR2xvYmFsUmVmLFxuICBMb2NhbFN0b3JhZ2VTZXJ2aWNlLFxuICBOb3ZvVGVtcGxhdGVTZXJ2aWNlLFxuICBPcHRpb25zU2VydmljZSxcbn0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5cbmNvbnN0IE5PVk9fRUxFTUVOVFNfUFJPVklERVJTID0gW1xuICB7IHByb3ZpZGU6IE5vdm9EcmFndWxhU2VydmljZSwgdXNlQ2xhc3M6IE5vdm9EcmFndWxhU2VydmljZSB9LFxuICB7IHByb3ZpZGU6IE5vdm9Bc2lkZVNlcnZpY2UsIHVzZUNsYXNzOiBOb3ZvQXNpZGVTZXJ2aWNlIH0sXG4gIHsgcHJvdmlkZTogTm92b01vZGFsU2VydmljZSwgdXNlQ2xhc3M6IE5vdm9Nb2RhbFNlcnZpY2UgfSxcbiAgeyBwcm92aWRlOiBHb29nbGVQbGFjZXNTZXJ2aWNlLCB1c2VDbGFzczogR29vZ2xlUGxhY2VzU2VydmljZSB9LFxuICB7IHByb3ZpZGU6IE5vdm9Ub2FzdFNlcnZpY2UsIHVzZUNsYXNzOiBOb3ZvVG9hc3RTZXJ2aWNlIH0sXG4gIHsgcHJvdmlkZTogQ29tcG9uZW50VXRpbHMsIHVzZUNsYXNzOiBDb21wb25lbnRVdGlscyB9LFxuICB7IHByb3ZpZGU6IEdsb2JhbFJlZiwgdXNlQ2xhc3M6IEJyb3dzZXJHbG9iYWxSZWYgfSxcbiAgeyBwcm92aWRlOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlLCB1c2VDbGFzczogTG9jYWxTdG9yYWdlU2VydmljZSB9LFxuICB7IHByb3ZpZGU6IE9wdGlvbnNTZXJ2aWNlLCB1c2VDbGFzczogT3B0aW9uc1NlcnZpY2UgfSxcbiAgRmllbGRJbnRlcmFjdGlvbkFwaSxcbiAgRGF0ZUZvcm1hdFNlcnZpY2UsXG4gIE5vdm9UZW1wbGF0ZVNlcnZpY2UsXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0VsZW1lbnRQcm92aWRlcnMge1xuICBzdGF0aWMgZm9yUm9vdChvcHRpb25zPzogeyBtZW51OiBJTWVudU9wdGlvbnMgfSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Tm92b0VsZW1lbnRQcm92aWRlcnM+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5vdm9FbGVtZW50UHJvdmlkZXJzLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIC4uLk5PVk9fRUxFTUVOVFNfUFJPVklERVJTLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogTUVOVV9PUFRJT05TLFxuICAgICAgICAgIHVzZVZhbHVlOiBvcHRpb25zICYmIG9wdGlvbnMubWVudSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBmb3JDaGlsZCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE5vdm9FbGVtZW50UHJvdmlkZXJzPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOb3ZvRWxlbWVudFByb3ZpZGVycyxcbiAgICB9O1xuICB9XG59XG4iXX0=