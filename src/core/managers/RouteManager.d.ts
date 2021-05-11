export interface NavigateOptions {
    readonly path: string;
    readonly query?: Record<string, null | undefined | string | number | boolean>;
}

export interface RouteObject extends Required<NavigateOptions> {
    readonly meta: Record<string, any>;
}
