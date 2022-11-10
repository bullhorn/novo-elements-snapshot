import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { BasePickerResults } from '../base-picker-results/base-picker-results';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "novo-elements/components/list";
import * as i3 from "novo-elements/common";
import * as i4 from "@angular/common";
import * as i5 from "novo-elements/pipes";
import * as i6 from "novo-elements/components/loading";
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
     * @deprecated use highlight pipe
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
                case 'BillingProfile':
                case 'InvoiceTerm':
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
                    return `${result.jobOrder?.title} @ ${result.jobOrder?.clientCorporation?.name || ''}`.trim();
                default:
                    return `${result.name || result.label || ''}`.trim();
            }
        }
        return '';
    }
}
EntityPickerResult.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: EntityPickerResult, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
EntityPickerResult.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: EntityPickerResult, selector: "entity-picker-result", inputs: { match: "match", term: "term" }, outputs: { select: "select" }, ngImport: i0, template: `
    <novo-list-item *ngIf="match.data" (click)="select.next(match.data)">
      <novo-item-header>
        <novo-item-avatar [icon]="getIconForResult(match.data)"></novo-item-avatar>
        <novo-item-title> <span [innerHtml]="getNameForResult(match.data) | highlight: term"></span> </novo-item-title>
      </novo-item-header>
      <novo-item-content direction="horizontal">
        <!-- COMPANY 1 -->
        <novo-text smaller class="company" *ngIf="match.data.companyName || match.data?.clientCorporation?.name">
          <i class="bhi-company company"></i>
          <span [innerHtml]="match.data.companyName || match.data?.clientCorporation?.name | highlight: term"></span>
        </novo-text>
        <!-- CLIENT CONTACT -->
        <novo-text smaller class="contact" *ngIf="match.data?.clientContact?.firstName">
          <i class="bhi-person contact person"></i>
          <span [innerHtml]="match.data.clientContact.firstName + ' ' + match.data.clientContact.lastName | highlight: term"></span>
        </novo-text>
        <!-- CANDIDATE -->
        <novo-text smaller class="candidate" *ngIf="match.data.candidate && match.data.searchEntity === 'Placement'">
          <i class="bhi-candidate candidate"></i>
          <span [innerHtml]="match.data.candidate.firstName + ' ' + match.data.candidate.lastName | highlight: term"></span>
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
          <span [innerHtml]="match.data.jobOrder.title | highlight: term"></span>
        </novo-text>
        <!-- OPENINGS -->
        <novo-text smaller class="openings" *ngIf="match.data.openings && match.data.searchEntity === 'JobShift'">
          <i class="bhi-candidate"></i>
          <span>{{ match.data.numAssigned }} / {{ match.data.openings }}</span>
        </novo-text>
        <!-- EMAIL -->
        <novo-text smaller class="email" *ngIf="match.data.email">
          <i class="bhi-email"></i> <span [innerHtml]="match.data.email | highlight: term"></span>
        </novo-text>
        <!-- PHONE -->
        <novo-text smaller class="phone" *ngIf="match.data.phone">
          <i class="bhi-phone"></i> <span [innerHtml]="match.data.phone | highlight: term"></span>
        </novo-text>
        <!-- ADDRESS -->
        <novo-text smaller class="location" *ngIf="match.data.address && (match.data.address.city || match.data.address.state)">
          <i class="bhi-location"></i> <span *ngIf="match.data.address.city" [innerHtml]="highlight(match.data.address.city, term)"></span>
          <span *ngIf="match.data.address.city && match.data.address.state">, </span>
          <span *ngIf="match.data.address.state" [innerHtml]="match.data.address.state | highlight: term"></span>
        </novo-text>
        <!-- STATUS -->
        <novo-text smaller class="status" *ngIf="match.data.status">
          <i class="bhi-info"></i> <span [innerHtml]="match.data.status | highlight: term"></span>
        </novo-text>
        <!-- OWNER -->
        <novo-text smaller class="owner" *ngIf="match.data.owner && match.data.owner.name && match.data.searchEntity === 'Candidate'">
          <i class="bhi-person"></i> <span [innerHtml]="match.data.owner.name | highlight: term"></span>
        </novo-text>
        <!-- PRIMARY DEPARTMENT -->
        <novo-text
          smaller
          class="primary-department"
          *ngIf="match.data.primaryDepartment && match.data.primaryDepartment.name && match.data.searchEntity === 'CorporateUser'"
        >
          <i class="bhi-department"></i> <span [innerHtml]="match.data.primaryDepartment.name | highlight: term"></span>
        </novo-text>
        <!-- OCCUPATION -->
        <novo-text smaller class="occupation" *ngIf="match.data.occupation && match.data.searchEntity === 'CorporateUser'">
          <i class="bhi-occupation"></i> <span [innerHtml]="match.data.occupation | highlight: term"></span>
        </novo-text>
      </novo-item-content>
    </novo-list-item>
  `, isInline: true, styles: [":host{display:block;color:#000;width:100%;max-width:none;z-index:99;background:var(--color-background);padding:1px}:host.active{border:1px solid var(--color-selection)}:host .novo-list{min-height:100%;background:var(--color-background);max-height:330px;overflow-y:auto;overflow-x:hidden}:host .novo-list .novo-list-item{display:block;transition:background-color .25s;border-bottom:var(--border-main);cursor:pointer}:host .novo-list .novo-list-item.disabled{opacity:.5;pointer-events:none}:host .novo-list .novo-list-item item-title h6{font-weight:500;padding:.6em 0 .5em}:host .novo-list .novo-list-item item-title h6 span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:100px;width:80%;display:block}:host .novo-list .novo-list-item>div{width:100%;margin-left:15px}:host .novo-list .novo-list-item.active{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item:hover{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item item-content{flex-flow:row nowrap;justify-content:space-between}:host .novo-list .novo-list-item item-content>*{flex:0 0 60%;white-space:nowrap}:host .novo-list .novo-list-item item-content p{margin-right:.5em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1}:host .novo-list .novo-list-item item-content p .label{font-weight:700}:host .novo-list novo-loading{justify-content:center}:host .picker-null,:host .picker-error,:host .picker-loading,:host .picker-no-recents{text-align:center;padding:1em 0 4em}:host .picker-null>i,:host .picker-error>i,:host .picker-loading>i,:host .picker-no-recents>i{font-size:3em;margin:.5em;color:#0000004d}:host .picker-null>h4,:host .picker-null>p,:host .picker-error>h4,:host .picker-error>p,:host .picker-loading>h4,:host .picker-loading>p,:host .picker-no-recents>h4,:host .picker-no-recents>p{margin:0;max-width:none;padding:0}:host .picker-null>h4,:host .picker-error>h4,:host .picker-loading>h4,:host .picker-no-recents>h4{font-weight:500}:host section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}\n"], components: [{ type: i2.NovoListItemElement, selector: "novo-list-item, [list-item]" }, { type: i2.NovoItemHeaderElement, selector: "item-header, novo-item-header" }, { type: i2.NovoItemAvatarElement, selector: "item-avatar, novo-item-avatar", inputs: ["icon", "color"] }, { type: i2.NovoItemTitleElement, selector: "item-title, novo-item-title" }, { type: i2.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }, { type: i3.NovoText, selector: "novo-text,[novo-text]", inputs: ["block"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "highlight": i5.HighlightPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: EntityPickerResult, decorators: [{
            type: Component,
            args: [{ selector: 'entity-picker-result', template: `
    <novo-list-item *ngIf="match.data" (click)="select.next(match.data)">
      <novo-item-header>
        <novo-item-avatar [icon]="getIconForResult(match.data)"></novo-item-avatar>
        <novo-item-title> <span [innerHtml]="getNameForResult(match.data) | highlight: term"></span> </novo-item-title>
      </novo-item-header>
      <novo-item-content direction="horizontal">
        <!-- COMPANY 1 -->
        <novo-text smaller class="company" *ngIf="match.data.companyName || match.data?.clientCorporation?.name">
          <i class="bhi-company company"></i>
          <span [innerHtml]="match.data.companyName || match.data?.clientCorporation?.name | highlight: term"></span>
        </novo-text>
        <!-- CLIENT CONTACT -->
        <novo-text smaller class="contact" *ngIf="match.data?.clientContact?.firstName">
          <i class="bhi-person contact person"></i>
          <span [innerHtml]="match.data.clientContact.firstName + ' ' + match.data.clientContact.lastName | highlight: term"></span>
        </novo-text>
        <!-- CANDIDATE -->
        <novo-text smaller class="candidate" *ngIf="match.data.candidate && match.data.searchEntity === 'Placement'">
          <i class="bhi-candidate candidate"></i>
          <span [innerHtml]="match.data.candidate.firstName + ' ' + match.data.candidate.lastName | highlight: term"></span>
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
          <span [innerHtml]="match.data.jobOrder.title | highlight: term"></span>
        </novo-text>
        <!-- OPENINGS -->
        <novo-text smaller class="openings" *ngIf="match.data.openings && match.data.searchEntity === 'JobShift'">
          <i class="bhi-candidate"></i>
          <span>{{ match.data.numAssigned }} / {{ match.data.openings }}</span>
        </novo-text>
        <!-- EMAIL -->
        <novo-text smaller class="email" *ngIf="match.data.email">
          <i class="bhi-email"></i> <span [innerHtml]="match.data.email | highlight: term"></span>
        </novo-text>
        <!-- PHONE -->
        <novo-text smaller class="phone" *ngIf="match.data.phone">
          <i class="bhi-phone"></i> <span [innerHtml]="match.data.phone | highlight: term"></span>
        </novo-text>
        <!-- ADDRESS -->
        <novo-text smaller class="location" *ngIf="match.data.address && (match.data.address.city || match.data.address.state)">
          <i class="bhi-location"></i> <span *ngIf="match.data.address.city" [innerHtml]="highlight(match.data.address.city, term)"></span>
          <span *ngIf="match.data.address.city && match.data.address.state">, </span>
          <span *ngIf="match.data.address.state" [innerHtml]="match.data.address.state | highlight: term"></span>
        </novo-text>
        <!-- STATUS -->
        <novo-text smaller class="status" *ngIf="match.data.status">
          <i class="bhi-info"></i> <span [innerHtml]="match.data.status | highlight: term"></span>
        </novo-text>
        <!-- OWNER -->
        <novo-text smaller class="owner" *ngIf="match.data.owner && match.data.owner.name && match.data.searchEntity === 'Candidate'">
          <i class="bhi-person"></i> <span [innerHtml]="match.data.owner.name | highlight: term"></span>
        </novo-text>
        <!-- PRIMARY DEPARTMENT -->
        <novo-text
          smaller
          class="primary-department"
          *ngIf="match.data.primaryDepartment && match.data.primaryDepartment.name && match.data.searchEntity === 'CorporateUser'"
        >
          <i class="bhi-department"></i> <span [innerHtml]="match.data.primaryDepartment.name | highlight: term"></span>
        </novo-text>
        <!-- OCCUPATION -->
        <novo-text smaller class="occupation" *ngIf="match.data.occupation && match.data.searchEntity === 'CorporateUser'">
          <i class="bhi-occupation"></i> <span [innerHtml]="match.data.occupation | highlight: term"></span>
        </novo-text>
      </novo-item-content>
    </novo-list-item>
  `, styles: [":host{display:block;color:#000;width:100%;max-width:none;z-index:99;background:var(--color-background);padding:1px}:host.active{border:1px solid var(--color-selection)}:host .novo-list{min-height:100%;background:var(--color-background);max-height:330px;overflow-y:auto;overflow-x:hidden}:host .novo-list .novo-list-item{display:block;transition:background-color .25s;border-bottom:var(--border-main);cursor:pointer}:host .novo-list .novo-list-item.disabled{opacity:.5;pointer-events:none}:host .novo-list .novo-list-item item-title h6{font-weight:500;padding:.6em 0 .5em}:host .novo-list .novo-list-item item-title h6 span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:100px;width:80%;display:block}:host .novo-list .novo-list-item>div{width:100%;margin-left:15px}:host .novo-list .novo-list-item.active{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item:hover{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item item-content{flex-flow:row nowrap;justify-content:space-between}:host .novo-list .novo-list-item item-content>*{flex:0 0 60%;white-space:nowrap}:host .novo-list .novo-list-item item-content p{margin-right:.5em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1}:host .novo-list .novo-list-item item-content p .label{font-weight:700}:host .novo-list novo-loading{justify-content:center}:host .picker-null,:host .picker-error,:host .picker-loading,:host .picker-no-recents{text-align:center;padding:1em 0 4em}:host .picker-null>i,:host .picker-error>i,:host .picker-loading>i,:host .picker-no-recents>i{font-size:3em;margin:.5em;color:#0000004d}:host .picker-null>h4,:host .picker-null>p,:host .picker-error>h4,:host .picker-error>p,:host .picker-loading>h4,:host .picker-loading>p,:host .picker-no-recents>h4,:host .picker-no-recents>p{margin:0;max-width:none;padding:0}:host .picker-null>h4,:host .picker-error>h4,:host .picker-loading>h4,:host .picker-no-recents>h4{font-weight:500}:host section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }]; }, propDecorators: { match: [{
                type: Input
            }], term: [{
                type: Input
            }], select: [{
                type: Output
            }] } });
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
EntityPickerResults.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: EntityPickerResults, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
EntityPickerResults.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: EntityPickerResults, selector: "entity-picker-results", outputs: { select: "select" }, host: { classAttribute: "novo-entity-picker-results" }, usesInheritance: true, ngImport: i0, template: `
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
  `, isInline: true, components: [{ type: i2.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { type: EntityPickerResult, selector: "entity-picker-result", inputs: ["match", "term"], outputs: ["select"] }, { type: i6.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i3.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: EntityPickerResults, decorators: [{
            type: Component,
            args: [{
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
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { select: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LXBpY2tlci1yZXN1bHRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9waWNrZXIvZXh0cmFzL2VudGl0eS1waWNrZXItcmVzdWx0cy9lbnRpdHktcGlja2VyLXJlc3VsdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNENBQTRDLENBQUM7Ozs7Ozs7O0FBMEYvRSxNQUFNLE9BQU8sa0JBQWtCO0lBSzdCLFlBQW1CLE1BQXdCO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBRmpDLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUVYLENBQUM7SUFFL0M7OztPQUdHO0lBQ0gsWUFBWSxDQUFDLGFBQWE7UUFDeEIsa0RBQWtEO1FBQ2xELE9BQU8sYUFBYSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxTQUFTLENBQUMsS0FBSyxFQUFFLEtBQUs7UUFDcEIsOEVBQThFO1FBQzlFLE9BQU8sS0FBSyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUMxSCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsTUFBWTtRQUMz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bEIsbUJBQW1CO2tCQXhCL0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJUO29CQUNELElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsNEJBQTRCO3FCQUNwQztpQkFDRjtnS0FFVyxNQUFNO3NCQUFmLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcbmltcG9ydCB7IEJhc2VQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi4vYmFzZS1waWNrZXItcmVzdWx0cy9iYXNlLXBpY2tlci1yZXN1bHRzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZW50aXR5LXBpY2tlci1yZXN1bHQnLFxuICBzdHlsZVVybHM6IFsnLi4vcGlja2VyLXJlc3VsdHMvcGlja2VyLXJlc3VsdHMuc2NzcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxub3ZvLWxpc3QtaXRlbSAqbmdJZj1cIm1hdGNoLmRhdGFcIiAoY2xpY2spPVwic2VsZWN0Lm5leHQobWF0Y2guZGF0YSlcIj5cbiAgICAgIDxub3ZvLWl0ZW0taGVhZGVyPlxuICAgICAgICA8bm92by1pdGVtLWF2YXRhciBbaWNvbl09XCJnZXRJY29uRm9yUmVzdWx0KG1hdGNoLmRhdGEpXCI+PC9ub3ZvLWl0ZW0tYXZhdGFyPlxuICAgICAgICA8bm92by1pdGVtLXRpdGxlPiA8c3BhbiBbaW5uZXJIdG1sXT1cImdldE5hbWVGb3JSZXN1bHQobWF0Y2guZGF0YSkgfCBoaWdobGlnaHQ6IHRlcm1cIj48L3NwYW4+IDwvbm92by1pdGVtLXRpdGxlPlxuICAgICAgPC9ub3ZvLWl0ZW0taGVhZGVyPlxuICAgICAgPG5vdm8taXRlbS1jb250ZW50IGRpcmVjdGlvbj1cImhvcml6b250YWxcIj5cbiAgICAgICAgPCEtLSBDT01QQU5ZIDEgLS0+XG4gICAgICAgIDxub3ZvLXRleHQgc21hbGxlciBjbGFzcz1cImNvbXBhbnlcIiAqbmdJZj1cIm1hdGNoLmRhdGEuY29tcGFueU5hbWUgfHwgbWF0Y2guZGF0YT8uY2xpZW50Q29ycG9yYXRpb24/Lm5hbWVcIj5cbiAgICAgICAgICA8aSBjbGFzcz1cImJoaS1jb21wYW55IGNvbXBhbnlcIj48L2k+XG4gICAgICAgICAgPHNwYW4gW2lubmVySHRtbF09XCJtYXRjaC5kYXRhLmNvbXBhbnlOYW1lIHx8IG1hdGNoLmRhdGE/LmNsaWVudENvcnBvcmF0aW9uPy5uYW1lIHwgaGlnaGxpZ2h0OiB0ZXJtXCI+PC9zcGFuPlxuICAgICAgICA8L25vdm8tdGV4dD5cbiAgICAgICAgPCEtLSBDTElFTlQgQ09OVEFDVCAtLT5cbiAgICAgICAgPG5vdm8tdGV4dCBzbWFsbGVyIGNsYXNzPVwiY29udGFjdFwiICpuZ0lmPVwibWF0Y2guZGF0YT8uY2xpZW50Q29udGFjdD8uZmlyc3ROYW1lXCI+XG4gICAgICAgICAgPGkgY2xhc3M9XCJiaGktcGVyc29uIGNvbnRhY3QgcGVyc29uXCI+PC9pPlxuICAgICAgICAgIDxzcGFuIFtpbm5lckh0bWxdPVwibWF0Y2guZGF0YS5jbGllbnRDb250YWN0LmZpcnN0TmFtZSArICcgJyArIG1hdGNoLmRhdGEuY2xpZW50Q29udGFjdC5sYXN0TmFtZSB8IGhpZ2hsaWdodDogdGVybVwiPjwvc3Bhbj5cbiAgICAgICAgPC9ub3ZvLXRleHQ+XG4gICAgICAgIDwhLS0gQ0FORElEQVRFIC0tPlxuICAgICAgICA8bm92by10ZXh0IHNtYWxsZXIgY2xhc3M9XCJjYW5kaWRhdGVcIiAqbmdJZj1cIm1hdGNoLmRhdGEuY2FuZGlkYXRlICYmIG1hdGNoLmRhdGEuc2VhcmNoRW50aXR5ID09PSAnUGxhY2VtZW50J1wiPlxuICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLWNhbmRpZGF0ZSBjYW5kaWRhdGVcIj48L2k+XG4gICAgICAgICAgPHNwYW4gW2lubmVySHRtbF09XCJtYXRjaC5kYXRhLmNhbmRpZGF0ZS5maXJzdE5hbWUgKyAnICcgKyBtYXRjaC5kYXRhLmNhbmRpZGF0ZS5sYXN0TmFtZSB8IGhpZ2hsaWdodDogdGVybVwiPjwvc3Bhbj5cbiAgICAgICAgPC9ub3ZvLXRleHQ+XG4gICAgICAgIDwhLS0gU1RBUlQgJiBFTkQgREFURSAtLT5cbiAgICAgICAgPG5vdm8tdGV4dCBzbWFsbGVyIGNsYXNzPVwic3RhcnQtZGF0ZVwiICpuZ0lmPVwibWF0Y2guZGF0YS5kYXRlQmVnaW4gJiYgbWF0Y2guZGF0YS5zZWFyY2hFbnRpdHkgPT09ICdQbGFjZW1lbnQnXCI+XG4gICAgICAgICAgPGkgY2xhc3M9XCJiaGktY2FsZW5kYXJcIj48L2k+XG4gICAgICAgICAgPHNwYW4gW2lubmVySHRtbF09XCJyZW5kZXJUaW1lc3RhbXAobWF0Y2guZGF0YS5kYXRlQmVnaW4pICsgJyAtICcgKyByZW5kZXJUaW1lc3RhbXAobWF0Y2guZGF0YS5kYXRlRW5kKVwiPjwvc3Bhbj5cbiAgICAgICAgPC9ub3ZvLXRleHQ+XG4gICAgICAgIDwhLS0gU1RBUlQgRGF0ZSAtLT5cbiAgICAgICAgPG5vdm8tdGV4dCBzbWFsbGVyIGNsYXNzPVwic3RhcnQtZGF0ZVwiICpuZ0lmPVwibWF0Y2guZGF0YS5zdGFydFRpbWUgJiYgbWF0Y2guZGF0YS5zZWFyY2hFbnRpdHkgPT09ICdKb2JTaGlmdCdcIj5cbiAgICAgICAgICA8aSBjbGFzcz1cImJoaS1jYWxlbmRhclwiPjwvaT5cbiAgICAgICAgICA8c3BhbiBbaW5uZXJIdG1sXT1cInJlbmRlclRpbWVzdGFtcChtYXRjaC5kYXRhLnN0YXJ0VGltZSlcIj48L3NwYW4+XG4gICAgICAgIDwvbm92by10ZXh0PlxuICAgICAgICA8IS0tIFNUQVJUICYgRU5EIFRJTUUgLS0+XG4gICAgICAgIDxub3ZvLXRleHQgc21hbGxlciBjbGFzcz1cInN0YXJ0LXRpbWVcIiAqbmdJZj1cIm1hdGNoLmRhdGEuc3RhcnRUaW1lICYmIG1hdGNoLmRhdGEuc2VhcmNoRW50aXR5ID09PSAnSm9iU2hpZnQnXCI+XG4gICAgICAgICAgPGkgY2xhc3M9XCJiaGktY2xvY2tcIj48L2k+XG4gICAgICAgICAgPHNwYW4gW2lubmVySHRtbF09XCJyZW5kZXJUaW1lTm9PZmZzZXQobWF0Y2guZGF0YS5zdGFydFRpbWUpICsgJyAtICcgKyByZW5kZXJUaW1lTm9PZmZzZXQobWF0Y2guZGF0YS5lbmRUaW1lKVwiPjwvc3Bhbj5cbiAgICAgICAgPC9ub3ZvLXRleHQ+XG4gICAgICAgIDwhLS0gSk9CT1JERVIgLS0+XG4gICAgICAgIDxub3ZvLXRleHQgc21hbGxlciBjbGFzcz1cImpvYlwiICpuZ0lmPVwibWF0Y2guZGF0YS5qb2JPcmRlciAmJiBtYXRjaC5kYXRhLnNlYXJjaEVudGl0eSA9PT0gJ0pvYlNoaWZ0J1wiPlxuICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLWpvYiBqb2JcIj48L2k+XG4gICAgICAgICAgPHNwYW4gW2lubmVySHRtbF09XCJtYXRjaC5kYXRhLmpvYk9yZGVyLnRpdGxlIHwgaGlnaGxpZ2h0OiB0ZXJtXCI+PC9zcGFuPlxuICAgICAgICA8L25vdm8tdGV4dD5cbiAgICAgICAgPCEtLSBPUEVOSU5HUyAtLT5cbiAgICAgICAgPG5vdm8tdGV4dCBzbWFsbGVyIGNsYXNzPVwib3BlbmluZ3NcIiAqbmdJZj1cIm1hdGNoLmRhdGEub3BlbmluZ3MgJiYgbWF0Y2guZGF0YS5zZWFyY2hFbnRpdHkgPT09ICdKb2JTaGlmdCdcIj5cbiAgICAgICAgICA8aSBjbGFzcz1cImJoaS1jYW5kaWRhdGVcIj48L2k+XG4gICAgICAgICAgPHNwYW4+e3sgbWF0Y2guZGF0YS5udW1Bc3NpZ25lZCB9fSAvIHt7IG1hdGNoLmRhdGEub3BlbmluZ3MgfX08L3NwYW4+XG4gICAgICAgIDwvbm92by10ZXh0PlxuICAgICAgICA8IS0tIEVNQUlMIC0tPlxuICAgICAgICA8bm92by10ZXh0IHNtYWxsZXIgY2xhc3M9XCJlbWFpbFwiICpuZ0lmPVwibWF0Y2guZGF0YS5lbWFpbFwiPlxuICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLWVtYWlsXCI+PC9pPiA8c3BhbiBbaW5uZXJIdG1sXT1cIm1hdGNoLmRhdGEuZW1haWwgfCBoaWdobGlnaHQ6IHRlcm1cIj48L3NwYW4+XG4gICAgICAgIDwvbm92by10ZXh0PlxuICAgICAgICA8IS0tIFBIT05FIC0tPlxuICAgICAgICA8bm92by10ZXh0IHNtYWxsZXIgY2xhc3M9XCJwaG9uZVwiICpuZ0lmPVwibWF0Y2guZGF0YS5waG9uZVwiPlxuICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLXBob25lXCI+PC9pPiA8c3BhbiBbaW5uZXJIdG1sXT1cIm1hdGNoLmRhdGEucGhvbmUgfCBoaWdobGlnaHQ6IHRlcm1cIj48L3NwYW4+XG4gICAgICAgIDwvbm92by10ZXh0PlxuICAgICAgICA8IS0tIEFERFJFU1MgLS0+XG4gICAgICAgIDxub3ZvLXRleHQgc21hbGxlciBjbGFzcz1cImxvY2F0aW9uXCIgKm5nSWY9XCJtYXRjaC5kYXRhLmFkZHJlc3MgJiYgKG1hdGNoLmRhdGEuYWRkcmVzcy5jaXR5IHx8IG1hdGNoLmRhdGEuYWRkcmVzcy5zdGF0ZSlcIj5cbiAgICAgICAgICA8aSBjbGFzcz1cImJoaS1sb2NhdGlvblwiPjwvaT4gPHNwYW4gKm5nSWY9XCJtYXRjaC5kYXRhLmFkZHJlc3MuY2l0eVwiIFtpbm5lckh0bWxdPVwiaGlnaGxpZ2h0KG1hdGNoLmRhdGEuYWRkcmVzcy5jaXR5LCB0ZXJtKVwiPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiAqbmdJZj1cIm1hdGNoLmRhdGEuYWRkcmVzcy5jaXR5ICYmIG1hdGNoLmRhdGEuYWRkcmVzcy5zdGF0ZVwiPiwgPC9zcGFuPlxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwibWF0Y2guZGF0YS5hZGRyZXNzLnN0YXRlXCIgW2lubmVySHRtbF09XCJtYXRjaC5kYXRhLmFkZHJlc3Muc3RhdGUgfCBoaWdobGlnaHQ6IHRlcm1cIj48L3NwYW4+XG4gICAgICAgIDwvbm92by10ZXh0PlxuICAgICAgICA8IS0tIFNUQVRVUyAtLT5cbiAgICAgICAgPG5vdm8tdGV4dCBzbWFsbGVyIGNsYXNzPVwic3RhdHVzXCIgKm5nSWY9XCJtYXRjaC5kYXRhLnN0YXR1c1wiPlxuICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLWluZm9cIj48L2k+IDxzcGFuIFtpbm5lckh0bWxdPVwibWF0Y2guZGF0YS5zdGF0dXMgfCBoaWdobGlnaHQ6IHRlcm1cIj48L3NwYW4+XG4gICAgICAgIDwvbm92by10ZXh0PlxuICAgICAgICA8IS0tIE9XTkVSIC0tPlxuICAgICAgICA8bm92by10ZXh0IHNtYWxsZXIgY2xhc3M9XCJvd25lclwiICpuZ0lmPVwibWF0Y2guZGF0YS5vd25lciAmJiBtYXRjaC5kYXRhLm93bmVyLm5hbWUgJiYgbWF0Y2guZGF0YS5zZWFyY2hFbnRpdHkgPT09ICdDYW5kaWRhdGUnXCI+XG4gICAgICAgICAgPGkgY2xhc3M9XCJiaGktcGVyc29uXCI+PC9pPiA8c3BhbiBbaW5uZXJIdG1sXT1cIm1hdGNoLmRhdGEub3duZXIubmFtZSB8IGhpZ2hsaWdodDogdGVybVwiPjwvc3Bhbj5cbiAgICAgICAgPC9ub3ZvLXRleHQ+XG4gICAgICAgIDwhLS0gUFJJTUFSWSBERVBBUlRNRU5UIC0tPlxuICAgICAgICA8bm92by10ZXh0XG4gICAgICAgICAgc21hbGxlclxuICAgICAgICAgIGNsYXNzPVwicHJpbWFyeS1kZXBhcnRtZW50XCJcbiAgICAgICAgICAqbmdJZj1cIm1hdGNoLmRhdGEucHJpbWFyeURlcGFydG1lbnQgJiYgbWF0Y2guZGF0YS5wcmltYXJ5RGVwYXJ0bWVudC5uYW1lICYmIG1hdGNoLmRhdGEuc2VhcmNoRW50aXR5ID09PSAnQ29ycG9yYXRlVXNlcidcIlxuICAgICAgICA+XG4gICAgICAgICAgPGkgY2xhc3M9XCJiaGktZGVwYXJ0bWVudFwiPjwvaT4gPHNwYW4gW2lubmVySHRtbF09XCJtYXRjaC5kYXRhLnByaW1hcnlEZXBhcnRtZW50Lm5hbWUgfCBoaWdobGlnaHQ6IHRlcm1cIj48L3NwYW4+XG4gICAgICAgIDwvbm92by10ZXh0PlxuICAgICAgICA8IS0tIE9DQ1VQQVRJT04gLS0+XG4gICAgICAgIDxub3ZvLXRleHQgc21hbGxlciBjbGFzcz1cIm9jY3VwYXRpb25cIiAqbmdJZj1cIm1hdGNoLmRhdGEub2NjdXBhdGlvbiAmJiBtYXRjaC5kYXRhLnNlYXJjaEVudGl0eSA9PT0gJ0NvcnBvcmF0ZVVzZXInXCI+XG4gICAgICAgICAgPGkgY2xhc3M9XCJiaGktb2NjdXBhdGlvblwiPjwvaT4gPHNwYW4gW2lubmVySHRtbF09XCJtYXRjaC5kYXRhLm9jY3VwYXRpb24gfCBoaWdobGlnaHQ6IHRlcm1cIj48L3NwYW4+XG4gICAgICAgIDwvbm92by10ZXh0PlxuICAgICAgPC9ub3ZvLWl0ZW0tY29udGVudD5cbiAgICA8L25vdm8tbGlzdC1pdGVtPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBFbnRpdHlQaWNrZXJSZXN1bHQge1xuICBASW5wdXQoKSBtYXRjaDogYW55O1xuICBASW5wdXQoKSB0ZXJtOiBhbnk7XG4gIEBPdXRwdXQoKSBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHt9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIGNhcHR1cmVzIHRoZSB3aG9sZSBxdWVyeSBzdHJpbmcgYW5kIHJlcGxhY2UgaXQgd2l0aCB0aGUgc3RyaW5nIHRoYXQgd2lsbCBiZSB1c2VkIHRvXG4gICAqIG1hdGNoLlxuICAgKi9cbiAgZXNjYXBlUmVnZXhwKHF1ZXJ5VG9Fc2NhcGUpIHtcbiAgICAvLyBFeDogaWYgdGhlIGNhcHR1cmUgaXMgXCJhXCIgdGhlIHJlc3VsdCB3aWxsIGJlIFxcYVxuICAgIHJldHVybiBxdWVyeVRvRXNjYXBlLnJlcGxhY2UoLyhbLj8qK14kW1xcXVxcXFwoKXt9fC1dKS9nLCAnXFxcXCQxJyk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgdXNlIGhpZ2hsaWdodCBwaXBlXG4gICAqL1xuICBoaWdobGlnaHQobWF0Y2gsIHF1ZXJ5KSB7XG4gICAgLy8gUmVwbGFjZXMgdGhlIGNhcHR1cmUgc3RyaW5nIHdpdGggYSB0aGUgc2FtZSBzdHJpbmcgaW5zaWRlIG9mIGEgXCJzdHJvbmdcIiB0YWdcbiAgICByZXR1cm4gcXVlcnkgJiYgbWF0Y2ggPyBtYXRjaC5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy5lc2NhcGVSZWdleHAocXVlcnkudHJpbSgpKSwgJ2dpJyksICc8c3Ryb25nPiQmPC9zdHJvbmc+JykgOiBtYXRjaDtcbiAgfVxuXG4gIGdldEljb25Gb3JSZXN1bHQocmVzdWx0PzogYW55KTogc3RyaW5nIHtcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICBzd2l0Y2ggKHJlc3VsdC5zZWFyY2hFbnRpdHkpIHtcbiAgICAgICAgY2FzZSAnQ2xpZW50Q29udGFjdCc6XG4gICAgICAgICAgcmV0dXJuICdwZXJzb24gY29udGFjdCc7XG4gICAgICAgIGNhc2UgJ0NsaWVudENvcnBvcmF0aW9uJzpcbiAgICAgICAgICByZXR1cm4gJ2NvbXBhbnknO1xuICAgICAgICBjYXNlICdPcHBvcnR1bml0eSc6XG4gICAgICAgICAgcmV0dXJuICdvcHBvcnR1bml0eSc7XG4gICAgICAgIGNhc2UgJ0NhbmRpZGF0ZSc6XG4gICAgICAgICAgcmV0dXJuICdjYW5kaWRhdGUnO1xuICAgICAgICBjYXNlICdMZWFkJzpcbiAgICAgICAgICByZXR1cm4gJ2xlYWQnO1xuICAgICAgICBjYXNlICdKb2JPcmRlcic6XG4gICAgICAgICAgcmV0dXJuICdqb2InO1xuICAgICAgICBjYXNlICdQbGFjZW1lbnQnOlxuICAgICAgICAgIHJldHVybiAnc3RhciBwbGFjZW1lbnQnO1xuICAgICAgICBjYXNlICdDb3Jwb3JhdGVVc2VyJzpcbiAgICAgICAgICByZXR1cm4gJ3VzZXInO1xuICAgICAgICBjYXNlICdDb3Jwb3JhdGlvbkRlcGFydG1lbnQnOlxuICAgICAgICAgIHJldHVybiAnZGVwYXJ0bWVudCc7XG4gICAgICAgIGNhc2UgJ0pvYlNoaWZ0JzpcbiAgICAgICAgICByZXR1cm4gJ3RpbWV0YWJsZSBjb250cmFjdCc7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICByZW5kZXJUaW1lc3RhbXAoZGF0ZT86IGFueSkge1xuICAgIGxldCB0aW1lc3RhbXAgPSAnJztcbiAgICBpZiAoZGF0ZSkge1xuICAgICAgdGltZXN0YW1wID0gdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQoZGF0ZSwgeyB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbnVtZXJpYycsIGRheTogJ251bWVyaWMnIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGltZXN0YW1wO1xuICB9XG5cbiAgcmVuZGVyVGltZShkYXRlU3RyPzogc3RyaW5nKSB7XG4gICAgbGV0IHRpbWVzdGFtcCA9ICcnO1xuICAgIGlmIChkYXRlU3RyKSB7XG4gICAgICB0aW1lc3RhbXAgPSB0aGlzLmxhYmVscy5mb3JtYXRUaW1lKG5ldyBEYXRlKGRhdGVTdHIpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRpbWVzdGFtcDtcbiAgfVxuXG4gIHJlbmRlclRpbWVOb09mZnNldChkYXRlU3RyPzogc3RyaW5nKSB7XG4gICAgbGV0IHRpbWVzdGFtcCA9ICcnO1xuICAgIGlmIChkYXRlU3RyKSB7XG4gICAgICBkYXRlU3RyID0gZGF0ZVN0ci5zbGljZSgwLCAxOSk7XG4gICAgICB0aW1lc3RhbXAgPSB0aGlzLmxhYmVscy5mb3JtYXRUaW1lKGRhdGVTdHIpO1xuICAgIH1cbiAgICByZXR1cm4gdGltZXN0YW1wO1xuICB9XG5cbiAgZ2V0TmFtZUZvclJlc3VsdChyZXN1bHQ/OiBhbnkpIHtcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICBzd2l0Y2ggKHJlc3VsdC5zZWFyY2hFbnRpdHkpIHtcbiAgICAgICAgY2FzZSAnTGVhZCc6XG4gICAgICAgIGNhc2UgJ0NvcnBvcmF0ZVVzZXInOlxuICAgICAgICBjYXNlICdDbGllbnRDb250YWN0JzpcbiAgICAgICAgY2FzZSAnQ2FuZGlkYXRlJzpcbiAgICAgICAgY2FzZSAnUGVyc29uJzpcbiAgICAgICAgICBpZiAoJ2ZpcnN0TmFtZScgaW4gcmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7cmVzdWx0LmZpcnN0TmFtZX0gJHtyZXN1bHQubGFzdE5hbWV9YC50cmltKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBgJHtyZXN1bHQubmFtZSB8fCAnJ31gLnRyaW0oKTtcbiAgICAgICAgY2FzZSAnQ2xpZW50Q29ycG9yYXRpb24nOlxuICAgICAgICAgIHJldHVybiBgJHtyZXN1bHQubmFtZSB8fCAnJ31gLnRyaW0oKTtcbiAgICAgICAgY2FzZSAnT3Bwb3J0dW5pdHknOlxuICAgICAgICBjYXNlICdKb2JPcmRlcic6XG4gICAgICAgIGNhc2UgJ0JpbGxpbmdQcm9maWxlJzpcbiAgICAgICAgY2FzZSAnSW52b2ljZVRlcm0nOlxuICAgICAgICAgIHJldHVybiBgJHtyZXN1bHQuaWR9IHwgJHtyZXN1bHQudGl0bGUgfHwgJyd9YC50cmltKCk7XG4gICAgICAgIGNhc2UgJ1BsYWNlbWVudCc6XG4gICAgICAgICAgbGV0IGxhYmVsID0gYCR7cmVzdWx0LmlkfWA7XG4gICAgICAgICAgaWYgKHJlc3VsdC5jYW5kaWRhdGUgfHwgcmVzdWx0LmpvYk9yZGVyKSB7XG4gICAgICAgICAgICBpZiAocmVzdWx0LmNhbmRpZGF0ZSAmJiByZXN1bHQuam9iT3JkZXIpIHtcbiAgICAgICAgICAgICAgbGFiZWwgPSBgJHtsYWJlbH0gfCAke3Jlc3VsdC5jYW5kaWRhdGUuZmlyc3ROYW1lfSAke3Jlc3VsdC5jYW5kaWRhdGUubGFzdE5hbWV9IC0gJHtyZXN1bHQuam9iT3JkZXIudGl0bGV9YC50cmltKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5qb2JPcmRlcikge1xuICAgICAgICAgICAgICBsYWJlbCA9IGAke2xhYmVsfSB8ICR7cmVzdWx0LmpvYk9yZGVyLnRpdGxlfWAudHJpbSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbGFiZWwgPSBgJHtsYWJlbH0gfCAke3Jlc3VsdC5jYW5kaWRhdGUuZmlyc3ROYW1lfSAke3Jlc3VsdC5jYW5kaWRhdGUubGFzdE5hbWV9YC50cmltKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBsYWJlbDtcbiAgICAgICAgY2FzZSAnSm9iU2hpZnQnOlxuICAgICAgICAgIHJldHVybiBgJHtyZXN1bHQuam9iT3JkZXI/LnRpdGxlfSBAICR7cmVzdWx0LmpvYk9yZGVyPy5jbGllbnRDb3Jwb3JhdGlvbj8ubmFtZSB8fCAnJ31gLnRyaW0oKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gYCR7cmVzdWx0Lm5hbWUgfHwgcmVzdWx0LmxhYmVsIHx8ICcnfWAudHJpbSgpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZW50aXR5LXBpY2tlci1yZXN1bHRzJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bm92by1saXN0ICpuZ0lmPVwibWF0Y2hlcy5sZW5ndGggPiAwXCIgZGlyZWN0aW9uPVwidmVydGljYWxcIj5cbiAgICAgIDxlbnRpdHktcGlja2VyLXJlc3VsdFxuICAgICAgICAqbmdGb3I9XCJsZXQgbWF0Y2ggb2YgbWF0Y2hlc1wiXG4gICAgICAgIFttYXRjaF09XCJtYXRjaFwiXG4gICAgICAgIFt0ZXJtXT1cInRlcm1cIlxuICAgICAgICBbbmdDbGFzc109XCJ7IGFjdGl2ZTogaXNBY3RpdmUobWF0Y2gpIH1cIlxuICAgICAgICAoY2xpY2spPVwic2VsZWN0TWF0Y2goJGV2ZW50LCBtYXRjaClcIlxuICAgICAgICAobW91c2VlbnRlcik9XCJzZWxlY3RBY3RpdmUobWF0Y2gpXCJcbiAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cInByZXNlbGVjdGVkKG1hdGNoKVwiXG4gICAgICA+XG4gICAgICA8L2VudGl0eS1waWNrZXItcmVzdWx0PlxuICAgICAgPG5vdm8tbG9hZGluZyB0aGVtZT1cImxpbmVcIiAqbmdJZj1cImlzTG9hZGluZyAmJiBtYXRjaGVzLmxlbmd0aCA+IDBcIj48L25vdm8tbG9hZGluZz5cbiAgICA8L25vdm8tbGlzdD5cbiAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWVycm9yXCIgKm5nSWY9XCJoYXNFcnJvclwiPnt7IGxhYmVscy5waWNrZXJFcnJvciB9fTwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItbnVsbC1yZXN1bHRzXCIgKm5nSWY9XCJoYXNOb25FcnJvck1lc3NhZ2UgJiYgdGVybSAhPT0gJydcIj57eyBsYWJlbHMucGlja2VyRW1wdHkgfX08L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicGlja2VyLW51bGwtcmVzdWx0c1wiICpuZ0lmPVwiaGFzTm9uRXJyb3JNZXNzYWdlICYmIHRlcm0gPT09ICcnXCI+e3sgbGFiZWxzLnBpY2tlclRleHRGaWVsZEVtcHR5IH19PC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tZW50aXR5LXBpY2tlci1yZXN1bHRzJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgRW50aXR5UGlja2VyUmVzdWx0cyBleHRlbmRzIEJhc2VQaWNrZXJSZXN1bHRzIHtcbiAgQE91dHB1dCgpIHNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZiwgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSwgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHN1cGVyKGVsZW1lbnQsIHJlZik7XG4gIH1cblxuICBnZXQgaGFzTm9uRXJyb3JNZXNzYWdlKCkge1xuICAgIHJldHVybiAhdGhpcy5pc0xvYWRpbmcgJiYgIXRoaXMubWF0Y2hlcy5sZW5ndGggJiYgIXRoaXMuaGFzRXJyb3I7XG4gIH1cblxuICBnZXRMaXN0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3Rvcignbm92by1saXN0Jyk7XG4gIH1cblxuICBzZWxlY3RNYXRjaChldmVudD86IGFueSwgaXRlbT86IGFueSkge1xuICAgIHRoaXMuc2VsZWN0Lm5leHQoaXRlbSk7XG4gICAgcmV0dXJuIHN1cGVyLnNlbGVjdE1hdGNoKGV2ZW50LCBpdGVtKTtcbiAgfVxufVxuIl19