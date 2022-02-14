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
NovoTemplateService.ɵfac = function NovoTemplateService_Factory(t) { return new (t || NovoTemplateService)(); };
NovoTemplateService.ɵprov = i0.ɵɵdefineInjectable({ token: NovoTemplateService, factory: NovoTemplateService.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoTemplateService, [{
        type: Injectable
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm92b1RlbXBsYXRlU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy90ZW1wbGF0ZS9Ob3ZvVGVtcGxhdGVTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUczQyxNQUFNLE9BQU8sbUJBQW1CO0lBSzlCO1FBSkEsY0FBUyxHQUFRO1lBQ2YsT0FBTyxFQUFFLEVBQUU7WUFDWCxNQUFNLEVBQUUsRUFBRTtTQUNYLENBQUM7SUFDYSxDQUFDO0lBRWhCLE1BQU07UUFDSixNQUFNLFNBQVMsR0FBUSxFQUFFLENBQUM7UUFDMUIsTUFBTSxtQkFBbUIsR0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekUsTUFBTSxvQkFBb0IsR0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0Usb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBWSxFQUFFLEVBQUU7WUFDNUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDO1FBQ0gsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBWSxFQUFFLEVBQUU7WUFDM0MsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVELFVBQVUsQ0FBQyxHQUFXLEVBQUUsUUFBYTtRQUNuQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7SUFDekMsQ0FBQztJQUVELFNBQVMsQ0FBQyxHQUFXLEVBQUUsUUFBYTtRQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7SUFDeEMsQ0FBQzs7c0ZBMUJVLG1CQUFtQjsyREFBbkIsbUJBQW1CLFdBQW5CLG1CQUFtQjtrREFBbkIsbUJBQW1CO2NBRC9CLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vdm9UZW1wbGF0ZVNlcnZpY2Uge1xuICB0ZW1wbGF0ZXM6IGFueSA9IHtcbiAgICBkZWZhdWx0OiB7fSxcbiAgICBjdXN0b206IHt9LFxuICB9O1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgZ2V0QWxsKCk6IGFueSB7XG4gICAgY29uc3QgdGVtcGxhdGVzOiBhbnkgPSB7fTtcbiAgICBjb25zdCBjdXN0b21UZW1wbGF0ZVR5cGVzOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKHRoaXMudGVtcGxhdGVzLmN1c3RvbSk7XG4gICAgY29uc3QgZGVmYXVsdFRlbXBsYXRlVHlwZXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXModGhpcy50ZW1wbGF0ZXMuZGVmYXVsdCk7XG4gICAgZGVmYXVsdFRlbXBsYXRlVHlwZXMuZm9yRWFjaCgodHlwZTogc3RyaW5nKSA9PiB7XG4gICAgICB0ZW1wbGF0ZXNbdHlwZV0gPSB0aGlzLnRlbXBsYXRlcy5kZWZhdWx0W3R5cGVdO1xuICAgIH0pO1xuICAgIGN1c3RvbVRlbXBsYXRlVHlwZXMuZm9yRWFjaCgodHlwZTogc3RyaW5nKSA9PiB7XG4gICAgICB0ZW1wbGF0ZXNbdHlwZV0gPSB0aGlzLnRlbXBsYXRlcy5jdXN0b21bdHlwZV07XG4gICAgfSk7XG4gICAgcmV0dXJuIHRlbXBsYXRlcztcbiAgfVxuXG4gIGFkZERlZmF1bHQoa2V5OiBzdHJpbmcsIHRlbXBsYXRlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnRlbXBsYXRlcy5kZWZhdWx0W2tleV0gPSB0ZW1wbGF0ZTtcbiAgfVxuXG4gIGFkZEN1c3RvbShrZXk6IHN0cmluZywgdGVtcGxhdGU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudGVtcGxhdGVzLmN1c3RvbVtrZXldID0gdGVtcGxhdGU7XG4gIH1cbn1cbiJdfQ==