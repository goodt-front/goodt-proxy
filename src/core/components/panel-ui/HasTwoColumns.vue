<template>
    <div>
        <div class="row row-hgap-l1">
            <div class="col">
                <!--
                @slot left column slot
                -->
                <slot name="left" />
            </div>
            <div class="col">
                <!--
                @slot right column slot
                -->
                <slot name="right" />
            </div>
        </div>
    </div>
</template>
