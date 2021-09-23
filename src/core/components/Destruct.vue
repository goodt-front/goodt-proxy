<script>
export default {
    functional: true,

    props: {
        of: {
            type: Object,
            default: () => null
        },
    },

    render(_, context) {
        const { props: { of: value }, scopedSlots: { is: defaultSlot } } = context;
        if (value == null || value == null) {
            return null;
        }
        return defaultSlot(value);
    }
};
</script>
