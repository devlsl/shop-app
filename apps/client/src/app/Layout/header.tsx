import { ClipboardListIcon, HeartIcon, ShoppingBagIcon } from 'lucide-react';
import { Search, useSearchInputValue } from '../../shared/ui/Search';
import styled from 'styled-components';
import { useEffect } from 'react';
import { HeaderColorModeChangeButton } from '../../features/colorMode';
import { showSignInPopup } from '../../features/auth';
import { useIsAuthorized } from '../../features/auth';
import { HeaderAuthButton } from '../../features/auth';
import { navigate, setNavigationParam } from '../../features/navigation';
import { useBreakpoint } from '../../features/breakpoints';
import { container } from '../../shared/styles/container';
import { useDebounce } from '../../shared/hooks/useDebounce';
import { ProductFiltersTriggerButton } from '../../features/products/features/filters';
import { TextButton } from '../../shared/ui/TextButton';
import { IconButton } from '../../shared/ui/IconButton';
import { Tooltip } from '../../shared/ui/Tooltip';

const Styled = styled.div`
    ${container()}
    display: flex;
    align-self: center;
    padding: 0px 8px;
    align-items: center;
    gap: 8px;
`;

export const Header = () => {
    const isBottomBarShowed = useBreakpoint('showBottomBar');
    const isAuthorized = useIsAuthorized();

    const searchInputValue = useSearchInputValue();
    const debouncedSearchInputValue = useDebounce(searchInputValue, 400);
    useEffect(() => {
        if (debouncedSearchInputValue !== '')
            setNavigationParam('search', debouncedSearchInputValue);
    }, [debouncedSearchInputValue]);

    return (
        <Styled>
            {!isBottomBarShowed && (
                <TextButton onClick={() => navigate('categories')}>
                    Каталог
                </TextButton>
            )}
            <ProductFiltersTriggerButton />
            <>
                <Search />
                {isBottomBarShowed && <HeaderColorModeChangeButton />}
            </>
            {!isBottomBarShowed && (
                <>
                    <Tooltip content={'Корзина'}>
                        <IconButton
                            onClick={() =>
                                isAuthorized
                                    ? navigate('cart')
                                    : showSignInPopup()
                            }
                        >
                            <ShoppingBagIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip content={'Избранные'}>
                        <IconButton
                            onClick={() =>
                                isAuthorized
                                    ? navigate('favorites')
                                    : showSignInPopup()
                            }
                        >
                            <HeartIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip content={'Заказы'}>
                        <IconButton
                            onClick={() =>
                                isAuthorized
                                    ? navigate('orders')
                                    : showSignInPopup()
                            }
                        >
                            <ClipboardListIcon />
                        </IconButton>
                    </Tooltip>
                    <HeaderColorModeChangeButton />
                    <HeaderAuthButton />
                </>
            )}
        </Styled>
    );
};
