<template>
    <popup :visible="show" @close="$emit('close')">
        <template v-slot:body>
            <div class="w-f3 mar-top-l1">
                <textarea
                    v-model="importedDataset"
                    class="textarea textarea-small w-100"
                    style="height: 15rem"
                    placeholder="{dataset}"
                />
                <div
                    v-if="importedDataset && importedDatasetError"
                    class="alert alert-error mar-top-3"
                >
                    <div class="alert-body text-xsmall">
                        {{ importedDatasetError }}
                    </div>
                </div>
            </div>
        </template>
        <template v-slot:footer>
            <div class="text-right">
                <button
                    class="btn btn-ghost"
                    :disabled="importedDatasetError"
                    @click="importDataset"
                >
                    Сохранить
                </button>
            </div>
        </template>
    </popup>
</template>

<script>
import Popup from '../../components/ui/Popup.vue';

export default {
    components: {
        Popup
    },
    props: {
        show: {
            type: Boolean
        }
    },
    data() {
        return {
            importedDataset: ''
        };
    },
    computed: {
        importedDatasetError() {
            try {
                JSON.parse(this.importedDataset);
                return null;
            } catch (e) {
                return e;
            }
        }
    },
    methods: {
        importDataset() {
            this.$emit('import', this.importedDataset);
            this.importedDataset = null;
        }
    }
};
</script>
