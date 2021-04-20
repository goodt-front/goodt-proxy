<template>
    <div class="row row-hgap-3">
        <div class="col col-vmid text-truncate">
            <div class="form-label text-truncate" :class="[`form-label-${labelSize}`]">
                <slot name="label" />
            </div>
        </div>
        <div v-if="$slots.helper" class="col col-auto col-vmid">
            <slot name="helper" />
        </div>
        <div class="col col-vmid" :class="[colSizeCl]">
            <slot name="control" />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        colSize: {
            type: String,
            default: '12-12'
        },
        labelSize: {
            type: String,
            default: 'xsmall',
            validation(val) {
                return ['xsmall', 'small'].includes(val);
            }
        }
    },
    computed: {
        colSizeCl() {
            return `col-${this.colSize}`;
        }
    }
};
</script>
