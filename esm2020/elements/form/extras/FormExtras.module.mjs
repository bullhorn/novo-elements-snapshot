// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoPipesModule } from 'novo-elements/pipes';
import { NovoDragulaModule, NovoDragulaService } from 'novo-elements/addons/dragula';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoCheckboxModule } from 'novo-elements/elements/checkbox';
import { NovoLoadingModule } from 'novo-elements/elements/loading';
import { NovoPickerModule } from 'novo-elements/elements/picker';
import { NovoSelectModule } from 'novo-elements/elements/select';
import { NovoTooltipModule } from 'novo-elements/elements/tooltip';
import { NovoAddressElement } from './address/Address';
import { NovoFileInputElement } from './file/FileInput';
import * as i0 from "@angular/core";
export class NovoFormExtrasModule {
}
NovoFormExtrasModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFormExtrasModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoFormExtrasModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFormExtrasModule, declarations: [NovoAddressElement, NovoFileInputElement], imports: [CommonModule,
        FormsModule,
        NovoPipesModule,
        NovoButtonModule,
        NovoSelectModule,
        NovoPickerModule,
        NovoLoadingModule,
        NovoDragulaModule,
        NovoTooltipModule,
        NovoCheckboxModule], exports: [NovoAddressElement, NovoFileInputElement] });
NovoFormExtrasModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFormExtrasModule, providers: [NovoDragulaService], imports: [[
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
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFormExtrasModule, decorators: [{
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
                        NovoCheckboxModule,
                    ],
                    declarations: [NovoAddressElement, NovoFileInputElement],
                    exports: [NovoAddressElement, NovoFileInputElement],
                    providers: [NovoDragulaService],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybUV4dHJhcy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9mb3JtL2V4dHJhcy9Gb3JtRXh0cmFzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNyRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7QUFtQnhELE1BQU0sT0FBTyxvQkFBb0I7O2tIQUFwQixvQkFBb0I7bUhBQXBCLG9CQUFvQixpQkFKaEIsa0JBQWtCLEVBQUUsb0JBQW9CLGFBWHJELFlBQVk7UUFDWixXQUFXO1FBQ1gsZUFBZTtRQUNmLGdCQUFnQjtRQUNoQixnQkFBZ0I7UUFDaEIsZ0JBQWdCO1FBQ2hCLGlCQUFpQjtRQUNqQixpQkFBaUI7UUFDakIsaUJBQWlCO1FBQ2pCLGtCQUFrQixhQUdWLGtCQUFrQixFQUFFLG9CQUFvQjttSEFHdkMsb0JBQW9CLGFBRnBCLENBQUMsa0JBQWtCLENBQUMsWUFkdEI7WUFDUCxZQUFZO1lBQ1osV0FBVztZQUNYLGVBQWU7WUFDZixnQkFBZ0I7WUFDaEIsZ0JBQWdCO1lBQ2hCLGdCQUFnQjtZQUNoQixpQkFBaUI7WUFDakIsaUJBQWlCO1lBQ2pCLGlCQUFpQjtZQUNqQixrQkFBa0I7U0FDbkI7NEZBS1Usb0JBQW9CO2tCQWpCaEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLGVBQWU7d0JBQ2YsZ0JBQWdCO3dCQUNoQixnQkFBZ0I7d0JBQ2hCLGdCQUFnQjt3QkFDaEIsaUJBQWlCO3dCQUNqQixpQkFBaUI7d0JBQ2pCLGlCQUFpQjt3QkFDakIsa0JBQWtCO3FCQUNuQjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxvQkFBb0IsQ0FBQztvQkFDeEQsT0FBTyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsb0JBQW9CLENBQUM7b0JBQ25ELFNBQVMsRUFBRSxDQUFDLGtCQUFrQixDQUFDO2lCQUNoQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5vdm9QaXBlc01vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvcGlwZXMnO1xuaW1wb3J0IHsgTm92b0RyYWd1bGFNb2R1bGUsIE5vdm9EcmFndWxhU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvYWRkb25zL2RyYWd1bGEnO1xuaW1wb3J0IHsgTm92b0J1dHRvbk1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvYnV0dG9uJztcbmltcG9ydCB7IE5vdm9DaGVja2JveE1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvY2hlY2tib3gnO1xuaW1wb3J0IHsgTm92b0xvYWRpbmdNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2xvYWRpbmcnO1xuaW1wb3J0IHsgTm92b1BpY2tlck1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvcGlja2VyJztcbmltcG9ydCB7IE5vdm9TZWxlY3RNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL3NlbGVjdCc7XG5pbXBvcnQgeyBOb3ZvVG9vbHRpcE1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvdG9vbHRpcCc7XG5pbXBvcnQgeyBOb3ZvQWRkcmVzc0VsZW1lbnQgfSBmcm9tICcuL2FkZHJlc3MvQWRkcmVzcyc7XG5pbXBvcnQgeyBOb3ZvRmlsZUlucHV0RWxlbWVudCB9IGZyb20gJy4vZmlsZS9GaWxlSW5wdXQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE5vdm9QaXBlc01vZHVsZSxcbiAgICBOb3ZvQnV0dG9uTW9kdWxlLFxuICAgIE5vdm9TZWxlY3RNb2R1bGUsXG4gICAgTm92b1BpY2tlck1vZHVsZSxcbiAgICBOb3ZvTG9hZGluZ01vZHVsZSxcbiAgICBOb3ZvRHJhZ3VsYU1vZHVsZSxcbiAgICBOb3ZvVG9vbHRpcE1vZHVsZSxcbiAgICBOb3ZvQ2hlY2tib3hNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW05vdm9BZGRyZXNzRWxlbWVudCwgTm92b0ZpbGVJbnB1dEVsZW1lbnRdLFxuICBleHBvcnRzOiBbTm92b0FkZHJlc3NFbGVtZW50LCBOb3ZvRmlsZUlucHV0RWxlbWVudF0sXG4gIHByb3ZpZGVyczogW05vdm9EcmFndWxhU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Gb3JtRXh0cmFzTW9kdWxlIHt9XG4iXX0=