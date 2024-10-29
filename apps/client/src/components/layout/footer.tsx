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
import { navigate } from '../../modules/url';
import { setUser, useUser } from '../../modules/user';
import { Page } from '../../shared/types/page';
import styled from 'styled-components';
import { container } from '../../shared/utils/styles/container';
import { useBreakpoint } from '../../hooks/useBreakpoints';

const Styled = styled.div`
    ${container()}
    align-self: center;
    display: flex;
    justify-content: space-evenly;
`;

export const Footer = () => {
    const isBottomBarShowed = useBreakpoint('showBottomBar');
    const user = useUser();
    const theme = useTheme();

    if (!isBottomBarShowed) return null;

    return (
        <Styled>
            <FooterButton
                onClick={() => navigate('/categories' satisfies Page)}
            >
                <LayoutDashboardIcon />
            </FooterButton>

            <FooterButton>
                <HeartIcon />
            </FooterButton>
            <FooterButton>
                <ShoppingBagIcon />
            </FooterButton>
            <FooterButton>
                <ClipboardListIcon />
            </FooterButton>
            <FooterButton onClick={toggleTheme}>
                {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
            </FooterButton>

            {user === null && (
                <FooterButton
                    onClick={() =>
                        apiAction('signInByEmailAndPassword')({
                            email: '1',
                            password: '1',
                        }).then(
                            (res) =>
                                res.status === 'success' && setUser(res.data),
                        )
                    }
                >
                    <UserRoundIcon />
                </FooterButton>
            )}
            {user !== null && user !== undefined && (
                <FooterButton
                    onClick={() =>
                        apiAction('signOut')().then(
                            (res) => res.status === 'success' && setUser(null),
                        )
                    }
                >
                    <LogOutIcon />
                </FooterButton>
            )}
        </Styled>
    );
};