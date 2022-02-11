// NG2
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { NovoLabelService } from '../../../../services/novo-label-service';
// Vendor
// APP
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
export class EntityPickerResult {
    constructor(labels) {
        this.labels = labels;
        this.select = new EventEmitter();
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
    renderTime(dateStr) {
        let timestamp = '';
        if (dateStr) {
            timestamp = this.labels.formatTime(new Date(dateStr));
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
        var _a, _b, _c;
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
                case 'JobShift':
                    return `${(_a = result.jobOrder) === null || _a === void 0 ? void 0 : _a.title} @ ${((_c = (_b = result.jobOrder) === null || _b === void 0 ? void 0 : _b.clientCorporation) === null || _c === void 0 ? void 0 : _c.name) || ''}`.trim();
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
    <novo-list-item *ngIf="match.data" (click)="select.next(match.data)">
      <novo-item-header>
        <novo-item-avatar [icon]="getIconForResult(match.data)"></novo-item-avatar>
        <novo-item-title> <span [innerHtml]="highlight(getNameForResult(match.data), term)"></span> </novo-item-title>
      </novo-item-header>
      <novo-item-content direction="horizontal">
        <!-- COMPANY 1 -->
        <novo-text smaller class="company" *ngIf="match.data.companyName || match.data?.clientCorporation?.name">
          <i class="bhi-company company"></i>
          <span [innerHtml]="highlight(match.data.companyName || match.data?.clientCorporation?.name, term)"></span>
        </novo-text>
        <!-- CLIENT CONTACT -->
        <novo-text smaller class="contact" *ngIf="match.data?.clientContact?.firstName">
          <i class="bhi-person contact person"></i>
          <span [innerHtml]="highlight(match.data.clientContact.firstName + ' ' + match.data.clientContact.lastName, term)"></span>
        </novo-text>
        <!-- CANDIDATE -->
        <novo-text smaller class="candidate" *ngIf="match.data.candidate && match.data.searchEntity === 'Placement'">
          <i class="bhi-candidate candidate"></i>
          <span [innerHtml]="highlight(match.data.candidate.firstName + ' ' + match.data.candidate.lastName, term)"></span>
        </novo-text>
        <!-- START & END DATE -->
        <novo-text smaller class="start-date" *ngIf="match.data.dateBegin && match.data.searchEntity === 'Placement'">
          <i class="bhi-calendar"></i>
          <span [innerHtml]="renderTimestamp(match.data.dateBegin) + ' - ' + renderTimestamp(match.data.dateEnd)"></span>
        </novo-text>
        <!-- START Date -->
        <novo-text smaller class="start-date" *ngIf="match.data.startTime && match.data.searchEntity === 'JobShift'">
          <i class="bhi-calendar"></i>
          <span [innerHtml]="renderTimestamp(match.data.startTime)"></span>
        </novo-text>
        <!-- START & END TIME -->
        <novo-text smaller class="start-time" *ngIf="match.data.startTime && match.data.searchEntity === 'JobShift'">
          <i class="bhi-clock"></i>
          <span [innerHtml]="renderTimeNoOffset(match.data.startTime) + ' - ' + renderTimeNoOffset(match.data.endTime)"></span>
        </novo-text>
        <!-- JOBORDER -->
        <novo-text smaller class="job" *ngIf="match.data.jobOrder && match.data.searchEntity === 'JobShift'">
          <i class="bhi-job job"></i>
          <span [innerHtml]="highlight(match.data.jobOrder.title, term)"></span>
        </novo-text>
        <!-- OPENINGS -->
        <novo-text smaller class="openings" *ngIf="match.data.openings && match.data.searchEntity === 'JobShift'">
          <i class="bhi-candidate"></i>
          <span>{{ match.data.numAssigned }} / {{ match.data.openings }}</span>
        </novo-text>
        <!-- EMAIL -->
        <novo-text smaller class="email" *ngIf="match.data.email">
          <i class="bhi-email"></i> <span [innerHtml]="highlight(match.data.email, term)"></span>
        </novo-text>
        <!-- PHONE -->
        <novo-text smaller class="phone" *ngIf="match.data.phone">
          <i class="bhi-phone"></i> <span [innerHtml]="highlight(match.data.phone, term)"></span>
        </novo-text>
        <!-- ADDRESS -->
        <novo-text smaller class="location" *ngIf="match.data.address && (match.data.address.city || match.data.address.state)">
          <i class="bhi-location"></i> <span *ngIf="match.data.address.city" [innerHtml]="highlight(match.data.address.city, term)"></span>
          <span *ngIf="match.data.address.city && match.data.address.state">, </span>
          <span *ngIf="match.data.address.state" [innerHtml]="highlight(match.data.address.state, term)"></span>
        </novo-text>
        <!-- STATUS -->
        <novo-text smaller class="status" *ngIf="match.data.status">
          <i class="bhi-info"></i> <span [innerHtml]="highlight(match.data.status, term)"></span>
        </novo-text>
        <!-- OWNER -->
        <novo-text smaller class="owner" *ngIf="match.data.owner && match.data.owner.name && match.data.searchEntity === 'Candidate'">
          <i class="bhi-person"></i> <span [innerHtml]="highlight(match.data.owner.name, term)"></span>
        </novo-text>
        <!-- PRIMARY DEPARTMENT -->
        <novo-text
          smaller
          class="primary-department"
          *ngIf="match.data.primaryDepartment && match.data.primaryDepartment.name && match.data.searchEntity === 'CorporateUser'"
        >
          <i class="bhi-department"></i> <span [innerHtml]="highlight(match.data.primaryDepartment.name, term)"></span>
        </novo-text>
        <!-- OCCUPATION -->
        <novo-text smaller class="occupation" *ngIf="match.data.occupation && match.data.searchEntity === 'CorporateUser'">
          <i class="bhi-occupation"></i> <span [innerHtml]="highlight(match.data.occupation, term)"></span>
        </novo-text>
      </novo-item-content>
    </novo-list-item>
  `
            },] }
];
EntityPickerResult.ctorParameters = () => [
    { type: NovoLabelService }
];
EntityPickerResult.propDecorators = {
    match: [{ type: Input }],
    term: [{ type: Input }],
    select: [{ type: Output }]
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
        [ngClass]="{ active: isActive(match) }"
        (click)="selectMatch($event, match)"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
      >
      </entity-picker-result>
      <novo-loading theme="line" *ngIf="isLoading && matches.length > 0"></novo-loading>
    </novo-list>
    <div class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</div>
    <div class="picker-null-results" *ngIf="hasNonErrorMessage && term !== ''">{{ labels.pickerEmpty }}</div>
    <div class="picker-null-results" *ngIf="hasNonErrorMessage && term === ''">{{ labels.pickerTextFieldEmpty }}</div>
  `,
                host: {
                    class: 'novo-entity-picker-results',
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW50aXR5UGlja2VyUmVzdWx0cy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9waWNrZXIvZXh0cmFzL2VudGl0eS1waWNrZXItcmVzdWx0cy9FbnRpdHlQaWNrZXJSZXN1bHRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUMzRSxTQUFTO0FBQ1QsTUFBTTtBQUNOLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBeUY3RSxNQUFNLE9BQU8sa0JBQWtCO0lBSzdCLFlBQW1CLE1BQXdCO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBRmpDLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUVYLENBQUM7SUFFL0M7OztPQUdHO0lBQ0gsWUFBWSxDQUFDLGFBQWE7UUFDeEIsa0RBQWtEO1FBQ2xELE9BQU8sYUFBYSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxTQUFTLENBQUMsS0FBSyxFQUFFLEtBQUs7UUFDcEIsOEVBQThFO1FBQzlFLE9BQU8sS0FBSyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxD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dCI6WyIvLyBORzJcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG4vLyBWZW5kb3Jcbi8vIEFQUFxuaW1wb3J0IHsgQmFzZVBpY2tlclJlc3VsdHMgfSBmcm9tICcuLi9iYXNlLXBpY2tlci1yZXN1bHRzL0Jhc2VQaWNrZXJSZXN1bHRzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZW50aXR5LXBpY2tlci1yZXN1bHQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxub3ZvLWxpc3QtaXRlbSAqbmdJZj1cIm1hdGNoLmRhdGFcIiAoY2xpY2spPVwic2VsZWN0Lm5leHQobWF0Y2guZGF0YSlcIj5cbiAgICAgIDxub3ZvLWl0ZW0taGVhZGVyPlxuICAgICAgICA8bm92by1pdGVtLWF2YXRhciBbaWNvbl09XCJnZXRJY29uRm9yUmVzdWx0KG1hdGNoLmRhdGEpXCI+PC9ub3ZvLWl0ZW0tYXZhdGFyPlxuICAgICAgICA8bm92by1pdGVtLXRpdGxlPiA8c3BhbiBbaW5uZXJIdG1sXT1cImhpZ2hsaWdodChnZXROYW1lRm9yUmVzdWx0KG1hdGNoLmRhdGEpLCB0ZXJtKVwiPjwvc3Bhbj4gPC9ub3ZvLWl0ZW0tdGl0bGU+XG4gICAgICA8L25vdm8taXRlbS1oZWFkZXI+XG4gICAgICA8bm92by1pdGVtLWNvbnRlbnQgZGlyZWN0aW9uPVwiaG9yaXpvbnRhbFwiPlxuICAgICAgICA8IS0tIENPTVBBTlkgMSAtLT5cbiAgICAgICAgPG5vdm8tdGV4dCBzbWFsbGVyIGNsYXNzPVwiY29tcGFueVwiICpuZ0lmPVwibWF0Y2guZGF0YS5jb21wYW55TmFtZSB8fCBtYXRjaC5kYXRhPy5jbGllbnRDb3Jwb3JhdGlvbj8ubmFtZVwiPlxuICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLWNvbXBhbnkgY29tcGFueVwiPjwvaT5cbiAgICAgICAgICA8c3BhbiBbaW5uZXJIdG1sXT1cImhpZ2hsaWdodChtYXRjaC5kYXRhLmNvbXBhbnlOYW1lIHx8IG1hdGNoLmRhdGE/LmNsaWVudENvcnBvcmF0aW9uPy5uYW1lLCB0ZXJtKVwiPjwvc3Bhbj5cbiAgICAgICAgPC9ub3ZvLXRleHQ+XG4gICAgICAgIDwhLS0gQ0xJRU5UIENPTlRBQ1QgLS0+XG4gICAgICAgIDxub3ZvLXRleHQgc21hbGxlciBjbGFzcz1cImNvbnRhY3RcIiAqbmdJZj1cIm1hdGNoLmRhdGE/LmNsaWVudENvbnRhY3Q/LmZpcnN0TmFtZVwiPlxuICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLXBlcnNvbiBjb250YWN0IHBlcnNvblwiPjwvaT5cbiAgICAgICAgICA8c3BhbiBbaW5uZXJIdG1sXT1cImhpZ2hsaWdodChtYXRjaC5kYXRhLmNsaWVudENvbnRhY3QuZmlyc3ROYW1lICsgJyAnICsgbWF0Y2guZGF0YS5jbGllbnRDb250YWN0Lmxhc3ROYW1lLCB0ZXJtKVwiPjwvc3Bhbj5cbiAgICAgICAgPC9ub3ZvLXRleHQ+XG4gICAgICAgIDwhLS0gQ0FORElEQVRFIC0tPlxuICAgICAgICA8bm92by10ZXh0IHNtYWxsZXIgY2xhc3M9XCJjYW5kaWRhdGVcIiAqbmdJZj1cIm1hdGNoLmRhdGEuY2FuZGlkYXRlICYmIG1hdGNoLmRhdGEuc2VhcmNoRW50aXR5ID09PSAnUGxhY2VtZW50J1wiPlxuICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLWNhbmRpZGF0ZSBjYW5kaWRhdGVcIj48L2k+XG4gICAgICAgICAgPHNwYW4gW2lubmVySHRtbF09XCJoaWdobGlnaHQobWF0Y2guZGF0YS5jYW5kaWRhdGUuZmlyc3ROYW1lICsgJyAnICsgbWF0Y2guZGF0YS5jYW5kaWRhdGUubGFzdE5hbWUsIHRlcm0pXCI+PC9zcGFuPlxuICAgICAgICA8L25vdm8tdGV4dD5cbiAgICAgICAgPCEtLSBTVEFSVCAmIEVORCBEQVRFIC0tPlxuICAgICAgICA8bm92by10ZXh0IHNtYWxsZXIgY2xhc3M9XCJzdGFydC1kYXRlXCIgKm5nSWY9XCJtYXRjaC5kYXRhLmRhdGVCZWdpbiAmJiBtYXRjaC5kYXRhLnNlYXJjaEVudGl0eSA9PT0gJ1BsYWNlbWVudCdcIj5cbiAgICAgICAgICA8aSBjbGFzcz1cImJoaS1jYWxlbmRhclwiPjwvaT5cbiAgICAgICAgICA8c3BhbiBbaW5uZXJIdG1sXT1cInJlbmRlclRpbWVzdGFtcChtYXRjaC5kYXRhLmRhdGVCZWdpbikgKyAnIC0gJyArIHJlbmRlclRpbWVzdGFtcChtYXRjaC5kYXRhLmRhdGVFbmQpXCI+PC9zcGFuPlxuICAgICAgICA8L25vdm8tdGV4dD5cbiAgICAgICAgPCEtLSBTVEFSVCBEYXRlIC0tPlxuICAgICAgICA8bm92by10ZXh0IHNtYWxsZXIgY2xhc3M9XCJzdGFydC1kYXRlXCIgKm5nSWY9XCJtYXRjaC5kYXRhLnN0YXJ0VGltZSAmJiBtYXRjaC5kYXRhLnNlYXJjaEVudGl0eSA9PT0gJ0pvYlNoaWZ0J1wiPlxuICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLWNhbGVuZGFyXCI+PC9pPlxuICAgICAgICAgIDxzcGFuIFtpbm5lckh0bWxdPVwicmVuZGVyVGltZXN0YW1wKG1hdGNoLmRhdGEuc3RhcnRUaW1lKVwiPjwvc3Bhbj5cbiAgICAgICAgPC9ub3ZvLXRleHQ+XG4gICAgICAgIDwhLS0gU1RBUlQgJiBFTkQgVElNRSAtLT5cbiAgICAgICAgPG5vdm8tdGV4dCBzbWFsbGVyIGNsYXNzPVwic3RhcnQtdGltZVwiICpuZ0lmPVwibWF0Y2guZGF0YS5zdGFydFRpbWUgJiYgbWF0Y2guZGF0YS5zZWFyY2hFbnRpdHkgPT09ICdKb2JTaGlmdCdcIj5cbiAgICAgICAgICA8aSBjbGFzcz1cImJoaS1jbG9ja1wiPjwvaT5cbiAgICAgICAgICA8c3BhbiBbaW5uZXJIdG1sXT1cInJlbmRlclRpbWVOb09mZnNldChtYXRjaC5kYXRhLnN0YXJ0VGltZSkgKyAnIC0gJyArIHJlbmRlclRpbWVOb09mZnNldChtYXRjaC5kYXRhLmVuZFRpbWUpXCI+PC9zcGFuPlxuICAgICAgICA8L25vdm8tdGV4dD5cbiAgICAgICAgPCEtLSBKT0JPUkRFUiAtLT5cbiAgICAgICAgPG5vdm8tdGV4dCBzbWFsbGVyIGNsYXNzPVwiam9iXCIgKm5nSWY9XCJtYXRjaC5kYXRhLmpvYk9yZGVyICYmIG1hdGNoLmRhdGEuc2VhcmNoRW50aXR5ID09PSAnSm9iU2hpZnQnXCI+XG4gICAgICAgICAgPGkgY2xhc3M9XCJiaGktam9iIGpvYlwiPjwvaT5cbiAgICAgICAgICA8c3BhbiBbaW5uZXJIdG1sXT1cImhpZ2hsaWdodChtYXRjaC5kYXRhLmpvYk9yZGVyLnRpdGxlLCB0ZXJtKVwiPjwvc3Bhbj5cbiAgICAgICAgPC9ub3ZvLXRleHQ+XG4gICAgICAgIDwhLS0gT1BFTklOR1MgLS0+XG4gICAgICAgIDxub3ZvLXRleHQgc21hbGxlciBjbGFzcz1cIm9wZW5pbmdzXCIgKm5nSWY9XCJtYXRjaC5kYXRhLm9wZW5pbmdzICYmIG1hdGNoLmRhdGEuc2VhcmNoRW50aXR5ID09PSAnSm9iU2hpZnQnXCI+XG4gICAgICAgICAgPGkgY2xhc3M9XCJiaGktY2FuZGlkYXRlXCI+PC9pPlxuICAgICAgICAgIDxzcGFuPnt7IG1hdGNoLmRhdGEubnVtQXNzaWduZWQgfX0gLyB7eyBtYXRjaC5kYXRhLm9wZW5pbmdzIH19PC9zcGFuPlxuICAgICAgICA8L25vdm8tdGV4dD5cbiAgICAgICAgPCEtLSBFTUFJTCAtLT5cbiAgICAgICAgPG5vdm8tdGV4dCBzbWFsbGVyIGNsYXNzPVwiZW1haWxcIiAqbmdJZj1cIm1hdGNoLmRhdGEuZW1haWxcIj5cbiAgICAgICAgICA8aSBjbGFzcz1cImJoaS1lbWFpbFwiPjwvaT4gPHNwYW4gW2lubmVySHRtbF09XCJoaWdobGlnaHQobWF0Y2guZGF0YS5lbWFpbCwgdGVybSlcIj48L3NwYW4+XG4gICAgICAgIDwvbm92by10ZXh0PlxuICAgICAgICA8IS0tIFBIT05FIC0tPlxuICAgICAgICA8bm92by10ZXh0IHNtYWxsZXIgY2xhc3M9XCJwaG9uZVwiICpuZ0lmPVwibWF0Y2guZGF0YS5waG9uZVwiPlxuICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLXBob25lXCI+PC9pPiA8c3BhbiBbaW5uZXJIdG1sXT1cImhpZ2hsaWdodChtYXRjaC5kYXRhLnBob25lLCB0ZXJtKVwiPjwvc3Bhbj5cbiAgICAgICAgPC9ub3ZvLXRleHQ+XG4gICAgICAgIDwhLS0gQUREUkVTUyAtLT5cbiAgICAgICAgPG5vdm8tdGV4dCBzbWFsbGVyIGNsYXNzPVwibG9jYXRpb25cIiAqbmdJZj1cIm1hdGNoLmRhdGEuYWRkcmVzcyAmJiAobWF0Y2guZGF0YS5hZGRyZXNzLmNpdHkgfHwgbWF0Y2guZGF0YS5hZGRyZXNzLnN0YXRlKVwiPlxuICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLWxvY2F0aW9uXCI+PC9pPiA8c3BhbiAqbmdJZj1cIm1hdGNoLmRhdGEuYWRkcmVzcy5jaXR5XCIgW2lubmVySHRtbF09XCJoaWdobGlnaHQobWF0Y2guZGF0YS5hZGRyZXNzLmNpdHksIHRlcm0pXCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwibWF0Y2guZGF0YS5hZGRyZXNzLmNpdHkgJiYgbWF0Y2guZGF0YS5hZGRyZXNzLnN0YXRlXCI+LCA8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJtYXRjaC5kYXRhLmFkZHJlc3Muc3RhdGVcIiBbaW5uZXJIdG1sXT1cImhpZ2hsaWdodChtYXRjaC5kYXRhLmFkZHJlc3Muc3RhdGUsIHRlcm0pXCI+PC9zcGFuPlxuICAgICAgICA8L25vdm8tdGV4dD5cbiAgICAgICAgPCEtLSBTVEFUVVMgLS0+XG4gICAgICAgIDxub3ZvLXRleHQgc21hbGxlciBjbGFzcz1cInN0YXR1c1wiICpuZ0lmPVwibWF0Y2guZGF0YS5zdGF0dXNcIj5cbiAgICAgICAgICA8aSBjbGFzcz1cImJoaS1pbmZvXCI+PC9pPiA8c3BhbiBbaW5uZXJIdG1sXT1cImhpZ2hsaWdodChtYXRjaC5kYXRhLnN0YXR1cywgdGVybSlcIj48L3NwYW4+XG4gICAgICAgIDwvbm92by10ZXh0PlxuICAgICAgICA8IS0tIE9XTkVSIC0tPlxuICAgICAgICA8bm92by10ZXh0IHNtYWxsZXIgY2xhc3M9XCJvd25lclwiICpuZ0lmPVwibWF0Y2guZGF0YS5vd25lciAmJiBtYXRjaC5kYXRhLm93bmVyLm5hbWUgJiYgbWF0Y2guZGF0YS5zZWFyY2hFbnRpdHkgPT09ICdDYW5kaWRhdGUnXCI+XG4gICAgICAgICAgPGkgY2xhc3M9XCJiaGktcGVyc29uXCI+PC9pPiA8c3BhbiBbaW5uZXJIdG1sXT1cImhpZ2hsaWdodChtYXRjaC5kYXRhLm93bmVyLm5hbWUsIHRlcm0pXCI+PC9zcGFuPlxuICAgICAgICA8L25vdm8tdGV4dD5cbiAgICAgICAgPCEtLSBQUklNQVJZIERFUEFSVE1FTlQgLS0+XG4gICAgICAgIDxub3ZvLXRleHRcbiAgICAgICAgICBzbWFsbGVyXG4gICAgICAgICAgY2xhc3M9XCJwcmltYXJ5LWRlcGFydG1lbnRcIlxuICAgICAgICAgICpuZ0lmPVwibWF0Y2guZGF0YS5wcmltYXJ5RGVwYXJ0bWVudCAmJiBtYXRjaC5kYXRhLnByaW1hcnlEZXBhcnRtZW50Lm5hbWUgJiYgbWF0Y2guZGF0YS5zZWFyY2hFbnRpdHkgPT09ICdDb3Jwb3JhdGVVc2VyJ1wiXG4gICAgICAgID5cbiAgICAgICAgICA8aSBjbGFzcz1cImJoaS1kZXBhcnRtZW50XCI+PC9pPiA8c3BhbiBbaW5uZXJIdG1sXT1cImhpZ2hsaWdodChtYXRjaC5kYXRhLnByaW1hcnlEZXBhcnRtZW50Lm5hbWUsIHRlcm0pXCI+PC9zcGFuPlxuICAgICAgICA8L25vdm8tdGV4dD5cbiAgICAgICAgPCEtLSBPQ0NVUEFUSU9OIC0tPlxuICAgICAgICA8bm92by10ZXh0IHNtYWxsZXIgY2xhc3M9XCJvY2N1cGF0aW9uXCIgKm5nSWY9XCJtYXRjaC5kYXRhLm9jY3VwYXRpb24gJiYgbWF0Y2guZGF0YS5zZWFyY2hFbnRpdHkgPT09ICdDb3Jwb3JhdGVVc2VyJ1wiPlxuICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLW9jY3VwYXRpb25cIj48L2k+IDxzcGFuIFtpbm5lckh0bWxdPVwiaGlnaGxpZ2h0KG1hdGNoLmRhdGEub2NjdXBhdGlvbiwgdGVybSlcIj48L3NwYW4+XG4gICAgICAgIDwvbm92by10ZXh0PlxuICAgICAgPC9ub3ZvLWl0ZW0tY29udGVudD5cbiAgICA8L25vdm8tbGlzdC1pdGVtPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBFbnRpdHlQaWNrZXJSZXN1bHQge1xuICBASW5wdXQoKSBtYXRjaDogYW55O1xuICBASW5wdXQoKSB0ZXJtOiBhbnk7XG4gIEBPdXRwdXQoKSBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHt9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIGNhcHR1cmVzIHRoZSB3aG9sZSBxdWVyeSBzdHJpbmcgYW5kIHJlcGxhY2UgaXQgd2l0aCB0aGUgc3RyaW5nIHRoYXQgd2lsbCBiZSB1c2VkIHRvXG4gICAqIG1hdGNoLlxuICAgKi9cbiAgZXNjYXBlUmVnZXhwKHF1ZXJ5VG9Fc2NhcGUpIHtcbiAgICAvLyBFeDogaWYgdGhlIGNhcHR1cmUgaXMgXCJhXCIgdGhlIHJlc3VsdCB3aWxsIGJlIFxcYVxuICAgIHJldHVybiBxdWVyeVRvRXNjYXBlLnJlcGxhY2UoLyhbLj8qK14kW1xcXVxcXFwoKXt9fC1dKS9nLCAnXFxcXCQxJyk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gc2hvdWxkIHJldHVybiBhIDxzdHJvbmc+LXRhZyB3cmFwcGVkIEhUTUwgc3RyaW5nLlxuICAgKi9cbiAgaGlnaGxpZ2h0KG1hdGNoLCBxdWVyeSkge1xuICAgIC8vIFJlcGxhY2VzIHRoZSBjYXB0dXJlIHN0cmluZyB3aXRoIGEgdGhlIHNhbWUgc3RyaW5nIGluc2lkZSBvZiBhIFwic3Ryb25nXCIgdGFnXG4gICAgcmV0dXJuIHF1ZXJ5ICYmIG1hdGNoID8gbWF0Y2gucmVwbGFjZShuZXcgUmVnRXhwKHRoaXMuZXNjYXBlUmVnZXhwKHF1ZXJ5LnRyaW0oKSksICdnaScpLCAnPHN0cm9uZz4kJjwvc3Ryb25nPicpIDogbWF0Y2g7XG4gIH1cblxuICBnZXRJY29uRm9yUmVzdWx0KHJlc3VsdD86IGFueSk6IHN0cmluZyB7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgc3dpdGNoIChyZXN1bHQuc2VhcmNoRW50aXR5KSB7XG4gICAgICAgIGNhc2UgJ0NsaWVudENvbnRhY3QnOlxuICAgICAgICAgIHJldHVybiAncGVyc29uIGNvbnRhY3QnO1xuICAgICAgICBjYXNlICdDbGllbnRDb3Jwb3JhdGlvbic6XG4gICAgICAgICAgcmV0dXJuICdjb21wYW55JztcbiAgICAgICAgY2FzZSAnT3Bwb3J0dW5pdHknOlxuICAgICAgICAgIHJldHVybiAnb3Bwb3J0dW5pdHknO1xuICAgICAgICBjYXNlICdDYW5kaWRhdGUnOlxuICAgICAgICAgIHJldHVybiAnY2FuZGlkYXRlJztcbiAgICAgICAgY2FzZSAnTGVhZCc6XG4gICAgICAgICAgcmV0dXJuICdsZWFkJztcbiAgICAgICAgY2FzZSAnSm9iT3JkZXInOlxuICAgICAgICAgIHJldHVybiAnam9iJztcbiAgICAgICAgY2FzZSAnUGxhY2VtZW50JzpcbiAgICAgICAgICByZXR1cm4gJ3N0YXIgcGxhY2VtZW50JztcbiAgICAgICAgY2FzZSAnQ29ycG9yYXRlVXNlcic6XG4gICAgICAgICAgcmV0dXJuICd1c2VyJztcbiAgICAgICAgY2FzZSAnQ29ycG9yYXRpb25EZXBhcnRtZW50JzpcbiAgICAgICAgICByZXR1cm4gJ2RlcGFydG1lbnQnO1xuICAgICAgICBjYXNlICdKb2JTaGlmdCc6XG4gICAgICAgICAgcmV0dXJuICd0aW1ldGFibGUgY29udHJhY3QnO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgcmVuZGVyVGltZXN0YW1wKGRhdGU/OiBhbnkpIHtcbiAgICBsZXQgdGltZXN0YW1wID0gJyc7XG4gICAgaWYgKGRhdGUpIHtcbiAgICAgIHRpbWVzdGFtcCA9IHRoaXMubGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KGRhdGUsIHsgeWVhcjogJ251bWVyaWMnLCBtb250aDogJ251bWVyaWMnLCBkYXk6ICdudW1lcmljJyB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRpbWVzdGFtcDtcbiAgfVxuXG4gIHJlbmRlclRpbWUoZGF0ZVN0cj86IHN0cmluZykge1xuICAgIGxldCB0aW1lc3RhbXAgPSAnJztcbiAgICBpZiAoZGF0ZVN0cikge1xuICAgICAgdGltZXN0YW1wID0gdGhpcy5sYWJlbHMuZm9ybWF0VGltZShuZXcgRGF0ZShkYXRlU3RyKSk7XG4gICAgfVxuICAgIHJldHVybiB0aW1lc3RhbXA7XG4gIH1cblxuICByZW5kZXJUaW1lTm9PZmZzZXQoZGF0ZVN0cj86IHN0cmluZykge1xuICAgIGxldCB0aW1lc3RhbXAgPSAnJztcbiAgICBpZiAoZGF0ZVN0cikge1xuICAgICAgZGF0ZVN0ciA9IGRhdGVTdHIuc2xpY2UoMCwgMTkpO1xuICAgICAgdGltZXN0YW1wID0gdGhpcy5sYWJlbHMuZm9ybWF0VGltZShkYXRlU3RyKTtcbiAgICB9XG4gICAgcmV0dXJuIHRpbWVzdGFtcDtcbiAgfVxuXG4gIGdldE5hbWVGb3JSZXN1bHQocmVzdWx0PzogYW55KSB7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgc3dpdGNoIChyZXN1bHQuc2VhcmNoRW50aXR5KSB7XG4gICAgICAgIGNhc2UgJ0xlYWQnOlxuICAgICAgICBjYXNlICdDb3Jwb3JhdGVVc2VyJzpcbiAgICAgICAgY2FzZSAnQ2xpZW50Q29udGFjdCc6XG4gICAgICAgIGNhc2UgJ0NhbmRpZGF0ZSc6XG4gICAgICAgIGNhc2UgJ1BlcnNvbic6XG4gICAgICAgICAgaWYgKCdmaXJzdE5hbWUnIGluIHJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIGAke3Jlc3VsdC5maXJzdE5hbWV9ICR7cmVzdWx0Lmxhc3ROYW1lfWAudHJpbSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gYCR7cmVzdWx0Lm5hbWUgfHwgJyd9YC50cmltKCk7XG4gICAgICAgIGNhc2UgJ0NsaWVudENvcnBvcmF0aW9uJzpcbiAgICAgICAgICByZXR1cm4gYCR7cmVzdWx0Lm5hbWUgfHwgJyd9YC50cmltKCk7XG4gICAgICAgIGNhc2UgJ09wcG9ydHVuaXR5JzpcbiAgICAgICAgY2FzZSAnSm9iT3JkZXInOlxuICAgICAgICAgIHJldHVybiBgJHtyZXN1bHQuaWR9IHwgJHtyZXN1bHQudGl0bGUgfHwgJyd9YC50cmltKCk7XG4gICAgICAgIGNhc2UgJ1BsYWNlbWVudCc6XG4gICAgICAgICAgbGV0IGxhYmVsID0gYCR7cmVzdWx0LmlkfWA7XG4gICAgICAgICAgaWYgKHJlc3VsdC5jYW5kaWRhdGUgfHwgcmVzdWx0LmpvYk9yZGVyKSB7XG4gICAgICAgICAgICBpZiAocmVzdWx0LmNhbmRpZGF0ZSAmJiByZXN1bHQuam9iT3JkZXIpIHtcbiAgICAgICAgICAgICAgbGFiZWwgPSBgJHtsYWJlbH0gfCAke3Jlc3VsdC5jYW5kaWRhdGUuZmlyc3ROYW1lfSAke3Jlc3VsdC5jYW5kaWRhdGUubGFzdE5hbWV9IC0gJHtyZXN1bHQuam9iT3JkZXIudGl0bGV9YC50cmltKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5qb2JPcmRlcikge1xuICAgICAgICAgICAgICBsYWJlbCA9IGAke2xhYmVsfSB8ICR7cmVzdWx0LmpvYk9yZGVyLnRpdGxlfWAudHJpbSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbGFiZWwgPSBgJHtsYWJlbH0gfCAke3Jlc3VsdC5jYW5kaWRhdGUuZmlyc3ROYW1lfSAke3Jlc3VsdC5jYW5kaWRhdGUubGFzdE5hbWV9YC50cmltKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBsYWJlbDtcbiAgICAgICAgY2FzZSAnSm9iU2hpZnQnOlxuICAgICAgICAgIHJldHVybiBgJHtyZXN1bHQuam9iT3JkZXI/LnRpdGxlfSBAICR7cmVzdWx0LmpvYk9yZGVyPy5jbGllbnRDb3Jwb3JhdGlvbj8ubmFtZSB8fCAnJ31gLnRyaW0oKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gYCR7cmVzdWx0Lm5hbWUgfHwgJyd9YC50cmltKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdlbnRpdHktcGlja2VyLXJlc3VsdHMnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxub3ZvLWxpc3QgKm5nSWY9XCJtYXRjaGVzLmxlbmd0aCA+IDBcIiBkaXJlY3Rpb249XCJ2ZXJ0aWNhbFwiPlxuICAgICAgPGVudGl0eS1waWNrZXItcmVzdWx0XG4gICAgICAgICpuZ0Zvcj1cImxldCBtYXRjaCBvZiBtYXRjaGVzXCJcbiAgICAgICAgW21hdGNoXT1cIm1hdGNoXCJcbiAgICAgICAgW3Rlcm1dPVwidGVybVwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInsgYWN0aXZlOiBpc0FjdGl2ZShtYXRjaCkgfVwiXG4gICAgICAgIChjbGljayk9XCJzZWxlY3RNYXRjaCgkZXZlbnQsIG1hdGNoKVwiXG4gICAgICAgIChtb3VzZWVudGVyKT1cInNlbGVjdEFjdGl2ZShtYXRjaClcIlxuICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwicHJlc2VsZWN0ZWQobWF0Y2gpXCJcbiAgICAgID5cbiAgICAgIDwvZW50aXR5LXBpY2tlci1yZXN1bHQ+XG4gICAgICA8bm92by1sb2FkaW5nIHRoZW1lPVwibGluZVwiICpuZ0lmPVwiaXNMb2FkaW5nICYmIG1hdGNoZXMubGVuZ3RoID4gMFwiPjwvbm92by1sb2FkaW5nPlxuICAgIDwvbm92by1saXN0PlxuICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItZXJyb3JcIiAqbmdJZj1cImhhc0Vycm9yXCI+e3sgbGFiZWxzLnBpY2tlckVycm9yIH19PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInBpY2tlci1udWxsLXJlc3VsdHNcIiAqbmdJZj1cImhhc05vbkVycm9yTWVzc2FnZSAmJiB0ZXJtICE9PSAnJ1wiPnt7IGxhYmVscy5waWNrZXJFbXB0eSB9fTwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItbnVsbC1yZXN1bHRzXCIgKm5nSWY9XCJoYXNOb25FcnJvck1lc3NhZ2UgJiYgdGVybSA9PT0gJydcIj57eyBsYWJlbHMucGlja2VyVGV4dEZpZWxkRW1wdHkgfX08L2Rpdj5cbiAgYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1lbnRpdHktcGlja2VyLXJlc3VsdHMnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBFbnRpdHlQaWNrZXJSZXN1bHRzIGV4dGVuZHMgQmFzZVBpY2tlclJlc3VsdHMge1xuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLCBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLCByZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgc3VwZXIoZWxlbWVudCwgcmVmKTtcbiAgfVxuXG4gIGdldCBoYXNOb25FcnJvck1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuICF0aGlzLmlzTG9hZGluZyAmJiAhdGhpcy5tYXRjaGVzLmxlbmd0aCAmJiAhdGhpcy5oYXNFcnJvcjtcbiAgfVxuXG4gIGdldExpc3RFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdub3ZvLWxpc3QnKTtcbiAgfVxuXG4gIHNlbGVjdE1hdGNoKGV2ZW50PzogYW55LCBpdGVtPzogYW55KSB7XG4gICAgdGhpcy5zZWxlY3QubmV4dChpdGVtKTtcbiAgICByZXR1cm4gc3VwZXIuc2VsZWN0TWF0Y2goZXZlbnQsIGl0ZW0pO1xuICB9XG59XG4iXX0=