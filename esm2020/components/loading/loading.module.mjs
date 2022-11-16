// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoIsLoadingDirective, NovoLoadedDirective, NovoLoadingElement, NovoSkeletonDirective, NovoSpinnerElement, } from './loading';
import * as i0 from "@angular/core";
export class NovoLoadingModule {
}
NovoLoadingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLoadingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoLoadingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLoadingModule, declarations: [NovoLoadingElement, NovoSpinnerElement, NovoIsLoadingDirective, NovoLoadedDirective, NovoSkeletonDirective], imports: [CommonModule], exports: [NovoLoadingElement, NovoSpinnerElement, NovoIsLoadingDirective, NovoLoadedDirective, NovoSkeletonDirective] });
NovoLoadingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLoadingModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLoadingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [NovoLoadingElement, NovoSpinnerElement, NovoIsLoadingDirective, NovoLoadedDirective, NovoSkeletonDirective],
                    exports: [NovoLoadingElement, NovoSpinnerElement, NovoIsLoadingDirective, NovoLoadedDirective, NovoSkeletonDirective],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL2xvYWRpbmcvbG9hZGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFDTCxzQkFBc0IsRUFDdEIsbUJBQW1CLEVBQ25CLGtCQUFrQixFQUNsQixxQkFBcUIsRUFDckIsa0JBQWtCLEdBQ25CLE1BQU0sV0FBVyxDQUFDOztBQU9uQixNQUFNLE9BQU8saUJBQWlCOzsrR0FBakIsaUJBQWlCO2dIQUFqQixpQkFBaUIsaUJBSGIsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsc0JBQXNCLEVBQUUsbUJBQW1CLEVBQUUscUJBQXFCLGFBRC9HLFlBQVksYUFFWixrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxzQkFBc0IsRUFBRSxtQkFBbUIsRUFBRSxxQkFBcUI7Z0hBRXpHLGlCQUFpQixZQUpuQixDQUFDLFlBQVksQ0FBQzs0RkFJWixpQkFBaUI7a0JBTDdCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxzQkFBc0IsRUFBRSxtQkFBbUIsRUFBRSxxQkFBcUIsQ0FBQztvQkFDMUgsT0FBTyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsc0JBQXNCLEVBQUUsbUJBQW1CLEVBQUUscUJBQXFCLENBQUM7aUJBQ3RIIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE5vdm9Jc0xvYWRpbmdEaXJlY3RpdmUsXG4gIE5vdm9Mb2FkZWREaXJlY3RpdmUsXG4gIE5vdm9Mb2FkaW5nRWxlbWVudCxcbiAgTm92b1NrZWxldG9uRGlyZWN0aXZlLFxuICBOb3ZvU3Bpbm5lckVsZW1lbnQsXG59IGZyb20gJy4vbG9hZGluZyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtOb3ZvTG9hZGluZ0VsZW1lbnQsIE5vdm9TcGlubmVyRWxlbWVudCwgTm92b0lzTG9hZGluZ0RpcmVjdGl2ZSwgTm92b0xvYWRlZERpcmVjdGl2ZSwgTm92b1NrZWxldG9uRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW05vdm9Mb2FkaW5nRWxlbWVudCwgTm92b1NwaW5uZXJFbGVtZW50LCBOb3ZvSXNMb2FkaW5nRGlyZWN0aXZlLCBOb3ZvTG9hZGVkRGlyZWN0aXZlLCBOb3ZvU2tlbGV0b25EaXJlY3RpdmVdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvTG9hZGluZ01vZHVsZSB7fVxuIl19