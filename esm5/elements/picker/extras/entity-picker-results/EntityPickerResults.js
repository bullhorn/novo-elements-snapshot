/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
// NG2
import { Component, ElementRef, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
// Vendor
// APP
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import { NovoLabelService } from '../../../../services/novo-label-service';
var EntityPickerResult = /** @class */ (function () {
    function EntityPickerResult(labels) {
        this.labels = labels;
    }
    /**
     * @name escapeRegexp
     * @param queryToEscape
     *
     * @description This function captures the whole query string and replace it with the string that will be used to
     * match.
     */
    /**
     * \@name escapeRegexp
     * \@description This function captures the whole query string and replace it with the string that will be used to
     * match.
     * @param {?} queryToEscape
     *
     * @return {?}
     */
    EntityPickerResult.prototype.escapeRegexp = /**
     * \@name escapeRegexp
     * \@description This function captures the whole query string and replace it with the string that will be used to
     * match.
     * @param {?} queryToEscape
     *
     * @return {?}
     */
    function (queryToEscape) {
        // Ex: if the capture is "a" the result will be \a
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    };
    /**
     * @name highlight
     * @param match
     * @param query
     *
     * @description This function should return a <strong>-tag wrapped HTML string.
     */
    /**
     * \@name highlight
     * \@description This function should return a <strong>-tag wrapped HTML string.
     * @param {?} match
     * @param {?} query
     *
     * @return {?}
     */
    EntityPickerResult.prototype.highlight = /**
     * \@name highlight
     * \@description This function should return a <strong>-tag wrapped HTML string.
     * @param {?} match
     * @param {?} query
     *
     * @return {?}
     */
    function (match, query) {
        // Replaces the capture string with a the same string inside of a "strong" tag
        return query && match ? match.replace(new RegExp(this.escapeRegexp(query.trim()), 'gi'), '<strong>$&</strong>') : match;
    };
    /**
     * @param {?=} result
     * @return {?}
     */
    EntityPickerResult.prototype.getIconForResult = /**
     * @param {?=} result
     * @return {?}
     */
    function (result) {
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
                default:
                    return '';
            }
        }
        return '';
    };
    /**
     * @param {?=} date
     * @return {?}
     */
    EntityPickerResult.prototype.renderTimestamp = /**
     * @param {?=} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var timestamp = '';
        if (date) {
            timestamp = this.labels.formatDateWithFormat(date, { year: 'numeric', month: 'numeric', day: 'numeric' });
        }
        return timestamp;
    };
    /**
     * @param {?=} result
     * @return {?}
     */
    EntityPickerResult.prototype.getNameForResult = /**
     * @param {?=} result
     * @return {?}
     */
    function (result) {
        if (result) {
            switch (result.searchEntity) {
                case 'Lead':
                case 'CorporateUser':
                case 'ClientContact':
                case 'Candidate':
                case 'Person':
                    if ('firstName' in result) {
                        return (result.firstName + " " + result.lastName).trim();
                    }
                    return ("" + (result.name || '')).trim();
                case 'ClientCorporation':
                    return ("" + (result.name || '')).trim();
                case 'Opportunity':
                case 'JobOrder':
                    return ("" + (result.title || '')).trim();
                case 'Placement':
                    /** @type {?} */
                    var label = '';
                    if (result.candidate) {
                        label = (result.candidate.firstName + " " + result.candidate.lastName).trim();
                    }
                    if (result.jobOrder) {
                        label = (label + " - " + result.jobOrder.title).trim();
                    }
                    return label;
                default:
                    return ("" + (result.name || '')).trim();
            }
        }
        return '';
    };
    EntityPickerResult.decorators = [
        { type: Component, args: [{
                    selector: 'entity-picker-result',
                    template: "\n        <novo-list-item *ngIf=\"match.data\">\n            <item-header>\n                <item-avatar [icon]=\"getIconForResult(match.data)\"></item-avatar>\n                <item-title>\n                    <span [innerHtml]=\"highlight(getNameForResult(match.data), term)\"></span>\n                </item-title>\n            </item-header>\n            <item-content direction=\"horizontal\">\n                <!-- COMPANY 1 -->\n                <p class=\"company\" *ngIf=\"match.data.companyName || match.data?.clientCorporation?.name\">\n                    <i class=\"bhi-company\"></i>\n                    <span [innerHtml]=\"highlight(match.data.companyName || match.data?.clientCorporation?.name, term)\"></span>\n                </p>\n                <!-- CLIENT CONTACT -->\n                <p class=\"contact\" *ngIf=\"match.data?.clientContact?.firstName\">\n                    <i class=\"bhi-person contact person\"></i>\n                    <span [innerHtml]=\"highlight(match.data.clientContact.firstName + ' ' + match.data.clientContact.lastName, term)\"></span>\n                </p>\n                <!-- CANDIDATE -->\n                <p class=\"candidate\" *ngIf=\"match.data.candidate && match.data.searchEntity === 'Placement'\">\n                    <i class=\"bhi-candidate\"></i>\n                    <span [innerHtml]=\"highlight((match.data.candidate.firstName + ' ' + match.data.candidate.lastName), term)\"></span>\n                </p>\n                <!-- START & END DATE -->\n                <p class=\"start-date\" *ngIf=\"match.data.dateBegin && match.data.searchEntity === 'Placement'\">\n                    <i class=\"bhi-calendar\"></i>\n                    <span [innerHtml]=\"renderTimestamp(match.data.dateBegin) + ' - ' + renderTimestamp(match.data.dateEnd)\"></span>\n                </p>\n                <!-- EMAIL -->\n                <p class=\"email\" *ngIf=\"match.data.email\">\n                    <i class=\"bhi-email\"></i>\n                    <span [innerHtml]=\"highlight(match.data.email, term)\"></span>\n                </p>\n                <!-- PHONE -->\n                <p class=\"phone\" *ngIf=\"match.data.phone\">\n                    <i class=\"bhi-phone\"></i>\n                    <span [innerHtml]=\"highlight(match.data.phone, term)\"></span>\n                </p>\n                <!-- ADDRESS -->\n                <p class=\"location\" *ngIf=\"match.data.address && (match.data.address.city || match.data.address.state)\">\n                    <i class=\"bhi-location\"></i>\n                    <span *ngIf=\"match.data.address.city\" [innerHtml]=\"highlight(match.data.address.city, term)\"></span>\n                    <span *ngIf=\"match.data.address.city && match.data.address.state\">, </span>\n                    <span *ngIf=\"match.data.address.state\" [innerHtml]=\"highlight(match.data.address.state, term)\"></span>\n                </p>\n                <!-- STATUS -->\n                <p class=\"status\" *ngIf=\"match.data.status\">\n                    <i class=\"bhi-info\"></i>\n                    <span [innerHtml]=\"highlight(match.data.status, term)\"></span>\n                </p>\n                <!-- OWNER -->\n                <p class=\"owner\" *ngIf=\"match.data.owner && match.data.owner.name && match.data.searchEntity === 'Candidate'\">\n                    <i class=\"bhi-person\"></i>\n                    <span [innerHtml]=\"highlight(match.data.owner.name, term)\"></span>\n                </p>\n                <!-- PRIMARY DEPARTMENT -->\n                <p class=\"primary-department\" *ngIf=\"match.data.primaryDepartment && match.data.primaryDepartment.name && match.data.searchEntity === 'CorporateUser'\">\n                    <i class=\"bhi-department\"></i>\n                    <span [innerHtml]=\"highlight(match.data.primaryDepartment.name, term)\"></span>\n                </p>\n                <!-- OCCUPATION -->\n                <p class=\"occupation\" *ngIf=\"match.data.occupation && match.data.searchEntity === 'CorporateUser'\">\n                    <i class=\"bhi-occupation\"></i>\n                    <span [innerHtml]=\"highlight(match.data.occupation, term)\"></span>\n                </p>\n            </item-content>\n        </novo-list-item>\n    "
                }] }
    ];
    /** @nocollapse */
    EntityPickerResult.ctorParameters = function () { return [
        { type: NovoLabelService }
    ]; };
    EntityPickerResult.propDecorators = {
        match: [{ type: Input }],
        term: [{ type: Input }]
    };
    return EntityPickerResult;
}());
export { EntityPickerResult };
if (false) {
    /** @type {?} */
    EntityPickerResult.prototype.match;
    /** @type {?} */
    EntityPickerResult.prototype.term;
    /** @type {?} */
    EntityPickerResult.prototype.labels;
}
var EntityPickerResults = /** @class */ (function (_super) {
    tslib_1.__extends(EntityPickerResults, _super);
    function EntityPickerResults(element, labels, ref) {
        var _this = _super.call(this, element, ref) || this;
        _this.labels = labels;
        _this.select = new EventEmitter();
        return _this;
    }
    /**
     * @return {?}
     */
    EntityPickerResults.prototype.getListElement = /**
     * @return {?}
     */
    function () {
        return this.element.nativeElement.querySelector('novo-list');
    };
    /**
     * @param {?=} event
     * @param {?=} item
     * @return {?}
     */
    EntityPickerResults.prototype.selectMatch = /**
     * @param {?=} event
     * @param {?=} item
     * @return {?}
     */
    function (event, item) {
        this.select.next(item);
        return _super.prototype.selectMatch.call(this, event, item);
    };
    EntityPickerResults.decorators = [
        { type: Component, args: [{
                    selector: 'entity-picker-results',
                    template: "\n        <novo-list *ngIf=\"matches.length > 0\" direction=\"vertical\">\n            <entity-picker-result *ngFor=\"let match of matches\"\n                    [match]=\"match\"\n                    [term]=\"term\"\n                    (click)=\"selectMatch($event, match)\"\n                    [ngClass]=\"{active: isActive(match)}\"\n                    (mouseenter)=\"selectActive(match)\"\n                    [class.disabled]=\"preselected(match)\">\n            </entity-picker-result>\n            <novo-loading theme=\"line\" *ngIf=\"isLoading && matches.length > 0\"></novo-loading>\n        </novo-list>\n        <p class=\"picker-error\" *ngIf=\"hasError\">{{ labels.pickerError }}</p>\n        <p class=\"picker-null-results\" *ngIf=\"!isLoading && !matches.length && !hasError\">{{ labels.pickerEmpty }}</p>\n    "
                }] }
    ];
    /** @nocollapse */
    EntityPickerResults.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NovoLabelService },
        { type: ChangeDetectorRef }
    ]; };
    EntityPickerResults.propDecorators = {
        select: [{ type: Output }]
    };
    return EntityPickerResults;
}(BasePickerResults));
export { EntityPickerResults };
if (false) {
    /** @type {?} */
    EntityPickerResults.prototype.select;
    /** @type {?} */
    EntityPickerResults.prototype.labels;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW50aXR5UGlja2VyUmVzdWx0cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJlbGVtZW50cy9waWNrZXIvZXh0cmFzL2VudGl0eS1waWNrZXItcmVzdWx0cy9FbnRpdHlQaWNrZXJSZXN1bHRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFHdEcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFFM0U7SUE4RUUsNEJBQW1CLE1BQXdCO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO0lBQUcsQ0FBQztJQUUvQzs7Ozs7O09BTUc7Ozs7Ozs7OztJQUNILHlDQUFZOzs7Ozs7OztJQUFaLFVBQWEsYUFBYTtRQUN4QixrREFBa0Q7UUFDbEQsT0FBTyxhQUFhLENBQUMsT0FBTyxDQUFDLHdCQUF3QixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRDs7Ozs7O09BTUc7Ozs7Ozs7OztJQUNILHNDQUFTOzs7Ozs7OztJQUFULFVBQVUsS0FBSyxFQUFFLEtBQUs7UUFDcEIsOEVBQThFO1FBQzlFLE9BQU8sS0FBSyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUMxSCxDQUFDOzs7OztJQUVELDZDQUFnQjs7OztJQUFoQixVQUFpQixNQUFZO1FBQzNCLElBQUksTUFBTSxFQUFF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QUVMLEtBQUs7O0lBK0ZSLHlCQUFDO0NBQUEsQUExS0QsSUEwS0M7U0FsR1ksa0JBQWtCOzs7SUFDN0IsbUNBQ1c7O0lBQ1gsa0NBQ1U7O0lBRUUsb0NBQStCOztBQThGN0M7SUFrQnlDLCtDQUFpQjtJQUd4RCw2QkFBWSxPQUFtQixFQUFTLE1BQXdCLEVBQUUsR0FBc0I7UUFBeEYsWUFDRSxrQkFBTSxPQUFPLEVBQUUsR0FBRyxDQUFDLFNBQ3BCO1FBRnVDLFlBQU0sR0FBTixNQUFNLENBQWtCO1FBRGhFLFlBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7SUFHL0MsQ0FBQzs7OztJQUVELDRDQUFjOzs7SUFBZDtRQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQy9ELENBQUM7Ozs7OztJQUVELHlDQUFXOzs7OztJQUFYLFVBQVksS0FBVyxFQUFFLElBQVU7UUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsT0FBTyxpQkFBTSxXQUFXLFlBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7O2dCQWhDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsUUFBUSxFQUFFLCt6QkFjUDtpQkFDSjs7OztnQkFuTW1CLFVBQVU7Z0JBSXJCLGdCQUFnQjtnQkFKb0MsaUJBQWlCOzs7eUJBcU0zRSxNQUFNOztJQWNULDBCQUFDO0NBQUEsQUFqQ0QsQ0FrQnlDLGlCQUFpQixHQWV6RDtTQWZZLG1CQUFtQjs7O0lBQzlCLHFDQUMrQzs7SUFDZCxxQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gVmVuZG9yXG4vLyBBUFBcbmltcG9ydCB7IEJhc2VQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi4vYmFzZS1waWNrZXItcmVzdWx0cy9CYXNlUGlja2VyUmVzdWx0cyc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZW50aXR5LXBpY2tlci1yZXN1bHQnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bm92by1saXN0LWl0ZW0gKm5nSWY9XCJtYXRjaC5kYXRhXCI+XG4gICAgICAgICAgICA8aXRlbS1oZWFkZXI+XG4gICAgICAgICAgICAgICAgPGl0ZW0tYXZhdGFyIFtpY29uXT1cImdldEljb25Gb3JSZXN1bHQobWF0Y2guZGF0YSlcIj48L2l0ZW0tYXZhdGFyPlxuICAgICAgICAgICAgICAgIDxpdGVtLXRpdGxlPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBbaW5uZXJIdG1sXT1cImhpZ2hsaWdodChnZXROYW1lRm9yUmVzdWx0KG1hdGNoLmRhdGEpLCB0ZXJtKVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2l0ZW0tdGl0bGU+XG4gICAgICAgICAgICA8L2l0ZW0taGVhZGVyPlxuICAgICAgICAgICAgPGl0ZW0tY29udGVudCBkaXJlY3Rpb249XCJob3Jpem9udGFsXCI+XG4gICAgICAgICAgICAgICAgPCEtLSBDT01QQU5ZIDEgLS0+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJjb21wYW55XCIgKm5nSWY9XCJtYXRjaC5kYXRhLmNvbXBhbnlOYW1lIHx8IG1hdGNoLmRhdGE/LmNsaWVudENvcnBvcmF0aW9uPy5uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLWNvbXBhbnlcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIFtpbm5lckh0bWxdPVwiaGlnaGxpZ2h0KG1hdGNoLmRhdGEuY29tcGFueU5hbWUgfHwgbWF0Y2guZGF0YT8uY2xpZW50Q29ycG9yYXRpb24/Lm5hbWUsIHRlcm0pXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8IS0tIENMSUVOVCBDT05UQUNUIC0tPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiY29udGFjdFwiICpuZ0lmPVwibWF0Y2guZGF0YT8uY2xpZW50Q29udGFjdD8uZmlyc3ROYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLXBlcnNvbiBjb250YWN0IHBlcnNvblwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gW2lubmVySHRtbF09XCJoaWdobGlnaHQobWF0Y2guZGF0YS5jbGllbnRDb250YWN0LmZpcnN0TmFtZSArICcgJyArIG1hdGNoLmRhdGEuY2xpZW50Q29udGFjdC5sYXN0TmFtZSwgdGVybSlcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwhLS0gQ0FORElEQVRFIC0tPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FuZGlkYXRlXCIgKm5nSWY9XCJtYXRjaC5kYXRhLmNhbmRpZGF0ZSAmJiBtYXRjaC5kYXRhLnNlYXJjaEVudGl0eSA9PT0gJ1BsYWNlbWVudCdcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJiaGktY2FuZGlkYXRlXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBbaW5uZXJIdG1sXT1cImhpZ2hsaWdodCgobWF0Y2guZGF0YS5jYW5kaWRhdGUuZmlyc3ROYW1lICsgJyAnICsgbWF0Y2guZGF0YS5jYW5kaWRhdGUubGFzdE5hbWUpLCB0ZXJtKVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPCEtLSBTVEFSVCAmIEVORCBEQVRFIC0tPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwic3RhcnQtZGF0ZVwiICpuZ0lmPVwibWF0Y2guZGF0YS5kYXRlQmVnaW4gJiYgbWF0Y2guZGF0YS5zZWFyY2hFbnRpdHkgPT09ICdQbGFjZW1lbnQnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLWNhbGVuZGFyXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBbaW5uZXJIdG1sXT1cInJlbmRlclRpbWVzdGFtcChtYXRjaC5kYXRhLmRhdGVCZWdpbikgKyAnIC0gJyArIHJlbmRlclRpbWVzdGFtcChtYXRjaC5kYXRhLmRhdGVFbmQpXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8IS0tIEVNQUlMIC0tPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiZW1haWxcIiAqbmdJZj1cIm1hdGNoLmRhdGEuZW1haWxcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJiaGktZW1haWxcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIFtpbm5lckh0bWxdPVwiaGlnaGxpZ2h0KG1hdGNoLmRhdGEuZW1haWwsIHRlcm0pXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8IS0tIFBIT05FIC0tPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicGhvbmVcIiAqbmdJZj1cIm1hdGNoLmRhdGEucGhvbmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJiaGktcGhvbmVcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIFtpbm5lckh0bWxdPVwiaGlnaGxpZ2h0KG1hdGNoLmRhdGEucGhvbmUsIHRlcm0pXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8IS0tIEFERFJFU1MgLS0+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJsb2NhdGlvblwiICpuZ0lmPVwibWF0Y2guZGF0YS5hZGRyZXNzICYmIChtYXRjaC5kYXRhLmFkZHJlc3MuY2l0eSB8fCBtYXRjaC5kYXRhLmFkZHJlc3Muc3RhdGUpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLWxvY2F0aW9uXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIm1hdGNoLmRhdGEuYWRkcmVzcy5jaXR5XCIgW2lubmVySHRtbF09XCJoaWdobGlnaHQobWF0Y2guZGF0YS5hZGRyZXNzLmNpdHksIHRlcm0pXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIm1hdGNoLmRhdGEuYWRkcmVzcy5jaXR5ICYmIG1hdGNoLmRhdGEuYWRkcmVzcy5zdGF0ZVwiPiwgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIm1hdGNoLmRhdGEuYWRkcmVzcy5zdGF0ZVwiIFtpbm5lckh0bWxdPVwiaGlnaGxpZ2h0KG1hdGNoLmRhdGEuYWRkcmVzcy5zdGF0ZSwgdGVybSlcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwhLS0gU1RBVFVTIC0tPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwic3RhdHVzXCIgKm5nSWY9XCJtYXRjaC5kYXRhLnN0YXR1c1wiPlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImJoaS1pbmZvXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBbaW5uZXJIdG1sXT1cImhpZ2hsaWdodChtYXRjaC5kYXRhLnN0YXR1cywgdGVybSlcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwhLS0gT1dORVIgLS0+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJvd25lclwiICpuZ0lmPVwibWF0Y2guZGF0YS5vd25lciAmJiBtYXRjaC5kYXRhLm93bmVyLm5hbWUgJiYgbWF0Y2guZGF0YS5zZWFyY2hFbnRpdHkgPT09ICdDYW5kaWRhdGUnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLXBlcnNvblwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gW2lubmVySHRtbF09XCJoaWdobGlnaHQobWF0Y2guZGF0YS5vd25lci5uYW1lLCB0ZXJtKVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPCEtLSBQUklNQVJZIERFUEFSVE1FTlQgLS0+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwcmltYXJ5LWRlcGFydG1lbnRcIiAqbmdJZj1cIm1hdGNoLmRhdGEucHJpbWFyeURlcGFydG1lbnQgJiYgbWF0Y2guZGF0YS5wcmltYXJ5RGVwYXJ0bWVudC5uYW1lICYmIG1hdGNoLmRhdGEuc2VhcmNoRW50aXR5ID09PSAnQ29ycG9yYXRlVXNlcidcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJiaGktZGVwYXJ0bWVudFwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gW2lubmVySHRtbF09XCJoaWdobGlnaHQobWF0Y2guZGF0YS5wcmltYXJ5RGVwYXJ0bWVudC5uYW1lLCB0ZXJtKVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPCEtLSBPQ0NVUEFUSU9OIC0tPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwib2NjdXBhdGlvblwiICpuZ0lmPVwibWF0Y2guZGF0YS5vY2N1cGF0aW9uICYmIG1hdGNoLmRhdGEuc2VhcmNoRW50aXR5ID09PSAnQ29ycG9yYXRlVXNlcidcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJiaGktb2NjdXBhdGlvblwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gW2lubmVySHRtbF09XCJoaWdobGlnaHQobWF0Y2guZGF0YS5vY2N1cGF0aW9uLCB0ZXJtKVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2l0ZW0tY29udGVudD5cbiAgICAgICAgPC9ub3ZvLWxpc3QtaXRlbT5cbiAgICBgLFxufSlcbmV4cG9ydCBjbGFzcyBFbnRpdHlQaWNrZXJSZXN1bHQge1xuICBASW5wdXQoKVxuICBtYXRjaDogYW55O1xuICBASW5wdXQoKVxuICB0ZXJtOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSkge31cblxuICAvKipcbiAgICogQG5hbWUgZXNjYXBlUmVnZXhwXG4gICAqIEBwYXJhbSBxdWVyeVRvRXNjYXBlXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIGNhcHR1cmVzIHRoZSB3aG9sZSBxdWVyeSBzdHJpbmcgYW5kIHJlcGxhY2UgaXQgd2l0aCB0aGUgc3RyaW5nIHRoYXQgd2lsbCBiZSB1c2VkIHRvXG4gICAqIG1hdGNoLlxuICAgKi9cbiAgZXNjYXBlUmVnZXhwKHF1ZXJ5VG9Fc2NhcGUpIHtcbiAgICAvLyBFeDogaWYgdGhlIGNhcHR1cmUgaXMgXCJhXCIgdGhlIHJlc3VsdCB3aWxsIGJlIFxcYVxuICAgIHJldHVybiBxdWVyeVRvRXNjYXBlLnJlcGxhY2UoLyhbLj8qK14kW1xcXVxcXFwoKXt9fC1dKS9nLCAnXFxcXCQxJyk7XG4gIH1cblxuICAvKipcbiAgICogQG5hbWUgaGlnaGxpZ2h0XG4gICAqIEBwYXJhbSBtYXRjaFxuICAgKiBAcGFyYW0gcXVlcnlcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gc2hvdWxkIHJldHVybiBhIDxzdHJvbmc+LXRhZyB3cmFwcGVkIEhUTUwgc3RyaW5nLlxuICAgKi9cbiAgaGlnaGxpZ2h0KG1hdGNoLCBxdWVyeSkge1xuICAgIC8vIFJlcGxhY2VzIHRoZSBjYXB0dXJlIHN0cmluZyB3aXRoIGEgdGhlIHNhbWUgc3RyaW5nIGluc2lkZSBvZiBhIFwic3Ryb25nXCIgdGFnXG4gICAgcmV0dXJuIHF1ZXJ5ICYmIG1hdGNoID8gbWF0Y2gucmVwbGFjZShuZXcgUmVnRXhwKHRoaXMuZXNjYXBlUmVnZXhwKHF1ZXJ5LnRyaW0oKSksICdnaScpLCAnPHN0cm9uZz4kJjwvc3Ryb25nPicpIDogbWF0Y2g7XG4gIH1cblxuICBnZXRJY29uRm9yUmVzdWx0KHJlc3VsdD86IGFueSk6IHN0cmluZyB7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgc3dpdGNoIChyZXN1bHQuc2VhcmNoRW50aXR5KSB7XG4gICAgICAgIGNhc2UgJ0NsaWVudENvbnRhY3QnOlxuICAgICAgICAgIHJldHVybiAncGVyc29uIGNvbnRhY3QnO1xuICAgICAgICBjYXNlICdDbGllbnRDb3Jwb3JhdGlvbic6XG4gICAgICAgICAgcmV0dXJuICdjb21wYW55JztcbiAgICAgICAgY2FzZSAnT3Bwb3J0dW5pdHknOlxuICAgICAgICAgIHJldHVybiAnb3Bwb3J0dW5pdHknO1xuICAgICAgICBjYXNlICdDYW5kaWRhdGUnOlxuICAgICAgICAgIHJldHVybiAnY2FuZGlkYXRlJztcbiAgICAgICAgY2FzZSAnTGVhZCc6XG4gICAgICAgICAgcmV0dXJuICdsZWFkJztcbiAgICAgICAgY2FzZSAnSm9iT3JkZXInOlxuICAgICAgICAgIHJldHVybiAnam9iJztcbiAgICAgICAgY2FzZSAnUGxhY2VtZW50JzpcbiAgICAgICAgICByZXR1cm4gJ3N0YXIgcGxhY2VtZW50JztcbiAgICAgICAgY2FzZSAnQ29ycG9yYXRlVXNlcic6XG4gICAgICAgICAgcmV0dXJuICd1c2VyJztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHJlbmRlclRpbWVzdGFtcChkYXRlPzogYW55KSB7XG4gICAgbGV0IHRpbWVzdGFtcCA9ICcnO1xuICAgIGlmIChkYXRlKSB7XG4gICAgICB0aW1lc3RhbXAgPSB0aGlzLmxhYmVscy5mb3JtYXREYXRlV2l0aEZvcm1hdChkYXRlLCB7IHllYXI6ICdudW1lcmljJywgbW9udGg6ICdudW1lcmljJywgZGF5OiAnbnVtZXJpYycgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aW1lc3RhbXA7XG4gIH1cblxuICBnZXROYW1lRm9yUmVzdWx0KHJlc3VsdD86IGFueSkge1xuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIHN3aXRjaCAocmVzdWx0LnNlYXJjaEVudGl0eSkge1xuICAgICAgICBjYXNlICdMZWFkJzpcbiAgICAgICAgY2FzZSAnQ29ycG9yYXRlVXNlcic6XG4gICAgICAgIGNhc2UgJ0NsaWVudENvbnRhY3QnOlxuICAgICAgICBjYXNlICdDYW5kaWRhdGUnOlxuICAgICAgICBjYXNlICdQZXJzb24nOlxuICAgICAgICAgIGlmICgnZmlyc3ROYW1lJyBpbiByZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHtyZXN1bHQuZmlyc3ROYW1lfSAke3Jlc3VsdC5sYXN0TmFtZX1gLnRyaW0oKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGAke3Jlc3VsdC5uYW1lIHx8ICcnfWAudHJpbSgpO1xuICAgICAgICBjYXNlICdDbGllbnRDb3Jwb3JhdGlvbic6XG4gICAgICAgICAgcmV0dXJuIGAke3Jlc3VsdC5uYW1lIHx8ICcnfWAudHJpbSgpO1xuICAgICAgICBjYXNlICdPcHBvcnR1bml0eSc6XG4gICAgICAgIGNhc2UgJ0pvYk9yZGVyJzpcbiAgICAgICAgICByZXR1cm4gYCR7cmVzdWx0LnRpdGxlIHx8ICcnfWAudHJpbSgpO1xuICAgICAgICBjYXNlICdQbGFjZW1lbnQnOlxuICAgICAgICAgIGxldCBsYWJlbCA9ICcnO1xuICAgICAgICAgIGlmIChyZXN1bHQuY2FuZGlkYXRlKSB7XG4gICAgICAgICAgICBsYWJlbCA9IGAke3Jlc3VsdC5jYW5kaWRhdGUuZmlyc3ROYW1lfSAke3Jlc3VsdC5jYW5kaWRhdGUubGFzdE5hbWV9YC50cmltKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZXN1bHQuam9iT3JkZXIpIHtcbiAgICAgICAgICAgIGxhYmVsID0gYCR7bGFiZWx9IC0gJHtyZXN1bHQuam9iT3JkZXIudGl0bGV9YC50cmltKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBsYWJlbDtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gYCR7cmVzdWx0Lm5hbWUgfHwgJyd9YC50cmltKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdlbnRpdHktcGlja2VyLXJlc3VsdHMnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bm92by1saXN0ICpuZ0lmPVwibWF0Y2hlcy5sZW5ndGggPiAwXCIgZGlyZWN0aW9uPVwidmVydGljYWxcIj5cbiAgICAgICAgICAgIDxlbnRpdHktcGlja2VyLXJlc3VsdCAqbmdGb3I9XCJsZXQgbWF0Y2ggb2YgbWF0Y2hlc1wiXG4gICAgICAgICAgICAgICAgICAgIFttYXRjaF09XCJtYXRjaFwiXG4gICAgICAgICAgICAgICAgICAgIFt0ZXJtXT1cInRlcm1cIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0TWF0Y2goJGV2ZW50LCBtYXRjaClcIlxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7YWN0aXZlOiBpc0FjdGl2ZShtYXRjaCl9XCJcbiAgICAgICAgICAgICAgICAgICAgKG1vdXNlZW50ZXIpPVwic2VsZWN0QWN0aXZlKG1hdGNoKVwiXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJwcmVzZWxlY3RlZChtYXRjaClcIj5cbiAgICAgICAgICAgIDwvZW50aXR5LXBpY2tlci1yZXN1bHQ+XG4gICAgICAgICAgICA8bm92by1sb2FkaW5nIHRoZW1lPVwibGluZVwiICpuZ0lmPVwiaXNMb2FkaW5nICYmIG1hdGNoZXMubGVuZ3RoID4gMFwiPjwvbm92by1sb2FkaW5nPlxuICAgICAgICA8L25vdm8tbGlzdD5cbiAgICAgICAgPHAgY2xhc3M9XCJwaWNrZXItZXJyb3JcIiAqbmdJZj1cImhhc0Vycm9yXCI+e3sgbGFiZWxzLnBpY2tlckVycm9yIH19PC9wPlxuICAgICAgICA8cCBjbGFzcz1cInBpY2tlci1udWxsLXJlc3VsdHNcIiAqbmdJZj1cIiFpc0xvYWRpbmcgJiYgIW1hdGNoZXMubGVuZ3RoICYmICFoYXNFcnJvclwiPnt7IGxhYmVscy5waWNrZXJFbXB0eSB9fTwvcD5cbiAgICBgLFxufSlcbmV4cG9ydCBjbGFzcyBFbnRpdHlQaWNrZXJSZXN1bHRzIGV4dGVuZHMgQmFzZVBpY2tlclJlc3VsdHMge1xuICBAT3V0cHV0KClcbiAgc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZiwgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSwgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHN1cGVyKGVsZW1lbnQsIHJlZik7XG4gIH1cblxuICBnZXRMaXN0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3Rvcignbm92by1saXN0Jyk7XG4gIH1cblxuICBzZWxlY3RNYXRjaChldmVudD86IGFueSwgaXRlbT86IGFueSkge1xuICAgIHRoaXMuc2VsZWN0Lm5leHQoaXRlbSk7XG4gICAgcmV0dXJuIHN1cGVyLnNlbGVjdE1hdGNoKGV2ZW50LCBpdGVtKTtcbiAgfVxufVxuIl19