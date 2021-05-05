import RouteManager from '../../src/core/managers/RouteManager';
import { EventBus, EventBusWrapper, EventBusEvent } from '../../src/core/managers/EventBus';

import {
    buildExternalStateFromInternal,
    buildInternalStateFromExternal
} from '../../src/core/mixins/useStore';

import {
    buildStoreValue,
    createStore,
    unwrapStoreValue
} from '../../src/core/managers/StoreManager';

// awkward, but valid names
const STORE_STATE_VARIABLE_NAME = 0;
const INTERNAL_STATE_VARIABLE_NAME = false;
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

describe('Event Bus Wrapper State Management Store Cross-Compatibility', () => {
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

    // Cross-compatibility
    // 1
    test('1. check publisher `triggerStateChange` with empty var aliases not affects Store state', () => {
        // Given
        eventBusWrapper.varAliases = {};
        const internalState = {
            [INTERNAL_STATE_VARIABLE_NAME]: VARIABLE_VALUE
        };
        // When
        eventBusWrapper.triggerStateChange(internalState);
        // Then
        expect(store.state).toEqual({});
    });

    // 2
    test('2. check publisher `triggerStateChange` with var aliases `trigger` updates Store state', () => {
        // Given
        eventBusWrapper.varAliases = {
            [INTERNAL_STATE_VARIABLE_NAME]: {
                trigger: STORE_STATE_VARIABLE_NAME
            }
        };
        const publisherInternalState = {
            [INTERNAL_STATE_VARIABLE_NAME]: VARIABLE_VALUE
        };

        const subscriberVarAliases = {
            [INTERNAL_STATE_VARIABLE_NAME]: {
                listen: STORE_STATE_VARIABLE_NAME
            }
        };

        // When
        eventBusWrapper.triggerStateChange(publisherInternalState);

        // Then
        const subscriberInternalState = buildInternalStateFromExternal(
            store.state,
            subscriberVarAliases,
            unwrapStoreValue
        );

        expect(subscriberInternalState).toEqual(publisherInternalState);
    });

    // 3
    test('3. check publisher `trigger("state-change", ...)` updates Store state', () => {
        // Given
        const publisherInternalState = {
            [STORE_STATE_VARIABLE_NAME]: VARIABLE_VALUE
        };

        const subscriberVarAliases = {
            [INTERNAL_STATE_VARIABLE_NAME]: {
                listen: STORE_STATE_VARIABLE_NAME
            }
        };

        // When
        eventBusWrapper.trigger(EventBusEvent.EVENT_STATE_CHANGE, publisherInternalState);

        // Then
        const subscriberInternalState = buildInternalStateFromExternal(
            store.state,
            subscriberVarAliases,
            unwrapStoreValue
        );

        expect(subscriberInternalState).toEqual({
            [INTERNAL_STATE_VARIABLE_NAME]: VARIABLE_VALUE
        });
    });

    // 4
    test('4. check publisher `store.commit` with var aliases `trigger` notifies `listenStateChange` subscribers with var aliases `listen`', () => {
        // Given
        // Publisher
        const publisherInternalState = {
            [INTERNAL_STATE_VARIABLE_NAME]: VARIABLE_VALUE
        };

        const varAliases = {
            [INTERNAL_STATE_VARIABLE_NAME]: {
                trigger: STORE_STATE_VARIABLE_NAME
            }
        };
        const externalStateToCommit = buildExternalStateFromInternal(
            publisherInternalState,
            varAliases,
            buildStoreValue
        );

        // Subscriber
        let subscriberInternalState = null;
        eventBusWrapper.varAliases = {
            [INTERNAL_STATE_VARIABLE_NAME]: {
                listen: STORE_STATE_VARIABLE_NAME
            }
        };
        eventBusWrapper.listenStateChange((_, state) => {
            subscriberInternalState = state;
        });

        // When
        store.commit(externalStateToCommit);

        // Then
        expect(subscriberInternalState).toEqual(publisherInternalState);
    });

    // 5
    test('5. check publisher `store.commit` with var aliases `trigger` notifies `listen("state-change", ...)` subscribers', () => {
        // Given
        // Publisher
        const publisherInternalState = {
            [INTERNAL_STATE_VARIABLE_NAME]: VARIABLE_VALUE
        };
        const publisherVarAliases = {
            [INTERNAL_STATE_VARIABLE_NAME]: {
                trigger: STORE_STATE_VARIABLE_NAME
            }
        };
        const publisherExternalStateToCommit = buildExternalStateFromInternal(
            publisherInternalState,
            publisherVarAliases,
            buildStoreValue
        );

        // Subscriber
        let subscriberInternalState = null;
        eventBusWrapper.listen(EventBusEvent.EVENT_STATE_CHANGE, (_, state) => {
            subscriberInternalState = state;
        });

        // When
        store.commit(publisherExternalStateToCommit);

        // Then
        expect(subscriberInternalState).toEqual({
            [STORE_STATE_VARIABLE_NAME]: VARIABLE_VALUE
        });
    });
});
