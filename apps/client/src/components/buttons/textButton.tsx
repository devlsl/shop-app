import styled, { css } from 'styled-components';
import { transition } from '../../shared/utils/styles/transition';
import { staticStyles } from '../../shared/consts/styles/static';
import { hover } from '../../shared/utils/styles/hover';
import { typography } from '../../shared/utils/styles/typography';

export const TextButton = styled.button`
    ${transition('background-color', 'transform', 'color', 'outline-color')}
    ${typography({ fontWeight: 600 })}

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

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 14px;

    &:active {
        transform: translateY(1px);
    }
`;