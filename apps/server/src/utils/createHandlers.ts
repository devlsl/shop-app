import addProductToCart from '../handlers/addProductToCart';
import addProductToFavorites from '../handlers/addProductToFavorites';
import checkAuth from '../handlers/checkAuth';
import deleteProductFromFavorites from '../handlers/deleteProductFromFavorites';
import getCategoriesPageData from '../handlers/getCategoriesPageData';
import getCategoryPath from '../handlers/getCategoryPath';
import getFiltersForCategory from '../handlers/getFiltersForCategory';
import getProductPreview from '../handlers/getProductPreview';
import getProductPreviewForUser from '../handlers/getProductPreviewForUser';
import getProductsForProductPage from '../handlers/getProductsForProductPage';
import getProductsForProductPageForUser from '../handlers/getProductsForProductPageForUser';
import refreshAuth from '../handlers/refreshAuth';
import signInByEmailAndPassword from '../handlers/signInByEmailAndPassword';
import signOut from '../handlers/signOut';
import signUpByEmailAndPassword from '../handlers/signUpByEmailAndPassword';
import { DbService, Handlers } from '../types';

type Options = {
    jwtSecret: string;
    accessTokenExpInSec: number;
    refreshTokenExpInSec: number;
    staticServerHostname: string;
};

type Dependencies = {
    db: DbService;
};

export const createHandlers = (
    options: Options,
    deps: Dependencies,
): Handlers => {
    const {
        accessTokenExpInSec,
        jwtSecret,
        refreshTokenExpInSec,
        staticServerHostname,
    } = options;
    const { db } = deps;
    return {
        checkAuth,
        refreshAuth: refreshAuth(
            {
                secret: jwtSecret,
                accessTokenExpInSec,
                refreshTokenExpInSec,
            },
            { db },
        ),
        signOut: signOut({ db }),
        signInByEmailAndPassword: signInByEmailAndPassword(
            {
                secret: jwtSecret,
                accessTokenExpInSec,
                refreshTokenExpInSec,
            },
            { db },
        ),
        signUpByEmailAndPassword: signUpByEmailAndPassword(
            {
                secret: jwtSecret,
                accessTokenExpInSec,
                refreshTokenExpInSec,
            },
            { db },
        ),
        getCategoriesPageData: getCategoriesPageData(
            {
                staticServerHostname,
            },
            { db },
        ),
        getProductsForProductPage: getProductsForProductPage(
            {
                staticServerHostname,
            },
            { db },
        ),
        getProductsForProductPageForUser: getProductsForProductPageForUser(
            {
                staticServerHostname,
            },
            { db },
        ),
        getProductPreview: getProductPreview(
            {
                staticServerHostname,
            },
            { db },
        ),
        getProductPreviewForUser: getProductPreviewForUser(
            {
                staticServerHostname,
            },
            { db },
        ),
        getFiltersForCategory: getFiltersForCategory({ db }),
        getCategoryPath: getCategoryPath({
            db,
        }),
        addProductToCart: addProductToCart({ db }),
        addProductToFavorites: addProductToFavorites({ db }),
        deleteProductFromFavorites: deleteProductFromFavorites({ db }),
    };
};
