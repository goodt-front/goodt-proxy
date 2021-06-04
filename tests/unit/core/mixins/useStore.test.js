import Vue from 'vue';
import { Elem } from '@goodt/core';
import { createStore } from '@goodt/core/managers/StoreManager';
import { useStore, buildExternalStateFromInternal } from '@goodt/core/mixins/useStore';

// awkward, but valid names
const STORE_STATE_VARIABLE_NAME = 0;
const INTERNAL_STATE_VARIABLE_NAME = false;
const VARIABLE_VALUE = '1';

/**
 * @dictionary
 *
 * Observer – Elem-based widget observing Global State
 * Mutator – Elem-based widget mutating Global State
 * Store Local State – Elem-based widget Store local State linked with partial of Store Global State
 * Store Global State – Store Global State
 */

describe('useStore() mixin with { extend: Elem } component', () => {
    let store;
    let vm;

    beforeEach(() => {
        store = createStore();

        const { mixin } = useStore({
            store: () => store
        });

        vm = new Vue({
            extends: Elem,
            mixins: [mixin]
        });
    });

    // 1
    test('Observer with empty `varAliases` SHOULD NOT OBSERVE Store Global State', () => {
        // Arrange
        // Given
        const globalState = buildExternalStateFromInternal(
            {
                [STORE_STATE_VARIABLE_NAME]: VARIABLE_VALUE
            },
            null
        );
        // When
        store.replace(globalState);

        // Then
        expect(vm.$storeState).toEqual({});
    });

    // 2
    test('Observer with defined `varAliases` SHOULD OBSERVE Store Global State', () => {
        // Given
        // Arrange
        const globalState = buildExternalStateFromInternal(
            {
                [STORE_STATE_VARIABLE_NAME]: VARIABLE_VALUE
            },
            null
        );
        vm.props.varAliases = {
            [INTERNAL_STATE_VARIABLE_NAME]: {
                listen: STORE_STATE_VARIABLE_NAME
            }
        };

        // When
        // Act
        store.replace(globalState);

        // Then
        // Assert
        const observerLocalStateExpected = {
            [INTERNAL_STATE_VARIABLE_NAME]: VARIABLE_VALUE
        };
        expect(vm.$storeState).toEqual(observerLocalStateExpected);
    });

    // 3
    test('Mutator with empty `varAliases` SHOULD NOT COMMIT to Store Global State', () => {
        // Given
        // Arrange
        const mutatorLocalState = {
            [INTERNAL_STATE_VARIABLE_NAME]: VARIABLE_VALUE
        };
        vm.props.varAliases = {};

        // When
        // Act
        vm.$storeCommit(mutatorLocalState);

        // Then
        // Assert
        expect(store.state).toEqual({});
    });

    // 5
    test('Mutator with defined `varAliases` SHOULD COMMIT to Store Global State', () => {
        // Given
        // Arrange
        const mutatorLocalState = {
            [INTERNAL_STATE_VARIABLE_NAME]: VARIABLE_VALUE
        };
        vm.props.varAliases = {
            [INTERNAL_STATE_VARIABLE_NAME]: {
                trigger: STORE_STATE_VARIABLE_NAME
            }
        };
        const globalStateExpected = buildExternalStateFromInternal(
            mutatorLocalState,
            vm.props.varAliases
        );
        // When
        // Act
        vm.$storeCommit(mutatorLocalState);

        // Then
        // Assert
        expect(store.state).toEqual(globalStateExpected);
    });
});
