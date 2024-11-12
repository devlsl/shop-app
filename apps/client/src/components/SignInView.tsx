import { XIcon } from 'lucide-react';
import styled, { css } from 'styled-components';
import {
    useIsShownSignInView,
    hideSignInView,
    setIsShownSignInView,
    pushNotification,
} from '../hooks/useAppState';
import { staticStyles } from '../shared/consts/styles/static';
import { hover } from '../shared/utils/styles/hover';
import { transition } from '../shared/utils/styles/transition';
import { typography } from '../shared/utils/styles/typography';
import { IconButton } from './buttons/iconButton';
import { TextButton } from './buttons/textButton';
import { Dialog } from './dialog';
import { ButtonLoader } from './buttonLoader';
import { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { apiPayloadSchemas } from '../shared/consts/schemas/api';
import { setUser } from '../modules/user';

const CloseButton = styled(IconButton)`
    background-color: ${({ theme }) => theme.dialog.foreground.background};

    ${hover(css`
        background-color: ${({ theme }) =>
            theme.dialog.foreground.hover.background};
    `)}
    &:active {
        background-color: ${({ theme }) =>
            theme.dialog.foreground.active.background};
    }
    justify-self: end;
    width: 32px;
    padding: 4px;
    svg {
        stroke-width: 3px;
    }
`;

const DialogContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const AuthInput = styled.input`
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

const Row = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
`;

const StyledSecondaryButton = styled(TextButton)`
    flex-grow: 1;
    position: relative;
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

const StyledOutlineButton = styled(TextButton)`
    background-color: transparent;
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

export const SecondaryButton = (
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
        <StyledSecondaryButton disabled={disabled || loading} {...otherProps}>
            {children}
            {loading && <ButtonLoader />}
        </StyledSecondaryButton>
    );
};

export const SignInView = () => {
    const isShownSignInView = useIsShownSignInView();
    const {
        call: callSignIn,
        status: signInStatus,
        data: signInData,
    } = useApi('signInByEmailAndPassword');
    const {
        call: callSignUp,
        status: signUpStatus,
        data: signUpData,
    } = useApi('signUpByEmailAndPassword');

    const loading = signInStatus === 'loading' || signUpStatus === 'loading';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignInButtonClick = () => callSignIn({ email, password });
    const handleSignUpButtonClick = () => callSignUp({ email, password });

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        const maybePayload =
            apiPayloadSchemas.signInByEmailAndPassword.safeParse({
                email,
                password,
            });
        setDisabled(!maybePayload.success);
    }, [email, password]);

    useEffect(() => {
        if (signInStatus === 'loading' || signInStatus === 'idle') {
            return;
        } else if (signInStatus === 'success') {
            setUser(signInData);
            pushNotification('success', 'Вы успешно авторизовались');
            hideSignInView();
        } else if (signInStatus === 'error') {
            pushNotification('error', 'Неверные данные');
        }
    }, [signInStatus]);

    useEffect(() => {
        if (signUpStatus === 'loading' || signUpStatus === 'idle') {
            return;
        } else if (signUpStatus === 'success') {
            setUser(signUpData);
            pushNotification('success', 'Вы успешно авторизовались');
            hideSignInView();
        } else if (signUpStatus === 'error') {
            pushNotification('error', 'Неверные данные');
        }
    }, [signUpStatus]);

    return (
        <Dialog
            closeSlot={
                <CloseButton>
                    <XIcon />
                </CloseButton>
            }
            contentSlot={
                <DialogContentWrapper>
                    <AuthInput
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                        placeholder='email'
                    />
                    <AuthInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        placeholder='пароль'
                    />
                    <Row>
                        <SecondaryButton
                            loading={loading}
                            disabled={disabled}
                            onClick={handleSignInButtonClick}
                        >
                            Войти
                        </SecondaryButton>
                        <SecondaryButton
                            loading={loading}
                            disabled={disabled}
                            onClick={handleSignUpButtonClick}
                        >
                            Зарегистрироваться
                        </SecondaryButton>
                    </Row>
                    <StyledOutlineButton onClick={hideSignInView}>
                        Отменить
                    </StyledOutlineButton>
                </DialogContentWrapper>
            }
            isOpen={isShownSignInView}
            setIsOpen={setIsShownSignInView}
            title={'sign in'}
            description={'sign in dialog'}
        />
    );
};
