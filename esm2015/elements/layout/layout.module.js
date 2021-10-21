// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoLayoutContainer } from './container/layout-container.component';
import { NovoLayoutContent } from './content/layout-content.component';
import { NovoSidenavComponent } from './sidenav/sidenav.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class NovoLayoutModule {
}
NovoLayoutModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoLayoutModule });
NovoLayoutModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoLayoutModule_Factory(t) { return new (t || NovoLayoutModule)(); }, imports: [[CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoLayoutModule, { declarations: [NovoLayoutContainer, NovoLayoutContent, NovoSidenavComponent], imports: [CommonModule], exports: [NovoLayoutContainer, NovoLayoutContent, NovoSidenavComponent] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoLayoutModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                declarations: [NovoLayoutContainer, NovoLayoutContent, NovoSidenavComponent],
                exports: [NovoLayoutContainer, NovoLayoutContent, NovoSidenavComponent],
            }]
    }], null, null); })();
i0.ɵɵsetComponentScope(NovoLayoutContainer, [i1.NgClass, i1.NgComponentOutlet, i1.NgForOf, i1.NgIf, i1.NgTemplateOutlet, i1.NgStyle, i1.NgSwitch, i1.NgSwitchCase, i1.NgSwitchDefault, i1.NgPlural, i1.NgPluralCase, NovoLayoutContainer, NovoLayoutContent, NovoSidenavComponent], [i1.AsyncPipe, i1.UpperCasePipe, i1.LowerCasePipe, i1.JsonPipe, i1.SlicePipe, i1.DecimalPipe, i1.PercentPipe, i1.TitleCasePipe, i1.CurrencyPipe, i1.DatePipe, i1.I18nPluralPipe, i1.I18nSelectPipe, i1.KeyValuePipe]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9sYXlvdXQvbGF5b3V0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsTUFBTTtBQUNOLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7QUFPbkUsTUFBTSxPQUFPLGdCQUFnQjs7b0RBQWhCLGdCQUFnQjsrR0FBaEIsZ0JBQWdCLGtCQUpsQixDQUFDLFlBQVksQ0FBQzt3RkFJWixnQkFBZ0IsbUJBSFosbUJBQW1CLEVBQUUsaUJBQWlCLEVBQUUsb0JBQW9CLGFBRGpFLFlBQVksYUFFWixtQkFBbUIsRUFBRSxpQkFBaUIsRUFBRSxvQkFBb0I7a0RBRTNELGdCQUFnQjtjQUw1QixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUN2QixZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxpQkFBaUIsRUFBRSxvQkFBb0IsQ0FBQztnQkFDNUUsT0FBTyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsaUJBQWlCLEVBQUUsb0JBQW9CLENBQUM7YUFDeEU7O3VCQUZnQixtQkFBbUIsMktBQW5CLG1CQUFtQixFQUFFLGlCQUFpQixFQUFFLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9MYXlvdXRDb250YWluZXIgfSBmcm9tICcuL2NvbnRhaW5lci9sYXlvdXQtY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvTGF5b3V0Q29udGVudCB9IGZyb20gJy4vY29udGVudC9sYXlvdXQtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b1NpZGVuYXZDb21wb25lbnQgfSBmcm9tICcuL3NpZGVuYXYvc2lkZW5hdi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTm92b0xheW91dENvbnRhaW5lciwgTm92b0xheW91dENvbnRlbnQsIE5vdm9TaWRlbmF2Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW05vdm9MYXlvdXRDb250YWluZXIsIE5vdm9MYXlvdXRDb250ZW50LCBOb3ZvU2lkZW5hdkNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9MYXlvdXRNb2R1bGUge31cbiJdfQ==