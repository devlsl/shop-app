import styled, { css } from 'styled-components';
import { transition } from '../../styles/transition';
import { staticStyles } from '../../consts/staticStyles';
import { hover } from '../../styles/hover';

export const LinkIconButton = styled.button`
    ${transition('transform', 'outline-color')}
    svg {
        ${transition('color')}
    }

    border-radius: ${staticStyles.border.radius};

    svg {
        color: ${({ theme }) => theme.button.secondary.text};
    }
    ${hover(css`
        svg {
            color: ${({ theme }) => theme.button.secondary.hover.text};
        }
    `)}

    &:active {
        svg {
            color: ${({ theme }) => theme.button.secondary.active.text};
        }
    }
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    padding: 8px;
    aspect-ratio: 1;

    svg {
        stroke-width: 3px;
        width: 100%;
        height: 100%;
    }
`;
