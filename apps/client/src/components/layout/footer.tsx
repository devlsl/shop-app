import {
    ClipboardListIcon,
    HeartIcon,
    LayoutDashboardIcon,
    LogOutIcon,
    MoonIcon,
    ShoppingBagIcon,
    SunIcon,
    UserRoundIcon,
} from 'lucide-react';
import { toggleTheme, useTheme } from '../../modules/theme';
import { FooterButton } from '../buttons/footerButton';
import { apiAction } from '../../hooks/useApi';
import { setUrlParam } from '../../modules/url';
import { setUser, useUser } from '../../modules/user';
import styled from 'styled-components';
import { container } from '../../shared/utils/styles/container';
import { useBreakpoint } from '../../hooks/useBreakpoints';
import { pushNotification, showSignInView } from '../../hooks/useAppState';

const Styled = styled.div`
    ${container()}
    align-self: center;
    display: flex;
    justify-content: space-evenly;
`;

export const Footer = () => {
    const isBottomBarShowed = useBreakpoint('showBottomBar');

    const theme = useTheme();
    const isAuthorized = useUser();

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
                        : showSignInView()
                }
            >
                <HeartIcon />
            </FooterButton>
            <FooterButton
                onClick={() =>
                    isAuthorized
                        ? setUrlParam('page', 'cart', true)
                        : showSignInView()
                }
            >
                <ShoppingBagIcon />
            </FooterButton>
            <FooterButton
                onClick={() =>
                    isAuthorized
                        ? setUrlParam('page', 'orders', true)
                        : showSignInView()
                }
            >
                <ClipboardListIcon />
            </FooterButton>
            <FooterButton onClick={toggleTheme}>
                {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
            </FooterButton>

            {!isAuthorized && (
                <FooterButton onClick={showSignInView}>
                    <UserRoundIcon />
                </FooterButton>
            )}
            {isAuthorized && (
                <FooterButton
                    onClick={() => {
                        setUser(null);
                        apiAction('signOut')
                            .call()
                            .then(
                                (res) =>
                                    res.isRight() &&
                                    pushNotification(
                                        'info',
                                        'Вы вышли из аккаунта',
                                    ),
                            );
                    }}
                >
                    <LogOutIcon />
                </FooterButton>
            )}
        </Styled>
    );
};
