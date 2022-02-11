// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoPipesModule } from './../../../pipes/Pipes.module';
import { NovoButtonModule } from './../../button/Button.module';
import { NovoCheckboxModule } from './../../checkbox';
import { NovoDragulaModule } from './../../dragula/Dragula.module';
import { NovoLoadingModule } from './../../loading/Loading.module';
import { NovoPickerModule } from './../../picker/Picker.module';
import { NovoSelectModule } from './../../select/Select.module';
import { NovoTooltipModule } from './../../tooltip/Tooltip.module';
import { NovoAddressElement } from './address/Address';
import { NovoFileInputElement } from './file/FileInput';
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
                    NovoCheckboxModule,
                ],
                declarations: [NovoAddressElement, NovoFileInputElement],
                exports: [NovoAddressElement, NovoFileInputElement],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybUV4dHJhcy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvZm9ybS9leHRyYXMvRm9ybUV4dHJhcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFrQnhELE1BQU0sT0FBTyxvQkFBb0I7OztZQWhCaEMsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsZUFBZTtvQkFDZixnQkFBZ0I7b0JBQ2hCLGdCQUFnQjtvQkFDaEIsZ0JBQWdCO29CQUNoQixpQkFBaUI7b0JBQ2pCLGlCQUFpQjtvQkFDakIsaUJBQWlCO29CQUNqQixrQkFBa0I7aUJBQ25CO2dCQUNELFlBQVksRUFBRSxDQUFDLGtCQUFrQixFQUFFLG9CQUFvQixDQUFDO2dCQUN4RCxPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxvQkFBb0IsQ0FBQzthQUNwRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5vdm9QaXBlc01vZHVsZSB9IGZyb20gJy4vLi4vLi4vLi4vcGlwZXMvUGlwZXMubW9kdWxlJztcbmltcG9ydCB7IE5vdm9CdXR0b25Nb2R1bGUgfSBmcm9tICcuLy4uLy4uL2J1dHRvbi9CdXR0b24ubW9kdWxlJztcbmltcG9ydCB7IE5vdm9DaGVja2JveE1vZHVsZSB9IGZyb20gJy4vLi4vLi4vY2hlY2tib3gnO1xuaW1wb3J0IHsgTm92b0RyYWd1bGFNb2R1bGUgfSBmcm9tICcuLy4uLy4uL2RyYWd1bGEvRHJhZ3VsYS5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0xvYWRpbmdNb2R1bGUgfSBmcm9tICcuLy4uLy4uL2xvYWRpbmcvTG9hZGluZy5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1BpY2tlck1vZHVsZSB9IGZyb20gJy4vLi4vLi4vcGlja2VyL1BpY2tlci5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1NlbGVjdE1vZHVsZSB9IGZyb20gJy4vLi4vLi4vc2VsZWN0L1NlbGVjdC5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1Rvb2x0aXBNb2R1bGUgfSBmcm9tICcuLy4uLy4uL3Rvb2x0aXAvVG9vbHRpcC5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0FkZHJlc3NFbGVtZW50IH0gZnJvbSAnLi9hZGRyZXNzL0FkZHJlc3MnO1xuaW1wb3J0IHsgTm92b0ZpbGVJbnB1dEVsZW1lbnQgfSBmcm9tICcuL2ZpbGUvRmlsZUlucHV0JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBOb3ZvUGlwZXNNb2R1bGUsXG4gICAgTm92b0J1dHRvbk1vZHVsZSxcbiAgICBOb3ZvU2VsZWN0TW9kdWxlLFxuICAgIE5vdm9QaWNrZXJNb2R1bGUsXG4gICAgTm92b0xvYWRpbmdNb2R1bGUsXG4gICAgTm92b0RyYWd1bGFNb2R1bGUsXG4gICAgTm92b1Rvb2x0aXBNb2R1bGUsXG4gICAgTm92b0NoZWNrYm94TW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtOb3ZvQWRkcmVzc0VsZW1lbnQsIE5vdm9GaWxlSW5wdXRFbGVtZW50XSxcbiAgZXhwb3J0czogW05vdm9BZGRyZXNzRWxlbWVudCwgTm92b0ZpbGVJbnB1dEVsZW1lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRm9ybUV4dHJhc01vZHVsZSB7fVxuIl19