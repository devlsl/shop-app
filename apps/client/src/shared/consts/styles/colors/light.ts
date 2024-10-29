import { darkColors } from './dark';

const palette = {
    text: '#353535',
    border: '#f1f1f1',
    placeholder: '#b3b3b3',
    hover: '#e5e5e5',
    active: '#d8d8d8',
    background: '#ffffff',
};

export const lightColors: typeof darkColors = {
    body: {
        background: palette.background,
    },
    focusOutline: '#2f2da8',
    scroll: {
        thumb: {
            background: palette.border,
            hover: {
                background: palette.hover,
            },
        },
    },
    loader: {
        onBackground: {
            start: palette.border,
            end: palette.active,
        },
        onForeground: {
            start: palette.border,
            end: palette.background,
        },
    },
    input: {
        border: palette.border,
        placeholder: palette.placeholder,
        text: palette.text,
    },
    notification: {
        error: {
            background: '#ffd1d1',
            text: '#e66a6a',
        },
        success: {
            background: '#d4eccb',
            text: '#57c152',
        },
        neutral: {
            background: '#e8e8e8',
            text: '#18181b',
        },
        info: {
            background: '#ebe9b4',
            text: '#959263',
        },
    },
    button: {
        primary: {
            background: palette.border,
            text: palette.text,
            hover: {
                background: palette.hover,
            },
            active: {
                background: palette.active,
            },
        },
        secondary: {
            background: palette.border,
            text: palette.text,
            hover: {
                background: palette.hover,
            },
            active: {
                background: palette.active,
            },
        },
        accent: {
            background: palette.border,
            text: palette.text,
            hover: {
                background: palette.hover,
            },
            active: {
                background: palette.active,
            },
        },
        success: {
            background: palette.border,
            text: palette.text,
            hover: {
                background: palette.hover,
            },
            active: {
                background: palette.active,
            },
        },
        info: {
            background: palette.border,
            text: palette.text,
            hover: {
                background: palette.hover,
            },
            active: {
                background: palette.active,
            },
        },
        dangerous: {
            background: palette.border,
            text: palette.text,
            hover: {
                background: palette.hover,
            },
            active: {
                background: palette.active,
            },
        },
        outline: {
            text: palette.text,
            border: palette.border,
            hover: {
                text: palette.hover,
            },
            active: {
                text: palette.active,
            },
        },
    },
};
