<template>
    <env-emulator class="w-100 h-100" v-bind="envEmulatorCfg">
        <div class="pad-l3">
            <div class="p">
                <select class="select select-small" v-model="widgetPreviewCfg">
                    <option :value="null"></option>
                    <option v-for="w in widgets" :key="w.type" :value="w">{{ w.type }}</option>
                </select>
            </div>
            <widget-preview v-bind="widgetPreviewCfg"></widget-preview>
        </div>
    </env-emulator>
</template>
<script>
import { Sandbox } from '../core';

const { EnvEmulator, WidgetPreview } = Sandbox;

export default {
    name: 'App',
    components: { EnvEmulator, WidgetPreview },
    data() {
        return {
            envEmulatorCfg: {
                authAdapter: {
                    name: 'KeycloakDremio',
                    config: {
                        url: 'https://test.lukoil-hrportal.ru/keycloak/auth/',
                        realm: 'lukoil',
                        clientId: 'vkp-dev'
                    }
                },
                envConstants: { DREMIO_API_URL: 'https://goodt-dev.goodt.me:4400/' },
                appConstants: { '%TEST%': 'https://vuejs.org/images/logo.png' }
            },
            widgetPreviewCfg: null,
            widgets: [
                {
                    elem: import('./test/ElemImage/ElemImage.vue'),
                    type: 'ElemImage',
                    props: { cssClass: ['pad-l3'], cssStyle: { border: '10px dashed #ccc' } }
                },
                {
                    elem: import('./test/ElemDatepicker/ElemDatepicker.vue'),
                    type: 'ElemDatepicker',
                    props: { cssClass: ['bg-green', 'pad-l3'] }
                },
                {
                    elem: import('./test/ElemDatepickerSm/ElemDatepickerSm.vue'),
                    type: 'ElemDatepickerSm',
                    props: { cssClass: ['bg-green', 'pad-l3'] }
                },
                {
                    elem: import('./test/ElemNavigate/ElemNavigate.vue'),
                    type: 'ElemNavigate',
                    props: {}
                }
            ]
        };
    }
};
</script>
