import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoCheckboxElement } from './Checkbox';
import { NovoCheckListElement } from './CheckList';
import * as i0 from "@angular/core";
export class NovoCheckboxModule {
}
NovoCheckboxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCheckboxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoCheckboxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCheckboxModule, declarations: [NovoCheckboxElement, NovoCheckListElement], imports: [CommonModule, A11yModule, FormsModule], exports: [NovoCheckboxElement, NovoCheckListElement] });
NovoCheckboxModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCheckboxModule, imports: [[CommonModule, A11yModule, FormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCheckboxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, A11yModule, FormsModule],
                    declarations: [NovoCheckboxElement, NovoCheckListElement],
                    exports: [NovoCheckboxElement, NovoCheckListElement],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2tib3gubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvY2hlY2tib3gvQ2hlY2tib3gubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7QUFPbkQsTUFBTSxPQUFPLGtCQUFrQjs7Z0hBQWxCLGtCQUFrQjtpSEFBbEIsa0JBQWtCLGlCQUhkLG1CQUFtQixFQUFFLG9CQUFvQixhQUQ5QyxZQUFZLEVBQUUsVUFBVSxFQUFFLFdBQVcsYUFFckMsbUJBQW1CLEVBQUUsb0JBQW9CO2lIQUV4QyxrQkFBa0IsWUFKcEIsQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQzs0RkFJckMsa0JBQWtCO2tCQUw5QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsV0FBVyxDQUFDO29CQUNoRCxZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxvQkFBb0IsQ0FBQztvQkFDekQsT0FBTyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsb0JBQW9CLENBQUM7aUJBQ3JEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOb3ZvQ2hlY2tib3hFbGVtZW50IH0gZnJvbSAnLi9DaGVja2JveCc7XG5pbXBvcnQgeyBOb3ZvQ2hlY2tMaXN0RWxlbWVudCB9IGZyb20gJy4vQ2hlY2tMaXN0JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQTExeU1vZHVsZSwgRm9ybXNNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtOb3ZvQ2hlY2tib3hFbGVtZW50LCBOb3ZvQ2hlY2tMaXN0RWxlbWVudF0sXG4gIGV4cG9ydHM6IFtOb3ZvQ2hlY2tib3hFbGVtZW50LCBOb3ZvQ2hlY2tMaXN0RWxlbWVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9DaGVja2JveE1vZHVsZSB7fVxuIl19