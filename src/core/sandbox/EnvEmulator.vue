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
        <slot v-bind="{ authenticated }"></slot>
        <popup :visible.sync="showConsole" :dialog="consolePopupDialog">
            <template #body>
                <div class="p">
                    <code>$state</code>
                    <pre class="text-xsmall">{{ state }}</pre>
                </div>
                <div class="p">
                    <code>eventBus.state</code>
                    <pre class="text-xsmall">{{ ebState }}</pre>
                </div>
                <div>
                    <code>authUserProfile</code>
                    <pre class="text-xsmall">{{ authUserProfile }}</pre>
                </div>
            </template>
        </popup>
        <portal-target :name="portalName" multiple></portal-target>
    </div>
</template>
<script>
import { PortalTarget } from 'portal-vue';
import { ElemEvent, Const } from './../index';
import { Popup } from '../components/ui/index';
import {
    AuthManager,
    ConstManager,
    FileManager,
    EB,
    RouteManager,
    StateManager
} from './../managers/index';

const { store } = StateManager;
const { EventBus, EventBusEvent } = EB;

const MODULES = {};
const MODULE_KEYS = {
    AUTH_MANAGER: 'AuthManager',
    CONST_MANAGER: 'ConstManager',
    FILE_MANAGER: 'FileManager',
    ROUTE_MANAGER: 'RouteManager',
    STATE_MANAGER: 'StateManager',
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
                return { ...Const };
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
        }
    },
    data() {
        return {
            authUserProfile: {},
            /** @type {EventBus} */
            ebi: null,
            portalName: Const.PORTAL_TARGET_NAME_POPUP,
            authenticated: false,
            showConsole: false,
            consolePopupDialog: {
                class: {},
                style: { width: '100%', 'max-width': '1000px' }
            }
        };
    },
    computed: {
        /** @return {Object} */
        state() {
            return store.state;
        },
        /** @return {Object} */
        ebState() {
            let { ebi } = this;
            return ebi ? ebi.getState(EventBus.STATE_SCOPE_PUBLIC) : null;
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
        this.initConst();
        this.initAuthManager();
        this.initConstManager();
        this.initFileManager();
        this.initRouteManager();
        this.initStateManager();
        this.initEventBus();
    },
    methods: {
        /**
         * Registers core module
         * @param {String} key
         * @param {Object} m
         */
        registerModule(key, m) {
            MODULES[key] = m;
        },
        /**
         * Init Constants
         */
        initConst() {
            const { envConstants } = this;
            for (let k in Const) {
                if (Object.prototype.hasOwnProperty.call(envConstants, k)) {
                    Const[k] = envConstants[k];
                }
            }
            this.registerModule(MODULE_KEYS.CONST, Const);
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
                    instance.adapter.getUserProfile().then(p => (this.authUserProfile = p));
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
            const dispose = instance.onBrowse(() => instance.select(demoFiles));
            this.$on('hook:destroyed', dispose);
            this.registerModule(MODULE_KEYS.FILE_MANAGER, FileManager);
        },
        /**
         * Init route manager
         */
        initRouteManager() {
            this.registerModule(MODULE_KEYS.ROUTE_MANAGER, RouteManager);
        },
        /**
         * Init state manager
         */
        initStateManager() {
            this.registerModule(MODULE_KEYS.STATE_MANAGER, StateManager);
        },
        /**
         * Init eventbus
         */
        initEventBus() {
            const ebi = new EventBus();
            // DI
            const handler = e => e.instance.setEventBus(ebi);
            this.$on('hook:created', () => {
                document.addEventListener(ElemEvent.MOUNTED, handler);
            });
            this.$on('hook:destroyed', () => {
                document.removeEventListener(ElemEvent.MOUNTED, handler);
            });
            this.ebi = ebi;
            this.registerModule(MODULE_KEYS.EVENT_BUS, {
                instance: ebi,
                EventBusEvent,
                ValueObject: EB.ValueObject
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
