// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoButtonModule } from '../button';
// APP
import { NovoToastElement } from './Toast';
export class NovoToastModule {
}
NovoToastModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, NovoButtonModule],
                declarations: [NovoToastElement],
                exports: [NovoToastElement],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9hc3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL3RvYXN0L1RvYXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzdDLE1BQU07QUFDTixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFPM0MsTUFBTSxPQUFPLGVBQWU7OztZQUwzQixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDO2dCQUN6QyxZQUFZLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDaEMsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7YUFDNUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0J1dHRvbk1vZHVsZSB9IGZyb20gJy4uL2J1dHRvbic7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9Ub2FzdEVsZW1lbnQgfSBmcm9tICcuL1RvYXN0JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTm92b0J1dHRvbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW05vdm9Ub2FzdEVsZW1lbnRdLFxuICBleHBvcnRzOiBbTm92b1RvYXN0RWxlbWVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Ub2FzdE1vZHVsZSB7fVxuIl19