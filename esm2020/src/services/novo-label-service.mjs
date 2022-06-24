// NG2
import { Inject, Injectable, LOCALE_ID, Optional } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm92by1sYWJlbC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWN4RSxNQUFNLE9BQU8sZ0JBQWdCO0lBaUczQixZQUdTLGFBQWEsT0FBTztRQUFwQixlQUFVLEdBQVYsVUFBVSxDQUFVO1FBbkc3QixZQUFPLEdBQUcsUUFBUSxDQUFDO1FBQ25CLFVBQUssR0FBRyxPQUFPLENBQUM7UUFDaEIsU0FBSSxHQUFHLE1BQU0sQ0FBQztRQUNkLDBCQUFxQixHQUFHLE9BQU8sQ0FBQztRQUNoQyxjQUFTLEdBQUcsWUFBWSxDQUFDO1FBQ3pCLHNCQUFpQixHQUFHLDBCQUEwQixDQUFDO1FBQy9DLDZCQUF3QixHQUFHLHFCQUFxQixDQUFDO1FBQ2pELHdCQUFtQixHQUFHLDBCQUEwQixDQUFDO1FBQ2pELGdCQUFXLEdBQUcsMEJBQTBCLENBQUM7UUFDekMseUJBQW9CLEdBQUcsOEJBQThCLENBQUM7UUFDdEQsZ0JBQVcsR0FBRywwQkFBMEIsQ0FBQztRQUN6QywyQkFBc0IsR0FBRyxrQkFBa0IsQ0FBQztRQUM1QyxtQkFBYyxHQUFHLDBCQUEwQixDQUFDO1FBQzVDLG1CQUFjLEdBQUcsMEJBQTBCLENBQUM7UUFDNUMsYUFBUSxHQUFHLFVBQVUsQ0FBQztRQUN0QixtQkFBYyxHQUFHLHFCQUFxQixDQUFDO1FBQ3ZDLFNBQUksR0FBRyxNQUFNLENBQUM7UUFDZCxXQUFNLEdBQUcsUUFBUSxDQUFDO1FBQ2xCLFNBQUksR0FBRyxNQUFNLENBQUM7UUFDZCxpQkFBWSxHQUFHLGlCQUFpQixDQUFDO1FBQ2pDLFdBQU0sR0FBRyxXQUFXLENBQUM7UUFDckIsYUFBUSxHQUFHLFVBQVUsQ0FBQztRQUN0QixvQkFBZSxHQUFHLG9CQUFvQixDQUFDO1FBQ3ZDLGdCQUFXLEdBQUcsY0FBYyxDQUFDO1FBQzdCLFlBQU8sR0FBRyxTQUFTLENBQUM7UUFDcEIsVUFBSyxHQUFHLE9BQU8sQ0FBQztRQUNoQixTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsY0FBUyxHQUFHLFlBQVksQ0FBQztRQUN6QixZQUFPLEdBQUcsVUFBVSxDQUFDO1FBQ3JCLFNBQUksR0FBRyxNQUFNLENBQUM7UUFDZCxTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsYUFBUSxHQUFHLFdBQVcsQ0FBQztRQUN2Qix1QkFBa0IsR0FBRyxXQUFXLENBQUM7UUFDakMsY0FBUyxHQUFHLFlBQVksQ0FBQztRQUN6QixnQkFBVyxHQUFHLGNBQWMsQ0FBQztRQUM3QixrQkFBYSxHQUFHLGdCQUFnQixDQUFDO1FBQ2pDLFVBQUssR0FBRyxPQUFPLENBQUM7UUFDaEIsUUFBRyxHQUFHLEtBQUssQ0FBQztRQUNaLGVBQVUsR0FBRyxhQUFhLENBQUM7UUFDM0IsaUJBQVksR0FBRyxxQkFBcUIsQ0FBQztRQUNyQyxlQUFVLEdBQUcsY0FBYyxDQUFDO1FBQzVCLG1CQUFjLEdBQUcsd0NBQXdDLENBQUM7UUFDMUQsaUJBQVksR0FBRywwQ0FBMEMsQ0FBQztRQUMxRCxjQUFTLEdBQUcsdUNBQXVDLENBQUM7UUFDcEQsYUFBUSxHQUFHLFlBQVksQ0FBQztRQUN4QixjQUFTLEdBQUcsYUFBYSxDQUFDO1FBQzFCLGVBQVUsR0FBRyxjQUFjLENBQUM7UUFDNUIsZUFBVSxHQUFHLGNBQWMsQ0FBQztRQUM1QixjQUFTLEdBQUcsYUFBYSxDQUFDO1FBQzFCLGFBQVEsR0FBRyxZQUFZLENBQUM7UUFDeEIsY0FBUyxHQUFHLGFBQWEsQ0FBQztRQUMxQixlQUFVLEdBQUcsY0FBYyxDQUFDO1FBQzVCLGVBQVUsR0FBRyxjQUFjLENBQUM7UUFDNUIsY0FBUyxHQUFHLGFBQWEsQ0FBQztRQUMxQixvQkFBZSxHQUFHLG1CQUFtQixDQUFDO1FBQ3RDLHdCQUFtQixHQUFHLHdCQUF3QixDQUFDO1FBQy9DLFlBQU8sR0FBRyxZQUFZLENBQUM7UUFDdkIsWUFBTyxHQUFHLFNBQVMsQ0FBQztRQUNwQixhQUFRLEdBQUcsU0FBUyxDQUFDO1FBQ3JCLFFBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxjQUFjO1FBQzNCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsU0FBSSxHQUFHLGlCQUFpQixDQUFDO1FBQ3pCLFVBQUssR0FBRyxnQkFBZ0IsQ0FBQztRQUN6QixRQUFHLEdBQUcsYUFBYSxDQUFDO1FBQ3BCLFlBQU8sR0FBRyxhQUFhLENBQUMsQ0FBQyxjQUFjO1FBQ3ZDLFlBQU8sR0FBRyxTQUFTLENBQUM7UUFDcEIsT0FBRSxHQUFHLElBQUksQ0FBQztRQUNWLGtCQUFhLEdBQUcsaUJBQWlCLENBQUM7UUFDbEMsZ0JBQVcsR0FBRyxlQUFlLENBQUM7UUFDOUIsT0FBRSxHQUFHLElBQUksQ0FBQztRQUNWLFFBQUcsR0FBRyxLQUFLLENBQUM7UUFDWixXQUFNLEdBQUcsUUFBUSxDQUFDO1FBQ2xCLFlBQU8sR0FBRyxvQkFBb0IsQ0FBQztRQUMvQixlQUFVLEdBQUcsWUFBWSxDQUFDO1FBQzFCLDBCQUFxQixHQUFHLFlBQVksQ0FBQztRQUNyQyx5QkFBb0IsR0FBRyxZQUFZLENBQUM7UUFDcEMsNEJBQXVCLEdBQUcsVUFBVSxDQUFDO1FBQ3JDLGdDQUEyQixHQUFHLE9BQU8sQ0FBQztRQUN0QyxpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQiwrQkFBMEIsR0FBRyw2Q0FBNkMsQ0FBQztRQUMzRSx1QkFBa0IsR0FBRywrQ0FBK0MsQ0FBQztRQUNyRSxpQkFBWSxHQUFHLDBHQUEwRyxDQUFDO1FBQzFILGFBQVEsR0FBRyxVQUFVLENBQUM7UUFDdEIsWUFBTyxHQUFHLFNBQVMsQ0FBQztRQUNwQixRQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ1osNEJBQXVCLEdBQUcscUJBQXFCLENBQUM7UUFDaEQscUNBQWdDLEdBQUcsZ0RBQWdELENBQUM7UUFDcEYsUUFBRyxHQUFHLEtBQUssQ0FBQztRQUNaLDBCQUFxQixHQUFHLDREQUE0RCxDQUFDO1FBQ3JGLHVCQUFrQixHQUFHLDhDQUE4QyxDQUFDO1FBQ3BFLHVCQUFrQixHQUFHLGtEQUFrRCxDQUFDO1FBQ3hFLHdCQUFtQixHQUFHLHdDQUF3QyxDQUFDO1FBQy9ELHNCQUFpQixHQUFHLDhFQUE4RSxDQUFDO1FBQ25HLHdCQUFtQixHQUFHLGlEQUFpRCxDQUFDO0lBTXJFLENBQUM7SUFFSixxQkFBcUIsQ0FBQyxLQUFhLEVBQUUsU0FBaUI7UUFDcEQsT0FBTywwREFBMEQsU0FBUyxRQUFRLEtBQUssR0FBRyxDQUFDO0lBQzdGLENBQUM7SUFFRCxZQUFZLENBQUMsU0FBaUI7UUFDNUIsT0FBTywwREFBMEQsU0FBUyxrQkFBa0IsQ0FBQztJQUMvRixDQUFDO0lBRUQseUJBQXlCLENBQUMsS0FBYSxFQUFFLFNBQWlCO1FBQ3hELE9BQU8sMkRBQTJELFNBQVMsUUFBUSxLQUFLLEdBQUcsQ0FBQztJQUM5RixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsU0FBaUI7UUFDaEMsT0FBTywyREFBMkQsU0FBUyxrQkFBa0IsQ0FBQztJQUNoRyxDQUFDO0lBRUQsaUJBQWlCLENBQUMsTUFBNEI7UUFDNUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxRQUFRLE9BQU8sQ0FBQztJQUNwQyxDQUFDO0lBRUQsZUFBZSxDQUFDLFFBQWdCO1FBQzlCLE9BQU8sR0FBRyxRQUFRLHdCQUF3QixDQUFDO0lBQzdDLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxLQUFhLEVBQUUsS0FBYTtRQUM3QyxPQUFPLFdBQVcsS0FBSyxPQUFPLEtBQUssV0FBVyxDQUFDO0lBQ2pELENBQUM7SUFFRCxZQUFZLENBQUMsS0FBYSxFQUFFLE1BQU0sR0FBRyxLQUFLO1FBQ3hDLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxjQUFjLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyx1QkFBdUIsS0FBSyxXQUFXLENBQUM7SUFDM0YsQ0FBQztJQUVELGdCQUFnQjtRQUNkLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRUQsd0JBQXdCO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDO0lBQ25DLENBQUM7SUFFRCwwQkFBMEIsQ0FBQyxjQUFzQjtRQUMvQyxPQUFPLGdDQUFnQyxjQUFjLEdBQUcsQ0FBQztJQUMzRCxDQUFDO0lBRUQsb0JBQW9CLENBQUMsS0FBVSxFQUFFLE1BQWtDO1FBQ2pFLE1BQU0sSUFBSSxHQUFHLEtBQUssWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0QsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3JDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsS0FBSyxJQUFHLENBQUM7SUFFMUIsZ0JBQWdCLENBQUMsS0FBSyxJQUFHLENBQUM7SUFFMUIsb0JBQW9CLENBQUMsS0FBVSxFQUFFLE1BQWtDO1FBQ2pFLE1BQU0sSUFBSSxHQUFHLEtBQUssWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0QsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3JDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxNQUFNLFNBQVMsR0FBK0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQzthQUN2RixhQUFhLENBQUMsSUFBSSxDQUFDO2FBQ25CLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUNwQixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDNUIsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDVCxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDakUsTUFBTSxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxNQUFNLElBQUksU0FBUyxFQUFFLENBQUM7UUFDakUsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQsV0FBVyxDQUFDLFlBQVksR0FBRyxDQUFDO1FBQzFCLFNBQVMsTUFBTSxDQUFDLFNBQVM7WUFDdkIsTUFBTSxFQUFFLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUN0QixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxTQUFTLENBQUMsQ0FBQztRQUM1RCxDQUFDO1FBRUQsSUFBSSxRQUFRLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDbkgsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hGLE9BQU8sUUFBUSxDQUFDO1FBQ2xCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVQLElBQUksWUFBWSxHQUFHLENBQUMsSUFBSSxZQUFZLElBQUksQ0FBQyxFQUFFO1lBQ3pDLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDL0MsUUFBUSxHQUFHLENBQUMsR0FBRyxRQUFRLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQztTQUN2QztRQUNELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxTQUFTO1FBQ1AsU0FBUyxRQUFRLENBQUMsS0FBSztZQUNyQixNQUFNLEVBQUUsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUVELE9BQU87WUFDTCxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ1gsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNYLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDWCxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ1gsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNYLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDWCxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ1gsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNYLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDWCxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ1gsUUFBUSxDQUFDLEVBQUUsQ0FBQztZQUNaLFFBQVEsQ0FBQyxFQUFFLENBQUM7U0FDYixDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEYsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFhO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxZQUFZLENBQUMsSUFBWSxFQUFFLFFBQWdCLEVBQUUsTUFBYyxFQUFFLEtBQWM7UUFDekUsSUFBSSxNQUFNLEtBQUssQ0FBQyxJQUFJLFFBQVEsS0FBSyxDQUFDLEVBQUU7WUFDbEMsT0FBTyxtQkFBbUIsTUFBTSxFQUFFLENBQUM7U0FDcEM7UUFFRCxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFN0IsTUFBTSxVQUFVLEdBQUcsSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUVuQywyRkFBMkY7UUFDM0YsTUFBTSxRQUFRLEdBQUcsVUFBVSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBRXZHLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsR0FBRyxDQUFDLE1BQU0sUUFBUSxJQUFJLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLFVBQVUsR0FBRyxDQUFDLE1BQU0sUUFBUSxPQUFPLE1BQU0sRUFBRSxDQUFDO0lBQ3pILENBQUM7SUFFRCxjQUFjLENBQUMsS0FBYTtRQUMxQixNQUFNLE9BQU8sR0FBRyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQ3ZELE9BQU8sSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsZ0JBQWdCLENBQUMsS0FBYSxFQUFFLGVBQXlDO1FBQ3ZFLE1BQU0sY0FBYyxHQUE0QjtZQUM5QyxLQUFLLEVBQUUsU0FBUztZQUNoQixxQkFBcUIsRUFBRSxDQUFDO1lBQ3hCLHFCQUFxQixFQUFFLENBQUM7WUFDeEIsbUJBQW1CLEVBQUUsSUFBSTtTQUMxQixDQUFDO1FBQ0YsTUFBTSxPQUFPLEdBQTRCLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ3hGLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDdEYsSUFBSSxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3BGLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtZQUNiLE1BQU0sR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUN2RjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7T0FFRztJQUNILG1CQUFtQixDQUFDLEtBQWEsRUFBRSxTQUFpQjtRQUNsRCxJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ25ELE1BQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEQsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDLElBQUksWUFBWSxHQUFHLFNBQVMsR0FBRyxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRTtZQUM1RSxhQUFhLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDeEY7UUFDRCxPQUFPLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQUssRUFBRSxPQUFrQztRQUNwRCxPQUFPLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQsZUFBZSxDQUFDLEtBQTZCO1FBQzNDLE1BQU0sT0FBTyxHQUErQjtZQUMxQyw0Q0FBNEM7WUFDNUMsS0FBSyxFQUFFLFNBQVM7WUFDaEIsR0FBRyxFQUFFLFNBQVM7WUFDZCxJQUFJLEVBQUUsU0FBUztZQUNmLElBQUksRUFBRSxTQUFTO1lBQ2YsTUFBTSxFQUFFLFNBQVM7U0FDbEIsQ0FBQztRQUNGLE1BQU0sTUFBTSxHQUFHLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRyxPQUFPLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQTZCO1FBQ3RDLE1BQU0sT0FBTyxHQUErQjtZQUMxQyxvQkFBb0I7WUFDcEIsSUFBSSxFQUFFLFNBQVM7WUFDZixNQUFNLEVBQUUsU0FBUztTQUNsQixDQUFDO1FBQ0YsTUFBTSxNQUFNLEdBQUcsS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BHLE9BQU8sSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBNkI7UUFDdEMsTUFBTSxPQUFPLEdBQStCO1lBQzFDLDBCQUEwQjtZQUMxQixLQUFLLEVBQUUsU0FBUztZQUNoQixHQUFHLEVBQUUsU0FBUztZQUNkLElBQUksRUFBRSxTQUFTO1NBQ2hCLENBQUM7UUFDRixNQUFNLE1BQU0sR0FBRyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEcsT0FBTyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUUsQ0FBQzs7OEdBMVRVLGdCQUFnQixrQkFtR2pCLFNBQVM7a0hBbkdSLGdCQUFnQjs0RkFBaEIsZ0JBQWdCO2tCQUQ1QixVQUFVOzswQkFtR04sUUFBUTs7MEJBQ1IsTUFBTTsyQkFBQyxTQUFTOztBQTBOckIsTUFBTSxDQUFDLE1BQU0sOEJBQThCLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIExPQ0FMRV9JRCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vICBpbXBvcnQgRGF0ZVRpbWVGb3JtYXRQYXJ0ID0gSW50bC5EYXRlVGltZUZvcm1hdFBhcnQ7XG5cbmludGVyZmFjZSBUaW1lRm9ybWF0UGFydHMge1xuICBob3VyOiBzdHJpbmc7XG4gIG1pbnV0ZTogc3RyaW5nO1xuICBkYXlQZXJpb2Q/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmlnRGVjaW1hbEZvcm1hdE9wdGlvbnMgZXh0ZW5kcyBJbnRsLk51bWJlckZvcm1hdE9wdGlvbnMge1xuICB1c2VBY2NvdW50aW5nRm9ybWF0PzogYm9vbGVhbjsgLy8gUmVuZGVyIG5lZ2F0aXZlIG51bWJlcnMgdXNpbmcgcGFyZW5zLiBUcnVlOiBcIigzLjE0KVwiLCBGYWxzZTogXCItMy4xNFwiXG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOb3ZvTGFiZWxTZXJ2aWNlIHtcbiAgZmlsdGVycyA9ICdGaWx0ZXInO1xuICBjbGVhciA9ICdDbGVhcic7XG4gIHNvcnQgPSAnU29ydCc7XG4gIGRpc3RyaWJ1dGlvbkxpc3RPd25lciA9ICdPd25lcic7XG4gIGRhdGVBZGRlZCA9ICdEYXRlIEFkZGVkJztcbiAgZW1wdHlUYWJsZU1lc3NhZ2UgPSAnTm8gUmVjb3JkcyB0byBkaXNwbGF5Li4uJztcbiAgbm9NYXRjaGluZ1JlY29yZHNNZXNzYWdlID0gJ05vIE1hdGNoaW5nIFJlY29yZHMnO1xuICBlcnJvcmVkVGFibGVNZXNzYWdlID0gJ09vcHMhIEFuIGVycm9yIG9jY3VycmVkLic7XG4gIHBpY2tlckVycm9yID0gJ09vcHMhIEFuIGVycm9yIG9jY3VycmVkLic7XG4gIHBpY2tlclRleHRGaWVsZEVtcHR5ID0gJ0JlZ2luIHR5cGluZyB0byBzZWUgcmVzdWx0cy4nO1xuICBwaWNrZXJFbXB0eSA9ICdObyByZXN1bHRzIHRvIGRpc3BsYXkuLi4nO1xuICB0YWJiZWRHcm91cFBpY2tlckVtcHR5ID0gJ05vIHJlc3VsdHMgZm91bmQnO1xuICBxdWlja05vdGVFcnJvciA9ICdPb3BzISBBbiBlcnJvciBvY2N1cnJlZC4nO1xuICBxdWlja05vdGVFbXB0eSA9ICdObyByZXN1bHRzIHRvIGRpc3BsYXkuLi4nO1xuICByZXF1aXJlZCA9ICdSZXF1aXJlZCc7XG4gIG51bWJlclRvb0xhcmdlID0gJ051bWJlciBpcyB0b28gbGFyZ2UnO1xuICBzYXZlID0gJ1NhdmUnO1xuICBjYW5jZWwgPSAnQ2FuY2VsJztcbiAgbmV4dCA9ICdOZXh0JztcbiAgaXRlbXNQZXJQYWdlID0gJ0l0ZW1zIHBlciBwYWdlOic7XG4gIHNlbGVjdCA9ICdTZWxlY3QuLi4nO1xuICBzZWxlY3RlZCA9ICdTZWxlY3RlZCc7XG4gIHNlbGVjdEFsbE9uUGFnZSA9ICdTZWxlY3QgYWxsIG9uIHBhZ2UnO1xuICBkZXNlbGVjdEFsbCA9ICdEZXNlbGVjdCBhbGwnO1xuICByZWZyZXNoID0gJ1JlZnJlc2gnO1xuICBjbG9zZSA9ICdDbG9zZSc7XG4gIG1vdmUgPSAnTW92ZSc7XG4gIHN0YXJ0RGF0ZSA9ICdTdGFydCBEYXRlJztcbiAgZW5kRGF0ZSA9ICdFbmQgRGF0ZSc7XG4gIHJhdGUgPSAnUmF0ZSc7XG4gIG1vcmUgPSAnbW9yZSc7XG4gIGNsZWFyQWxsID0gJ0NMRUFSIEFMTCc7XG4gIGNsZWFyQWxsTm9ybWFsQ2FzZSA9ICdDbGVhciBBbGwnO1xuICBjbGVhclNvcnQgPSAnQ2xlYXIgU29ydCc7XG4gIGNsZWFyRmlsdGVyID0gJ0NsZWFyIEZpbHRlcic7XG4gIGNsZWFyU2VsZWN0ZWQgPSAnQ2xlYXIgU2VsZWN0ZWQnO1xuICB0b2RheSA9ICdUb2RheSc7XG4gIG5vdyA9ICdOb3cnO1xuICBpc1JlcXVpcmVkID0gJ2lzIHJlcXVpcmVkJztcbiAgbm90VmFsaWRZZWFyID0gJ2lzIG5vdCBhIHZhbGlkIHllYXInO1xuICBpc1Rvb0xhcmdlID0gJ2lzIHRvbyBsYXJnZSc7XG4gIGludmFsaWRBZGRyZXNzID0gJ3JlcXVpcmVzIGF0IGxlYXN0IG9uZSBmaWVsZCBmaWxsZWQgb3V0JztcbiAgaW52YWxpZEVtYWlsID0gJ3JlcXVpcmVzIGEgdmFsaWQgZW1haWwgKGV4LiBhYmNAMTIzLmNvbSknO1xuICBtaW5MZW5ndGggPSAnaXMgcmVxdWlyZWQgdG8gYmUgYSBtaW5pbXVtIGxlbmd0aCBvZic7XG4gIHBhc3QxRGF5ID0gJ1Bhc3QgMSBEYXknO1xuICBwYXN0N0RheXMgPSAnUGFzdCA3IERheXMnO1xuICBwYXN0MzBEYXlzID0gJ1Bhc3QgMzAgRGF5cyc7XG4gIHBhc3Q5MERheXMgPSAnUGFzdCA5MCBEYXlzJztcbiAgcGFzdDFZZWFyID0gJ1Bhc3QgMSBZZWFyJztcbiAgbmV4dDFEYXkgPSAnTmV4dCAxIERheSc7XG4gIG5leHQ3RGF5cyA9ICdOZXh0IDcgRGF5cyc7XG4gIG5leHQzMERheXMgPSAnTmV4dCAzMCBEYXlzJztcbiAgbmV4dDkwRGF5cyA9ICdOZXh0IDkwIERheXMnO1xuICBuZXh0MVllYXIgPSAnTmV4dCAxIFllYXInO1xuICBjdXN0b21EYXRlUmFuZ2UgPSAnQ3VzdG9tIERhdGUgUmFuZ2UnO1xuICBiYWNrVG9QcmVzZXRGaWx0ZXJzID0gJ0JhY2sgdG8gUHJlc2V0IEZpbHRlcnMnO1xuICBva0dvdEl0ID0gJ09rLCBHb3QgaXQnO1xuICBhZGRyZXNzID0gJ0FkZHJlc3MnO1xuICBhZGRyZXNzMSA9ICdBZGRyZXNzJztcbiAgYXB0ID0gJ0FwdCc7IC8vIFRPRE8gZGVsZXRlXG4gIGFkZHJlc3MyID0gJ0FwdCc7XG4gIGNpdHkgPSAnQ2l0eSAvIExvY2FsaXR5JztcbiAgc3RhdGUgPSAnU3RhdGUgLyBSZWdpb24nO1xuICB6aXAgPSAnUG9zdGFsIENvZGUnO1xuICB6aXBDb2RlID0gJ1Bvc3RhbCBDb2RlJzsgLy8gVE9ETyBkZWxldGVcbiAgY291bnRyeSA9ICdDb3VudHJ5JztcbiAgb3IgPSAnb3InO1xuICBjbGlja1RvQnJvd3NlID0gJ2NsaWNrIHRvIGJyb3dzZSc7XG4gIGNob29zZUFGaWxlID0gJ0Nob29zZSBhIGZpbGUnO1xuICBubyA9ICdObyc7XG4gIHllcyA9ICdZZXMnO1xuICBzZWFyY2ggPSAnU0VBUkNIJztcbiAgbm9JdGVtcyA9ICdUaGVyZSBhcmUgbm8gaXRlbXMnO1xuICBkYXRlRm9ybWF0ID0gJ01NL2RkL3l5eXknO1xuICBkYXRlRm9ybWF0UGxhY2Vob2xkZXIgPSAnTU0vREQvWVlZWSc7XG4gIGxvY2FsRGF0ZVBsYWNlaG9sZGVyID0gJ21tL2RkL3l5eXknO1xuICB0aW1lRm9ybWF0UGxhY2Vob2xkZXJBTSA9ICdoaDptbSBBTSc7XG4gIHRpbWVGb3JtYXRQbGFjZWhvbGRlcjI0SG91ciA9ICdISDptbSc7XG4gIHRpbWVGb3JtYXRBTSA9ICdBTSc7XG4gIHRpbWVGb3JtYXRQTSA9ICdQTSc7XG4gIGNvbmZpcm1DaGFuZ2VzTW9kYWxNZXNzYWdlID0gJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjaGFuZ2UgdGhpcyBmaWVsZD8nO1xuICBwcm9tcHRNb2RhbE1lc3NhZ2UgPSAnRG8geW91IHdhbnQgdG8gcGVyZm9ybSB0aGUgZm9sbG93aW5nIGNoYW5nZXM/JztcbiAgYXN5bmNGYWlsdXJlID0gJ0FzeW5jIHZhbGlkYXRpb24gd2FzIG5vdCBjYWxsZWQgd2l0aGluIHRoZSAxMHMgdGhyZXNob2xkLCB5b3UgbWlnaHQgd2FudCB0byByZWxvYWQgdGhlIHBhZ2UgdG8gdHJ5IGFnYWluJztcbiAgcHJldmlvdXMgPSAnUHJldmlvdXMnO1xuICBhY3Rpb25zID0gJ0FjdGlvbnMnO1xuICBhbGwgPSAnQWxsJztcbiAgZ3JvdXBlZE11bHRpUGlja2VyRW1wdHkgPSAnTm8gaXRlbXMgdG8gZGlzcGxheSc7XG4gIGdyb3VwZWRNdWx0aVBpY2tlclNlbGVjdENhdGVnb3J5ID0gJ1NlbGVjdCBhIGNhdGVnb3J5IGZyb20gdGhlIGxlZnQgdG8gZ2V0IHN0YXJ0ZWQnO1xuICBhZGQgPSAnQWRkJztcbiAgZW5jcnlwdGVkRmllbGRUb29sdGlwID0gJ1RoaXMgZGF0YSBoYXMgYmVlbiBzdG9yZWQgYXQgdGhlIGhpZ2hlc3QgbGV2ZWwgb2Ygc2VjdXJpdHknO1xuICBub1N0YXRlc0ZvckNvdW50cnkgPSAnTm8gc3RhdGVzIGF2YWlsYWJsZSBmb3IgdGhlIHNlbGVjdGVkIGNvdW50cnknO1xuICBzZWxlY3RDb3VudHJ5Rmlyc3QgPSAnUGxlYXNlIHNlbGVjdCBhIGNvdW50cnkgYmVmb3JlIHNlbGVjdGluZyBhIHN0YXRlJztcbiAgaW52YWxpZEludGVnZXJJbnB1dCA9ICdTcGVjaWFsIGNoYXJhY3RlcnMgYXJlIG5vdCBhbGxvd2VkIGZvcic7XG4gIG1heFJlY29yZHNSZWFjaGVkID0gJ1NvcnJ5LCB5b3UgaGF2ZSByZWFjaGVkIHRoZSBtYXhpbXVtIG51bWJlciBvZiByZWNvcmRzIGFsbG93ZWQgZm9yIHRoaXMgZmllbGQnO1xuICBzZWxlY3RGaWx0ZXJPcHRpb25zID0gJ1BsZWFzZSBzZWxlY3Qgb25lIG9yIG1vcmUgZmlsdGVyIG9wdGlvbnMgYmVsb3cuJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoTE9DQUxFX0lEKVxuICAgIHB1YmxpYyB1c2VyTG9jYWxlID0gJ2VuLVVTJyxcbiAgKSB7fVxuXG4gIG1heGxlbmd0aE1ldFdpdGhGaWVsZChmaWVsZDogc3RyaW5nLCBtYXhsZW5ndGg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBTb3JyeSwgeW91IGhhdmUgcmVhY2hlZCB0aGUgbWF4aW11bSBjaGFyYWN0ZXIgY291bnQgb2YgJHttYXhsZW5ndGh9IGZvciAke2ZpZWxkfS5gO1xuICB9XG5cbiAgbWF4bGVuZ3RoTWV0KG1heGxlbmd0aDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYFNvcnJ5LCB5b3UgaGF2ZSByZWFjaGVkIHRoZSBtYXhpbXVtIGNoYXJhY3RlciBjb3VudCBvZiAke21heGxlbmd0aH0gZm9yIHRoaXMgZmllbGQuYDtcbiAgfVxuXG4gIGludmFsaWRNYXhsZW5ndGhXaXRoRmllbGQoZmllbGQ6IHN0cmluZywgbWF4bGVuZ3RoOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBgU29ycnksIHlvdSBoYXZlIGV4Y2VlZGVkIHRoZSBtYXhpbXVtIGNoYXJhY3RlciBjb3VudCBvZiAke21heGxlbmd0aH0gZm9yICR7ZmllbGR9LmA7XG4gIH1cblxuICBpbnZhbGlkTWF4bGVuZ3RoKG1heGxlbmd0aDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYFNvcnJ5LCB5b3UgaGF2ZSBleGNlZWRlZCB0aGUgbWF4aW11bSBjaGFyYWN0ZXIgY291bnQgb2YgJHttYXhsZW5ndGh9IGZvciB0aGlzIGZpZWxkLmA7XG4gIH1cblxuICBnZXRUb01hbnlQbHVzTW9yZSh0b01hbnk6IHsgcXVhbnRpdHk6IG51bWJlciB9KTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCske3RvTWFueS5xdWFudGl0eX0gbW9yZWA7XG4gIH1cblxuICBzZWxlY3RlZFJlY29yZHMoc2VsZWN0ZWQ6IG51bWJlcikge1xuICAgIHJldHVybiBgJHtzZWxlY3RlZH0gcmVjb3JkcyBhcmUgc2VsZWN0ZWQuYDtcbiAgfVxuXG4gIHNob3dpbmdYb2ZYUmVzdWx0cyhzaG93bjogbnVtYmVyLCB0b3RhbDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIGBTaG93aW5nICR7c2hvd259IG9mICR7dG90YWx9IFJlc3VsdHMuYDtcbiAgfVxuXG4gIHRvdGFsUmVjb3Jkcyh0b3RhbDogbnVtYmVyLCBzZWxlY3QgPSBmYWxzZSkge1xuICAgIHJldHVybiBzZWxlY3QgPyBgU2VsZWN0IGFsbCAke3RvdGFsfSByZWNvcmRzLmAgOiBgRGUtc2VsZWN0IHJlbWFpbmluZyAke3RvdGFsfSByZWNvcmRzLmA7XG4gIH1cblxuICBkYXRlRm9ybWF0U3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdDtcbiAgfVxuXG4gIGxvY2FsaXplZERhdGVQbGFjZWhvbGRlcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmxvY2FsRGF0ZVBsYWNlaG9sZGVyO1xuICB9XG5cbiAgdGFiYmVkR3JvdXBDbGVhclN1Z2dlc3Rpb24odGFiTGFiZWxQbHVyYWw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBDbGVhciB5b3VyIHNlYXJjaCB0byBzZWUgYWxsICR7dGFiTGFiZWxQbHVyYWx9LmA7XG4gIH1cblxuICBmb3JtYXREYXRlV2l0aEZvcm1hdCh2YWx1ZTogYW55LCBmb3JtYXQ6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zKSB7XG4gICAgY29uc3QgZGF0ZSA9IHZhbHVlIGluc3RhbmNlb2YgRGF0ZSA/IHZhbHVlIDogbmV3IERhdGUodmFsdWUpO1xuICAgIGlmIChkYXRlLmdldFRpbWUoKSAhPT0gZGF0ZS5nZXRUaW1lKCkpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMudXNlckxvY2FsZSwgZm9ybWF0KS5mb3JtYXQoZGF0ZSk7XG4gIH1cblxuICBmb3JtYXRUb1RpbWVPbmx5KHBhcmFtKSB7fVxuXG4gIGZvcm1hdFRvRGF0ZU9ubHkocGFyYW0pIHt9XG5cbiAgZm9ybWF0VGltZVdpdGhGb3JtYXQodmFsdWU6IGFueSwgZm9ybWF0OiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucyk6IHN0cmluZyB7XG4gICAgY29uc3QgZGF0ZSA9IHZhbHVlIGluc3RhbmNlb2YgRGF0ZSA/IHZhbHVlIDogbmV3IERhdGUodmFsdWUpO1xuICAgIGlmIChkYXRlLmdldFRpbWUoKSAhPT0gZGF0ZS5nZXRUaW1lKCkpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgY29uc3QgdGltZVBhcnRzOiB7IFt0eXBlOiBzdHJpbmddOiBzdHJpbmcgfSA9IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy51c2VyTG9jYWxlLCBmb3JtYXQpXG4gICAgICAuZm9ybWF0VG9QYXJ0cyhkYXRlKVxuICAgICAgLnJlZHVjZSgob2JqLCBwYXJ0KSA9PiB7XG4gICAgICAgIG9ialtwYXJ0LnR5cGVdID0gcGFydC52YWx1ZTtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH0sIHt9KTtcbiAgICBjb25zdCBkYXlQZXJpb2QgPSB0aW1lUGFydHMuZGF5UGVyaW9kID8gdGltZVBhcnRzLmRheVBlcmlvZCA6ICcnO1xuICAgIGNvbnN0IHJlcyA9IGAke3RpbWVQYXJ0cy5ob3VyfToke3RpbWVQYXJ0cy5taW51dGV9ICR7ZGF5UGVyaW9kfWA7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIGdldFdlZWtkYXlzKHdlZWtTdGFydHNPbiA9IDApOiBzdHJpbmdbXSB7XG4gICAgZnVuY3Rpb24gZ2V0RGF5KGRheU9mV2Vlaykge1xuICAgICAgY29uc3QgZHQgPSBuZXcgRGF0ZSgpO1xuICAgICAgcmV0dXJuIGR0LnNldERhdGUoZHQuZ2V0RGF0ZSgpIC0gZHQuZ2V0RGF5KCkgKyBkYXlPZldlZWspO1xuICAgIH1cblxuICAgIGxldCB3ZWVrZGF5cyA9IFtnZXREYXkoMCksIGdldERheSgxKSwgZ2V0RGF5KDIpLCBnZXREYXkoMyksIGdldERheSg0KSwgZ2V0RGF5KDUpLCBnZXREYXkoNildLnJlZHVjZSgod2Vla2RheXMsIGR0KSA9PiB7XG4gICAgICB3ZWVrZGF5cy5wdXNoKG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMudXNlckxvY2FsZSwgeyB3ZWVrZGF5OiAnbG9uZycgfSkuZm9ybWF0KGR0KSk7XG4gICAgICByZXR1cm4gd2Vla2RheXM7XG4gICAgfSwgW10pO1xuXG4gICAgaWYgKHdlZWtTdGFydHNPbiA+IDAgJiYgd2Vla1N0YXJ0c09uIDw9IDYpIHtcbiAgICAgIGNvbnN0IG5ld1N0YXJ0ID0gd2Vla2RheXMuc3BsaWNlKHdlZWtTdGFydHNPbik7XG4gICAgICB3ZWVrZGF5cyA9IFsuLi5uZXdTdGFydCwgLi4ud2Vla2RheXNdO1xuICAgIH1cbiAgICByZXR1cm4gd2Vla2RheXM7XG4gIH1cblxuICBnZXRNb250aHMoKTogc3RyaW5nW10ge1xuICAgIGZ1bmN0aW9uIGdldE1vbnRoKG1vbnRoKSB7XG4gICAgICBjb25zdCBkdCA9IG5ldyBEYXRlKCk7XG4gICAgICByZXR1cm4gZHQuc2V0TW9udGgobW9udGgsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBbXG4gICAgICBnZXRNb250aCgwKSxcbiAgICAgIGdldE1vbnRoKDEpLFxuICAgICAgZ2V0TW9udGgoMiksXG4gICAgICBnZXRNb250aCgzKSxcbiAgICAgIGdldE1vbnRoKDQpLFxuICAgICAgZ2V0TW9udGgoNSksXG4gICAgICBnZXRNb250aCg2KSxcbiAgICAgIGdldE1vbnRoKDcpLFxuICAgICAgZ2V0TW9udGgoOCksXG4gICAgICBnZXRNb250aCg5KSxcbiAgICAgIGdldE1vbnRoKDEwKSxcbiAgICAgIGdldE1vbnRoKDExKSxcbiAgICBdLnJlZHVjZSgobW9udGhzLCBkdCkgPT4ge1xuICAgICAgbW9udGhzLnB1c2gobmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy51c2VyTG9jYWxlLCB7IG1vbnRoOiAnbG9uZycgfSkuZm9ybWF0KGR0KSk7XG4gICAgICByZXR1cm4gbW9udGhzO1xuICAgIH0sIFtdKTtcbiAgfVxuXG4gIGdldFByb3BlcnR5KHZhbHVlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpc1t2YWx1ZV07XG4gIH1cblxuICBnZXRSYW5nZVRleHQocGFnZTogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyLCBsZW5ndGg6IG51bWJlciwgc2hvcnQ6IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgIGlmIChsZW5ndGggPT09IDAgfHwgcGFnZVNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiBgRGlzcGxheWluZyAwIG9mICR7bGVuZ3RofWA7XG4gICAgfVxuXG4gICAgbGVuZ3RoID0gTWF0aC5tYXgobGVuZ3RoLCAwKTtcblxuICAgIGNvbnN0IHN0YXJ0SW5kZXggPSBwYWdlICogcGFnZVNpemU7XG5cbiAgICAvLyBJZiB0aGUgc3RhcnQgaW5kZXggZXhjZWVkcyB0aGUgbGlzdCBsZW5ndGgsIGRvIG5vdCB0cnkgYW5kIGZpeCB0aGUgZW5kIGluZGV4IHRvIHRoZSBlbmQuXG4gICAgY29uc3QgZW5kSW5kZXggPSBzdGFydEluZGV4IDwgbGVuZ3RoID8gTWF0aC5taW4oc3RhcnRJbmRleCArIHBhZ2VTaXplLCBsZW5ndGgpIDogc3RhcnRJbmRleCArIHBhZ2VTaXplO1xuXG4gICAgcmV0dXJuIHNob3J0ID8gYCR7c3RhcnRJbmRleCArIDF9IC0gJHtlbmRJbmRleH0vJHtsZW5ndGh9YCA6IGBEaXNwbGF5aW5nICR7c3RhcnRJbmRleCArIDF9IC0gJHtlbmRJbmRleH0gb2YgJHtsZW5ndGh9YDtcbiAgfVxuXG4gIGZvcm1hdEN1cnJlbmN5KHZhbHVlOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7IHN0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogJ1VTRCcgfTtcbiAgICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KHRoaXMudXNlckxvY2FsZSwgb3B0aW9ucykuZm9ybWF0KHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHRlbmRzIHRoZSBJbnRsLm51bWJlckZvcm1hdCBjYXBhYmlsaXR5IHdpdGggdHdvIGV4dHJhIGZlYXR1cmVzOlxuICAgKiAgLSBEb2VzIE5PVCByb3VuZCB2YWx1ZXMsIGJ1dCBpbnN0ZWFkIHRydW5jYXRlcyB0byBtYXhpbXVtRnJhY3Rpb25EaWdpdHNcbiAgICogIC0gQnkgZGVmYXVsdCB1c2VzIGFjY291bnRpbmcgZm9ybWF0IGZvciBuZWdhdGl2ZSBudW1iZXJzOiAoMy4xNCkgaW5zdGVhZCBvZiAtMy4xNC5cbiAgICpcbiAgICogQHBhcmFtIHZhbHVlICAgICAgICAgICBUaGUgbnVtYmVyIHZhbHVlIHRvIGNvbnZlcnQgdG8gc3RyaW5nXG4gICAqIEBwYXJhbSBvdmVycmlkZU9wdGlvbnMgQWxsb3dzIGZvciBvdmVycmlkaW5nIG9wdGlvbnMgdXNlZCBhbmQgcGFzc2VkIHRvIEludGwuTnVtYmVyRm9ybWF0KClcbiAgICovXG4gIGZvcm1hdEJpZ0RlY2ltYWwodmFsdWU6IG51bWJlciwgb3ZlcnJpZGVPcHRpb25zPzogQmlnRGVjaW1hbEZvcm1hdE9wdGlvbnMpOiBzdHJpbmcge1xuICAgIGNvbnN0IGRlZmF1bHRPcHRpb25zOiBCaWdEZWNpbWFsRm9ybWF0T3B0aW9ucyA9IHtcbiAgICAgIHN0eWxlOiAnZGVjaW1hbCcsXG4gICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgICB1c2VBY2NvdW50aW5nRm9ybWF0OiB0cnVlLFxuICAgIH07XG4gICAgY29uc3Qgb3B0aW9uczogQmlnRGVjaW1hbEZvcm1hdE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRPcHRpb25zLCBvdmVycmlkZU9wdGlvbnMpO1xuICAgIGNvbnN0IHRydW5jYXRlZFZhbHVlID0gdGhpcy50cnVuY2F0ZVRvUHJlY2lzaW9uKHZhbHVlLCBvcHRpb25zLm1heGltdW1GcmFjdGlvbkRpZ2l0cyk7XG4gICAgbGV0IF92YWx1ZSA9IG5ldyBJbnRsLk51bWJlckZvcm1hdCh0aGlzLnVzZXJMb2NhbGUsIG9wdGlvbnMpLmZvcm1hdCh0cnVuY2F0ZWRWYWx1ZSk7XG4gICAgaWYgKHZhbHVlIDwgMCkge1xuICAgICAgX3ZhbHVlID0gb3B0aW9ucy51c2VBY2NvdW50aW5nRm9ybWF0ID8gYCgke192YWx1ZS5zbGljZSgxKX0pYCA6IGAtJHtfdmFsdWUuc2xpY2UoMSl9YDtcbiAgICB9XG4gICAgcmV0dXJuIF92YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIHN0cmluZy1iYXNlZCB0cnVuY2F0aW5nIG9mIGEgbnVtYmVyIHdpdGggbm8gcm91bmRpbmdcbiAgICovXG4gIHRydW5jYXRlVG9QcmVjaXNpb24odmFsdWU6IG51bWJlciwgcHJlY2lzaW9uOiBudW1iZXIpIHtcbiAgICBsZXQgdmFsdWVBc1N0cmluZyA9IHZhbHVlID8gdmFsdWUudG9TdHJpbmcoKSA6ICcwJztcbiAgICBjb25zdCBkZWNpbWFsSW5kZXggPSB2YWx1ZUFzU3RyaW5nLmluZGV4T2YoJy4nKTtcbiAgICBpZiAoZGVjaW1hbEluZGV4ID4gLTEgJiYgZGVjaW1hbEluZGV4ICsgcHJlY2lzaW9uICsgMSA8IHZhbHVlQXNTdHJpbmcubGVuZ3RoKSB7XG4gICAgICB2YWx1ZUFzU3RyaW5nID0gdmFsdWVBc1N0cmluZy5zdWJzdHJpbmcoMCwgdmFsdWVBc1N0cmluZy5pbmRleE9mKCcuJykgKyBwcmVjaXNpb24gKyAxKTtcbiAgICB9XG4gICAgcmV0dXJuIE51bWJlcih2YWx1ZUFzU3RyaW5nKTtcbiAgfVxuXG4gIGZvcm1hdE51bWJlcih2YWx1ZSwgb3B0aW9ucz86IEludGwuTnVtYmVyRm9ybWF0T3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQodGhpcy51c2VyTG9jYWxlLCBvcHRpb25zKS5mb3JtYXQodmFsdWUpO1xuICB9XG5cbiAgZm9ybWF0RGF0ZVNob3J0KHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBEYXRlKSB7XG4gICAgY29uc3Qgb3B0aW9uczogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMgPSB7XG4gICAgICAvLyBERC9NTS9ZWVlZLCBISDpNTSBBIC0gMDIvMTQvMjAxNywgMToxNyBQTVxuICAgICAgbW9udGg6ICcyLWRpZ2l0JyxcbiAgICAgIGRheTogJzItZGlnaXQnLFxuICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgaG91cjogJ251bWVyaWMnLFxuICAgICAgbWludXRlOiAnMi1kaWdpdCcsXG4gICAgfTtcbiAgICBjb25zdCBfdmFsdWUgPSB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSAnJyA/IG5ldyBEYXRlKCkgOiBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMudXNlckxvY2FsZSwgb3B0aW9ucykuZm9ybWF0KF92YWx1ZSk7XG4gIH1cblxuICBmb3JtYXRUaW1lKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBEYXRlKSB7XG4gICAgY29uc3Qgb3B0aW9uczogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMgPSB7XG4gICAgICAvLyBISDpNTSBBIC0gMToxNyBQTVxuICAgICAgaG91cjogJ251bWVyaWMnLFxuICAgICAgbWludXRlOiAnMi1kaWdpdCcsXG4gICAgfTtcbiAgICBjb25zdCBfdmFsdWUgPSB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSAnJyA/IG5ldyBEYXRlKCkgOiBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMudXNlckxvY2FsZSwgb3B0aW9ucykuZm9ybWF0KF92YWx1ZSk7XG4gIH1cblxuICBmb3JtYXREYXRlKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBEYXRlKSB7XG4gICAgY29uc3Qgb3B0aW9uczogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMgPSB7XG4gICAgICAvLyBERC9NTS9ZWVlZIC0gMDIvMTQvMjAxN1xuICAgICAgbW9udGg6ICcyLWRpZ2l0JyxcbiAgICAgIGRheTogJzItZGlnaXQnLFxuICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgIH07XG4gICAgY29uc3QgX3ZhbHVlID0gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gJycgPyBuZXcgRGF0ZSgpIDogbmV3IERhdGUodmFsdWUpO1xuICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLnVzZXJMb2NhbGUsIG9wdGlvbnMpLmZvcm1hdChfdmFsdWUpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBOT1ZPX0VMRU1FTlRTX0xBQkVMU19QUk9WSURFUlMgPSBbeyBwcm92aWRlOiBOb3ZvTGFiZWxTZXJ2aWNlLCB1c2VDbGFzczogTm92b0xhYmVsU2VydmljZSB9XTtcbiJdfQ==