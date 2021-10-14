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
        const { props: { of: value }, scopedSlots: { is: defaultSlot }, children } = context;
        if (value == null) {
            return children;
        }
        if (defaultSlot == null) {
            return children;
        }
        return defaultSlot(value);
    }
};
</script>
