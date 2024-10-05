import { Handlers } from './types';
import checkAuth from './auth/checkAuth';
import refreshAuth from './auth/refreshAuth';
import signInByEmailAndPassword from './auth/signInByEmailAndPassword';
import signOut from './auth/signOut';
import signUpByEmailAndPassword from './auth/signUpByEmailAndPassword';

type Options = {
    jwtSecret: string;
    accessTokenExpInSec: number;
    refreshTokenExpInSec: number;
};

export const createHandlers = (options: Options): Handlers => {
    const { accessTokenExpInSec, jwtSecret, refreshTokenExpInSec } = options;
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
    };
};
