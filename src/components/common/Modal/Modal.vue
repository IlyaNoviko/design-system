<template>
    <div
        v-if="open"
        class="spui-Modal"
    >
        <div
            :style="_styleWindow"
            class="spui-Modal__window"
        >
            <div class="spui-Modal__head">
                <div class="spui-Modal__slot-head">
                    <slot
                        v-if="_isSlotHeadExist"
                        name="head"
                    />
                </div>
                <button
                    aria-label="Закрыть модальное окно"
                    type="button"
                    class="spui-Modal__close"
                    @click="onClose"
                >
                    <i
                        aria-hidden="true"
                        class="ds-icon icon-closing"
                    />
                </button>
            </div>
            <slot
                v-if="$slots['before-body']"
                name="before-body"
            />
            <div class="spui-Modal__body">
                <slot />
            </div>
            <slot
                v-if="$slots['after-body']"
                name="after-body"
            />
        </div>
        <div
            class="spui-Modal__bg"
            @click="onClose"
        />
    </div>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        open: {
            type: Boolean,
            default: false,
        },
        width: {
            type: String,
            default: 'auto',
        },
        maxWidth: {
            type: String,
            default: '98%',
        },
        maxHeight: {
            type: String,
            default: '98%',
        },
        minWidth: {
            type: String,
            default: '0%',
        },
        minHeight: {
            type: String,
            default: '0%',
        },
    },
    data() {
        return {
            base: 'spui-Modal',
        };
    },
    computed: {
        _styleWindow() {
            return {
                'max-width': this.maxWidth,
                'max-height': this.maxHeight,
                'min-height': this.minHeight,
                'min-width': this.minWidth,
                width: this.width,
            };
        },
        _isSlotHeadExist() {
            return Boolean(this.$slots.head);
        },
    },
    methods: {
        onClose() {
            this.$emit('close');
        },
    },
};
</script>

<style lang="scss" scoped>
@import './Modal.scss';
</style>
