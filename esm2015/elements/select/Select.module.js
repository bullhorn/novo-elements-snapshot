// NG
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoButtonModule } from '../button';
import { NovoOptionModule } from '../common';
import { NovoOverlayModule } from '../common/overlay';
import { NovoDividerModule } from '../divider';
import { NovoSelectElement } from './Select';
import * as i0 from "@angular/core";
export class NovoSelectModule {
}
NovoSelectModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoSelectModule });
NovoSelectModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoSelectModule_Factory(t) { return new (t || NovoSelectModule)(); }, imports: [[CommonModule, FormsModule, A11yModule, NovoOverlayModule, NovoOptionModule, NovoDividerModule, NovoButtonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoSelectModule, { declarations: [NovoSelectElement], imports: [CommonModule, FormsModule, A11yModule, NovoOverlayModule, NovoOptionModule, NovoDividerModule, NovoButtonModule], exports: [NovoSelectElement] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoSelectModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, FormsModule, A11yModule, NovoOverlayModule, NovoOptionModule, NovoDividerModule, NovoButtonModule],
                declarations: [NovoSelectElement],
                exports: [NovoSelectElement],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9zZWxlY3QvU2VsZWN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxLQUFLO0FBQ0wsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDN0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzdDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxVQUFVLENBQUM7O0FBTzdDLE1BQU0sT0FBTyxnQkFBZ0I7O29EQUFoQixnQkFBZ0I7K0dBQWhCLGdCQUFnQixrQkFKbEIsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQzt3RkFJL0csZ0JBQWdCLG1CQUhaLGlCQUFpQixhQUR0QixZQUFZLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsYUFFL0csaUJBQWlCO2tEQUVoQixnQkFBZ0I7Y0FMNUIsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixDQUFDO2dCQUMxSCxZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztnQkFDakMsT0FBTyxFQUFFLENBQUMsaUJBQWlCLENBQUM7YUFDN0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBOR1xuaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vYnV0dG9uJztcbmltcG9ydCB7IE5vdm9PcHRpb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IHsgTm92b092ZXJsYXlNb2R1bGUgfSBmcm9tICcuLi9jb21tb24vb3ZlcmxheSc7XG5pbXBvcnQgeyBOb3ZvRGl2aWRlck1vZHVsZSB9IGZyb20gJy4uL2RpdmlkZXInO1xuaW1wb3J0IHsgTm92b1NlbGVjdEVsZW1lbnQgfSBmcm9tICcuL1NlbGVjdCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBBMTF5TW9kdWxlLCBOb3ZvT3ZlcmxheU1vZHVsZSwgTm92b09wdGlvbk1vZHVsZSwgTm92b0RpdmlkZXJNb2R1bGUsIE5vdm9CdXR0b25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtOb3ZvU2VsZWN0RWxlbWVudF0sXG4gIGV4cG9ydHM6IFtOb3ZvU2VsZWN0RWxlbWVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TZWxlY3RNb2R1bGUge31cbiJdfQ==