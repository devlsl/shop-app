import { IconButton } from '../buttons/iconButton';
import {
    ClipboardListIcon,
    FilterIcon,
    HeartIcon,
    ShoppingBagIcon,
    XIcon,
} from 'lucide-react';
import { TextButton } from '../buttons/textButton';
import { Search, setSearchInputValue, useSearchInputValue } from '../search';
import styled from 'styled-components';
import { useEffect } from 'react';
import { HeaderColorModeChangeButton } from '../../features/colorMode';
import { showSignInPopup } from '../../features/auth';
import { useIsAuthorized } from '../../features/auth';
import { HeaderAuthButton } from '../../features/auth';
import { navigate, setUrlParam, useUrlParam } from '../../features/url';
import { useBreakpoint } from '../../features/breakpoints';
import { container } from '../../shared/styles/container';
import { useDebounce } from '../../shared/hooks/useDebounce';
import { toggleAreShownProductFilters } from '../../shared/hooks/useAppState';

const Styled = styled.div`
    ${container()}
    display: flex;
    align-self: center;
    padding: 0px 8px;
    align-items: center;
    gap: 8px;
`;

export const Header = () => {
    const page = useUrlParam('page');
    const isBottomBarShowed = useBreakpoint('showBottomBar');
    const isAuthorized = useIsAuthorized();

    const searchInputValue = useSearchInputValue();
    const debouncedSearchInputValue = useDebounce(searchInputValue, 400);
    useEffect(() => {
        if (debouncedSearchInputValue !== '')
            setUrlParam('search', debouncedSearchInputValue);
    }, [debouncedSearchInputValue]);

    return (
        <Styled>
            {!isBottomBarShowed && (
                <TextButton onClick={() => navigate('categories')}>
                    Каталог
                </TextButton>
            )}
            {(page === 'products' || page === 'favorites') && (
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
                            isAuthorized ? navigate('cart') : showSignInPopup()
                        }
                    >
                        <ShoppingBagIcon />
                    </IconButton>
                    <IconButton
                        onClick={() =>
                            isAuthorized
                                ? navigate('favorites')
                                : showSignInPopup()
                        }
                    >
                        <HeartIcon />
                    </IconButton>
                    <IconButton
                        onClick={() =>
                            isAuthorized
                                ? navigate('orders')
                                : showSignInPopup()
                        }
                    >
                        <ClipboardListIcon />
                    </IconButton>
                    <HeaderColorModeChangeButton />
                    <HeaderAuthButton />
                </>
            )}
        </Styled>
    );
};
