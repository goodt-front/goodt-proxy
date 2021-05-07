<template>
    <div>
        <template v-if="datasetName">
            <div class="row row-collapse">
                <div class="col col-10-12">
                    <div
                        class="btn btn-small btn-ghost shadow text-truncate"
                        :title="datasetName"
                        @click="isEditorOpen = true"
                    >
                        <div class="icon mar-right-2">
                            <i class="mdi mdi-database" />
                        </div>
                        <div class="text-truncate">
                            {{ datasetName }}
                        </div>
                    </div>
                </div>
                <div class="col col-vmid text-right">
                    <div class="btn btn-icon btn-small" @click="onDeleteQueryClick">
                        <div class="icon">
                            <i class="mdi mdi-delete" />
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="row row-gap-3">
                <div class="col">
                    <div
                        class="btn btn-small btn-primary text-truncate w-100"
                        @click="isEditorOpen = true"
                    >
                        Настроить источник данных
                    </div>
                </div>
                <div class="col col-auto">
                    <button
                        class="btn btn-small btn-primary btn-icon"
                        @click="showDatasetImportPopup = true"
                    >
                        <div class="icon">
                            <i class="mdi mdi-database-import" />
                        </div>
                    </button>
                </div>
            </div>
        </template>

        <portal :to="portalTarget">
            <query-editor
                v-if="isEditorOpen"
                :init-query="query"
                :init-dimension-list="dimensionList"
                :init-limit="limit"
                @close="onEditorClose"
                @save="onEditorSave"
            />
        </portal>

        <import-dataset-popup
            :show="showDatasetImportPopup"
            @close="showDatasetImportPopup = false"
            @import="importDataset"
        />
    </div>
</template>
<script>
import { Portal } from 'portal-vue';
import QueryEditor from './dremio/QueryEditor.vue';
import ImportDatasetPopup from './dremio/ImportDatasetPopup.vue';
import { Query } from '../dremio';
import { Panel } from '../Panel';
import Const from '../Const';

const { KEY } = Query;

export default {
    components: {
        Portal,
        QueryEditor,
        ImportDatasetPopup
    },
    extends: Panel,
    data() {
        return {
            $meta: { name: 'Источник', icon: 'database' },
            isEditorOpen: false,
            showDatasetImportPopup: false,
            portalTarget: Const.PORTAL_TARGET_NAME_POPUP
        };
    },
    computed: {
        query() {
            return this.props.dremio ? this.props.dremio.query : null;
        },
        dimensionList() {
            return this.props.dremio ? this.props.dremio.dimensionList : {};
        },
        limit() {
            return this.props.dremio ? this.props.dremio.limit : 0;
        },
        datasetName() {
            if (!this.query) {
                return null;
            }
            const from = this.query[KEY.FROM];
            return from[from.length - 1];
        }
    },
    methods: {
        onEditorClose() {
            this.isEditorOpen = false;
        },
        onEditorSave({ query, dimensionList, limit }) {
            this.props.dremio = { query, dimensionList, limit };
            this.propChanged('dremio');
            this.isEditorOpen = false;
        },
        importDataset(val) {
            this.props.dremio = JSON.parse(val);
            this.propChanged('dremio');
            this.showDatasetImportPopup = false;
        },
        onDeleteQueryClick() {
            this.props.dremio = null;
            this.propChanged('dremio');
        }
    }
};
</script>
