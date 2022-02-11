// NG2
import { NgModule } from '@angular/core';
import { NovoAsideService } from './elements/aside/aside.service';
import { NovoDragulaService } from './elements/dragula/DragulaService';
import { FieldInteractionApi } from './elements/form/FieldInteractionApi';
import { MENU_OPTIONS } from './elements/menu/menu.tokens';
// import { NovoAsideRef } from './elements/aside/aside-ref';
import { NovoModalService } from './elements/modal/modal.service';
// APP
import { GooglePlacesService } from './elements/places/places.service';
import { NovoToastService } from './elements/toast/ToastService';
import { DateFormatService } from './services/date-format/DateFormat';
import { BrowserGlobalRef, GlobalRef } from './services/global/global.service';
import { OptionsService } from './services/options/OptionsService';
import { Security } from './services/security/Security';
import { LocalStorageService } from './services/storage/storage.service';
import { NovoTemplateService } from './services/template/NovoTemplateService';
import { ComponentUtils } from './utils/component-utils/ComponentUtils';
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
    Security,
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
NovoElementProviders.decorators = [
    { type: NgModule, args: [{
                imports: [],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm92by1lbGVtZW50cy5wcm92aWRlcnMuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvbm92by1lbGVtZW50cy5wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUUzRCw2REFBNkQ7QUFDN0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsTUFBTTtBQUNOLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDbkUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUV4RSxNQUFNLHVCQUF1QixHQUFHO0lBQzlCLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRTtJQUM3RCxxREFBcUQ7SUFDckQsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFO0lBQ3pELHFEQUFxRDtJQUNyRCxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUU7SUFDekQsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFO0lBQy9ELEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRTtJQUN6RCxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRTtJQUNyRCxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFO0lBQ2xELEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRTtJQUMvRCxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRTtJQUNyRCxtQkFBbUI7SUFDbkIsaUJBQWlCO0lBQ2pCLFFBQVE7SUFDUixtQkFBbUI7Q0FDcEIsQ0FBQztBQUtGLE1BQU0sT0FBTyxvQkFBb0I7SUFDL0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFnQztRQUM3QyxPQUFPO1lBQ0wsUUFBUSxFQUFFLG9CQUFvQjtZQUM5QixTQUFTLEVBQUU7Z0JBQ1QsR0FBRyx1QkFBdUI7Z0JBQzFCO29CQUNFLE9BQU8sRUFBRSxZQUFZO29CQUNyQixRQUFRLEVBQUUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJO2lCQUNsQzthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsUUFBUTtRQUNiLE9BQU87WUFDTCxRQUFRLEVBQUUsb0JBQW9CO1NBQy9CLENBQUM7SUFDSixDQUFDOzs7WUFyQkYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxFQUFFO2FBQ1oiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvQXNpZGVTZXJ2aWNlIH0gZnJvbSAnLi9lbGVtZW50cy9hc2lkZS9hc2lkZS5zZXJ2aWNlJztcbmltcG9ydCB7IE5vdm9EcmFndWxhU2VydmljZSB9IGZyb20gJy4vZWxlbWVudHMvZHJhZ3VsYS9EcmFndWxhU2VydmljZSc7XG5pbXBvcnQgeyBGaWVsZEludGVyYWN0aW9uQXBpIH0gZnJvbSAnLi9lbGVtZW50cy9mb3JtL0ZpZWxkSW50ZXJhY3Rpb25BcGknO1xuaW1wb3J0IHsgTUVOVV9PUFRJT05TIH0gZnJvbSAnLi9lbGVtZW50cy9tZW51L21lbnUudG9rZW5zJztcbmltcG9ydCB7IElNZW51T3B0aW9ucyB9IGZyb20gJy4vZWxlbWVudHMvbWVudS9tZW51LnR5cGVzJztcbi8vIGltcG9ydCB7IE5vdm9Bc2lkZVJlZiB9IGZyb20gJy4vZWxlbWVudHMvYXNpZGUvYXNpZGUtcmVmJztcbmltcG9ydCB7IE5vdm9Nb2RhbFNlcnZpY2UgfSBmcm9tICcuL2VsZW1lbnRzL21vZGFsL21vZGFsLnNlcnZpY2UnO1xuLy8gQVBQXG5pbXBvcnQgeyBHb29nbGVQbGFjZXNTZXJ2aWNlIH0gZnJvbSAnLi9lbGVtZW50cy9wbGFjZXMvcGxhY2VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTm92b1RvYXN0U2VydmljZSB9IGZyb20gJy4vZWxlbWVudHMvdG9hc3QvVG9hc3RTZXJ2aWNlJztcbmltcG9ydCB7IERhdGVGb3JtYXRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9kYXRlLWZvcm1hdC9EYXRlRm9ybWF0JztcbmltcG9ydCB7IEJyb3dzZXJHbG9iYWxSZWYsIEdsb2JhbFJlZiB9IGZyb20gJy4vc2VydmljZXMvZ2xvYmFsL2dsb2JhbC5zZXJ2aWNlJztcbmltcG9ydCB7IE9wdGlvbnNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9vcHRpb25zL09wdGlvbnNTZXJ2aWNlJztcbmltcG9ydCB7IFNlY3VyaXR5IH0gZnJvbSAnLi9zZXJ2aWNlcy9zZWN1cml0eS9TZWN1cml0eSc7XG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9zdG9yYWdlL3N0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBOb3ZvVGVtcGxhdGVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy90ZW1wbGF0ZS9Ob3ZvVGVtcGxhdGVTZXJ2aWNlJztcbmltcG9ydCB7IENvbXBvbmVudFV0aWxzIH0gZnJvbSAnLi91dGlscy9jb21wb25lbnQtdXRpbHMvQ29tcG9uZW50VXRpbHMnO1xuXG5jb25zdCBOT1ZPX0VMRU1FTlRTX1BST1ZJREVSUyA9IFtcbiAgeyBwcm92aWRlOiBOb3ZvRHJhZ3VsYVNlcnZpY2UsIHVzZUNsYXNzOiBOb3ZvRHJhZ3VsYVNlcnZpY2UgfSxcbiAgLy8geyBwcm92aWRlOiBOb3ZvQXNpZGVSZWYsIHVzZUNsYXNzOiBOb3ZvQXNpZGVSZWYgfSxcbiAgeyBwcm92aWRlOiBOb3ZvQXNpZGVTZXJ2aWNlLCB1c2VDbGFzczogTm92b0FzaWRlU2VydmljZSB9LFxuICAvLyB7IHByb3ZpZGU6IE5vdm9Nb2RhbFJlZiwgdXNlQ2xhc3M6IE5vdm9Nb2RhbFJlZiB9LFxuICB7IHByb3ZpZGU6IE5vdm9Nb2RhbFNlcnZpY2UsIHVzZUNsYXNzOiBOb3ZvTW9kYWxTZXJ2aWNlIH0sXG4gIHsgcHJvdmlkZTogR29vZ2xlUGxhY2VzU2VydmljZSwgdXNlQ2xhc3M6IEdvb2dsZVBsYWNlc1NlcnZpY2UgfSxcbiAgeyBwcm92aWRlOiBOb3ZvVG9hc3RTZXJ2aWNlLCB1c2VDbGFzczogTm92b1RvYXN0U2VydmljZSB9LFxuICB7IHByb3ZpZGU6IENvbXBvbmVudFV0aWxzLCB1c2VDbGFzczogQ29tcG9uZW50VXRpbHMgfSxcbiAgeyBwcm92aWRlOiBHbG9iYWxSZWYsIHVzZUNsYXNzOiBCcm93c2VyR2xvYmFsUmVmIH0sXG4gIHsgcHJvdmlkZTogTG9jYWxTdG9yYWdlU2VydmljZSwgdXNlQ2xhc3M6IExvY2FsU3RvcmFnZVNlcnZpY2UgfSxcbiAgeyBwcm92aWRlOiBPcHRpb25zU2VydmljZSwgdXNlQ2xhc3M6IE9wdGlvbnNTZXJ2aWNlIH0sXG4gIEZpZWxkSW50ZXJhY3Rpb25BcGksXG4gIERhdGVGb3JtYXRTZXJ2aWNlLFxuICBTZWN1cml0eSxcbiAgTm92b1RlbXBsYXRlU2VydmljZSxcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRWxlbWVudFByb3ZpZGVycyB7XG4gIHN0YXRpYyBmb3JSb290KG9wdGlvbnM/OiB7IG1lbnU6IElNZW51T3B0aW9ucyB9KTogTW9kdWxlV2l0aFByb3ZpZGVyczxOb3ZvRWxlbWVudFByb3ZpZGVycz4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTm92b0VsZW1lbnRQcm92aWRlcnMsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgLi4uTk9WT19FTEVNRU5UU19QUk9WSURFUlMsXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBNRU5VX09QVElPTlMsXG4gICAgICAgICAgdXNlVmFsdWU6IG9wdGlvbnMgJiYgb3B0aW9ucy5tZW51LFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGZvckNoaWxkKCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Tm92b0VsZW1lbnRQcm92aWRlcnM+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5vdm9FbGVtZW50UHJvdmlkZXJzLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==