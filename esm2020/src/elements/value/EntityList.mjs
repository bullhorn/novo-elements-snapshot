// NG2
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Helpers } from '../../utils/Helpers';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./Render";
export class EntityList {
    constructor() {
        this.baseEntity = '';
        this.ENTITY_SHORT_NAMES = {
            Lead: 'lead',
            ClientContact: 'contact',
            ClientContact1: 'contact',
            ClientContact2: 'contact',
            ClientContact3: 'contact',
            ClientContact4: 'contact',
            ClientContact5: 'contact',
            ClientCorporation: 'company',
            ClientCorporation1: 'company',
            ClientCorporation2: 'company',
            ClientCorporation3: 'company',
            ClientCorporation4: 'company',
            ClientCorporation5: 'company',
            Opportunity: 'opportunity',
            Task: 'task',
            Note: 'note',
            CorporateUser: 'user',
            Candidate: 'candidate',
            JobOrder: 'job',
            JobOrder1: 'job',
            JobOrder2: 'job',
            JobOrder3: 'job',
            JobOrder4: 'job',
            JobOrder5: 'job',
            Placement: 'placement',
            JobSubmission: 'submission',
            CandidateReference: 'references',
            DistributionList: 'distributionList',
            Appointment: 'appointment',
        };
    }
    ngOnInit() {
        // use a local copy of the meta to set the type to TO_ONE for proper display
        // without changing the input object
        this.metaDisplay = Helpers.deepClone(this.meta);
        this.metaDisplay.type = 'TO_ONE';
        this.baseEntity = this.meta.associatedEntity.entity;
        for (const entity of this.data.data) {
            entity.isLinkable = this.isLinkable(entity);
            entity.class = this.getClass(entity);
        }
    }
    getClass(entity) {
        return this.ENTITY_SHORT_NAMES[entity.personSubtype];
    }
    openLink(entity) {
        entity.openLink(entity);
    }
    isLinkable(entity) {
        return entity.openLink;
    }
}
EntityList.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: EntityList, deps: [], target: i0.ɵɵFactoryTarget.Component });
EntityList.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: EntityList, selector: "novo-entity-list", inputs: { data: "data", meta: "meta" }, ngImport: i0, template: `
    <div *ngFor="let entity of data.data" class="entity">
      <a *ngIf="entity.isLinkable" (click)="openLink(entity)">
        <i class="bhi-circle {{ entity.class }}"></i>{{ entity | render: metaDisplay }}
      </a>
      <span *ngIf="!entity.isLinkable && entity.personSubtype">
        <i class="bhi-circle {{ entity.class }}"></i>{{ entity | render: metaDisplay }}
      </span>
      <span *ngIf="!entity.isLinkable && !entity.personSubtype">
        {{ entity | render: metaDisplay }}
      </span>
    </div>
  `, isInline: true, directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "render": i2.RenderPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: EntityList, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-entity-list',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <div *ngFor="let entity of data.data" class="entity">
      <a *ngIf="entity.isLinkable" (click)="openLink(entity)">
        <i class="bhi-circle {{ entity.class }}"></i>{{ entity | render: metaDisplay }}
      </a>
      <span *ngIf="!entity.isLinkable && entity.personSubtype">
        <i class="bhi-circle {{ entity.class }}"></i>{{ entity | render: metaDisplay }}
      </span>
      <span *ngIf="!entity.isLinkable && !entity.personSubtype">
        {{ entity | render: metaDisplay }}
      </span>
    </div>
  `,
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { data: [{
                type: Input
            }], meta: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW50aXR5TGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3ZhbHVlL0VudGl0eUxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7OztBQW1COUMsTUFBTSxPQUFPLFVBQVU7SUF1Q3JCO1FBbENBLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFFeEIsdUJBQWtCLEdBQVE7WUFDeEIsSUFBSSxFQUFFLE1BQU07WUFDWixhQUFhLEVBQUUsU0FBUztZQUN4QixjQUFjLEVBQUUsU0FBUztZQUN6QixjQUFjLEVBQUUsU0FBUztZQUN6QixjQUFjLEVBQUUsU0FBUztZQUN6QixjQUFjLEVBQUUsU0FBUztZQUN6QixjQUFjLEVBQUUsU0FBUztZQUN6QixpQkFBaUIsRUFBRSxTQUFTO1lBQzVCLGtCQUFrQixFQUFFLFNBQVM7WUFDN0Isa0JBQWtCLEVBQUUsU0FBUztZQUM3QixrQkFBa0IsRUFBRSxTQUFTO1lBQzdCLGtCQUFrQixFQUFFLFNBQVM7WUFDN0Isa0JBQWtCLEVBQUUsU0FBUztZQUM3QixXQUFXLEVBQUUsYUFBYTtZQUMxQixJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSxNQUFNO1lBQ1osYUFBYSxFQUFFLE1BQU07WUFDckIsU0FBUyxFQUFFLFdBQVc7WUFDdEIsUUFBUSxFQUFFLEtBQUs7WUFDZixTQUFTLEVBQUUsS0FBSztZQUNoQixTQUFTLEVBQUUsS0FBSztZQUNoQixTQUFTLEVBQUUsS0FBSztZQUNoQixTQUFTLEVBQUUsS0FBSztZQUNoQixTQUFTLEVBQUUsS0FBSztZQUNoQixTQUFTLEVBQUUsV0FBVztZQUN0QixhQUFhLEVBQUUsWUFBWTtZQUMzQixrQkFBa0IsRUFBRSxZQUFZO1lBQ2hDLGdCQUFnQixFQUFFLGtCQUFrQjtZQUNwQyxXQUFXLEVBQUUsYUFBYTtTQUMzQixDQUFDO0lBRWEsQ0FBQztJQUVoQixRQUFRO1FBQ04sNEVBQTRFO1FBQzVFLG9DQUFvQztRQUNwQyxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO1FBQ3BELEtBQUssTUFBTSxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDbkMsTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN0QztJQUNILENBQUM7SUFFRCxRQUFRLENBQUMsTUFBVztRQUNsQixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELFFBQVEsQ0FBQyxNQUFXO1FBQ2xCLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELFVBQVUsQ0FBQyxNQUFXO1FBQ3BCLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDOzt1R0EvRFUsVUFBVTsyRkFBVixVQUFVLGdHQWRYOzs7Ozs7Ozs7Ozs7R0FZVDsyRkFFVSxVQUFVO2tCQWpCdEIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7R0FZVDtpQkFDRjswRUFHQyxJQUFJO3NCQURILEtBQUs7Z0JBR04sSUFBSTtzQkFESCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vdXRpbHMvSGVscGVycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tZW50aXR5LWxpc3QnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICpuZ0Zvcj1cImxldCBlbnRpdHkgb2YgZGF0YS5kYXRhXCIgY2xhc3M9XCJlbnRpdHlcIj5cbiAgICAgIDxhICpuZ0lmPVwiZW50aXR5LmlzTGlua2FibGVcIiAoY2xpY2spPVwib3BlbkxpbmsoZW50aXR5KVwiPlxuICAgICAgICA8aSBjbGFzcz1cImJoaS1jaXJjbGUge3sgZW50aXR5LmNsYXNzIH19XCI+PC9pPnt7IGVudGl0eSB8IHJlbmRlcjogbWV0YURpc3BsYXkgfX1cbiAgICAgIDwvYT5cbiAgICAgIDxzcGFuICpuZ0lmPVwiIWVudGl0eS5pc0xpbmthYmxlICYmIGVudGl0eS5wZXJzb25TdWJ0eXBlXCI+XG4gICAgICAgIDxpIGNsYXNzPVwiYmhpLWNpcmNsZSB7eyBlbnRpdHkuY2xhc3MgfX1cIj48L2k+e3sgZW50aXR5IHwgcmVuZGVyOiBtZXRhRGlzcGxheSB9fVxuICAgICAgPC9zcGFuPlxuICAgICAgPHNwYW4gKm5nSWY9XCIhZW50aXR5LmlzTGlua2FibGUgJiYgIWVudGl0eS5wZXJzb25TdWJ0eXBlXCI+XG4gICAgICAgIHt7IGVudGl0eSB8IHJlbmRlcjogbWV0YURpc3BsYXkgfX1cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgRW50aXR5TGlzdCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIGRhdGE6IGFueTtcbiAgQElucHV0KClcbiAgbWV0YTogYW55O1xuICBiYXNlRW50aXR5OiBzdHJpbmcgPSAnJztcbiAgbWV0YURpc3BsYXk6IGFueTtcbiAgRU5USVRZX1NIT1JUX05BTUVTOiBhbnkgPSB7XG4gICAgTGVhZDogJ2xlYWQnLFxuICAgIENsaWVudENvbnRhY3Q6ICdjb250YWN0JyxcbiAgICBDbGllbnRDb250YWN0MTogJ2NvbnRhY3QnLFxuICAgIENsaWVudENvbnRhY3QyOiAnY29udGFjdCcsXG4gICAgQ2xpZW50Q29udGFjdDM6ICdjb250YWN0JyxcbiAgICBDbGllbnRDb250YWN0NDogJ2NvbnRhY3QnLFxuICAgIENsaWVudENvbnRhY3Q1OiAnY29udGFjdCcsXG4gICAgQ2xpZW50Q29ycG9yYXRpb246ICdjb21wYW55JyxcbiAgICBDbGllbnRDb3Jwb3JhdGlvbjE6ICdjb21wYW55JyxcbiAgICBDbGllbnRDb3Jwb3JhdGlvbjI6ICdjb21wYW55JyxcbiAgICBDbGllbnRDb3Jwb3JhdGlvbjM6ICdjb21wYW55JyxcbiAgICBDbGllbnRDb3Jwb3JhdGlvbjQ6ICdjb21wYW55JyxcbiAgICBDbGllbnRDb3Jwb3JhdGlvbjU6ICdjb21wYW55JyxcbiAgICBPcHBvcnR1bml0eTogJ29wcG9ydHVuaXR5JyxcbiAgICBUYXNrOiAndGFzaycsXG4gICAgTm90ZTogJ25vdGUnLFxuICAgIENvcnBvcmF0ZVVzZXI6ICd1c2VyJyxcbiAgICBDYW5kaWRhdGU6ICdjYW5kaWRhdGUnLFxuICAgIEpvYk9yZGVyOiAnam9iJyxcbiAgICBKb2JPcmRlcjE6ICdqb2InLFxuICAgIEpvYk9yZGVyMjogJ2pvYicsXG4gICAgSm9iT3JkZXIzOiAnam9iJyxcbiAgICBKb2JPcmRlcjQ6ICdqb2InLFxuICAgIEpvYk9yZGVyNTogJ2pvYicsXG4gICAgUGxhY2VtZW50OiAncGxhY2VtZW50JyxcbiAgICBKb2JTdWJtaXNzaW9uOiAnc3VibWlzc2lvbicsXG4gICAgQ2FuZGlkYXRlUmVmZXJlbmNlOiAncmVmZXJlbmNlcycsXG4gICAgRGlzdHJpYnV0aW9uTGlzdDogJ2Rpc3RyaWJ1dGlvbkxpc3QnLFxuICAgIEFwcG9pbnRtZW50OiAnYXBwb2ludG1lbnQnLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpOiBhbnkge1xuICAgIC8vIHVzZSBhIGxvY2FsIGNvcHkgb2YgdGhlIG1ldGEgdG8gc2V0IHRoZSB0eXBlIHRvIFRPX09ORSBmb3IgcHJvcGVyIGRpc3BsYXlcbiAgICAvLyB3aXRob3V0IGNoYW5naW5nIHRoZSBpbnB1dCBvYmplY3RcbiAgICB0aGlzLm1ldGFEaXNwbGF5ID0gSGVscGVycy5kZWVwQ2xvbmUodGhpcy5tZXRhKTtcbiAgICB0aGlzLm1ldGFEaXNwbGF5LnR5cGUgPSAnVE9fT05FJztcbiAgICB0aGlzLmJhc2VFbnRpdHkgPSB0aGlzLm1ldGEuYXNzb2NpYXRlZEVudGl0eS5lbnRpdHk7XG4gICAgZm9yIChjb25zdCBlbnRpdHkgb2YgdGhpcy5kYXRhLmRhdGEpIHtcbiAgICAgIGVudGl0eS5pc0xpbmthYmxlID0gdGhpcy5pc0xpbmthYmxlKGVudGl0eSk7XG4gICAgICBlbnRpdHkuY2xhc3MgPSB0aGlzLmdldENsYXNzKGVudGl0eSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q2xhc3MoZW50aXR5OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLkVOVElUWV9TSE9SVF9OQU1FU1tlbnRpdHkucGVyc29uU3VidHlwZV07XG4gIH1cblxuICBvcGVuTGluayhlbnRpdHk6IGFueSk6IHZvaWQge1xuICAgIGVudGl0eS5vcGVuTGluayhlbnRpdHkpO1xuICB9XG5cbiAgaXNMaW5rYWJsZShlbnRpdHk6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBlbnRpdHkub3Blbkxpbms7XG4gIH1cbn1cbiJdfQ==