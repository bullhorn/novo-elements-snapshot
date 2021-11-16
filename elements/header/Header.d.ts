import * as ɵngcc0 from '@angular/core';
export declare class NovoHeaderSpacer {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoHeaderSpacer, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoHeaderSpacer, "header-spacer", never, {}, {}, never, ["*"]>;
}
export declare class NovoUtilsComponent {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoUtilsComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoUtilsComponent, "utils", never, {}, {}, never, ["*"]>;
}
export declare class NovoUtilActionComponent {
    icon: string;
    inverse: boolean;
    disabled: boolean;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoUtilActionComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoUtilActionComponent, "util-action, novo-action", never, { "icon": "icon"; "inverse": "inverse"; "disabled": "disabled"; }, {}, never, ["*"]>;
}
export declare class NovoHeaderComponent {
    headerClass: string;
    condensed: boolean;
    title: string;
    subTitle: string;
    inverse: string;
    set theme(theme: string);
    get theme(): string;
    set icon(icon: string);
    get icon(): string;
    private _theme;
    private _icon;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoHeaderComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoHeaderComponent, "header[theme]", never, { "condensed": "condensed"; "theme": "theme"; "icon": "icon"; "title": "title"; "subTitle": "subTitle"; }, {}, never, ["novo-icon, [novo-icon]", "h1, h2, h3, h4, h5, h6, small, [novo-title], [novo-subtitle]", "section", "utils", "novo-action", "*"]>;
}

//# sourceMappingURL=Header.d.ts.map