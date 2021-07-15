import Vue from 'vue';
import { Elem } from '@goodt-wcore/core';
import { useApiService } from '@goodt-common/mixins';
import { BaseApiService } from '@goodt-common/api';
import { wrapTestWithAaa } from '../../utils';

const test = wrapTestWithAaa(it);

const API_SERVICE_ACCESSOR = '$apiService';
const API_BASE_URL_ACCESSOR = 'apiURL';
const API_BASE_URL_VALUE = 'http://localhost:8080';

/**
 * Creates Mock Api Service Factory
 *
 * @param onDispose
 * @return {function(): BaseApiService }
 */
const mockApiServiceFactory = () => {
    const disposeSpy = jest.spyOn(BaseApiService.prototype, 'dispose').mockImplementation(() => {});

    jest.spyOn(BaseApiService.prototype, 'apiBaseURL', 'get').mockImplementation(function() {
        return this._apiBaseURL;
    });
    jest.spyOn(BaseApiService.prototype, 'apiBaseURL', 'set').mockImplementation(function(value) {
        this._apiBaseURL = value;
    });

    return [
        ({ options }) => {
            const baseApi = new BaseApiService({ options });
            baseApi.apiBaseURL = options.apiBaseURL;
            return baseApi;
        },
        disposeSpy
    ];
};

/**
 *
 * @param apiServiceFactory
 * @param name
 * @param apiBaseURL
 * @param isEditorMode
 * @param componentOptions
 * @return {*&{mixins: IApiServiceMixin[], extends: IElemComponentOptionsInternal, data: (function(): {'[API_BASE_URL_ACCESSOR]': string}), props: {isEditorMode: {default: boolean, type: BooleanConstructor}}}}
 */
const createComponentOptions = ({
    apiServiceFactory,
    name = API_SERVICE_ACCESSOR,
    apiBaseURL = API_BASE_URL_ACCESSOR,
    isEditorMode = false
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
        mixins: [mixin]
    };
};

describe(`'useApiService' mixin in component`, () => {
    let apiServiceFactory;
    let disposeSpy;

    beforeAll(() => {
        [apiServiceFactory, disposeSpy] = mockApiServiceFactory();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    // 1
    test(`'ApiService' instance SHOULD be created and accessed with default '${API_SERVICE_ACCESSOR}'`, (done, {
        arrange,
        act,
        assert
    }) => {
        // Arrange
        arrange(() => {
            const componentOptions = createComponentOptions({
                name: API_SERVICE_ACCESSOR,
                apiServiceFactory
            });

            return { componentOptions };
        });

        act(({ componentOptions }, assert) => {
            new Vue({
                ...componentOptions,
                // Then
                // Assert
                created() {
                    assert({ $apiService: this[API_SERVICE_ACCESSOR] });
                }
            });
        });

        assert(({ $apiService }) => {
            expect($apiService).toBeInstanceOf(BaseApiService);
        });
    });

    // 2
    test(`'ApiService' instance SHOULD be created and accessed with specified accessor`, (done, {
        arrange,
        act,
        assert
    }) => {
        // Arrange
        const API_SERVICE_ACCESSOR = '$myApiService';
        arrange(() => {
            const componentOptions = createComponentOptions({
                apiServiceFactory,
                name: API_SERVICE_ACCESSOR
            });
            return { componentOptions };
        });

        // When
        act(({ componentOptions }, next) => {
            new Vue({
                ...componentOptions,
                // Then
                // Assert
                created() {
                    next({ $apiService: this[API_SERVICE_ACCESSOR] });
                }
            });
        });

        assert(({ $apiService }) => {
            expect($apiService).toBeInstanceOf(BaseApiService);
        });
    });

    // 3
    test(`'ApiService' SHOULD have in CREATED LC hook initial 'apiBaseURL' defined in '${API_SERVICE_ACCESSOR}'`, (done, {
        arrange,
        act,
        assert
    }) => {
        // Arrange
        arrange(() => {
            const componentOptions = createComponentOptions({
                apiServiceFactory,
                apiBaseURL: API_BASE_URL_ACCESSOR
            });

            return { componentOptions };
        });

        act(({ componentOptions }, next) => {
            new Vue({
                ...componentOptions,
                created() {
                    next({ apiBaseURL: this[API_SERVICE_ACCESSOR].apiBaseURL });
                }
            });
        });

        assert(({ apiBaseURL }) => {
            expect(apiBaseURL).toEqual(API_BASE_URL_VALUE);
        });
    });

    // 4
    test(`'ApiService' '${API_BASE_URL_ACCESSOR}' change SHOULD NOT change ApiService 'apiBaseURL' in non-editor env`, (done, {
        arrange,
        act,
        assert
    }) => {
        arrange(() => {
            const componentOptions = createComponentOptions({
                apiServiceFactory,
                apiBaseURL: API_BASE_URL_ACCESSOR,
                isEditorMode: false
            });
            return { componentOptions };
        });

        act(({ componentOptions }, assert) => {
            new Vue({
                ...componentOptions,
                created() {
                    this.$watch(API_BASE_URL_ACCESSOR, () => {
                        assert({ apiBaseURL: this[API_SERVICE_ACCESSOR].apiBaseURL });
                    });
                    this[API_BASE_URL_ACCESSOR] = null;
                }
            });
        });

        assert(({ apiBaseURL }) => {
            expect(apiBaseURL).toEqual(API_BASE_URL_VALUE);
        });
    });

    // 5
    test(`'${API_BASE_URL_ACCESSOR}' change SHOULD change ApiServices 'apiBaseURL' in editor env`, (done, {
        arrange,
        act,
        assert
    }) => {
        const API_BASE_URL_VALUE_CHANGED = 'https://host.com';
        arrange(() => {
            const componentOptions = createComponentOptions({
                apiServiceFactory,
                isEditorMode: true,
                apiBaseURL: API_BASE_URL_ACCESSOR
            });

            return { componentOptions };
        });

        act(({ componentOptions }, assert) => {
            new Vue({
                ...componentOptions,
                created() {
                    this.$watch(API_BASE_URL_ACCESSOR, () => {
                        assert({ apiBaseURL: this[API_SERVICE_ACCESSOR].apiBaseURL });
                    });
                    this[API_BASE_URL_ACCESSOR] = API_BASE_URL_VALUE_CHANGED;
                }
            });
        });

        assert(({ apiBaseURL }) => {
            expect(apiBaseURL).toEqual(API_BASE_URL_VALUE_CHANGED);
        });
    });

    // 6
    test('Component `destroy` LC hook SHOULD dispose `ApiService` instance', (done, {
        arrange,
        act,
        assert
    }) => {
        arrange(() => {
            //const sayMyName = jest.fn();
            //apiServiceFactory = jest.fn();
            const componentOptions = createComponentOptions({
                apiServiceFactory
            });

            return { componentOptions };
        });

        act(({ componentOptions }) => {
            const vm = new Vue(componentOptions);
            vm.$destroy();
            return {};
        });

        assert(() => {
            expect(disposeSpy).toHaveBeenCalled();
        });
    });
});
