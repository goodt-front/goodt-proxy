<template>
    <div>
        <control-layout :col-size="colSize">
            <template #label>
                <!-- 
                @slot label slot
                -->
                <slot />
            </template>
            <template #control>
                <div class="form-control form-control-icon-right w-12-12">
                    <input-autocomplete
                        class="w-12-12"
                        :class="controlCl"
                        size="small"
                        v-bind="inputOptions"
                        v-on="listeners"
                    />
                    <div class="icon">
                        <i class="mdi mdi-folder cursor-pointer color-grey" @click="browse" />
                    </div>
                </div>
            </template>
        </control-layout>
    </div>
</template>
<script>
import { InputAutocomplete } from 'goodteditor-ui';
import { ControlMixin, getConstants } from './utils';
import FileManager from '../../managers/FileManager';

/**
 * environment required
 */
export default {
    components: { InputAutocomplete },
    mixins: [ControlMixin],
    props: {
        /**
         * Suggested options Array[String]
         */
        options: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    computed: {
        inputOptions() {
            const { options = [], ...rest } = this.attrs;
            return { ...rest, options: [...this.options, ...getConstants()] };
        }
    },
    methods: {
        browse() {
            FileManager.instance
                .browse({ selectEnabled: true, selectMultiple: false })
                .then(([file]) => {
                    if (file != null) {
                        const { url } = file;
                        this.onInput(url);
                        this.onChange(url);
                    }
                });
        },
        onInput(value) {
            /**
             * Input event
             * @property {any} value
             */
            this.$emit('input', value);
        },
        onChange(value) {
            /**
             * Change event
             * @property {any} value
             */
            this.$emit('change', value);
        }
    }
};
</script>
