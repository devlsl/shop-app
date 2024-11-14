import { IconButton } from '../buttons/iconButton';
import {
    ClipboardListIcon,
    FilterIcon,
    HeartIcon,
    LogOutIcon,
    MoonIcon,
    SearchIcon,
    ShoppingBagIcon,
    SunIcon,
    UserRoundIcon,
} from 'lucide-react';
import { navigate, usePathname } from '../../modules/url';
import { TextButton } from '../buttons/textButton';
import { Page } from '../../shared/types/page';
import { useBreakpoint } from '../../hooks/useBreakpoints';
import { Search } from '../search';
import { toggleTheme, useTheme } from '../../modules/theme';
import { setUser, useUser } from '../../modules/user';
import { apiAction } from '../../hooks/useApi';
import styled from 'styled-components';
import { container } from '../../shared/utils/styles/container';
import { pushNotification, showSignInView } from '../../hooks/useAppState';

const Styled = styled.div`
    ${container()}
    display: flex;
    align-self: center;
    padding: 0px 8px;
    align-items: center;
    gap: 8px;
`;

export const Header = () => {
    const pathname = usePathname();
    const isBottomBarShowed = useBreakpoint('showBottomBar');
    const theme = useTheme();
    const user = useUser();

    return (
        <Styled>
            {!isBottomBarShowed && (
                <>
                    <TextButton
                        onClick={() => navigate('/categories' satisfies Page)}
                    >
                        Каталог
                    </TextButton>
                    {pathname.startsWith('/products' satisfies Page) && (
                        <IconButton>
                            <FilterIcon />
                        </IconButton>
                    )}
                </>
            )}
            <>
                {pathname.startsWith('/products' satisfies Page) &&
                    isBottomBarShowed && (
                        <IconButton>
                            <FilterIcon />
                        </IconButton>
                    )}
                <Search />
                <IconButton>
                    <SearchIcon />
                </IconButton>
            </>
            {!isBottomBarShowed && (
                <>
                    <IconButton>
                        <ShoppingBagIcon />
                    </IconButton>
                    <IconButton>
                        <HeartIcon />
                    </IconButton>
                    <IconButton>
                        <ClipboardListIcon />
                    </IconButton>
                    <IconButton onClick={toggleTheme}>
                        {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
                    </IconButton>

                    {user === null && (
                        <IconButton onClick={showSignInView}>
                            <UserRoundIcon />
                        </IconButton>
                    )}
                    {user !== null && user !== undefined && (
                        <IconButton
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
                        </IconButton>
                    )}
                </>
            )}
        </Styled>
    );
};
