import styled, { css } from 'styled-components';
import { transition } from '../../styles/transition';
import { hover } from '../../styles/hover';
import { typography } from '../../styles/typography';
import { breakpoint } from '../../../features/breakpoints';

export const FooterButton = styled.button`
    ${transition('background-color', 'transform', 'outline-color')}
    svg {
        ${transition('color')}
    }

    background-color: ${({ theme }) => theme.button.secondary.background};
    color: ${({ theme }) => theme.button.secondary.text};

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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;

    svg {
        stroke-width: 2px;
        width: 24px;
    }
    height: 66px;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    ${typography({
        fontSize: '0.84rem',
        fontWeight: 600,
        lineHeight: '0.84rem',
    })}

    ${breakpoint(
        'twoColumnsInContentGrid',
        css`
            ${typography({
                fontSize: '0.76rem',
                fontWeight: 600,
                lineHeight: '0.76rem',
            })}
        `,
    )}
`;
