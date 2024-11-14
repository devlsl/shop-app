import { Handlers } from './types';
import checkAuth from './checkAuth';
import refreshAuth from './refreshAuth';
import signInByEmailAndPassword from './signInByEmailAndPassword';
import signOut from './signOut';
import signUpByEmailAndPassword from './signUpByEmailAndPassword';
import getCategoriesPageData from './getCategoriesPageData';
import getProductsForProductPage from './getProductsForProductPage';
import { getFiltersForCategory } from './getFiltersForCategory';
import { getCategoryPath } from './getCategoryPath';
import { todo } from './todo';
import getProductsForProductPageForUser from './getProductsForProductPageForUser';
import getProductPreview from './getProductPreview';
import getProductPreviewForUser from './getProductPreviewForUser';
import { addProductToCart } from './addProductToCart';

type Options = {
    jwtSecret: string;
    accessTokenExpInSec: number;
    refreshTokenExpInSec: number;
    staticServerHostname: string;
};

export const createHandlers = (options: Options): Handlers => {
    const {
        accessTokenExpInSec,
        jwtSecret,
        refreshTokenExpInSec,
        staticServerHostname,
    } = options;
    return {
        checkAuth,
        refreshAuth: refreshAuth({
            secret: jwtSecret,
            accessTokenExpInSec,
            refreshTokenExpInSec,
        }),
        signOut,
        signInByEmailAndPassword: signInByEmailAndPassword({
            secret: jwtSecret,
            accessTokenExpInSec,
            refreshTokenExpInSec,
        }),
        signUpByEmailAndPassword: signUpByEmailAndPassword({
            secret: jwtSecret,
            accessTokenExpInSec,
            refreshTokenExpInSec,
        }),
        getCategoriesPageData: getCategoriesPageData({
            staticServerHostname,
        }),
        getProductsForProductPage: getProductsForProductPage({
            staticServerHostname,
        }),
        getProductsForProductPageForUser: getProductsForProductPageForUser({
            staticServerHostname,
        }),
        getProductPreview: getProductPreview({
            staticServerHostname,
        }),
        getProductPreviewForUser: getProductPreviewForUser({
            staticServerHostname,
        }),
        getFiltersForCategory,
        getCategoryPath,
        addProductToCart,
        todo,
    };
};
