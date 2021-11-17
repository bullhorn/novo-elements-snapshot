import { ChangeDetectorRef, ElementRef, OnDestroy } from '@angular/core';
import { NovoExpansionPanel } from './expansion-panel';
/**
 * `<novo-expansion-panel-header>`
 *
 * This component corresponds to the header element of an `<novo-expansion-panel>`.
 */
export declare class NovoExpansionPanelHeader implements OnDestroy {
    panel: NovoExpansionPanel;
    private _element;
    private _changeDetectorRef;
    private _parentChangeSubscription;
    constructor(panel: NovoExpansionPanel, _element: ElementRef, _changeDetectorRef: ChangeDetectorRef);
    /** Height of the header while the panel is expanded. */
    expandedHeight: string;
    /** Height of the header while the panel is collapsed. */
    collapsedHeight: string;
    /** Toggles the expanded state of the panel. */
    _toggle(): void;
    /** Gets whether the panel is expanded. */
    _isExpanded(): boolean;
    /** Gets the expanded state string of the panel. */
    _getExpandedState(): string;
    /** Gets the panel id. */
    _getPanelId(): string;
    /** Gets whether the expand indicator should be shown. */
    _showToggle(): boolean;
    /** Handle keydown event calling to toggle() if appropriate. */
    _keydown(event: KeyboardEvent): void;
    ngOnDestroy(): void;
}
/**
 * `<novo-panel-description>`
 *
 * This direction is to be used inside of the NovoExpansionPanelHeader component.
 */
export declare class NovoExpansionPanelDescription {
}
/**
 * `<novo-panel-title>`
 *
 * This direction is to be used inside of the NovoExpansionPanelHeader component.
 */
export declare class NovoExpansionPanelTitle {
}
