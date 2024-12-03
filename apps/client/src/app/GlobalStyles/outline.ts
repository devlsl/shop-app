import { css } from 'styled-components';

export const outlineStyles = css`
    *,
    *:focus,
    *:active {
        outline: none;
        outline-color: transparent;
    }

    *:focus-visible {
        outline: 2px solid ${({ theme }) => theme.focusOutline};
        z-index: 999;
        outline-offset: 2px;
    }
`;
