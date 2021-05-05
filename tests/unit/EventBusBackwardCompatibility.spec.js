import RouteManager from '../../src/core/managers/RouteManager';
import { EventBus, EventBusWrapper, EventBusEvent } from '../../src/core/managers/EventBus';
import {
    buildStoreValue,
    createStore,
    unwrapStoreValue
} from '../../src/core/managers/StoreManager';

const STORE_STATE_VARIABLE_NAME = 'test';
const INTERNAL_STATE_VARIABLE_NAME = 'someVarName';
const VARIABLE_VALUE = '1';

/**
 *
 * @param {EventBusWrapper} eventBusWrapper
 * @param varAliases
 * @return {*}
 */
const decorateEventBusWrapper = (eventBusWrapper) => {
    eventBusWrapper.toVO = buildStoreValue;
    eventBusWrapper.toValue = unwrapStoreValue;

    return eventBusWrapper;
};

describe('Event Bus Wrapper State Management Backward Compatibility', () => {
    let store = null;
    let eventBus = null;
    let eventBusWrapper = null;

    beforeEach(() => {
        store = createStore();
        eventBus = new EventBus(store, RouteManager.instance);
        // TEST-RELATED INSTANT STATE COMMIT ENABLE
        // (disables async-zero-setTimeout state commit deferred trigger)
        eventBus.useStateDeferredMerging = false;
        eventBusWrapper = decorateEventBusWrapper(new EventBusWrapper(eventBus));
    });

    afterEach(() => {
        eventBusWrapper.destroy();
    });

    // Backward Compatibility
    // 3
    test('3. check publisher `triggerStateChange` with var aliases `trigger` notifies subscribers `listenStateChange` with var aliases `listen`', () => {
        // Given
        let subscriberInternalState = null;
        const publisherInternalState = {
            [INTERNAL_STATE_VARIABLE_NAME]: VARIABLE_VALUE
        };

        // Event Bus Wrapper SUBSCRIBER
        {
            const eventBusWrapperSubscriber = decorateEventBusWrapper(
                new EventBusWrapper(eventBus)
            );
            eventBusWrapperSubscriber.listenStateChange((_, state) => {
                subscriberInternalState = state;
            });
            eventBusWrapperSubscriber.varAliases = {
                [INTERNAL_STATE_VARIABLE_NAME]: {
                    listen: STORE_STATE_VARIABLE_NAME
                }
            };
        }

        // Event Bus Wrapper PUBLISHER
        {
            const eventBusWrapperPublisher = eventBusWrapper;
            eventBusWrapperPublisher.varAliases = {
                [INTERNAL_STATE_VARIABLE_NAME]: {
                    trigger: STORE_STATE_VARIABLE_NAME
                }
            };
            // When
            eventBusWrapperPublisher.triggerStateChange(publisherInternalState);
        }

        // Then
        expect(subscriberInternalState).toEqual(publisherInternalState);
    });

    // 4
    test('4. check publisher `triggerStateChange` with var aliases `trigger` notifies subscribers `listen("state-change", ...)`', () => {
        // Given
        let subscriberInternalState = null;
        const publisherInternalState = {
            [INTERNAL_STATE_VARIABLE_NAME]: VARIABLE_VALUE
        };

        // Event Bus Wrapper SUBSCRIBER
        {
            const eventBusWrapperSubscriber = decorateEventBusWrapper(
                new EventBusWrapper(eventBus)
            );
            eventBusWrapperSubscriber.listen(EventBusEvent.EVENT_STATE_CHANGE, (_, state) => {
                subscriberInternalState = state;
            });
            // check if filters not affect
            eventBusWrapperSubscriber.varAliases = {
                [INTERNAL_STATE_VARIABLE_NAME]: {
                    listen: STORE_STATE_VARIABLE_NAME
                }
            };
        }

        // Event Bus Wrapper PUBLISHER
        {
            const eventBusWrapperPublisher = eventBusWrapper;
            eventBusWrapperPublisher.varAliases = {
                [INTERNAL_STATE_VARIABLE_NAME]: {
                    trigger: STORE_STATE_VARIABLE_NAME
                }
            };
            // When
            eventBusWrapperPublisher.triggerStateChange(publisherInternalState);
        }

        // Then
        const subscriberInternalStateExpected = {
            [STORE_STATE_VARIABLE_NAME]: VARIABLE_VALUE
        };
        expect(subscriberInternalState).toEqual(subscriberInternalStateExpected);
    });

    // 5
    test('5. check publisher `trigger("state-change", ...)` notifies subscribers `listenStateChange`  with `listen`', () => {
        // Given
        let subscriberInternalState = null;
        const publisherInternalState = {
            [STORE_STATE_VARIABLE_NAME]: VARIABLE_VALUE
        };

        // Event Bus Wrapper SUBSCRIBER
        {
            const eventBusWrapperSubscriber = decorateEventBusWrapper(
                new EventBusWrapper(eventBus)
            );
            eventBusWrapperSubscriber.varAliases = {
                [INTERNAL_STATE_VARIABLE_NAME]: {
                    listen: STORE_STATE_VARIABLE_NAME
                }
            };
            eventBusWrapperSubscriber.listenStateChange((_, state) => {
                subscriberInternalState = state;
                eventBusWrapperSubscriber.destroy();
            });
        }

        // When
        // check if filters not affect
        eventBusWrapper.trigger(EventBusEvent.EVENT_STATE_CHANGE, publisherInternalState);

        // Then
        const subscriberInternalStateExpected = {
            [INTERNAL_STATE_VARIABLE_NAME]: VARIABLE_VALUE
        };
        expect(subscriberInternalState).toEqual(subscriberInternalStateExpected);
    });

    // 6
    test('6. check publisher `trigger("state-change", ...)` notifies subscribers `listen("state-change", ...)`', () => {
        // Given
        let subscriberInternalState = null;
        const publisherInternalState = {
            [STORE_STATE_VARIABLE_NAME]: VARIABLE_VALUE
        };

        // Event Bus Wrapper SUBSCRIBER
        {
            const eventBusWrapperSubscriber = decorateEventBusWrapper(
                new EventBusWrapper(eventBus)
            );
            eventBusWrapperSubscriber.listen(EventBusEvent.EVENT_STATE_CHANGE, (_, state) => {
                subscriberInternalState = state;
                eventBusWrapperSubscriber.destroy();
            });
            // check if filters not affect
            eventBusWrapperSubscriber.varAliases = {
                [INTERNAL_STATE_VARIABLE_NAME]: {
                    listen: STORE_STATE_VARIABLE_NAME
                }
            };
        }

        // When
        eventBusWrapper.trigger(EventBusEvent.EVENT_STATE_CHANGE, publisherInternalState);

        // Then
        expect(subscriberInternalState).toEqual(publisherInternalState);
    });
});
