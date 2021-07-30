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
                <i class="bhi-circle {{ entity.class }}"></i>{{ entity | render : metaDisplay }}
            </a>
            <span *ngIf="!entity.isLinkable && entity.personSubtype">
                <i class="bhi-circle {{ entity.class }}"></i>{{ entity | render : metaDisplay }}
            </span>
            <span *ngIf="!entity.isLinkable && !entity.personSubtype">
                {{ entity | render : metaDisplay }}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW50aXR5TGlzdC5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvdmFsdWUvRW50aXR5TGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBbUI5QyxNQUFNLE9BQU8sVUFBVTtJQXVDckI7UUFsQ0EsZUFBVSxHQUFXLEVBQUUsQ0FBQztRQUV4Qix1QkFBa0IsR0FBUTtZQUN4QixJQUFJLEVBQUUsTUFBTTtZQUNaLGFBQWEsRUFBRSxTQUFTO1lBQ3hCLGNBQWMsRUFBRSxTQUFTO1lBQ3pCLGNBQWMsRUFBRSxTQUFTO1lBQ3pCLGNBQWMsRUFBRSxTQUFTO1lBQ3pCLGNBQWMsRUFBRSxTQUFTO1lBQ3pCLGNBQWMsRUFBRSxTQUFTO1lBQ3pCLGlCQUFpQixFQUFFLFNBQVM7WUFDNUIsa0JBQWtCLEVBQUUsU0FBUztZQUM3QixrQkFBa0IsRUFBRSxTQUFTO1lBQzdCLGtCQUFrQixFQUFFLFNBQVM7WUFDN0Isa0JBQWtCLEVBQUUsU0FBUztZQUM3QixrQkFBa0IsRUFBRSxTQUFTO1lBQzdCLFdBQVcsRUFBRSxhQUFhO1lBQzFCLElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLE1BQU07WUFDWixhQUFhLEVBQUUsTUFBTTtZQUNyQixTQUFTLEVBQUUsV0FBVztZQUN0QixRQUFRLEVBQUUsS0FBSztZQUNmLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFNBQVMsRUFBRSxXQUFXO1lBQ3RCLGFBQWEsRUFBRSxZQUFZO1lBQzNCLGtCQUFrQixFQUFFLFlBQVk7WUFDaEMsZ0JBQWdCLEVBQUUsa0JBQWtCO1lBQ3BDLFdBQVcsRUFBRSxhQUFhO1NBQzNCLENBQUM7SUFFYyxDQUFDO0lBRWpCLFFBQVE7UUFDTiw0RUFBNEU7UUFDNUUsb0NBQW9DO1FBQ3BDLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7UUFDcEQsS0FBSyxNQUFNLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNuQyxNQUFNLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQztJQUVELFFBQVEsQ0FBQyxNQUFXO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsUUFBUSxDQUFDLE1BQVc7UUFDbEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsVUFBVSxDQUFDLE1BQVc7UUFDcEIsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7OztZQWhGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7O0tBWVA7YUFDSjs7OzttQkFFRSxLQUFLO21CQUVMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcclxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vdXRpbHMvSGVscGVycyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25vdm8tZW50aXR5LWxpc3QnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgZW50aXR5IG9mIGRhdGEuZGF0YVwiIGNsYXNzPVwiZW50aXR5XCI+XHJcbiAgICAgICAgICAgIDxhICpuZ0lmPVwiZW50aXR5LmlzTGlua2FibGVcIiAoY2xpY2spPVwib3BlbkxpbmsoZW50aXR5KVwiPlxyXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJiaGktY2lyY2xlIHt7IGVudGl0eS5jbGFzcyB9fVwiPjwvaT57eyBlbnRpdHkgfCByZW5kZXIgOiBtZXRhRGlzcGxheSB9fVxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIWVudGl0eS5pc0xpbmthYmxlICYmIGVudGl0eS5wZXJzb25TdWJ0eXBlXCI+XHJcbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImJoaS1jaXJjbGUge3sgZW50aXR5LmNsYXNzIH19XCI+PC9pPnt7IGVudGl0eSB8IHJlbmRlciA6IG1ldGFEaXNwbGF5IH19XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhZW50aXR5LmlzTGlua2FibGUgJiYgIWVudGl0eS5wZXJzb25TdWJ0eXBlXCI+XHJcbiAgICAgICAgICAgICAgICB7eyBlbnRpdHkgfCByZW5kZXIgOiBtZXRhRGlzcGxheSB9fVxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRW50aXR5TGlzdCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KClcclxuICBkYXRhOiBhbnk7XHJcbiAgQElucHV0KClcclxuICBtZXRhOiBhbnk7XHJcbiAgYmFzZUVudGl0eTogc3RyaW5nID0gJyc7XHJcbiAgbWV0YURpc3BsYXk6IGFueTtcclxuICBFTlRJVFlfU0hPUlRfTkFNRVM6IGFueSA9IHtcclxuICAgIExlYWQ6ICdsZWFkJyxcclxuICAgIENsaWVudENvbnRhY3Q6ICdjb250YWN0JyxcclxuICAgIENsaWVudENvbnRhY3QxOiAnY29udGFjdCcsXHJcbiAgICBDbGllbnRDb250YWN0MjogJ2NvbnRhY3QnLFxyXG4gICAgQ2xpZW50Q29udGFjdDM6ICdjb250YWN0JyxcclxuICAgIENsaWVudENvbnRhY3Q0OiAnY29udGFjdCcsXHJcbiAgICBDbGllbnRDb250YWN0NTogJ2NvbnRhY3QnLFxyXG4gICAgQ2xpZW50Q29ycG9yYXRpb246ICdjb21wYW55JyxcclxuICAgIENsaWVudENvcnBvcmF0aW9uMTogJ2NvbXBhbnknLFxyXG4gICAgQ2xpZW50Q29ycG9yYXRpb24yOiAnY29tcGFueScsXHJcbiAgICBDbGllbnRDb3Jwb3JhdGlvbjM6ICdjb21wYW55JyxcclxuICAgIENsaWVudENvcnBvcmF0aW9uNDogJ2NvbXBhbnknLFxyXG4gICAgQ2xpZW50Q29ycG9yYXRpb241OiAnY29tcGFueScsXHJcbiAgICBPcHBvcnR1bml0eTogJ29wcG9ydHVuaXR5JyxcclxuICAgIFRhc2s6ICd0YXNrJyxcclxuICAgIE5vdGU6ICdub3RlJyxcclxuICAgIENvcnBvcmF0ZVVzZXI6ICd1c2VyJyxcclxuICAgIENhbmRpZGF0ZTogJ2NhbmRpZGF0ZScsXHJcbiAgICBKb2JPcmRlcjogJ2pvYicsXHJcbiAgICBKb2JPcmRlcjE6ICdqb2InLFxyXG4gICAgSm9iT3JkZXIyOiAnam9iJyxcclxuICAgIEpvYk9yZGVyMzogJ2pvYicsXHJcbiAgICBKb2JPcmRlcjQ6ICdqb2InLFxyXG4gICAgSm9iT3JkZXI1OiAnam9iJyxcclxuICAgIFBsYWNlbWVudDogJ3BsYWNlbWVudCcsXHJcbiAgICBKb2JTdWJtaXNzaW9uOiAnc3VibWlzc2lvbicsXHJcbiAgICBDYW5kaWRhdGVSZWZlcmVuY2U6ICdyZWZlcmVuY2VzJyxcclxuICAgIERpc3RyaWJ1dGlvbkxpc3Q6ICdkaXN0cmlidXRpb25MaXN0JyxcclxuICAgIEFwcG9pbnRtZW50OiAnYXBwb2ludG1lbnQnLFxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCk6IGFueSB7XHJcbiAgICAvLyB1c2UgYSBsb2NhbCBjb3B5IG9mIHRoZSBtZXRhIHRvIHNldCB0aGUgdHlwZSB0byBUT19PTkUgZm9yIHByb3BlciBkaXNwbGF5XHJcbiAgICAvLyB3aXRob3V0IGNoYW5naW5nIHRoZSBpbnB1dCBvYmplY3RcclxuICAgIHRoaXMubWV0YURpc3BsYXkgPSBIZWxwZXJzLmRlZXBDbG9uZSh0aGlzLm1ldGEpO1xyXG4gICAgdGhpcy5tZXRhRGlzcGxheS50eXBlID0gJ1RPX09ORSc7XHJcbiAgICB0aGlzLmJhc2VFbnRpdHkgPSB0aGlzLm1ldGEuYXNzb2NpYXRlZEVudGl0eS5lbnRpdHk7XHJcbiAgICBmb3IgKGNvbnN0IGVudGl0eSBvZiB0aGlzLmRhdGEuZGF0YSkge1xyXG4gICAgICBlbnRpdHkuaXNMaW5rYWJsZSA9IHRoaXMuaXNMaW5rYWJsZShlbnRpdHkpO1xyXG4gICAgICBlbnRpdHkuY2xhc3MgPSB0aGlzLmdldENsYXNzKGVudGl0eSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRDbGFzcyhlbnRpdHk6IGFueSk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5FTlRJVFlfU0hPUlRfTkFNRVNbZW50aXR5LnBlcnNvblN1YnR5cGVdO1xyXG4gIH1cclxuXHJcbiAgb3BlbkxpbmsoZW50aXR5OiBhbnkpOiB2b2lkIHtcclxuICAgIGVudGl0eS5vcGVuTGluayhlbnRpdHkpO1xyXG4gIH1cclxuXHJcbiAgaXNMaW5rYWJsZShlbnRpdHk6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGVudGl0eS5vcGVuTGluaztcclxuICB9XHJcbn1cclxuIl19