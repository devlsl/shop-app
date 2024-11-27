import { IconButton } from '../buttons/iconButton';
import {
    ClipboardListIcon,
    FilterIcon,
    HeartIcon,
    LogOutIcon,
    MoonIcon,
    ShoppingBagIcon,
    SunIcon,
    UserRoundIcon,
    XIcon,
} from 'lucide-react';
import { navigate, setSearchParam, usePathname } from '../../modules/url';
import { TextButton } from '../buttons/textButton';
import { useBreakpoint } from '../../hooks/useBreakpoints';
import { Search, setSearchInputValue, useSearchInputValue } from '../search';
import { toggleTheme, useTheme } from '../../modules/theme';
import { setUser, useIsAuthorized } from '../../modules/user';
import { apiAction } from '../../hooks/useApi';
import styled from 'styled-components';
import { container } from '../../shared/utils/styles/container';
import {
    pushNotification,
    showSignInView,
    toggleAreShownProductFilters,
} from '../../hooks/useAppState';
import { useDebounce } from '../../hooks/useDebounce';
import { useEffect } from 'react';

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

    const searchInputValue = useSearchInputValue();
    const debouncedSearchInputValue = useDebounce(searchInputValue, 400);
    useEffect(() => {
        if (debouncedSearchInputValue !== '')
            setSearchParam('search', debouncedSearchInputValue);
    }, [debouncedSearchInputValue]);

    return (
        <Styled>
            {!isBottomBarShowed && (
                <TextButton onClick={() => navigate('/categories')}>
                    Каталог
                </TextButton>
            )}
            {(pathname.startsWith('/products') ||
                pathname.startsWith('/favorites')) && (
                <IconButton onClick={toggleAreShownProductFilters}>
                    <FilterIcon />
                </IconButton>
            )}
            <>
                <Search />
                <IconButton onClick={() => setSearchInputValue('')}>
                    <XIcon />
                </IconButton>
            </>
            {!isBottomBarShowed && (
                <>
                    <IconButton
                        onClick={() =>
                            isAuthorized ? navigate('/cart') : showSignInView()
                        }
                    >
                        <ShoppingBagIcon />
                    </IconButton>
                    <IconButton
                        onClick={() =>
                            isAuthorized
                                ? navigate('/favorites')
                                : showSignInView()
                        }
                    >
                        <HeartIcon />
                    </IconButton>
                    <IconButton
                        onClick={() =>
                            isAuthorized
                                ? navigate('/orders')
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
