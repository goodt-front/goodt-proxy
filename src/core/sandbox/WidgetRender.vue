<script>
import renderElem from '../render';

export default {
    props: {
        elem: {
            type: Object
        },
        vnodeData: {
            type: Object
        }
    },
    render(h) {
        const { elem, vnodeData } = this;
        return renderElem(h, elem, vnodeData);
    }
};
</script>
