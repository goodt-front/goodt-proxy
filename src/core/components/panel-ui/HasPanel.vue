<template>
    <div>
        <div class="row row-collapse">
            <div class="col col-vmid">
                <!--
                @slot content slot
                -->
                <slot />
            </div>
            <div class="col col-auto col-vmid">
                <i
                    class="mdi mdi-pencil cursor-pointer"
                    :class="[showPanel ? '' : 'color-grey']"
                    @click="togglePanel"
                />
            </div>
        </div>
        <portal :to="portalTarget">
            <div
                v-if="showPanel"
                ref="panel"
                class="panel"
                :class="panelClass"
                :style="panelStyle"
                @mousedown="onPanelMouseDown"
            >
                <div class="pos-rel">
                    <div
                        class="panel-dragger d-flex flex-center"
                        @mousedown="onPanelDraggerMouseDown"
                    />
                    <div class="close pos-abs pos-top-right mar-2" @click="togglePanel">
                        <i class="mdi mdi-close color-grey" />
                    </div>
                </div>

                <div ref="panelbody" class="panel-body pad-top-none">
                    <!--
                    @slot panel slot (accepts <a href="#panel">Panel</a> instance as a child)
                    -->
                    <slot name="panel" />
                </div>
            </div>
        </portal>
    </div>
</template>
<style lang="less" scoped>
@z: 900;
@w: 20rem;
.panel {
    position: fixed;
    z-index: @z;
    width: @w;
    &-dragger {
        cursor: move;
        height: 2rem;
    }
    &.animate {
        transition: left 0.25s ease, top 0.25s ease;
    }
    &.focus {
        z-index: @z+1;
    }
}
</style>
<script>
import { Portal } from 'portal-vue';
import Globals from '../../Const';

const mouse = e => ({ x: e.pageX, y: e.pageY });
const FocusManager = {
    pool: [],
    get active() {
        return this.pool.length ? this.pool[this.pool.length - 1] : null;
    },
    push(id) {
        this.pool.push(id);
    },
    remove(id) {
        this.pool = this.pool.filter(v => v != id);
    }
};
let ID = 1;

export default {
    components: {
        Portal
    },
    props: {
        /**
         * Panel x/y offset
         */
        panelOffset: {
            type: Object,
            default() {
                return { x: 10, top: 0 };
            }
        }
    },
    data() {
        return {
            panelId: `panel${ID++}`,
            showPanel: false,
            animatePanel: false,
            panelPos: { x: 0, y: 0 },
            panelDragOffset: { x: 0, y: 0 },
            panelDragging: false,
            panelHasFocus: false,
            focusManager: FocusManager,
            portalTarget: Globals.PORTAL_TARGET_NAME_POPUP
        };
    },
    computed: {
        panelClass() {
            const { animatePanel, panelHasFocus } = this;
            return { animate: animatePanel, focus: panelHasFocus };
        },
        panelStyle() {
            const { x, y } = this.panelPos;
            return {
                left: `${x | 0}px`,
                top: `${y | 0}px`
            };
        }
    },
    watch: {
        'focusManager.active': {
            handler(v) {
                this.panelHasFocus = this.panelId == v;
            },
            immediate: true
        }
    },
    created() {
        this.observer = null;
        this.onDocMouseMove = this.onDocMouseMove.bind(this);
        this.onDocMouseUp = this.onDocMouseUp.bind(this);
        this.onWinResize = this.onWinResize.bind(this);
    },
    destroyed() {
        this.destroyObserver();
        this.removeMouseListeners();
        this.removeWinListeners();
    },
    methods: {
        addMouseListeners() {
            document.addEventListener('mousemove', this.onDocMouseMove);
            document.addEventListener('mouseup', this.onDocMouseUp);
        },
        removeMouseListeners() {
            document.removeEventListener('mousemove', this.onDocMouseMove);
            document.removeEventListener('mouseup', this.onDocMouseUp);
        },
        addWinListeners() {
            window.addEventListener('resize', this.onWinResize, { passive: true });
        },
        removeWinListeners() {
            window.removeEventListener('resize', this.onWinResize);
        },
        createObserver() {
            if (this.observer) {
                return;
            }
            const cfg = { attributes: true, childList: true, subtree: true };
            this.observer = new MutationObserver(() => this.$nextTick(this.fixPanelPos));
            this.observer.observe(this.$refs.panelbody, cfg);
        },
        destroyObserver() {
            if (this.observer) {
                this.observer.disconnect();
                this.observer = null;
            }
        },
        togglePanel() {
            this.showPanel = !this.showPanel;
            this.destroyObserver();
            this.removeWinListeners();
            if (this.showPanel) {
                this.animatePanel = false;
                // @NOTE @see https://portal-vue.linusb.org/guide/caveats.html#refs
                this.$nextTick(() => {
                    this.$nextTick(() => {
                        this.placePanelInitPos();
                        this.createObserver();
                    });
                });
                FocusManager.push(this.panelId);
                this.addWinListeners();
            } else {
                FocusManager.remove(this.panelId);
            }
        },
        placePanelInitPos() {
            const r = this.$el.getBoundingClientRect();
            const p = this.$refs.panel.getBoundingClientRect();
            this.panelPos.x = r.x - p.width - this.panelOffset.x;
            this.panelPos.y = r.y + r.height / 2 - p.height / 2;
            setTimeout(() => {
                this.animatePanel = true;
                this.fixPanelPos();
            });
        },
        fixPanelPos() {
            const r = this.$refs.panel.getBoundingClientRect();
            const { innerWidth: width, innerHeight: height } = window;
            if (r.x < 0) {
                this.panelPos.x = 0;
            } else if (r.right > width) {
                this.panelPos.x = width - r.width;
            }
            if (r.y < 0) {
                this.panelPos.y = 0;
            } else if (r.bottom > height) {
                this.panelPos.y = height - r.height;
            }
        },
        onPanelMouseDown(e) {
            FocusManager.remove(this.panelId);
            FocusManager.push(this.panelId);
        },
        onPanelDraggerMouseDown(e) {
            const m = mouse(e);
            const r = e.currentTarget.getBoundingClientRect();
            this.animatePanel = false;
            this.panelDragOffset = { x: r.x - m.x, y: r.y - m.y };
            this.panelDragging = true;
            this.addMouseListeners();
        },
        onDocMouseMove(e) {
            const m = mouse(e);
            this.panelPos = {
                x: m.x + this.panelDragOffset.x,
                y: m.y + this.panelDragOffset.y
            };
        },
        onDocMouseUp(e) {
            this.removeMouseListeners();
            this.animatePanel = true;
            this.panelDragging = false;
            setTimeout(this.fixPanelPos);
        },
        onWinResize(e) {
            this.fixPanelPos();
        }
    }
};
</script>
