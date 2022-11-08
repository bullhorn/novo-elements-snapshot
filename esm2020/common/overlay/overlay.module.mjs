// NG2
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoOverlayTemplateComponent } from './overlay';
import * as i0 from "@angular/core";
export class NovoOverlayModule {
}
NovoOverlayModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoOverlayModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoOverlayModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoOverlayModule, declarations: [NovoOverlayTemplateComponent], imports: [CommonModule, FormsModule, OverlayModule, ScrollingModule], exports: [NovoOverlayTemplateComponent, ScrollingModule] });
NovoOverlayModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoOverlayModule, imports: [[CommonModule, FormsModule, OverlayModule, ScrollingModule], ScrollingModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoOverlayModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, OverlayModule, ScrollingModule],
                    declarations: [NovoOverlayTemplateComponent],
                    exports: [NovoOverlayTemplateComponent, ScrollingModule],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21tb24vb3ZlcmxheS9vdmVybGF5Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sV0FBVyxDQUFDOztBQU96RCxNQUFNLE9BQU8saUJBQWlCOzsrR0FBakIsaUJBQWlCO2dIQUFqQixpQkFBaUIsaUJBSGIsNEJBQTRCLGFBRGpDLFlBQVksRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLGVBQWUsYUFFekQsNEJBQTRCLEVBQUUsZUFBZTtnSEFFNUMsaUJBQWlCLFlBSm5CLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsZUFBZSxDQUFDLEVBRTVCLGVBQWU7NEZBRTVDLGlCQUFpQjtrQkFMN0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxlQUFlLENBQUM7b0JBQ3BFLFlBQVksRUFBRSxDQUFDLDRCQUE0QixDQUFDO29CQUM1QyxPQUFPLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxlQUFlLENBQUM7aUJBQ3pEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgU2Nyb2xsaW5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudCB9IGZyb20gJy4vb3ZlcmxheSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBPdmVybGF5TW9kdWxlLCBTY3JvbGxpbmdNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW05vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQsIFNjcm9sbGluZ01vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9PdmVybGF5TW9kdWxlIHt9XG4iXX0=