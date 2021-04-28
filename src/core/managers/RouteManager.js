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
 * @property {string} path     route path
 * @property {object} query    query params
 * @property {object} meta     meta data
 */
/**
 * @typedef {Object} NavigateOptions
 * @property {string} path          route path
 * @property {object} [query={}]    query params
 */
/**
 * @callback NavigateHandler
 * @param {{ path:String, query:object }} options
 */
/**
 * @callback RouteHandler
 * @param {RouteObject} route
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
        /** @type {RouteHandler[]} */
        this._routeHandlers = [];
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
    get route() {
        return this[routeManagerObservable].route;
    }

    /**
     * Sets the current route
     * @param {RouteObject} route                       new route
     * @param {Boolean} [invokeRouteHandlers=true]      if true will invoke route handlers
     */
    setRoute(route, invokeRouteHandlers = true) {
        this[routeManagerObservable].route = route;
        invokeRouteHandlers && this._routeHandlers.forEach(h => h(route));
    }

    /**
     * Requests a route change by path
     * @param {NavigateOptions} options
     */
    navigate({ path, query = {} }) {
        eventBusInstance.trigger(new EventBusEvent(RouteManagerEvent.NAVIGATE), {
            path,
            query
        });
    }

    /**
     * Registers a navigate() observer (used by the env)
     * @param {NavigateHandler} handler     navigate handler invoked by @see navigate()
     * @return {Function}                   dispose function to unregister observer
     */
    onNavigate(handler) {
        const event = new EventBusEvent(RouteManagerEvent.NAVIGATE);
        return eventBusInstance.listen(event, (e, data) => handler(data));
    }

    /**
     * Adds a route handler
     * @param {RouteHandler} handler
     */
    addRouteHandler(handler) {
        this._routeHandlers.push(handler);
    }

    /**
     * Removes a route handler
     * @param {RouteHandler} handler
     */
    removeRouteHandler(handler) {
        this._routeHandlers = this._routeHandlers.filter(h => h !== handler);
    }
}
