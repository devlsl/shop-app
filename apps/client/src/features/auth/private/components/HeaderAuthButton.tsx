import { LogOutIcon, UserRoundIcon } from 'lucide-react';
import { apiAction } from '../../../../hooks/useApi';
import { pushNotification } from '../../../../hooks/useAppState';
import { setUser, showSignInPopup } from '../actions';
import { useIsAuthorized } from '../selectors';
import { IconButton } from '../../../../components/buttons/iconButton';
import { getUrlParam, setUrlParam } from '../../../../modules/url';
import { Page } from '../../../../shared/types/page';
import { publicPages } from '../../../../shared/consts/publicPages';

const HeaderSignOutButton = () => (
    <IconButton
        onClick={() => {
            const page = getUrlParam('page') ?? '';
            if (!publicPages.includes(page as Page)) {
                setUrlParam('page', 'categories', true);
            }
            setUser(null);
            apiAction('signOut')
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
