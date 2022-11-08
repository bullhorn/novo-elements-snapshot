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
        this.isEmpty = 'Is Empty?';
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
NovoLabelService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLabelService, providedIn: `root` });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLabelService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: `root`,
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [LOCALE_ID]
                }] }]; } });
export const NOVO_ELEMENTS_LABELS_PROVIDERS = [{ provide: NovoLabelService, useClass: NovoLabelService }];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm92by1sYWJlbC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvc2VydmljZXMvbGFiZWxzL25vdm8tbGFiZWwtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFnQnhFLE1BQU0sT0FBTyxnQkFBZ0I7SUE0SDNCLFlBR1MsYUFBYSxPQUFPO1FBQXBCLGVBQVUsR0FBVixVQUFVLENBQVU7UUE5SDdCLFFBQUcsR0FBRyxLQUFLLENBQUM7UUFDWixRQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ1osWUFBTyxHQUFHLFFBQVEsQ0FBQztRQUNuQixVQUFLLEdBQUcsT0FBTyxDQUFDO1FBQ2hCLFNBQUksR0FBRyxNQUFNLENBQUM7UUFDZCwwQkFBcUIsR0FBRyxPQUFPLENBQUM7UUFDaEMsY0FBUyxHQUFHLFlBQVksQ0FBQztRQUN6QixzQkFBaUIsR0FBRywwQkFBMEIsQ0FBQztRQUMvQyw2QkFBd0IsR0FBRyxxQkFBcUIsQ0FBQztRQUNqRCx5QkFBb0IsR0FBRyxpQkFBaUIsQ0FBQztRQUN6Qyx3QkFBbUIsR0FBRywwQkFBMEIsQ0FBQztRQUNqRCxnQkFBVyxHQUFHLDBCQUEwQixDQUFDO1FBQ3pDLHlCQUFvQixHQUFHLDhCQUE4QixDQUFDO1FBQ3RELGdCQUFXLEdBQUcsMEJBQTBCLENBQUM7UUFDekMsMkJBQXNCLEdBQUcsa0JBQWtCLENBQUM7UUFDNUMsbUJBQWMsR0FBRywwQkFBMEIsQ0FBQztRQUM1QyxtQkFBYyxHQUFHLDBCQUEwQixDQUFDO1FBQzVDLGFBQVEsR0FBRyxVQUFVLENBQUM7UUFDdEIsbUJBQWMsR0FBRyxxQkFBcUIsQ0FBQztRQUN2QyxTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsV0FBTSxHQUFHLFFBQVEs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LENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQTZCO1FBQ3RDLE1BQU0sT0FBTyxHQUErQjtZQUMxQywwQkFBMEI7WUFDMUIsS0FBSyxFQUFFLFNBQVM7WUFDaEIsR0FBRyxFQUFFLFNBQVM7WUFDZCxJQUFJLEVBQUUsU0FBUztTQUNoQixDQUFDO1FBQ0YsTUFBTSxNQUFNLEdBQUcsS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BHLE9BQU8sSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFFLENBQUM7OzhHQXJWVSxnQkFBZ0Isa0JBOEhqQixTQUFTO2tIQTlIUixnQkFBZ0IsY0FGZixNQUFNOzRGQUVQLGdCQUFnQjtrQkFINUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQThISSxRQUFROzswQkFDUixNQUFNOzJCQUFDLFNBQVM7O0FBME5yQixNQUFNLENBQUMsTUFBTSw4QkFBOEIsR0FBRyxDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgTE9DQUxFX0lELCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gIGltcG9ydCBEYXRlVGltZUZvcm1hdFBhcnQgPSBJbnRsLkRhdGVUaW1lRm9ybWF0UGFydDtcblxuaW50ZXJmYWNlIFRpbWVGb3JtYXRQYXJ0cyB7XG4gIGhvdXI6IHN0cmluZztcbiAgbWludXRlOiBzdHJpbmc7XG4gIGRheVBlcmlvZD86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCaWdEZWNpbWFsRm9ybWF0T3B0aW9ucyBleHRlbmRzIEludGwuTnVtYmVyRm9ybWF0T3B0aW9ucyB7XG4gIHVzZUFjY291bnRpbmdGb3JtYXQ/OiBib29sZWFuOyAvLyBSZW5kZXIgbmVnYXRpdmUgbnVtYmVycyB1c2luZyBwYXJlbnMuIFRydWU6IFwiKDMuMTQpXCIsIEZhbHNlOiBcIi0zLjE0XCJcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiBgcm9vdGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9MYWJlbFNlcnZpY2Uge1xuICBhbmQgPSAnYW5kJztcbiAgbm90ID0gJ25vdCc7XG4gIGZpbHRlcnMgPSAnRmlsdGVyJztcbiAgY2xlYXIgPSAnQ2xlYXInO1xuICBzb3J0ID0gJ1NvcnQnO1xuICBkaXN0cmlidXRpb25MaXN0T3duZXIgPSAnT3duZXInO1xuICBkYXRlQWRkZWQgPSAnRGF0ZSBBZGRlZCc7XG4gIGVtcHR5VGFibGVNZXNzYWdlID0gJ05vIFJlY29yZHMgdG8gZGlzcGxheS4uLic7XG4gIG5vTWF0Y2hpbmdSZWNvcmRzTWVzc2FnZSA9ICdObyBNYXRjaGluZyBSZWNvcmRzJztcbiAgbm9Nb3JlUmVjb3Jkc01lc3NhZ2UgPSAnTm8gTW9yZSBSZWNvcmRzJztcbiAgZXJyb3JlZFRhYmxlTWVzc2FnZSA9ICdPb3BzISBBbiBlcnJvciBvY2N1cnJlZC4nO1xuICBwaWNrZXJFcnJvciA9ICdPb3BzISBBbiBlcnJvciBvY2N1cnJlZC4nO1xuICBwaWNrZXJUZXh0RmllbGRFbXB0eSA9ICdCZWdpbiB0eXBpbmcgdG8gc2VlIHJlc3VsdHMuJztcbiAgcGlja2VyRW1wdHkgPSAnTm8gcmVzdWx0cyB0byBkaXNwbGF5Li4uJztcbiAgdGFiYmVkR3JvdXBQaWNrZXJFbXB0eSA9ICdObyByZXN1bHRzIGZvdW5kJztcbiAgcXVpY2tOb3RlRXJyb3IgPSAnT29wcyEgQW4gZXJyb3Igb2NjdXJyZWQuJztcbiAgcXVpY2tOb3RlRW1wdHkgPSAnTm8gcmVzdWx0cyB0byBkaXNwbGF5Li4uJztcbiAgcmVxdWlyZWQgPSAnUmVxdWlyZWQnO1xuICBudW1iZXJUb29MYXJnZSA9ICdOdW1iZXIgaXMgdG9vIGxhcmdlJztcbiAgc2F2ZSA9ICdTYXZlJztcbiAgY2FuY2VsID0gJ0NhbmNlbCc7XG4gIG5leHQgPSAnTmV4dCc7XG4gIGl0ZW1zUGVyUGFnZSA9ICdJdGVtcyBwZXIgcGFnZTonO1xuICBjaG9vc2VBRmllbGQgPSAnQ2hvb3NlIGEgZmllbGQuLi4nO1xuICBvcGVyYXRvciA9ICdPcGVyYXRvci4uLic7XG4gIHNlbGVjdCA9ICdTZWxlY3QuLi4nO1xuICB2YWx1ZSA9ICdWYWx1ZS4uLic7XG4gIHNlbGVjdERhdGVSYW5nZSA9ICdTZWxlY3QgRGF0ZSBSYW5nZS4uLic7XG4gIHR5cGVUb0FkZENoaXBzID0gJ1R5cGUgdG8gYWRkIGNoaXBzLi4uJztcbiAgc2VsZWN0ZWQgPSAnU2VsZWN0ZWQnO1xuICBzZWxlY3RBbGxPblBhZ2UgPSAnU2VsZWN0IGFsbCBvbiBwYWdlJztcbiAgZGVzZWxlY3RBbGwgPSAnRGVzZWxlY3QgYWxsJztcbiAgcmVmcmVzaCA9ICdSZWZyZXNoJztcbiAgY2xvc2UgPSAnQ2xvc2UnO1xuICBtb3ZlID0gJ01vdmUnO1xuICBzdGFydERhdGUgPSAnU3RhcnQgRGF0ZSc7XG4gIGVuZERhdGUgPSAnRW5kIERhdGUnO1xuICByYXRlID0gJ1JhdGUnO1xuICBtb3JlID0gJ21vcmUnO1xuICBjbGVhckFsbCA9ICdDTEVBUiBBTEwnO1xuICBjbGVhckFsbE5vcm1hbENhc2UgPSAnQ2xlYXIgQWxsJztcbiAgY2xlYXJTb3J0ID0gJ0NsZWFyIFNvcnQnO1xuICBjbGVhckZpbHRlciA9ICdDbGVhciBGaWx0ZXInO1xuICBjbGVhclNlYXJjaCA9ICdDbGVhciBTZWFyY2gnO1xuICBjbGVhclNlbGVjdGVkID0gJ0NsZWFyIFNlbGVjdGVkJztcbiAgdG9kYXkgPSAnVG9kYXknO1xuICBub3cgPSAnTm93JztcbiAgaXNSZXF1aXJlZCA9ICdpcyByZXF1aXJlZCc7XG4gIG5vdFZhbGlkWWVhciA9ICdpcyBub3QgYSB2YWxpZCB5ZWFyJztcbiAgaXNUb29MYXJnZSA9ICdpcyB0b28gbGFyZ2UnO1xuICBpbnZhbGlkQWRkcmVzcyA9ICdyZXF1aXJlcyBhdCBsZWFzdCBvbmUgZmllbGQgZmlsbGVkIG91dCc7XG4gIGludmFsaWRFbWFpbCA9ICdyZXF1aXJlcyBhIHZhbGlkIGVtYWlsIChleC4gYWJjQDEyMy5jb20pJztcbiAgbWluTGVuZ3RoID0gJ2lzIHJlcXVpcmVkIHRvIGJlIGEgbWluaW11bSBsZW5ndGggb2YnO1xuICBwYXN0MURheSA9ICdQYXN0IDEgRGF5JztcbiAgcGFzdDdEYXlzID0gJ1Bhc3QgNyBEYXlzJztcbiAgcGFzdDMwRGF5cyA9ICdQYXN0IDMwIERheXMnO1xuICBwYXN0OTBEYXlzID0gJ1Bhc3QgOTAgRGF5cyc7XG4gIHBhc3QxWWVhciA9ICdQYXN0IDEgWWVhcic7XG4gIG5leHQxRGF5ID0gJ05leHQgMSBEYXknO1xuICBuZXh0N0RheXMgPSAnTmV4dCA3IERheXMnO1xuICBuZXh0MzBEYXlzID0gJ05leHQgMzAgRGF5cyc7XG4gIG5leHQ5MERheXMgPSAnTmV4dCA5MCBEYXlzJztcbiAgbmV4dDFZZWFyID0gJ05leHQgMSBZZWFyJztcbiAgY3VzdG9tRGF0ZVJhbmdlID0gJ0N1c3RvbSBEYXRlIFJhbmdlJztcbiAgYmFja1RvUHJlc2V0RmlsdGVycyA9ICdCYWNrIHRvIFByZXNldCBGaWx0ZXJzJztcbiAgb2tHb3RJdCA9ICdPaywgR290IGl0JztcbiAgYWRkcmVzcyA9ICdBZGRyZXNzJztcbiAgYWRkcmVzczEgPSAnQWRkcmVzcyc7XG4gIGFwdCA9ICdBcHQnOyAvLyBUT0RPIGRlbGV0ZVxuICBhZGRyZXNzMiA9ICdBcHQnO1xuICBjaXR5ID0gJ0NpdHkgLyBMb2NhbGl0eSc7XG4gIHN0YXRlID0gJ1N0YXRlIC8gUmVnaW9uJztcbiAgemlwID0gJ1Bvc3RhbCBDb2RlJztcbiAgemlwQ29kZSA9ICdQb3N0YWwgQ29kZSc7IC8vIFRPRE8gZGVsZXRlXG4gIGNvdW50cnkgPSAnQ291bnRyeSc7XG4gIG9yID0gJ29yJztcbiAgY2xpY2tUb0Jyb3dzZSA9ICdjbGljayB0byBicm93c2UnO1xuICBjaG9vc2VBRmlsZSA9ICdDaG9vc2UgYSBmaWxlJztcbiAgbm8gPSAnTm8nO1xuICB5ZXMgPSAnWWVzJztcbiAgc2VhcmNoID0gJ1NFQVJDSCc7XG4gIG5vSXRlbXMgPSAnVGhlcmUgYXJlIG5vIGl0ZW1zJztcbiAgZGF0ZUZvcm1hdCA9ICdNTS9kZC95eXl5JztcbiAgZGF0ZUZvcm1hdFBsYWNlaG9sZGVyID0gJ01NL0REL1lZWVknO1xuICBsb2NhbERhdGVQbGFjZWhvbGRlciA9ICdtbS9kZC95eXl5JztcbiAgdGltZUZvcm1hdFBsYWNlaG9sZGVyQU0gPSAnaGg6bW0gQU0nO1xuICB0aW1lRm9ybWF0UGxhY2Vob2xkZXIyNEhvdXIgPSAnSEg6bW0nO1xuICB0aW1lRm9ybWF0QU0gPSAnQU0nO1xuICB0aW1lRm9ybWF0UE0gPSAnUE0nO1xuICBjb25maXJtQ2hhbmdlc01vZGFsTWVzc2FnZSA9ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2hhbmdlIHRoaXMgZmllbGQ/JztcbiAgcHJvbXB0TW9kYWxNZXNzYWdlID0gJ0RvIHlvdSB3YW50IHRvIHBlcmZvcm0gdGhlIGZvbGxvd2luZyBjaGFuZ2VzPyc7XG4gIGFzeW5jRmFpbHVyZSA9ICdBc3luYyB2YWxpZGF0aW9uIHdhcyBub3QgY2FsbGVkIHdpdGhpbiB0aGUgMTBzIHRocmVzaG9sZCwgeW91IG1pZ2h0IHdhbnQgdG8gcmVsb2FkIHRoZSBwYWdlIHRvIHRyeSBhZ2Fpbic7XG4gIHByZXZpb3VzID0gJ1ByZXZpb3VzJztcbiAgYWN0aW9ucyA9ICdBY3Rpb25zJztcbiAgYWxsID0gJ0FsbCc7XG4gIGdyb3VwZWRNdWx0aVBpY2tlckVtcHR5ID0gJ05vIGl0ZW1zIHRvIGRpc3BsYXknO1xuICBncm91cGVkTXVsdGlQaWNrZXJTZWxlY3RDYXRlZ29yeSA9ICdTZWxlY3QgYSBjYXRlZ29yeSBmcm9tIHRoZSBsZWZ0IHRvIGdldCBzdGFydGVkJztcbiAgYWRkID0gJ0FkZCc7XG4gIGVuY3J5cHRlZEZpZWxkVG9vbHRpcCA9ICdUaGlzIGRhdGEgaGFzIGJlZW4gc3RvcmVkIGF0IHRoZSBoaWdoZXN0IGxldmVsIG9mIHNlY3VyaXR5JztcbiAgbm9TdGF0ZXNGb3JDb3VudHJ5ID0gJ05vIHN0YXRlcyBhdmFpbGFibGUgZm9yIHRoZSBzZWxlY3RlZCBjb3VudHJ5JztcbiAgc2VsZWN0Q291bnRyeUZpcnN0ID0gJ1BsZWFzZSBzZWxlY3QgYSBjb3VudHJ5IGJlZm9yZSBzZWxlY3RpbmcgYSBzdGF0ZSc7XG4gIGludmFsaWRJbnRlZ2VySW5wdXQgPSAnU3BlY2lhbCBjaGFyYWN0ZXJzIGFyZSBub3QgYWxsb3dlZCBmb3InO1xuICBtYXhSZWNvcmRzUmVhY2hlZCA9ICdTb3JyeSwgeW91IGhhdmUgcmVhY2hlZCB0aGUgbWF4aW11bSBudW1iZXIgb2YgcmVjb3JkcyBhbGxvd2VkIGZvciB0aGlzIGZpZWxkJztcbiAgc2VsZWN0RmlsdGVyT3B0aW9ucyA9ICdQbGVhc2Ugc2VsZWN0IG9uZSBvciBtb3JlIGZpbHRlciBvcHRpb25zIGJlbG93Lic7XG4gIGFkZENvbmRpdGlvbiA9ICdBZGQgQ29uZGl0aW9uJztcbiAgaW5jbHVkZUFueSA9ICdJbmNsdWRlIEFueSc7XG4gIGluY2x1ZGVBbGwgPSAnSW5jbHVkZSBBbGwnO1xuICBleGNsdWRlID0gJ0V4Y2x1ZGUnO1xuICByYWRpdXMgPSAnUmFkaXVzJztcbiAgZXF1YWxzID0gJ0VxdWFscyc7XG4gIGVxdWFsVG8gPSAnRXF1YWwgVG8nO1xuICBncmVhdGVyVGhhbiA9ICdHcmVhdGVyIFRoYW4nO1xuICBsZXNzVGhhbiA9ICdMZXNzIFRoYW4nO1xuICBkb2VzTm90RXF1YWwgPSAnRG9lcyBOb3QgRXF1YWwnO1xuICB0cnVlID0gJ1RydWUnO1xuICBmYWxzZSA9ICdGYWxzZSc7XG4gIGJlZm9yZSA9ICdCZWZvcmUnO1xuICBhZnRlciA9ICdBZnRlcic7XG4gIGJldHdlZW4gPSAnQmV0d2Vlbic7XG4gIHdpdGhpbiA9ICdXaXRoaW4nO1xuICBpc0VtcHR5ID0gJ0lzIEVtcHR5Pyc7XG4gIHJlZnJlc2hQYWdpbmF0aW9uID0gJ1JlZnJlc2ggUGFnaW5hdGlvbic7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KExPQ0FMRV9JRClcbiAgICBwdWJsaWMgdXNlckxvY2FsZSA9ICdlbi1VUycsXG4gICkge31cblxuICBtYXhsZW5ndGhNZXRXaXRoRmllbGQoZmllbGQ6IHN0cmluZywgbWF4bGVuZ3RoOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBgU29ycnksIHlvdSBoYXZlIHJlYWNoZWQgdGhlIG1heGltdW0gY2hhcmFjdGVyIGNvdW50IG9mICR7bWF4bGVuZ3RofSBmb3IgJHtmaWVsZH0uYDtcbiAgfVxuXG4gIG1heGxlbmd0aE1ldChtYXhsZW5ndGg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBTb3JyeSwgeW91IGhhdmUgcmVhY2hlZCB0aGUgbWF4aW11bSBjaGFyYWN0ZXIgY291bnQgb2YgJHttYXhsZW5ndGh9IGZvciB0aGlzIGZpZWxkLmA7XG4gIH1cblxuICBpbnZhbGlkTWF4bGVuZ3RoV2l0aEZpZWxkKGZpZWxkOiBzdHJpbmcsIG1heGxlbmd0aDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYFNvcnJ5LCB5b3UgaGF2ZSBleGNlZWRlZCB0aGUgbWF4aW11bSBjaGFyYWN0ZXIgY291bnQgb2YgJHttYXhsZW5ndGh9IGZvciAke2ZpZWxkfS5gO1xuICB9XG5cbiAgaW52YWxpZE1heGxlbmd0aChtYXhsZW5ndGg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBTb3JyeSwgeW91IGhhdmUgZXhjZWVkZWQgdGhlIG1heGltdW0gY2hhcmFjdGVyIGNvdW50IG9mICR7bWF4bGVuZ3RofSBmb3IgdGhpcyBmaWVsZC5gO1xuICB9XG5cbiAgZ2V0VG9NYW55UGx1c01vcmUodG9NYW55OiB7IHF1YW50aXR5OiBudW1iZXIgfSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGArJHt0b01hbnkucXVhbnRpdHl9IG1vcmVgO1xuICB9XG5cbiAgc2VsZWN0ZWRSZWNvcmRzKHNlbGVjdGVkOiBudW1iZXIpIHtcbiAgICByZXR1cm4gYCR7c2VsZWN0ZWR9IHJlY29yZHMgYXJlIHNlbGVjdGVkLmA7XG4gIH1cblxuICBzaG93aW5nWG9mWFJlc3VsdHMoc2hvd246IG51bWJlciwgdG90YWw6IG51bWJlcikge1xuICAgIHJldHVybiBgU2hvd2luZyAke3Nob3dufSBvZiAke3RvdGFsfSBSZXN1bHRzLmA7XG4gIH1cblxuICB0b3RhbFJlY29yZHModG90YWw6IG51bWJlciwgc2VsZWN0ID0gZmFsc2UpIHtcbiAgICByZXR1cm4gc2VsZWN0ID8gYFNlbGVjdCBhbGwgJHt0b3RhbH0gcmVjb3Jkcy5gIDogYERlLXNlbGVjdCByZW1haW5pbmcgJHt0b3RhbH0gcmVjb3Jkcy5gO1xuICB9XG5cbiAgZGF0ZUZvcm1hdFN0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXQ7XG4gIH1cblxuICBsb2NhbGl6ZWREYXRlUGxhY2Vob2xkZXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5sb2NhbERhdGVQbGFjZWhvbGRlcjtcbiAgfVxuXG4gIHRhYmJlZEdyb3VwQ2xlYXJTdWdnZXN0aW9uKHRhYkxhYmVsUGx1cmFsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBgQ2xlYXIgeW91ciBzZWFyY2ggdG8gc2VlIGFsbCAke3RhYkxhYmVsUGx1cmFsfS5gO1xuICB9XG5cbiAgZm9ybWF0RGF0ZVdpdGhGb3JtYXQodmFsdWU6IGFueSwgZm9ybWF0OiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucykge1xuICAgIGNvbnN0IGRhdGUgPSB2YWx1ZSBpbnN0YW5jZW9mIERhdGUgPyB2YWx1ZSA6IG5ldyBEYXRlKHZhbHVlKTtcbiAgICBpZiAoZGF0ZS5nZXRUaW1lKCkgIT09IGRhdGUuZ2V0VGltZSgpKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLnVzZXJMb2NhbGUsIGZvcm1hdCkuZm9ybWF0KGRhdGUpO1xuICB9XG5cbiAgZm9ybWF0VG9UaW1lT25seShwYXJhbSkge31cblxuICBmb3JtYXRUb0RhdGVPbmx5KHBhcmFtKSB7fVxuXG4gIGZvcm1hdFRpbWVXaXRoRm9ybWF0KHZhbHVlOiBhbnksIGZvcm1hdDogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMpOiBzdHJpbmcge1xuICAgIGNvbnN0IGRhdGUgPSB2YWx1ZSBpbnN0YW5jZW9mIERhdGUgPyB2YWx1ZSA6IG5ldyBEYXRlKHZhbHVlKTtcbiAgICBpZiAoZGF0ZS5nZXRUaW1lKCkgIT09IGRhdGUuZ2V0VGltZSgpKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGNvbnN0IHRpbWVQYXJ0czogeyBbdHlwZTogc3RyaW5nXTogc3RyaW5nIH0gPSBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMudXNlckxvY2FsZSwgZm9ybWF0KVxuICAgICAgLmZvcm1hdFRvUGFydHMoZGF0ZSlcbiAgICAgIC5yZWR1Y2UoKG9iaiwgcGFydCkgPT4ge1xuICAgICAgICBvYmpbcGFydC50eXBlXSA9IHBhcnQudmFsdWU7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9LCB7fSk7XG4gICAgY29uc3QgZGF5UGVyaW9kID0gdGltZVBhcnRzLmRheVBlcmlvZCA/IHRpbWVQYXJ0cy5kYXlQZXJpb2QgOiAnJztcbiAgICBjb25zdCByZXMgPSBgJHt0aW1lUGFydHMuaG91cn06JHt0aW1lUGFydHMubWludXRlfSAke2RheVBlcmlvZH1gO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBnZXRXZWVrZGF5cyh3ZWVrU3RhcnRzT24gPSAwKTogc3RyaW5nW10ge1xuICAgIGZ1bmN0aW9uIGdldERheShkYXlPZldlZWspIHtcbiAgICAgIGNvbnN0IGR0ID0gbmV3IERhdGUoKTtcbiAgICAgIHJldHVybiBkdC5zZXREYXRlKGR0LmdldERhdGUoKSAtIGR0LmdldERheSgpICsgZGF5T2ZXZWVrKTtcbiAgICB9XG5cbiAgICBsZXQgd2Vla2RheXMgPSBbZ2V0RGF5KDApLCBnZXREYXkoMSksIGdldERheSgyKSwgZ2V0RGF5KDMpLCBnZXREYXkoNCksIGdldERheSg1KSwgZ2V0RGF5KDYpXS5yZWR1Y2UoKHdlZWtkYXlzLCBkdCkgPT4ge1xuICAgICAgd2Vla2RheXMucHVzaChuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLnVzZXJMb2NhbGUsIHsgd2Vla2RheTogJ2xvbmcnIH0pLmZvcm1hdChkdCkpO1xuICAgICAgcmV0dXJuIHdlZWtkYXlzO1xuICAgIH0sIFtdKTtcblxuICAgIGlmICh3ZWVrU3RhcnRzT24gPiAwICYmIHdlZWtTdGFydHNPbiA8PSA2KSB7XG4gICAgICBjb25zdCBuZXdTdGFydCA9IHdlZWtkYXlzLnNwbGljZSh3ZWVrU3RhcnRzT24pO1xuICAgICAgd2Vla2RheXMgPSBbLi4ubmV3U3RhcnQsIC4uLndlZWtkYXlzXTtcbiAgICB9XG4gICAgcmV0dXJuIHdlZWtkYXlzO1xuICB9XG5cbiAgZ2V0TW9udGhzKCk6IHN0cmluZ1tdIHtcbiAgICBmdW5jdGlvbiBnZXRNb250aChtb250aCkge1xuICAgICAgY29uc3QgZHQgPSBuZXcgRGF0ZSgpO1xuICAgICAgcmV0dXJuIGR0LnNldE1vbnRoKG1vbnRoLCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gW1xuICAgICAgZ2V0TW9udGgoMCksXG4gICAgICBnZXRNb250aCgxKSxcbiAgICAgIGdldE1vbnRoKDIpLFxuICAgICAgZ2V0TW9udGgoMyksXG4gICAgICBnZXRNb250aCg0KSxcbiAgICAgIGdldE1vbnRoKDUpLFxuICAgICAgZ2V0TW9udGgoNiksXG4gICAgICBnZXRNb250aCg3KSxcbiAgICAgIGdldE1vbnRoKDgpLFxuICAgICAgZ2V0TW9udGgoOSksXG4gICAgICBnZXRNb250aCgxMCksXG4gICAgICBnZXRNb250aCgxMSksXG4gICAgXS5yZWR1Y2UoKG1vbnRocywgZHQpID0+IHtcbiAgICAgIG1vbnRocy5wdXNoKG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMudXNlckxvY2FsZSwgeyBtb250aDogJ2xvbmcnIH0pLmZvcm1hdChkdCkpO1xuICAgICAgcmV0dXJuIG1vbnRocztcbiAgICB9LCBbXSk7XG4gIH1cblxuICBnZXRQcm9wZXJ0eSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXNbdmFsdWVdO1xuICB9XG5cbiAgZ2V0UmFuZ2VUZXh0KHBhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlciwgbGVuZ3RoOiBudW1iZXIsIHNob3J0OiBib29sZWFuKTogc3RyaW5nIHtcbiAgICBpZiAobGVuZ3RoID09PSAwIHx8IHBhZ2VTaXplID09PSAwKSB7XG4gICAgICByZXR1cm4gYERpc3BsYXlpbmcgMCBvZiAke2xlbmd0aH1gO1xuICAgIH1cblxuICAgIGxlbmd0aCA9IE1hdGgubWF4KGxlbmd0aCwgMCk7XG5cbiAgICBjb25zdCBzdGFydEluZGV4ID0gcGFnZSAqIHBhZ2VTaXplO1xuXG4gICAgLy8gSWYgdGhlIHN0YXJ0IGluZGV4IGV4Y2VlZHMgdGhlIGxpc3QgbGVuZ3RoLCBkbyBub3QgdHJ5IGFuZCBmaXggdGhlIGVuZCBpbmRleCB0byB0aGUgZW5kLlxuICAgIGNvbnN0IGVuZEluZGV4ID0gc3RhcnRJbmRleCA8IGxlbmd0aCA/IE1hdGgubWluKHN0YXJ0SW5kZXggKyBwYWdlU2l6ZSwgbGVuZ3RoKSA6IHN0YXJ0SW5kZXggKyBwYWdlU2l6ZTtcblxuICAgIHJldHVybiBzaG9ydCA/IGAke3N0YXJ0SW5kZXggKyAxfSAtICR7ZW5kSW5kZXh9LyR7bGVuZ3RofWAgOiBgRGlzcGxheWluZyAke3N0YXJ0SW5kZXggKyAxfSAtICR7ZW5kSW5kZXh9IG9mICR7bGVuZ3RofWA7XG4gIH1cblxuICBmb3JtYXRDdXJyZW5jeSh2YWx1ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBjb25zdCBvcHRpb25zID0geyBzdHlsZTogJ2N1cnJlbmN5JywgY3VycmVuY3k6ICdVU0QnIH07XG4gICAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdCh0aGlzLnVzZXJMb2NhbGUsIG9wdGlvbnMpLmZvcm1hdCh2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogRXh0ZW5kcyB0aGUgSW50bC5udW1iZXJGb3JtYXQgY2FwYWJpbGl0eSB3aXRoIHR3byBleHRyYSBmZWF0dXJlczpcbiAgICogIC0gRG9lcyBOT1Qgcm91bmQgdmFsdWVzLCBidXQgaW5zdGVhZCB0cnVuY2F0ZXMgdG8gbWF4aW11bUZyYWN0aW9uRGlnaXRzXG4gICAqICAtIEJ5IGRlZmF1bHQgdXNlcyBhY2NvdW50aW5nIGZvcm1hdCBmb3IgbmVnYXRpdmUgbnVtYmVyczogKDMuMTQpIGluc3RlYWQgb2YgLTMuMTQuXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZSAgICAgICAgICAgVGhlIG51bWJlciB2YWx1ZSB0byBjb252ZXJ0IHRvIHN0cmluZ1xuICAgKiBAcGFyYW0gb3ZlcnJpZGVPcHRpb25zIEFsbG93cyBmb3Igb3ZlcnJpZGluZyBvcHRpb25zIHVzZWQgYW5kIHBhc3NlZCB0byBJbnRsLk51bWJlckZvcm1hdCgpXG4gICAqL1xuICBmb3JtYXRCaWdEZWNpbWFsKHZhbHVlOiBudW1iZXIsIG92ZXJyaWRlT3B0aW9ucz86IEJpZ0RlY2ltYWxGb3JtYXRPcHRpb25zKTogc3RyaW5nIHtcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9uczogQmlnRGVjaW1hbEZvcm1hdE9wdGlvbnMgPSB7XG4gICAgICBzdHlsZTogJ2RlY2ltYWwnLFxuICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgICAgdXNlQWNjb3VudGluZ0Zvcm1hdDogdHJ1ZSxcbiAgICB9O1xuICAgIGNvbnN0IG9wdGlvbnM6IEJpZ0RlY2ltYWxGb3JtYXRPcHRpb25zID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0T3B0aW9ucywgb3ZlcnJpZGVPcHRpb25zKTtcbiAgICBjb25zdCB0cnVuY2F0ZWRWYWx1ZSA9IHRoaXMudHJ1bmNhdGVUb1ByZWNpc2lvbih2YWx1ZSwgb3B0aW9ucy5tYXhpbXVtRnJhY3Rpb25EaWdpdHMpO1xuICAgIGxldCBfdmFsdWUgPSBuZXcgSW50bC5OdW1iZXJGb3JtYXQodGhpcy51c2VyTG9jYWxlLCBvcHRpb25zKS5mb3JtYXQodHJ1bmNhdGVkVmFsdWUpO1xuICAgIGlmICh2YWx1ZSA8IDApIHtcbiAgICAgIF92YWx1ZSA9IG9wdGlvbnMudXNlQWNjb3VudGluZ0Zvcm1hdCA/IGAoJHtfdmFsdWUuc2xpY2UoMSl9KWAgOiBgLSR7X3ZhbHVlLnNsaWNlKDEpfWA7XG4gICAgfVxuICAgIHJldHVybiBfdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSBzdHJpbmctYmFzZWQgdHJ1bmNhdGluZyBvZiBhIG51bWJlciB3aXRoIG5vIHJvdW5kaW5nXG4gICAqL1xuICB0cnVuY2F0ZVRvUHJlY2lzaW9uKHZhbHVlOiBudW1iZXIsIHByZWNpc2lvbjogbnVtYmVyKSB7XG4gICAgbGV0IHZhbHVlQXNTdHJpbmcgPSB2YWx1ZSA/IHZhbHVlLnRvU3RyaW5nKCkgOiAnMCc7XG4gICAgY29uc3QgZGVjaW1hbEluZGV4ID0gdmFsdWVBc1N0cmluZy5pbmRleE9mKCcuJyk7XG4gICAgaWYgKGRlY2ltYWxJbmRleCA+IC0xICYmIGRlY2ltYWxJbmRleCArIHByZWNpc2lvbiArIDEgPCB2YWx1ZUFzU3RyaW5nLmxlbmd0aCkge1xuICAgICAgdmFsdWVBc1N0cmluZyA9IHZhbHVlQXNTdHJpbmcuc3Vic3RyaW5nKDAsIHZhbHVlQXNTdHJpbmcuaW5kZXhPZignLicpICsgcHJlY2lzaW9uICsgMSk7XG4gICAgfVxuICAgIHJldHVybiBOdW1iZXIodmFsdWVBc1N0cmluZyk7XG4gIH1cblxuICBmb3JtYXROdW1iZXIodmFsdWUsIG9wdGlvbnM/OiBJbnRsLk51bWJlckZvcm1hdE9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KHRoaXMudXNlckxvY2FsZSwgb3B0aW9ucykuZm9ybWF0KHZhbHVlKTtcbiAgfVxuXG4gIGZvcm1hdERhdGVTaG9ydCh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgRGF0ZSkge1xuICAgIGNvbnN0IG9wdGlvbnM6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zID0ge1xuICAgICAgLy8gREQvTU0vWVlZWSwgSEg6TU0gQSAtIDAyLzE0LzIwMTcsIDE6MTcgUE1cbiAgICAgIG1vbnRoOiAnMi1kaWdpdCcsXG4gICAgICBkYXk6ICcyLWRpZ2l0JyxcbiAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgIGhvdXI6ICdudW1lcmljJyxcbiAgICAgIG1pbnV0ZTogJzItZGlnaXQnLFxuICAgIH07XG4gICAgY29uc3QgX3ZhbHVlID0gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gJycgPyBuZXcgRGF0ZSgpIDogbmV3IERhdGUodmFsdWUpO1xuICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLnVzZXJMb2NhbGUsIG9wdGlvbnMpLmZvcm1hdChfdmFsdWUpO1xuICB9XG5cbiAgZm9ybWF0VGltZSh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgRGF0ZSkge1xuICAgIGNvbnN0IG9wdGlvbnM6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zID0ge1xuICAgICAgLy8gSEg6TU0gQSAtIDE6MTcgUE1cbiAgICAgIGhvdXI6ICdudW1lcmljJyxcbiAgICAgIG1pbnV0ZTogJzItZGlnaXQnLFxuICAgIH07XG4gICAgY29uc3QgX3ZhbHVlID0gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gJycgPyBuZXcgRGF0ZSgpIDogbmV3IERhdGUodmFsdWUpO1xuICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLnVzZXJMb2NhbGUsIG9wdGlvbnMpLmZvcm1hdChfdmFsdWUpO1xuICB9XG5cbiAgZm9ybWF0RGF0ZSh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgRGF0ZSkge1xuICAgIGNvbnN0IG9wdGlvbnM6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zID0ge1xuICAgICAgLy8gREQvTU0vWVlZWSAtIDAyLzE0LzIwMTdcbiAgICAgIG1vbnRoOiAnMi1kaWdpdCcsXG4gICAgICBkYXk6ICcyLWRpZ2l0JyxcbiAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICB9O1xuICAgIGNvbnN0IF92YWx1ZSA9IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09ICcnID8gbmV3IERhdGUoKSA6IG5ldyBEYXRlKHZhbHVlKTtcbiAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy51c2VyTG9jYWxlLCBvcHRpb25zKS5mb3JtYXQoX3ZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgTk9WT19FTEVNRU5UU19MQUJFTFNfUFJPVklERVJTID0gW3sgcHJvdmlkZTogTm92b0xhYmVsU2VydmljZSwgdXNlQ2xhc3M6IE5vdm9MYWJlbFNlcnZpY2UgfV07XG4iXX0=