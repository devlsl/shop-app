import { createMapWithDefaultValue } from '../../../shared/helpers/createMapWithDefaultValue';
import { CartPage } from '../../cart';
import { CategoriesPage } from '../../categories';
import { FavoritesPage } from '../../favorites';
import { OrderPage, OrdersPage } from '../../orders';
import { ProductPage, ProductsPage } from '../../products';
import { Page } from '../types';
import { DefaultPage } from '../ui/DefaultPage';

export const mapPageToComponent = createMapWithDefaultValue<
    Page,
    React.ReactNode
>(
    {
        products: <ProductsPage />,
        categories: <CategoriesPage />,
        cart: <CartPage />,
        favorites: <FavoritesPage />,
        orders: <OrdersPage />,
        product: <ProductPage />,
        order: <OrderPage />,
    },
    <DefaultPage />,
);
