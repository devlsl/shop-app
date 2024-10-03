import { Handlers } from './types.js';
import checkAuth from './auth/checkAuth.js';
import refreshAuth from './auth/refreshAuth.js';
import signInByEmailAndPassword from './auth/signInByEmailAndPassword.js';
import signOut from './auth/signOut.js';
import signUpByEmailAndPassword from './auth/signUpByEmailAndPassword.js';

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
