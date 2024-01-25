import { NgModule } from '@angular/core';
import { NovoDragulaService } from 'novo-elements/addons';
import { FieldInteractionApi, GooglePlacesService, MENU_OPTIONS, NovoAsideService, NovoModalService, NovoToastService, } from 'novo-elements/elements';
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
NovoElementProviders.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoElementProviders, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoElementProviders.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: NovoElementProviders });
NovoElementProviders.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoElementProviders });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoElementProviders, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm92by1lbGVtZW50cy5wcm92aWRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9ub3ZvLWVsZW1lbnRzLnByb3ZpZGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRCxPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLG1CQUFtQixFQUNMLFlBQVksRUFDMUIsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQixnQkFBZ0IsR0FDakIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULG1CQUFtQixFQUNuQixtQkFBbUIsRUFDbkIsY0FBYyxHQUNmLE1BQU0sd0JBQXdCLENBQUM7O0FBRWhDLE1BQU0sdUJBQXVCLEdBQUc7SUFDOUIsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFFO0lBQzdELEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRTtJQUN6RCxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUU7SUFDekQsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFO0lBQy9ELEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRTtJQUN6RCxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRTtJQUNyRCxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFO0lBQ2xELEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRTtJQUMvRCxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRTtJQUNyRCxtQkFBbUI7SUFDbkIsaUJBQWlCO0lBQ2pCLG1CQUFtQjtDQUNwQixDQUFDO0FBS0YsTUFBTSxPQUFPLG9CQUFvQjtJQUMvQixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQWdDO1FBQzdDLE9BQU87WUFDTCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLFNBQVMsRUFBRTtnQkFDVCxHQUFHLHVCQUF1QjtnQkFDMUI7b0JBQ0UsT0FBTyxFQUFFLFlBQVk7b0JBQ3JCLFFBQVEsRUFBRSxPQUFPLElBQUksT0FBTyxDQUFDLElBQUk7aUJBQ2xDO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRO1FBQ2IsT0FBTztZQUNMLFFBQVEsRUFBRSxvQkFBb0I7U0FDL0IsQ0FBQztJQUNKLENBQUM7O2lIQWxCVSxvQkFBb0I7a0hBQXBCLG9CQUFvQjtrSEFBcEIsb0JBQW9COzJGQUFwQixvQkFBb0I7a0JBSGhDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLEVBQUU7aUJBQ1oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0RyYWd1bGFTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9hZGRvbnMnO1xuaW1wb3J0IHtcbiAgRmllbGRJbnRlcmFjdGlvbkFwaSxcbiAgR29vZ2xlUGxhY2VzU2VydmljZSxcbiAgSU1lbnVPcHRpb25zLCBNRU5VX09QVElPTlMsXG4gIE5vdm9Bc2lkZVNlcnZpY2UsXG4gIE5vdm9Nb2RhbFNlcnZpY2UsXG4gIE5vdm9Ub2FzdFNlcnZpY2UsXG59IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMnO1xuaW1wb3J0IHtcbiAgQnJvd3Nlckdsb2JhbFJlZixcbiAgQ29tcG9uZW50VXRpbHMsXG4gIERhdGVGb3JtYXRTZXJ2aWNlLFxuICBHbG9iYWxSZWYsXG4gIExvY2FsU3RvcmFnZVNlcnZpY2UsXG4gIE5vdm9UZW1wbGF0ZVNlcnZpY2UsXG4gIE9wdGlvbnNTZXJ2aWNlLFxufSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcblxuY29uc3QgTk9WT19FTEVNRU5UU19QUk9WSURFUlMgPSBbXG4gIHsgcHJvdmlkZTogTm92b0RyYWd1bGFTZXJ2aWNlLCB1c2VDbGFzczogTm92b0RyYWd1bGFTZXJ2aWNlIH0sXG4gIHsgcHJvdmlkZTogTm92b0FzaWRlU2VydmljZSwgdXNlQ2xhc3M6IE5vdm9Bc2lkZVNlcnZpY2UgfSxcbiAgeyBwcm92aWRlOiBOb3ZvTW9kYWxTZXJ2aWNlLCB1c2VDbGFzczogTm92b01vZGFsU2VydmljZSB9LFxuICB7IHByb3ZpZGU6IEdvb2dsZVBsYWNlc1NlcnZpY2UsIHVzZUNsYXNzOiBHb29nbGVQbGFjZXNTZXJ2aWNlIH0sXG4gIHsgcHJvdmlkZTogTm92b1RvYXN0U2VydmljZSwgdXNlQ2xhc3M6IE5vdm9Ub2FzdFNlcnZpY2UgfSxcbiAgeyBwcm92aWRlOiBDb21wb25lbnRVdGlscywgdXNlQ2xhc3M6IENvbXBvbmVudFV0aWxzIH0sXG4gIHsgcHJvdmlkZTogR2xvYmFsUmVmLCB1c2VDbGFzczogQnJvd3Nlckdsb2JhbFJlZiB9LFxuICB7IHByb3ZpZGU6IExvY2FsU3RvcmFnZVNlcnZpY2UsIHVzZUNsYXNzOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0sXG4gIHsgcHJvdmlkZTogT3B0aW9uc1NlcnZpY2UsIHVzZUNsYXNzOiBPcHRpb25zU2VydmljZSB9LFxuICBGaWVsZEludGVyYWN0aW9uQXBpLFxuICBEYXRlRm9ybWF0U2VydmljZSxcbiAgTm92b1RlbXBsYXRlU2VydmljZSxcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRWxlbWVudFByb3ZpZGVycyB7XG4gIHN0YXRpYyBmb3JSb290KG9wdGlvbnM/OiB7IG1lbnU6IElNZW51T3B0aW9ucyB9KTogTW9kdWxlV2l0aFByb3ZpZGVyczxOb3ZvRWxlbWVudFByb3ZpZGVycz4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTm92b0VsZW1lbnRQcm92aWRlcnMsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgLi4uTk9WT19FTEVNRU5UU19QUk9WSURFUlMsXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBNRU5VX09QVElPTlMsXG4gICAgICAgICAgdXNlVmFsdWU6IG9wdGlvbnMgJiYgb3B0aW9ucy5tZW51LFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGZvckNoaWxkKCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Tm92b0VsZW1lbnRQcm92aWRlcnM+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5vdm9FbGVtZW50UHJvdmlkZXJzLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==