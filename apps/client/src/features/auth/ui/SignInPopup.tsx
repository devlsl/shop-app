import { useEffect, useState } from 'react';
import { hideSignInPopup, setUser } from '../actions';
import { useIsShownSignInPopup } from '../selectors';
import { apiPayloadSchemas, useApi } from '../../api';
import { pushNotification } from '../../notifications';
import {
    Popup,
    PopupContentWrapper,
    PopupInput,
    PopupOutlineButton,
    PopupRow,
    PopupSecondaryButton,
} from '../../../shared/ui/Popup';
import { ButtonText } from '../../../shared/ui/ButtonText';

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
        <PopupContentWrapper>
            <PopupInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                placeholder='email'
            />
            <PopupInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                placeholder='пароль'
            />
            <PopupRow>
                <PopupSecondaryButton
                    loading={loading}
                    disabled={disabled}
                    onClick={handleSignInButtonClick}
                >
                    <ButtonText $size='l'>Войти</ButtonText>
                </PopupSecondaryButton>
                <PopupSecondaryButton
                    loading={loading}
                    disabled={disabled}
                    onClick={handleSignUpButtonClick}
                >
                    <ButtonText $size='l'>Зарегистрироваться</ButtonText>
                </PopupSecondaryButton>
            </PopupRow>
            <PopupOutlineButton onClick={hideSignInPopup}>
                <ButtonText $size='l'>Отменить</ButtonText>
            </PopupOutlineButton>
        </PopupContentWrapper>
    );
};

export const SignInPopup = () => {
    const isShownSignInPopup = useIsShownSignInPopup();
    return (
        <Popup
            contentSlot={<SignInPopupContent />}
            isOpen={isShownSignInPopup}
            onClose={hideSignInPopup}
            title={'sign in'}
            description={'sign in popup'}
        />
    );
};
