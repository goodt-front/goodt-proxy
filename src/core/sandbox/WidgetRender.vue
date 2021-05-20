<script>
import { render as renderElem } from '../render';

export default {
    props: {
        elem: {
            type: Object
        },
        dataAddons: {
            type: [Object, Function],
            default() {
                return {};
            }
        },
        isEditorMode: {
            type: Boolean,
            default: false
        }
    },
    render(h) {
        const { elem, dataAddons, isEditorMode } = this;
        return renderElem(h, elem, dataAddons, isEditorMode);
    }
};
</script>
