import {
    ClipboardListIcon,
    HeartIcon,
    LayoutDashboardIcon,
    ShoppingBagIcon,
} from 'lucide-react';
import styled from 'styled-components';
import { FooterColorModeChangeButton } from '../../features/colorMode';
import { FooterAuthButton } from '../../features/auth';
import { showSignInPopup } from '../../features/auth';
import { useIsAuthorized } from '../../features/auth';
import { navigate } from '../../features/navigation';
import { useBreakpoint } from '../../features/breakpoints';
import { container } from '../../shared/styles/container';
import { FooterButton } from '../../shared/ui/FooterButton';

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
            <FooterButton onClick={() => navigate('categories')}>
                <LayoutDashboardIcon />
            </FooterButton>

            <FooterButton
                onClick={() =>
                    isAuthorized ? navigate('favorites') : showSignInPopup()
                }
            >
                <HeartIcon />
            </FooterButton>
            <FooterButton
                onClick={() =>
                    isAuthorized ? navigate('cart') : showSignInPopup()
                }
            >
                <ShoppingBagIcon />
            </FooterButton>
            <FooterButton
                onClick={() =>
                    isAuthorized ? navigate('orders') : showSignInPopup()
                }
            >
                <ClipboardListIcon />
            </FooterButton>
            <FooterColorModeChangeButton />
            <FooterAuthButton />
        </Styled>
    );
};
