import styled, { css } from 'styled-components';
import { transition } from '../../shared/utils/styles/transition';
import { staticStyles } from '../../shared/consts/styles/static';
import { hover } from '../../shared/utils/styles/hover';
import { typography } from '../../shared/utils/styles/typography';

export const TextButton = styled.button`
    ${transition(
        'background-color',
        'transform',
        'color',
        'outline-color',
        'border-color',
        'opacity',
    )}
    ${typography({ fontWeight: 600 })}

    position: relative;

    svg {
        ${transition('color')}
    }
    gap: 8px;

    svg {
        stroke-width: 2px;
        width: 1.2rem;
        height: 1.2rem;
        flex-shrink: 0;
    }

    border-radius: ${staticStyles.border.radius};

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

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0 14px;

    &:active {
        transform: translateY(1px);
    }

    &:disabled {
        &:active {
            transform: none;
        }
        cursor: default;
    }
`;
