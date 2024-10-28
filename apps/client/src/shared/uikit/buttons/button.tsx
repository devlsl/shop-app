import styled, { css } from 'styled-components';
import { transition } from '../../utils/styles/transition';
import { hover } from '../../utils/styles/hover';

export const Button = styled.button`
    ${hover(css`
        background-color: red;
    `)}
    border: none;
    ${transition('background-color')};
`;
