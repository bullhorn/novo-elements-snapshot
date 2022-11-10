// NG
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoSelectElement } from './select';
import { NovoTooltipModule } from 'novo-elements/components/tooltip';
import { NovoDividerModule } from 'novo-elements/components/divider';
import { NovoOverlayModule } from 'novo-elements/common/overlay';
import { NovoOptionModule } from 'novo-elements/common';
import { NovoButtonModule } from 'novo-elements/components/button';
import { NovoPipesModule } from 'novo-elements/pipes';
import * as i0 from "@angular/core";
export class NovoSelectModule {
}
NovoSelectModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoSelectModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSelectModule, declarations: [NovoSelectElement], imports: [A11yModule,
        CommonModule,
        FormsModule,
        NovoButtonModule,
        NovoDividerModule,
        NovoOptionModule,
        NovoOverlayModule,
        NovoPipesModule,
        NovoTooltipModule], exports: [NovoSelectElement] });
NovoSelectModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSelectModule, imports: [[
            A11yModule,
            CommonModule,
            FormsModule,
            NovoButtonModule,
            NovoDividerModule,
            NovoOptionModule,
            NovoOverlayModule,
            NovoPipesModule,
            NovoTooltipModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSelectModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        A11yModule,
                        CommonModule,
                        FormsModule,
                        NovoButtonModule,
                        NovoDividerModule,
                        NovoOptionModule,
                        NovoOverlayModule,
                        NovoPipesModule,
                        NovoTooltipModule,
                    ],
                    declarations: [NovoSelectElement],
                    exports: [NovoSelectElement],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsS0FBSztBQUNMLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFpQnRELE1BQU0sT0FBTyxnQkFBZ0I7OzhHQUFoQixnQkFBZ0I7K0dBQWhCLGdCQUFnQixpQkFIWixpQkFBaUIsYUFWOUIsVUFBVTtRQUNWLFlBQVk7UUFDWixXQUFXO1FBQ1gsZ0JBQWdCO1FBQ2hCLGlCQUFpQjtRQUNqQixnQkFBZ0I7UUFDaEIsaUJBQWlCO1FBQ2pCLGVBQWU7UUFDZixpQkFBaUIsYUFHVCxpQkFBaUI7K0dBRWhCLGdCQUFnQixZQWRsQjtZQUNQLFVBQVU7WUFDVixZQUFZO1lBQ1osV0FBVztZQUNYLGdCQUFnQjtZQUNoQixpQkFBaUI7WUFDakIsZ0JBQWdCO1lBQ2hCLGlCQUFpQjtZQUNqQixlQUFlO1lBQ2YsaUJBQWlCO1NBQ2xCOzRGQUlVLGdCQUFnQjtrQkFmNUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsVUFBVTt3QkFDVixZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsZ0JBQWdCO3dCQUNoQixpQkFBaUI7d0JBQ2pCLGdCQUFnQjt3QkFDaEIsaUJBQWlCO3dCQUNqQixlQUFlO3dCQUNmLGlCQUFpQjtxQkFDbEI7b0JBQ0QsWUFBWSxFQUFFLENBQUMsaUJBQWlCLENBQUM7b0JBQ2pDLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixDQUFDO2lCQUM3QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HXG5pbXBvcnQgeyBBMTF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5vdm9TZWxlY3RFbGVtZW50IH0gZnJvbSAnLi9zZWxlY3QnO1xuaW1wb3J0IHsgTm92b1Rvb2x0aXBNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvdG9vbHRpcCc7XG5pbXBvcnQgeyBOb3ZvRGl2aWRlck1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy9kaXZpZGVyJztcbmltcG9ydCB7IE5vdm9PdmVybGF5TW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21tb24vb3ZlcmxheSc7XG5pbXBvcnQgeyBOb3ZvT3B0aW9uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21tb24nO1xuaW1wb3J0IHsgTm92b0J1dHRvbk1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy9idXR0b24nO1xuaW1wb3J0IHsgTm92b1BpcGVzTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9waXBlcyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBBMTF5TW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBOb3ZvQnV0dG9uTW9kdWxlLFxuICAgIE5vdm9EaXZpZGVyTW9kdWxlLFxuICAgIE5vdm9PcHRpb25Nb2R1bGUsXG4gICAgTm92b092ZXJsYXlNb2R1bGUsXG4gICAgTm92b1BpcGVzTW9kdWxlLFxuICAgIE5vdm9Ub29sdGlwTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtOb3ZvU2VsZWN0RWxlbWVudF0sXG4gIGV4cG9ydHM6IFtOb3ZvU2VsZWN0RWxlbWVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TZWxlY3RNb2R1bGUge31cbiJdfQ==