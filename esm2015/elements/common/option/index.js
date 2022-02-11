import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoPseudoCheckboxModule } from '../selection/index';
import { NovoOptgroup } from './optgroup.component';
import { NovoOption } from './option.component';
import * as i0 from "@angular/core";
export class NovoOptionModule {
}
NovoOptionModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoOptionModule });
NovoOptionModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoOptionModule_Factory(t) { return new (t || NovoOptionModule)(); }, imports: [[CommonModule, NovoPseudoCheckboxModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoOptionModule, { declarations: [NovoOption, NovoOptgroup], imports: [CommonModule, NovoPseudoCheckboxModule], exports: [NovoOption, NovoOptgroup] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoOptionModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, NovoPseudoCheckboxModule],
                exports: [NovoOption, NovoOptgroup],
                declarations: [NovoOption, NovoOptgroup],
            }]
    }], null, null); })();
export * from './optgroup.component';
export * from './option-parent';
export * from './option.component';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvY29tbW9uL29wdGlvbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztBQU9oRCxNQUFNLE9BQU8sZ0JBQWdCOztvREFBaEIsZ0JBQWdCOytHQUFoQixnQkFBZ0Isa0JBSmxCLENBQUMsWUFBWSxFQUFFLHdCQUF3QixDQUFDO3dGQUl0QyxnQkFBZ0IsbUJBRlosVUFBVSxFQUFFLFlBQVksYUFGN0IsWUFBWSxFQUFFLHdCQUF3QixhQUN0QyxVQUFVLEVBQUUsWUFBWTtrREFHdkIsZ0JBQWdCO2NBTDVCLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsd0JBQXdCLENBQUM7Z0JBQ2pELE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUM7Z0JBQ25DLFlBQVksRUFBRSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUM7YUFDekM7O0FBR0QsY0FBYyxzQkFBc0IsQ0FBQztBQUNyQyxjQUFjLGlCQUFpQixDQUFDO0FBQ2hDLGNBQWMsb0JBQW9CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9Qc2V1ZG9DaGVja2JveE1vZHVsZSB9IGZyb20gJy4uL3NlbGVjdGlvbi9pbmRleCc7XG5pbXBvcnQgeyBOb3ZvT3B0Z3JvdXAgfSBmcm9tICcuL29wdGdyb3VwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvT3B0aW9uIH0gZnJvbSAnLi9vcHRpb24uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTm92b1BzZXVkb0NoZWNrYm94TW9kdWxlXSxcbiAgZXhwb3J0czogW05vdm9PcHRpb24sIE5vdm9PcHRncm91cF0sXG4gIGRlY2xhcmF0aW9uczogW05vdm9PcHRpb24sIE5vdm9PcHRncm91cF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9PcHRpb25Nb2R1bGUge31cblxuZXhwb3J0ICogZnJvbSAnLi9vcHRncm91cC5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9vcHRpb24tcGFyZW50JztcbmV4cG9ydCAqIGZyb20gJy4vb3B0aW9uLmNvbXBvbmVudCc7XG4iXX0=