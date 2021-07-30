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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybUV4dHJhcy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2Zvcm0vZXh0cmFzL0Zvcm1FeHRyYXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsTUFBTTtBQUNOLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQWlCbkUsTUFBTSxPQUFPLG9CQUFvQjs7O1lBZmhDLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixXQUFXO29CQUNYLGVBQWU7b0JBQ2YsZ0JBQWdCO29CQUNoQixnQkFBZ0I7b0JBQ2hCLGdCQUFnQjtvQkFDaEIsaUJBQWlCO29CQUNqQixpQkFBaUI7b0JBQ2pCLGlCQUFpQjtpQkFDbEI7Z0JBQ0QsWUFBWSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLENBQUM7Z0JBQ25HLE9BQU8sRUFBRSxDQUFDLGtCQUFrQixFQUFFLG1CQUFtQixFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixDQUFDO2FBQy9GIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG4vLyBBUFBcclxuaW1wb3J0IHsgTm92b0J1dHRvbk1vZHVsZSB9IGZyb20gJy4vLi4vLi4vYnV0dG9uL0J1dHRvbi5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvU2VsZWN0TW9kdWxlIH0gZnJvbSAnLi8uLi8uLi9zZWxlY3QvU2VsZWN0Lm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9QaWNrZXJNb2R1bGUgfSBmcm9tICcuLy4uLy4uL3BpY2tlci9QaWNrZXIubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b0xvYWRpbmdNb2R1bGUgfSBmcm9tICcuLy4uLy4uL2xvYWRpbmcvTG9hZGluZy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvUGlwZXNNb2R1bGUgfSBmcm9tICcuLy4uLy4uLy4uL3BpcGVzL1BpcGVzLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9EcmFndWxhTW9kdWxlIH0gZnJvbSAnLi8uLi8uLi9kcmFndWxhL0RyYWd1bGEubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b0FkZHJlc3NFbGVtZW50IH0gZnJvbSAnLi9hZGRyZXNzL0FkZHJlc3MnO1xyXG5pbXBvcnQgeyBOb3ZvQ2hlY2tib3hFbGVtZW50IH0gZnJvbSAnLi9jaGVja2JveC9DaGVja2JveCc7XHJcbmltcG9ydCB7IE5vdm9DaGVja0xpc3RFbGVtZW50IH0gZnJvbSAnLi9jaGVja2JveC9DaGVja0xpc3QnO1xyXG5pbXBvcnQgeyBOb3ZvRmlsZUlucHV0RWxlbWVudCB9IGZyb20gJy4vZmlsZS9GaWxlSW5wdXQnO1xyXG5pbXBvcnQgeyBOb3ZvVG9vbHRpcE1vZHVsZSB9IGZyb20gJy4vLi4vLi4vdG9vbHRpcC9Ub29sdGlwLm1vZHVsZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgTm92b1BpcGVzTW9kdWxlLFxyXG4gICAgTm92b0J1dHRvbk1vZHVsZSxcclxuICAgIE5vdm9TZWxlY3RNb2R1bGUsXHJcbiAgICBOb3ZvUGlja2VyTW9kdWxlLFxyXG4gICAgTm92b0xvYWRpbmdNb2R1bGUsXHJcbiAgICBOb3ZvRHJhZ3VsYU1vZHVsZSxcclxuICAgIE5vdm9Ub29sdGlwTW9kdWxlLFxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbTm92b0FkZHJlc3NFbGVtZW50LCBOb3ZvQ2hlY2tib3hFbGVtZW50LCBOb3ZvQ2hlY2tMaXN0RWxlbWVudCwgTm92b0ZpbGVJbnB1dEVsZW1lbnRdLFxyXG4gIGV4cG9ydHM6IFtOb3ZvQWRkcmVzc0VsZW1lbnQsIE5vdm9DaGVja2JveEVsZW1lbnQsIE5vdm9DaGVja0xpc3RFbGVtZW50LCBOb3ZvRmlsZUlucHV0RWxlbWVudF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvRm9ybUV4dHJhc01vZHVsZSB7fVxyXG4iXX0=