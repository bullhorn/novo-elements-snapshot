// NG2
import { Component, ElementRef, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
// Vendor
// APP
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import { NovoLabelService } from '../../../../services/novo-label-service';
export class EntityPickerResult {
    constructor(labels) {
        this.labels = labels;
    }
    /**
     * @description This function captures the whole query string and replace it with the string that will be used to
     * match.
     */
    escapeRegexp(queryToEscape) {
        // Ex: if the capture is "a" the result will be \a
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }
    /**
     * @description This function should return a <strong>-tag wrapped HTML string.
     */
    highlight(match, query) {
        // Replaces the capture string with a the same string inside of a "strong" tag
        return query && match ? match.replace(new RegExp(this.escapeRegexp(query.trim()), 'gi'), '<strong>$&</strong>') : match;
    }
    getIconForResult(result) {
        if (result) {
            switch (result.searchEntity) {
                case 'ClientContact':
                    return 'person contact';
                case 'ClientCorporation':
                    return 'company';
                case 'Opportunity':
                    return 'opportunity';
                case 'Candidate':
                    return 'candidate';
                case 'Lead':
                    return 'lead';
                case 'JobOrder':
                    return 'job';
                case 'Placement':
                    return 'star placement';
                case 'CorporateUser':
                    return 'user';
                case 'CorporationDepartment':
                    return 'department';
                case 'JobShift':
                    return 'timetable contract';
                default:
                    return '';
            }
        }
        return '';
    }
    renderTimestamp(date) {
        let timestamp = '';
        if (date) {
            timestamp = this.labels.formatDateWithFormat(date, { year: 'numeric', month: 'numeric', day: 'numeric' });
        }
        return timestamp;
    }
    renderTimeNoOffset(dateStr) {
        let timestamp = '';
        if (dateStr) {
            dateStr = dateStr.slice(0, 19);
            timestamp = this.labels.formatTime(dateStr);
        }
        return timestamp;
    }
    getNameForResult(result) {
        if (result) {
            switch (result.searchEntity) {
                case 'Lead':
                case 'CorporateUser':
                case 'ClientContact':
                case 'Candidate':
                case 'Person':
                    if ('firstName' in result) {
                        return `${result.firstName} ${result.lastName}`.trim();
                    }
                    return `${result.name || ''}`.trim();
                case 'ClientCorporation':
                    return `${result.name || ''}`.trim();
                case 'Opportunity':
                case 'JobOrder':
                    return `${result.id} | ${result.title || ''}`.trim();
                case 'Placement':
                    let label = `${result.id}`;
                    if (result.candidate || result.jobOrder) {
                        if (result.candidate && result.jobOrder) {
                            label = `${label} | ${result.candidate.firstName} ${result.candidate.lastName} - ${result.jobOrder.title}`.trim();
                        }
                        else if (result.jobOrder) {
                            label = `${label} | ${result.jobOrder.title}`.trim();
                        }
                        else {
                            label = `${label} | ${result.candidate.firstName} ${result.candidate.lastName}`.trim();
                        }
                    }
                    return label;
                default:
                    return `${result.name || ''}`.trim();
            }
        }
        return '';
    }
}
EntityPickerResult.decorators = [
    { type: Component, args: [{
                selector: 'entity-picker-result',
                template: `
    <novo-list-item *ngIf="match.data">
      <item-header>
        <item-avatar [icon]="getIconForResult(match.data)"></item-avatar>
        <item-title> <span [innerHtml]="highlight(getNameForResult(match.data), term)"></span> </item-title>
      </item-header>
      <item-content direction="horizontal">
        <!-- COMPANY 1 -->
        <p class="company" *ngIf="match.data.companyName || match.data?.clientCorporation?.name">
          <i class="bhi-company"></i>
          <span [innerHtml]="highlight(match.data.companyName || match.data?.clientCorporation?.name, term)"></span>
        </p>
        <!-- CLIENT CONTACT -->
        <p class="contact" *ngIf="match.data?.clientContact?.firstName">
          <i class="bhi-person contact person"></i>
          <span [innerHtml]="highlight(match.data.clientContact.firstName + ' ' + match.data.clientContact.lastName, term)"></span>
        </p>
        <!-- CANDIDATE -->
        <p class="candidate" *ngIf="match.data.candidate && match.data.searchEntity === 'Placement'">
          <i class="bhi-candidate"></i>
          <span [innerHtml]="highlight(match.data.candidate.firstName + ' ' + match.data.candidate.lastName, term)"></span>
        </p>
        <!-- START & END DATE -->
        <p class="start-date" *ngIf="match.data.dateBegin && match.data.searchEntity === 'Placement'">
          <i class="bhi-calendar"></i>
          <span [innerHtml]="renderTimestamp(match.data.dateBegin) + ' - ' + renderTimestamp(match.data.dateEnd)"></span>
        </p>
        <!-- START Date -->
        <p class="start-date" *ngIf="match.data.startTime && match.data.searchEntity === 'JobShift'">
            <i class="bhi-calendar"></i>
            <span [innerHtml]="renderTimestamp(match.data.startTime)"></span>
        </p>
        <!-- START & END TIME -->
        <p class="start-time" *ngIf="match.data.startTime && match.data.searchEntity === 'JobShift'">
            <i class="bhi-clock"></i>
            <span [innerHtml]="renderTimeNoOffset(match.data.startTime) + ' - ' + renderTimeNoOffset(match.data.endTime)"></span>
        </p>
        <!-- JOBORDER -->
        <p class="job" *ngIf="match.data.jobOrder && match.data.searchEntity === 'JobShift'">
            <i class="bhi-job"></i>
            <span [innerHtml]="highlight(match.data.jobOrder.title, term)"></span>
        </p>
        <!-- OPENINGS -->
        <p class="openings" *ngIf="match.data.openings && match.data.searchEntity === 'JobShift'">
            <i class="bhi-candidate"></i>
            <span>{{ match.data.numAssigned }} / {{ match.data.openings }}</span>
        </p>
        <!-- EMAIL -->
        <p class="email" *ngIf="match.data.email">
          <i class="bhi-email"></i> <span [innerHtml]="highlight(match.data.email, term)"></span>
        </p>
        <!-- PHONE -->
        <p class="phone" *ngIf="match.data.phone">
          <i class="bhi-phone"></i> <span [innerHtml]="highlight(match.data.phone, term)"></span>
        </p>
        <!-- ADDRESS -->
        <p class="location" *ngIf="match.data.address && (match.data.address.city || match.data.address.state)">
          <i class="bhi-location"></i> <span *ngIf="match.data.address.city" [innerHtml]="highlight(match.data.address.city, term)"></span>
          <span *ngIf="match.data.address.city && match.data.address.state">, </span>
          <span *ngIf="match.data.address.state" [innerHtml]="highlight(match.data.address.state, term)"></span>
        </p>
        <!-- STATUS -->
        <p class="status" *ngIf="match.data.status">
          <i class="bhi-info"></i> <span [innerHtml]="highlight(match.data.status, term)"></span>
        </p>
        <!-- OWNER -->
        <p class="owner" *ngIf="match.data.owner && match.data.owner.name && match.data.searchEntity === 'Candidate'">
          <i class="bhi-person"></i> <span [innerHtml]="highlight(match.data.owner.name, term)"></span>
        </p>
        <!-- PRIMARY DEPARTMENT -->
        <p
          class="primary-department"
          *ngIf="match.data.primaryDepartment && match.data.primaryDepartment.name && match.data.searchEntity === 'CorporateUser'"
        >
          <i class="bhi-department"></i> <span [innerHtml]="highlight(match.data.primaryDepartment.name, term)"></span>
        </p>
        <!-- OCCUPATION -->
        <p class="occupation" *ngIf="match.data.occupation && match.data.searchEntity === 'CorporateUser'">
          <i class="bhi-occupation"></i> <span [innerHtml]="highlight(match.data.occupation, term)"></span>
        </p>
      </item-content>
    </novo-list-item>
  `
            },] }
];
EntityPickerResult.ctorParameters = () => [
    { type: NovoLabelService }
];
EntityPickerResult.propDecorators = {
    match: [{ type: Input }],
    term: [{ type: Input }]
};
export class EntityPickerResults extends BasePickerResults {
    constructor(element, labels, ref) {
        super(element, ref);
        this.labels = labels;
        this.select = new EventEmitter();
    }
    get hasNonErrorMessage() {
        return !this.isLoading && !this.matches.length && !this.hasError;
    }
    getListElement() {
        return this.element.nativeElement.querySelector('novo-list');
    }
    selectMatch(event, item) {
        this.select.next(item);
        return super.selectMatch(event, item);
    }
}
EntityPickerResults.decorators = [
    { type: Component, args: [{
                selector: 'entity-picker-results',
                template: `
    <novo-list *ngIf="matches.length > 0" direction="vertical">
      <entity-picker-result
        *ngFor="let match of matches"
        [match]="match"
        [term]="term"
        (click)="selectMatch($event, match)"
        [ngClass]="{ active: isActive(match) }"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
      >
      </entity-picker-result>
      <novo-loading theme="line" *ngIf="isLoading && matches.length > 0"></novo-loading>
    </novo-list>
    <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
    <p class="picker-null-results" *ngIf="hasNonErrorMessage && term !== ''">{{ labels.pickerEmpty }}</p>
    <p class="picker-null-results" *ngIf="hasNonErrorMessage && term === ''">{{ labels.pickerTextFieldEmpty }}</p>
  `
            },] }
];
EntityPickerResults.ctorParameters = () => [
    { type: ElementRef },
    { type: NovoLabelService },
    { type: ChangeDetectorRef }
];
EntityPickerResults.propDecorators = {
    select: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW50aXR5UGlja2VyUmVzdWx0cy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9waWNrZXIvZXh0cmFzL2VudGl0eS1waWNrZXItcmVzdWx0cy9FbnRpdHlQaWNrZXJSZXN1bHRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RyxTQUFTO0FBQ1QsTUFBTTtBQUNOLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBd0YzRSxNQUFNLE9BQU8sa0JBQWtCO0lBTTdCLFlBQW1CLE1BQXdCO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO0lBQUcsQ0FBQztJQUUvQzs7O09BR0c7SUFDSCxZQUFZLENBQUMsYUFBYTtRQUN4QixrREFBa0Q7UUFDbEQsT0FBTyxhQUFhLENBQUMsT0FBTyxDQUFDLHdCQUF3QixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRDs7T0FFRztJQUNILFNBQVMsQ0FBQyxLQUFLLEVBQUUsS0FBSztRQUNwQiw4RUFBOEU7UUFDOUUsT0FBTyxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQzFILENBQUM7SUFFRCxnQkFBZ0Is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LElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDbkUsQ0FBQztJQUVELGNBQWM7UUFDWixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQVcsRUFBRSxJQUFVO1FBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7O1lBdkNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJUO2FBQ0Y7OztZQTdObUIsVUFBVTtZQUlyQixnQkFBZ0I7WUFKb0MsaUJBQWlCOzs7cUJBK04zRSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIFZlbmRvclxuLy8gQVBQXG5pbXBvcnQgeyBCYXNlUGlja2VyUmVzdWx0cyB9IGZyb20gJy4uL2Jhc2UtcGlja2VyLXJlc3VsdHMvQmFzZVBpY2tlclJlc3VsdHMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2VudGl0eS1waWNrZXItcmVzdWx0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bm92by1saXN0LWl0ZW0gKm5nSWY9XCJtYXRjaC5kYXRhXCI+XG4gICAgICA8aXRlbS1oZWFkZXI+XG4gICAgICAgIDxpdGVtLWF2YXRhciBbaWNvbl09XCJnZXRJY29uRm9yUmVzdWx0KG1hdGNoLmRhdGEpXCI+PC9pdGVtLWF2YXRhcj5cbiAgICAgICAgPGl0ZW0tdGl0bGU+IDxzcGFuIFtpbm5lckh0bWxdPVwiaGlnaGxpZ2h0KGdldE5hbWVGb3JSZXN1bHQobWF0Y2guZGF0YSksIHRlcm0pXCI+PC9zcGFuPiA8L2l0ZW0tdGl0bGU+XG4gICAgICA8L2l0ZW0taGVhZGVyPlxuICAgICAgPGl0ZW0tY29udGVudCBkaXJlY3Rpb249XCJob3Jpem9udGFsXCI+XG4gICAgICAgIDwhLS0gQ09NUEFOWSAxIC0tPlxuICAgICAgICA8cCBjbGFzcz1cImNvbXBhbnlcIiAqbmdJZj1cIm1hdGNoLmRhdGEuY29tcGFueU5hbWUgfHwgbWF0Y2guZGF0YT8uY2xpZW50Q29ycG9yYXRpb24/Lm5hbWVcIj5cbiAgICAgICAgICA8aSBjbGFzcz1cImJoaS1jb21wYW55XCI+PC9pPlxuICAgICAgICAgIDxzcGFuIFtpbm5lckh0bWxdPVwiaGlnaGxpZ2h0KG1hdGNoLmRhdGEuY29tcGFueU5hbWUgfHwgbWF0Y2guZGF0YT8uY2xpZW50Q29ycG9yYXRpb24/Lm5hbWUsIHRlcm0pXCI+PC9zcGFuPlxuICAgICAgICA8L3A+XG4gICAgICAgIDwhLS0gQ0xJRU5UIENPTlRBQ1QgLS0+XG4gICAgICAgIDxwIGNsYXNzPVwiY29udGFjdFwiICpuZ0lmPVwibWF0Y2guZGF0YT8uY2xpZW50Q29udGFjdD8uZmlyc3ROYW1lXCI+XG4gICAgICAgICAgPGkgY2xhc3M9XCJiaGktcGVyc29uIGNvbnRhY3QgcGVyc29uXCI+PC9pPlxuICAgICAgICAgIDxzcGFuIFtpbm5lckh0bWxdPVwiaGlnaGxpZ2h0KG1hdGNoLmRhdGEuY2xpZW50Q29udGFjdC5maXJzdE5hbWUgKyAnICcgKyBtYXRjaC5kYXRhLmNsaWVudENvbnRhY3QubGFzdE5hbWUsIHRlcm0pXCI+PC9zcGFuPlxuICAgICAgICA8L3A+XG4gICAgICAgIDwhLS0gQ0FORElEQVRFIC0tPlxuICAgICAgICA8cCBjbGFzcz1cImNhbmRpZGF0ZVwiICpuZ0lmPVwibWF0Y2guZGF0YS5jYW5kaWRhdGUgJiYgbWF0Y2guZGF0YS5zZWFyY2hFbnRpdHkgPT09ICdQbGFjZW1lbnQnXCI+XG4gICAgICAgICAgPGkgY2xhc3M9XCJiaGktY2FuZGlkYXRlXCI+PC9pPlxuICAgICAgICAgIDxzcGFuIFtpbm5lckh0bWxdPVwiaGlnaGxpZ2h0KG1hdGNoLmRhdGEuY2FuZGlkYXRlLmZpcnN0TmFtZSArICcgJyArIG1hdGNoLmRhdGEuY2FuZGlkYXRlLmxhc3ROYW1lLCB0ZXJtKVwiPjwvc3Bhbj5cbiAgICAgICAgPC9wPlxuICAgICAgICA8IS0tIFNUQVJUICYgRU5EIERBVEUgLS0+XG4gICAgICAgIDxwIGNsYXNzPVwic3RhcnQtZGF0ZVwiICpuZ0lmPVwibWF0Y2guZGF0YS5kYXRlQmVnaW4gJiYgbWF0Y2guZGF0YS5zZWFyY2hFbnRpdHkgPT09ICdQbGFjZW1lbnQnXCI+XG4gICAgICAgICAgPGkgY2xhc3M9XCJiaGktY2FsZW5kYXJcIj48L2k+XG4gICAgICAgICAgPHNwYW4gW2lubmVySHRtbF09XCJyZW5kZXJUaW1lc3RhbXAobWF0Y2guZGF0YS5kYXRlQmVnaW4pICsgJyAtICcgKyByZW5kZXJUaW1lc3RhbXAobWF0Y2guZGF0YS5kYXRlRW5kKVwiPjwvc3Bhbj5cbiAgICAgICAgPC9wPlxuICAgICAgICA8IS0tIFNUQVJUIERhdGUgLS0+XG4gICAgICAgIDxwIGNsYXNzPVwic3RhcnQtZGF0ZVwiICpuZ0lmPVwibWF0Y2guZGF0YS5zdGFydFRpbWUgJiYgbWF0Y2guZGF0YS5zZWFyY2hFbnRpdHkgPT09ICdKb2JTaGlmdCdcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLWNhbGVuZGFyXCI+PC9pPlxuICAgICAgICAgICAgPHNwYW4gW2lubmVySHRtbF09XCJyZW5kZXJUaW1lc3RhbXAobWF0Y2guZGF0YS5zdGFydFRpbWUpXCI+PC9zcGFuPlxuICAgICAgICA8L3A+XG4gICAgICAgIDwhLS0gU1RBUlQgJiBFTkQgVElNRSAtLT5cbiAgICAgICAgPHAgY2xhc3M9XCJzdGFydC10aW1lXCIgKm5nSWY9XCJtYXRjaC5kYXRhLnN0YXJ0VGltZSAmJiBtYXRjaC5kYXRhLnNlYXJjaEVudGl0eSA9PT0gJ0pvYlNoaWZ0J1wiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJiaGktY2xvY2tcIj48L2k+XG4gICAgICAgICAgICA8c3BhbiBbaW5uZXJIdG1sXT1cInJlbmRlclRpbWVOb09mZnNldChtYXRjaC5kYXRhLnN0YXJ0VGltZSkgKyAnIC0gJyArIHJlbmRlclRpbWVOb09mZnNldChtYXRjaC5kYXRhLmVuZFRpbWUpXCI+PC9zcGFuPlxuICAgICAgICA8L3A+XG4gICAgICAgIDwhLS0gSk9CT1JERVIgLS0+XG4gICAgICAgIDxwIGNsYXNzPVwiam9iXCIgKm5nSWY9XCJtYXRjaC5kYXRhLmpvYk9yZGVyICYmIG1hdGNoLmRhdGEuc2VhcmNoRW50aXR5ID09PSAnSm9iU2hpZnQnXCI+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImJoaS1qb2JcIj48L2k+XG4gICAgICAgICAgICA8c3BhbiBbaW5uZXJIdG1sXT1cImhpZ2hsaWdodChtYXRjaC5kYXRhLmpvYk9yZGVyLnRpdGxlLCB0ZXJtKVwiPjwvc3Bhbj5cbiAgICAgICAgPC9wPlxuICAgICAgICA8IS0tIE9QRU5JTkdTIC0tPlxuICAgICAgICA8cCBjbGFzcz1cIm9wZW5pbmdzXCIgKm5nSWY9XCJtYXRjaC5kYXRhLm9wZW5pbmdzICYmIG1hdGNoLmRhdGEuc2VhcmNoRW50aXR5ID09PSAnSm9iU2hpZnQnXCI+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImJoaS1jYW5kaWRhdGVcIj48L2k+XG4gICAgICAgICAgICA8c3Bhbj57eyBtYXRjaC5kYXRhLm51bUFzc2lnbmVkIH19IC8ge3sgbWF0Y2guZGF0YS5vcGVuaW5ncyB9fTwvc3Bhbj5cbiAgICAgICAgPC9wPlxuICAgICAgICA8IS0tIEVNQUlMIC0tPlxuICAgICAgICA8cCBjbGFzcz1cImVtYWlsXCIgKm5nSWY9XCJtYXRjaC5kYXRhLmVtYWlsXCI+XG4gICAgICAgICAgPGkgY2xhc3M9XCJiaGktZW1haWxcIj48L2k+IDxzcGFuIFtpbm5lckh0bWxdPVwiaGlnaGxpZ2h0KG1hdGNoLmRhdGEuZW1haWwsIHRlcm0pXCI+PC9zcGFuPlxuICAgICAgICA8L3A+XG4gICAgICAgIDwhLS0gUEhPTkUgLS0+XG4gICAgICAgIDxwIGNsYXNzPVwicGhvbmVcIiAqbmdJZj1cIm1hdGNoLmRhdGEucGhvbmVcIj5cbiAgICAgICAgICA8aSBjbGFzcz1cImJoaS1waG9uZVwiPjwvaT4gPHNwYW4gW2lubmVySHRtbF09XCJoaWdobGlnaHQobWF0Y2guZGF0YS5waG9uZSwgdGVybSlcIj48L3NwYW4+XG4gICAgICAgIDwvcD5cbiAgICAgICAgPCEtLSBBRERSRVNTIC0tPlxuICAgICAgICA8cCBjbGFzcz1cImxvY2F0aW9uXCIgKm5nSWY9XCJtYXRjaC5kYXRhLmFkZHJlc3MgJiYgKG1hdGNoLmRhdGEuYWRkcmVzcy5jaXR5IHx8IG1hdGNoLmRhdGEuYWRkcmVzcy5zdGF0ZSlcIj5cbiAgICAgICAgICA8aSBjbGFzcz1cImJoaS1sb2NhdGlvblwiPjwvaT4gPHNwYW4gKm5nSWY9XCJtYXRjaC5kYXRhLmFkZHJlc3MuY2l0eVwiIFtpbm5lckh0bWxdPVwiaGlnaGxpZ2h0KG1hdGNoLmRhdGEuYWRkcmVzcy5jaXR5LCB0ZXJtKVwiPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiAqbmdJZj1cIm1hdGNoLmRhdGEuYWRkcmVzcy5jaXR5ICYmIG1hdGNoLmRhdGEuYWRkcmVzcy5zdGF0ZVwiPiwgPC9zcGFuPlxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwibWF0Y2guZGF0YS5hZGRyZXNzLnN0YXRlXCIgW2lubmVySHRtbF09XCJoaWdobGlnaHQobWF0Y2guZGF0YS5hZGRyZXNzLnN0YXRlLCB0ZXJtKVwiPjwvc3Bhbj5cbiAgICAgICAgPC9wPlxuICAgICAgICA8IS0tIFNUQVRVUyAtLT5cbiAgICAgICAgPHAgY2xhc3M9XCJzdGF0dXNcIiAqbmdJZj1cIm1hdGNoLmRhdGEuc3RhdHVzXCI+XG4gICAgICAgICAgPGkgY2xhc3M9XCJiaGktaW5mb1wiPjwvaT4gPHNwYW4gW2lubmVySHRtbF09XCJoaWdobGlnaHQobWF0Y2guZGF0YS5zdGF0dXMsIHRlcm0pXCI+PC9zcGFuPlxuICAgICAgICA8L3A+XG4gICAgICAgIDwhLS0gT1dORVIgLS0+XG4gICAgICAgIDxwIGNsYXNzPVwib3duZXJcIiAqbmdJZj1cIm1hdGNoLmRhdGEub3duZXIgJiYgbWF0Y2guZGF0YS5vd25lci5uYW1lICYmIG1hdGNoLmRhdGEuc2VhcmNoRW50aXR5ID09PSAnQ2FuZGlkYXRlJ1wiPlxuICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLXBlcnNvblwiPjwvaT4gPHNwYW4gW2lubmVySHRtbF09XCJoaWdobGlnaHQobWF0Y2guZGF0YS5vd25lci5uYW1lLCB0ZXJtKVwiPjwvc3Bhbj5cbiAgICAgICAgPC9wPlxuICAgICAgICA8IS0tIFBSSU1BUlkgREVQQVJUTUVOVCAtLT5cbiAgICAgICAgPHBcbiAgICAgICAgICBjbGFzcz1cInByaW1hcnktZGVwYXJ0bWVudFwiXG4gICAgICAgICAgKm5nSWY9XCJtYXRjaC5kYXRhLnByaW1hcnlEZXBhcnRtZW50ICYmIG1hdGNoLmRhdGEucHJpbWFyeURlcGFydG1lbnQubmFtZSAmJiBtYXRjaC5kYXRhLnNlYXJjaEVudGl0eSA9PT0gJ0NvcnBvcmF0ZVVzZXInXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLWRlcGFydG1lbnRcIj48L2k+IDxzcGFuIFtpbm5lckh0bWxdPVwiaGlnaGxpZ2h0KG1hdGNoLmRhdGEucHJpbWFyeURlcGFydG1lbnQubmFtZSwgdGVybSlcIj48L3NwYW4+XG4gICAgICAgIDwvcD5cbiAgICAgICAgPCEtLSBPQ0NVUEFUSU9OIC0tPlxuICAgICAgICA8cCBjbGFzcz1cIm9jY3VwYXRpb25cIiAqbmdJZj1cIm1hdGNoLmRhdGEub2NjdXBhdGlvbiAmJiBtYXRjaC5kYXRhLnNlYXJjaEVudGl0eSA9PT0gJ0NvcnBvcmF0ZVVzZXInXCI+XG4gICAgICAgICAgPGkgY2xhc3M9XCJiaGktb2NjdXBhdGlvblwiPjwvaT4gPHNwYW4gW2lubmVySHRtbF09XCJoaWdobGlnaHQobWF0Y2guZGF0YS5vY2N1cGF0aW9uLCB0ZXJtKVwiPjwvc3Bhbj5cbiAgICAgICAgPC9wPlxuICAgICAgPC9pdGVtLWNvbnRlbnQ+XG4gICAgPC9ub3ZvLWxpc3QtaXRlbT5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgRW50aXR5UGlja2VyUmVzdWx0IHtcbiAgQElucHV0KClcbiAgbWF0Y2g6IGFueTtcbiAgQElucHV0KClcbiAgdGVybTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHt9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIGNhcHR1cmVzIHRoZSB3aG9sZSBxdWVyeSBzdHJpbmcgYW5kIHJlcGxhY2UgaXQgd2l0aCB0aGUgc3RyaW5nIHRoYXQgd2lsbCBiZSB1c2VkIHRvXG4gICAqIG1hdGNoLlxuICAgKi9cbiAgZXNjYXBlUmVnZXhwKHF1ZXJ5VG9Fc2NhcGUpIHtcbiAgICAvLyBFeDogaWYgdGhlIGNhcHR1cmUgaXMgXCJhXCIgdGhlIHJlc3VsdCB3aWxsIGJlIFxcYVxuICAgIHJldHVybiBxdWVyeVRvRXNjYXBlLnJlcGxhY2UoLyhbLj8qK14kW1xcXVxcXFwoKXt9fC1dKS9nLCAnXFxcXCQxJyk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gc2hvdWxkIHJldHVybiBhIDxzdHJvbmc+LXRhZyB3cmFwcGVkIEhUTUwgc3RyaW5nLlxuICAgKi9cbiAgaGlnaGxpZ2h0KG1hdGNoLCBxdWVyeSkge1xuICAgIC8vIFJlcGxhY2VzIHRoZSBjYXB0dXJlIHN0cmluZyB3aXRoIGEgdGhlIHNhbWUgc3RyaW5nIGluc2lkZSBvZiBhIFwic3Ryb25nXCIgdGFnXG4gICAgcmV0dXJuIHF1ZXJ5ICYmIG1hdGNoID8gbWF0Y2gucmVwbGFjZShuZXcgUmVnRXhwKHRoaXMuZXNjYXBlUmVnZXhwKHF1ZXJ5LnRyaW0oKSksICdnaScpLCAnPHN0cm9uZz4kJjwvc3Ryb25nPicpIDogbWF0Y2g7XG4gIH1cblxuICBnZXRJY29uRm9yUmVzdWx0KHJlc3VsdD86IGFueSk6IHN0cmluZyB7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgc3dpdGNoIChyZXN1bHQuc2VhcmNoRW50aXR5KSB7XG4gICAgICAgIGNhc2UgJ0NsaWVudENvbnRhY3QnOlxuICAgICAgICAgIHJldHVybiAncGVyc29uIGNvbnRhY3QnO1xuICAgICAgICBjYXNlICdDbGllbnRDb3Jwb3JhdGlvbic6XG4gICAgICAgICAgcmV0dXJuICdjb21wYW55JztcbiAgICAgICAgY2FzZSAnT3Bwb3J0dW5pdHknOlxuICAgICAgICAgIHJldHVybiAnb3Bwb3J0dW5pdHknO1xuICAgICAgICBjYXNlICdDYW5kaWRhdGUnOlxuICAgICAgICAgIHJldHVybiAnY2FuZGlkYXRlJztcbiAgICAgICAgY2FzZSAnTGVhZCc6XG4gICAgICAgICAgcmV0dXJuICdsZWFkJztcbiAgICAgICAgY2FzZSAnSm9iT3JkZXInOlxuICAgICAgICAgIHJldHVybiAnam9iJztcbiAgICAgICAgY2FzZSAnUGxhY2VtZW50JzpcbiAgICAgICAgICByZXR1cm4gJ3N0YXIgcGxhY2VtZW50JztcbiAgICAgICAgY2FzZSAnQ29ycG9yYXRlVXNlcic6XG4gICAgICAgICAgcmV0dXJuICd1c2VyJztcbiAgICAgICAgY2FzZSAnQ29ycG9yYXRpb25EZXBhcnRtZW50JzpcbiAgICAgICAgICByZXR1cm4gJ2RlcGFydG1lbnQnO1xuICAgICAgICBjYXNlICdKb2JTaGlmdCc6XG4gICAgICAgICAgcmV0dXJuICd0aW1ldGFibGUgY29udHJhY3QnO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgcmVuZGVyVGltZXN0YW1wKGRhdGU/OiBhbnkpIHtcbiAgICBsZXQgdGltZXN0YW1wID0gJyc7XG4gICAgaWYgKGRhdGUpIHtcbiAgICAgIHRpbWVzdGFtcCA9IHRoaXMubGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KGRhdGUsIHsgeWVhcjogJ251bWVyaWMnLCBtb250aDogJ251bWVyaWMnLCBkYXk6ICdudW1lcmljJyB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRpbWVzdGFtcDtcbiAgfVxuXG4gIHJlbmRlclRpbWVOb09mZnNldChkYXRlU3RyPzogc3RyaW5nKSB7XG4gICAgbGV0IHRpbWVzdGFtcCA9ICcnO1xuICAgIGlmIChkYXRlU3RyKSB7XG4gICAgICBkYXRlU3RyID0gZGF0ZVN0ci5zbGljZSgwLCAxOSk7XG4gICAgICB0aW1lc3RhbXAgPSB0aGlzLmxhYmVscy5mb3JtYXRUaW1lKGRhdGVTdHIpO1xuICAgIH1cbiAgICByZXR1cm4gdGltZXN0YW1wO1xuICB9XG5cbiAgZ2V0TmFtZUZvclJlc3VsdChyZXN1bHQ/OiBhbnkpIHtcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICBzd2l0Y2ggKHJlc3VsdC5zZWFyY2hFbnRpdHkpIHtcbiAgICAgICAgY2FzZSAnTGVhZCc6XG4gICAgICAgIGNhc2UgJ0NvcnBvcmF0ZVVzZXInOlxuICAgICAgICBjYXNlICdDbGllbnRDb250YWN0JzpcbiAgICAgICAgY2FzZSAnQ2FuZGlkYXRlJzpcbiAgICAgICAgY2FzZSAnUGVyc29uJzpcbiAgICAgICAgICBpZiAoJ2ZpcnN0TmFtZScgaW4gcmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7cmVzdWx0LmZpcnN0TmFtZX0gJHtyZXN1bHQubGFzdE5hbWV9YC50cmltKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBgJHtyZXN1bHQubmFtZSB8fCAnJ31gLnRyaW0oKTtcbiAgICAgICAgY2FzZSAnQ2xpZW50Q29ycG9yYXRpb24nOlxuICAgICAgICAgIHJldHVybiBgJHtyZXN1bHQubmFtZSB8fCAnJ31gLnRyaW0oKTtcbiAgICAgICAgY2FzZSAnT3Bwb3J0dW5pdHknOlxuICAgICAgICBjYXNlICdKb2JPcmRlcic6XG4gICAgICAgICAgcmV0dXJuIGAke3Jlc3VsdC5pZH0gfCAke3Jlc3VsdC50aXRsZSB8fCAnJ31gLnRyaW0oKTtcbiAgICAgICAgY2FzZSAnUGxhY2VtZW50JzpcbiAgICAgICAgICBsZXQgbGFiZWwgPSBgJHtyZXN1bHQuaWR9YDtcbiAgICAgICAgICBpZiAocmVzdWx0LmNhbmRpZGF0ZSB8fCByZXN1bHQuam9iT3JkZXIpIHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuY2FuZGlkYXRlICYmIHJlc3VsdC5qb2JPcmRlcikge1xuICAgICAgICAgICAgICBsYWJlbCA9IGAke2xhYmVsfSB8ICR7cmVzdWx0LmNhbmRpZGF0ZS5maXJzdE5hbWV9ICR7cmVzdWx0LmNhbmRpZGF0ZS5sYXN0TmFtZX0gLSAke3Jlc3VsdC5qb2JPcmRlci50aXRsZX1gLnRyaW0oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0LmpvYk9yZGVyKSB7XG4gICAgICAgICAgICAgIGxhYmVsID0gYCR7bGFiZWx9IHwgJHtyZXN1bHQuam9iT3JkZXIudGl0bGV9YC50cmltKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsYWJlbCA9IGAke2xhYmVsfSB8ICR7cmVzdWx0LmNhbmRpZGF0ZS5maXJzdE5hbWV9ICR7cmVzdWx0LmNhbmRpZGF0ZS5sYXN0TmFtZX1gLnRyaW0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGxhYmVsO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiBgJHtyZXN1bHQubmFtZSB8fCAnJ31gLnRyaW0oKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2VudGl0eS1waWNrZXItcmVzdWx0cycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5vdm8tbGlzdCAqbmdJZj1cIm1hdGNoZXMubGVuZ3RoID4gMFwiIGRpcmVjdGlvbj1cInZlcnRpY2FsXCI+XG4gICAgICA8ZW50aXR5LXBpY2tlci1yZXN1bHRcbiAgICAgICAgKm5nRm9yPVwibGV0IG1hdGNoIG9mIG1hdGNoZXNcIlxuICAgICAgICBbbWF0Y2hdPVwibWF0Y2hcIlxuICAgICAgICBbdGVybV09XCJ0ZXJtXCJcbiAgICAgICAgKGNsaWNrKT1cInNlbGVjdE1hdGNoKCRldmVudCwgbWF0Y2gpXCJcbiAgICAgICAgW25nQ2xhc3NdPVwieyBhY3RpdmU6IGlzQWN0aXZlKG1hdGNoKSB9XCJcbiAgICAgICAgKG1vdXNlZW50ZXIpPVwic2VsZWN0QWN0aXZlKG1hdGNoKVwiXG4gICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJwcmVzZWxlY3RlZChtYXRjaClcIlxuICAgICAgPlxuICAgICAgPC9lbnRpdHktcGlja2VyLXJlc3VsdD5cbiAgICAgIDxub3ZvLWxvYWRpbmcgdGhlbWU9XCJsaW5lXCIgKm5nSWY9XCJpc0xvYWRpbmcgJiYgbWF0Y2hlcy5sZW5ndGggPiAwXCI+PC9ub3ZvLWxvYWRpbmc+XG4gICAgPC9ub3ZvLWxpc3Q+XG4gICAgPHAgY2xhc3M9XCJwaWNrZXItZXJyb3JcIiAqbmdJZj1cImhhc0Vycm9yXCI+e3sgbGFiZWxzLnBpY2tlckVycm9yIH19PC9wPlxuICAgIDxwIGNsYXNzPVwicGlja2VyLW51bGwtcmVzdWx0c1wiICpuZ0lmPVwiaGFzTm9uRXJyb3JNZXNzYWdlICYmIHRlcm0gIT09ICcnXCI+e3sgbGFiZWxzLnBpY2tlckVtcHR5IH19PC9wPlxuICAgIDxwIGNsYXNzPVwicGlja2VyLW51bGwtcmVzdWx0c1wiICpuZ0lmPVwiaGFzTm9uRXJyb3JNZXNzYWdlICYmIHRlcm0gPT09ICcnXCI+e3sgbGFiZWxzLnBpY2tlclRleHRGaWVsZEVtcHR5IH19PC9wPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBFbnRpdHlQaWNrZXJSZXN1bHRzIGV4dGVuZHMgQmFzZVBpY2tlclJlc3VsdHMge1xuICBAT3V0cHV0KClcbiAgc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZiwgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSwgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHN1cGVyKGVsZW1lbnQsIHJlZik7XG4gIH1cblxuICBnZXQgaGFzTm9uRXJyb3JNZXNzYWdlKCkge1xuICAgIHJldHVybiAhdGhpcy5pc0xvYWRpbmcgJiYgIXRoaXMubWF0Y2hlcy5sZW5ndGggJiYgIXRoaXMuaGFzRXJyb3I7XG4gIH1cblxuICBnZXRMaXN0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3Rvcignbm92by1saXN0Jyk7XG4gIH1cblxuICBzZWxlY3RNYXRjaChldmVudD86IGFueSwgaXRlbT86IGFueSkge1xuICAgIHRoaXMuc2VsZWN0Lm5leHQoaXRlbSk7XG4gICAgcmV0dXJuIHN1cGVyLnNlbGVjdE1hdGNoKGV2ZW50LCBpdGVtKTtcbiAgfVxufVxuIl19