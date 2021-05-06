import Vue from 'vue';
import { Elem } from '@goodt/core';
import { useTransport } from '@goodt/core/mixins/useTransport';
import { TransportFactoryMap } from '@goodt/core/net';

const TRANSPORT_OPTIONS = {
    optionName: 'optionValue'
};

/**
 * Add Fake Transport
 *
 * @param onDispose
 * @return {{MockTransportSymbol: symbol}}
 */
const mockTransportConstructorFactory = ({ onDispose }) => {
    const MockTransportCtor = class {
        constructor(options) {
            this.options = options;
        }
        dispose() {
            onDispose();
        }
    };
    const MockTransportSymbol = Symbol('MockTransportSymbol');
    TransportFactoryMap.set(MockTransportSymbol, (options) => new MockTransportCtor(options));

    return {
        MockTransportSymbol
    };
};

describe('useTransport mixin used in component with option { extend: Elem }', () => {
    let vm;
    let isTransportWasDisposed;
    const transportAccessorName = undefined;
    const options = function() {
        return this.transportOptions;
    };

    const { MockTransportSymbol } = mockTransportConstructorFactory({
        onDispose: () => {
            isTransportWasDisposed = true;
        }
    });

    const beforeEachFn = () => {
        isTransportWasDisposed = false;

        const { mixin } = useTransport(MockTransportSymbol, {
            name: transportAccessorName,
            options
        });

        vm = new Vue({
            extends: Elem,
            data: () => ({
                transportOptions: TRANSPORT_OPTIONS
            }),
            mixins: [mixin]
        });
    };

    beforeEach(beforeEachFn);

    // 1
    test('`Transport` instance SHOULD be accessed with `$transport`', () => {
        // Assert
        // Then
        expect(vm.$transport).not.toBeNull();
    });

    // 2
    test('`Transport` instance SHOULD have specified options', () => {
        // Then
        expect(vm.$transport.options).toEqual(options.call(vm));
    });

    // 3
    test('`Transport` instance SHOULD dispose resources on destroy LC hook', () => {
        // When
        // Act
        // call getter for transport instance creation
        if (vm.$transport == null) {
            return;
        }
        vm.$destroy();
        // Then
        // Assert
        expect(isTransportWasDisposed).toBeTruthy();
    });
});
