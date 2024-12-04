import styled, { css } from 'styled-components';
import { hover } from '../../styles/hover';
import { TextButton } from '../TextButton';

export const PopupOutlineButton = styled(TextButton)`
    background-color: transparent;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    border: 2px solid ${({ theme }) => theme.dialog.foreground.background};
    ${hover(css`
        background-color: ${({ theme }) => theme.dialog.foreground.background};
    `)}
    &:active {
        border-color: ${({ theme }) =>
            theme.dialog.foreground.active.background};

        background-color: ${({ theme }) =>
            theme.dialog.foreground.active.background};
    }
`;
