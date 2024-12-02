import styled from 'styled-components';

import { CategoryPath } from '../pages/shared/categoryPath';
import { lazy, useEffect } from 'react';
import { NotFoundPage } from '../pages/shared/NotFoundPage';
import { ButtonText } from '../buttonText';
import { TextButton } from '../buttons/textButton';
import { navigate } from '../../features/url/actions';
import { useUrlParam } from '../../features/url/selectors';
import { Page } from '../../features/url/types';
import { container } from '../../shared/styles/container';
import { typography } from '../../shared/styles/typography';
import { createMapWithDefaultValue } from '../../shared/helpers/createMapWithDefaultValue';

const CategoriesPage = lazy(() => import('../pages/categories'));
const ProductsPage = lazy(() => import('../pages/products/index'));
const CartPage = lazy(() => import('../pages/cart'));
const OrdersPage = lazy(() => import('../pages/orders'));
const FavoritesPage = lazy(() => import('../pages/favorites'));
const ProductPage = lazy(() => import('../pages/product'));
const OrderPage = lazy(() => import('../pages/order'));

const needShowCategoryPath = (page: string) =>
    ['products', 'categories', 'product'].includes(page);

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

const mapPageToComponent = createMapWithDefaultValue<Page, React.ReactNode>(
    {
        products: <ProductsPage />,
        categories: <CategoriesPage />,
        cart: <CartPage />,
        favorites: <FavoritesPage />,
        orders: <OrdersPage />,
        product: <ProductPage />,
        order: <OrderPage />,
    },
    <NotFoundPage>
        <NotFoundPageWrapper>
            <div>Такой страницы нет</div>
            <GoToCatalogButton onClick={() => navigate('categories')}>
                <GoToCatalogButtonText>Перейти в каталог</GoToCatalogButtonText>
            </GoToCatalogButton>
        </NotFoundPageWrapper>
    </NotFoundPage>,
);

export const Content = () => {
    const page = useUrlParam('page') ?? '';

    useEffect(() => {
        if (page === '') navigate('categories');
    }, [page]);

    return (
        <>
            {needShowCategoryPath(page) && (
                <CategoryPathWrapper>
                    <CategoryPath />
                </CategoryPathWrapper>
            )}
            <ContentWrapper>{mapPageToComponent(page)}</ContentWrapper>
        </>
    );
};
