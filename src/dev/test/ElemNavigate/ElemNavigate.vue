<template>
    <div :class="cssClass" :style="cssStyle">
        <div class="p">
            <div class="btn btn-primary" @click="onClickEB">eventBusWrapper</div>
            <div class="btn btn-primary" @click="onClickRM">RouteManager</div>
        </div>
        <div class="row">
            <div class="col">
                eventBusWrapper:
                <pre class="text-small">{{ routeCurrent }}</pre>
            </div>
            <div class="col">
                RouteManager:
                <pre class="text-small">{{ $routeCurrent }}</pre>
            </div>
        </div>
    </div>
</template>
<script>
import { Elem } from '../../../core/index';

const descriptor = () => ({
    props: {},
    vars: {}
});

export default {
    extends: Elem,
    data() {
        return {
            routeCurrent: {},
            descriptor: descriptor()
        };
    },
    methods: {
        isChildAllowed(type) {
            return false;
        },
        getSlotNames() {
            return [];
        },
        getRandomRoute() {
            const r = Math.random()
                .toString(16)
                .slice(2);
            return { path: `/${r}`, query: { foo: Math.random() } };
        },
        onClickEB() {
            const { path, query } = this.getRandomRoute();
            this.eventBusWrapper.triggerNavigate({ url: path, params: query });
        },
        onClickRM() {
            this.$routeNavigate(this.getRandomRoute());
        },
        subscribe() {
            this.eventBusWrapper.listenNavigate((e, data) => (this.routeCurrent = data));
        }
    }
};
</script>
