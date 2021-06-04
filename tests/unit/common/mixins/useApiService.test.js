import Vue from 'vue';
import { Elem } from '@goodt/core';
import { useApiService } from '@goodt/common/mixins';
import { BaseApiService } from '@goodt/common/services/ApiService';

const API_SERVICE_ACCESSOR = '$apiService';
const API_BASE_URL_ACCESSOR = 'apiURL';
const API_BASE_URL_VALUE = 'http://localhost:8080';

/**
 * Creates Mock Api Service Factory
 *
 * @param onDispose
 * @return {function(): BaseApiService }
 */
const mockApiServiceFactory = ({ onDispose }) => {
    const MockedApiService = class extends BaseApiService {
        apiBaseURL;

        dispose() {
            onDispose();
        }
    };

    return ({ options }) => {
        const api = new MockedApiService({ options });
        api.apiBaseURL = options.apiBaseURL;
        return api;
    };
};

const createComponentOptions = ({
    apiServiceFactory,
    name = API_SERVICE_ACCESSOR,
    apiBaseURL = API_BASE_URL_ACCESSOR,
    isEditorMode = false,
    componentOptions
}) => {
    const { mixin } = useApiService(apiServiceFactory, {
        name,
        apiBaseURL
    });

    return {
        extends: Elem,
        props: {
            isEditorMode: {
                type: Boolean,
                default: isEditorMode
            }
        },
        data: () => ({
            [API_BASE_URL_ACCESSOR]: API_BASE_URL_VALUE
        }),
        mixins: [mixin],
        ...componentOptions
    };
};

describe(`'useApiService' mixin in component`, () => {
    let vm;
    let isServiceWasDisposed;

    const apiServiceFactory = mockApiServiceFactory({
        onDispose: () => {
            isServiceWasDisposed = true;
        }
    });

    beforeEach(() => {
        isServiceWasDisposed = false;
        const componentOptions = createComponentOptions({
            apiServiceFactory
        });
        vm = new Vue(componentOptions);
    });

    // 1
    test(`'ApiService' instance SHOULD be created and accessed with default '${API_SERVICE_ACCESSOR}'`, () => {
        // Arrange
        const componentOptions = createComponentOptions({
            name: API_SERVICE_ACCESSOR,
            apiServiceFactory
        });
        vm = new Vue({
            ...componentOptions,
            // Then
            // Assert
            created() {
                expect(this[API_SERVICE_ACCESSOR]).toBeInstanceOf(BaseApiService);
            }
        });
    });

    // 2
    test(`'ApiService' instance SHOULD be created and accessed with specified accessor`, () => {
        // Arrange
        const API_SERVICE_ACCESSOR = '$myApiService';
        const componentOptions = createComponentOptions({
            apiServiceFactory,
            name: API_SERVICE_ACCESSOR
        });

        // When
        // Act
        vm = new Vue({
            ...componentOptions,
            // Then
            // Assert
            created() {
                expect(this[API_SERVICE_ACCESSOR]).toBeInstanceOf(BaseApiService);
            }
        });
    });

    // 3
    test(`'ApiService' SHOULD have in CREATED LC hook initial 'apiBaseURL' defined in '${API_SERVICE_ACCESSOR}'`, () => {
        // Arrange
        const componentOptions = createComponentOptions({
            apiServiceFactory,
            apiBaseURL: API_BASE_URL_ACCESSOR
        });
        // When
        // Act
        vm = new Vue({
            ...componentOptions,
            created() {
                // Then
                // Assert
                expect(this[API_SERVICE_ACCESSOR].apiBaseURL).toEqual(API_BASE_URL_VALUE);
            }
        });
    });

    // 4
    test(`'ApiService' '${API_BASE_URL_ACCESSOR}' change SHOULD NOT change ApiService 'apiBaseURL' in non-editor env`, (done) => {
        // Given
        // Arrange
        const API_BASE_URL_VALUE_CHANGED = null;
        const componentOptions = createComponentOptions({
            apiServiceFactory,
            apiBaseURL: API_BASE_URL_ACCESSOR,
            isEditorMode: false
        });

        // Then
        // Assert
        new Vue({
            ...componentOptions,
            created() {
                this.$watch(API_BASE_URL_ACCESSOR, () => {
                    expect(this[API_SERVICE_ACCESSOR].apiBaseURL).toEqual(API_BASE_URL_VALUE);
                    done();
                });
                this[API_BASE_URL_ACCESSOR] = API_BASE_URL_VALUE_CHANGED;
            }
        });
    });

    // 5
    test(`'${API_BASE_URL_ACCESSOR}' change SHOULD change ApiServices 'apiBaseURL' in editor env`, (done) => {
        // Arrange
        const API_BASE_URL_VALUE_CHANGED = 'https://host.com';
        const componentOptions = createComponentOptions({
            apiServiceFactory,
            isEditorMode: true,
            apiBaseURL: API_BASE_URL_ACCESSOR
        });

        // Then
        new Vue({
            ...componentOptions,
            created() {
                this.$watch(API_BASE_URL_ACCESSOR, () => {
                    expect(this[API_SERVICE_ACCESSOR].apiBaseURL).toEqual(
                        API_BASE_URL_VALUE_CHANGED
                    );
                    done();
                });
                this[API_BASE_URL_ACCESSOR] = API_BASE_URL_VALUE_CHANGED;
            }
        });
    });

    // 6
    test('Component `destroy` LC hook SHOULD dispose `ApiService` instance', () => {
        // Arrange
        let isServiceWasDisposed = false;
        const apiServiceFactory = mockApiServiceFactory({
            onDispose: () => {
                isServiceWasDisposed = true;
            }
        });
        const componentOptions = createComponentOptions({
            apiServiceFactory
        });
        vm = new Vue(componentOptions);

        // When
        // Act
        vm.$destroy();

        // Then
        // Assert
        expect(isServiceWasDisposed).toBeTruthy();
    });
});
