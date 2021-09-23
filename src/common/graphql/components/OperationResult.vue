<script>
import { resolveOperationStates } from '../OperationState';

export default {
    functional: true,

    props: {
        value: {
            type: Array,
            default: () => []
        },
    },

    render(_, context) {
        const { props: { value: operationStates }, scopedSlots: { default: resultSlot, loading: loadingSlot, error: errorSlot } } = context;
        const { data: { attrs: { toggle: isToggle = false, always: isAlways = false } }} = context;

        if (operationStates == null || operationStates.filter(Boolean).length === 0) {
            return isAlways === false
                ? null
                : resultSlot?.({ isSuccess: false, isError: false, result: [], isCompleted: false });
        }

        const { isLoading, isError, isSuccess, isCompleted, error, result } = resolveOperationStates(operationStates);

        const resolveResult = () => {
            const resultContent = resultSlot?.({ isSuccess, isCompleted, isError, result });
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
