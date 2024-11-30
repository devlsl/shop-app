import path from 'path';
import { createStorageService } from './createStorageService';
import { storageSchema } from '../storageSchema';
import { createServer } from 'http';
import { apiSchema } from '@shop/shared';
import { bindActions } from 'ts-api-generator';
import checkAuth from '../handlers/auth/checkAuth';
import refreshAuth from '../handlers/auth/refreshAuth';
import signOut from '../handlers/auth/signOut';
import signIn from '../handlers/auth/signIn';
import signUp from '../handlers/auth/signUp';
import getProductsPageItemsForGuest from '../handlers/products/getProductsPageItemsForGuest';
import getProductsPageItems from '../handlers/products/getProductsPageItems';
import getFilters from '../handlers/filters/getFilters';
import addProductToCart from '../handlers/products/addProductToCart';
import addProductToFavorites from '../handlers/products/addProductToFavorites';
import deleteProductFromFavorites from '../handlers/products/deleteProductFromFavorites';
import { createVerifyAccess } from '../handlers/shared/verifyAccess';
import { getEnv } from './getEnv';
import { envKeys } from '../envKeys';
import getProduct from '../handlers/products/getProduct';
import getProductForGuest from '../handlers/products/getProductForGuest';
import getFiltersForFavorites from '../handlers/filters/getFiltersForFavorites';
import getCart from '../handlers/cart/getCart';
import deleteProductFromCart from '../handlers/products/deleteProductFromCart';
import makeOrder from '../handlers/orders/makeOrder';
import getOrder from '../handlers/orders/getOrder';
import getOrders from '../handlers/orders/getOrders';
import getCategoriesPageItems from '../handlers/categories/getCategoriesPageItems';
import getCategoryPath from '../handlers/categories/getCategoryPath';
import getFavoritesPageItems from '../handlers/favorites/getFavoritesPageItems';
import { Handlers } from '../types';

export const startHttpServer = () => {
    const services = {
        storage: createStorageService(
            path.join(path.resolve(), 'db'),
            storageSchema,
        ),
    };
    const env = getEnv(envKeys);

    const props = {
        ...services,
        ...env,
    };

    const handlers: Handlers = {
        // auth
        checkAuth: checkAuth(props),
        refreshAuth: refreshAuth(props),
        signUp: signUp(props),
        signIn: signIn(props),
        signOut: signOut(props),
        // cart
        getCart: getCart(props),
        //categories
        getCategoriesPageItems: getCategoriesPageItems(props),
        getCategoryPath: getCategoryPath(props),
        // favorites
        getFavoritesPageItems: getFavoritesPageItems(props),
        // filters
        getFilters: getFilters(props),
        getFiltersForFavorites: getFiltersForFavorites(props),
        // orders
        getOrder: getOrder(props),
        getOrders: getOrders(props),
        makeOrder: makeOrder(props),
        // products
        getProduct: getProduct(props),
        getProductForGuest: getProductForGuest(props),
        getProductsPageItems: getProductsPageItems(props),
        getProductsPageItemsForGuest: getProductsPageItemsForGuest(props),
        addProductToCart: addProductToCart(props),
        addProductToFavorites: addProductToFavorites(props),
        deleteProductFromFavorites: deleteProductFromFavorites(props),
        deleteProductFromCart: deleteProductFromCart(props),
    };

    createServer(
        bindActions(apiSchema)
            .bindHandlers(handlers)
            .createDefaultHttpRequestHandler(
                createVerifyAccess(props),
                env.CLIENT_HOSTNAME,
            ),
    ).listen(env.SERVER_PORT);
};
