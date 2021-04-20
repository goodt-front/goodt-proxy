<template>
    <div class="pad-l1">
        <label class="switch switch-small"
            ><input id="limit-switch" v-model="limitEnabled" type="checkbox"/><i
        /></label>
        <label class="form-label form-label-small mar-left-3" for="limit-switch"
            >включить пагинацию</label
        >
        <div v-if="limitEnabled" class="mar-top-l1">
            <div class="row">
                <div class="col col-vmid">
                    Записей на странице:
                </div>
                <div class="col col-auto">
                    <input
                        v-model.number="limitInt"
                        class="input input-small w-100"
                        type="number"
                        min="1"
                        style="width: 5rem;"
                        @change="limitChanged()"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        limit: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            limitInt: 0,
            limitDefault: 10
        };
    },
    computed: {
        limitEnabled: {
            get() {
                return this.limitInt > 0;
            },
            set(val) {
                this.limitInt = val ? this.limitDefault : 0;
                this.limitChanged();
            }
        }
    },
    watch: {
        limit: {
            handler(val) {
                this.limitInt = val;
            },
            immediate: true
        }
    },
    methods: {
        limitChanged() {
            this.$emit('change', this.limitInt);
        }
    }
};
</script>
