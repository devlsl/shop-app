import styled from 'styled-components';
import { usePathname } from '../../modules/url';
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

const pathnameToComponent = createMapWithDefaultValue<Page, React.ReactNode>(
    {
        '/products': <ProductsPage />,
        '/categories': <CategoriesPage />,
        '/cart': <CartPage />,
        '/favorites': <FavoritesPage />,
        '/orders': <OrdersPage />,
        '/product': <ProductPage />,
    },
    <div>default</div>,
);

export const Content = () => {
    const pathname = usePathname();

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
