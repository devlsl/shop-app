import jwt from 'jsonwebtoken';
import { Handlers } from '../types.js';
import { ActionError, AuthContext } from 'ts-api-generator';
import { setCookie } from '../../utils/setCookie.js';
import { getCookie } from '../../utils/getCookie.js';
import { createSession, getSession, getUserById } from '../../db/methods.js';

type Options = {
    secret: string;
    accessTokenExpInSec: number;
    refreshTokenExpInSec: number;
};

export default (options: Options): Handlers['refreshAuth'] =>
    async (request, response) => {
        const refreshTokenExpDate = new Date(
            Date.now() + options.refreshTokenExpInSec * 1000,
        );
        const refreshToken = getCookie(request, 'refreshToken');
        if (!refreshToken) return new ActionError('Unauthorized');
        const maybeSession = await getSession(refreshToken);
        if (maybeSession.isLeft()) return new ActionError('Unauthorized');
        const session = maybeSession.value;
        const maybeUser = await getUserById(session.userId);
        if (maybeUser.isLeft()) return new ActionError('Unauthorized');
        const user = maybeUser.value;
        const maybeNewSession = await createSession(
            user.id,
            refreshTokenExpDate.toISOString(),
        );
        if (maybeNewSession.isLeft()) return new ActionError('Unauthorized');
        const newSession = maybeNewSession.value;
        const authContext: AuthContext = { id: user.id, role: user.role };
        const accessToken = jwt.sign(authContext, options.secret, {
            expiresIn: options.accessTokenExpInSec,
        });
        setCookie(response, 'accessToken', accessToken, {
            maxAge: options.accessTokenExpInSec,
            path: '/',
            sameSite: 'None',
            secure: true,
        });
        setCookie(response, 'refreshToken', newSession.id, {
            maxAge: options.refreshTokenExpInSec,
            path: '/',
            sameSite: 'None',
            secure: true,
        });
        return authContext;
    };
