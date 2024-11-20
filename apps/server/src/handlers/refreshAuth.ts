import jwt from 'jsonwebtoken';
import { DbEntities, DbService, Handlers } from '../types';
import { ActionError, AuthContext } from 'ts-api-generator';
import { setCookie } from '../utils/setCookie';
import { getCookie } from '../utils/getCookie';
import { generateId } from '../utils/generateId';

type Options = {
    secret: string;
    accessTokenExpInSec: number;
    refreshTokenExpInSec: number;
};

type Dependencies = {
    db: DbService;
};

export default (
        options: Options,
        { db }: Dependencies,
    ): Handlers['refreshAuth'] =>
    async (request, response) => {
        const refreshTokenExpDate = new Date(
            Date.now() + options.refreshTokenExpInSec * 1000,
        );
        const refreshToken = getCookie(request, 'refreshToken');
        if (!refreshToken) return new ActionError('Unauthorized');
        const session = (await db.session.get()).find(
            (s) => s.id === refreshToken,
        );
        if (session === undefined) return new ActionError('Unauthorized');
        const user = (await db.user.get()).find((u) => u.id === session.userId);
        if (user === undefined) return new ActionError('Unauthorized');
        const newSession = {
            id: generateId(),
            userId: user.id,
            expirationDate: refreshTokenExpDate.toISOString(),
        } satisfies DbEntities['session'];
        await db.session.set((await db.session.get()).concat(newSession));
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
