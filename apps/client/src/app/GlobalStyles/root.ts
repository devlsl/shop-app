import { css } from 'styled-components';
import { transition } from '../../shared/styles/transition';

export const rootStyles = css`
    body {
        background-color: ${({ theme }) => theme.body.background};
        ${transition('background-color')};
    }

    html,
    body,
    #root {
        min-height: 100%;
        height: 100%;
        overflow: hidden;
    }
`;
