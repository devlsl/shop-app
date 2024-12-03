import styled, { css } from 'styled-components';
import { staticStyles } from '../../shared/consts/staticStyles';
import { hover } from '../../shared/styles/hover';
import { transition } from '../../shared/styles/transition';

export const IconButton = styled.button`
    overflow: hidden;
    position: relative;
    ${transition('background-color', 'transform', 'outline-color')}
    svg {
        ${transition('color')}
    }

    border-radius: ${staticStyles.border.radius};

    background-color: ${({ theme }) => theme.button.secondary.background};
    svg {
        color: ${({ theme }) => theme.button.secondary.text};
    }
    ${hover(css`
        background-color: ${({ theme }) =>
            theme.button.secondary.hover.background};
    `)}

    &:active {
        background-color: ${({ theme }) =>
            theme.button.secondary.active.background};
    }
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 8px;
    aspect-ratio: 1;

    svg {
        stroke-width: 2px;
        width: 100%;
        height: 100%;
    }

    &:active {
        transform: translateY(1px);
    }
`;
