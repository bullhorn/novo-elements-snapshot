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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm92by1sYWJlbC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWN4RSxNQUFNLE9BQU8sZ0JBQWdCO0lBMEgzQixZQUdTLGFBQWEsT0FBTztRQUFwQixlQUFVLEdBQVYsVUFBVSxDQUFVO1FBNUg3QixRQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ1osUUFBRyxHQUFHLEtBQUssQ0FBQztRQUNaLFlBQU8sR0FBRyxRQUFRLENBQUM7UUFDbkIsVUFBSyxHQUFHLE9BQU8sQ0FBQztRQUNoQixTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsMEJBQXFCLEdBQUcsT0FBTyxDQUFDO1FBQ2hDLGNBQVMsR0FBRyxZQUFZLENBQUM7UUFDekIsc0JBQWlCLEdBQUcsMEJBQTBCLENBQUM7UUFDL0MsNkJBQXdCLEdBQUcscUJBQXFCLENBQUM7UUFDakQseUJBQW9CLEdBQUcsaUJBQWlCLENBQUM7UUFDekMsd0JBQW1CLEdBQUcsMEJBQTBCLENBQUM7UUFDakQsZ0JBQVcsR0FBRywwQkFBMEIsQ0FBQztRQUN6Qyx5QkFBb0IsR0FBRyw4QkFBOEIsQ0FBQztRQUN0RCxnQkFBVyxHQUFHLDBCQUEwQixDQUFDO1FBQ3pDLDJCQUFzQixHQUFHLGtCQUFrQixDQUFDO1FBQzVDLG1CQUFjLEdBQUcsMEJBQTBCLENBQUM7UUFDNUMsbUJBQWMsR0FBRywwQkFBMEIsQ0FBQztRQUM1QyxhQUFRLEdBQUcsVUFBVSxDQUFDO1FBQ3RCLG1CQUFjLEdBQUcscUJBQXFCLENBQUM7UUFDdkMsU0FBSSxHQUFHLE1BQU0sQ0FBQztRQUNkLFdBQU0sR0FBRyxRQUFR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QU8sR0FBK0I7WUFDMUMsMEJBQTBCO1lBQzFCLEtBQUssRUFBRSxTQUFTO1lBQ2hCLEdBQUcsRUFBRSxTQUFTO1lBQ2QsSUFBSSxFQUFFLFNBQVM7U0FDaEIsQ0FBQztRQUNGLE1BQU0sTUFBTSxHQUFHLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRyxPQUFPLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxRSxDQUFDOzs4R0FuVlUsZ0JBQWdCLGtCQTRIakIsU0FBUztrSEE1SFIsZ0JBQWdCOzRGQUFoQixnQkFBZ0I7a0JBRDVCLFVBQVU7OzBCQTRITixRQUFROzswQkFDUixNQUFNOzJCQUFDLFNBQVM7O0FBME5yQixNQUFNLENBQUMsTUFBTSw4QkFBOEIsR0FBRyxDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgTE9DQUxFX0lELCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gIGltcG9ydCBEYXRlVGltZUZvcm1hdFBhcnQgPSBJbnRsLkRhdGVUaW1lRm9ybWF0UGFydDtcblxuaW50ZXJmYWNlIFRpbWVGb3JtYXRQYXJ0cyB7XG4gIGhvdXI6IHN0cmluZztcbiAgbWludXRlOiBzdHJpbmc7XG4gIGRheVBlcmlvZD86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCaWdEZWNpbWFsRm9ybWF0T3B0aW9ucyBleHRlbmRzIEludGwuTnVtYmVyRm9ybWF0T3B0aW9ucyB7XG4gIHVzZUFjY291bnRpbmdGb3JtYXQ/OiBib29sZWFuOyAvLyBSZW5kZXIgbmVnYXRpdmUgbnVtYmVycyB1c2luZyBwYXJlbnMuIFRydWU6IFwiKDMuMTQpXCIsIEZhbHNlOiBcIi0zLjE0XCJcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vdm9MYWJlbFNlcnZpY2Uge1xuICBhbmQgPSAnYW5kJztcbiAgbm90ID0gJ25vdCc7XG4gIGZpbHRlcnMgPSAnRmlsdGVyJztcbiAgY2xlYXIgPSAnQ2xlYXInO1xuICBzb3J0ID0gJ1NvcnQnO1xuICBkaXN0cmlidXRpb25MaXN0T3duZXIgPSAnT3duZXInO1xuICBkYXRlQWRkZWQgPSAnRGF0ZSBBZGRlZCc7XG4gIGVtcHR5VGFibGVNZXNzYWdlID0gJ05vIFJlY29yZHMgdG8gZGlzcGxheS4uLic7XG4gIG5vTWF0Y2hpbmdSZWNvcmRzTWVzc2FnZSA9ICdObyBNYXRjaGluZyBSZWNvcmRzJztcbiAgbm9Nb3JlUmVjb3Jkc01lc3NhZ2UgPSAnTm8gTW9yZSBSZWNvcmRzJztcbiAgZXJyb3JlZFRhYmxlTWVzc2FnZSA9ICdPb3BzISBBbiBlcnJvciBvY2N1cnJlZC4nO1xuICBwaWNrZXJFcnJvciA9ICdPb3BzISBBbiBlcnJvciBvY2N1cnJlZC4nO1xuICBwaWNrZXJUZXh0RmllbGRFbXB0eSA9ICdCZWdpbiB0eXBpbmcgdG8gc2VlIHJlc3VsdHMuJztcbiAgcGlja2VyRW1wdHkgPSAnTm8gcmVzdWx0cyB0byBkaXNwbGF5Li4uJztcbiAgdGFiYmVkR3JvdXBQaWNrZXJFbXB0eSA9ICdObyByZXN1bHRzIGZvdW5kJztcbiAgcXVpY2tOb3RlRXJyb3IgPSAnT29wcyEgQW4gZXJyb3Igb2NjdXJyZWQuJztcbiAgcXVpY2tOb3RlRW1wdHkgPSAnTm8gcmVzdWx0cyB0byBkaXNwbGF5Li4uJztcbiAgcmVxdWlyZWQgPSAnUmVxdWlyZWQnO1xuICBudW1iZXJUb29MYXJnZSA9ICdOdW1iZXIgaXMgdG9vIGxhcmdlJztcbiAgc2F2ZSA9ICdTYXZlJztcbiAgY2FuY2VsID0gJ0NhbmNlbCc7XG4gIG5leHQgPSAnTmV4dCc7XG4gIGl0ZW1zUGVyUGFnZSA9ICdJdGVtcyBwZXIgcGFnZTonO1xuICBjaG9vc2VBRmllbGQgPSAnQ2hvb3NlIGEgZmllbGQuLi4nO1xuICBvcGVyYXRvciA9ICdPcGVyYXRvci4uLic7XG4gIHNlbGVjdCA9ICdTZWxlY3QuLi4nO1xuICB2YWx1ZSA9ICdWYWx1ZS4uLic7XG4gIHNlbGVjdERhdGVSYW5nZSA9ICdTZWxlY3QgRGF0ZSBSYW5nZS4uLidcbiAgdHlwZVRvQWRkQ2hpcHMgPSAnVHlwZSB0byBhZGQgY2hpcHMuLi4nXG4gIHNlbGVjdGVkID0gJ1NlbGVjdGVkJztcbiAgc2VsZWN0QWxsT25QYWdlID0gJ1NlbGVjdCBhbGwgb24gcGFnZSc7XG4gIGRlc2VsZWN0QWxsID0gJ0Rlc2VsZWN0IGFsbCc7XG4gIHJlZnJlc2ggPSAnUmVmcmVzaCc7XG4gIGNsb3NlID0gJ0Nsb3NlJztcbiAgbW92ZSA9ICdNb3ZlJztcbiAgc3RhcnREYXRlID0gJ1N0YXJ0IERhdGUnO1xuICBlbmREYXRlID0gJ0VuZCBEYXRlJztcbiAgcmF0ZSA9ICdSYXRlJztcbiAgbW9yZSA9ICdtb3JlJztcbiAgY2xlYXJBbGwgPSAnQ0xFQVIgQUxMJztcbiAgY2xlYXJBbGxOb3JtYWxDYXNlID0gJ0NsZWFyIEFsbCc7XG4gIGNsZWFyU29ydCA9ICdDbGVhciBTb3J0JztcbiAgY2xlYXJGaWx0ZXIgPSAnQ2xlYXIgRmlsdGVyJztcbiAgY2xlYXJTZWFyY2ggPSAnQ2xlYXIgU2VhcmNoJztcbiAgY2xlYXJTZWxlY3RlZCA9ICdDbGVhciBTZWxlY3RlZCc7XG4gIHRvZGF5ID0gJ1RvZGF5JztcbiAgbm93ID0gJ05vdyc7XG4gIGlzUmVxdWlyZWQgPSAnaXMgcmVxdWlyZWQnO1xuICBub3RWYWxpZFllYXIgPSAnaXMgbm90IGEgdmFsaWQgeWVhcic7XG4gIGlzVG9vTGFyZ2UgPSAnaXMgdG9vIGxhcmdlJztcbiAgaW52YWxpZEFkZHJlc3MgPSAncmVxdWlyZXMgYXQgbGVhc3Qgb25lIGZpZWxkIGZpbGxlZCBvdXQnO1xuICBpbnZhbGlkRW1haWwgPSAncmVxdWlyZXMgYSB2YWxpZCBlbWFpbCAoZXguIGFiY0AxMjMuY29tKSc7XG4gIG1pbkxlbmd0aCA9ICdpcyByZXF1aXJlZCB0byBiZSBhIG1pbmltdW0gbGVuZ3RoIG9mJztcbiAgcGFzdDFEYXkgPSAnUGFzdCAxIERheSc7XG4gIHBhc3Q3RGF5cyA9ICdQYXN0IDcgRGF5cyc7XG4gIHBhc3QzMERheXMgPSAnUGFzdCAzMCBEYXlzJztcbiAgcGFzdDkwRGF5cyA9ICdQYXN0IDkwIERheXMnO1xuICBwYXN0MVllYXIgPSAnUGFzdCAxIFllYXInO1xuICBuZXh0MURheSA9ICdOZXh0IDEgRGF5JztcbiAgbmV4dDdEYXlzID0gJ05leHQgNyBEYXlzJztcbiAgbmV4dDMwRGF5cyA9ICdOZXh0IDMwIERheXMnO1xuICBuZXh0OTBEYXlzID0gJ05leHQgOTAgRGF5cyc7XG4gIG5leHQxWWVhciA9ICdOZXh0IDEgWWVhcic7XG4gIGN1c3RvbURhdGVSYW5nZSA9ICdDdXN0b20gRGF0ZSBSYW5nZSc7XG4gIGJhY2tUb1ByZXNldEZpbHRlcnMgPSAnQmFjayB0byBQcmVzZXQgRmlsdGVycyc7XG4gIG9rR290SXQgPSAnT2ssIEdvdCBpdCc7XG4gIGFkZHJlc3MgPSAnQWRkcmVzcyc7XG4gIGFkZHJlc3MxID0gJ0FkZHJlc3MnO1xuICBhcHQgPSAnQXB0JzsgLy8gVE9ETyBkZWxldGVcbiAgYWRkcmVzczIgPSAnQXB0JztcbiAgY2l0eSA9ICdDaXR5IC8gTG9jYWxpdHknO1xuICBzdGF0ZSA9ICdTdGF0ZSAvIFJlZ2lvbic7XG4gIHppcCA9ICdQb3N0YWwgQ29kZSc7XG4gIHppcENvZGUgPSAnUG9zdGFsIENvZGUnOyAvLyBUT0RPIGRlbGV0ZVxuICBjb3VudHJ5ID0gJ0NvdW50cnknO1xuICBvciA9ICdvcic7XG4gIGNsaWNrVG9Ccm93c2UgPSAnY2xpY2sgdG8gYnJvd3NlJztcbiAgY2hvb3NlQUZpbGUgPSAnQ2hvb3NlIGEgZmlsZSc7XG4gIG5vID0gJ05vJztcbiAgeWVzID0gJ1llcyc7XG4gIHNlYXJjaCA9ICdTRUFSQ0gnO1xuICBub0l0ZW1zID0gJ1RoZXJlIGFyZSBubyBpdGVtcyc7XG4gIGRhdGVGb3JtYXQgPSAnTU0vZGQveXl5eSc7XG4gIGRhdGVGb3JtYXRQbGFjZWhvbGRlciA9ICdNTS9ERC9ZWVlZJztcbiAgbG9jYWxEYXRlUGxhY2Vob2xkZXIgPSAnbW0vZGQveXl5eSc7XG4gIHRpbWVGb3JtYXRQbGFjZWhvbGRlckFNID0gJ2hoOm1tIEFNJztcbiAgdGltZUZvcm1hdFBsYWNlaG9sZGVyMjRIb3VyID0gJ0hIOm1tJztcbiAgdGltZUZvcm1hdEFNID0gJ0FNJztcbiAgdGltZUZvcm1hdFBNID0gJ1BNJztcbiAgY29uZmlybUNoYW5nZXNNb2RhbE1lc3NhZ2UgPSAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNoYW5nZSB0aGlzIGZpZWxkPyc7XG4gIHByb21wdE1vZGFsTWVzc2FnZSA9ICdEbyB5b3Ugd2FudCB0byBwZXJmb3JtIHRoZSBmb2xsb3dpbmcgY2hhbmdlcz8nO1xuICBhc3luY0ZhaWx1cmUgPSAnQXN5bmMgdmFsaWRhdGlvbiB3YXMgbm90IGNhbGxlZCB3aXRoaW4gdGhlIDEwcyB0aHJlc2hvbGQsIHlvdSBtaWdodCB3YW50IHRvIHJlbG9hZCB0aGUgcGFnZSB0byB0cnkgYWdhaW4nO1xuICBwcmV2aW91cyA9ICdQcmV2aW91cyc7XG4gIGFjdGlvbnMgPSAnQWN0aW9ucyc7XG4gIGFsbCA9ICdBbGwnO1xuICBncm91cGVkTXVsdGlQaWNrZXJFbXB0eSA9ICdObyBpdGVtcyB0byBkaXNwbGF5JztcbiAgZ3JvdXBlZE11bHRpUGlja2VyU2VsZWN0Q2F0ZWdvcnkgPSAnU2VsZWN0IGEgY2F0ZWdvcnkgZnJvbSB0aGUgbGVmdCB0byBnZXQgc3RhcnRlZCc7XG4gIGFkZCA9ICdBZGQnO1xuICBlbmNyeXB0ZWRGaWVsZFRvb2x0aXAgPSAnVGhpcyBkYXRhIGhhcyBiZWVuIHN0b3JlZCBhdCB0aGUgaGlnaGVzdCBsZXZlbCBvZiBzZWN1cml0eSc7XG4gIG5vU3RhdGVzRm9yQ291bnRyeSA9ICdObyBzdGF0ZXMgYXZhaWxhYmxlIGZvciB0aGUgc2VsZWN0ZWQgY291bnRyeSc7XG4gIHNlbGVjdENvdW50cnlGaXJzdCA9ICdQbGVhc2Ugc2VsZWN0IGEgY291bnRyeSBiZWZvcmUgc2VsZWN0aW5nIGEgc3RhdGUnO1xuICBpbnZhbGlkSW50ZWdlcklucHV0ID0gJ1NwZWNpYWwgY2hhcmFjdGVycyBhcmUgbm90IGFsbG93ZWQgZm9yJztcbiAgbWF4UmVjb3Jkc1JlYWNoZWQgPSAnU29ycnksIHlvdSBoYXZlIHJlYWNoZWQgdGhlIG1heGltdW0gbnVtYmVyIG9mIHJlY29yZHMgYWxsb3dlZCBmb3IgdGhpcyBmaWVsZCc7XG4gIHNlbGVjdEZpbHRlck9wdGlvbnMgPSAnUGxlYXNlIHNlbGVjdCBvbmUgb3IgbW9yZSBmaWx0ZXIgb3B0aW9ucyBiZWxvdy4nO1xuICBhZGRDb25kaXRpb24gPSAnQWRkIENvbmRpdGlvbic7XG4gIGluY2x1ZGVBbnkgPSAnSW5jbHVkZSBBbnknO1xuICBpbmNsdWRlQWxsID0gJ0luY2x1ZGUgQWxsJztcbiAgZXhjbHVkZSA9ICdFeGNsdWRlJztcbiAgcmFkaXVzID0gJ1JhZGl1cyc7XG4gIGVxdWFscyA9ICdFcXVhbHMnO1xuICBlcXVhbFRvID0gJ0VxdWFsIFRvJztcbiAgZ3JlYXRlclRoYW4gPSAnR3JlYXRlciBUaGFuJztcbiAgbGVzc1RoYW4gPSAnTGVzcyBUaGFuJztcbiAgZG9lc05vdEVxdWFsID0gJ0RvZXMgTm90IEVxdWFsJztcbiAgdHJ1ZSA9ICdUcnVlJztcbiAgZmFsc2UgPSAnRmFsc2UnO1xuICBiZWZvcmUgPSAnQmVmb3JlJztcbiAgYWZ0ZXIgPSAnQWZ0ZXInO1xuICBiZXR3ZWVuID0gJ0JldHdlZW4nO1xuICB3aXRoaW4gPSAnV2l0aGluJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoTE9DQUxFX0lEKVxuICAgIHB1YmxpYyB1c2VyTG9jYWxlID0gJ2VuLVVTJyxcbiAgKSB7fVxuXG4gIG1heGxlbmd0aE1ldFdpdGhGaWVsZChmaWVsZDogc3RyaW5nLCBtYXhsZW5ndGg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBTb3JyeSwgeW91IGhhdmUgcmVhY2hlZCB0aGUgbWF4aW11bSBjaGFyYWN0ZXIgY291bnQgb2YgJHttYXhsZW5ndGh9IGZvciAke2ZpZWxkfS5gO1xuICB9XG5cbiAgbWF4bGVuZ3RoTWV0KG1heGxlbmd0aDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYFNvcnJ5LCB5b3UgaGF2ZSByZWFjaGVkIHRoZSBtYXhpbXVtIGNoYXJhY3RlciBjb3VudCBvZiAke21heGxlbmd0aH0gZm9yIHRoaXMgZmllbGQuYDtcbiAgfVxuXG4gIGludmFsaWRNYXhsZW5ndGhXaXRoRmllbGQoZmllbGQ6IHN0cmluZywgbWF4bGVuZ3RoOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBgU29ycnksIHlvdSBoYXZlIGV4Y2VlZGVkIHRoZSBtYXhpbXVtIGNoYXJhY3RlciBjb3VudCBvZiAke21heGxlbmd0aH0gZm9yICR7ZmllbGR9LmA7XG4gIH1cblxuICBpbnZhbGlkTWF4bGVuZ3RoKG1heGxlbmd0aDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYFNvcnJ5LCB5b3UgaGF2ZSBleGNlZWRlZCB0aGUgbWF4aW11bSBjaGFyYWN0ZXIgY291bnQgb2YgJHttYXhsZW5ndGh9IGZvciB0aGlzIGZpZWxkLmA7XG4gIH1cblxuICBnZXRUb01hbnlQbHVzTW9yZSh0b01hbnk6IHsgcXVhbnRpdHk6IG51bWJlciB9KTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCske3RvTWFueS5xdWFudGl0eX0gbW9yZWA7XG4gIH1cblxuICBzZWxlY3RlZFJlY29yZHMoc2VsZWN0ZWQ6IG51bWJlcikge1xuICAgIHJldHVybiBgJHtzZWxlY3RlZH0gcmVjb3JkcyBhcmUgc2VsZWN0ZWQuYDtcbiAgfVxuXG4gIHNob3dpbmdYb2ZYUmVzdWx0cyhzaG93bjogbnVtYmVyLCB0b3RhbDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIGBTaG93aW5nICR7c2hvd259IG9mICR7dG90YWx9IFJlc3VsdHMuYDtcbiAgfVxuXG4gIHRvdGFsUmVjb3Jkcyh0b3RhbDogbnVtYmVyLCBzZWxlY3QgPSBmYWxzZSkge1xuICAgIHJldHVybiBzZWxlY3QgPyBgU2VsZWN0IGFsbCAke3RvdGFsfSByZWNvcmRzLmAgOiBgRGUtc2VsZWN0IHJlbWFpbmluZyAke3RvdGFsfSByZWNvcmRzLmA7XG4gIH1cblxuICBkYXRlRm9ybWF0U3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdDtcbiAgfVxuXG4gIGxvY2FsaXplZERhdGVQbGFjZWhvbGRlcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmxvY2FsRGF0ZVBsYWNlaG9sZGVyO1xuICB9XG5cbiAgdGFiYmVkR3JvdXBDbGVhclN1Z2dlc3Rpb24odGFiTGFiZWxQbHVyYWw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBDbGVhciB5b3VyIHNlYXJjaCB0byBzZWUgYWxsICR7dGFiTGFiZWxQbHVyYWx9LmA7XG4gIH1cblxuICBmb3JtYXREYXRlV2l0aEZvcm1hdCh2YWx1ZTogYW55LCBmb3JtYXQ6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zKSB7XG4gICAgY29uc3QgZGF0ZSA9IHZhbHVlIGluc3RhbmNlb2YgRGF0ZSA/IHZhbHVlIDogbmV3IERhdGUodmFsdWUpO1xuICAgIGlmIChkYXRlLmdldFRpbWUoKSAhPT0gZGF0ZS5nZXRUaW1lKCkpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMudXNlckxvY2FsZSwgZm9ybWF0KS5mb3JtYXQoZGF0ZSk7XG4gIH1cblxuICBmb3JtYXRUb1RpbWVPbmx5KHBhcmFtKSB7fVxuXG4gIGZvcm1hdFRvRGF0ZU9ubHkocGFyYW0pIHt9XG5cbiAgZm9ybWF0VGltZVdpdGhGb3JtYXQodmFsdWU6IGFueSwgZm9ybWF0OiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucyk6IHN0cmluZyB7XG4gICAgY29uc3QgZGF0ZSA9IHZhbHVlIGluc3RhbmNlb2YgRGF0ZSA/IHZhbHVlIDogbmV3IERhdGUodmFsdWUpO1xuICAgIGlmIChkYXRlLmdldFRpbWUoKSAhPT0gZGF0ZS5nZXRUaW1lKCkpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgY29uc3QgdGltZVBhcnRzOiB7IFt0eXBlOiBzdHJpbmddOiBzdHJpbmcgfSA9IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy51c2VyTG9jYWxlLCBmb3JtYXQpXG4gICAgICAuZm9ybWF0VG9QYXJ0cyhkYXRlKVxuICAgICAgLnJlZHVjZSgob2JqLCBwYXJ0KSA9PiB7XG4gICAgICAgIG9ialtwYXJ0LnR5cGVdID0gcGFydC52YWx1ZTtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH0sIHt9KTtcbiAgICBjb25zdCBkYXlQZXJpb2QgPSB0aW1lUGFydHMuZGF5UGVyaW9kID8gdGltZVBhcnRzLmRheVBlcmlvZCA6ICcnO1xuICAgIGNvbnN0IHJlcyA9IGAke3RpbWVQYXJ0cy5ob3VyfToke3RpbWVQYXJ0cy5taW51dGV9ICR7ZGF5UGVyaW9kfWA7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIGdldFdlZWtkYXlzKHdlZWtTdGFydHNPbiA9IDApOiBzdHJpbmdbXSB7XG4gICAgZnVuY3Rpb24gZ2V0RGF5KGRheU9mV2Vlaykge1xuICAgICAgY29uc3QgZHQgPSBuZXcgRGF0ZSgpO1xuICAgICAgcmV0dXJuIGR0LnNldERhdGUoZHQuZ2V0RGF0ZSgpIC0gZHQuZ2V0RGF5KCkgKyBkYXlPZldlZWspO1xuICAgIH1cblxuICAgIGxldCB3ZWVrZGF5cyA9IFtnZXREYXkoMCksIGdldERheSgxKSwgZ2V0RGF5KDIpLCBnZXREYXkoMyksIGdldERheSg0KSwgZ2V0RGF5KDUpLCBnZXREYXkoNildLnJlZHVjZSgod2Vla2RheXMsIGR0KSA9PiB7XG4gICAgICB3ZWVrZGF5cy5wdXNoKG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMudXNlckxvY2FsZSwgeyB3ZWVrZGF5OiAnbG9uZycgfSkuZm9ybWF0KGR0KSk7XG4gICAgICByZXR1cm4gd2Vla2RheXM7XG4gICAgfSwgW10pO1xuXG4gICAgaWYgKHdlZWtTdGFydHNPbiA+IDAgJiYgd2Vla1N0YXJ0c09uIDw9IDYpIHtcbiAgICAgIGNvbnN0IG5ld1N0YXJ0ID0gd2Vla2RheXMuc3BsaWNlKHdlZWtTdGFydHNPbik7XG4gICAgICB3ZWVrZGF5cyA9IFsuLi5uZXdTdGFydCwgLi4ud2Vla2RheXNdO1xuICAgIH1cbiAgICByZXR1cm4gd2Vla2RheXM7XG4gIH1cblxuICBnZXRNb250aHMoKTogc3RyaW5nW10ge1xuICAgIGZ1bmN0aW9uIGdldE1vbnRoKG1vbnRoKSB7XG4gICAgICBjb25zdCBkdCA9IG5ldyBEYXRlKCk7XG4gICAgICByZXR1cm4gZHQuc2V0TW9udGgobW9udGgsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBbXG4gICAgICBnZXRNb250aCgwKSxcbiAgICAgIGdldE1vbnRoKDEpLFxuICAgICAgZ2V0TW9udGgoMiksXG4gICAgICBnZXRNb250aCgzKSxcbiAgICAgIGdldE1vbnRoKDQpLFxuICAgICAgZ2V0TW9udGgoNSksXG4gICAgICBnZXRNb250aCg2KSxcbiAgICAgIGdldE1vbnRoKDcpLFxuICAgICAgZ2V0TW9udGgoOCksXG4gICAgICBnZXRNb250aCg5KSxcbiAgICAgIGdldE1vbnRoKDEwKSxcbiAgICAgIGdldE1vbnRoKDExKSxcbiAgICBdLnJlZHVjZSgobW9udGhzLCBkdCkgPT4ge1xuICAgICAgbW9udGhzLnB1c2gobmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy51c2VyTG9jYWxlLCB7IG1vbnRoOiAnbG9uZycgfSkuZm9ybWF0KGR0KSk7XG4gICAgICByZXR1cm4gbW9udGhzO1xuICAgIH0sIFtdKTtcbiAgfVxuXG4gIGdldFByb3BlcnR5KHZhbHVlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpc1t2YWx1ZV07XG4gIH1cblxuICBnZXRSYW5nZVRleHQocGFnZTogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyLCBsZW5ndGg6IG51bWJlciwgc2hvcnQ6IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgIGlmIChsZW5ndGggPT09IDAgfHwgcGFnZVNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiBgRGlzcGxheWluZyAwIG9mICR7bGVuZ3RofWA7XG4gICAgfVxuXG4gICAgbGVuZ3RoID0gTWF0aC5tYXgobGVuZ3RoLCAwKTtcblxuICAgIGNvbnN0IHN0YXJ0SW5kZXggPSBwYWdlICogcGFnZVNpemU7XG5cbiAgICAvLyBJZiB0aGUgc3RhcnQgaW5kZXggZXhjZWVkcyB0aGUgbGlzdCBsZW5ndGgsIGRvIG5vdCB0cnkgYW5kIGZpeCB0aGUgZW5kIGluZGV4IHRvIHRoZSBlbmQuXG4gICAgY29uc3QgZW5kSW5kZXggPSBzdGFydEluZGV4IDwgbGVuZ3RoID8gTWF0aC5taW4oc3RhcnRJbmRleCArIHBhZ2VTaXplLCBsZW5ndGgpIDogc3RhcnRJbmRleCArIHBhZ2VTaXplO1xuXG4gICAgcmV0dXJuIHNob3J0ID8gYCR7c3RhcnRJbmRleCArIDF9IC0gJHtlbmRJbmRleH0vJHtsZW5ndGh9YCA6IGBEaXNwbGF5aW5nICR7c3RhcnRJbmRleCArIDF9IC0gJHtlbmRJbmRleH0gb2YgJHtsZW5ndGh9YDtcbiAgfVxuXG4gIGZvcm1hdEN1cnJlbmN5KHZhbHVlOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7IHN0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogJ1VTRCcgfTtcbiAgICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KHRoaXMudXNlckxvY2FsZSwgb3B0aW9ucykuZm9ybWF0KHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHRlbmRzIHRoZSBJbnRsLm51bWJlckZvcm1hdCBjYXBhYmlsaXR5IHdpdGggdHdvIGV4dHJhIGZlYXR1cmVzOlxuICAgKiAgLSBEb2VzIE5PVCByb3VuZCB2YWx1ZXMsIGJ1dCBpbnN0ZWFkIHRydW5jYXRlcyB0byBtYXhpbXVtRnJhY3Rpb25EaWdpdHNcbiAgICogIC0gQnkgZGVmYXVsdCB1c2VzIGFjY291bnRpbmcgZm9ybWF0IGZvciBuZWdhdGl2ZSBudW1iZXJzOiAoMy4xNCkgaW5zdGVhZCBvZiAtMy4xNC5cbiAgICpcbiAgICogQHBhcmFtIHZhbHVlICAgICAgICAgICBUaGUgbnVtYmVyIHZhbHVlIHRvIGNvbnZlcnQgdG8gc3RyaW5nXG4gICAqIEBwYXJhbSBvdmVycmlkZU9wdGlvbnMgQWxsb3dzIGZvciBvdmVycmlkaW5nIG9wdGlvbnMgdXNlZCBhbmQgcGFzc2VkIHRvIEludGwuTnVtYmVyRm9ybWF0KClcbiAgICovXG4gIGZvcm1hdEJpZ0RlY2ltYWwodmFsdWU6IG51bWJlciwgb3ZlcnJpZGVPcHRpb25zPzogQmlnRGVjaW1hbEZvcm1hdE9wdGlvbnMpOiBzdHJpbmcge1xuICAgIGNvbnN0IGRlZmF1bHRPcHRpb25zOiBCaWdEZWNpbWFsRm9ybWF0T3B0aW9ucyA9IHtcbiAgICAgIHN0eWxlOiAnZGVjaW1hbCcsXG4gICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgICB1c2VBY2NvdW50aW5nRm9ybWF0OiB0cnVlLFxuICAgIH07XG4gICAgY29uc3Qgb3B0aW9uczogQmlnRGVjaW1hbEZvcm1hdE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRPcHRpb25zLCBvdmVycmlkZU9wdGlvbnMpO1xuICAgIGNvbnN0IHRydW5jYXRlZFZhbHVlID0gdGhpcy50cnVuY2F0ZVRvUHJlY2lzaW9uKHZhbHVlLCBvcHRpb25zLm1heGltdW1GcmFjdGlvbkRpZ2l0cyk7XG4gICAgbGV0IF92YWx1ZSA9IG5ldyBJbnRsLk51bWJlckZvcm1hdCh0aGlzLnVzZXJMb2NhbGUsIG9wdGlvbnMpLmZvcm1hdCh0cnVuY2F0ZWRWYWx1ZSk7XG4gICAgaWYgKHZhbHVlIDwgMCkge1xuICAgICAgX3ZhbHVlID0gb3B0aW9ucy51c2VBY2NvdW50aW5nRm9ybWF0ID8gYCgke192YWx1ZS5zbGljZSgxKX0pYCA6IGAtJHtfdmFsdWUuc2xpY2UoMSl9YDtcbiAgICB9XG4gICAgcmV0dXJuIF92YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIHN0cmluZy1iYXNlZCB0cnVuY2F0aW5nIG9mIGEgbnVtYmVyIHdpdGggbm8gcm91bmRpbmdcbiAgICovXG4gIHRydW5jYXRlVG9QcmVjaXNpb24odmFsdWU6IG51bWJlciwgcHJlY2lzaW9uOiBudW1iZXIpIHtcbiAgICBsZXQgdmFsdWVBc1N0cmluZyA9IHZhbHVlID8gdmFsdWUudG9TdHJpbmcoKSA6ICcwJztcbiAgICBjb25zdCBkZWNpbWFsSW5kZXggPSB2YWx1ZUFzU3RyaW5nLmluZGV4T2YoJy4nKTtcbiAgICBpZiAoZGVjaW1hbEluZGV4ID4gLTEgJiYgZGVjaW1hbEluZGV4ICsgcHJlY2lzaW9uICsgMSA8IHZhbHVlQXNTdHJpbmcubGVuZ3RoKSB7XG4gICAgICB2YWx1ZUFzU3RyaW5nID0gdmFsdWVBc1N0cmluZy5zdWJzdHJpbmcoMCwgdmFsdWVBc1N0cmluZy5pbmRleE9mKCcuJykgKyBwcmVjaXNpb24gKyAxKTtcbiAgICB9XG4gICAgcmV0dXJuIE51bWJlcih2YWx1ZUFzU3RyaW5nKTtcbiAgfVxuXG4gIGZvcm1hdE51bWJlcih2YWx1ZSwgb3B0aW9ucz86IEludGwuTnVtYmVyRm9ybWF0T3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQodGhpcy51c2VyTG9jYWxlLCBvcHRpb25zKS5mb3JtYXQodmFsdWUpO1xuICB9XG5cbiAgZm9ybWF0RGF0ZVNob3J0KHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBEYXRlKSB7XG4gICAgY29uc3Qgb3B0aW9uczogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMgPSB7XG4gICAgICAvLyBERC9NTS9ZWVlZLCBISDpNTSBBIC0gMDIvMTQvMjAxNywgMToxNyBQTVxuICAgICAgbW9udGg6ICcyLWRpZ2l0JyxcbiAgICAgIGRheTogJzItZGlnaXQnLFxuICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgaG91cjogJ251bWVyaWMnLFxuICAgICAgbWludXRlOiAnMi1kaWdpdCcsXG4gICAgfTtcbiAgICBjb25zdCBfdmFsdWUgPSB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSAnJyA/IG5ldyBEYXRlKCkgOiBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMudXNlckxvY2FsZSwgb3B0aW9ucykuZm9ybWF0KF92YWx1ZSk7XG4gIH1cblxuICBmb3JtYXRUaW1lKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBEYXRlKSB7XG4gICAgY29uc3Qgb3B0aW9uczogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMgPSB7XG4gICAgICAvLyBISDpNTSBBIC0gMToxNyBQTVxuICAgICAgaG91cjogJ251bWVyaWMnLFxuICAgICAgbWludXRlOiAnMi1kaWdpdCcsXG4gICAgfTtcbiAgICBjb25zdCBfdmFsdWUgPSB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSAnJyA/IG5ldyBEYXRlKCkgOiBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMudXNlckxvY2FsZSwgb3B0aW9ucykuZm9ybWF0KF92YWx1ZSk7XG4gIH1cblxuICBmb3JtYXREYXRlKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBEYXRlKSB7XG4gICAgY29uc3Qgb3B0aW9uczogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMgPSB7XG4gICAgICAvLyBERC9NTS9ZWVlZIC0gMDIvMTQvMjAxN1xuICAgICAgbW9udGg6ICcyLWRpZ2l0JyxcbiAgICAgIGRheTogJzItZGlnaXQnLFxuICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgIH07XG4gICAgY29uc3QgX3ZhbHVlID0gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gJycgPyBuZXcgRGF0ZSgpIDogbmV3IERhdGUodmFsdWUpO1xuICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLnVzZXJMb2NhbGUsIG9wdGlvbnMpLmZvcm1hdChfdmFsdWUpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBOT1ZPX0VMRU1FTlRTX0xBQkVMU19QUk9WSURFUlMgPSBbeyBwcm92aWRlOiBOb3ZvTGFiZWxTZXJ2aWNlLCB1c2VDbGFzczogTm92b0xhYmVsU2VydmljZSB9XTtcbiJdfQ==