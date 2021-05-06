import RouteManager from '@goodt/core/managers/RouteManager';
import { EventBus, EventBusWrapper, EventBusEvent } from '@goodt/core/managers/EventBus';
import { createStore } from '@goodt/core/managers/StoreManager';

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
    test('1. Publisher `triggerNavigate` SHOULD set RouteManager route to defined', () => {
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
    test('2. Publisher `triggerNavigate` SHOULD notify subscriber via `listenNavigate`', () => {
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
    test('3. RouteManager.navigate SHOULD notify subscriber via `listenNavigate`', () => {
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
