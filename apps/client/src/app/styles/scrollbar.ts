import { css } from 'styled-components';
import { staticStyles } from '../../shared/consts/staticStyles';

export const scrollbarStyles = css`
    ::-webkit-scrollbar {
        width: ${staticStyles.scrollbar.size};
        height: ${staticStyles.scrollbar.size};
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.scroll.thumb.background};
        border-radius: ${staticStyles.border.radius};
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: ${({ theme }) => theme.scroll.thumb.hover.background};
    }

    ::-webkit-scrollbar-thumb:active {
        background-color: ${({ theme }) =>
            theme.scroll.thumb.active.background};
    }
`;
