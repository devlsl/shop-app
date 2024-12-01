import { LogOutIcon, UserRoundIcon } from 'lucide-react';
import { FooterButton } from '../../../../components/buttons/footerButton';
import { apiAction } from '../../../../hooks/useApi';
import { pushNotification } from '../../../../hooks/useAppState';
import { setUser, showSignInPopup } from '../actions';
import { useIsAuthorized } from '../selectors';
import { getUrlParam, setUrlParam } from '../../../../modules/url';
import { publicPages } from '../../../../shared/consts/publicPages';
import { Page } from '../../../../shared/types/page';

const FooterSignOutButton = () => (
    <FooterButton
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
