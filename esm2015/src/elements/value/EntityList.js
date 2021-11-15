// NG2
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Helpers } from '../../utils/Helpers';
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
EntityList.decorators = [
    { type: Component, args: [{
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
  `
            },] }
];
EntityList.ctorParameters = () => [];
EntityList.propDecorators = {
    data: [{ type: Input }],
    meta: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW50aXR5TGlzdC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy92YWx1ZS9FbnRpdHlMaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFtQjlDLE1BQU0sT0FBTyxVQUFVO0lBdUNyQjtRQWxDQSxlQUFVLEdBQVcsRUFBRSxDQUFDO1FBRXhCLHVCQUFrQixHQUFRO1lBQ3hCLElBQUksRUFBRSxNQUFNO1lBQ1osYUFBYSxFQUFFLFNBQVM7WUFDeEIsY0FBYyxFQUFFLFNBQVM7WUFDekIsY0FBYyxFQUFFLFNBQVM7WUFDekIsY0FBYyxFQUFFLFNBQVM7WUFDekIsY0FBYyxFQUFFLFNBQVM7WUFDekIsY0FBYyxFQUFFLFNBQVM7WUFDekIsaUJBQWlCLEVBQUUsU0FBUztZQUM1QixrQkFBa0IsRUFBRSxTQUFTO1lBQzdCLGtCQUFrQixFQUFFLFNBQVM7WUFDN0Isa0JBQWtCLEVBQUUsU0FBUztZQUM3QixrQkFBa0IsRUFBRSxTQUFTO1lBQzdCLGtCQUFrQixFQUFFLFNBQVM7WUFDN0IsV0FBVyxFQUFFLGFBQWE7WUFDMUIsSUFBSSxFQUFFLE1BQU07WUFDWixJQUFJLEVBQUUsTUFBTTtZQUNaLGFBQWEsRUFBRSxNQUFNO1lBQ3JCLFNBQVMsRUFBRSxXQUFXO1lBQ3RCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsU0FBUyxFQUFFLEtBQUs7WUFDaEIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsU0FBUyxFQUFFLFdBQVc7WUFDdEIsYUFBYSxFQUFFLFlBQVk7WUFDM0Isa0JBQWtCLEVBQUUsWUFBWTtZQUNoQyxnQkFBZ0IsRUFBRSxrQkFBa0I7WUFDcEMsV0FBVyxFQUFFLGFBQWE7U0FDM0IsQ0FBQztJQUVhLENBQUM7SUFFaEIsUUFBUTtRQUNOLDRFQUE0RTtRQUM1RSxvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7UUFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQztRQUNwRCxLQUFLLE1BQU0sTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ25DLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1QyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdEM7SUFDSCxDQUFDO0lBRUQsUUFBUSxDQUFDLE1BQVc7UUFDbEIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxRQUFRLENBQUMsTUFBVztRQUNsQixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxVQUFVLENBQUMsTUFBVztRQUNwQixPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQzs7O1lBaEZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7R0FZVDthQUNGOzs7O21CQUVFLEtBQUs7bUJBRUwsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWVudGl0eS1saXN0JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAqbmdGb3I9XCJsZXQgZW50aXR5IG9mIGRhdGEuZGF0YVwiIGNsYXNzPVwiZW50aXR5XCI+XG4gICAgICA8YSAqbmdJZj1cImVudGl0eS5pc0xpbmthYmxlXCIgKGNsaWNrKT1cIm9wZW5MaW5rKGVudGl0eSlcIj5cbiAgICAgICAgPGkgY2xhc3M9XCJiaGktY2lyY2xlIHt7IGVudGl0eS5jbGFzcyB9fVwiPjwvaT57eyBlbnRpdHkgfCByZW5kZXI6IG1ldGFEaXNwbGF5IH19XG4gICAgICA8L2E+XG4gICAgICA8c3BhbiAqbmdJZj1cIiFlbnRpdHkuaXNMaW5rYWJsZSAmJiBlbnRpdHkucGVyc29uU3VidHlwZVwiPlxuICAgICAgICA8aSBjbGFzcz1cImJoaS1jaXJjbGUge3sgZW50aXR5LmNsYXNzIH19XCI+PC9pPnt7IGVudGl0eSB8IHJlbmRlcjogbWV0YURpc3BsYXkgfX1cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuICpuZ0lmPVwiIWVudGl0eS5pc0xpbmthYmxlICYmICFlbnRpdHkucGVyc29uU3VidHlwZVwiPlxuICAgICAgICB7eyBlbnRpdHkgfCByZW5kZXI6IG1ldGFEaXNwbGF5IH19XG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIEVudGl0eUxpc3QgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKVxuICBkYXRhOiBhbnk7XG4gIEBJbnB1dCgpXG4gIG1ldGE6IGFueTtcbiAgYmFzZUVudGl0eTogc3RyaW5nID0gJyc7XG4gIG1ldGFEaXNwbGF5OiBhbnk7XG4gIEVOVElUWV9TSE9SVF9OQU1FUzogYW55ID0ge1xuICAgIExlYWQ6ICdsZWFkJyxcbiAgICBDbGllbnRDb250YWN0OiAnY29udGFjdCcsXG4gICAgQ2xpZW50Q29udGFjdDE6ICdjb250YWN0JyxcbiAgICBDbGllbnRDb250YWN0MjogJ2NvbnRhY3QnLFxuICAgIENsaWVudENvbnRhY3QzOiAnY29udGFjdCcsXG4gICAgQ2xpZW50Q29udGFjdDQ6ICdjb250YWN0JyxcbiAgICBDbGllbnRDb250YWN0NTogJ2NvbnRhY3QnLFxuICAgIENsaWVudENvcnBvcmF0aW9uOiAnY29tcGFueScsXG4gICAgQ2xpZW50Q29ycG9yYXRpb24xOiAnY29tcGFueScsXG4gICAgQ2xpZW50Q29ycG9yYXRpb24yOiAnY29tcGFueScsXG4gICAgQ2xpZW50Q29ycG9yYXRpb24zOiAnY29tcGFueScsXG4gICAgQ2xpZW50Q29ycG9yYXRpb240OiAnY29tcGFueScsXG4gICAgQ2xpZW50Q29ycG9yYXRpb241OiAnY29tcGFueScsXG4gICAgT3Bwb3J0dW5pdHk6ICdvcHBvcnR1bml0eScsXG4gICAgVGFzazogJ3Rhc2snLFxuICAgIE5vdGU6ICdub3RlJyxcbiAgICBDb3Jwb3JhdGVVc2VyOiAndXNlcicsXG4gICAgQ2FuZGlkYXRlOiAnY2FuZGlkYXRlJyxcbiAgICBKb2JPcmRlcjogJ2pvYicsXG4gICAgSm9iT3JkZXIxOiAnam9iJyxcbiAgICBKb2JPcmRlcjI6ICdqb2InLFxuICAgIEpvYk9yZGVyMzogJ2pvYicsXG4gICAgSm9iT3JkZXI0OiAnam9iJyxcbiAgICBKb2JPcmRlcjU6ICdqb2InLFxuICAgIFBsYWNlbWVudDogJ3BsYWNlbWVudCcsXG4gICAgSm9iU3VibWlzc2lvbjogJ3N1Ym1pc3Npb24nLFxuICAgIENhbmRpZGF0ZVJlZmVyZW5jZTogJ3JlZmVyZW5jZXMnLFxuICAgIERpc3RyaWJ1dGlvbkxpc3Q6ICdkaXN0cmlidXRpb25MaXN0JyxcbiAgICBBcHBvaW50bWVudDogJ2FwcG9pbnRtZW50JyxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKTogYW55IHtcbiAgICAvLyB1c2UgYSBsb2NhbCBjb3B5IG9mIHRoZSBtZXRhIHRvIHNldCB0aGUgdHlwZSB0byBUT19PTkUgZm9yIHByb3BlciBkaXNwbGF5XG4gICAgLy8gd2l0aG91dCBjaGFuZ2luZyB0aGUgaW5wdXQgb2JqZWN0XG4gICAgdGhpcy5tZXRhRGlzcGxheSA9IEhlbHBlcnMuZGVlcENsb25lKHRoaXMubWV0YSk7XG4gICAgdGhpcy5tZXRhRGlzcGxheS50eXBlID0gJ1RPX09ORSc7XG4gICAgdGhpcy5iYXNlRW50aXR5ID0gdGhpcy5tZXRhLmFzc29jaWF0ZWRFbnRpdHkuZW50aXR5O1xuICAgIGZvciAoY29uc3QgZW50aXR5IG9mIHRoaXMuZGF0YS5kYXRhKSB7XG4gICAgICBlbnRpdHkuaXNMaW5rYWJsZSA9IHRoaXMuaXNMaW5rYWJsZShlbnRpdHkpO1xuICAgICAgZW50aXR5LmNsYXNzID0gdGhpcy5nZXRDbGFzcyhlbnRpdHkpO1xuICAgIH1cbiAgfVxuXG4gIGdldENsYXNzKGVudGl0eTogYW55KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5FTlRJVFlfU0hPUlRfTkFNRVNbZW50aXR5LnBlcnNvblN1YnR5cGVdO1xuICB9XG5cbiAgb3BlbkxpbmsoZW50aXR5OiBhbnkpOiB2b2lkIHtcbiAgICBlbnRpdHkub3BlbkxpbmsoZW50aXR5KTtcbiAgfVxuXG4gIGlzTGlua2FibGUoZW50aXR5OiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZW50aXR5Lm9wZW5MaW5rO1xuICB9XG59XG4iXX0=