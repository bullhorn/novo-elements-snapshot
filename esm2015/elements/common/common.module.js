import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarginDirective, PaddingDirective } from './directives/space.directive';
import { NovoTemplate } from './novo-template/novo-template.directive';
import { NovoOptionModule } from './option';
import { NovoCaption } from './typography/caption/caption.component';
import { NovoLabel } from './typography/label/label.component';
import { NovoLink } from './typography/link/link.component';
import { NovoText } from './typography/text/text.component';
import { NovoTitle } from './typography/title/title.component';
import * as i0 from "@angular/core";
export class NovoCommonModule {
}
NovoCommonModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoCommonModule });
NovoCommonModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoCommonModule_Factory(t) { return new (t || NovoCommonModule)(); }, imports: [[CommonModule, NovoOptionModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoCommonModule, { declarations: [NovoTemplate, NovoText, NovoTitle, NovoCaption, NovoLabel, NovoLink, MarginDirective, PaddingDirective], imports: [CommonModule, NovoOptionModule], exports: [NovoTemplate, NovoText, NovoTitle, NovoCaption, NovoLabel, NovoLink, MarginDirective, PaddingDirective] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoCommonModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, NovoOptionModule],
                exports: [NovoTemplate, NovoText, NovoTitle, NovoCaption, NovoLabel, NovoLink, MarginDirective, PaddingDirective],
                declarations: [NovoTemplate, NovoText, NovoTitle, NovoCaption, NovoLabel, NovoLink, MarginDirective, PaddingDirective],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9jb21tb24vY29tbW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDakYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDckUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUM1RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDNUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOztBQU0vRCxNQUFNLE9BQU8sZ0JBQWdCOztvREFBaEIsZ0JBQWdCOytHQUFoQixnQkFBZ0Isa0JBSmxCLENBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDO3dGQUk5QixnQkFBZ0IsbUJBRlosWUFBWSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixhQUYzRyxZQUFZLEVBQUUsZ0JBQWdCLGFBQzlCLFlBQVksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0I7a0RBR3JHLGdCQUFnQjtjQUw1QixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDO2dCQUN6QyxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLENBQUM7Z0JBQ2pILFlBQVksRUFBRSxDQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsQ0FBQzthQUN2SCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWFyZ2luRGlyZWN0aXZlLCBQYWRkaW5nRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3NwYWNlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOb3ZvVGVtcGxhdGUgfSBmcm9tICcuL25vdm8tdGVtcGxhdGUvbm92by10ZW1wbGF0ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTm92b09wdGlvbk1vZHVsZSB9IGZyb20gJy4vb3B0aW9uJztcbmltcG9ydCB7IE5vdm9DYXB0aW9uIH0gZnJvbSAnLi90eXBvZ3JhcGh5L2NhcHRpb24vY2FwdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b0xhYmVsIH0gZnJvbSAnLi90eXBvZ3JhcGh5L2xhYmVsL2xhYmVsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvTGluayB9IGZyb20gJy4vdHlwb2dyYXBoeS9saW5rL2xpbmsuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9UZXh0IH0gZnJvbSAnLi90eXBvZ3JhcGh5L3RleHQvdGV4dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b1RpdGxlIH0gZnJvbSAnLi90eXBvZ3JhcGh5L3RpdGxlL3RpdGxlLmNvbXBvbmVudCc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBOb3ZvT3B0aW9uTW9kdWxlXSxcbiAgZXhwb3J0czogW05vdm9UZW1wbGF0ZSwgTm92b1RleHQsIE5vdm9UaXRsZSwgTm92b0NhcHRpb24sIE5vdm9MYWJlbCwgTm92b0xpbmssIE1hcmdpbkRpcmVjdGl2ZSwgUGFkZGluZ0RpcmVjdGl2ZV0sXG4gIGRlY2xhcmF0aW9uczogW05vdm9UZW1wbGF0ZSwgTm92b1RleHQsIE5vdm9UaXRsZSwgTm92b0NhcHRpb24sIE5vdm9MYWJlbCwgTm92b0xpbmssIE1hcmdpbkRpcmVjdGl2ZSwgUGFkZGluZ0RpcmVjdGl2ZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Db21tb25Nb2R1bGUge31cbiJdfQ==