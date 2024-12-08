import { LogOutIcon, UserRoundIcon } from 'lucide-react';
import { setUser, showSignInPopup } from '../actions';
import { useIsAuthorized } from '../selectors';
import { isCurrentPagePrivate, navigate } from '../../navigation';
import { apiClient } from '../../api';
import { pushNotification } from '../../notifications';
import { IconButton } from '../../../shared/ui/IconButton';
import { Tooltip } from '../../../shared/ui/Tooltip';

const HeaderSignOutButton = () => (
    <Tooltip content={'Войти'}>
        <IconButton
            onClick={async () => {
                const response = await apiClient('signOut').call();

                if (response.isRight()) {
                    if (isCurrentPagePrivate()) navigate('categories');
                    setUser(null);
                    pushNotification('info', 'Вы вышли из аккаунта');
                }
            }}
        >
            <LogOutIcon />
        </IconButton>
    </Tooltip>
);

const HeaderSignInButton = () => (
    <Tooltip content={'Выйти'}>
        <IconButton onClick={showSignInPopup}>
            <UserRoundIcon />
        </IconButton>
    </Tooltip>
);

export const HeaderAuthButton = () => {
    const isAuthhorized = useIsAuthorized();
    return isAuthhorized ? <HeaderSignOutButton /> : <HeaderSignInButton />;
};
