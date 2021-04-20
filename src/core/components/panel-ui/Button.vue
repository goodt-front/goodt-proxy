<template>
    <div class="btn btn-small" :class="cssClass" v-bind="$attrs" v-on="$listeners">
        <!--
        @slot label slot
        -->
        <slot />
    </div>
</template>
<script>
export default {
    props: {
        /**
         * Button type
         * @values 'primary', 'ghost', 'error', 'success', 'misc'
         */
        type: {
            type: String,
            default: 'primary',
            validation(val) {
                return ['primary', 'ghost', 'error', 'success', 'misc'].includes(val);
            }
        },
        /**
         * Whether the button is an 'inline' element or 'block'
         */
        inline: {
            type: Boolean,
            default: false
        },
        /**
         * Only-icon mode (square button)
         */
        icon: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        cssClass() {
            let { type, inline, icon } = this;
            let a = [`btn-${type}`];
            if (!inline) {
                a.push('d-flex');
            }
            if (icon) {
                a.push('btn-icon');
            }
            return a;
        }
    }
};
</script>
