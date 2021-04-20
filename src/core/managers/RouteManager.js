import { EventBus, EventBusEvent } from './EventBus';

let eventBusInstance = new EventBus();
let routeManager = null;
let routeManagerEnforcer = Symbol();

const RouteManagerEvent = {
    ROUTE_CHANGED: 'route-changed',
    PARAMS_CHANGED: 'params-changed'
};

export default class RouteManager {
    /**
     * Constructor
     * @param {Symbol} enforcer  singleton enforcer
     */
    constructor(enforcer) {
        if (enforcer !== routeManagerEnforcer) {
            throw new Error(`Instantiation failed: use RouteManager.instance`);
        }
        /** @type {Object} */
        this._currentRoute = null;
        /** @type {Object} */
        this._currentParams = null;
    }
    /**
     * @return {RouteManager}
     */
    static get instance() {
        if (!routeManager) {
            routeManager = new RouteManager(routeManagerEnforcer);
        }
        return routeManager;
    }
    /**
     * Returns the current route
     * @return {Object} route
     */
    get currentRoute() {
        return this._currentRoute;
    }
    /**
     * Sets the current route
     * @param {Object} route
     */
    set currentRoute(route) {
        if (this._currentRoute !== route) {
            this._currentRoute = route;
            eventBusInstance.trigger(
                new EventBusEvent(RouteManagerEvent.ROUTE_CHANGED),
                this.currentRoute
            );
        }
    }
    /**
     * Returns current route params
     * @return {Object} params
     */
    get currentParams() {
        return this._currentParams;
    }
    /**
     * Sets new route params
     * @param {Object} params
     */
    set currentParams(params) {
        if (this._currentParams !== params) {
            this._currentParams = params;
            eventBusInstance.trigger(
                new EventBusEvent(RouteManagerEvent.PARAMS_CHANGED),
                this.currentParams
            );
        }
    }
    /**
     * Register a route change handler
     * @param {Function} handler    handler
     * @return {Function}           dispose function to unregister handler
     */
    onRouteChange(handler) {
        return eventBusInstance.listen(
            new EventBusEvent(RouteManagerEvent.ROUTE_CHANGED),
            handler,
            false
        );
    }
    /**
     * Register a route params change handler
     * @param {Function} handler    handler
     * @return {Function}           dispose function to unregister handler
     */
    onParamsChange(handler) {
        return eventBusInstance.listen(
            new EventBusEvent(RouteManagerEvent.PARAMS_CHANGED),
            handler,
            false
        );
    }
}
