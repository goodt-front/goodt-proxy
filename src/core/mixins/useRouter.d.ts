export interface Computed {
    readonly $routeCurrent: RouteManagerRoute;
}

export interface Methods {
    $routeNavigate({ path, query = {} }: RouteManagerRoute): void;
}
