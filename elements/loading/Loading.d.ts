import { EmbeddedViewRef, QueryList, TemplateRef, ViewContainerRef } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class NovoLoadingElement {
    theme: string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoLoadingElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoLoadingElement, "novo-loading", never, { "theme": "theme"; }, {}, never, never>;
}
export declare class NovoSpinnerElement {
    theme: string;
    inverse: boolean;
    baseHref: string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoSpinnerElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoSpinnerElement, "novo-spinner", never, { "theme": "theme"; "inverse": "inverse"; "baseHref": "baseHref"; }, {}, never, never>;
}
export declare class NovoSkeletonDirective {
    skeleton: boolean;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoSkeletonDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NovoSkeletonDirective, "[skeleton]", never, {}, {}, never>;
}
export declare class NovoLoadedDirective {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoLoadedDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NovoLoadedDirective, "[loaded]", never, {}, {}, never>;
}
export declare class NovoIsLoadingDirective {
    private viewContainer;
    skeletonTemplates: QueryList<TemplateRef<any>>;
    loadedTemplates: QueryList<TemplateRef<any>>;
    private hasView;
    private skeletonViews;
    private loadedViews;
    constructor(viewContainer: ViewContainerRef);
    set isLoading(condition: boolean);
    createViews(templates: QueryList<TemplateRef<any>>): EmbeddedViewRef<any>[];
    destroyViews(views: EmbeddedViewRef<any>[]): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoIsLoadingDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NovoIsLoadingDirective, "[isLoading]", never, { "isLoading": "isLoading"; }, {}, ["skeletonTemplates", "loadedTemplates"]>;
}

//# sourceMappingURL=Loading.d.ts.map