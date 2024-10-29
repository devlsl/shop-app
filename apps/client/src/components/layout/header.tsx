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
                    {pathname.startsWith('/catalog') && (
                        <IconButton>
                            <FilterIcon />
                        </IconButton>
                    )}
                </>
            )}
            <>
                {pathname.startsWith('/catalog') && isBottomBarShowed && (
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
                        <IconButton
                            onClick={() =>
                                apiAction('signInByEmailAndPassword')({
                                    email: '1',
                                    password: '1',
                                }).then(
                                    (res) =>
                                        res.status === 'success' &&
                                        setUser(res.data),
                                )
                            }
                        >
                            <UserRoundIcon />
                        </IconButton>
                    )}
                    {user !== null && user !== undefined && (
                        <IconButton
                            onClick={() =>
                                apiAction('signOut')().then(
                                    (res) =>
                                        res.status === 'success' &&
                                        setUser(null),
                                )
                            }
                        >
                            <LogOutIcon />
                        </IconButton>
                    )}
                </>
            )}
        </Styled>
    );
};
