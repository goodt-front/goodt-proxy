<template>
    <env-emulator class="w-100 h-100" v-bind="envEmulatorCfg">
        <template #default="{ initialized }">
            <div class="pad-l3">
                <div class="p">
                    <select class="select select-small" v-model="widgetSelected">
                        <option :value="null"></option>
                        <option v-for="w in widgets" :key="w.type" :value="w">{{ w.type }}</option>
                    </select>
                </div>

                <widget-preview
                    v-bind="{ elem: widgetSelected }"
                    v-if="widgetSelected"
                ></widget-preview>
            </div>
        </template>
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
            widgetSelected: null,
            widgets: [
                {
                    component: () => import('./test/ElemContainer/ElemContainer.vue'),
                    type: 'ElemContainer',
                    props: {},
                    children: [
                        {
                            component: () => import('./test/ElemContainer/ElemContainer.vue'),
                            type: 'ElemContainer',
                            props: { slot: '', cssClass: ['pad-l3'] },
                            children: []
                        },
                        {
                            component: () => import('./test/ElemContainer/ElemContainer.vue'),
                            type: 'ElemContainer',
                            props: { slot: 'right', cssClass: ['pad-l3'] },
                            children: []
                        }
                    ]
                },
                {
                    component: () => import('./test/ElemImage/ElemImage.vue'),
                    type: 'ElemImage',
                    props: { cssClass: ['pad-l3'], cssStyle: { border: '10px dashed #ccc' } },
                    children: []
                },
                {
                    component: () => import('./test/ElemDatepicker/ElemDatepicker.vue'),
                    type: 'ElemDatepicker',
                    props: { cssClass: ['bg-green', 'pad-l3'] },
                    children: []
                },
                {
                    component: () => import('./test/ElemDatepickerSm/ElemDatepickerSm.vue'),
                    type: 'ElemDatepickerSm',
                    props: { cssClass: ['bg-green', 'pad-l3'] },
                    children: []
                },
                {
                    component: () => import('./test/ElemNavigate/ElemNavigate.vue'),
                    type: 'ElemNavigate',
                    props: {},
                    children: []
                },
                {
                    component: () => import('./test/ElemWithTransport/ElemWithTransport.vue'),
                    type: 'ElemWithTransport',
                    props: {},
                    children: []
                }
            ]
        };
    }
};
</script>
