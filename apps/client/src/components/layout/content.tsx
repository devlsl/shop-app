import styled from 'styled-components';
import { Page } from '../../shared/types/page';
import { createMapWithDefaultValue } from '../../shared/utils/helpers/createMapWithDefaultValue';
import { container } from '../../shared/utils/styles/container';

import { CategoryPath } from '../pages/shared/categoryPath';
import { lazy, useEffect } from 'react';
import { NotFoundPage } from '../pages/shared/NotFoundPage';
import { ButtonText } from '../buttonText';
import { TextButton } from '../buttons/textButton';
import { typography } from '../../shared/utils/styles/typography';
import { setUrlParam, useUrlParam } from '../../modules/url';

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
            <GoToCatalogButton
                onClick={() => setUrlParam('page', 'categories', true)}
            >
                <GoToCatalogButtonText>Перейти в каталог</GoToCatalogButtonText>
            </GoToCatalogButton>
        </NotFoundPageWrapper>
    </NotFoundPage>,
);

export const Content = () => {
    const page = useUrlParam('page') ?? '';
    console.log({ page, weqweqweqwe: '' });

    useEffect(() => {
        if (page === '') setUrlParam('page', 'categories', true);
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
