<template>
    <w-env-emulator v-if="config" v-bind="config.emulator" ref="emulator">
        <template #header>
            <div class="btn btn-ghost btn-small pull-right" @click="toggleTokenPopup">auth.token</div>
            <div class="btn btn-ghost btn-small pull-right" @click="toggleStorePopup">store</div>
            <div class="btn btn-ghost btn-small pull-right" @click="toggleEventBusPopup">eventbus</div>
            <div class="btn btn-small pull-right" :class="{ 'btn-ghost': isPanelsVisible }" @click="togglePanels">
                panels
            </div>
            <ui-popup :visible.sync="isTokenPopupOpen">
                <template #body>
                    <div class="w-f2">
                        <ui-textarea :value="auth.token" readonly>auth.token</ui-textarea>
                    </div>
                </template>
            </ui-popup>
            <ui-popup :visible.sync="isStorePopupOpen">
                <template #body>
                    <div class="w-f2">
                        <div class="p">
                            <ui-textarea v-model="store.stateJson" :invalid="store.error != null">
                                store.state json
                            </ui-textarea>
                            <div class="alert alert-error" v-if="store.error" @click="store.error = null">
                                <div class="alert-body text-xsmall">{{ store.error }}</div>
                            </div>
                        </div>
                        <ui-button @click="storeCommit">commit</ui-button>
                    </div>
                </template>
            </ui-popup>
            <ui-popup :visible.sync="isEventBusPopupOpen">
                <template #body>
                    <div class="w-f2">
                        <ui-input class="p" v-model="event.name">event.name</ui-input>
                        <div class="p">
                            <ui-textarea v-model="event.dataJson" :invalid="event.error != null">
                                event.data json
                            </ui-textarea>
                            <div class="alert alert-error" v-if="event.error" @click="event.error = null">
                                <div class="alert-body text-xsmall">{{ event.error }}</div>
                            </div>
                        </div>
                        <ui-button @click="eventBusTrigger">trigger</ui-button>
                    </div>
                </template>
            </ui-popup>
        </template>
        <template #default="{ initialized }">
            <div class="pad-l3" v-if="initialized">
                <w-widget-preview
                    v-for="(elem, i) in widgets"
                    v-bind="{ elem, showPanels: isPanelsVisible }"
                    :key="`${elem.type}${i}`"></w-widget-preview>
            </div>
            <div v-else class="preloader"></div>
        </template>
    </w-env-emulator>
</template>
<script>
import { Components, Managers } from '..';
import WWidgetPreview from './WidgetPreview.vue';
import WEnvEmulator from './EnvEmulator.vue';
import { Config } from './Config';

const {
    PanelUi,
    Ui: { Popup: UiPopup }
} = Components;

const {
    AuthManager,
    EB: { EventBusEvent },
    StoreManager: { store, ValueObject }
} = Managers;

/**
 * Creates elemInfo factory
 * @param {{ type:string, props:object, children:array }} options
 * @return {object}
 */
const createElemInfoFactory = ({ componentFactory }) => {
    // eslint-disable-next-line no-param-reassign

    const createElemInfo = ({ type, props, children }) => {
        const name = type.split('/').pop();
        const component = () => componentFactory({ type, name });
        const childrenElemInfos = children.map(createElemInfo);

        return { component, type, props, children: childrenElemInfos };
    };

    return createElemInfo;
};

/**
 * Transforms object prop values to VOs
 *
 * @param {Record<string, any>} record
 * @return {Record<string, ValueObject>}
 */
const toVO = (record) =>
    Object.entries(record).reduce(
        (result, [key, value]) => ({
            [key]: new ValueObject(value),
            ...result
        }),
        {}
    );

/**
 * Get current auth adapter (if set) jwt-token
 * @return {string | null}
 */
const getAuthToken = () => AuthManager.instance.adapter?.token ?? null;

export default {
    name: 'App',
    components: { WWidgetPreview, WEnvEmulator, UiPopup, ...PanelUi },
    data() {
        return {
            // eslint-disable-next-line unicorn/prevent-abbreviations
            config: null,
            isPanelsVisible: true,
            isStorePopupOpen: false,
            isEventBusPopupOpen: false,
            isTokenPopupOpen: false,
            store: {
                stateJson: '',
                error: null
            },
            event: {
                name: '',
                dataJson: '',
                error: null
            },
            auth: {
                token: null
            }
        };
    },
    computed: {
        /**
         * @return {object[]}
         */
        widgets() {
            const { widgets } = this.config;
            return widgets ? widgets.map(this.createElemInfo) : [];
        }
    },

    async created() {
        this.createElemInfo = createElemInfoFactory({ componentFactory: this.getComponentFactory() });
        await this.loadConfig();
    },

    methods: {
        async loadConfig() {
            this.config = await new Config().load();
        },
        getComponentFactory() {
            return ({ type, name }) => Promise.resolve();
        },
        /**
         * @return {import('@goodt-wcore/managers').EB.EventBus}
         */
        getEventBusInstance() {
            return this.$refs.emulator.ebi;
        },
        storeCommit() {
            try {
                const { stateJson } = this.store;
                if (stateJson) {
                    store.commit(toVO(JSON.parse(this.store.stateJson)));
                }
                this.toggleStorePopup();
                this.store.error = null;
            } catch (e) {
                this.store.error = e;
            }
        },
        eventBusTrigger() {
            try {
                const { name, dataJson } = this.event;
                if (name) {
                    this.getEventBusInstance().trigger(new EventBusEvent(name), dataJson ? JSON.parse(dataJson) : {});
                }
                this.toggleEventBusPopup();
                this.event.error = null;
            } catch (e) {
                this.event.error = e;
            }
        },
        togglePanels() {
            this.isPanelsVisible = !this.isPanelsVisible;
        },
        toggleTokenPopup() {
            this.isTokenPopupOpen = !this.isTokenPopupOpen;
            if (this.isTokenPopupOpen) {
                this.auth.token = getAuthToken();
            }
        },
        toggleStorePopup() {
            this.isStorePopupOpen = !this.isStorePopupOpen;
        },
        toggleEventBusPopup() {
            this.isEventBusPopupOpen = !this.isEventBusPopupOpen;
        }
    }
};
</script>
