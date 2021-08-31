export declare class NovoHeaderSpacer {
}
export declare class NovoUtilsComponent {
}
export declare class NovoUtilActionComponent {
    icon: string;
    inverse: boolean;
    disabled: boolean;
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
}
