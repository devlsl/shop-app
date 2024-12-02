import { LogOutIcon, UserRoundIcon } from 'lucide-react';
import { setUser, showSignInPopup } from '../actions';
import { useIsAuthorized } from '../selectors';
import { IconButton } from '../../../components/buttons/iconButton';
import { isCurrentPagePrivate, navigate } from '../../url';
import { pushNotification } from '../../../shared/hooks/useAppState';
import { apiClient } from '../../api';

const HeaderSignOutButton = () => (
    <IconButton
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
    </IconButton>
);

const HeaderSignInButton = () => (
    <IconButton onClick={showSignInPopup}>
        <UserRoundIcon />
    </IconButton>
);

export const HeaderAuthButton = () => {
    const isAuthhorized = useIsAuthorized();
    return isAuthhorized ? <HeaderSignOutButton /> : <HeaderSignInButton />;
};
