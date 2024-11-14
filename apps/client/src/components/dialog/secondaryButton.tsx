import styled, { css } from 'styled-components';
import { hover } from '../../shared/utils/styles/hover';
import { TextButton } from '../buttons/textButton';
import { ButtonLoader } from '../buttonLoader';

const Wrapper = styled(TextButton)`
    flex-grow: 1;
    position: relative;
    height: 36px;
    &:disabled {
        cursor: default;
        opacity: 0.6;
        ${hover(css`
            background-color: ${({ theme }) =>
                theme.dialog.foreground.background};
        `)}
        &:active {
            background-color: ${({ theme }) =>
                theme.dialog.foreground.background};
        }
    }

    background-color: ${({ theme }) => theme.dialog.foreground.background};
    ${hover(css`
        background-color: ${({ theme }) =>
            theme.dialog.foreground.hover.background};
    `)}
    &:active {
        background-color: ${({ theme }) =>
            theme.dialog.foreground.active.background};
    }
`;

export const DialogSecondaryButton = (
    props: {
        children: React.ReactNode;
        loading?: boolean;
    } & React.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
    const {
        disabled = false,
        children,
        loading = false,
        ...otherProps
    } = props;
    return (
        <Wrapper disabled={disabled || loading} {...otherProps}>
            {children}
            {loading && <ButtonLoader />}
        </Wrapper>
    );
};
