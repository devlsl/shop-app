import { LogOutIcon, UserRoundIcon } from 'lucide-react';
import { setUser, showSignInPopup } from '../actions';
import { useIsAuthorized } from '../selectors';
import { FooterButton } from '../../../components/buttons/footerButton';
import { isCurrentPagePrivate, navigate } from '../../url';
import { pushNotification } from '../../../shared/hooks/useAppState';
import { apiClient } from '../../api';

const FooterSignOutButton = () => (
    <FooterButton
        onClick={() => {
            isCurrentPagePrivate() && navigate('categories');
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
    </FooterButton>
);

const FooterSignInButton = () => (
    <FooterButton onClick={showSignInPopup}>
        <UserRoundIcon />
    </FooterButton>
);

export const FooterAuthButton = () => {
    const isAuthhorized = useIsAuthorized();

    return isAuthhorized ? <FooterSignOutButton /> : <FooterSignInButton />;
};
