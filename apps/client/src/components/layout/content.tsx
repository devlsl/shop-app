import styled from 'styled-components';
import { navigate, usePathname } from '../../modules/url';
import { Page } from '../../shared/types/page';
import { createMapWithDefaultValue } from '../../shared/utils/helpers/createMapWithDefaultValue';
import { CategoriesPage } from '../pages/categories';
import { container } from '../../shared/utils/styles/container';

import { CategoryPath } from '../pages/shared/categoryPath';
import { ProductsPage } from '../pages/products/index';
import { CartPage } from '../pages/cart';
import { OrdersPage } from '../pages/orders';
import { FavoritesPage } from '../pages/favorites';
import { ProductPage } from '../pages/product';
import { OrderPage } from '../pages/order';
import { useEffect } from 'react';
import { NotFoundPage } from '../pages/shared/NotFoundPage';
import { ButtonText } from '../buttonText';
import { TextButton } from '../buttons/textButton';
import { typography } from '../../shared/utils/styles/typography';

const needShowCategoryPath = (pathname: string) =>
    ['/products', '/categories', '/product'].includes(pathname);

const ContentWrapper = styled.div`
    ${container()}
    overflow: auto;
    height: 100%;
    align-self: center;
    padding: 0 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const CategoryPathWrapper = styled.div`
    ${container()}
    align-self: center;
    padding: 0 8px;
`;

const NotFoundPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const GoToCatalogButton = styled(TextButton)`
    height: 40px;
`;

const GoToCatalogButtonText = styled(ButtonText)`
    ${typography({
        fontSize: '1.1rem',
        lineHeight: '1.1rem',
        fontWeight: '600',
    })}
`;

const pathnameToComponent = createMapWithDefaultValue<Page, React.ReactNode>(
    {
        '/products': <ProductsPage />,
        '/categories': <CategoriesPage />,
        '/cart': <CartPage />,
        '/favorites': <FavoritesPage />,
        '/orders': <OrdersPage />,
        '/product': <ProductPage />,
        '/order': <OrderPage />,
    },
    <NotFoundPage>
        <NotFoundPageWrapper>
            <div>Такой страницы нет</div>
            <GoToCatalogButton onClick={() => navigate('/categories')}>
                <GoToCatalogButtonText>Перейти в каталог</GoToCatalogButtonText>
            </GoToCatalogButton>
        </NotFoundPageWrapper>
    </NotFoundPage>,
);

export const Content = () => {
    const pathname = usePathname();
    console.log(pathname);

    useEffect(() => {
        if (pathname === '/') navigate('/categories');
    }, [pathname]);

    return (
        <>
            {needShowCategoryPath(pathname) && (
                <CategoryPathWrapper>
                    <CategoryPath />
                </CategoryPathWrapper>
            )}
            <ContentWrapper>{pathnameToComponent(pathname)}</ContentWrapper>
        </>
    );
};
