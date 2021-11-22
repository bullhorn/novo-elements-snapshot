"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputNames = void 0;
const schematics_1 = require("@angular/cdk/schematics");
exports.inputNames = {
    [schematics_1.TargetVersion.V6]: [
        {
            pr: 'https://github.com/angular/components/pull/10218',
            changes: [
                {
                    replace: 'align',
                    replaceWith: 'labelPosition',
                    limitedTo: { elements: ['mat-radio-group', 'mat-radio-button'] },
                },
            ],
        },
        {
            pr: 'https://github.com/angular/components/pull/10279',
            changes: [
                {
                    replace: 'align',
                    replaceWith: 'position',
                    limitedTo: { elements: ['mat-drawer', 'mat-sidenav'] },
                },
            ],
        },
        {
            pr: 'https://github.com/angular/components/pull/10294',
            changes: [
                { replace: 'dividerColor', replaceWith: 'color', limitedTo: { elements: ['mat-form-field'] } },
                {
                    replace: 'floatPlaceholder',
                    replaceWith: 'floatLabel',
                    limitedTo: { elements: ['mat-form-field'] },
                },
            ],
        },
        {
            pr: 'https://github.com/angular/components/pull/10309',
            changes: [
                {
                    replace: 'mat-dynamic-height',
                    replaceWith: 'dynamicHeight',
                    limitedTo: { elements: ['mat-tab-group'] },
                },
            ],
        },
        {
            pr: 'https://github.com/angular/components/pull/10342',
            changes: [{ replace: 'align', replaceWith: 'labelPosition', limitedTo: { elements: ['mat-checkbox'] } }],
        },
        {
            pr: 'https://github.com/angular/components/pull/10344',
            changes: [
                {
                    replace: 'tooltip-position',
                    replaceWith: 'matTooltipPosition',
                    limitedTo: { attributes: ['matTooltip'] },
                },
            ],
        },
        {
            pr: 'https://github.com/angular/components/pull/10373',
            changes: [
                { replace: 'thumb-label', replaceWith: 'thumbLabel', limitedTo: { elements: ['mat-slider'] } },
                {
                    replace: 'tick-interval',
                    replaceWith: 'tickInterval',
                    limitedTo: { elements: ['mat-slider'] },
                },
            ],
        },
    ],
};
//# sourceMappingURL=input-names.js.map