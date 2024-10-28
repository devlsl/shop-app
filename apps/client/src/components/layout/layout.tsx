import { useNotifications } from '../../hooks/useAppState';
import { NotificationsView } from '../../components/notifications/list';
import { toggleTheme, useTheme } from '../../modules/theme';
import styled, { css } from 'styled-components';
import {
    ClipboardList,
    Filter,
    Heart,
    LayoutDashboard,
    LogOut,
    Moon,
    SearchIcon,
    ShoppingBag,
    Sun,
} from 'lucide-react';
import { transition } from '../../shared/utils/styles/transition';
import { typography } from '../../shared/utils/styles/typography';
import { Loader } from '../../uikit/loader';
import { navigate, usePathname } from '../../modules/url';
import { hover } from '../../shared/utils/styles/hover';
import { Search } from '../search';
import { container } from '../../shared/utils/styles/container';
import { CatalogPage } from '../pages/catalog';
import { useBreakpoint } from '../../hooks/useBreakpoints';
import { useUser } from '../../modules/user';

const staticStyles = {
    borderRadius: '8px',
};

export const TextSecondaryButton = styled.button`
    ${transition('background-color', 'transform', 'color', 'outline-color')}
    ${typography({ fontWeight: 600 })}

    border-radius: ${staticStyles.borderRadius};

    background-color: ${({ theme }) => theme.button.secondary.background};

    color: ${({ theme }) => theme.button.secondary.text};

    ${hover(css`
        background-color: ${({ theme }) =>
            theme.button.secondary.hover.background};
    `)}

    &:active {
        background-color: ${({ theme }) =>
            theme.button.secondary.active.background};
    }

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 14px;

    &:active {
        transform: translateY(1px);
    }
`;

export const IconButton = styled.button`
    ${transition('background-color', 'transform', 'outline-color')}
    svg {
        ${transition('color')}
    }

    border-radius: ${staticStyles.borderRadius};

    background-color: ${({ theme }) => theme.button.secondary.background};
    svg {
        color: ${({ theme }) => theme.button.secondary.text};
    }
    ${hover(css`
        background-color: ${({ theme }) =>
            theme.button.secondary.hover.background};
    `)}

    &:active {
        background-color: ${({ theme }) =>
            theme.button.secondary.active.background};
    }
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;

    svg {
        stroke-width: 2px;
        width: 24px;
    }

    &:active {
        transform: translateY(1px);
    }
`;

const SecondaryIconButton = styled.button`
    ${transition('background-color', 'transform', 'outline-color')}
    svg {
        ${transition('color')}
    }

    background-color: ${({ theme }) => theme.button.secondary.background};
    svg {
        color: ${({ theme }) => theme.button.secondary.text};
    }

    ${hover(css`
        background-color: ${({ theme }) =>
            theme.button.secondary.hover.background};
    `)}

    &:active {
        background-color: ${({ theme }) =>
            theme.button.secondary.active.background};
    }

    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        stroke-width: 2px;
        width: 24px;
    }
    height: 60px;
`;
const Stretch = styled.div`
    width: 100%;
    height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    gap: 8px;
    grid-template-rows: auto 1fr auto;
    /* border: 1px solid yellow; */
`;

const Header = styled.div`
    ${container()}
    display: flex;
    justify-self: center;
    /* height: ; */
    /* border: 1px solid palevioletred; */
    padding: 8px 8px 0px;
    align-items: center;
    gap: 8px;
`;
const W = styled.div`
    ${container()}
    justify-self: center;
    overflow-y: auto;
    padding: 0 8px;
    /* border: 1px solid blue; */
`;

const Content = styled.div`
    display: flex;
    justify-content: center;
    /* border: 1px solid purple; */
    width: 100%;
    overflow-y: auto;
    /* padding: 0 8px; */

    height: 100%;
`;

const Footer = styled.div`
    display: flex;
    justify-content: space-evenly;
    /* padding: 16px 0px; */
    /* gap: 8px; */
`;

export const Layout = () => {
    const notifications = useNotifications();

    const theme = useTheme();

    const pathname = usePathname();
    console.log(pathname);
    // const showBottomBar = useScreenWidth({ max: 650 });
    const showBottomBar = useBreakpoint('showBottomBar');
    const user = useUser();
    return (
        <Stretch>
            <NotificationsView items={notifications} />
            {user === undefined ? (
                <Loader />
            ) : (
                <Wrapper>
                    <Header>
                        {!showBottomBar && (
                            <>
                                <TextSecondaryButton
                                    onClick={() => navigate('/catalog')}
                                >
                                    Каталог
                                </TextSecondaryButton>
                                <IconButton>
                                    <Filter />
                                </IconButton>
                            </>
                        )}
                        <>
                            <Search />
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </>
                        {!showBottomBar && (
                            <>
                                <IconButton>
                                    <ShoppingBag />
                                </IconButton>
                                <IconButton>
                                    <Heart />
                                </IconButton>
                                <IconButton onClick={toggleTheme}>
                                    {theme === 'dark' ? <Moon /> : <Sun />}
                                </IconButton>

                                <IconButton>
                                    <ClipboardList />
                                </IconButton>
                                <IconButton>
                                    <LogOut />
                                </IconButton>
                            </>
                        )}
                    </Header>
                    <W>
                        <Content>
                            {pathname === '/catalog' ? (
                                <CatalogPage />
                            ) : (
                                <div>asd</div>
                            )}
                        </Content>
                    </W>
                    {showBottomBar && (
                        <Footer>
                            <SecondaryIconButton
                                onClick={() => navigate('/catalog')}
                            >
                                <LayoutDashboard />
                            </SecondaryIconButton>
                            <SecondaryIconButton>
                                <Filter />
                            </SecondaryIconButton>
                            <SecondaryIconButton>
                                <ShoppingBag />
                            </SecondaryIconButton>
                            <SecondaryIconButton>
                                <Heart />
                            </SecondaryIconButton>
                            <SecondaryIconButton onClick={toggleTheme}>
                                {theme === 'dark' ? <Moon /> : <Sun />}
                            </SecondaryIconButton>

                            <SecondaryIconButton>
                                <ClipboardList />
                            </SecondaryIconButton>
                            <SecondaryIconButton>
                                <LogOut />
                            </SecondaryIconButton>
                        </Footer>
                    )}
                </Wrapper>
            )}
        </Stretch>
    );
};
