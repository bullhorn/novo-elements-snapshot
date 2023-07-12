import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccentColorDirective } from './directives/accent.directive';
import { BackgroundColorDirective } from './directives/bg.directive';
import { BorderDirective } from './directives/border.directive';
import { TextColorDirective } from './directives/color.directive';
import { FillColorDirective } from './directives/fill.directive';
import { FlexDirective } from './directives/flex.directive';
import { GapDirective, MarginDirective, PaddingDirective } from './directives/space.directive';
import { SwitchCasesDirective } from './directives/switch-cases.directive';
import { ThemeColorDirective } from './directives/theme.directive';
import { VisibleDirective } from './directives/visible.directive';
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
NovoCommonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCommonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoCommonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCommonModule, declarations: [NovoTemplate,
        NovoText,
        NovoTitle,
        NovoCaption,
        NovoLabel,
        NovoLink,
        MarginDirective,
        PaddingDirective,
        BackgroundColorDirective,
        TextColorDirective,
        BorderDirective,
        GapDirective,
        AccentColorDirective,
        FillColorDirective,
        FlexDirective,
        ThemeColorDirective,
        SwitchCasesDirective,
        VisibleDirective], imports: [CommonModule, NovoOptionModule], exports: [NovoTemplate,
        NovoText,
        NovoTitle,
        NovoCaption,
        NovoLabel,
        NovoLink,
        MarginDirective,
        PaddingDirective,
        BackgroundColorDirective,
        TextColorDirective,
        BorderDirective,
        GapDirective,
        AccentColorDirective,
        FillColorDirective,
        FlexDirective,
        ThemeColorDirective,
        SwitchCasesDirective,
        VisibleDirective] });
NovoCommonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCommonModule, imports: [[CommonModule, NovoOptionModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCommonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoOptionModule],
                    exports: [
                        NovoTemplate,
                        NovoText,
                        NovoTitle,
                        NovoCaption,
                        NovoLabel,
                        NovoLink,
                        MarginDirective,
                        PaddingDirective,
                        BackgroundColorDirective,
                        TextColorDirective,
                        BorderDirective,
                        GapDirective,
                        AccentColorDirective,
                        FillColorDirective,
                        FlexDirective,
                        ThemeColorDirective,
                        SwitchCasesDirective,
                        VisibleDirective,
                    ],
                    declarations: [
                        NovoTemplate,
                        NovoText,
                        NovoTitle,
                        NovoCaption,
                        NovoLabel,
                        NovoLink,
                        MarginDirective,
                        PaddingDirective,
                        BackgroundColorDirective,
                        TextColorDirective,
                        BorderDirective,
                        GapDirective,
                        AccentColorDirective,
                        FillColorDirective,
                        FlexDirective,
                        ThemeColorDirective,
                        SwitchCasesDirective,
                        VisibleDirective,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2NvbW1vbi9jb21tb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDL0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzVELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUM1RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7O0FBNkMvRCxNQUFNLE9BQU8sZ0JBQWdCOzs4R0FBaEIsZ0JBQWdCOytHQUFoQixnQkFBZ0IsaUJBcEJ6QixZQUFZO1FBQ1osUUFBUTtRQUNSLFNBQVM7UUFDVCxXQUFXO1FBQ1gsU0FBUztRQUNULFFBQVE7UUFDUixlQUFlO1FBQ2YsZ0JBQWdCO1FBQ2hCLHdCQUF3QjtRQUN4QixrQkFBa0I7UUFDbEIsZUFBZTtRQUNmLFlBQVk7UUFDWixvQkFBb0I7UUFDcEIsa0JBQWtCO1FBQ2xCLGFBQWE7UUFDYixtQkFBbUI7UUFDbkIsb0JBQW9CO1FBQ3BCLGdCQUFnQixhQXZDUixZQUFZLEVBQUUsZ0JBQWdCLGFBRXRDLFlBQVk7UUFDWixRQUFRO1FBQ1IsU0FBUztRQUNULFdBQVc7UUFDWCxTQUFTO1FBQ1QsUUFBUTtRQUNSLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsd0JBQXdCO1FBQ3hCLGtCQUFrQjtRQUNsQixlQUFlO1FBQ2YsWUFBWTtRQUNaLG9CQUFvQjtRQUNwQixrQkFBa0I7UUFDbEIsYUFBYTtRQUNiLG1CQUFtQjtRQUNuQixvQkFBb0I7UUFDcEIsZ0JBQWdCOytHQXVCUCxnQkFBZ0IsWUExQ2xCLENBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDOzRGQTBDOUIsZ0JBQWdCO2tCQTNDNUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLENBQUM7b0JBQ3pDLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFFBQVE7d0JBQ1IsU0FBUzt3QkFDVCxXQUFXO3dCQUNYLFNBQVM7d0JBQ1QsUUFBUTt3QkFDUixlQUFlO3dCQUNmLGdCQUFnQjt3QkFDaEIsd0JBQXdCO3dCQUN4QixrQkFBa0I7d0JBQ2xCLGVBQWU7d0JBQ2YsWUFBWTt3QkFDWixvQkFBb0I7d0JBQ3BCLGtCQUFrQjt3QkFDbEIsYUFBYTt3QkFDYixtQkFBbUI7d0JBQ25CLG9CQUFvQjt3QkFDcEIsZ0JBQWdCO3FCQUNqQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osWUFBWTt3QkFDWixRQUFRO3dCQUNSLFNBQVM7d0JBQ1QsV0FBVzt3QkFDWCxTQUFTO3dCQUNULFFBQVE7d0JBQ1IsZUFBZTt3QkFDZixnQkFBZ0I7d0JBQ2hCLHdCQUF3Qjt3QkFDeEIsa0JBQWtCO3dCQUNsQixlQUFlO3dCQUNmLFlBQVk7d0JBQ1osb0JBQW9CO3dCQUNwQixrQkFBa0I7d0JBQ2xCLGFBQWE7d0JBQ2IsbUJBQW1CO3dCQUNuQixvQkFBb0I7d0JBQ3BCLGdCQUFnQjtxQkFDakI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjY2VudENvbG9yRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2FjY2VudC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQmFja2dyb3VuZENvbG9yRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2JnLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCb3JkZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYm9yZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUZXh0Q29sb3JEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvY29sb3IuZGlyZWN0aXZlJztcbmltcG9ydCB7IEZpbGxDb2xvckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9maWxsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBGbGV4RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2ZsZXguZGlyZWN0aXZlJztcbmltcG9ydCB7IEdhcERpcmVjdGl2ZSwgTWFyZ2luRGlyZWN0aXZlLCBQYWRkaW5nRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3NwYWNlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTd2l0Y2hDYXNlc0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zd2l0Y2gtY2FzZXMuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRoZW1lQ29sb3JEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdGhlbWUuZGlyZWN0aXZlJztcbmltcG9ydCB7IFZpc2libGVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdmlzaWJsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTm92b1RlbXBsYXRlIH0gZnJvbSAnLi9ub3ZvLXRlbXBsYXRlL25vdm8tdGVtcGxhdGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IE5vdm9PcHRpb25Nb2R1bGUgfSBmcm9tICcuL29wdGlvbic7XG5pbXBvcnQgeyBOb3ZvQ2FwdGlvbiB9IGZyb20gJy4vdHlwb2dyYXBoeS9jYXB0aW9uL2NhcHRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9MYWJlbCB9IGZyb20gJy4vdHlwb2dyYXBoeS9sYWJlbC9sYWJlbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b0xpbmsgfSBmcm9tICcuL3R5cG9ncmFwaHkvbGluay9saW5rLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvVGV4dCB9IGZyb20gJy4vdHlwb2dyYXBoeS90ZXh0L3RleHQuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9UaXRsZSB9IGZyb20gJy4vdHlwb2dyYXBoeS90aXRsZS90aXRsZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBOb3ZvT3B0aW9uTW9kdWxlXSxcbiAgZXhwb3J0czogW1xuICAgIE5vdm9UZW1wbGF0ZSxcbiAgICBOb3ZvVGV4dCxcbiAgICBOb3ZvVGl0bGUsXG4gICAgTm92b0NhcHRpb24sXG4gICAgTm92b0xhYmVsLFxuICAgIE5vdm9MaW5rLFxuICAgIE1hcmdpbkRpcmVjdGl2ZSxcbiAgICBQYWRkaW5nRGlyZWN0aXZlLFxuICAgIEJhY2tncm91bmRDb2xvckRpcmVjdGl2ZSxcbiAgICBUZXh0Q29sb3JEaXJlY3RpdmUsXG4gICAgQm9yZGVyRGlyZWN0aXZlLFxuICAgIEdhcERpcmVjdGl2ZSxcbiAgICBBY2NlbnRDb2xvckRpcmVjdGl2ZSxcbiAgICBGaWxsQ29sb3JEaXJlY3RpdmUsXG4gICAgRmxleERpcmVjdGl2ZSxcbiAgICBUaGVtZUNvbG9yRGlyZWN0aXZlLFxuICAgIFN3aXRjaENhc2VzRGlyZWN0aXZlLFxuICAgIFZpc2libGVEaXJlY3RpdmUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5vdm9UZW1wbGF0ZSxcbiAgICBOb3ZvVGV4dCxcbiAgICBOb3ZvVGl0bGUsXG4gICAgTm92b0NhcHRpb24sXG4gICAgTm92b0xhYmVsLFxuICAgIE5vdm9MaW5rLFxuICAgIE1hcmdpbkRpcmVjdGl2ZSxcbiAgICBQYWRkaW5nRGlyZWN0aXZlLFxuICAgIEJhY2tncm91bmRDb2xvckRpcmVjdGl2ZSxcbiAgICBUZXh0Q29sb3JEaXJlY3RpdmUsXG4gICAgQm9yZGVyRGlyZWN0aXZlLFxuICAgIEdhcERpcmVjdGl2ZSxcbiAgICBBY2NlbnRDb2xvckRpcmVjdGl2ZSxcbiAgICBGaWxsQ29sb3JEaXJlY3RpdmUsXG4gICAgRmxleERpcmVjdGl2ZSxcbiAgICBUaGVtZUNvbG9yRGlyZWN0aXZlLFxuICAgIFN3aXRjaENhc2VzRGlyZWN0aXZlLFxuICAgIFZpc2libGVEaXJlY3RpdmUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Db21tb25Nb2R1bGUge31cbiJdfQ==