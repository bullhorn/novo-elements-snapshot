// NG2
import { Inject, Injectable, LOCALE_ID, Optional } from '@angular/core';
import * as i0 from "@angular/core";
export class NovoLabelService {
    constructor(userLocale = 'en-US') {
        this.userLocale = userLocale;
        this.and = 'and';
        this.not = 'not';
        this.filters = 'Filter';
        this.clear = 'Clear';
        this.sort = 'Sort';
        this.distributionListOwner = 'Owner';
        this.dateAdded = 'Date Added';
        this.emptyTableMessage = 'No Records to display...';
        this.noMatchingRecordsMessage = 'No Matching Records';
        this.noMoreRecordsMessage = 'No More Records';
        this.erroredTableMessage = 'Oops! An error occurred.';
        this.pickerError = 'Oops! An error occurred.';
        this.pickerTextFieldEmpty = 'Begin typing to see results.';
        this.pickerEmpty = 'No results to display...';
        this.tabbedGroupPickerEmpty = 'No results found';
        this.quickNoteError = 'Oops! An error occurred.';
        this.quickNoteEmpty = 'No results to display...';
        this.required = 'Required';
        this.numberTooLarge = 'Number is too large';
        this.save = 'Save';
        this.cancel = 'Cancel';
        this.next = 'Next';
        this.itemsPerPage = 'Items per page:';
        this.chooseAField = 'Choose a field...';
        this.operator = 'Operator...';
        this.select = 'Select...';
        this.value = 'Value...';
        this.selectDateRange = 'Select Date Range...';
        this.typeToAddChips = 'Type to add chips...';
        this.selected = 'Selected';
        this.selectAllOnPage = 'Select all on page';
        this.deselectAll = 'Deselect all';
        this.refresh = 'Refresh';
        this.close = 'Close';
        this.move = 'Move';
        this.startDate = 'Start Date';
        this.endDate = 'End Date';
        this.rate = 'Rate';
        this.more = 'more';
        this.clearAll = 'CLEAR ALL';
        this.clearAllNormalCase = 'Clear All';
        this.clearSort = 'Clear Sort';
        this.clearFilter = 'Clear Filter';
        this.clearSearch = 'Clear Search';
        this.clearSelected = 'Clear Selected';
        this.today = 'Today';
        this.now = 'Now';
        this.isRequired = 'is required';
        this.notValidYear = 'is not a valid year';
        this.isTooLarge = 'is too large';
        this.invalidAddress = 'requires at least one field filled out';
        this.invalidEmail = 'requires a valid email (ex. abc@123.com)';
        this.minLength = 'is required to be a minimum length of';
        this.past1Day = 'Past 1 Day';
        this.past7Days = 'Past 7 Days';
        this.past30Days = 'Past 30 Days';
        this.past90Days = 'Past 90 Days';
        this.past1Year = 'Past 1 Year';
        this.next1Day = 'Next 1 Day';
        this.next7Days = 'Next 7 Days';
        this.next30Days = 'Next 30 Days';
        this.next90Days = 'Next 90 Days';
        this.next1Year = 'Next 1 Year';
        this.customDateRange = 'Custom Date Range';
        this.backToPresetFilters = 'Back to Preset Filters';
        this.okGotIt = 'Ok, Got it';
        this.address = 'Address';
        this.address1 = 'Address';
        this.apt = 'Apt'; // TODO delete
        this.address2 = 'Apt';
        this.city = 'City / Locality';
        this.state = 'State / Region';
        this.zip = 'Postal Code';
        this.zipCode = 'Postal Code'; // TODO delete
        this.country = 'Country';
        this.or = 'or';
        this.clickToBrowse = 'click to browse';
        this.chooseAFile = 'Choose a file';
        this.no = 'No';
        this.yes = 'Yes';
        this.search = 'SEARCH';
        this.noItems = 'There are no items';
        this.dateFormat = 'MM/dd/yyyy';
        this.dateFormatPlaceholder = 'MM/DD/YYYY';
        this.localDatePlaceholder = 'mm/dd/yyyy';
        this.timeFormatPlaceholderAM = 'hh:mm AM';
        this.timeFormatPlaceholder24Hour = 'HH:mm';
        this.timeFormatAM = 'AM';
        this.timeFormatPM = 'PM';
        this.confirmChangesModalMessage = 'Are you sure you want to change this field?';
        this.promptModalMessage = 'Do you want to perform the following changes?';
        this.asyncFailure = 'Async validation was not called within the 10s threshold, you might want to reload the page to try again';
        this.previous = 'Previous';
        this.actions = 'Actions';
        this.all = 'All';
        this.groupedMultiPickerEmpty = 'No items to display';
        this.groupedMultiPickerSelectCategory = 'Select a category from the left to get started';
        this.add = 'Add';
        this.encryptedFieldTooltip = 'This data has been stored at the highest level of security';
        this.noStatesForCountry = 'No states available for the selected country';
        this.selectCountryFirst = 'Please select a country before selecting a state';
        this.invalidIntegerInput = 'Special characters are not allowed for';
        this.maxRecordsReached = 'Sorry, you have reached the maximum number of records allowed for this field';
        this.selectFilterOptions = 'Please select one or more filter options below.';
        this.addCondition = 'Add Condition';
        this.includeAny = 'Include Any';
        this.includeAll = 'Include All';
        this.exclude = 'Exclude';
        this.radius = 'Radius';
        this.equals = 'Equals';
        this.equalTo = 'Equal To';
        this.greaterThan = 'Greater Than';
        this.lessThan = 'Less Than';
        this.doesNotEqual = 'Does Not Equal';
        this.true = 'True';
        this.false = 'False';
        this.before = 'Before';
        this.after = 'After';
        this.between = 'Between';
        this.within = 'Within';
        this.refreshPagination = 'Refresh Pagination';
    }
    maxlengthMetWithField(field, maxlength) {
        return `Sorry, you have reached the maximum character count of ${maxlength} for ${field}.`;
    }
    maxlengthMet(maxlength) {
        return `Sorry, you have reached the maximum character count of ${maxlength} for this field.`;
    }
    invalidMaxlengthWithField(field, maxlength) {
        return `Sorry, you have exceeded the maximum character count of ${maxlength} for ${field}.`;
    }
    invalidMaxlength(maxlength) {
        return `Sorry, you have exceeded the maximum character count of ${maxlength} for this field.`;
    }
    getToManyPlusMore(toMany) {
        return `+${toMany.quantity} more`;
    }
    selectedRecords(selected) {
        return `${selected} records are selected.`;
    }
    showingXofXResults(shown, total) {
        return `Showing ${shown} of ${total} Results.`;
    }
    totalRecords(total, select = false) {
        return select ? `Select all ${total} records.` : `De-select remaining ${total} records.`;
    }
    dateFormatString() {
        return this.dateFormat;
    }
    localizedDatePlaceholder() {
        return this.localDatePlaceholder;
    }
    tabbedGroupClearSuggestion(tabLabelPlural) {
        return `Clear your search to see all ${tabLabelPlural}.`;
    }
    formatDateWithFormat(value, format) {
        const date = value instanceof Date ? value : new Date(value);
        if (date.getTime() !== date.getTime()) {
            return value;
        }
        return new Intl.DateTimeFormat(this.userLocale, format).format(date);
    }
    formatToTimeOnly(param) { }
    formatToDateOnly(param) { }
    formatTimeWithFormat(value, format) {
        const date = value instanceof Date ? value : new Date(value);
        if (date.getTime() !== date.getTime()) {
            return value;
        }
        const timeParts = Intl.DateTimeFormat(this.userLocale, format)
            .formatToParts(date)
            .reduce((obj, part) => {
            obj[part.type] = part.value;
            return obj;
        }, {});
        const dayPeriod = timeParts.dayPeriod ? timeParts.dayPeriod : '';
        const res = `${timeParts.hour}:${timeParts.minute} ${dayPeriod}`;
        return res;
    }
    getWeekdays(weekStartsOn = 0) {
        function getDay(dayOfWeek) {
            const dt = new Date();
            return dt.setDate(dt.getDate() - dt.getDay() + dayOfWeek);
        }
        let weekdays = [getDay(0), getDay(1), getDay(2), getDay(3), getDay(4), getDay(5), getDay(6)].reduce((weekdays, dt) => {
            weekdays.push(new Intl.DateTimeFormat(this.userLocale, { weekday: 'long' }).format(dt));
            return weekdays;
        }, []);
        if (weekStartsOn > 0 && weekStartsOn <= 6) {
            const newStart = weekdays.splice(weekStartsOn);
            weekdays = [...newStart, ...weekdays];
        }
        return weekdays;
    }
    getMonths() {
        function getMonth(month) {
            const dt = new Date();
            return dt.setMonth(month, 1);
        }
        return [
            getMonth(0),
            getMonth(1),
            getMonth(2),
            getMonth(3),
            getMonth(4),
            getMonth(5),
            getMonth(6),
            getMonth(7),
            getMonth(8),
            getMonth(9),
            getMonth(10),
            getMonth(11),
        ].reduce((months, dt) => {
            months.push(new Intl.DateTimeFormat(this.userLocale, { month: 'long' }).format(dt));
            return months;
        }, []);
    }
    getProperty(value) {
        return this[value];
    }
    getRangeText(page, pageSize, length, short) {
        if (length === 0 || pageSize === 0) {
            return `Displaying 0 of ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        // If the start index exceeds the list length, do not try and fix the end index to the end.
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return short ? `${startIndex + 1} - ${endIndex}/${length}` : `Displaying ${startIndex + 1} - ${endIndex} of ${length}`;
    }
    formatCurrency(value) {
        const options = { style: 'currency', currency: 'USD' };
        return new Intl.NumberFormat(this.userLocale, options).format(value);
    }
    /**
     * Extends the Intl.numberFormat capability with two extra features:
     *  - Does NOT round values, but instead truncates to maximumFractionDigits
     *  - By default uses accounting format for negative numbers: (3.14) instead of -3.14.
     *
     * @param value           The number value to convert to string
     * @param overrideOptions Allows for overriding options used and passed to Intl.NumberFormat()
     */
    formatBigDecimal(value, overrideOptions) {
        const defaultOptions = {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useAccountingFormat: true,
        };
        const options = Object.assign(defaultOptions, overrideOptions);
        const truncatedValue = this.truncateToPrecision(value, options.maximumFractionDigits);
        let _value = new Intl.NumberFormat(this.userLocale, options).format(truncatedValue);
        if (value < 0) {
            _value = options.useAccountingFormat ? `(${_value.slice(1)})` : `-${_value.slice(1)}`;
        }
        return _value;
    }
    /**
     * Performs a string-based truncating of a number with no rounding
     */
    truncateToPrecision(value, precision) {
        let valueAsString = value ? value.toString() : '0';
        const decimalIndex = valueAsString.indexOf('.');
        if (decimalIndex > -1 && decimalIndex + precision + 1 < valueAsString.length) {
            valueAsString = valueAsString.substring(0, valueAsString.indexOf('.') + precision + 1);
        }
        return Number(valueAsString);
    }
    formatNumber(value, options) {
        return new Intl.NumberFormat(this.userLocale, options).format(value);
    }
    formatDateShort(value) {
        const options = {
            // DD/MM/YYYY, HH:MM A - 02/14/2017, 1:17 PM
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        };
        const _value = value === null || value === undefined || value === '' ? new Date() : new Date(value);
        return new Intl.DateTimeFormat(this.userLocale, options).format(_value);
    }
    formatTime(value) {
        const options = {
            // HH:MM A - 1:17 PM
            hour: 'numeric',
            minute: '2-digit',
        };
        const _value = value === null || value === undefined || value === '' ? new Date() : new Date(value);
        return new Intl.DateTimeFormat(this.userLocale, options).format(_value);
    }
    formatDate(value) {
        const options = {
            // DD/MM/YYYY - 02/14/2017
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        };
        const _value = value === null || value === undefined || value === '' ? new Date() : new Date(value);
        return new Intl.DateTimeFormat(this.userLocale, options).format(_value);
    }
}
NovoLabelService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLabelService, deps: [{ token: LOCALE_ID, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
NovoLabelService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLabelService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLabelService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [LOCALE_ID]
                }] }]; } });
export const NOVO_ELEMENTS_LABELS_PROVIDERS = [{ provide: NovoLabelService, useClass: NovoLabelService }];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm92by1sYWJlbC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWN4RSxNQUFNLE9BQU8sZ0JBQWdCO0lBMkgzQixZQUdTLGFBQWEsT0FBTztRQUFwQixlQUFVLEdBQVYsVUFBVSxDQUFVO1FBN0g3QixRQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ1osUUFBRyxHQUFHLEtBQUssQ0FBQztRQUNaLFlBQU8sR0FBRyxRQUFRLENBQUM7UUFDbkIsVUFBSyxHQUFHLE9BQU8sQ0FBQztRQUNoQixTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsMEJBQXFCLEdBQUcsT0FBTyxDQUFDO1FBQ2hDLGNBQVMsR0FBRyxZQUFZLENBQUM7UUFDekIsc0JBQWlCLEdBQUcsMEJBQTBCLENBQUM7UUFDL0MsNkJBQXdCLEdBQUcscUJBQXFCLENBQUM7UUFDakQseUJBQW9CLEdBQUcsaUJBQWlCLENBQUM7UUFDekMsd0JBQW1CLEdBQUcsMEJBQTBCLENBQUM7UUFDakQsZ0JBQVcsR0FBRywwQkFBMEIsQ0FBQztRQUN6Qyx5QkFBb0IsR0FBRyw4QkFBOEIsQ0FBQztRQUN0RCxnQkFBVyxHQUFHLDBCQUEwQixDQUFDO1FBQ3pDLDJCQUFzQixHQUFHLGtCQUFrQixDQUFDO1FBQzVDLG1CQUFjLEdBQUcsMEJBQTBCLENBQUM7UUFDNUMsbUJBQWMsR0FBRywwQkFBMEIsQ0FBQztRQUM1QyxhQUFRLEdBQUcsVUFBVSxDQUFDO1FBQ3RCLG1CQUFjLEdBQUcscUJBQXFCLENBQUM7UUFDdkMsU0FBSSxHQUFHLE1BQU0sQ0FBQztRQUNkLFdBQU0sR0FBRyxRQUFR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RCxVQUFVLENBQUMsS0FBNkI7UUFDdEMsTUFBTSxPQUFPLEdBQStCO1lBQzFDLDBCQUEwQjtZQUMxQixLQUFLLEVBQUUsU0FBUztZQUNoQixHQUFHLEVBQUUsU0FBUztZQUNkLElBQUksRUFBRSxTQUFTO1NBQ2hCLENBQUM7UUFDRixNQUFNLE1BQU0sR0FBRyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEcsT0FBTyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUUsQ0FBQzs7OEdBcFZVLGdCQUFnQixrQkE2SGpCLFNBQVM7a0hBN0hSLGdCQUFnQjs0RkFBaEIsZ0JBQWdCO2tCQUQ1QixVQUFVOzswQkE2SE4sUUFBUTs7MEJBQ1IsTUFBTTsyQkFBQyxTQUFTOztBQTBOckIsTUFBTSxDQUFDLE1BQU0sOEJBQThCLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIExPQ0FMRV9JRCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vICBpbXBvcnQgRGF0ZVRpbWVGb3JtYXRQYXJ0ID0gSW50bC5EYXRlVGltZUZvcm1hdFBhcnQ7XG5cbmludGVyZmFjZSBUaW1lRm9ybWF0UGFydHMge1xuICBob3VyOiBzdHJpbmc7XG4gIG1pbnV0ZTogc3RyaW5nO1xuICBkYXlQZXJpb2Q/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmlnRGVjaW1hbEZvcm1hdE9wdGlvbnMgZXh0ZW5kcyBJbnRsLk51bWJlckZvcm1hdE9wdGlvbnMge1xuICB1c2VBY2NvdW50aW5nRm9ybWF0PzogYm9vbGVhbjsgLy8gUmVuZGVyIG5lZ2F0aXZlIG51bWJlcnMgdXNpbmcgcGFyZW5zLiBUcnVlOiBcIigzLjE0KVwiLCBGYWxzZTogXCItMy4xNFwiXG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOb3ZvTGFiZWxTZXJ2aWNlIHtcbiAgYW5kID0gJ2FuZCc7XG4gIG5vdCA9ICdub3QnO1xuICBmaWx0ZXJzID0gJ0ZpbHRlcic7XG4gIGNsZWFyID0gJ0NsZWFyJztcbiAgc29ydCA9ICdTb3J0JztcbiAgZGlzdHJpYnV0aW9uTGlzdE93bmVyID0gJ093bmVyJztcbiAgZGF0ZUFkZGVkID0gJ0RhdGUgQWRkZWQnO1xuICBlbXB0eVRhYmxlTWVzc2FnZSA9ICdObyBSZWNvcmRzIHRvIGRpc3BsYXkuLi4nO1xuICBub01hdGNoaW5nUmVjb3Jkc01lc3NhZ2UgPSAnTm8gTWF0Y2hpbmcgUmVjb3Jkcyc7XG4gIG5vTW9yZVJlY29yZHNNZXNzYWdlID0gJ05vIE1vcmUgUmVjb3Jkcyc7XG4gIGVycm9yZWRUYWJsZU1lc3NhZ2UgPSAnT29wcyEgQW4gZXJyb3Igb2NjdXJyZWQuJztcbiAgcGlja2VyRXJyb3IgPSAnT29wcyEgQW4gZXJyb3Igb2NjdXJyZWQuJztcbiAgcGlja2VyVGV4dEZpZWxkRW1wdHkgPSAnQmVnaW4gdHlwaW5nIHRvIHNlZSByZXN1bHRzLic7XG4gIHBpY2tlckVtcHR5ID0gJ05vIHJlc3VsdHMgdG8gZGlzcGxheS4uLic7XG4gIHRhYmJlZEdyb3VwUGlja2VyRW1wdHkgPSAnTm8gcmVzdWx0cyBmb3VuZCc7XG4gIHF1aWNrTm90ZUVycm9yID0gJ09vcHMhIEFuIGVycm9yIG9jY3VycmVkLic7XG4gIHF1aWNrTm90ZUVtcHR5ID0gJ05vIHJlc3VsdHMgdG8gZGlzcGxheS4uLic7XG4gIHJlcXVpcmVkID0gJ1JlcXVpcmVkJztcbiAgbnVtYmVyVG9vTGFyZ2UgPSAnTnVtYmVyIGlzIHRvbyBsYXJnZSc7XG4gIHNhdmUgPSAnU2F2ZSc7XG4gIGNhbmNlbCA9ICdDYW5jZWwnO1xuICBuZXh0ID0gJ05leHQnO1xuICBpdGVtc1BlclBhZ2UgPSAnSXRlbXMgcGVyIHBhZ2U6JztcbiAgY2hvb3NlQUZpZWxkID0gJ0Nob29zZSBhIGZpZWxkLi4uJztcbiAgb3BlcmF0b3IgPSAnT3BlcmF0b3IuLi4nO1xuICBzZWxlY3QgPSAnU2VsZWN0Li4uJztcbiAgdmFsdWUgPSAnVmFsdWUuLi4nO1xuICBzZWxlY3REYXRlUmFuZ2UgPSAnU2VsZWN0IERhdGUgUmFuZ2UuLi4nXG4gIHR5cGVUb0FkZENoaXBzID0gJ1R5cGUgdG8gYWRkIGNoaXBzLi4uJ1xuICBzZWxlY3RlZCA9ICdTZWxlY3RlZCc7XG4gIHNlbGVjdEFsbE9uUGFnZSA9ICdTZWxlY3QgYWxsIG9uIHBhZ2UnO1xuICBkZXNlbGVjdEFsbCA9ICdEZXNlbGVjdCBhbGwnO1xuICByZWZyZXNoID0gJ1JlZnJlc2gnO1xuICBjbG9zZSA9ICdDbG9zZSc7XG4gIG1vdmUgPSAnTW92ZSc7XG4gIHN0YXJ0RGF0ZSA9ICdTdGFydCBEYXRlJztcbiAgZW5kRGF0ZSA9ICdFbmQgRGF0ZSc7XG4gIHJhdGUgPSAnUmF0ZSc7XG4gIG1vcmUgPSAnbW9yZSc7XG4gIGNsZWFyQWxsID0gJ0NMRUFSIEFMTCc7XG4gIGNsZWFyQWxsTm9ybWFsQ2FzZSA9ICdDbGVhciBBbGwnO1xuICBjbGVhclNvcnQgPSAnQ2xlYXIgU29ydCc7XG4gIGNsZWFyRmlsdGVyID0gJ0NsZWFyIEZpbHRlcic7XG4gIGNsZWFyU2VhcmNoID0gJ0NsZWFyIFNlYXJjaCc7XG4gIGNsZWFyU2VsZWN0ZWQgPSAnQ2xlYXIgU2VsZWN0ZWQnO1xuICB0b2RheSA9ICdUb2RheSc7XG4gIG5vdyA9ICdOb3cnO1xuICBpc1JlcXVpcmVkID0gJ2lzIHJlcXVpcmVkJztcbiAgbm90VmFsaWRZZWFyID0gJ2lzIG5vdCBhIHZhbGlkIHllYXInO1xuICBpc1Rvb0xhcmdlID0gJ2lzIHRvbyBsYXJnZSc7XG4gIGludmFsaWRBZGRyZXNzID0gJ3JlcXVpcmVzIGF0IGxlYXN0IG9uZSBmaWVsZCBmaWxsZWQgb3V0JztcbiAgaW52YWxpZEVtYWlsID0gJ3JlcXVpcmVzIGEgdmFsaWQgZW1haWwgKGV4LiBhYmNAMTIzLmNvbSknO1xuICBtaW5MZW5ndGggPSAnaXMgcmVxdWlyZWQgdG8gYmUgYSBtaW5pbXVtIGxlbmd0aCBvZic7XG4gIHBhc3QxRGF5ID0gJ1Bhc3QgMSBEYXknO1xuICBwYXN0N0RheXMgPSAnUGFzdCA3IERheXMnO1xuICBwYXN0MzBEYXlzID0gJ1Bhc3QgMzAgRGF5cyc7XG4gIHBhc3Q5MERheXMgPSAnUGFzdCA5MCBEYXlzJztcbiAgcGFzdDFZZWFyID0gJ1Bhc3QgMSBZZWFyJztcbiAgbmV4dDFEYXkgPSAnTmV4dCAxIERheSc7XG4gIG5leHQ3RGF5cyA9ICdOZXh0IDcgRGF5cyc7XG4gIG5leHQzMERheXMgPSAnTmV4dCAzMCBEYXlzJztcbiAgbmV4dDkwRGF5cyA9ICdOZXh0IDkwIERheXMnO1xuICBuZXh0MVllYXIgPSAnTmV4dCAxIFllYXInO1xuICBjdXN0b21EYXRlUmFuZ2UgPSAnQ3VzdG9tIERhdGUgUmFuZ2UnO1xuICBiYWNrVG9QcmVzZXRGaWx0ZXJzID0gJ0JhY2sgdG8gUHJlc2V0IEZpbHRlcnMnO1xuICBva0dvdEl0ID0gJ09rLCBHb3QgaXQnO1xuICBhZGRyZXNzID0gJ0FkZHJlc3MnO1xuICBhZGRyZXNzMSA9ICdBZGRyZXNzJztcbiAgYXB0ID0gJ0FwdCc7IC8vIFRPRE8gZGVsZXRlXG4gIGFkZHJlc3MyID0gJ0FwdCc7XG4gIGNpdHkgPSAnQ2l0eSAvIExvY2FsaXR5JztcbiAgc3RhdGUgPSAnU3RhdGUgLyBSZWdpb24nO1xuICB6aXAgPSAnUG9zdGFsIENvZGUnO1xuICB6aXBDb2RlID0gJ1Bvc3RhbCBDb2RlJzsgLy8gVE9ETyBkZWxldGVcbiAgY291bnRyeSA9ICdDb3VudHJ5JztcbiAgb3IgPSAnb3InO1xuICBjbGlja1RvQnJvd3NlID0gJ2NsaWNrIHRvIGJyb3dzZSc7XG4gIGNob29zZUFGaWxlID0gJ0Nob29zZSBhIGZpbGUnO1xuICBubyA9ICdObyc7XG4gIHllcyA9ICdZZXMnO1xuICBzZWFyY2ggPSAnU0VBUkNIJztcbiAgbm9JdGVtcyA9ICdUaGVyZSBhcmUgbm8gaXRlbXMnO1xuICBkYXRlRm9ybWF0ID0gJ01NL2RkL3l5eXknO1xuICBkYXRlRm9ybWF0UGxhY2Vob2xkZXIgPSAnTU0vREQvWVlZWSc7XG4gIGxvY2FsRGF0ZVBsYWNlaG9sZGVyID0gJ21tL2RkL3l5eXknO1xuICB0aW1lRm9ybWF0UGxhY2Vob2xkZXJBTSA9ICdoaDptbSBBTSc7XG4gIHRpbWVGb3JtYXRQbGFjZWhvbGRlcjI0SG91ciA9ICdISDptbSc7XG4gIHRpbWVGb3JtYXRBTSA9ICdBTSc7XG4gIHRpbWVGb3JtYXRQTSA9ICdQTSc7XG4gIGNvbmZpcm1DaGFuZ2VzTW9kYWxNZXNzYWdlID0gJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjaGFuZ2UgdGhpcyBmaWVsZD8nO1xuICBwcm9tcHRNb2RhbE1lc3NhZ2UgPSAnRG8geW91IHdhbnQgdG8gcGVyZm9ybSB0aGUgZm9sbG93aW5nIGNoYW5nZXM/JztcbiAgYXN5bmNGYWlsdXJlID0gJ0FzeW5jIHZhbGlkYXRpb24gd2FzIG5vdCBjYWxsZWQgd2l0aGluIHRoZSAxMHMgdGhyZXNob2xkLCB5b3UgbWlnaHQgd2FudCB0byByZWxvYWQgdGhlIHBhZ2UgdG8gdHJ5IGFnYWluJztcbiAgcHJldmlvdXMgPSAnUHJldmlvdXMnO1xuICBhY3Rpb25zID0gJ0FjdGlvbnMnO1xuICBhbGwgPSAnQWxsJztcbiAgZ3JvdXBlZE11bHRpUGlja2VyRW1wdHkgPSAnTm8gaXRlbXMgdG8gZGlzcGxheSc7XG4gIGdyb3VwZWRNdWx0aVBpY2tlclNlbGVjdENhdGVnb3J5ID0gJ1NlbGVjdCBhIGNhdGVnb3J5IGZyb20gdGhlIGxlZnQgdG8gZ2V0IHN0YXJ0ZWQnO1xuICBhZGQgPSAnQWRkJztcbiAgZW5jcnlwdGVkRmllbGRUb29sdGlwID0gJ1RoaXMgZGF0YSBoYXMgYmVlbiBzdG9yZWQgYXQgdGhlIGhpZ2hlc3QgbGV2ZWwgb2Ygc2VjdXJpdHknO1xuICBub1N0YXRlc0ZvckNvdW50cnkgPSAnTm8gc3RhdGVzIGF2YWlsYWJsZSBmb3IgdGhlIHNlbGVjdGVkIGNvdW50cnknO1xuICBzZWxlY3RDb3VudHJ5Rmlyc3QgPSAnUGxlYXNlIHNlbGVjdCBhIGNvdW50cnkgYmVmb3JlIHNlbGVjdGluZyBhIHN0YXRlJztcbiAgaW52YWxpZEludGVnZXJJbnB1dCA9ICdTcGVjaWFsIGNoYXJhY3RlcnMgYXJlIG5vdCBhbGxvd2VkIGZvcic7XG4gIG1heFJlY29yZHNSZWFjaGVkID0gJ1NvcnJ5LCB5b3UgaGF2ZSByZWFjaGVkIHRoZSBtYXhpbXVtIG51bWJlciBvZiByZWNvcmRzIGFsbG93ZWQgZm9yIHRoaXMgZmllbGQnO1xuICBzZWxlY3RGaWx0ZXJPcHRpb25zID0gJ1BsZWFzZSBzZWxlY3Qgb25lIG9yIG1vcmUgZmlsdGVyIG9wdGlvbnMgYmVsb3cuJztcbiAgYWRkQ29uZGl0aW9uID0gJ0FkZCBDb25kaXRpb24nO1xuICBpbmNsdWRlQW55ID0gJ0luY2x1ZGUgQW55JztcbiAgaW5jbHVkZUFsbCA9ICdJbmNsdWRlIEFsbCc7XG4gIGV4Y2x1ZGUgPSAnRXhjbHVkZSc7XG4gIHJhZGl1cyA9ICdSYWRpdXMnO1xuICBlcXVhbHMgPSAnRXF1YWxzJztcbiAgZXF1YWxUbyA9ICdFcXVhbCBUbyc7XG4gIGdyZWF0ZXJUaGFuID0gJ0dyZWF0ZXIgVGhhbic7XG4gIGxlc3NUaGFuID0gJ0xlc3MgVGhhbic7XG4gIGRvZXNOb3RFcXVhbCA9ICdEb2VzIE5vdCBFcXVhbCc7XG4gIHRydWUgPSAnVHJ1ZSc7XG4gIGZhbHNlID0gJ0ZhbHNlJztcbiAgYmVmb3JlID0gJ0JlZm9yZSc7XG4gIGFmdGVyID0gJ0FmdGVyJztcbiAgYmV0d2VlbiA9ICdCZXR3ZWVuJztcbiAgd2l0aGluID0gJ1dpdGhpbic7XG4gIHJlZnJlc2hQYWdpbmF0aW9uID0gJ1JlZnJlc2ggUGFnaW5hdGlvbic7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KExPQ0FMRV9JRClcbiAgICBwdWJsaWMgdXNlckxvY2FsZSA9ICdlbi1VUycsXG4gICkge31cblxuICBtYXhsZW5ndGhNZXRXaXRoRmllbGQoZmllbGQ6IHN0cmluZywgbWF4bGVuZ3RoOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBgU29ycnksIHlvdSBoYXZlIHJlYWNoZWQgdGhlIG1heGltdW0gY2hhcmFjdGVyIGNvdW50IG9mICR7bWF4bGVuZ3RofSBmb3IgJHtmaWVsZH0uYDtcbiAgfVxuXG4gIG1heGxlbmd0aE1ldChtYXhsZW5ndGg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBTb3JyeSwgeW91IGhhdmUgcmVhY2hlZCB0aGUgbWF4aW11bSBjaGFyYWN0ZXIgY291bnQgb2YgJHttYXhsZW5ndGh9IGZvciB0aGlzIGZpZWxkLmA7XG4gIH1cblxuICBpbnZhbGlkTWF4bGVuZ3RoV2l0aEZpZWxkKGZpZWxkOiBzdHJpbmcsIG1heGxlbmd0aDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYFNvcnJ5LCB5b3UgaGF2ZSBleGNlZWRlZCB0aGUgbWF4aW11bSBjaGFyYWN0ZXIgY291bnQgb2YgJHttYXhsZW5ndGh9IGZvciAke2ZpZWxkfS5gO1xuICB9XG5cbiAgaW52YWxpZE1heGxlbmd0aChtYXhsZW5ndGg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBTb3JyeSwgeW91IGhhdmUgZXhjZWVkZWQgdGhlIG1heGltdW0gY2hhcmFjdGVyIGNvdW50IG9mICR7bWF4bGVuZ3RofSBmb3IgdGhpcyBmaWVsZC5gO1xuICB9XG5cbiAgZ2V0VG9NYW55UGx1c01vcmUodG9NYW55OiB7IHF1YW50aXR5OiBudW1iZXIgfSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGArJHt0b01hbnkucXVhbnRpdHl9IG1vcmVgO1xuICB9XG5cbiAgc2VsZWN0ZWRSZWNvcmRzKHNlbGVjdGVkOiBudW1iZXIpIHtcbiAgICByZXR1cm4gYCR7c2VsZWN0ZWR9IHJlY29yZHMgYXJlIHNlbGVjdGVkLmA7XG4gIH1cblxuICBzaG93aW5nWG9mWFJlc3VsdHMoc2hvd246IG51bWJlciwgdG90YWw6IG51bWJlcikge1xuICAgIHJldHVybiBgU2hvd2luZyAke3Nob3dufSBvZiAke3RvdGFsfSBSZXN1bHRzLmA7XG4gIH1cblxuICB0b3RhbFJlY29yZHModG90YWw6IG51bWJlciwgc2VsZWN0ID0gZmFsc2UpIHtcbiAgICByZXR1cm4gc2VsZWN0ID8gYFNlbGVjdCBhbGwgJHt0b3RhbH0gcmVjb3Jkcy5gIDogYERlLXNlbGVjdCByZW1haW5pbmcgJHt0b3RhbH0gcmVjb3Jkcy5gO1xuICB9XG5cbiAgZGF0ZUZvcm1hdFN0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXQ7XG4gIH1cblxuICBsb2NhbGl6ZWREYXRlUGxhY2Vob2xkZXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5sb2NhbERhdGVQbGFjZWhvbGRlcjtcbiAgfVxuXG4gIHRhYmJlZEdyb3VwQ2xlYXJTdWdnZXN0aW9uKHRhYkxhYmVsUGx1cmFsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBgQ2xlYXIgeW91ciBzZWFyY2ggdG8gc2VlIGFsbCAke3RhYkxhYmVsUGx1cmFsfS5gO1xuICB9XG5cbiAgZm9ybWF0RGF0ZVdpdGhGb3JtYXQodmFsdWU6IGFueSwgZm9ybWF0OiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucykge1xuICAgIGNvbnN0IGRhdGUgPSB2YWx1ZSBpbnN0YW5jZW9mIERhdGUgPyB2YWx1ZSA6IG5ldyBEYXRlKHZhbHVlKTtcbiAgICBpZiAoZGF0ZS5nZXRUaW1lKCkgIT09IGRhdGUuZ2V0VGltZSgpKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLnVzZXJMb2NhbGUsIGZvcm1hdCkuZm9ybWF0KGRhdGUpO1xuICB9XG5cbiAgZm9ybWF0VG9UaW1lT25seShwYXJhbSkge31cblxuICBmb3JtYXRUb0RhdGVPbmx5KHBhcmFtKSB7fVxuXG4gIGZvcm1hdFRpbWVXaXRoRm9ybWF0KHZhbHVlOiBhbnksIGZvcm1hdDogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMpOiBzdHJpbmcge1xuICAgIGNvbnN0IGRhdGUgPSB2YWx1ZSBpbnN0YW5jZW9mIERhdGUgPyB2YWx1ZSA6IG5ldyBEYXRlKHZhbHVlKTtcbiAgICBpZiAoZGF0ZS5nZXRUaW1lKCkgIT09IGRhdGUuZ2V0VGltZSgpKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGNvbnN0IHRpbWVQYXJ0czogeyBbdHlwZTogc3RyaW5nXTogc3RyaW5nIH0gPSBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMudXNlckxvY2FsZSwgZm9ybWF0KVxuICAgICAgLmZvcm1hdFRvUGFydHMoZGF0ZSlcbiAgICAgIC5yZWR1Y2UoKG9iaiwgcGFydCkgPT4ge1xuICAgICAgICBvYmpbcGFydC50eXBlXSA9IHBhcnQudmFsdWU7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9LCB7fSk7XG4gICAgY29uc3QgZGF5UGVyaW9kID0gdGltZVBhcnRzLmRheVBlcmlvZCA/IHRpbWVQYXJ0cy5kYXlQZXJpb2QgOiAnJztcbiAgICBjb25zdCByZXMgPSBgJHt0aW1lUGFydHMuaG91cn06JHt0aW1lUGFydHMubWludXRlfSAke2RheVBlcmlvZH1gO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBnZXRXZWVrZGF5cyh3ZWVrU3RhcnRzT24gPSAwKTogc3RyaW5nW10ge1xuICAgIGZ1bmN0aW9uIGdldERheShkYXlPZldlZWspIHtcbiAgICAgIGNvbnN0IGR0ID0gbmV3IERhdGUoKTtcbiAgICAgIHJldHVybiBkdC5zZXREYXRlKGR0LmdldERhdGUoKSAtIGR0LmdldERheSgpICsgZGF5T2ZXZWVrKTtcbiAgICB9XG5cbiAgICBsZXQgd2Vla2RheXMgPSBbZ2V0RGF5KDApLCBnZXREYXkoMSksIGdldERheSgyKSwgZ2V0RGF5KDMpLCBnZXREYXkoNCksIGdldERheSg1KSwgZ2V0RGF5KDYpXS5yZWR1Y2UoKHdlZWtkYXlzLCBkdCkgPT4ge1xuICAgICAgd2Vla2RheXMucHVzaChuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLnVzZXJMb2NhbGUsIHsgd2Vla2RheTogJ2xvbmcnIH0pLmZvcm1hdChkdCkpO1xuICAgICAgcmV0dXJuIHdlZWtkYXlzO1xuICAgIH0sIFtdKTtcblxuICAgIGlmICh3ZWVrU3RhcnRzT24gPiAwICYmIHdlZWtTdGFydHNPbiA8PSA2KSB7XG4gICAgICBjb25zdCBuZXdTdGFydCA9IHdlZWtkYXlzLnNwbGljZSh3ZWVrU3RhcnRzT24pO1xuICAgICAgd2Vla2RheXMgPSBbLi4ubmV3U3RhcnQsIC4uLndlZWtkYXlzXTtcbiAgICB9XG4gICAgcmV0dXJuIHdlZWtkYXlzO1xuICB9XG5cbiAgZ2V0TW9udGhzKCk6IHN0cmluZ1tdIHtcbiAgICBmdW5jdGlvbiBnZXRNb250aChtb250aCkge1xuICAgICAgY29uc3QgZHQgPSBuZXcgRGF0ZSgpO1xuICAgICAgcmV0dXJuIGR0LnNldE1vbnRoKG1vbnRoLCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gW1xuICAgICAgZ2V0TW9udGgoMCksXG4gICAgICBnZXRNb250aCgxKSxcbiAgICAgIGdldE1vbnRoKDIpLFxuICAgICAgZ2V0TW9udGgoMyksXG4gICAgICBnZXRNb250aCg0KSxcbiAgICAgIGdldE1vbnRoKDUpLFxuICAgICAgZ2V0TW9udGgoNiksXG4gICAgICBnZXRNb250aCg3KSxcbiAgICAgIGdldE1vbnRoKDgpLFxuICAgICAgZ2V0TW9udGgoOSksXG4gICAgICBnZXRNb250aCgxMCksXG4gICAgICBnZXRNb250aCgxMSksXG4gICAgXS5yZWR1Y2UoKG1vbnRocywgZHQpID0+IHtcbiAgICAgIG1vbnRocy5wdXNoKG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMudXNlckxvY2FsZSwgeyBtb250aDogJ2xvbmcnIH0pLmZvcm1hdChkdCkpO1xuICAgICAgcmV0dXJuIG1vbnRocztcbiAgICB9LCBbXSk7XG4gIH1cblxuICBnZXRQcm9wZXJ0eSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXNbdmFsdWVdO1xuICB9XG5cbiAgZ2V0UmFuZ2VUZXh0KHBhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlciwgbGVuZ3RoOiBudW1iZXIsIHNob3J0OiBib29sZWFuKTogc3RyaW5nIHtcbiAgICBpZiAobGVuZ3RoID09PSAwIHx8IHBhZ2VTaXplID09PSAwKSB7XG4gICAgICByZXR1cm4gYERpc3BsYXlpbmcgMCBvZiAke2xlbmd0aH1gO1xuICAgIH1cblxuICAgIGxlbmd0aCA9IE1hdGgubWF4KGxlbmd0aCwgMCk7XG5cbiAgICBjb25zdCBzdGFydEluZGV4ID0gcGFnZSAqIHBhZ2VTaXplO1xuXG4gICAgLy8gSWYgdGhlIHN0YXJ0IGluZGV4IGV4Y2VlZHMgdGhlIGxpc3QgbGVuZ3RoLCBkbyBub3QgdHJ5IGFuZCBmaXggdGhlIGVuZCBpbmRleCB0byB0aGUgZW5kLlxuICAgIGNvbnN0IGVuZEluZGV4ID0gc3RhcnRJbmRleCA8IGxlbmd0aCA/IE1hdGgubWluKHN0YXJ0SW5kZXggKyBwYWdlU2l6ZSwgbGVuZ3RoKSA6IHN0YXJ0SW5kZXggKyBwYWdlU2l6ZTtcblxuICAgIHJldHVybiBzaG9ydCA/IGAke3N0YXJ0SW5kZXggKyAxfSAtICR7ZW5kSW5kZXh9LyR7bGVuZ3RofWAgOiBgRGlzcGxheWluZyAke3N0YXJ0SW5kZXggKyAxfSAtICR7ZW5kSW5kZXh9IG9mICR7bGVuZ3RofWA7XG4gIH1cblxuICBmb3JtYXRDdXJyZW5jeSh2YWx1ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBjb25zdCBvcHRpb25zID0geyBzdHlsZTogJ2N1cnJlbmN5JywgY3VycmVuY3k6ICdVU0QnIH07XG4gICAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdCh0aGlzLnVzZXJMb2NhbGUsIG9wdGlvbnMpLmZvcm1hdCh2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogRXh0ZW5kcyB0aGUgSW50bC5udW1iZXJGb3JtYXQgY2FwYWJpbGl0eSB3aXRoIHR3byBleHRyYSBmZWF0dXJlczpcbiAgICogIC0gRG9lcyBOT1Qgcm91bmQgdmFsdWVzLCBidXQgaW5zdGVhZCB0cnVuY2F0ZXMgdG8gbWF4aW11bUZyYWN0aW9uRGlnaXRzXG4gICAqICAtIEJ5IGRlZmF1bHQgdXNlcyBhY2NvdW50aW5nIGZvcm1hdCBmb3IgbmVnYXRpdmUgbnVtYmVyczogKDMuMTQpIGluc3RlYWQgb2YgLTMuMTQuXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZSAgICAgICAgICAgVGhlIG51bWJlciB2YWx1ZSB0byBjb252ZXJ0IHRvIHN0cmluZ1xuICAgKiBAcGFyYW0gb3ZlcnJpZGVPcHRpb25zIEFsbG93cyBmb3Igb3ZlcnJpZGluZyBvcHRpb25zIHVzZWQgYW5kIHBhc3NlZCB0byBJbnRsLk51bWJlckZvcm1hdCgpXG4gICAqL1xuICBmb3JtYXRCaWdEZWNpbWFsKHZhbHVlOiBudW1iZXIsIG92ZXJyaWRlT3B0aW9ucz86IEJpZ0RlY2ltYWxGb3JtYXRPcHRpb25zKTogc3RyaW5nIHtcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9uczogQmlnRGVjaW1hbEZvcm1hdE9wdGlvbnMgPSB7XG4gICAgICBzdHlsZTogJ2RlY2ltYWwnLFxuICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgICAgdXNlQWNjb3VudGluZ0Zvcm1hdDogdHJ1ZSxcbiAgICB9O1xuICAgIGNvbnN0IG9wdGlvbnM6IEJpZ0RlY2ltYWxGb3JtYXRPcHRpb25zID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0T3B0aW9ucywgb3ZlcnJpZGVPcHRpb25zKTtcbiAgICBjb25zdCB0cnVuY2F0ZWRWYWx1ZSA9IHRoaXMudHJ1bmNhdGVUb1ByZWNpc2lvbih2YWx1ZSwgb3B0aW9ucy5tYXhpbXVtRnJhY3Rpb25EaWdpdHMpO1xuICAgIGxldCBfdmFsdWUgPSBuZXcgSW50bC5OdW1iZXJGb3JtYXQodGhpcy51c2VyTG9jYWxlLCBvcHRpb25zKS5mb3JtYXQodHJ1bmNhdGVkVmFsdWUpO1xuICAgIGlmICh2YWx1ZSA8IDApIHtcbiAgICAgIF92YWx1ZSA9IG9wdGlvbnMudXNlQWNjb3VudGluZ0Zvcm1hdCA/IGAoJHtfdmFsdWUuc2xpY2UoMSl9KWAgOiBgLSR7X3ZhbHVlLnNsaWNlKDEpfWA7XG4gICAgfVxuICAgIHJldHVybiBfdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSBzdHJpbmctYmFzZWQgdHJ1bmNhdGluZyBvZiBhIG51bWJlciB3aXRoIG5vIHJvdW5kaW5nXG4gICAqL1xuICB0cnVuY2F0ZVRvUHJlY2lzaW9uKHZhbHVlOiBudW1iZXIsIHByZWNpc2lvbjogbnVtYmVyKSB7XG4gICAgbGV0IHZhbHVlQXNTdHJpbmcgPSB2YWx1ZSA/IHZhbHVlLnRvU3RyaW5nKCkgOiAnMCc7XG4gICAgY29uc3QgZGVjaW1hbEluZGV4ID0gdmFsdWVBc1N0cmluZy5pbmRleE9mKCcuJyk7XG4gICAgaWYgKGRlY2ltYWxJbmRleCA+IC0xICYmIGRlY2ltYWxJbmRleCArIHByZWNpc2lvbiArIDEgPCB2YWx1ZUFzU3RyaW5nLmxlbmd0aCkge1xuICAgICAgdmFsdWVBc1N0cmluZyA9IHZhbHVlQXNTdHJpbmcuc3Vic3RyaW5nKDAsIHZhbHVlQXNTdHJpbmcuaW5kZXhPZignLicpICsgcHJlY2lzaW9uICsgMSk7XG4gICAgfVxuICAgIHJldHVybiBOdW1iZXIodmFsdWVBc1N0cmluZyk7XG4gIH1cblxuICBmb3JtYXROdW1iZXIodmFsdWUsIG9wdGlvbnM/OiBJbnRsLk51bWJlckZvcm1hdE9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KHRoaXMudXNlckxvY2FsZSwgb3B0aW9ucykuZm9ybWF0KHZhbHVlKTtcbiAgfVxuXG4gIGZvcm1hdERhdGVTaG9ydCh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgRGF0ZSkge1xuICAgIGNvbnN0IG9wdGlvbnM6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zID0ge1xuICAgICAgLy8gREQvTU0vWVlZWSwgSEg6TU0gQSAtIDAyLzE0LzIwMTcsIDE6MTcgUE1cbiAgICAgIG1vbnRoOiAnMi1kaWdpdCcsXG4gICAgICBkYXk6ICcyLWRpZ2l0JyxcbiAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgIGhvdXI6ICdudW1lcmljJyxcbiAgICAgIG1pbnV0ZTogJzItZGlnaXQnLFxuICAgIH07XG4gICAgY29uc3QgX3ZhbHVlID0gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gJycgPyBuZXcgRGF0ZSgpIDogbmV3IERhdGUodmFsdWUpO1xuICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLnVzZXJMb2NhbGUsIG9wdGlvbnMpLmZvcm1hdChfdmFsdWUpO1xuICB9XG5cbiAgZm9ybWF0VGltZSh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgRGF0ZSkge1xuICAgIGNvbnN0IG9wdGlvbnM6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zID0ge1xuICAgICAgLy8gSEg6TU0gQSAtIDE6MTcgUE1cbiAgICAgIGhvdXI6ICdudW1lcmljJyxcbiAgICAgIG1pbnV0ZTogJzItZGlnaXQnLFxuICAgIH07XG4gICAgY29uc3QgX3ZhbHVlID0gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gJycgPyBuZXcgRGF0ZSgpIDogbmV3IERhdGUodmFsdWUpO1xuICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLnVzZXJMb2NhbGUsIG9wdGlvbnMpLmZvcm1hdChfdmFsdWUpO1xuICB9XG5cbiAgZm9ybWF0RGF0ZSh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgRGF0ZSkge1xuICAgIGNvbnN0IG9wdGlvbnM6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zID0ge1xuICAgICAgLy8gREQvTU0vWVlZWSAtIDAyLzE0LzIwMTdcbiAgICAgIG1vbnRoOiAnMi1kaWdpdCcsXG4gICAgICBkYXk6ICcyLWRpZ2l0JyxcbiAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICB9O1xuICAgIGNvbnN0IF92YWx1ZSA9IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09ICcnID8gbmV3IERhdGUoKSA6IG5ldyBEYXRlKHZhbHVlKTtcbiAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy51c2VyTG9jYWxlLCBvcHRpb25zKS5mb3JtYXQoX3ZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgTk9WT19FTEVNRU5UU19MQUJFTFNfUFJPVklERVJTID0gW3sgcHJvdmlkZTogTm92b0xhYmVsU2VydmljZSwgdXNlQ2xhc3M6IE5vdm9MYWJlbFNlcnZpY2UgfV07XG4iXX0=