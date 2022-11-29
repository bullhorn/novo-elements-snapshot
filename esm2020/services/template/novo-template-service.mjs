// NG2
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class NovoTemplateService {
    constructor() {
        this.templates = {
            default: {},
            custom: {},
        };
    }
    getAll() {
        const templates = {};
        const customTemplateTypes = Object.keys(this.templates.custom);
        const defaultTemplateTypes = Object.keys(this.templates.default);
        defaultTemplateTypes.forEach((type) => {
            templates[type] = this.templates.default[type];
        });
        customTemplateTypes.forEach((type) => {
            templates[type] = this.templates.custom[type];
        });
        return templates;
    }
    addDefault(key, template) {
        this.templates.default[key] = template;
    }
    addCustom(key, template) {
        this.templates.custom[key] = template;
    }
}
NovoTemplateService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTemplateService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NovoTemplateService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTemplateService, providedIn: `root` });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTemplateService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: `root`,
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm92by10ZW1wbGF0ZS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvc2VydmljZXMvdGVtcGxhdGUvbm92by10ZW1wbGF0ZS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUszQyxNQUFNLE9BQU8sbUJBQW1CO0lBSzlCO1FBSkEsY0FBUyxHQUFRO1lBQ2YsT0FBTyxFQUFFLEVBQUU7WUFDWCxNQUFNLEVBQUUsRUFBRTtTQUNYLENBQUM7SUFDYSxDQUFDO0lBRWhCLE1BQU07UUFDSixNQUFNLFNBQVMsR0FBUSxFQUFFLENBQUM7UUFDMUIsTUFBTSxtQkFBbUIsR0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekUsTUFBTSxvQkFBb0IsR0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0Usb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBWSxFQUFFLEVBQUU7WUFDNUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDO1FBQ0gsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBWSxFQUFFLEVBQUU7WUFDM0MsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVELFVBQVUsQ0FBQyxHQUFXLEVBQUUsUUFBYTtRQUNuQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7SUFDekMsQ0FBQztJQUVELFNBQVMsQ0FBQyxHQUFXLEVBQUUsUUFBYTtRQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7SUFDeEMsQ0FBQzs7aUhBMUJVLG1CQUFtQjtxSEFBbkIsbUJBQW1CLGNBRmxCLE1BQU07NEZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46IGByb290YCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1RlbXBsYXRlU2VydmljZSB7XG4gIHRlbXBsYXRlczogYW55ID0ge1xuICAgIGRlZmF1bHQ6IHt9LFxuICAgIGN1c3RvbToge30sXG4gIH07XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBnZXRBbGwoKTogYW55IHtcbiAgICBjb25zdCB0ZW1wbGF0ZXM6IGFueSA9IHt9O1xuICAgIGNvbnN0IGN1c3RvbVRlbXBsYXRlVHlwZXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXModGhpcy50ZW1wbGF0ZXMuY3VzdG9tKTtcbiAgICBjb25zdCBkZWZhdWx0VGVtcGxhdGVUeXBlczogc3RyaW5nW10gPSBPYmplY3Qua2V5cyh0aGlzLnRlbXBsYXRlcy5kZWZhdWx0KTtcbiAgICBkZWZhdWx0VGVtcGxhdGVUeXBlcy5mb3JFYWNoKCh0eXBlOiBzdHJpbmcpID0+IHtcbiAgICAgIHRlbXBsYXRlc1t0eXBlXSA9IHRoaXMudGVtcGxhdGVzLmRlZmF1bHRbdHlwZV07XG4gICAgfSk7XG4gICAgY3VzdG9tVGVtcGxhdGVUeXBlcy5mb3JFYWNoKCh0eXBlOiBzdHJpbmcpID0+IHtcbiAgICAgIHRlbXBsYXRlc1t0eXBlXSA9IHRoaXMudGVtcGxhdGVzLmN1c3RvbVt0eXBlXTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGVtcGxhdGVzO1xuICB9XG5cbiAgYWRkRGVmYXVsdChrZXk6IHN0cmluZywgdGVtcGxhdGU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudGVtcGxhdGVzLmRlZmF1bHRba2V5XSA9IHRlbXBsYXRlO1xuICB9XG5cbiAgYWRkQ3VzdG9tKGtleTogc3RyaW5nLCB0ZW1wbGF0ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy50ZW1wbGF0ZXMuY3VzdG9tW2tleV0gPSB0ZW1wbGF0ZTtcbiAgfVxufVxuIl19