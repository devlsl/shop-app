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
import { navigate, setSearchParam, usePathname } from '../../modules/url';
import { TextButton } from '../buttons/textButton';
import { Page } from '../../shared/types/page';
import { useBreakpoint } from '../../hooks/useBreakpoints';
import { getSearchInputValue, Search } from '../search';
import { toggleTheme, useTheme } from '../../modules/theme';
import { setUser, useIsAuthorized, useUser } from '../../modules/user';
import { apiAction } from '../../hooks/useApi';
import styled from 'styled-components';
import { container } from '../../shared/utils/styles/container';
import {
    pushNotification,
    showSignInView,
    toggleAreShownProductFilters,
} from '../../hooks/useAppState';

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
    const isAuthorized = useIsAuthorized();

    return (
        <Styled>
            {!isBottomBarShowed && (
                <TextButton
                    onClick={() => navigate('/categories' satisfies Page)}
                >
                    Каталог
                </TextButton>
            )}
            {pathname.startsWith('/products' satisfies Page) && (
                <IconButton onClick={toggleAreShownProductFilters}>
                    <FilterIcon />
                </IconButton>
            )}
            <>
                <Search />
                <IconButton
                    onClick={() =>
                        setSearchParam('search', getSearchInputValue())
                    }
                >
                    <SearchIcon />
                </IconButton>
            </>
            {!isBottomBarShowed && (
                <>
                    <IconButton
                        onClick={() =>
                            isAuthorized
                                ? navigate('/cart' satisfies Page)
                                : showSignInView()
                        }
                    >
                        <ShoppingBagIcon />
                    </IconButton>
                    <IconButton
                        onClick={() =>
                            isAuthorized
                                ? navigate('/favorites' satisfies Page)
                                : showSignInView()
                        }
                    >
                        <HeartIcon />
                    </IconButton>
                    <IconButton
                        onClick={() =>
                            isAuthorized
                                ? navigate('/orders' satisfies Page)
                                : showSignInView()
                        }
                    >
                        <ClipboardListIcon />
                    </IconButton>
                    <IconButton onClick={toggleTheme}>
                        {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
                    </IconButton>

                    {!isAuthorized && (
                        <IconButton onClick={showSignInView}>
                            <UserRoundIcon />
                        </IconButton>
                    )}
                    {isAuthorized && (
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
