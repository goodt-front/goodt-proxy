import Vue from 'vue';
// eslint-disable-next-line import/no-cycle
import { EventBusBase, EventBusEvent } from './EventBus';

let routeManager = null;
const eventBusInstance = new EventBusBase();
const routeManagerEnforcer = Symbol('routeManagerEnforcer');
const routeManagerObservable = Symbol('routeManagerObservable');

/**
 * @readonly
 * @enum {string}
 * @type {Readonly<{NAVIGATE: string}>}
 */
const RouteManagerEvent = Object.freeze({
    NAVIGATE: 'navigate'
});

/**
 * @typedef {object} RouteObject
 * @property {string} path     route path
 * @property {Record<string, any>} query    query params
 * @property {Record<string, any>} meta     meta data
 */
/**
 * @typedef {object} NavigateOptions
 * @property {string} path          route path
 * @property {Record<string, any>} [query={}]    query params
 */
/**
 * @callback NavigateHandler
 * @param {{ path: string, query: object }} options
 */
/**
 * @callback RouteHandler
 * @param {RouteObject} route
 */
export default class RouteManager {
    /**
     * Constructor
     *
     * @param {symbol} enforcer  singleton enforcer
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
     * @param {boolean} [isInvokeRouteHandlers=true]      if true will invoke route handlers
     */
    setRoute(route, isInvokeRouteHandlers = true) {
        this[routeManagerObservable].route = route;
        if (isInvokeRouteHandlers) {
            this._routeHandlers.forEach((h) => h(route));
        }
    }

    /**
     * Requests a route change by path
     *
     * @param {NavigateOptions} options
     */
    // eslint-disable-next-line class-methods-use-this
    navigate({ path, query = {} }) {
        eventBusInstance.trigger(new EventBusEvent(RouteManagerEvent.NAVIGATE), {
            path,
            query
        });
    }

    /**
     * Registers a navigate() observer (used by the env)
     *
     * @param {NavigateHandler} handler     navigate handler invoked by @see navigate()
     * @return {Function}                   dispose function to unregister observer
     */
    // eslint-disable-next-line class-methods-use-this
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
        this._routeHandlers = this._routeHandlers.filter((h) => h !== handler);
    }
}
