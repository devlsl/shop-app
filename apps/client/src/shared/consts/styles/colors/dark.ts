import { Colors } from './Colors';

const palette = {
    text: '#bababa',
    border: '#414141',
    hover: '#494949',
    placeholder: '#707070',
    active: '#4c4c4c',
    background: '#2b2b2b',
};

export const darkColors: Colors = {
    body: {
        background: palette.background,
    },
    focusOutline: '#4543c4',
    scroll: {
        thumb: {
            background: palette.border,
            hover: {
                background: palette.hover,
            },
        },
    },
    input: {
        border: palette.border,
        placeholder: palette.placeholder,
        text: palette.text,
    },
    notification: {
        error: {
            background: '#4f3632',
            text: '#a45252',
        },
        success: {
            background: '#2d3f26',
            text: '#69ad65',
        },
        neutral: {
            background: '#404042',
            text: '#c2bd7d',
        },
        info: {
            background: '#535238',
            text: '#c2bd7d',
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
