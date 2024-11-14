import styled from 'styled-components';
import { transition } from '../../shared/utils/styles/transition';
import { typography } from '../../shared/utils/styles/typography';
import { staticStyles } from '../../shared/consts/styles/static';

export const DialogInput = styled.input`
    ${transition('border-color', 'outline-color', 'color')}
    ${typography()}
    display: flex;
    align-items: center;
    padding: 0 8px;
    height: 36px;
    min-width: 0px;
    flex-grow: 1;

    text-overflow: ellipsis;

    border: ${staticStyles.border.width.m} solid
        ${({ theme }) => theme.dialog.foreground.background};
    color: ${({ theme }) => theme.input.text};

    &::placeholder {
        ${transition('color')}

        color: ${({ theme }) => theme.input.placeholder};
    }

    border-radius: ${staticStyles.border.radius};
`;
