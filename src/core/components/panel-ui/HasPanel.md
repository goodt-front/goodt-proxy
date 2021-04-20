```vue
<template>
    <div class="w-f2">
        <ui-has-panel>
            some content
            <template #panel>
                <ui-panel
                    :groups="[
                        { name: 'Group1', slot: 'group1' },
                        { name: 'Group2', slot: 'group2' }
                    ]"
                >
                    <template #group1>Group1 content</template>
                    <template #group2>Group2 content</template>
                </ui-panel>
            </template>
        </ui-has-panel>
        <ui-has-panel>
            some content
            <template #panel>
                <ui-panel
                    :groups="[
                        { name: 'Group1', slot: 'group1' },
                        { name: 'Group2', slot: 'group2' }
                    ]"
                >
                    <template #group1>Group1 content</template>
                    <template #group2>Group2 content</template>
                </ui-panel>
            </template>
        </ui-has-panel>
        <!-- {block} environment emulation -->
        <portal-target :name="portalTargetName" multiple></portal-target>
        <!-- {/block} -->
    </div>
</template>
<script>
import ui from './index.js';
import Const from './../../Const';
import { PortalTarget } from 'portal-vue';

export default {
    components: { ...ui, PortalTarget },
    // {block} environment emulation
    data() {
        return { portalTargetName: Const.PORTAL_TARGET_NAME_POPUP };
    }
    // {/block} environment emulation
};
</script>
```
