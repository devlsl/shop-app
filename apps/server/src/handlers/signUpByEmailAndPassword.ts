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
    ): Handlers['signUpByEmailAndPassword'] =>
    async (payload, _, response) => {
        const dbUsers = await db.user.get();
        const refreshTokenExpDate = new Date(
            Date.now() + options.refreshTokenExpInSec * 1000,
        );
        const alreadyExistUser = dbUsers.find((u) => u.email === payload.email);
        if (alreadyExistUser !== undefined)
            return new ActionError('BadAuthData');
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(payload.password, salt);

        const newUser = {
            id: generateId(),
            email: payload.email,
            passwordHash: passwordHash,
            passwordHashSalt: salt,
            role: 'user',
        } satisfies DbEntities['user'];
        await db.user.set(dbUsers.concat(newUser));
        const newSession = {
            id: generateId(),
            userId: newUser.id,
            expirationDate: refreshTokenExpDate.toISOString(),
        } satisfies DbEntities['session'];
        await db.session.set((await db.session.get()).concat(newSession));
        const authContext: AuthContext = { id: newUser.id, role: newUser.role };
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
