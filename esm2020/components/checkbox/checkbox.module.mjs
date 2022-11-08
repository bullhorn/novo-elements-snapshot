import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoCheckListElement } from './check-list';
import { NovoCheckboxElement } from './checkbox';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9jaGVja2JveC9jaGVja2JveC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDcEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sWUFBWSxDQUFDOztBQU9qRCxNQUFNLE9BQU8sa0JBQWtCOztnSEFBbEIsa0JBQWtCO2lIQUFsQixrQkFBa0IsaUJBSGQsbUJBQW1CLEVBQUUsb0JBQW9CLGFBRDlDLFlBQVksRUFBRSxVQUFVLEVBQUUsV0FBVyxhQUVyQyxtQkFBbUIsRUFBRSxvQkFBb0I7aUhBRXhDLGtCQUFrQixZQUpwQixDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsV0FBVyxDQUFDOzRGQUlyQyxrQkFBa0I7a0JBTDlCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUM7b0JBQ2hELFlBQVksRUFBRSxDQUFDLG1CQUFtQixFQUFFLG9CQUFvQixDQUFDO29CQUN6RCxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxvQkFBb0IsQ0FBQztpQkFDckQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBMTF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5vdm9DaGVja0xpc3RFbGVtZW50IH0gZnJvbSAnLi9jaGVjay1saXN0JztcbmltcG9ydCB7IE5vdm9DaGVja2JveEVsZW1lbnQgfSBmcm9tICcuL2NoZWNrYm94JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQTExeU1vZHVsZSwgRm9ybXNNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtOb3ZvQ2hlY2tib3hFbGVtZW50LCBOb3ZvQ2hlY2tMaXN0RWxlbWVudF0sXG4gIGV4cG9ydHM6IFtOb3ZvQ2hlY2tib3hFbGVtZW50LCBOb3ZvQ2hlY2tMaXN0RWxlbWVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9DaGVja2JveE1vZHVsZSB7fVxuIl19