<script>
const LoadingPlaceholder = () => import('./ShimOverlay.vue');

export default {
    name: 'OperationResult',
    functional: true,
    props: {
        result: {
            type: Object
        },
    },
    render(h, context) {
        const { props: { result: operationState }, scopedSlots: { default: resultSlot, loading: loadingSlot, error: errorSlot } } = context;
        if (operationState == null) {
            return null;
        }
        const { isLoading, isError, isSuccess, error, result } = operationState;
        // eslint-disable-next-line no-nested-ternary
        const resultContent = isError ? errorSlot?.(error) : isSuccess ? resultSlot?.(result) : null;
        const loadingPlaceholder = isLoading
            ? loadingSlot
                ? loadingSlot()
                : h(LoadingPlaceholder)
            : null;

        return [
            loadingPlaceholder,
            resultContent
        ];
    }
};
</script>
