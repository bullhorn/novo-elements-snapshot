// NG2
import { NgModule } from '@angular/core';
import { NovoOptionModule } from '../common';
import { NovoOverlayModule } from '../common/overlay/Overlay.module';
// APP
import { NovoDropdownElement, NovoDropDownItemHeaderElement, NovoDropdownListElement, NovoDropDownTrigger, NovoItemElement, } from './Dropdown';
import * as i0 from "@angular/core";
export class NovoDropdownModule {
}
NovoDropdownModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDropdownModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoDropdownModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDropdownModule, declarations: [NovoDropdownElement, NovoItemElement, NovoDropdownListElement, NovoDropDownItemHeaderElement, NovoDropDownTrigger], imports: [NovoOverlayModule, NovoOptionModule], exports: [NovoDropdownElement, NovoItemElement, NovoDropdownListElement, NovoDropDownItemHeaderElement, NovoDropDownTrigger] });
NovoDropdownModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDropdownModule, imports: [[NovoOverlayModule, NovoOptionModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDropdownModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NovoOverlayModule, NovoOptionModule],
                    declarations: [NovoDropdownElement, NovoItemElement, NovoDropdownListElement, NovoDropDownItemHeaderElement, NovoDropDownTrigger],
                    exports: [NovoDropdownElement, NovoItemElement, NovoDropdownListElement, NovoDropDownItemHeaderElement, NovoDropDownTrigger],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJvcGRvd24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZHJvcGRvd24vRHJvcGRvd24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM3QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxNQUFNO0FBQ04sT0FBTyxFQUNMLG1CQUFtQixFQUNuQiw2QkFBNkIsRUFDN0IsdUJBQXVCLEVBQ3ZCLG1CQUFtQixFQUNuQixlQUFlLEdBQ2hCLE1BQU0sWUFBWSxDQUFDOztBQU9wQixNQUFNLE9BQU8sa0JBQWtCOztnSEFBbEIsa0JBQWtCO2lIQUFsQixrQkFBa0IsaUJBSGQsbUJBQW1CLEVBQUUsZUFBZSxFQUFFLHVCQUF1QixFQUFFLDZCQUE2QixFQUFFLG1CQUFtQixhQUR0SCxpQkFBaUIsRUFBRSxnQkFBZ0IsYUFFbkMsbUJBQW1CLEVBQUUsZUFBZSxFQUFFLHVCQUF1QixFQUFFLDZCQUE2QixFQUFFLG1CQUFtQjtpSEFFaEgsa0JBQWtCLFlBSnBCLENBQUMsaUJBQWlCLEVBQUUsZ0JBQWdCLENBQUM7NEZBSW5DLGtCQUFrQjtrQkFMOUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQztvQkFDOUMsWUFBWSxFQUFFLENBQUMsbUJBQW1CLEVBQUUsZUFBZSxFQUFFLHVCQUF1QixFQUFFLDZCQUE2QixFQUFFLG1CQUFtQixDQUFDO29CQUNqSSxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxlQUFlLEVBQUUsdUJBQXVCLEVBQUUsNkJBQTZCLEVBQUUsbUJBQW1CLENBQUM7aUJBQzdIIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b09wdGlvbk1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgeyBOb3ZvT3ZlcmxheU1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9vdmVybGF5L092ZXJsYXkubW9kdWxlJztcbi8vIEFQUFxuaW1wb3J0IHtcbiAgTm92b0Ryb3Bkb3duRWxlbWVudCxcbiAgTm92b0Ryb3BEb3duSXRlbUhlYWRlckVsZW1lbnQsXG4gIE5vdm9Ecm9wZG93bkxpc3RFbGVtZW50LFxuICBOb3ZvRHJvcERvd25UcmlnZ2VyLFxuICBOb3ZvSXRlbUVsZW1lbnQsXG59IGZyb20gJy4vRHJvcGRvd24nO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTm92b092ZXJsYXlNb2R1bGUsIE5vdm9PcHRpb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtOb3ZvRHJvcGRvd25FbGVtZW50LCBOb3ZvSXRlbUVsZW1lbnQsIE5vdm9Ecm9wZG93bkxpc3RFbGVtZW50LCBOb3ZvRHJvcERvd25JdGVtSGVhZGVyRWxlbWVudCwgTm92b0Ryb3BEb3duVHJpZ2dlcl0sXG4gIGV4cG9ydHM6IFtOb3ZvRHJvcGRvd25FbGVtZW50LCBOb3ZvSXRlbUVsZW1lbnQsIE5vdm9Ecm9wZG93bkxpc3RFbGVtZW50LCBOb3ZvRHJvcERvd25JdGVtSGVhZGVyRWxlbWVudCwgTm92b0Ryb3BEb3duVHJpZ2dlcl0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Ecm9wZG93bk1vZHVsZSB7fVxuIl19