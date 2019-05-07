/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// NG2
import { Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
// APP
import { Helpers } from '../../../utils/Helpers';
import { notify } from '../../../utils/notifier/notifier.util';
/**
 * @record
 */
export function NovoGroupedControlConfig() { }
if (false) {
    /** @type {?|undefined} */
    NovoGroupedControlConfig.prototype.label;
    /** @type {?|undefined} */
    NovoGroupedControlConfig.prototype.icon;
    /** @type {?|undefined} */
    NovoGroupedControlConfig.prototype.add;
    /** @type {?|undefined} */
    NovoGroupedControlConfig.prototype.remove;
    /** @type {?} */
    NovoGroupedControlConfig.prototype.key;
    /** @type {?|undefined} */
    NovoGroupedControlConfig.prototype.initialValue;
}
class ControlConfig {
}
if (false) {
    /** @type {?} */
    ControlConfig.prototype.allowInvalidDate;
    /** @type {?} */
    ControlConfig.prototype.appendToBody;
    /** @type {?} */
    ControlConfig.prototype.associatedEntity;
    /** @type {?} */
    ControlConfig.prototype.asyncValidators;
    /** @type {?} */
    ControlConfig.prototype.checkboxLabel;
    /** @type {?} */
    ControlConfig.prototype.closeOnSelect;
    /** @type {?} */
    ControlConfig.prototype.config;
    /** @type {?} */
    ControlConfig.prototype.controlType;
    /** @type {?} */
    ControlConfig.prototype.currencyFormat;
    /** @type {?} */
    ControlConfig.prototype.customControl;
    /** @type {?} */
    ControlConfig.prototype.customControlConfig;
    /** @type {?} */
    ControlConfig.prototype.dataSpecialization;
    /** @type {?} */
    ControlConfig.prototype.dataType;
    /** @type {?} */
    ControlConfig.prototype.dateFormat;
    /** @type {?} */
    ControlConfig.prototype.description;
    /** @type {?} */
    ControlConfig.prototype.dirty;
    /** @type {?} */
    ControlConfig.prototype.disabled;
    /** @type {?} */
    ControlConfig.prototype.encrypted;
    /** @type {?} */
    ControlConfig.prototype.endDate;
    /** @type {?} */
    ControlConfig.prototype.fileBrowserImageUploadUrl;
    /** @type {?} */
    ControlConfig.prototype.forceClear;
    /** @type {?} */
    ControlConfig.prototype.headerConfig;
    /** @type {?} */
    ControlConfig.prototype.hidden;
    /** @type {?} */
    ControlConfig.prototype.interactions;
    /** @type {?} */
    ControlConfig.prototype.isEmpty;
    /** @type {?} */
    ControlConfig.prototype.key;
    /** @type {?} */
    ControlConfig.prototype.label;
    /** @type {?} */
    ControlConfig.prototype.maskOptions;
    /** @type {?} */
    ControlConfig.prototype.maxlength;
    /** @type {?} */
    ControlConfig.prototype.metaType;
    /** @type {?} */
    ControlConfig.prototype.military;
    /** @type {?} */
    ControlConfig.prototype.minlength;
    /** @type {?} */
    ControlConfig.prototype.multiple;
    /** @type {?} */
    ControlConfig.prototype.name;
    /** @type {?} */
    ControlConfig.prototype.options;
    /** @type {?} */
    ControlConfig.prototype.optionsType;
    /** @type {?} */
    ControlConfig.prototype.parentScrollSelector;
    /** @type {?} */
    ControlConfig.prototype.placeholder;
    /** @type {?} */
    ControlConfig.prototype.readOnly;
    /** @type {?} */
    ControlConfig.prototype.removeTooltipArrow;
    /** @type {?} */
    ControlConfig.prototype.required;
    /** @type {?} */
    ControlConfig.prototype.restrictFieldInteractions;
    /** @type {?} */
    ControlConfig.prototype.sortOrder;
    /** @type {?} */
    ControlConfig.prototype.startDate;
    /** @type {?} */
    ControlConfig.prototype.startupFocus;
    /** @type {?} */
    ControlConfig.prototype.subType;
    /** @type {?} */
    ControlConfig.prototype.template;
    /** @type {?} */
    ControlConfig.prototype.textMaskEnabled;
    /** @type {?} */
    ControlConfig.prototype.tooltip;
    /** @type {?} */
    ControlConfig.prototype.tooltipAutoPosition;
    /** @type {?} */
    ControlConfig.prototype.tooltipPosition;
    /** @type {?} */
    ControlConfig.prototype.tooltipPreline;
    /** @type {?} */
    ControlConfig.prototype.tooltipSize;
    /** @type {?} */
    ControlConfig.prototype.type;
    /** @type {?} */
    ControlConfig.prototype.validators;
    /** @type {?} */
    ControlConfig.prototype.value;
    /** @type {?} */
    ControlConfig.prototype.warning;
    /** @type {?} */
    ControlConfig.prototype.width;
    /** @type {?} */
    ControlConfig.prototype.layoutOptions;
    /** @type {?} */
    ControlConfig.prototype.tipWell;
}
export class BaseControl extends ControlConfig {
    /**
     * @param {?=} type
     * @param {?=} config
     */
    constructor(type = 'BaseControl', config = {}) {
        super();
        this.__type = 'BaseControl';
        this.__type = type;
        this.__config = config;
        this.validators = config.validators || [];
        this.asyncValidators = config.asyncValidators || [];
        this.value = config.value;
        this.key = config.key || '';
        this.label = config.label || '';
        this.checkboxLabel = config.checkboxLabel;
        this.name = config.name || '';
        this.required = !!config.required;
        this.hidden = !!config.hidden;
        this.encrypted = !!config.encrypted;
        this.sortOrder = config.sortOrder === undefined ? 1 : config.sortOrder;
        this.controlType = config.controlType || '';
        this.type = config.type;
        this.subType = config.subType;
        this.metaType = config.metaType;
        this.placeholder = config.placeholder || '';
        this.config = config.config || null;
        this.dirty = !!config.value;
        this.multiple = !!config.multiple;
        this.headerConfig = config.headerConfig || null;
        this.currencyFormat = config.currencyFormat || null;
        this.associatedEntity = config.associatedEntity || null;
        this.optionsType = config.optionsType || null;
        this.options = config.options || [];
        this.forceClear = new EventEmitter();
        this.readOnly = !!config.readOnly || !!config.disabled;
        this.disabled = !!config.disabled;
        this.layoutOptions = config.layoutOptions || {};
        this.military = !!config.military;
        this.dateFormat = config.dateFormat;
        this.textMaskEnabled = config.textMaskEnabled;
        this.maskOptions = config.maskOptions;
        this.allowInvalidDate = config.allowInvalidDate;
        this.startDate = config.startDate;
        this.endDate = config.endDate;
        this.restrictFieldInteractions = !!config.restrictFieldInteractions;
        if (!Helpers.isEmpty(config.warning)) {
            this.warning = config.warning;
        }
        if (this.required) {
            this.validators.push(Validators.required);
        }
        if (!Helpers.isBlank(config.maxlength)) {
            this.maxlength = config.maxlength;
            this.validators.push(Validators.maxLength(this.maxlength));
        }
        if (!Helpers.isBlank(config.minlength)) {
            this.minlength = config.minlength;
            this.validators.push(Validators.minLength(this.minlength));
        }
        this.closeOnSelect = !!config.closeOnSelect;
        this.interactions = config.interactions;
        this.dataSpecialization = config.dataSpecialization;
        this.dataType = config.dataType;
        this.appendToBody = !!config.appendToBody;
        if (this.appendToBody) {
            notify(`'appendToBody' has been deprecated. Please remove this attribute.`);
        }
        this.parentScrollSelector = config.parentScrollSelector;
        this.description = config.description;
        if (config.tooltip) {
            this.tooltip = config.tooltip;
            this.tooltipPosition = config.tooltipPosition;
            this.tooltipSize = config.tooltipSize;
            this.tooltipPreline = config.tooltipPreline;
            this.removeTooltipArrow = config.removeTooltipArrow;
            this.tooltipAutoPosition = config.tooltipAutoPosition;
        }
        this.template = config.template;
        this.customControlConfig = config.customControlConfig;
        this.tipWell = config.tipWell;
        this.width = config.width;
        this.startupFocus = !!config.startupFocus;
        if (config.fileBrowserImageUploadUrl) {
            this.fileBrowserImageUploadUrl = config.fileBrowserImageUploadUrl;
        }
        if (config.isEmpty) {
            this.isEmpty = config.isEmpty;
        }
    }
}
if (false) {
    /** @type {?} */
    BaseControl.prototype.__type;
    /** @type {?} */
    BaseControl.prototype.__config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUNvbnRyb2wuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZm9ybS9jb250cm9scy9CYXNlQ29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUU3QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHVDQUF1QyxDQUFDOzs7O0FBRy9ELDhDQU9DOzs7SUFOQyx5Q0FBZTs7SUFDZix3Q0FBYzs7SUFDZCx1Q0FBZ0M7O0lBQ2hDLDBDQUFpQjs7SUFDakIsdUNBQVk7O0lBQ1osZ0RBQW9COztBQUd0QixNQUFNLGFBQWE7Q0E0RWxCOzs7SUEzRUMseUNBQTJCOztJQUMzQixxQ0FBc0I7O0lBQ3RCLHlDQUF5Qjs7SUFDekIsd0NBQTZCOztJQUM3QixzQ0FBc0I7O0lBQ3RCLHNDQUF1Qjs7SUFDdkIsK0JBQVk7O0lBQ1osb0NBQW9COztJQUNwQix1Q0FBdUI7O0lBQ3ZCLHNDQUFvQjs7SUFDcEIsNENBQTBCOztJQUMxQiwyQ0FBMkI7O0lBQzNCLGlDQUFpQjs7SUFDakIsbUNBQW9COztJQUNwQixvQ0FBcUI7O0lBQ3JCLDhCQUFlOztJQUNmLGlDQUFrQjs7SUFDbEIsa0NBQW1COztJQUNuQixnQ0FBd0I7O0lBQ3hCLGtEQUFtQzs7SUFDbkMsbUNBQThCOztJQUM5QixxQ0FBa0I7O0lBQ2xCLCtCQUFnQjs7SUFDaEIscUNBQTRCOztJQUM1QixnQ0FBbUI7O0lBQ25CLDRCQUFZOztJQUNaLDhCQUFjOztJQUNkLG9DQUEyQjs7SUFDM0Isa0NBQWtCOztJQUNsQixpQ0FBaUI7O0lBQ2pCLGlDQUFtQjs7SUFDbkIsa0NBQWtCOztJQUNsQixpQ0FBa0I7O0lBQ2xC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QUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUM5QixJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUM7WUFDOUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQztZQUM1QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixDQUFDO1lBQ3BELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUM7U0FDdkQ7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztRQUN0RCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDMUMsSUFBSSxNQUFNLENBQUMseUJBQXlCLEVBQUU7WUFDcEMsSUFBSSxDQUFDLHlCQUF5QixHQUFHLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQztTQUNuRTtRQUNELElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7U0FDL0I7SUFDSCxDQUFDO0NBQ0Y7OztJQXhGQyw2QkFBK0I7O0lBQy9CLCtCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQVBQXG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvSGVscGVycyc7XG5pbXBvcnQgeyBOb3ZvQ29udHJvbEdyb3VwQWRkQ29uZmlnIH0gZnJvbSAnLi4vQ29udHJvbEdyb3VwJztcbmltcG9ydCB7IG5vdGlmeSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL25vdGlmaWVyL25vdGlmaWVyLnV0aWwnO1xuaW1wb3J0IHsgSU1hc2tPcHRpb25zIH0gZnJvbSAnLi4vQ29udHJvbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm92b0dyb3VwZWRDb250cm9sQ29uZmlnIHtcbiAgbGFiZWw/OiBzdHJpbmc7XG4gIGljb24/OiBzdHJpbmc7XG4gIGFkZD86IE5vdm9Db250cm9sR3JvdXBBZGRDb25maWc7XG4gIHJlbW92ZT86IGJvb2xlYW47XG4gIGtleTogc3RyaW5nO1xuICBpbml0aWFsVmFsdWU/OiB7fVtdO1xufVxuXG5jbGFzcyBDb250cm9sQ29uZmlnIHtcbiAgYWxsb3dJbnZhbGlkRGF0ZT86IGJvb2xlYW47XG4gIGFwcGVuZFRvQm9keTogYm9vbGVhbjsgLy8gRGVwcmVjYXRlZDtcbiAgYXNzb2NpYXRlZEVudGl0eTogc3RyaW5nO1xuICBhc3luY1ZhbGlkYXRvcnM/OiBBcnJheTxhbnk+O1xuICBjaGVja2JveExhYmVsOiBzdHJpbmc7XG4gIGNsb3NlT25TZWxlY3Q6IGJvb2xlYW47XG4gIGNvbmZpZzogYW55O1xuICBjb250cm9sVHlwZTogc3RyaW5nO1xuICBjdXJyZW5jeUZvcm1hdDogc3RyaW5nO1xuICBjdXN0b21Db250cm9sPzogYW55O1xuICBjdXN0b21Db250cm9sQ29uZmlnPzogYW55O1xuICBkYXRhU3BlY2lhbGl6YXRpb246IHN0cmluZztcbiAgZGF0YVR5cGU6IHN0cmluZztcbiAgZGF0ZUZvcm1hdD86IHN0cmluZztcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGRpcnR5OiBib29sZWFuO1xuICBkaXNhYmxlZDogYm9vbGVhbjtcbiAgZW5jcnlwdGVkOiBib29sZWFuO1xuICBlbmREYXRlPzogRGF0ZSB8IE51bWJlcjtcbiAgZmlsZUJyb3dzZXJJbWFnZVVwbG9hZFVybD86IHN0cmluZztcbiAgZm9yY2VDbGVhcjogRXZlbnRFbWl0dGVyPGFueT47XG4gIGhlYWRlckNvbmZpZzogYW55O1xuICBoaWRkZW46IGJvb2xlYW47XG4gIGludGVyYWN0aW9uczogQXJyYXk8T2JqZWN0PjtcbiAgaXNFbXB0eT86IEZ1bmN0aW9uO1xuICBrZXk6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbiAgbWFza09wdGlvbnM/OiBJTWFza09wdGlvbnM7XG4gIG1heGxlbmd0aDogbnVtYmVyO1xuICBtZXRhVHlwZTogc3RyaW5nO1xuICBtaWxpdGFyeT86IGJvb2xlYW47XG4gIG1pbmxlbmd0aDogbnVtYmVyO1xuICBtdWx0aXBsZTogYm9vbGVhbjtcbiAgbmFtZTogc3RyaW5nO1xuICBvcHRpb25zOiBBcnJheTxhbnk+O1xuICBvcHRpb25zVHlwZTogc3RyaW5nO1xuICBwYXJlbnRTY3JvbGxTZWxlY3Rvcjogc3RyaW5nO1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICByZWFkT25seTogYm9vbGVhbjsgLy8gXCJkaXNhYmxlZFwiLCBzbyBpdCBhcHBlYXJzIGluIHRoZSBtb2RlbCBzdGlsbDtcbiAgcmVtb3ZlVG9vbHRpcEFycm93PzogYm9vbGVhbjtcbiAgcmVxdWlyZWQ6IGJvb2xlYW47XG4gIHJlc3RyaWN0RmllbGRJbnRlcmFjdGlvbnM/OiBib29sZWFuO1xuICBzb3J0T3JkZXI6IG51bWJlcjtcbiAgc3RhcnREYXRlPzogRGF0ZSB8IE51bWJlcjtcbiAgc3RhcnR1cEZvY3VzPzogYm9vbGVhbjtcbiAgc3ViVHlwZT86IHN0cmluZztcbiAgdGVtcGxhdGU/OiBhbnk7XG4gIHRleHRNYXNrRW5hYmxlZD86IGJvb2xlYW47XG4gIHRvb2x0aXA/OiBzdHJpbmc7XG4gIHRvb2x0aXBBdXRvUG9zaXRpb24/OiBib29sZWFuO1xuICB0b29sdGlwUG9zaXRpb24/OiBzdHJpbmc7XG4gIHRvb2x0aXBQcmVsaW5lPzogYm9vbGVhbjtcbiAgdG9vbHRpcFNpemU/OiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbiAgdmFsaWRhdG9yczogQXJyYXk8YW55PjtcbiAgdmFsdWU6IGFueTtcbiAgd2FybmluZz86IHN0cmluZztcbiAgd2lkdGg6IG51bWJlcjtcbiAgbGF5b3V0T3B0aW9ucz86IHtcbiAgICBjdXN0b21BY3Rpb25zPzogYm9vbGVhbjtcbiAgICBkb3dubG9hZD86IGJvb2xlYW47XG4gICAgZHJhZ2dhYmxlPzogYm9vbGVhbjtcbiAgICBlZGl0PzogYm9vbGVhbjtcbiAgICBpY29uU3R5bGU/OiBzdHJpbmc7XG4gICAgbGFiZWxTdHlsZT86IHN0cmluZztcbiAgICBvcmRlcj86IHN0cmluZztcbiAgICByZW1vdmFibGU/OiBib29sZWFuO1xuICAgIGN1c3RvbVZhbGlkYXRpb24/OiB7IGFjdGlvbjogc3RyaW5nOyBmbjogRnVuY3Rpb24gfVtdO1xuICAgIHJlbW92YWJsZVdoZW5OZXc/OiBib29sZWFuO1xuICB9O1xuICB0aXBXZWxsPzoge1xuICAgIGJ1dHRvbj86IGJvb2xlYW47XG4gICAgaWNvbj86IHN0cmluZztcbiAgICB0aXA6IHN0cmluZztcbiAgfTtcbn1cblxuZXhwb3J0IHR5cGUgTm92b0NvbnRyb2xDb25maWcgPSBQYXJ0aWFsPENvbnRyb2xDb25maWc+O1xuXG5leHBvcnQgY2xhc3MgQmFzZUNvbnRyb2wgZXh0ZW5kcyBDb250cm9sQ29uZmlnIHtcbiAgX190eXBlOiBzdHJpbmcgPSAnQmFzZUNvbnRyb2wnO1xuICBfX2NvbmZpZzogTm92b0NvbnRyb2xDb25maWc7XG5cbiAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nID0gJ0Jhc2VDb250cm9sJywgY29uZmlnOiBOb3ZvQ29udHJvbENvbmZpZyA9IHt9KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9fdHlwZSA9IHR5cGU7XG4gICAgdGhpcy5fX2NvbmZpZyA9IGNvbmZpZztcbiAgICB0aGlzLnZhbGlkYXRvcnMgPSBjb25maWcudmFsaWRhdG9ycyB8fCBbXTtcbiAgICB0aGlzLmFzeW5jVmFsaWRhdG9ycyA9IGNvbmZpZy5hc3luY1ZhbGlkYXRvcnMgfHwgW107XG4gICAgdGhpcy52YWx1ZSA9IGNvbmZpZy52YWx1ZTtcbiAgICB0aGlzLmtleSA9IGNvbmZpZy5rZXkgfHwgJyc7XG4gICAgdGhpcy5sYWJlbCA9IGNvbmZpZy5sYWJlbCB8fCAnJztcbiAgICB0aGlzLmNoZWNrYm94TGFiZWwgPSBjb25maWcuY2hlY2tib3hMYWJlbDtcbiAgICB0aGlzLm5hbWUgPSBjb25maWcubmFtZSB8fCAnJztcbiAgICB0aGlzLnJlcXVpcmVkID0gISFjb25maWcucmVxdWlyZWQ7XG4gICAgdGhpcy5oaWRkZW4gPSAhIWNvbmZpZy5oaWRkZW47XG4gICAgdGhpcy5lbmNyeXB0ZWQgPSAhIWNvbmZpZy5lbmNyeXB0ZWQ7XG4gICAgdGhpcy5zb3J0T3JkZXIgPSBjb25maWcuc29ydE9yZGVyID09PSB1bmRlZmluZWQgPyAxIDogY29uZmlnLnNvcnRPcmRlcjtcbiAgICB0aGlzLmNvbnRyb2xUeXBlID0gY29uZmlnLmNvbnRyb2xUeXBlIHx8ICcnO1xuICAgIHRoaXMudHlwZSA9IGNvbmZpZy50eXBlO1xuICAgIHRoaXMuc3ViVHlwZSA9IGNvbmZpZy5zdWJUeXBlO1xuICAgIHRoaXMubWV0YVR5cGUgPSBjb25maWcubWV0YVR5cGU7XG4gICAgdGhpcy5wbGFjZWhvbGRlciA9IGNvbmZpZy5wbGFjZWhvbGRlciB8fCAnJztcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZy5jb25maWcgfHwgbnVsbDtcbiAgICB0aGlzLmRpcnR5ID0gISFjb25maWcudmFsdWU7XG4gICAgdGhpcy5tdWx0aXBsZSA9ICEhY29uZmlnLm11bHRpcGxlO1xuICAgIHRoaXMuaGVhZGVyQ29uZmlnID0gY29uZmlnLmhlYWRlckNvbmZpZyB8fCBudWxsO1xuICAgIHRoaXMuY3VycmVuY3lGb3JtYXQgPSBjb25maWcuY3VycmVuY3lGb3JtYXQgfHwgbnVsbDtcbiAgICB0aGlzLmFzc29jaWF0ZWRFbnRpdHkgPSBjb25maWcuYXNzb2NpYXRlZEVudGl0eSB8fCBudWxsO1xuICAgIHRoaXMub3B0aW9uc1R5cGUgPSBjb25maWcub3B0aW9uc1R5cGUgfHwgbnVsbDtcbiAgICB0aGlzLm9wdGlvbnMgPSBjb25maWcub3B0aW9ucyB8fCBbXTtcbiAgICB0aGlzLmZvcmNlQ2xlYXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy5yZWFkT25seSA9ICEhY29uZmlnLnJlYWRPbmx5IHx8ICEhY29uZmlnLmRpc2FibGVkO1xuICAgIHRoaXMuZGlzYWJsZWQgPSAhIWNvbmZpZy5kaXNhYmxlZDtcbiAgICB0aGlzLmxheW91dE9wdGlvbnMgPSBjb25maWcubGF5b3V0T3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLm1pbGl0YXJ5ID0gISFjb25maWcubWlsaXRhcnk7XG4gICAgdGhpcy5kYXRlRm9ybWF0ID0gY29uZmlnLmRhdGVGb3JtYXQ7XG4gICAgdGhpcy50ZXh0TWFza0VuYWJsZWQgPSBjb25maWcudGV4dE1hc2tFbmFibGVkO1xuICAgIHRoaXMubWFza09wdGlvbnMgPSBjb25maWcubWFza09wdGlvbnM7XG4gICAgdGhpcy5hbGxvd0ludmFsaWREYXRlID0gY29uZmlnLmFsbG93SW52YWxpZERhdGU7XG4gICAgdGhpcy5zdGFydERhdGUgPSBjb25maWcuc3RhcnREYXRlO1xuICAgIHRoaXMuZW5kRGF0ZSA9IGNvbmZpZy5lbmREYXRlO1xuICAgIHRoaXMucmVzdHJpY3RGaWVsZEludGVyYWN0aW9ucyA9ICEhY29uZmlnLnJlc3RyaWN0RmllbGRJbnRlcmFjdGlvbnM7XG4gICAgaWYgKCFIZWxwZXJzLmlzRW1wdHkoY29uZmlnLndhcm5pbmcpKSB7XG4gICAgICB0aGlzLndhcm5pbmcgPSBjb25maWcud2FybmluZztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yZXF1aXJlZCkge1xuICAgICAgdGhpcy52YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5yZXF1aXJlZCk7XG4gICAgfVxuICAgIGlmICghSGVscGVycy5pc0JsYW5rKGNvbmZpZy5tYXhsZW5ndGgpKSB7XG4gICAgICB0aGlzLm1heGxlbmd0aCA9IGNvbmZpZy5tYXhsZW5ndGg7XG4gICAgICB0aGlzLnZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1heExlbmd0aCh0aGlzLm1heGxlbmd0aCkpO1xuICAgIH1cbiAgICBpZiAoIUhlbHBlcnMuaXNCbGFuayhjb25maWcubWlubGVuZ3RoKSkge1xuICAgICAgdGhpcy5taW5sZW5ndGggPSBjb25maWcubWlubGVuZ3RoO1xuICAgICAgdGhpcy52YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5taW5MZW5ndGgodGhpcy5taW5sZW5ndGgpKTtcbiAgICB9XG4gICAgdGhpcy5jbG9zZU9uU2VsZWN0ID0gISFjb25maWcuY2xvc2VPblNlbGVjdDtcbiAgICB0aGlzLmludGVyYWN0aW9ucyA9IGNvbmZpZy5pbnRlcmFjdGlvbnM7XG4gICAgdGhpcy5kYXRhU3BlY2lhbGl6YXRpb24gPSBjb25maWcuZGF0YVNwZWNpYWxpemF0aW9uO1xuICAgIHRoaXMuZGF0YVR5cGUgPSBjb25maWcuZGF0YVR5cGU7XG4gICAgdGhpcy5hcHBlbmRUb0JvZHkgPSAhIWNvbmZpZy5hcHBlbmRUb0JvZHk7XG4gICAgaWYgKHRoaXMuYXBwZW5kVG9Cb2R5KSB7XG4gICAgICBub3RpZnkoYCdhcHBlbmRUb0JvZHknIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFBsZWFzZSByZW1vdmUgdGhpcyBhdHRyaWJ1dGUuYCk7XG4gICAgfVxuICAgIHRoaXMucGFyZW50U2Nyb2xsU2VsZWN0b3IgPSBjb25maWcucGFyZW50U2Nyb2xsU2VsZWN0b3I7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGNvbmZpZy5kZXNjcmlwdGlvbjtcbiAgICBpZiAoY29uZmlnLnRvb2x0aXApIHtcbiAgICAgIHRoaXMudG9vbHRpcCA9IGNvbmZpZy50b29sdGlwO1xuICAgICAgdGhpcy50b29sdGlwUG9zaXRpb24gPSBjb25maWcudG9vbHRpcFBvc2l0aW9uO1xuICAgICAgdGhpcy50b29sdGlwU2l6ZSA9IGNvbmZpZy50b29sdGlwU2l6ZTtcbiAgICAgIHRoaXMudG9vbHRpcFByZWxpbmUgPSBjb25maWcudG9vbHRpcFByZWxpbmU7XG4gICAgICB0aGlzLnJlbW92ZVRvb2x0aXBBcnJvdyA9IGNvbmZpZy5yZW1vdmVUb29sdGlwQXJyb3c7XG4gICAgICB0aGlzLnRvb2x0aXBBdXRvUG9zaXRpb24gPSBjb25maWcudG9vbHRpcEF1dG9Qb3NpdGlvbjtcbiAgICB9XG4gICAgdGhpcy50ZW1wbGF0ZSA9IGNvbmZpZy50ZW1wbGF0ZTtcbiAgICB0aGlzLmN1c3RvbUNvbnRyb2xDb25maWcgPSBjb25maWcuY3VzdG9tQ29udHJvbENvbmZpZztcbiAgICB0aGlzLnRpcFdlbGwgPSBjb25maWcudGlwV2VsbDtcbiAgICB0aGlzLndpZHRoID0gY29uZmlnLndpZHRoO1xuICAgIHRoaXMuc3RhcnR1cEZvY3VzID0gISFjb25maWcuc3RhcnR1cEZvY3VzO1xuICAgIGlmIChjb25maWcuZmlsZUJyb3dzZXJJbWFnZVVwbG9hZFVybCkge1xuICAgICAgdGhpcy5maWxlQnJvd3NlckltYWdlVXBsb2FkVXJsID0gY29uZmlnLmZpbGVCcm93c2VySW1hZ2VVcGxvYWRVcmw7XG4gICAgfVxuICAgIGlmIChjb25maWcuaXNFbXB0eSkge1xuICAgICAgdGhpcy5pc0VtcHR5ID0gY29uZmlnLmlzRW1wdHk7XG4gICAgfVxuICB9XG59XG4iXX0=