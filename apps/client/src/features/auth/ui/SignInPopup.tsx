import { useEffect, useState } from 'react';
import { hideSignInPopup, setUser } from '../actions';
import { useAuthStatus, useIsShownSignInPopup } from '../selectors';
import { apiClient, apiPayloadSchemas } from '../../api';
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

const handleAuthButtonClick = async (
    type: 'signIn' | 'signUp',
    email: string,
    password: string,
) => {
    const response = await apiClient(type).call({ email, password });
    if (response.isRight()) {
        setUser(response.value);
        pushNotification('success', 'Вы успешно авторизовались');
        hideSignInPopup();
    } else {
        pushNotification('error', 'Неверные данные');
    }
};

const SignInPopupContent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(true);
    const authStatus = useAuthStatus();

    useEffect(() => {
        const maybePayload = apiPayloadSchemas.signIn.safeParse({
            email,
            password,
        });
        setDisabled(!maybePayload.success);
    }, [email, password]);

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
                    loading={authStatus === 'checking'}
                    disabled={disabled}
                    onClick={() =>
                        handleAuthButtonClick('signIn', email, password)
                    }
                >
                    <ButtonText $size='l'>Войти</ButtonText>
                </PopupSecondaryButton>
                <PopupSecondaryButton
                    loading={authStatus === 'checking'}
                    disabled={disabled}
                    onClick={() =>
                        handleAuthButtonClick('signUp', email, password)
                    }
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
