/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// NG2
import { NgModule } from '@angular/core';
// APP
import { GooglePlacesService } from './elements/places/places.service';
import { NovoDragulaService } from './elements/dragula/DragulaService';
import { NovoModalService } from './elements/modal/ModalService';
import { NovoModalRef } from './elements/modal/Modal';
import { NovoToastService } from './elements/toast/ToastService';
import { ComponentUtils } from './utils/component-utils/ComponentUtils';
import { FieldInteractionApi } from './elements/form/FieldInteractionApi';
import { DateFormatService } from './services/date-format/DateFormat';
import { GlobalRef, BrowserGlobalRef } from './services/global/global.service';
import { LocalStorageService } from './services/storage/storage.service';
import { Security } from './services/security/Security';
import { OptionsService } from './services/options/OptionsService';
import { NovoTemplateService } from './services/template/NovoTemplateService';
/** @type {?} */
const NOVO_ELEMENTS_PROVIDERS = [
    { provide: NovoDragulaService, useClass: NovoDragulaService },
    { provide: NovoModalRef, useClass: NovoModalRef },
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
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: NovoElementProviders,
            providers: [...NOVO_ELEMENTS_PROVIDERS],
        };
    }
    /**
     * @return {?}
     */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm92by1lbGVtZW50cy5wcm92aWRlcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsibm92by1lbGVtZW50cy5wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUV6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDakUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDOztNQUV4RSx1QkFBdUIsR0FBRztJQUM5QixFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUU7SUFDN0QsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUU7SUFDakQsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFO0lBQ3pELEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRTtJQUMvRCxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUU7SUFDekQsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUU7SUFDckQsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRTtJQUNsRCxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUU7SUFDL0QsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUU7SUFDckQsbUJBQW1CO0lBQ25CLGlCQUFpQjtJQUNqQixRQUFRO0lBQ1IsbUJBQW1CO0NBQ3BCO0FBS0QsTUFBTSxPQUFPLG9CQUFvQjs7OztJQUMvQixNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLFNBQVMsRUFBRSxDQUFDLEdBQUcsdUJBQXVCLENBQUM7U0FDeEMsQ0FBQztJQUNKLENBQUM7Ozs7SUFFRCxNQUFNLENBQUMsUUFBUTtRQUNiLE9BQU87WUFDTCxRQUFRLEVBQUUsb0JBQW9CO1NBQy9CLENBQUM7SUFDSixDQUFDOzs7WUFmRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLEVBQUU7YUFDWiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEFQUFxuaW1wb3J0IHsgR29vZ2xlUGxhY2VzU2VydmljZSB9IGZyb20gJy4vZWxlbWVudHMvcGxhY2VzL3BsYWNlcy5zZXJ2aWNlJztcbmltcG9ydCB7IE5vdm9EcmFndWxhU2VydmljZSB9IGZyb20gJy4vZWxlbWVudHMvZHJhZ3VsYS9EcmFndWxhU2VydmljZSc7XG5pbXBvcnQgeyBOb3ZvTW9kYWxTZXJ2aWNlIH0gZnJvbSAnLi9lbGVtZW50cy9tb2RhbC9Nb2RhbFNlcnZpY2UnO1xuaW1wb3J0IHsgTm92b01vZGFsUmVmIH0gZnJvbSAnLi9lbGVtZW50cy9tb2RhbC9Nb2RhbCc7XG5pbXBvcnQgeyBOb3ZvVG9hc3RTZXJ2aWNlIH0gZnJvbSAnLi9lbGVtZW50cy90b2FzdC9Ub2FzdFNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tcG9uZW50VXRpbHMgfSBmcm9tICcuL3V0aWxzL2NvbXBvbmVudC11dGlscy9Db21wb25lbnRVdGlscyc7XG5pbXBvcnQgeyBGaWVsZEludGVyYWN0aW9uQXBpIH0gZnJvbSAnLi9lbGVtZW50cy9mb3JtL0ZpZWxkSW50ZXJhY3Rpb25BcGknO1xuaW1wb3J0IHsgRGF0ZUZvcm1hdFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2RhdGUtZm9ybWF0L0RhdGVGb3JtYXQnO1xuaW1wb3J0IHsgR2xvYmFsUmVmLCBCcm93c2VyR2xvYmFsUmVmIH0gZnJvbSAnLi9zZXJ2aWNlcy9nbG9iYWwvZ2xvYmFsLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9jYWxTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvc3RvcmFnZS9zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VjdXJpdHkgfSBmcm9tICcuL3NlcnZpY2VzL3NlY3VyaXR5L1NlY3VyaXR5JztcbmltcG9ydCB7IE9wdGlvbnNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9vcHRpb25zL09wdGlvbnNTZXJ2aWNlJztcbmltcG9ydCB7IE5vdm9UZW1wbGF0ZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3RlbXBsYXRlL05vdm9UZW1wbGF0ZVNlcnZpY2UnO1xuXG5jb25zdCBOT1ZPX0VMRU1FTlRTX1BST1ZJREVSUyA9IFtcbiAgeyBwcm92aWRlOiBOb3ZvRHJhZ3VsYVNlcnZpY2UsIHVzZUNsYXNzOiBOb3ZvRHJhZ3VsYVNlcnZpY2UgfSxcbiAgeyBwcm92aWRlOiBOb3ZvTW9kYWxSZWYsIHVzZUNsYXNzOiBOb3ZvTW9kYWxSZWYgfSxcbiAgeyBwcm92aWRlOiBOb3ZvTW9kYWxTZXJ2aWNlLCB1c2VDbGFzczogTm92b01vZGFsU2VydmljZSB9LFxuICB7IHByb3ZpZGU6IEdvb2dsZVBsYWNlc1NlcnZpY2UsIHVzZUNsYXNzOiBHb29nbGVQbGFjZXNTZXJ2aWNlIH0sXG4gIHsgcHJvdmlkZTogTm92b1RvYXN0U2VydmljZSwgdXNlQ2xhc3M6IE5vdm9Ub2FzdFNlcnZpY2UgfSxcbiAgeyBwcm92aWRlOiBDb21wb25lbnRVdGlscywgdXNlQ2xhc3M6IENvbXBvbmVudFV0aWxzIH0sXG4gIHsgcHJvdmlkZTogR2xvYmFsUmVmLCB1c2VDbGFzczogQnJvd3Nlckdsb2JhbFJlZiB9LFxuICB7IHByb3ZpZGU6IExvY2FsU3RvcmFnZVNlcnZpY2UsIHVzZUNsYXNzOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0sXG4gIHsgcHJvdmlkZTogT3B0aW9uc1NlcnZpY2UsIHVzZUNsYXNzOiBPcHRpb25zU2VydmljZSB9LFxuICBGaWVsZEludGVyYWN0aW9uQXBpLFxuICBEYXRlRm9ybWF0U2VydmljZSxcbiAgU2VjdXJpdHksXG4gIE5vdm9UZW1wbGF0ZVNlcnZpY2UsXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0VsZW1lbnRQcm92aWRlcnMge1xuICBzdGF0aWMgZm9yUm9vdCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5vdm9FbGVtZW50UHJvdmlkZXJzLFxuICAgICAgcHJvdmlkZXJzOiBbLi4uTk9WT19FTEVNRU5UU19QUk9WSURFUlNdLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZm9yQ2hpbGQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOb3ZvRWxlbWVudFByb3ZpZGVycyxcbiAgICB9O1xuICB9XG59XG4iXX0=