<template>
    <div
        :class="[_isOpenedClass]"
        class="spui-Collapse"
    >
        <div
            :class="[{ 'spui-Collapse__head_pointer': bCollapse }, 'spui-Collapse__head']"
            @click="_model = !_model"
        >
            <div class="spui-Collapse__heading">
                <span>{{ _heading }}</span>
                <i v-if="bCollapse" class="spui-Collapse__arrow ds-icon icon-arrow-down" />
            </div>
            <div class="spui-Collapse__metainfo">
                {{ _metainfo }}
            </div>
        </div>
        <div
            v-if="_isSlotBeforeBodyExist && _model"
            class="spui-Collapse__slot-beforebody"
        >
            <slot name="beforebody" />
        </div>
        <div
            v-if="_isSlotDefaultExist && _model"
            class="spui-Collapse__body"
        >
            <slot />
        </div>
        <div
            v-if="_isSlotAfterBodyExist && _model"
            class="spui-Collapse__slot-afterbody"
        >
            <slot name="afterbody" />
        </div>
    </div>
</template>

<script>
import { capitalize } from '@/helpers';

export default {
    name: 'Collapse',
    props: {
        heading: {
            type: String,
            default: 'Имя секции не передано',
        },
        metainfo: {
            type: String,
            default: '',
        },
        value: {
            type: Boolean,
            default: false,
        },
        // возможность сворачивать секцию
        bCollapse: {
            type: Boolean,
            default: true,
        }
    },
    data() {
        return {
            base: 'spui-Collapse',
        };
    },
    computed: {
        _model: {
            get() {
                return !this.bCollapse ? true : this.value;
            },
            set(value) {
                this.$emit('input', value);
            },
        },
        _isOpenedClass() {
            return this._model
                ? `${this.base}_opened`
                : `${this.base}_collapsed`;
        },
        _heading() {
            if (this.heading) {
                return capitalize(this.heading);
            }

            return null;
        },
        _metainfo() {
            if (this.metainfo) {
                return capitalize(this.metainfo);
            }

            return '';
        },
        _isSlotDefaultExist() {
            return Boolean(this.$slots.default);
        },
        _isSlotBeforeBodyExist() {
            return Boolean(this.$slots.beforebody);
        },
        _isSlotAfterBodyExist() {
            return Boolean(this.$slots.afterbody);
        },
    },
    methods: {},
};
</script>

<style lang="scss" scoped>
@import './Collapse.scss';
</style>
