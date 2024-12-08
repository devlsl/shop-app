import { LogOutIcon, UserRoundIcon } from 'lucide-react';
import { setUser, showSignInPopup } from '../actions';
import { useIsAuthorized } from '../selectors';
import { isCurrentPagePrivate, navigate } from '../../navigation';
import { apiClient } from '../../api';
import { pushNotification } from '../../notifications';
import { FooterButton } from '../../../shared/ui/FooterButton';

const FooterSignOutButton = () => (
    <FooterButton
        onClick={() => {
            if (isCurrentPagePrivate()) navigate('categories');
            setUser(null);
            apiClient('signOut')
                .call()
                .then(
                    (res) =>
                        res.isRight() &&
                        pushNotification('info', 'Вы вышли из аккаунта'),
                );
        }}
    >
        <LogOutIcon />
        Выйти
    </FooterButton>
);

const FooterSignInButton = () => (
    <FooterButton onClick={showSignInPopup}>
        <UserRoundIcon />
        Войти
    </FooterButton>
);

export const FooterAuthButton = () => {
    const isAuthhorized = useIsAuthorized();

    return isAuthhorized ? <FooterSignOutButton /> : <FooterSignInButton />;
};
