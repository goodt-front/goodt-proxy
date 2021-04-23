import { EventBusBase, EventBusEvent } from './EventBus';

let eventBusInstance = new EventBusBase();
let routeManager = null;
let routeManagerEnforcer = Symbol();

const RouteManagerEvent = {
    ROUTE_CHANGED: 'route-changed'
};

/**
 * @typedef {Object} RouteObject
 * @param {String} path     route path
 * @param {Object} query    query params
 * @param {Object} meta     meta data
 */

export default class RouteManager {
    /**
     * Constructor
     * @param {Symbol} enforcer  singleton enforcer
     */
    constructor(enforcer) {
        if (enforcer !== routeManagerEnforcer) {
            throw new Error(`Instantiation failed: use RouteManager.instance`);
        }
        /** @type {RouteObject} */
        this._currentRoute = null;
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
     * @return {RouteObject} route
     */
    get currentRoute() {
        return this._currentRoute;
    }
    /**
     * Sets the current route
     * @param {RouteObject} route
     */
    set currentRoute(route) {
        if (this._currentRoute !== route) {
            this._currentRoute = route;
            eventBusInstance.trigger(new EventBusEvent(RouteManagerEvent.ROUTE_CHANGED), route);
        }
    }
    /**
     * Register a route change handler
     * @param {(route:RouteObject)} handler    handler
     * @return {Function}           dispose function to unregister handler
     */
    onRouteChange(handler) {
        return eventBusInstance.listen(
            new EventBusEvent(RouteManagerEvent.ROUTE_CHANGED),
            (e, data) => handler(data)
        );
    }
}
