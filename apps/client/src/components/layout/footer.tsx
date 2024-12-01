import {
    ClipboardListIcon,
    HeartIcon,
    LayoutDashboardIcon,
    ShoppingBagIcon,
} from 'lucide-react';
import { FooterButton } from '../buttons/footerButton';
import { setUrlParam } from '../../modules/url';
import styled from 'styled-components';
import { container } from '../../shared/utils/styles/container';
import { useBreakpoint } from '../../hooks/useBreakpoints';
import { FooterColorModeChangeButton } from '../../features/colorMode/public/components';
import { FooterAuthButton } from '../../features/auth/public/components';
import { showSignInPopup } from '../../features/auth/public/actions';
import { useIsAuthorized } from '../../features/auth/public/selectors';

const Styled = styled.div`
    ${container()}
    align-self: center;
    display: flex;
    justify-content: space-evenly;
`;

export const Footer = () => {
    const isBottomBarShowed = useBreakpoint('showBottomBar');
    const isAuthorized = useIsAuthorized();

    if (!isBottomBarShowed) return null;

    return (
        <Styled>
            <FooterButton
                onClick={() => setUrlParam('page', 'categories', true)}
            >
                <LayoutDashboardIcon />
            </FooterButton>

            <FooterButton
                onClick={() =>
                    isAuthorized
                        ? setUrlParam('page', 'favorite', true)
                        : showSignInPopup()
                }
            >
                <HeartIcon />
            </FooterButton>
            <FooterButton
                onClick={() =>
                    isAuthorized
                        ? setUrlParam('page', 'cart', true)
                        : showSignInPopup()
                }
            >
                <ShoppingBagIcon />
            </FooterButton>
            <FooterButton
                onClick={() =>
                    isAuthorized
                        ? setUrlParam('page', 'orders', true)
                        : showSignInPopup()
                }
            >
                <ClipboardListIcon />
            </FooterButton>
            <FooterColorModeChangeButton />
            <FooterAuthButton />
        </Styled>
    );
};
