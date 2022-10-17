import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoOption } from './option.component';
import { NovoOptgroup } from './optgroup.component';
import { NovoPseudoCheckboxModule } from '../selection/index';
import * as i0 from "@angular/core";
export class NovoOptionModule {
}
NovoOptionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoOptionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoOptionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoOptionModule, declarations: [NovoOption, NovoOptgroup], imports: [CommonModule, NovoPseudoCheckboxModule], exports: [NovoOption, NovoOptgroup] });
NovoOptionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoOptionModule, imports: [[CommonModule, NovoPseudoCheckboxModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoOptionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoPseudoCheckboxModule],
                    exports: [NovoOption, NovoOptgroup],
                    declarations: [NovoOption, NovoOptgroup],
                }]
        }] });
export * from './optgroup.component';
export * from './option-parent';
export * from './option.component';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21tb24vb3B0aW9uL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0FBTzlELE1BQU0sT0FBTyxnQkFBZ0I7OzhHQUFoQixnQkFBZ0I7K0dBQWhCLGdCQUFnQixpQkFGWixVQUFVLEVBQUUsWUFBWSxhQUY3QixZQUFZLEVBQUUsd0JBQXdCLGFBQ3RDLFVBQVUsRUFBRSxZQUFZOytHQUd2QixnQkFBZ0IsWUFKbEIsQ0FBQyxZQUFZLEVBQUUsd0JBQXdCLENBQUM7NEZBSXRDLGdCQUFnQjtrQkFMNUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsd0JBQXdCLENBQUM7b0JBQ2pELE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUM7b0JBQ25DLFlBQVksRUFBRSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUM7aUJBQ3pDOztBQUdELGNBQWMsc0JBQXNCLENBQUM7QUFDckMsY0FBYyxpQkFBaUIsQ0FBQztBQUNoQyxjQUFjLG9CQUFvQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvT3B0aW9uIH0gZnJvbSAnLi9vcHRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9PcHRncm91cCB9IGZyb20gJy4vb3B0Z3JvdXAuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9Qc2V1ZG9DaGVja2JveE1vZHVsZSB9IGZyb20gJy4uL3NlbGVjdGlvbi9pbmRleCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE5vdm9Qc2V1ZG9DaGVja2JveE1vZHVsZV0sXG4gIGV4cG9ydHM6IFtOb3ZvT3B0aW9uLCBOb3ZvT3B0Z3JvdXBdLFxuICBkZWNsYXJhdGlvbnM6IFtOb3ZvT3B0aW9uLCBOb3ZvT3B0Z3JvdXBdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvT3B0aW9uTW9kdWxlIHt9XG5cbmV4cG9ydCAqIGZyb20gJy4vb3B0Z3JvdXAuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vb3B0aW9uLXBhcmVudCc7XG5leHBvcnQgKiBmcm9tICcuL29wdGlvbi5jb21wb25lbnQnO1xuIl19