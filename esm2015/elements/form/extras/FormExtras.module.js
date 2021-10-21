// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoPipesModule } from './../../../pipes/Pipes.module';
// APP
import { NovoButtonModule } from './../../button/Button.module';
import { NovoDragulaModule } from './../../dragula/Dragula.module';
import { NovoLoadingModule } from './../../loading/Loading.module';
import { NovoPickerModule } from './../../picker/Picker.module';
import { NovoSelectModule } from './../../select/Select.module';
import { NovoTooltipModule } from './../../tooltip/Tooltip.module';
import { NovoAddressElement } from './address/Address';
import { NovoCheckboxElement } from './checkbox/Checkbox';
import { NovoCheckListElement } from './checkbox/CheckList';
import { NovoFileInputElement } from './file/FileInput';
import * as i0 from "@angular/core";
export class NovoFormExtrasModule {
}
NovoFormExtrasModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoFormExtrasModule });
NovoFormExtrasModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoFormExtrasModule_Factory(t) { return new (t || NovoFormExtrasModule)(); }, imports: [[
            CommonModule,
            FormsModule,
            NovoPipesModule,
            NovoButtonModule,
            NovoSelectModule,
            NovoPickerModule,
            NovoLoadingModule,
            NovoDragulaModule,
            NovoTooltipModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoFormExtrasModule, { declarations: [NovoAddressElement, NovoCheckboxElement, NovoCheckListElement, NovoFileInputElement], imports: [CommonModule,
        FormsModule,
        NovoPipesModule,
        NovoButtonModule,
        NovoSelectModule,
        NovoPickerModule,
        NovoLoadingModule,
        NovoDragulaModule,
        NovoTooltipModule], exports: [NovoAddressElement, NovoCheckboxElement, NovoCheckListElement, NovoFileInputElement] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoFormExtrasModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    NovoPipesModule,
                    NovoButtonModule,
                    NovoSelectModule,
                    NovoPickerModule,
                    NovoLoadingModule,
                    NovoDragulaModule,
                    NovoTooltipModule,
                ],
                declarations: [NovoAddressElement, NovoCheckboxElement, NovoCheckListElement, NovoFileInputElement],
                exports: [NovoAddressElement, NovoCheckboxElement, NovoCheckListElement, NovoFileInputElement],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybUV4dHJhcy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZm9ybS9leHRyYXMvRm9ybUV4dHJhcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDaEUsTUFBTTtBQUNOLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzVELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDOztBQWlCeEQsTUFBTSxPQUFPLG9CQUFvQjs7d0RBQXBCLG9CQUFvQjt1SEFBcEIsb0JBQW9CLGtCQWR0QjtZQUNQLFlBQVk7WUFDWixXQUFXO1lBQ1gsZUFBZTtZQUNmLGdCQUFnQjtZQUNoQixnQkFBZ0I7WUFDaEIsZ0JBQWdCO1lBQ2hCLGlCQUFpQjtZQUNqQixpQkFBaUI7WUFDakIsaUJBQWlCO1NBQ2xCO3dGQUlVLG9CQUFvQixtQkFIaEIsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLGFBVmhHLFlBQVk7UUFDWixXQUFXO1FBQ1gsZUFBZTtRQUNmLGdCQUFnQjtRQUNoQixnQkFBZ0I7UUFDaEIsZ0JBQWdCO1FBQ2hCLGlCQUFpQjtRQUNqQixpQkFBaUI7UUFDakIsaUJBQWlCLGFBR1Qsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CO2tEQUVsRixvQkFBb0I7Y0FmaEMsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsZUFBZTtvQkFDZixnQkFBZ0I7b0JBQ2hCLGdCQUFnQjtvQkFDaEIsZ0JBQWdCO29CQUNoQixpQkFBaUI7b0JBQ2pCLGlCQUFpQjtvQkFDakIsaUJBQWlCO2lCQUNsQjtnQkFDRCxZQUFZLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsQ0FBQztnQkFDbkcsT0FBTyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLENBQUM7YUFDL0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOb3ZvUGlwZXNNb2R1bGUgfSBmcm9tICcuLy4uLy4uLy4uL3BpcGVzL1BpcGVzLm1vZHVsZSc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9CdXR0b25Nb2R1bGUgfSBmcm9tICcuLy4uLy4uL2J1dHRvbi9CdXR0b24ubW9kdWxlJztcbmltcG9ydCB7IE5vdm9EcmFndWxhTW9kdWxlIH0gZnJvbSAnLi8uLi8uLi9kcmFndWxhL0RyYWd1bGEubW9kdWxlJztcbmltcG9ydCB7IE5vdm9Mb2FkaW5nTW9kdWxlIH0gZnJvbSAnLi8uLi8uLi9sb2FkaW5nL0xvYWRpbmcubW9kdWxlJztcbmltcG9ydCB7IE5vdm9QaWNrZXJNb2R1bGUgfSBmcm9tICcuLy4uLy4uL3BpY2tlci9QaWNrZXIubW9kdWxlJztcbmltcG9ydCB7IE5vdm9TZWxlY3RNb2R1bGUgfSBmcm9tICcuLy4uLy4uL3NlbGVjdC9TZWxlY3QubW9kdWxlJztcbmltcG9ydCB7IE5vdm9Ub29sdGlwTW9kdWxlIH0gZnJvbSAnLi8uLi8uLi90b29sdGlwL1Rvb2x0aXAubW9kdWxlJztcbmltcG9ydCB7IE5vdm9BZGRyZXNzRWxlbWVudCB9IGZyb20gJy4vYWRkcmVzcy9BZGRyZXNzJztcbmltcG9ydCB7IE5vdm9DaGVja2JveEVsZW1lbnQgfSBmcm9tICcuL2NoZWNrYm94L0NoZWNrYm94JztcbmltcG9ydCB7IE5vdm9DaGVja0xpc3RFbGVtZW50IH0gZnJvbSAnLi9jaGVja2JveC9DaGVja0xpc3QnO1xuaW1wb3J0IHsgTm92b0ZpbGVJbnB1dEVsZW1lbnQgfSBmcm9tICcuL2ZpbGUvRmlsZUlucHV0JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBOb3ZvUGlwZXNNb2R1bGUsXG4gICAgTm92b0J1dHRvbk1vZHVsZSxcbiAgICBOb3ZvU2VsZWN0TW9kdWxlLFxuICAgIE5vdm9QaWNrZXJNb2R1bGUsXG4gICAgTm92b0xvYWRpbmdNb2R1bGUsXG4gICAgTm92b0RyYWd1bGFNb2R1bGUsXG4gICAgTm92b1Rvb2x0aXBNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW05vdm9BZGRyZXNzRWxlbWVudCwgTm92b0NoZWNrYm94RWxlbWVudCwgTm92b0NoZWNrTGlzdEVsZW1lbnQsIE5vdm9GaWxlSW5wdXRFbGVtZW50XSxcbiAgZXhwb3J0czogW05vdm9BZGRyZXNzRWxlbWVudCwgTm92b0NoZWNrYm94RWxlbWVudCwgTm92b0NoZWNrTGlzdEVsZW1lbnQsIE5vdm9GaWxlSW5wdXRFbGVtZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0Zvcm1FeHRyYXNNb2R1bGUge31cbiJdfQ==