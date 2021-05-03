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
         *
         * @values 'primary', 'ghost', 'error', 'success', 'misc'
         */
        type: {
            type: String,
            default: 'primary',
            enum: ['primary', 'ghost', 'error', 'success', 'misc']
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
            const { type, inline, icon } = this;
            const a = [`btn-${type}`];
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
