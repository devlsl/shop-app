import { IconButton } from '../buttons/iconButton';
import {
    ClipboardListIcon,
    FilterIcon,
    HeartIcon,
    ShoppingBagIcon,
    XIcon,
} from 'lucide-react';
import { TextButton } from '../buttons/textButton';
import { useBreakpoint } from '../../hooks/useBreakpoints';
import { Search, setSearchInputValue, useSearchInputValue } from '../search';
import styled from 'styled-components';
import { container } from '../../shared/utils/styles/container';
import { toggleAreShownProductFilters } from '../../hooks/useAppState';
import { useDebounce } from '../../hooks/useDebounce';
import { useEffect } from 'react';
import { setUrlParam, useUrlParam } from '../../modules/url';
import { HeaderColorModeChangeButton } from '../../features/colorMode/public/components';
import { showSignInPopup } from '../../features/auth/public/actions';
import { useIsAuthorized } from '../../features/auth/public/selectors';
import { HeaderAuthButton } from '../../features/auth/public/components';

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
                <TextButton
                    onClick={() => setUrlParam('page', 'categories', true)}
                >
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
                            isAuthorized
                                ? setUrlParam('page', 'cart', true)
                                : showSignInPopup()
                        }
                    >
                        <ShoppingBagIcon />
                    </IconButton>
                    <IconButton
                        onClick={() =>
                            isAuthorized
                                ? setUrlParam('page', 'favorites', true)
                                : showSignInPopup()
                        }
                    >
                        <HeartIcon />
                    </IconButton>
                    <IconButton
                        onClick={() =>
                            isAuthorized
                                ? setUrlParam('page', 'orders', true)
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
