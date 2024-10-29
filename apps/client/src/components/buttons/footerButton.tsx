import styled, { css } from 'styled-components';
import { transition } from '../../shared/utils/styles/transition';
import { hover } from '../../shared/utils/styles/hover';

export const FooterButton = styled.button`
    ${transition('background-color', 'transform', 'outline-color')}
    svg {
        ${transition('color')}
    }

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

    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        stroke-width: 2px;
        width: 24px;
    }
    height: 60px;
`;
