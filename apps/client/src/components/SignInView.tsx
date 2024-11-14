import {
    useIsShownSignInView,
    hideSignInView,
    pushNotification,
} from '../hooks/useAppState';
import { Dialog } from './dialog';
import { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { apiPayloadSchemas } from '../shared/consts/schemas/api';
import { setUser } from '../modules/user';
import { DialogContentWrapper } from './dialog/wrapper';
import { DialogInput } from './dialog/input';
import { DialogRow } from './dialog/row';
import { DialogSecondaryButton } from './dialog/secondaryButton';
import { DialogOutlineButton } from './dialog/outlineButton';

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
            contentSlot={
                <DialogContentWrapper>
                    <DialogInput
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                        placeholder='email'
                    />
                    <DialogInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        placeholder='пароль'
                    />
                    <DialogRow>
                        <DialogSecondaryButton
                            loading={loading}
                            disabled={disabled}
                            onClick={handleSignInButtonClick}
                        >
                            Войти
                        </DialogSecondaryButton>
                        <DialogSecondaryButton
                            loading={loading}
                            disabled={disabled}
                            onClick={handleSignUpButtonClick}
                        >
                            Зарегистрироваться
                        </DialogSecondaryButton>
                    </DialogRow>
                    <DialogOutlineButton onClick={hideSignInView}>
                        Отменить
                    </DialogOutlineButton>
                </DialogContentWrapper>
            }
            isOpen={isShownSignInView}
            onClose={hideSignInView}
            title={'sign in'}
            description={'sign in dialog'}
        />
    );
};
