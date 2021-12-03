<script>
import { Portal } from 'portal-vue';
import Const from '../../Const';

export default {
    functional: true,
    render(h, { scopedSlots }) {
        const to = Const.PORTAL_TARGET_NAME_POPUP;
        const children = scopedSlots.default ? scopedSlots.default({}) : [];
        return h(Portal, { props: { to } }, children);
    }
};
</script>
