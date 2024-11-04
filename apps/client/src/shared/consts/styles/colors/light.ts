import { darkColors } from './dark';

const palette = {
    textDark: '#393939',
    text: '#585858',
    hoverText: '#2a2a2a',
    activeText: '#0c0c0c',
    placeholder: '#b3b3b3',
    border: '#f1f1f1',
    hover: '#e8e8e8',
    active: '#e5e5e5',
    background: '#ffffff',
};

export const lightColors: typeof darkColors = {
    body: {
        background: palette.background,
    },
    focusOutline: '#2f2da8',
    categoryPath: {
        text: '#b3b3b3',
        hover: { text: palette.text },
        active: { text: '#131313' },
    },
    dialog: {
        overlay: 'rgba(0,0,0,0.24)',
        paper: palette.background,
        foreground: {
            text: palette.text,
            background: palette.border,
            hover: { background: palette.hover },
            active: { background: palette.active },
        },
        loader: {
            start: '#e5e5e5',
            end: '#c8c8c8',
        },
    },
    scroll: {
        thumb: {
            background: palette.border,
            hover: {
                background: palette.hover,
            },
            active: {
                background: palette.active,
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
            hover: {
                text: '#d75656',
            },
            active: {
                text: '#c64a4a',
            },
        },
        success: {
            background: '#d4eccb',
            text: '#57c152',
            hover: {
                text: '#49b443',
            },
            active: {
                text: '#3fa739',
            },
        },
        neutral: {
            background: '#e8e8e8',
            text: '#18181b',
            hover: {
                text: '#101012',
            },
            active: {
                text: '#040405',
            },
        },
        info: {
            background: '#ebe9b4',
            text: '#959263',
            hover: {
                text: '#7f7c4d',
            },
            active: {
                text: '#656239',
            },
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
                text: palette.hoverText,
                background: palette.hover,
            },
            active: {
                text: palette.activeText,
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
