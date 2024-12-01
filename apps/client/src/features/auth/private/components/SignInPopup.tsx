import { pushNotification } from '../../../../hooks/useAppState';
import { Dialog } from '../../../../components/popups/shared';
import { useEffect, useState } from 'react';
import { useApi } from '../../../../hooks/useApi';
import { apiPayloadSchemas } from '../../../../shared/consts/schemas/api';

import { DialogContentWrapper } from '../../../../components/popups/shared/wrapper';
import { DialogInput } from '../../../../components/popups/shared/input';
import { DialogRow } from '../../../../components/popups/shared/row';
import { DialogSecondaryButton } from '../../../../components/popups/shared/secondaryButton';
import { DialogOutlineButton } from '../../../../components/popups/shared/outlineButton';
import { ButtonText } from '../../../../components/buttonText';
import { hideSignInPopup, setUser } from '../actions';
import { useIsShownSignInPopup } from '../selectors';

const SignInPopupContent = () => {
    const {
        call: callSignIn,
        status: signInStatus,
        data: signInData,
    } = useApi('signIn');
    const {
        call: callSignUp,
        status: signUpStatus,
        data: signUpData,
    } = useApi('signUp');

    const loading = signInStatus === 'loading' || signUpStatus === 'loading';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignInButtonClick = () => callSignIn({ email, password });
    const handleSignUpButtonClick = () => callSignUp({ email, password });

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        const maybePayload = apiPayloadSchemas.signIn.safeParse({
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
            hideSignInPopup();
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
            hideSignInPopup();
        } else if (signUpStatus === 'error') {
            pushNotification('error', 'Неверные данные');
        }
    }, [signUpStatus]);

    return (
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
                    <ButtonText $size='l'>Войти</ButtonText>
                </DialogSecondaryButton>
                <DialogSecondaryButton
                    loading={loading}
                    disabled={disabled}
                    onClick={handleSignUpButtonClick}
                >
                    <ButtonText $size='l'>Зарегистрироваться</ButtonText>
                </DialogSecondaryButton>
            </DialogRow>
            <DialogOutlineButton onClick={hideSignInPopup}>
                <ButtonText $size='l'>Отменить</ButtonText>
            </DialogOutlineButton>
        </DialogContentWrapper>
    );
};

export const SignInPopup = () => {
    const isShownSignInPopup = useIsShownSignInPopup();
    return (
        <Dialog
            contentSlot={<SignInPopupContent />}
            isOpen={isShownSignInPopup}
            onClose={hideSignInPopup}
            title={'sign in'}
            description={'sign in popup'}
        />
    );
};
