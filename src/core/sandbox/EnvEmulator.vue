<template>
    <div>
        <div class="tile">
            <div class="row row-collapse">
                <div class="col col-vmid">
                    <slot name="header"></slot>
                </div>
                <div class="col col-auto col-vmid">
                    <div class="btn btn-ghost btn-small" @click="toggleConsole">$env</div>
                </div>
            </div>
        </div>
        <slot v-bind="{ authenticated, initialized }"></slot>
        <popup :visible.sync="showConsole" :dialog="consolePopupDialog">
            <template #body>
                <div class="p">
                    <code>store.state</code>
                    <pre class="text-xsmall">{{ storeState }}</pre>
                </div>
                <div class="p">
                    <code>RouteManager.route</code>
                    <pre class="text-xsmall">{{ routeManagerRoute }}</pre>
                </div>
                <div>
                    <code>authAdapterUserProfile</code>
                    <pre class="text-xsmall">{{ authAdapterUserProfile }}</pre>
                </div>
            </template>
        </popup>
        <portal-target :name="portalName" multiple></portal-target>
    </div>
</template>
<script>
import { PortalTarget } from 'portal-vue';
// eslint-disable-next-line import/no-cycle
import { ElemEvent, Const as Globals } from '..';
import { Popup } from '../components/ui';
import {
    AuthManager,
    ConstManager,
    FileManager,
    EB,
    RouteManager,
    StoreManager
} from '../managers';

const { store } = StoreManager;
const { EventBus, EventBusEvent } = EB;

const MODULES = {};
const MODULE_KEYS = {
    AUTH_MANAGER: 'AuthManager',
    CONST_MANAGER: 'ConstManager',
    FILE_MANAGER: 'FileManager',
    ROUTE_MANAGER: 'RouteManager',
    STORE_MANAGER: 'StoreManager',
    CONST: 'Const',
    EVENT_BUS: 'EB'
};

export default {
    name: 'EnvEmulator',
    components: { PortalTarget, Popup },
    props: {
        authAdapter: {
            type: Object,
            default() {
                return { name: 'Simple', config: {} };
            }
        },
        envConstants: {
            type: Object,
            default() {
                return { ...Globals };
            }
        },
        appConstants: {
            type: Object,
            default() {
                return {};
            }
        },
        modulesExportEnabled: {
            type: Boolean,
            default: true
        },
        modulesExportNS: {
            type: String,
            default: '$core',
            validator(v) {
                return !!v.length;
            }
        },
        /** @type {import('vue').PropOptions<import('../managers/FileManager').FileInfo[]>} */
        demoFiles: {
            type: Array,
            default() {
                return [
                    {
                        hash: '1',
                        name: 'test',
                        type: 'image/png',
                        size: 1,
                        url: 'https://vuejs.org/images/logo.png'
                    }
                ];
            }
        },
        /** @type {import('vue').PropOptions<import('../managers/RouteManager').RouteObject>} */
        demoRoute: {
            type: Object,
            default() {
                return {
                    path: '/',
                    query: {},
                    meta: {}
                };
            }
        }
    },
    data() {
        return {
            authAdapterUserProfile: {},
            /** @type {EventBus} */
            ebi: null,
            portalName: Globals.PORTAL_TARGET_NAME_POPUP,
            authenticated: false,
            showConsole: false,
            consolePopupDialog: {
                class: {},
                style: { width: '100%', 'max-width': '1000px' }
            },
            initialized: false
        };
    },
    computed: {
        /** @return {Record<string, any>} */
        storeState() {
            return store.state;
        },
        /** @return {import('../managers/RouteManager').RouteObject} */
        routeManagerRoute() {
            return RouteManager.instance.route;
        }
    },
    watch: {
        modulesExportEnabled: {
            handler() {
                this.exportModules();
            },
            immediate: true
        }
    },
    created() {
        Promise.all([
            this.initConst(),
            this.initEventBus(),
            this.initAuthManager(),
            this.initConstManager(),
            this.initFileManager(),
            this.initRouteManager(),
            this.initStoreManager()
        ]).finally(() => (this.initialized = true));
    },
    methods: {
        /**
         * Registers core module
         * @param {string} key
         * @param {Record<string, any>} m
         */
        registerModule(key, m) {
            MODULES[key] = m;
        },
        /**
         * Init Constants
         */
        initConst() {
            const { envConstants } = this;
            // eslint-disable-next-line no-restricted-syntax
            for (const constant in Globals) {
                if (Object.prototype.hasOwnProperty.call(envConstants, constant)) {
                    Globals[constant] = envConstants[constant];
                }
            }

            this.registerModule(MODULE_KEYS.CONST, Globals);
        },
        /**
         * Init auth manager
         */
        initAuthManager() {
            const { name, config } = this.authAdapter;
            const { instance } = AuthManager;
            instance
                .init(name, config)
                .then(() => {
                    const { adapter } = instance;
                    return adapter.authenticated ? true : adapter.login();
                })
                .then(() => {
                    this.authenticated = true;
                    instance.adapter.getUserProfile().then((p) => {
                        this.authAdapterUserProfile = p;
                    });
                });
            this.registerModule(MODULE_KEYS.AUTH_MANAGER, AuthManager);
        },
        /**
         * Init const manager
         */
        initConstManager() {
            const { appConstants } = this;
            const mi = ConstManager.instance;
            mi.setConstantsHash(appConstants);
            this.registerModule(MODULE_KEYS.CONST_MANAGER, ConstManager);
        },
        /**
         * Init file manager
         */
        initFileManager() {
            const { demoFiles } = this;
            const { instance } = FileManager;
            const dispose = instance.onBrowse(({ resolve }) => {
                // eslint-disable-next-line no-alert
                const r = window.confirm('Select demo files?');
                resolve(r ? demoFiles : []);
            });
            this.$on('hook:destroyed', dispose);
            this.registerModule(MODULE_KEYS.FILE_MANAGER, FileManager);
        },
        /**
         * Init route manager
         */
        initRouteManager() {
            const { demoRoute } = this;
            const { instance } = RouteManager;
            const dispose = instance.onNavigate(({ path, query }) =>
                instance.setRoute({ path, query, meta: {} })
            );
            instance.setRoute(demoRoute);
            this.$on('hook:destroyed', dispose);
            this.registerModule(MODULE_KEYS.ROUTE_MANAGER, RouteManager);
        },
        /**
         * Init state manager
         */
        initStoreManager() {
            this.registerModule(MODULE_KEYS.STORE_MANAGER, StoreManager);
        },
        /**
         * Init eventbus
         */
        initEventBus() {
            const ebi = new EventBus(store, RouteManager.instance);
            // DI
            const handler = (e) => e.instance.setEventBus(ebi);
            this.$on('hook:created', () => document.addEventListener(ElemEvent.MOUNTED, handler));
            this.$on('hook:destroyed', () =>
                document.removeEventListener(ElemEvent.MOUNTED, handler)
            );
            this.ebi = ebi;
            this.registerModule(MODULE_KEYS.EVENT_BUS, {
                instance: ebi,
                EventBusEvent
            });
        },
        /**
         * Exports regitered modules
         */
        exportModules() {
            const { modulesExportEnabled, modulesExportNS } = this;
            if (!modulesExportEnabled) {
                return;
            }
            window[modulesExportNS] = MODULES;
            console.info(
                `[${this.$options.name}]`,
                `modules export enabled -> window.${modulesExportNS}`
            );
        },
        /**
         * Toggles the console
         */
        toggleConsole() {
            this.showConsole = !this.showConsole;
        }
    }
};
</script>
