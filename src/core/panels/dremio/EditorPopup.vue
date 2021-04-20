<template>
    <div class="popup popup-fixed">
        <div class="popup-dialog d-flex flex-col w-100 h-100 radius-none">
            <div class="popup-dialog-body pad-bot-none">
                <div class="row">
                    <div class="col col-vmid">
                        <slot name="header-left" />
                    </div>
                    <div class="col col-auto col-vmid">
                        <slot name="header-right" />
                    </div>
                </div>
            </div>
            <div class="popup-dialog-body flex-grow scroll-hide">
                <div class="row row-collapse h-100">
                    <div class="col col-auto h-100">
                        <div class="d-flex flex-col w-f3 h-100 scroll-y mar-right-l2">
                            <div class="d-flex flex-col flex-grow pad-2">
                                <slot name="sidebar" />
                            </div>
                        </div>
                    </div>
                    <div class="col pos-rel">
                        <div class="tile pos-abs w-100 h-100 scroll-hide">
                            <slot name="content" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
