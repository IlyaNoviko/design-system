<script>
import { TheMask } from 'vue-the-mask';

export default {
    name: 'Input',
    functional: true,
    components: {
        TheMask,
    },
    props: {
        value: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            default: '',
        },
        // 'text', 'tel', 'url', 'email', 'password'
        type: {
            type: String,
            default: 'text',
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        isError: {
            type: Boolean,
            default: false,
        },
        isValid: {
            type: Boolean,
            default: false,
        },
        feedbackError: {
            type: String,
            default: '',
        },
        feedbackValid: {
            type: String,
            default: '',
        },
        feedbackHelp: {
            type: String,
            default: '',
        },
        isDisplayAsBlock: {
            type: Boolean,
            default: true,
        },
        label: {
            type: String,
            default: '',
        },
        styleElement: {
            type: Object,
            default: () => ({}),
        },
        styleInput: {
            type: Object,
            default: () => ({}),
        },
        styleLabel: {
            type: Object,
            default: () => ({}),
        },
        mask: {
            type: String,
            default: '',
        },
        passwordIsVisible: {
            type: Boolean,
            default: true,
        },
        isRequired: {
            type: Boolean,
            default: false,
        },
        autocomplete: {
            type: String,
            default: 'new-password',
        },
        autofocus: {
            type: Boolean,
            default: false,
        },
    },
    render: (h, { data, props, listeners, scopedSlots }) => {
        const {
            value,
            placeholder,
            type,
            isDisabled,
            isDisplayAsBlock,
            isError,
            isValid,
            feedbackError,
            feedbackValid,
            feedbackHelp,
            label,
            styleElement,
            styleInput,
            styleLabel,
            mask,
            passwordIsVisible,
            isRequired,
            autocomplete,
            autofocus,
        } = props;

        const pressEnterHandler = listeners.enter;

        const onPressEnter = (event) => {
            if (
                (event.code === 13 ||
                    event.keyCode === 13 ||
                    event.key === 'Enter') &&
                pressEnterHandler
            ) {
                pressEnterHandler(value);
            }
        };

        const onInput = (onInputValue) => {
            listeners.input && listeners.input(onInputValue);
        };

        /** Параметры передающиеся в scoped slot для label */
        const params = {
            value,
            label,
        };

        /** Получаем передаваемые в компонент слоты */
        const { labelScopedSlot } = scopedSlots;

        /** Текст label */
        const labelText = labelScopedSlot ? labelScopedSlot(params) : label;

        let feedback = feedbackHelp;

        if (isError && feedbackError) {
            feedback = feedbackError;
        }

        if (isValid && feedbackValid) {
            feedback = feedbackValid;
        }

        const typeIsPassword = type === 'password';

        const onPasswordVisibleChangeHandler =
            listeners.passwordVisibleChange ||
            listeners['password-visible-change'];

        const onPasswordVisibleChange = () => {
            onPasswordVisibleChangeHandler &&
                onPasswordVisibleChangeHandler(!passwordIsVisible);
        };

        let typeResult = type;
        if (typeIsPassword) {
            typeResult = passwordIsVisible ? 'text' : 'password';
        }

        const onFocus = () => listeners.focus && listeners.focus();
        const onBlur = () => listeners.blur && listeners.blur();

        return (
            <label
                class={[
                    'spui-Input',
                    {
                        'is-disabled': isDisabled,
                        'is-display-as-block': isDisplayAsBlock,
                        'is-error': isError,
                        'is-valid': isValid,
                        'is-required': isRequired,
                        'is-password': typeIsPassword,
                    },
                    data.class,
                    data.staticClass,
                ]}
                style={styleElement}
            >
                <div class="spui-Input__wrapper">
                    {mask ? (
                        <TheMask
                            vOn:keyup_native={onPressEnter}
                            value={value}
                            onInput={onInput}
                            placeholder={placeholder}
                            class="spui-Input__input"
                            type={typeResult}
                            style={styleInput}
                            disabled={isDisabled}
                            autocomplete={autocomplete}
                            mask={mask}
                        ></TheMask>
                    ) : (
                        <input
                            onKeyup={onPressEnter}
                            value={value}
                            onInput={(e) => onInput(e.target.value)}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            class="spui-Input__input"
                            type={typeResult}
                            disabled={isDisabled}
                            autocomplete={autocomplete}
                            style={styleInput}
                            autofocus={autofocus}
                        ></input>
                    )}
                    {typeIsPassword && (
                        <button
                            onClick={onPasswordVisibleChange}
                            type="button"
                            aria-label="Сменить видимость"
                            class={[
                                'spui-Input__pswd-visibility-toggle',
                                {
                                    'pswd-is-visible': passwordIsVisible,
                                    'pswd-is-hidden': !passwordIsVisible,
                                },
                            ]}
                        ></button>
                    )}
                    {labelText && (
                        <span style={styleLabel} class="spui-Input__label">
                            {labelText}
                        </span>
                    )}
                </div>
                {feedback && (
                    <span class="spui-Input__feedback">{feedback}</span>
                )}
            </label>
        );
    },
};
</script>

<style lang="scss" scoped>
@import './Input.scss';
</style>
