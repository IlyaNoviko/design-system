import '@/components/resources';

import InputSearchWithHints from './InputSearchWithHints.vue';

export default {
    title: 'Специфичные/InputSearchWithHints',
    component: InputSearchWithHints,
};

export const standart = () => ({
    components: { InputSearchWithHints },
    data() {
        return {
            text: 'платье',
            isHintsOpen: false,
            isCategoryOpen: false,
            isCategorySearchOpen: false,
            isCategorySearch: true,
            categoriesSearch: ['По закупке','По сайту'],
            categorySearch: 'По закупке',
            hints: [
                {
                    id: 104,
                    label: 'Красное платье',
                    count: 2345,
                },
                {
                    id: 105,
                    label:
                        'Вечернее платье на выпускной и очень длинное название подсказки',
                    count: 345830,
                },
                {
                    id: 177,
                    label: 'Свадебное платье',
                    count: 7462089674,
                },
                {
                    id: 178,
                    label: 'Летнее платье',
                    count: 3,
                },
            ],
            brands: [
                { id: 364613, brand_name: 'Платья Ксении Верд' },
                { id: 147416, brand_name: 'Платина' },
                { id: 347930, brand_name: 'Платиновая лаборатория' },
            ],
            purchases: [
                {
                    id: 48010,
                    purchase_name:
                        'Хочу платье, Mappy - платья, блузки, костюмы, домашняя одежда от 40 до 56. Распродажа до 70%. Сумки-шопперы.',
                    stock_id: '48010',
                },
                {
                    id: 5672,
                    purchase_name:
                        'Korri - спорт начинается с нами! Одежда и аксессуары для гимнастики, танцев и плавания.',
                    stock_id: '5672',
                },
                {
                    id: 6773,
                    purchase_name:
                        'Интерьерные наклейки, магнитные планеры и блокноты. Полезные мелочи для дома.',
                    stock_id: '6773',
                },
            ],
            orgs: [
                { 
                    user_id: 46878,
                    org_name: 'ЛЕНОЧКА',
                },
            ],
            fnHintLabel: (hint) => hint.label,
            fnHintCount: (hint) => hint.count,
            fnBrandLabel: (brand) => brand.brand_name,
            fnPurchaseLabel: (purchase) => purchase.purchase_name,
            fnPurchaseId: (purchase) => purchase.stock_id,
            fnOrgLabel: (org) => org.org_name,
            fnOrgId: (org) => String(org.user_id),
        };
    },
    methods: {
        onClickHint(hint) {
            this.text = this.fnHintLabel(hint);
        },
        onBrandHint(brand) {
            this.text = this.fnBrandLabel(brand);
        },
        onPurchaseHint(brand) {
            this.text = this.fnPurchaseLabel(brand);
        },
        onHintsOpenChange(value) {
            this.isHintsOpen = value;
        },
        onCategoryOpenChange(value) {
            this.isCategoryOpen = value;
        },
        onCategorySearchOpenChange(value, categorySearch) {
            this.isCategorySearchOpen = value;
            this.categorySearch = categorySearch;
        },
        onInputByItems() {
            console.log('Запрос к подсказкам для автодополнения');
        },
        onSearch(params) {
            this.text = params.value;
            console.log('Отправка запроса:', params);
        },
    },
    template: `<InputSearchWithHints 
        v-model="text" 
        :hints="hints"
        :brands="brands"
        :purchases="purchases"
        :orgs="orgs"
        :is-hints-open="isHintsOpen" 
        :isCategorySearch="isCategorySearch"
        :is-category-open="isCategoryOpen"
        :is-category-search-open="isCategorySearchOpen"
        :categoriesSearch="categoriesSearch"
        :fn-hint-label="fnHintLabel"
        :fn-hint-count="fnHintCount"
        :fn-brand-label="fnBrandLabel"
        :fn-purchase-label="fnPurchaseLabel"
        :fn-purchase-id="fnPurchaseId"
        :fn-org-label="fnOrgLabel"
        :fn-org-id="fnOrgId"
        @hints-open-change="onHintsOpenChange" 
        @category-open-change="onCategoryOpenChange"
        @category-search-open-change="onCategorySearchOpenChange"
        @input-by-items="onInputByItems" 
        @search="onSearch"></InputSearchWithHints>`,
});
