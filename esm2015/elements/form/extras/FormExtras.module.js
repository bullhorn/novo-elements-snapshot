// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// APP
import { NovoButtonModule } from './../../button/Button.module';
import { NovoSelectModule } from './../../select/Select.module';
import { NovoPickerModule } from './../../picker/Picker.module';
import { NovoLoadingModule } from './../../loading/Loading.module';
import { NovoPipesModule } from './../../../pipes/Pipes.module';
import { NovoDragulaModule } from './../../dragula/Dragula.module';
import { NovoAddressElement } from './address/Address';
import { NovoCheckboxElement } from './checkbox/Checkbox';
import { NovoCheckListElement } from './checkbox/CheckList';
import { NovoFileInputElement } from './file/FileInput';
import { NovoTooltipModule } from './../../tooltip/Tooltip.module';
export class NovoFormExtrasModule {
}
NovoFormExtrasModule.decorators = [
    { type: NgModule, args: [{
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybUV4dHJhcy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZm9ybS9leHRyYXMvRm9ybUV4dHJhcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzVELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBaUJuRSxNQUFNLE9BQU8sb0JBQW9COzs7WUFmaEMsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsZUFBZTtvQkFDZixnQkFBZ0I7b0JBQ2hCLGdCQUFnQjtvQkFDaEIsZ0JBQWdCO29CQUNoQixpQkFBaUI7b0JBQ2pCLGlCQUFpQjtvQkFDakIsaUJBQWlCO2lCQUNsQjtnQkFDRCxZQUFZLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsQ0FBQztnQkFDbkcsT0FBTyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLENBQUM7YUFDL0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9CdXR0b25Nb2R1bGUgfSBmcm9tICcuLy4uLy4uL2J1dHRvbi9CdXR0b24ubW9kdWxlJztcbmltcG9ydCB7IE5vdm9TZWxlY3RNb2R1bGUgfSBmcm9tICcuLy4uLy4uL3NlbGVjdC9TZWxlY3QubW9kdWxlJztcbmltcG9ydCB7IE5vdm9QaWNrZXJNb2R1bGUgfSBmcm9tICcuLy4uLy4uL3BpY2tlci9QaWNrZXIubW9kdWxlJztcbmltcG9ydCB7IE5vdm9Mb2FkaW5nTW9kdWxlIH0gZnJvbSAnLi8uLi8uLi9sb2FkaW5nL0xvYWRpbmcubW9kdWxlJztcbmltcG9ydCB7IE5vdm9QaXBlc01vZHVsZSB9IGZyb20gJy4vLi4vLi4vLi4vcGlwZXMvUGlwZXMubW9kdWxlJztcbmltcG9ydCB7IE5vdm9EcmFndWxhTW9kdWxlIH0gZnJvbSAnLi8uLi8uLi9kcmFndWxhL0RyYWd1bGEubW9kdWxlJztcbmltcG9ydCB7IE5vdm9BZGRyZXNzRWxlbWVudCB9IGZyb20gJy4vYWRkcmVzcy9BZGRyZXNzJztcbmltcG9ydCB7IE5vdm9DaGVja2JveEVsZW1lbnQgfSBmcm9tICcuL2NoZWNrYm94L0NoZWNrYm94JztcbmltcG9ydCB7IE5vdm9DaGVja0xpc3RFbGVtZW50IH0gZnJvbSAnLi9jaGVja2JveC9DaGVja0xpc3QnO1xuaW1wb3J0IHsgTm92b0ZpbGVJbnB1dEVsZW1lbnQgfSBmcm9tICcuL2ZpbGUvRmlsZUlucHV0JztcbmltcG9ydCB7IE5vdm9Ub29sdGlwTW9kdWxlIH0gZnJvbSAnLi8uLi8uLi90b29sdGlwL1Rvb2x0aXAubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBOb3ZvUGlwZXNNb2R1bGUsXG4gICAgTm92b0J1dHRvbk1vZHVsZSxcbiAgICBOb3ZvU2VsZWN0TW9kdWxlLFxuICAgIE5vdm9QaWNrZXJNb2R1bGUsXG4gICAgTm92b0xvYWRpbmdNb2R1bGUsXG4gICAgTm92b0RyYWd1bGFNb2R1bGUsXG4gICAgTm92b1Rvb2x0aXBNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW05vdm9BZGRyZXNzRWxlbWVudCwgTm92b0NoZWNrYm94RWxlbWVudCwgTm92b0NoZWNrTGlzdEVsZW1lbnQsIE5vdm9GaWxlSW5wdXRFbGVtZW50XSxcbiAgZXhwb3J0czogW05vdm9BZGRyZXNzRWxlbWVudCwgTm92b0NoZWNrYm94RWxlbWVudCwgTm92b0NoZWNrTGlzdEVsZW1lbnQsIE5vdm9GaWxlSW5wdXRFbGVtZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0Zvcm1FeHRyYXNNb2R1bGUge31cbiJdfQ==