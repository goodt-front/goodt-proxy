import Vue from 'vue';
import { EventBusBase, EventBusEvent } from './EventBus';

const eventBusInstance = new EventBusBase();
let routeManager = null;
const routeManagerEnforcer = Symbol();
const routeManagerObservable = Symbol('ob');

const RouteManagerEvent = {
    NAVIGATE: 'navigate'
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
        /** @type {{ route:RouteObject }} */
        this[routeManagerObservable] = Vue.observable({ route: null });
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
        return this[routeManagerObservable].route;
    }
    /**
     * Sets the current route
     * @param {RouteObject} route
     */
    set currentRoute(route) {
        this[routeManagerObservable].route = route;
    }
    /**
     * Requests a route change by path
     * @param {String} path         route path
     * @param {Object} [query={}]   optional route query params
     */
    navigate(path, query = {}) {
        eventBusInstance.trigger(new EventBusEvent(RouteManagerEvent.NAVIGATE), { path, query });
    }
}
