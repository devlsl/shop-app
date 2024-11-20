import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { DbEntities, DbService, Handlers } from '../types';
import { ActionError, AuthContext } from 'ts-api-generator';
import { setCookie } from '../utils/setCookie';
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
    ): Handlers['signInByEmailAndPassword'] =>
    async (payload, _, response) => {
        const dbUsers = await db.user.get();
        const refreshTokenExpDate = new Date(
            Date.now() + options.refreshTokenExpInSec * 1000,
        );
        const user = dbUsers.find((u) => u.email === payload.email);
        if (user === undefined) return new ActionError('BadAuthData');
        const isPasswordRight = await bcrypt.compare(
            payload.password,
            user.passwordHash,
        );
        if (!isPasswordRight) return new ActionError('BadAuthData');
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
            httpOnly: true,
            path: '/',
            sameSite: 'None',
            secure: true,
        });
        setCookie(response, 'refreshToken', newSession.id, {
            maxAge: options.refreshTokenExpInSec,
            httpOnly: true,
            path: '/',
            sameSite: 'None',
            secure: true,
        });
        return authContext;
    };
