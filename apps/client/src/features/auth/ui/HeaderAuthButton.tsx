import { LogOutIcon, UserRoundIcon } from 'lucide-react';
import { setUser, showSignInPopup } from '../actions';
import { useIsAuthorized } from '../selectors';
import { isCurrentPagePrivate, navigate } from '../../navigation';
import { apiClient } from '../../api';
import { pushNotification } from '../../notifications';
import { IconButton } from '../../../shared/ui/IconButton';

const HeaderSignOutButton = () => (
    <IconButton
        onClick={async () => {
            const response = await apiClient('signOut').call();

            if (response.isRight()) {
                isCurrentPagePrivate() && navigate('categories');
                setUser(null);
                pushNotification('info', 'Вы вышли из аккаунта');
            }
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
