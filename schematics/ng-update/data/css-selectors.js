"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssSelectors = void 0;
const schematics_1 = require("@angular/cdk/schematics");
exports.cssSelectors = {
    [schematics_1.TargetVersion.V6]: [
        {
            pr: 'https://github.com/bullhorn/novo-elements/pull/1241',
            changes: [{ replace: '.flex-wrapper', replaceWith: '.button-contents' }],
        },
    ],
};
//# sourceMappingURL=css-selectors.js.map