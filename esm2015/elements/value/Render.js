// NG2
import { ChangeDetectorRef, Injectable, Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// APP
import { NovoLabelService } from '../../services/novo-label-service';
import { findByCountryId } from '../../utils/countries/Countries';
/**
 * @classdesc
 * Renders data appropriately based on the data type found in Meta
 * All data types defined by bullhorn should be supported:
 *
 * - **String**: trims value and returns
 * - **Integer**: return value
 * - **Double**: return value fixed to 2 decimals
 * - **BigDecimal**: return value fixed to 2 decimals
 * - **Address**: only city and/or state returned
 * - **Address1**: only city and/or state returned
 * - **AddressWithoutCountry**: only city and/or state returned
 * - **Currency**: put a $ in front
 * - **Percentage**: divide by 100 fix to 2 decimals place and return
 * - **Options**: returns the appropriate 'label' for the 'value' from 'options'
 * - **Array**: returns list comma separated
 * - **DateTime**: formats the date
 * - **TimeStamp**: formats the date
 * - **ToOne**: return the entity specific name (ie. name, firstName lastName, title, ...)
 * - **ToMany**: return an array of the entity specific names (ie. name, firstName lastName, title, ...)
 *
 * @example
 * ```
 * {{ expression | render:field }}
 * ```
 */
export class RenderPipe {
    constructor(changeDetector, sanitizationService, labels) {
        this.changeDetector = changeDetector;
        this.sanitizationService = sanitizationService;
        this.labels = labels;
    }
    equals(objectOne, objectTwo) {
        if (objectOne === objectTwo) {
            return true;
        }
        if (objectOne === null || objectTwo === null) {
            return false;
        }
        if (objectOne !== objectOne && objectTwo !== objectTwo) {
            return true;
        }
        const t1 = typeof objectOne;
        const t2 = typeof objectTwo;
        let length;
        let key;
        let keySet;
        if (t1 === t2 && t1 === 'object') {
            if (Array.isArray(objectOne)) {
                if (!Array.isArray(objectTwo)) {
                    return false;
                }
                length = objectOne.length;
                if (length === objectTwo.length) {
                    for (key = 0; key < length; key++) {
                        if (!this.equals(objectOne[key], objectTwo[key])) {
                            return false;
                        }
                    }
                    return true;
                }
            }
            else {
                if (Array.isArray(objectTwo)) {
                    return false;
                }
                keySet = Object.create(null);
                for (key in objectOne) {
                    if (objectOne[key]) {
                        if (!this.equals(objectOne[key], objectTwo[key])) {
                            return false;
                        }
                        keySet[key] = true;
                    }
                }
                for (key in objectTwo) {
                    if (!(key in keySet) && typeof objectTwo[key] !== 'undefined') {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    }
    getEntityLabel(item, entity) {
        switch (entity) {
            case 'CorporateUser':
            case 'ClientContact':
            case 'ClientContact1':
            case 'ClientContact2':
            case 'ClientContact3':
            case 'ClientContact4':
            case 'ClientContact5':
            case 'Lead':
            case 'Candidate':
            case 'Person':
                return `${item.firstName || ''} ${item.lastName || ''}`.trim();
            case 'ClientCorporation':
            case 'ClientCorporation1':
            case 'ClientCorporation2':
            case 'ClientCorporation3':
            case 'ClientCorporation4':
            case 'ClientCorporation5':
                return `${item.name || ''}`.trim();
            case 'JobOrder':
            case 'JobOrder1':
            case 'JobOrder2':
            case 'JobOrder3':
            case 'JobOrder4':
            case 'JobOrder5':
            case 'Opportunity':
                return `${item.title || ''}`.trim();
            case 'Placement':
                let label = '';
                if (item.candidate) {
                    label = `${item.candidate.firstName} ${item.candidate.lastName}`.trim();
                }
                if (item.jobOrder) {
                    label = `${label} - ${item.jobOrder.title}`.trim();
                }
                return label;
            default:
                return '';
        }
    }
    /**
     * Define the fields to set or retrieve for the given entity. Getter and Setter methods will automagically
     * be set up on the entity once the fields are defined.
     * @param args - fields can either be sent as a list of arguments or as an Array
     * @return text
     */
    render(value, args) {
        let type = null;
        let text = value;
        // Handle when we don't have meta, but passing an entity
        if (value && value._subtype && !args) {
            return this.getEntityLabel(value, value._subtype);
        }
        // Stop logic for nulls
        if (value === undefined || value === null || !args) {
            return text;
        }
        if (args.formatter && typeof args.formatter === 'function') {
            return args.formatter(value, args);
        }
        // TODO move this to a service
        // Determine TYPE because its not just 1 value that determines this.
        if (args.type === 'TO_MANY') {
            type = 'ToMany';
        }
        else if (args.type === 'TO_ONE') {
            type = args.associatedEntity.entity;
        }
        else if (args.dataSpecialization === 'DATETIME') {
            type = 'DateTime';
        }
        else if (args.dataSpecialization === 'YEAR') {
            type = 'Year';
        }
        else if (args.dataSpecialization === 'DATE' && args.dataType === 'Date') {
            type = 'Date';
        }
        else if (args.dataType === 'Timestamp') {
            type = 'Timestamp';
        }
        else if (['mobile', 'phone', 'phone1', 'phone2', 'phone3', 'workPhone'].indexOf(args.name) > -1) {
            type = 'Phone';
        }
        else if (args.name && args.name.substring(0, 5) === 'email') {
            type = 'Email';
        }
        else if ((args.name && args.name === 'address.countryID') || args.optionsType === 'Country') {
            type = 'Country';
        }
        else if (args.optionsType === 'SkillText') {
            type = 'SkillText';
        }
        else if (args.options || args.inputType === 'SELECT' || args.inputType === 'CHECKBOX') {
            type = 'Options';
        }
        else if (['MONEY', 'PERCENTAGE', 'HTML', 'SSN'].indexOf(args.dataSpecialization) > -1) {
            type = this.capitalize(args.dataSpecialization.toLowerCase());
        }
        else {
            type = args.dataType || 'default';
        }
        // Transform data here
        try {
            switch (type) {
                case 'Address':
                case 'Address1':
                case 'AddressWithoutCountry':
                case 'SecondaryAddress':
                case 'BillingAddress':
                    const country = findByCountryId(Number(value.countryName));
                    text = '';
                    if (value.address1 || value.address2) {
                        text += `${value.address1 || ''} ${value.address2 || ''}<br />\n`;
                    }
                    text += `${value.city || ''} ${value.state || ''} ${value.zip || ''}${value.city || value.state || value.zip ? '<br />\n' : ''}`;
                    text += `${country ? country.name : value.countryName || ''}${country || value.countryName ? '<br />\n' : ''}`;
                    text = this.sanitizationService.bypassSecurityTrustHtml(text.trim());
                    break;
                case 'DateTime':
                case 'Timestamp':
                    text = this.labels.formatDateShort(value);
                    break;
                case 'Date':
                    text = this.labels.formatDate(new Date(value));
                    break;
                case 'Year':
                    text = new Date(value).getFullYear();
                    break;
                case 'Phone':
                case 'Email':
                    text = value;
                    break;
                case 'Money':
                    text = this.labels.formatCurrency(value);
                    break;
                case 'Percentage':
                    text = this.labels.formatNumber(parseFloat(value).toString(), { style: 'percent', minimumFractionDigits: 2 });
                    break;
                case 'Double':
                case 'BigDecimal':
                    text = this.labels.formatNumber(value, { minimumFractionDigits: this.getNumberDecimalPlaces(value) });
                    break;
                case 'Integer':
                    text = value;
                    break;
                case 'BusinessSector':
                case 'Category':
                case 'Certification':
                case 'ClientCorporation':
                case 'CorporationDepartment':
                case 'DistributionList':
                case 'Skill':
                case 'Tearsheet':
                case 'Specialty':
                    text = value.label || value.name || '';
                    break;
                case 'SkillText':
                    text = Array.isArray(value) ? value.join(', ') : value;
                    break;
                case 'Lead':
                case 'Candidate':
                case 'ClientContact':
                case 'CorporateUser':
                case 'Person':
                    text = value.label || `${value.firstName || ''} ${value.lastName || ''}`;
                    break;
                case 'Opportunity':
                case 'JobOrder':
                    text = value.label || value.title || '';
                    break;
                case 'Placement':
                    if (value.candidate) {
                        text = `${value.candidate.firstName || ''} ${value.candidate.lastName || ''}`;
                    }
                    if (value.jobOrder) {
                        text = value.candidate ? `${text} - ${value.jobOrder.title || ''}` : `${value.jobOrder.title || ''}`;
                    }
                    break;
                case 'JobSubmission':
                    text =
                        value.label ||
                            `${value.jobOrder ? `${value.jobOrder.title} - ` : ''} ${value.candidate ? value.candidate.firstName : ''} ${value.candidate ? value.candidate.lastName : ''}`;
                    break;
                case 'WorkersCompensationRate':
                    text = `${value.compensation ? `${value.compensation.code} - ` : ''} ${value.compensation ? value.compensation.name : ''}`;
                    break;
                case 'Options':
                    text = this.options(value, args.options, args);
                    break;
                case 'ToMany':
                    if (['Candidate', 'CorporateUser', 'Person'].indexOf(args.associatedEntity.entity) > -1) {
                        text = this.concat(value.data, 'firstName', 'lastName');
                        if (value.data.length < value.total) {
                            text = text + ', ' + this.labels.getToManyPlusMore({ quantity: value.total - value.data.length });
                        }
                    }
                    else if (['Category', 'BusinessSector', 'Skill', 'Specialty', 'ClientCorporation', 'CorporationDepartment'].indexOf(args.associatedEntity.entity) > -1) {
                        text = this.concat(value.data, 'name');
                        if (value.data.length < value.total) {
                            text = text + ', ' + this.labels.getToManyPlusMore({ quantity: value.total - value.data.length });
                        }
                    }
                    else if (args.associatedEntity.entity === 'MailListPushHistoryDetail') {
                        text = this.concat(value.data, 'externalListName');
                    }
                    else {
                        text = `${value.total || ''}`;
                    }
                    break;
                case 'Country':
                    const countryObj = findByCountryId(Number(value));
                    text = countryObj ? countryObj.name : value;
                    break;
                case 'Html':
                    if (Array.isArray(value)) {
                        value = value.join(' ');
                    }
                    if (typeof text === 'string') {
                        text = this.sanitizationService.bypassSecurityTrustHtml(value.replace(/\<a/gi, '<a target="_blank"'));
                    }
                    break;
                case 'CandidateComment':
                    text = value.comments ? `${this.labels.formatDateShort(value.dateLastModified)} (${value.name}) - ${value.comments}` : '';
                    break;
                default:
                    text = value.trim ? value.trim() : value;
                    break;
            }
            return text;
        }
        catch (e) {
            console.error(`WARNING: There was a problem rendering the value of the field: ${args.label}. Please check the configuration`);
            console.error(e);
            return text;
        }
    }
    updateValue(value, args) {
        this.value = this.render(value, args);
        this.changeDetector.markForCheck();
    }
    transform(value, args) {
        if (value === undefined || value === null) {
            return '';
        }
        if (this.equals(value, this.lastValue) && this.equals(args, this.lastArgs)) {
            return this.value;
        }
        this.lastValue = value;
        this.lastArgs = args;
        this.updateValue(this.lastValue, this.lastArgs);
        return this.value;
    }
    /**
     * Simple function concat a list of fields from a list of objects
     * @param list - the list of values to use
     * @param fields - list of fields to extract
     */
    concat(list, ...fields) {
        const data = [];
        for (const item of list) {
            const label = [];
            for (const field of fields) {
                label.push(`${item[field]}`);
            }
            data.push(label.join(' '));
        }
        return data.join(', ');
    }
    /**
     * Simple function to look up the **label** to display from options
     * @param value - the value to find
     * @param list - list of options (label/value pairs)
     */
    options(value, list, args) {
        if (!Array.isArray(value)) {
            value = [value];
        }
        try {
            return value.map((item) => {
                for (const option of list) {
                    if (option.value === item) {
                        return option.label;
                    }
                }
                return item;
            });
        }
        catch (e) {
            if (!args.optionsType) {
                throw Error(e);
            }
            return value;
        }
    }
    getNumberDecimalPlaces(value) {
        let decimalPlaces;
        if (value) {
            const numberString = parseFloat(value).toString();
            const decimalPlace = (numberString || '').split('.')[1] || '';
            decimalPlaces = decimalPlace.length;
        }
        return decimalPlaces || 1;
    }
    /**
     * Capitalizes the first letter
     */
    capitalize(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
}
RenderPipe.decorators = [
    { type: Pipe, args: [{
                name: 'render',
                pure: false,
            },] },
    { type: Injectable }
];
RenderPipe.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: DomSanitizer },
    { type: NovoLabelService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVuZGVyLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy92YWx1ZS9SZW5kZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsTUFBTTtBQUNOLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQU1ILE1BQU0sT0FBTyxVQUFVO0lBS3JCLFlBQW9CLGNBQWlDLEVBQVUsbUJBQWlDLEVBQVUsTUFBd0I7UUFBOUcsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBQVUsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFjO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7SUFBSSxDQUFDO0lBRXZJLE1BQU0sQ0FBQyxTQUFjLEVBQUUsU0FBYztRQUNuQyxJQUFJLFNBQVMsS0FBSyxTQUFTLEVBQUU7WUFDM0IsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELElBQUksU0FBUyxLQUFLLElBQUksSUFBSSxTQUFTLEtBQUssSUFBSSxFQUFFO1lBQzVDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxJQUFJLFNBQVMsS0FBSyxTQUFTLElBQUksU0FBUyxLQUFLLFNBQVMsRUFBRTtZQUN0RCxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsTUFBTSxFQUFFLEdBQVEsT0FBTyxTQUFTLENBQUM7UUFDakMsTUFBTSxFQUFFLEdBQVEsT0FBTyxTQUFTLENBQUM7UUFDakMsSUFBSSxNQUFj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QUNBLFVBQVU7OztZQXBDRixpQkFBaUI7WUFDakIsWUFBWTtZQUVaLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgSW5qZWN0YWJsZSwgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuLy8gQVBQXHJcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBmaW5kQnlDb3VudHJ5SWQgfSBmcm9tICcuLi8uLi91dGlscy9jb3VudHJpZXMvQ291bnRyaWVzJztcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3NkZXNjXHJcbiAqIFJlbmRlcnMgZGF0YSBhcHByb3ByaWF0ZWx5IGJhc2VkIG9uIHRoZSBkYXRhIHR5cGUgZm91bmQgaW4gTWV0YVxyXG4gKiBBbGwgZGF0YSB0eXBlcyBkZWZpbmVkIGJ5IGJ1bGxob3JuIHNob3VsZCBiZSBzdXBwb3J0ZWQ6XHJcbiAqXHJcbiAqIC0gKipTdHJpbmcqKjogdHJpbXMgdmFsdWUgYW5kIHJldHVybnNcclxuICogLSAqKkludGVnZXIqKjogcmV0dXJuIHZhbHVlXHJcbiAqIC0gKipEb3VibGUqKjogcmV0dXJuIHZhbHVlIGZpeGVkIHRvIDIgZGVjaW1hbHNcclxuICogLSAqKkJpZ0RlY2ltYWwqKjogcmV0dXJuIHZhbHVlIGZpeGVkIHRvIDIgZGVjaW1hbHNcclxuICogLSAqKkFkZHJlc3MqKjogb25seSBjaXR5IGFuZC9vciBzdGF0ZSByZXR1cm5lZFxyXG4gKiAtICoqQWRkcmVzczEqKjogb25seSBjaXR5IGFuZC9vciBzdGF0ZSByZXR1cm5lZFxyXG4gKiAtICoqQWRkcmVzc1dpdGhvdXRDb3VudHJ5Kio6IG9ubHkgY2l0eSBhbmQvb3Igc3RhdGUgcmV0dXJuZWRcclxuICogLSAqKkN1cnJlbmN5Kio6IHB1dCBhICQgaW4gZnJvbnRcclxuICogLSAqKlBlcmNlbnRhZ2UqKjogZGl2aWRlIGJ5IDEwMCBmaXggdG8gMiBkZWNpbWFscyBwbGFjZSBhbmQgcmV0dXJuXHJcbiAqIC0gKipPcHRpb25zKio6IHJldHVybnMgdGhlIGFwcHJvcHJpYXRlICdsYWJlbCcgZm9yIHRoZSAndmFsdWUnIGZyb20gJ29wdGlvbnMnXHJcbiAqIC0gKipBcnJheSoqOiByZXR1cm5zIGxpc3QgY29tbWEgc2VwYXJhdGVkXHJcbiAqIC0gKipEYXRlVGltZSoqOiBmb3JtYXRzIHRoZSBkYXRlXHJcbiAqIC0gKipUaW1lU3RhbXAqKjogZm9ybWF0cyB0aGUgZGF0ZVxyXG4gKiAtICoqVG9PbmUqKjogcmV0dXJuIHRoZSBlbnRpdHkgc3BlY2lmaWMgbmFtZSAoaWUuIG5hbWUsIGZpcnN0TmFtZSBsYXN0TmFtZSwgdGl0bGUsIC4uLilcclxuICogLSAqKlRvTWFueSoqOiByZXR1cm4gYW4gYXJyYXkgb2YgdGhlIGVudGl0eSBzcGVjaWZpYyBuYW1lcyAoaWUuIG5hbWUsIGZpcnN0TmFtZSBsYXN0TmFtZSwgdGl0bGUsIC4uLilcclxuICpcclxuICogQGV4YW1wbGVcclxuICogYGBgXHJcbiAqIHt7IGV4cHJlc3Npb24gfCByZW5kZXI6ZmllbGQgfX1cclxuICogYGBgXHJcbiAqL1xyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ3JlbmRlcicsXHJcbiAgcHVyZTogZmFsc2UsXHJcbn0pXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFJlbmRlclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB2YWx1ZTogYW55O1xyXG4gIGxhc3RWYWx1ZTogYW55O1xyXG4gIGxhc3RBcmdzOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIHNhbml0aXphdGlvblNlcnZpY2U6IERvbVNhbml0aXplciwgcHJpdmF0ZSBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHsgfVxyXG5cclxuICBlcXVhbHMob2JqZWN0T25lOiBhbnksIG9iamVjdFR3bzogYW55KTogYW55IHtcclxuICAgIGlmIChvYmplY3RPbmUgPT09IG9iamVjdFR3bykge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChvYmplY3RPbmUgPT09IG51bGwgfHwgb2JqZWN0VHdvID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChvYmplY3RPbmUgIT09IG9iamVjdE9uZSAmJiBvYmplY3RUd28gIT09IG9iamVjdFR3bykge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGNvbnN0IHQxOiBhbnkgPSB0eXBlb2Ygb2JqZWN0T25lO1xyXG4gICAgY29uc3QgdDI6IGFueSA9IHR5cGVvZiBvYmplY3RUd287XHJcbiAgICBsZXQgbGVuZ3RoOiBudW1iZXI7XHJcbiAgICBsZXQga2V5OiBhbnk7XHJcbiAgICBsZXQga2V5U2V0OiBhbnk7XHJcbiAgICBpZiAodDEgPT09IHQyICYmIHQxID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmplY3RPbmUpKSB7XHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG9iamVjdFR3bykpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGVuZ3RoID0gb2JqZWN0T25lLmxlbmd0aDtcclxuICAgICAgICBpZiAobGVuZ3RoID09PSBvYmplY3RUd28ubGVuZ3RoKSB7XHJcbiAgICAgICAgICBmb3IgKGtleSA9IDA7IGtleSA8IGxlbmd0aDsga2V5KyspIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmVxdWFscyhvYmplY3RPbmVba2V5XSwgb2JqZWN0VHdvW2tleV0pKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0VHdvKSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBrZXlTZXQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG4gICAgICAgIGZvciAoa2V5IGluIG9iamVjdE9uZSkge1xyXG4gICAgICAgICAgaWYgKG9iamVjdE9uZVtrZXldKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5lcXVhbHMob2JqZWN0T25lW2tleV0sIG9iamVjdFR3b1trZXldKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBrZXlTZXRba2V5XSA9IHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoa2V5IGluIG9iamVjdFR3bykge1xyXG4gICAgICAgICAgaWYgKCEoa2V5IGluIGtleVNldCkgJiYgdHlwZW9mIG9iamVjdFR3b1trZXldICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBnZXRFbnRpdHlMYWJlbChpdGVtOiBhbnksIGVudGl0eTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHN3aXRjaCAoZW50aXR5KSB7XHJcbiAgICAgIGNhc2UgJ0NvcnBvcmF0ZVVzZXInOlxyXG4gICAgICBjYXNlICdDbGllbnRDb250YWN0JzpcclxuICAgICAgY2FzZSAnQ2xpZW50Q29udGFjdDEnOlxyXG4gICAgICBjYXNlICdDbGllbnRDb250YWN0Mic6XHJcbiAgICAgIGNhc2UgJ0NsaWVudENvbnRhY3QzJzpcclxuICAgICAgY2FzZSAnQ2xpZW50Q29udGFjdDQnOlxyXG4gICAgICBjYXNlICdDbGllbnRDb250YWN0NSc6XHJcbiAgICAgIGNhc2UgJ0xlYWQnOlxyXG4gICAgICBjYXNlICdDYW5kaWRhdGUnOlxyXG4gICAgICBjYXNlICdQZXJzb24nOlxyXG4gICAgICAgIHJldHVybiBgJHtpdGVtLmZpcnN0TmFtZSB8fCAnJ30gJHtpdGVtLmxhc3ROYW1lIHx8ICcnfWAudHJpbSgpO1xyXG4gICAgICBjYXNlICdDbGllbnRDb3Jwb3JhdGlvbic6XHJcbiAgICAgIGNhc2UgJ0NsaWVudENvcnBvcmF0aW9uMSc6XHJcbiAgICAgIGNhc2UgJ0NsaWVudENvcnBvcmF0aW9uMic6XHJcbiAgICAgIGNhc2UgJ0NsaWVudENvcnBvcmF0aW9uMyc6XHJcbiAgICAgIGNhc2UgJ0NsaWVudENvcnBvcmF0aW9uNCc6XHJcbiAgICAgIGNhc2UgJ0NsaWVudENvcnBvcmF0aW9uNSc6XHJcbiAgICAgICAgcmV0dXJuIGAke2l0ZW0ubmFtZSB8fCAnJ31gLnRyaW0oKTtcclxuICAgICAgY2FzZSAnSm9iT3JkZXInOlxyXG4gICAgICBjYXNlICdKb2JPcmRlcjEnOlxyXG4gICAgICBjYXNlICdKb2JPcmRlcjInOlxyXG4gICAgICBjYXNlICdKb2JPcmRlcjMnOlxyXG4gICAgICBjYXNlICdKb2JPcmRlcjQnOlxyXG4gICAgICBjYXNlICdKb2JPcmRlcjUnOlxyXG4gICAgICBjYXNlICdPcHBvcnR1bml0eSc6XHJcbiAgICAgICAgcmV0dXJuIGAke2l0ZW0udGl0bGUgfHwgJyd9YC50cmltKCk7XHJcbiAgICAgIGNhc2UgJ1BsYWNlbWVudCc6XHJcbiAgICAgICAgbGV0IGxhYmVsOiBzdHJpbmcgPSAnJztcclxuICAgICAgICBpZiAoaXRlbS5jYW5kaWRhdGUpIHtcclxuICAgICAgICAgIGxhYmVsID0gYCR7aXRlbS5jYW5kaWRhdGUuZmlyc3ROYW1lfSAke2l0ZW0uY2FuZGlkYXRlLmxhc3ROYW1lfWAudHJpbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXRlbS5qb2JPcmRlcikge1xyXG4gICAgICAgICAgbGFiZWwgPSBgJHtsYWJlbH0gLSAke2l0ZW0uam9iT3JkZXIudGl0bGV9YC50cmltKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsYWJlbDtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmUgdGhlIGZpZWxkcyB0byBzZXQgb3IgcmV0cmlldmUgZm9yIHRoZSBnaXZlbiBlbnRpdHkuIEdldHRlciBhbmQgU2V0dGVyIG1ldGhvZHMgd2lsbCBhdXRvbWFnaWNhbGx5XHJcbiAgICogYmUgc2V0IHVwIG9uIHRoZSBlbnRpdHkgb25jZSB0aGUgZmllbGRzIGFyZSBkZWZpbmVkLlxyXG4gICAqIEBwYXJhbSBhcmdzIC0gZmllbGRzIGNhbiBlaXRoZXIgYmUgc2VudCBhcyBhIGxpc3Qgb2YgYXJndW1lbnRzIG9yIGFzIGFuIEFycmF5XHJcbiAgICogQHJldHVybiB0ZXh0XHJcbiAgICovXHJcbiAgcmVuZGVyKHZhbHVlOiBhbnksIGFyZ3M6IGFueSk6IGFueSB7XHJcbiAgICBsZXQgdHlwZTogYW55ID0gbnVsbDtcclxuICAgIGxldCB0ZXh0OiBhbnkgPSB2YWx1ZTtcclxuXHJcbiAgICAvLyBIYW5kbGUgd2hlbiB3ZSBkb24ndCBoYXZlIG1ldGEsIGJ1dCBwYXNzaW5nIGFuIGVudGl0eVxyXG4gICAgaWYgKHZhbHVlICYmIHZhbHVlLl9zdWJ0eXBlICYmICFhcmdzKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldEVudGl0eUxhYmVsKHZhbHVlLCB2YWx1ZS5fc3VidHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3RvcCBsb2dpYyBmb3IgbnVsbHNcclxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsIHx8ICFhcmdzKSB7XHJcbiAgICAgIHJldHVybiB0ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChhcmdzLmZvcm1hdHRlciAmJiB0eXBlb2YgYXJncy5mb3JtYXR0ZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgcmV0dXJuIGFyZ3MuZm9ybWF0dGVyKHZhbHVlLCBhcmdzKTtcclxuICAgIH1cclxuICAgIC8vIFRPRE8gbW92ZSB0aGlzIHRvIGEgc2VydmljZVxyXG4gICAgLy8gRGV0ZXJtaW5lIFRZUEUgYmVjYXVzZSBpdHMgbm90IGp1c3QgMSB2YWx1ZSB0aGF0IGRldGVybWluZXMgdGhpcy5cclxuICAgIGlmIChhcmdzLnR5cGUgPT09ICdUT19NQU5ZJykge1xyXG4gICAgICB0eXBlID0gJ1RvTWFueSc7XHJcbiAgICB9IGVsc2UgaWYgKGFyZ3MudHlwZSA9PT0gJ1RPX09ORScpIHtcclxuICAgICAgdHlwZSA9IGFyZ3MuYXNzb2NpYXRlZEVudGl0eS5lbnRpdHk7XHJcbiAgICB9IGVsc2UgaWYgKGFyZ3MuZGF0YVNwZWNpYWxpemF0aW9uID09PSAnREFURVRJTUUnKSB7XHJcbiAgICAgIHR5cGUgPSAnRGF0ZVRpbWUnO1xyXG4gICAgfSBlbHNlIGlmIChhcmdzLmRhdGFTcGVjaWFsaXphdGlvbiA9PT0gJ1lFQVInKSB7XHJcbiAgICAgIHR5cGUgPSAnWWVhcic7XHJcbiAgICB9IGVsc2UgaWYgKGFyZ3MuZGF0YVNwZWNpYWxpemF0aW9uID09PSAnREFURScgJiYgYXJncy5kYXRhVHlwZSA9PT0gJ0RhdGUnKSB7XHJcbiAgICAgIHR5cGUgPSAnRGF0ZSc7XHJcbiAgICB9IGVsc2UgaWYgKGFyZ3MuZGF0YVR5cGUgPT09ICdUaW1lc3RhbXAnKSB7XHJcbiAgICAgIHR5cGUgPSAnVGltZXN0YW1wJztcclxuICAgIH0gZWxzZSBpZiAoWydtb2JpbGUnLCAncGhvbmUnLCAncGhvbmUxJywgJ3Bob25lMicsICdwaG9uZTMnLCAnd29ya1Bob25lJ10uaW5kZXhPZihhcmdzLm5hbWUpID4gLTEpIHtcclxuICAgICAgdHlwZSA9ICdQaG9uZSc7XHJcbiAgICB9IGVsc2UgaWYgKGFyZ3MubmFtZSAmJiBhcmdzLm5hbWUuc3Vic3RyaW5nKDAsIDUpID09PSAnZW1haWwnKSB7XHJcbiAgICAgIHR5cGUgPSAnRW1haWwnO1xyXG4gICAgfSBlbHNlIGlmICgoYXJncy5uYW1lICYmIGFyZ3MubmFtZSA9PT0gJ2FkZHJlc3MuY291bnRyeUlEJykgfHwgYXJncy5vcHRpb25zVHlwZSA9PT0gJ0NvdW50cnknKSB7XHJcbiAgICAgIHR5cGUgPSAnQ291bnRyeSc7XHJcbiAgICB9IGVsc2UgaWYgKGFyZ3Mub3B0aW9uc1R5cGUgPT09ICdTa2lsbFRleHQnKSB7XHJcbiAgICAgIHR5cGUgPSAnU2tpbGxUZXh0JztcclxuICAgIH0gZWxzZSBpZiAoYXJncy5vcHRpb25zIHx8IGFyZ3MuaW5wdXRUeXBlID09PSAnU0VMRUNUJyB8fCBhcmdzLmlucHV0VHlwZSA9PT0gJ0NIRUNLQk9YJykge1xyXG4gICAgICB0eXBlID0gJ09wdGlvbnMnO1xyXG4gICAgfSBlbHNlIGlmIChbJ01PTkVZJywgJ1BFUkNFTlRBR0UnLCAnSFRNTCcsICdTU04nXS5pbmRleE9mKGFyZ3MuZGF0YVNwZWNpYWxpemF0aW9uKSA+IC0xKSB7XHJcbiAgICAgIHR5cGUgPSB0aGlzLmNhcGl0YWxpemUoYXJncy5kYXRhU3BlY2lhbGl6YXRpb24udG9Mb3dlckNhc2UoKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0eXBlID0gYXJncy5kYXRhVHlwZSB8fCAnZGVmYXVsdCc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVHJhbnNmb3JtIGRhdGEgaGVyZVxyXG4gICAgdHJ5IHtcclxuICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnQWRkcmVzcyc6XHJcbiAgICAgICAgY2FzZSAnQWRkcmVzczEnOlxyXG4gICAgICAgIGNhc2UgJ0FkZHJlc3NXaXRob3V0Q291bnRyeSc6XHJcbiAgICAgICAgY2FzZSAnU2Vjb25kYXJ5QWRkcmVzcyc6XHJcbiAgICAgICAgY2FzZSAnQmlsbGluZ0FkZHJlc3MnOlxyXG4gICAgICAgICAgY29uc3QgY291bnRyeTogYW55ID0gZmluZEJ5Q291bnRyeUlkKE51bWJlcih2YWx1ZS5jb3VudHJ5TmFtZSkpO1xyXG4gICAgICAgICAgdGV4dCA9ICcnO1xyXG4gICAgICAgICAgaWYgKHZhbHVlLmFkZHJlc3MxIHx8IHZhbHVlLmFkZHJlc3MyKSB7XHJcbiAgICAgICAgICAgIHRleHQgKz0gYCR7dmFsdWUuYWRkcmVzczEgfHwgJyd9ICR7dmFsdWUuYWRkcmVzczIgfHwgJyd9PGJyIC8+XFxuYDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRleHQgKz0gYCR7dmFsdWUuY2l0eSB8fCAnJ30gJHt2YWx1ZS5zdGF0ZSB8fCAnJ30gJHt2YWx1ZS56aXAgfHwgJyd9JHt2YWx1ZS5jaXR5IHx8IHZhbHVlLnN0YXRlIHx8IHZhbHVlLnppcCA/ICc8YnIgLz5cXG4nIDogJyd9YDtcclxuICAgICAgICAgIHRleHQgKz0gYCR7Y291bnRyeSA/IGNvdW50cnkubmFtZSA6IHZhbHVlLmNvdW50cnlOYW1lIHx8ICcnfSR7Y291bnRyeSB8fCB2YWx1ZS5jb3VudHJ5TmFtZSA/ICc8YnIgLz5cXG4nIDogJyd9YDtcclxuICAgICAgICAgIHRleHQgPSB0aGlzLnNhbml0aXphdGlvblNlcnZpY2UuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwodGV4dC50cmltKCkpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnRGF0ZVRpbWUnOlxyXG4gICAgICAgIGNhc2UgJ1RpbWVzdGFtcCc6XHJcbiAgICAgICAgICB0ZXh0ID0gdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVNob3J0KHZhbHVlKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0RhdGUnOlxyXG4gICAgICAgICAgdGV4dCA9IHRoaXMubGFiZWxzLmZvcm1hdERhdGUobmV3IERhdGUodmFsdWUpKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ1llYXInOlxyXG4gICAgICAgICAgdGV4dCA9IG5ldyBEYXRlKHZhbHVlKS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnUGhvbmUnOlxyXG4gICAgICAgIGNhc2UgJ0VtYWlsJzpcclxuICAgICAgICAgIHRleHQgPSB2YWx1ZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ01vbmV5JzpcclxuICAgICAgICAgIHRleHQgPSB0aGlzLmxhYmVscy5mb3JtYXRDdXJyZW5jeSh2YWx1ZSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdQZXJjZW50YWdlJzpcclxuICAgICAgICAgIHRleHQgPSB0aGlzLmxhYmVscy5mb3JtYXROdW1iZXIocGFyc2VGbG9hdCh2YWx1ZSkudG9TdHJpbmcoKSwgeyBzdHlsZTogJ3BlcmNlbnQnLCBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIgfSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdEb3VibGUnOlxyXG4gICAgICAgIGNhc2UgJ0JpZ0RlY2ltYWwnOlxyXG4gICAgICAgICAgdGV4dCA9IHRoaXMubGFiZWxzLmZvcm1hdE51bWJlcih2YWx1ZSwgeyBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IHRoaXMuZ2V0TnVtYmVyRGVjaW1hbFBsYWNlcyh2YWx1ZSkgfSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdJbnRlZ2VyJzpcclxuICAgICAgICAgIHRleHQgPSB2YWx1ZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0J1c2luZXNzU2VjdG9yJzpcclxuICAgICAgICBjYXNlICdDYXRlZ29yeSc6XHJcbiAgICAgICAgY2FzZSAnQ2VydGlmaWNhdGlvbic6XHJcbiAgICAgICAgY2FzZSAnQ2xpZW50Q29ycG9yYXRpb24nOlxyXG4gICAgICAgIGNhc2UgJ0NvcnBvcmF0aW9uRGVwYXJ0bWVudCc6XHJcbiAgICAgICAgY2FzZSAnRGlzdHJpYnV0aW9uTGlzdCc6XHJcbiAgICAgICAgY2FzZSAnU2tpbGwnOlxyXG4gICAgICAgIGNhc2UgJ1RlYXJzaGVldCc6XHJcbiAgICAgICAgY2FzZSAnU3BlY2lhbHR5JzpcclxuICAgICAgICAgIHRleHQgPSB2YWx1ZS5sYWJlbCB8fCB2YWx1ZS5uYW1lIHx8ICcnO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnU2tpbGxUZXh0JzpcclxuICAgICAgICAgIHRleHQgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmpvaW4oJywgJykgOiB2YWx1ZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0xlYWQnOlxyXG4gICAgICAgIGNhc2UgJ0NhbmRpZGF0ZSc6XHJcbiAgICAgICAgY2FzZSAnQ2xpZW50Q29udGFjdCc6XHJcbiAgICAgICAgY2FzZSAnQ29ycG9yYXRlVXNlcic6XHJcbiAgICAgICAgY2FzZSAnUGVyc29uJzpcclxuICAgICAgICAgIHRleHQgPSB2YWx1ZS5sYWJlbCB8fCBgJHt2YWx1ZS5maXJzdE5hbWUgfHwgJyd9ICR7dmFsdWUubGFzdE5hbWUgfHwgJyd9YDtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ09wcG9ydHVuaXR5JzpcclxuICAgICAgICBjYXNlICdKb2JPcmRlcic6XHJcbiAgICAgICAgICB0ZXh0ID0gdmFsdWUubGFiZWwgfHwgdmFsdWUudGl0bGUgfHwgJyc7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdQbGFjZW1lbnQnOlxyXG4gICAgICAgICAgaWYgKHZhbHVlLmNhbmRpZGF0ZSkge1xyXG4gICAgICAgICAgICB0ZXh0ID0gYCR7dmFsdWUuY2FuZGlkYXRlLmZpcnN0TmFtZSB8fCAnJ30gJHt2YWx1ZS5jYW5kaWRhdGUubGFzdE5hbWUgfHwgJyd9YDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh2YWx1ZS5qb2JPcmRlcikge1xyXG4gICAgICAgICAgICB0ZXh0ID0gdmFsdWUuY2FuZGlkYXRlID8gYCR7dGV4dH0gLSAke3ZhbHVlLmpvYk9yZGVyLnRpdGxlIHx8ICcnfWAgOiBgJHt2YWx1ZS5qb2JPcmRlci50aXRsZSB8fCAnJ31gO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnSm9iU3VibWlzc2lvbic6XHJcbiAgICAgICAgICB0ZXh0ID1cclxuICAgICAgICAgICAgdmFsdWUubGFiZWwgfHxcclxuICAgICAgICAgICAgYCR7dmFsdWUuam9iT3JkZXIgPyBgJHt2YWx1ZS5qb2JPcmRlci50aXRsZX0gLSBgIDogJyd9ICR7dmFsdWUuY2FuZGlkYXRlID8gdmFsdWUuY2FuZGlkYXRlLmZpcnN0TmFtZSA6ICcnfSAke1xyXG4gICAgICAgICAgICB2YWx1ZS5jYW5kaWRhdGUgPyB2YWx1ZS5jYW5kaWRhdGUubGFzdE5hbWUgOiAnJ1xyXG4gICAgICAgICAgICB9YDtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ1dvcmtlcnNDb21wZW5zYXRpb25SYXRlJzpcclxuICAgICAgICAgIHRleHQgPSBgJHt2YWx1ZS5jb21wZW5zYXRpb24gPyBgJHt2YWx1ZS5jb21wZW5zYXRpb24uY29kZX0gLSBgIDogJyd9ICR7dmFsdWUuY29tcGVuc2F0aW9uID8gdmFsdWUuY29tcGVuc2F0aW9uLm5hbWUgOiAnJ31gO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnT3B0aW9ucyc6XHJcbiAgICAgICAgICB0ZXh0ID0gdGhpcy5vcHRpb25zKHZhbHVlLCBhcmdzLm9wdGlvbnMsIGFyZ3MpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnVG9NYW55JzpcclxuICAgICAgICAgIGlmIChbJ0NhbmRpZGF0ZScsICdDb3Jwb3JhdGVVc2VyJywgJ1BlcnNvbiddLmluZGV4T2YoYXJncy5hc3NvY2lhdGVkRW50aXR5LmVudGl0eSkgPiAtMSkge1xyXG4gICAgICAgICAgICB0ZXh0ID0gdGhpcy5jb25jYXQodmFsdWUuZGF0YSwgJ2ZpcnN0TmFtZScsICdsYXN0TmFtZScpO1xyXG4gICAgICAgICAgICBpZiAodmFsdWUuZGF0YS5sZW5ndGggPCB2YWx1ZS50b3RhbCkge1xyXG4gICAgICAgICAgICAgIHRleHQgPSB0ZXh0ICsgJywgJyArIHRoaXMubGFiZWxzLmdldFRvTWFueVBsdXNNb3JlKHsgcXVhbnRpdHk6IHZhbHVlLnRvdGFsIC0gdmFsdWUuZGF0YS5sZW5ndGggfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgIFsnQ2F0ZWdvcnknLCAnQnVzaW5lc3NTZWN0b3InLCAnU2tpbGwnLCAnU3BlY2lhbHR5JywgJ0NsaWVudENvcnBvcmF0aW9uJywgJ0NvcnBvcmF0aW9uRGVwYXJ0bWVudCddLmluZGV4T2YoXHJcbiAgICAgICAgICAgICAgYXJncy5hc3NvY2lhdGVkRW50aXR5LmVudGl0eSxcclxuICAgICAgICAgICAgKSA+IC0xXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgdGV4dCA9IHRoaXMuY29uY2F0KHZhbHVlLmRhdGEsICduYW1lJyk7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS5kYXRhLmxlbmd0aCA8IHZhbHVlLnRvdGFsKSB7XHJcbiAgICAgICAgICAgICAgdGV4dCA9IHRleHQgKyAnLCAnICsgdGhpcy5sYWJlbHMuZ2V0VG9NYW55UGx1c01vcmUoeyBxdWFudGl0eTogdmFsdWUudG90YWwgLSB2YWx1ZS5kYXRhLmxlbmd0aCB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChhcmdzLmFzc29jaWF0ZWRFbnRpdHkuZW50aXR5ID09PSAnTWFpbExpc3RQdXNoSGlzdG9yeURldGFpbCcpIHtcclxuICAgICAgICAgICAgdGV4dCA9IHRoaXMuY29uY2F0KHZhbHVlLmRhdGEsICdleHRlcm5hbExpc3ROYW1lJyk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0ZXh0ID0gYCR7dmFsdWUudG90YWwgfHwgJyd9YDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0NvdW50cnknOlxyXG4gICAgICAgICAgY29uc3QgY291bnRyeU9iajogYW55ID0gZmluZEJ5Q291bnRyeUlkKE51bWJlcih2YWx1ZSkpO1xyXG4gICAgICAgICAgdGV4dCA9IGNvdW50cnlPYmogPyBjb3VudHJ5T2JqLm5hbWUgOiB2YWx1ZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0h0bWwnOlxyXG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuam9pbignICcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHR5cGVvZiB0ZXh0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0ZXh0ID0gdGhpcy5zYW5pdGl6YXRpb25TZXJ2aWNlLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHZhbHVlLnJlcGxhY2UoL1xcPGEvZ2ksICc8YSB0YXJnZXQ9XCJfYmxhbmtcIicpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0NhbmRpZGF0ZUNvbW1lbnQnOlxyXG4gICAgICAgICAgdGV4dCA9IHZhbHVlLmNvbW1lbnRzID8gYCR7dGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVNob3J0KHZhbHVlLmRhdGVMYXN0TW9kaWZpZWQpfSAoJHt2YWx1ZS5uYW1lfSkgLSAke3ZhbHVlLmNvbW1lbnRzfWAgOiAnJztcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICB0ZXh0ID0gdmFsdWUudHJpbSA/IHZhbHVlLnRyaW0oKSA6IHZhbHVlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRleHQ7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoYFdBUk5JTkc6IFRoZXJlIHdhcyBhIHByb2JsZW0gcmVuZGVyaW5nIHRoZSB2YWx1ZSBvZiB0aGUgZmllbGQ6ICR7YXJncy5sYWJlbH0uIFBsZWFzZSBjaGVjayB0aGUgY29uZmlndXJhdGlvbmApO1xyXG4gICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICByZXR1cm4gdGV4dDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZVZhbHVlKHZhbHVlOiBhbnksIGFyZ3M6IGFueSk6IGFueSB7XHJcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5yZW5kZXIodmFsdWUsIGFyZ3MpO1xyXG4gICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybSh2YWx1ZT86IGFueSwgYXJncz86IGFueSk6IGFueSB7XHJcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZXF1YWxzKHZhbHVlLCB0aGlzLmxhc3RWYWx1ZSkgJiYgdGhpcy5lcXVhbHMoYXJncywgdGhpcy5sYXN0QXJncykpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5sYXN0VmFsdWUgPSB2YWx1ZTtcclxuICAgIHRoaXMubGFzdEFyZ3MgPSBhcmdzO1xyXG5cclxuICAgIHRoaXMudXBkYXRlVmFsdWUodGhpcy5sYXN0VmFsdWUsIHRoaXMubGFzdEFyZ3MpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2ltcGxlIGZ1bmN0aW9uIGNvbmNhdCBhIGxpc3Qgb2YgZmllbGRzIGZyb20gYSBsaXN0IG9mIG9iamVjdHNcclxuICAgKiBAcGFyYW0gbGlzdCAtIHRoZSBsaXN0IG9mIHZhbHVlcyB0byB1c2VcclxuICAgKiBAcGFyYW0gZmllbGRzIC0gbGlzdCBvZiBmaWVsZHMgdG8gZXh0cmFjdFxyXG4gICAqL1xyXG4gIGNvbmNhdChsaXN0OiBhbnksIC4uLmZpZWxkczogYW55W10pOiBhbnkge1xyXG4gICAgY29uc3QgZGF0YTogYW55ID0gW107XHJcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgbGlzdCkge1xyXG4gICAgICBjb25zdCBsYWJlbDogYW55ID0gW107XHJcbiAgICAgIGZvciAoY29uc3QgZmllbGQgb2YgZmllbGRzKSB7XHJcbiAgICAgICAgbGFiZWwucHVzaChgJHtpdGVtW2ZpZWxkXX1gKTtcclxuICAgICAgfVxyXG4gICAgICBkYXRhLnB1c2gobGFiZWwuam9pbignICcpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBkYXRhLmpvaW4oJywgJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTaW1wbGUgZnVuY3Rpb24gdG8gbG9vayB1cCB0aGUgKipsYWJlbCoqIHRvIGRpc3BsYXkgZnJvbSBvcHRpb25zXHJcbiAgICogQHBhcmFtIHZhbHVlIC0gdGhlIHZhbHVlIHRvIGZpbmRcclxuICAgKiBAcGFyYW0gbGlzdCAtIGxpc3Qgb2Ygb3B0aW9ucyAobGFiZWwvdmFsdWUgcGFpcnMpXHJcbiAgICovXHJcbiAgb3B0aW9ucyh2YWx1ZTogYW55LCBsaXN0OiBhbnksIGFyZ3M6IGFueSk6IGFueSB7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgIHZhbHVlID0gW3ZhbHVlXTtcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgIHJldHVybiB2YWx1ZS5tYXAoKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIGxpc3QpIHtcclxuICAgICAgICAgIGlmIChvcHRpb24udmFsdWUgPT09IGl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbi5sYWJlbDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBpZiAoIWFyZ3Mub3B0aW9uc1R5cGUpIHtcclxuICAgICAgICB0aHJvdyBFcnJvcihlKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXROdW1iZXJEZWNpbWFsUGxhY2VzKHZhbHVlOiBhbnkpOiBhbnkge1xyXG4gICAgbGV0IGRlY2ltYWxQbGFjZXM6IGFueTtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICBjb25zdCBudW1iZXJTdHJpbmc6IGFueSA9IHBhcnNlRmxvYXQodmFsdWUpLnRvU3RyaW5nKCk7XHJcbiAgICAgIGNvbnN0IGRlY2ltYWxQbGFjZTogYW55ID0gKG51bWJlclN0cmluZyB8fCAnJykuc3BsaXQoJy4nKVsxXSB8fCAnJztcclxuICAgICAgZGVjaW1hbFBsYWNlcyA9IGRlY2ltYWxQbGFjZS5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGVjaW1hbFBsYWNlcyB8fCAxO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FwaXRhbGl6ZXMgdGhlIGZpcnN0IGxldHRlclxyXG4gICAqL1xyXG4gIGNhcGl0YWxpemUodmFsdWU6IGFueSk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdmFsdWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB2YWx1ZS5zbGljZSgxKTtcclxuICB9XHJcbn1cclxuIl19