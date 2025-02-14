import '@/components/resources';

import SelectList from './SelectList.vue';

const elements = [
    { label: 1 },
    { label: 27 },
    { label: 184 },
    { label: 3200 },
    { label: 'Фиолетовый' },
    { label: 'Серобурмалиновый' },
    { label: 'Синий' },
    { label: 'Большая неразрывная строка на несколько слов' },
    { label: 'Бра' },
];

export default {
    title: 'Общие/SelectList',
    component: SelectList,
};

export const one = () => ({
    components: { SelectList },
    data() {
        return {
            value: { label: 1 },
            elements,
            label: (value) => value.label,
        };
    },
    template:
        "<SelectList :values='elements' :label='label' v-model='value'></SelectList>",
});

export const many = () => ({
    components: { SelectList },
    data() {
        return {
            value: [{ label: 1 }],
            elements,
            label: (value) => value.label,
        };
    },
    template:
        "<SelectList :values='elements' :label='label' v-model='value' :one='false'></SelectList>",
});

export const error = () => ({
    components: { SelectList },
    data() {
        return {
            value: { label: 1 },
            elements,
            label: (value) => value.label,
            isError: true,
        };
    },
    template:
        "<SelectList :is-error='isError' :values='elements' :label='label' v-model='value'></SelectList>",
});

export const customFnCompare = () => ({
    components: { SelectList },
    data() {
        return {
            value: [{ label: 1 }],
            elements,
            label: (value) => value.label,
            fnCompare: (value, selected) => value.label === selected.label,
        };
    },
    template: `<div>
    <SelectList :fnCompare='fnCompare' :values='elements' :label='label' v-model='value' :one='false'></SelectList>
    </div>`,
});
