// NG2
import { Inject, Injectable, LOCALE_ID, Optional } from '@angular/core';
export class NovoLabelService {
    constructor(userLocale = 'en-US') {
        this.userLocale = userLocale;
        this.filters = 'Filter';
        this.clear = 'Clear';
        this.sort = 'Sort';
        this.distributionListOwner = 'Owner';
        this.dateAdded = 'Date Added';
        this.emptyTableMessage = 'No Records to display...';
        this.noMatchingRecordsMessage = 'No Matching Records';
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
        this.select = 'Select...';
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
        const dayperiod = timeParts.dayperiod ? timeParts.dayperiod : '';
        return `${timeParts.hour}:${timeParts.minute}${dayperiod}`;
    }
    getWeekdays() {
        function getDay(dayOfWeek) {
            const dt = new Date();
            return dt.setDate(dt.getDate() - dt.getDay() + dayOfWeek);
        }
        return [getDay(0), getDay(1), getDay(2), getDay(3), getDay(4), getDay(5), getDay(6)].reduce((weekdays, dt) => {
            weekdays.push(new Intl.DateTimeFormat(this.userLocale, { weekday: 'long' }).format(dt));
            return weekdays;
        }, []);
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
NovoLabelService.decorators = [
    { type: Injectable }
];
NovoLabelService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [LOCALE_ID,] }] }
];
export const NOVO_ELEMENTS_LABELS_PROVIDERS = [{ provide: NovoLabelService, useClass: NovoLabelService }];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm92by1sYWJlbC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFleEUsTUFBTSxPQUFPLGdCQUFnQjtJQStGM0IsWUFHUyxhQUFhLE9BQU87UUFBcEIsZUFBVSxHQUFWLFVBQVUsQ0FBVTtRQWpHN0IsWUFBTyxHQUFHLFFBQVEsQ0FBQztRQUNuQixVQUFLLEdBQUcsT0FBTyxDQUFDO1FBQ2hCLFNBQUksR0FBRyxNQUFNLENBQUM7UUFDZCwwQkFBcUIsR0FBRyxPQUFPLENBQUM7UUFDaEMsY0FBUyxHQUFHLFlBQVksQ0FBQztRQUN6QixzQkFBaUIsR0FBRywwQkFBMEIsQ0FBQztRQUMvQyw2QkFBd0IsR0FBRyxxQkFBcUIsQ0FBQztRQUNqRCx3QkFBbUIsR0FBRywwQkFBMEIsQ0FBQztRQUNqRCxnQkFBVyxHQUFHLDBCQUEwQixDQUFDO1FBQ3pDLHlCQUFvQixHQUFHLDhCQUE4QixDQUFDO1FBQ3RELGdCQUFXLEdBQUcsMEJBQTBCLENBQUM7UUFDekMsMkJBQXNCLEdBQUcsa0JBQWtCLENBQUM7UUFDNUMsbUJBQWMsR0FBRywwQkFBMEIsQ0FBQztRQUM1QyxtQkFBYyxHQUFHLDBCQUEwQixDQUFDO1FBQzVDLGFBQVEsR0FBRyxVQUFVLENBQUM7UUFDdEIsbUJBQWMsR0FBRyxxQkFBcUIsQ0FBQztRQUN2QyxTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsV0FBTSxHQUFHLFFBQVEsQ0FBQztRQUNsQixTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsaUJBQVksR0FBRyxpQkFBaUIsQ0FBQztRQUNq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QUcsS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BHLE9BQU8sSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFFLENBQUM7OztZQTlTRixVQUFVOzs7NENBaUdOLFFBQVEsWUFDUixNQUFNLFNBQUMsU0FBUzs7QUErTXJCLE1BQU0sQ0FBQyxNQUFNLDhCQUE4QixHQUFHLENBQUMsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIExPQ0FMRV9JRCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8vICBpbXBvcnQgRGF0ZVRpbWVGb3JtYXRQYXJ0ID0gSW50bC5EYXRlVGltZUZvcm1hdFBhcnQ7XHJcblxyXG5pbnRlcmZhY2UgVGltZUZvcm1hdFBhcnRzIHtcclxuICBob3VyOiBzdHJpbmc7XHJcbiAgbWludXRlOiBzdHJpbmc7XHJcbiAgZGF5UGVyaW9kPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEJpZ0RlY2ltYWxGb3JtYXRPcHRpb25zIGV4dGVuZHMgSW50bC5OdW1iZXJGb3JtYXRPcHRpb25zIHtcclxuICB1c2VBY2NvdW50aW5nRm9ybWF0PzogYm9vbGVhbjsgLy8gUmVuZGVyIG5lZ2F0aXZlIG51bWJlcnMgdXNpbmcgcGFyZW5zLiBUcnVlOiBcIigzLjE0KVwiLCBGYWxzZTogXCItMy4xNFwiXHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5vdm9MYWJlbFNlcnZpY2Uge1xyXG4gIGZpbHRlcnMgPSAnRmlsdGVyJztcclxuICBjbGVhciA9ICdDbGVhcic7XHJcbiAgc29ydCA9ICdTb3J0JztcclxuICBkaXN0cmlidXRpb25MaXN0T3duZXIgPSAnT3duZXInO1xyXG4gIGRhdGVBZGRlZCA9ICdEYXRlIEFkZGVkJztcclxuICBlbXB0eVRhYmxlTWVzc2FnZSA9ICdObyBSZWNvcmRzIHRvIGRpc3BsYXkuLi4nO1xyXG4gIG5vTWF0Y2hpbmdSZWNvcmRzTWVzc2FnZSA9ICdObyBNYXRjaGluZyBSZWNvcmRzJztcclxuICBlcnJvcmVkVGFibGVNZXNzYWdlID0gJ09vcHMhIEFuIGVycm9yIG9jY3VycmVkLic7XHJcbiAgcGlja2VyRXJyb3IgPSAnT29wcyEgQW4gZXJyb3Igb2NjdXJyZWQuJztcclxuICBwaWNrZXJUZXh0RmllbGRFbXB0eSA9ICdCZWdpbiB0eXBpbmcgdG8gc2VlIHJlc3VsdHMuJztcclxuICBwaWNrZXJFbXB0eSA9ICdObyByZXN1bHRzIHRvIGRpc3BsYXkuLi4nO1xyXG4gIHRhYmJlZEdyb3VwUGlja2VyRW1wdHkgPSAnTm8gcmVzdWx0cyBmb3VuZCc7XHJcbiAgcXVpY2tOb3RlRXJyb3IgPSAnT29wcyEgQW4gZXJyb3Igb2NjdXJyZWQuJztcclxuICBxdWlja05vdGVFbXB0eSA9ICdObyByZXN1bHRzIHRvIGRpc3BsYXkuLi4nO1xyXG4gIHJlcXVpcmVkID0gJ1JlcXVpcmVkJztcclxuICBudW1iZXJUb29MYXJnZSA9ICdOdW1iZXIgaXMgdG9vIGxhcmdlJztcclxuICBzYXZlID0gJ1NhdmUnO1xyXG4gIGNhbmNlbCA9ICdDYW5jZWwnO1xyXG4gIG5leHQgPSAnTmV4dCc7XHJcbiAgaXRlbXNQZXJQYWdlID0gJ0l0ZW1zIHBlciBwYWdlOic7XHJcbiAgc2VsZWN0ID0gJ1NlbGVjdC4uLic7XHJcbiAgc2VsZWN0ZWQgPSAnU2VsZWN0ZWQnO1xyXG4gIHNlbGVjdEFsbE9uUGFnZSA9ICdTZWxlY3QgYWxsIG9uIHBhZ2UnO1xyXG4gIGRlc2VsZWN0QWxsID0gJ0Rlc2VsZWN0IGFsbCc7XHJcbiAgcmVmcmVzaCA9ICdSZWZyZXNoJztcclxuICBjbG9zZSA9ICdDbG9zZSc7XHJcbiAgbW92ZSA9ICdNb3ZlJztcclxuICBzdGFydERhdGUgPSAnU3RhcnQgRGF0ZSc7XHJcbiAgZW5kRGF0ZSA9ICdFbmQgRGF0ZSc7XHJcbiAgcmF0ZSA9ICdSYXRlJztcclxuICBtb3JlID0gJ21vcmUnO1xyXG4gIGNsZWFyQWxsID0gJ0NMRUFSIEFMTCc7XHJcbiAgY2xlYXJBbGxOb3JtYWxDYXNlID0gJ0NsZWFyIEFsbCc7XHJcbiAgY2xlYXJTb3J0ID0gJ0NsZWFyIFNvcnQnO1xyXG4gIGNsZWFyRmlsdGVyID0gJ0NsZWFyIEZpbHRlcic7XHJcbiAgdG9kYXkgPSAnVG9kYXknO1xyXG4gIG5vdyA9ICdOb3cnO1xyXG4gIGlzUmVxdWlyZWQgPSAnaXMgcmVxdWlyZWQnO1xyXG4gIG5vdFZhbGlkWWVhciA9ICdpcyBub3QgYSB2YWxpZCB5ZWFyJztcclxuICBpc1Rvb0xhcmdlID0gJ2lzIHRvbyBsYXJnZSc7XHJcbiAgaW52YWxpZEFkZHJlc3MgPSAncmVxdWlyZXMgYXQgbGVhc3Qgb25lIGZpZWxkIGZpbGxlZCBvdXQnO1xyXG4gIGludmFsaWRFbWFpbCA9ICdyZXF1aXJlcyBhIHZhbGlkIGVtYWlsIChleC4gYWJjQDEyMy5jb20pJztcclxuICBtaW5MZW5ndGggPSAnaXMgcmVxdWlyZWQgdG8gYmUgYSBtaW5pbXVtIGxlbmd0aCBvZic7XHJcbiAgcGFzdDFEYXkgPSAnUGFzdCAxIERheSc7XHJcbiAgcGFzdDdEYXlzID0gJ1Bhc3QgNyBEYXlzJztcclxuICBwYXN0MzBEYXlzID0gJ1Bhc3QgMzAgRGF5cyc7XHJcbiAgcGFzdDkwRGF5cyA9ICdQYXN0IDkwIERheXMnO1xyXG4gIHBhc3QxWWVhciA9ICdQYXN0IDEgWWVhcic7XHJcbiAgbmV4dDFEYXkgPSAnTmV4dCAxIERheSc7XHJcbiAgbmV4dDdEYXlzID0gJ05leHQgNyBEYXlzJztcclxuICBuZXh0MzBEYXlzID0gJ05leHQgMzAgRGF5cyc7XHJcbiAgbmV4dDkwRGF5cyA9ICdOZXh0IDkwIERheXMnO1xyXG4gIG5leHQxWWVhciA9ICdOZXh0IDEgWWVhcic7XHJcbiAgY3VzdG9tRGF0ZVJhbmdlID0gJ0N1c3RvbSBEYXRlIFJhbmdlJztcclxuICBiYWNrVG9QcmVzZXRGaWx0ZXJzID0gJ0JhY2sgdG8gUHJlc2V0IEZpbHRlcnMnO1xyXG4gIG9rR290SXQgPSAnT2ssIEdvdCBpdCc7XHJcbiAgYWRkcmVzcyA9ICdBZGRyZXNzJztcclxuICBhZGRyZXNzMSA9ICdBZGRyZXNzJztcclxuICBhcHQgPSAnQXB0JzsgLy8gVE9ETyBkZWxldGVcclxuICBhZGRyZXNzMiA9ICdBcHQnO1xyXG4gIGNpdHkgPSAnQ2l0eSAvIExvY2FsaXR5JztcclxuICBzdGF0ZSA9ICdTdGF0ZSAvIFJlZ2lvbic7XHJcbiAgemlwID0gJ1Bvc3RhbCBDb2RlJztcclxuICB6aXBDb2RlID0gJ1Bvc3RhbCBDb2RlJzsgLy8gVE9ETyBkZWxldGVcclxuICBjb3VudHJ5ID0gJ0NvdW50cnknO1xyXG4gIG9yID0gJ29yJztcclxuICBjbGlja1RvQnJvd3NlID0gJ2NsaWNrIHRvIGJyb3dzZSc7XHJcbiAgY2hvb3NlQUZpbGUgPSAnQ2hvb3NlIGEgZmlsZSc7XHJcbiAgbm8gPSAnTm8nO1xyXG4gIHllcyA9ICdZZXMnO1xyXG4gIHNlYXJjaCA9ICdTRUFSQ0gnO1xyXG4gIG5vSXRlbXMgPSAnVGhlcmUgYXJlIG5vIGl0ZW1zJztcclxuICBkYXRlRm9ybWF0ID0gJ01NL2RkL3l5eXknO1xyXG4gIGRhdGVGb3JtYXRQbGFjZWhvbGRlciA9ICdNTS9ERC9ZWVlZJztcclxuICB0aW1lRm9ybWF0UGxhY2Vob2xkZXJBTSA9ICdoaDptbSBBTSc7XHJcbiAgdGltZUZvcm1hdFBsYWNlaG9sZGVyMjRIb3VyID0gJ0hIOm1tJztcclxuICB0aW1lRm9ybWF0QU0gPSAnQU0nO1xyXG4gIHRpbWVGb3JtYXRQTSA9ICdQTSc7XHJcbiAgY29uZmlybUNoYW5nZXNNb2RhbE1lc3NhZ2UgPSAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNoYW5nZSB0aGlzIGZpZWxkPyc7XHJcbiAgcHJvbXB0TW9kYWxNZXNzYWdlID0gJ0RvIHlvdSB3YW50IHRvIHBlcmZvcm0gdGhlIGZvbGxvd2luZyBjaGFuZ2VzPyc7XHJcbiAgYXN5bmNGYWlsdXJlID0gJ0FzeW5jIHZhbGlkYXRpb24gd2FzIG5vdCBjYWxsZWQgd2l0aGluIHRoZSAxMHMgdGhyZXNob2xkLCB5b3UgbWlnaHQgd2FudCB0byByZWxvYWQgdGhlIHBhZ2UgdG8gdHJ5IGFnYWluJztcclxuICBwcmV2aW91cyA9ICdQcmV2aW91cyc7XHJcbiAgYWN0aW9ucyA9ICdBY3Rpb25zJztcclxuICBhbGwgPSAnQWxsJztcclxuICBncm91cGVkTXVsdGlQaWNrZXJFbXB0eSA9ICdObyBpdGVtcyB0byBkaXNwbGF5JztcclxuICBncm91cGVkTXVsdGlQaWNrZXJTZWxlY3RDYXRlZ29yeSA9ICdTZWxlY3QgYSBjYXRlZ29yeSBmcm9tIHRoZSBsZWZ0IHRvIGdldCBzdGFydGVkJztcclxuICBhZGQgPSAnQWRkJztcclxuICBlbmNyeXB0ZWRGaWVsZFRvb2x0aXAgPSAnVGhpcyBkYXRhIGhhcyBiZWVuIHN0b3JlZCBhdCB0aGUgaGlnaGVzdCBsZXZlbCBvZiBzZWN1cml0eSc7XHJcbiAgbm9TdGF0ZXNGb3JDb3VudHJ5ID0gJ05vIHN0YXRlcyBhdmFpbGFibGUgZm9yIHRoZSBzZWxlY3RlZCBjb3VudHJ5JztcclxuICBzZWxlY3RDb3VudHJ5Rmlyc3QgPSAnUGxlYXNlIHNlbGVjdCBhIGNvdW50cnkgYmVmb3JlIHNlbGVjdGluZyBhIHN0YXRlJztcclxuICBpbnZhbGlkSW50ZWdlcklucHV0ID0gJ1NwZWNpYWwgY2hhcmFjdGVycyBhcmUgbm90IGFsbG93ZWQgZm9yJztcclxuICBtYXhSZWNvcmRzUmVhY2hlZCA9ICdTb3JyeSwgeW91IGhhdmUgcmVhY2hlZCB0aGUgbWF4aW11bSBudW1iZXIgb2YgcmVjb3JkcyBhbGxvd2VkIGZvciB0aGlzIGZpZWxkJztcclxuICBzZWxlY3RGaWx0ZXJPcHRpb25zID0gJ1BsZWFzZSBzZWxlY3Qgb25lIG9yIG1vcmUgZmlsdGVyIG9wdGlvbnMgYmVsb3cuJztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBAT3B0aW9uYWwoKVxyXG4gICAgQEluamVjdChMT0NBTEVfSUQpXHJcbiAgICBwdWJsaWMgdXNlckxvY2FsZSA9ICdlbi1VUycsXHJcbiAgKSB7fVxyXG5cclxuICBtYXhsZW5ndGhNZXRXaXRoRmllbGQoZmllbGQ6IHN0cmluZywgbWF4bGVuZ3RoOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGBTb3JyeSwgeW91IGhhdmUgcmVhY2hlZCB0aGUgbWF4aW11bSBjaGFyYWN0ZXIgY291bnQgb2YgJHttYXhsZW5ndGh9IGZvciAke2ZpZWxkfS5gO1xyXG4gIH1cclxuXHJcbiAgbWF4bGVuZ3RoTWV0KG1heGxlbmd0aDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBgU29ycnksIHlvdSBoYXZlIHJlYWNoZWQgdGhlIG1heGltdW0gY2hhcmFjdGVyIGNvdW50IG9mICR7bWF4bGVuZ3RofSBmb3IgdGhpcyBmaWVsZC5gO1xyXG4gIH1cclxuXHJcbiAgaW52YWxpZE1heGxlbmd0aFdpdGhGaWVsZChmaWVsZDogc3RyaW5nLCBtYXhsZW5ndGg6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYFNvcnJ5LCB5b3UgaGF2ZSBleGNlZWRlZCB0aGUgbWF4aW11bSBjaGFyYWN0ZXIgY291bnQgb2YgJHttYXhsZW5ndGh9IGZvciAke2ZpZWxkfS5gO1xyXG4gIH1cclxuXHJcbiAgaW52YWxpZE1heGxlbmd0aChtYXhsZW5ndGg6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYFNvcnJ5LCB5b3UgaGF2ZSBleGNlZWRlZCB0aGUgbWF4aW11bSBjaGFyYWN0ZXIgY291bnQgb2YgJHttYXhsZW5ndGh9IGZvciB0aGlzIGZpZWxkLmA7XHJcbiAgfVxyXG5cclxuICBnZXRUb01hbnlQbHVzTW9yZSh0b01hbnk6IHsgcXVhbnRpdHk6IG51bWJlciB9KTogc3RyaW5nIHtcclxuICAgIHJldHVybiBgKyR7dG9NYW55LnF1YW50aXR5fSBtb3JlYDtcclxuICB9XHJcblxyXG4gIHNlbGVjdGVkUmVjb3JkcyhzZWxlY3RlZDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gYCR7c2VsZWN0ZWR9IHJlY29yZHMgYXJlIHNlbGVjdGVkLmA7XHJcbiAgfVxyXG5cclxuICBzaG93aW5nWG9mWFJlc3VsdHMoc2hvd246IG51bWJlciwgdG90YWw6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIGBTaG93aW5nICR7c2hvd259IG9mICR7dG90YWx9IFJlc3VsdHMuYDtcclxuICB9XHJcblxyXG4gIHRvdGFsUmVjb3Jkcyh0b3RhbDogbnVtYmVyLCBzZWxlY3QgPSBmYWxzZSkge1xyXG4gICAgcmV0dXJuIHNlbGVjdCA/IGBTZWxlY3QgYWxsICR7dG90YWx9IHJlY29yZHMuYCA6IGBEZS1zZWxlY3QgcmVtYWluaW5nICR7dG90YWx9IHJlY29yZHMuYDtcclxuICB9XHJcblxyXG4gIGRhdGVGb3JtYXRTdHJpbmcoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXQ7XHJcbiAgfVxyXG5cclxuICB0YWJiZWRHcm91cENsZWFyU3VnZ2VzdGlvbih0YWJMYWJlbFBsdXJhbDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBgQ2xlYXIgeW91ciBzZWFyY2ggdG8gc2VlIGFsbCAke3RhYkxhYmVsUGx1cmFsfS5gO1xyXG4gIH1cclxuXHJcbiAgZm9ybWF0RGF0ZVdpdGhGb3JtYXQodmFsdWU6IGFueSwgZm9ybWF0OiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucykge1xyXG4gICAgY29uc3QgZGF0ZSA9IHZhbHVlIGluc3RhbmNlb2YgRGF0ZSA/IHZhbHVlIDogbmV3IERhdGUodmFsdWUpO1xyXG4gICAgaWYgKGRhdGUuZ2V0VGltZSgpICE9PSBkYXRlLmdldFRpbWUoKSkge1xyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy51c2VyTG9jYWxlLCBmb3JtYXQpLmZvcm1hdChkYXRlKTtcclxuICB9XHJcblxyXG4gIGZvcm1hdFRvVGltZU9ubHkocGFyYW0pIHt9XHJcblxyXG4gIGZvcm1hdFRvRGF0ZU9ubHkocGFyYW0pIHt9XHJcblxyXG4gIGZvcm1hdFRpbWVXaXRoRm9ybWF0KHZhbHVlOiBhbnksIGZvcm1hdDogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgZGF0ZSA9IHZhbHVlIGluc3RhbmNlb2YgRGF0ZSA/IHZhbHVlIDogbmV3IERhdGUodmFsdWUpO1xyXG4gICAgaWYgKGRhdGUuZ2V0VGltZSgpICE9PSBkYXRlLmdldFRpbWUoKSkge1xyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBjb25zdCB0aW1lUGFydHM6IHsgW3R5cGU6IHN0cmluZ106IHN0cmluZyB9ID0gSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLnVzZXJMb2NhbGUsIGZvcm1hdClcclxuICAgICAgLmZvcm1hdFRvUGFydHMoZGF0ZSlcclxuICAgICAgLnJlZHVjZSgob2JqLCBwYXJ0KSA9PiB7XHJcbiAgICAgICAgb2JqW3BhcnQudHlwZV0gPSBwYXJ0LnZhbHVlO1xyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgIH0sIHt9KTtcclxuICAgIGNvbnN0IGRheXBlcmlvZCA9IHRpbWVQYXJ0cy5kYXlwZXJpb2QgPyB0aW1lUGFydHMuZGF5cGVyaW9kIDogJyc7XHJcbiAgICByZXR1cm4gYCR7dGltZVBhcnRzLmhvdXJ9OiR7dGltZVBhcnRzLm1pbnV0ZX0ke2RheXBlcmlvZH1gO1xyXG4gIH1cclxuXHJcbiAgZ2V0V2Vla2RheXMoKTogc3RyaW5nW10ge1xyXG4gICAgZnVuY3Rpb24gZ2V0RGF5KGRheU9mV2Vlaykge1xyXG4gICAgICBjb25zdCBkdCA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIHJldHVybiBkdC5zZXREYXRlKGR0LmdldERhdGUoKSAtIGR0LmdldERheSgpICsgZGF5T2ZXZWVrKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gW2dldERheSgwKSwgZ2V0RGF5KDEpLCBnZXREYXkoMiksIGdldERheSgzKSwgZ2V0RGF5KDQpLCBnZXREYXkoNSksIGdldERheSg2KV0ucmVkdWNlKCh3ZWVrZGF5cywgZHQpID0+IHtcclxuICAgICAgd2Vla2RheXMucHVzaChuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLnVzZXJMb2NhbGUsIHsgd2Vla2RheTogJ2xvbmcnIH0pLmZvcm1hdChkdCkpO1xyXG4gICAgICByZXR1cm4gd2Vla2RheXM7XHJcbiAgICB9LCBbXSk7XHJcbiAgfVxyXG5cclxuICBnZXRNb250aHMoKTogc3RyaW5nW10ge1xyXG4gICAgZnVuY3Rpb24gZ2V0TW9udGgobW9udGgpIHtcclxuICAgICAgY29uc3QgZHQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICByZXR1cm4gZHQuc2V0TW9udGgobW9udGgsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBbXHJcbiAgICAgIGdldE1vbnRoKDApLFxyXG4gICAgICBnZXRNb250aCgxKSxcclxuICAgICAgZ2V0TW9udGgoMiksXHJcbiAgICAgIGdldE1vbnRoKDMpLFxyXG4gICAgICBnZXRNb250aCg0KSxcclxuICAgICAgZ2V0TW9udGgoNSksXHJcbiAgICAgIGdldE1vbnRoKDYpLFxyXG4gICAgICBnZXRNb250aCg3KSxcclxuICAgICAgZ2V0TW9udGgoOCksXHJcbiAgICAgIGdldE1vbnRoKDkpLFxyXG4gICAgICBnZXRNb250aCgxMCksXHJcbiAgICAgIGdldE1vbnRoKDExKSxcclxuICAgIF0ucmVkdWNlKChtb250aHMsIGR0KSA9PiB7XHJcbiAgICAgIG1vbnRocy5wdXNoKG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMudXNlckxvY2FsZSwgeyBtb250aDogJ2xvbmcnIH0pLmZvcm1hdChkdCkpO1xyXG4gICAgICByZXR1cm4gbW9udGhzO1xyXG4gICAgfSwgW10pO1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJvcGVydHkodmFsdWU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXNbdmFsdWVdO1xyXG4gIH1cclxuXHJcbiAgZ2V0UmFuZ2VUZXh0KHBhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlciwgbGVuZ3RoOiBudW1iZXIsIHNob3J0OiBib29sZWFuKTogc3RyaW5nIHtcclxuICAgIGlmIChsZW5ndGggPT09IDAgfHwgcGFnZVNpemUgPT09IDApIHtcclxuICAgICAgcmV0dXJuIGBEaXNwbGF5aW5nIDAgb2YgJHtsZW5ndGh9YDtcclxuICAgIH1cclxuXHJcbiAgICBsZW5ndGggPSBNYXRoLm1heChsZW5ndGgsIDApO1xyXG5cclxuICAgIGNvbnN0IHN0YXJ0SW5kZXggPSBwYWdlICogcGFnZVNpemU7XHJcblxyXG4gICAgLy8gSWYgdGhlIHN0YXJ0IGluZGV4IGV4Y2VlZHMgdGhlIGxpc3QgbGVuZ3RoLCBkbyBub3QgdHJ5IGFuZCBmaXggdGhlIGVuZCBpbmRleCB0byB0aGUgZW5kLlxyXG4gICAgY29uc3QgZW5kSW5kZXggPSBzdGFydEluZGV4IDwgbGVuZ3RoID8gTWF0aC5taW4oc3RhcnRJbmRleCArIHBhZ2VTaXplLCBsZW5ndGgpIDogc3RhcnRJbmRleCArIHBhZ2VTaXplO1xyXG5cclxuICAgIHJldHVybiBzaG9ydCA/IGAke3N0YXJ0SW5kZXggKyAxfSAtICR7ZW5kSW5kZXh9LyR7bGVuZ3RofWAgOiBgRGlzcGxheWluZyAke3N0YXJ0SW5kZXggKyAxfSAtICR7ZW5kSW5kZXh9IG9mICR7bGVuZ3RofWA7XHJcbiAgfVxyXG5cclxuICBmb3JtYXRDdXJyZW5jeSh2YWx1ZTogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7IHN0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogJ1VTRCcgfTtcclxuICAgIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQodGhpcy51c2VyTG9jYWxlLCBvcHRpb25zKS5mb3JtYXQodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRXh0ZW5kcyB0aGUgSW50bC5udW1iZXJGb3JtYXQgY2FwYWJpbGl0eSB3aXRoIHR3byBleHRyYSBmZWF0dXJlczpcclxuICAgKiAgLSBEb2VzIE5PVCByb3VuZCB2YWx1ZXMsIGJ1dCBpbnN0ZWFkIHRydW5jYXRlcyB0byBtYXhpbXVtRnJhY3Rpb25EaWdpdHNcclxuICAgKiAgLSBCeSBkZWZhdWx0IHVzZXMgYWNjb3VudGluZyBmb3JtYXQgZm9yIG5lZ2F0aXZlIG51bWJlcnM6ICgzLjE0KSBpbnN0ZWFkIG9mIC0zLjE0LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHZhbHVlICAgICAgICAgICBUaGUgbnVtYmVyIHZhbHVlIHRvIGNvbnZlcnQgdG8gc3RyaW5nXHJcbiAgICogQHBhcmFtIG92ZXJyaWRlT3B0aW9ucyBBbGxvd3MgZm9yIG92ZXJyaWRpbmcgb3B0aW9ucyB1c2VkIGFuZCBwYXNzZWQgdG8gSW50bC5OdW1iZXJGb3JtYXQoKVxyXG4gICAqL1xyXG4gIGZvcm1hdEJpZ0RlY2ltYWwodmFsdWU6IG51bWJlciwgb3ZlcnJpZGVPcHRpb25zPzogQmlnRGVjaW1hbEZvcm1hdE9wdGlvbnMpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgZGVmYXVsdE9wdGlvbnM6IEJpZ0RlY2ltYWxGb3JtYXRPcHRpb25zID0ge1xyXG4gICAgICBzdHlsZTogJ2RlY2ltYWwnLFxyXG4gICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgICAgdXNlQWNjb3VudGluZ0Zvcm1hdDogdHJ1ZSxcclxuICAgIH07XHJcbiAgICBjb25zdCBvcHRpb25zOiBCaWdEZWNpbWFsRm9ybWF0T3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdE9wdGlvbnMsIG92ZXJyaWRlT3B0aW9ucyk7XHJcbiAgICBjb25zdCB0cnVuY2F0ZWRWYWx1ZSA9IHRoaXMudHJ1bmNhdGVUb1ByZWNpc2lvbih2YWx1ZSwgb3B0aW9ucy5tYXhpbXVtRnJhY3Rpb25EaWdpdHMpO1xyXG4gICAgbGV0IF92YWx1ZSA9IG5ldyBJbnRsLk51bWJlckZvcm1hdCh0aGlzLnVzZXJMb2NhbGUsIG9wdGlvbnMpLmZvcm1hdCh0cnVuY2F0ZWRWYWx1ZSk7XHJcbiAgICBpZiAodmFsdWUgPCAwKSB7XHJcbiAgICAgIF92YWx1ZSA9IG9wdGlvbnMudXNlQWNjb3VudGluZ0Zvcm1hdCA/IGAoJHtfdmFsdWUuc2xpY2UoMSl9KWAgOiBgLSR7X3ZhbHVlLnNsaWNlKDEpfWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX3ZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGVyZm9ybXMgYSBzdHJpbmctYmFzZWQgdHJ1bmNhdGluZyBvZiBhIG51bWJlciB3aXRoIG5vIHJvdW5kaW5nXHJcbiAgICovXHJcbiAgdHJ1bmNhdGVUb1ByZWNpc2lvbih2YWx1ZTogbnVtYmVyLCBwcmVjaXNpb246IG51bWJlcikge1xyXG4gICAgbGV0IHZhbHVlQXNTdHJpbmcgPSB2YWx1ZSA/IHZhbHVlLnRvU3RyaW5nKCkgOiAnMCc7XHJcbiAgICBjb25zdCBkZWNpbWFsSW5kZXggPSB2YWx1ZUFzU3RyaW5nLmluZGV4T2YoJy4nKTtcclxuICAgIGlmIChkZWNpbWFsSW5kZXggPiAtMSAmJiBkZWNpbWFsSW5kZXggKyBwcmVjaXNpb24gKyAxIDwgdmFsdWVBc1N0cmluZy5sZW5ndGgpIHtcclxuICAgICAgdmFsdWVBc1N0cmluZyA9IHZhbHVlQXNTdHJpbmcuc3Vic3RyaW5nKDAsIHZhbHVlQXNTdHJpbmcuaW5kZXhPZignLicpICsgcHJlY2lzaW9uICsgMSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gTnVtYmVyKHZhbHVlQXNTdHJpbmcpO1xyXG4gIH1cclxuXHJcbiAgZm9ybWF0TnVtYmVyKHZhbHVlLCBvcHRpb25zPzogSW50bC5OdW1iZXJGb3JtYXRPcHRpb25zKSB7XHJcbiAgICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KHRoaXMudXNlckxvY2FsZSwgb3B0aW9ucykuZm9ybWF0KHZhbHVlKTtcclxuICB9XHJcblxyXG4gIGZvcm1hdERhdGVTaG9ydCh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgRGF0ZSkge1xyXG4gICAgY29uc3Qgb3B0aW9uczogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMgPSB7XHJcbiAgICAgIC8vIEREL01NL1lZWVksIEhIOk1NIEEgLSAwMi8xNC8yMDE3LCAxOjE3IFBNXHJcbiAgICAgIG1vbnRoOiAnMi1kaWdpdCcsXHJcbiAgICAgIGRheTogJzItZGlnaXQnLFxyXG4gICAgICB5ZWFyOiAnbnVtZXJpYycsXHJcbiAgICAgIGhvdXI6ICdudW1lcmljJyxcclxuICAgICAgbWludXRlOiAnMi1kaWdpdCcsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgX3ZhbHVlID0gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gJycgPyBuZXcgRGF0ZSgpIDogbmV3IERhdGUodmFsdWUpO1xyXG4gICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMudXNlckxvY2FsZSwgb3B0aW9ucykuZm9ybWF0KF92YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBmb3JtYXRUaW1lKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBEYXRlKSB7XHJcbiAgICBjb25zdCBvcHRpb25zOiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucyA9IHtcclxuICAgICAgLy8gSEg6TU0gQSAtIDE6MTcgUE1cclxuICAgICAgaG91cjogJ251bWVyaWMnLFxyXG4gICAgICBtaW51dGU6ICcyLWRpZ2l0JyxcclxuICAgIH07XHJcbiAgICBjb25zdCBfdmFsdWUgPSB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSAnJyA/IG5ldyBEYXRlKCkgOiBuZXcgRGF0ZSh2YWx1ZSk7XHJcbiAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy51c2VyTG9jYWxlLCBvcHRpb25zKS5mb3JtYXQoX3ZhbHVlKTtcclxuICB9XHJcblxyXG4gIGZvcm1hdERhdGUodmFsdWU6IHN0cmluZyB8IG51bWJlciB8IERhdGUpIHtcclxuICAgIGNvbnN0IG9wdGlvbnM6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zID0ge1xyXG4gICAgICAvLyBERC9NTS9ZWVlZIC0gMDIvMTQvMjAxN1xyXG4gICAgICBtb250aDogJzItZGlnaXQnLFxyXG4gICAgICBkYXk6ICcyLWRpZ2l0JyxcclxuICAgICAgeWVhcjogJ251bWVyaWMnLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IF92YWx1ZSA9IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09ICcnID8gbmV3IERhdGUoKSA6IG5ldyBEYXRlKHZhbHVlKTtcclxuICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLnVzZXJMb2NhbGUsIG9wdGlvbnMpLmZvcm1hdChfdmFsdWUpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IE5PVk9fRUxFTUVOVFNfTEFCRUxTX1BST1ZJREVSUyA9IFt7IHByb3ZpZGU6IE5vdm9MYWJlbFNlcnZpY2UsIHVzZUNsYXNzOiBOb3ZvTGFiZWxTZXJ2aWNlIH1dO1xyXG4iXX0=