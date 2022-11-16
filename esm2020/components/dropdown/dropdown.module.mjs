// NG2
import { NgModule } from '@angular/core';
import { NovoDropdownElement, NovoDropDownItemHeaderElement, NovoDropdownListElement, NovoDropDownTrigger, NovoItemElement, } from './dropdown';
import { NovoOverlayModule } from 'novo-elements/common/overlay';
import { NovoOptionModule } from 'novo-elements/common';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9kcm9wZG93bi9kcm9wZG93bi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUNMLG1CQUFtQixFQUNuQiw2QkFBNkIsRUFDN0IsdUJBQXVCLEVBQ3ZCLG1CQUFtQixFQUNuQixlQUFlLEdBQ2hCLE1BQU0sWUFBWSxDQUFDO0FBQ3BCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztBQU94RCxNQUFNLE9BQU8sa0JBQWtCOztnSEFBbEIsa0JBQWtCO2lIQUFsQixrQkFBa0IsaUJBSGQsbUJBQW1CLEVBQUUsZUFBZSxFQUFFLHVCQUF1QixFQUFFLDZCQUE2QixFQUFFLG1CQUFtQixhQUR0SCxpQkFBaUIsRUFBRSxnQkFBZ0IsYUFFbkMsbUJBQW1CLEVBQUUsZUFBZSxFQUFFLHVCQUF1QixFQUFFLDZCQUE2QixFQUFFLG1CQUFtQjtpSEFFaEgsa0JBQWtCLFlBSnBCLENBQUMsaUJBQWlCLEVBQUUsZ0JBQWdCLENBQUM7NEZBSW5DLGtCQUFrQjtrQkFMOUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQztvQkFDOUMsWUFBWSxFQUFFLENBQUMsbUJBQW1CLEVBQUUsZUFBZSxFQUFFLHVCQUF1QixFQUFFLDZCQUE2QixFQUFFLG1CQUFtQixDQUFDO29CQUNqSSxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxlQUFlLEVBQUUsdUJBQXVCLEVBQUUsNkJBQTZCLEVBQUUsbUJBQW1CLENBQUM7aUJBQzdIIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTm92b0Ryb3Bkb3duRWxlbWVudCxcbiAgTm92b0Ryb3BEb3duSXRlbUhlYWRlckVsZW1lbnQsXG4gIE5vdm9Ecm9wZG93bkxpc3RFbGVtZW50LFxuICBOb3ZvRHJvcERvd25UcmlnZ2VyLFxuICBOb3ZvSXRlbUVsZW1lbnQsXG59IGZyb20gJy4vZHJvcGRvd24nO1xuaW1wb3J0IHsgTm92b092ZXJsYXlNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbW1vbi9vdmVybGF5JztcbmltcG9ydCB7IE5vdm9PcHRpb25Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbW1vbic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtOb3ZvT3ZlcmxheU1vZHVsZSwgTm92b09wdGlvbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW05vdm9Ecm9wZG93bkVsZW1lbnQsIE5vdm9JdGVtRWxlbWVudCwgTm92b0Ryb3Bkb3duTGlzdEVsZW1lbnQsIE5vdm9Ecm9wRG93bkl0ZW1IZWFkZXJFbGVtZW50LCBOb3ZvRHJvcERvd25UcmlnZ2VyXSxcbiAgZXhwb3J0czogW05vdm9Ecm9wZG93bkVsZW1lbnQsIE5vdm9JdGVtRWxlbWVudCwgTm92b0Ryb3Bkb3duTGlzdEVsZW1lbnQsIE5vdm9Ecm9wRG93bkl0ZW1IZWFkZXJFbGVtZW50LCBOb3ZvRHJvcERvd25UcmlnZ2VyXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0Ryb3Bkb3duTW9kdWxlIHt9XG4iXX0=