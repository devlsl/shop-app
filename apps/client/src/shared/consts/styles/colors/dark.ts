const palette = {
    text: '#bababa',
    hoverText: '#d7d7d7',
    activeText: '#f4f4f4',
    textLight: '#a4a4a4',
    border: '#414141',
    hover: '#494949',
    active: '#4c4c4c',
    placeholder: '#707070',
    background: '#2b2b2b',
};

export const darkColors = {
    new: {
        '0': '#f4f4f4',
        '1': '#d7d7d7',
        '2': '#d6d6d6',
        '3': '#bababa',
        '4': '#a4a4a4',
        '5': '#707070',
        '6': '#4c4c4c',
        '7': '#494949',
        '8': '#414141',
        '9': '#2b2b2b',
        '250': '#4543c4',
    },
    body: {
        background: palette.background,
    },
    focusOutline: '#4543c4',
    categoryPath: {
        text: palette.placeholder,
        hover: { text: palette.text },
        active: { text: '#d6d6d6' },
    },
    dialog: {
        overlay: 'rgba(0, 0, 0, 0.24)',
        paper: palette.border,
        foreground: {
            text: palette.text,
            background: '#585858',
            hover: { background: '#606060' },
            active: { background: '#636363' },
        },
        loader: {
            start: '#7a7a7a',
            end: '#646464',
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
            background: '#4f3632',
            text: '#a45252',
            hover: {
                text: '#b05e5e',
            },
            active: {
                text: '#b56565',
            },
        },
        success: {
            background: '#2d3f26',
            text: '#69ad65',
            hover: {
                text: '#73b770',
            },
            active: {
                text: '#84c680',
            },
        },
        neutral: {
            background: '#404042',
            text: '#c2bd7d',
            hover: {
                text: '#cdc889',
            },
            active: {
                text: '#d4d095',
            },
        },
        info: {
            background: '#535238',
            text: '#c2bd7d',
            hover: {
                text: '#cdc889',
            },
            active: {
                text: '#d4d095',
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
