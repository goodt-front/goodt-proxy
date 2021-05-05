import RouteManager from '../../src/core/managers/RouteManager';
import { EventBus, EventBusWrapper, EventBusEvent } from '../../src/core/managers/EventBus';
import { createStore } from '../../src/core/managers/StoreManager';

const url = '/some-url';
const params = { somePram: 1 };

describe('Event Bus Wrapper Route Manager Backward Compatibility', () => {
    let eventBus = null;
    let eventBusWrapper = null;

    beforeEach(() => {
        eventBus = new EventBus(createStore(), RouteManager.instance);
        eventBusWrapper = new EventBusWrapper(eventBus);

        RouteManager.instance.onNavigate(({ path, query }) =>
            RouteManager.instance.setRoute({ path, query, meta: {} })
        );
    });

    afterEach(() => {
        eventBusWrapper.destroy();
    });

    // Backward Compatibility
    // 1
    test('1. triggerNavigate set RouteManager route to defined', () => {
        // when
        eventBusWrapper.triggerNavigate({
            url,
            params
        });

        // Then
        expect(RouteManager.instance.route).toEqual({
            meta: {},
            path: url,
            query: params
        });
    });

    // 2
    test('2. triggerNavigate set RouteManager.route to defined', () => {
        // Given
        let routeCurrent = null;
        eventBusWrapper.listenNavigate((_, route) => {
            routeCurrent = route;
        });

        // when
        eventBusWrapper.triggerNavigate({
            url,
            params
        });

        // Then
        expect(routeCurrent).toEqual({
            url,
            params
        });
    });

    // 3
    test('3. RouteManager.navigate notify subscriber `listenNavigate`', () => {
        // Given
        let routeCurrent = null;
        eventBusWrapper.listenNavigate((_, route) => {
            routeCurrent = route;
        });

        // when
        RouteManager.instance.navigate({ path: url, query: params });

        // Then
        expect(routeCurrent).toEqual({
            url,
            params
        });
    });
});
