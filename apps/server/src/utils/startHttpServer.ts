import path from 'path';
import { createStorageService } from './createStorageService';
import { storageSchema } from '../storageSchema';
import { createServer } from 'http';
import { apiSchema } from '@shop/shared';
import { bindActions } from 'ts-api-generator';
import checkAuth from '../handlers/checkAuth';
import refreshAuth from '../handlers/refreshAuth';
import signOut from '../handlers/signOut';
import signIn from '../handlers/signIn';
import signUp from '../handlers/signUp';
import getCategoriesPageItems from '../handlers/getCategoriesPageItems';
import getProductsPageItemsForGuest from '../handlers/getProductsPageItemsForGuest';
import getProductsPageItems from '../handlers/getProductsPageItems';
import getProductPreviewForGuest from '../handlers/getProductPreviewForGuest';
import getProductPreview from '../handlers/getProductPreview';
import getFilters from '../handlers/getFilters';
import getCategoryPath from '../handlers/getCategoryPath';
import addProductToCart from '../handlers/addProductToCart';
import addProductToFavorites from '../handlers/addProductToFavorites';
import deleteProductFromFavorites from '../handlers/deleteProductFromFavorites';
import getProductPageItem from '../handlers/getProductPageItem';
import getProductPageItemForGuest from '../handlers/getProductPageItemForGuest';
import { createVerifyAccess } from './verifyAccess';
import { getEnv } from './getEnv';
import { envKeys } from '../consts';

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

    createServer(
        bindActions(apiSchema)
            .bindHandlers({
                checkAuth: checkAuth(props),
                refreshAuth: refreshAuth(props),
                signOut: signOut(props),
                signIn: signIn(props),
                signUp: signUp(props),
                getCategoriesPageItems: getCategoriesPageItems(props),
                getProductsPageItemsForGuest:
                    getProductsPageItemsForGuest(props),
                getProductsPageItems: getProductsPageItems(props),
                getProductPreviewForGuest: getProductPreviewForGuest(props),
                getProductPreview: getProductPreview(props),
                getFilters: getFilters(props),
                getCategoryPath: getCategoryPath(props),
                addProductToCart: addProductToCart(props),
                addProductToFavorites: addProductToFavorites(props),
                deleteProductFromFavorites: deleteProductFromFavorites(props),
                getProductPageItem: getProductPageItem(props),
                getProductPageItemForGuest: getProductPageItemForGuest(props),
            })
            .createDefaultHttpRequestHandler(
                createVerifyAccess(props),
                env.CLIENT_HOSTNAME || '',
            ),
    ).listen(env.SERVER_PORT);
};
