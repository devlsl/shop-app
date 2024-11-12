import { Handlers } from './types';
import checkAuth from './auth/checkAuth';
import refreshAuth from './auth/refreshAuth';
import signInByEmailAndPassword from './auth/signInByEmailAndPassword';
import signOut from './auth/signOut';
import signUpByEmailAndPassword from './auth/signUpByEmailAndPassword';
import getCategoriesPageData from './categories/getCategoriesPageData';
import getProductsForProductPage from './products/getProductsForProductPage';
import { getFiltersForCategory } from './filters/getFiltersForCategory';
import { getCategoryPath } from './categories/getCategoryPath';
import { todo } from './common/todo';

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
        getFiltersForCategory,
        getCategoryPath,
        todo,
    };
};
