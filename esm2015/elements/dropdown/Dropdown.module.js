// NG2
import { NgModule } from '@angular/core';
import { NovoOptionModule } from '../common';
import { NovoOverlayModule } from '../common/overlay/Overlay.module';
// APP
import { NovoDropdownElement, NovoDropDownItemHeaderElement, NovoDropdownListElement, NovoItemElement } from './Dropdown';
import * as i0 from "@angular/core";
export class NovoDropdownModule {
}
NovoDropdownModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoDropdownModule });
NovoDropdownModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoDropdownModule_Factory(t) { return new (t || NovoDropdownModule)(); }, imports: [[NovoOverlayModule, NovoOptionModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoDropdownModule, { declarations: [NovoDropdownElement, NovoItemElement, NovoDropdownListElement, NovoDropDownItemHeaderElement], imports: [NovoOverlayModule, NovoOptionModule], exports: [NovoDropdownElement, NovoItemElement, NovoDropdownListElement, NovoDropDownItemHeaderElement] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoDropdownModule, [{
        type: NgModule,
        args: [{
                imports: [NovoOverlayModule, NovoOptionModule],
                declarations: [NovoDropdownElement, NovoItemElement, NovoDropdownListElement, NovoDropDownItemHeaderElement],
                exports: [NovoDropdownElement, NovoItemElement, NovoDropdownListElement, NovoDropDownItemHeaderElement],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJvcGRvd24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2Ryb3Bkb3duL0Ryb3Bkb3duLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDN0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsTUFBTTtBQUNOLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSw2QkFBNkIsRUFBRSx1QkFBdUIsRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7O0FBTzFILE1BQU0sT0FBTyxrQkFBa0I7O3NEQUFsQixrQkFBa0I7bUhBQWxCLGtCQUFrQixrQkFKcEIsQ0FBQyxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQzt3RkFJbkMsa0JBQWtCLG1CQUhkLG1CQUFtQixFQUFFLGVBQWUsRUFBRSx1QkFBdUIsRUFBRSw2QkFBNkIsYUFEakcsaUJBQWlCLEVBQUUsZ0JBQWdCLGFBRW5DLG1CQUFtQixFQUFFLGVBQWUsRUFBRSx1QkFBdUIsRUFBRSw2QkFBNkI7a0RBRTNGLGtCQUFrQjtjQUw5QixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsZ0JBQWdCLENBQUM7Z0JBQzlDLFlBQVksRUFBRSxDQUFDLG1CQUFtQixFQUFFLGVBQWUsRUFBRSx1QkFBdUIsRUFBRSw2QkFBNkIsQ0FBQztnQkFDNUcsT0FBTyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsZUFBZSxFQUFFLHVCQUF1QixFQUFFLDZCQUE2QixDQUFDO2FBQ3hHIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b09wdGlvbk1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgeyBOb3ZvT3ZlcmxheU1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9vdmVybGF5L092ZXJsYXkubW9kdWxlJztcbi8vIEFQUFxuaW1wb3J0IHsgTm92b0Ryb3Bkb3duRWxlbWVudCwgTm92b0Ryb3BEb3duSXRlbUhlYWRlckVsZW1lbnQsIE5vdm9Ecm9wZG93bkxpc3RFbGVtZW50LCBOb3ZvSXRlbUVsZW1lbnQgfSBmcm9tICcuL0Ryb3Bkb3duJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW05vdm9PdmVybGF5TW9kdWxlLCBOb3ZvT3B0aW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTm92b0Ryb3Bkb3duRWxlbWVudCwgTm92b0l0ZW1FbGVtZW50LCBOb3ZvRHJvcGRvd25MaXN0RWxlbWVudCwgTm92b0Ryb3BEb3duSXRlbUhlYWRlckVsZW1lbnRdLFxuICBleHBvcnRzOiBbTm92b0Ryb3Bkb3duRWxlbWVudCwgTm92b0l0ZW1FbGVtZW50LCBOb3ZvRHJvcGRvd25MaXN0RWxlbWVudCwgTm92b0Ryb3BEb3duSXRlbUhlYWRlckVsZW1lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRHJvcGRvd25Nb2R1bGUge31cbiJdfQ==