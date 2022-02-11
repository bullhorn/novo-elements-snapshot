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
NovoElementProviders.ɵmod = i0.ɵɵdefineNgModule({ type: NovoElementProviders });
NovoElementProviders.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoElementProviders_Factory(t) { return new (t || NovoElementProviders)(); }, imports: [[]] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoElementProviders, [{
        type: NgModule,
        args: [{
                imports: [],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm92by1lbGVtZW50cy5wcm92aWRlcnMuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsibm92by1lbGVtZW50cy5wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUUzRCw2REFBNkQ7QUFDN0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsTUFBTTtBQUNOLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDbkUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7QUFFeEUsTUFBTSx1QkFBdUIsR0FBRztJQUM5QixFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUU7SUFDN0QscURBQXFEO0lBQ3JELEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRTtJQUN6RCxxREFBcUQ7SUFDckQsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFO0lBQ3pELEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRTtJQUMvRCxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUU7SUFDekQsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUU7SUFDckQsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRTtJQUNsRCxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUU7SUFDL0QsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUU7SUFDckQsbUJBQW1CO0lBQ25CLGlCQUFpQjtJQUNqQixRQUFRO0lBQ1IsbUJBQW1CO0NBQ3BCLENBQUM7QUFLRixNQUFNLE9BQU8sb0JBQW9CO0lBQy9CLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBZ0M7UUFDN0MsT0FBTztZQUNMLFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsU0FBUyxFQUFFO2dCQUNULEdBQUcsdUJBQXVCO2dCQUMxQjtvQkFDRSxPQUFPLEVBQUUsWUFBWTtvQkFDckIsUUFBUSxFQUFFLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSTtpQkFDbEM7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVE7UUFDYixPQUFPO1lBQ0wsUUFBUSxFQUFFLG9CQUFvQjtTQUMvQixDQUFDO0lBQ0osQ0FBQzs7d0RBbEJVLG9CQUFvQjt1SEFBcEIsb0JBQW9CLGtCQUZ0QixFQUFFO2tEQUVBLG9CQUFvQjtjQUhoQyxRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFLEVBQUU7YUFDWiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9Bc2lkZVNlcnZpY2UgfSBmcm9tICcuL2VsZW1lbnRzL2FzaWRlL2FzaWRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTm92b0RyYWd1bGFTZXJ2aWNlIH0gZnJvbSAnLi9lbGVtZW50cy9kcmFndWxhL0RyYWd1bGFTZXJ2aWNlJztcbmltcG9ydCB7IEZpZWxkSW50ZXJhY3Rpb25BcGkgfSBmcm9tICcuL2VsZW1lbnRzL2Zvcm0vRmllbGRJbnRlcmFjdGlvbkFwaSc7XG5pbXBvcnQgeyBNRU5VX09QVElPTlMgfSBmcm9tICcuL2VsZW1lbnRzL21lbnUvbWVudS50b2tlbnMnO1xuaW1wb3J0IHsgSU1lbnVPcHRpb25zIH0gZnJvbSAnLi9lbGVtZW50cy9tZW51L21lbnUudHlwZXMnO1xuLy8gaW1wb3J0IHsgTm92b0FzaWRlUmVmIH0gZnJvbSAnLi9lbGVtZW50cy9hc2lkZS9hc2lkZS1yZWYnO1xuaW1wb3J0IHsgTm92b01vZGFsU2VydmljZSB9IGZyb20gJy4vZWxlbWVudHMvbW9kYWwvbW9kYWwuc2VydmljZSc7XG4vLyBBUFBcbmltcG9ydCB7IEdvb2dsZVBsYWNlc1NlcnZpY2UgfSBmcm9tICcuL2VsZW1lbnRzL3BsYWNlcy9wbGFjZXMuc2VydmljZSc7XG5pbXBvcnQgeyBOb3ZvVG9hc3RTZXJ2aWNlIH0gZnJvbSAnLi9lbGVtZW50cy90b2FzdC9Ub2FzdFNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZUZvcm1hdFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2RhdGUtZm9ybWF0L0RhdGVGb3JtYXQnO1xuaW1wb3J0IHsgQnJvd3Nlckdsb2JhbFJlZiwgR2xvYmFsUmVmIH0gZnJvbSAnLi9zZXJ2aWNlcy9nbG9iYWwvZ2xvYmFsLnNlcnZpY2UnO1xuaW1wb3J0IHsgT3B0aW9uc1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL29wdGlvbnMvT3B0aW9uc1NlcnZpY2UnO1xuaW1wb3J0IHsgU2VjdXJpdHkgfSBmcm9tICcuL3NlcnZpY2VzL3NlY3VyaXR5L1NlY3VyaXR5JztcbmltcG9ydCB7IExvY2FsU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3N0b3JhZ2Uvc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IE5vdm9UZW1wbGF0ZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3RlbXBsYXRlL05vdm9UZW1wbGF0ZVNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tcG9uZW50VXRpbHMgfSBmcm9tICcuL3V0aWxzL2NvbXBvbmVudC11dGlscy9Db21wb25lbnRVdGlscyc7XG5cbmNvbnN0IE5PVk9fRUxFTUVOVFNfUFJPVklERVJTID0gW1xuICB7IHByb3ZpZGU6IE5vdm9EcmFndWxhU2VydmljZSwgdXNlQ2xhc3M6IE5vdm9EcmFndWxhU2VydmljZSB9LFxuICAvLyB7IHByb3ZpZGU6IE5vdm9Bc2lkZVJlZiwgdXNlQ2xhc3M6IE5vdm9Bc2lkZVJlZiB9LFxuICB7IHByb3ZpZGU6IE5vdm9Bc2lkZVNlcnZpY2UsIHVzZUNsYXNzOiBOb3ZvQXNpZGVTZXJ2aWNlIH0sXG4gIC8vIHsgcHJvdmlkZTogTm92b01vZGFsUmVmLCB1c2VDbGFzczogTm92b01vZGFsUmVmIH0sXG4gIHsgcHJvdmlkZTogTm92b01vZGFsU2VydmljZSwgdXNlQ2xhc3M6IE5vdm9Nb2RhbFNlcnZpY2UgfSxcbiAgeyBwcm92aWRlOiBHb29nbGVQbGFjZXNTZXJ2aWNlLCB1c2VDbGFzczogR29vZ2xlUGxhY2VzU2VydmljZSB9LFxuICB7IHByb3ZpZGU6IE5vdm9Ub2FzdFNlcnZpY2UsIHVzZUNsYXNzOiBOb3ZvVG9hc3RTZXJ2aWNlIH0sXG4gIHsgcHJvdmlkZTogQ29tcG9uZW50VXRpbHMsIHVzZUNsYXNzOiBDb21wb25lbnRVdGlscyB9LFxuICB7IHByb3ZpZGU6IEdsb2JhbFJlZiwgdXNlQ2xhc3M6IEJyb3dzZXJHbG9iYWxSZWYgfSxcbiAgeyBwcm92aWRlOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlLCB1c2VDbGFzczogTG9jYWxTdG9yYWdlU2VydmljZSB9LFxuICB7IHByb3ZpZGU6IE9wdGlvbnNTZXJ2aWNlLCB1c2VDbGFzczogT3B0aW9uc1NlcnZpY2UgfSxcbiAgRmllbGRJbnRlcmFjdGlvbkFwaSxcbiAgRGF0ZUZvcm1hdFNlcnZpY2UsXG4gIFNlY3VyaXR5LFxuICBOb3ZvVGVtcGxhdGVTZXJ2aWNlLFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW10sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9FbGVtZW50UHJvdmlkZXJzIHtcbiAgc3RhdGljIGZvclJvb3Qob3B0aW9ucz86IHsgbWVudTogSU1lbnVPcHRpb25zIH0pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE5vdm9FbGVtZW50UHJvdmlkZXJzPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOb3ZvRWxlbWVudFByb3ZpZGVycyxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAuLi5OT1ZPX0VMRU1FTlRTX1BST1ZJREVSUyxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IE1FTlVfT1BUSU9OUyxcbiAgICAgICAgICB1c2VWYWx1ZTogb3B0aW9ucyAmJiBvcHRpb25zLm1lbnUsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZm9yQ2hpbGQoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxOb3ZvRWxlbWVudFByb3ZpZGVycz4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTm92b0VsZW1lbnRQcm92aWRlcnMsXG4gICAgfTtcbiAgfVxufVxuIl19