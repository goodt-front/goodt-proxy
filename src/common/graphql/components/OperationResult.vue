<script>
export default {
    functional: true,

    props: {
        value: {
            type: Object,
            default: () => null
        },
    },

    render(_, context) {
        const { props: { value: operationState }, scopedSlots: { default: resultSlot, loading: loadingSlot, error: errorSlot } } = context;
        const { data: { attrs: { toggle: isToggle = false, always: isAlways = false } }} = context;

        if (operationState == null) {
            return isAlways === false
                ? null
                : resultSlot?.({ isSuccess: null, isError: null, result: null });
        }

        const { isLoading, isError, isSuccess, error, result } = operationState;
        const resolveResult = () => {
            const resultContent = resultSlot?.({ isSuccess, isError, result });
            if (isSuccess) {
                return resultContent;
            }
            // if isError and isToggle
            if (isToggle !== false) {
                return null;
            }
            // else
            return resultContent;
        }

        return [
            isLoading ? loadingSlot?.() : null,
            isError ? errorSlot?.(error) : null,
            resolveResult()
        ];
    }
};
</script>
