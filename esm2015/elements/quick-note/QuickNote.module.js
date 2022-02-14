// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoListModule } from './../list/List.module';
// APP
import { NovoLoadingModule } from './../loading/Loading.module';
import { QuickNoteResults } from './extras/quick-note-results/QuickNoteResults';
import { QuickNoteElement } from './QuickNote';
import * as i0 from "@angular/core";
export class NovoQuickNoteModule {
}
NovoQuickNoteModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoQuickNoteModule });
NovoQuickNoteModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoQuickNoteModule_Factory(t) { return new (t || NovoQuickNoteModule)(); }, imports: [[CommonModule, FormsModule, NovoLoadingModule, NovoListModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoQuickNoteModule, { declarations: [QuickNoteElement, QuickNoteResults], imports: [CommonModule, FormsModule, NovoLoadingModule, NovoListModule], exports: [QuickNoteElement, QuickNoteResults] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoQuickNoteModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, FormsModule, NovoLoadingModule, NovoListModule],
                declarations: [QuickNoteElement, QuickNoteResults],
                exports: [QuickNoteElement, QuickNoteResults],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUXVpY2tOb3RlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9xdWljay1ub3RlL1F1aWNrTm90ZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsTUFBTTtBQUNOLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7QUFPL0MsTUFBTSxPQUFPLG1CQUFtQjs7dURBQW5CLG1CQUFtQjtxSEFBbkIsbUJBQW1CLGtCQUpyQixDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxDQUFDO3dGQUk1RCxtQkFBbUIsbUJBSGYsZ0JBQWdCLEVBQUUsZ0JBQWdCLGFBRHZDLFlBQVksRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxhQUU1RCxnQkFBZ0IsRUFBRSxnQkFBZ0I7a0RBRWpDLG1CQUFtQjtjQUwvQixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLENBQUM7Z0JBQ3ZFLFlBQVksRUFBRSxDQUFDLGdCQUFnQixFQUFFLGdCQUFnQixDQUFDO2dCQUNsRCxPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQzthQUM5QyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5vdm9MaXN0TW9kdWxlIH0gZnJvbSAnLi8uLi9saXN0L0xpc3QubW9kdWxlJztcbi8vIEFQUFxuaW1wb3J0IHsgTm92b0xvYWRpbmdNb2R1bGUgfSBmcm9tICcuLy4uL2xvYWRpbmcvTG9hZGluZy5tb2R1bGUnO1xuaW1wb3J0IHsgUXVpY2tOb3RlUmVzdWx0cyB9IGZyb20gJy4vZXh0cmFzL3F1aWNrLW5vdGUtcmVzdWx0cy9RdWlja05vdGVSZXN1bHRzJztcbmltcG9ydCB7IFF1aWNrTm90ZUVsZW1lbnQgfSBmcm9tICcuL1F1aWNrTm90ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBOb3ZvTG9hZGluZ01vZHVsZSwgTm92b0xpc3RNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtRdWlja05vdGVFbGVtZW50LCBRdWlja05vdGVSZXN1bHRzXSxcbiAgZXhwb3J0czogW1F1aWNrTm90ZUVsZW1lbnQsIFF1aWNrTm90ZVJlc3VsdHNdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvUXVpY2tOb3RlTW9kdWxlIHt9XG4iXX0=