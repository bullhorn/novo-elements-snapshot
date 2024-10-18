import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "novo-elements/elements/icon";
export class NovoStepStatus {
    constructor() { }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: NovoStepStatus, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: NovoStepStatus, selector: "novo-step-status", inputs: { state: "state" }, host: { classAttribute: "novo-step-status" }, ngImport: i0, template: "<div class=\"novo-stepper-status-line\" [ngClass]=\"state\"></div>\n<div [ngSwitch]=\"state\" class=\"novo-stepper-status-icon\">\n  <novo-icon color=\"positive\" *ngSwitchCase=\"'edit'\">check-circle</novo-icon>\n  <novo-icon color=\"positive\" *ngSwitchCase=\"'done'\">check-circle-filled</novo-icon>\n  <novo-icon color=\"positive\" *ngSwitchDefault>circle-o</novo-icon>\n</div>", dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i1.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "component", type: i2.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: NovoStepStatus, decorators: [{
            type: Component,
            args: [{ selector: 'novo-step-status', preserveWhitespaces: false, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        class: 'novo-step-status',
                    }, template: "<div class=\"novo-stepper-status-line\" [ngClass]=\"state\"></div>\n<div [ngSwitch]=\"state\" class=\"novo-stepper-status-icon\">\n  <novo-icon color=\"positive\" *ngSwitchCase=\"'edit'\">check-circle</novo-icon>\n  <novo-icon color=\"positive\" *ngSwitchCase=\"'done'\">check-circle-filled</novo-icon>\n  <novo-icon color=\"positive\" *ngSwitchDefault>circle-o</novo-icon>\n</div>" }]
        }], ctorParameters: () => [], propDecorators: { state: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC1zdGF0dXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvc3RlcHBlci9zdGVwLXN0YXR1cy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9zdGVwcGVyL3N0ZXAtc3RhdHVzLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBWTFFLE1BQU0sT0FBTyxjQUFjO0lBSXpCLGdCQUFlLENBQUM7K0dBSkwsY0FBYzttR0FBZCxjQUFjLGtJQ1ozQiwrWEFLTTs7NEZET08sY0FBYztrQkFWMUIsU0FBUzsrQkFDRSxrQkFBa0IsdUJBR1AsS0FBSyxtQkFDVCx1QkFBdUIsQ0FBQyxNQUFNLFFBQ3pDO3dCQUNKLEtBQUssRUFBRSxrQkFBa0I7cUJBQzFCO3dEQUlELEtBQUs7c0JBREosS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tc3RlcC1zdGF0dXMnLFxuICB0ZW1wbGF0ZVVybDogJ3N0ZXAtc3RhdHVzLmNvbXBvbmVudC5odG1sJyxcbiAgLy8gZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLXN0ZXAtc3RhdHVzJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1N0ZXBTdGF0dXMge1xuICBASW5wdXQoKVxuICBzdGF0ZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cbn1cbiIsIjxkaXYgY2xhc3M9XCJub3ZvLXN0ZXBwZXItc3RhdHVzLWxpbmVcIiBbbmdDbGFzc109XCJzdGF0ZVwiPjwvZGl2PlxuPGRpdiBbbmdTd2l0Y2hdPVwic3RhdGVcIiBjbGFzcz1cIm5vdm8tc3RlcHBlci1zdGF0dXMtaWNvblwiPlxuICA8bm92by1pY29uIGNvbG9yPVwicG9zaXRpdmVcIiAqbmdTd2l0Y2hDYXNlPVwiJ2VkaXQnXCI+Y2hlY2stY2lyY2xlPC9ub3ZvLWljb24+XG4gIDxub3ZvLWljb24gY29sb3I9XCJwb3NpdGl2ZVwiICpuZ1N3aXRjaENhc2U9XCInZG9uZSdcIj5jaGVjay1jaXJjbGUtZmlsbGVkPC9ub3ZvLWljb24+XG4gIDxub3ZvLWljb24gY29sb3I9XCJwb3NpdGl2ZVwiICpuZ1N3aXRjaERlZmF1bHQ+Y2lyY2xlLW88L25vdm8taWNvbj5cbjwvZGl2PiJdfQ==