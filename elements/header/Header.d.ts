import * as i0 from "@angular/core";
export declare class NovoHeaderSpacer {
    static ɵfac: i0.ɵɵFactoryDef<NovoHeaderSpacer, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoHeaderSpacer, "header-spacer", never, {}, {}, never, ["*"]>;
}
export declare class NovoUtilsComponent {
    static ɵfac: i0.ɵɵFactoryDef<NovoUtilsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoUtilsComponent, "utils", never, {}, {}, never, ["*"]>;
}
export declare class NovoUtilActionComponent {
    icon: string;
    inverse: boolean;
    disabled: boolean;
    static ɵfac: i0.ɵɵFactoryDef<NovoUtilActionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoUtilActionComponent, "util-action, novo-action", never, { "icon": "icon"; "inverse": "inverse"; "disabled": "disabled"; }, {}, never, ["*"]>;
}
export declare class NovoHeaderComponent {
    headerClass: string;
    condensed: boolean;
    title: string;
    subTitle: string;
    inverse: string;
    size: 'small' | 'medium' | 'large';
    get hb_isSizeSmall(): boolean;
    get hb_isSizeLarge(): boolean;
    get hb_isSizeDefault(): boolean;
    set theme(theme: string);
    get theme(): string;
    set icon(icon: string);
    get icon(): string;
    private _theme;
    private _icon;
    static ɵfac: i0.ɵɵFactoryDef<NovoHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoHeaderComponent, "novo-header,header[theme]", never, { "condensed": "condensed"; "title": "title"; "subTitle": "subTitle"; "size": "size"; "theme": "theme"; "icon": "icon"; }, {}, never, ["[prefix]", "novo-icon, [novo-icon]", "h1, h2, h3, h4, h5, h6, small, novo-title, [novo-title], [novo-subtitle]", "section", "utils", "[suffix]", "novo-action,[novo-action]", "*"]>;
}
